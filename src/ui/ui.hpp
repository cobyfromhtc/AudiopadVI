#pragma once
#include <core/objects/settings.hpp>
#include <helper/audio/audio.hpp>
#if defined(__linux__)
#include <helper/audio/linux/backend.hpp>
#endif
#include <atomic>
#include <cstdint>
#include <map>
#include <queue>
#include <string>
#include <var_guard.hpp>

namespace Audiopad
{
    namespace Objects
    {
#if defined(__linux__)
        struct IconRecordingApp : public RecordingApp
        {
            std::string appIcon;
            IconRecordingApp(const RecordingApp &);
            ~IconRecordingApp() override = default;
        };
        struct IconPlaybackApp : public PlaybackApp
        {
            std::string appIcon;
            IconPlaybackApp(const PlaybackApp &);
            ~IconPlaybackApp() override = default;
        };
#endif

        //* Whole-board loop runtime state. Guarded by `boardLoop` — the cycle
        //* button (UI thread), natural completion (queue thread) and stop
        //* handling all mutate it, but sounds are only ever started/stopped
        //* while the guard is released (see playNextBoardLoopSound).
        struct BoardLoopState
        {
            Enums::BoardLoopMode mode = Enums::BoardLoopMode::Off;
            std::uint32_t tabId = 0;
            //* Sound ids in play order (see Ordering::buildBoardLoopSequence).
            std::vector<std::uint32_t> sequence;
            //* Index of the sound that is currently playing (0 while idle).
            std::size_t cursor = 0;
            std::uint32_t currentSoundId = 0;
            //* Consecutive start failures (vanished files etc.) — a full
            //* failed sweep gives up instead of spinning forever.
            int consecutiveFailures = 0;
            //* Set while playNextBoardLoopSound starts a clip; suppresses the
            //* stop-sound "skip" hook so policy restarts don't double-advance.
            bool advancing = false;
        };

        //* Immutable snapshot of the board loop for the frontend / remote.
        struct BoardLoopInfo
        {
            Enums::BoardLoopMode mode = Enums::BoardLoopMode::Off;
            std::uint32_t tabId = 0;
            std::size_t index = 0;  //* 1-based position of the current sound
            std::size_t total = 0;  //* sequence length
            std::uint32_t currentSoundId = 0;
        };

        class Window
        {
            friend class Hotkeys;

          protected:
            sxl::var_guard<std::map<std::uint32_t, std::uint32_t>> groupedSounds;

            //* --- Per-sound "mute others" bookkeeping ---
            //* playingId of a silenced victim -> its previous volume in percent.
            sxl::var_guard<std::map<std::uint32_t, int>> mutedByOthers;
            //* soundId of the clip holding the policy -> playingIds it silenced.
            sxl::var_guard<std::map<std::uint32_t, std::vector<std::uint32_t>>> muteOthersRegistry;

            //* Reference count of active streams that requested microphone
            //* muting (global setting or per-sound policy). The mic is muted while
            //* the count is above zero and released back once it drains.
            std::atomic<int> voiceMuteRequests{0};

            //* Whole-board loop state (guarded; see BoardLoopState).
            sxl::var_guard<BoardLoopState> boardLoop;

            //* Last state applied by the mic-mute toggle (hotkey / UI / remote).
            //* The backends expose no query API, so the app tracks its own state.
            std::atomic<bool> micMutedByToggle{false};

            struct
            {
                std::string exit;
                std::string hide;
                std::string show;
                std::string settings;
                std::string tabHotkeys;
                std::string muteDuringPlayback;
            } translations;

          protected:
            virtual void onAllSoundsFinished();

          protected:
            //* Rescans the tab's directory tree (including all nested subfolders) and
            //* returns an updated copy of the tab. Metadata (hotkeys, favorites, images,
            //* volumes) of known sounds is preserved, user-created folders survive too.
            virtual Tab getTabContent(const Tab &) const;

