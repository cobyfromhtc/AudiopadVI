#pragma once
#include <cstdint>
#include <string>
#include <vector>

namespace Audiopad
{
    namespace Objects
    {
        //* A currently open top-level application window, used by the "Target Window"
        //* picker. `processName` is the stable identifier (binary/exe name) that gets
        //* persisted in the settings and used for audio routing.
        struct AppWindow
        {
            std::string title;
            std::string processName;
            std::uint32_t pid = 0;
        };

        //* Enumerates candidate routing targets for the "Target Window" picker.
        //* Every open top-level application window is returned so any running
        //* app can be selected as the routing target. Returns an empty list
        //* when enumeration is unsupported (e.g. Wayland sessions without
        //* X11 window managers).
        std::vector<AppWindow> getAppWindows();
    } // namespace Objects
} // namespace Audiopad
