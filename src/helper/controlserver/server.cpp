#include "server.hpp"
#include "pages.hpp"

#include <algorithm>
#include <atomic>
#include <chrono>
#include <cstring>
#include <filesystem>
#include <fstream>
#include <functional>
#include <map>
#include <mutex>
#include <thread>
#include <vector>

#include <fancy.hpp>
#include <helper/base64/base64.hpp>
#include <helper/sha1/sha1.hpp>

#ifndef AUDIOPAD_VERSION
#define AUDIOPAD_VERSION "dev"
#endif

#if defined(_WIN32)
#include <winsock2.h>
#include <ws2tcpip.h>
using SocketHandle = SOCKET;
constexpr SocketHandle kInvalidSocket = INVALID_SOCKET;
#else
#include <arpa/inet.h>
#include <netinet/in.h>
#include <sys/socket.h>
#include <unistd.h>
using SocketHandle = int;
constexpr SocketHandle kInvalidSocket = -1;
#endif

#include <core/global/globals.hpp>
#include <helper/json/bindings.hpp>
#include <helper/recorder/recorder.hpp>
#include <nlohmann/json.hpp>

namespace Audiopad::Helpers
{
    namespace
    {
        //* Shared WebSocket GUID from RFC 6455.
        constexpr const char *kWebSocketGuid = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";

        //* Protocol limits: a command or upload message may never exceed this.
        constexpr std::size_t kMaxMessageBytes = 24ull * 1024ull * 1024ull;
        constexpr std::size_t kMaxHttpRequestBytes = 16ull * 1024ull;

        constexpr int kMaxPinAttempts = 5;

        void closeSocket(SocketHandle socket)
        {
#if defined(_WIN32)
            closesocket(socket);
#else
            ::close(socket);
#endif
        }

        bool sendAll(SocketHandle socket, const char *data, std::size_t length)
        {
            std::size_t sent = 0;
            while (sent < length)
            {
#if defined(_WIN32)
                const int chunk = ::send(socket, data + sent, static_cast<int>(length - sent), 0);
#else
                //* MSG_NOSIGNAL: a client that vanished mid-write must fail the
                //* send instead of raising SIGPIPE and taking the whole app down.
                const int chunk = ::send(socket, data + sent, static_cast<int>(length - sent), MSG_NOSIGNAL);
#endif
                if (chunk <= 0)
                {
                    return false;
                }
                sent += static_cast<std::size_t>(chunk);
            }
            return true;
        }

        std::string toLowerCopy(std::string text)
        {
            std::transform(text.begin(), text.end(), text.begin(),
                           [](unsigned char c) { return static_cast<char>(std::tolower(c)); });
            return text;
        }

        std::string urlDecode(const std::string &value)
        {
            std::string decoded;
            decoded.reserve(value.size());
            for (std::size_t index = 0; index < value.size(); index++)
            {
                if (value[index] == '%' && index + 2 < value.size())
                {
                    const auto hex = [](char c) -> int {
                        if (c >= '0' && c <= '9') return c - '0';
                        if (c >= 'a' && c <= 'f') return c - 'a' + 10;
                        if (c >= 'A' && c <= 'F') return c - 'A' + 10;
                        return -1;
                    };
                    const int high = hex(value[index + 1]);
                    const int low = hex(value[index + 2]);
                    if (high >= 0 && low >= 0)
                    {
                        decoded.push_back(static_cast<char>(high * 16 + low));
                        index += 2;
                        continue;
                    }
                }
                decoded.push_back(value[index] == '+' ? ' ' : value[index]);
            }
            return decoded;
        }

        struct HttpRequest
        {
            std::string method;
            std::string path;
            std::map<std::string, std::string> query;
            std::map<std::string, std::string> headers;

            std::string header(const std::string &name) const
            {
                auto it = headers.find(toLowerCopy(name));
                return it == headers.end() ? "" : it->second;
            }
            std::string queryValue(const std::string &name) const
            {
                auto it = query.find(name);
                return it == query.end() ? "" : it->second;
            }
        };

        std::string httpStatusMessage(int code)
        {
            switch (code)
            {
            case 101:
                return "Switching Protocols";
            case 200:
                return "OK";
            case 400:
                return "Bad Request";
            case 401:
                return "Unauthorized";
            case 403:
                return "Forbidden";
            case 404:
                return "Not Found";
            default:
                return "Error";
            }
        }

        void sendHttpResponse(SocketHandle socket, int code, const std::string &contentType, const std::string &body)
        {
            std::string response = "HTTP/1.1 " + std::to_string(code) + " " + httpStatusMessage(code) + "\r\n";
            response += "Content-Type: " + contentType + "\r\n";
            response += "Content-Length: " + std::to_string(body.size()) + "\r\n";
            response += "Connection: close\r\n";
            response += "\r\n";
            response += body;
            sendAll(socket, response.data(), response.size());
        }

