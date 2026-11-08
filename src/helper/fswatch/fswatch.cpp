#include "fswatch.hpp"
#include <chrono>
#include <fancy.hpp>

#if defined(_WIN32)
#include <windows.h>
#include <malloc.h>
#elif defined(__linux__)
#include <map>
#include <poll.h>
#include <string>
#include <sys/inotify.h>
#include <unistd.h>
#include <vector>
#endif

namespace Audiopad::Helper
{
#if defined(_WIN32)
    namespace
    {
        std::wstring widen(const std::string &text)
        {
            if (text.empty())
            {
                return {};
            }

            const auto size = MultiByteToWideChar(CP_UTF8, 0, text.c_str(), static_cast<int>(text.size()), nullptr, 0);
            std::wstring rtn(size, L'\0');
            MultiByteToWideChar(CP_UTF8, 0, text.c_str(), static_cast<int>(text.size()), rtn.data(),
                                static_cast<int>(rtn.size()));
            return rtn;
        }
    } // namespace

    void FolderWatcher::run()
    {
        //* FILE_FLAG_BACKUP_SEMANTICS is required to open directories; OVERLAPPED lets
        //* us wait with a timeout so stop() stays responsive and the debounce works.
        const HANDLE directoryHandle =
            CreateFileW(widen(directory.u8string()).c_str(), FILE_LIST_DIRECTORY,
                        FILE_SHARE_READ | FILE_SHARE_WRITE | FILE_SHARE_DELETE, nullptr, OPEN_EXISTING,
                        FILE_FLAG_BACKUP_SEMANTICS | FILE_FLAG_OVERLAPPED, nullptr);
        if (directoryHandle == INVALID_HANDLE_VALUE)
        {
            Fancy::fancy.logTime().warning() << "FolderWatcher: cannot open " << directory.u8string() << std::endl;
            return;
        }

        const HANDLE changeEvent = CreateEventW(nullptr, FALSE, FALSE, nullptr);
        if (!changeEvent)
        {
            CloseHandle(directoryHandle);
            return;
        }

        constexpr auto kBufferSize = 64 * 1024;
        auto *buffer = static_cast<char *>(_aligned_malloc(kBufferSize, sizeof(DWORD)));
        if (!buffer)
        {
            CloseHandle(changeEvent);
            CloseHandle(directoryHandle);
            return;
        }

        OVERLAPPED overlapped{};
        overlapped.hEvent = changeEvent;

        bool pendingRead = false;
        bool dirty = false;
        auto lastChange = std::chrono::steady_clock::now();

        while (!stopping.load())
        {
            if (!pendingRead)
            {
                if (!ReadDirectoryChangesW(directoryHandle, buffer, kBufferSize, TRUE,
                                           FILE_NOTIFY_CHANGE_FILE_NAME | FILE_NOTIFY_CHANGE_DIR_NAME |
                                               FILE_NOTIFY_CHANGE_LAST_WRITE | FILE_NOTIFY_CHANGE_SIZE |
                                               FILE_NOTIFY_CHANGE_ATTRIBUTES | FILE_NOTIFY_CHANGE_CREATION,
                                           nullptr, &overlapped, nullptr))
                {
                    break;
                }
                pendingRead = true;
            }

            //* Wait either for the debounce window to elapse (when dirty) or for the
            //* next event. The 200ms cap keeps stop() responsive while idle.
            DWORD waitMs = 200;
            if (dirty)
            {
                const auto elapsed =
                    std::chrono::duration_cast<std::chrono::milliseconds>(std::chrono::steady_clock::now() - lastChange)
                        .count();
                waitMs = elapsed >= debounceMs ? 0
                                               : static_cast<DWORD>(debounceMs - static_cast<unsigned int>(elapsed));
            }

            const auto result = WaitForSingleObject(changeEvent, waitMs);
            if (result == WAIT_OBJECT_0)
            {
                DWORD transferred = 0;
                if (!GetOverlappedResult(directoryHandle, &overlapped, &transferred, FALSE))
                {
                    break;
                }
                pendingRead = false;

                //* transferred == 0 means the buffer overflowed — some events were
                //* lost, so treat it as a change as well.
                dirty = true;
                lastChange = std::chrono::steady_clock::now();
            }

            if (dirty)
            {
                const auto elapsed =
                    std::chrono::duration_cast<std::chrono::milliseconds>(std::chrono::steady_clock::now() - lastChange)
                        .count();
                if (elapsed >= debounceMs)
                {
                    dirty = false;
                    callback();
                }
            }
        }

        if (pendingRead)
        {
            CancelIo(directoryHandle);
        }

        _aligned_free(buffer);
        CloseHandle(changeEvent);
        CloseHandle(directoryHandle);
    }
#elif defined(__linux__)
    namespace
    {
        void addWatchTree(int fd, const std::filesystem::path &root, std::map<int, std::filesystem::path> &watches)
        {
            std::error_code ec;
            const int wd = inotify_add_watch(fd, root.c_str(),
                                             IN_CREATE | IN_DELETE | IN_MODIFY | IN_MOVED_FROM | IN_MOVED_TO |
                                                 IN_ATTRIB | IN_CLOSE_WRITE | IN_DELETE_SELF | IN_MOVE_SELF);
            if (wd >= 0)
            {
                watches[wd] = root;
            }

            for (const auto &entry : std::filesystem::directory_iterator(root, ec))
            {
                if (ec)
                {
                    break;
                }
                if (entry.is_directory())
                {
                    addWatchTree(fd, entry.path(), watches);
                }
            }
        }
    } // namespace

