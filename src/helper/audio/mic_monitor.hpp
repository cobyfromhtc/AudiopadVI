#pragma once
#include <atomic>
#include <cstdint>
#include <memory>
#include <optional>
#include <string>

namespace Audiopad
{
    namespace Audio
    {
        //* Live microphone monitor with original, local voice-filter presets.
        //*
        //* Pipeline: capture device (microphone) -> preset DSP -> one or two
        //* playback devices (local monitor so the user hears themselves, plus the
        //* "target" endpoint that other applications listen on — a virtual cable /
        //* null sink). Everything runs on local hardware through miniaudio; there
        //* are no external services or licensed voice packs.
        //*
        //* The DSP presets are deliberately simple, original chains:
        //*   Off   — clean passthrough
        //*   Deep  — granular pitch shifter (ratio 0.80)
        //*   High  — granular pitch shifter (ratio 1.25)
        //*   Echo  — 300 ms feedback delay blended over the dry signal
        //*   Robot — 50 Hz ring modulation with a hint of the dry signal
        class MicMonitor
        {
          public:
            enum class Preset
            {
                Off = 0,
                Deep,
                High,
                Echo,
                Robot
            };

            struct Config
            {
                //* Explicit capture device name (nullopt = system default input).
                std::optional<std::string> captureDevice;
                //* Local monitor endpoint (nullopt = system default output). Only
                //* used while monitorEnabled is true.
                std::optional<std::string> monitorDevice;
                //* Remote endpoint other applications listen on (virtual cable,
                //* null sink). Always fed while the monitor runs.
                std::optional<std::string> targetDevice;
            };

            MicMonitor();
            ~MicMonitor();

            MicMonitor(const MicMonitor &) = delete;
            MicMonitor &operator=(const MicMonitor &) = delete;
            MicMonitor(MicMonitor &&) = delete;
            MicMonitor &operator=(MicMonitor &&) = delete;

            //* Starts capture with the current configuration. Returns false when
            //* the capture device could not be opened (already running => true).
            bool start(const Config &config);

            //* Stops capture and all playback streams.
            void stop();

            bool isActive() const;

            void setPreset(Preset preset);
            Preset preset() const;

            static const char *presetName(Preset preset);

            //* Parses "off" / "deep" / "high" / "echo" / "robot" (case-insensitive).
            static std::optional<Preset> presetFromString(const std::string &name);

            //* Toggles the local monitor stream at runtime (the target stream, when
            //* configured, keeps running so the selected voice stays audible to
            //* other applications).
            void setMonitorEnabled(bool enabled);
            bool monitorEnabled() const;

          private:
            struct Impl;
            std::unique_ptr<Impl> impl;
        };
    } // namespace Audio
} // namespace Audiopad