        //* --- WebSocket frame codec (RFC 6455, server side) ---

        bool wsReadExact(SocketHandle socket, char *buffer, std::size_t length)
        {
            std::size_t received = 0;
            while (received < length)
            {
                const int chunk = ::recv(socket, buffer + received, static_cast<int>(length - received), 0);
                if (chunk <= 0)
                {
                    return false;
                }
                received += static_cast<std::size_t>(chunk);
            }
            return true;
        }

        struct WsFrame
        {
            std::uint8_t opcode = 0;
            bool fin = false;
            std::string payload;
        };

        bool wsReadFrame(SocketHandle socket, WsFrame &frame)
        {
            unsigned char header[2]{};
            if (!wsReadExact(socket, reinterpret_cast<char *>(header), 2))
            {
                return false;
            }

            frame.fin = (header[0] & 0x80) != 0;
            frame.opcode = header[0] & 0x0f;

            bool masked = (header[1] & 0x80) != 0;
            std::uint64_t length = header[1] & 0x7f;

            if (length == 126)
            {
                unsigned char extended[2]{};
                if (!wsReadExact(socket, reinterpret_cast<char *>(extended), 2))
                {
                    return false;
                }
                length = (static_cast<std::uint64_t>(extended[0]) << 8) | extended[1];
            }
            else if (length == 127)
            {
                unsigned char extended[8]{};
                if (!wsReadExact(socket, reinterpret_cast<char *>(extended), 8))
                {
                    return false;
                }
                length = 0;
                for (const auto byte : extended)
                {
                    length = (length << 8) | byte;
                }
            }

            if (length > kMaxMessageBytes)
            {
                return false;
            }

            unsigned char mask[4]{};
            if (masked && !wsReadExact(socket, reinterpret_cast<char *>(mask), 4))
            {
                return false;
            }

            frame.payload.resize(static_cast<std::size_t>(length));
            if (length > 0 && !wsReadExact(socket, frame.payload.data(), frame.payload.size()))
            {
                return false;
            }

            if (masked)
            {
                for (std::size_t index = 0; index < frame.payload.size(); index++)
                {
                    frame.payload[index] = static_cast<char>(frame.payload[index] ^ mask[index % 4]);
                }
            }
            return true;
        }

        void wsBuildFrame(std::uint8_t opcode, const std::string &payload, std::string &output)
        {
            output.clear();
            output.push_back(static_cast<char>(0x80 | opcode));

            if (payload.size() < 126)
            {
                output.push_back(static_cast<char>(payload.size()));
            }
            else if (payload.size() <= 0xffff)
            {
                output.push_back(static_cast<char>(126));
                output.push_back(static_cast<char>((payload.size() >> 8) & 0xff));
                output.push_back(static_cast<char>(payload.size() & 0xff));
            }
            else
            {
                output.push_back(static_cast<char>(127));
                for (int shift = 56; shift >= 0; shift -= 8)
                {
                    output.push_back(static_cast<char>((payload.size() >> shift) & 0xff));
                }
            }

            output += payload;
        }

        std::string effectiveSoundName(const Objects::Sound &sound)
        {
            return sound.displayName ? *sound.displayName : sound.name;
        }

        std::string tabsSignature()
        {
            std::string signature;
            for (const auto &tab : Globals::gData.getTabs())
            {
                signature += std::to_string(tab.id) + ":" + tab.name + ":" + std::to_string(tab.sounds.size()) + ":" +
                             std::to_string(tab.folders.size()) + ";";
            }
            return signature;
        }

        nlohmann::json boardsJson()
        {
            nlohmann::json boards = nlohmann::json::array();
            for (const auto &tab : Globals::gData.getTabs())
            {
                nlohmann::json board;
                board["id"] = tab.id;
                board["name"] = tab.name;
                board["icon"] = tab.icon.empty() ? false : true;

                nlohmann::json sounds = nlohmann::json::array();
                const auto appendSounds = [&sounds](const std::vector<Objects::Sound> &list) {
                    for (const auto &sound : list)
                    {
                        nlohmann::json entry;
                        entry["id"] = sound.id;
                        entry["name"] = effectiveSoundName(sound);
                        entry["favorite"] = sound.isFavorite;
                        entry["tags"] = sound.tags;
                        entry["hasImage"] = !sound.image.empty();
                        entry["voicePreset"] = sound.voicePreset ? *sound.voicePreset : "";
                        sounds.emplace_back(std::move(entry));
                    }
                };

                appendSounds(tab.sounds);
                std::function<void(const std::vector<Objects::Folder> &)> appendFolders;
                appendFolders = [&appendFolders, &appendSounds](const std::vector<Objects::Folder> &folders) {
                    for (const auto &folder : folders)
                    {
                        appendSounds(folder.sounds);
                        appendFolders(folder.folders);
                    }
                };
                appendFolders(tab.folders);

                board["sounds"] = sounds;
                boards.emplace_back(std::move(board));
            }
            return boards;
        }