    void FolderWatcher::run()
    {
        const int fd = inotify_init1(IN_NONBLOCK | IN_CLOEXEC);
        if (fd < 0)
        {
            Fancy::fancy.logTime().warning() << "FolderWatcher: inotify_init failed" << std::endl;
            return;
        }

        std::map<int, std::filesystem::path> watches;
        addWatchTree(fd, directory, watches);

        bool dirty = false;
        auto lastChange = std::chrono::steady_clock::now();

        alignas(struct inotify_event) char buffer[64 * 1024];

        while (!stopping.load())
        {
            pollfd polled{};
            polled.fd = fd;
            polled.events = POLLIN;

            int timeout = 200;
            if (dirty)
            {
                const auto elapsed =
                    std::chrono::duration_cast<std::chrono::milliseconds>(std::chrono::steady_clock::now() - lastChange)
                        .count();
                timeout = elapsed >= debounceMs ? 0 : static_cast<int>(debounceMs - static_cast<unsigned int>(elapsed));
            }

            const auto result = poll(&polled, 1, timeout);
            if (result > 0)
            {
                const auto length = read(fd, buffer, sizeof(buffer));
                if (length > 0)
                {
                    bool sawChange = false;
                    std::size_t offset = 0;
                    while (offset + sizeof(struct inotify_event) <= static_cast<std::size_t>(length))
                    {
                        const auto *event = reinterpret_cast<const struct inotify_event *>(buffer + offset);
                        offset += sizeof(struct inotify_event) + event->len;

                        if (event->mask & IN_Q_OVERFLOW)
                        {
                            sawChange = true;
                            continue;
                        }

                        if (event->mask & (IN_IGNORED | IN_UNMOUNT))
                        {
                            watches.erase(event->wd);
                            continue;
                        }

                        if (event->mask & (IN_DELETE_SELF | IN_MOVE_SELF))
                        {
                            watches.erase(event->wd);
                            sawChange = true;
                            continue;
                        }

                        sawChange = true;

                        //* New directories need their own inotify watch — cover the
                        //* whole subtree, not just the new folder itself.
                        if ((event->mask & (IN_CREATE | IN_MOVED_TO)) && (event->mask & IN_ISDIR) && event->len > 0)
                        {
                            const auto parent = watches.find(event->wd);
                            if (parent != watches.end())
                            {
                                addWatchTree(fd, parent->second / std::string(event->name), watches);
                            }
                        }
                    }

                    if (sawChange)
                    {
                        dirty = true;
                        lastChange = std::chrono::steady_clock::now();
                    }
                }
            }

            if (dirty)
            {
                const auto elapsed =
                    std::chrono::duration_cast<std::chrono::milliseconds>(std::chrono::steady_clock::now() - lastChange)
                        .count();
                if (elapsed >= debounceMs)
                {
                    dirty = false;
                    callback();
                }
            }
        }

        close(fd);
    }
#else
    void FolderWatcher::run()
    {
        //* Unsupported platform — never fires.
    }
#endif

    FolderWatcher::FolderWatcher(std::filesystem::path directory, Callback callback, unsigned int debounceMs)
        : directory(std::move(directory)), callback(std::move(callback)), debounceMs(debounceMs)
    {
        worker = std::thread([this] { run(); });
    }

    FolderWatcher::~FolderWatcher()
    {
        stop();
    }

    void FolderWatcher::stop()
    {
        bool expected = false;
        if (stopping.compare_exchange_strong(expected, true) && worker.joinable())
        {
            worker.join();
        }
    }
} // namespace Audiopad::Helper
