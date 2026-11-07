#include "apps.hpp"
#include <algorithm>
#include <cctype>
#include <filesystem>
#include <iterator>
#include <string>

#if defined(_WIN32)
#include <windows.h>
#elif defined(__linux__)
#include <helper/icons/forward.hpp>
#include <unistd.h>
#include <fstream>
#endif

namespace Audiopad::Objects
{
#if defined(_WIN32)
    namespace
    {
        std::string narrowTitle(HWND hwnd)
        {
            const auto length = GetWindowTextLengthW(hwnd);
            if (length <= 0)
            {
                return {};
            }

            std::wstring buffer(static_cast<std::size_t>(length) + 1, L'\0');
            GetWindowTextW(hwnd, buffer.data(), static_cast<int>(buffer.size()));
            buffer.resize(std::char_traits<wchar_t>::length(buffer.c_str()));

            std::string rtn;
            rtn.resize(WideCharToMultiByte(CP_UTF8, 0, buffer.c_str(), static_cast<int>(buffer.size()), nullptr, 0,
                                           nullptr, nullptr));
            if (!rtn.empty())
            {
                WideCharToMultiByte(CP_UTF8, 0, buffer.c_str(), static_cast<int>(buffer.size()), rtn.data(),
                                    static_cast<int>(rtn.size()), nullptr, nullptr);
            }
            return rtn;
        }

        std::string processNameFromPid(std::uint32_t pid)
        {
            std::string rtn;

            const HANDLE process = OpenProcess(PROCESS_QUERY_LIMITED_INFORMATION, FALSE, pid);
            if (process)
            {
                wchar_t imagePath[MAX_PATH] = {0};
                DWORD size = MAX_PATH;
                if (QueryFullProcessImageNameW(process, 0, imagePath, &size) && size > 0)
                {
                    rtn = std::filesystem::path(std::wstring(imagePath, size)).stem().u8string();
                }
                CloseHandle(process);
            }

            return rtn;
        }

        //* Session hosts and system plumbing that must never show up as a
        //* routing target even though they occasionally expose top-level windows.
        bool isSystemProcess(const std::string &processName)
        {
            std::string lowered;
            lowered.reserve(processName.size());
            std::transform(processName.begin(), processName.end(), std::back_inserter(lowered), [](unsigned char c) {
                return static_cast<char>(std::tolower(c));
            });

            return lowered == "audiodg" || lowered == "svchost" || lowered == "audioses" ||
                   lowered == "applicationframehost" || lowered == "runtimebroker";
        }
    } // namespace

