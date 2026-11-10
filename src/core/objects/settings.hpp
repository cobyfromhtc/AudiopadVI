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

            //* --- Live monitoring & voice slots ---
            //* Routes the (optionally preset-processed) microphone to the local
            //* monitor device so the user hears themselves.
            bool hearMyself = false;

            //* --- Now-Playing overlay ---
            bool overlayEnabled = false;
            int overlayPosition = 0; //* 0..7 — 4 corners + 4 edge midpoints

            //* --- Local remote-control / automation interface ---
            //* Serves the mobile controller page and the WebSocket control
            //* protocol from the running desktop (PIN-protected, LAN + localhost).
            bool remoteControlEnabled = true;
            std::optional<std::string> remotePin; //* 6-digit pairing PIN, generated on first use
            int remotePort = 38712;

            //* --- Additional global hotkeys ---
            std::vector<int> micMuteHotkey;           //* toggle microphone mute
            std::vector<int> hearMyselfHotkey;        //* toggle "hear myself" monitoring
            std::vector<int> overlayHotkey;           //* show / hide the now-playing overlay
            std::vector<int> overlayPositionHotkey;   //* cycle the overlay position
        };
    } // namespace Objects
} // namespace Audiopad