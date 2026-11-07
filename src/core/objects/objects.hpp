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
        };
    } // namespace Objects
} // namespace Audiopad