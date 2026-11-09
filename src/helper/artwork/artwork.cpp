#include "artwork.hpp"
#include <algorithm>
#include <cctype>
#include <fstream>
#include <map>
#include <mutex>
#include <sstream>
#include <system_error>
#include <vector>

#include <helper/base64/base64.hpp>
#include <helper/paths/paths.hpp>

#if defined(_WIN32)
#include <Windows.h>
#include <wincodec.h>
#elif defined(__linux__) && defined(AUDIOPAD_HAVE_GDK_PIXBUF)
#include <gdk-pixbuf/gdk-pixbuf.h>
#define AUDIOPAD_ARTWORK_PIXBUF 1
#endif

namespace
{
    std::string toLowerAscii(std::string text)
    {
        std::transform(text.begin(), text.end(), text.begin(),
                       [](unsigned char c) { return static_cast<char>(std::tolower(c)); });
        return text;
    }

    std::string extensionOf(const std::string &path)
    {
        const auto dot = path.find_last_of('.');
        if (dot == std::string::npos)
        {
            return "";
        }
        auto ext = toLowerAscii(path.substr(dot));
        if (ext.size() > 1 && ext.find_first_of("/\\:") == std::string::npos)
        {
            return ext;
        }
        return "";
    }

    std::string mimeForExtension(const std::string &extension)
    {
        static const std::map<std::string, std::string> kMimes = {
            {".png", "image/png"},    {".jpg", "image/jpeg"},  {".jpeg", "image/jpeg"},
            {".webp", "image/webp"},  {".gif", "image/gif"},   {".bmp", "image/bmp"},
            {".svg", "image/svg+xml"},
        };
        const auto it = kMimes.find(extension);
        return it != kMimes.end() ? it->second : "application/octet-stream";
    }

    std::string extensionForMime(const std::string &mime)
    {
        static const std::map<std::string, std::string> kExtensions = {
            {"image/png", ".png"},  {"image/jpeg", ".jpg"}, {"image/webp", ".webp"},
            {"image/gif", ".gif"}, {"image/bmp", ".bmp"},  {"image/svg+xml", ".svg"},
        };
        const auto it = kExtensions.find(mime);
        return it != kExtensions.end() ? it->second : ".bin";
    }

    std::string makeDataUrl(const std::string &mime, const std::string &bytes)
    {
        return "data:" + mime + ";base64," +
               base64_encode(reinterpret_cast<const unsigned char *>(bytes.data()), bytes.size(), false);
    }

    struct ParsedDataUrl
    {
        std::string mime;
        std::string bytes;
    };

    std::optional<ParsedDataUrl> parseDataUrl(const std::string &dataUrl)
    {
        const std::string prefix = "data:";
        if (dataUrl.size() <= prefix.size() || dataUrl.compare(0, prefix.size(), prefix) != 0)
        {
            return std::nullopt;
        }
        const auto comma = dataUrl.find(',');
        if (comma == std::string::npos)
        {
            return std::nullopt;
        }
        std::string meta = dataUrl.substr(prefix.size(), comma - prefix.size());
        if (meta.empty())
        {
            return std::nullopt;
        }
        std::string mime = "image/png";
        if (meta.rfind(";base64", 0) != 0)
        {
            const auto semicolon = meta.find(';');
            if (semicolon != std::string::npos)
            {
                mime = meta.substr(0, semicolon);
            }
        }
        std::string payload = dataUrl.substr(comma + 1);
        if (payload.empty())
        {
            return std::nullopt;
        }
        return ParsedDataUrl{mime, base64_decode(payload, true)};
    }

    //* Scales `width`/`height` down so the longer edge fits `maxDimension`,
    //* preserving the aspect ratio. Never upscales.
    void fitDown(std::int32_t &width, std::int32_t &height, std::int32_t maxDimension)
    {
        if (width <= maxDimension || height <= maxDimension)
        {
            return;
        }
        const double scale =
            static_cast<double>(maxDimension) / static_cast<double>(width > height ? width : height);
        width = std::max<std::int32_t>(1, static_cast<std::int32_t>(width * scale + 0.5));
        height = std::max<std::int32_t>(1, static_cast<std::int32_t>(height * scale + 0.5));
    }

