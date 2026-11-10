#pragma once
#include <core/enums/enums.hpp>
#include <optional>
#include <string>
#include <vector>

namespace Audiopad
{
    namespace Objects
    {
        struct AudioDevice;

        struct Sound
        {
            std::uint32_t id;
            std::string name;
            std::string path;
            bool isFavorite = false;

            std::vector<int> hotkeys;
            std::uint64_t modifiedDate;

            std::optional<int> localVolume;
            std::optional<int> remoteVolume;
            std::string image;

            //* Display-name override: when set the UI shows this instead of the
            //* file stem. Renaming never touches the file on disk.
            std::optional<std::string> displayName;

            //* Free-form organization tags (persisted locally with the model).
            std::vector<std::string> tags;

            //* Per-sound playback policies.
            Enums::TriggerMode triggerMode = Enums::TriggerMode::PlayRestart;
            bool loopByDefault = false;  //* start the clip with repeat enabled
            bool stopOthers = false;     //* this sound stops every other clip on start
            bool muteOthers = false;     //* temporarily silence other clips while this one plays
            //* Per-sound microphone policy: nullopt follows the global
            //* "muteDuringPlayback" setting, true/false forces it for this clip.
            std::optional<bool> muteVoice;

            //* When set this entry is a live voice-filter slot instead of a file:
            //* triggering it selects the preset ("deep" / "high" / "echo" / "robot")
            //* for the microphone path instead of playing audio.
            std::optional<std::string> voicePreset;
        };

        //* A nested folder inside a soundboard category (Tab). The structure mirrors the
        //* on-disk directory tree: every Folder owns the sounds directly contained in its
        //* directory plus a list of child folders. Folders created by the user through the
        //* UI are preserved across rescans even while they are still empty.
        struct Folder
        {
            std::uint32_t id = 0;
            std::string name;
            std::string path;

            std::vector<Sound> sounds;
            std::vector<Folder> folders;
        };

        struct Tab
        {
            std::uint32_t id; //* Equal to index
            std::string name;
            std::string path;

            std::vector<Sound> sounds;
            std::vector<Folder> folders;
            Enums::SortMode sortMode = Enums::SortMode::ModifiedDate_Descending;

            //* Per-soundboard output amplification in percent (100 = no boost, up to 400).
            int boost = 100;

            //* Custom board icon (bounded data URL, same pipeline as sound images).
            std::string icon;

            //* Manual sound arrangement used while sortMode == Manual: a flat
            //* sequence of sound ids defining the order across the whole category
            //* tree. Unknown ids (freshly discovered files) are appended at the end.
            std::vector<std::uint32_t> soundOrder;

            //* Manual folder arrangement used while sortMode == Manual: a flat
            //* sequence of folder ids applied at every level of the category tree.
            //* Unknown ids (freshly discovered folders) keep their scan order and
            //* collect at the end of their level.
            std::vector<std::uint32_t> folderOrder;
        };
    } // namespace Objects
} // namespace Audiopad