            //* Opens the native folder picker. Returns the chosen path or nullopt when
            //* the dialog was cancelled.
            virtual std::optional<std::string> pickFolderDialog();

#if defined(__linux__)
            virtual std::vector<std::shared_ptr<IconRecordingApp>> getOutputs();
            virtual std::vector<std::shared_ptr<IconPlaybackApp>> getPlayback();
#else
            virtual std::vector<AudioDevice> getOutputs();
#endif

          protected:
            virtual void setIsOnFavorites(bool);
            virtual Settings changeSettings(Settings);
            virtual bool deleteSound(const std::uint32_t &);

#if defined(__linux__)
            void stopPassthrough(const std::string &);
            virtual bool startPassthrough(const std::string &);
#endif

          protected:
            virtual std::vector<Tab> removeTab(const std::uint32_t &);
            virtual std::optional<Tab> refreshTab(const std::uint32_t &);
            virtual std::vector<Tab> changeTabOrder(const std::vector<int> &);
            virtual std::optional<Tab> setSortMode(const std::uint32_t &, Enums::SortMode);
            virtual std::optional<Tab> setTabBoost(const std::uint32_t &, int);

            //* Copies the sound files of `sourcePath` into the given tab's directory
            //* and returns the refreshed tab. `mode` decides how the picked folder is
            //* placed: "children" merges its contents straight into the destination
            //* (the folder itself is skipped), while "parent" keeps it as a wrapper —
            //* everything lands inside a new subfolder named after it.
            virtual std::optional<Tab> importFolderIntoTab(const std::uint32_t &, const std::string &sourcePath,
                                                           const std::string &mode = "children");

            //* Creates a new subfolder inside the tab (or inside `parentFolderId` when
            //* given) and returns the refreshed tab.
            virtual std::optional<Tab> createFolderInTab(const std::uint32_t &,
                                                         const std::optional<std::uint32_t> &parentFolderId,
                                                         const std::string &name);

            //* Opens the native folder picker with multi-selection enabled. Returns
            //* every chosen path; empty when the dialog was cancelled or nothing was
            //* picked.
            virtual std::vector<std::string> pickFoldersDialog();

            //* Opens the native multi-select file picker filtered to supported audio
            //* formats (mp3 / wav / flac). Returns every chosen file path; empty when
            //* the dialog was cancelled or nothing was picked.
            virtual std::vector<std::string> pickSoundFilesDialog();

            //* Imports items dragged in from the OS file manager into the given tab —
            //* at the tab root, or inside `parentFolderId` when given. Every dropped
            //* directory is copied recursively (structure preserved) into a folder of
            //* the same name; dropped audio files are copied directly into the
            //* destination. When `mode` is "children" and exactly one folder is
            //* dropped, the folder itself is skipped and only its contents are
            //* imported. Returns the refreshed tab.
            virtual std::optional<Tab> importDroppedPaths(const std::uint32_t &tabId,
                                                          const std::optional<std::uint32_t> &parentFolderId,
                                                          const std::vector<std::string> &paths,
                                                          const std::string &mode = "parent");

            //* Renames a category (display name only — the folder on disk keeps its
            //* path, so nothing breaks when the category points at a user directory).
            virtual std::optional<Tab> renameTab(const std::uint32_t &, const std::string &name);

            //* Creates a brand-new, empty category. A folder with the given name is
            //* created inside the app data directory and registered as a tab, so users
            //* can build their own categories from scratch.
            virtual std::vector<Tab> createTab(const std::string &name);

            //* "Add Folder as Category" rework: registers every direct subfolder of
            //* `rootPath` as its own tab (each keeping its whole nested structure).
            //* When the picked folder also holds audio files directly at its root, the
            //* folder itself is registered as a tab too so no sounds are lost. Returns
            //* every tab that now lives under the picked folder — including ones that
            //* were already registered — so the UI can group them into a fresh sidebar
            //* category named after the folder.
            virtual std::vector<Tab> addTabFromFolder(const std::string &rootPath);

          protected:
            virtual bool toggleSoundPlayback();