    std::optional<std::string> readAllBytes(const std::string &path, std::size_t limit)
    {
        std::ifstream file(path, std::ios::binary | std::ios::ate);
        if (!file.is_open())
        {
            return std::nullopt;
        }
        const std::streampos size = file.tellg();
        if (size < 0 || static_cast<std::uint64_t>(size) > limit)
        {
            return std::nullopt;
        }
        file.seekg(0, std::ios::beg);

        std::string bytes(static_cast<std::size_t>(size), '\0');
        if (!bytes.empty())
        {
            file.read(bytes.data(), static_cast<std::streamsize>(bytes.size()));
            if (!file.good())
            {
                return std::nullopt;
            }
        }
        return bytes;
    }

    //* --- platform decoders: image bytes -> bounded PNG bytes ---

#if defined(_WIN32)
    template <typename T> struct ComRelease
    {
        void operator()(T *pointer) const
        {
            if (pointer != nullptr)
            {
                pointer->Release();
            }
        }
    };
    template <typename T> using com_ptr = std::unique_ptr<T, ComRelease<T>>;

    std::optional<std::string> decodeAndDownscaleToPng(const std::string &bytes)
    {
        //* WIC needs COM on this thread; tolerate any apartment mode already set.
        const HRESULT coResult = CoInitializeEx(nullptr, COINIT_APARTMENTTHREADED);
        const bool mustUninitialize = SUCCEEDED(coResult);
        if (!mustUninitialize && coResult != RPC_E_CHANGED_MODE)
        {
            return std::nullopt;
        }

        com_ptr<IWICImagingFactory> factory;
        {
            IWICImagingFactory *raw = nullptr;
            if (FAILED(CoCreateInstance(CLSID_WICImagingFactory, nullptr, CLSCTX_INPROC_SERVER, IID_PPV_ARGS(&raw))))
            {
                if (mustUninitialize)
                {
                    CoUninitialize();
                }
                return std::nullopt;
            }
            factory.reset(raw);
        }

        com_ptr<IWICStream> stream;
        {
            IWICStream *raw = nullptr;
            if (FAILED(factory->CreateStream(&raw)))
            {
                if (mustUninitialize)
                {
                    CoUninitialize();
                }
                return std::nullopt;
            }
            stream.reset(raw);
        }
        if (FAILED(stream->InitializeFromMemory(reinterpret_cast<BYTE *>(const_cast<char *>(bytes.data())),
                                                static_cast<DWORD>(bytes.size()))))
        {
            if (mustUninitialize)
            {
                CoUninitialize();
            }
            return std::nullopt;
        }

        com_ptr<IWICBitmapDecoder> decoder;
        {
            IWICBitmapDecoder *raw = nullptr;
            if (FAILED(factory->CreateDecoderFromStream(stream.get(), nullptr, WICDecodeMetadataCacheOnDemand, &raw)))
            {
                if (mustUninitialize)
                {
                    CoUninitialize();
                }
                return std::nullopt;
            }
            decoder.reset(raw);
        }

        com_ptr<IWICBitmapFrameDecode> frame;
        {
            IWICBitmapFrameDecode *raw = nullptr;
            if (FAILED(decoder->GetFrame(0, &raw)))
            {
                if (mustUninitialize)
                {
                    CoUninitialize();
                }
                return std::nullopt;
            }
            frame.reset(raw);
        }

        UINT width = 0;
        UINT height = 0;
        if (FAILED(frame->GetSize(&width, &height)) || width == 0 || height == 0)
        {
            if (mustUninitialize)
            {
                CoUninitialize();
            }
            return std::nullopt;
        }

        std::int32_t targetWidth = static_cast<std::int32_t>(width);
        std::int32_t targetHeight = static_cast<std::int32_t>(height);
        fitDown(targetWidth, targetHeight, static_cast<std::int32_t>(Audiopad::Helpers::Artwork::kMaxDimension));

        com_ptr<IWICBitmapScaler> scaler;
        {
            IWICBitmapScaler *raw = nullptr;
            if (FAILED(factory->CreateBitmapScaler(&raw)))
            {
                if (mustUninitialize)
                {
                    CoUninitialize();
                }
                return std::nullopt;
            }
            scaler.reset(raw);
        }
        if (FAILED(scaler->Initialize(frame.get(), static_cast<UINT>(targetWidth), static_cast<UINT>(targetHeight),
                                      WICBitmapInterpolationModeHighQualityCubic)))
        {
            if (mustUninitialize)
            {
                CoUninitialize();
            }
            return std::nullopt;
        }

        com_ptr<IWICBitmapEncoder> encoder;
        {
            IWICBitmapEncoder *raw = nullptr;
            if (FAILED(factory->CreateEncoder(GUID_ContainerFormatPng, nullptr, &raw)))
            {
                if (mustUninitialize)
                {
                    CoUninitialize();
                }
                return std::nullopt;
            }
            encoder.reset(raw);
        }

        com_ptr<IStream> memoryStream;
        {
            IStream *raw = nullptr;
            if (FAILED(CreateStreamOnHGlobal(nullptr, TRUE, &raw)))
            {
                if (mustUninitialize)
                {
                    CoUninitialize();
                }
                return std::nullopt;
            }
            memoryStream.reset(raw);
        }
        if (FAILED(encoder->Initialize(memoryStream.get(), WICBitmapEncoderNoCache)))
        {
            if (mustUninitialize)
            {
                CoUninitialize();
            }
            return std::nullopt;
        }

        com_ptr<IWICBitmapFrameEncode> frameEncode;
        {
            IWICBitmapFrameEncode *raw = nullptr;
            IPropertyBag2 *properties = nullptr;
            if (FAILED(encoder->CreateNewFrame(&raw, &properties)))
            {
                if (mustUninitialize)
                {
                    CoUninitialize();
                }
                return std::nullopt;
            }
            frameEncode.reset(raw);
            if (properties != nullptr)
            {
                properties->Release();
            }
        }

        WICPixelFormatGUID format = GUID_WICPixelFormat32bppBGRA;
        if (FAILED(frameEncode->Initialize(nullptr)) || FAILED(frameEncode->SetSize(static_cast<UINT>(targetWidth),
                                                                                    static_cast<UINT>(targetHeight))) ||
            FAILED(frameEncode->SetPixelFormat(&format)) ||
            FAILED(frameEncode->WriteSource(scaler.get(), nullptr)) || FAILED(frameEncode->Commit()) ||
            FAILED(encoder->Commit()))
        {
            if (mustUninitialize)
            {
                CoUninitialize();
            }
            return std::nullopt;
        }

        HGLOBAL memory = nullptr;
        std::string pngBytes;
        if (SUCCEEDED(GetHGlobalFromStream(memoryStream.get(), &memory)) && memory != nullptr)
        {
            const SIZE_T size = GlobalSize(memory);
            const auto *data = static_cast<const char *>(GlobalLock(memory));
            if (data != nullptr && size > 0)
            {
                pngBytes.assign(data, size);
            }
            GlobalUnlock(memory);
        }

        if (mustUninitialize)
        {
            CoUninitialize();
        }
        return pngBytes.empty() ? std::nullopt : std::optional<std::string>(std::move(pngBytes));
    }
#elif defined(AUDIOPAD_ARTWORK_PIXBUF)
    std::optional<std::string> decodeAndDownscaleToPng(const std::string &bytes)
    {
        GError *error = nullptr;
        GdkPixbufLoader *loader = gdk_pixbuf_loader_new();
        if (!gdk_pixbuf_loader_write(loader, reinterpret_cast<const guchar *>(bytes.data()),
                                     static_cast<gsize>(bytes.size()), &error))
        {
            if (error != nullptr)
            {
                g_error_free(error);
            }
            g_object_unref(loader);
            return std::nullopt;
        }
        gdk_pixbuf_loader_close(loader, &error);
        if (error != nullptr)
        {
            g_error_free(error);
        }

        GdkPixbuf *pixbuf = gdk_pixbuf_loader_get_pixbuf(loader);
        if (pixbuf == nullptr)
        {
            g_object_unref(loader);
            return std::nullopt;
        }

        std::int32_t width = gdk_pixbuf_get_width(pixbuf);
        std::int32_t height = gdk_pixbuf_get_height(pixbuf);
        fitDown(width, height, static_cast<std::int32_t>(Audiopad::Helpers::Artwork::kMaxDimension));

        GdkPixbuf *scaled = nullptr;
        if (width != gdk_pixbuf_get_width(pixbuf) || height != gdk_pixbuf_get_height(pixbuf))
        {
            scaled = gdk_pixbuf_scale_simple(pixbuf, width, height, GDK_INTERP_BILINEAR);
        }

        gchar *buffer = nullptr;
        gsize size = 0;
        const gboolean saved =
            gdk_pixbuf_save_to_buffer(scaled != nullptr ? scaled : pixbuf, &buffer, &size, "png", &error, nullptr);
        GdkPixbuf *finalPixbuf = scaled != nullptr ? scaled : pixbuf;
        if (finalPixbuf != pixbuf && finalPixbuf != nullptr)
        {
            g_object_unref(finalPixbuf);
        }

        std::string pngBytes;
        if (saved && buffer != nullptr)
        {
            pngBytes.assign(buffer, size);
        }
        if (error != nullptr)
        {
            g_error_free(error);
        }
        g_free(buffer);
        g_object_unref(loader);

        return pngBytes.empty() ? std::nullopt : std::optional<std::string>(std::move(pngBytes));
    }
#else
    std::optional<std::string> decodeAndDownscaleToPng(const std::string &)
    {
        return std::nullopt; //* no platform decoder — bounded pass-through below
    }
#endif

