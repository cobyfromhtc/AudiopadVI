#include "data.hpp"
#include <algorithm>
#include <core/global/globals.hpp>
#include <fancy.hpp>
#include <unordered_set>

namespace Audiopad::Objects
{
    namespace
    {
        //* Sound <-> global lookup-map synchronization helpers. They walk the whole folder
        //* tree of a tab so nested sounds stay playable, hotkey-able and favorite-able.
        //* indexSound needs a mutable reference: the global maps hold reference_wrappers
        //* that write through to the sounds stored inside the tab tree.
        void indexSound(Sound &sound)
        {
            Globals::gSounds->insert({sound.id, sound});
            if (sound.isFavorite)
            {
                Globals::gFavorites->insert({sound.id, sound});
            }
        }
        void deindexSound(const Sound &sound)
        {
            Globals::gSounds->erase(sound.id);
            if (sound.isFavorite)
            {
                Globals::gFavorites->erase(sound.id);
            }
        }
        void deindexSoundById(const std::uint32_t &id)
        {
            Globals::gSounds->erase(id);
            Globals::gFavorites->erase(id);
        }
        void indexFolder(Folder &folder)
        {
            for (auto &sound : folder.sounds)
            {
                indexSound(sound);
            }
            for (auto &child : folder.folders)
            {
                indexFolder(child);
            }
        }
        void deindexFolder(const Folder &folder)
        {
            for (const auto &sound : folder.sounds)
            {
                deindexSound(sound);
            }
            for (const auto &child : folder.folders)
            {
                deindexFolder(child);
            }
        }
        void indexTab(Tab &tab)
        {
            for (auto &sound : tab.sounds)
            {
                indexSound(sound);
            }
            for (auto &folder : tab.folders)
            {
                indexFolder(folder);
            }
        }
        void deindexTab(const Tab &tab)
        {
            for (const auto &sound : tab.sounds)
            {
                deindexSound(sound);
            }
            for (const auto &folder : tab.folders)
            {
                deindexFolder(folder);
            }
        }
        void collectFolderSounds(const Folder &folder, std::vector<Sound> &rtn)
        {
            for (const auto &sound : folder.sounds)
            {
                rtn.emplace_back(sound);
            }
            for (const auto &child : folder.folders)
            {
                collectFolderSounds(child, rtn);
            }
        }
        bool folderContainsSound(const Folder &folder, const std::uint32_t &id)
        {
            for (const auto &sound : folder.sounds)
            {
                if (sound.id == id)
                {
                    return true;
                }
            }
            for (const auto &child : folder.folders)
            {
                if (folderContainsSound(child, id))
                {
                    return true;
                }
            }
            return false;
        }
        bool setFolderSoundImage(Folder &folder, const std::uint32_t &id, const std::string &image)
        {
            for (auto &sound : folder.sounds)
            {
                if (sound.id == id)
                {
                    sound.image = image;
                    return true;
                }
            }
            for (auto &child : folder.folders)
            {
                if (setFolderSoundImage(child, id, image))
                {
                    return true;
                }
            }
            return false;
        }
        void setFolderSoundsImage(Folder &folder, const std::unordered_set<std::uint32_t> &ids, const std::string &image)
        {
            for (auto &sound : folder.sounds)
            {
                if (ids.find(sound.id) != ids.end())
                {
                    sound.image = image;
                }
            }
            for (auto &child : folder.folders)
            {
                setFolderSoundsImage(child, ids, image);
            }
        }
    } // namespace

