#include "ui.hpp"
#include <algorithm>
#include <core/global/globals.hpp>
#include <core/objects/ordering.hpp>
#include <cstdint>
#include <cstdlib>
#include <fancy.hpp>
#include <filesystem>
#include <functional>
#include <helper/audio/linux/backend.hpp>
#include <helper/audio/linux/pipewire/pipewire.hpp>
#include <helper/audio/linux/pulseaudio/pulseaudio.hpp>
#include <helper/misc/misc.hpp>
#include <nfd.hpp>
#include <optional>
#include <set>

#if defined(_WIN32)
#include <windows.h>

#include <shobjidl.h>
#include <shlwapi.h>
#elif defined(__linux__)
#include <gtk/gtk.h>
#endif

namespace Audiopad::Objects
{
    namespace
    {
        //* Maximum directory nesting the recursive folder scanner will follow. Purely
        //* a safety net against symlink loops on user disks.
        constexpr int kMaxFolderDepth = 32;

        bool isSupportedAudioFile(const std::filesystem::path &file)
        {
            auto extension = file.extension().u8string();
            std::transform(extension.begin(), extension.end(), extension.begin(),
                           [](unsigned char c) { return static_cast<char>(std::tolower(c)); });
            return extension == ".mp3" || extension == ".wav" || extension == ".flac";
        }

        std::string toLower(std::string text)
        {
            std::transform(text.begin(), text.end(), text.begin(),
                           [](unsigned char c) { return static_cast<char>(std::tolower(c)); });
            return text;
        }

        //* Normalizes filesystem paths to forward slashes so comparisons and the JSON
        //* model stay platform independent.
        std::string normalizePath(const std::filesystem::path &path)
        {
            auto rtn = path.u8string();
#if defined(_WIN32)
            std::transform(rtn.begin(), rtn.end(), rtn.begin(), [](char c) { return c == '\\' ? '/' : c; });
#endif
            return rtn;
        }

        std::string parentKey(const std::string &normalizedPath)
        {
            const auto position = normalizedPath.find_last_of('/');
            return position == std::string::npos ? "" : normalizedPath.substr(0, position);
        }

        void sortSounds(std::vector<Sound> &sounds, Enums::SortMode sortMode,
                        const std::vector<std::uint32_t> *manualOrder = nullptr)
        {
            //* Thin wrapper over the shared, unit-tested arrangement helpers so
            //* the scan pipeline, the UI and the board loop always agree.
            Ordering::sortSounds(sounds, sortMode, manualOrder);
        }

        void sortFolders(std::vector<Folder> &folders, const std::vector<std::uint32_t> *manualOrder = nullptr)
        {
            Ordering::sortFolders(folders, manualOrder);
        }

        //* Finds a not-yet-existing directory name inside `parent` — "Name",
        //* "Name (2)", "Name (3)", ... — the same behaviour the inline creation
        //* loops of createFolderInTab and createTab implement.
        std::string uniqueDirectoryName(const std::filesystem::path &parent, const std::string &desired)
        {
            std::string uniqueName = desired;
            for (std::size_t attempt = 2; std::filesystem::exists(parent / uniqueName) && attempt < 1000; attempt++)
            {
                uniqueName = desired + " (" + std::to_string(attempt) + ")";
            }
            return uniqueName;
        }

        void collectPreviousSounds(const Tab &tab, std::vector<const Sound *> &rtn)
        {
            for (const auto &sound : tab.sounds)
            {
                rtn.emplace_back(&sound);
            }

            std::function<void(const std::vector<Folder> &)> collect = [&](const std::vector<Folder> &folders) {
                for (const auto &folder : folders)
                {
                    for (const auto &sound : folder.sounds)
                    {
                        rtn.emplace_back(&sound);
                    }
                    collect(folder.folders);
                }
            };
            collect(tab.folders);
        }

        const Folder *findPreviousFolder(const std::vector<Folder> &folders, const std::string &path)
        {
            for (const auto &folder : folders)
            {
                if (folder.path == path)
                {
                    return &folder;
                }
                if (const auto *nested = findPreviousFolder(folder.folders, path); nested)
                {
                    return nested;
                }
            }
            return nullptr;
        }

        //* Hands out unique folder ids for a single scan. Previous ids are reused when
        //* they are valid and unused — this keeps navigation state stable across
        //* rescans — while folders without a previous match (or with stale/duplicate
        //* ids from older configs) receive a fresh, guaranteed-unique id instead of all
        //* sharing the struct default 0 (which made nested folders impossible to open).
        class FolderIdAllocator
        {
          public:
            //* Reuses `previousId` when it is non-zero and not taken yet; otherwise
            //* allocates a fresh unique id from the global counter.
            std::uint32_t assign(std::uint32_t previousId)
            {
                if (previousId != 0 && used.insert(previousId).second)
                {
                    return previousId;
                }

                auto id = Globals::gData.nextFolderId();
                while (!used.insert(id).second)
                {
                    id = Globals::gData.nextFolderId();
                }
                return id;
            }

          private:
            std::set<std::uint32_t> used;
        };

        //* Resolves symlinks the same way the original flat scanner did, so sounds
        //* behind symlinks keep working after the nested-folder rework.
        std::filesystem::path resolveEntry(const std::filesystem::path &directory, const std::filesystem::path &entry)
        {
            std::filesystem::path file = entry;
            if (std::filesystem::is_symlink(entry))
            {
                file = std::filesystem::read_symlink(entry);
                if (file.has_relative_path())
                {
                    file = std::filesystem::canonical(directory / file);
                }
            }
            return file;
        }

        Sound buildSound(const std::filesystem::path &file, const std::vector<const Sound *> &previousSounds)
        {
            Sound sound;

            std::error_code ec;
            auto writeTime = std::filesystem::last_write_time(file, ec);
            if (!ec)
            {
                sound.modifiedDate = writeTime.time_since_epoch().count();
            }
            else
            {
                Fancy::fancy.logTime().warning() << "Failed to read lastWriteTime of " << file << std::endl;
            }

            sound.path = normalizePath(file);
            sound.name = file.stem().u8string();

            //* Preserve metadata of sounds we already know. Candidates are limited to
            //* sounds that previously lived in the very same directory, so equally named
            //* files in sibling folders never steal each other's hotkeys or favorites.
            const auto directoryKey = parentKey(sound.path);
            const Sound *previous = nullptr;
            const Sound *previousByName = nullptr;
            for (const auto *candidate : previousSounds)
            {
                if (candidate->path == sound.path)
                {
                    previous = candidate;
                    break;
                }
#if defined(_WIN32)
                if (!previous && toLower(candidate->path) == toLower(sound.path))
                {
                    previous = candidate;
                    continue;
                }
#endif
                if (!previousByName && parentKey(candidate->path) == directoryKey && candidate->name == sound.name)
                {
                    previousByName = candidate;
                }
            }
            if (!previous)
            {
                previous = previousByName;
            }

            if (previous)
            {
                sound.id = previous->id;
                sound.hotkeys = previous->hotkeys;
                sound.isFavorite = previous->isFavorite;
                sound.localVolume = previous->localVolume;
                sound.remoteVolume = previous->remoteVolume;
                sound.image = previous->image;
                sound.displayName = previous->displayName;
                sound.tags = previous->tags;
                sound.triggerMode = previous->triggerMode;
                sound.loopByDefault = previous->loopByDefault;
                sound.stopOthers = previous->stopOthers;
                sound.muteOthers = previous->muteOthers;
                sound.muteVoice = previous->muteVoice;
                sound.voicePreset = previous->voicePreset;
            }
            else
            {
                sound.id = ++Globals::gData.soundIdCounter;
            }

            return sound;
        }

        //* Recursively scans `directory` into a Folder node. `containsSounds` reports
        //* whether the subtree holds at least one sound file. Subfolders are kept when
        //* they contain sounds or when they existed in the previous model — this keeps
        //* user-created folders alive while they are still empty.
        Folder scanDirectory(const std::filesystem::path &directory, const Tab &tab,
                             const std::vector<const Sound *> &previousSounds, const Folder *previousFolder, int depth,
                             bool &containsSounds, FolderIdAllocator &ids)
        {
            Folder folder;
            folder.path = normalizePath(directory);
            folder.name = directory.filename().u8string();
            folder.id = ids.assign(previousFolder ? previousFolder->id : 0);

            std::error_code ec;
            for (const auto &entry : std::filesystem::directory_iterator(directory, ec))
            {
                if (ec)
                {
                    break;
                }

                auto file = resolveEntry(directory, entry);

                if (std::filesystem::is_directory(file))
                {
                    const auto fileName = file.filename().u8string();
                    if (!fileName.empty() && fileName.front() == '.')
                    {
                        continue;
                    }

                    if (depth < kMaxFolderDepth)
                    {
                        const auto *previousChild =
                            previousFolder ? findPreviousFolder(previousFolder->folders, normalizePath(file)) : nullptr;
                        bool childContainsSounds = false;
                        auto child = scanDirectory(file, tab, previousSounds, previousChild, depth + 1,
                                                   childContainsSounds, ids);
                        if (childContainsSounds || previousChild != nullptr)
                        {
                            folder.folders.emplace_back(std::move(child));
                        }
                        containsSounds = containsSounds || childContainsSounds;
                    }
                }
                else if (isSupportedAudioFile(file))
                {
                    folder.sounds.emplace_back(buildSound(file, previousSounds));
                    containsSounds = true;
                }
            }

            sortSounds(folder.sounds, tab.sortMode, &tab.soundOrder);
            sortFolders(folder.folders, tab.sortMode == Enums::SortMode::Manual ? &tab.folderOrder : nullptr);
            return folder;
        }

#if defined(__linux__)
        //* Finds the recording stream of the target window's process (if it is currently
        //* capturing audio). Falls back to tolerant matching so slight naming differences
        //* (e.g. ".exe" suffixes or truncated /proc names) still resolve.
        std::shared_ptr<RecordingApp> findTargetRecordingApp(const std::string &target)
        {
            if (!Globals::gAudioBackend)
            {
                return nullptr;
            }

            if (auto exact = Globals::gAudioBackend->getRecordingApp(target); exact)
            {
                return exact;
            }

            const auto loweredTarget = toLower(target);
            if (loweredTarget.empty())
            {
                return nullptr;
            }

            for (auto &app : Globals::gAudioBackend->getRecordingApps())
            {
                if (!app)
                {
                    continue;
                }

                const auto application = toLower(app->application);
                const auto name = toLower(app->name);
                if (application == loweredTarget || name == loweredTarget ||
                    application.rfind(loweredTarget, 0) == 0 || loweredTarget.rfind(application, 0) == 0 ||
                    name.rfind(loweredTarget, 0) == 0)
                {
                    return app;
                }
            }

            return nullptr;
        }
#endif
    } // namespace

