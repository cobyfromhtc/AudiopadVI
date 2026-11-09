#include "test_util.hpp"

#include <map>
#include <mutex>
#include <optional>
#include <set>
#include <thread>

#include <helper/audio/engine.hpp>

//* ---------------------------------------------------------------------------
//* Playback regression (Tasks 1-5 of the engine rework).
//*
//*  - play() publishes a fully initialized voice before the device callback
//*    can observe it (the state machine only mixes Playing voices).
//*  - completion is drain-based: onFinished fires only after the callback
//*    consumed the final frame — no fixed sleep anywhere.
//*  - stop/pause/seek/repeat round-trip through the producer thread.
//*  - rapid start/stop from multiple threads must not corrupt state
//*    (the Task-1 race); scaled up via AUDIOPAD_TEST_STRESS_ITERS, and
//*    intended to run under -fsanitize=thread (see tests/README.md).
//* ---------------------------------------------------------------------------

namespace
{
    using namespace Audiopad::Audio;

    int stressIterations()
    {
        const char *raw = std::getenv("AUDIOPAD_TEST_STRESS_ITERS");
        if (raw != nullptr && *raw != '\0')
        {
            const int parsed = std::atoi(raw);
            if (parsed > 0)
            {
                return parsed;
            }
        }
        return 150;
    }

    class Harness
    {
      public:
        explicit Harness(EngineConfig config) : engine(EngineEvents{
                                                     //* Completion: emitted by the producer after the
                                                     //* callback flagged the voice Drained.
                                                     [this](std::uint32_t id) {
                                                         const std::lock_guard<std::mutex> lock(mutex);
                                                         finished.push_back(id);
                                                     },
                                                     //* Progress: published by the bounded-rate publisher
                                                     //* thread from atomic snapshots — never from the callback.
                                                     [this](std::uint32_t id, std::uint64_t ms) {
                                                         const std::lock_guard<std::mutex> lock(mutex);
                                                         lastProgress[id] = ms;
                                                         if (ms > maxProgress[id])
                                                         {
                                                             maxProgress[id] = ms;
                                                         }
                                                         history[id].push_back(ms);
                                                         progressSamples += 1;
                                                         if (ms > 24ull * 60 * 60 * 1000)
                                                         { //* ~a day: not a sane clip position
                                                             wildProgress = true;
                                                         }
                                                     },
                                                     [this](const std::string &message) {
                                                         const std::lock_guard<std::mutex> lock(mutex);
                                                         logs.push_back(message);
                                                         if (message.find("Cached clip") != std::string::npos)
                                                         {
                                                             cacheMessages += 1;
                                                         }
                                                     },
                                                 },
                                                 config)
        {
        }

        std::vector<std::uint32_t> finishedSnapshot()
        {
            const std::lock_guard<std::mutex> lock(mutex);
            return finished;
        }

        bool finishedContains(std::uint32_t id)
        {
            const std::lock_guard<std::mutex> lock(mutex);
            return std::find(finished.begin(), finished.end(), id) != finished.end();
        }

        std::optional<std::uint64_t> progressSnapshot(std::uint32_t id)
        {
            const std::lock_guard<std::mutex> lock(mutex);
            const auto it = lastProgress.find(id);
            if (it == lastProgress.end())
            {
                return std::nullopt;
            }
            return it->second;
        }

        //* A later sample landing more than 100 ms below an earlier one proves a
        //* loop cycle completed and restarted (positions only regress on wraps).
        bool wrapObserved(std::uint32_t id)
        {
            const std::lock_guard<std::mutex> lock(mutex);
            const auto it = history.find(id);
            if (it == history.end())
            {
                return false;
            }
            std::uint64_t runningMax = 0;
            for (std::uint64_t sample : it->second)
            {
                if (runningMax > sample + 100)
                {
                    return true;
                }
                runningMax = runningMax < sample ? sample : runningMax;
            }
            return false;
        }

        std::uint64_t maxProgressOf(std::uint32_t id)
        {
            const std::lock_guard<std::mutex> lock(mutex);
            const auto it = maxProgress.find(id);
            return it == maxProgress.end() ? 0 : it->second;
        }

