#include "engine.hpp"
#include <algorithm>
#include <chrono>
#include <cstring>

#if defined(_WIN32)
#include <helper/misc/misc.hpp>
#endif

#define MINIAUDIO_IMPLEMENTATION
#include <miniaudio.h>

namespace Audiopad
{
    namespace Audio
    {
        namespace
        {
            //* Producer fill granularity: bounds the staging buffer and keeps the
            //* producer responsive between voices.
            constexpr std::uint32_t kDecodeChunkFrames = 4096;

            //* Prefill target before a voice is published to the callback. With the
            //* default 512 ms ring this leaves another 256 ms of headroom for
            //* decoder hiccups while the producer tops the ring back up.
            std::size_t prefillTargetFrames(const Voice &voice)
            {
                return voice.ring.capacity() / 2;
            }

            std::uint64_t nowNanoseconds()
            {
                return static_cast<std::uint64_t>(
                    std::chrono::duration_cast<std::chrono::nanoseconds>(
                        std::chrono::steady_clock::now().time_since_epoch())
                        .count());
            }

            std::string cacheKey(const std::string &path, std::uint32_t sampleRate, std::uint32_t channels)
            {
                return path + "|" + std::to_string(sampleRate) + "|" + std::to_string(channels);
            }

            bool initDecoderFor(const std::string &path, ma_format format, std::uint32_t channels, std::uint32_t sampleRate,
                                ma_decoder &decoder)
            {
                const auto decoderConfig = ma_decoder_config_init(format, channels, sampleRate);
#if defined(_WIN32)
                const auto result =
                    ma_decoder_init_file_w(Audiopad::Helpers::widen(path).c_str(), &decoderConfig, &decoder);
#else
                const auto result = ma_decoder_init_file(path.c_str(), &decoderConfig, &decoder);
#endif
                return result == MA_SUCCESS;
            }
        } // namespace

        AudioEngine::AudioEngine(EngineEvents events, EngineConfig config) : events(std::move(events)), config(config)
        {
            scratch.resize(static_cast<std::size_t>(kDecodeChunkFrames) * 8);

            if (config.useNullBackend)
            {
                ma_backend backends[] = {ma_backend_null};
                if (ma_context_init(backends, 1, nullptr, &nullContext) == MA_SUCCESS)
                {
                    nullContextInitialized = true;
                }
            }

            producer = std::thread([this] { producerRun(); });
            publisher = std::thread([this] { publisherRun(); });
        }

        AudioEngine::~AudioEngine()
        {
            shuttingDown.store(true, std::memory_order_seq_cst);
            wakeProducer();
            if (producer.joinable())
            {
                producer.join();
            }
            if (publisher.joinable())
            {
                publisher.join();
            }

            //* Callbacks have ceased once every device is uninitialized — after
            //* that the voice state can be torn down without handshakes.
            {
                std::lock_guard<std::mutex> lock(streamsMutex);
                for (auto &pair : streams)
                {
                    teardownStream(*pair.second);
                }
                streams.clear();
            }

            if (nullContextInitialized)
            {
                ma_context_uninit(&nullContext);
            }
        }

        void AudioEngine::teardownStream(Stream &stream)
        {
            if (stream.device)
            {
                ma_device_uninit(stream.device.get());
                stream.device.reset();
            }
            for (auto &voice : stream.voices)
            {
                voice->decoder.reset();
                voice->cached.reset();
                voice->capture.clear();
                voice->capture.shrink_to_fit();
                voice->state.store(Voice::State::Inactive, std::memory_order_seq_cst);
            }
        }

        //* ------------------------------------------------------------------ *
        //*  Control API (any thread)
        //* ------------------------------------------------------------------ *

        std::optional<AudioEngine::VoiceRef> AudioEngine::findVoice(std::uint32_t id) const
        {
            std::lock_guard<std::mutex> lock(registryMutex);
            auto it = registry.find(id);
            if (it == registry.end())
            {
                return std::nullopt;
            }
            return it->second;
        }