        nlohmann::json stateJson()
        {
            nlohmann::json playing = nlohmann::json::array();
            for (const auto &playingSound : Globals::gAudio.getPlayingSounds())
            {
                if (!playingSound.reportsProgress)
                {
                    continue;
                }
                nlohmann::json entry;
                entry["soundId"] = playingSound.sound.id;
                entry["name"] = effectiveSoundName(playingSound.sound);
                entry["readInMs"] = playingSound.readInMs.load();
                entry["lengthInMs"] = playingSound.lengthInMs;
                entry["paused"] = playingSound.paused.load();
                playing.emplace_back(std::move(entry));
            }

            nlohmann::json state;
            state["playing"] = playing;
            state["voicePreset"] =
                Globals::gMicMonitor && Globals::gGui
                    ? Globals::gMicMonitor->presetName(
                          static_cast<Audio::MicMonitor::Preset>(Globals::gGui->voicePreset()))
                    : "off";
            state["micMuted"] = Globals::gGui && Globals::gGui->isMicMuted();
            state["hearMyself"] = Globals::gSettings.hearMyself;
            return state;
        }

        //* Serves the (bounded) artwork of a sound as raw image bytes. The PIN
        //* travels in the query string — the controller appends it after pairing.
        bool serveSoundImage(const HttpRequest &request, SocketHandle socket, const std::string &expectedPin)
        {
            const std::string pin = request.queryValue("pin");
            if (expectedPin.empty() || pin != expectedPin)
            {
                sendHttpResponse(socket, 403, "text/plain", "Forbidden");
                return true;
            }

            //* Path shape: /api/image/<soundId>
            const std::string prefix = "/api/image/";
            if (request.path.rfind(prefix, 0) != 0)
            {
                return false;
            }

            char *end = nullptr;
            const std::string number = request.path.substr(prefix.size());
            const unsigned long soundId = std::strtoul(number.c_str(), &end, 10);
            if (end == nullptr || *end != '\0')
            {
                sendHttpResponse(socket, 404, "text/plain", "Not Found");
                return true;
            }

            auto sound = Globals::gData.getSound(static_cast<std::uint32_t>(soundId));
            if (!sound)
            {
                sendHttpResponse(socket, 404, "text/plain", "Not Found");
                return true;
            }

            const std::string &dataUrl = sound->get().image;
            const std::size_t comma = dataUrl.find(',');
            const std::size_t semicolon = dataUrl.find(';');
            if (dataUrl.rfind("data:", 0) != 0 || comma == std::string::npos || semicolon == std::string::npos ||
                semicolon > comma)
            {
                sendHttpResponse(socket, 404, "text/plain", "Not Found");
                return true;
            }

            const std::string contentType = dataUrl.substr(5, semicolon - 5);
            std::string bytes;
            try
            {
                bytes = base64_decode(dataUrl.substr(comma + 1));
            }
            catch (...)
            {
                sendHttpResponse(socket, 404, "text/plain", "Not Found");
                return true;
            }

            sendHttpResponse(socket, 200, contentType, bytes);
            return true;
        }
    } // namespace

    struct ControlServer::Impl
    {
        std::uint16_t listenPort = 0;
        SocketHandle listenSocket = kInvalidSocket;
        std::atomic<bool> running{false};

        std::thread acceptThread;
        std::thread housekeepingThread;

        std::mutex clientsMutex;
        std::vector<SocketHandle> clientSockets; //* tracked for shutdown kicks

        //* Coalesced progress updates (flushed by the housekeeping thread).
        struct Progress
        {
            std::uint32_t soundId;
            std::uint64_t readInMs;
            std::uint64_t lengthInMs;
            bool paused;
        };
        std::mutex progressMutex;
        std::map<std::uint32_t, Progress> pendingProgress;

        std::string lastTabsSignature;

        struct ClientContext
        {
            ControlServer::Impl *server = nullptr;
            SocketHandle socket = kInvalidSocket;
            std::mutex sendMutex;
            bool authenticated = false;
            int failedAttempts = 0;
            std::string pin;

            bool sendText(const std::string &payload)
            {
                std::string frame;
                wsBuildFrame(0x1, payload, frame);
                std::scoped_lock lock(sendMutex);
                return sendAll(socket, frame.data(), frame.size());
            }
        };

        bool pinMatches(const std::string &attempt) const
        {
            const auto &expected = Globals::gSettings.remotePin;
            if (!expected || expected->size() != attempt.size())
            {
                return false;
            }
            //* Constant-time-ish comparison.
            unsigned diff = 0;
            for (std::size_t index = 0; index < attempt.size(); index++)
            {
                diff |= static_cast<unsigned char>(attempt[index]) ^ static_cast<unsigned char>((*expected)[index]);
            }
            return diff == 0;
        }

