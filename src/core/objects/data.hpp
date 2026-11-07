#pragma once
#include "objects.hpp"
#include <cstdint>
#include <optional>
#include <vector>

namespace nlohmann
{
    template <typename, typename> struct adl_serializer;
} // namespace nlohmann

namespace Audiopad
{
    namespace Objects
    {
        class Data
        {
            template <typename, typename> friend struct nlohmann::adl_serializer;

          private:
            std::vector<Tab> tabs;

          public:
            bool isOnFavorites = false;
            int width = 1440, height = 820;
            std::uint32_t soundIdCounter = 0;
            std::uint32_t folderIdCounter = 0;

            std::vector<Tab> getTabs() const;
            void setTabs(const std::vector<Tab> &);
            bool doesTabExist(const std::string &);
            std::optional<Tab> setTab(const std::uint32_t &, const Tab &);

            Tab addTab(Tab);
            void removeTabById(const std::uint32_t &);

            std::optional<Tab> getTab(const std::uint32_t &) const;
            std::optional<std::reference_wrapper<Sound>> getSound(const std::uint32_t &);

            //* Reserves and returns the next globally unique folder id.
            std::uint32_t nextFolderId();

            //* Returns the tab that owns the given sound, searching nested folders too.
            std::optional<Tab> getTabBySoundId(const std::uint32_t &) const;

            //* Collects every sound of a tab, including all nested subfolders.
            static std::vector<Sound> getFlatSounds(const Tab &);

            //* Finds a folder (by id) anywhere inside a folder tree.
            static const Folder *findFolderById(const std::vector<Folder> &, const std::uint32_t &);
            static Folder *findFolderById(std::vector<Folder> &, const std::uint32_t &);

            std::vector<Sound> getFavorites();
            std::vector<std::uint32_t> getFavoriteIds();
            void markFavorite(const std::uint32_t &, bool);
            void setSoundImage(const std::uint32_t &, const std::string &);
            void setSoundsImage(const std::vector<std::uint32_t> &, const std::string &);

            void set(const Data &other);
            Data &operator=(const Data &other) = delete;
        };
    } // namespace Objects
} // namespace Audiopad