    void Window::setup()
    {
        NFD::Init();
        Globals::gHotKeys.init();
        for (auto &tab : Globals::gData.getTabs())
        {
            tab = getTabContent(tab);
            Globals::gData.setTab(tab.id, tab);
        }

        //* Persist the freshly scanned model — this anchors the unique folder ids
        //* assigned during the scan so navigation keeps working across restarts.
        Globals::gConfig.save();
    }
    Window::~Window()
    {
        NFD::Quit();
        Globals::gHotKeys.stop();
    }
    Tab Window::getTabContent(const Tab &tab) const
    {
#if defined(_WIN32)
        const auto path = Helpers::widen(tab.path);
#else
        const auto &path = tab.path;
#endif

        Tab rtn = tab;
        rtn.sounds.clear();
        rtn.folders.clear();

        if (std::filesystem::exists(path))
        {
            std::vector<const Sound *> previousSounds;
            collectPreviousSounds(tab, previousSounds);

            bool containsSounds = false;
            FolderIdAllocator ids;
            auto root = scanDirectory(path, tab, previousSounds, nullptr, 0, containsSounds, ids);

            rtn.sounds = std::move(root.sounds);
            rtn.folders = std::move(root.folders);
            return rtn;
        }

        Fancy::fancy.logTime().warning() << "Path " >> tab.path << " does not exist" << std::endl;
        return rtn;
    }
    std::optional<std::string> Window::pickFolderDialog()
    {
#if defined(_WIN32)
        static std::wstring lastPath = Helpers::widen(std::getenv("USERPROFILE")); // NOLINT
#else
        static std::string lastPath = std::getenv("HOME"); // NOLINT
#endif

        nfdnchar_t *outpath = {};
        auto result = NFD::PickFolder(outpath, lastPath.empty() ? nullptr : lastPath.c_str());

        if (result == NFD_OKAY && outpath)
        {
#if defined(_WIN32)
            std::wstring picked(outpath);
            std::transform(picked.begin(), picked.end(), picked.begin(), [](wchar_t c) { return c == '\\' ? '/' : c; });
            auto parent = std::filesystem::path(picked).parent_path().wstring();
            std::transform(parent.begin(), parent.end(), parent.begin(), [](wchar_t c) { return c == '/' ? '\\' : c; });
            lastPath = parent;
            NFD_FreePathN(outpath);
            return Helpers::narrow(picked);
#else
            std::string picked(outpath);
            lastPath = std::filesystem::path(picked).parent_path();
            NFD_FreePathN(outpath);
            return picked;
#endif
        }

        return std::nullopt;
    }
    std::vector<Tab> Window::addTabFromFolder(const std::string &rootPath)
    {
        std::vector<Tab> tabsUnderRoot;

#if defined(_WIN32)
        const auto wideRoot = Helpers::widen(rootPath);
        const std::filesystem::path rootDirectory(wideRoot);
#else
        const std::filesystem::path rootDirectory(rootPath);
#endif

        std::error_code ec;
        if (rootPath.empty() || !std::filesystem::is_directory(rootDirectory, ec))
        {
            Fancy::fancy.logTime().warning() << "Selected folder does not exist: " << rootPath << std::endl;
            onError(Enums::ErrorCode::FolderDoesNotExist);
            return tabsUnderRoot;
        }

        //* Helper: registers `directory` as a tab when it is not registered yet and
        //* appends it to the result list. Existing tabs are included as-is so the UI
        //* can group everything that lives under the picked folder.
        const auto registerTab = [&](const std::filesystem::path &directory) {
            const auto normalized = normalizePath(directory);

            const auto tabs = Globals::gData.getTabs();
            const auto existing =
                std::find_if(tabs.begin(), tabs.end(), [&normalized](const Tab &tab) { return tab.path == normalized; });
            if (existing != tabs.end())
            {
                tabsUnderRoot.emplace_back(*existing);
                return;
            }

            Tab tab;
            tab.path = normalized;
            tab.name = directory.filename().u8string();
            tab = getTabContent(tab);

            tabsUnderRoot.emplace_back(Globals::gData.addTab(std::move(tab)));
        };

        //* Every direct subfolder of the picked folder becomes its own folder under
        //* the new sidebar category — each keeps its whole nested structure.
        bool hasDirectSounds = false;
        for (auto it = std::filesystem::directory_iterator(rootDirectory, ec),
                  end = std::filesystem::directory_iterator();
             !ec && it != end; it.increment(ec))
        {
            if (ec)
            {
                break;
            }

            std::error_code entryEc;
            if (it->is_directory(entryEc) && !entryEc)
            {
                registerTab(it->path());
            }
            else if (it->is_regular_file(entryEc) && !entryEc && isSupportedAudioFile(it->path()))
            {
                hasDirectSounds = true;
            }
        }

        //* Sounds sitting directly in the picked folder would be lost otherwise —
        //* register the folder itself as a folder of the new category too.
        if (hasDirectSounds)
        {
            registerTab(rootDirectory);
        }

        if (!tabsUnderRoot.empty())
        {
            Globals::gConfig.save();
        }

        return tabsUnderRoot;
    }
    std::vector<std::string> Window::pickFoldersDialog()
    {
#if defined(_WIN32)
        const char *userProfile = std::getenv("USERPROFILE"); // NOLINT
        static std::wstring lastPath = userProfile ? Helpers::widen(userProfile) : std::wstring();

        std::vector<std::string> picked;

        //* IFileOpenDialog with FOS_PICKFOLDERS | FOS_ALLOWMULTISELECT is the only
        //* native way to select several folders at once — NFD has no multi-folder
        //* API. COM is already initialized by NFD::Init on this thread.
        IFileOpenDialog *dialog = nullptr;
        HRESULT hr = CoCreateInstance(CLSID_FileOpenDialog, nullptr, CLSCTX_INPROC_SERVER, IID_PPV_ARGS(&dialog));
        if (FAILED(hr) || dialog == nullptr)
        {
            Fancy::fancy.logTime().warning() << "Failed to create folder picker dialog" << std::endl;
            return {};
        }

        DWORD options = 0;
        if (SUCCEEDED(dialog->GetOptions(&options)))
        {
            dialog->SetOptions(options | FOS_PICKFOLDERS | FOS_ALLOWMULTISELECT | FOS_FILEMUSTEXIST | FOS_PATHMUSTEXIST);
        }

        if (!lastPath.empty())
        {
            IShellItem *startupFolder = nullptr;
            if (SUCCEEDED(SHCreateItemFromParsingName(lastPath.c_str(), nullptr, IID_PPV_ARGS(&startupFolder))) &&
                startupFolder != nullptr)
            {
                dialog->SetFolder(startupFolder);
                startupFolder->Release();
            }
        }

        if (SUCCEEDED(dialog->Show(nullptr)))
        {
            IShellItemArray *results = nullptr;
            if (SUCCEEDED(dialog->GetResults(&results)) && results != nullptr)
            {
                DWORD count = 0;
                if (SUCCEEDED(results->GetCount(&count)))
                {
                    picked.reserve(count);
                    for (DWORD index = 0; index < count; index++)
                    {
                        IShellItem *item = nullptr;
                        if (SUCCEEDED(results->GetItemAt(index, &item)) && item != nullptr)
                        {
                            PWSTR rawPath = nullptr;
                            if (SUCCEEDED(item->GetDisplayName(SIGDN_FILESYSPATH, &rawPath)) && rawPath != nullptr)
                            {
                                std::wstring wide(rawPath);
                                CoTaskMemFree(rawPath);

                                std::transform(wide.begin(), wide.end(), wide.begin(),
                                               [](wchar_t c) { return c == L'\\' ? L'/' : c; });

                                if (picked.empty())
                                {
                                    std::wstring parent = std::filesystem::path(wide).parent_path().wstring();
                                    std::transform(parent.begin(), parent.end(), parent.begin(),
                                                   [](wchar_t c) { return c == L'/' ? L'\\' : c; });
                                    if (!parent.empty())
                                    {
                                        lastPath = parent;
                                    }
                                }

                                picked.push_back(Helpers::narrow(wide));
                            }
                            item->Release();
                        }
                    }
                }
                results->Release();
            }
        }

        dialog->Release();
        return picked;
#else
        const char *homeDirectory = std::getenv("HOME"); // NOLINT
        static std::string lastPath = homeDirectory ? homeDirectory : "";

        std::vector<std::string> picked;

        GtkWidget *dialog = gtk_file_chooser_dialog_new("Select folders", nullptr, GTK_FILE_CHOOSER_ACTION_SELECT_FOLDER,
                                                        "_Cancel", GTK_RESPONSE_CANCEL, "_Select", GTK_RESPONSE_ACCEPT,
                                                        nullptr);
        gtk_file_chooser_set_select_multiple(GTK_FILE_CHOOSER(dialog), TRUE);
        if (!lastPath.empty())
        {
            gtk_file_chooser_set_current_folder(GTK_FILE_CHOOSER(dialog), lastPath.c_str());
        }

        if (gtk_dialog_run(GTK_DIALOG(dialog)) == GTK_RESPONSE_ACCEPT)
        {
            GSList *names = gtk_file_chooser_get_filenames(GTK_FILE_CHOOSER(dialog));
            for (GSList *it = names; it != nullptr; it = it->next)
            {
                auto *name = static_cast<gchar *>(it->data);
                if (name != nullptr)
                {
                    picked.emplace_back(name);
                }
            }

            if (!picked.empty())
            {
                lastPath = std::filesystem::path(picked.front()).parent_path().u8string();
            }

            g_slist_free_full(names, g_free);
        }

        gtk_widget_destroy(dialog);
        while (gtk_events_pending())
        {
            gtk_main_iteration();
        }
        return picked;
#endif
    }
    std::vector<std::string> Window::pickSoundFilesDialog()
    {
#if defined(_WIN32)
        const char *userProfile = std::getenv("USERPROFILE"); // NOLINT
        static std::wstring lastPath = userProfile ? Helpers::widen(userProfile) : std::wstring();
#else
        const char *homeDirectory = std::getenv("HOME"); // NOLINT
        static std::string lastPath = homeDirectory ? homeDirectory : "";
#endif

        std::vector<std::string> picked;

        //* Filter item strings are native (wide on Windows, UTF-8 elsewhere) so the
        //* dialog only offers supported audio files on both platforms.
#if defined(_WIN32)
        const nfdnfilteritem_t filters[1] = {{L"Audio Files", L"mp3,wav,flac"}};
#else
        const nfdnfilteritem_t filters[1] = {{"Audio Files", "mp3,wav,flac"}};
#endif

        const nfdpathset_t *outPaths = {};
        const auto result =
            NFD::OpenDialogMultiple(outPaths, filters, 1, lastPath.empty() ? nullptr : lastPath.c_str());

        if (result == NFD_OKAY && outPaths != nullptr)
        {
            nfdpathsetsize_t count = 0;
            if (NFD::PathSet::Count(outPaths, count) == NFD_OKAY)
            {
                picked.reserve(count);
                for (nfdpathsetsize_t index = 0; index < count; index++)
                {
                    nfdnchar_t *path = {};
                    if (NFD::PathSet::GetPath(outPaths, index, path) == NFD_OKAY && path != nullptr)
                    {
#if defined(_WIN32)
                        std::wstring wide(path);
                        NFD::PathSet::FreePath(path);

                        //* Keep the model on forward slashes (like pickFolderDialog)
                        //* and remember the parent directory for the next pick.
                        std::transform(wide.begin(), wide.end(), wide.begin(),
                                       [](wchar_t c) { return c == L'\\' ? L'/' : c; });

                        if (picked.empty())
                        {
                            std::wstring parent = std::filesystem::path(wide).parent_path().wstring();
                            std::transform(parent.begin(), parent.end(), parent.begin(),
                                           [](wchar_t c) { return c == L'/' ? L'\\' : c; });
                            if (!parent.empty())
                            {
                                lastPath = parent;
                            }
                        }

                        picked.push_back(Helpers::narrow(wide));
#else
                        std::string entry(path);
                        NFD::PathSet::FreePath(path);

                        if (picked.empty())
                        {
                            lastPath = std::filesystem::path(entry).parent_path();
                        }

                        picked.push_back(entry);
#endif
                    }
                }
            }

            NFD::PathSet::Free(outPaths);
        }

        return picked;
    }
    std::optional<Tab> Window::importFolderIntoTab(const std::uint32_t &tabId, const std::string &sourcePath,
                                                   const std::string &mode)
    {
        auto tab = Globals::gData.getTab(tabId);
        if (!tab)
        {
            Fancy::fancy.logTime().failure() << "Failed to import folder into tab " << tabId
                                             << " tab does not exist" << std::endl;
            onError(Enums::ErrorCode::TabDoesNotExist);
            return std::nullopt;
        }

        const std::filesystem::path source(sourcePath);
        std::error_code ec;
        if (sourcePath.empty() || !std::filesystem::is_directory(source, ec))
        {
            onError(Enums::ErrorCode::FolderDoesNotExist);
            return std::nullopt;
        }

        const std::filesystem::path destinationRoot(tab->path);

        //* "parent" mode keeps the picked folder as a wrapper: everything is copied
        //* into a fresh subfolder named after it, so all subfolders stay inside it.
        std::filesystem::path copyRoot = destinationRoot;
        if (mode == "parent")
        {
            std::string folderName = source.filename().u8string();
            if (folderName.empty() || folderName == "." || folderName == "..")
            {
                folderName = "Imported Folder";
            }
            copyRoot = destinationRoot / uniqueDirectoryName(destinationRoot, folderName);
        }

        //* Collect all copy jobs before touching the disk. This keeps the import safe
        //* even when the picked folder lies inside the category directory itself.
        std::vector<std::pair<std::filesystem::path, std::filesystem::path>> copyJobs;
        for (auto it = std::filesystem::recursive_directory_iterator(source, ec),
                  end = std::filesystem::recursive_directory_iterator();
             !ec && it != end; it.increment(ec))
        {
            if (ec)
            {
                break;
            }

            if (!it->is_regular_file(ec) || ec)
            {
                continue;
            }

            if (!isSupportedAudioFile(it->path()))
            {
                continue;
            }

            auto relative = std::filesystem::relative(it->path(), source, ec);
            if (ec || relative.empty())
            {
                continue;
            }

            copyJobs.emplace_back(it->path(), copyRoot / relative);
        }

        std::size_t imported = 0;
        std::size_t skipped = 0;
        std::size_t failed = 0;
        for (const auto &[from, to] : copyJobs)
        {
            std::error_code copyEc;
            std::filesystem::create_directories(to.parent_path(), copyEc);
            if (copyEc)
            {
                failed++;
                Fancy::fancy.logTime().warning() << "Failed to create directory " << to.parent_path() << ": "
                                                 << copyEc.message() << std::endl;
                continue;
            }

            const auto copied =
                std::filesystem::copy_file(from, to, std::filesystem::copy_options::skip_existing, copyEc);
            if (copyEc)
            {
                failed++;
                Fancy::fancy.logTime().warning() << "Failed to copy " << from << ": " << copyEc.message() << std::endl;
            }
            else if (copied)
            {
                imported++;
            }
            else
            {
                skipped++;
            }
        }

        Fancy::fancy.logTime().message() << "Folder import into '" << tab->name << "': " << imported << " imported, "
                                         << skipped << " skipped, " << failed << " failed" << std::endl;

        auto refreshed = getTabContent(*tab);
        auto newTab = Globals::gData.setTab(tabId, refreshed);
        if (newTab)
        {
            Globals::gConfig.save();
            return newTab;
        }

        onError(Enums::ErrorCode::TabDoesNotExist);
        return std::nullopt;
    }
    std::optional<Tab> Window::importDroppedPaths(const std::uint32_t &tabId,
                                                  const std::optional<std::uint32_t> &parentFolderId,
                                                  const std::vector<std::string> &paths,
                                                  const std::string &mode)
    {
        auto tab = Globals::gData.getTab(tabId);
        if (!tab)
        {
            Fancy::fancy.logTime().failure() << "Failed to import dropped paths into tab " << tabId
                                             << " tab does not exist" << std::endl;
            onError(Enums::ErrorCode::TabDoesNotExist);
            return std::nullopt;
        }

        //* Resolve the destination: the tab root, or the folder the user currently
        //* has open on screen (parentFolderId).
        std::filesystem::path destinationRoot(tab->path);
        if (parentFolderId)
        {
            auto *parentFolder = Globals::gData.findFolderById(tab->folders, *parentFolderId);
            if (!parentFolder)
            {
                onError(Enums::ErrorCode::FolderDoesNotExist);
                return std::nullopt;
            }
            destinationRoot = std::filesystem::path(parentFolder->path);
        }

        const std::string destinationKey = toLower(normalizePath(destinationRoot));

        std::size_t imported = 0;
        std::size_t skipped = 0;
        std::size_t failed = 0;
        std::size_t folders = 0;
        std::size_t ignored = 0;

        //* "children" mode flattens exactly one dropped folder: its contents are
        //* imported directly into the destination while the folder itself is skipped
        //* (mirrors the second option of the Import Confirmation dialog).
        std::error_code flattenEc;
        const bool flattenSingleFolder = mode == "children" && paths.size() == 1 &&
                                         std::filesystem::is_directory(std::filesystem::path(paths.front()), flattenEc);

        //* Collect all copy jobs before touching the disk — same safety property as
        //* importFolderIntoTab: a drop never spirals even when the dropped folder
        //* lies inside the destination directory itself.
        std::vector<std::pair<std::filesystem::path, std::filesystem::path>> copyJobs;

        for (const auto &rawPath : paths)
        {
            if (rawPath.empty())
            {
                continue;
            }

            std::error_code ec;
            const std::filesystem::path source(rawPath);

            if (std::filesystem::is_directory(source, ec))
            {
                const std::string sourceKey = toLower(normalizePath(source));

                //* Dropping a folder onto itself — or onto one of its own parents —
                //* would only duplicate it inside itself. Skip those.
                if (sourceKey == destinationKey || destinationKey.rfind(sourceKey + "/", 0) == 0)
                {
                    skipped++;
                    continue;
                }

                if (flattenSingleFolder)
                {
                    //* Copy the folder's contents straight into the destination —
                    //* relative paths stay intact, the parent wrapper is skipped.
                    for (auto it = std::filesystem::recursive_directory_iterator(source, ec),
                              end = std::filesystem::recursive_directory_iterator();
                         !ec && it != end; it.increment(ec))
                    {
                        if (ec)
                        {
                            break;
                        }

                        if (!it->is_regular_file(ec) || ec)
                        {
                            continue;
                        }

                        if (!isSupportedAudioFile(it->path()))
                        {
                            continue;
                        }

                        auto relative = std::filesystem::relative(it->path(), source, ec);
                        if (ec || relative.empty())
                        {
                            continue;
                        }

                        copyJobs.emplace_back(it->path(), destinationRoot / relative);
                    }
                    folders++;
                    continue;
                }

                std::string folderName = source.filename().u8string();
                if (folderName.empty() || folderName == "." || folderName == "..")
                {
                    folderName = "Imported Folder";
                }
                const std::string targetName = uniqueDirectoryName(destinationRoot, folderName);
                const auto targetRoot = destinationRoot / targetName;

                for (auto it = std::filesystem::recursive_directory_iterator(source, ec),
                          end = std::filesystem::recursive_directory_iterator();
                     !ec && it != end; it.increment(ec))
                {
                    if (ec)
                    {
                        break;
                    }

                    if (!it->is_regular_file(ec) || ec)
                    {
                        continue;
                    }

                    if (!isSupportedAudioFile(it->path()))
                    {
                        continue;
                    }

                    auto relative = std::filesystem::relative(it->path(), source, ec);
                    if (ec || relative.empty())
                    {
                        continue;
                    }

                    copyJobs.emplace_back(it->path(), targetRoot / relative);
                }
                folders++;
            }
            else if (std::filesystem::is_regular_file(source, ec))
            {
                if (!isSupportedAudioFile(source))
                {
                    ignored++;
                    continue;
                }
                copyJobs.emplace_back(source, destinationRoot / source.filename());
            }
        }

        for (const auto &[from, to] : copyJobs)
        {
            std::error_code copyEc;
            std::filesystem::create_directories(to.parent_path(), copyEc);
            if (copyEc)
            {
                failed++;
                Fancy::fancy.logTime().warning() << "Failed to create directory " << to.parent_path() << ": "
                                                 << copyEc.message() << std::endl;
                continue;
            }

            const auto copied =
                std::filesystem::copy_file(from, to, std::filesystem::copy_options::skip_existing, copyEc);
            if (copyEc)
            {
                failed++;
                Fancy::fancy.logTime().warning() << "Failed to copy " << from << ": " << copyEc.message() << std::endl;
            }
            else if (copied)
            {
                imported++;
            }
            else
            {
                skipped++;
            }
        }

        Fancy::fancy.logTime().message()
            << "Drop import into '" << tab->name << "': " << folders << " folder(s), " << imported << " imported, "
            << skipped << " skipped, " << failed << " failed" << (ignored > 0 ? ", " + std::to_string(ignored) +
                                                                            " ignored (unsupported file type)"
                                                                            : "")
            << std::endl;

        auto refreshed = getTabContent(*tab);
        auto newTab = Globals::gData.setTab(tabId, refreshed);
        if (newTab)
        {
            Globals::gConfig.save();
            return newTab;
        }

        onError(Enums::ErrorCode::TabDoesNotExist);
        return std::nullopt;
    }
    std::optional<Tab> Window::createFolderInTab(const std::uint32_t &tabId,
                                                 const std::optional<std::uint32_t> &parentFolderId,
                                                 const std::string &name)
    {
        auto tab = Globals::gData.getTab(tabId);
        if (!tab)
        {
            Fancy::fancy.logTime().failure() << "Failed to create folder in tab " << tabId << " tab does not exist"
                                             << std::endl;
            onError(Enums::ErrorCode::TabDoesNotExist);
            return std::nullopt;
        }

        //* Strip characters that are invalid in path names so the folder can never
        //* escape its parent through separators or reserved characters.
        std::string sanitized;
        sanitized.reserve(name.size());
        for (const auto character : name)
        {
            if (character == '/' || character == '\\' || character == ':' || character == '*' || character == '?' ||
                character == '"' || character == '<' || character == '>' || character == '|' ||
                static_cast<unsigned char>(character) < 0x20)
            {
                continue;
            }
            sanitized += character;
        }

        const auto first = sanitized.find_first_not_of(" \t");
        const auto last = sanitized.find_last_not_of(" \t");
        if (first == std::string::npos)
        {
            onError(Enums::ErrorCode::InvalidFolderName);
            return std::nullopt;
        }
        sanitized = sanitized.substr(first, last - first + 1);

        std::filesystem::path parentPath(tab->path);
        Folder *parentFolder = nullptr;
        if (parentFolderId)
        {
            parentFolder = Globals::gData.findFolderById(tab->folders, *parentFolderId);
            if (!parentFolder)
            {
                onError(Enums::ErrorCode::FolderDoesNotExist);
                return std::nullopt;
            }
            parentPath = std::filesystem::path(parentFolder->path);
        }

        //* Never overwrite existing folders — pick "Name (2)", "Name (3)", ... instead.
        std::string uniqueName = sanitized;
        for (std::size_t attempt = 2; std::filesystem::exists(parentPath / uniqueName) && attempt < 1000; attempt++)
        {
            uniqueName = sanitized + " (" + std::to_string(attempt) + ")";
        }

        std::error_code ec;
        const auto targetPath = parentPath / uniqueName;
        if (!std::filesystem::create_directory(targetPath, ec) || ec)
        {
            Fancy::fancy.logTime().failure() << "Failed to create folder " << targetPath << ": " << ec.message()
                                             << std::endl;
            onError(Enums::ErrorCode::FailedToCreateFolder);
            return std::nullopt;
        }

        Folder newFolder;
        newFolder.id = Globals::gData.nextFolderId();
        newFolder.name = uniqueName;
        newFolder.path = normalizePath(targetPath);

        if (parentFolder)
        {
            parentFolder->folders.emplace_back(newFolder);
            sortFolders(parentFolder->folders,
                        tab->sortMode == Enums::SortMode::Manual ? &tab->folderOrder : nullptr);
        }
        else
        {
            tab->folders.emplace_back(newFolder);
            sortFolders(tab->folders, tab->sortMode == Enums::SortMode::Manual ? &tab->folderOrder : nullptr);
        }

        auto newTab = Globals::gData.setTab(tabId, *tab);
        if (newTab)
        {
            Globals::gConfig.save();
            return newTab;
        }

        onError(Enums::ErrorCode::TabDoesNotExist);
        return std::nullopt;
    }
    std::optional<Tab> Window::renameTab(const std::uint32_t &id, const std::string &name)
    {
        auto tab = Globals::gData.getTab(id);
        if (!tab)
        {
            Fancy::fancy.logTime().failure() << "Failed to rename tab " << id << " tab does not exist" << std::endl;
            onError(Enums::ErrorCode::TabDoesNotExist);
            return std::nullopt;
        }

        //* The category label is pure display state — trim it and make sure it is not
        //* blank. The folder on disk (and with it every sound, hotkey and favorite)
        //* stays untouched.
        const auto first = name.find_first_not_of(" \t\r\n");
        const auto last = name.find_last_not_of(" \t\r\n");
        if (first == std::string::npos)
        {
            onError(Enums::ErrorCode::InvalidFolderName);
            return std::nullopt;
        }
        const std::string trimmed = name.substr(first, last - first + 1);

        tab->name = trimmed;
        auto newTab = Globals::gData.setTab(id, *tab);
        if (newTab)
        {
            Globals::gConfig.save();
            return newTab;
        }

        onError(Enums::ErrorCode::TabDoesNotExist);
        return std::nullopt;
    }
    std::vector<Tab> Window::createTab(const std::string &name)
    {
        //* Strip characters that are invalid in path names — identical rules to
        //* createFolderInTab, since this name becomes a real directory.
        std::string sanitized;
        sanitized.reserve(name.size());
        for (const auto character : name)
        {
            if (character == '/' || character == '\\' || character == ':' || character == '*' || character == '?' ||
                character == '"' || character == '<' || character == '>' || character == '|' ||
                static_cast<unsigned char>(character) < 0x20)
            {
                continue;
            }
            sanitized += character;
        }

        const auto first = sanitized.find_first_not_of(" \t");
        const auto last = sanitized.find_last_not_of(" \t");
        if (first == std::string::npos)
        {
            onError(Enums::ErrorCode::InvalidFolderName);
            return {};
        }
        sanitized = sanitized.substr(first, last - first + 1);

        //* Empty categories live next to the config file in a dedicated folder, so
        //* users can build custom categories without picking an existing directory.
#if defined(_WIN32)
        char *buffer = nullptr;
        std::size_t size = 0;
        _dupenv_s(&buffer, &size, "APPDATA");
        const std::filesystem::path categoriesRoot = buffer ? std::filesystem::path(buffer) / "Audiopad" / "Categories"
                                                            : std::filesystem::temp_directory_path() / "Audiopad";
        if (buffer)
        {
            free(buffer);
        }
#else
        const auto *configHome = std::getenv("XDG_DATA_HOME"); // NOLINT
        const std::filesystem::path categoriesRoot =
            configHome ? std::filesystem::path(configHome) / "Audiopad" / "Categories"
                       : std::filesystem::path(std::getenv("HOME")) / ".local" / "share" / "Audiopad" / "Categories"; // NOLINT
#endif

        std::error_code ec;
        std::filesystem::create_directories(categoriesRoot, ec);
        if (ec)
        {
            Fancy::fancy.logTime().failure() << "Failed to create categories root " << categoriesRoot << ": "
                                             << ec.message() << std::endl;
            onError(Enums::ErrorCode::FailedToCreateFolder);
            return {};
        }

        //* Never overwrite existing folders — pick "Name (2)", "Name (3)", ... instead.
        std::string uniqueName = sanitized;
        for (std::size_t attempt = 2; std::filesystem::exists(categoriesRoot / uniqueName) && attempt < 1000; attempt++)
        {
            uniqueName = sanitized + " (" + std::to_string(attempt) + ")";
        }

        const auto targetPath = categoriesRoot / uniqueName;
        if (!std::filesystem::create_directory(targetPath, ec) || ec)
        {
            Fancy::fancy.logTime().failure() << "Failed to create category folder " << targetPath << ": "
                                             << ec.message() << std::endl;
            onError(Enums::ErrorCode::FailedToCreateFolder);
            return {};
        }

        Tab newTab;
        newTab.name = uniqueName;
        newTab.path = normalizePath(targetPath);
        newTab = getTabContent(newTab);

        Globals::gData.addTab(std::move(newTab));
        Globals::gConfig.save();
        return Globals::gData.getTabs();
    }
#if defined(__linux__)
    std::optional<PlayingSound> Window::playSoundStreams(const Sound &sound)
    {
        auto playingSound = Globals::gAudio.play(sound, std::nullopt, false, true);
        auto remotePlayingSound = Globals::gAudio.play(sound, Globals::gAudio.nullSink, true, false);

        if (playingSound && remotePlayingSound)
        {
            groupedSounds->insert({playingSound->id, remotePlayingSound->id});

            //* Target window mode: the soundboard stream is moved exclusively into
            //* the selected application's recording input. It is never routed into
            //* any other app (e.g. Discord), no matter which outputs are configured.
            if (Globals::gSettings.targetWindow)
            {
                auto targetApp = findTargetRecordingApp(*Globals::gSettings.targetWindow);
                if (targetApp && Globals::gAudioBackend->inputSoundTo(targetApp))
                {
                    onSoundPlayed(*playingSound);
                    return *playingSound;
                }

                //* The target is not currently capturing audio. The remote copy
                //* simply stays on the inaudible null sink instead of leaking into
                //* other chat programs.
                Fancy::fancy.logTime().warning()
                    << "Target window '" << *Globals::gSettings.targetWindow
                    << "' is not receiving audio right now — sound kept exclusive to it" << std::endl;
                onError(Enums::ErrorCode::FailedToMoveToSink);
                onSoundPlayed(*playingSound);
                return *playingSound;
            }

            if (Globals::gSettings.outputs.empty() && playingSound)
            {
                onSoundPlayed(*playingSound);
                return *playingSound;
            }
            if (!Globals::gSettings.outputs.empty() && Globals::gAudioBackend)
            {
                bool moveSuccess = false;
                for (const auto &outputApp : Globals::gSettings.outputs)
                {
                    if (Globals::gAudioBackend->inputSoundTo(Globals::gAudioBackend->getRecordingApp(outputApp)))
                    {
                        moveSuccess = true;
                    }
                }

                if (!moveSuccess)
                {
                    if (playingSound)
                        stopSound(playingSound->id);
                    if (remotePlayingSound)
                        stopSound(remotePlayingSound->id);

                    onError(Enums::ErrorCode::FailedToMoveToSink);
                    return std::nullopt;
                }

                onSoundPlayed(*playingSound);
                return *playingSound;
            }
        }

        Fancy::fancy.logTime().failure() << "Failed to play sound " << sound.id << std::endl;
        onError(Enums::ErrorCode::FailedToPlay);
        return std::nullopt;
    }
#else
    namespace
    {
        //* Heuristic for virtual audio cables / virtual mixers: devices whose names
        //* carry these markers are not physical speakers or headphones, so they are
        //* never a good "hear it yourself" monitor endpoint.
        bool isVirtualAudioDevice(const std::string &name)
        {
            const auto lowered = toLower(name);
            return lowered.find("cable") != std::string::npos ||
                   lowered.find("vb-audio") != std::string::npos ||
                   lowered.find("voicemeeter") != std::string::npos ||
                   lowered.find("virtual") != std::string::npos;
        }