        Stream *AudioEngine::getOrCreateStream(const ma_device_id *deviceId, const std::string &deviceName)
        {
            {
                std::lock_guard<std::mutex> lock(streamsMutex);
                auto it = streams.find(deviceName);
                if (it != streams.end())
                {
                    Stream &existing = *it->second;
                    if (existing.device && ma_device_get_state(existing.device.get()) == ma_device_state_started)
                    {
                        return &existing; //* warm reuse
                    }

                    //* The device died (unplugged endpoint, backend error). Restart it
                    //* in place — the stream object, its voices and their ring buffers
                    //* stay alive, so the producer thread can keep servicing them
                    //* without any teardown race. (A full rebuild would need to
                    //* synchronize with the producer; restart-in-place does not.)
                    if (existing.device && ma_device_start(existing.device.get()) == MA_SUCCESS)
                    {
                        if (events.onLog)
                        {
                            events.onLog("Audio stream '" + deviceName + "' recovered after restart");
                        }
                        return &existing;
                    }

                    if (events.onLog)
                    {
                        events.onLog("Audio stream '" + deviceName + "' is not running and could not be restarted");
                    }
                    return nullptr;
                }
            }

            //* Device initialization happens outside the lock: it can take tens of
            //* milliseconds and must not stall the producer servicing other streams.
            auto stream = std::make_unique<Stream>();
            stream->deviceName = deviceName;
            stream->engine = this;
            stream->device = std::make_unique<ma_device>();

            auto deviceConfig = ma_device_config_init(ma_device_type_playback);
            deviceConfig.playback.format = ma_format_f32; //* common float mixing format
            deviceConfig.playback.channels = 0;           //* endpoint native channel count
            deviceConfig.sampleRate = 0;                  //* endpoint native rate
            deviceConfig.periodSizeInMilliseconds = config.periodMs;
            deviceConfig.dataCallback = &AudioEngine::dataCallback;
            deviceConfig.pUserData = stream.get();
            if (deviceId != nullptr)
            {
                deviceConfig.playback.pDeviceID = deviceId;
            }

            ma_context *context = nullContextInitialized ? &nullContext : nullptr;
            if (ma_device_init(context, &deviceConfig, stream->device.get()) != MA_SUCCESS)
            {
                return nullptr;
            }

            stream->sampleRate = stream->device->sampleRate != 0 ? stream->device->sampleRate : 48000;
            stream->channels = stream->device->playback.channels != 0 ? stream->device->playback.channels : 2;

            const std::size_t ringFrames =
                (static_cast<std::size_t>(stream->sampleRate) * config.ringMs + 999) / 1000;
            stream->voices.reserve(config.maxVoicesPerStream);
            for (std::uint32_t i = 0; i < config.maxVoicesPerStream; ++i)
            {
                auto voice = std::make_unique<Voice>();
                //* Preallocate every voice's ring now — play() never allocates.
                voice->ring.reset(ringFrames, stream->channels);
                stream->voices.emplace_back(std::move(voice));
            }

            if (events.onLog)
            {
                events.onLog("Audio stream '" + deviceName + "' opened: " + std::to_string(stream->sampleRate) +
                             " Hz, " + std::to_string(stream->channels) + " ch, period " +
                             std::to_string(stream->device->playback.internalPeriodSizeInFrames) + " frames (" +
                             std::to_string(stream->device->playback.internalPeriodSizeInFrames * 1000 /
                                            stream->sampleRate) +
                             " ms actual, " + std::to_string(config.periodMs) + " ms requested)");
            }

            Stream *raw = stream.get();
            {
                std::lock_guard<std::mutex> lock(streamsMutex);
                const auto result = streams.emplace(deviceName, std::move(stream));
                if (!result.second)
                {
                    //* Another thread created the same endpoint concurrently — keep
                    //* the existing stream and discard our duplicate device.
                    teardownStream(*raw);
                    return result.first->second.get();
                }
            }

            //* The stream (including pUserData and every preallocated voice) is
            //* fully initialized BEFORE the device starts — an early callback can
            //* never observe partial state.
            if (ma_device_start(raw->device.get()) != MA_SUCCESS)
            {
                if (events.onLog)
                {
                    events.onLog("Failed to start audio stream '" + deviceName + "'");
                }
                std::lock_guard<std::mutex> lock(streamsMutex);
                const auto it = streams.find(deviceName);
                if (it != streams.end() && it->second.get() == raw)
                {
                    teardownStream(*raw);
                    streams.erase(it);
                }
                else
                {
                    teardownStream(*raw);
                }
                return nullptr;
            }

            return raw;
        }

        Voice *AudioEngine::claimVoice(Stream &stream)
        {
            for (auto &voice : stream.voices)
            {
                Voice *candidate = voice.get();
                if (candidate->state.load(std::memory_order_acquire) != Voice::State::Inactive)
                {
                    continue;
                }

                //* Clear every command flag the producer consults BEFORE the Claimed
                //* publication — a stale stop/seek/loop from the slot's previous
                //* life would let the producer tear the voice down while the
                //* caller's initialization is still writing plain fields. An
                //* Inactive slot is untouchable, so these writes race nobody.
                candidate->stopRequested.store(false, std::memory_order_relaxed);
                candidate->seekSeq.store(0, std::memory_order_relaxed);
                candidate->seekAckSeq.store(0, std::memory_order_relaxed);
                candidate->loopPending = false;

                //* Reserve the slot in the same breath. Without the Claimed
                //* transition a second play() could scan the same "Inactive"
                //* slot between this claim and the Filling publication in play()
                //* and hand it out twice (TSan-verified race). The acquire on the
                //* scan paired with this seq_cst store guarantees every flag
                //* above is visible to whoever now sees the slot as Claimed.
                candidate->state.store(Voice::State::Claimed, std::memory_order_seq_cst);
                return candidate;
            }
            return nullptr;
        }

