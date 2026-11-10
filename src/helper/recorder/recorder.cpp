#include "recorder.hpp"
#include <algorithm>
#include <array>
#include <chrono>
#include <cstdio>
#include <cstring>
#include <ctime>
#include <fstream>
#include <mutex>
#include <thread>

#include <miniaudio.h>

#include <fancy.hpp>

#if defined(_WIN32)
#include <helper/misc/misc.hpp>
#endif

namespace Audiopad::Helpers
{
    namespace
    {
        constexpr std::uint32_t kSampleRate = 48000;
        constexpr std::uint32_t kChannels = 2;

        //* Staging block size handed from the capture callback to the writer
        //* thread: 50 ms — small enough for responsive stop(), large enough to
        //* keep the wakeups cheap.
        constexpr std::size_t kBlockFrames = kSampleRate / 20;

        //* Safety cap for explicit recordings (30 minutes) so a forgotten session
        //* can never fill the disk.
        constexpr std::uint64_t kMaxRecordingMs = 30ull * 60ull * 1000ull;

        //* Instant Replay window.
        constexpr std::uint64_t kReplayMs = 30ull * 1000ull;

        std::string toLowerCopy(std::string text)
        {
            std::transform(text.begin(), text.end(), text.begin(),
                           [](unsigned char c) { return static_cast<char>(std::tolower(c)); });
            return text;
        }

        //* Strips characters that are invalid in file names on Windows/Linux so a
        //* user-provided recording name can never escape its directory.
        std::string sanitizeFileName(const std::string &name)
        {
            std::string sanitized;
            sanitized.reserve(name.size());
            for (const char character : name)
            {
                if (character == '/' || character == '\\' || character == ':' || character == '*' || character == '?' ||
                    character == '"' || character == '<' || character == '>' || character == '|' ||
                    static_cast<unsigned char>(character) < 0x20)
                {
                    continue;
                }
                sanitized += character;
            }

            const auto first = sanitized.find_first_not_of(" \t");
            const auto last = sanitized.find_last_not_of(" \t");
            if (first == std::string::npos)
            {
                return "";
            }
            return sanitized.substr(first, last - first + 1);
        }

        std::string timestampedName(const std::string &prefix)
        {
            const auto now = std::chrono::system_clock::now();
            const std::time_t time = std::chrono::system_clock::to_time_t(now);
            std::tm local{};
#if defined(_WIN32)
            localtime_s(&local, &time);
#else
            localtime_r(&time, &local);
#endif
            char buffer[64]{};
            std::strftime(buffer, sizeof(buffer), "%Y-%m-%d %H-%M-%S", &local);
            return prefix + " " + buffer;
        }

        std::filesystem::path uniquePath(const std::filesystem::path &directory, const std::string &baseName)
        {
            std::filesystem::path candidate = directory / (baseName + ".wav");
            for (std::size_t attempt = 2; std::filesystem::exists(candidate) && attempt < 1000; attempt++)
            {
                candidate = directory / (baseName + " (" + std::to_string(attempt) + ").wav");
            }
            return candidate;
        }

        //* Minimal 16-bit PCM WAV writer: streams data frames, patches the RIFF
        //* sizes once the final length is known.
        class WavWriter
        {
          public:
            bool open(const std::filesystem::path &path, std::uint32_t sampleRate, std::uint32_t channels)
            {
                stream.open(path, std::ios::binary | std::ios::trunc);
                if (!stream.is_open())
                {
                    return false;
                }

                this->sampleRate = sampleRate;
                this->channels = channels;

                std::array<unsigned char, 44> header{};
                writeHeader(header.data(), 0);
                stream.write(reinterpret_cast<const char *>(header.data()), static_cast<std::streamsize>(header.size()));
                return stream.good();
            }

            void append(const std::int16_t *samples, std::size_t count)
            {
                if (count == 0)
                {
                    return;
                }
                stream.write(reinterpret_cast<const char *>(samples),
                             static_cast<std::streamsize>(count * sizeof(std::int16_t)));
                dataBytes += static_cast<std::uint32_t>(count * sizeof(std::int16_t));
            }

