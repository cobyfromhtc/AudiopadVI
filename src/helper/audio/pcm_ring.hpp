#pragma once
#include <atomic>
#include <cstddef>
#include <cstdint>
#include <vector>

namespace Audiopad
{
    namespace Audio
    {
        //* Bounded single-producer / single-consumer float PCM ring buffer.
        //*
        //* The audio device callback is the consumer (never blocks, never allocates),
        //* the engine's producer thread is the writer (decodes files, seeks, prepares
        //* loops). Indices are monotonically increasing counters over a power-of-two
        //* storage so wrap-around needs no branches and read/write never touch the
        //* same counter.
        //*
        //* Memory ordering:
        //*  - tail (producer) is stored with release, loaded with acquire by the
        //*    consumer — publishing written samples.
        //*  - head (consumer) is stored with release, loaded with acquire by the
        //*    producer — publishing freed slots.
        //*  - clearAll() may ONLY be called by the producer while the consumer is
        //*    locked out of the voice (see AudioEngine's inUse handshake).
        class PcmRing
        {
          public:
            PcmRing() = default;
            PcmRing(const PcmRing &) = delete;
            PcmRing &operator=(const PcmRing &) = delete;

            void reset(std::size_t capacityFrames, std::uint32_t channels)
            {
                std::size_t pow2 = 1;
                while (pow2 < capacityFrames && pow2 != 0)
                {
                    pow2 <<= 1;
                }
                buffer.assign(pow2 * channels, 0.0f);
                mask = pow2 - 1;
                channels_ = channels;
                head.store(0, std::memory_order_relaxed);
                tail.store(0, std::memory_order_relaxed);
            }

            bool valid() const
            {
                return !buffer.empty() && channels_ != 0;
            }
            std::uint32_t channels() const
            {
                return channels_;
            }
            std::size_t capacity() const
            {
                return mask + 1;
            }

            //* --- consumer thread (audio callback) ---

            std::size_t readable() const
            {
                return static_cast<std::size_t>(tail.load(std::memory_order_acquire) - head.load(std::memory_order_relaxed));
            }

            //* Mixes up to `frames` frames into `destination` (frameCount * channels
            //* floats, expected to be pre-zeroed) applying `gain` per sample and
            //* returns the number of frames actually consumed. Wait-free.
            std::size_t readMix(float *destination, std::size_t frames, float gain)
            {
                if (!valid() || frames == 0)
                {
                    return 0;
                }

                const std::size_t available = readable();
                const std::size_t count = frames < available ? frames : available;
                std::size_t remaining = count;
                std::uint64_t position = head.load(std::memory_order_relaxed);

                while (remaining > 0)
                {
                    const std::size_t contiguous = (mask + 1) - static_cast<std::size_t>(position & mask);
                    const std::size_t chunk = contiguous < remaining ? contiguous : remaining;
                    const float *source = buffer.data() + static_cast<std::size_t>(position & mask) * channels_;
                    const std::size_t samples = chunk * channels_;

                    if (gain == 1.0f)
                    {
                        for (std::size_t i = 0; i < samples; ++i)
                        {
                            destination[i] += source[i];
                        }
                    }
                    else
                    {
                        for (std::size_t i = 0; i < samples; ++i)
                        {
                            destination[i] += source[i] * gain;
                        }
                    }

                    destination += samples;
                    position += chunk;
                    remaining -= chunk;
                }

                head.store(position, std::memory_order_release);
                return count;
            }

            //* --- producer thread ---

            std::size_t writable() const
            {
                return (mask + 1) - static_cast<std::size_t>(tail.load(std::memory_order_relaxed) - head.load(std::memory_order_acquire));
            }

            //* Writes `frames` frames (frames * channels floats). Must only be
            //* called with frames <= writable().
            void write(const float *source, std::size_t frames)
            {
                if (!valid() || frames == 0)
                {
                    return;
                }

                std::size_t remaining = frames;
                std::uint64_t position = tail.load(std::memory_order_relaxed);

                while (remaining > 0)
                {
                    const std::size_t contiguous = (mask + 1) - static_cast<std::size_t>(position & mask);
                    const std::size_t chunk = contiguous < remaining ? contiguous : remaining;
                    float *destination = buffer.data() + static_cast<std::size_t>(position & mask) * channels_;
                    const std::size_t samples = chunk * channels_;

                    for (std::size_t i = 0; i < samples; ++i)
                    {
                        destination[i] = source[i];
                    }
                    source += samples;
                    position += chunk;
                    remaining -= chunk;
                }

                tail.store(position, std::memory_order_release);
            }

            //* Discards everything currently buffered. Producer-side only, and the
            //* consumer must be locked out of the owning voice first.
            void clearAll()
            {
                head.store(tail.load(std::memory_order_relaxed), std::memory_order_release);
            }

          private:
            std::vector<float> buffer;
            std::size_t mask = 0;
            std::uint32_t channels_ = 0;
            std::atomic<std::uint64_t> head{0}; //* consumer position (frames)
            std::atomic<std::uint64_t> tail{0}; //* producer position (frames)
        };
    } // namespace Audio
} // namespace Audiopad