        std::optional<VoiceInfo> AudioEngine::play(std::uint32_t id, const std::string &path,
                                                   const ma_device_id *deviceId, const std::string &deviceName,
                                                   float volumePercent,
                                                   std::shared_ptr<std::atomic<float>> boostFactor, bool startPaused,
                                                   bool reportsProgress)
        {
            Stream *stream = getOrCreateStream(deviceId, deviceName);
            if (stream == nullptr)
            {
                return std::nullopt;
            }

            const std::string key = cacheKey(path, stream->sampleRate, stream->channels);

            std::shared_ptr<const std::vector<float>> cached;
            {
                std::lock_guard<std::mutex> lock(cacheMutex);
                auto countIt = playCounts.find(path);
                const std::uint32_t playCount = countIt == playCounts.end() ? 0 : countIt->second;
                auto it = cache.find(key);
                if (it != cache.end())
                {
                    it->second.lastUsed = nowNanoseconds();
                    cached = it->second.pcm;
                }
                else if (playCount >= 1)
                {
                    //* Second (or later) play of this clip — remember that it is
                    //* frequently triggered so this decode pass gets captured.
                }
            }

            std::unique_ptr<ma_decoder> decoder;
            std::uint64_t lengthFrames = 0;

            if (cached)
            {
                lengthFrames = cached->size() / stream->channels;
            }
            else
            {
                decoder = std::make_unique<ma_decoder>();
                if (!initDecoderFor(path, ma_format_f32, stream->channels, stream->sampleRate, *decoder))
                {
                    decoder.reset();
                    if (events.onLog)
                    {
                        events.onLog("Failed to create decoder for: " + path);
                    }
                    return std::nullopt;
                }

                ma_uint64 frames = 0;
                ma_decoder_get_length_in_pcm_frames(decoder.get(), &frames);
                lengthFrames = frames;
            }

            Voice *voice = nullptr;
            {
                //* Serialize slot claiming between concurrent play() calls — without
                //* this, two threads could pick and publish the same slot.
                std::lock_guard<std::mutex> claimLock(claimMutex);
                voice = claimVoice(*stream);
            }
            if (voice == nullptr)
            {
                if (events.onLog)
                {
                    events.onLog("Too many simultaneous clips on '" + deviceName + "' — dropping playback");
                }
                return std::nullopt;
            }

            std::size_t decodedBytes = static_cast<std::size_t>(lengthFrames) * stream->channels * sizeof(float);
            bool cacheEligible = config.clipCacheBytes > 0 && !cached && decodedBytes > 0 &&
                                 decodedBytes <= config.clipCacheBytes / 2 &&
                                 (decodedBytes <= (2u << 20) || [&] {
                                     std::lock_guard<std::mutex> lock(cacheMutex);
                                     auto countIt = playCounts.find(path);
                                     return countIt != playCounts.end() && countIt->second >= 2;
                                 }());

            //* --- fully initialize the voice before publishing it ---
            voice->generation.fetch_add(1, std::memory_order_relaxed);
            voice->id = id;
            voice->reportsProgress = reportsProgress;
            voice->lengthFrames = lengthFrames;
            voice->lengthInMs = static_cast<std::uint64_t>(
                static_cast<double>(lengthFrames) / static_cast<double>(stream->sampleRate) * 1000.0);
            voice->sampleRate = stream->sampleRate;
            voice->path = path;
            voice->cacheEligible = cacheEligible;
            voice->sourceFrame = 0;
            //* (loopPending was cleared at claim time — rewriting it here would
            //* race the producer's plain read on a Claimed slot.)
            voice->lastPublishedMs.store(0xffffffffu, std::memory_order_relaxed); //* atomic "never published" reset (the publisher may be mid-flight on this slot's previous life)
            voice->capture.clear();
            voice->cached = cached;
            voice->decoder = std::move(decoder);
            voice->ring.clearAll();
            voice->playedFrames.store(0, std::memory_order_relaxed);
            voice->paused.store(startPaused, std::memory_order_relaxed);
            voice->repeat.store(false, std::memory_order_relaxed);
            voice->stopRequested.store(false, std::memory_order_relaxed);
            voice->producerDone.store(false, std::memory_order_relaxed);
            voice->wrapping.store(false, std::memory_order_relaxed);
            voice->seekSeq.store(0, std::memory_order_relaxed);
            voice->seekAckSeq.store(0, std::memory_order_relaxed);
            voice->seekTargetFrames.store(0, std::memory_order_relaxed);
            voice->volumeFactor.store(volumePercent / 100.0f, std::memory_order_relaxed);
            voice->boostFactor = std::move(boostFactor);

            {
                std::lock_guard<std::mutex> lock(cacheMutex);
                playCounts[path] += 1;
            }

            //* Publish FIRST: the callback and producer only act on voices that
            //* left the inactive/claimed states, and every field above was
            //* written before this store.
            voice->state.store(Voice::State::Filling, std::memory_order_seq_cst);
            wakeProducer();

            //* Register only after publication — everything that finds voices
            //* through the registry (stop/seek/pause, the publisher's progress
            //* snapshot) then observes fully initialized plain fields, never a
            //* half-written slot.
            {
                std::lock_guard<std::mutex> lock(registryMutex);
                registry[id] = VoiceRef{stream,
                                       voice,
                                       voice->generation.load(std::memory_order_relaxed),
                                       id,
                                       reportsProgress,
                                       lengthFrames,
                                       voice->lengthInMs,
                                       stream->sampleRate};
            }

            return VoiceInfo{lengthFrames, voice->lengthInMs, stream->sampleRate, stream->channels};
        }

