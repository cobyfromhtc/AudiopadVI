#pragma once
#include <atomic>
#include <condition_variable>
#include <cstdint>
#include <functional>
#include <map>
#include <memory>
#include <miniaudio.h>
#include <mutex>
#include <optional>
#include <string>
#include <thread>
#include <vector>

#include <helper/audio/pcm_ring.hpp>

namespace Audiopad
{
    namespace Audio
    {
        //* A preallocated mixing slot inside an endpoint stream. All fields shared
        //* with the audio callback are atomics; everything else has a single owner
        //* (claim thread / producer thread / publisher thread) and is published via
        //* the `state` transitions.
        struct Voice
        {
            enum class State : std::int8_t
            {
                Inactive = 0, //* free slot, nobody references it
                Claimed,     //* reserved by play(); initialization in flight — producer and callback must not touch it (its command flags are already cleared)
                Filling,     //* published: producer is prefilling — callback must not mix it yet
                Playing,     //* audible: the callback mixes it
                Seeking,     //* producer reconfigures the source; callback must not touch it
                Drained      //* consumed the final frame; completion pending
            };

            //* --- callback / producer handshake (seq_cst — see engine.cpp) ---
            std::atomic<State> state{State::Inactive};
            std::atomic<std::uint32_t> inUse{0};      //* >0 while the callback is inside this voice
            std::atomic<bool> paused{false};
            std::atomic<bool> repeat{false};
            std::atomic<bool> stopRequested{false};   //* free the slot (user stop / shutdown)
            std::atomic<bool> producerDone{false};    //* source at EOF, ring holds the tail
            std::atomic<bool> wrapping{false};        //* repeat wrap in progress (tail drained / ring reset) — the callback must not count the gap as an underrun
            std::atomic<std::uint64_t> playedFrames{0};
            std::atomic<std::uint32_t> seekSeq{0};    //* bumped by control threads to request a seek
            std::atomic<std::uint32_t> seekAckSeq{0}; //* producer-observed seekSeq
            std::atomic<std::uint64_t> seekTargetFrames{0};
            std::atomic<std::uint32_t> lastPublishedMs{0xffffffffu}; //* publisher dedupe seed; 0xffffffff = "never published". Atomic: the publisher updates it while play() resets it on slot reuse
            std::atomic<float> volumeFactor{1.0f};    //* 0..1 attenuation (custom/local or remote volume)
            std::shared_ptr<std::atomic<float>> boostFactor; //* >=1 amplification, live-updatable by the UI

            //* --- immutable while active (published by the Filling transition) ---
            std::uint32_t id = 0;          //* PlayingSound id assigned by the facade
            std::atomic<std::uint32_t> generation{0}; //* bumped on every reuse of this slot
            bool reportsProgress = false;
            std::uint64_t lengthFrames = 0;
            std::uint64_t lengthInMs = 0;
            std::uint32_t sampleRate = 0;

            //* --- producer-owned ---
            PcmRing ring;
            std::unique_ptr<ma_decoder> decoder;               //* null when replaying from the clip cache
            std::shared_ptr<const std::vector<float>> cached; //* decoded PCM from the clip cache
            std::vector<float> capture;                        //* accumulates decoded PCM for the cache
            std::uint64_t sourceFrame = 0;                     //* read position of the next produced frame
            std::string path;
            bool cacheEligible = false;
            bool loopPending = false; //* producer wants to rewind for repeat (needs consumer lockout)
        };

        class AudioEngine; //* Stream needs a back-reference for callback stats

        //* One output stream per endpoint device. Created once, then reused for
        //* every clip: the ma_device (and its thread) stays alive, voices are
        //* preallocated slots that are claimed per play and freed on drain.
        struct Stream
        {
            std::string deviceName;
            AudioEngine *engine = nullptr; //* callback → stats back-reference
            std::unique_ptr<ma_device> device;
            std::uint32_t sampleRate = 48000;
            std::uint32_t channels = 2;
            std::vector<std::unique_ptr<Voice>> voices;
        };

        struct EngineEvents
        {
            //* Natural playback completion: every frame of the clip has been
            //* consumed by the device callback. Invoked from the producer thread.
            std::function<void(std::uint32_t id)> onFinished;
            //* Progress update (ms inside the clip) at a bounded rate. Invoked from
            //* the publisher thread — never from the audio callback.
            std::function<void(std::uint32_t id, std::uint64_t ms)> onProgress;
            //* Diagnostics (device period reports, cache events...).
            std::function<void(const std::string &message)> onLog;
        };

        struct EngineConfig
        {
            std::uint32_t periodMs = 10;             //* requested device period (see AUDIOPAD_PERIOD_MS)
            std::uint32_t ringMs = 512;              //* per-voice PCM buffer depth
            std::uint32_t maxVoicesPerStream = 32;   //* preallocated clip voices per endpoint
            std::size_t clipCacheBytes = 64ull << 20; //* decoded-PCM cache budget (0 disables)
            std::uint32_t progressHz = 30;           //* progress publisher rate
            bool useNullBackend = false;             //* tests / benchmarking without audio hardware
        };

        struct VoiceInfo
        {
            std::uint64_t lengthFrames = 0;
            std::uint64_t lengthInMs = 0;
            std::uint32_t sampleRate = 0;
            std::uint32_t channels = 0;
        };

