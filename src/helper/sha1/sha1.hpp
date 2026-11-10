#pragma once
#include <array>
#include <cstddef>
#include <cstdint>
#include <string>

namespace Audiopad
{
    namespace Helpers
    {
        //* Minimal, dependency-free SHA-1 (FIPS 180-1) — only used for the local
        //* WebSocket handshake (RFC 6455 Sec-WebSocket-Accept), never for
        //* security-critical hashing.
        std::array<std::uint8_t, 20> sha1(const std::string &data);

        //* Lowercase hex digest of sha1(data).
        std::string sha1Hex(const std::string &data);

        //* Base64 of sha1(data) — exactly what RFC 6455 needs.
        std::string sha1Base64(const std::string &data);
    } // namespace Helpers
} // namespace Audiopad
