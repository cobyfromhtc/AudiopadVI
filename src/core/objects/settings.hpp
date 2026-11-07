#pragma once
#include <core/enums/enums.hpp>
#include <string>
#include <optional>
#include <vector>

namespace Audiopad
{
    namespace Objects
    {
        struct Settings
        {
            Enums::BackendType audioBackend = Enums::BackendType::PulseAudio;
            Enums::ViewMode viewMode = Enums::ViewMode::List;
            Enums::Theme theme = Enums::Theme::System;
            std::optional<std::string> language;

            std::vector<int> pushToTalkKeys;
            std::vector<int> stopHotkey;

            std::vector<std::string> outputs;
            std::uint32_t selectedTab = 0;

            //* When set, soundboard audio is routed exclusively into this application
            //* (identified by its process/binary name, e.g. "Roblox"). Other apps such
            //* as Discord will not receive any soundboard audio while this is active.
            std::optional<std::string> targetWindow;

            int remoteVolume = 100;
            int localVolume = 50;
            bool syncVolumes = false;

            //* Global output amplification in percent (100 = no boost, up to 400).
            int soundBoost = 100;

            bool allowMultipleOutputs = false;
            bool useAsDefaultDevice = false;
            bool muteDuringPlayback = false;
            bool allowOverlapping = true;
            bool minimizeToTray = false;
            bool tabHotkeysOnly = false;
            bool deleteToTrash = true;
        };
    } // namespace Objects
} // namespace Audiopad