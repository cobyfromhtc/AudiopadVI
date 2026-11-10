#include "ordering.hpp"

#include <algorithm>
#include <cctype>
#include <set>

namespace Audiopad
{
    namespace Objects
    {
        namespace Ordering
        {
            namespace
            {
                std::string toLower(const std::string &text)
                {
                    std::string lowered = text;
                    std::transform(lowered.begin(), lowered.end(), lowered.begin(),
                                   [](unsigned char character) { return static_cast<char>(std::tolower(character)); });
                    return lowered;
                }

                //* Position of `id` inside a flat manual order; unlisted ids
                //* sort after every listed one (keeps their relative order).
                std::size_t indexOfId(const std::vector<std::uint32_t> &manualOrder, std::uint32_t id)
                {
                    const auto it = std::find(manualOrder.begin(), manualOrder.end(), id);
                    return it == manualOrder.end() ? static_cast<std::size_t>(-1)
                                                   : static_cast<std::size_t>(it - manualOrder.begin());
                }

                void sortTree(Folder &folder, Enums::SortMode sortMode, const std::vector<std::uint32_t> *soundOrder,
                              const std::vector<std::uint32_t> *folderOrder)
                {
                    sortSounds(folder.sounds, sortMode, soundOrder);
                    sortFolders(folder.folders, folderOrder);
                    for (auto &child : folder.folders)
                    {
                        sortTree(child, sortMode, soundOrder, folderOrder);
                    }
                }

                void appendFolderSounds(const Folder &folder, std::vector<std::uint32_t> &rtn)
                {
                    for (const auto &sound : folder.sounds)
                    {
                        if (!sound.voicePreset)
                        {
                            rtn.emplace_back(sound.id);
                        }
                    }
                    for (const auto &child : folder.folders)
                    {
                        appendFolderSounds(child, rtn);
                    }
                }
            } // namespace

            void sortSounds(std::vector<Sound> &sounds, Enums::SortMode sortMode,
                            const std::vector<std::uint32_t> *manualOrder)
            {
                switch (sortMode)
                {
                case Enums::SortMode::ModifiedDate_Descending:
                    std::sort(sounds.begin(), sounds.end(), [](const auto &first, const auto &second) {
                        return first.modifiedDate > second.modifiedDate;
                    });
                    break;
                case Enums::SortMode::ModifiedDate_Ascending:
                    std::sort(sounds.begin(), sounds.end(), [](const auto &first, const auto &second) {
                        return first.modifiedDate < second.modifiedDate;
                    });
                    break;
                case Enums::SortMode::Alphabetical_Descending:
                    std::sort(sounds.begin(), sounds.end(),
                              [](const auto &first, const auto &second) { return first.name > second.name; });
                    break;
                case Enums::SortMode::Alphabetical_Ascending:
                    std::sort(sounds.begin(), sounds.end(),
                              [](const auto &first, const auto &second) { return first.name < second.name; });
                    break;
                case Enums::SortMode::Manual:
                    //* User-defined arrangement: the position inside the persisted
                    //* order decides; ids that are not (yet) listed keep their scan
                    //* order and collect at the end of the folder.
                    if (manualOrder == nullptr || manualOrder->empty())
                    {
                        break;
                    }
                    std::stable_sort(sounds.begin(), sounds.end(), [&](const Sound &first, const Sound &second) {
                        return indexOfId(*manualOrder, first.id) < indexOfId(*manualOrder, second.id);
                    });
                    break;
                }
            }

            void sortFolders(std::vector<Folder> &folders, const std::vector<std::uint32_t> *manualOrder)
            {
                if (manualOrder != nullptr && !manualOrder->empty())
                {
                    std::stable_sort(folders.begin(), folders.end(), [&](const Folder &first, const Folder &second) {
                        return indexOfId(*manualOrder, first.id) < indexOfId(*manualOrder, second.id);
                    });
                    return;
                }
                std::sort(folders.begin(), folders.end(), [](const Folder &first, const Folder &second) {
                    return toLower(first.name) < toLower(second.name);
                });
            }

            void applyFolderOrder(std::vector<Folder> &folders, const std::vector<std::uint32_t> &manualOrder)
            {
                sortFolders(folders, &manualOrder);
                for (auto &folder : folders)
                {
                    applyFolderOrder(folder.folders, manualOrder);
                }
            }

            std::vector<std::uint32_t> sanitizeOrder(const std::vector<std::uint32_t> &submitted,
                                                     const std::vector<std::uint32_t> &knownIds)
            {
                const std::set<std::uint32_t> known(knownIds.begin(), knownIds.end());
                std::vector<std::uint32_t> rtn;
                std::set<std::uint32_t> seen;
                for (const auto id : submitted)
                {
                    if (known.count(id) != 0 && seen.insert(id).second)
                    {
                        rtn.emplace_back(id);
                    }
                }
                for (const auto id : knownIds)
                {
                    if (seen.insert(id).second)
                    {
                        rtn.emplace_back(id);
                    }
                }
                return rtn;
            }

            std::vector<std::uint32_t> collectFolderIds(const std::vector<Folder> &folders)
            {
                std::vector<std::uint32_t> rtn;
                for (const auto &folder : folders)
                {
                    rtn.emplace_back(folder.id);
                    for (const auto id : collectFolderIds(folder.folders))
                    {
                        rtn.emplace_back(id);
                    }
                }
                return rtn;
            }

            std::vector<std::uint32_t> buildBoardLoopSequence(const Tab &tab, Enums::BoardLoopMode mode)
            {
                if (mode == Enums::BoardLoopMode::Off)
                {
                    return {};
                }

                //* Arrange a scratch copy of the tree exactly like the UI does —
                //* the loop must follow what the user sees, not the scan order.
                Tab arranged = tab;
                const bool manual = arranged.sortMode == Enums::SortMode::Manual;
                const std::vector<std::uint32_t> *soundOrder = manual ? &arranged.soundOrder : nullptr;
                const std::vector<std::uint32_t> *folderOrder = manual ? &arranged.folderOrder : nullptr;
                sortSounds(arranged.sounds, arranged.sortMode, soundOrder);
                sortFolders(arranged.folders, folderOrder);
                for (auto &folder : arranged.folders)
                {
                    sortTree(folder, arranged.sortMode, soundOrder, folderOrder);
                }

                std::vector<std::uint32_t> rtn;
                for (const auto &sound : arranged.sounds)
                {
                    if (!sound.voicePreset)
                    {
                        rtn.emplace_back(sound.id);
                    }
                }
                if (mode == Enums::BoardLoopMode::BoardAndFolders)
                {
                    for (const auto &folder : arranged.folders)
                    {
                        appendFolderSounds(folder, rtn);
                    }
                }
                return rtn;
            }
        } // namespace Ordering
    } // namespace Objects
} // namespace Audiopad