    std::mutex gStoreMutex; //* artwork file writes serialize across threads
} // namespace

namespace Audiopad
{
    namespace Helpers
    {
        namespace Artwork
        {
            std::string hashBytes(const std::string &bytes)
            {
                //* 64-bit FNV-1a + length — stable, dependency-free content address.
                std::uint64_t hash = 1469598103934665603ull;
                for (unsigned char byte : bytes)
                {
                    hash ^= byte;
                    hash *= 1099511628211ull;
                }
                hash ^= static_cast<std::uint64_t>(bytes.size());
                hash *= 1099511628211ull;

                static const char digits[] = "0123456789abcdef";
                std::string hex(16, '0');
                for (int i = 15; i >= 0; --i)
                {
                    hex[static_cast<std::size_t>(i)] = digits[hash & 0xF];
                    hash >>= 4;
                }
                return hex;
            }

            std::filesystem::path directory()
            {
                return configFilePath().parent_path() / "artwork";
            }

            bool isManagedRef(const std::string &image)
            {
                return image.rfind(kManagedPrefix, 0) == 0;
            }

            std::string managedNameFromRef(const std::string &ref)
            {
                return ref.substr(std::char_traits<char>::length(kManagedPrefix));
            }

            std::optional<std::string> storeBytes(const std::string &bytes, const std::string &extension)
            {
                if (bytes.empty())
                {
                    return std::nullopt;
                }

                const std::string name = hashBytes(bytes) + extension;
                const auto target = directory() / name;
                if (std::filesystem::exists(target))
                {
                    return name; //* content-addressed — already stored
                }

                std::lock_guard<std::mutex> lock(gStoreMutex);
                if (std::filesystem::exists(target))
                {
                    return name; //* raced another thread storing the same hash
                }

                std::error_code ec;
                std::filesystem::create_directories(directory(), ec);
                if (ec && !std::filesystem::is_directory(directory()))
                {
                    return std::nullopt;
                }

                if (!atomicWriteFile(target, bytes))
                {
                    return std::nullopt;
                }
                return name;
            }

