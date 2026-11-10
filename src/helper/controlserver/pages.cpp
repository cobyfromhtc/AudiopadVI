#include "pages.hpp"

namespace Audiopad::Helpers::Pages
{
    namespace
    {
        //* Both pages are fully self-contained (no external assets, no CDN, no
        //* fonts) so they keep working offline and behind strict LAN setups.
        //* The controller doubles as the standalone mobile soundboard: it keeps
        //* its pairing PIN, grid density and last board in localStorage.

        //* MSVC caps a single string literal at 16,380 bytes (error C2026),
        //* so the page is stored as adjacent raw-string chunks: the compiler
        //* concatenates adjacent literals, so the served bytes are identical.
        //* Keep every chunk below ~16 KB when editing this page.
        const char *kControllerPage = R"apctrl(<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=no">
<meta name="mobile-web-app-capable" content="yes">
<title>Audiopad Remote</title>
<style>
  :root {
    --bg: #0d1017; --panel: #151a24; --panel-2: #1b2130; --border: #262e40;
    --text: #e8ecf4; --muted: #8b95ab; --accent: #e8a33d; --accent-2: #f2c179;
    --danger: #e0564b; --ok: #4fc38a; --radius: 14px;
    --safe-top: env(safe-area-inset-top, 0px); --safe-bottom: env(safe-area-inset-bottom, 0px);
  }
  * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
  html, body { margin: 0; padding: 0; height: 100%; background: var(--bg); color: var(--text);
    font-family: 'Segoe UI', Roboto, system-ui, -apple-system, sans-serif; overscroll-behavior: none; }
  body { display: flex; flex-direction: column; }