        bool isSameAudioDevice(const AudioDevice &left, const AudioDevice &right)
        {
            return left.name == right.name;
        }

        //* Resolves the playback device used to feed the target window. Prefers the
        //* explicitly configured output; otherwise falls back to the VB-Cable device,
        //* which is the standard virtual-microphone pathway other apps listen on.
        //* A cable that happens to be the system default is still a valid target —
        //* being the default must not disqualify it.
        std::optional<AudioDevice> findTargetOutputDevice()
        {
            if (!Globals::gSettings.outputs.empty())
            {
                auto configured = Globals::gAudio.getAudioDevice(Globals::gSettings.outputs.front());
                if (configured)
                {
                    return configured;
                }
            }

            for (const auto &device : Globals::gAudio.getAudioDevices())
            {
                if (toLower(device.name).find("cable") != std::string::npos)
                {
                    return device;
                }
            }

            return std::nullopt;
        }

        //* Resolves the device the soundboard user personally listens on while a
        //* target window is active:
        //*   1. the system default — unless it is the target device itself (e.g. the
        //*      VB-Cable is set as Windows default, a common Voicemeeter setup);
        //*   2. otherwise the first render device that is neither the target nor a
        //*      virtual cable/mixer — i.e. the user's real speakers or headphones;
        //*   3. nothing, when the target already is an audible local device — the
        //*      target stream itself is what the user hears.
        std::optional<AudioDevice> findLocalMonitorDevice(const std::optional<AudioDevice> &targetDevice)
        {
            const auto devices = Globals::gAudio.getAudioDevices();

            std::optional<AudioDevice> defaultDevice;
            for (const auto &device : devices)
            {
                if (device.isDefault)
                {
                    defaultDevice = device;
                    break;
                }
            }

            if (defaultDevice && (!targetDevice || !isSameAudioDevice(*defaultDevice, *targetDevice)))
            {
                return defaultDevice;
            }

            if (!targetDevice || !isVirtualAudioDevice(targetDevice->name))
            {
                //* The target is the user's own (audible) default device — the target
                //* stream doubles as the local monitor, no second stream needed.
                return std::nullopt;
            }

            for (const auto &device : devices)
            {
                if (targetDevice && isSameAudioDevice(device, *targetDevice))
                {
                    continue;
                }
                if (!isVirtualAudioDevice(device.name))
                {
                    return device;
                }
            }

            return std::nullopt;
        }
    } // namespace