        bool AudioEngine::pause(std::uint32_t id)
        {
            auto ref = findVoice(id);
            if (!ref || ref->voice->generation.load(std::memory_order_relaxed) != ref->generation)
                //* (no live voice->id read here: the registry key is the id, and reading the
                //*  plain field before the generation guard would race a slot reuse — TSan)
            {
                return false;
            }
            ref->voice->paused.store(true, std::memory_order_relaxed);
            return true;
        }

        bool AudioEngine::resume(std::uint32_t id)
        {
            auto ref = findVoice(id);
            if (!ref || ref->voice->generation.load(std::memory_order_relaxed) != ref->generation)
                //* (no live voice->id read here: the registry key is the id, and reading the
                //*  plain field before the generation guard would race a slot reuse — TSan)
            {
                return false;
            }
            ref->voice->paused.store(false, std::memory_order_relaxed);
            return true;
        }

        bool AudioEngine::setRepeat(std::uint32_t id, bool shouldRepeat)
        {
            auto ref = findVoice(id);
            if (!ref || ref->voice->generation.load(std::memory_order_relaxed) != ref->generation)
                //* (no live voice->id read here: the registry key is the id, and reading the
                //*  plain field before the generation guard would race a slot reuse — TSan)
            {
                return false;
            }
            ref->voice->repeat.store(shouldRepeat, std::memory_order_relaxed);
            return true;
        }

        bool AudioEngine::seek(std::uint32_t id, std::uint64_t frame)
        {
            auto ref = findVoice(id);
            if (!ref || ref->voice->generation.load(std::memory_order_relaxed) != ref->generation)
                //* (no live voice->id read here: the registry key is the id, and reading the
                //*  plain field before the generation guard would race a slot reuse — TSan)
            {
                return false;
            }
            Voice &voice = *ref->voice;
            voice.seekTargetFrames.store(frame, std::memory_order_relaxed);
            voice.seekSeq.fetch_add(1, std::memory_order_seq_cst); //* publish the request
            wakeProducer();
            return true;
        }

        bool AudioEngine::setVolume(std::uint32_t id, float volumePercent)
        {
            auto ref = findVoice(id);
            if (!ref || ref->voice->generation.load(std::memory_order_relaxed) != ref->generation)
                //* (no live voice->id read here: the registry key is the id, and reading the
                //*  plain field before the generation guard would race a slot reuse — TSan)
            {
                return false;
            }
            const float factor = volumePercent < 0.f ? 0.f : (volumePercent > 100.f ? 1.f : volumePercent / 100.f);
            ref->voice->volumeFactor.store(factor, std::memory_order_relaxed);
            return true;
        }

        bool AudioEngine::stop(std::uint32_t id)
        {
            auto ref = findVoice(id);
            if (!ref || ref->voice->generation.load(std::memory_order_relaxed) != ref->generation)
                //* (no live voice->id read here: the registry key is the id, and reading the
                //*  plain field before the generation guard would race a slot reuse — TSan)
            {
                return false;
            }
            ref->voice->stopRequested.store(true, std::memory_order_relaxed);
            wakeProducer();
            return true;
        }