        void broadcast(const std::string &payload, bool authenticatedOnly = true)
        {
            std::vector<ClientContext *> targets;
            {
                std::scoped_lock lock(contextsMutex);
                targets.reserve(clientContexts.size());
                for (auto *client : clientContexts)
                {
                    if (!authenticatedOnly || client->authenticated)
                    {
                        targets.push_back(client);
                    }
                }
            }
            for (auto *client : targets)
            {
                client->sendText(payload);
            }
        }

        std::mutex contextsMutex;
        std::vector<ClientContext *> clientContexts;

        void registerClient(ClientContext *client)
        {
            std::scoped_lock lock(contextsMutex);
            clientContexts.push_back(client);
        }

        void unregisterClient(ClientContext *client)
        {
            std::scoped_lock lock(contextsMutex);
            clientContexts.erase(std::remove(clientContexts.begin(), clientContexts.end(), client),
                                 clientContexts.end());
        }

        void handleWebSocketMessage(ClientContext &client, const std::string &message)
        {
            nlohmann::json parsed = nlohmann::json::parse(message, nullptr, false);
            if (parsed.is_discarded() || !parsed.is_object() || !parsed.contains("type") ||
                !parsed["type"].is_string())
            {
                client.sendText(R"({"type":"error","message":"malformed message"})");
                return;
            }

            const std::string type = parsed["type"].get<std::string>();

            if (type == "auth")
            {
                const std::string pin = parsed.contains("pin") && parsed["pin"].is_string() ? parsed["pin"].get<std::string>() : "";
                if (pinMatches(pin))
                {
                    client.authenticated = true;
                    client.sendText(R"({"type":"authOk"})");
                    client.sendText((R"({"type":"boards","boards":)" + boardsJson().dump() + "}"));
                    client.sendText((R"({"type":"state",)" + stateJson().dump().substr(1)));
                }
                else
                {
                    client.failedAttempts++;
                    if (client.failedAttempts >= kMaxPinAttempts)
                    {
                        client.sendText(R"({"type":"authDenied","closing":true})");
                        return; //* connection is torn down by the reader loop
                    }
                    client.sendText(R"({"type":"authDenied"})");
                }
                return;
            }

            if (!client.authenticated)
            {
                client.sendText(R"({"type":"authRequired"})");
                return;
            }

            if (type == "list")
            {
                client.sendText((R"({"type":"boards","boards":)" + boardsJson().dump() + "}"));
                return;
            }

            if (type == "state")
            {
                client.sendText((R"({"type":"state",)" + stateJson().dump().substr(1)));
                return;
            }

            if (type == "play")
            {
                if (parsed.contains("soundId") && parsed["soundId"].is_number_unsigned() && Globals::gGui)
                {
                    Globals::gGui->playSound(parsed["soundId"].get<std::uint32_t>());
                }
                return;
            }

            if (type == "stop")
            {
                if (parsed.contains("soundId") && parsed["soundId"].is_number_unsigned() && Globals::gGui)
                {
                    Globals::gGui->stopSound(parsed["soundId"].get<std::uint32_t>());
                }
                return;
            }

            if (type == "stopAll")
            {
                if (Globals::gGui)
                {
                    Globals::gGui->stopSounds();
                }
                return;
            }

            if (type == "voice")
            {
                if (parsed.contains("preset") && parsed["preset"].is_string() && Globals::gGui)
                {
                    const auto preset = Audio::MicMonitor::presetFromString(parsed["preset"].get<std::string>());
                    if (preset)
                    {
                        Globals::gGui->setVoicePreset(static_cast<Enums::VoicePreset>(*preset));
                    }
                }
                return;
            }

            if (type == "micMute")
            {
                if (Globals::gGui)
                {
                    bool target = !Globals::gGui->isMicMuted();
                    if (parsed.contains("muted") && parsed["muted"].is_boolean())
                    {
                        target = parsed["muted"].get<bool>();
                    }
                    if (target != Globals::gGui->isMicMuted())
                    {
                        Globals::gGui->toggleMicMute();
                    }
                }
                return;
            }

            if (type == "hearMyself")
            {
                if (Globals::gGui)
                {
                    Globals::gGui->toggleHearMyself();
                }
                return;
            }

            if (type == "upload")
            {
                handleUpload(client, parsed);
                return;
            }

            client.sendText(R"({"type":"error","message":"unknown command"})");
        }

