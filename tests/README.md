# Tests & benchmarks

The test suite guards the engine rework: playback semantics, callback budgets,
the asset/configuration pipeline and latency tuning. It exists so the
behavioral contracts of the rework (publication before observation, drain-based
completion, bounded imports) fail loudly if a future change regresses them.

## Running

```sh
cmake -B build -DCMAKE_BUILD_TYPE=Release      # tests build by default (AUDIOPAD_BUILD_TESTS=ON)
cmake --build build
ctest --test-dir build --output-on-failure          # regression + benchmark
ctest --test-dir build -L benchmark                 # latency harness only
```

The tests run against miniaudio's **null backend** (`useNullBackend`), so they
exercise the full engine (device callback, producer, publisher, mixing) without
audio hardware — on Windows, Linux and CI alike. The null backend consumes at
roughly half real time; the built-in timeouts account for that.

### Test index

| target | guards |
| --- | --- |
| `test_playback` | play() publishes fully-initialized voices before the callback can observe them (Task 1); completion fires only after the final frame was consumed by the device callback — no timers (Task 5); stop suppresses the event; pause/resume freeze and continue consumption; seek repositions on the producer thread; repeat loops without completing; the decoded-clip cache serves replays (Task 5); a two-thread rapid start/stop storm leaves no leaked voices and a functional engine (Task 1). |
| `test_callback_budget` | with every preallocated voice playing at once: zero underruns at the default ring depth, worst callback far inside the period budget, granted period reported back (Tasks 2–4). |
| `test_assets` | percent-encoded `file://` URIs for WebView2/WebKitGTK incl. spaces/`#`/`?`/`%`/unicode and Windows drive letters (Task 7); atomic config writes with no temp residue; `DebouncedWriter` coalesces bursts, flushes synchronously, commits the last pending snapshot on destruction (Task 6); the artwork store is content-addressed, config compaction swaps inline data URLs for `managed://` refs and back (Task 6); oversized/undecodable imports are rejected (Task 6). |
| `benchmark_latency` | informational: requested vs granted period, trigger-to-output latency (cold decoder open vs cached clip), worst callback, underruns. Always exits 0. |

## Thread sanitizer

The rapid start/stop case is the race regression test for the Task-1 fix. Run
it under TSan where the toolchain supports it:

```sh
cmake -B build-tsan -DCMAKE_BUILD_TYPE=Debug \
      -DCMAKE_CXX_FLAGS="-fsanitize=thread -g" \
      -DCMAKE_EXE_LINKER_FLAGS="-fsanitize=thread"
cmake --build build-tsan
AUDIOPAD_TEST_STRESS_ITTERS=3000 ctest --test-dir build-tsan -R test_playback --output-on-failure
```

`AUDIOPAD_TEST_STRESS_ITERS` scales the storm (default 150 per thread).

## Latency tuning workflow (Task 2)

The environment knobs the engine reads (see `src/helper/audio/audio.cpp`):

| variable | default | meaning |
| --- | --- | --- |
| `AUDIOPAD_PERIOD_MS` | 10 | requested device period — the callback cadence |
| `AUDIOPAD_RING_MS` | 512 | per-voice PCM ring depth — jitter absorption |
| `AUDIOPAD_CLIP_CACHE_MB` | 64 | decoded-PCM cache budget (0 disables) |
| `AUDIOPAD_PROGRESS_HZ` | 30 | progress publisher rate |
| `AUDIOPAD_MAX_VOICES` | 32 | preallocated voices per endpoint |

To tune a real machine (the null backend only measures the engine, not the
driver stack):

```sh
# 1. baseline at the defaults, real backend:
./audiopad                       # watch the "opened: ... period N frames (X ms actual, 10 ms requested)" log
# 2. sweep the period, watch underruns in the shutdown summary:
AUDIOPAD_PERIOD_MS=5  ./audiopad
AUDIOPAD_PERIOD_MS=20 ./audiopad
# 3. shrink the ring until underruns appear, then back off one step:
AUDIOPAD_RING_MS=128 ./audiopad
```

Pick the smallest period that keeps underruns at zero; every further
reduction trades CPU wakeups against robustness, not audibly better latency.

## Build-mode comparison (Task 8)

Before enabling IPO/LTO (`-DAUDIOPAD_ENABLE_IPO=ON`), compare:

```sh
for mode in Release RelWithDebInfo; do
    cmake -B build-$mode -DCMAKE_BUILD_TYPE=$mode
    cmake --build build-$mode --target benchmark_latency
    echo "== $mode =="; ./build-$mode/benchmark_latency
done
```

Keep a build mode / IPO only when the numbers (binary size, `play() ret`,
`worst callback`) justify it — the CMake option is opt-in for exactly that
reason, and the static CRT is set through the CMP0091 policy instead of cached
flag rewrites so third-party targets are never caught by it.