            bool close()
            {
                if (!stream.is_open())
                {
                    return false;
                }

                std::array<unsigned char, 44> header{};
                writeHeader(header.data(), dataBytes);
                stream.seekp(0, std::ios::beg);
                stream.write(reinterpret_cast<const char *>(header.data()), static_cast<std::streamsize>(header.size()));
                stream.flush();
                stream.close();
                return true;
            }

          private:
            static void put32(unsigned char *target, std::uint32_t value)
            {
                target[0] = static_cast<unsigned char>(value & 0xff);
                target[1] = static_cast<unsigned char>((value >> 8) & 0xff);
                target[2] = static_cast<unsigned char>((value >> 16) & 0xff);
                target[3] = static_cast<unsigned char>((value >> 24) & 0xff);
            }
            static void put16(unsigned char *target, std::uint16_t value)
            {
                target[0] = static_cast<unsigned char>(value & 0xff);
                target[1] = static_cast<unsigned char>((value >> 8) & 0xff);
            }

            void writeHeader(unsigned char *header, std::uint32_t pcmDataBytes) const
            {
                const std::uint32_t byteRate = sampleRate * channels * sizeof(std::int16_t);
                std::memcpy(header + 0, "RIFF", 4);
                put32(header + 4, 36 + pcmDataBytes);
                std::memcpy(header + 8, "WAVE", 4);
                std::memcpy(header + 12, "fmt ", 4);
                put32(header + 16, 16);                      //* PCM chunk size
                put16(header + 20, 1);                       //* PCM format
                put16(header + 22, static_cast<std::uint16_t>(channels));
                put32(header + 24, sampleRate);
                put32(header + 28, byteRate);
                put16(header + 32, static_cast<std::uint16_t>(channels * sizeof(std::int16_t)));
                put16(header + 34, 16); //* bits per sample
                std::memcpy(header + 36, "data", 4);
                put32(header + 40, pcmDataBytes);
            }

            std::ofstream stream;
            std::uint32_t sampleRate = kSampleRate;
            std::uint32_t channels = kChannels;
            std::uint32_t dataBytes = 0;
        };

        void floatToInt16(const float *input, std::size_t sampleCount, std::vector<std::int16_t> &output)
        {
            output.resize(sampleCount);
            for (std::size_t index = 0; index < sampleCount; index++)
            {
                const float clamped = input[index] < -1.f ? -1.f : (input[index] > 1.f ? 1.f : input[index]);
                output[index] = static_cast<std::int16_t>(clamped * 32767.f);
            }
        }

        bool initDecoder(const std::string &path, ma_decoder &decoder)
        {
            const auto config = ma_decoder_config_init(ma_format_f32, kChannels, kSampleRate);
#if defined(_WIN32)
            const auto result = ma_decoder_init_file_w(Audiopad::Helpers::widen(path).c_str(), &config, &decoder);
#else
            const auto result = ma_decoder_init_file(path.c_str(), &config, &decoder);
#endif
            return result == MA_SUCCESS;
        }

        //* Finds a capture device whose name suggests desktop audio monitoring
        //* (PulseAudio/PipeWire expose the default sink as a ".monitor" source).
        std::optional<std::string> monitorSourceName()
        {
            ma_context context;
            if (ma_context_init(nullptr, 0, nullptr, &context) != MA_SUCCESS)
            {
                return std::nullopt;
            }

            ma_device_info *infos = nullptr;
            ma_uint32 count = 0;
            std::optional<std::string> found;
            if (ma_context_get_devices(&context, nullptr, nullptr, &infos, &count) == MA_SUCCESS)
            {
                for (ma_uint32 index = 0; index < count; index++)
                {
                    const std::string name = toLowerCopy(infos[index].name);
                    if (name.find("monitor") != std::string::npos)
                    {
                        found = infos[index].name;
                        break;
                    }
                }
            }

            ma_context_uninit(&context);
            return found;
        }
    } // namespace

    struct Recorder::Impl
    {
        //* One capture session: a miniaudio device whose callback hands fixed
        //* staging blocks to a writer thread (double buffer, wait-free handoff).
        struct Session
        {
            Source source = Source::Microphone;
            ma_device device{};
            bool deviceRunning = false;

            bool replayOnly = false; //* ring-only session kept alive for Instant Replay

            std::filesystem::path tempPath;
            WavWriter writer;