    std::vector<AppWindow> getAppWindows()
    {
        std::vector<AppWindow> windows;

        //* EnumWindows requires a captureless callback (plain C function pointer),
        //* so everything the callback needs travels through lParam.
        struct EnumContext
        {
            std::vector<AppWindow> *windows;
            DWORD ownPid;
        } context{&windows, GetCurrentProcessId()};

        EnumWindows(
            [](HWND hwnd, LPARAM lParam) -> BOOL {
                auto *context = reinterpret_cast<EnumContext *>(lParam);
                auto *collected = context->windows;

                if (!IsWindowVisible(hwnd) || GetWindowTextLengthW(hwnd) <= 0)
                {
                    return TRUE;
                }

                //* Hide tool windows (floating palettes, tooltips) which are not real apps.
                const auto exStyle = GetWindowLongPtrW(hwnd, GWL_EXSTYLE);
                if ((exStyle & WS_EX_TOOLWINDOW) != 0)
                {
                    return TRUE;
                }

                std::uint32_t pid = 0;
                GetWindowThreadProcessId(hwnd, reinterpret_cast<LPDWORD>(&pid));
                if (pid == 0 || pid == context->ownPid)
                {
                    return TRUE;
                }

                AppWindow window;
                window.title = narrowTitle(hwnd);
                window.processName = processNameFromPid(pid);
                if (window.processName.empty() || window.title.empty() || isSystemProcess(window.processName))
                {
                    return TRUE;
                }

                //* Filter out the desktop/taskbar ghosts exposed by Explorer.
                if (window.processName == "explorer" &&
                    (window.title == "Program Manager" || window.title == "Windows Input Experience"))
                {
                    return TRUE;
                }

                window.pid = pid;
                collected->emplace_back(std::move(window));
                return TRUE;
            },
            reinterpret_cast<LPARAM>(&context));

        //* Keep a single entry per process — the setting persists the process name anyway.
        std::vector<AppWindow> unique;
        unique.reserve(windows.size());
        for (auto &window : windows)
        {
            if (std::none_of(unique.begin(), unique.end(),
                             [&window](const AppWindow &item) { return item.processName == window.processName; }))
            {
                unique.emplace_back(std::move(window));
            }
        }

        std::sort(unique.begin(), unique.end(),
                  [](const AppWindow &first, const AppWindow &second) { return first.title < second.title; });

        return unique;
    }
#elif defined(__linux__)
    namespace
    {
        std::string processNameFromPid(std::uint32_t pid)
        {
            std::error_code ec;
            if (auto exe = std::filesystem::read_symlink("/proc/" + std::to_string(pid) + "/exe", ec); !ec)
            {
                auto name = exe.filename().u8string();
                if (!name.empty())
                {
                    return name;
                }
            }

            std::ifstream comm("/proc/" + std::to_string(pid) + "/comm");
            std::string name;
            if (comm.is_open() && std::getline(comm, name) && !name.empty())
            {
                name.erase(name.find_last_not_of(" \t\r\n") + 1);
                return name;
            }

            return {};
        }
    } // namespace

    //* Linux keeps the classic visible-window enumeration: mapping capture
    //* streams back to windowed apps would require PipeWire stream introspection
    //* which is not wired into the helper layer yet. The list is documented as
    //* best-effort on Linux (Wayland sessions may return nothing at all).
    std::vector<AppWindow> getAppWindows()
    {
        std::vector<AppWindow> unique;

        if (!LibWnck::getDefaultScreen || !LibWnck::getScreenWindows)
        {
            //* libwnck is unavailable (e.g. pure Wayland sessions) — window enumeration
            //* is not supported there, report an empty list instead of failing.
            return unique;
        }

        auto *screen = LibWnck::getDefaultScreen();
        if (!screen)
        {
            return unique;
        }

        LibWnck::forceUpdate(screen);

        const auto ownPid = static_cast<std::uint32_t>(getpid());

        for (GList *item = LibWnck::getScreenWindows(screen); item != nullptr; item = item->next)
        {
            auto *window = reinterpret_cast<LibWnck::Window *>(item->data);
            if (!window)
            {
                continue;
            }

            if (LibWnck::isSkipTasklist && LibWnck::isSkipTasklist(window))
            {
                continue;
            }

            std::string title = LibWnck::getWindowName ? LibWnck::getWindowName(window) : "";
            if (title.empty())
            {
                continue;
            }

            const auto pid = static_cast<std::uint32_t>(LibWnck::getWindowPID ? LibWnck::getWindowPID(window) : 0);
            if (pid == 0 || pid == ownPid)
            {
                continue;
            }

            AppWindow appWindow;
            appWindow.title = std::move(title);
            appWindow.processName = processNameFromPid(pid);
            if (appWindow.processName.empty() && LibWnck::getWindowClassInstanceName)
            {
                appWindow.processName = LibWnck::getWindowClassInstanceName(window);
            }
            if (appWindow.processName.empty())
            {
                continue;
            }
            appWindow.pid = pid;

            if (std::none_of(unique.begin(), unique.end(), [&appWindow](const AppWindow &existing) {
                    return existing.processName == appWindow.processName;
                }))
            {
                unique.emplace_back(std::move(appWindow));
            }
        }

        std::sort(unique.begin(), unique.end(),
                  [](const AppWindow &first, const AppWindow &second) { return first.title < second.title; });

        return unique;
    }
#else
    std::vector<AppWindow> getAppWindows()
    {
        return {};
    }
#endif
} // namespace Audiopad::Objects