    Tab Data::addTab(Tab tab)
    {
        tab.id = static_cast<std::uint32_t>(tabs.size());
        tabs.emplace_back(tab);

        //* emplace_back may reallocate the vector, which would leave every previously
        //* indexed sound reference dangling. Rebuilding the lookup maps keeps all
        //* references pointed at live objects.
        Globals::gSounds->clear();
        Globals::gFavorites->clear();
        for (auto &existing : tabs)
        {
            indexTab(existing);
        }

        return tabs.back();
    }
    void Data::removeTabById(const std::uint32_t &index)
    {
        if (tabs.size() > index)
        {
            deindexTab(tabs.at(index));

            tabs.erase(tabs.begin() + index);

            //* Erasing shifts every following tab, which invalidates the indexed
            //* references of their sounds — rebuild the lookup maps from scratch.
            Globals::gSounds->clear();
            Globals::gFavorites->clear();
            for (std::size_t i = 0; tabs.size() > i; i++)
            {
                auto &tab = tabs.at(i);
                tab.id = static_cast<std::uint32_t>(i);
                indexTab(tab);
            }
        }
        else
        {
            Fancy::fancy.logTime().warning() << "Tried to remove non existent tab" << std::endl;
        }
    }
    void Data::setTabs(const std::vector<Tab> &newTabs)
    {
        tabs = newTabs;
        Globals::gSounds->clear();
        Globals::gFavorites->clear();
        for (std::size_t i = 0; tabs.size() > i; i++)
        {
            auto &tab = tabs.at(i);
            tab.id = static_cast<std::uint32_t>(i);

            indexTab(tab);
        }
    }
    std::vector<Tab> Data::getTabs() const
    {
        return tabs;
    }
    std::optional<Tab> Data::getTab(const std::uint32_t &id) const
    {
        if (tabs.size() > id)
        {
            return tabs.at(id);
        }

        Fancy::fancy.logTime().warning() << "Tried to access non existent tab " << id << std::endl;
        return std::nullopt;
    }
    std::optional<std::reference_wrapper<Sound>> Data::getSound(const std::uint32_t &id)
    {
        auto scopedSounds = Globals::gSounds.scoped();
        if (scopedSounds->find(id) != scopedSounds->end())
        {
            return scopedSounds->at(id);
        }

        Fancy::fancy.logTime().warning() << "Tried to access non existent sound " << id << std::endl;
        return std::nullopt;
    }
    std::uint32_t Data::nextFolderId()
    {
        return ++folderIdCounter;
    }
    std::optional<Tab> Data::getTabBySoundId(const std::uint32_t &soundId) const
    {
        for (const auto &tab : tabs)
        {
            bool ownsSound = false;
            for (const auto &sound : tab.sounds)
            {
                if (sound.id == soundId)
                {
                    ownsSound = true;
                    break;
                }
            }
            if (!ownsSound)
            {
                for (const auto &folder : tab.folders)
                {
                    if (folderContainsSound(folder, soundId))
                    {
                        ownsSound = true;
                        break;
                    }
                }
            }

            if (ownsSound)
            {
                return tab;
            }
        }

        return std::nullopt;
    }
    std::vector<Sound> Data::getFlatSounds(const Tab &tab)
    {
        std::vector<Sound> rtn = tab.sounds;
        for (const auto &folder : tab.folders)
        {
            collectFolderSounds(folder, rtn);
        }
        return rtn;
    }
    std::optional<Tab> Data::setTab(const std::uint32_t &id, const Tab &tab)
    {
        if (tabs.size() > id)
        {
            auto &realTab = tabs.at(id);

            deindexTab(realTab);

            realTab = tab;

            indexTab(realTab);
            return realTab;
        }

        Fancy::fancy.logTime().warning() << "Tried to access non existent Tab " << id << std::endl;
        return std::nullopt;
    }
    void Data::set(const Data &other)
    {
        tabs = other.tabs;
        width = other.width;
        height = other.height;
        soundIdCounter = other.soundIdCounter;
        folderIdCounter = other.folderIdCounter;

        if (this == &Globals::gData)
        {
            Globals::gSounds->clear();
            Globals::gFavorites->clear();

            for (std::size_t i = 0; tabs.size() > i; i++)
            {
                auto &tab = tabs.at(i);
                tab.id = static_cast<std::uint32_t>(i);

                indexTab(tab);
            }
        }
    }
    void Data::markFavorite(const std::uint32_t &id, bool favourite)
    {
        auto sound = getSound(id);
        if (sound)
        {
            sound->get().isFavorite = favourite;
            if (favourite)
            {
                Globals::gFavorites->insert({id, sound->get()});
            }
            else
            {
                auto scopedFavorites = Globals::gFavorites.scoped();
                if (scopedFavorites->find(id) != scopedFavorites->end())
                {
                    scopedFavorites->erase(id);
                }
            }
        }
    }
    std::vector<std::uint32_t> Data::getFavoriteIds()
    {
        auto scopedFavorites = Globals::gFavorites.scoped();

        std::vector<std::uint32_t> rtn;
        rtn.reserve(scopedFavorites->size());

        for (const auto &sound : *scopedFavorites)
        {
            rtn.emplace_back(sound.first);
        }

        return rtn;
    }
    std::vector<Sound> Data::getFavorites()
    {
        auto scopedFavorites = Globals::gFavorites.scoped();

        std::vector<Sound> rtn;
        rtn.reserve(scopedFavorites->size());

        for (const auto &sound : *scopedFavorites)
        {
            rtn.emplace_back(sound.second);
        }

        return rtn;
    }
    const Folder *Data::findFolderById(const std::vector<Folder> &folders, const std::uint32_t &id)
    {
        for (const auto &folder : folders)
        {
            if (folder.id == id)
            {
                return &folder;
            }
            if (const auto *nested = findFolderById(folder.folders, id); nested)
            {
                return nested;
            }
        }
        return nullptr;
    }
    Folder *Data::findFolderById(std::vector<Folder> &folders, const std::uint32_t &id)
    {
        for (auto &folder : folders)
        {
            if (folder.id == id)
            {
                return &folder;
            }
            if (auto *nested = findFolderById(folder.folders, id); nested)
            {
                return nested;
            }
        }
        return nullptr;
    }
    bool Data::doesTabExist(const std::string &path)
    {
        auto it = std::find_if(tabs.begin(), tabs.end(), [&](const auto &tab) { return tab.path == path; });
        return it != tabs.end();
    }
    void Data::setSoundImage(const std::uint32_t &id, const std::string &image)
    {
        for (auto &tab : tabs)
        {
            bool updated = false;
            for (auto &sound : tab.sounds)
            {
                if (sound.id == id)
                {
                    sound.image = image;
                    updated = true;
                    break;
                }
            }
            if (!updated)
            {
                for (auto &folder : tab.folders)
                {
                    if (setFolderSoundImage(folder, id, image))
                    {
                        updated = true;
                        break;
                    }
                }
            }
            if (updated)
            {
                break;
            }
        }

        auto sound = getSound(id);
        if (sound)
        {
            sound->get().image = image;
        }

        auto scopedFavorites = Globals::gFavorites.scoped();
        if (scopedFavorites->find(id) != scopedFavorites->end())
        {
            scopedFavorites->at(id).get().image = image;
        }
    }
    void Data::setSoundsImage(const std::vector<std::uint32_t> &ids, const std::string &image)
    {
        std::unordered_set<std::uint32_t> idSet(ids.begin(), ids.end());
        for (auto &tab : tabs)
        {
            for (auto &sound : tab.sounds)
            {
                if (idSet.find(sound.id) != idSet.end())
                {
                    sound.image = image;
                }
            }
            for (auto &folder : tab.folders)
            {
                setFolderSoundsImage(folder, idSet, image);
            }
        }

        for (const auto &id : ids)
        {
            auto sound = getSound(id);
            if (sound)
            {
                sound->get().image = image;
            }
        }

        auto scopedFavorites = Globals::gFavorites.scoped();
        for (const auto &id : ids)
        {
            if (scopedFavorites->find(id) != scopedFavorites->end())
            {
                scopedFavorites->at(id).get().image = image;
            }
        }
    }