            //* --- callback -> writer handoff (double buffer) ---
            struct Block
            {
                std::vector<float> samples; //* interleaved f32
                std::size_t frames = 0;
                std::atomic<bool> ready{false};
            };
            std::array<Block, 2> blocks;
            std::atomic<std::size_t> activeBlock{0};

            std::thread writerThread;
            std::atomic<bool> writerRunning{false};

            std::atomic<std::uint64_t> capturedFrames{0};
            std::atomic<bool> overflowed{false};

            //* --- Instant Replay ring (writer-thread owned; save() locks) ---
            std::mutex replayMutex;
            std::vector<float> replayBuffer;
            std::uint64_t replayCapacityFrames = 0;
            std::uint64_t replayTotalFrames = 0; //* frames ever written (for tail length)
            bool replayEnabled = false;

            static void dataCallback(ma_device *device, void *output, const void *input, ma_uint32 frameCount)
            {
                (void)output;
                auto *session = static_cast<Session *>(device->pUserData);
                if (session == nullptr || input == nullptr || frameCount == 0)
                {
                    return;
                }

                const auto *frames = static_cast<const float *>(input);
                std::size_t remaining = frameCount;
                while (remaining > 0)
                {
                    const std::size_t index = session->activeBlock.load(std::memory_order_relaxed);
                    auto &block = session->blocks[index];

                    if (block.ready.load(std::memory_order_acquire))
                    {
                        //* The writer has not picked the previous block up yet —
                        //* rather than blocking the audio callback we drop the
                        //* incoming chunk (counted, logged by the writer).
                        session->overflowed.store(true, std::memory_order_relaxed);
                        return;
                    }

                    const std::size_t space = (kBlockFrames - block.frames);
                    const std::size_t chunk = space < remaining ? space : remaining;

                    if (block.samples.size() < kBlockFrames * kChannels)
                    {
                        block.samples.resize(kBlockFrames * kChannels);
                    }
                    std::memcpy(block.samples.data() + block.frames * kChannels, frames,
                                chunk * kChannels * sizeof(float));
                    block.frames += chunk;
                    frames += chunk * kChannels;
                    remaining -= chunk;

                    if (block.frames >= kBlockFrames)
                    {
                        block.ready.store(true, std::memory_order_release);
                        session->activeBlock.store(1 - index, std::memory_order_relaxed);
                    }
                }
            }

            void writerRun()
            {
                std::vector<std::int16_t> pcm;
                while (writerRunning.load(std::memory_order_relaxed))
                {
                    bool worked = false;
                    for (std::size_t index = 0; index < blocks.size(); index++)
                    {
                        auto &block = blocks[index];
                        if (!block.ready.load(std::memory_order_acquire))
                        {
                            continue;
                        }

                        if (!replayOnly)
                        {
                            floatToInt16(block.samples.data(), block.frames * kChannels, pcm);
                            writer.append(pcm.data(), pcm.size());
                        }
                        capturedFrames.fetch_add(block.frames, std::memory_order_relaxed);

                        {
                            std::scoped_lock lock(replayMutex);
                            if (replayEnabled && replayCapacityFrames > 0)
                            {
                                appendToReplay(block.samples.data(), block.frames);
                            }
                        }

                        block.frames = 0;
                        block.ready.store(false, std::memory_order_release);
                        worked = true;
                    }

                    if (!worked)
                    {
                        std::this_thread::sleep_for(std::chrono::milliseconds(5));
                    }
                }

                //* Final flush of anything still staged.
                for (std::size_t index = 0; index < blocks.size(); index++)
                {
                    auto &block = blocks[index];
                    if (block.ready.load(std::memory_order_acquire) && block.frames > 0)
                    {
                        if (!replayOnly)
                        {
                            floatToInt16(block.samples.data(), block.frames * kChannels, pcm);
                            writer.append(pcm.data(), pcm.size());
                        }
                        capturedFrames.fetch_add(block.frames, std::memory_order_relaxed);
                        {
                            std::scoped_lock lock(replayMutex);
                            if (replayEnabled && replayCapacityFrames > 0)
                            {
                                appendToReplay(block.samples.data(), block.frames);
                            }
                        }
                        block.frames = 0;
                        block.ready.store(false, std::memory_order_release);
                    }
                }
            }