    std::optional<PlayingSound> Window::playSoundStreams(const Sound &sound)
    {
        //* Target window mode: the remote stream plays exclusively into the target's
        //* audio pathway (the configured output / VB-Cable). Other chat programs do
        //* not receive the soundboard audio because it never touches them. A second
        //* local monitor stream guarantees the user always hears what is being sent:
        //* when the target device is the system default (a common VB-Cable/Voicemeeter
        //* setup) the monitor is rerouted to the first real speaker/headphone device
        //* instead of silently vanishing into the virtual cable.
        if (Globals::gSettings.targetWindow)
        {
            auto targetDevice = findTargetOutputDevice();

            //* No virtual pathway available at all — fall back to the default device so
            //* the target app at least receives audio when it listens on the default.
            if (!targetDevice)
            {
                for (const auto &device : Globals::gAudio.getAudioDevices())
                {
                    if (device.isDefault)
                    {
                        targetDevice = device;
                        break;
                    }
                }

                if (targetDevice)
                {
                    Fancy::fancy.logTime().warning()
                        << "Target window '" << *Globals::gSettings.targetWindow
                        << "' has no virtual output device to route through — falling back to the default device"
                        << std::endl;
                }
            }

            const auto monitorDevice = findLocalMonitorDevice(targetDevice);
            const bool dualStream = monitorDevice && targetDevice &&
                                   !isSameAudioDevice(*monitorDevice, *targetDevice);

            std::optional<PlayingSound> localSound;
            std::optional<PlayingSound> remoteSound;

            if (dualStream)
            {
                //* The monitor is the stream the user hears — it drives the UI progress.
                localSound = Globals::gAudio.play(sound, monitorDevice, false, true);
                remoteSound = Globals::gAudio.play(sound, targetDevice, true, false);
            }
            else if (targetDevice)
            {
                //* Single stream: the target device is already audible to the user, or no
                //* separate monitor device exists. It feeds the target and doubles as the
                //* progress-reporting stream.
                remoteSound = Globals::gAudio.play(sound, targetDevice, true, true);
            }

            if (localSound && remoteSound)
            {
                groupedSounds->insert({localSound->id, remoteSound->id});
                onSoundPlayed(*localSound);
                return *localSound;
            }

            //* Graceful degradation: never kill a working stream just because its
            //* partner failed to start.
            if (localSound)
            {
                Fancy::fancy.logTime().warning()
                    << "Target window '" << *Globals::gSettings.targetWindow
                    << "' stream could not start — playing locally only" << std::endl;
                onError(Enums::ErrorCode::FailedToMoveToSink);
                onSoundPlayed(*localSound);
                return *localSound;
            }

            if (remoteSound)
            {
                onSoundPlayed(*remoteSound);
                return *remoteSound;
            }

            Fancy::fancy.logTime().failure() << "Failed to play sound " << sound.id << std::endl;
            onError(Enums::ErrorCode::FailedToPlay);
            return std::nullopt;
        }

        if (Globals::gSettings.outputs.empty() && !Globals::gSettings.useAsDefaultDevice)
        {
            auto playingSound = Globals::gAudio.play(sound, std::nullopt, false, true);
            if (playingSound)
            {
                onSoundPlayed(*playingSound);
            }
            return playingSound;
        }

        if (Globals::gSettings.outputs.empty())
        {
            //* "Use as default device" with no explicit outputs — a single stream on
            //* the default device is all we can do (and all we need).
            auto playingSound = Globals::gAudio.play(sound, std::nullopt, false, true);
            if (playingSound)
            {
                onSoundPlayed(*playingSound);
            }
            return playingSound;
        }

        auto playingSound = Globals::gAudio.play(sound, std::nullopt, false, true);
        auto playbackDevice = Globals::gAudio.getAudioDevice(Globals::gSettings.outputs.front());

        if (playbackDevice && !playbackDevice->isDefault)
        {
            auto remotePlayingSound = Globals::gAudio.play(sound, playbackDevice, true, false);
            if (playingSound && remotePlayingSound)
            {
                groupedSounds->insert({playingSound->id, remotePlayingSound->id});
                onSoundPlayed(*playingSound);
                return *playingSound;
            }

            if (playingSound)
                stopSound(playingSound->id);

            if (remotePlayingSound)
                stopSound(remotePlayingSound->id);

            Fancy::fancy.logTime().failure() << "Failed to play sound " << sound.id << std::endl;
            onError(Enums::ErrorCode::FailedToPlay);
            return std::nullopt;
        }

        if (playingSound)
        {
            onSoundPlayed(*playingSound);
        }
        return playingSound;
    }
#endif

    namespace
    {
        //* Best-effort monitor configuration for the live voice path: the
        //* processed microphone is fed into the same endpoint other apps listen
        //* on (the null sink on Linux, the virtual cable on Windows) so a
        //* selected voice preset is what everyone hears.
        Audiopad::Audio::MicMonitor::Config monitorConfig()
        {
            Audiopad::Audio::MicMonitor::Config config;
#if defined(__linux__)
            if (Globals::gAudio.nullSink)
            {
                config.targetDevice = Globals::gAudio.nullSink->name;
            }
#elif defined(_WIN32)
            if (auto target = findTargetOutputDevice())
            {
                config.targetDevice = target->name;
            }
#endif
            return config;
        }

        //* Recursively reorders a folder tree's sounds by the persisted manual order.
        void reorderFolderSoundsByOrder(Folder &folder, const std::map<std::uint32_t, std::size_t> &order)
        {
            const auto indexOf = [&order](std::uint32_t id) -> std::size_t {
                const auto it = order.find(id);
                return it == order.end() ? static_cast<std::size_t>(-1) : it->second;
            };
            std::stable_sort(folder.sounds.begin(), folder.sounds.end(),
                             [&](const Sound &first, const Sound &second) {
                                 return indexOf(first.id) < indexOf(second.id);
                             });
            for (auto &child : folder.folders)
            {
                reorderFolderSoundsByOrder(child, order);
            }
        }
    } // namespace

    std::optional<PlayingSound> Window::playSound(const std::uint32_t &id, bool suppressRepeat)
    {
        auto sound = Globals::gData.getSound(id);
        if (!sound)
        {
            Fancy::fancy.logTime().failure() << "Sound " << id << " not found" << std::endl;
            onError(Enums::ErrorCode::SoundNotFound);
            return std::nullopt;
        }

        //* Snapshot of the model entry — policies are read consistently even if
        //* the tree is being rescanned concurrently.
        const Sound model = sound->get();

        //* 1) Voice slot: the trigger selects a live voice filter instead of a file.
        if (model.voicePreset)
        {
            const auto preset = Audiopad::Audio::MicMonitor::presetFromString(*model.voicePreset);
            if (preset)
            {
                setVoicePreset(static_cast<Enums::VoicePreset>(*preset));
            }
            return std::nullopt;
        }

        //* 2) Per-sound trigger policy while an instance is already active.
        const auto active = activeInstancesOfSound(id);
        if (!active.empty())
        {
            switch (model.triggerMode)
            {
            case Enums::TriggerMode::PlayPause:
            {
                bool anyUnpaused = false;
                for (const auto &instance : active)
                {
                    anyUnpaused = anyUnpaused || !instance.paused.load();
                }
                return anyUnpaused ? pauseSound(id) : resumeSound(id);
            }
            case Enums::TriggerMode::PlayStop:
                stopSound(id);
                return std::nullopt;
            case Enums::TriggerMode::PushToLoop:
            case Enums::TriggerMode::PlayRestart:
            default:
                //* Restart from the beginning — only this clip's instances.
                stopSound(id);
                break;
            }
        }

        //* 3) Exclusivity: the per-sound flag outranks the global overlap setting.
        if (model.stopOthers)
        {
            std::vector<std::uint32_t> others;
            for (const auto &instance : Globals::gAudio.getPlayingSounds())
            {
                if (instance.sound.id != id)
                {
                    others.push_back(instance.id);
                }
            }
            for (const auto other : others)
            {
                stopSound(other);
            }
        }
        else if (!Globals::gSettings.allowOverlapping)
        {
#if defined(__linux__)
            stopSounds(true);
#else
            stopSounds();
#endif
        }

        //* Push-to-talk keys are held for the duration of the playback (the
        //* release happens in onAllSoundsFinished / stopSounds).
        if (!Globals::gSettings.pushToTalkKeys.empty())
        {
            Globals::gHotKeys.pressKeys(Globals::gSettings.pushToTalkKeys);
        }

        //* 4) Effective microphone policy: the per-sound flag overrides the global one.
        const bool shouldMuteVoice = model.muteVoice.value_or(Globals::gSettings.muteDuringPlayback);

        //* 5) Start the platform-specific output streams.
        auto playing = playSoundStreams(model);

        //* 6) Post-start policies.
        if (playing)
        {
            std::vector<std::uint32_t> instanceIds{playing->id};
            {
                auto scoped = groupedSounds.scoped();
                if (scoped->find(playing->id) != scoped->end())
                {
                    instanceIds.push_back(scoped->at(playing->id));
                }
            }

            if (!suppressRepeat && (model.triggerMode == Enums::TriggerMode::PushToLoop || model.loopByDefault))
            {
                repeatSound(playing->id, true);
            }

            const bool silencedByOthers = applyMuteOthersPolicies(model, instanceIds);

            for (const auto instanceId : instanceIds)
            {
                Globals::gAudio.setPlayingPolicyFlags(instanceId, silencedByOthers, shouldMuteVoice);
            }

            if (shouldMuteVoice)
            {
                requestVoiceMute();
            }
        }

        return playing;
    }

    std::vector<PlayingSound> Window::activeInstancesOfSound(const std::uint32_t &soundId) const
    {
        std::vector<PlayingSound> instances;
        for (const auto &instance : Globals::gAudio.getPlayingSounds())
        {
            if (instance.sound.id == soundId)
            {
                instances.emplace_back(instance);
            }
        }
        return instances;
    }

