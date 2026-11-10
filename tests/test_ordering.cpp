#include "test_util.hpp"

#include <core/objects/ordering.hpp>

//* ---------------------------------------------------------------------------
//* Board arrangement regression: manual folder ordering + whole-board loop
//* sequence building (the pure Ordering helpers shared by the scan pipeline,
//* the UI and the board loop).
//* ---------------------------------------------------------------------------

namespace
{
    using namespace Audiopad;
    using namespace Audiopad::Objects;
    using namespace Audiopad::Objects::Ordering;

    Sound makeSound(std::uint32_t id, const std::string &name, std::uint64_t modified)
    {
        Sound sound;
        sound.id = id;
        sound.name = name;
        sound.path = "/sandbox/" + name + ".wav";
        sound.modifiedDate = modified;
        return sound;
    }

    Folder makeFolder(std::uint32_t id, const std::string &name)
    {
        Folder folder;
        folder.id = id;
        folder.name = name;
        folder.path = "/sandbox/" + name;
        return folder;
    }

    bool sameIds(const std::vector<std::uint32_t> &actual, const std::vector<std::uint32_t> &expected)
    {
        return actual == expected;
    }
} // namespace

int main()
{
    std::fprintf(stderr, "ordering regression:\n");

    //* --- sortFolders: alphabetical fallback + manual order -----------------

    std::fprintf(stderr, "  [sortFolders] alphabetical without manual order\n");
    {
        std::vector<Folder> folders;
        folders.push_back(makeFolder(3, "zeta"));
        folders.push_back(makeFolder(1, "Alpha"));
        folders.push_back(makeFolder(2, "middle"));
        sortFolders(folders);
        AUDIOPAD_TEST_REQUIRE(folders.size() == 3);
        AUDIOPAD_TEST_REQUIRE(folders[0].id == 1); //* case-insensitive
        AUDIOPAD_TEST_REQUIRE(folders[1].id == 2);
        AUDIOPAD_TEST_REQUIRE(folders[2].id == 3);
    }

    std::fprintf(stderr, "  [sortFolders] manual order, unlisted collect at the end (stable)\n");
    {
        std::vector<Folder> folders;
        folders.push_back(makeFolder(10, "a"));
        folders.push_back(makeFolder(11, "b"));
        folders.push_back(makeFolder(12, "c"));
        folders.push_back(makeFolder(13, "d"));
        const std::vector<std::uint32_t> manual{12, 10};
        sortFolders(folders, &manual);
        AUDIOPAD_TEST_REQUIRE(folders[0].id == 12);
        AUDIOPAD_TEST_REQUIRE(folders[1].id == 10);
        AUDIOPAD_TEST_REQUIRE(folders[2].id == 11); //* unlisted keep scan order
        AUDIOPAD_TEST_REQUIRE(folders[3].id == 13);
    }

    //* --- sanitizeOrder + collectFolderIds ----------------------------------

    std::fprintf(stderr, "  [sanitizeOrder] dedupes, appends missing, drops unknown\n");
    {
        const auto sanitized = sanitizeOrder({7, 7, 5, 999, 6}, {5, 6, 7, 8});
        AUDIOPAD_TEST_REQUIRE(sameIds(sanitized, {7, 5, 6, 8}));
    }

    std::fprintf(stderr, "  [collectFolderIds] pre-order walk (parents before children)\n");
    {
        Folder root = makeFolder(1, "root");
        Folder left = makeFolder(2, "left");
        Folder leftChild = makeFolder(4, "left-child");
        Folder right = makeFolder(3, "right");
        left.folders.push_back(leftChild);
        root.folders.push_back(left);
        root.folders.push_back(right);
        AUDIOPAD_TEST_REQUIRE(sameIds(collectFolderIds({root}), {1, 2, 4, 3}));
    }

    //* --- applyFolderOrder: every level follows the flat order --------------

    std::fprintf(stderr, "  [applyFolderOrder] reorders every tree level\n");
    {
        Folder a = makeFolder(1, "a");
        a.folders.push_back(makeFolder(5, "x"));
        a.folders.push_back(makeFolder(6, "y"));
        Folder b = makeFolder(2, "b");
        b.folders.push_back(makeFolder(7, "z"));
        std::vector<Folder> tree;
        tree.push_back(a);
        tree.push_back(b);

        const std::vector<std::uint32_t> manual{2, 1, 7, 6, 5};
        applyFolderOrder(tree, manual);
        AUDIOPAD_TEST_REQUIRE(tree[0].id == 2 && tree[1].id == 1);
        AUDIOPAD_TEST_REQUIRE(tree[1].folders[0].id == 6 && tree[1].folders[1].id == 5);
    }

    //* --- buildBoardLoopSequence ---------------------------------------------
    //*
    //* Tree under test (Manual order deliberately different from alphabetical):
    //*
    //*   board root:     s1, s2                       (manual: s2, s1)
    //*   folder "Beta":  s3                           (left in manual order)
    //*   folder "Alpha": s4, voice-slot, s5           (right in manual order)
    //*
    //* BoardAndFolders must play: root sounds top-to-bottom (s2, s1), then the
    //* leftmost subfolder (Beta: s3), then the next one to the right (Alpha:
    //* s4, s5 — the voice slot never produces audio and must be skipped).

    std::fprintf(stderr, "  [buildBoardLoopSequence] manual order, board-only\n");
    Tab tab;
    tab.id = 1;
    tab.sortMode = Enums::SortMode::Manual;
    tab.sounds.push_back(makeSound(101, "s1", 100));
    tab.sounds.push_back(makeSound(102, "s2", 200));
    tab.soundOrder = {102, 101};

    Folder beta = makeFolder(10, "Beta");
    beta.sounds.push_back(makeSound(103, "s3", 300));
    Folder alpha = makeFolder(11, "Alpha");
    alpha.sounds.push_back(makeSound(104, "s4", 400));
    Sound voiceSlot = makeSound(106, "voice", 600);
    voiceSlot.voicePreset = "deep";
    alpha.sounds.push_back(voiceSlot);
    alpha.sounds.push_back(makeSound(105, "s5", 500));
    tab.folders.push_back(beta);  //* manually left
    tab.folders.push_back(alpha); //* manually right
    tab.folderOrder = {10, 11};

    {
        const auto sequence = buildBoardLoopSequence(tab, Enums::BoardLoopMode::BoardOnly);
        AUDIOPAD_TEST_REQUIRE(sameIds(sequence, {102, 101}));
    }

    std::fprintf(stderr, "  [buildBoardLoopSequence] board + folders: root, then left subfolder, then right\n");
    {
        const auto sequence = buildBoardLoopSequence(tab, Enums::BoardLoopMode::BoardAndFolders);
        AUDIOPAD_TEST_REQUIRE(sameIds(sequence, {102, 101, 103, 104, 105}));
    }

    std::fprintf(stderr, "  [buildBoardLoopSequence] off is empty, voice slots never stall the chain\n");
    {
        AUDIOPAD_TEST_REQUIRE(buildBoardLoopSequence(tab, Enums::BoardLoopMode::Off).empty());

        Tab voiceOnly;
        voiceOnly.id = 2;
        Sound onlyVoice = makeSound(201, "only-voice", 1);
        onlyVoice.voicePreset = "robot";
        voiceOnly.sounds.push_back(onlyVoice);
        AUDIOPAD_TEST_REQUIRE(buildBoardLoopSequence(voiceOnly, Enums::BoardLoopMode::BoardOnly).empty());
        AUDIOPAD_TEST_REQUIRE(buildBoardLoopSequence(voiceOnly, Enums::BoardLoopMode::BoardAndFolders).empty());
    }

    std::fprintf(stderr, "  [buildBoardLoopSequence] alphabetical modes arrange before traversing\n");
    {
        Tab alphaTab;
        alphaTab.id = 3;
        alphaTab.sortMode = Enums::SortMode::Alphabetical_Ascending;
        alphaTab.sounds.push_back(makeSound(301, "zebra", 1));
        alphaTab.sounds.push_back(makeSound(302, "ant", 2));
        const auto sequence = buildBoardLoopSequence(alphaTab, Enums::BoardLoopMode::BoardOnly);
        AUDIOPAD_TEST_REQUIRE(sameIds(sequence, {302, 301})); //* ant before zebra
    }

    std::fprintf(stderr, "  [buildBoardLoopSequence] nested subfolders: own sounds first, then children\n");
    {
        //* root: s1; child "Outer": s2; grandchild "Inner": s3; second child "Last": s4
        Tab nested;
        nested.id = 4;
        nested.sortMode = Enums::SortMode::Manual;
        nested.sounds.push_back(makeSound(401, "s1", 1));

        Folder outer = makeFolder(20, "Outer");
        outer.sounds.push_back(makeSound(402, "s2", 2));
        Folder inner = makeFolder(21, "Inner");
        inner.sounds.push_back(makeSound(403, "s3", 3));
        outer.folders.push_back(inner);
        Folder last = makeFolder(22, "Last");
        last.sounds.push_back(makeSound(404, "s4", 4));
        nested.folders.push_back(outer);
        nested.folders.push_back(last);
        //* Explicit manual arrangement (an empty folderOrder would fall back
        //* to alphabetical — exactly like the board view displays it).
        nested.folderOrder = {20, 22};

        const auto sequence = buildBoardLoopSequence(nested, Enums::BoardLoopMode::BoardAndFolders);
        AUDIOPAD_TEST_REQUIRE(sameIds(sequence, {401, 402, 403, 404}));
    }

    std::fprintf(stderr, "ordering regression: OK\n");
    return 0;
}
