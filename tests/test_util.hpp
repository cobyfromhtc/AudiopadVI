#pragma once

#include <algorithm>
#include <chrono>
#include <cmath>
#include <cstdint>
#include <cstdio>
#include <cstdlib>
#include <filesystem>
#include <fstream>
#include <functional>
#include <string>
#include <thread>
#include <vector>

#include <helper/paths/paths.hpp>

#ifdef _WIN32
#include <Windows.h>
#else
#include <unistd.h>
#endif

//* ---------------------------------------------------------------------------
//* Shared harness for the Audiopad regression tests and the latency benchmark:
//* a tiny assertion helper, deterministic WAV generation, per-process scratch
//* directories and bounded waits. No external test framework — the tests must
//* build with nothing but the project's own sources.
//* ---------------------------------------------------------------------------

#define AUDIOPAD_TEST_REQUIRE(condition)                                                                     \
    do                                                                                                       \
    {                                                                                                        \
        if (!(condition))                                                                                    \
        {                                                                                                    \
            std::fprintf(stderr, "FAIL %s:%d: %s\n", __FILE__, __LINE__, #condition);                          \
            std::exit(2);                                                                                    \
        }                                                                                                    \
    } while (false)

inline std::filesystem::path testScratchDir()
{
    static const std::filesystem::path dir = [] {
        const auto *overrideDir = std::getenv("AUDIOPAD_TEST_TMPDIR");
        std::filesystem::path base = overrideDir != nullptr && *overrideDir != '\0'
                                         ? std::filesystem::path(overrideDir)
                                         : std::filesystem::temp_directory_path();
        const auto path = base / ("audiopad-tests-" + std::to_string(
#ifdef _WIN32
                                                           GetCurrentProcessId()
#else
                                                           static_cast<long>(::getpid())
#endif
                                                           ));
        std::error_code ec;
        std::filesystem::create_directories(path, ec);
        return path;
    }();
    return dir;
}

//* Points AUDIOPAD_CONFIG_PATH (and thereby the artwork store, see
//* Helpers::Artwork::directory) into the scratch area. Must be called from
//* main() before anything touches configuration or artwork state.
inline void isolateConfigurationToScratch()
{
#ifdef _WIN32
    _putenv_s("AUDIOPAD_CONFIG_PATH", (testScratchDir() / "config.json").string().c_str());
#else
    setenv("AUDIOPAD_CONFIG_PATH", (testScratchDir() / "config.json").string().c_str(), 1);
#endif
}

//* Writes a deterministic 16-bit PCM WAV sine. The engine's decoder resamples
//* to the device rate, so the exact rate here does not matter — it only needs
//* to decode cleanly on every platform miniaudio supports.
inline std::filesystem::path writeTestWav(const char *name, double seconds, std::uint32_t rate = 48000,
                                          std::uint32_t channels = 2, double frequency = 440.0)
{
    const auto path = testScratchDir() / name;
    std::ofstream file(path, std::ios::binary | std::ios::trunc);
    AUDIOPAD_TEST_REQUIRE(file.is_open());

    const std::uint32_t frames = static_cast<std::uint32_t>(seconds * rate);
    const std::uint32_t dataBytes = frames * channels * 2;

    auto writeU32 = [&file](std::uint32_t v) {
        for (int i = 0; i < 4; ++i)
        {
            file.put(static_cast<char>((v >> (8 * i)) & 0xFF));
        }
    };
    auto writeU16 = [&file](std::uint16_t v) {
        for (int i = 0; i < 2; ++i)
        {
            file.put(static_cast<char>((v >> (8 * i)) & 0xFF));
        }
    };

    file.write("RIFF", 4);
    writeU32(36 + dataBytes);
    file.write("WAVE", 4);
    file.write("fmt ", 4);
    writeU32(16);
    writeU16(1); //* PCM
    writeU16(static_cast<std::uint16_t>(channels));
    writeU32(rate);
    writeU32(rate * channels * 2);
    writeU16(static_cast<std::uint16_t>(channels * 2));
    writeU16(16);
    file.write("data", 4);
    writeU32(dataBytes);

    for (std::uint32_t frame = 0; frame < frames; ++frame)
    {
        const double t = static_cast<double>(frame) / rate;
        for (std::uint32_t channel = 0; channel < channels; ++channel)
        {
            const double phase = 2.0 * 3.14159265358979323846 * frequency * t + channel * 0.25;
            const double amplitude = std::sin(phase) * 0.8;
            const auto sample = static_cast<std::int16_t>(amplitude * 32767.0);
            writeU16(static_cast<std::uint16_t>(sample));
        }
    }
    file.flush();
    AUDIOPAD_TEST_REQUIRE(file.good());

    std::error_code ec;
    AUDIOPAD_TEST_REQUIRE(std::filesystem::file_size(path, ec) == 44 + dataBytes);
    return path;
}

//* Bounded predicate wait: polls every few milliseconds and returns false when
//* the deadline passes. The null audio backend runs below real time, so all
//* timeouts in the tests are generous multiples of the clip durations.
inline bool waitFor(const std::function<bool()> &predicate, int timeoutMs, int pollMs = 5)
{
    const auto deadline = std::chrono::steady_clock::now() + std::chrono::milliseconds(timeoutMs);
    while (std::chrono::steady_clock::now() < deadline)
    {
        if (predicate())
        {
            return true;
        }
        std::this_thread::sleep_for(std::chrono::milliseconds(pollMs));
    }
    return predicate();
}
