#include "paths.hpp"
#include <cstdio>
#include <cstdlib>
#include <fstream>
#include <system_error>

#if defined(_WIN32)
#include <Windows.h>
#endif

namespace
{
    constexpr char kHexDigits[] = "0123456789ABCDEF";

    bool isUnreservedUriByte(unsigned char byte)
    {
        return (byte >= 'a' && byte <= 'z') || (byte >= 'A' && byte <= 'Z') || (byte >= '0' && byte <= '9') ||
               byte == '-' || byte == '_' || byte == '.' || byte == '~';
    }

    void appendPercentEncodedPath(std::string &target, const std::string &bytes)
    {
        target.reserve(target.size() + bytes.size());
        for (unsigned char byte : bytes)
        {
            //* '/' is a reserved delimiter, not data: keeping it literal is what
            //* makes the result a usable file URI ("%2F" paths are rejected or
            //* misparsed by WebView2 and WebKitGTK alike).
            if (isUnreservedUriByte(byte) || byte == '/')
            {
                target.push_back(static_cast<char>(byte));
            }
            else
            {
                target.push_back('%');
                target.push_back(kHexDigits[byte >> 4]);
                target.push_back(kHexDigits[byte & 0x0F]);
            }
        }
    }

#if defined(_WIN32)
    std::string utf8FromWide(const std::wstring &text)
    {
        if (text.empty())
        {
            return {};
        }
        const int size = WideCharToMultiByte(CP_UTF8, 0, text.c_str(), static_cast<int>(text.size()), nullptr, 0,
                                             nullptr, nullptr);
        if (size <= 0)
        {
            return {};
        }
        std::string out(static_cast<std::size_t>(size), '\0');
        WideCharToMultiByte(CP_UTF8, 0, text.c_str(), static_cast<int>(text.size()), out.data(), size, nullptr, nullptr);
        return out;
    }
#endif
} // namespace

namespace Audiopad
{
    namespace Helpers
    {
        std::filesystem::path configFilePath()
        {
            if (const char *override = std::getenv("AUDIOPAD_CONFIG_PATH")) // NOLINT(concurrency-mt-unsafe)
            {
                if (*override != '\0')
                {
                    return std::filesystem::path(override);
                }
            }

#if defined(__linux__)
            if (const char *configHome = std::getenv("XDG_CONFIG_HOME")) // NOLINT(concurrency-mt-unsafe)
            {
                if (*configHome != '\0')
                {
                    return std::filesystem::path(configHome) / "Audiopad" / "config.json";
                }
            }
            const char *home = std::getenv("HOME"); // NOLINT(concurrency-mt-unsafe)
            return std::filesystem::path(home != nullptr ? home : ".") / ".config" / "Audiopad" / "config.json";
#elif defined(_WIN32)
            char *buffer = nullptr;
            std::size_t size = 0;
            _dupenv_s(&buffer, &size, "APPDATA");
            std::filesystem::path rtn = std::filesystem::path(buffer != nullptr ? buffer : ".") / "Audiopad" /
                                        "config.json";
            free(buffer);
            return rtn;
#else
            return std::filesystem::path("Audiopad") / "config.json";
#endif
        }

        std::string toFileUri(const std::filesystem::path &path)
        {
#if defined(_WIN32)
            //* Wide → UTF-8 first: path.string() would go through the ANSI code
            //* page and mangle every non-ASCII name.
            const std::string utf8 = utf8FromWide(path.wstring());
#else
            //* C++17: u8string() is std::string already. A C++20 build would get
            //* char8_t instead — convert through a plain string there.
#if __cplusplus > 201703L
            const std::u8string &raw = path.u8string();
            const std::string utf8(raw.begin(), raw.end());
#else
            const std::string utf8 = path.u8string();
#endif
#endif

            if (utf8.empty())
            {
                return "file:///";
            }

            std::string uri = "file://";
            std::string body;

#if defined(_WIN32)
            //* "C:\dir\index.html" -> "/C:/dir/index.html" (forward slashes, leading
            //* slash so the URI has an empty authority plus an absolute path).
            body.reserve(utf8.size() + 1);
            body.push_back('/');
            for (char c : utf8)
            {
                body.push_back(c == '\\' ? '/' : c);
            }
#else
            body = utf8;
            if (body.front() != '/')
            {
                body.insert(body.begin(), '/');
            }
#endif

            appendPercentEncodedPath(uri, body);
            return uri;
        }

        bool atomicWriteFile(const std::filesystem::path &path, const std::string &contents)
        {
            std::error_code ec;
            const auto parent = path.parent_path();
            if (!parent.empty() && !std::filesystem::exists(parent, ec))
            {
                std::filesystem::create_directories(parent, ec);
                if (ec)
                {
                    return false;
                }
            }

            std::filesystem::path temporary = parent / (path.filename().string() + ".tmp-" +
                                                         std::to_string(reinterpret_cast<std::uintptr_t>(&path)));
            {
                std::ofstream stream(temporary, std::ios::binary | std::ios::trunc);
                if (!stream.is_open())
                {
                    return false;
                }
                stream.write(contents.data(), static_cast<std::streamsize>(contents.size()));
                stream.flush();
                if (!stream.good())
                {
                    stream.close();
                    std::filesystem::remove(temporary, ec);
                    return false;
                }
            }

            //* rename() replaces an existing target atomically on POSIX, and maps to
            //* MoveFileEx(MOVEFILE_REPLACE_EXISTING) with MSVC's STL.
            std::filesystem::rename(temporary, path, ec);
            if (ec)
            {
#if defined(_WIN32)
                //* Some filesystem/filter drivers refuse in-place replacement — fall
                //* back to remove+rename so the write still lands (still crash-consistent:
                //* a crash at worst leaves no config, never a partial one).
                std::filesystem::remove(path, ec);
                std::filesystem::rename(temporary, path, ec);
                if (ec)
#endif
                {
                    std::filesystem::remove(temporary, ec);
                    return false;
                }
            }
            return true;
        }
    } // namespace Helpers
} // namespace Audiopad
