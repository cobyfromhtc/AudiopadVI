#include "sha1.hpp"
#include <helper/base64/base64.hpp>
#include <cstring>

namespace Audiopad::Helpers
{
    namespace
    {
        std::uint32_t leftRotate(std::uint32_t value, std::uint32_t bits)
        {
            return (value << bits) | (value >> (32 - bits));
        }
    } // namespace

    std::array<std::uint8_t, 20> sha1(const std::string &data)
    {
        std::array<std::uint32_t, 5> state{0x67452301u, 0xEFCDAB89u, 0x98BADCFEu, 0x10325476u, 0xC3D2E1F0u};

        const std::size_t bitLength = data.size() * 8;
        std::string padded = data;
        padded.push_back(static_cast<char>(0x80));
        while ((padded.size() % 64) != 56)
        {
            padded.push_back('\0');
        }

        for (int shift = 56; shift >= 0; shift -= 8)
        {
            padded.push_back(static_cast<char>((bitLength >> shift) & 0xff));
        }

        std::uint32_t w[80];
        for (std::size_t chunk = 0; chunk < padded.size(); chunk += 64)
        {
            for (std::size_t index = 0; index < 16; index++)
            {
                w[index] = (static_cast<std::uint32_t>(static_cast<unsigned char>(padded[chunk + index * 4])) << 24) |
                           (static_cast<std::uint32_t>(static_cast<unsigned char>(padded[chunk + index * 4 + 1])) << 16) |
                           (static_cast<std::uint32_t>(static_cast<unsigned char>(padded[chunk + index * 4 + 2])) << 8) |
                           (static_cast<std::uint32_t>(static_cast<unsigned char>(padded[chunk + index * 4 + 3])));
            }
            for (std::size_t index = 16; index < 80; index++)
            {
                w[index] = leftRotate(w[index - 3] ^ w[index - 8] ^ w[index - 14] ^ w[index - 16], 1);
            }

            std::uint32_t a = state[0];
            std::uint32_t b = state[1];
            std::uint32_t c = state[2];
            std::uint32_t d = state[3];
            std::uint32_t e = state[4];

            for (std::size_t index = 0; index < 80; index++)
            {
                std::uint32_t f = 0;
                std::uint32_t k = 0;
                if (index < 20)
                {
                    f = (b & c) | ((~b) & d);
                    k = 0x5A827999u;
                }
                else if (index < 40)
                {
                    f = b ^ c ^ d;
                    k = 0x6ED9EBA1u;
                }
                else if (index < 60)
                {
                    f = (b & c) | (b & d) | (c & d);
                    k = 0x8F1BBCDCu;
                }
                else
                {
                    f = b ^ c ^ d;
                    k = 0xCA62C1D6u;
                }

                const std::uint32_t temp = leftRotate(a, 5) + f + e + k + w[index];
                e = d;
                d = c;
                c = leftRotate(b, 30);
                b = a;
                a = temp;
            }

            state[0] += a;
            state[1] += b;
            state[2] += c;
            state[3] += d;
            state[4] += e;
        }

        std::array<std::uint8_t, 20> digest{};
        for (std::size_t index = 0; index < 5; index++)
        {
            for (std::size_t byte = 0; byte < 4; byte++)
            {
                digest[index * 4 + byte] = static_cast<std::uint8_t>((state[index] >> (24 - byte * 8)) & 0xff);
            }
        }
        return digest;
    }

    std::string sha1Hex(const std::string &data)
    {
        static const char *digits = "0123456789abcdef";
        const auto digest = sha1(data);

        std::string hex;
        hex.reserve(digest.size() * 2);
        for (const auto byte : digest)
        {
            hex.push_back(digits[byte >> 4]);
            hex.push_back(digits[byte & 0x0f]);
        }
        return hex;
    }

    std::string sha1Base64(const std::string &data)
    {
        const auto digest = sha1(data);
        return base64_encode(digest.data(), digest.size());
    }
} // namespace Audiopad::Helpers