            void appendToReplay(const float *samples, std::size_t frames)
            {
                std::uint64_t position = replayTotalFrames % replayCapacityFrames;
                std::size_t remaining = frames;
                const float *source = samples;

                while (remaining > 0)
                {
                    const std::size_t offset = static_cast<std::size_t>(position);
                    const std::size_t chunk = std::min<std::size_t>(remaining, static_cast<std::size_t>(replayCapacityFrames) - offset);
                    std::memcpy(replayBuffer.data() + offset * kChannels, source, chunk * kChannels * sizeof(float));
                    source += chunk * kChannels;
                    position = (position + chunk) % replayCapacityFrames;
                    remaining -= chunk;
                }

                replayTotalFrames += frames;
            }
        };

        mutable std::mutex sessionMutex;
        std::unique_ptr<Session> activeSession;
        bool replayArmed = false;

        void stopSessionLocked(const std::optional<std::string> &desiredName, std::optional<std::string> &result,
                               bool finalizeFile)
        {
            if (!activeSession)
            {
                return;
            }

            auto session = std::move(activeSession);

            if (session->deviceRunning)
            {
                ma_device_uninit(&session->device);
                session->deviceRunning = false;
            }

            if (session->writerRunning.load())
            {
                session->writerRunning.store(false);
                if (session->writerThread.joinable())
                {
                    session->writerThread.join();
                }
            }

            if (session->overflowed.load())
            {
                Fancy::fancy.logTime().warning()
                    << "Recorder: the writer thread could not keep up — parts of the capture were dropped"
                    << std::endl;
            }

            if (finalizeFile && !session->replayOnly)
            {
                session->writer.close();

                std::string name = desiredName ? sanitizeFileName(*desiredName) : "";
                if (name.empty())
                {
                    name = timestampedName(session->source == Source::Microphone ? "Microphone" : "System Audio");
                }

                std::error_code ec;
                std::filesystem::create_directories(Recorder::recordingsDirectory(), ec);
                const auto finalPath = uniquePath(Recorder::recordingsDirectory(), name);

                std::filesystem::rename(session->tempPath, finalPath, ec);
                if (ec)
                {
                    //* Cross-volume or locked-file fallback: copy then remove.
                    std::error_code copyEc;
                    std::filesystem::copy_file(session->tempPath, finalPath,
                                               std::filesystem::copy_options::overwrite_existing, copyEc);
                    std::error_code removeEc;
                    std::filesystem::remove(session->tempPath, removeEc);
                    if (copyEc)
                    {
                        Fancy::fancy.logTime().failure()
                            << "Recorder: failed to finalize '" << finalPath << "': " << copyEc.message()
                            << std::endl;
                        result = std::nullopt;
                        return;
                    }
                }
                result = finalPath.u8string();
            }
            else
            {
                if (!session->replayOnly)
                {
                    session->writer.close();
                    std::error_code ec;
                    std::filesystem::remove(session->tempPath, ec);
                }
                result = std::nullopt;
            }

            //* Session ends — the replay ring dies with it; a still-armed replay
            //* re-arms a fresh ring-only session on demand.
        }
    };

    Recorder::Recorder() : impl(std::make_unique<Impl>())
    {
    }

    Recorder::~Recorder()
    {
        std::optional<std::string> ignored;
        std::scoped_lock lock(impl->sessionMutex);
        impl->stopSessionLocked(std::nullopt, ignored, false);
    }

    std::filesystem::path Recorder::recordingsDirectory()
    {
#if defined(_WIN32)
        char *buffer = nullptr;
        std::size_t size = 0;
        _dupenv_s(&buffer, &size, "APPDATA");
        const std::filesystem::path base = buffer ? std::filesystem::path(buffer) / "Audiopad" / "Recordings"
                                                  : std::filesystem::temp_directory_path() / "Audiopad" / "Recordings";
        if (buffer)
        {
            free(buffer);
        }
        return base;
#else
        const char *dataHome = std::getenv("XDG_DATA_HOME"); // NOLINT(concurrency-mt-unsafe)
        if (dataHome != nullptr && *dataHome != '\0')
        {
            return std::filesystem::path(dataHome) / "Audiopad" / "Recordings";
        }
        const char *home = std::getenv("HOME"); // NOLINT(concurrency-mt-unsafe)
        return std::filesystem::path(home != nullptr ? home : ".") / ".local" / "share" / "Audiopad" / "Recordings";
#endif
    }

