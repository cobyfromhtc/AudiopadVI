#include "webview.hpp"
#include <algorithm>
#include <core/global/globals.hpp>
#include <cstdint>
#include <fancy.hpp>
#include <filesystem>
#include <helper/artwork/artwork.hpp>
#include <helper/audio/linux/pulseaudio/pulseaudio.hpp>
#include <helper/audio/windows/winsound.hpp>
#include <helper/json/bindings.hpp>
#include <helper/paths/paths.hpp>
#include <helper/systeminfo/systeminfo.hpp>
#include <helper/version/check.hpp>
#include <nfd.hpp>

#ifdef _WIN32
#include "../../assets/icon.h"
#include <helper/misc/misc.hpp>
#include <shellapi.h>
#include <windows.h>
#endif

namespace Audiopad::Objects
{
    void WebView::setup()
    {
        Window::setup();

        if (Audiopad::Globals::gData.width < 1440)
        {
            Audiopad::Globals::gData.width = 1440;
        }
        if (Audiopad::Globals::gData.height < 820)
        {
            Audiopad::Globals::gData.height = 820;
        }

        webview =
            std::make_shared<Webview::Window>("Audiopad", Audiopad::Globals::gData.width, Audiopad::Globals::gData.height);
        webview->setTitle("Audiopad");
        webview->enableDevTools(std::getenv("AUDIOPAD_DEBUG") != nullptr);    // NOLINT
        webview->enableContextMenu(std::getenv("AUDIOPAD_DEBUG") != nullptr); // NOLINT

#ifdef _WIN32
        char rawPath[MAX_PATH];
        GetModuleFileNameA(nullptr, rawPath, MAX_PATH);

        auto path = std::filesystem::canonical(rawPath).parent_path() / "dist" / "index.html";
        tray = std::make_shared<Tray::Tray>("audiopad-tray", IDI_ICON1);

        webview->disableAcceleratorKeys(true);

        //* The app draws its own topbar (brand, drag region, window controls) inside
        //* the web UI — drop the native caption so only one topbar exists. Resize,
        //* Aero Snap and the DWM shadow survive via the kept sizing frame.
        webview->enableFramelessWindow();
#endif
#if defined(__linux__)
        auto path = std::filesystem::canonical("/proc/self/exe").parent_path() / "dist" / "index.html";
        std::filesystem::path iconPath;

        if (std::filesystem::exists("/app/share/icons/hicolor/256x256/apps/io.github.Audiopad.png"))
        {
            iconPath = "/app/share/icons/hicolor/256x256/apps/io.github.Audiopad.png";
        }
        else if (std::filesystem::exists("/usr/share/pixmaps/audiopad.png"))
        {
            iconPath = "/usr/share/pixmaps/audiopad.png";
        }
        else
        {
            Fancy::fancy.logTime().warning() << "Failed to find iconPath for tray icon" << std::endl;
        }

        tray = std::make_shared<Tray::Tray>("audiopad-tray", iconPath.u8string());
#endif

        exposeFunctions();
        fetchTranslations();

        //* Real-time detection of external folder changes (e.g. sounds added via the
        //* file explorer) — one watcher per category, debounced and pushed to the UI.
        restartTabWatchers();

        //* Native drag & drop: the webview shell hands us the real file system paths
        //* of everything dragged in from the OS file manager plus the drop position
        //* (client coordinates). Both platform windows (WM_DROPFILES with
        //* DragQueryPoint / GTK drag-data-received) feed the same callback.
        webview->setFileDropCallback([this](const std::vector<std::string> &paths, int dropX, int dropY) {
            onFilesDroppedFromOs(paths, dropX, dropY);
        });

        webview->setCloseCallback([this]() { return onClose(); });
        webview->setResizeCallback([this](std::size_t width, std::size_t height) { onResize(width, height); });

#if defined(IS_EMBEDDED)
#if defined(__linux__)
        webview->setUrl("embedded://" + path.string());
#elif defined(_WIN32)
        webview->setUrl("file:///embedded/" + path.string());
#endif
#else
        //* Properly percent-encoded file URI: plain concatenation breaks on paths
        //* with spaces/#/?/unicode (and on Windows drive letters), depending on
        //* which URL parser gets to see it first.
        webview->setUrl(Helpers::toFileUri(path));
#endif
    }
    void WebView::show()
    {
        webview->show();
    }
    void WebView::exposeFunctions()
    {
        webview->expose(Webview::Function("getSettings", []() { return Globals::gSettings; }));
        webview->expose(Webview::Function("isLinux", []() {
#if defined(__linux__)
            return true;
#else
            return false;
#endif
        }));
        webview->expose(Webview::Function("pickFolders", [this]() { return pickFoldersDialog(); }));
        webview->expose(Webview::Function("addTabFromFolder", [this](const std::string &rootPath) {
            auto tabs = addTabFromFolder(rootPath);
            if (!tabs.empty())
            {
                restartTabWatchers();
            }
            return tabs;
        }));
        webview->expose(Webview::Function("pathIsDirectory", [](const std::string &path) {
            std::error_code ec;
            return !path.empty() && std::filesystem::is_directory(std::filesystem::path(path), ec);
        }));
        webview->expose(Webview::Function("getTabs", []() { return Globals::gData.getTabs(); }));
        webview->expose(Webview::Function("playSound", [this](std::uint32_t id) { return playSound(id); }));
        webview->expose(Webview::Function("stopSound", [this](std::uint32_t id) { return stopSound(id); }));
        webview->expose(Webview::Function(
            "seekSound", [this](std::uint32_t id, std::uint64_t seekTo) { return seekSound(id, seekTo); }));
        webview->expose(Webview::AsyncFunction("pauseSound", [this](const Webview::Promise &promise, std::uint32_t id) {
            auto sound = pauseSound(id);
            if (sound)
            {
                promise.resolve(*sound);
            }
            else
            {
                promise.discard();
            }
        }));
        webview->expose(
            Webview::AsyncFunction("resumeSound", [this](const Webview::Promise &promise, std::uint32_t id) {
                auto sound = resumeSound(id);
                if (sound)
                {
                    promise.resolve(*sound);
                }
                else
                {
                    promise.discard();
                }
            }));
        webview->expose(Webview::Function("repeatSound",
                                          [this](std::uint32_t id, bool repeat) { return repeatSound(id, repeat); }));
        webview->expose(Webview::Function("stopSounds", [this]() { stopSounds(); }));
        webview->expose(Webview::Function("changeSettings",
                                          [this](const Settings &newSettings) { return changeSettings(newSettings); }));
        webview->expose(Webview::Function("requestHotkey", [](bool state) { Globals::gHotKeys.shouldNotify(state); }));
        webview->expose(Webview::Function(
            "setHotkey", [this](std::uint32_t id, const std::vector<int> &keys) { return setHotkey(id, keys); }));
        webview->expose(Webview::Function("getHotkeySequence", [this](const std::vector<int> &keys) {
            return Globals::gHotKeys.getKeySequence(keys);
        }));
        webview->expose(Webview::Function("removeTab", [this](std::uint32_t id) {
            auto tabs = removeTab(id);
            restartTabWatchers();
            return tabs;
        }));
        webview->expose(Webview::Function("refreshTab", [this](std::uint32_t id) { return refreshTab(id); }));
        webview->expose(Webview::Function(
            "setSortMode", [this](std::uint32_t id, Enums::SortMode sortMode) { return setSortMode(id, sortMode); }));
        webview->expose(
            Webview::Function("setTabBoost", [this](std::uint32_t id, const int &boost) { return setTabBoost(id, boost); }));
        webview->expose(Webview::Function(
            "moveTabs", [this](const std::vector<int> &newOrder) { return changeTabOrder(newOrder); }));
        webview->expose(Webview::Function("markFavorite", [this](const std::uint32_t &id, bool favorite) {
            Globals::gData.markFavorite(id, favorite);
            return Globals::gData.getFavoriteIds();
        }));
        webview->expose(Webview::Function("getFavorites", [this] { return Globals::gData.getFavoriteIds(); }));
        webview->expose(Webview::Function("pickImageFile", []() -> std::string {
#if defined(_WIN32)
            nfdnfilteritem_t filterItem[1] = {{L"Image files", L"png,jpg,jpeg,webp,bmp,gif"}};
#else
            nfdnfilteritem_t filterItem[1] = {{"Image files", "png,jpg,jpeg,webp,bmp,gif"}};
#endif
            nfdnchar_t *outPath = nullptr;
            auto result = NFD::OpenDialog(outPath, filterItem, 1);
            if (result == NFD_OKAY && outPath)
            {
                std::filesystem::path p(outPath);
                NFD_FreePathN(outPath);

                //* Bounded import: decode, downscale to the artwork dimension cap
                //* and re-encode as PNG, so huge camera shots never travel through
                //* the UI or the serialized configuration. Oversized or undecodable
                //* files are rejected (empty string) instead of bloating the model.
                auto imported = Helpers::Artwork::importImage(p.string());
                if (!imported)
                {
                    Fancy::fancy.logTime().warning()
                        << "Rejected image import (missing, oversized or undecodable): " << p << std::endl;
                    return "";
                }

                return imported->dataUrl;
            }
            return "";
        }));
        webview->expose(Webview::Function("setSoundImage", [](const std::uint32_t &id, const std::string &image) {
            if (image.empty())
            {
                Globals::gData.setSoundImage(id, "");
                Globals::gConfig.save();
                return true;
            }

            //* Re-bound whatever the UI sends back (its fallback file input can
            //* still produce raw data URLs). Storage compaction to a managed
            //* artwork reference happens on the debounced config write.
            auto processed = Helpers::Artwork::importDataUrl(image);
            if (!processed)
            {
                Fancy::fancy.logTime().warning() << "Rejected image update: payload too large or invalid" << std::endl;
                return false;
            }

            Globals::gData.setSoundImage(id, processed->dataUrl);
            Globals::gConfig.save();
            return true;
        }));
        webview->expose(Webview::Function("setSoundsImage", [](const std::vector<std::uint32_t> &ids, const std::string &image) {
            if (image.empty())
            {
                Globals::gData.setSoundsImage(ids, "");
                Globals::gConfig.save();
                return true;
            }

            auto processed = Helpers::Artwork::importDataUrl(image);
            if (!processed)
            {
                Fancy::fancy.logTime().warning() << "Rejected image update: payload too large or invalid" << std::endl;
                return false;
            }

            Globals::gData.setSoundsImage(ids, processed->dataUrl);
            Globals::gConfig.save();
            return true;
        }));
        webview->expose(Webview::Function("getSystemInfo", []() -> std::string { return SystemInfo::getSummary(); }));
        webview->expose(Webview::AsyncFunction(
            "updateCheck", [this](Webview::Promise promise) { promise.resolve(VersionCheck::getStatus()); }));
        webview->expose(Webview::Function("isOnFavorites", [this](bool state) { setIsOnFavorites(state); }));
        webview->expose(Webview::Function("deleteSound", [this](std::uint32_t id) { return deleteSound(id); }));
        webview->expose(Webview::Function("setCustomLocalVolume",
                                          [this](const std::uint32_t &id, const std::optional<int> &volume) {
                                              return setCustomLocalVolume(id, volume);
                                          }));
        webview->expose(Webview::Function("setCustomRemoteVolume",
                                          [this](const std::uint32_t &id, const std::optional<int> &volume) {
                                              return setCustomRemoteVolume(id, volume);
                                          }));
        webview->expose(Webview::Function("toggleSoundPlayback", [this]() { return toggleSoundPlayback(); }));

        //* --- Target Window (exclusive audio routing) & nested folder support ---
        webview->expose(Webview::Function("getAppWindows", []() { return Objects::getAppWindows(); }));

#if defined(_WIN32)
        //* --- Custom topbar window controls ---
        //* Windows runs frameless: the web topbar needs native helpers for moving,
        //* minimizing, maximizing and closing. Linux keeps its native titlebar —
        //* the bindings simply do not exist there and the frontend hides the
        //* controls (every call site guards on the binding's presence).
        webview->expose(Webview::Function("startWindowDrag", [this]() { webview->startDrag(); }));
        webview->expose(Webview::Function("minimizeWindow", [this]() { webview->minimize(); }));
        webview->expose(Webview::Function("maximizeWindow", [this]() { webview->toggleMaximize(); }));
        //* Goes through WM_CLOSE so the minimize-to-tray setting keeps working.
        webview->expose(Webview::Function("closeWindow", [this]() { webview->requestClose(); }));
        webview->expose(Webview::Function("isWindowMaximized", [this]() -> bool {
            return webview->isMaximized();
        }));
#endif
        webview->expose(Webview::Function("pickImportFolder", [this]() -> std::string {
            auto picked = pickFolderDialog();
            return picked ? *picked : "";
        }));
        //* Multi-select audio file picker for "Import Sound" (folder context menu).
        //* Returns every chosen file path; an empty array means the dialog was
        //* cancelled. Uses NFD on both platforms (IFileOpenDialog on Windows,
        //* GTK file chooser on Linux).
        webview->expose(Webview::Function("pickImportFiles", [this]() -> std::vector<std::string> {
            return pickSoundFilesDialog();
        }));
        webview->expose(
            Webview::AsyncFunction("importFolder", [this](const Webview::Promise &promise, std::uint32_t tabId,
                                                          const std::string &sourcePath, const std::string &mode) {
                auto tab = importFolderIntoTab(tabId, sourcePath, mode.empty() ? "children" : mode);
                if (tab)
                {
                    promise.resolve(*tab);
                }
                else
                {
                    promise.discard();
                }
            }));
        webview->expose(
            Webview::AsyncFunction("importDroppedPaths",
                                   [this](const Webview::Promise &promise, std::uint32_t tabId,
                                          std::uint32_t parentFolderId, const std::vector<std::string> &paths,
                                          const std::string &mode) {
                                       //* Runs off the UI thread — potentially large copies from the
                                       //* file manager must never freeze the interface.
                                       //* parentFolderId 0 means "tab root" (real folder ids never use 0).
                                       auto tab = importDroppedPaths(
                                           tabId,
                                           parentFolderId == 0 ? std::nullopt : std::optional<std::uint32_t>(parentFolderId),
                                           paths,
                                           mode.empty() ? "parent" : mode);
                                       if (tab)
                                       {
                                           promise.resolve(*tab);
                                       }
                                       else
                                       {
                                           promise.discard();
                                       }
                                   }));
        webview->expose(Webview::Function(
            "createFolder",
            [this](std::uint32_t tabId, const std::optional<std::uint32_t> &parentFolderId, const std::string &name) {
                return createFolderInTab(tabId, parentFolderId, name);
            }));
        webview->expose(Webview::Function(
            "renameTab", [this](std::uint32_t tabId, const std::string &name) { return renameTab(tabId, name); }));
        webview->expose(Webview::Function("createTab", [this](const std::string &name) {
            auto tabs = createTab(name);
            if (!tabs.empty())
            {
                restartTabWatchers();
            }
            return tabs;
        }));

#if !defined(__linux__)
        webview->expose(Webview::Function("getOutputs", [this]() { return getOutputs(); }));
#endif
#if defined(_WIN32)
        webview->expose(Webview::Function("openUrl", [](const std::string &url) {
            ShellExecuteA(nullptr, nullptr, url.c_str(), nullptr, nullptr, SW_SHOW);
        }));
        webview->expose(Webview::Function("openFolder", [](const std::uint32_t &id) {
            auto tab = Globals::gData.getTab(id);
            if (tab)
            {
                ShellExecuteW(nullptr, nullptr, Helpers::widen(tab->path).c_str(), nullptr, nullptr, SW_SHOWNORMAL);
            }
            else
            {
                Fancy::fancy.logTime().warning() << "Failed to find tab with id " << id << std::endl;
            }
        }));
        webview->expose(Webview::Function("restartAsAdmin", [this] {
            if (Globals::gGuard)
            {
                (void)Globals::gGuard->reset();
                Globals::gGuard.reset();
            }
            wchar_t selfPath[MAX_PATH];
            GetModuleFileNameW(nullptr, selfPath, MAX_PATH);
            ShellExecuteW(nullptr, L"runas", selfPath, L"--reset-mutex", nullptr, SW_SHOWNORMAL);

            webview->exit();
        }));
        webview->expose(Webview::Function("isElevated", []() -> bool {
            BOOL elevated = FALSE;
            HANDLE hToken = nullptr;
            if (OpenProcessToken(GetCurrentProcess(), TOKEN_QUERY, &hToken))
            {
                TOKEN_ELEVATION elevation;
                DWORD cbSize = sizeof(TOKEN_ELEVATION);
                if (GetTokenInformation(hToken, TokenElevation, &elevation, sizeof(elevation), &cbSize))
                {
                    elevated = (elevation.TokenIsElevated != 0);
                }
                CloseHandle(hToken);
            }
            return elevated != 0;
        }));
        webview->expose(Webview::Function("openSoundControlPanel", []() {
            ShellExecuteW(nullptr, L"open", L"rundll32.exe", L"shell32.dll,Control_RunDLL mmsys.cpl,,1", nullptr, SW_SHOWNORMAL);
        }));
        webview->expose(Webview::Function("isVBCableProperlySetup", [] {
            if (Globals::gWinSound)
            {
                return Globals::gWinSound->isVBCableProperlySetup();
            }

            Fancy::fancy.logTime().failure() << "Windows Sound Backend not found" << std::endl;
            return false;
        }));
        webview->expose(Webview::Function("isVBCableInstalled", [] {
            if (Globals::gWinSound)
            {
                return Globals::gWinSound->isVBCableInstalled();
            }

            Fancy::fancy.logTime().failure() << "Windows Sound Backend not found" << std::endl;
            return false;
        }));
        webview->expose(Webview::Function("setupVBCable", [](const std::string &micOverride) -> std::string {
            if (Globals::gWinSound)
            {
                return Globals::gWinSound->setupVBCable(Globals::gWinSound->getRecordingDevice(micOverride));
            }

            Fancy::fancy.logTime().failure() << "Windows Sound Backend not found" << std::endl;
            return "backend_not_found";
        }));
        webview->expose(Webview::Function(
            "getRecordingDevices", []() -> std::pair<std::vector<RecordingDevice>, std::optional<RecordingDevice>> {
                if (Globals::gWinSound)
                {
                    auto devices = Globals::gWinSound->getRecordingDevices();
                    for (auto it = devices.begin(); it != devices.end();)
                    {
                        if (it->getName().find("VB-Audio") != std::string::npos)
                        {
                            it = devices.erase(it);
                        }
                        else
                        {
                            ++it;
                        }
                    }

                    return std::make_pair(devices, Globals::gWinSound->getMic());
                }

                Fancy::fancy.logTime().failure() << "Windows Sound Backend not found" << std::endl;
                return {};
            }));
#endif
#if defined(__linux__)
        webview->expose(Webview::Function("isElevated", []() -> bool { return false; }));
        webview->expose(Webview::Function("isVBCableInstalled", []() -> bool { return false; }));
        webview->expose(Webview::Function("openUrl", [](const std::string &url) {
            if (system(("xdg-open \"" + url + "\"").c_str()) != 0) // NOLINT
            {
                Fancy::fancy.logTime().warning() << "Failed to open url " << url << std::endl;
            }
        }));
        webview->expose(Webview::Function("openFolder", [](const std::uint32_t &id) {
            auto tab = Globals::gData.getTab(id);
            if (tab)
            {
                if (system(("xdg-open \"" + tab->path + "\"").c_str()) != 0) // NOLINT
                {
                    Fancy::fancy.logTime().warning() << "Failed to open folder " << tab->path << std::endl;
                }
            }
            else
            {
                Fancy::fancy.logTime().warning() << "Failed to find tab with id " << id << std::endl;
            }
        }));
        webview->expose(Webview::Function("getOutputs", [this]() { return getOutputs(); }));
        webview->expose(Webview::Function("getPlayback", [this]() { return getPlayback(); }));
        webview->expose(
            Webview::Function("startPassthrough", [this](const std::string &app) { return startPassthrough(app); }));
        webview->expose(
            Webview::Function("stopPassthrough", [this](const std::string &name) { stopPassthrough(name); }));
        webview->expose(Webview::Function("unloadSwitchOnConnect", []() {
            auto pulseBackend =
                std::dynamic_pointer_cast<Audiopad::Objects::PulseAudio>(Audiopad::Globals::gAudioBackend);
            if (pulseBackend)
            {
                pulseBackend->unloadSwitchOnConnect();
                pulseBackend->loadModules();
                Globals::gAudio.setup();
            }
            else
            {
                Fancy::fancy.logTime().failure()
                    << "unloadSwitchOnConnect was called but no pulse backend was detected!" << std::endl;
            }
        }));
#endif
    }
    bool WebView::onClose()
    {
        if (Globals::gSettings.minimizeToTray)
        {
            tray->getEntries().at(1)->setText(translations.show);
            webview->hide();
            return true;
        }
        return false;
    }
    void WebView::restartTabWatchers()
    {
        std::scoped_lock lock(watchersMutex);
        tabWatchers.clear();

        for (const auto &tab : Globals::gData.getTabs())
        {
            if (tab.path.empty())
            {
                continue;
            }

            tabWatchers.emplace_back(std::make_unique<Helper::FolderWatcher>(
                std::filesystem::path(tab.path), [this, path = tab.path] { onTabFolderChanged(path); }));
        }

        Fancy::fancy.logTime().message() << "Watching " << tabWatchers.size()
                                         << " categor" << (tabWatchers.size() == 1 ? "y" : "ies")
                                         << " for changes" << std::endl;
    }
    void WebView::onTabFolderChanged(const std::string &tabPath)
    {
        //* Resolve the tab by path at fire time — tab ids are indexes and shift as
        //* categories get added or removed.
        const auto tabs = Globals::gData.getTabs();
        const auto match =
            std::find_if(tabs.begin(), tabs.end(), [&tabPath](const Tab &tab) { return tab.path == tabPath; });
        if (match == tabs.end())
        {
            return;
        }

        auto refreshed = refreshTab(match->id);
        if (!refreshed)
        {
            return;
        }

        //* Persist the rescanned model so freshly assigned folder ids survive restarts.
        Globals::gConfig.save();

        webview->callFunction<void>(Webview::JavaScriptFunction("window.onTabAutoRefreshed", *refreshed));
    }
    void WebView::onFilesDroppedFromOs(const std::vector<std::string> &paths, int dropX, int dropY)
    {
        if (paths.empty())
        {
            return;
        }

        Fancy::fancy.logTime().message() << "Received " << paths.size()
                                         << " dropped item(s) from the file manager at (" << dropX << ", " << dropY
                                         << ")" << std::endl;

        //* callFunction dispatches onto the main loop, so forwarding from the drop
        //* handler (UI thread) is safe. The frontend decides where the drop lands:
        //* the category row under the cursor in the sidebar list, a subfolder tile,
        //* or the folder currently open on screen.
        webview->callFunction<void>(Webview::JavaScriptFunction("window.onFilesDropped", paths, dropX, dropY));
    }
    void WebView::onResize(std::size_t width, std::size_t height)
    {
        Globals::gData.width = static_cast<int>(width);
        Globals::gData.height = static_cast<int>(height);
    }
    void WebView::fetchTranslations()
    {
        webview->setNavigateCallback([this]([[maybe_unused]] const std::string &url) {
            static bool once = false;
            if (!once)
            {
#if defined(__linux__)
                if (auto pulseBackend = std::dynamic_pointer_cast<PulseAudio>(Globals::gAudioBackend); pulseBackend)
                {
                    //* We have to call this so that we can trigger an event in the frontend that switchOnConnect was
                    //* found becausepreviously the UI was not initialized.
                    pulseBackend->switchOnConnectPresent();
                }
#endif

                auto future = std::make_shared<std::future<void>>();
                *future = std::async(std::launch::async, [future, this] {
                    translations.settings = webview
                                                ->callFunction<std::string>(Webview::JavaScriptFunction(
                                                    "window.getTranslation", "settings.title"))
                                                .get();
                    translations.tabHotkeys = webview
                                                  ->callFunction<std::string>(Webview::JavaScriptFunction(
                                                      "window.getTranslation", "settings.tabHotkeysOnly"))
                                                  .get();
                    translations.muteDuringPlayback = webview
                                                          ->callFunction<std::string>(Webview::JavaScriptFunction(
                                                              "window.getTranslation", "settings.muteDuringPlayback"))
                                                          .get();
                    translations.show = webview
                                            ->callFunction<std::string>(
                                                Webview::JavaScriptFunction("window.getTranslation", "tray.show"))
                                            .get();
                    translations.hide = webview
                                            ->callFunction<std::string>(
                                                Webview::JavaScriptFunction("window.getTranslation", "tray.hide"))
                                            .get();
                    translations.exit = webview
                                            ->callFunction<std::string>(
                                                Webview::JavaScriptFunction("window.getTranslation", "tray.exit"))
                                            .get();

                    setupTray();
                });

                once = true;
            }
        });
    }
    void WebView::setupTray()
    {
        tray->addEntry(Tray::Button(translations.exit, [this]() {
            tray->exit();
            webview->exit();
        }));

        tray->addEntry(Tray::Button(webview->isHidden() ? translations.show : translations.hide, [this]() {
            if (!webview->isHidden())
            {
                webview->hide();
                tray->getEntries().at(1)->setText(translations.show);
            }
            else
            {
                webview->show();
                tray->getEntries().at(1)->setText(translations.hide);
            }
        }));

        auto settings = tray->addEntry(Tray::Submenu(translations.settings));
        settings->addEntries(Tray::SyncedToggle(translations.muteDuringPlayback, Globals::gSettings.muteDuringPlayback,
                                                [this]([[maybe_unused]] bool state) {
                                                    changeSettings(Globals::gSettings);
                                                    onSettingsChanged();
                                                }),
                             Tray::SyncedToggle(translations.tabHotkeys, Globals::gSettings.tabHotkeysOnly,
                                                [this]([[maybe_unused]] bool state) {
                                                    changeSettings(Globals::gSettings);
                                                    onSettingsChanged();
                                                }));
    }
    void WebView::mainLoop()
    {
        webview->run();
        if (tray)
        {
            tray->exit();
        }
        Fancy::fancy.logTime().message() << "UI exited" << std::endl;
    }
    void WebView::onHotKeyReceived(const std::vector<int> &keys)
    {
        std::string hotkeySequence;
        for (const auto &key : keys)
        {
            hotkeySequence += Globals::gHotKeys.getKeyName(key) + " + ";
        }
        webview->callFunction<void>(Webview::JavaScriptFunction(
            "window.hotkeyReceived", hotkeySequence.substr(0, hotkeySequence.length() - 3), keys));
    }
    void WebView::onSoundFinished(const PlayingSound &sound)
    {
        Window::onSoundFinished(sound);
        if (sound.playbackDevice.isDefault)
        {
            webview->callFunction<void>(Webview::JavaScriptFunction("window.finishSound", sound));
        }
    }
    void WebView::onSoundPlayed(const PlayingSound &sound)
    {
        webview->callFunction<void>(Webview::JavaScriptFunction("window.onSoundPlayed", sound));
    }
    void WebView::onSoundProgressed(const PlayingSound &sound)
    {
        webview->callFunction<void>(Webview::JavaScriptFunction("window.updateSound", sound));
    }
    void WebView::onError(const Enums::ErrorCode &error)
    {
        webview->callFunction<void>(Webview::JavaScriptFunction("window.onError", static_cast<std::uint8_t>(error)));
    }
    Settings WebView::changeSettings(Settings newSettings)
    {
        auto rtn = Window::changeSettings(newSettings);
        if (tray)
        {
            try
            {
                tray->update();
            }
            catch (const std::exception &e)
            {
                Fancy::fancy.logTime().warning() << "Failed to update tray: " << e.what() << std::endl;
            }
            catch (...)
            {
                Fancy::fancy.logTime().warning() << "Failed to update tray" << std::endl;
            }
        }

        return rtn;
    }
    void WebView::onSettingsChanged()
    {
        webview->callFunction<void>(
            Webview::JavaScriptFunction("window.getStore().commit", "setSettings", Globals::gSettings));
    }
    void WebView::onAllSoundsFinished()
    {
        Window::onAllSoundsFinished();
        webview->callFunction<void>(Webview::JavaScriptFunction("window.getStore().commit", "clearCurrentlyPlaying"));
        webview->callFunction<void>(Webview::JavaScriptFunction("window.onAllSoundsFinished"));
    }
    void WebView::onSwitchOnConnectDetected(bool state)
    {
        webview->callFunction<void>(
            Webview::JavaScriptFunction("window.getStore().commit", "setSwitchOnConnectLoaded", state));
    }
    void WebView::onAdminRequired()
    {
        webview->callFunction<void>(
            Webview::JavaScriptFunction("window.getStore().commit", "setAdministrativeModal", true));
    }
} // namespace Audiopad::Objects