    int Window::volumePercentFor(const PlayingSound &instance) const
    {
        if (instance.isRemote)
        {
            return instance.sound.remoteVolume ? *instance.sound.remoteVolume : Globals::gSettings.remoteVolume;
        }
        return instance.sound.localVolume ? *instance.sound.localVolume : Globals::gSettings.localVolume;
    }

    bool Window::applyMuteOthersPolicies(const Sound &sound, const std::vector<std::uint32_t> &newInstanceIds)
    {
        //* (a) This clip holds the "mute other sounds" policy: silence every
        //* other active instance, remembering their volumes for restoration.
        if (sound.muteOthers)
        {
            std::vector<std::uint32_t> victims;
            for (const auto &instance : Globals::gAudio.getPlayingSounds())
            {
                if (instance.sound.id == sound.id)
                {
                    continue;
                }
                {
                    auto scopedMuted = mutedByOthers.scoped();
                    if (scopedMuted->find(instance.id) != scopedMuted->end())
                    {
                        continue; //* already silenced by some muter
                    }
                }
                const int previous = volumePercentFor(instance);
                Globals::gAudio.setVolume(instance.id, 0);
                mutedByOthers->insert({instance.id, previous});
                victims.push_back(instance.id);
            }

            if (!victims.empty())
            {
                auto scopedRegistry = muteOthersRegistry.scoped();
                auto &list = (*scopedRegistry)[sound.id];
                list.insert(list.end(), victims.begin(), victims.end());
            }
        }

        //* (b) Another active clip already holds the policy: the freshly started
        //* instances join the silenced set so they stay quiet until the muter ends.
        for (const auto &instance : Globals::gAudio.getPlayingSounds())
        {
            if (instance.sound.id == sound.id || !instance.sound.muteOthers)
            {
                continue;
            }

            bool silenced = false;
            auto scopedRegistry = muteOthersRegistry.scoped();
            auto scopedMuted = mutedByOthers.scoped();
            for (const auto instanceId : newInstanceIds)
            {
                if (scopedMuted->find(instanceId) != scopedMuted->end())
                {
                    silenced = true;
                    continue;
                }
                int previous = 0;
                for (const auto &candidate : Globals::gAudio.getPlayingSounds())
                {
                    if (candidate.id == instanceId)
                    {
                        previous = volumePercentFor(candidate);
                        break;
                    }
                }
                Globals::gAudio.setVolume(instanceId, 0);
                scopedMuted->insert({instanceId, previous});
                (*scopedRegistry)[instance.sound.id].push_back(instanceId);
                silenced = true;
            }
            return silenced;
        }
        return false;
    }

    void Window::restoreMutedByOthers(const std::uint32_t &mutingSoundId)
    {
        std::vector<std::uint32_t> victims;
        {
            auto scopedRegistry = muteOthersRegistry.scoped();
            const auto it = scopedRegistry->find(mutingSoundId);
            if (it == scopedRegistry->end())
            {
                return;
            }
            victims = it->second;
            scopedRegistry->erase(it);
        }

        for (const auto victim : victims)
        {
            int previous = 0;
            {
                auto scopedMuted = mutedByOthers.scoped();
                const auto entry = scopedMuted->find(victim);
                if (entry == scopedMuted->end())
                {
                    continue;
                }
                previous = entry->second;
            }
            Globals::gAudio.setVolume(victim, previous);
            mutedByOthers->erase(victim);
        }
    }

    void Window::requestVoiceMute()
    {
        const int previous = voiceMuteRequests.fetch_add(1);
        if (previous == 0)
        {
            applyMicMute(true);
        }
    }

    void Window::releaseVoiceMute()
    {
        int current = voiceMuteRequests.load();
        while (current > 0)
        {
            if (voiceMuteRequests.compare_exchange_weak(current, current - 1))
            {
                if (current == 1)
                {
                    applyMicMute(false);
                }
                return;
            }
        }
    }

    void Window::applyMicMute(bool muted)
    {
#if defined(__linux__)
        if (Globals::gAudioBackend)
        {
            if (!Globals::gAudioBackend->muteInput(muted))
            {
                onError(Enums::ErrorCode::FailedToMute);
            }
        }
#elif defined(_WIN32)
        if (Globals::gWinSound && Globals::gWinSound->getMic())
        {
            if (!Globals::gWinSound->getMic()->mute(muted))
            {
                onError(Enums::ErrorCode::FailedToMute);
            }
        }
#endif
        micMutedByToggle.store(muted);
        onMicMuteChanged(muted);
    }

    void Window::teardownPlaybackPolicies(const PlayingSound &instance)
    {
        if (instance.sound.muteOthers)
        {
            restoreMutedByOthers(instance.sound.id);
        }
        mutedByOthers->erase(instance.id);
        if (instance.voiceMuteRequested)
        {
            releaseVoiceMute();
        }
    }

    void Window::teardownAllPlaybackPolicies()
    {
        muteOthersRegistry->clear();
        mutedByOthers->clear();
        while (voiceMuteRequests.load() > 0)
        {
            releaseVoiceMute();
        }
    }

    bool Window::toggleMicMute()
    {
        const bool next = !micMutedByToggle.load();
        applyMicMute(next);
        return next;
    }

    bool Window::isMicMuted() const
    {
        return micMutedByToggle.load();
    }

    void Window::applyHearMyself()
    {
        if (!Globals::gMicMonitor)
        {
            Globals::gMicMonitor = std::make_unique<Audiopad::Audio::MicMonitor>();
        }

        const auto preset = voicePreset();
        const bool shouldRun = Globals::gSettings.hearMyself ||
                               preset != static_cast<Enums::VoicePreset>(Audiopad::Audio::MicMonitor::Preset::Off);
        const bool running = Globals::gMicMonitor->isActive();

        if (shouldRun && (!running || Globals::gMicMonitor->monitorEnabled() != Globals::gSettings.hearMyself))
        {
            if (running)
            {
                Globals::gMicMonitor->stop();
            }
            Globals::gMicMonitor->setMonitorEnabled(Globals::gSettings.hearMyself);
            Globals::gMicMonitor->setPreset(static_cast<Audiopad::Audio::MicMonitor::Preset>(preset));
            if (!Globals::gMicMonitor->start(monitorConfig()))
            {
                Fancy::fancy.logTime().warning() << "Live microphone monitoring could not be started" << std::endl;
            }
        }
        else if (!shouldRun && running)
        {
            Globals::gMicMonitor->stop();
        }
        else if (running)
        {
            Globals::gMicMonitor->setPreset(static_cast<Audiopad::Audio::MicMonitor::Preset>(preset));
        }
    }

    bool Window::toggleHearMyself()
    {
        const bool next = !Globals::gSettings.hearMyself;
        Globals::gSettings.hearMyself = next;
        Globals::gConfig.save();
        applyHearMyself();
        //* Frontend + remote mirrors: every toggle path (topbar button, settings
        //* card, hotkey, remote panel) runs through here.
        onHearMyselfChanged(next);
        if (Globals::gControlServer)
        {
            Globals::gControlServer->broadcastHearMyself(next);
        }
        return next;
    }

    void Window::setVoicePreset(Enums::VoicePreset preset)
    {
        if (!Globals::gMicMonitor)
        {
            Globals::gMicMonitor = std::make_unique<Audiopad::Audio::MicMonitor>();
        }
        Globals::gMicMonitor->setPreset(static_cast<Audiopad::Audio::MicMonitor::Preset>(preset));
        applyHearMyself();
        onVoicePresetChanged(preset);
    }

    Enums::VoicePreset Window::voicePreset() const
    {
        return Globals::gMicMonitor ? static_cast<Enums::VoicePreset>(Globals::gMicMonitor->preset())
                                    : Enums::VoicePreset::Off;
    }

    bool Window::toggleOverlay()
    {
        const bool next = !Globals::gSettings.overlayEnabled;
        Globals::gSettings.overlayEnabled = next;
        Globals::gConfig.save();
        return next;
    }

    void Window::setOverlayPosition(int position)
    {
        if (position < 0)
        {
            position = 0;
        }
        if (position > 7)
        {
            position = 7;
        }
        Globals::gSettings.overlayPosition = position;
        Globals::gConfig.save();
    }

    void Window::cycleOverlayPosition()
    {
        setOverlayPosition((Globals::gSettings.overlayPosition + 1) % 8);
    }

    std::optional<Sound> Window::renameSound(const std::uint32_t &id, const std::string &name)
    {
        const auto first = name.find_first_not_of(" \t\r\n");
        if (first == std::string::npos)
        {
            onError(Enums::ErrorCode::InvalidSoundName);
            return std::nullopt;
        }
        const auto last = name.find_last_not_of(" \t\r\n");
        const std::string trimmed = name.substr(first, last - first + 1);

        auto updated = Globals::gData.updateSound(id, [&](Sound &sound) { sound.displayName = trimmed; });
        if (updated)
        {
            Globals::gConfig.save();
            if (Globals::gControlServer)
            {
                Globals::gControlServer->broadcastTabsChanged();
            }
        }
        return updated;
    }

    std::optional<Sound> Window::setSoundTags(const std::uint32_t &id, const std::vector<std::string> &tags)
    {
        std::vector<std::string> cleaned;
        for (const auto &tag : tags)
        {
            const auto first = tag.find_first_not_of(" \t\r\n");
            if (first == std::string::npos)
            {
                continue;
            }
            const auto last = tag.find_last_not_of(" \t\r\n");
            std::string trimmed = tag.substr(first, last - first + 1);
            if (trimmed.size() > 32)
            {
                trimmed = trimmed.substr(0, 32);
            }
            if (std::find(cleaned.begin(), cleaned.end(), trimmed) == cleaned.end())
            {
                cleaned.emplace_back(std::move(trimmed));
            }
            if (cleaned.size() >= 16)
            {
                break;
            }
        }

        auto updated = Globals::gData.updateSound(id, [&](Sound &sound) { sound.tags = cleaned; });
        if (updated)
        {
            Globals::gConfig.save();
            if (Globals::gControlServer)
            {
                Globals::gControlServer->broadcastTabsChanged();
            }
        }
        return updated;
    }

    std::optional<Sound> Window::setSoundPolicies(const std::uint32_t &id, Enums::TriggerMode triggerMode,
                                                  bool loopByDefault, bool stopOthers, bool muteOthers,
                                                  const std::optional<bool> &muteVoice)
    {
        auto updated = Globals::gData.updateSound(id, [&](Sound &sound) {
            sound.triggerMode = triggerMode;
            sound.loopByDefault = loopByDefault;
            sound.stopOthers = stopOthers;
            sound.muteOthers = muteOthers;
            sound.muteVoice = muteVoice;
        });
        if (updated)
        {
            Globals::gConfig.save();
        }
        return updated;
    }

    std::optional<Sound> Window::setSoundVoiceSlot(const std::uint32_t &id, const std::optional<std::string> &preset)
    {
        if (preset && !preset->empty() && !Audiopad::Audio::MicMonitor::presetFromString(*preset))
        {
            onError(Enums::ErrorCode::InvalidSoundName);
            return std::nullopt;
        }

        auto updated = Globals::gData.updateSound(id, [&](Sound &sound) {
            sound.voicePreset = preset && !preset->empty() ? preset : std::nullopt;
        });
        if (updated)
        {
            Globals::gConfig.save();
            if (Globals::gControlServer)
            {
                Globals::gControlServer->broadcastTabsChanged();
            }
        }
        return updated;
    }

    std::optional<Tab> Window::setTabIcon(const std::uint32_t &id, const std::string &icon)
    {
        auto tab = Globals::gData.getTab(id);
        if (!tab)
        {
            Fancy::fancy.logTime().failure() << "Failed to set icon for tab " << id << " tab does not exist"
                                             << std::endl;
            onError(Enums::ErrorCode::TabDoesNotExist);
            return std::nullopt;
        }

        tab->icon = icon;
        auto newTab = Globals::gData.setTab(id, *tab);
        if (newTab)
        {
            Globals::gConfig.save();
            if (Globals::gControlServer)
            {
                Globals::gControlServer->broadcastTabsChanged();
            }
            return newTab;
        }

        onError(Enums::ErrorCode::TabDoesNotExist);
        return std::nullopt;
    }

    std::optional<Tab> Window::setSoundOrder(const std::uint32_t &tabId, const std::vector<std::uint32_t> &orderedIds)
    {
        auto tab = Globals::gData.getTab(tabId);
        if (!tab)
        {
            onError(Enums::ErrorCode::TabDoesNotExist);
            return std::nullopt;
        }

        //* Sanitize: keep the submitted order, append anything missing exactly
        //* once, drop duplicates.
        tab->soundOrder.clear();
        {
            std::set<std::uint32_t> seen;
            for (const auto id : orderedIds)
            {
                if (seen.insert(id).second)
                {
                    tab->soundOrder.push_back(id);
                }
            }
            for (const auto &sound : Data::getFlatSounds(*tab))
            {
                if (seen.insert(sound.id).second)
                {
                    tab->soundOrder.push_back(sound.id);
                }
            }
        }
        tab->sortMode = Enums::SortMode::Manual;

        //* Mirror the new arrangement into the in-memory model right away so
        //* getTabs() reflects it without waiting for a rescan.
        {
            std::map<std::uint32_t, std::size_t> order;
            for (std::size_t index = 0; index < tab->soundOrder.size(); index++)
            {
                order.emplace(tab->soundOrder.at(index), index);
            }
            const auto indexOf = [&order](std::uint32_t id) -> std::size_t {
                const auto it = order.find(id);
                return it == order.end() ? static_cast<std::size_t>(-1) : it->second;
            };
            std::stable_sort(tab->sounds.begin(), tab->sounds.end(), [&](const Sound &first, const Sound &second) {
                return indexOf(first.id) < indexOf(second.id);
            });
            for (auto &folder : tab->folders)
            {
                reorderFolderSoundsByOrder(folder, order);
            }
        }

        auto newTab = Globals::gData.setTab(tabId, *tab);
        if (newTab)
        {
            Globals::gConfig.save();
            return newTab;
        }

        onError(Enums::ErrorCode::TabDoesNotExist);
        return std::nullopt;
    }
    std::optional<Tab> Window::setFolderOrder(const std::uint32_t &tabId, const std::vector<std::uint32_t> &orderedIds)
    {
        auto tab = Globals::gData.getTab(tabId);
        if (!tab)
        {
            onError(Enums::ErrorCode::TabDoesNotExist);
            return std::nullopt;
        }

        //* Sanitize: keep the submitted order, append every known folder id
        //* exactly once (pre-order walk), drop duplicates and unknown ids.
        tab->folderOrder = Ordering::sanitizeOrder(orderedIds, Ordering::collectFolderIds(tab->folders));
        tab->sortMode = Enums::SortMode::Manual;

        //* Mirror the new arrangement into the in-memory model right away so
        //* getTabs() reflects it without waiting for a rescan.
        Ordering::applyFolderOrder(tab->folders, tab->folderOrder);

        auto newTab = Globals::gData.setTab(tabId, *tab);
        if (newTab)
        {
            Globals::gConfig.save();
            if (Globals::gControlServer)
            {
                Globals::gControlServer->broadcastTabsChanged();
            }
            return newTab;
        }

        onError(Enums::ErrorCode::TabDoesNotExist);
        return std::nullopt;
    }