    namespace
    {
        //* Applies `mutate` to the matching sound inside a folder tree. Returns
        //* true when the entry was found and mutated.
        bool updateFolderSound(Folder &folder, const std::uint32_t &id, const std::function<void(Sound &)> &mutate)
        {
            for (auto &sound : folder.sounds)
            {
                if (sound.id == id)
                {
                    mutate(sound);
                    return true;
                }
            }
            for (auto &child : folder.folders)
            {
                if (updateFolderSound(child, id, mutate))
                {
                    return true;
                }
            }
            return false;
        }

        bool removeFolderSound(Folder &folder, const std::uint32_t &id)
        {
            for (auto it = folder.sounds.begin(); it != folder.sounds.end(); it++)
            {
                if (it->id == id)
                {
                    folder.sounds.erase(it);
                    return true;
                }
            }
            for (auto &child : folder.folders)
            {
                if (removeFolderSound(child, id))
                {
                    return true;
                }
            }
            return false;
        }
    } // namespace

    std::optional<Sound> Data::updateSound(const std::uint32_t &id, const std::function<void(Sound &)> &mutate)
    {
        Sound updated;
        bool found = false;

        for (auto &tab : tabs)
        {
            for (auto &sound : tab.sounds)
            {
                if (sound.id == id)
                {
                    mutate(sound);
                    updated = sound;
                    found = true;
                    break;
                }
            }
            if (!found)
            {
                for (auto &folder : tab.folders)
                {
                    if (updateFolderSound(folder, id, mutate))
                    {
                        //* Re-read the mutated entry through the walker's tree.
                        found = true;
                        break;
                    }
                }
            }
            if (found)
            {
                break;
            }
        }

        if (!found)
        {
            Fancy::fancy.logTime().warning() << "Tried to update non existent sound " << id << std::endl;
            return std::nullopt;
        }

        //* Re-read the final state through the live reference (covers the nested
        //* folder path where the walker mutated a deeper copy of the entry).
        if (auto sound = getSound(id); sound)
        {
            updated = sound->get();
        }

        //* The favorites map aliases the same tree entries — keep any stored
        //* copy in sync the same way setSoundImage does.
        auto scopedFavorites = Globals::gFavorites.scoped();
        if (scopedFavorites->find(id) != scopedFavorites->end())
        {
            mutate(scopedFavorites->at(id).get());
        }

        return updated;
    }