    bool Recorder::systemCaptureAvailable()
    {
#if defined(_WIN32)
        return true; //* WASAPI loopback
#else
        return monitorSourceName().has_value();
#endif
    }

    bool Recorder::start(Source source, const std::optional<std::string> &deviceName)
    {
        std::scoped_lock lock(impl->sessionMutex);

        if (impl->activeSession)
        {
            Fancy::fancy.logTime().warning() << "Recorder: a session is already running" << std::endl;
            return false;
        }

        auto session = std::make_unique<Impl::Session>();
        session->source = source;
        session->replayOnly = false;

        ma_device_config config = [&] {
#if defined(_WIN32)
            if (source == Source::System)
            {
                ma_device_config loopbackConfig = ma_device_config_init(ma_device_type_loopback);
                loopbackConfig.capture.format = ma_format_f32;
                loopbackConfig.capture.channels = kChannels;
                loopbackConfig.sampleRate = kSampleRate;
                loopbackConfig.periodSizeInFrames = 256;
                loopbackConfig.dataCallback = Impl::Session::dataCallback;
                loopbackConfig.pUserData = session.get();
                return loopbackConfig;
            }
#else
            (void)source;
#endif
            ma_device_config captureConfig = ma_device_config_init(ma_device_type_capture);
            captureConfig.capture.format = ma_format_f32;
            captureConfig.capture.channels = kChannels;
            captureConfig.sampleRate = kSampleRate;
            captureConfig.periodSizeInFrames = 256;
            captureConfig.dataCallback = Impl::Session::dataCallback;
            captureConfig.pUserData = session.get();
            return captureConfig;
        }();

        ma_device_id deviceId{};
        if (source == Source::Microphone && deviceName && !deviceName->empty())
        {
            ma_context context;
            if (ma_context_init(nullptr, 0, nullptr, &context) == MA_SUCCESS)
            {
                ma_device_info *infos = nullptr;
                ma_uint32 count = 0;
                if (ma_context_get_devices(&context, nullptr, nullptr, &infos, &count) == MA_SUCCESS)
                {
                    for (ma_uint32 index = 0; index < count; index++)
                    {
                        if (deviceName == infos[index].name)
                        {
                            deviceId = infos[index].id;
                            config.capture.pDeviceID = &deviceId;
                            break;
                        }
                    }
                }
                ma_context_uninit(&context);
            }
        }
#if !defined(_WIN32)
        else if (source == Source::System)
        {
            const auto monitor = monitorSourceName();
            if (!monitor)
            {
                Fancy::fancy.logTime().failure()
                    << "Recorder: no monitor source available for system recording" << std::endl;
                return false;
            }
            ma_context context;
            if (ma_context_init(nullptr, 0, nullptr, &context) == MA_SUCCESS)
            {
                ma_device_info *infos = nullptr;
                ma_uint32 count = 0;
                if (ma_context_get_devices(&context, nullptr, nullptr, &infos, &count) == MA_SUCCESS)
                {
                    for (ma_uint32 index = 0; index < count; index++)
                    {
                        if (monitor == infos[index].name)
                        {
                            deviceId = infos[index].id;
                            config.capture.pDeviceID = &deviceId;
                            break;
                        }
                    }
                }
                ma_context_uninit(&context);
            }
        }
#endif

        std::error_code ec;
        std::filesystem::create_directories(recordingsDirectory(), ec);
        session->tempPath = recordingsDirectory() / (".recording-" + std::to_string(reinterpret_cast<std::uintptr_t>(session.get())) + ".tmp.wav");
        if (!session->writer.open(session->tempPath, kSampleRate, kChannels))
        {
            Fancy::fancy.logTime().failure() << "Recorder: failed to create the temp WAV file" << std::endl;
            return false;
        }

        if (ma_device_init(nullptr, &config, &session->device) != MA_SUCCESS)
        {
            Fancy::fancy.logTime().failure() << "Recorder: failed to open the capture device" << std::endl;
            return false;
        }
        session->deviceRunning = true;

        if (ma_device_start(&session->device) != MA_SUCCESS)
        {
            ma_device_uninit(&session->device);
            session->deviceRunning = false;
            Fancy::fancy.logTime().failure() << "Recorder: failed to start the capture device" << std::endl;
            return false;
        }

        session->writerRunning.store(true);
        session->writerThread = std::thread([raw = session.get()] { raw->writerRun(); });

        impl->activeSession = std::move(session);
        return true;
    }

