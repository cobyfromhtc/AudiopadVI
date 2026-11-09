#include "audio.hpp"
#include <algorithm>
#include <cstdlib>
#include <core/global/globals.hpp>
#include <fancy.hpp>

namespace Audiopad::Objects
{
    namespace
    {
        //* Environment overrides for latency tuning — see README ("Tuning playback
        //* latency"). All values are validated; invalid input falls back to defaults.
        std::optional<std::uint64_t> environmentNumber(const char *name)
        {
            const char *value = std::getenv(name); // NOLINT(concurrency-mt-unsafe)
            if (value == nullptr || *value == '\0')
            {
                return std::nullopt;
            }
            try
            {
                const auto parsed = std::stoull(value);
                if (parsed > 0xffffffffull)
                {
                    return std::nullopt;
                }
                return parsed;
            }
            catch (...)
            {
                return std::nullopt;
            }
        }
    } // namespace

    void Audio::setup()
    {
#if defined(__linux__)
        nullSink = std::nullopt;
#endif
        Fancy::fancy.logTime().message() << "Detecting audio devices..." << std::endl;
        for (const auto &device : getAudioDevices())
        {
            Fancy::fancy.logTime().message() << "  - Found device: " << device.name
                                             << " | Default: " << (device.isDefault ? "Yes" : "No") << std::endl;
            if (device.isDefault)
            {
                defaultPlayback = device;
            }
#if defined(__linux__)
            if (device.name == "audiopad_sink")
            {
                nullSink = device;
            }
#endif
        }

        const auto config = engineConfigFromEnvironment();
        engine = std::make_unique<Audiopad::Audio::AudioEngine>(
            Audiopad::Audio::EngineEvents{
                //* Natural completion: the device consumed every frame of the clip.
                //* Hops onto the shared queue for teardown bookkeeping and the GUI
                //* event — the engine callback only published a two-word message.
                [this](std::uint32_t id) {
                    Globals::gQueue.push_unique(static_cast<std::uint64_t>(id), [this, id] { finishSound(id); });
                },
                //* Progress: read from an atomic position snapshot by the engine's
                //* bounded-rate publisher — never dispatched from the audio callback.
                [this](std::uint32_t id, std::uint64_t ms) { progressSound(id, ms); },
                [](const std::string &message) { Fancy::fancy.logTime().message() << message << std::endl; },
            },
            config);

        Fancy::fancy.logTime().message()
            << "Audio engine ready (period " << config.periodMs << " ms, ring " << config.ringMs << " ms, "
            << config.maxVoicesPerStream << " voices/stream, clip cache " << (config.clipCacheBytes / (1024 * 1024))
            << " MiB)" << std::endl;
    }

    Audiopad::Audio::EngineConfig Audio::engineConfigFromEnvironment()
    {
        Audiopad::Audio::EngineConfig config;
        if (const auto period = environmentNumber("AUDIOPAD_PERIOD_MS"))
        {
            config.periodMs = static_cast<std::uint32_t>(*period);
        }
        if (const auto ring = environmentNumber("AUDIOPAD_RING_MS"))
        {
            config.ringMs = static_cast<std::uint32_t>(*ring);
        }
        if (const auto cache = environmentNumber("AUDIOPAD_CLIP_CACHE_MB"))
        {
            config.clipCacheBytes = *cache * (1024ull * 1024ull);
        }
        if (const auto progress = environmentNumber("AUDIOPAD_PROGRESS_HZ"))
        {
            config.progressHz = static_cast<std::uint32_t>(*progress);
        }
        if (const auto voices = environmentNumber("AUDIOPAD_MAX_VOICES"))
        {
            config.maxVoicesPerStream = static_cast<std::uint32_t>(*voices);
        }
        return config;
    }

    void Audio::destroy()
    {
        {
            auto scoped = playingSounds.scoped();
            scoped->clear();
        }

        if (engine)
        {
            const auto &stats = engine->stats();
            const auto callbacks = stats.callbacks.load();
            if (callbacks > 0)
            {
                Fancy::fancy.logTime().message()
                    << "Audio engine summary: " << callbacks << " callbacks, worst callback "
                    << (stats.worstCallbackNs.load() / 1000) << " us, " << stats.underruns.load() << " underruns ("
                    << stats.underrunFrames.load() << " frames), " << stats.voicesReused.load() << " voices reused"
                    << std::endl;
            }
            engine.reset();
        }
    }

