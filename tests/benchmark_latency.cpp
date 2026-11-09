#include "test_util.hpp"

#include <string>

#include <helper/audio/engine.hpp>

//* ---------------------------------------------------------------------------
//* Latency / period benchmark (Task 2 of the engine rework).
//*
//* Measures, per requested device period:
//*   - the period the backend actually granted (requested vs real),
//*   - trigger-to-output latency: from the play() call to the first frame of
//*     that voice reaching the device callback (observed by polling the
//*     engine's atomic mixed-frame counter),
//*   - decode cost inside play() (cache miss vs cache hit),
//*   - underruns and worst callback duration for the whole run.
//*
//* Purely informational: always exits 0 so it can participate in ctest.
//* Methodology and tuning guidance: tests/README.md.
//* ---------------------------------------------------------------------------

namespace
{
    using namespace Audiopad::Audio;

    using Clock = std::chrono::steady_clock;

    struct RunResult
    {
        std::uint32_t requestedPeriodMs = 0;
        std::uint32_t grantedPeriodFrames = 0;
        std::uint32_t sampleRate = 0;
        double playReturnMs = 0.0; //* decoder open + prefill scheduling, until play() returns
        double triggerToOutputMs = 0.0; //* until the callback mixed the first frame
        double cachedTriggerToOutputMs = 0.0; //* same clip again, served from the cache
        std::uint64_t underruns = 0;
        std::uint64_t worstCallbackUs = 0;
        std::uint64_t callbacks = 0;
    };

    RunResult measurePeriod(std::uint32_t periodMs)
    {
        EngineConfig config;
        config.periodMs = periodMs;
        config.ringMs = 256;
        config.maxVoicesPerStream = 32;
        config.clipCacheBytes = 64ull << 20;
        config.progressHz = 30;
        config.useNullBackend = true;

        std::mutex mutex;
        std::vector<std::uint32_t> finished;
        AudioEngine engine(EngineEvents{
                               [&finished, &mutex](std::uint32_t id) {
                                   const std::lock_guard<std::mutex> lock(mutex);
                                   finished.push_back(id);
                               },
                               [](std::uint32_t, std::uint64_t) {},
                               [](const std::string &) {},
                           },
                           config);

        const auto wav = writeTestWav("bench-2s.wav", 2.0).string();
        RunResult result;
        result.requestedPeriodMs = periodMs;

        //* --- cold play: decoder open is part of the trigger latency ---
        const auto before = Clock::now();
        const auto base = engine.stats().mixedFrames.load();
        const auto info = engine.play(1, wav, nullptr, "null-bench", 100.f,
                                       std::make_shared<std::atomic<float>>(1.f), false, false);
        const auto playReturned = Clock::now();
        AUDIOPAD_TEST_REQUIRE(info.has_value());

        const auto mixedFirst = [&] {
            for (;;)
            {
                if (engine.stats().mixedFrames.load() > base)
                {
                    return Clock::now();
                }
                std::this_thread::yield();
            }
        }();
        result.playReturnMs = std::chrono::duration<double, std::milli>(playReturned - before).count();
        result.triggerToOutputMs = std::chrono::duration<double, std::milli>(mixedFirst - before).count();

        AUDIOPAD_TEST_REQUIRE(waitFor([&] {
            const std::lock_guard<std::mutex> lock(mutex);
            return !finished.empty();
        }, 40000));

        //* --- warm play: served from the decoded-clip cache ---
        {
            const auto warmBefore = Clock::now();
            const auto warmBase = engine.stats().mixedFrames.load();
            AUDIOPAD_TEST_REQUIRE(engine.play(2, wav, nullptr, "null-bench", 100.f,
                                              std::make_shared<std::atomic<float>>(1.f), false, false)
                                      .has_value());
            for (;;)
            {
                if (engine.stats().mixedFrames.load() > warmBase)
                {
                    result.cachedTriggerToOutputMs =
                        std::chrono::duration<double, std::milli>(Clock::now() - warmBefore).count();
                    break;
                }
                std::this_thread::yield();
            }
            AUDIOPAD_TEST_REQUIRE(waitFor([&] {
                const std::lock_guard<std::mutex> lock(mutex);
                return finished.size() >= 2;
            }, 40000));
        }

        const auto &stats = engine.stats();
        result.underruns = stats.underruns.load();
        result.worstCallbackUs = stats.worstCallbackNs.load() / 1000;
        result.callbacks = stats.callbacks.load();

        const auto reports = engine.describeStreams();
        if (!reports.empty())
        {
            result.grantedPeriodFrames = reports[0].periodFrames;
            result.sampleRate = reports[0].sampleRate;
        }
        return result;
    }

    void printRow(const RunResult &r)
    {
        std::printf("| %2u ms | %5u frames @ %5u Hz | %8.2f ms | %8.2f ms | %8.2f ms | %8llu us | %llu |\n",
                    r.requestedPeriodMs, r.grantedPeriodFrames, r.sampleRate, r.playReturnMs, r.triggerToOutputMs,
                    r.cachedTriggerToOutputMs, static_cast<unsigned long long>(r.worstCallbackUs),
                    static_cast<unsigned long long>(r.underruns));
    }
} // namespace

int main()
{
    isolateConfigurationToScratch();

    std::printf("latency benchmark (null backend; swap in a real backend by leaving\n");
    std::printf("useNullBackend off — see tests/README.md for interpreting the numbers)\n\n");
    std::printf("+--------------+-----------------------+-------------+-------------------+-------------------+-----------------+-----------+\n");
    std::printf("| requested    | granted period        | play() ret  | trigger->output   | cached t->o       | worst callback  | underruns |\n");
    std::printf("+--------------+-----------------------+-------------+-------------------+-------------------+-----------------+-----------+\n");

    for (const std::uint32_t periodMs : {5u, 10u, 20u, 40u})
    {
        printRow(measurePeriod(periodMs));
    }
    std::printf("+--------------+-----------------------+-------------+-------------------+-------------------+-----------------+-----------+\n");

    std::printf("\nNotes:\n");
    std::printf("  - 'play() ret' includes the decoder open (first play of a clip);\n");
    std::printf("    'cached t->o' is the same clip replayed from the decoded cache.\n");
    std::printf("  - Compare configurations:\n");
    std::printf("      cmake --build build --config Release      - --target benchmark_latency\n");
    std::printf("      cmake --build build --config RelWithDebInfo - --target benchmark_latency\n");
    std::printf("      cmake -B build -DAUDIOPAD_ENABLE_IPO=ON   (only keep it if the numbers improve)\n");
    return 0;
}