          protected:
            //* Platform-specific stream startup — the original body of playSound
            //* (local monitor + remote/output routing) without any policy logic.
            virtual std::optional<PlayingSound> playSoundStreams(const Sound &);

            //* Every active stream instance belonging to the given sound id.
            virtual std::vector<PlayingSound> activeInstancesOfSound(const std::uint32_t &soundId) const;

            //* Effective volume (percent) a playing stream should return to.
            virtual int volumePercentFor(const PlayingSound &) const;

            //* "Mute other sounds": silence every other active clip while the
            //* given sound plays (restored on completion), and silence the newly
            //* started instances when another active clip already holds the policy.
            //* Returns whether the new instances ended up silenced.
            virtual bool applyMuteOthersPolicies(const Sound &sound, const std::vector<std::uint32_t> &newInstanceIds);
            virtual void restoreMutedByOthers(const std::uint32_t &mutingSoundId);

            //* Reference-counted microphone muting (global + per-sound policies).
            virtual void requestVoiceMute();
            virtual void releaseVoiceMute();

            //* Applies (or releases) the platform microphone mute and tracks the state.
            virtual void applyMicMute(bool muted);

            //* Brings the live microphone monitor in line with the current
            //* settings (hear myself / selected voice preset).
            virtual void applyHearMyself();

            //* Single teardown funnel for per-sound policies — invoked whenever a
            //* stream instance ends (natural completion or user stop).
            virtual void teardownPlaybackPolicies(const PlayingSound &);

            //* Releases every outstanding playback policy at once (stop-all).
            virtual void teardownAllPlaybackPolicies();

            //* Starts (or retries) the board-loop clip at the cursor, skipping
            //* entries that fail to start. Runs with the boardLoop guard
            //* released; re-entrancy is blocked by BoardLoopState::advancing.
            void playNextBoardLoopSound();

          public:
            //* --- Core playback actions (public action API) ---
            //* Triggered by the UI, global hotkeys and the local control server
            //* alike — every path runs through the same per-sound policies.
            //* `suppressRepeat` disables the clip's own loop default / push-to-loop
            //* repeat for this start: the board loop owns repetition and a looping
            //* single clip would stall the sequence forever.
            virtual std::optional<PlayingSound> playSound(const std::uint32_t &, bool suppressRepeat = false);
            virtual bool stopSound(const std::uint32_t &);
            virtual void stopSounds(bool = false);

            //* Copies a finished recording file into a board (optionally a
            //* subfolder) and returns the refreshed tab. Used by the recorder
            //* UI and by uploads from paired remote clients.
            virtual std::optional<Tab> importFileIntoTab(const std::uint32_t &tabId, const std::string &filePath,
                                                         const std::optional<std::uint32_t> &parentFolderId = std::nullopt);

            //* --- Live controls ---
            //* Toggles the physical microphone mute; returns the new state.
            virtual bool toggleMicMute();
            virtual bool isMicMuted() const;
            //* Toggles local monitoring of the (voice-processed) microphone.
            virtual bool toggleHearMyself();
            //* Selects a live voice-filter preset applied to the microphone path.
            virtual void setVoicePreset(Enums::VoicePreset preset);
            virtual Enums::VoicePreset voicePreset() const;

            //* --- Now-playing overlay ---
            virtual bool toggleOverlay();
            virtual void setOverlayPosition(int position);
            virtual void cycleOverlayPosition();

          protected:
            virtual std::optional<PlayingSound> pauseSound(const std::uint32_t &);
            virtual std::optional<PlayingSound> resumeSound(const std::uint32_t &);
            virtual std::optional<PlayingSound> repeatSound(const std::uint32_t &, bool);
            virtual std::optional<PlayingSound> seekSound(const std::uint32_t &, std::uint64_t);

            virtual std::optional<Sound> setHotkey(const std::uint32_t &, const std::vector<int> &);
            virtual std::optional<Sound> setCustomLocalVolume(const std::uint32_t &, const std::optional<int> &);
            virtual std::optional<Sound> setCustomRemoteVolume(const std::uint32_t &, const std::optional<int> &);

