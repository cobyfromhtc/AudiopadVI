#pragma once
#include <filesystem>
#include <string>

namespace Audiopad
{
    namespace Helpers
    {
        //* Absolute path of the configuration file. Respects the
        //* AUDIOPAD_CONFIG_PATH override (tests, portable installs); otherwise
        //* resolves to <config area>/Audiopad/config.json per platform.
        std::filesystem::path configFilePath();

        //* Constructs a properly encoded `file://` URI from a native filesystem path.
        //*
        //* Percent-encodes all reserved characters (RFC 3986) and non-ASCII bytes
        //* (UTF-8) so paths with spaces, `#`, `?`, `%` or unicode survive both
        //* WebView2 (Windows) and WebKitGTK (Linux) URL parsing:
        //*   toFileUri("C:/Program Files/A/d index.html") -> "file:///C:/Program%20Files/A/d%20index.html"
        //*   toFileUri("/home/u/my sounds/i.html")        -> "file:///home/u/my%20sounds/i.html"
        std::string toFileUri(const std::filesystem::path &path);

        //* Writes `contents` to `path` atomically: the data is written to a
        //* temporary file next to the target which is then renamed over it, so
        //* readers only ever observe the old or the new configuration — never a
        //* half-written file. Returns false (and cleans the temporary up) on error.
        bool atomicWriteFile(const std::filesystem::path &path, const std::string &contents);
    } // namespace Helpers
} // namespace Audiopad
