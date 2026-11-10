#pragma once
#include <tray.hpp>
#include <ui/ui.hpp>
#include <webview.hpp>
#include <helper/fswatch/fswatch.hpp>
#include <memory>
#include <mutex>
#include <string>
#include <vector>

namespace Audiopad
{
    namespace Objects
    {
        class WebView : public Window
        {
          private:
            std::shared_ptr<Tray::Tray> tray;
            std::shared_ptr<Webview::Window> webview;

            //* Floating now-playing overlay: a second, frameless, always-on-top
            //* webview window fed by the local control server. Created lazily
            //* while the setting is on, destroyed when it turns off.
            std::shared_ptr<Webview::Window> overlayWindow;

            //* One filesystem watcher per category folder: detects sounds added from
            //* outside the app (e.g. the file explorer) in real time, rescans the tab
            //* and pushes the refreshed tab to the frontend. Declared after `webview`
            //* so the watchers are stopped (and joined) before the webview dies.
            std::mutex watchersMutex;
            std::vector<std::unique_ptr<Helper::FolderWatcher>> tabWatchers;

            bool onClose();
            void exposeFunctions();
            void onResize(std::size_t, std::size_t);

            //* Rebuilds the watcher set from the current tab list. Called on startup and
            //* whenever categories are added or removed.
            void restartTabWatchers();

            //* Watcher callback: rescans the tab that lives at `tabPath` and notifies
            //* the frontend. Runs on the watcher thread.
            void onTabFolderChanged(const std::string &tabPath);

            //* Native drag & drop entry point: forwards the real file system paths of
            //* files/folders dragged in from the OS file manager, plus the cursor
            //* position of the drop (host-window client coordinates, physical
            //* pixels; -1/-1 when unknown), to the frontend. The frontend resolves
            //* the exact drop target — the category row in the sidebar list, a
            //* subfolder tile, or the folder currently open — and initiates the
            //* import. Runs on the UI thread (drop handler).
            void onFilesDroppedFromOs(const std::vector<std::string> &paths, int dropX, int dropY);

            void setupTray();
            void fetchTranslations();

            //* --- Now-playing overlay management ---
            void createOverlay();
            void destroyOverlay();
            void applyOverlayPosition();
            //* Brings the overlay window in line with the current setting.
            void syncOverlay();

            //* --- Local remote-control / automation server lifecycle ---
            void ensureControlServer();

          private:
            void onAllSoundsFinished() override;
            Settings changeSettings(Settings newSettings) override;

          public:
            ~WebView() override;
            void show() override;
            void setup() override;
            void mainLoop() override;
            void onSoundFinished(const PlayingSound &sound) override;
            void onHotKeyReceived(const std::vector<int> &keys) override;

            bool toggleOverlay() override;
            void setOverlayPosition(int position) override;
            void cycleOverlayPosition() override;

            void onAdminRequired() override;
            void onSettingsChanged() override;
            void onSwitchOnConnectDetected(bool state) override;
            void onError(const Enums::ErrorCode &error) override;
            void onSoundPlayed(const PlayingSound &sound) override;
            void onSoundProgressed(const PlayingSound &sound) override;
            void onMicMuteChanged(bool muted) override;
            void onVoicePresetChanged(Enums::VoicePreset preset) override;
            void onHearMyselfChanged(bool enabled) override;
            void onBoardLoopChanged(Enums::BoardLoopMode mode, std::uint32_t tabId) override;
        };
    } // namespace Objects
} // namespace Audiopad