  /* ---------- PIN gate ---------- */
  #gate { position: fixed; inset: 0; z-index: 50; display: flex; align-items: center; justify-content: center;
    background: radial-gradient(120% 100% at 50% 0%, #171d2b 0%, var(--bg) 60%); padding: 24px; }
  .gate-card { width: 100%; max-width: 360px; background: var(--panel); border: 1px solid var(--border);
    border-radius: 20px; padding: 28px 24px; text-align: center; box-shadow: 0 24px 60px rgba(0,0,0,.5); }
  .gate-logo { display: flex; gap: 5px; justify-content: center; margin-bottom: 14px; }
  .gate-logo i { display: block; width: 10px; background: var(--accent); border-radius: 5px; }
  .gate-title { font-size: 20px; font-weight: 800; letter-spacing: .4px; }
  .gate-sub { color: var(--muted); font-size: 13px; margin: 6px 0 18px; line-height: 1.5; }
  .gate-input { width: 100%; padding: 14px; font-size: 24px; text-align: center; letter-spacing: 12px;
    border-radius: 12px; border: 1px solid var(--border); background: var(--panel-2); color: var(--text);
    outline: none; font-weight: 700; }
  .gate-input:focus { border-color: var(--accent); }
  .gate-btn { width: 100%; margin-top: 14px; padding: 14px; font-size: 15px; font-weight: 700; border: 0;
    border-radius: 12px; background: var(--accent); color: #1a1204; cursor: pointer; }
  .gate-btn:active { transform: scale(.98); }
  .gate-err { color: var(--danger); font-size: 12px; min-height: 16px; margin-top: 10px; }
  .gate-hint { color: var(--muted); font-size: 11px; margin-top: 12px; line-height: 1.5; }

  /* ---------- App shell ---------- */
  header { position: sticky; top: 0; z-index: 10; display: flex; align-items: center; gap: 10px;
    padding: calc(10px + var(--safe-top)) 14px 10px; background: rgba(13,16,23,.92); backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--border); }
  .brand { display: flex; gap: 4px; align-items: center; margin-right: auto; }
  .brand i { display: block; width: 7px; background: var(--accent); border-radius: 3px; }
  .brand span { font-weight: 800; font-size: 15px; margin-left: 6px; letter-spacing: .3px; }
  .dot { width: 9px; height: 9px; border-radius: 50%; background: var(--danger); }
  .dot.on { background: var(--ok); box-shadow: 0 0 8px var(--ok); }
  .icon-btn { min-width: 44px; min-height: 44px; padding: 0 12px; display: inline-flex; align-items: center;
    justify-content: center; gap: 6px; background: var(--panel-2); color: var(--text); border: 1px solid var(--border);
    border-radius: 12px; font-size: 13px; font-weight: 700; cursor: pointer; user-select: none; }
  .icon-btn.danger { color: #ffb1aa; border-color: #4c2723; background: #2a1a18; }
  .icon-btn.active { border-color: var(--accent); color: var(--accent); }

  .boards { display: flex; gap: 8px; overflow-x: auto; padding: 12px 14px 4px; scrollbar-width: none; }
  .boards::-webkit-scrollbar { display: none; }
  .board-chip { flex: 0 0 auto; padding: 9px 16px; border-radius: 999px; background: var(--panel);
    border: 1px solid var(--border); color: var(--muted); font-size: 13px; font-weight: 700; cursor: pointer;
    display: flex; align-items: center; gap: 8px; }
  .board-chip.active { background: var(--accent); border-color: var(--accent); color: #1a1204; }
  .board-chip img { width: 18px; height: 18px; border-radius: 5px; object-fit: cover; }

  .grid { flex: 1; overflow-y: auto; padding: 10px 14px calc(140px + var(--safe-bottom));
    display: grid; gap: 10px; align-content: start; }
  .sound { position: relative; min-height: 84px; border-radius: var(--radius); overflow: hidden;
    background: var(--panel); border: 1px solid var(--border); cursor: pointer; user-select: none;
    display: flex; flex-direction: column; justify-content: flex-end; }
  .sound:active { transform: scale(.97); }
  .sound .art { position: absolute; inset: 0; background-size: cover; background-position: center; opacity: .85; }
  .sound .label { position: relative; padding: 8px 10px; background: linear-gradient(transparent, rgba(5,7,11,.88) 40%);
    font-size: 12px; font-weight: 700; line-height: 1.3; word-break: break-word; }
  .sound .voice-badge { position: absolute; top: 8px; left: 8px; padding: 3px 8px; border-radius: 999px;
    background: rgba(232,163,61,.92); color: #1a1204; font-size: 10px; font-weight: 800; text-transform: uppercase; }
  .sound .fav { position: absolute; top: 6px; right: 8px; color: var(--accent); font-size: 13px; }
  .sound.playing { border-color: var(--accent); box-shadow: 0 0 0 2px rgba(232,163,61,.35); }
  .sound .bar { position: absolute; left: 0; bottom: 0; height: 3px; background: var(--accent); width: 0%; }
  .sound.paused { opacity: .55; }

  .live-row { display: flex; gap: 8px; overflow-x: auto; padding: 8px 14px 2px; scrollbar-width: none; }
  .live-row::-webkit-scrollbar { display: none; }
  .live-chip { flex: 0 0 auto; padding: 8px 12px; border-radius: 999px; background: var(--panel-2);
    border: 1px solid var(--border); font-size: 12px; font-weight: 700; color: var(--muted); cursor: pointer; }
  .live-chip.active { color: var(--accent); border-color: var(--accent); }
  .live-chip.muted { color: #ffb1aa; border-color: #4c2723; }

  /* ---------- Now playing dock ---------- */
  .dock { position: fixed; left: 12px; right: 12px; bottom: calc(12px + var(--safe-bottom)); z-index: 20;
    background: rgba(21,26,36,.96); border: 1px solid var(--border); border-radius: 16px; padding: 10px 12px;
    backdrop-filter: blur(12px); max-height: 132px; overflow-y: auto; }
  .dock-title { font-size: 10px; letter-spacing: .12em; text-transform: uppercase; color: var(--muted);
    font-weight: 800; margin-bottom: 6px; display: flex; justify-content: space-between; }
  .np { display: flex; align-items: center; gap: 10px; padding: 5px 0; }
  .np-name { font-size: 13px; font-weight: 700; flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .np-track { flex: 1.4; height: 5px; border-radius: 3px; background: #232b3d; overflow: hidden; }
  .np-fill { height: 100%; background: var(--accent); width: 0%; }
  .np-stop { color: var(--danger); font-size: 15px; padding: 6px 10px; cursor: pointer; }
  .dock .empty { color: var(--muted); font-size: 12px; text-align: center; padding: 4px 0; }

  /* ---------- Recorder sheet ---------- */
  #recorder { position: fixed; inset: 0; z-index: 60; display: none; align-items: flex-end; justify-content: center;
    background: rgba(5,7,11,.7); backdrop-filter: blur(4px); }
  #recorder.open { display: flex; }
  .sheet { width: 100%; max-width: 520px; background: var(--panel); border: 1px solid var(--border);
    border-radius: 22px 22px 0 0; padding: 18px 18px calc(20px + var(--safe-bottom)); }
  .sheet h3 { margin: 0 0 4px; font-size: 17px; }
  .sheet p.sub { margin: 0 0 14px; color: var(--muted); font-size: 12px; }
  .presets { display: flex; gap: 8px; margin-bottom: 14px; flex-wrap: wrap; }
  .preset { padding: 9px 14px; border-radius: 999px; background: var(--panel-2); border: 1px solid var(--border);
    color: var(--muted); font-size: 13px; font-weight: 700; cursor: pointer; }
  .preset.active { background: var(--accent); color: #1a1204; border-color: var(--accent); }
  .rec-visual { height: 86px; border-radius: 14px; background: var(--panel-2); border: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center; margin-bottom: 12px; position: relative; overflow: hidden; }
  .rec-time { font-size: 30px; font-weight: 800; letter-spacing: 1px; }
  .rec-time small { font-size: 13px; color: var(--muted); letter-spacing: 0; }
  .rec-meter { position: absolute; left: 0; right: 0; bottom: 0; height: 4px; background: var(--accent); width: 0%; }
  .rec-actions { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; }
  .rec-actions button { padding: 12px 6px; border-radius: 12px; border: 1px solid var(--border);
    background: var(--panel-2); color: var(--text); font-size: 13px; font-weight: 700; cursor: pointer; }
  .rec-actions button:disabled { opacity: .4; }
  .rec-actions .primary { background: var(--accent); color: #1a1204; border-color: var(--accent); }
  .rec-actions .rec { background: var(--danger); color: #fff; border-color: var(--danger); }
  .rec-name { width: 100%; margin-top: 10px; padding: 11px 12px; border-radius: 12px; border: 1px solid var(--border);
    background: var(--panel-2); color: var(--text); font-size: 14px; outline: none; }
  .rec-hint { color: var(--muted); font-size: 11px; margin-top: 8px; text-align: center; }

  .toast { position: fixed; left: 50%; transform: translateX(-50%); bottom: calc(160px + var(--safe-bottom));
    z-index: 80; background: #1f2635; border: 1px solid var(--border); color: var(--text); padding: 10px 16px;
    border-radius: 12px; font-size: 13px; font-weight: 600; opacity: 0; transition: opacity .25s; pointer-events: none; }
  .toast.show { opacity: 1; }
  .cols-pop { position: fixed; top: calc(62px + var(--safe-top)); right: 14px; z-index: 40; background: var(--panel);
    border: 1px solid var(--border); border-radius: 14px; padding: 10px; display: none; }
  .cols-pop.open { display: block; }
  .cols-pop button { display: block; width: 100%; margin: 3px 0; padding: 9px 22px; border-radius: 10px;
    background: var(--panel-2); border: 1px solid var(--border); color: var(--text); font-weight: 700; cursor: pointer; }
  .cols-pop button.active { border-color: var(--accent); color: var(--accent); }
</style>
</head>
<body>

<div id="gate">
  <div class="gate-card">
    <div class="gate-logo"><i style="height:18px"></i><i style="height:34px"></i><i style="height:46px"></i><i style="height:34px"></i><i style="height:18px"></i></div>
    <div class="gate-title">Audiopad Remote</div>
    <div class="gate-sub">Enter the 6-digit PIN shown in the desktop app's <b>Remote Control</b> settings to pair this device.</div>
    <input id="pin" class="gate-input" inputmode="numeric" pattern="[0-9]*" maxlength="6" placeholder="••••••" autocomplete="off">
    <button id="pair" class="gate-btn">Pair with desktop</button>
    <div id="gate-err" class="gate-err"></div>
    <div class="gate-hint">The desktop app shows the PIN together with its address in <b>Settings &rarr; Remote Control</b>.</div>
  </div>
</div>

<header>
  <div class="brand"><i style="height:9px"></i><i style="height:17px"></i><i style="height:24px"></i><i style="height:17px"></i><i style="height:9px"></i><span>Audiopad</span></div>
  <span id="dot" class="dot"></span>
  <button class="icon-btn" id="mic" title="Toggle microphone mute">&#127908;</button>
)apctrl"
            R"apctrl(  <button class="icon-btn" id="hear" title="Hear myself on the desktop">&#128064;</button>
  <button class="icon-btn" id="rec-open" title="Record a voice message">&#11025;</button>
  <button class="icon-btn danger" id="stopall" title="Stop all sounds">&#9632;</button>
  <button class="icon-btn" id="cols" title="Grid density">&#9638;</button>
</header>

<div class="cols-pop" id="cols-pop"></div>
<div class="boards" id="boards"></div>
<div class="live-row" id="live"></div>
<div class="grid" id="grid"></div>

<div class="dock" id="dock">
  <div class="dock-title"><span>Now playing</span><span id="voice-state">Voice: off</span></div>
  <div id="np-list"><div class="empty">Nothing playing — tap a sound</div></div>
</div>

<div id="recorder">
  <div class="sheet">
    <h3>Voice message</h3>
    <p class="sub">Record up to 10 seconds, preview it with the selected filter, share it as a WAV or send it straight into a board.</p>
    <div class="presets" id="presets"></div>
    <div class="rec-visual">
      <div class="rec-time" id="rec-time">0.0<small> / 10.0s</small></div>
      <div class="rec-meter" id="rec-meter"></div>
    </div>
    <div class="rec-actions">
      <button id="rec-start" class="rec">&#9679; Record</button>
      <button id="rec-preview" disabled>&#9654; Preview</button>
      <button id="rec-share" disabled>&#8599; Share</button>
    </div>
    <input class="rec-name" id="rec-name" placeholder="Recording name" value="Voice message">
    <button id="rec-save" class="primary" style="width:100%;margin-top:10px;padding:13px;border:0;border-radius:12px;font-size:14px;font-weight:800;cursor:pointer;" disabled>Save to current board</button>
    <div class="rec-hint">Sharing uses your device's share sheet when available, otherwise the WAV file downloads.</div>
  </div>
</div>

<div class="toast" id="toast"></div>

<script>
(function () {
  'use strict';

  var PIN_KEY = 'audiopad_remote_pin';
  var COLS_KEY = 'audiopad_remote_cols';
  var BOARD_KEY = 'audiopad_remote_board';

  var state = {
    pin: localStorage.getItem(PIN_KEY) || '',
    cols: parseInt(localStorage.getItem(COLS_KEY) || '4', 10),
    boards: [],
    boardId: parseInt(localStorage.getItem(BOARD_KEY) || '', 10) || null,
    playing: {},        // soundId -> { name, readInMs, lengthInMs, paused }
    voicePreset: 'off',
    micMuted: false,
    hearMyself: false,
    ws: null,
    paired: false,
    reconnectTimer: null
  };

  var els = {
    gate: document.getElementById('gate'),
    pin: document.getElementById('pin'),
    pair: document.getElementById('pair'),
    gateErr: document.getElementById('gate-err'),
    dot: document.getElementById('dot'),
    boards: document.getElementById('boards'),
    live: document.getElementById('live'),
    grid: document.getElementById('grid'),
    npList: document.getElementById('np-list'),
    voiceState: document.getElementById('voice-state'),
    mic: document.getElementById('mic'),
    hear: document.getElementById('hear'),
    stopAll: document.getElementById('stopall'),
    cols: document.getElementById('cols'),
    colsPop: document.getElementById('cols-pop'),
    recorder: document.getElementById('recorder'),
    toast: document.getElementById('toast')
  };

  function toast(text) {
    els.toast.textContent = text;
    els.toast.classList.add('show');
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { els.toast.classList.remove('show'); }, 2400);
  }

  function send(message) {
    if (state.ws && state.ws.readyState === 1) {
      state.ws.send(JSON.stringify(message));
    }
  }

  // ---------------- connection ----------------

  function connect(withPin) {
    if (state.reconnectTimer) { clearTimeout(state.reconnectTimer); state.reconnectTimer = null; }
    var proto = location.protocol === 'https:' ? 'wss:' : 'ws:';
    var url = proto + '//' + location.host + '/ws';
    if (withPin) { url += '?pin=' + encodeURIComponent(withPin); }
    try { if (state.ws) { state.ws.onclose = null; state.ws.close(); } } catch (e) {}

    var ws = new WebSocket(url);
    state.ws = ws;
    ws.onopen = function () { els.dot.classList.add('on'); };
    ws.onclose = function () {
      els.dot.classList.remove('on');
      if (state.paired) {
        state.reconnectTimer = setTimeout(function () { connect(state.pin); }, 2000);
      }
    };
    ws.onerror = function () { els.dot.classList.remove('on'); };
    ws.onmessage = function (event) {
      var message;
      try { message = JSON.parse(event.data); } catch (e) { return; }
      handle(message);
    };
  }

  function handle(message) {
    switch (message.type) {
      case 'hello':
        if (!state.paired && !message.requiresAuth) { state.paired = true; }
        break;
      case 'authOk':
        state.paired = true;
        state.pin = els.pin.value.trim() || state.pin;
        localStorage.setItem(PIN_KEY, state.pin);
        els.gate.style.display = 'none';
        send({ type: 'list' });
        send({ type: 'state' });
        break;
      case 'authDenied':
        if (message.closing) {
          state.paired = false;
          els.gate.style.display = 'flex';
          els.gateErr.textContent = 'Too many attempts — the desktop closed the link. Try again.';
        } else {
          els.gateErr.textContent = 'Wrong PIN — check Settings \u2192 Remote Control on the desktop.';
          els.dot.classList.remove('on');
        }
        break;
      case 'boards':
        state.boards = message.boards || [];
        if (state.boardId === null || !state.boards.some(function (b) { return b.id === state.boardId; })) {
          state.boardId = state.boards.length ? state.boards[0].id : null;
        }
        renderBoards();
        renderGrid();
        break;
      case 'state':
        state.playing = {};
        (message.playing || []).forEach(function (entry) {
          state.playing[entry.soundId] = entry;
        });
        state.voicePreset = message.voicePreset || 'off';
        state.micMuted = !!message.micMuted;
        state.hearMyself = !!message.hearMyself;
        renderPlaying();
        renderLive();
        break;
      case 'playing':
        state.playing[message.soundId] = {
          soundId: message.soundId, name: message.name, readInMs: 0, lengthInMs: 0, paused: false
        };
        renderPlaying();
        renderGrid();
        break;
      case 'progress':
        if (state.playing[message.soundId]) {
          state.playing[message.soundId].readInMs = message.readInMs;
          state.playing[message.soundId].lengthInMs = message.lengthInMs;
          state.playing[message.soundId].paused = !!message.paused;
        }
        renderPlaying();
        renderProgress();
        break;
      case 'finished':
        delete state.playing[message.soundId];
        renderPlaying();
        renderGrid();
        break;
      case 'allStopped':
        state.playing = {};
        renderPlaying();
        renderGrid();
        break;
      case 'tabsChanged':
        send({ type: 'list' });
        break;
      case 'voiceChanged':
        state.voicePreset = message.preset || 'off';
        renderLive();
        break;
      case 'micMuteChanged':
        state.micMuted = !!message.muted;
        renderLive();
        break;
      case 'hearMyselfChanged':
        state.hearMyself = !!message.enabled;
        renderLive();
        break;
      case 'uploadResult':
        if (message.ok) { toast('Saved "' + (message.name || 'recording') + '" to the board'); }
        else { toast('Could not save the recording: ' + (message.error || 'unknown error')); }
        break;
    }
  }

  // ---------------- rendering ----------------

  function renderBoards() {
    els.boards.innerHTML = '';
    state.boards.forEach(function (board) {
      var chip = document.createElement('div');
      chip.className = 'board-chip' + (board.id === state.boardId ? ' active' : '');
      var label = document.createElement('span');
      label.textContent = board.name;
      chip.appendChild(label);
      chip.onclick = function () {
        state.boardId = board.id;
        localStorage.setItem(BOARD_KEY, String(board.id));
        renderBoards();
        renderGrid();
      };
      els.boards.appendChild(chip);
    });
  }

  function currentBoard() {
    for (var i = 0; i < state.boards.length; i++) {
      if (state.boards[i].id === state.boardId) return state.boards[i];
    }
    return null;
  }

  function renderGrid() {
    els.grid.innerHTML = '';
    els.grid.style.gridTemplateColumns = 'repeat(' + state.cols + ', minmax(0, 1fr))';
    var board = currentBoard();
    if (!board) return;
    (board.sounds || []).forEach(function (sound) {
      var cell = document.createElement('div');
      var isPlaying = !!state.playing[sound.id];
      cell.className = 'sound' + (isPlaying ? ' playing' : '');

      if (sound.hasImage) {
        var art = document.createElement('div');
        art.className = 'art';
        art.style.backgroundImage = 'url(/api/image/' + sound.id + '?pin=' + encodeURIComponent(state.pin) + ')';
        cell.appendChild(art);
      }
      if (sound.voicePreset) {
        var badge = document.createElement('div');
        badge.className = 'voice-badge';
        badge.textContent = sound.voicePreset;
        cell.appendChild(badge);
      }
      if (sound.favorite) {
        var fav = document.createElement('div');
        fav.className = 'fav';
        fav.textContent = '\u2605';
        cell.appendChild(fav);
      }
      var label = document.createElement('div');
      label.className = 'label';
      label.textContent = sound.name;
      cell.appendChild(label);
      if (isPlaying) {
        var bar = document.createElement('div');
        bar.className = 'bar';
        bar.id = 'bar-' + sound.id;
        cell.appendChild(bar);
      }

      cell.onclick = function () {
        var entry = state.playing[sound.id];
        if (entry && entry.paused) { send({ type: 'play', soundId: sound.id }); return; }
        send({ type: 'play', soundId: sound.id });
        cell.classList.add('playing');
      };
      els.grid.appendChild(cell);
    });
  }

  function renderProgress() {
    Object.keys(state.playing).forEach(function (id) {
      var entry = state.playing[id];
      var bar = document.getElementById('bar-' + id);
      if (bar && entry.lengthInMs > 0) {
        bar.style.width = Math.min(100, (entry.readInMs / entry.lengthInMs) * 100) + '%';
      }
    });
  }

  function renderPlaying() {
    var ids = Object.keys(state.playing);
    els.voiceState.textContent = 'Voice: ' + state.voicePreset;
    if (!ids.length) {
      els.npList.innerHTML = '<div class="empty">Nothing playing — tap a sound</div>';
      return;
    }
    els.npList.innerHTML = '';
    ids.forEach(function (id) {
      var entry = state.playing[id];
      var row = document.createElement('div');
      row.className = 'np';
      var name = document.createElement('div');
      name.className = 'np-name';
      name.textContent = (entry.paused ? '\u23F8 ' : '') + (entry.name || 'Sound');
      var track = document.createElement('div');
      track.className = 'np-track';
      var fill = document.createElement('div');
      fill.className = 'np-fill';
      if (entry.lengthInMs > 0) fill.style.width = Math.min(100, (entry.readInMs / entry.lengthInMs) * 100) + '%';
      track.appendChild(fill);
      var stop = document.createElement('div');
      stop.className = 'np-stop';
)apctrl"
            R"apctrl(      stop.textContent = '\u25A0';
      stop.onclick = function () { send({ type: 'stop', soundId: parseInt(id, 10) }); };
      row.appendChild(name);
      row.appendChild(track);
      row.appendChild(stop);
      els.npList.appendChild(row);
    });
  }

  var presets = ['off', 'deep', 'high', 'echo', 'robot'];
  function renderLive() {
    els.live.innerHTML = '';
    presets.forEach(function (preset) {
      var chip = document.createElement('div');
      chip.className = 'live-chip' + (state.voicePreset === preset ? ' active' : '');
      chip.textContent = preset === 'off' ? 'Voice off' : preset;
      chip.onclick = function () { send({ type: 'voice', preset: preset }); };
      els.live.appendChild(chip);
    });
    els.mic.classList.toggle('active', state.micMuted);
    els.mic.style.opacity = state.micMuted ? '1' : '';
    els.hear.classList.toggle('active', state.hearMyself);
  }

  function renderCols() {
    els.colsPop.innerHTML = '';
    [2, 3, 4, 5, 6].forEach(function (cols) {
      var button = document.createElement('button');
      button.textContent = cols + ' columns';
      if (state.cols === cols) button.className = 'active';
      button.onclick = function () {
        state.cols = cols;
        localStorage.setItem(COLS_KEY, String(cols));
        renderGrid();
        renderCols();
        els.colsPop.classList.remove('open');
      };
      els.colsPop.appendChild(button);
    });
  }

  // ---------------- header controls ----------------

  els.stopAll.onclick = function () { send({ type: 'stopAll' }); };
  els.mic.onclick = function () { send({ type: 'micMute' }); };
  els.hear.onclick = function () { send({ type: 'hearMyself' }); };
  els.cols.onclick = function () { els.colsPop.classList.toggle('open'); };
  document.addEventListener('click', function (event) {
    if (!event.target.closest('#cols-pop') && !event.target.closest('#cols')) {
      els.colsPop.classList.remove('open');
    }
  });

  // ---------------- recorder ----------------

  var rec = {
    preset: 'off',
    recording: false,
    chunks: [],
    audioCtx: null,
    processor: null,
    stream: null,
    source: null,
    startTime: 0,
    timer: null,
    wavBlob: null,
    wavUrl: null,
    preview: null,
    maxMs: 10000
  };

  var presetList = ['off', 'deep', 'high', 'echo', 'robot'];
  var presetRow = document.getElementById('presets');
  presetList.forEach(function (preset) {
    var button = document.createElement('div');
    button.className = 'preset' + (preset === 'off' ? ' active' : '');
    button.textContent = preset === 'off' ? 'No filter' : preset;
    button.onclick = function () {
      rec.preset = preset;
      Array.prototype.forEach.call(presetRow.children, function (child) { child.classList.remove('active'); });
      button.classList.add('active');
      if (rec.wavBlob) { applyPresetAndEncode(); }
    };
    presetRow.appendChild(button);
  });

  document.getElementById('rec-open').onclick = function () {
    els.recorder.classList.add('open');
  };
  els.recorder.addEventListener('click', function (event) {
    if (event.target === els.recorder) els.recorder.classList.remove('open');
  });

  var recStart = document.getElementById('rec-start');
  var recPreview = document.getElementById('rec-preview');
  var recShare = document.getElementById('rec-share');
  var recSave = document.getElementById('rec-save');
  var recTime = document.getElementById('rec-time');
  var recMeter = document.getElementById('rec-meter');

  recStart.onclick = function () { if (rec.recording) stopRecording(); else startRecording(); };
  recPreview.onclick = function () {
    if (rec.wavUrl) {
      if (rec.preview) { rec.preview.pause(); }
      rec.preview = new Audio(rec.wavUrl);
      rec.preview.play();
    }
  };
  recShare.onclick = function () {
    if (!rec.wavBlob) return;
    var name = (document.getElementById('rec-name').value || 'voice-message') + '.wav';
    var file = new File([rec.wavBlob], name, { type: 'audio/wav' });
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      navigator.share({ files: [file], title: name }).catch(function () {});
    } else {
      var link = document.createElement('a');
      link.href = rec.wavUrl;
      link.download = name;
      link.click();
      toast('Share sheet unavailable — the WAV file downloads instead');
    }
  };
  recSave.onclick = function () {
    if (!rec.wavBlob || state.boardId === null) return;
    var reader = new FileReader();
    reader.onload = function () {
      var base64 = String(reader.result).split(',')[1] || '';
      send({
        type: 'upload',
        boardId: state.boardId,
        name: document.getElementById('rec-name').value || 'Voice message',
        data: base64
      });
    };
    reader.readAsDataURL(rec.wavBlob);
  };

  function startRecording() {
    navigator.mediaDevices.getUserMedia({ audio: true }).then(function (stream) {
      rec.recording = true;
      rec.chunks = [];
      rec.stream = stream;
      rec.audioCtx = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 48000 });
      rec.source = rec.audioCtx.createMediaStreamSource(stream);
      rec.processor = rec.audioCtx.createScriptProcessor(4096, 1, 1);
      rec.processor.onaudioprocess = function (event) {
        if (!rec.recording) return;
        var input = event.inputBuffer.getChannelData(0);
        rec.chunks.push(new Float32Array(input));
        var elapsed = (performance.now() - rec.startTime) / 1000;
        if (elapsed * 1000 >= rec.maxMs) stopRecording();
      };
      rec.source.connect(rec.processor);
      rec.processor.connect(rec.audioCtx.destination);
      rec.startTime = performance.now();
      recStart.innerHTML = '&#9632; Stop';
      recStart.classList.remove('rec');
      recTime.innerHTML = '0.0<small> / 10.0s</small>';
      rec.timer = setInterval(function () {
        var elapsed = Math.min(10, (performance.now() - rec.startTime) / 1000);
        recTime.innerHTML = elapsed.toFixed(1) + '<small> / 10.0s</small>';
        recMeter.style.width = (elapsed / 10 * 100) + '%';
      }, 100);
    }).catch(function () {
      toast('Microphone access was denied');
    });
  }

  function stopRecording() {
    if (!rec.recording) return;
    rec.recording = false;
    recStart.innerHTML = '&#9679; Record';
    recStart.classList.add('rec');
    clearInterval(rec.timer);
    try { rec.processor.disconnect(); rec.source.disconnect(); } catch (e) {}
    if (rec.stream) rec.stream.getTracks().forEach(function (track) { track.stop(); });
    if (rec.audioCtx) { rec.audioCtx.close().catch(function () {}); rec.audioCtx = null; }
    applyPresetAndEncode();
  }

  function collectSamples() {
    var total = 0;
    rec.chunks.forEach(function (chunk) { total += chunk.length; });
    var samples = new Float32Array(total);
    var offset = 0;
    rec.chunks.forEach(function (chunk) { samples.set(chunk, offset); offset += chunk.length; });
    return samples;
  }

  //* The same original, local DSP chains the desktop voice slots use.
  function applyPreset(samples, sampleRate, preset) {
    if (preset === 'off') return samples;

    if (preset === 'echo') {
      var out = new Float32Array(samples.length);
      var delay = Math.floor(sampleRate * 0.3);
      for (var i = 0; i < samples.length; i++) {
        var wet = i >= delay ? out[i - delay] : 0;
        out[i] = samples[i] * 0.85 + wet * 0.45;
      }
      return out;
    }
    if (preset === 'robot') {
      var robot = new Float32Array(samples.length);
      for (var r = 0; r < samples.length; r++) {
        var carrier = Math.sin(2 * Math.PI * 50 * r / sampleRate);
        robot[r] = samples[r] * 0.25 + samples[r] * carrier * 0.85;
      }
      return robot;
    }

    //* Granular pitch shift (deep = 0.8, high = 1.25).
    var ratio = preset === 'deep' ? 0.8 : 1.25;
    var window = Math.floor(sampleRate * 0.064);
    var buffer = new Float32Array(window);
    var writeIndex = 0;
    var readPosition = 0;
    var shifted = new Float32Array(samples.length);
    for (var s = 0; s < samples.length; s++) {
      buffer[writeIndex] = samples[s];
      var indexA = Math.floor(readPosition) % window;
      var indexB = (indexA + Math.floor(window / 2)) % window;
      var frac = readPosition - Math.floor(readPosition);
      var fadeA = Math.sin(Math.PI * (readPosition % window) / window);
      var fadeB = Math.cos(Math.PI * (readPosition % window) / window);
      var a = buffer[indexA] + (buffer[(indexA + 1) % window] - buffer[indexA]) * frac;
      var b = buffer[indexB] + (buffer[(indexB + 1) % window] - buffer[indexB]) * frac;
      shifted[s] = a * fadeA + b * fadeB;
      writeIndex = (writeIndex + 1) % window;
      readPosition += ratio;
      while (readPosition >= window) readPosition -= window;
    }
    return shifted;
  }

  function encodeWav(samples, sampleRate) {
    var buffer = new ArrayBuffer(44 + samples.length * 2);
    var view = new DataView(buffer);
    var writeString = function (offset, text) {
      for (var i = 0; i < text.length; i++) view.setUint8(offset + i, text.charCodeAt(i));
    };
    writeString(0, 'RIFF');
    view.setUint32(4, 36 + samples.length * 2, true);
    writeString(8, 'WAVE');
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, 1, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);
    writeString(36, 'data');
    view.setUint32(40, samples.length * 2, true);
    var offset = 44;
    for (var i = 0; i < samples.length; i++, offset += 2) {
      var clamped = Math.max(-1, Math.min(1, samples[i]));
      view.setInt16(offset, clamped < 0 ? clamped * 0x8000 : clamped * 0x7fff, true);
    }
    return new Blob([view], { type: 'audio/wav' });
  }

  function applyPresetAndEncode() {
    var samples = collectSamples();
    if (!samples.length) { toast('Nothing recorded'); return; }
    var sampleRate = 48000;
    var processed = applyPreset(samples, sampleRate, rec.preset);
    rec.wavBlob = encodeWav(processed, sampleRate);
    if (rec.wavUrl) URL.revokeObjectURL(rec.wavUrl);
    rec.wavUrl = URL.createObjectURL(rec.wavBlob);
    recPreview.disabled = false;
    recShare.disabled = false;
    recSave.disabled = state.boardId === null;
    recMeter.style.width = '100%';
    toast('Recording ready — preview, share or save it');
  }

  // ---------------- boot ----------------

  renderCols();
  renderLive();
  if (state.pin) {
    els.pin.value = state.pin;
    connect(state.pin);
    setTimeout(function () {
      if (!state.paired) { els.gate.style.display = 'flex'; }
    }, 2500);
  }
  els.pair.onclick = function () {
    var pin = els.pin.value.trim();
    if (pin.length !== 6) { els.gateErr.textContent = 'The PIN has 6 digits.'; return; }
    els.gateErr.textContent = '';
    connect(pin);
  };
  els.pin.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') els.pair.onclick();
  });
})();
</script>
</body>
</html>)apctrl";;

