# Changelog

All notable changes, release notes, and version history for **AudioPad** are maintained and published online:

👉 **[View the latest Changelog on our website](https://audiopad.vercel.app/changelog)**

You can also view release notes directly on our [GitHub Releases](https://github.com/audiopadapp/audiopad/releases) page.

---

## AudioPadV2 feature drop

### Per-sound playback policies
- **Trigger modes** per sound: Play/Restart, Play/Pause, Play/Stop and **Push-to-Loop** (loop while the key or pointer is held; release stops it — keyboard and mouse).
- **Loop by default** — any sound can start with repeat enabled.
- **Stop other sounds** — a per-sound exclusivity flag that outranks the global overlap setting.
- **Mute other sounds** — temporarily silences every other clip while this one plays; volumes are restored automatically when it ends (also applies to clips started while a muter is active).
- **Mute voice** per sound — always/never/inherit-global microphone muting during playback, reference-counted so overlapping clips release the mic correctly.

### Recording & editing (all local, royalty-free WAV)
- **Microphone recorder** with a live timer and instant "add to current board".
- **Desktop/system audio recorder** (WASAPI loopback on Windows, monitor source on Linux).
- **30-second Instant Replay** — arm once, save the last half minute of desktop audio at any time.
- **In-app trimmer** with an interactive waveform, draggable selection handles and selection preview; saves a trimmed copy next to the original.

### Sound & board organization
- **Rename sounds in-app** (display-name override; files on disk keep their names).
- **Tags** on sounds, searchable alongside names.
- **Custom board icons** for soundboards, shown in the sidebar and move dialog.
- **Manual ordering** — new "Manual (Drag & Drop)" sort mode with per-board persisted order.
- **Move sounds between boards** (single or multi-select), preserving hotkeys, favorites, images, tags and every playback policy.

### Board arranging & whole-board loop (drop 2)
- **Draggable subfolders** — folder tiles can be rearranged anywhere in the grid; the manual arrangement is persisted per board (Tab::folderOrder) and applied at every nesting level.
- **Always-on drag & drop** — sounds and folders are draggable in every sort mode; dropping automatically switches the board to Manual order (with a toast).
- **Whole-board Loop button** in the board toolbar with a three-state cycle:
  - **Click 1 — Looping Board**: plays the board's own sounds top-to-bottom, then repeats.
  - **Click 2 — Looping All Folders**: board sounds first, then every subfolder left-to-right (depth-first; each subfolder's own sounds before its children), then repeats.
  - **Click 3 — off** (stops the current clip).
- The loop follows exactly the arrangement on screen (Manual order included), skips live voice slots (they'd stall the chain), keeps per-sound policies (mute/stop others, voice muting) intact, carries the running clip across the mode switch instead of restarting it, treats manually stopping the current clip as a skip, and is cancelled by Stop All. Broken entries (vanished files) are skipped; if nothing can start, the loop gives up cleanly.

### Live controls, automation & mobile
- **Live voice slots** — soundboard entries can select original, local DSP voice presets (Deep / High / Echo / Robot) instead of playing a file.
- **New global hotkeys**: microphone mute, "hear myself" monitoring, overlay show/hide, overlay position cycle.
- **Now-Playing overlay** — floating, always-on-top, draggable HUD with active sounds and the live voice; eight snap positions.
- **Remote Control** — a local, PIN-protected server (HTTP + WebSocket) served from the running desktop:
  - **Mobile controller page** with QR pairing: full soundboard browsing, customizable button grid, live now-playing, voice presets, mic control and a 10-second voice recorder with preview / share (WAV) / save-to-board.
  - **Automation interface** — enumerate boards and sounds, trigger playback, switch voice presets and upload recordings over a documented JSON protocol.
- **Standalone mobile soundboard** — the controller keeps its pairing and layout on the phone and plays through the desktop's configured outputs.

### Fixes discovered during verification
- Sort-mode dropdown corrupted the UI state (assigned a single tab to the whole tab list).
- Control server: writing to a vanished client crashed the app (SIGPIPE); idle WebSocket connections were dropped after one second; shutdown could hang on the accept thread.
- Windows build: the embedded mobile-controller page exceeded MSVC's 16,380-byte string-literal limit (error C2026); it is now split into adjacent raw-string chunks that the compiler concatenates, so the served page is byte-for-byte identical.
- All new serialization is backward compatible — pre-V2 configuration files load unchanged.
