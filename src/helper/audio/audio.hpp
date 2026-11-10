#pragma once
#include <atomic>
#include <core/objects/objects.hpp>
#include <cstdint>
#include <map>
#include <memory>
#include <miniaudio.h>
#include <mutex>
#include <optional>
#include <string>
#include <var_guard.hpp>

#include <helper/audio/engine.hpp>

namespace Audiopad
{
    namespace Objects
    {
        struct AudioDevice
        {
            ma_device_info raw;
            std::string name;
            bool isDefault;
        };
        struct PlayingSound
        {
            AudioDevice playbackDevice;

            //* Stream role: remote streams feed the configured output devices (what
            //* everybody else hears, e.g. a VB-Cable), local monitor streams feed the
            //* user's own listening device. Decouples the role from "plays on the
            //* system default device" — with a VB-Cable set as Windows default the
            //* local monitor has to run on an explicit (non-default) device.
            bool isRemote = false;
            //* Only one of the paired streams reports progress to the UI, otherwise
            //* the dock would receive duplicate updates for the same sound.
            bool reportsProgress = false;

            struct
            {
                //* Sound boost gain (>= 1) applied while mixing. Held via shared_ptr so
                //* every copy of this PlayingSound shares the same value with the
                //* engine voice the callback mixes — the UI thread can store() it live,
                //* the audio callback load()s it.
                std::shared_ptr<std::atomic<float>> boostFactor;
            } raw;

            std::uint64_t length = 0;
            std::uint64_t lengthInMs = 0;
            std::uint64_t readFrames = 0;
            std::uint64_t sampleRate = 0;

            std::atomic<bool> paused = false;
            std::atomic<bool> repeat = false;
            std::atomic<std::uint64_t> readInMs = 0;

            //* Transient playback-policy bookkeeping (never serialized): which
            //* policies this stream instance participates in, used by the teardown
            //* funnel in Window::onSoundFinished to restore state.
            bool mutedOthersBy = false;     //* temporarily silenced by another clip's "mute others"
            bool voiceMuteRequested = false; //* this instance requested microphone muting

            Sound sound;
            std::uint32_t id;

            PlayingSound() = default;
            PlayingSound(const PlayingSound &);
            PlayingSound &operator=(const PlayingSound &other);
        };
        class Audio
        {
            sxl::var_guard<std::map<std::uint32_t, std::shared_ptr<PlayingSound>>, std::recursive_mutex> playingSounds;

            //* Mixing engine: one reused device per endpoint, preallocated voices,
            //* producer-side decoding, atomic progress snapshots.
            std::unique_ptr<::Audiopad::Audio::AudioEngine> engine;

            void finishSound(const std::uint32_t &);      //* queue thread: natural completion
            void progressSound(const std::uint32_t &, std::uint64_t); //* publisher thread

            static ::Audiopad::Audio::EngineConfig engineConfigFromEnvironment();

          public:
            std::optional<PlayingSound> pause(const std::uint32_t &);
            std::optional<PlayingSound> resume(const std::uint32_t &);
            std::optional<PlayingSound> repeat(const std::uint32_t &, bool);
            std::optional<PlayingSound> seek(const std::uint32_t &, std::uint64_t);
            //* \param playbackDevice Explicit render device; nullopt plays on the system default.
            //* \param isRemoteStream Role of the stream: remote = feeds other listeners
            //* (remote volume), local = the user's own monitor (local volume).
            //* \param reportsProgress Whether this stream emits progress/seek updates
            //* to the UI — exactly one stream of a local/remote pair should report.
            std::optional<PlayingSound> play(const Objects::Sound &, const std::optional<AudioDevice> & = std::nullopt,
                                             bool isRemoteStream = false, bool reportsProgress = false);

            //* Combined amplification factor (global settings boost * tab boost) for the given sound.
            static float getBoostFactor(const std::uint32_t &soundId);

            //* Live volume update (0..100) for a playing stream — replaces direct
            //* masterVolumeFactor pokes on per-sound devices.
            bool setVolume(const std::uint32_t &playingId, int volumePercent);

            //* Marks the stored PlayingSound with the transient playback-policy
            //* flags so the natural-completion / stop funnel can restore state
            //* ("mute others" victims and per-sound microphone muting).
            void setPlayingPolicyFlags(const std::uint32_t &playingId, bool mutedByOthers, bool voiceMuteRequested);

            std::vector<AudioDevice> getAudioDevices();
            std::vector<Objects::PlayingSound> getPlayingSounds();

#if defined(_WIN32)
            std::optional<AudioDevice> getAudioDevice(const std::string &);
#endif

            void setup();
            void destroy();

            void stopAll();
            bool stop(const std::uint32_t &);

#if defined(__linux__)
            std::optional<AudioDevice> nullSink;
#endif
            AudioDevice defaultPlayback;
        };
    } // namespace Objects
} // namespace Audiopad