            //* --- Sound & board organization ---
            //* Renames a sound's display name (the file on disk keeps its name).
            virtual std::optional<Sound> renameSound(const std::uint32_t &, const std::string &);
            //* Replaces the free-form tags of a sound.
            virtual std::optional<Sound> setSoundTags(const std::uint32_t &, const std::vector<std::string> &);
            //* Updates the per-sound playback policies (trigger mode, loop default,
            //* stop/mute others, per-sound voice muting).
            virtual std::optional<Sound> setSoundPolicies(const std::uint32_t &, Enums::TriggerMode, bool loopByDefault,
                                                          bool stopOthers, bool muteOthers, const std::optional<bool> &muteVoice);
            //* Converts a sound entry into a live voice slot (or back to a file clip).
            virtual std::optional<Sound> setSoundVoiceSlot(const std::uint32_t &, const std::optional<std::string> &preset);
            //* Assigns / clears a custom board icon (bounded data URL).
            virtual std::optional<Tab> setTabIcon(const std::uint32_t &, const std::string &icon);
            //* Persists a manual sound arrangement (used while sortMode == Manual)
            //* and reorders the in-memory model to match.
            virtual std::optional<Tab> setSoundOrder(const std::uint32_t &tabId, const std::vector<std::uint32_t> &orderedIds);
            //* Persists a manual folder arrangement (used while sortMode ==
            //* Manual, applied at every tree level) and reorders the in-memory
            //* model to match.
            virtual std::optional<Tab> setFolderOrder(const std::uint32_t &tabId, const std::vector<std::uint32_t> &orderedIds);
            //* Moves sound files into another board (optionally a subfolder) while
            //* preserving every piece of metadata (id, hotkeys, favorites, policies).
            virtual std::vector<Tab> moveSoundsToTab(const std::vector<std::uint32_t> &soundIds,
                                                     const std::uint32_t &targetTabId,
                                                     const std::optional<std::uint32_t> &targetFolderId);

            //* --- Whole-board loop ---
            //* Advances the loop of the given board one state: Off -> board-only
            //* -> board + all subfolders -> Off. Returns the new state.
            virtual BoardLoopInfo boardLoopCycle(const std::uint32_t &tabId);
            //* Current loop state snapshot (for the frontend and remote).
            virtual BoardLoopInfo getBoardLoopState();

            //* --- Recording & editing ---
            //* Writes a trimmed copy of the sound (start/end in milliseconds) into
            //* the same folder as a new file and returns the created entry.
            virtual std::optional<Sound> trimSound(const std::uint32_t &soundId, std::uint64_t startMs, std::uint64_t endMs);

          public:
            virtual ~Window();
            virtual void setup();
            virtual void show() = 0;
            virtual void mainLoop() = 0;

            virtual void onAdminRequired() = 0;
            virtual void onSettingsChanged() = 0;
            virtual void onSwitchOnConnectDetected(bool) = 0;
            virtual void onSoundPlayed(const PlayingSound &);
            virtual void onError(const Enums::ErrorCode &) = 0;
            virtual void onSoundFinished(const PlayingSound &);
            virtual void onHotKeyReceived(const std::vector<int> &);
            virtual void onSoundProgressed(const PlayingSound &) = 0;

            //* Live-control notifications for the frontend (mic mute / voice
            //* preset changed through hotkeys, remote clients or voice slots).
            virtual void onMicMuteChanged(bool) {}
            virtual void onVoicePresetChanged(Enums::VoicePreset) {}
            //* "Hear myself" monitoring toggled (topbar button, settings card,
            //* hotkey or remote client) — the frontend mirrors the new state.
            virtual void onHearMyselfChanged(bool) {}
            //* Board-loop state changed (button cycle, skip gave up, stop-all).
            virtual void onBoardLoopChanged(Enums::BoardLoopMode, std::uint32_t) {}
        };
    } // namespace Objects
} // namespace Audiopad