        void AudioEngine::stopAll()
        {
            std::vector<VoiceRef> refs;
            {
                std::lock_guard<std::mutex> lock(registryMutex);
                refs.reserve(registry.size());
                for (auto &pair : registry)
                {
                    refs.push_back(pair.second);
                }
            }
            for (auto &ref : refs)
            {
                ref.voice->stopRequested.store(true, std::memory_order_relaxed);
            }
            if (!refs.empty())
            {
                wakeProducer();
            }
        }

        std::optional<AudioEngine::Snapshot> AudioEngine::snapshot(std::uint32_t id) const
        {
            auto ref = findVoice(id);
            if (!ref || ref->voice->generation.load(std::memory_order_relaxed) != ref->generation)
                //* (no live voice->id read here: the registry key is the id, and reading the
                //*  plain field before the generation guard would race a slot reuse — TSan)
            {
                return std::nullopt;
            }
            Voice &voice = *ref->voice;
            return Snapshot{voice.playedFrames.load(std::memory_order_relaxed), voice.lengthFrames,
                            voice.paused.load(std::memory_order_relaxed), voice.repeat.load(std::memory_order_relaxed)};
        }

        std::vector<StreamReport> AudioEngine::describeStreams() const
        {
            std::lock_guard<std::mutex> lock(streamsMutex);
            std::vector<StreamReport> reports;
            reports.reserve(streams.size());
            for (const auto &pair : streams)
            {
                const Stream &stream = *pair.second;
                if (!stream.device)
                {
                    continue;
                }
                reports.push_back(StreamReport{stream.deviceName, stream.sampleRate, stream.channels,
                                               stream.device->playback.internalPeriodSizeInFrames,
                                               stream.device->playback.internalPeriods,
                                               stream.device->playback.internalPeriodSizeInFrames *
                                                   stream.device->playback.internalPeriods});
            }
            return reports;
        }

        std::size_t AudioEngine::activeVoiceCount() const
        {
            std::size_t count = 0;
            std::lock_guard<std::mutex> lock(streamsMutex);
            for (const auto &pair : streams)
            {
                for (const auto &voice : pair.second->voices)
                {
                    const auto state = voice->state.load(std::memory_order_acquire);
                    if (state != Voice::State::Inactive)
                    {
                        ++count;
                    }
                }
            }
            return count;
        }

        void AudioEngine::wakeProducer()
        {
            {
                std::lock_guard<std::mutex> lock(producerMutex);
                producerWorkPending = true;
            }
            producerCv.notify_one();
        }

        //* ------------------------------------------------------------------ *
        //*  Producer thread — all file I/O, seeking and loop preparation
        //* ------------------------------------------------------------------ *

        void AudioEngine::producerRun()
        {
            std::unique_lock<std::mutex> lock(producerMutex);
            while (!shuttingDown.load(std::memory_order_seq_cst))
            {
                producerCv.wait_for(lock, std::chrono::milliseconds(5),
                                    [this] { return producerWorkPending || shuttingDown.load(std::memory_order_seq_cst); });
                producerWorkPending = false;
                lock.unlock();

                serviceVoices();

                lock.lock();
            }
        }

        void AudioEngine::serviceVoices()
        {
            std::vector<Stream *> streamList;
            {
                std::lock_guard<std::mutex> lock(streamsMutex);
                streamList.reserve(streams.size());
                for (auto &pair : streams)
                {
                    streamList.push_back(pair.second.get());
                }
            }

            for (Stream *stream : streamList)
            {
                for (auto &voicePtr : stream->voices)
                {
                    if (shuttingDown.load(std::memory_order_seq_cst))
                    {
                        return;
                    }
                    serviceVoice(*stream, *voicePtr);
                }
            }
        }

        bool AudioEngine::tryLockOutConsumer(Voice &voice)
        {
            //* Seq_cst pairing with the callback's `inUse++; state check; ...; inUse--`
            //* protocol guarantees that once we observe inUse == 0 after storing
            //* Seeking, the callback is outside (and will stay outside of) the ring
            //* until state leaves Seeking. See engine documentation.
            voice.state.store(Voice::State::Seeking, std::memory_order_seq_cst);
            return voice.inUse.load(std::memory_order_seq_cst) == 0;
        }