        AudioEngine engine;

        bool wildProgress = false;
        std::uint64_t progressSamples = 0;
        std::uint32_t cacheMessages = 0;

      private:
        std::mutex mutex;
        std::vector<std::uint32_t> finished;
        std::map<std::uint32_t, std::uint64_t> lastProgress;
        std::map<std::uint32_t, std::uint64_t> maxProgress;
        std::map<std::uint32_t, std::vector<std::uint64_t>> history;
        std::vector<std::string> logs;
    };

    EngineConfig nullTestConfig()
    {
        EngineConfig config;
        config.periodMs = 10;
        config.ringMs = 256;
        config.maxVoicesPerStream = 32;
        config.clipCacheBytes = 64ull << 20;
        config.progressHz = 50;
        config.useNullBackend = true;
        return config;
    }

    std::shared_ptr<std::atomic<float>> constantBoost(float value)
    {
        return std::make_shared<std::atomic<float>>(value);
    }

    //* ---------------------------------------------------- basic play + drain

    void casePlayCompletesOnDrain()
    {
        std::fprintf(stderr, "  [playback] play completes on drain\n");
        Harness harness(nullTestConfig());
        const auto wav = writeTestWav("drain-1s.wav", 1.0);

        const auto info = harness.engine.play(1, wav.string(), nullptr, "null-test", 100.f, constantBoost(1.f), false, true);
        AUDIOPAD_TEST_REQUIRE(info.has_value());

        const std::uint64_t lengthFrames = info->lengthFrames;
        AUDIOPAD_TEST_REQUIRE(lengthFrames > 0);
        AUDIOPAD_TEST_REQUIRE(info->lengthInMs >= 900 && info->lengthInMs <= 1100);
        AUDIOPAD_TEST_REQUIRE(info->sampleRate > 0);

        AUDIOPAD_TEST_REQUIRE(waitFor([&] { return harness.finishedContains(1); }, 20000));

        //* The callback consumed every produced frame — the drain, not a timer,
        //* decided completion.
        const auto &stats = harness.engine.stats();
        AUDIOPAD_TEST_REQUIRE(stats.mixedFrames.load() == lengthFrames);
        AUDIOPAD_TEST_REQUIRE(stats.voicesReused.load() >= 1);

        //* Progress reached (almost) the end of the clip before the event.
        const auto finalProgress = harness.progressSnapshot(1);
        AUDIOPAD_TEST_REQUIRE(finalProgress.has_value());
        AUDIOPAD_TEST_REQUIRE(*finalProgress + 250 >= info->lengthInMs);

        AUDIOPAD_TEST_REQUIRE(!harness.wildProgress);
        AUDIOPAD_TEST_REQUIRE(harness.progressSamples > 0);
        AUDIOPAD_TEST_REQUIRE(harness.engine.activeVoiceCount() == 0);
    }

    //* ---------------------------------------------------- stop suppresses completion

    void caseStopMidPlay()
    {
        std::fprintf(stderr, "  [playback] stop mid-play frees the voice without an event\n");
        Harness harness(nullTestConfig());
        const auto wav = writeTestWav("stop-2s.wav", 2.0);

        const auto info = harness.engine.play(2, wav.string(), nullptr, "null-test", 100.f, constantBoost(1.f), false, true);
        AUDIOPAD_TEST_REQUIRE(info.has_value());

        AUDIOPAD_TEST_REQUIRE(waitFor([&] {
            const auto progress = harness.progressSnapshot(2);
            return progress.has_value() && *progress >= 300;
        }, 20000));

        AUDIOPAD_TEST_REQUIRE(harness.engine.stop(2));
        AUDIOPAD_TEST_REQUIRE(waitFor([&] { return harness.engine.activeVoiceCount() == 0; }, 10000));

        const auto progressAtStop = harness.progressSnapshot(2);
        std::this_thread::sleep_for(std::chrono::milliseconds(300));
        const auto progressAfter = harness.progressSnapshot(2);
        AUDIOPAD_TEST_REQUIRE(progressAtStop == progressAfter); //* no further consumption
        AUDIOPAD_TEST_REQUIRE(!harness.finishedContains(2));    //* user stop never emits onFinished

        const auto &stats = harness.engine.stats();
        AUDIOPAD_TEST_REQUIRE(stats.mixedFrames.load() < info->lengthFrames); //* stopped before the end
    }