            std::optional<std::string> managedRefForDataUrl(const std::string &dataUrl)
            {
                auto parsed = parseDataUrl(dataUrl);
                if (!parsed)
                {
                    return std::nullopt;
                }

                auto name = storeBytes(parsed->bytes, extensionForMime(parsed->mime));
                if (!name)
                {
                    return std::nullopt;
                }
                return std::string(kManagedPrefix) + *name;
            }

            std::optional<std::string> dataUrlFromManagedRef(const std::string &ref)
            {
                const std::string name = managedNameFromRef(ref);
                if (name.empty() || name.find("..") != std::string::npos || name.find('/') != std::string::npos ||
                    name.find('\\') != std::string::npos)
                {
                    return std::nullopt; //* only plain file names from the store
                }

                auto bytes = readAllBytes((directory() / name).string(), kMaxInputFileBytes);
                if (!bytes)
                {
                    return std::nullopt;
                }

                const auto dot = name.find_last_of('.');
                const std::string extension = dot == std::string::npos ? "" : toLowerAscii(name.substr(dot));
                return makeDataUrl(mimeForExtension(extension), *bytes);
            }

            namespace
            {
                std::optional<Import> importBytes(const std::string &mime, const std::string &bytes)
                {
                    if (bytes.empty())
                    {
                        return std::nullopt;
                    }

                    if (auto png = decodeAndDownscaleToPng(bytes))
                    {
                        auto name = storeBytes(*png, ".png");
                        return Import{makeDataUrl("image/png", *png), std::move(*png), name.value_or("")};
                    }

                    //* No decoder or undecodable format — pass through unchanged,
                    //* but only within the strict passthrough bound so a single
                    //* artwork can never blow up the serialized model.
                    if (bytes.size() > kMaxPassthroughBytes)
                    {
                        return std::nullopt;
                    }

                    auto name = storeBytes(bytes, extensionForMime(mime));
                    return Import{makeDataUrl(mime, bytes), bytes, name.value_or("")};
                }
            } // namespace