    BoardLoopInfo Window::boardLoopCycle(const std::uint32_t &tabId)
    {
        auto tab = Globals::gData.getTab(tabId);
        if (!tab)
        {
            onError(Enums::ErrorCode::TabDoesNotExist);
            return getBoardLoopState();
        }

        //* One click advances: Off -> board-only -> board + subfolders -> Off.
        //* Clicking another board's button restarts the cycle there.
        Enums::BoardLoopMode nextMode = Enums::BoardLoopMode::Off;
        {
            auto scoped = boardLoop.scoped();
            if (scoped->mode == Enums::BoardLoopMode::Off || scoped->tabId != tabId)
            {
                nextMode = Enums::BoardLoopMode::BoardOnly;
            }
            else if (scoped->mode == Enums::BoardLoopMode::BoardOnly)
            {
                nextMode = Enums::BoardLoopMode::BoardAndFolders;
            }
        }

        if (nextMode == Enums::BoardLoopMode::Off)
        {
            //* Turn off: clear the state first so the internal stopSound below
            //* cannot trigger the skip-advance hook.
            std::uint32_t currentSoundId = 0;
            {
                auto scoped = boardLoop.scoped();
                currentSoundId = scoped->currentSoundId;
                *scoped = BoardLoopState{};
            }
            if (currentSoundId != 0)
            {
                stopSound(currentSoundId);
            }
            onBoardLoopChanged(Enums::BoardLoopMode::Off, tabId);
            return getBoardLoopState();
        }

        const auto sequence = Ordering::buildBoardLoopSequence(*tab, nextMode);
        if (sequence.empty())
        {
            //* Nothing playable (empty board / only voice slots): stay off.
            {
                auto scoped = boardLoop.scoped();
                *scoped = BoardLoopState{};
            }
            onBoardLoopChanged(Enums::BoardLoopMode::Off, tabId);
            return getBoardLoopState();
        }

        //* Switching modes keeps the currently playing clip alive: find it in
        //* the new sequence and continue right behind it, so board-only ->
        //* board + folders never restarts the running sound.
        std::uint32_t carryOverSoundId = 0;
        {
            auto scoped = boardLoop.scoped();
            carryOverSoundId = scoped->currentSoundId;

            scoped->mode = nextMode;
            scoped->tabId = tabId;
            scoped->sequence = sequence;
            scoped->consecutiveFailures = 0;
            scoped->cursor = 0;
            if (carryOverSoundId != 0)
            {
                const auto it = std::find(sequence.begin(), sequence.end(), carryOverSoundId);
                if (it != sequence.end())
                {
                    scoped->cursor = static_cast<std::size_t>(it - sequence.begin());
                }
                else
                {
                    //* The running clip is not part of the new sequence — stop
                    //* it (currentSoundId cleared first: no skip-advance) and
                    //* start fresh from the top.
                    scoped->currentSoundId = 0;
                }
            }
        }

        if (carryOverSoundId == 0)
        {
            playNextBoardLoopSound();
        }
        else
        {
            bool stillCarrying = false;
            {
                auto scoped = boardLoop.scoped();
                stillCarrying = scoped->currentSoundId == carryOverSoundId;
            }
            if (!stillCarrying)
            {
                stopSound(carryOverSoundId);
                playNextBoardLoopSound();
            }
        }

        onBoardLoopChanged(nextMode, tabId);
        return getBoardLoopState();
    }

    BoardLoopInfo Window::getBoardLoopState()
    {
        const auto state = boardLoop.copy();
        BoardLoopInfo info;
        info.mode = state.mode;
        info.tabId = state.tabId;
        info.total = state.sequence.size();
        info.currentSoundId = state.currentSoundId;
        info.index = state.sequence.empty() ? 0 : (state.cursor % state.sequence.size()) + 1;
        return info;
    }

    void Window::playNextBoardLoopSound()
    {
        {
            auto scoped = boardLoop.scoped();
            if (scoped->mode == Enums::BoardLoopMode::Off || scoped->sequence.empty() || scoped->advancing)
            {
                return;
            }
            scoped->advancing = true;
        }

        //* Start the clip at the cursor, skipping entries that fail to start
        //* (vanished files, engine hiccups). A full failed sweep gives up —
        //* everything with the guard released: playSound takes its own locks.
        std::uint32_t startedSoundId = 0;
        while (true)
        {
            std::uint32_t soundId = 0;
            {
                auto scoped = boardLoop.scoped();
                if (scoped->mode == Enums::BoardLoopMode::Off || scoped->sequence.empty())
                {
                    break;
                }
                soundId = scoped->sequence.at(scoped->cursor);
            }

            //* The board loop owns repetition — suppress the clip's own loop
            //* default / push-to-loop repeat so one clip can't stall the chain.
            auto playing = playSound(soundId, true);
            if (playing)
            {
                startedSoundId = soundId;
                break;
            }

            bool giveUp = false;
            {
                auto scoped = boardLoop.scoped();
                if (scoped->mode == Enums::BoardLoopMode::Off || scoped->sequence.empty())
                {
                    break;
                }
                scoped->consecutiveFailures += 1;
                if (static_cast<std::size_t>(scoped->consecutiveFailures) >= scoped->sequence.size())
                {
                    giveUp = true;
                }
                else
                {
                    scoped->cursor = (scoped->cursor + 1) % scoped->sequence.size();
                }
            }
            if (giveUp)
            {
                Fancy::fancy.logTime().warning() << "Board loop gave up: no clip of the board could be started"
                                                 << std::endl;
                {
                    auto scoped = boardLoop.scoped();
                    *scoped = BoardLoopState{};
                }
                onBoardLoopChanged(Enums::BoardLoopMode::Off, 0);
                break;
            }
        }

        {
            auto scoped = boardLoop.scoped();
            scoped->advancing = false;
            if (startedSoundId != 0)
            {
                scoped->currentSoundId = startedSoundId;
                scoped->consecutiveFailures = 0;
            }
        }
    }

    std::vector<Tab> Window::moveSoundsToTab(const std::vector<std::uint32_t> &soundIds,
                                             const std::uint32_t &targetTabId,
                                             const std::optional<std::uint32_t> &targetFolderId)
    {
        auto targetTab = Globals::gData.getTab(targetTabId);
        if (!targetTab)
        {
            Fancy::fancy.logTime().failure() << "Failed to move sounds into tab " << targetTabId
                                             << " tab does not exist" << std::endl;
            onError(Enums::ErrorCode::TabDoesNotExist);
            return Globals::gData.getTabs();
        }

        std::filesystem::path destinationRoot(targetTab->path);
        if (targetFolderId)
        {
            auto *folder = Globals::gData.findFolderById(targetTab->folders, *targetFolderId);
            if (!folder)
            {
                onError(Enums::ErrorCode::FolderDoesNotExist);
                return Globals::gData.getTabs();
            }
            destinationRoot = std::filesystem::path(folder->path);
        }

        //* Phase 1 — move the files on disk and remember which source tabs own them.
        std::vector<Sound> moved;
        std::set<std::uint32_t> sourceTabIds;
        for (const auto soundId : soundIds)
        {
            auto sound = Globals::gData.getSound(soundId);
            if (!sound)
            {
                continue;
            }
            Sound entry = sound->get();

            std::error_code ec;
            const std::filesystem::path source(entry.path);
            if (entry.voicePreset || !std::filesystem::exists(source, ec))
            {
                continue; //* voice slots own no file; missing files cannot move
            }

            auto owningTab = Globals::gData.getTabBySoundId(soundId);
            if (owningTab)
            {
                sourceTabIds.insert(owningTab->id);
            }

            const std::string base = source.stem().u8string();
            std::filesystem::path destination = destinationRoot / source.filename();
            for (std::size_t attempt = 2; std::filesystem::exists(destination, ec) && attempt < 1000; attempt++)
            {
                destination =
                    destinationRoot / (base + " (" + std::to_string(attempt) + ")" + source.extension().u8string());
            }

            std::filesystem::rename(source, destination, ec);
            if (ec)
            {
                std::error_code copyEc;
                if (!std::filesystem::copy_file(source, destination, std::filesystem::copy_options::none, copyEc))
                {
                    Fancy::fancy.logTime().warning()
                        << "Failed to move '" << entry.path << "': " << copyEc.message() << std::endl;
                    continue;
                }
                std::error_code removeEc;
                std::filesystem::remove(source, removeEc);
            }

            entry.path = normalizePath(destination);
            moved.emplace_back(std::move(entry));
        }

        if (moved.empty())
        {
            onError(Enums::ErrorCode::FailedToMoveSound);
            return Globals::gData.getTabs();
        }

        //* Stop playback of everything that moved — the source file is gone.
        for (const auto &entry : moved)
        {
            stopSound(entry.id);
        }

        //* Phase 2 — model surgery: remove from the source trees, then pre-seed
        //* into the target so the next rescan matches by path and keeps ids,
        //* hotkeys, favorites and every per-sound policy alive.
        for (const auto &entry : moved)
        {
            Globals::gData.removeSoundFromModel(entry.id);
        }
        for (const auto &entry : moved)
        {
            Globals::gData.seedSoundInTab(targetTabId, entry);
        }

        //* Phase 3 — rescan the affected tabs so folder placement is correct.
        for (const auto tabId : sourceTabIds)
        {
            refreshTab(tabId);
        }
        if (sourceTabIds.find(targetTabId) == sourceTabIds.end())
        {
            refreshTab(targetTabId);
        }

        Globals::gConfig.save();
        if (Globals::gControlServer)
        {
            Globals::gControlServer->broadcastTabsChanged();
        }
        return Globals::gData.getTabs();
    }

    std::optional<Sound> Window::trimSound(const std::uint32_t &soundId, std::uint64_t startMs, std::uint64_t endMs)
    {
        auto sound = Globals::gData.getSound(soundId);
        if (!sound)
        {
            onError(Enums::ErrorCode::SoundNotFound);
            return std::nullopt;
        }
        const Sound entry = sound->get();
        if (entry.voicePreset)
        {
            onError(Enums::ErrorCode::FailedToTrim);
            return std::nullopt;
        }

        auto owningTab = Globals::gData.getTabBySoundId(soundId);
        if (!owningTab)
        {
            onError(Enums::ErrorCode::TabDoesNotExist);
            return std::nullopt;
        }

        const std::filesystem::path source(entry.path);
        const std::string base = source.stem().u8string() + " (trimmed)";
        std::filesystem::path destination = source.parent_path() / (base + ".wav");
        for (std::size_t attempt = 2;
             std::filesystem::exists(destination) && attempt < 1000; attempt++)
        {
            destination = source.parent_path() / (base + " (" + std::to_string(attempt) + ").wav");
        }

        if (!Helpers::Recorder::trimAudioFile(entry.path, destination.u8string(), startMs, endMs))
        {
            onError(Enums::ErrorCode::FailedToTrim);
            return std::nullopt;
        }

        auto refreshed = refreshTab(owningTab->id);
        if (!refreshed)
        {
            return std::nullopt;
        }
        Globals::gConfig.save();

        //* Locate the freshly created entry inside the rescanned tree.
        const std::string createdPath = normalizePath(destination);
        const auto findInSounds = [&createdPath](const std::vector<Sound> &sounds) -> std::optional<Sound> {
            for (const auto &candidate : sounds)
            {
                if (candidate.path == createdPath)
                {
                    return candidate;
                }
            }
            return std::nullopt;
        };
        const std::function<std::optional<Sound>(const std::vector<Folder> &)> findInFolders =
            [&](const std::vector<Folder> &folders) -> std::optional<Sound> {
            for (const auto &folder : folders)
            {
                if (auto found = findInSounds(folder.sounds))
                {
                    return found;
                }
                if (auto found = findInFolders(folder.folders))
                {
                    return found;
                }
            }
            return std::nullopt;
        };

        if (auto found = findInSounds(refreshed->sounds))
        {
            return found;
        }
        if (auto found = findInFolders(refreshed->folders))
        {
            return found;
        }
        return std::nullopt;
    }

