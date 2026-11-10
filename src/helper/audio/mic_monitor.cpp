#include "mic_monitor.hpp"
#include <algorithm>
#include <cmath>
#include <cstring>
#include <mutex>
#include <vector>

#include <miniaudio.h>

#include <fancy.hpp>
#include <helper/audio/pcm_ring.hpp>

namespace Audiopad::Audio
{
    namespace
    {
        //* Fixed processing format: the whole monitor pipeline runs at 48 kHz
        //* stereo f32 regardless of what the devices prefer — miniaudio converts
        //* per device, which keeps the DSP and the rings format-independent.
        constexpr std::uint32_t kSampleRate = 48000;
        constexpr std::uint32_t kChannels = 2;

        //* Playback ring depth (ms). Deep enough to absorb capture jitter, small
        //* enough to keep the round-trip latency usable.
        constexpr std::uint32_t kRingMs = 200;

        //* Granular ("doppler") pitch shifter: a read tap glides over a short
        //* circular delay window while a second tap, offset by half the window,
        //* crossfades in at the wrap points. The output rate stays 1:1 with the
        //* input — a continuous monitor must never drift — only the pitch moves.
        class PitchShifter
        {
          public:
            explicit PitchShifter(float ratio) : ratio(ratio)
            {
                //* 64 ms window: long enough to hide the crossfade seam, short
                //* enough to keep the granular smearing pleasant.
                window = static_cast<std::size_t>(kSampleRate * 0.064f);
                buffer.assign(window * kChannels, 0.0f);
            }

            void process(const float *input, float *output, std::size_t frames)
            {
                const float pi = 3.14159265358979323846f;
                for (std::size_t frame = 0; frame < frames; frame++)
                {
                    for (std::uint32_t channel = 0; channel < kChannels; channel++)
                    {
                        buffer[writeIndex * kChannels + channel] = input[frame * kChannels + channel];
                    }

                    const auto indexA = static_cast<std::size_t>(readPosition);
                    const float fracA = readPosition - static_cast<float>(indexA);
                    const std::size_t indexB = (indexA + window / 2) % window;

                    //* Equal-power crossfade: tap A fades out at its wrap seam
                    //* (readPosition -> 0 / window), tap B is mid-window there.
                    const float fadeA = std::sin(pi * readPosition / static_cast<float>(window));
                    const float fadeB = std::cos(pi * readPosition / static_cast<float>(window));

                    for (std::uint32_t channel = 0; channel < kChannels; channel++)
                    {
                        const float a0 = buffer[indexA * kChannels + channel];
                        const float a1 = buffer[((indexA + 1) % window) * kChannels + channel];
                        const float b0 = buffer[indexB * kChannels + channel];
                        const float b1 = buffer[((indexB + 1) % window) * kChannels + channel];

                        const float tapA = a0 + (a1 - a0) * fracA;
                        const float tapB = b0 + (b1 - b0) * fracA;

                        output[frame * kChannels + channel] = tapA * fadeA + tapB * fadeB;
                    }

                    writeIndex = (writeIndex + 1) % window;
                    readPosition += ratio;
                    while (readPosition >= static_cast<float>(window))
                    {
                        readPosition -= static_cast<float>(window);
                    }
                }
            }

          private:
            float ratio;
            std::size_t window = 1;
            std::size_t writeIndex = 0;
            float readPosition = 0.0f;
            std::vector<float> buffer;
        };

        //* Echo: 300 ms feedback delay blended over the dry signal.
        class EchoEffect
        {
          public:
            EchoEffect() : delayFrames(static_cast<std::size_t>(kSampleRate) * 300 / 1000)
            {
                delay.assign(delayFrames * kChannels, 0.0f);
            }

            void process(const float *input, float *output, std::size_t frames)
            {
                for (std::size_t frame = 0; frame < frames; frame++)
                {
                    for (std::uint32_t channel = 0; channel < kChannels; channel++)
                    {
                        const float dry = input[frame * kChannels + channel];
                        const float wet = delay[pos * kChannels + channel];
                        delay[pos * kChannels + channel] = dry + wet * 0.35f;
                        output[frame * kChannels + channel] = dry * 0.85f + wet * 0.45f;
                    }
                    pos = (pos + 1) % delayFrames;
                }
            }

