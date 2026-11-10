#include "queue.hpp"

namespace Audiopad::Objects
{
    void Queue::handle()
    {
        std::unique_lock lock(queueMutex);
        while (!stop)
        {
            cv.wait(lock, [&]() { return !queue.empty() || stop; });
            while (!queue.empty())
            {
                auto front = std::move(*queue.begin());

                lock.unlock();
                front.second();
                lock.lock();

                queue.erase(front.first);
            }
        }
    }

    void Queue::push_unique(std::uint64_t id, std::function<void()> function)
    {
        //* Dedupe and insert under one lock: checking and inserting in separate
        //* critical sections let two threads pushing the same id interleave —
        //* both passed the find(), the second emplace silently failed and the
        //* newer job was dropped while the stale one still ran.
        {
            std::unique_lock lock(queueMutex);
            if (queue.find(id) != queue.end())
            {
                return;
            }
            queue.emplace(id, std::move(function));
        }

        cv.notify_one();
    }

    Queue::Queue()
    {
        handler = std::thread([this] { handle(); });
    }
    Queue::~Queue()
    {
        stop = true;
        cv.notify_all();
        handler.join();
    }
} // namespace Audiopad::Objects