        void handleUpload(ClientContext &client, const nlohmann::json &parsed)
        {
            if (!parsed.contains("boardId") || !parsed["boardId"].is_number_unsigned() ||
                !parsed.contains("name") || !parsed["name"].is_string() || !parsed.contains("data") ||
                !parsed["data"].is_string() || !Globals::gGui)
            {
                client.sendText(R"({"type":"uploadResult","ok":false,"error":"invalid upload"})");
                return;
            }

            const auto boardId = parsed["boardId"].get<std::uint32_t>();
            const std::string name = parsed["name"].get<std::string>();
            const std::string payload = parsed["data"].get<std::string>();

            std::string wav;
            try
            {
                wav = base64_decode(payload);
            }
            catch (...)
            {
                client.sendText(R"({"type":"uploadResult","ok":false,"error":"bad base64"})");
                return;
            }

            if (wav.size() < 44 || wav.size() > kMaxMessageBytes)
            {
                client.sendText(R"({"type":"uploadResult","ok":false,"error":"bad payload"})");
                return;
            }

            //* Bounded, sanitized file name — same rules as everywhere else.
            std::string safeName;
            for (const char character : name)
            {
                if (character == '/' || character == '\\' || character == ':' || character == '*' ||
                    character == '?' || character == '"' || character == '<' || character == '>' || character == '|' ||
                    static_cast<unsigned char>(character) < 0x20)
                {
                    continue;
                }
                safeName += character;
            }
            if (safeName.empty())
            {
                safeName = "Remote Recording";
            }

            std::error_code ec;
            std::filesystem::create_directories(Recorder::recordingsDirectory(), ec);

            std::filesystem::path temp = Recorder::recordingsDirectory() /
                                         (".upload-" + std::to_string(std::chrono::steady_clock::now()
                                                                          .time_since_epoch()
                                                                          .count()) +
                                          ".wav");
            {
                std::ofstream stream(temp, std::ios::binary | std::ios::trunc);
                if (!stream.is_open())
                {
                    client.sendText(R"({"type":"uploadResult","ok":false,"error":"write failed"})");
                    return;
                }
                stream.write(wav.data(), static_cast<std::streamsize>(wav.size()));
                stream.close();
            }

            auto imported = Globals::gGui->importFileIntoTab(boardId, temp.u8string());
            std::filesystem::remove(temp, ec);

            if (imported)
            {
                client.sendText((R"({"type":"uploadResult","ok":true,"name":")" + safeName + "\"}"));
            }
            else
            {
                client.sendText(R"({"type":"uploadResult","ok":false,"error":"board not found"})");
            }
        }

