#pragma once
#include <atomic>
#include <chrono>
#include <condition_variable>
#include <functional>
#include <mutex>
#include <string>
#include <thread>

namespace Audiopad
{
    namespace Helpers
    {
        //* Coalesces bursts of write requests into single commits.
        //*
        //* `producer` snapshots the state (it runs on the thread that called
        //* schedule(), so the snapshot never races the caller's own mutations);
        //* `committer` persists the latest snapshot on a background thread once no
        //* further request arrived for `quietPeriod`. flush() commits the pending
        //* snapshot synchronously (exit paths, explicit savepoints).
        class DebouncedWriter
        {
          public:
            using Producer = std::function<std::string()>;
            using Committer = std::function<void(const std::string &)>;

            DebouncedWriter(std::chrono::milliseconds quietPeriod, Producer producer, Committer committer);
            ~DebouncedWriter();

            DebouncedWriter(const DebouncedWriter &) = delete;
            DebouncedWriter &operator=(const DebouncedWriter &) = delete;

            //* Snapshots via the producer and (re)starts the debounce window.
            void schedule();

            //* Commits the latest snapshot immediately (no-op when clean).
            void flush();

          private:
            void run();
            bool commitPending(std::unique_lock<std::mutex> &lock);

            const std::chrono::milliseconds quietPeriod;
            const Producer producer;
            const Committer committer;

            std::mutex mutex;
            std::condition_variable cv;
            std::string pending;
            bool dirty = false;
            std::chrono::steady_clock::time_point lastSchedule{};
            std::thread worker;
            std::atomic<bool> quit{false};
        };
    } // namespace Helpers
} // namespace Audiopad
