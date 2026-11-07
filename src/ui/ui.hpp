#pragma once
#include <core/objects/settings.hpp>
#include <helper/audio/audio.hpp>
#if defined(__linux__)
#include <helper/audio/linux/backend.hpp>
#endif
#include <atomic>
#include <cstdint>
#include <queue>
#include <string>
#include <var_guard.hpp>

namespace Audiopad
{
    namespace Objects
    {
#if defined(__linux__)
        struct IconRecordingApp : public RecordingApp
        {
            std::string appIcon;
            IconRecordingApp(const RecordingApp &);
            ~IconRecordingApp() override = default;
        };
        struct IconPlaybackApp : public PlaybackApp
        {
            std::string appIcon;
            IconPlaybackApp(const PlaybackApp &);
            ~IconPlaybackApp() override = default;
        };
#endif

        class Window
        {
            friend class Hotkeys;

          protected:
            sxl::var_guard<std::map<std::uint32_t, std::uint32_t>> groupedSounds;

            struct
            {
                std::string exit;
                std::string hide;
                std::string show;
                std::string settings;
                std::string tabHotkeys;
                std::string muteDuringPlayback;
            } translations;

          protected:
            virtual void onAllSoundsFinished();

          protected:
            //* Rescans the tab's directory tree (including all nested subfolders) and
            //* returns an updated copy of the tab. Metadata (hotkeys, favorites, images,
            //* volumes) of known sounds is preserved, user-created folders survive too.
            virtual Tab getTabContent(const Tab &) const;

            //* Opens the native folder picker. Returns the chosen path or nullopt when
            //* the dialog was cancelled.
            virtual std::optional<std::string> pickFolderDialog();

#if defined(__linux__)
            virtual std::vector<std::shared_ptr<IconRecordingApp>> getOutputs();
            virtual std::vector<std::shared_ptr<IconPlaybackApp>> getPlayback();
#else
            virtual std::vector<AudioDevice> getOutputs();
#endif

          protected:
            virtual void setIsOnFavorites(bool);
            virtual Settings changeSettings(Settings);
            virtual bool deleteSound(const std::uint32_t &);

#if defined(__linux__)
            void stopPassthrough(const std::string &);
            virtual bool startPassthrough(const std::string &);
#endif

          protected:
            virtual std::vector<Tab> removeTab(const std::uint32_t &);
            virtual std::optional<Tab> refreshTab(const std::uint32_t &);
            virtual std::vector<Tab> changeTabOrder(const std::vector<int> &);
            virtual std::optional<Tab> setSortMode(const std::uint32_t &, Enums::SortMode);
            virtual std::optional<Tab> setTabBoost(const std::uint32_t &, int);

            //* Copies the sound files of `sourcePath` into the given tab's directory
            //* and returns the refreshed tab. `mode` decides how the picked folder is
            //* placed: "children" merges its contents straight into the destination
            //* (the folder itself is skipped), while "parent" keeps it as a wrapper —
            //* everything lands inside a new subfolder named after it.
            virtual std::optional<Tab> importFolderIntoTab(const std::uint32_t &, const std::string &sourcePath,
                                                           const std::string &mode = "children");

            //* Creates a new subfolder inside the tab (or inside `parentFolderId` when
            //* given) and returns the refreshed tab.
            virtual std::optional<Tab> createFolderInTab(const std::uint32_t &,
                                                         const std::optional<std::uint32_t> &parentFolderId,
                                                         const std::string &name);

            //* Opens the native folder picker with multi-selection enabled. Returns
            //* every chosen path; empty when the dialog was cancelled or nothing was
            //* picked.
            virtual std::vector<std::string> pickFoldersDialog();

            //* Imports items dragged in from the OS file manager into the given tab —
            //* at the tab root, or inside `parentFolderId` when given. Every dropped
            //* directory is copied recursively (structure preserved) into a folder of
            //* the same name; dropped audio files are copied directly into the
            //* destination. When `mode` is "children" and exactly one folder is
            //* dropped, the folder itself is skipped and only its contents are
            //* imported. Returns the refreshed tab.
            virtual std::optional<Tab> importDroppedPaths(const std::uint32_t &tabId,
                                                          const std::optional<std::uint32_t> &parentFolderId,
                                                          const std::vector<std::string> &paths,
                                                          const std::string &mode = "parent");

            //* Renames a category (display name only — the folder on disk keeps its
            //* path, so nothing breaks when the category points at a user directory).
            virtual std::optional<Tab> renameTab(const std::uint32_t &, const std::string &name);

            //* Creates a brand-new, empty category. A folder with the given name is
            //* created inside the app data directory and registered as a tab, so users
            //* can build their own categories from scratch.
            virtual std::vector<Tab> createTab(const std::string &name);

            //* "Add Folder as Category" rework: registers every direct subfolder of
            //* `rootPath` as its own tab (each keeping its whole nested structure).
            //* When the picked folder also holds audio files directly at its root, the
            //* folder itself is registered as a tab too so no sounds are lost. Returns
            //* every tab that now lives under the picked folder — including ones that
            //* were already registered — so the UI can group them into a fresh sidebar
            //* category named after the folder.
            virtual std::vector<Tab> addTabFromFolder(const std::string &rootPath);

          protected:
            virtual bool toggleSoundPlayback();
            virtual void stopSounds(bool = false);
            virtual bool stopSound(const std::uint32_t &);

          protected:
            virtual std::optional<PlayingSound> playSound(const std::uint32_t &);
            virtual std::optional<PlayingSound> pauseSound(const std::uint32_t &);
            virtual std::optional<PlayingSound> resumeSound(const std::uint32_t &);
            virtual std::optional<PlayingSound> repeatSound(const std::uint32_t &, bool);
            virtual std::optional<PlayingSound> seekSound(const std::uint32_t &, std::uint64_t);

            virtual std::optional<Sound> setHotkey(const std::uint32_t &, const std::vector<int> &);
            virtual std::optional<Sound> setCustomLocalVolume(const std::uint32_t &, const std::optional<int> &);
            virtual std::optional<Sound> setCustomRemoteVolume(const std::uint32_t &, const std::optional<int> &);

          public:
            virtual ~Window();
            virtual void setup();
            virtual void show() = 0;
            virtual void mainLoop() = 0;

            virtual void onAdminRequired() = 0;
            virtual void onSettingsChanged() = 0;
            virtual void onSwitchOnConnectDetected(bool) = 0;
            virtual void onSoundPlayed(const PlayingSound &);
            virtual void onError(const Enums::ErrorCode &) = 0;
            virtual void onSoundFinished(const PlayingSound &);
            virtual void onHotKeyReceived(const std::vector<int> &);
            virtual void onSoundProgressed(const PlayingSound &) = 0;
        };
    } // namespace Objects
} // namespace Audiopad