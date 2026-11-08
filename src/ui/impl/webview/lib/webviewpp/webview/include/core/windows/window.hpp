#pragma once
#if defined(_WIN32)
#include <Windows.h>
#include <core/basewindow.hpp>
#include <wil/com.h>
#include <wrl.h>

#include <WebView2.h>
//* WebView2Experimental.h is no longer shipped with the WebView2 SDK
//* (>= 1.0.1264.42); AreBrowserAcceleratorKeysEnabled now lives in the
//* stable ICoreWebView2Settings3 from WebView2.h.

#include <functional>
#include <string>
#include <vector>

namespace Webview
{
    class Window : public BaseWindow
    {
        static constexpr auto WM_CALL = WM_USER + 2;
        HINSTANCE instance = nullptr;
        HWND hwnd = nullptr;

        std::vector<std::function<void()>> runOnControllerCreated;
        wil::com_ptr<ICoreWebView2Controller> webViewController;
        wil::com_ptr<ICoreWebView2> webViewWindow;

        //* Receives the real file system paths (UTF-8) of every file and folder
        //* dragged in from the OS file manager, plus the cursor position of the
        //* drop in host-window CLIENT coordinates (physical pixels). The point
        //* lets the frontend resolve the exact drop target — e.g. the category
        //* row in the sidebar list the user dropped onto. Invoked on the UI
        //* thread from the WM_DROPFILES handler.
        std::function<void(std::vector<std::string>, int, int)> fileDropCallback;

        static LRESULT CALLBACK WndProc(HWND, UINT, WPARAM, LPARAM);

#if defined(WEBVIEW_EMBEDDED)
        HRESULT onWebResourceRequested(ICoreWebView2 *, ICoreWebView2WebResourceRequestedEventArgs *);
#endif

        HRESULT onNavigationCompleted(ICoreWebView2 *, ICoreWebView2NavigationCompletedEventArgs *);
        HRESULT onMessageReceived(ICoreWebView2 *, ICoreWebView2WebMessageReceivedEventArgs *);
        HRESULT onControllerCreated(ICoreWebView2Controller *);
        HRESULT createEnvironment(const std::string &);

      private:
        std::wstring widen(const std::string &);
        std::string narrow(const std::wstring &);
        void dispatchMessage(std::function<void()>);
        void onResize(std::size_t width, std::size_t height) override;

      public:
        Window(std::string identifier, std::size_t width, std::size_t height);
        void disableAcceleratorKeys(bool);

        //* --- Custom chrome (frameless window) ---
        //* Removes the native caption bar so the web UI can render its own topbar.
        //* The resize frame (WS_THICKFRAME) is deliberately kept: the OS continues
        //* to handle edge resizing, Aero Snap and the drop shadow.
        void enableFramelessWindow();

        //* Minimizes the window (with the usual taskbar animation).
        void minimize();
        //* Toggles between maximized and restored.
        void toggleMaximize();
        //* Requests a close through the regular WM_CLOSE path so close callbacks
        //* (e.g. minimize-to-tray) keep working.
        void requestClose();
        //* Whether the window is currently maximized.
        bool isMaximized() const;
        //* Starts the native system move loop from a pointer press inside the web
        //* UI (drag-by-topbar). Enables Aero Snap while dragging.
        void startDrag();

        //* Registers the handler for files/folders dragged in from the OS file
        //* manager. The handler receives the real file system paths (UTF-8) and
        //* the drop position in client coordinates (physical pixels); the
        //* position is (-1, -1) when it could not be determined.
        void setFileDropCallback(std::function<void(std::vector<std::string>, int, int)> callback);

        void hide() override;
        void show() override;

        void run() override;
        void exit() override;

        std::string getUrl() override;
        void setUrl(std::string newUrl) override;
        void setTitle(std::string newTitle) override;
        void setSize(std::size_t newWidth, std::size_t newHeight) override;

        void enableDevTools(bool state) override;
        void enableContextMenu(bool state) override;
        void runCode(const std::string &code) override;
        void injectCode(const std::string &code) override;
    };
} // namespace Webview
#endif