    float Audio::getBoostFactor(const std::uint32_t &soundId)
    {
        //* Clamp each boost level to a sane 100%..400% window so corrupted configs cannot
        //* produce extreme gain values, then combine global and per-soundboard amplification.
        //* NOTE: std::min/std::max are intentionally avoided here — <windows.h> defines
        //* them as macros on MSVC, which breaks compilation in this translation unit.
        const auto clampPercent = [](int value) -> float {
            const int clamped = value < 100 ? 100 : (value > 400 ? 400 : value);
            return static_cast<float>(clamped) / 100.f;
        };

        float factor = clampPercent(Globals::gSettings.soundBoost);

        //* Sounds may live inside nested folders of a category — resolve the owning
        //* tab through the tree-aware lookup so per-soundboard boost applies to them too.
        auto owningTab = Globals::gData.getTabBySoundId(soundId);
        if (owningTab)
        {
            factor *= clampPercent(owningTab->boost);
        }

        return factor > 16.f ? 16.f : factor;
    }

    std::optional<PlayingSound> Audio::play(const Objects::Sound &sound,
                                            const std::optional<Objects::AudioDevice> &playbackDevice,
                                            bool isRemoteStream, bool reportsProgress)
    {
        static std::atomic<std::uint32_t> id = 0;

        if (!engine)
        {
            return std::nullopt;
        }

        const AudioDevice &endpoint = playbackDevice ? *playbackDevice : defaultPlayback;

        float volumePercent = 0.f;
        if (isRemoteStream)
        {
            volumePercent = sound.remoteVolume ? static_cast<float>(*sound.remoteVolume)
                                               : static_cast<float>(Globals::gSettings.remoteVolume);
        }
        else
        {
            volumePercent = sound.localVolume ? static_cast<float>(*sound.localVolume)
                                              : static_cast<float>(Globals::gSettings.localVolume);
        }

        //* The boost gain is captured on a shared atomic — the engine's mix callback
        //* amplifies with it live (miniaudio's masterVolumeFactor only attenuates,
        //* values above 1 are ignored), and the UI can store() new values mid-play.
        auto boostFactor = std::make_shared<std::atomic<float>>(getBoostFactor(sound.id));

        const auto soundId = ++id;
        auto info = engine->play(soundId, sound.path, &endpoint.raw.id, endpoint.name, volumePercent, boostFactor,
                                 false, reportsProgress);
        if (!info)
        {
            Fancy::fancy.logTime().failure() << "Failed to play sound: " << sound.path << std::endl;
            return std::nullopt;
        }

        auto pSound = std::make_shared<PlayingSound>();
        pSound->id = soundId;
        pSound->sound = sound;
        pSound->isRemote = isRemoteStream;
        pSound->reportsProgress = reportsProgress;
        pSound->raw.boostFactor = boostFactor;
        pSound->length = info->lengthFrames;
        pSound->sampleRate = info->sampleRate;
        pSound->playbackDevice = endpoint;
        pSound->lengthInMs = info->lengthInMs;

        playingSounds->emplace(soundId, pSound);
        return *pSound;
    }

    void Audio::stopAll()
    {
        {
            auto scoped = playingSounds.scoped();
            scoped->clear();
        }

        if (engine)
        {
            engine->stopAll();
        }
    }

    bool Audio::stop(const std::uint32_t &soundId)
    {
        auto scoped = playingSounds.scoped();
        std::vector<std::uint32_t> idsToStop;

        if (scoped->find(soundId) != scoped->end())
        {
            idsToStop.push_back(soundId);
        }
        else
        {
            for (const auto &pair : *scoped)
            {
                if (pair.second && pair.second->sound.id == soundId)
                {
                    idsToStop.push_back(pair.first);
                }
            }
        }

        if (!idsToStop.empty())
        {
            for (auto id : idsToStop)
            {
                auto it = scoped->find(id);
                if (it == scoped->end())
                {
                    continue;
                }

                auto soundCopy = *it->second;
                scoped->erase(it);

                if (engine)
                {
                    engine->stop(id);
                }

                if (Globals::gGui)
                {
                    Globals::gGui->onSoundFinished(soundCopy);
                }
            }
            return true;
        }

        Fancy::fancy.logTime().warning() << "Failed to stop sound with id " << soundId << ", sound does not exist"
                                         << std::endl;
        return false;
    }