        struct EngineStats
        {
            std::atomic<std::uint64_t> underrunFrames{0}; //* frames the callback wanted but the ring lacked
            std::atomic<std::uint64_t> underruns{0};      //* callback passes with an empty ring mid-playback
            std::atomic<std::uint64_t> callbacks{0};
            std::atomic<std::uint64_t> worstCallbackNs{0};
            std::atomic<std::uint64_t> mixedFrames{0};    //* frames handed to the device (latency probing)
            std::atomic<std::uint64_t> voicesReused{0};   //* slot reclaims (device/decoder reuse counters)
        };

        struct StreamReport
        {
            std::string deviceName;
            std::uint32_t sampleRate = 0;
            std::uint32_t channels = 0;
            std::uint32_t periodFrames = 0;      //* actual period the backend granted
            std::uint32_t internalPeriods = 0;
            std::uint32_t bufferSizeFrames = 0;
        };

        //* Thread-safe mixing engine. Owns one device per endpoint, a producer
        //* thread doing all file I/O / seeking / loop preparation into bounded
        //* per-voice ring buffers, and a publisher thread turning atomic position
        //* snapshots into bounded-rate progress events. The device callback only
        //* mixes floats and publishes two-word completion messages — no locks, no
        //* allocation, no decoder or UI work.
        class AudioEngine
        {
          public:
            AudioEngine(EngineEvents events, EngineConfig config = {});
            ~AudioEngine();

            AudioEngine(const AudioEngine &) = delete;
            AudioEngine &operator=(const AudioEngine &) = delete;

            //* Starts `path` on the endpoint (`deviceId == nullptr` selects the
            //* system default). Blocks on the first play per endpoint (device
            //* initialization) and on a cache miss for that clip (decoder open);
            //* warm endpoints with cached clips start without any I/O. Returns the
            //* clip metrics needed by the UI (length) or nullopt on failure.
            std::optional<VoiceInfo> play(std::uint32_t id, const std::string &path, const ma_device_id *deviceId,
                                          const std::string &deviceName, float volumePercent,
                                          std::shared_ptr<std::atomic<float>> boostFactor, bool startPaused,
                                          bool reportsProgress);

            bool pause(std::uint32_t id);
            bool resume(std::uint32_t id);
            bool setRepeat(std::uint32_t id, bool shouldRepeat);
            bool seek(std::uint32_t id, std::uint64_t frame);
            bool setVolume(std::uint32_t id, float volumePercent);
            //* Frees the voice asynchronously; no onFinished event is emitted.
            bool stop(std::uint32_t id);
            void stopAll();

            struct Snapshot
            {
                std::uint64_t playedFrames = 0;
                std::uint64_t lengthFrames = 0;
                bool paused = false;
                bool repeat = false;
            };
            std::optional<Snapshot> snapshot(std::uint32_t id) const;

            const EngineStats &stats() const
            {
                return stats_;
            }
            std::vector<StreamReport> describeStreams() const;
            std::size_t activeVoiceCount() const;

          private:
            struct VoiceRef
            {
                Stream *stream = nullptr;
                Voice *voice = nullptr;
                std::uint32_t generation = 0;

                //* Copied at registration (after publication). The progress
                //* publisher works from these so it never reads live plain
                //* fields of a slot that may already have been reclaimed for a
                //* new sound — TSan-verified requirement.
                std::uint32_t id = 0;
                bool reportsProgress = false;
                std::uint64_t lengthFrames = 0;
                std::uint64_t lengthInMs = 0;
                std::uint32_t sampleRate = 0;
            };

            Stream *getOrCreateStream(const ma_device_id *deviceId, const std::string &deviceName);
            Voice *claimVoice(Stream &stream);
            void releaseVoice(Voice &voice); //* producer context: full slot teardown
            bool tryLockOutConsumer(Voice &voice);
            void producerRun();
            void publisherRun();
            void serviceVoices();
            void serviceVoice(Stream &stream, Voice &voice);
            void fillVoice(Voice &voice);
            void handleSourceEof(Voice &voice);
            void repositionSource(Voice &voice, std::uint64_t frame);
            void commitCaptureToCache(Voice &voice);
            void teardownStream(Stream &stream);
            std::optional<VoiceRef> findVoice(std::uint32_t id) const;
            void wakeProducer();

            static void dataCallback(ma_device *device, void *output, const void *input, ma_uint32 frameCount);

            EngineEvents events;
            EngineConfig config;
            EngineStats stats_;

            mutable std::mutex streamsMutex;
            std::map<std::string, std::unique_ptr<Stream>> streams;

            mutable std::mutex registryMutex;
            std::map<std::uint32_t, VoiceRef> registry;

            //* Serializes slot claiming between concurrent play() calls (webview
            //* thread, hotkey thread) — guarantees a freshly released slot is only
            //* handed out once and fully initialized before publication.
            std::mutex claimMutex;

            //* clip cache (path|rate|channels -> decoded PCM)
            struct CacheEntry
            {
                std::shared_ptr<const std::vector<float>> pcm;
                std::uint64_t lastUsed = 0;
            };
            mutable std::mutex cacheMutex;
            std::map<std::string, CacheEntry> cache;
            std::map<std::string, std::uint32_t> playCounts;
            std::size_t cacheBytes = 0;

            std::thread producer;
            std::thread publisher;
            std::mutex producerMutex;
            std::condition_variable producerCv;
            bool producerWorkPending = false;
            std::atomic<bool> shuttingDown{false};

            std::vector<float> scratch; //* producer-side decode staging buffer

            bool nullContextInitialized = false;
            ma_context nullContext{};
        };
    } // namespace Audio
} // namespace Audiopad
