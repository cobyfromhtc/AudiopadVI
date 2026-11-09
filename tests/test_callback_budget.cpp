#include "test_util.hpp"

#include <string>

#include <helper/audio/engine.hpp>

//* ---------------------------------------------------------------------------
//* Callback budget regression (Tasks 2-4 of the engine rework).
//*
//* With a saturated stream (every preallocated voice playing at once) the
//* device callback must stay far inside its period budget, must not underrun
//* against the default ring depth, and the granted period must be reported
//* back so the configured value can be compared with the real one.
//* ---------------------------------------------------------------------------

namespace
{
    using namespace Audiopad::Audio;

    std::shared_ptr<std::atomic<float>> boostOf(float value)
    {
        return std::make_shared<std::atomic<float>>(value);
    }
} // namespace

int main()
{
    isolateConfigurationToScratch();

    std::fprintf(stderr, "callback budget regression:\n");

    EngineConfig config;
    config.periodMs = 10;
    config.ringMs = 512;
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

    const auto wav = writeTestWav("budget-1s.wav", 1.0);

    const std::uint32_t voices = config.maxVoicesPerStream;
    for (std::uint32_t id = 1; id <= voices; ++id)
    {
        const auto info = engine.play(id, wav.string(), nullptr, "null-test", 100.f, boostOf(1.f), false, false);
        AUDIOPAD_TEST_REQUIRE(info.has_value());
        AUDIOPAD_TEST_REQUIRE(engine.activeVoiceCount() == id); //* every slot claimed and visible
    }

    //* Trying to exceed the preallocated pool must fail cleanly, not corrupt.
    AUDIOPAD_TEST_REQUIRE(!engine.play(voices + 1, wav.string(), nullptr, "null-test", 100.f, boostOf(1.f), false, false).has_value());

    AUDIOPAD_TEST_REQUIRE(waitFor([&] {
        const std::lock_guard<std::mutex> lock(mutex);
        return finished.size() == voices;
    }, 45000));

    const auto &stats = engine.stats();

    std::fprintf(stderr, "  [budget] %u voices: callbacks=%llu worst=%.1f us underruns=%llu (frames=%llu) mixed=%llu\n",
                 voices, static_cast<unsigned long long>(stats.callbacks.load()),
                 static_cast<double>(stats.worstCallbackNs.load()) / 1000.0,
                 static_cast<unsigned long long>(stats.underruns.load()),
                 static_cast<unsigned long long>(stats.underrunFrames.load()),
                 static_cast<unsigned long long>(stats.mixedFrames.load()));

    //* Zero underruns: the producer stays ahead of the callback with the
    //* default ring depth — this is the tuning baseline the README documents.
    AUDIOPAD_TEST_REQUIRE(stats.underruns.load() == 0);

    //* Worst callback stays far inside the period budget (10 ms requested;
    //* the null backend grants it, see the stream report below). 2 ms is a
    //* deliberately CI-tolerant ceiling — the mixing itself is a few us.
    AUDIOPAD_TEST_REQUIRE(stats.worstCallbackNs.load() < 2000000);

    AUDIOPAD_TEST_REQUIRE(stats.callbacks.load() > 50);

    const auto reports = engine.describeStreams();
    AUDIOPAD_TEST_REQUIRE(reports.size() == 1);
    std::fprintf(stderr, "  [budget] granted period: %u frames @ %u Hz, %u periods (buffer %u frames)\n",
                 reports[0].periodFrames, reports[0].sampleRate, reports[0].internalPeriods, reports[0].bufferSizeFrames);
    AUDIOPAD_TEST_REQUIRE(reports[0].periodFrames > 0);
    AUDIOPAD_TEST_REQUIRE(reports[0].sampleRate > 0);
    AUDIOPAD_TEST_REQUIRE(reports[0].bufferSizeFrames >= reports[0].periodFrames);

    std::fprintf(stderr, "callback budget regression: PASS\n");
    return 0;
}