    std::optional<std::string> Recorder::stop(const std::optional<std::string> &desiredName)
    {
        std::optional<std::string> result;
        std::scoped_lock lock(impl->sessionMutex);
        if (!impl->activeSession || impl->activeSession->replayOnly)
        {
            return std::nullopt;
        }
        impl->stopSessionLocked(desiredName, result, true);
        return result;
    }

    Recorder::Status Recorder::status() const
    {
        std::scoped_lock lock(impl->sessionMutex);
        Status status;
        if (!impl->activeSession)
        {
            return status;
        }

        const auto &session = *impl->activeSession;
        status.active = !session.replayOnly;
        status.source = session.source;
        status.sampleRate = kSampleRate;
        status.channels = kChannels;
        status.capturedFrames = session.capturedFrames.load(std::memory_order_relaxed);
        status.elapsedMs = status.capturedFrames * 1000ull / kSampleRate;
        return status;
    }

    bool Recorder::armInstantReplay()
    {
        std::scoped_lock lock(impl->sessionMutex);

        if (impl->activeSession)
        {
            std::scoped_lock replayLock(impl->activeSession->replayMutex);
            impl->activeSession->replayEnabled = true;
            impl->activeSession->replayCapacityFrames = kSampleRate * kReplayMs / 1000;
            impl->activeSession->replayBuffer.assign(
                static_cast<std::size_t>(impl->activeSession->replayCapacityFrames) * kChannels, 0.0f);
            impl->activeSession->replayTotalFrames = 0;
            impl->replayArmed = true;
            return true;
        }

        //* No session yet — open a dedicated ring-only system capture.
        auto session = std::make_unique<Impl::Session>();
        session->source = Source::System;
        session->replayOnly = true;
        session->replayEnabled = true;
        session->replayCapacityFrames = kSampleRate * kReplayMs / 1000;
        session->replayBuffer.assign(static_cast<std::size_t>(session->replayCapacityFrames) * kChannels, 0.0f);

#if defined(_WIN32)
        ma_device_config config = ma_device_config_init(ma_device_type_loopback);
        config.capture.format = ma_format_f32;
        config.capture.channels = kChannels;
        config.sampleRate = kSampleRate;
        config.periodSizeInFrames = 256;
        config.dataCallback = Impl::Session::dataCallback;
        config.pUserData = session.get();
#else
        const auto monitor = monitorSourceName();
        if (!monitor)
        {
            Fancy::fancy.logTime().failure()
                << "Recorder: no monitor source available for Instant Replay" << std::endl;
            return false;
        }
        ma_device_config config = ma_device_config_init(ma_device_type_capture);
        config.capture.format = ma_format_f32;
        config.capture.channels = kChannels;
        config.sampleRate = kSampleRate;
        config.periodSizeInFrames = 256;
        config.dataCallback = Impl::Session::dataCallback;
        config.pUserData = session.get();

        ma_device_id deviceId{};
        ma_context context;
        if (ma_context_init(nullptr, 0, nullptr, &context) == MA_SUCCESS)
        {
            ma_device_info *infos = nullptr;
            ma_uint32 count = 0;
            if (ma_context_get_devices(&context, nullptr, nullptr, &infos, &count) == MA_SUCCESS)
            {
                for (ma_uint32 index = 0; index < count; index++)
                {
                    if (monitor == infos[index].name)
                    {
                        deviceId = infos[index].id;
                        config.capture.pDeviceID = &deviceId;
                        break;
                    }
                }
            }
            ma_context_uninit(&context);
        }
#endif

        if (ma_device_init(nullptr, &config, &session->device) != MA_SUCCESS)
        {
            Fancy::fancy.logTime().failure() << "Recorder: failed to start the Instant Replay capture" << std::endl;
            return false;
        }
        session->deviceRunning = true;

        if (ma_device_start(&session->device) != MA_SUCCESS)
        {
            ma_device_uninit(&session->device);
            session->deviceRunning = false;
            Fancy::fancy.logTime().failure() << "Recorder: failed to start the Instant Replay capture" << std::endl;
            return false;
        }

        session->writerRunning.store(true);
        session->writerThread = std::thread([raw = session.get()] { raw->writerRun(); });

        impl->activeSession = std::move(session);
        impl->replayArmed = true;
        return true;
    }