    std::optional<Tab> Window::importFileIntoTab(const std::uint32_t &tabId, const std::string &filePath,
                                                 const std::optional<std::uint32_t> &parentFolderId)
    {
        return importDroppedPaths(tabId, parentFolderId, {filePath}, "children");
    }
    namespace
    {
        std::optional<std::uint32_t> resolveRemoteSoundId(
            sxl::var_guard<std::map<std::uint32_t, std::uint32_t>> &groupedSounds, const std::uint32_t &id)
        {
            //* With a target window active the remote stream can exist even without
            //* explicitly configured outputs (the cable is auto-detected), so the
            //* pairing must stay resolvable in that mode too.
            if ((Globals::gSettings.outputs.empty() && !Globals::gSettings.targetWindow) ||
                Globals::gSettings.useAsDefaultDevice)
            {
                return std::nullopt;
            }

            auto scoped = groupedSounds.scoped();
            if (scoped->find(id) != scoped->end())
            {
                return scoped->at(id);
            }

            for (const auto &ps : Globals::gAudio.getPlayingSounds())
            {
                if (ps.sound.id == id && scoped->find(ps.id) != scoped->end())
                {
                    return scoped->at(ps.id);
                }
            }

            return std::nullopt;
        }
    } // namespace

    std::optional<PlayingSound> Window::pauseSound(const std::uint32_t &id)
    {
        auto remoteSoundId = resolveRemoteSoundId(groupedSounds, id);
        auto playingSound = Globals::gAudio.pause(id);
        if (remoteSoundId)
        {
            Globals::gAudio.pause(*remoteSoundId);
        }

        if (playingSound)
        {
            return *playingSound;
        }

        Fancy::fancy.logTime().warning() << "Failed to pause sound " << id << std::endl;
        onError(Enums::ErrorCode::FailedToPause);
        return std::nullopt;
    }
    std::optional<PlayingSound> Window::resumeSound(const std::uint32_t &id)
    {
        auto remoteSoundId = resolveRemoteSoundId(groupedSounds, id);
        auto playingSound = Globals::gAudio.resume(id);
        if (remoteSoundId)
        {
            Globals::gAudio.resume(*remoteSoundId);
        }

        if (playingSound)
        {
            return *playingSound;
        }

        Fancy::fancy.logTime().warning() << "Failed to resume sound " << id << std::endl;
        onError(Enums::ErrorCode::FailedToResume);
        return std::nullopt;
    }
    std::optional<PlayingSound> Window::seekSound(const std::uint32_t &id, std::uint64_t seekTo)
    {
        auto remoteSoundId = resolveRemoteSoundId(groupedSounds, id);
        auto playingSound = Globals::gAudio.seek(id, seekTo);
        if (remoteSoundId)
        {
            Globals::gAudio.seek(*remoteSoundId, seekTo);
        }

        if (playingSound)
        {
            return *playingSound;
        }

        Fancy::fancy.logTime().warning() << "Failed to seek sound " << id << " to " << seekTo << std::endl;
        onError(Enums::ErrorCode::FailedToSeek);
        return std::nullopt;
    }
    std::optional<PlayingSound> Window::repeatSound(const std::uint32_t &id, bool shouldRepeat)
    {
        auto remoteSoundId = resolveRemoteSoundId(groupedSounds, id);
        auto playingSound = Globals::gAudio.repeat(id, shouldRepeat);
        if (remoteSoundId)
        {
            Globals::gAudio.repeat(*remoteSoundId, shouldRepeat);
        }

        if (playingSound)
        {
            return *playingSound;
        }

        Fancy::fancy.logTime().failure() << "Failed to set repeat-state of sound " << id << " to " << shouldRepeat
                                         << std::endl;
        onError(Enums::ErrorCode::FailedToRepeat);
        return std::nullopt;
    }
    std::vector<Tab> Window::removeTab(const std::uint32_t &id)
    {
        Globals::gData.removeTabById(id);
        return Globals::gData.getTabs();
    }
    bool Window::stopSound(const std::uint32_t &id)
    {
        //* Board loop: stopping the loop's current clip is a "skip" — the
        //* sequence moves on to the next entry. Turning the loop off clears
        //* currentSoundId before stopping, and starts triggered by the loop
        //* itself run inside the `advancing` window, so neither ever lands here.
        bool skipBoardLoop = false;
        {
            auto scoped = boardLoop.scoped();
            if (scoped->mode != Enums::BoardLoopMode::Off && !scoped->advancing &&
                scoped->currentSoundId == id && !scoped->sequence.empty())
            {
                scoped->cursor = (scoped->cursor + 1) % scoped->sequence.size();
                scoped->currentSoundId = 0;
                skipBoardLoop = true;
            }
        }

        bool stoppedAny = false;
        std::vector<std::uint32_t> playingSoundIdsToStop;

        for (const auto &ps : Globals::gAudio.getPlayingSounds())
        {
            if (ps.id == id || ps.sound.id == id)
            {
                playingSoundIdsToStop.push_back(ps.id);
            }
        }

        if (playingSoundIdsToStop.empty())
        {
            playingSoundIdsToStop.push_back(id);
        }

        for (const auto &playId : playingSoundIdsToStop)
        {
            std::optional<std::uint32_t> remoteSoundId;
            {
                auto scoped = groupedSounds.scoped();
                if (scoped->find(playId) != scoped->end())
                {
                    remoteSoundId = scoped->at(playId);
                    scoped->erase(playId);
                }
            }

            if (Globals::gAudio.stop(playId))
            {
                stoppedAny = true;
            }

            if (remoteSoundId)
            {
                Globals::gAudio.stop(*remoteSoundId);
            }
        }

        if (Globals::gAudio.getPlayingSounds().empty())
        {
            onAllSoundsFinished();
        }

        if (skipBoardLoop)
        {
            playNextBoardLoopSound();
        }

        return stoppedAny;
    }
    void Window::stopSounds(bool sync)
    {
        //* Stop-all ends the whole-board loop too — unless it was invoked by
        //* the loop's own start (overlap setting), which the `advancing`
        //* window marks. The state is cleared before the voices stop so no
        //* finishing instance can advance the dead loop.
        {
            bool cancelLoop = false;
            {
                auto scoped = boardLoop.scoped();
                if (scoped->mode != Enums::BoardLoopMode::Off && !scoped->advancing)
                {
                    *scoped = BoardLoopState{};
                    cancelLoop = true;
                }
            }
            if (cancelLoop)
            {
                onBoardLoopChanged(Enums::BoardLoopMode::Off, 0);
            }
        }

        if (!sync)
        {
            Globals::gQueue.push_unique(0, []() { Globals::gAudio.stopAll(); });
        }
        else
        {
            Globals::gAudio.stopAll();
        }

        //* Stop-all skips the per-instance finish funnel — release every
        //* outstanding playback policy ("mute others" victims are gone with
        //* the voices, per-sound mic mutes drain) in one sweep.
        teardownAllPlaybackPolicies();

        onAllSoundsFinished();
        groupedSounds->clear();

#if defined(__linux__)
        if (Globals::gAudioBackend)
        {
            if (!Globals::gAudioBackend->stopSoundInput())
            {
                onError(Enums::ErrorCode::FailedToMoveBack);
            }
            if (!Globals::gAudioBackend->stopAllPassthrough())
            {
                onError(Enums::ErrorCode::FailedToMoveBackPassthrough);
            }
        }
#endif
    }
    std::optional<Sound> Window::setCustomLocalVolume(const std::uint32_t &id, const std::optional<int> &localVolume)
    {
        auto sound = Globals::gData.getSound(id);
        if (sound)
        {
            sound->get().localVolume = localVolume;

            for (auto &playingSound : Globals::gAudio.getPlayingSounds())
            {
                if (playingSound.sound.id == sound->get().id && !playingSound.isRemote)
                {
                    //* Live volume update on the engine voice (streams are shared
                    //* between clips now, so a per-device factor would leak across).
                    Globals::gAudio.setVolume(playingSound.id,
                                              localVolume ? *localVolume : Globals::gSettings.localVolume);
                    if (playingSound.raw.boostFactor)
                    {
                        playingSound.raw.boostFactor->store(Globals::gAudio.getBoostFactor(sound->get().id),
                                                            std::memory_order_relaxed);
                    }
                }
            }

            return *sound;
        }

        Fancy::fancy.logTime().failure() << "Failed to set custom local volume for sound " << id
                                         << ", sound does not exist" << std::endl;
        onError(Enums::ErrorCode::FailedToSetCustomVolume);
        return std::nullopt;
    }
    std::optional<Sound> Window::setCustomRemoteVolume(const std::uint32_t &id, const std::optional<int> &remoteVolume)
    {
        auto sound = Globals::gData.getSound(id);
        if (sound)
        {
            sound->get().remoteVolume = remoteVolume;

            for (auto &playingSound : Globals::gAudio.getPlayingSounds())
            {
                if (playingSound.sound.id == sound->get().id && playingSound.isRemote)
                {
                    Globals::gAudio.setVolume(playingSound.id,
                                              remoteVolume ? *remoteVolume : Globals::gSettings.remoteVolume);
                    if (playingSound.raw.boostFactor)
                    {
                        playingSound.raw.boostFactor->store(Globals::gAudio.getBoostFactor(sound->get().id),
                                                            std::memory_order_relaxed);
                    }
                }
            }

            return *sound;
        }

        Fancy::fancy.logTime().failure() << "Failed to set custom remote volume for sound " << id
                                         << ", sound does not exist" << std::endl;
        onError(Enums::ErrorCode::FailedToSetCustomVolume);
        return std::nullopt;
    }
    Settings Window::changeSettings(Settings settings)
    {
        auto oldSettings = Globals::gSettings;
        Globals::gSettings = settings;

        if ((settings.localVolume != oldSettings.localVolume || settings.remoteVolume != oldSettings.remoteVolume ||
             settings.soundBoost != oldSettings.soundBoost) &&
            !Globals::gAudio.getPlayingSounds().empty())
        {
            for (const auto &playingSound : Globals::gAudio.getPlayingSounds())
            {
                int newVolume = 0;
                const auto &sound = playingSound.sound;

                //* The stream role flag decides which volume applies — the local
                //* monitor is not necessarily the system default device (e.g. when
                //* a VB-Cable is set as Windows default, the monitor runs on an
                //* explicit speaker device instead).
                if (!playingSound.isRemote)
                {
                    newVolume = sound.localVolume ? *sound.localVolume : Globals::gSettings.localVolume;
                }
                else
                {
                    newVolume = sound.remoteVolume ? *sound.remoteVolume : Globals::gSettings.remoteVolume;
                }

                Globals::gAudio.setVolume(playingSound.id, newVolume);
                if (playingSound.raw.boostFactor)
                {
                    playingSound.raw.boostFactor->store(Globals::gAudio.getBoostFactor(sound.id),
                                                        std::memory_order_relaxed);
                }
            }
        }

#if defined(__linux__)
        if (settings.audioBackend != oldSettings.audioBackend)
        {
            stopSounds(true);

            if (Globals::gAudioBackend)
            {
                Globals::gAudioBackend->destroy();
            }

            Globals::gAudioBackend = AudioBackend::createInstance(settings.audioBackend);
            Globals::gAudio.setup();
        }
        if (Globals::gAudioBackend)
        {
            if (!Globals::gAudio.getPlayingSounds().empty())
            {
                if (settings.muteDuringPlayback && !oldSettings.muteDuringPlayback)
                {
                    if (!Globals::gAudioBackend->muteInput(true))
                    {
                        onError(Enums::ErrorCode::FailedToMute);
                    }
                }
                else if (!settings.muteDuringPlayback && oldSettings.muteDuringPlayback)
                {
                    if (!Globals::gAudioBackend->muteInput(false))
                    {
                        onError(Enums::ErrorCode::FailedToMute);
                    }
                }
            }
            if (!settings.useAsDefaultDevice && oldSettings.useAsDefaultDevice)
            {
                if (!Globals::gAudioBackend->revertDefault())
                {
                    onError(Enums::ErrorCode::FailedToRevertDefaultSource);
                }
            }
            else if (settings.useAsDefaultDevice && !oldSettings.useAsDefaultDevice)
            {
                Globals::gSettings.outputs.clear();
                if (!Globals::gAudioBackend->stopSoundInput())
                {
                    onError(Enums::ErrorCode::FailedToMoveBack);
                }
                if (!Globals::gAudioBackend->useAsDefault())
                {
                    onError(Enums::ErrorCode::FailedToSetDefaultSource);
                }
            }
            if (settings.outputs != oldSettings.outputs && !settings.targetWindow)
            {
                if (!settings.allowMultipleOutputs && settings.outputs.size() > 1)
                {
                    Fancy::fancy.logTime().warning() << "Allow Multiple Outputs is off but got multiple output apps, "
                                                        "falling back to first output in list"
                                                     << std::endl;

                    settings.outputs = {settings.outputs.front()};
                }

                if (!Globals::gAudioBackend->stopSoundInput())
                {
                    onError(Enums::ErrorCode::FailedToMoveBack);
                }

                for (const auto &outputApp : settings.outputs)
                {
                    if (!settings.outputs.empty() && !Globals::gAudio.getPlayingSounds().empty())
                    {
                        if (!Globals::gAudioBackend->inputSoundTo(Globals::gAudioBackend->getRecordingApp(outputApp)))
                        {
                            onError(Enums::ErrorCode::FailedToMoveToSink);
                        }
                    }
                }
            }
        }
#elif defined(_WIN32)
        if (Globals::gWinSound)
        {
            if (!Globals::gAudio.getPlayingSounds().empty())
            {
                if (settings.muteDuringPlayback && !oldSettings.muteDuringPlayback)
                {
                    if (Globals::gWinSound->getMic())
                    {
                        if (!Globals::gWinSound->getMic()->mute(true))
                        {
                            onError(Enums::ErrorCode::FailedToMute);
                        }
                    }
                }
                else if (!settings.muteDuringPlayback && oldSettings.muteDuringPlayback)
                {
                    if (Globals::gWinSound->getMic())
                    {
                        if (!Globals::gWinSound->getMic()->mute(false))
                        {
                            onError(Enums::ErrorCode::FailedToMute);
                        }
                    }
                }
            }
        }
#endif
        return Globals::gSettings;
    }
    void Window::onHotKeyReceived([[maybe_unused]] const std::vector<int> &keys)
    {
        Globals::gHotKeys.shouldNotify(false);
    }
    std::optional<Tab> Window::refreshTab(const std::uint32_t &id)
    {
        auto tab = Globals::gData.getTab(id);
        if (tab)
        {
            *tab = getTabContent(*tab);
            auto newTab = Globals::gData.setTab(id, *tab);
            if (newTab)
            {
                return newTab;
            }
        }
        Fancy::fancy.logTime().failure() << "Failed to refresh tab " << id << " tab does not exist" << std::endl;
        onError(Enums::ErrorCode::TabDoesNotExist);
        return std::nullopt;
    }
    std::optional<Tab> Window::setSortMode(const std::uint32_t &id, Enums::SortMode sortMode)
    {
        auto tab = Globals::gData.getTab(id);
        if (tab)
        {
            tab->sortMode = sortMode;
            *tab = getTabContent(*tab);
            auto newTab = Globals::gData.setTab(id, *tab);
            if (newTab)
            {
                return newTab;
            }
        }

        Fancy::fancy.logTime().failure() << "Failed to change sortMode for tab " << id << " tab does not exist"
                                         << std::endl;
        onError(Enums::ErrorCode::TabDoesNotExist);
        return std::nullopt;
    }
    std::optional<Tab> Window::setTabBoost(const std::uint32_t &id, int boost)
    {
        auto tab = Globals::gData.getTab(id);
        if (tab)
        {
            //* Clamped with plain comparisons — <windows.h> macro-defines min/max on MSVC,
            //* which would break std::min/std::max calls in this translation unit.
            tab->boost = boost < 100 ? 100 : (boost > 400 ? 400 : boost);
            auto newTab = Globals::gData.setTab(id, *tab);

            //* Live-update the boost gain of every currently playing stream so the boost slider reacts
            //* instantly instead of only affecting the next playback. The gain is applied by the mixing
            //* callback (see AudioEngine::dataCallback) on top of the per-voice volume factor.
            for (auto &playingSound : Globals::gAudio.getPlayingSounds())
            {
                if (playingSound.raw.boostFactor)
                {
                    playingSound.raw.boostFactor->store(Globals::gAudio.getBoostFactor(playingSound.sound.id),
                                                        std::memory_order_relaxed);
                }
            }

            if (newTab)
            {
                return newTab;
            }
        }

        Fancy::fancy.logTime().failure() << "Failed to change boost for tab " << id << " tab does not exist"
                                         << std::endl;
        onError(Enums::ErrorCode::TabDoesNotExist);
        return std::nullopt;
    }
    std::optional<Sound> Window::setHotkey(const std::uint32_t &id, const std::vector<int> &hotkeys)
    {
        auto sound = Globals::gData.getSound(id);
        if (sound)
        {
            sound->get().hotkeys = hotkeys;
            return sound->get();
        }
        Fancy::fancy.logTime().failure() << "Failed to set hotkey for sound " << id << ", sound does not exist"
                                         << std::endl;
        onError(Enums::ErrorCode::FailedToSetHotkey);
        return std::nullopt;
    }
    std::vector<Tab> Window::changeTabOrder(const std::vector<int> &newOrder)
    {
        std::vector<Tab> newTabs;
        newTabs.reserve(newOrder.size());

        for (auto tabId : newOrder)
        {
            auto tab = Globals::gData.getTab(tabId);
            if (tab)
            {
                newTabs.emplace_back(*tab);
            }
            else
            {
                Fancy::fancy.logTime().warning() << "Skipping non existent tab " << tabId
                                                 << " while re-ordering tabs" << std::endl;
            }
        }

        if (newTabs.size() != Globals::gData.getTabs().size())
        {
            //* Reject partial orders, otherwise tabs would silently vanish from the soundboard.
            Fancy::fancy.logTime().failure() << "Refusing tab re-order: the submitted list does not contain every tab"
                                             << std::endl;
            onError(Enums::ErrorCode::TabDoesNotExist);
            return Globals::gData.getTabs();
        }

        Globals::gData.setTabs(newTabs);
        return Globals::gData.getTabs();
    }
#if defined(__linux__)
    std::vector<std::shared_ptr<IconRecordingApp>> Window::getOutputs()
    {
        //* The frontend only uses the stream name and should only show multiple streams that belong to one application
        //* once. The backend (gPulse.getRecordingStreams()) will work with multiple instances, so we need to filter out
        //* duplicates here.

        std::vector<std::shared_ptr<IconRecordingApp>> uniqueStreams;

        if (Globals::gAudioBackend)
        {
            auto streams = Globals::gAudioBackend->getRecordingApps();
            for (auto &stream : streams)
            {
                if (stream->application.find("audiopad") != std::string::npos)
                {
                    continue;
                }

                auto item = std::find_if(std::begin(uniqueStreams), std::end(uniqueStreams),
                                         [&](const auto &_stream) { return stream->name == _stream->name; });
                if (stream && item == std::end(uniqueStreams))
                {
                    auto iconStream = std::make_shared<IconRecordingApp>(*stream);
                    if (Globals::gIcons)
                    {
                        if (auto pulseApp = std::dynamic_pointer_cast<PulseRecordingApp>(stream); pulseApp)
                        {
                            auto icon = Audiopad::Globals::gIcons->getIcon(static_cast<int>(pulseApp->pid));
                            if (icon)
                            {
                                iconStream->appIcon = *icon;
                            }
                        }
                        else if (auto pipeWireApp = std::dynamic_pointer_cast<PipeWireRecordingApp>(stream);
                                 pipeWireApp)
                        {
                            auto icon = Audiopad::Globals::gIcons->getIcon(static_cast<int>(pipeWireApp->pid));
                            if (icon)
                            {
                                iconStream->appIcon = *icon;
                            }
                        }
                    }

                    uniqueStreams.emplace_back(iconStream);
                }
            }
        }

        return uniqueStreams;
    }
    std::vector<std::shared_ptr<IconPlaybackApp>> Window::getPlayback()
    {
        std::vector<std::shared_ptr<IconPlaybackApp>> uniqueStreams;

        if (Globals::gAudioBackend)
        {
            auto streams = Globals::gAudioBackend->getPlaybackApps();

            for (auto &stream : streams)
            {
                if (stream->application.find("audiopad") != std::string::npos)
                {
                    continue;
                }

                auto item = std::find_if(std::begin(uniqueStreams), std::end(uniqueStreams),
                                         [&](const auto &_stream) { return stream->name == _stream->name; });
                if (stream && item == std::end(uniqueStreams))
                {
                    auto iconStream = std::make_shared<IconPlaybackApp>(*stream);

                    if (Globals::gIcons)
                    {
                        if (auto pulseApp = std::dynamic_pointer_cast<PulsePlaybackApp>(stream); pulseApp)
                        {
                            auto icon = Audiopad::Globals::gIcons->getIcon(static_cast<int>(pulseApp->pid));
                            if (icon)
                            {
                                iconStream->appIcon = *icon;
                            }
                        }
                        if (auto pipeWireApp = std::dynamic_pointer_cast<PipeWirePlaybackApp>(stream); pipeWireApp)
                        {
                            auto icon = Audiopad::Globals::gIcons->getIcon(static_cast<int>(pipeWireApp->pid));
                            if (icon)
                            {
                                iconStream->appIcon = *icon;
                            }
                        }
                    }

                    uniqueStreams.emplace_back(iconStream);
                }
            }
        }

        return uniqueStreams;
    }
    bool Window::startPassthrough(const std::string &name)
    {
        bool success = true;
        if (Globals::gAudioBackend && !Globals::gSettings.outputs.empty())
        {
            for (const auto &outputApp : Globals::gSettings.outputs)
            {
                if (!Globals::gAudioBackend->inputSoundTo(Globals::gAudioBackend->getRecordingApp(outputApp)))
                {
                    onError(Enums::ErrorCode::FailedToMoveToSink);
                    success = false;
                }
            }

            if (success)
            {
                if (!Globals::gAudioBackend->passthroughFrom(Globals::gAudioBackend->getPlaybackApp(name)))
                {
                    success = false;
                }
            }

            if (!success)
            {
                onError(Enums::ErrorCode::FailedToStartPassthrough);
            }
        }

        return success;
    }
    void Window::stopPassthrough(const std::string &name)
    {
        if (Globals::gAudioBackend)
        {
            if (Globals::gAudio.getPlayingSounds().empty() &&
                Globals::gAudioBackend->currentlyPassedThrough().size() == 1)
            {
                if (!Globals::gAudioBackend->stopSoundInput())
                {
                    onError(Enums::ErrorCode::FailedToMoveBack);
                }
            }

            if (!Globals::gAudioBackend->stopPassthrough(name))
            {
                onError(Enums::ErrorCode::FailedToMoveBackPassthrough);
            }
        }
    }
#else
    std::vector<AudioDevice> Window::getOutputs()
    {
        return Globals::gAudio.getAudioDevices();
    }
#endif
    void Window::onSoundFinished(const PlayingSound &sound)
    {
        //* Per-sound playback policies: restore silenced victims and release
        //* this instance's microphone-mute request before anything else.
        teardownPlaybackPolicies(sound);

        auto scoped = groupedSounds.scoped();
        if (scoped->find(sound.id) != scoped->end())
        {
            scoped->erase(sound.id);
        }
        scoped.unlock();

        if (Globals::gAudio.getPlayingSounds().size() == 1)
        {
            onAllSoundsFinished();
        }

        //* Whole-board loop: when the loop's current clip fully ended, the
        //* sequence moves on and wraps around. The finishing instance is
        //* erased from the engine's active list only after this callback
        //* returns, so it is excluded and a surviving sibling instance (local
        //* + remote pair, manual restart) delays the advance. The next clip
        //* starts with the guard released — playSound may take its own locks
        //* and must never run under boardLoop's.
        bool advanceBoardLoop = false;
        {
            auto loopScoped = boardLoop.scoped();
            if (loopScoped->mode != Enums::BoardLoopMode::Off && loopScoped->currentSoundId == sound.sound.id &&
                !loopScoped->sequence.empty())
            {
                bool hasSiblingInstances = false;
                for (const auto &instance : Globals::gAudio.getPlayingSounds())
                {
                    if (instance.sound.id == sound.sound.id && instance.id != sound.id)
                    {
                        hasSiblingInstances = true;
                        break;
                    }
                }
                if (!hasSiblingInstances)
                {
                    loopScoped->cursor = (loopScoped->cursor + 1) % loopScoped->sequence.size();
                    advanceBoardLoop = true;
                }
            }
        }
        if (advanceBoardLoop)
        {
            playNextBoardLoopSound();
        }
    }
    void Window::onAllSoundsFinished()
    {
        if (!Globals::gSettings.pushToTalkKeys.empty())
        {
            Globals::gHotKeys.releaseKeys(Globals::gSettings.pushToTalkKeys);
        }

#if defined(__linux__)
        if (Globals::gAudioBackend)
        {
            if (Globals::gSettings.muteDuringPlayback)
            {
                if (!Globals::gAudioBackend->muteInput(false))
                {
                    onError(Enums::ErrorCode::FailedToMute);
                }
            }
            if (Globals::gAudioBackend->currentlyPassedThrough().empty())
            {
                if (!Globals::gAudioBackend->stopSoundInput())
                {
                    onError(Enums::ErrorCode::FailedToMoveBack);
                }
            }
        }
#elif defined(_WIN32)
        if (Globals::gSettings.muteDuringPlayback)
        {
            if (Globals::gWinSound && Globals::gWinSound->getMic())
            {
                if (!Globals::gWinSound->getMic()->mute(false))
                {
                    onError(Enums::ErrorCode::FailedToMute);
                }
            }
        }
#endif
    }
    void Window::onSoundPlayed([[maybe_unused]] const PlayingSound &sound)
    {
        if (!Globals::gSettings.pushToTalkKeys.empty())
        {
            Globals::gHotKeys.pressKeys(Globals::gSettings.pushToTalkKeys);
        }
    }
    void Window::setIsOnFavorites(bool state)
    {
        Globals::gData.isOnFavorites = state;
    }
    bool Window::deleteSound(const std::uint32_t &id)
    {
        auto sound = Globals::gData.getSound(id);
        if (sound)
        {
            if (!Helpers::deleteFile(sound->get().path, Globals::gSettings.deleteToTrash))
            {
                onError(Enums::ErrorCode::FailedToDelete);
                return false;
            }
            return true;
        }

        Fancy::fancy.logTime().failure() << "Sound " << id << " not found" << std::endl;
        onError(Enums::ErrorCode::SoundNotFound);
        return false;
    }
    bool Window::toggleSoundPlayback()
    {
        bool shouldPause = true;
        for (const auto &sound : Globals::gAudio.getPlayingSounds())
        {
            if (sound.paused)
            {
                shouldPause = false;
                break;
            }
        }

        auto soundsCopy = groupedSounds.copy();
        for (const auto &[local, remote] : soundsCopy)
        {
            if (shouldPause)
            {
                pauseSound(local);
            }
            else
            {
                resumeSound(local);
            }
        }

        return shouldPause;
    }
#if defined(__linux__)
    IconRecordingApp::IconRecordingApp(const RecordingApp &base)
    {
        name = base.name;
        application = base.application;
    }
    IconPlaybackApp::IconPlaybackApp(const PlaybackApp &base)
    {
        name = base.name;
        application = base.application;
    }
#endif
} // namespace Audiopad::Objects