          private:
            std::size_t delayFrames;
            std::size_t pos = 0;
            std::vector<float> delay;
        };

        //* Robot: 50 Hz ring modulation over a hint of the dry signal.
        class RobotEffect
        {
          public:
            void process(const float *input, float *output, std::size_t frames)
            {
                constexpr double pi = 3.14159265358979323846;
                for (std::size_t frame = 0; frame < frames; frame++)
                {
                    const float carrier =
                        static_cast<float>(std::sin(2.0 * pi * 50.0 * static_cast<double>(phase) / kSampleRate));
                    for (std::uint32_t channel = 0; channel < kChannels; channel++)
                    {
                        const float dry = input[frame * kChannels + channel];
                        output[frame * kChannels + channel] = dry * 0.25f + dry * carrier * 0.85f;
                    }
                    phase = (phase + 1) % kSampleRate;
                }
            }

          private:
            std::uint32_t phase = 0;
        };

        //* Copies the device id of the first playback device whose name matches
        //* into `out`. Returns false when no such device exists.
        bool resolvePlaybackDeviceId(const std::string &name, ma_device_id &out)
        {
            ma_context context;
            if (ma_context_init(nullptr, 0, nullptr, &context) != MA_SUCCESS)
            {
                return false;
            }

            ma_device_info *infos = nullptr;
            ma_uint32 count = 0;
            bool found = false;
            if (ma_context_get_devices(&context, &infos, &count, nullptr, nullptr) == MA_SUCCESS)
            {
                for (ma_uint32 index = 0; index < count; index++)
                {
                    if (name == infos[index].name)
                    {
                        out = infos[index].id;
                        found = true;
                        break;
                    }
                }
            }

            ma_context_uninit(&context);
            return found;
        }

        bool resolveCaptureDeviceId(const std::string &name, ma_device_id &out)
        {
            ma_context context;
            if (ma_context_init(nullptr, 0, nullptr, &context) != MA_SUCCESS)
            {
                return false;
            }

            ma_device_info *infos = nullptr;
            ma_uint32 count = 0;
            bool found = false;
            if (ma_context_get_devices(&context, nullptr, nullptr, &infos, &count) == MA_SUCCESS)
            {
                for (ma_uint32 index = 0; index < count; index++)
                {
                    if (name == infos[index].name)
                    {
                        out = infos[index].id;
                        found = true;
                        break;
                    }
                }
            }

            ma_context_uninit(&context);
            return found;
        }
    } // namespace

    struct MicMonitor::Impl
    {
        struct Output
        {
            std::unique_ptr<ma_device> device;
            PcmRing ring;
            bool isMonitor = false; //* false = target endpoint (cable / null sink)
        };

        ma_device capture{};
        bool captureRunning = false;

        std::vector<std::unique_ptr<Output>> outputs;

        mutable std::mutex dspMutex;
        Preset activePreset = Preset::Off;
        PitchShifter deep{0.80f};
        PitchShifter high{1.25f};
        EchoEffect echo{};
        RobotEffect robot{};

        std::atomic<bool> running{false};
        std::atomic<bool> monitorWanted{false};
        std::atomic<Preset> publishedPreset{Preset::Off};

        std::vector<float> staging;    //* interleaved f32 handed to the DSP chain
        std::vector<float> silentFrame; //* pre-zeroed scratch for readMix targets

        static void captureCallback(ma_device *device, void *output, const void *input, ma_uint32 frameCount)
        {
            (void)output;
            auto *self = static_cast<Impl *>(device->pUserData);
            if (self == nullptr || input == nullptr || frameCount == 0)
            {
                return;
            }

            //* The preset chains only touch small in-memory state; the lock is
            //* held for the duration of one device period (a few ms).
            std::scoped_lock lock(self->dspMutex);
            self->processBlock(static_cast<const float *>(input), frameCount);
        }

