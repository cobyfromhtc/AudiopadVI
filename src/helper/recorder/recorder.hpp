#pragma once
#include <atomic>
#include <cstdint>
#include <filesystem>
#include <memory>
#include <optional>
#include <string>
#include <vector>

namespace Audiopad
{
    namespace Helpers
    {
        //* Local audio recorder with integrated editing utilities.
        //*
        //* Two capture sources are supported, both purely local:
        //*   Microphone — the system default (or explicitly named) input device.
        //*   System     — desktop audio: WASAPI loopback on Windows, the default
        //*                sink's monitor source on Linux (PipeWire/PulseAudio).
        //*
        //* Sessions stream 16-bit PCM WAV files incrementally (the RIFF header is
        //* patched on close), so long recordings never accumulate in memory. A
        //* separate always-rolling 30-second ring buffer enables Instant Replay:
        //* arm it once and save the last half minute of desktop audio on demand.
        //*
        //* The class also hosts the standalone editing helpers used by the
        //* in-app trimmer and the waveform preview.
        class Recorder
        {
          public:
            enum class Source
            {
                Microphone,
                System
            };

            struct Status
            {
                bool active = false;
                Source source = Source::Microphone;
                std::uint64_t elapsedMs = 0;
                std::uint32_t sampleRate = 48000;
                std::uint32_t channels = 2;
                std::uint64_t capturedFrames = 0;
            };

            Recorder();
            ~Recorder();

            Recorder(const Recorder &) = delete;
            Recorder &operator=(const Recorder &) = delete;
            Recorder(Recorder &&) = delete;
            Recorder &operator=(Recorder &&) = delete;

            //* Starts a recording session (one at a time). Returns false when the
            //* capture device could not be opened.
            bool start(Source source, const std::optional<std::string> &deviceName = std::nullopt);

            //* Stops the session, finalizes the WAV file and returns its path.
            //* `desiredName` (optional) replaces the timestamped default name.
            std::optional<std::string> stop(const std::optional<std::string> &desiredName = std::nullopt);

            Status status() const;

            //* Whether desktop/system capture is available on this machine
            //* (loopback support / a monitor source).
            static bool systemCaptureAvailable();

            //* --- Instant Replay (rolling 30-second desktop audio buffer) ---
            bool armInstantReplay();
            void disarmInstantReplay();
            bool instantReplayArmed() const;
            std::optional<std::string> saveInstantReplay(const std::optional<std::string> &desiredName = std::nullopt);

            //* Where finished recordings land before being added to a board.
            static std::filesystem::path recordingsDirectory();

            //* --- Standalone editing utilities ---
            //* Writes the [startMs, endMs) section of `src` into a new 16-bit WAV
            //* at `dst` (endMs == 0 means "until the end of the file").
            static bool trimAudioFile(const std::string &src, const std::string &dst, std::uint64_t startMs,
                                      std::uint64_t endMs);

            //* Downsampled waveform preview: min/max pairs (mono-mixed, range
            //* -1..1) plus the clip duration. Empty peaks when the file cannot be
            //* decoded.
            struct Waveform
            {
                std::vector<float> peaks; //* 2 * buckets values (min, max per bucket)
                std::uint64_t durationMs = 0;
            };
            static std::optional<Waveform> waveformPeaks(const std::string &path, std::size_t buckets);

          private:
            struct Impl;
            std::unique_ptr<Impl> impl;
        };
    } // namespace Helpers
} // namespace Audiopad