    namespace
    {
        std::shared_ptr<PlayingSound> findPlayingSound(
            const std::map<std::uint32_t, std::shared_ptr<PlayingSound>> &sounds, std::uint32_t soundId)
        {
            auto it = sounds.find(soundId);
            if (it != sounds.end())
            {
                return it->second;
            }
            for (const auto &pair : sounds)
            {
                if (pair.second && pair.second->sound.id == soundId)
                {
                    return pair.second;
                }
            }
            return nullptr;
        }
    } // namespace

    std::optional<PlayingSound> Audio::pause(const std::uint32_t &soundId)
    {
        auto scoped = playingSounds.scoped();
        auto sound = findPlayingSound(*scoped, soundId);
        if (sound)
        {
            if (!sound->paused)
            {
                if (engine)
                {
                    engine->pause(sound->id);
                }
                sound->paused = true;
            }

            return *sound;
        }

        Fancy::fancy.logTime().warning() << "Failed to pause sound with id " << soundId << ", sound does not exist"
                                         << std::endl;
        return std::nullopt;
    }

    std::optional<PlayingSound> Audio::repeat(const std::uint32_t &soundId, bool shouldRepeat)
    {
        auto scoped = playingSounds.scoped();
        auto sound = findPlayingSound(*scoped, soundId);
        if (sound)
        {
            sound->repeat = shouldRepeat;
            if (engine)
            {
                engine->setRepeat(sound->id, shouldRepeat);
            }
            return *sound;
        }

        Fancy::fancy.logTime().warning() << "Failed to set repeat for sound with id " << soundId
                                         << ", sound does not exist" << std::endl;
        return std::nullopt;
    }

    std::optional<PlayingSound> Audio::resume(const std::uint32_t &soundId)
    {
        auto scoped = playingSounds.scoped();
        auto sound = findPlayingSound(*scoped, soundId);
        if (sound)
        {
            if (sound->paused)
            {
                if (engine)
                {
                    engine->resume(sound->id);
                }
                sound->paused = false;
            }

            return *sound;
        }

        Fancy::fancy.logTime().warning() << "Failed to resume sound with id " << soundId << ", sound does not exist "
                                         << std::endl;
        return std::nullopt;
    }

    void Audio::finishSound(const std::uint32_t &soundId)
    {
        //* Runs on the shared queue thread after the engine's callback flagged the
        //* voice as drained — every frame was already handed to the device, so no
        //* drain delay is needed: the reused stream keeps playing what the callback
        //* already mixed.
        auto scoped = playingSounds.scoped();
        auto it = scoped->find(soundId);
        if (it == scoped->end())
        {
            return; //* user stopped it in the meantime — expected, not a warning
        }

        auto sound = *it->second;
        if (Globals::gGui)
        {
            Globals::gGui->onSoundFinished(sound);
        }
        scoped->erase(it);
    }

    void Audio::progressSound(const std::uint32_t &soundId, std::uint64_t ms)
    {
        //* Runs on the engine's bounded-rate publisher thread (default 30 Hz).
        auto scoped = playingSounds.scoped();
        auto it = scoped->find(soundId);
        if (it == scoped->end())
        {
            return;
        }

        auto &sound = it->second;
        sound->readInMs.store(ms, std::memory_order_relaxed);
        if (sound->length > 0)
        {
            sound->readFrames = static_cast<std::uint64_t>(static_cast<double>(ms) /
                                                               static_cast<double>(sound->lengthInMs) *
                                                               static_cast<double>(sound->length));
        }

        if (Globals::gGui)
        {
            Globals::gGui->onSoundProgressed(*sound);
        }
    }

    std::optional<PlayingSound> Audio::seek(const std::uint32_t &soundId, std::uint64_t position)
    {
        auto scoped = playingSounds.scoped();
        auto sound = findPlayingSound(*scoped, soundId);
        if (sound)
        {
            std::uint64_t seekFrame = 0;
            if (sound->lengthInMs > 0)
            {
                seekFrame = static_cast<std::uint64_t>((static_cast<double>(position) / static_cast<double>(sound->lengthInMs)) *
                                                       static_cast<double>(sound->length));
            }

            if (seekFrame > sound->length)
            {
                seekFrame = sound->length;
            }

            if (engine)
            {
                engine->seek(sound->id, seekFrame);
            }

            sound->readFrames = seekFrame;
            sound->readInMs.store(position, std::memory_order_relaxed);

            //* The engine's producer applies the seek within one callback period;
            //* the UI position is published immediately from here (calling thread).
            if (Globals::gGui && sound->reportsProgress)
            {
                Globals::gGui->onSoundProgressed(*sound);
            }

            auto rtn = *sound;
            rtn.readFrames = seekFrame;
            rtn.readInMs.store(position, std::memory_order_relaxed);
            return rtn;
        }

        Fancy::fancy.logTime().warning() << "Failed to seek sound with id " << soundId << ", sound does not exist"
                                         << std::endl;
        return std::nullopt;
    }

