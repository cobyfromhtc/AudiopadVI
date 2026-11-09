#pragma once
#include <cstddef>
#include <cstdint>
#include <filesystem>
#include <optional>
#include <string>

#include <nlohmann/json.hpp>

namespace Audiopad
{
    namespace Helpers
    {
        namespace Artwork
        {
            //* Longest edge of stored artwork. Sound tiles render far below this;
            //* bounding the dimension bounds decoded memory, the serialized data URL
            //* handed to the UI and the managed cache file.
            inline constexpr std::uint32_t kMaxDimension = 256;

            //* Hard input bound before anything is decoded — protects against
            //* accidentally picked multi-gigabyte files.
            inline constexpr std::size_t kMaxInputFileBytes = 16ull << 20;

            //* Without a platform decoder (or for undecodable formats) raw files up
            //* to this size pass through untouched; larger ones are rejected so the
            //* config can never balloon through the fallback path.
            inline constexpr std::size_t kMaxPassthroughBytes = 256ull * 1024;

            struct Import
            {
                std::string dataUrl; //* bounded, ready for the UI
                std::string pngBytes; //* re-encoded (or passed-through) payload
                std::string managedName; //* content-hash file name inside the store
            };

            //* Decodes `path`, downscales to at most kMaxDimension on the longer
            //* edge (never upscales) and re-encodes as PNG. Falls back to a bounded
            //* pass-through when the platform cannot decode the format. Returns
            //* nullopt for missing / oversized / undecodable-and-too-large input.
            std::optional<Import> importImage(const std::string &path);

            //* Same treatment for a `data:` URL coming back from the UI.
            std::optional<Import> importDataUrl(const std::string &dataUrl);

            //* --- managed store (config directory /artwork, addressed by hash) ---

            std::filesystem::path directory();

            //* Ensures the bytes live in the store; returns the managed file name
            //* (content-hash + extension) or nullopt when the store is unwritable.
            std::optional<std::string> storeBytes(const std::string &bytes, const std::string &extension);

            inline constexpr const char *kManagedPrefix = "managed://";
            bool isManagedRef(const std::string &image);
            std::string managedNameFromRef(const std::string &ref);

            //* data URL -> stored file -> "managed://<name>" (nullopt when the
            //* store is unwritable; caller then keeps the inline URL).
            std::optional<std::string> managedRefForDataUrl(const std::string &dataUrl);

            //* "managed://<name>" -> data URL (nullopt when the file is gone).
            std::optional<std::string> dataUrlFromManagedRef(const std::string &ref);

            //* --- configuration (de)hydration ---
            //*
            //* Walks the tab/sound tree of a serialized configuration and swaps
            //* inline `data:` image URLs for compact managed references (before
            //* writing to disk) and back (after reading). Keeps config.json small
            //* and the write path allocation-light for large artwork.
            void compactImagesForDisk(nlohmann::json &config);
            void expandImagesFromDisk(nlohmann::json &config);

            //* Content-hash (FNV-1a 64 + length) of the payload, hex encoded.
            std::string hashBytes(const std::string &bytes);
        } // namespace Artwork
    } // namespace Helpers
} // namespace Audiopad
