#pragma once
#include <atomic>
#include <cstdint>
#include <filesystem>
#include <functional>
#include <thread>

namespace Audiopad
{
    namespace Helper
    {
        //* Watches a directory tree for external changes (files or folders added,
        //* removed, renamed or modified — e.g. a user dropping a new sound into the
        //* category folder via the file explorer) and fires `callback` once the
        //* change burst has settled (debounced). The callback runs on the watcher
        //* thread. Destroying the watcher (or calling stop()) joins the thread, so
        //* no callback can outlive the object.
        class FolderWatcher
        {
          public:
            using Callback = std::function<void()>;

            //* `directory` is watched recursively. `debounceMs` is the quiet period
            //* that has to pass after the last event before the callback fires.
            FolderWatcher(std::filesystem::path directory, Callback callback, unsigned int debounceMs = 600);

            //* Stops the watcher and joins its thread. Safe to call multiple times.
            ~FolderWatcher();

            FolderWatcher(const FolderWatcher &) = delete;
            FolderWatcher &operator=(const FolderWatcher &) = delete;
            FolderWatcher(FolderWatcher &&) = delete;
            FolderWatcher &operator=(FolderWatcher &&) = delete;

            void stop();

          private:
            void run();

            std::filesystem::path directory;
            Callback callback;
            unsigned int debounceMs;
            std::atomic<bool> stopping{false};
            std::thread worker;
        };
    } // namespace Helper
} // namespace Audiopad