    bool Audio::setVolume(const std::uint32_t &playingId, int volumePercent)
    {
        if (!engine)
        {
            return false;
        }
        return engine->setVolume(playingId, static_cast<float>(volumePercent));
    }

    std::vector<AudioDevice> Audio::getAudioDevices()
    {
        std::string defaultName;
        {
            ma_device device;
            ma_device_config deviceConfig = ma_device_config_init(ma_device_type_playback);
            ma_device_init(nullptr, &deviceConfig, &device);

            defaultName = device.playback.name;

            ma_device_uninit(&device);
        }

        ma_context context;

        if (ma_context_init(nullptr, 0, nullptr, &context) != MA_SUCCESS)
        {
            Fancy::fancy.logTime().failure() << "Failed to initialize context" << std::endl;
            return {};
        }

        ma_device_info *pPlayBackDeviceInfos{};
        ma_uint32 deviceCount{};

        ma_result result = ma_context_get_devices(&context, &pPlayBackDeviceInfos, &deviceCount, nullptr, nullptr);
        if (result != MA_SUCCESS)
        {
            Fancy::fancy.logTime().failure() << "Failed to get playback devices!" << std::endl;
            ma_context_uninit(&context);
            return {};
        }

        std::vector<AudioDevice> playBackDevices;
        for (unsigned int i = 0; deviceCount > i; i++)
        {
            auto &rawDevice = pPlayBackDeviceInfos[i];

            AudioDevice device;
            device.raw = rawDevice;
            device.name = rawDevice.name;
            device.isDefault = rawDevice.name == defaultName;

            playBackDevices.emplace_back(device);
        }

        ma_context_uninit(&context);

        for (auto it = playBackDevices.begin(); it != playBackDevices.end(); it++)
        {
            if (it->name.find("VB-Audio") != std::string::npos)
            {
                if (it != playBackDevices.begin())
                {
                    std::iter_swap(playBackDevices.begin(), it);
                }
            }
        }

        return playBackDevices;
    }
#if defined(_WIN32)
    std::optional<AudioDevice> Audio::getAudioDevice(const std::string &name)
    {
        for (const auto &device : getAudioDevices())
        {
            if (device.name == name)
            {
                return device;
            }
        }
        return std::nullopt;
    }
#endif
    std::vector<PlayingSound> Audio::getPlayingSounds()
    {
        auto scoped = playingSounds.scoped();

        std::vector<PlayingSound> rtn;
        for (const auto &sound : *scoped)
        {
            rtn.emplace_back(*sound.second);
        }

        return rtn;
    }
    PlayingSound::PlayingSound(const PlayingSound &other)
    {
        if (&other == this)
        {
            return;
        }

        length = other.length;
        lengthInMs = other.lengthInMs;
        readFrames = other.readFrames;
        sampleRate = other.sampleRate;

        id = other.id;
        sound = other.sound;

        paused.store(other.paused.load(std::memory_order_relaxed), std::memory_order_relaxed);
        repeat.store(other.repeat.load(std::memory_order_relaxed), std::memory_order_relaxed);
        readInMs.store(other.readInMs.load(std::memory_order_relaxed), std::memory_order_relaxed);

        raw.boostFactor = other.raw.boostFactor;
        playbackDevice = other.playbackDevice;
        isRemote = other.isRemote;
        reportsProgress = other.reportsProgress;
    }
    PlayingSound &PlayingSound::operator=(const PlayingSound &other)
    {
        if (&other == this)
        {
            return *this;
        }

        length = other.length;
        lengthInMs = other.lengthInMs;
        readFrames = other.readFrames;
        sampleRate = other.sampleRate;

        id = other.id;
        sound = other.sound;

        paused.store(other.paused.load(std::memory_order_relaxed), std::memory_order_relaxed);
        repeat.store(other.repeat.load(std::memory_order_relaxed), std::memory_order_relaxed);
        readInMs.store(other.readInMs.load(std::memory_order_relaxed), std::memory_order_relaxed);

        raw.boostFactor = other.raw.boostFactor;
        playbackDevice = other.playbackDevice;
        isRemote = other.isRemote;
        reportsProgress = other.reportsProgress;

        return *this;
    }
} // namespace Audiopad::Objects