        void AudioEngine::serviceVoice([[maybe_unused]] Stream &stream, Voice &voice)
        {
            if (voice.state.load(std::memory_order_acquire) == Voice::State::Inactive)
            {
                return;
            }

            if (voice.stopRequested.load(std::memory_order_relaxed))
            {
                if (!tryLockOutConsumer(voice))
                {
                    return; //* retry on the next producer pass
                }
                releaseVoice(voice);
                return;
            }

            const std::uint32_t requestedSeq = voice.seekSeq.load(std::memory_order_acquire);
            if (requestedSeq != voice.seekAckSeq)
            {
                if (!tryLockOutConsumer(voice))
                {
                    return; //* retry on the next producer pass
                }
                const std::uint64_t target = voice.seekTargetFrames.load(std::memory_order_relaxed);
                repositionSource(voice, target);
                voice.ring.clearAll();
                voice.playedFrames.store(target, std::memory_order_relaxed);
                voice.producerDone.store(false, std::memory_order_relaxed);
                voice.seekAckSeq.store(requestedSeq, std::memory_order_release);
                voice.state.store(Voice::State::Filling, std::memory_order_seq_cst);
                //* A seek supersedes a pending repeat wrap: the next cycle starts
                //* from the seek position (a later EOF re-arms the wrap anyway).
                voice.loopPending = false;
                voice.wrapping.store(false, std::memory_order_release);
            }

            if (voice.loopPending)
            {
                //* Wait until the callback consumed the buffered tail before
                //* wrapping: clearing at EOF-detection time would discard up to a
                //* ring's worth of audio and cut every cycle short. Only a fully
                //* drained ring (readable == 0) proves the cycle completed.
                if (voice.ring.readable() > 0)
                {
                    return; //* tail still playing — retry on the next producer pass
                }
                if (!tryLockOutConsumer(voice))
                {
                    return; //* retry on the next producer pass
                }
                voice.loopPending = false;
                repositionSource(voice, 0);
                voice.ring.clearAll();
                voice.playedFrames.store(0, std::memory_order_relaxed);
                voice.producerDone.store(false, std::memory_order_relaxed);
                voice.state.store(Voice::State::Filling, std::memory_order_seq_cst);
                voice.wrapping.store(false, std::memory_order_release); //* next cycle is being prepared
            }

            switch (voice.state.load(std::memory_order_acquire))
            {
                case Voice::State::Filling:
                case Voice::State::Playing:
                    fillVoice(voice);
                    break;
                case Voice::State::Drained:
                {
                    const std::uint32_t finishedId = voice.id;
                    releaseVoice(voice);
                    if (events.onFinished && !shuttingDown.load(std::memory_order_relaxed))
                    {
                        events.onFinished(finishedId); //* small, non-allocating in the callback sense
                    }
                    break;
                }
                default:
                    break;
            }
        }

        void AudioEngine::releaseVoice(Voice &voice)
        {
            {
                std::lock_guard<std::mutex> lock(registryMutex);
                registry.erase(voice.id);
            }
            voice.decoder.reset();
            voice.cached.reset();
            voice.capture.clear();
            voice.capture.shrink_to_fit();
            voice.ring.clearAll();
            voice.boostFactor.reset();
            voice.state.store(Voice::State::Inactive, std::memory_order_seq_cst);
            stats_.voicesReused.fetch_add(1, std::memory_order_relaxed);
        }

        void AudioEngine::repositionSource(Voice &voice, std::uint64_t frame)
        {
            if (frame > voice.lengthFrames)
            {
                frame = voice.lengthFrames;
            }

            if (voice.cached)
            {
                voice.sourceFrame = frame;
                return;
            }

            if (voice.decoder)
            {
                if (ma_decoder_seek_to_pcm_frame(voice.decoder.get(), frame) != MA_SUCCESS)
                {
                    if (events.onLog)
                    {
                        events.onLog("Seek failed inside '" + voice.path + "' — continuing from " +
                                     std::to_string(voice.sourceFrame));
                    }
                    return; //* keep the old position, still consistent
                }
                voice.sourceFrame = frame;
            }

            //* A mid-stream seek invalidates any partially captured cache content.
            voice.capture.clear();
            voice.cacheEligible = false;
        }