        void serveClient(SocketHandle socket, const HttpRequest &request)
        {
            ClientContext client;
            client.server = this;
            client.socket = socket;
            client.pin = request.queryValue("pin");

            registerClient(&client);
            {
                std::scoped_lock lock(clientsMutex);
                clientSockets.push_back(socket);
            }

            const std::string upgrade = toLowerCopy(request.header("Upgrade"));
            const std::string key = request.header("Sec-WebSocket-Key");

            if (upgrade != "websocket" || key.empty())
            {
                const std::string path = request.path;
                if (path == "/" || path == "/index.html")
                {
                    sendHttpResponse(socket, 200, "text/html; charset=utf-8", Pages::controllerPage());
                }
                else if (path == "/overlay")
                {
                    sendHttpResponse(socket, 200, "text/html; charset=utf-8", Pages::overlayPage());
                }
                else if (path == "/api/ping")
                {
                    sendHttpResponse(socket, 200, "application/json",
                                     std::string(R"({"app":"audiopad","version":")") + AUDIOPAD_VERSION + "\"}");
                }
                else if (path.rfind("/api/image/", 0) == 0)
                {
                    const auto &expectedPin = Globals::gSettings.remotePin;
                    serveSoundImage(request, socket, expectedPin ? *expectedPin : "");
                }
                else
                {
                    sendHttpResponse(socket, 404, "text/plain", "Not Found");
                }

                cleanupClient(client, socket);
                return;
            }

            //* --- WebSocket upgrade ---
            //* Switch to blocking reads for the WebSocket phase: the short
            //* accept-phase timeout would otherwise treat every idle second as
            //* a dead connection and drop paired phones mid-session. Shutdown
            //* (see stop()) still unblocks the read for a clean teardown.
#if defined(_WIN32)
            DWORD noTimeout = 0;
            setsockopt(socket, SOL_SOCKET, SO_RCVTIMEO, reinterpret_cast<const char *>(&noTimeout), sizeof(noTimeout));
#else
            timeval noTimeout{};
            setsockopt(socket, SOL_SOCKET, SO_RCVTIMEO, &noTimeout, sizeof(noTimeout));
#endif

            const std::string accept = sha1Base64(key + kWebSocketGuid);
            std::string response = "HTTP/1.1 101 Switching Protocols\r\n";
            response += "Upgrade: websocket\r\n";
            response += "Connection: Upgrade\r\n";
            response += "Sec-WebSocket-Accept: " + accept + "\r\n";
            response += "\r\n";
            if (!sendAll(socket, response.data(), response.size()))
            {
                cleanupClient(client, socket);
                return;
            }

            if (!client.pin.empty() && pinMatches(client.pin))
            {
                client.authenticated = true;
            }

            client.sendText(R"({"type":"hello","app":"audiopad","version":")" + std::string(AUDIOPAD_VERSION) +
                            R"(","requiresAuth":true})");
            if (client.authenticated)
            {
                client.sendText(R"({"type":"authOk"})");
                client.sendText((R"({"type":"boards","boards":)" + boardsJson().dump() + "}"));
                client.sendText((R"({"type":"state",)" + stateJson().dump().substr(1)));
            }

            //* --- Frame loop (handles fragmentation, ping/pong, close) ---
            std::string assembled;
            std::uint8_t messageOpcode = 0;
            while (running.load())
            {
                WsFrame frame;
                if (!wsReadFrame(socket, frame))
                {
                    break;
                }

                if (frame.opcode == 0x8) //* close
                {
                    std::string closeFrame;
                    wsBuildFrame(0x8, frame.payload, closeFrame);
                    sendAll(socket, closeFrame.data(), closeFrame.size());
                    break;
                }
                if (frame.opcode == 0x9) //* ping
                {
                    std::string pong;
                    wsBuildFrame(0xA, frame.payload, pong);
                    std::scoped_lock lock(client.sendMutex);
                    sendAll(socket, pong.data(), pong.size());
                    continue;
                }
                if (frame.opcode == 0xA) //* pong
                {
                    continue;
                }

                if (frame.opcode == 0x1 || frame.opcode == 0x2)
                {
                    assembled.clear();
                    messageOpcode = frame.opcode;
                }
                else if (frame.opcode != 0x0)
                {
                    continue; //* unknown opcode — ignore
                }

                if (assembled.size() + frame.payload.size() > kMaxMessageBytes)
                {
                    break;
                }
                assembled += frame.payload;

                if (frame.fin)
                {
                    if (messageOpcode == 0x1) //* text
                    {
                        handleWebSocketMessage(client, assembled);
                        if (client.failedAttempts >= kMaxPinAttempts)
                        {
                            break;
                        }
                    }
                    assembled.clear();
                }
            }

            cleanupClient(client, socket);
        }

        void cleanupClient(ClientContext &client, SocketHandle socket)
        {
            unregisterClient(&client);
            {
                std::scoped_lock lock(clientsMutex);
                clientSockets.erase(std::remove(clientSockets.begin(), clientSockets.end(), socket),
                                    clientSockets.end());
            }
            closeSocket(socket);
        }

        void acceptLoop()
        {
            while (running.load())
            {
                sockaddr_in address{};
#if defined(_WIN32)
                int addressLength = sizeof(address);
#else
                socklen_t addressLength = sizeof(address);
#endif
                SocketHandle client = ::accept(listenSocket, reinterpret_cast<sockaddr *>(&address), &addressLength);
                if (client == kInvalidSocket)
                {
                    if (!running.load())
                    {
                        break;
                    }
                    std::this_thread::sleep_for(std::chrono::milliseconds(50));
                    continue;
                }

                int one = 1;
                setsockopt(client, IPPROTO_TCP, TCP_NODELAY, reinterpret_cast<const char *>(&one), sizeof(one));
#if defined(_WIN32)
                DWORD timeout = 1000;
                setsockopt(client, SOL_SOCKET, SO_RCVTIMEO, reinterpret_cast<const char *>(&timeout), sizeof(timeout));
#else
                timeval timeout{};
                timeout.tv_sec = 1;
                setsockopt(client, SOL_SOCKET, SO_RCVTIMEO, &timeout, sizeof(timeout));
#endif

                std::thread([this, client] { clientLoop(client); }).detach();
            }
        }

        void clientLoop(SocketHandle socket)
        {
            //* Read the HTTP request head (up to \r\n\r\n).
            std::string raw;
            char buffer[2048];
            while (raw.size() < kMaxHttpRequestBytes)
            {
                const int chunk = ::recv(socket, buffer, sizeof(buffer), 0);
                if (chunk <= 0)
                {
                    closeSocket(socket);
                    return;
                }
                raw.append(buffer, static_cast<std::size_t>(chunk));
                if (raw.find("\r\n\r\n") != std::string::npos)
                {
                    break;
                }
            }

            HttpRequest request;
            {
                const std::size_t headEnd = raw.find("\r\n\r\n");
                const std::string head = raw.substr(0, headEnd == std::string::npos ? raw.size() : headEnd);

                std::size_t lineStart = 0;
                bool firstLine = true;
                while (lineStart < head.size())
                {
                    const std::size_t lineEnd = head.find("\r\n", lineStart);
                    const std::string line = head.substr(
                        lineStart, lineEnd == std::string::npos ? std::string::npos : lineEnd - lineStart);
                    lineStart = lineEnd == std::string::npos ? head.size() : lineEnd + 2;

                    if (firstLine)
                    {
                        firstLine = false;
                        const std::size_t methodEnd = line.find(' ');
                        const std::size_t pathEnd = line.find(' ', methodEnd + 1);
                        if (methodEnd == std::string::npos)
                        {
                            continue;
                        }
                        request.method = line.substr(0, methodEnd);
                        const std::string target =
                            pathEnd == std::string::npos ? line.substr(methodEnd + 1)
                                                         : line.substr(methodEnd + 1, pathEnd - methodEnd - 1);

                        const std::size_t queryStart = target.find('?');
                        request.path = queryStart == std::string::npos ? target : target.substr(0, queryStart);
                        if (queryStart != std::string::npos)
                        {
                            std::size_t position = queryStart + 1;
                            while (position < target.size())
                            {
                                const std::size_t next = target.find('&', position);
                                const std::string pair = target.substr(
                                    position, next == std::string::npos ? std::string::npos : next - position);
                                position = next == std::string::npos ? target.size() : next + 1;

                                const std::size_t equals = pair.find('=');
                                if (equals != std::string::npos)
                                {
                                    request.query[urlDecode(pair.substr(0, equals))] = urlDecode(pair.substr(equals + 1));
                                }
                            }
                        }
                    }
                    else
                    {
                        const std::size_t colon = line.find(':');
                        if (colon != std::string::npos)
                        {
                            const std::string name = toLowerCopy(line.substr(0, colon));
                            std::string value = line.substr(colon + 1);
                            value.erase(0, value.find_first_not_of(' '));
                            request.headers[name] = value;
                        }
                    }
                }
            }

            serveClient(socket, request);
        }

        void housekeepingLoop()
        {
            auto lastFlush = std::chrono::steady_clock::now();
            auto lastSignature = std::chrono::steady_clock::now();

            while (running.load())
            {
                std::this_thread::sleep_for(std::chrono::milliseconds(100));

                const auto now = std::chrono::steady_clock::now();
                if (now - lastFlush >= std::chrono::milliseconds(250))
                {
                    lastFlush = now;
                    std::map<std::uint32_t, Progress> flush;
                    {
                        std::scoped_lock lock(progressMutex);
                        flush = std::move(pendingProgress);
                        pendingProgress.clear();
                    }
                    for (const auto &[id, progress] : flush)
                    {
                        nlohmann::json event;
                        event["type"] = "progress";
                        event["soundId"] = progress.soundId;
                        event["readInMs"] = progress.readInMs;
                        event["lengthInMs"] = progress.lengthInMs;
                        event["paused"] = progress.paused;
                        broadcast(event.dump());
                    }
                }

                if (now - lastSignature >= std::chrono::seconds(1))
                {
                    lastSignature = now;
                    const std::string signature = tabsSignature();
                    if (signature != lastTabsSignature)
                    {
                        const bool first = lastTabsSignature.empty();
                        lastTabsSignature = signature;
                        if (!first)
                        {
                            broadcast(R"({"type":"tabsChanged"})");
                        }
                    }
                }
            }
        }
    };

    ControlServer::ControlServer(std::uint16_t port) : impl(std::make_unique<Impl>())
    {
        impl->listenPort = port;
    }

    ControlServer::~ControlServer()
    {
        stop();
    }

    bool ControlServer::start()
    {
        if (impl->running.load())
        {
            return true;
        }

#if defined(_WIN32)
        WSADATA wsaData{};
        if (WSAStartup(MAKEWORD(2, 2), &wsaData) != 0)
        {
            Fancy::fancy.logTime().failure() << "Control server: WSAStartup failed" << std::endl;
            return false;
        }
#endif

        impl->listenSocket = ::socket(AF_INET, SOCK_STREAM, IPPROTO_TCP);
        if (impl->listenSocket == kInvalidSocket)
        {
            Fancy::fancy.logTime().failure() << "Control server: failed to create the listen socket" << std::endl;
            return false;
        }

        int reuse = 1;
        setsockopt(impl->listenSocket, SOL_SOCKET, SO_REUSEADDR, reinterpret_cast<const char *>(&reuse), sizeof(reuse));

        sockaddr_in address{};
        address.sin_family = AF_INET;
        address.sin_addr.s_addr = htonl(INADDR_ANY); //* LAN + localhost — the mobile controller needs it
        address.sin_port = htons(impl->listenPort);

        if (::bind(impl->listenSocket, reinterpret_cast<sockaddr *>(&address), sizeof(address)) != 0 ||
            ::listen(impl->listenSocket, 8) != 0)
        {
            Fancy::fancy.logTime().warning()
                << "Control server: port " << impl->listenPort
                << " is unavailable — the remote controller and overlay stay offline this session" << std::endl;
            closeSocket(impl->listenSocket);
            impl->listenSocket = kInvalidSocket;
            return false;
        }

        impl->running.store(true);
        impl->acceptThread = std::thread([this] { impl->acceptLoop(); });
        impl->housekeepingThread = std::thread([this] { impl->housekeepingLoop(); });

        Fancy::fancy.logTime().message()
            << "Control server listening on port " << impl->listenPort
            << " (mobile controller + overlay + WebSocket automation)" << std::endl;
        return true;
    }

    void ControlServer::stop()
    {
        if (!impl->running.exchange(false))
        {
            return;
        }

        if (impl->listenSocket != kInvalidSocket)
        {
#if !defined(_WIN32)
            //* shutdown() wakes a thread blocked in accept() — a plain close()
            //* does not on Linux, which would hang the join below.
            ::shutdown(impl->listenSocket, SHUT_RDWR);
#endif
            closeSocket(impl->listenSocket);
            impl->listenSocket = kInvalidSocket;
        }

        {
            std::scoped_lock lock(impl->clientsMutex);
            for (const auto socket : impl->clientSockets)
            {
#if !defined(_WIN32)
                ::shutdown(socket, SHUT_RDWR);
#endif
                closeSocket(socket);
            }
            impl->clientSockets.clear();
        }

        if (impl->acceptThread.joinable())
        {
            impl->acceptThread.join();
        }
        if (impl->housekeepingThread.joinable())
        {
            impl->housekeepingThread.join();
        }
    }

    bool ControlServer::isRunning() const
    {
        return impl->running.load();
    }

    std::uint16_t ControlServer::port() const
    {
        return impl->listenPort;
    }

    std::string ControlServer::lanAddress()
    {
        //* UDP "connect" to a public address performs no traffic — it only makes
        //* the kernel pick the outbound interface, whose local address we read.
        const SocketHandle socket = ::socket(AF_INET, SOCK_DGRAM, 0);
        if (socket == kInvalidSocket)
        {
            return "127.0.0.1";
        }

        sockaddr_in remote{};
        remote.sin_family = AF_INET;
        remote.sin_port = htons(80);
        inet_pton(AF_INET, "8.8.8.8", &remote.sin_addr);

        std::string address = "127.0.0.1";
        if (::connect(socket, reinterpret_cast<sockaddr *>(&remote), sizeof(remote)) == 0)
        {
            sockaddr_in local{};
#if defined(_WIN32)
            int length = sizeof(local);
#else
            socklen_t length = sizeof(local);
#endif
            if (getsockname(socket, reinterpret_cast<sockaddr *>(&local), &length) == 0)
            {
                char buffer[INET_ADDRSTRLEN]{};
                if (inet_ntop(AF_INET, &local.sin_addr, buffer, sizeof(buffer)) != nullptr)
                {
                    address = buffer;
                }
            }
        }

        closeSocket(socket);
        return address;
    }

    void ControlServer::broadcastPlaying(std::uint32_t soundId, const std::string &name)
    {
        nlohmann::json event;
        event["type"] = "playing";
        event["soundId"] = soundId;
        event["name"] = name;
        impl->broadcast(event.dump());
    }

    void ControlServer::broadcastProgress(std::uint32_t soundId, std::uint64_t readInMs, std::uint64_t lengthInMs,
                                          bool paused)
    {
        std::scoped_lock lock(impl->progressMutex);
        impl->pendingProgress[soundId] = Impl::Progress{soundId, readInMs, lengthInMs, paused};
    }

    void ControlServer::broadcastFinished(std::uint32_t soundId)
    {
        {
            std::scoped_lock lock(impl->progressMutex);
            impl->pendingProgress.erase(soundId);
        }
        nlohmann::json event;
        event["type"] = "finished";
        event["soundId"] = soundId;
        impl->broadcast(event.dump());
    }

    void ControlServer::broadcastAllStopped()
    {
        {
            std::scoped_lock lock(impl->progressMutex);
            impl->pendingProgress.clear();
        }
        impl->broadcast(R"({"type":"allStopped"})");
    }

    void ControlServer::broadcastTabsChanged()
    {
        impl->broadcast(R"({"type":"tabsChanged"})");
    }

    void ControlServer::broadcastVoicePreset(const std::string &presetName)
    {
        nlohmann::json event;
        event["type"] = "voiceChanged";
        event["preset"] = presetName;
        impl->broadcast(event.dump());
    }

    void ControlServer::broadcastMicMute(bool muted)
    {
        nlohmann::json event;
        event["type"] = "micMuteChanged";
        event["muted"] = muted;
        impl->broadcast(event.dump());
    }

    void ControlServer::broadcastHearMyself(bool enabled)
    {
        nlohmann::json event;
        event["type"] = "hearMyselfChanged";
        event["enabled"] = enabled;
        impl->broadcast(event.dump());
    }
} // namespace Audiopad::Helpers
