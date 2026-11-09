#include "debounce_writer.hpp"

namespace Audiopad
{
    namespace Helpers
    {
        DebouncedWriter::DebouncedWriter(std::chrono::milliseconds quietPeriod, Producer producer, Committer committer)
            : quietPeriod(quietPeriod), producer(std::move(producer)), committer(std::move(committer))
        {
            worker = std::thread([this] { run(); });
        }

        DebouncedWriter::~DebouncedWriter()
        {
            quit.store(true, std::memory_order_relaxed);
            cv.notify_all();
            if (worker.joinable())
            {
                worker.join();
            }

            //* Best-effort final commit so a destroyed writer never loses the very
            //* last scheduled snapshot.
            std::unique_lock<std::mutex> lock(mutex);
            if (dirty)
            {
                const std::string latest = std::move(pending);
                dirty = false;
                lock.unlock();
                try
                {
                    committer(latest);
                }
                catch (...)
                {
                }
            }
        }

        void DebouncedWriter::schedule()
        {
            //* Snapshot on the caller's thread — the caller just mutated the state
           //* and owns it right now.
            std::string snapshot = producer();

            {
                std::lock_guard<std::mutex> lock(mutex);
                pending = std::move(snapshot);
                dirty = true;
                lastSchedule = std::chrono::steady_clock::now();
            }
            cv.notify_one();
        }

        bool DebouncedWriter::commitPending(std::unique_lock<std::mutex> &lock)
        {
            if (!dirty)
            {
                return false;
            }
            const std::string latest = std::move(pending);
            dirty = false;
            lock.unlock();

            bool committed = true;
            try
            {
                committer(latest);
            }
            catch (...)
            {
                committed = false;
            }

            lock.lock();
            return committed;
        }

        void DebouncedWriter::run()
        {
            std::unique_lock<std::mutex> lock(mutex);
            while (!quit.load(std::memory_order_relaxed))
            {
                if (!dirty)
                {
                    cv.wait(lock, [this] { return dirty || quit.load(std::memory_order_relaxed); });
                    continue;
                }

                const auto deadline = lastSchedule + quietPeriod;
                if (cv.wait_until(lock, deadline, [this, deadline] {
                        return quit.load(std::memory_order_relaxed) || !dirty || lastSchedule > deadline;
                    }))
                {
                    continue; //* new request re-armed the window (or quit) — loop
                }

                commitPending(lock);
            }
        }

        void DebouncedWriter::flush()
        {
            std::unique_lock<std::mutex> lock(mutex);
            commitPending(lock);
        }
    } // namespace Helpers
} // namespace Audiopad
