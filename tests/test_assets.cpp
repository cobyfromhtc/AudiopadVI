#include "test_util.hpp"

#include <atomic>
#include <thread>

#include <helper/artwork/artwork.hpp>
#include <helper/base64/base64.hpp>
#include <helper/debounce_writer/debounce_writer.hpp>
#include <nlohmann/json.hpp>

//* ---------------------------------------------------------------------------
//* Asset / configuration pipeline regression (Tasks 6-7).
//*
//*  - file URIs are properly percent-encoded for WebView2 and WebKitGTK
//*    (spaces, #, ?, %, unicode; Windows drive letters; relative roots).
//*  - atomic writes leave no partial files or temp residue.
//*  - DebouncedWriter coalesces bursts, flushes synchronously and never
//*    loses the last scheduled snapshot.
//*  - the artwork store is content-addressed; config compaction swaps
//*    inline data URLs for managed:// references and back; bounds are
//*    enforced for oversized or undecodable payloads.
//* ---------------------------------------------------------------------------

namespace
{
    std::string readText(const std::filesystem::path &path)
    {
        std::ifstream in(path, std::ios::binary);
        return std::string((std::istreambuf_iterator<char>(in)), std::istreambuf_iterator<char>());
    }
} // namespace

int main()
{
    isolateConfigurationToScratch();

    using namespace Audiopad::Helpers;
    using namespace Audiopad::Helpers::Artwork;

    std::fprintf(stderr, "asset regression:\n");

    //* --- file URI encoding ---------------------------------------------

    std::fprintf(stderr, "  [paths] file URI percent-encoding\n");
#if defined(_WIN32)
    AUDIOPAD_TEST_REQUIRE(toFileUri(L"C:\\Program Files\\AudioPad\\index.html") ==
                          "file:///C:/Program%20Files/AudioPad/index.html");
    AUDIOPAD_TEST_REQUIRE(toFileUri(L"C:\\üñí\\index.html").rfind("file:///C:/", 0) == 0);
    {
        const auto uri = toFileUri(std::filesystem::path(L"C:\\a b\\c"));
        AUDIOPAD_TEST_REQUIRE(uri.find(' ') == std::string::npos); // no raw spaces
        AUDIOPAD_TEST_REQUIRE(uri.find('%') != std::string::npos); // ...but encoding present
    }
#else
    AUDIOPAD_TEST_REQUIRE(toFileUri("/home/u/my sounds/a#b?q%.html") ==
                          "file:///home/u/my%20sounds/a%23b%3Fq%25.html");
    AUDIOPAD_TEST_REQUIRE(toFileUri("/tmp/x") == "file:///tmp/x");
    AUDIOPAD_TEST_REQUIRE(toFileUri("relative/index.html") == "file:///relative/index.html");
#endif
    {
        const std::filesystem::path unicode = testScratchDir() / "ünïcødé ①/index.html";
        const auto uri = toFileUri(unicode);
        AUDIOPAD_TEST_REQUIRE(uri.rfind("file:///", 0) == 0);
        //* No raw bytes outside the unreserved set survive ('file:' scheme
        //* separator included).
        for (unsigned char c : uri)
        {
            const bool ok = (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || (c >= '0' && c <= '9') || c == '-' ||
                             c == '_' || c == '.' || c == '~' || c == '/' || c == '%' || c == ':';
            AUDIOPAD_TEST_REQUIRE(ok);
        }
    }

    //* --- atomic writes ---------------------------------------------------

    std::fprintf(stderr, "  [paths] atomic writes\n");
    {
        const auto target = testScratchDir() / "atomic.json";
        AUDIOPAD_TEST_REQUIRE(atomicWriteFile(target, "{\"v\":1}"));
        AUDIOPAD_TEST_REQUIRE(readText(target) == "{\"v\":1}");
        AUDIOPAD_TEST_REQUIRE(atomicWriteFile(target, "{\"v\":2}"));
        AUDIOPAD_TEST_REQUIRE(readText(target) == "{\"v\":2}");

        std::error_code ec;
        for (const auto &entry : std::filesystem::directory_iterator(testScratchDir(), ec))
        {
            AUDIOPAD_TEST_REQUIRE(entry.path().filename().string().find(".tmp-") == std::string::npos);
        }
    }

    //* --- debounced writer ------------------------------------------------

    std::fprintf(stderr, "  [paths] debounced writer coalescing\n");
    {
        std::atomic<int> commits{0};
        std::atomic<int> snapshots{0};
        {
            DebouncedWriter writer(std::chrono::milliseconds(120),
                                   [&snapshots] {
                                       snapshots.fetch_add(1);
                                       return "state";
                                   },
                                   [&commits](const std::string &content) {
                                       AUDIOPAD_TEST_REQUIRE(content == "state");
                                       commits.fetch_add(1);
                                   });

            for (int i = 0; i < 10; ++i)
            {
                writer.schedule(); //* one burst
                std::this_thread::sleep_for(std::chrono::milliseconds(10));
            }
            std::this_thread::sleep_for(std::chrono::milliseconds(400));
            AUDIOPAD_TEST_REQUIRE(commits.load() == 1); //* the whole burst collapsed into one commit

            writer.schedule();
            writer.schedule();
            writer.flush(); //* synchronous — commits right here
            AUDIOPAD_TEST_REQUIRE(commits.load() == 2);
        }
        //* A pending snapshot at destruction time is committed by the destructor.
    }

    {
        std::atomic<int> commits{0};
        {
            DebouncedWriter writer(std::chrono::milliseconds(500), [] { return "later"; },
                                   [&commits](const std::string &) { commits.fetch_add(1); });
            writer.schedule();
            AUDIOPAD_TEST_REQUIRE(commits.load() == 0); //* quiet window still running
        }
        AUDIOPAD_TEST_REQUIRE(commits.load() == 1); //* destructor did not lose it
    }

    //* --- content-addressed artwork store --------------------------------

    std::fprintf(stderr, "  [artwork] content hash and managed store\n");
    {
        const std::string payloadA(2048, 'A');
        const std::string payloadB(2048, 'B');
        const std::string hashA = hashBytes(payloadA);
        AUDIOPAD_TEST_REQUIRE(hashA.size() == 16);
        AUDIOPAD_TEST_REQUIRE(hashA == hashBytes(payloadA));
        AUDIOPAD_TEST_REQUIRE(hashA != hashBytes(payloadB));

        const std::string url = "data:image/png;base64," + base64_encode(payloadA, false);
        const auto ref = managedRefForDataUrl(url);
        AUDIOPAD_TEST_REQUIRE(ref.has_value());
        AUDIOPAD_TEST_REQUIRE(isManagedRef(*ref));
        AUDIOPAD_TEST_REQUIRE(managedNameFromRef(*ref) == hashA + ".png");

        //* Content-addressed: storing again does not duplicate.
        const auto refAgain = managedRefForDataUrl(url);
        AUDIOPAD_TEST_REQUIRE(refAgain.has_value() && *refAgain == *ref);

        const auto restored = dataUrlFromManagedRef(*ref);
        AUDIOPAD_TEST_REQUIRE(restored.has_value());
        AUDIOPAD_TEST_REQUIRE(*restored == url); //* byte-identical round trip

        AUDIOPAD_TEST_REQUIRE(!dataUrlFromManagedRef("managed://../etc/passwd").has_value()); //* traversal rejected
        AUDIOPAD_TEST_REQUIRE(!dataUrlFromManagedRef("managed://missing-file.png").has_value());
    }

    //* --- config compaction round trip ------------------------------------

    std::fprintf(stderr, "  [artwork] config compaction <-> expansion\n");
    {
        const std::string payload(4096, 'X');
        const std::string inlineUrl = "data:image/png;base64," + payload;

        nlohmann::json config;
        config["settings"]["theme"] = 0;
        nlohmann::json tab;
        tab["name"] = "SFX";
        tab["sounds"] = nlohmann::json::array({nlohmann::json{{"name", "boom"}, {"image", inlineUrl}},
                                               nlohmann::json{{"name", "silence"}, {"image", ""}}});
        nlohmann::json folder;
        folder["name"] = "nested";
        folder["sounds"] = nlohmann::json::array({nlohmann::json{{"name", "inner"}, {"image", inlineUrl}}});
        tab["folders"] = nlohmann::json::array({folder});
        config["data"]["tabs"] = nlohmann::json::array({tab});

        const auto before = config.dump();
        compactImagesForDisk(config);
        const auto after = config.dump();
        AUDIOPAD_TEST_REQUIRE(after.size() < before.size() / 2); //* inline payload left the document

        const std::string managed = config["data"]["tabs"][0]["sounds"][0]["image"];
        AUDIOPAD_TEST_REQUIRE(isManagedRef(managed));
        AUDIOPAD_TEST_REQUIRE(std::filesystem::exists(Artwork::directory() / managedNameFromRef(managed)));

        //* Keep the managed form around — the degraded-expansion check below
        //* needs a document that still references the store.
        nlohmann::json managedForm = config;

        expandImagesFromDisk(config);
        AUDIOPAD_TEST_REQUIRE(config["data"]["tabs"][0]["sounds"][0]["image"] == inlineUrl);
        AUDIOPAD_TEST_REQUIRE(config["data"]["tabs"][0]["folders"][0]["sounds"][0]["image"] == inlineUrl);

        //* Missing store file degrades to empty, never throws.
        std::error_code ec;
        std::filesystem::remove(Artwork::directory() / managedNameFromRef(managed), ec);
        AUDIOPAD_TEST_REQUIRE(!std::filesystem::exists(Artwork::directory() / managedNameFromRef(managed), ec));
        expandImagesFromDisk(managedForm);
        AUDIOPAD_TEST_REQUIRE(managedForm["data"]["tabs"][0]["sounds"][0]["image"].get<std::string>().empty());
    }

    //* --- bounded imports --------------------------------------------------

    std::fprintf(stderr, "  [artwork] oversized / invalid inputs are rejected\n");
    {
        //* Undecodable payload (raw noise, not an image) above the passthrough
        //* bound: rejected on every platform — with a platform decoder it fails
        //* to decode, without one it exceeds the pass-through limit.
        const std::string giant(600 * 1024, '\x01');
        const std::string giantUrl = "data:image/png;base64," + base64_encode(giant, false);
        const auto imported = importDataUrl(giantUrl);
        AUDIOPAD_TEST_REQUIRE(!imported.has_value());
        AUDIOPAD_TEST_REQUIRE(!importDataUrl("data:image/png;no-comma").has_value());
        AUDIOPAD_TEST_REQUIRE(!importImage((testScratchDir() / "no-such-file.png").string()).has_value());
    }

    std::fprintf(stderr, "asset regression: PASS\n");
    return 0;
}