        const char *kOverlayPage = R"apovl(<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Audiopad Overlay</title>
<style>
  * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
  html, body { margin: 0; padding: 0; height: 100%; overflow: hidden; user-select: none;
    background: rgba(10, 12, 18, 0.92); color: #e8ecf4;
    font-family: 'Segoe UI', Roboto, system-ui, -apple-system, sans-serif; }
  #hud { height: 100%; display: flex; flex-direction: column; padding: 10px 14px 12px; cursor: grab; }
  #hud.dragging { cursor: grabbing; }
  .row { display: flex; align-items: center; gap: 10px; }
  .head { display: flex; align-items: center; margin-bottom: 8px; }
  .title { font-size: 10px; font-weight: 800; letter-spacing: 0.16em; color: #8b95ab; text-transform: uppercase; flex: 1; }
  .pill { padding: 2px 9px; border-radius: 999px; font-size: 10px; font-weight: 800; text-transform: uppercase; }
  .pill.voice { background: rgba(232,163,61,.15); color: #f2c179; border: 1px solid rgba(232,163,61,.4); }
  .pill.mic { background: rgba(224,86,75,.12); color: #ff9d94; border: 1px solid rgba(224,86,75,.4); }
  .pill.mic.on { background: rgba(79,195,138,.12); color: #7fdcae; border-color: rgba(79,195,138,.4); }
  #close { width: 22px; height: 22px; border: 0; border-radius: 7px; background: rgba(255,255,255,.06);
    color: #8b95ab; font-size: 12px; cursor: pointer; line-height: 1; }
  #close:hover { background: rgba(255,255,255,.14); color: #fff; }
  .tracks { flex: 1; display: flex; flex-direction: column; justify-content: center; gap: 8px; min-height: 0; }
  .track { padding: 7px 10px; border-radius: 10px; background: rgba(255,255,255,.04);
    border: 1px solid rgba(255,255,255,.07); }
  .track .name { font-size: 12px; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .track .bar { margin-top: 5px; height: 4px; border-radius: 2px; background: rgba(255,255,255,.09); overflow: hidden; }
  .track .fill { height: 100%; width: 0%; background: #e8a33d; }
  .track.paused .name { color: #8b95ab; }
  .track.paused .fill { background: #8b95ab; }
  .empty { color: #5d6678; font-size: 11px; text-align: center; font-weight: 600; }
</style>
</head>
<body>
<div id="hud">
  <div class="head">
    <span class="title">Now Playing</span>
    <span class="pill voice" id="voice" style="display:none"></span>
    <span class="pill mic" id="mic" style="display:none"></span>
    <button id="close" title="Hide the overlay">&#10005;</button>
  </div>
  <div class="tracks" id="tracks"><div class="empty">No active sounds</div></div>
</div>
<script>
(function () {
  'use strict';
  var params = new URLSearchParams(location.search);
  var pin = params.get('pin') || '';
  var playing = {};

  var hud = document.getElementById('hud');
  var tracks = document.getElementById('tracks');
  var voice = document.getElementById('voice');
  var mic = document.getElementById('mic');

  document.getElementById('close').onclick = function () {
    if (window.overlayClose) window.overlayClose();
  };

  //* The whole HUD doubles as the drag handle — presses anywhere move the
  //* overlay window through the native binding the desktop exposed.
  hud.addEventListener('pointerdown', function () {
    if (window.overlayDrag) window.overlayDrag();
  });

  function connect() {
    var proto = location.protocol === 'https:' ? 'wss:' : 'ws:';
    var ws = new WebSocket(proto + '//' + location.host + '/ws?pin=' + encodeURIComponent(pin));
    ws.onmessage = function (event) {
      var message;
      try { message = JSON.parse(event.data); } catch (e) { return; }
      if (message.type === 'playing') {
        playing[message.soundId] = { name: message.name, readInMs: 0, lengthInMs: 0, paused: false };
        render();
      } else if (message.type === 'progress') {
        if (playing[message.soundId]) {
          playing[message.soundId].readInMs = message.readInMs;
          playing[message.soundId].lengthInMs = message.lengthInMs;
          playing[message.soundId].paused = !!message.paused;
          render();
        }
      } else if (message.type === 'finished') {
        delete playing[message.soundId];
        render();
      } else if (message.type === 'allStopped') {
        playing = {};
        render();
      } else if (message.type === 'state') {
        playing = {};
        (message.playing || []).forEach(function (entry) { playing[entry.soundId] = entry; });
        setPills(message.voicePreset, message.micMuted);
        render();
      } else if (message.type === 'voiceChanged') {
        setPills(message.preset, null);
      } else if (message.type === 'micMuteChanged') {
        setPills(null, message.muted);
      }
    };
    ws.onclose = function () { setTimeout(connect, 2000); };
  }

  function setPills(preset, muted) {
    if (preset !== null && preset !== undefined) {
      voice.style.display = preset && preset !== 'off' ? '' : 'none';
      voice.textContent = preset;
    }
    if (muted !== null && muted !== undefined) {
      mic.style.display = '';
      mic.className = 'pill mic' + (muted ? '' : ' on');
      mic.textContent = muted ? 'Mic muted' : 'Mic live';
    }
  }

  function render() {
    var ids = Object.keys(playing);
    tracks.innerHTML = '';
    if (!ids.length) {
      tracks.innerHTML = '<div class="empty">No active sounds</div>';
      return;
    }
    ids.slice(0, 3).forEach(function (id) {
      var entry = playing[id];
      var track = document.createElement('div');
      track.className = 'track' + (entry.paused ? ' paused' : '');
      var name = document.createElement('div');
      name.className = 'name';
      name.textContent = (entry.paused ? '\u23F8 ' : '\u25B6 ') + (entry.name || 'Sound');
      var bar = document.createElement('div');
      bar.className = 'bar';
      var fill = document.createElement('div');
      fill.className = 'fill';
      if (entry.lengthInMs > 0) fill.style.width = Math.min(100, entry.readInMs / entry.lengthInMs * 100) + '%';
      bar.appendChild(fill);
      track.appendChild(name);
      track.appendChild(bar);
      tracks.appendChild(track);
    });
  }

  connect();
})();
</script>
</body>
</html>)apovl";
    } // namespace

    std::string controllerPage()
    {
        return kControllerPage;
    }

    std::string overlayPage()
    {
        return kOverlayPage;
    }
} // namespace Audiopad::Helpers::Pages