    void Recorder::disarmInstantReplay()
    {
        std::scoped_lock lock(impl->sessionMutex);
        impl->replayArmed = false;

        if (!impl->activeSession)
        {
            return;
        }

        if (impl->activeSession->replayOnly)
        {
            std::optional<std::string> ignored;
            impl->stopSessionLocked(std::nullopt, ignored, false);
        }
        else
        {
            std::scoped_lock replayLock(impl->activeSession->replayMutex);
            impl->activeSession->replayEnabled = false;
        }
    }

    bool Recorder::instantReplayArmed() const
    {
        std::scoped_lock lock(impl->sessionMutex);
        return impl->replayArmed && impl->activeSession != nullptr;
    }

    std::optional<std::string> Recorder::saveInstantReplay(const std::optional<std::string> &desiredName)
    {
        std::scoped_lock lock(impl->sessionMutex);
        if (!impl->activeSession)
        {
            return std::nullopt;
        }

        auto &session = *impl->activeSession;
        std::vector<float> tail;
        std::uint64_t tailFrames = 0;
        {
            std::scoped_lock replayLock(session.replayMutex);
            if (!session.replayEnabled || session.replayCapacityFrames == 0 || session.replayTotalFrames == 0)
            {
                return std::nullopt;
            }

            tailFrames = std::min<std::uint64_t>(session.replayTotalFrames, session.replayCapacityFrames);
            tail.resize(static_cast<std::size_t>(tailFrames) * kChannels);

            const std::uint64_t start = (session.replayTotalFrames - tailFrames) % session.replayCapacityFrames;
            const float *source = session.replayBuffer.data();
            const std::size_t capacitySamples =
                static_cast<std::size_t>(session.replayCapacityFrames) * kChannels;

            std::size_t remaining = static_cast<std::size_t>(tailFrames);
            std::uint64_t position = start;
            std::size_t offset = 0;
            while (remaining > 0)
            {
                const std::size_t chunk = std::min<std::size_t>(
                    remaining, static_cast<std::size_t>(session.replayCapacityFrames) - static_cast<std::size_t>(position));
                std::memcpy(tail.data() + offset * kChannels,
                            source + static_cast<std::size_t>(position) * kChannels,
                            chunk * kChannels * sizeof(float));
                offset += chunk;
                position = (position + chunk) % session.replayCapacityFrames;
                remaining -= chunk;
            }
            (void)capacitySamples;
        }

        std::string name = desiredName ? sanitizeFileName(*desiredName) : "";
        if (name.empty())
        {
            name = timestampedName("Instant Replay");
        }

        std::error_code ec;
        std::filesystem::create_directories(recordingsDirectory(), ec);
        const auto destination = uniquePath(recordingsDirectory(), name);

        //* Write the tail as a 16-bit WAV through the shared writer.
        WavWriter writer;
        if (!writer.open(destination, kSampleRate, kChannels))
        {
            return std::nullopt;
        }

        std::vector<std::int16_t> pcm;
        floatToInt16(tail.data(), tail.size(), pcm);
        writer.append(pcm.data(), pcm.size());
        writer.close();

        return destination.u8string();
    }