        void AudioEngine::fillVoice(Voice &voice)
        {
            const std::size_t highWater = prefillTargetFrames(voice);
            const std::uint32_t channels = voice.ring.channels();

            while (true)
            {
                if (voice.stopRequested.load(std::memory_order_relaxed))
                {
                    return;
                }

                const std::size_t writable = voice.ring.writable();
                if (writable == 0)
                {
                    break;
                }

                if (voice.cached)
                {
                    const std::uint64_t totalFrames = voice.cached->size() / channels;
                    if (voice.sourceFrame >= totalFrames)
                    {
                        handleSourceEof(voice);
                        break;
                    }
                    const std::size_t chunk = std::min<std::size_t>(
                        writable < kDecodeChunkFrames ? writable : kDecodeChunkFrames,
                        static_cast<std::size_t>(totalFrames - voice.sourceFrame));
                    voice.ring.write(voice.cached->data() + static_cast<std::size_t>(voice.sourceFrame) * channels,
                                     chunk);
                    voice.sourceFrame += chunk;
                }
                else if (voice.decoder)
                {
                    const std::size_t chunk = writable < kDecodeChunkFrames ? writable : kDecodeChunkFrames;
                    ma_uint64 readFrames = 0;
                    ma_decoder_read_pcm_frames(voice.decoder.get(), scratch.data(), chunk, &readFrames);
                    if (readFrames == 0)
                    {
                        handleSourceEof(voice);
                        break;
                    }
                    voice.ring.write(scratch.data(), static_cast<std::size_t>(readFrames));
                    if (voice.cacheEligible)
                    {
                        voice.capture.insert(voice.capture.end(), scratch.begin(),
                                             scratch.begin() + static_cast<std::ptrdiff_t>(readFrames * channels));
                    }
                    voice.sourceFrame += readFrames;
                }
                else
                {
                    break;
                }

                if (voice.state.load(std::memory_order_acquire) == Voice::State::Filling &&
                    voice.ring.readable() >= highWater)
                {
                    voice.state.store(Voice::State::Playing, std::memory_order_seq_cst);
                }

                if (voice.ring.readable() >= highWater)
                {
                    break; //* topped up
                }
            }

            //* Short clips reach EOF before the high-water mark — publish them so
            //* the callback can drain and complete them.
            if (voice.state.load(std::memory_order_acquire) == Voice::State::Filling && voice.producerDone.load(std::memory_order_relaxed))
            {
                voice.state.store(Voice::State::Playing, std::memory_order_seq_cst);
            }
        }

        void AudioEngine::handleSourceEof(Voice &voice)
        {
            if (voice.repeat.load(std::memory_order_relaxed))
            {
                //* Loop wrap happens on the producer thread, but only after the
                //* callback drained the ring (see serviceVoice). The callback must
                //* not count the wrap gap as an underrun — flag it here, cleared
                //* when the next cycle has been prepared.
                voice.wrapping.store(true, std::memory_order_release);
                voice.loopPending = true;
                return;
            }

            voice.producerDone.store(true, std::memory_order_release);
            commitCaptureToCache(voice);
        }

        void AudioEngine::commitCaptureToCache(Voice &voice)
        {
            if (!voice.cacheEligible || voice.capture.empty())
            {
                voice.cacheEligible = false;
                return;
            }

            auto pcm = std::make_shared<const std::vector<float>>(std::move(voice.capture));
            voice.capture.clear();
            voice.cacheEligible = false;
            const std::size_t bytes = pcm->size() * sizeof(float);

            std::lock_guard<std::mutex> lock(cacheMutex);
            const std::string key = cacheKey(voice.path, voice.sampleRate, voice.ring.channels());
            auto it = cache.find(key);
            if (it != cache.end())
            {
                return; //* someone else cached it first
            }

            //* Evict least-recently-used entries until the new clip fits the budget.
            while (cacheBytes + bytes > config.clipCacheBytes && !cache.empty())
            {
                auto lru = cache.begin();
                for (auto entry = cache.begin(); entry != cache.end(); ++entry)
                {
                    if (entry->second.lastUsed < lru->second.lastUsed)
                    {
                        lru = entry;
                    }
                }
                cacheBytes -= lru->second.pcm->size() * sizeof(float);
                cache.erase(lru);
            }

            if (cacheBytes + bytes <= config.clipCacheBytes)
            {
                cache.emplace(key, CacheEntry{pcm, nowNanoseconds()});
                cacheBytes += bytes;
                if (events.onLog)
                {
                    events.onLog("Cached clip '" + voice.path + "' (" + std::to_string(bytes / 1024) + " KiB, budget " +
                                 std::to_string(config.clipCacheBytes / 1024) + " KiB)");
                }
            }
        }

        //* ------------------------------------------------------------------ *
        //*  Publisher thread — bounded-rate progress from atomic snapshots
        //* ------------------------------------------------------------------ *

