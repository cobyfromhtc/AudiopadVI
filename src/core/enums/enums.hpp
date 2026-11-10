#pragma once
#include <cstdint>

namespace Audiopad
{
    namespace Enums
    {
        enum class ErrorCode : std::uint8_t
        {
            FailedToPlay,
            FailedToSeek,
            FailedToPause,
            FailedToRepeat,
            FailedToResume,
            FailedToMoveToSink,
            SoundNotFound,
            FolderDoesNotExist,
            TabDoesNotExist,
            FailedToSetHotkey,
            FailedToStartPassthrough,
            FailedToMoveBack,
            FailedToMoveBackPassthrough,
            FailedToRevertDefaultSource,
            FailedToSetDefaultSource,
            FailedToDelete,
            FailedToMute,
            FailedToSetCustomVolume,
            InvalidFolderName,
            FailedToCreateFolder,
            FailedToRecord,
            FailedToSaveRecording,
            FailedToTrim,
            FailedToMoveSound,
            FailedToRenameSound,
            InvalidSoundName,
            RemoteControlUnavailable,
        };

        enum class SortMode : std::uint8_t
        {
            ModifiedDate_Ascending,
            ModifiedDate_Descending,
            Alphabetical_Ascending,
            Alphabetical_Descending,
            //* User-defined order: sounds keep the manual arrangement persisted in
            //* Tab::soundOrder and folders the one in Tab::folderOrder (drag &
            //* drop inside the soundboard view).
            Manual,
        };

        //* Whole-board looping triggered from the board toolbar. Each click of
        //* the loop button advances the state: Off -> BoardOnly -> BoardAndFolders
        //* -> Off. BoardOnly loops the board's own sounds top-to-bottom;
        //* BoardAndFolders plays the board's sounds first and then every
        //* subfolder left-to-right (depth-first, each subfolder's own sounds
        //* before its children) before wrapping around.
        enum class BoardLoopMode : std::uint8_t
        {
            Off = 0,
            BoardOnly = 1,
            BoardAndFolders = 2,
        };

        //* What a repeated trigger of the same sound does while it is already
        //* playing (per-sound playback policy, mirroring classic soundboards).
        enum class TriggerMode : std::uint8_t
        {
            PlayRestart = 0, //* retrigger restarts the clip from the beginning
            PlayPause = 1,   //* retrigger pauses; another trigger resumes it
            PlayStop = 2,    //* retrigger stops it; the next trigger starts fresh
            PushToLoop = 3,  //* loop while the key / pointer is held, stop on release
        };

        //* Original, local voice-filter presets for live microphone processing.
        //* Deliberately simple DSP chains — no third-party voice packs.
        enum class VoicePreset : std::uint8_t
        {
            Off = 0,
            Deep,
            High,
            Echo,
            Robot,
        };

        enum class Theme : std::uint8_t
        {
            System,
            Dark,
            Light
        };

        enum class ViewMode : std::uint8_t
        {
            List,
            Grid,
            EmulatedLaunchpad,
        };

        enum class BackendType : std::uint8_t
        {
            None,
            PipeWire,
            PulseAudio,
        };
    } // namespace Enums
} // namespace Audiopad