            std::optional<Import> importImage(const std::string &path)
            {
                if (path.empty())
                {
                    return std::nullopt;
                }

                std::error_code ec;
                if (!std::filesystem::is_regular_file(std::filesystem::path(path), ec))
                {
                    return std::nullopt;
                }

                auto bytes = readAllBytes(path, kMaxInputFileBytes);
                if (!bytes)
                {
                    return std::nullopt;
                }
                return importBytes(mimeForExtension(extensionOf(path)), *bytes);
            }

            std::optional<Import> importDataUrl(const std::string &dataUrl)
            {
                auto parsed = parseDataUrl(dataUrl);
                if (!parsed)
                {
                    return std::nullopt;
                }
                return importBytes(parsed->mime, parsed->bytes);
            }

            namespace
            {
                void compactSounds(nlohmann::json &sounds)
                {
                    if (!sounds.is_array())
                    {
                        return;
                    }
                    for (auto &sound : sounds)
                    {
                        auto image = sound.find("image");
                        if (image == sound.end() || !image->is_string())
                        {
                            continue;
                        }
                        const std::string value = image->get<std::string>();
                        if (value.rfind("data:", 0) == 0)
                        {
                            if (auto ref = managedRefForDataUrl(value))
                            {
                                *image = *ref;
                            }
                            //* When the store is unwritable the inline URL survives —
                            //* saving the configuration must never fail because of
                            //* artwork bookkeeping.
                        }
                    }
                }

                void compactFolders(nlohmann::json &folders);

                void compactTab(nlohmann::json &tab)
                {
                    compactSounds(tab["sounds"]);
                    if (tab.contains("folders"))
                    {
                        compactFolders(tab["folders"]);
                    }
                }

                void compactFolders(nlohmann::json &folders)
                {
                    if (!folders.is_array())
                    {
                        return;
                    }
                    for (auto &folder : folders)
                    {
                        compactSounds(folder["sounds"]);
                        if (folder.contains("folders"))
                        {
                            compactFolders(folder["folders"]);
                        }
                    }
                }

                void expandSounds(nlohmann::json &sounds)
                {
                    if (!sounds.is_array())
                    {
                        return;
                    }
                    for (auto &sound : sounds)
                    {
                        auto image = sound.find("image");
                        if (image == sound.end() || !image->is_string())
                        {
                            continue;
                        }
                        const std::string value = image->get<std::string>();
                        if (isManagedRef(value))
                        {
                            if (auto dataUrl = dataUrlFromManagedRef(value))
                            {
                                *image = *dataUrl;
                            }
                            else
                            {
                                *image = ""; //* artwork file missing — degrade gracefully
                            }
                        }
                    }
                }

                void expandFolders(nlohmann::json &folders);

                void expandTab(nlohmann::json &tab)
                {
                    expandSounds(tab["sounds"]);
                    if (tab.contains("folders"))
                    {
                        expandFolders(tab["folders"]);
                    }
                }

                void expandFolders(nlohmann::json &folders)
                {
                    if (!folders.is_array())
                    {
                        return;
                    }
                    for (auto &folder : folders)
                    {
                        expandSounds(folder["sounds"]);
                        if (folder.contains("folders"))
                        {
                            expandFolders(folder["folders"]);
                        }
                    }
                }
            } // namespace

            void compactImagesForDisk(nlohmann::json &config)
            {
                auto data = config.find("data");
                if (data == config.end() || !data->is_object())
                {
                    return;
                }
                auto tabs = data->find("tabs");
                if (tabs == data->end() || !tabs->is_array())
                {
                    return;
                }
                for (auto &tab : *tabs)
                {
                    if (tab.is_object())
                    {
                        compactTab(tab);
                    }
                }
            }

            void expandImagesFromDisk(nlohmann::json &config)
            {
                auto data = config.find("data");
                if (data == config.end() || !data->is_object())
                {
                    return;
                }
                auto tabs = data->find("tabs");
                if (tabs == data->end() || !tabs->is_array())
                {
                    return;
                }
                for (auto &tab : *tabs)
                {
                    if (tab.is_object())
                    {
                        expandTab(tab);
                    }
                }
            }
        } // namespace Artwork
    } // namespace Helpers
} // namespace Audiopad