        void AudioEngine::publisherRun()
        {
            const auto interval = std::chrono::milliseconds(1000 / (config.progressHz == 0 ? 1 : config.progressHz));
            while (!shuttingDown.load(std::memory_order_seq_cst))
            {
                std::this_thread::sleep_for(interval);
                if (shuttingDown.load(std::memory_order_seq_cst))
                {
                    break;
                }

                std::vector<VoiceRef> refs;
                {
                    std::lock_guard<std::mutex> lock(registryMutex);
                    refs.reserve(registry.size());
                    for (auto &pair : registry)
                    {
                        refs.push_back(pair.second);
                    }
                }

                for (const auto &ref : refs)
                {
                    Voice &voice = *ref.voice;
                    if (voice.generation.load(std::memory_order_relaxed) != ref.generation)
                    {
                        continue; //* slot was reused for a different sound
                    }
                    if (!ref.reportsProgress)
                    {
                        continue;
                    }

                    const auto state = voice.state.load(std::memory_order_acquire);
                    if (state != Voice::State::Playing && state != Voice::State::Filling &&
                        state != Voice::State::Seeking && state != Voice::State::Drained)
                    {
                        continue;
                    }

                    const std::uint64_t played = voice.playedFrames.load(std::memory_order_relaxed);
                    std::uint64_t ms = 0;
                    if (ref.lengthFrames > 0)
                    {
                        ms = static_cast<std::uint64_t>(static_cast<double>(played) /
                                                            static_cast<double>(ref.lengthFrames) *
                                                            static_cast<double>(ref.lengthInMs));
                    }
                    else if (ref.sampleRate > 0)
                    {
                        ms = static_cast<std::uint64_t>(
                            static_cast<double>(played) / static_cast<double>(ref.sampleRate) * 1000.0);
                    }

                    const std::uint32_t last = voice.lastPublishedMs.load(std::memory_order_relaxed);
                    if (last == 0xffffffffu || ms != last)
                    {
                        voice.lastPublishedMs.store(static_cast<std::uint32_t>(ms), std::memory_order_relaxed);
                        if (events.onProgress)
                        {
                            events.onProgress(ref.id, ms);
                        }
                    }
                }
            }
        }

        //* ------------------------------------------------------------------ *
        //*  Device callback — mixing only: no locks, no allocation, no I/O
        //* ------------------------------------------------------------------ *

        void AudioEngine::dataCallback(ma_device *device, void *output, [[maybe_unused]] const void *input,
                                       ma_uint32 frameCount)
        {
            auto *stream = static_cast<Stream *>(device->pUserData);
            const auto started = nowNanoseconds();

            if (stream == nullptr || output == nullptr || frameCount == 0)
            {
                return;
            }

            auto &stats = stream->engine->stats_;
            auto *mixBuffer = static_cast<float *>(output);
            const std::size_t totalSamples = static_cast<std::size_t>(frameCount) * stream->channels;
            std::memset(mixBuffer, 0, totalSamples * sizeof(float));

            for (auto &voicePtr : stream->voices)
            {
                Voice &voice = *voicePtr;

                voice.inUse.fetch_add(1, std::memory_order_seq_cst);
                if (voice.state.load(std::memory_order_seq_cst) == Voice::State::Playing)
                {
                    if (!voice.paused.load(std::memory_order_relaxed))
                    {
                        const float volume = voice.volumeFactor.load(std::memory_order_relaxed);
                        float boost = 1.0f;
                        if (voice.boostFactor)
                        {
                            boost = voice.boostFactor->load(std::memory_order_relaxed);
                        }

                        const std::size_t mixed = voice.ring.readMix(mixBuffer, frameCount, volume * boost);
                        voice.playedFrames.fetch_add(mixed, std::memory_order_relaxed);

                        if (mixed > 0)
                        {
                            stats.mixedFrames.fetch_add(mixed, std::memory_order_relaxed);
                        }

                        if (mixed < frameCount)
                        {
                            if (voice.producerDone.load(std::memory_order_acquire) && voice.ring.readable() == 0)
                            {
                                //* Completion is a single non-allocating atomic store;
                                //* teardown and UI dispatch happen on the producer.
                                voice.state.store(Voice::State::Drained, std::memory_order_seq_cst);
                            }
                            else if (!voice.wrapping.load(std::memory_order_relaxed))
                            {
                                //* A repeat wrap gap is expected, not a starvation.
                                stats.underrunFrames.fetch_add(frameCount - mixed, std::memory_order_relaxed);
                                stats.underruns.fetch_add(1, std::memory_order_relaxed);
                            }
                        }
                    }
                }
                voice.inUse.fetch_add(-1, std::memory_order_seq_cst);
            }

            //* Hard-limit the mixed sum once — boosting above 100% can never wrap.
            for (std::size_t i = 0; i < totalSamples; ++i)
            {
                const float sample = mixBuffer[i];
                mixBuffer[i] = sample > 1.0f ? 1.0f : (sample < -1.0f ? -1.0f : sample);
            }

            stats.callbacks.fetch_add(1, std::memory_order_relaxed);
            const auto elapsed = nowNanoseconds() - started;
            auto worst = stats.worstCallbackNs.load(std::memory_order_relaxed);
            while (elapsed > worst && !stats.worstCallbackNs.compare_exchange_weak(worst, elapsed, std::memory_order_relaxed))
            {
            }
        }
    } // namespace Audio
} // namespace Audiopad
