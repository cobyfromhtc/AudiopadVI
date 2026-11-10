#pragma once
#include <string>

namespace Audiopad
{
    namespace Helpers
    {
        namespace Pages
        {
            //* The mobile controller page (standalone browser soundboard):
            //* PIN pairing, board browsing, sound triggering, a 10-second voice
            //* recorder with preview / share / save-to-board, and a customizable
            //* button grid. Self-contained — no external assets, works offline.
            std::string controllerPage();

            //* The now-playing overlay HUD page shown in the floating overlay
            //* window: active sounds with progress, live voice preset, mic state.
            std::string overlayPage();
        } // namespace Pages
    } // namespace Helpers
} // namespace Audiopad