    //* ---------------------------------------------------- pause / resume

    void casePauseResume()
    {
        std::fprintf(stderr, "  [playback] pause freezes progress, resume continues\n");
        Harness harness(nullTestConfig());
        const auto wav = writeTestWav("pause-2s.wav", 2.0);

        AUDIOPAD_TEST_REQUIRE(harness.engine.play(3, wav.string(), nullptr, "null-test", 100.f, constantBoost(1.f), false, true).has_value());

        AUDIOPAD_TEST_REQUIRE(waitFor([&] {
            const auto progress = harness.progressSnapshot(3);
            return progress.has_value() && *progress >= 200;
        }, 20000));

        AUDIOPAD_TEST_REQUIRE(harness.engine.pause(3));

        const auto frozen = harness.progressSnapshot(3);
        std::this_thread::sleep_for(std::chrono::milliseconds(400));
        AUDIOPAD_TEST_REQUIRE(harness.progressSnapshot(3) == frozen); //* mixed nothing while paused

        {
            const auto snap = harness.engine.snapshot(3);
            AUDIOPAD_TEST_REQUIRE(snap.has_value() && snap->paused);
        }

        AUDIOPAD_TEST_REQUIRE(harness.engine.resume(3));
        AUDIOPAD_TEST_REQUIRE(waitFor([&] {
            const auto progress = harness.progressSnapshot(3);
            return progress.has_value() && *progress > *frozen + 100;
        }, 20000));

        AUDIOPAD_TEST_REQUIRE(harness.engine.stop(3));
        AUDIOPAD_TEST_REQUIRE(waitFor([&] { return harness.engine.activeVoiceCount() == 0; }, 10000));
    }

    //* ---------------------------------------------------- seek

    void caseSeek()
    {
        std::fprintf(stderr, "  [playback] seek repositions the producer-side source\n");
        Harness harness(nullTestConfig());
        const auto wav = writeTestWav("seek-2s.wav", 2.0);

        const auto info = harness.engine.play(4, wav.string(), nullptr, "null-test", 100.f, constantBoost(1.f), false, true);
        AUDIOPAD_TEST_REQUIRE(info.has_value());

        AUDIOPAD_TEST_REQUIRE(waitFor([&] {
            const auto progress = harness.progressSnapshot(4);
            return progress.has_value() && *progress >= 100;
        }, 20000));

        const std::uint64_t half = info->lengthFrames / 2;
        AUDIOPAD_TEST_REQUIRE(harness.engine.seek(4, half));

        AUDIOPAD_TEST_REQUIRE(waitFor([&] {
            const auto snap = harness.engine.snapshot(4);
            return snap.has_value() && snap->playedFrames + 96 >= half; //* one period of slack
        }, 5000));

        AUDIOPAD_TEST_REQUIRE(waitFor([&] {
            const auto progress = harness.progressSnapshot(4);
            return progress.has_value() && *progress >= info->lengthInMs / 2 - 250;
        }, 20000));

        AUDIOPAD_TEST_REQUIRE(harness.engine.stop(4));
    }

    //* ---------------------------------------------------- repeat / loop

    void caseRepeat()
    {
        std::fprintf(stderr, "  [playback] repeat loops without completing\n");
        Harness harness(nullTestConfig());
        const auto wav = writeTestWav("repeat-06.wav", 0.6);

        AUDIOPAD_TEST_REQUIRE(harness.engine.play(5, wav.string(), nullptr, "null-test", 100.f, constantBoost(1.f), false, true).has_value());
        AUDIOPAD_TEST_REQUIRE(harness.engine.setRepeat(5, true));

        //* 0.6 s clip, looped: wait long enough for at least one wrap.
        std::this_thread::sleep_for(std::chrono::milliseconds(2200));

        AUDIOPAD_TEST_REQUIRE(!harness.finishedContains(5)); //* looping never drains

        const auto snap = harness.engine.snapshot(5);
        AUDIOPAD_TEST_REQUIRE(snap.has_value() && snap->repeat);

        //* Full cycles happened: the position wrapped after reaching the end —
        //* the wrap must not cut cycles short, so the high-water mark of the
        //* first cycle sits near the clip's end.
        AUDIOPAD_TEST_REQUIRE(harness.wrapObserved(5));
        AUDIOPAD_TEST_REQUIRE(harness.maxProgressOf(5) >= 400);

        AUDIOPAD_TEST_REQUIRE(harness.engine.stop(5));
        AUDIOPAD_TEST_REQUIRE(waitFor([&] { return harness.engine.activeVoiceCount() == 0; }, 10000));
    }

