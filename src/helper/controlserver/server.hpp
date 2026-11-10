#pragma once
#include <cstdint>
#include <memory>
#include <string>

namespace Audiopad
{
    namespace Helpers
    {
        //* Local automation & remote-control interface.
        //*
        //* Serves two things from the running desktop app, entirely on the LAN
        //* (no cloud, no accounts, no fees):
        //*   HTTP  — the mobile controller page ("/"), the now-playing overlay
        //*           page ("/overlay") and a tiny unauthenticated ping endpoint.
        //*   WebSocket — a PIN-protected JSON protocol ("/ws", or any path with
        //*           an Upgrade header) that lets external clients enumerate
        //*           boards & sounds, trigger playback, stop clips, switch the
        //*           live voice preset, toggle the microphone and upload short
        //*           voice recordings into a board.
        //*
        //* Every command goes through the same Window API the desktop UI uses,
        //* so per-sound playback policies apply to remote triggers as well.
        class ControlServer
        {
          public:
            explicit ControlServer(std::uint16_t port);
            ~ControlServer();

            ControlServer(const ControlServer &) = delete;
            ControlServer &operator=(const ControlServer &) = delete;
            ControlServer(ControlServer &&) = delete;
            ControlServer &operator=(ControlServer &&) = delete;

            //* Binds and starts serving. Returns false when the port is taken.
            bool start();
            void stop();

            bool isRunning() const;
            std::uint16_t port() const;

            //* Best-effort primary LAN address of this machine ("127.0.0.1"
            //* when no network could be probed). Used for the pairing UI.
            static std::string lanAddress();

            //* --- Event broadcasts (safe to call from any thread) ---
            void broadcastPlaying(std::uint32_t soundId, const std::string &name);
            void broadcastProgress(std::uint32_t soundId, std::uint64_t readInMs, std::uint64_t lengthInMs, bool paused);
            void broadcastFinished(std::uint32_t soundId);
            void broadcastAllStopped();
            void broadcastTabsChanged();
            void broadcastVoicePreset(const std::string &presetName);
            void broadcastMicMute(bool muted);
            void broadcastHearMyself(bool enabled);

          private:
            struct Impl;
            std::unique_ptr<Impl> impl;
        };
    } // namespace Helpers
} // namespace Audiopad