    void Data::removeSoundFromModel(const std::uint32_t &id)
    {
        for (auto &tab : tabs)
        {
            bool removed = false;
            for (auto it = tab.sounds.begin(); it != tab.sounds.end(); it++)
            {
                if (it->id == id)
                {
                    tab.sounds.erase(it);
                    removed = true;
                    break;
                }
            }
            if (!removed)
            {
                for (auto &folder : tab.folders)
                {
                    if (removeFolderSound(folder, id))
                    {
                        removed = true;
                        break;
                    }
                }
            }

            if (removed)
            {
                //* Drop any manual-order reference to the removed entry.
                tab.soundOrder.erase(std::remove(tab.soundOrder.begin(), tab.soundOrder.end(), id),
                                     tab.soundOrder.end());
                break;
            }
        }

        deindexSoundById(id);
    }

    void Data::seedSoundInTab(const std::uint32_t &tabId, const Sound &sound)
    {
        if (tabs.size() <= tabId)
        {
            Fancy::fancy.logTime().warning() << "Tried to seed sound into non existent tab " << tabId << std::endl;
            return;
        }

        auto &tab = tabs.at(tabId);
        for (const auto &existing : tab.sounds)
        {
            if (existing.id == sound.id || existing.path == sound.path)
            {
                return; //* already present — nothing to seed
            }
        }

        tab.sounds.emplace_back(sound);
        if (tab.sortMode == Enums::SortMode::Manual &&
            std::find(tab.soundOrder.begin(), tab.soundOrder.end(), sound.id) == tab.soundOrder.end())
        {
            tab.soundOrder.emplace_back(sound.id);
        }

        Globals::gSounds->insert({sound.id, tab.sounds.back()});
        if (sound.isFavorite)
        {
            Globals::gFavorites->insert({sound.id, tab.sounds.back()});
        }
    }
} // namespace Audiopad::Objects