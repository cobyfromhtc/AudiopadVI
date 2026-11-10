#pragma once
#include <core/enums/enums.hpp>
#include <core/objects/objects.hpp>
#include <cstdint>
#include <string>
#include <vector>

namespace Audiopad
{
    namespace Objects
    {
        //* Pure arrangement helpers shared by the UI layer, the scan pipeline
        //* and the regression tests. Nothing in here touches globals, audio or
        //* the filesystem — every function works on plain model trees.
        namespace Ordering
        {
            //* Sorts one level of sounds according to the board's sort mode.
            //* In Manual mode the positions inside `manualOrder` decide; ids
            //* that are not (yet) listed keep their relative order and collect
            //* at the end (stable).
            void sortSounds(std::vector<Sound> &sounds, Enums::SortMode sortMode,
                            const std::vector<std::uint32_t> *manualOrder = nullptr);

            //* Sorts one level of folders: alphabetically (case-insensitive),
            //* or — when `manualOrder` is given and non-empty — by the positions
            //* inside it (stable, unlisted folders collect at the end). The flat
            //* order is shared by every tree level, exactly like Tab::soundOrder.
            void sortFolders(std::vector<Folder> &folders,
                             const std::vector<std::uint32_t> *manualOrder = nullptr);

            //* Recursively reorders every level of the tree to match the given
            //* flat manual order (in-memory mirror of a persisted arrangement).
            void applyFolderOrder(std::vector<Folder> &folders, const std::vector<std::uint32_t> &manualOrder);

            //* Sanitizes a submitted arrangement: keeps the submitted order,
            //* appends every known id that is missing exactly once, drops
            //* duplicates and unknown ids.
            std::vector<std::uint32_t> sanitizeOrder(const std::vector<std::uint32_t> &submitted,
                                                     const std::vector<std::uint32_t> &knownIds);

            //* Collects every folder id of a tree in pre-order (parents before
            //* their children, each level in its current arrangement).
            std::vector<std::uint32_t> collectFolderIds(const std::vector<Folder> &folders);

            //* Builds the whole-board loop sequence. BoardOnly uses the board's
            //* own sounds; BoardAndFolders appends every subfolder left-to-right,
            //* depth-first (a folder's own sounds play before its child folders).
            //* The arrangement follows the board's sort mode (Manual order
            //* included); live voice slots are skipped — they select a preset
            //* instead of playing audio and would stall the sequence.
            std::vector<std::uint32_t> buildBoardLoopSequence(const Tab &tab, Enums::BoardLoopMode mode);
        } // namespace Ordering
    } // namespace Objects
} // namespace Audiopad