    //* ---------------------------------------------------- clip cache (Task 5)

    void caseClipCache()
    {
        std::fprintf(stderr, "  [playback] repeated plays reuse the decoded clip cache\n");
        Harness harness(nullTestConfig());
        const auto wav = writeTestWav("cache-1s.wav", 1.0);

        for (std::uint32_t id = 10; id <= 12; ++id)
        {
            const auto before = harness.engine.stats().mixedFrames.load();
            AUDIOPAD_TEST_REQUIRE(harness.engine.play(id, wav.string(), nullptr, "null-test", 100.f, constantBoost(1.f), false, false).has_value());
            AUDIOPAD_TEST_REQUIRE(waitFor([&] { return harness.finishedContains(id); }, 20000));

            const auto after = harness.engine.stats().mixedFrames.load();
            AUDIOPAD_TEST_REQUIRE(after - before > 40000); //* a full second of frames per play
        }

        AUDIOPAD_TEST_REQUIRE(harness.cacheMessages >= 1); //* the capture path committed at least once
    }

    //* ---------------------------------------------------- rapid start/stop (Task 1)

    void caseRapidStartStopStress()
    {
        std::fprintf(stderr, "  [playback] rapid start/stop stress from two threads\n");
        Harness harness(nullTestConfig());
        const auto wav = writeTestWav("stress-04.wav", 0.4);

        const int perThread = stressIterations();
        std::atomic<int> nextId{1000};
        std::atomic<int> plays{0};

        const auto worker = [&] {
            for (int i = 0; i < perThread; ++i)
            {
                const auto id = static_cast<std::uint32_t>(nextId.fetch_add(1));
                const auto ok = harness.engine.play(id, wav.string(), nullptr, "null-test", 100.f, constantBoost(1.f), false, false);
                if (!ok)
                {
                    continue; //* voice pool exhausted momentarily — allowed under saturation
                }
                plays.fetch_add(1);

                switch (i % 3)
                {
                    case 0:
                        harness.engine.stop(id);
                        break;
                    case 1:
                        harness.engine.pause(id);
                        harness.engine.resume(id);
                        harness.engine.stop(id);
                        break;
                    default:
                        harness.engine.seek(id, 5000);
                        harness.engine.stop(id);
                        break;
                }
            }
        };

        std::thread a(worker);
        std::thread b(worker);
        a.join();
        b.join();

        harness.engine.stopAll();
        AUDIOPAD_TEST_REQUIRE(waitFor([&] { return harness.engine.activeVoiceCount() == 0; }, 15000));
        AUDIOPAD_TEST_REQUIRE(plays.load() > 0);
        AUDIOPAD_TEST_REQUIRE(!harness.wildProgress);

        //* The engine must still be fully functional after the storm.
        AUDIOPAD_TEST_REQUIRE(harness.engine.play(2000, wav.string(), nullptr, "null-test", 100.f, constantBoost(1.f), false, true).has_value());
        AUDIOPAD_TEST_REQUIRE(waitFor([&] { return harness.finishedContains(2000); }, 20000));
    }
} // namespace

int main()
{
    isolateConfigurationToScratch();

    std::fprintf(stderr, "playback regression:\n");
    casePlayCompletesOnDrain();
    caseStopMidPlay();
    casePauseResume();
    caseSeek();
    caseRepeat();
    caseClipCache();
    caseRapidStartStopStress();

    std::fprintf(stderr, "playback regression: PASS\n");
    return 0;
}