        static void playbackCallback(ma_device *device, void *output, const void *input, ma_uint32 frameCount)
        {
            (void)input;
            auto *outputStream = static_cast<Output *>(device->pUserData);
            if (outputStream == nullptr)
            {
                return;
            }

            auto *frames = static_cast<float *>(output);
            std::memset(frames, 0, static_cast<std::size_t>(frameCount) * kChannels * sizeof(float));
            outputStream->ring.readMix(frames, frameCount, 1.0f);
        }

        void processBlock(const float *input, std::size_t frames)
        {
            if (staging.size() < frames * kChannels)
            {
                staging.resize(frames * kChannels);
            }
            std::memcpy(staging.data(), input, frames * kChannels * sizeof(float));

            switch (activePreset)
            {
            case Preset::Deep:
                deep.process(staging.data(), staging.data(), frames);
                break;
            case Preset::High:
                high.process(staging.data(), staging.data(), frames);
                break;
            case Preset::Echo:
                echo.process(staging.data(), staging.data(), frames);
                break;
            case Preset::Robot:
                robot.process(staging.data(), staging.data(), frames);
                break;
            case Preset::Off:
            default:
                break;
            }

            for (auto &outputStream : outputs)
            {
                //* The playback devices consume at the same rate this produces;
                //* if a consumer stalls anyway, drop the oldest frames rather
                //* than overrun the bounded ring.
                const std::size_t writable = outputStream->ring.writable();
                if (writable < frames)
                {
                    outputStream->ring.readMix(scratchFor(writable), frames - writable, 0.0f);
                }
                outputStream->ring.write(staging.data(), frames);
            }
        }

        float *scratchFor(std::size_t frames)
        {
            if (silentFrame.size() < frames * kChannels)
            {
                silentFrame.assign(frames * kChannels, 0.0f);
            }
            return silentFrame.data();
        }

        bool openOutput(const std::optional<std::string> &deviceName, bool isMonitor, const std::string &label)
        {
            auto outputStream = std::make_unique<Output>();
            outputStream->isMonitor = isMonitor;
            outputStream->ring.reset(kSampleRate * kRingMs / 1000, kChannels);

            ma_device_config config = ma_device_config_init(ma_device_type_playback);
            config.playback.format = ma_format_f32;
            config.playback.channels = kChannels;
            config.sampleRate = kSampleRate;
            config.periodSizeInFrames = 256;
            config.dataCallback = playbackCallback;
            config.pUserData = outputStream.get();

            ma_device_id deviceId{};
            if (deviceName && resolvePlaybackDeviceId(*deviceName, deviceId))
            {
                config.playback.pDeviceID = &deviceId;
            }
            else if (deviceName)
            {
                Fancy::fancy.logTime().warning()
                    << "MicMonitor: " << label << " device '" << *deviceName
                    << "' not found, falling back to the system default" << std::endl;
            }

            auto device = std::make_unique<ma_device>();
            if (ma_device_init(nullptr, &config, device.get()) != MA_SUCCESS)
            {
                Fancy::fancy.logTime().warning() << "MicMonitor: failed to open the " << label << " endpoint"
                                                 << std::endl;
                return false;
            }
            if (ma_device_start(device.get()) != MA_SUCCESS)
            {
                ma_device_uninit(device.get());
                Fancy::fancy.logTime().warning() << "MicMonitor: failed to start the " << label << " endpoint"
                                                 << std::endl;
                return false;
            }

            outputStream->device = std::move(device);
            outputs.emplace_back(std::move(outputStream));
            return true;
        }
    };

    MicMonitor::MicMonitor() : impl(std::make_unique<Impl>())
    {
    }

    MicMonitor::~MicMonitor()
    {
        stop();
    }

