#pragma once
#if defined(__linux__)
#include <core/basewindow.hpp>
#include <gtk/gtk.h>
#include <webkit2/webkit2.h>

#include <functional>
#include <string>
#include <vector>

namespace Webview
{
    class Window : public BaseWindow
    {
        GtkWidget *window;
        GtkWidget *webview;

        //* Receives the real file system paths (UTF-8) of every file and folder
        //* dragged in from the OS file manager, plus the cursor position of the
        //* drop in widget coordinates. The point lets the frontend resolve the
        //* exact drop target — e.g. the category row in the sidebar list the
        //* user dropped onto. Invoked from the drag-data-received handler on
        //* the GTK main loop thread.
        std::function<void(std::vector<std::string>, int, int)> fileDropCallback;

        static void destroy(GtkWidget *, gpointer);
        static gboolean closed(GtkWidget *, GdkEvent *, gpointer);
        static gboolean resize(WebKitWebView *, GdkEvent *, gpointer);

#if defined(WEBVIEW_EMBEDDED)
        static void onUriRequested(WebKitURISchemeRequest *, gpointer);
#endif

        static void loadChanged(WebKitWebView *, WebKitLoadEvent, gpointer);
        static void messageReceived(WebKitUserContentManager *, WebKitJavascriptResult *, gpointer);
        static gboolean contextMenu(WebKitWebView *, GtkWidget *, WebKitHitTestResultContext *, gboolean, gpointer);
        static void dragDataReceived(GtkWidget *, GdkDragContext *, gint, gint, GtkSelectionData *, guint, guint, gpointer);

      private:
        void runOnIdle(std::function<void()>);

      public:
        Window(std::size_t width, std::size_t height);
        Window(const std::string &identifier, std::size_t width,
               std::size_t height); //* Identifier is not required on linux.

        void hide() override;
        void show() override;

        void run() override;
        void exit() override;

        std::string getUrl() override;
        void setUrl(std::string newUrl) override;
        void setTitle(std::string newTitle) override;
        void setSize(std::size_t newWidth, std::size_t newHeight) override;

        void enableDevTools(bool state) override;
        void runCode(const std::string &code) override;
        void injectCode(const std::string &code) override;

        //* Registers the handler for files/folders dragged in from the OS file
        //* manager. The handler receives the real file system paths (UTF-8) and
        //* the drop position in widget coordinates; the position is (-1, -1)
        //* when it could not be determined.
        void setFileDropCallback(std::function<void(std::vector<std::string>, int, int)> callback);
    };
} // namespace Webview
#endif