    bool Recorder::trimAudioFile(const std::string &src, const std::string &dst, std::uint64_t startMs,
                                 std::uint64_t endMs)
    {
        ma_decoder decoder;
        if (!initDecoder(src, decoder))
        {
            Fancy::fancy.logTime().failure() << "Trim: failed to open '" << src << "'" << std::endl;
            return false;
        }

        ma_uint64 totalFrames = 0;
        ma_decoder_get_length_in_pcm_frames(&decoder, &totalFrames);

        const auto frameOf = [](std::uint64_t ms) -> std::uint64_t {
            return ms * kSampleRate / 1000ull;
        };

        std::uint64_t startFrame = frameOf(startMs);
        std::uint64_t endFrame = totalFrames;
        if (endMs > 0)
        {
            endFrame = std::min<std::uint64_t>(totalFrames, frameOf(endMs));
        }
        if (endFrame <= startFrame || totalFrames == 0)
        {
            ma_decoder_uninit(&decoder);
            Fancy::fancy.logTime().warning() << "Trim: invalid range requested" << std::endl;
            return false;
        }

        if (ma_decoder_seek_to_pcm_frame(&decoder, startFrame) != MA_SUCCESS)
        {
            ma_decoder_uninit(&decoder);
            Fancy::fancy.logTime().failure() << "Trim: failed to seek" << std::endl;
            return false;
        }

        std::filesystem::path destination(dst);
        std::error_code ec;
        std::filesystem::create_directories(destination.parent_path(), ec);

        WavWriter writer;
        if (!writer.open(destination, kSampleRate, kChannels))
        {
            ma_decoder_uninit(&decoder);
            return false;
        }

        std::vector<float> chunk(kChannels * 4096);
        std::vector<std::int16_t> pcm;
        std::uint64_t remaining = endFrame - startFrame;
        while (remaining > 0)
        {
            const std::size_t request = static_cast<std::size_t>(std::min<std::uint64_t>(remaining, 4096));
            ma_uint64 read = 0;
            if (ma_decoder_read_pcm_frames(&decoder, chunk.data(), static_cast<ma_uint64>(request), &read) !=
                    MA_SUCCESS ||
                read == 0)
            {
                break;
            }
            floatToInt16(chunk.data(), static_cast<std::size_t>(read) * kChannels, pcm);
            writer.append(pcm.data(), pcm.size());
            remaining -= read;
        }

        ma_decoder_uninit(&decoder);
        writer.close();
        return true;
    }

    std::optional<Recorder::Waveform> Recorder::waveformPeaks(const std::string &path, std::size_t buckets)
    {
        if (buckets == 0)
        {
            buckets = 1;
        }

        ma_decoder decoder;
        if (!initDecoder(path, decoder))
        {
            return std::nullopt;
        }

        Waveform result;
        result.durationMs = 0;

        ma_uint64 totalFrames = 0;
        ma_decoder_get_length_in_pcm_frames(&decoder, &totalFrames);
        if (totalFrames == 0)
        {
            ma_decoder_uninit(&decoder);
            result.peaks.assign(buckets * 2, 0.0f);
            return result;
        }

        result.durationMs = totalFrames * 1000ull / kSampleRate;

        std::vector<float> &peaks = result.peaks;
        peaks.assign(buckets * 2, 0.0f);
        const double framesPerBucket = static_cast<double>(totalFrames) / static_cast<double>(buckets);

        std::vector<float> chunk(kChannels * 4096);
        std::uint64_t frameIndex = 0;
        std::size_t currentBucket = 0;

        while (currentBucket < buckets)
        {
            const auto bucketEnd = static_cast<std::uint64_t>(
                static_cast<double>(currentBucket + 1) * framesPerBucket);
            const std::uint64_t limit = std::min<std::uint64_t>(bucketEnd, totalFrames);

            float minimum = 0.0f;
            float maximum = 0.0f;
            while (frameIndex < limit)
            {
                const std::size_t request =
                    static_cast<std::size_t>(std::min<std::uint64_t>(limit - frameIndex, 4096));
                ma_uint64 read = 0;
                if (ma_decoder_read_pcm_frames(&decoder, chunk.data(), static_cast<ma_uint64>(request), &read) !=
                        MA_SUCCESS ||
                    read == 0)
                {
                    frameIndex = limit;
                    break;
                }

                for (ma_uint64 frame = 0; frame < read; frame++)
                {
                    float mono = 0.0f;
                    for (std::uint32_t channel = 0; channel < kChannels; channel++)
                    {
                        mono += chunk[static_cast<std::size_t>(frame) * kChannels + channel];
                    }
                    mono /= static_cast<float>(kChannels);

                    minimum = std::min(minimum, mono);
                    maximum = std::max(maximum, mono);
                }
                frameIndex += read;
            }

            peaks[currentBucket * 2] = minimum;
            peaks[currentBucket * 2 + 1] = maximum;
            currentBucket++;
        }

        ma_decoder_uninit(&decoder);
        return result;
    }
} // namespace Audiopad::Helpers