    bool MicMonitor::start(const Config &config)
    {
        if (impl->running.load())
        {
            return true;
        }

        impl->outputs.clear();

        //* The local monitor endpoint is only opened while the user actually
        //* wants to hear themselves; the target endpoint (virtual cable / null
        //* sink) is always fed so the selected voice reaches other applications.
        if (impl->monitorWanted.load() && !impl->openOutput(config.monitorDevice, true, "local monitor"))
        {
            return false;
        }
        if (config.targetDevice && !impl->openOutput(config.targetDevice, false, "voice target"))
        {
            return false;
        }
        if (impl->outputs.empty())
        {
            //* Neither a monitor nor a target endpoint — nothing to monitor into.
            Fancy::fancy.logTime().warning()
                << "MicMonitor: no output endpoint available, monitoring refused" << std::endl;
            return false;
        }

        ma_device_config configCapture = ma_device_config_init(ma_device_type_capture);
        configCapture.capture.format = ma_format_f32;
        configCapture.capture.channels = kChannels;
        configCapture.sampleRate = kSampleRate;
        configCapture.periodSizeInFrames = 256;
        configCapture.dataCallback = Impl::captureCallback;
        configCapture.pUserData = impl.get();

        ma_device_id captureId{};
        if (config.captureDevice && resolveCaptureDeviceId(*config.captureDevice, captureId))
        {
            configCapture.capture.pDeviceID = &captureId;
        }

        if (ma_device_init(nullptr, &configCapture, &impl->capture) != MA_SUCCESS)
        {
            impl->outputs.clear();
            Fancy::fancy.logTime().warning() << "MicMonitor: failed to open the capture device" << std::endl;
            return false;
        }
        if (ma_device_start(&impl->capture) != MA_SUCCESS)
        {
            ma_device_uninit(&impl->capture);
            impl->outputs.clear();
            Fancy::fancy.logTime().warning() << "MicMonitor: failed to start the capture device" << std::endl;
            return false;
        }

        impl->captureRunning = true;
        impl->running.store(true);
        return true;
    }

    void MicMonitor::stop()
    {
        if (impl->captureRunning)
        {
            ma_device_uninit(&impl->capture);
            impl->captureRunning = false;
        }
        for (auto &outputStream : impl->outputs)
        {
            if (outputStream->device)
            {
                ma_device_uninit(outputStream->device.get());
            }
        }
        impl->outputs.clear();
        impl->running.store(false);
    }

    bool MicMonitor::isActive() const
    {
        return impl->running.load();
    }

    void MicMonitor::setPreset(Preset preset)
    {
        {
            std::scoped_lock lock(impl->dspMutex);
            impl->activePreset = preset;
        }
        impl->publishedPreset.store(preset);
    }

    MicMonitor::Preset MicMonitor::preset() const
    {
        return impl->publishedPreset.load();
    }

    const char *MicMonitor::presetName(Preset preset)
    {
        switch (preset)
        {
        case Preset::Deep:
            return "deep";
        case Preset::High:
            return "high";
        case Preset::Echo:
            return "echo";
        case Preset::Robot:
            return "robot";
        case Preset::Off:
        default:
            return "off";
        }
    }

    std::optional<MicMonitor::Preset> MicMonitor::presetFromString(const std::string &name)
    {
        std::string lowered;
        lowered.reserve(name.size());
        for (char character : name)
        {
            lowered.push_back(static_cast<char>(std::tolower(static_cast<unsigned char>(character))));
        }

        if (lowered == "deep")
        {
            return Preset::Deep;
        }
        if (lowered == "high")
        {
            return Preset::High;
        }
        if (lowered == "echo")
        {
            return Preset::Echo;
        }
        if (lowered == "robot")
        {
            return Preset::Robot;
        }
        if (lowered == "off" || lowered.empty())
        {
            return Preset::Off;
        }
        return std::nullopt;
    }

    void MicMonitor::setMonitorEnabled(bool enabled)
    {
        impl->monitorWanted.store(enabled);
    }

    bool MicMonitor::monitorEnabled() const
    {
        return impl->monitorWanted.load();
    }
} // namespace Audiopad::Audio
