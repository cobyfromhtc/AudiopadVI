// --- Vector SVG Icons (Desktop Soundboard Aesthetics) ---
const icons = {
  logo: `<svg viewBox="0 0 512 512" width="18" height="18" fill="none"><g fill="currentColor"><rect x="72" y="213" width="51" height="85" rx="25"/><rect x="154" y="149" width="51" height="213" rx="25"/><rect x="236" y="64" width="51" height="384" rx="25"/><rect x="318" y="149" width="51" height="213" rx="25"/><rect x="400" y="213" width="51" height="85" rx="25"/></g></svg>`,
  folder: `<svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>`,
  folderOpen: `<svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path><path d="M2 10h20"></path></svg>`,
  favorites: `<svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`,
  settings: `<svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>`,
  systemInfo: `<svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>`,
  help: `<svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
  play: `<svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" stroke-width="2.5" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`,
  stop: `<svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" stroke-width="2.5" fill="currentColor"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect></svg>`,
  plus: `<svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>`,
  trash: `<svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>`,
  close: `<svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`,
  volume: `<svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`,
  search: `<svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`,
  openLink: `<svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>`,
  repeat: `<svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14M7 23 3 19 7 15"></path><path d="M21 13v2a4 4 0 0 1-4 4H3"></path></svg>`,
  pause: `<svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" stroke-width="2.5" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>`,
  spinner: `<svg class="spin-loader" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>`,
  music: `<svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>`,
  list: `<svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>`,
  grid: `<svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>`,
  deck: `<svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"></rect><rect x="14" y="3" width="7" height="7" rx="1.5"></rect><rect x="3" y="14" width="7" height="7" rx="1.5"></rect><rect x="14" y="14" width="7" height="7" rx="1.5"></rect></svg>`,
  table: `<svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="3" y1="15" x2="21" y2="15"></line><line x1="9" y1="3" x2="9" y2="21"></line></svg>`,
  soundpad: `<svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line><line x1="15" y1="3" x2="15" y2="21"></line><line x1="3" y1="9" x2="21" y2="9"></line><line x1="3" y1="15" x2="21" y2="15"></line></svg>`,
  image: `<svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>`,
  link: `<svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>`,
  headphones: `<svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>`,
  mic: `<svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>`,
  sun: `<svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`,
  moon: `<svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`,
  bolt: `<svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`,
  target: `<svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>`,
  monitor: `<svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>`,
  importIcon: `<svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>`,
  home: `<svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`,
  chevronRight: `<svg viewBox="0 0 24 24" width="11" height="11" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>`,
  refresh: `<svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>`,
  boltSmall: `<svg viewBox="0 0 24 24" width="9" height="9" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`,
  chevron: `<svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>`,
  folderPlus: `<svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2v1"></path><line x1="18" y1="9" x2="18" y2="15"></line><line x1="15" y1="12" x2="21" y2="12"></line></svg>`,
  pencil: `<svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>`,
  palette: `<svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r="1.5"></circle><circle cx="17.5" cy="10.5" r="1.5"></circle><circle cx="8.5" cy="7.5" r="1.5"></circle><circle cx="6.5" cy="12.5" r="1.5"></circle><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"></path></svg>`,
  winMinimize: `<svg viewBox="0 0 10 10" width="10" height="10" shape-rendering="crispEdges"><rect x="1" y="4.5" width="8" height="1" fill="currentColor"></rect></svg>`,
  winMaximize: `<svg viewBox="0 0 10 10" width="10" height="10" shape-rendering="crispEdges" fill="none"><rect x="1.5" y="1.5" width="7" height="7" stroke="currentColor" stroke-width="1"></rect></svg>`,
  winRestore: `<svg viewBox="0 0 10 10" width="10" height="10" shape-rendering="crispEdges" fill="none"><rect x="0.5" y="2.5" width="6" height="6" stroke="currentColor" stroke-width="1"></rect><path d="M2.5 2.5 V0.5 H8.5 V6.5 H6.5" stroke="currentColor" stroke-width="1" fill="none"></path></svg>`,
  winClose: `<svg viewBox="0 0 10 10" width="10" height="10" shape-rendering="crispEdges" stroke="currentColor" stroke-width="1.1"><path d="M1 1 L9 9 M9 1 L1 9"></path></svg>`
};

// --- Application Reactive State ---
let state = {
  tabs: [],
  activeTabId: null,
  currentView: 'folder', // 'folder', 'favorites', 'settings', 'system-info', 'help'
  searchQuery: '',
  listViewMode: 'grid', // 'grid' (Media Grid), 'deck' (Stream Deck Macro Tiles), 'table' (High-density Table)
  activeVolumePopoverSoundId: null,
  hoveredVolumeSoundId: null,
  isMasterVolumeOpen: false,
  isMasterVolumeHovered: false,

  selectedSoundIds: [], // Track sounds selected via Ctrl+Click in active view

  //* Nested folder navigation inside the active category: chain of folder ids
  //* from the category root down to the folder the user is currently browsing.
  activeFolderPath: [],

  contextMenu: {
    visible: false,
    x: 0,
    y: 0,
    soundId: null
  },
  multiImageModal: {
    visible: false,
    selectedSoundIds: [],
    imageDataUrl: ''
  },

  recordingHotkeySoundId: null,
  recordedKeys: [],
  recordedKeyNames: '',
  recordingTarget: null, // 'sound', 'stop', 'ptt'

  newFolderModal: {
    visible: false,
    tabId: null,
    parentFolderId: null,
    name: '',
    isCreating: false
  },
  isImportingFolder: false,

  //* Import Confirmation: shown when exactly one folder (and nothing else) is
  //* being imported — the user decides whether the parent folder is kept as a
  //* wrapper or only its contents are imported.
  importConfirmModal: {
    visible: false,
    source: '',
    folderName: '',
    tabId: null,
    parentFolderId: 0, //* destination subfolder for drag & drop imports (0 = category root)
    isDrop: false
  },

  settings: {
    theme: 0,
    syncVolumes: false,
    allowMultipleOutputs: false,
    useAsDefaultDevice: false,
    muteDuringPlayback: false,
    allowOverlapping: true,
    minimizeToTray: false,
    tabHotkeysOnly: false,
    deleteToTrash: true,
    localVolume: 50,
    remoteVolume: 100,
    soundBoost: 100,
    pushToTalkKeys: [],
    stopHotkey: [],
    outputs: [],
    targetWindow: null
  },

  //* Target Window picker state: currently open application windows.
  openWindows: [],
  isLoadingWindows: false,

  //* Sidebar categories: an ordered list of named sections, each holding its own
  //* ordered list of folders (tab paths). Keyed by tab *path* (stable across
  //* re-orders) and persisted in localStorage — structured so drag-and-drop
  //* reordering of categories can be layered on top later.
  sidebarCategories: [],
  isDraggingSidebar: null, // { type: 'tab', tabId, path }
  sidebarDragStartedAt: 0,

  //* Resizable sidebar (px). Persisted in localStorage, clamped to sane bounds.
  sidebarWidth: 216,
  isResizingSidebar: false,
  sidebarResizeStartedAt: 0,

  //* Sidebar category editing: which category header currently has its inline
  //* rename input open, plus the modal states for creating a new folder (with a
  //* category picker step) and creating a brand-new category section.
  editingCategoryId: null,
  renameTabModal: { visible: false, tabId: null, name: '' },
  newSidebarFolderModal: { visible: false, step: 'name', name: '', targetCategoryId: null, isCreating: false },
  newSidebarCategoryModal: { visible: false, name: '', isCreating: false },
  
  isLinux: false,
  isElevated: false,
  isVBCableInstalled: false,
  isVBCableSetup: false,
  dismissedVBCablePrompt: false,
  isCheckingVBCable: false,
  outputDevices: [],
  playbackApps: [],
  recordingDevices: [],
  selectedMic: null,
  systemInfo: '',
  
  playingSounds: {}, // Maps sound.id -> PlayingSound details
  currentPlayingSoundId: null,
  isDraggingSeekbar: false,
  dragSeekPosition: 0,

  //* Stop-bookkeeping for the stale-event guard: the native audio thread posts
  //* progress callbacks (window.updateSound) asynchronously, so an update that
  //* was queued just before a stop can land AFTER the JS state was cleared —
  //* resurrecting a stopped sound as a ghost "playing" entry (frozen progress,
  //* indicator stuck on until a second Escape). Every stop records a timestamp
  //* and untracked updates arriving within the grace window are dropped.
  lastStopAllAt: 0,
  lastStopAt: 0,

  //* Playback dock volume: a single slider shared by two modes. The toggle
  //* decides which one it controls — 'local' (only you hear the change) or
  //* 'remote' (everybody else hears the change). Persisted in localStorage.
  dockVolumeMode: 'local',

  //* Custom topbar: whether the native window is currently maximized (drives
  //* the maximize/restore toggle icon). Linux keeps its native titlebar, so the
  //* window controls and the drag region stay disabled there.
  isWindowMaximized: false,

  toasts: []
};

let isInitializing = false;
let isInitialized = false;

// --- Initial Setup & Bindings Sync ---
async function init() {
  if (isInitializing || isInitialized) return;
  isInitializing = true;

  try {
    // Wait until C++ bindings are fully loaded onto window (with timeout)
    let attempts = 0;
    while (!window.getTabs || !window.getSettings || !window.isLinux) {
      await new Promise(r => setTimeout(r, 50));
      attempts++;
      if (attempts > 100) {
        console.warn("Backend bindings timed out, proceeding with defaults");
        break;
      }
    }

    // Hide Vuetify default container completely
    const defaultApp = document.getElementById('app');
    if (defaultApp) {
      defaultApp.style.display = 'none';
    }

    // Create our custom layout container if not present
    let customApp = document.getElementById('custom-app');
    if (!customApp) {
      customApp = document.createElement('div');
      customApp.id = 'custom-app';
      document.body.appendChild(customApp);
    }

    // The host element survives every renderApp() innerHTML swap, so the
    // shell-level drag handler is bound exactly once here: presses on the
    // empty canvas gutters around the floating panels keep moving the
    // frameless window (see handleShellBackgroundPointerDown).
    if (!customApp.dataset.shellDragBound) {
      customApp.addEventListener('pointerdown', handleShellBackgroundPointerDown);
      customApp.dataset.shellDragBound = '1';
    }

    // Sync basic states from backend
    if (window.isLinux) {
      try {
        state.isLinux = await window.isLinux();
      } catch (e) {
        console.warn("Failed to query isLinux:", e);
      }
    }

    // Custom topbar: query the initial maximize state and keep it in sync with
    // window resizes (snap layouts, Win+Up/Down, taskbar toggles).
    await refreshMaximizedState();
    window.addEventListener('resize', () => {
      refreshMaximizedState();
    });
    if (window.getTabs) {
      try {
        state.tabs = (await window.getTabs()) || [];
        if (state.tabs && state.tabs.length > 0) {
          state.activeTabId = state.tabs[0].id;
        }
      } catch (e) {
        console.warn("Failed to query getTabs:", e);
      }
    }

    // Restore the sidebar category sections (names + their folders) from localStorage
    loadSidebarCategories();
    // Restore user-preferred sidebar width (resizable via the drag handle)
    loadSidebarWidth();
    // Restore the dock volume mode toggle (Local / Remote)
    loadDockVolumeMode();

    if (window.getSettings) {
      try {
        const savedSettings = await window.getSettings();
        if (savedSettings) {
          state.settings = { ...state.settings, ...savedSettings };
          applyThemeStyles();
        }
      } catch (e) {
        console.warn("Failed to query getSettings:", e);
      }
    }

    // Determine initial view mode: localStorage override > savedSettings > default 'grid'
    const localSavedMode = localStorage.getItem('audiopad_view_mode');
    if (localSavedMode && ['grid', 'deck', 'table'].includes(localSavedMode)) {
      state.listViewMode = localSavedMode;
    } else if (state.settings && state.settings.viewMode !== undefined) {
      if (state.settings.viewMode === 0) state.listViewMode = 'table';
      else if (state.settings.viewMode === 2) state.listViewMode = 'deck';
      else state.listViewMode = 'grid';
    } else {
      state.listViewMode = 'grid';
    }

    // Load output and recording devices for selectors on startup
    if (window.getOutputs) {
      try {
        state.outputDevices = (await window.getOutputs()) || [];
      } catch (e) {
        console.warn("Failed to query getOutputs:", e);
      }
    }

    // Load currently open application windows for the Target Window picker
    await refreshOpenWindows(false);
    if (window.isElevated) {
      try {
        state.isElevated = await window.isElevated();
      } catch (e) {
        console.warn("Failed to query isElevated:", e);
      }
    }
    if (!state.isLinux) {
      if (window.getRecordingDevices) {
        try {
          const recData = await window.getRecordingDevices();
          if (recData) {
            state.recordingDevices = Array.isArray(recData) ? (recData[0] || []) : (recData.first || recData.devices || []);
            state.selectedMic = Array.isArray(recData) ? (recData[1] || null) : (recData.second || recData.selected || null);
          }
        } catch (e) {
          console.warn("Failed to query getRecordingDevices:", e);
        }
      }
      if (window.isVBCableProperlySetup) {
        try {
          state.isVBCableSetup = await window.isVBCableProperlySetup();
        } catch (e) {
          console.warn("Failed to query isVBCableProperlySetup:", e);
        }
      }
      if (window.isVBCableInstalled) {
        try {
          state.isVBCableInstalled = await window.isVBCableInstalled();
        } catch (e) {
          console.warn("Failed to query isVBCableInstalled:", e);
        }
      }
    }

    // Load system theme overrides
    applyThemeStyles();

    // Listen for OS light/dark changes when theme mode is set to Follow System (0)
    if (window.matchMedia) {
      try {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
          if (state.settings.theme === 0) {
            applyThemeStyles();
            renderApp();
          }
        });
      } catch (e) {}
    }

    // Attach global keyboard listeners (for hotkey recording overlays)
    window.addEventListener('keydown', handleGlobalKeydown);

    // Global pointerup/mouseup listener to release slider drag lock
    window.addEventListener('pointerup', () => {
      if (isDraggingSlider) {
        isDraggingSlider = false;
        if (state.hoveredVolumeSoundId !== null && state.activeVolumePopoverSoundId === null) {
          handleVolumeMouseLeave(state.hoveredVolumeSoundId, null);
        }
        if (state.isMasterVolumeHovered && !state.isMasterVolumeOpen) {
          handleMasterVolumeMouseLeave(null);
        }
      }
    });
    window.addEventListener('mouseup', () => {
      if (isDraggingSlider) {
        isDraggingSlider = false;
        if (state.hoveredVolumeSoundId !== null && state.activeVolumePopoverSoundId === null) {
          handleVolumeMouseLeave(state.hoveredVolumeSoundId, null);
        }
        if (state.isMasterVolumeHovered && !state.isMasterVolumeOpen) {
          handleMasterVolumeMouseLeave(null);
        }
      }
    });

    // Global safety net: always clean up sidebar drag state, even if the source element
    // was removed from the DOM by a re-render in the middle of a drag operation.
    document.addEventListener('dragend', handleSidebarDragEnd);

    // Window blur listener to release any drag lock immediately
    window.addEventListener('blur', () => {
      cleanupScrubberDrag();
    });

    // Click-outside listener to dismiss volume popovers and context menu
    document.addEventListener('click', (e) => {
      let shouldRender = false;
      if (state.contextMenu && state.contextMenu.visible && !e.target.closest('.custom-context-menu')) {
        state.contextMenu.visible = false;
        shouldRender = true;
      }
      if (!e.target.closest('.volume-popover-container')) {
        if (state.activeVolumePopoverSoundId !== null || state.isMasterVolumeOpen) {
          state.activeVolumePopoverSoundId = null;
          state.isMasterVolumeOpen = false;
          shouldRender = true;
        }
      }
      if (shouldRender) {
        renderApp();
      }
    });

    // Hook C++ callbacks to update our state dynamically
    bindCppCallbacks();

    // Load initial view
    isInitialized = true;
    renderApp();

    // Poll directories and tabs configuration changes from backend using lightweight signature check
    setInterval(async () => {
      // Watchdog: recover from a drag session that never received its dragend event
      if (state.isDraggingSidebar && Date.now() - (state.sidebarDragStartedAt || 0) > 20000) {
        handleSidebarDragEnd();
      }
      // Watchdog: release a stuck sidebar resize session (missed pointerup events)
      if (state.isResizingSidebar && Date.now() - (state.sidebarResizeStartedAt || 0) > 5000) {
        if (activeSidebarResizeCleanup) {
          activeSidebarResizeCleanup();
        } else {
          state.isResizingSidebar = false;
          document.body.classList.remove('sidebar-resizing');
          renderApp();
        }
      }
      // Keep the Target Window status pill in sync (cheap call, throttled by the poll)
      if (state.settings.targetWindow) {
        refreshOpenWindows(false);
      }
      if (window.getTabs && !isUiBusyForAutoRefresh()) {
        try {
          const newTabs = await window.getTabs();
          if (newTabs && getTabsSignature(newTabs) !== getTabsSignature(state.tabs)) {
            state.tabs = newTabs;
            // Drop folder navigation levels that no longer exist after a backend refresh
            normalizeActiveFolderPath();
            renderApp();
          }
        } catch (e) {
          console.warn("Polling tabs error:", e);
        }
      }
    }, 4000);
  } catch (err) {
    console.error("Critical error during init:", err);
    renderApp();
  } finally {
    isInitializing = false;
  }
}

// Apply colors and layout depending on user settings / system preferences
function applyThemeStyles() {
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  let isDark = false;
  if (state.settings.theme === 1) {
    isDark = true;
  } else if (state.settings.theme === 2) {
    isDark = false;
  } else {
    // 0 = Follow system settings
    isDark = prefersDark;
  }
    
  if (isDark) {
    document.documentElement.classList.remove('light-theme');
    document.documentElement.classList.add('dark-theme');
    document.body.classList.remove('light-theme');
    document.body.classList.add('dark-theme');
  } else {
    document.documentElement.classList.remove('dark-theme');
    document.documentElement.classList.add('light-theme');
    document.body.classList.remove('dark-theme');
    document.body.classList.add('light-theme');
  }
}

// Quick toggle between Light and Dark themes
function toggleTheme() {
  const currentIsLight = document.body.classList.contains('light-theme');
  const nextTheme = currentIsLight ? 1 : 2; // If currently light -> 1 (Dark), if dark -> 2 (Light)
  updateSetting('theme', nextTheme);
}

// Binds custom triggers called by C++ Webview shell
function bindCppCallbacks() {
  window.onSoundPlayed = function(playingSound) {
    if (!playingSound || !playingSound.sound) return;
    if (!state.settings.allowOverlapping) {
      state.playingSounds = {};
    }
    state.playingSounds[playingSound.sound.id] = playingSound;
    state.currentPlayingSoundId = playingSound.sound.id;
    cleanupScrubberDrag();
    renderApp();
  };

  window.updateSound = function(playingSound) {
    if (!playingSound || !playingSound.sound) return;
    const soundKey = playingSound.sound.id;

    //* Stale-event guard: updates are posted asynchronously by the native audio
    //* thread and can arrive after the sound was already stopped (e.g. right
    //* after Escape). Re-adding an untracked sound here would leave a ghost
    //* "playing" indicator with frozen progress. Freshly played sounds are
    //* always registered by window.onSoundPlayed first, so anything untracked
    //* within the post-stop grace window is a leftover from a stop — drop it.
    const isTracked = Object.prototype.hasOwnProperty.call(state.playingSounds, soundKey);
    if (!isTracked && isStalePlaybackEvent()) return;

    state.playingSounds[soundKey] = playingSound;
    if (state.currentPlayingSoundId === null || state.currentPlayingSoundId === undefined) {
      state.currentPlayingSoundId = soundKey;
    }
    updatePlaybackDockInPlace(playingSound);
  };

  window.finishSound = function(playingSound) {
    if (playingSound && playingSound.sound) {
      delete state.playingSounds[playingSound.sound.id];
      const tileProgress = document.getElementById(`deck-progress-${playingSound.sound.id}`);
      if (tileProgress) {
        tileProgress.style.width = '0%';
      }
    }
    if (playingSound && playingSound.id) {
      delete state.playingSounds[playingSound.id];
    }
    if (state.currentPlayingSoundId === (playingSound && playingSound.sound ? playingSound.sound.id : null)) {
      const remainingIds = Object.keys(state.playingSounds);
      state.currentPlayingSoundId = remainingIds.length > 0 ? remainingIds[remainingIds.length - 1] : null;
    }
    cleanupScrubberDrag();
    renderApp();
  };

  window.onAllSoundsFinished = function() {
    state.playingSounds = {};
    state.currentPlayingSoundId = null;
    cleanupScrubberDrag();
    renderApp();
  };

  window.onError = function(errorCode) {
    const errorMessages = {
      0: "Failed to play sound",
      1: "Failed to seek sound",
      2: "Failed to pause sound",
      3: "Failed to repeat sound",
      4: "Failed to resume sound",
      5: "Failed to route outputs",
      6: "Sound file not found",
      7: "Directory folder does not exist",
      8: "Tab category does not exist",
      9: "Failed to register hotkey",
      10: "Failed to start audio passthrough",
      15: "Failed to delete file",
      17: "Failed to adjust custom volume",
      18: "Invalid folder name",
      19: "Failed to create folder"
    };
    const message = errorMessages[errorCode] || `Unknown error occurred (Code: ${errorCode})`;
    showToast(message, 'error');
  };

  window.hotkeyReceived = function(hotkeySequence, keys) {
    if (state.recordingHotkeySoundId !== null || state.recordingTarget !== null) {
      state.recordedKeys = keys;
      state.recordedKeyNames = hotkeySequence;
      renderApp();
    }
  };

  //* Real-time tab updates pushed by the C++ filesystem watcher: fires whenever a
  //* category folder changes on disk (e.g. a new sound dropped in via the file
  //* explorer). Rescans are debounced on the backend; this just applies the result.
  window.onTabAutoRefreshed = function(tab) {
    if (!tab || tab.id === undefined) return;
    if (isUiBusyForAutoRefresh()) return; // the 4s polling safety net picks it up later
    const idx = state.tabs.findIndex(t => t.id === tab.id);
    if (idx === -1) return;
    if (getTabSignature(state.tabs[idx]) === getTabSignature(tab)) return;
    state.tabs[idx] = tab;
    // Drop folder navigation levels that no longer exist after the rescan
    normalizeActiveFolderPath();
    renderApp();
    showToast(`"${tab.name}" updated — folder changes detected`, 'info');
  };

  //* Native drag & drop: the C++ shell forwards the real paths of everything the
  //* user dragged in from the OS file manager (folders AND single sound files)
  //* plus the cursor position of the drop. The position decides the target:
  //*   1. a category row in the sidebar list  -> imported into THAT category
  //*      (its root), no matter which view is open on screen
  //*   2. a subfolder tile of the open view   -> imported into that subfolder
  //*   3. anywhere else                       -> the folder currently open
  //* Folders are imported recursively (structure preserved), plain audio files
  //* are copied in — like "Import Folder", but without a dialog.
  window.onFilesDropped = async function(paths, dropX, dropY) {
    if (!Array.isArray(paths) || paths.length === 0) return;
    if (state.isImportingFolder) return;        // an import is already running
    if (isUiBusyForAutoRefresh()) return;       // don't fight open dialogs / edits
    if (!window.importDroppedPaths) return;     // backend without drop-import support

    const dropTarget = resolveDropTarget(dropX, dropY);
    let tab = null;
    let parentFolderId = 0;
    let targetLabel = '';

    if (dropTarget.kind === 'sidebar-tab') {
      tab = state.tabs.find(t => t.id === dropTarget.tabId);
      if (tab) {
        parentFolderId = 0;                      // the sidebar row IS the category root
        targetLabel = tab.name;
      }
    }

    if (!tab) {
      tab = state.tabs.find(t => t.id === state.activeTabId);
      if (!tab || state.currentView !== 'folder') {
        showToast("Drop onto a category in the list — or open one first", "info");
        return;
      }
      let currentFolder = null;
      if (dropTarget.kind === 'folder-tile') {
        currentFolder = findFolderInTree(tab.folders, dropTarget.folderId);
      }
      if (!currentFolder) {
        currentFolder = getActiveFolder(tab);
      }
      parentFolderId = currentFolder ? currentFolder.id : 0;
      targetLabel = currentFolder ? currentFolder.name : tab.name;
    }

    //* Exactly one folder (and nothing else) dropped: ask how it should be
    //* imported — kept as a parent wrapper, or flattened to its contents.
    if (paths.length === 1 && window.pathIsDirectory) {
      try {
        if (await window.pathIsDirectory(paths[0])) {
          state.importConfirmModal = {
            visible: true,
            source: paths[0],
            folderName: folderBaseName(paths[0]),
            tabId: tab.id,
            parentFolderId,
            isDrop: true
          };
          renderApp();
          return;
        }
      } catch (e) {
        console.warn('pathIsDirectory failed:', e);
      }
    }

    state.isImportingFolder = true;
    renderApp();

    try {
      const soundsBefore = countTabSounds(tab);
      const updatedTab = await window.importDroppedPaths(tab.id, parentFolderId, paths);
      if (updatedTab && updatedTab.id !== undefined) {
        state.tabs = state.tabs.map(t => t.id === updatedTab.id ? updatedTab : t);
        const added = countTabSounds(updatedTab) - soundsBefore;
        if (added > 0) {
          showToast(`Dropped in ${added} sound${added === 1 ? '' : 's'} into "${targetLabel}"`, 'success');
        } else {
          showToast('Nothing new to import — everything already existed', 'info');
        }
      }
    } catch (e) {
      console.warn('Failed to import dropped items:', e);
      showToast('Failed to import dropped items', 'error');
    }

    state.isImportingFolder = false;
    renderApp();
  };

  //* Resolves what sits under the native drop point. The C++ shell reports the
  //* cursor in host-window client pixels (physical on Windows / GTK logical on
  //* Linux); dividing by devicePixelRatio maps them onto the page's CSS pixels,
  //* where getBoundingClientRect() lives. Returns {kind: 'none'} when the
  //* position is unknown or nothing matchable is under it.
  function resolveDropTarget(dropX, dropY) {
    if (typeof dropX !== 'number' || typeof dropY !== 'number' ||
        !isFinite(dropX) || !isFinite(dropY) || dropX < 0 || dropY < 0) {
      return { kind: 'none' };
    }

    const dpr = (typeof window.devicePixelRatio === 'number' && window.devicePixelRatio > 0)
      ? window.devicePixelRatio : 1;
    const x = dropX / dpr;
    const y = dropY / dpr;

    const pointInRect = (rect) => x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;

    // 1) Category rows in the sidebar list (works even when the list is scrolled)
    const rows = document.querySelectorAll('.folder-item[data-tab-id]');
    for (const row of rows) {
      if (pointInRect(row.getBoundingClientRect())) {
        const id = parseInt(row.getAttribute('data-tab-id'), 10);
        if (!isNaN(id)) return { kind: 'sidebar-tab', tabId: id };
      }
    }

    // 2) Subfolder tiles of the currently open category
    const tiles = document.querySelectorAll('.subfolder-tile[data-drop-folder-id]');
    for (const tile of tiles) {
      if (pointInRect(tile.getBoundingClientRect())) {
        const id = parseInt(tile.getAttribute('data-drop-folder-id'), 10);
        if (!isNaN(id)) return { kind: 'folder-tile', folderId: id };
      }
    }

    return { kind: 'none' };
  }
}

//* True while the user is mid-interaction — auto-refreshes are postponed then
//* (the polling loop re-checks every 4 seconds and renders once they are done).
function isUiBusyForAutoRefresh() {
  return state.recordingHotkeySoundId !== null ||
         state.activeVolumePopoverSoundId !== null ||
         state.hoveredVolumeSoundId !== null ||
         isDraggingSlider ||
         state.isMasterVolumeOpen ||
         state.isMasterVolumeHovered ||
         state.isImportingFolder ||
         state.isDraggingSidebar !== null ||
         state.isResizingSidebar ||
         state.editingCategoryId !== null ||
         (state.importConfirmModal && state.importConfirmModal.visible) ||
         (state.newFolderModal && state.newFolderModal.visible) ||
         (state.renameTabModal && state.renameTabModal.visible) ||
         (state.newSidebarFolderModal && state.newSidebarFolderModal.visible) ||
         (state.newSidebarCategoryModal && state.newSidebarCategoryModal.visible);
}

// Show standard clean toast warning/success indicators
function showToast(text, type = 'info') {
  const id = Date.now();
  state.toasts.push({ id, text, type });
  renderApp();
  setTimeout(() => {
    state.toasts = state.toasts.filter(t => t.id !== id);
    renderApp();
  }, 4000);
}

// --- Navigation Operations ---
function changeView(view, tabId = null) {
  // Switching to a different folder always starts at its root
  if (tabId !== null && tabId !== state.activeTabId) {
    state.activeFolderPath = [];
  }
  state.currentView = view;
  if (tabId !== null) {
    state.activeTabId = tabId;
  }
  state.searchQuery = '';
  state.selectedSoundIds = [];
  
  // Trigger loaders depending on the view selected
  if (view === 'settings') {
    loadSettingsAssets();
  } else if (view === 'system-info') {
    loadSystemInfo();
  }
  
  renderApp();
}

async function loadSettingsAssets() {
  if (window.getOutputs) {
    state.outputDevices = await window.getOutputs();
  }
  if (state.isLinux && window.getPlayback) {
    state.playbackApps = await window.getPlayback();
  }
  if (window.isElevated) {
    try {
      state.isElevated = await window.isElevated();
    } catch (e) {
      console.warn("Failed to query isElevated:", e);
    }
  }
  if (!state.isLinux) {
    if (window.getRecordingDevices) {
      const recData = await window.getRecordingDevices();
      if (recData) {
        state.recordingDevices = Array.isArray(recData) ? (recData[0] || []) : (recData.first || recData.devices || []);
        state.selectedMic = Array.isArray(recData) ? (recData[1] || null) : (recData.second || recData.selected || null);
      }
    }
    if (window.isVBCableProperlySetup) {
      state.isVBCableSetup = await window.isVBCableProperlySetup();
    }
    if (window.isVBCableInstalled) {
      state.isVBCableInstalled = await window.isVBCableInstalled();
    }
  }
  renderApp();
}

async function loadSystemInfo() {
  if (window.getSystemInfo) {
    state.systemInfo = await window.getSystemInfo();
    renderApp();
  }
}

// --- Actions Dispatchers ---
async function handlePlaySound(soundId) {
  if (window.playSound) {
    try {
      const playingSound = await window.playSound(soundId);
      if (playingSound && playingSound.sound) {
        if (!state.settings.allowOverlapping) {
          state.playingSounds = {};
        }
        state.playingSounds[playingSound.sound.id] = playingSound;
        state.currentPlayingSoundId = playingSound.sound.id;
        cleanupScrubberDrag();
        renderApp();
      }
    } catch (e) {
      console.warn("Failed to play sound:", e);
    }
  }
}

//* Grace window (ms) after a stop during which untracked native update events
//* are considered stale leftovers from the stopped playback.
const PLAYBACK_STOP_GRACE_MS = 600;

//* True when an untracked playback update arrives shortly after a stop —
//* these are in-flight events posted by the audio thread before it tore the
//* stream down and must not resurrect cleared state.
function isStalePlaybackEvent() {
  const now = Date.now();
  return (now - state.lastStopAllAt) < PLAYBACK_STOP_GRACE_MS ||
         (now - state.lastStopAt) < PLAYBACK_STOP_GRACE_MS;
}

//* Clears every trace of playback from the UI state immediately — the dock,
//* tile indicators and the "playing" titles reset on the very first Escape
//* press instead of waiting for (or being undone by) backend round-trips.
function clearAllPlaybackState() {
  state.playingSounds = {};
  state.currentPlayingSoundId = null;
  cleanupScrubberDrag();
}

async function handleStopSound(soundId) {
  state.lastStopAt = Date.now();

  const ps = state.playingSounds[soundId];
  const targetId = (ps && ps.id) ? ps.id : soundId;

  //* Drop the entry right away so indicators reset instantly; the backend
  //* call below only makes sure the native stream is torn down too.
  delete state.playingSounds[soundId];
  if (ps && ps.id) {
    delete state.playingSounds[ps.id];
  }
  if (state.currentPlayingSoundId === soundId || (ps && state.currentPlayingSoundId === ps.id)) {
    const remainingIds = Object.keys(state.playingSounds);
    state.currentPlayingSoundId = remainingIds.length > 0 ? remainingIds[remainingIds.length - 1] : null;
  }
  renderApp();

  try {
    if (window.stopSound) {
      await window.stopSound(targetId);
    }
  } catch (e) {
    console.warn("stopSound error:", e);
  }
}

async function handleStopAll() {
  state.lastStopAllAt = Date.now();

  //* Reset the indicator, playing titles and the dock IMMEDIATELY — before
  //* the backend round-trip. This is what makes the first Escape press clear
  //* the UI instead of leaving a ghost entry behind.
  clearAllPlaybackState();
  renderApp();

  try {
    if (window.stopSounds) {
      await window.stopSounds();
    }
  } catch (e) {
    console.warn("stopSounds error:", e);
  }

  //* Events produced while the backend processed the stop (e.g. finishSound
  //* callbacks fired synchronously during the call) may have touched the
  //* state again — clear once more so the reset is guaranteed to stick.
  clearAllPlaybackState();
  renderApp();
}

// --- "Add Folder as Category": picked folder becomes a brand-new category ---
async function handleAddTab() {
  if (!window.pickFolders || !window.addTabFromFolder) {
    showToast("Adding folders as categories is not supported by this backend", "error");
    return;
  }

  const picked = await window.pickFolders();
  if (!picked || picked.length === 0) return; // dialog cancelled

  let created = 0;
  let lastCreatedTabId = null;
  let lastCategoryName = '';

  for (const source of picked) {
    const folderName = folderBaseName(source) || 'New Category';

    let folders = [];
    try {
      folders = (await window.addTabFromFolder(source)) || [];
    } catch (e) {
      console.warn('Failed to add folder as category:', e);
      continue;
    }

    if (window.getTabs) {
      try {
        state.tabs = await window.getTabs();
      } catch (e) {
        console.warn('Failed to refresh tabs:', e);
      }
    }

    //* Defensive merge: the freshly registered folders must exist in the tab
    //* list before the category is created, otherwise the pruning step would
    //* strip them right back out if the tab read raced behind the registration.
    folders.forEach(f => {
      if (f && f.path && !state.tabs.some(t => t.path === f.path)) {
        state.tabs.push(f);
      }
    });

    //* The folders inside the picked folder become the folders listed under the
    //* new category — nothing is added to the main category.
    const category = createSidebarCategory(folderName, folders.map(t => t.path));
    if (!category) continue;

    created++;
    lastCategoryName = category.name;
    if (folders.length > 0 && folders[0].id !== undefined) {
      lastCreatedTabId = folders[0].id;
    }
  }

  if (created === 1) {
    showToast(`Category "${lastCategoryName}" created with its folders — nothing was added to the main category`, 'success');
  } else if (created > 1) {
    showToast(`Created ${created} categories from the picked folders`, 'success');
  }

  if (lastCreatedTabId !== null) {
    changeView('folder', lastCreatedTabId);
  } else {
    renderApp();
  }
}

// --- Sidebar "New Folder" modal (creates a soundboard folder inside a category) ---
function handleOpenSidebarNewFolderModal() {
  const activeTab = state.tabs.find(t => t.id === state.activeTabId);
  const ownerCategory = activeTab ? getSidebarCategoryByTabPath(activeTab.path) : null;
  state.newSidebarFolderModal = {
    visible: true,
    step: 'name',
    name: '',
    //* Preselect the category of the currently open folder when there is more
    //* than one to choose from — usually exactly where the user wants it.
    targetCategoryId: ownerCategory ? ownerCategory.id : null,
    isCreating: false
  };
  renderApp();
  const input = document.getElementById('new-sidebar-folder-name-input');
  if (input) input.focus();
}

function handleCloseSidebarNewFolderModal() {
  state.newSidebarFolderModal.visible = false;
  state.newSidebarFolderModal.isCreating = false;
  renderApp();
}

function handleSidebarNewFolderNameInput(val) {
  state.newSidebarFolderModal.name = val;
}

function handleSidebarNewFolderNameKeydown(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    handleSidebarNewFolderConfirm();
  } else if (event.key === 'Escape') {
    event.preventDefault();
    event.stopPropagation();
    handleCloseSidebarNewFolderModal();
  }
}

//* Advances the modal: with a single category the folder is created right away,
//* otherwise the user first picks which category it should belong to.
async function handleSidebarNewFolderConfirm() {
  const modal = state.newSidebarFolderModal;
  if (!modal || !modal.visible || modal.isCreating) return;

  if (modal.step === 'category' || state.sidebarCategories.length <= 1) {
    await createSidebarFolderInModal(modal.targetCategoryId);
    return;
  }

  modal.step = 'category';
  renderApp();
}

async function handleSidebarNewFolderPickCategory(categoryId) {
  const modal = state.newSidebarFolderModal;
  if (!modal || !modal.visible) return;
  modal.targetCategoryId = categoryId;
  await createSidebarFolderInModal(categoryId);
}

async function createSidebarFolderInModal(categoryId) {
  const modal = state.newSidebarFolderModal;
  if (!modal || !modal.visible || modal.isCreating) return;

  const name = (modal.name || '').trim();
  if (!name) {
    showToast("Enter a folder name first", "info");
    return;
  }
  if (!window.createTab) {
    showToast("Creating folders is not available", "error");
    return;
  }

  const category = state.sidebarCategories.find(c => c.id === categoryId) || state.sidebarCategories[0];
  if (!category) {
    showToast("No category available — create one first", "error");
    return;
  }

  modal.isCreating = true;
  renderApp();

  try {
    const updated = await window.createTab(name);
    if (updated && updated.length > 0) {
      state.tabs = updated;
      const target = updated[updated.length - 1];

      //* Assign the fresh folder to the chosen category (and only to it).
      if (target && target.path) {
        assignTabPathToCategory(category.id, target.path);
      }

      if (target && target.id !== undefined) {
        changeView('folder', target.id);
      }
      showToast(`Folder "${target ? target.name : name}" created in "${category.name}"`, 'success');
    }
  } catch (e) {
    console.warn("Failed to create folder:", e);
  }

  state.newSidebarFolderModal.visible = false;
  state.newSidebarFolderModal.isCreating = false;
  renderApp();
}

// --- Sidebar "New Category" modal (creates a new empty section) ---
function handleOpenNewSidebarCategoryModal() {
  state.newSidebarCategoryModal = { visible: true, name: '', isCreating: false };
  renderApp();
  const input = document.getElementById('new-sidebar-category-name-input');
  if (input) input.focus();
}

function handleCloseNewSidebarCategoryModal() {
  state.newSidebarCategoryModal.visible = false;
  state.newSidebarCategoryModal.isCreating = false;
  renderApp();
}

function handleNewSidebarCategoryNameInput(val) {
  state.newSidebarCategoryModal.name = val;
}

function handleNewSidebarCategoryNameKeydown(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    handleCreateNewSidebarCategory();
  } else if (event.key === 'Escape') {
    event.preventDefault();
    event.stopPropagation();
    handleCloseNewSidebarCategoryModal();
  }
}

async function handleCreateNewSidebarCategory() {
  const modal = state.newSidebarCategoryModal;
  if (!modal || !modal.visible || modal.isCreating) return;

  const name = (modal.name || '').trim();
  if (!name) {
    showToast("Enter a category name first", "info");
    return;
  }

  modal.isCreating = true;
  renderApp();

  const category = createSidebarCategory(name, []);
  if (category) {
    showToast(`Category "${category.name}" created — add folders to it with "New Folder"`, 'success');
  }

  state.newSidebarCategoryModal.visible = false;
  state.newSidebarCategoryModal.isCreating = false;
  renderApp();
}

function handleOpenRenameTabModal(tabId) {
  const tab = state.tabs.find(t => t.id === tabId);
  if (!tab) return;
  state.renameTabModal = { visible: true, tabId, name: tab.name };
  renderApp();
  const input = document.getElementById('rename-tab-name-input');
  if (input) { input.focus(); input.select(); }
}

function handleCloseRenameTabModal() {
  state.renameTabModal.visible = false;
  renderApp();
}

function handleRenameTabNameInput(val) {
  state.renameTabModal.name = val;
}

function handleRenameTabNameKeydown(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    handleRenameTabConfirm();
  } else if (event.key === 'Escape') {
    event.preventDefault();
    event.stopPropagation();
    handleCloseRenameTabModal();
  }
}

async function handleRenameTabConfirm() {
  const modal = state.renameTabModal;
  if (!modal || !modal.visible) return;
  const name = (modal.name || '').trim();
  if (!name) {
    showToast("Enter a category name first", "info");
    return;
  }
  if (window.renameTab) {
    const updated = await window.renameTab(modal.tabId, name);
    if (updated) {
      state.tabs = state.tabs.map(t => t.id === updated.id ? updated : t);
      showToast(`Category renamed to "${updated.name}"`, 'success');
    }
  }
  state.renameTabModal.visible = false;
  renderApp();
}

// --- Sidebar Categories: multiple named sections, each with its own folders ---
const SIDEBAR_CATEGORIES_KEY = 'audiopad_sidebar_categories';
const LEGACY_SIDEBAR_LAYOUT_KEY = 'audiopad_sidebar_layout';
const LEGACY_CATEGORIES_LABEL_KEY = 'audiopad_categories_label';
const DEFAULT_CATEGORY_NAME = 'MAIN CATEGORIES';

//* Extracts the last path segment ("C:/Sounds/Pack" -> "Pack").
function folderBaseName(path) {
  if (!path || typeof path !== 'string') return '';
  return path.replace(/[\\/]+$/, '').split(/[\\/]/).filter(Boolean).pop() || '';
}

function generateCategoryId() {
  return 'cat_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

//* Loads the category list from localStorage. Migrates the legacy single-label +
//* dropdown-folder layout on first run so existing organizations survive:
//*   - the old section label becomes the name of the first category
//*   - every old dropdown folder becomes its own category (keeping its folders)
//*   - ungrouped folders stay in the first category, in their previous order
function loadSidebarCategories() {
  let saved = null;
  try {
    saved = JSON.parse(localStorage.getItem(SIDEBAR_CATEGORIES_KEY) || 'null');
  } catch (e) {
    console.warn('Failed to load sidebar categories:', e);
  }

  if (saved && Array.isArray(saved) && saved.length > 0) {
    state.sidebarCategories = saved
      .filter(c => c && typeof c === 'object' && typeof c.id === 'string')
      .map(c => ({
        id: c.id,
        name: (typeof c.name === 'string' && c.name.trim()) ? c.name.trim() : 'Category',
        tabPaths: Array.isArray(c.tabPaths) ? c.tabPaths.filter(p => typeof p === 'string') : []
      }));
    return;
  }

  //* --- Legacy migration ---
  let label = DEFAULT_CATEGORY_NAME;
  try {
    const legacyLabel = localStorage.getItem(LEGACY_CATEGORIES_LABEL_KEY);
    if (legacyLabel && legacyLabel.trim()) label = legacyLabel.trim();
  } catch (e) {}

  const categories = [{ id: generateCategoryId(), name: label, tabPaths: [] }];

  try {
    const rawLayout = localStorage.getItem(LEGACY_SIDEBAR_LAYOUT_KEY);
    if (rawLayout) {
      const layout = JSON.parse(rawLayout);
      if (layout && typeof layout === 'object' && Array.isArray(layout.folders)) {
        const folderedPaths = new Set();
        layout.folders.forEach(f => {
          if (!f || typeof f.id !== 'string') return;
          const tabPaths = Array.isArray(f.tabPaths) ? f.tabPaths.filter(p => typeof p === 'string') : [];
          tabPaths.forEach(p => folderedPaths.add(p));
          categories.push({
            id: generateCategoryId(),
            name: (typeof f.name === 'string' && f.name.trim()) ? f.name.trim() : 'Category',
            tabPaths
          });
        });

        (Array.isArray(layout.order) ? layout.order : []).forEach(entry => {
          if (typeof entry === 'string' && entry.startsWith('tab:')) {
            const path = entry.slice(4);
            if (!folderedPaths.has(path)) categories[0].tabPaths.push(path);
          }
        });
      }
    }
  } catch (e) {
    console.warn('Failed to migrate legacy sidebar layout:', e);
  }

  state.sidebarCategories = categories;
  saveSidebarCategories();
}

function saveSidebarCategories() {
  try {
    localStorage.setItem(SIDEBAR_CATEGORIES_KEY, JSON.stringify(state.sidebarCategories));
  } catch (e) {
    console.warn('Failed to save sidebar categories:', e);
  }
}

//* Keeps the category list consistent with the tab list: dead paths are dropped,
//* every tab ends up in exactly one category (unknown ones join the first), and
//* there is always at least one category left.
function pruneSidebarCategories() {
  const categories = state.sidebarCategories;
  if (!categories || categories.length === 0) {
    state.sidebarCategories = [{ id: generateCategoryId(), name: DEFAULT_CATEGORY_NAME, tabPaths: [] }];
    return;
  }

  const tabPaths = new Set(state.tabs.map(t => t.path));
  const seen = new Set();

  categories.forEach(category => {
    category.name = (typeof category.name === 'string' && category.name.trim()) ? category.name : 'Category';
    category.tabPaths = (category.tabPaths || []).filter(p => {
      if (!tabPaths.has(p) || seen.has(p)) return false;
      seen.add(p);
      return true;
    });
  });

  state.tabs.forEach(tab => {
    if (!seen.has(tab.path)) {
      categories[0].tabPaths.push(tab.path);
      seen.add(tab.path);
    }
  });
}

function getSidebarCategoryByTabPath(tabPath) {
  return state.sidebarCategories.find(c => (c.tabPaths || []).includes(tabPath)) || null;
}

function getSidebarCategoryById(categoryId) {
  return state.sidebarCategories.find(c => c.id === categoryId) || null;
}

//* Moves a folder (tab path) into the given category — removed from every other
//* category first so it always lives in exactly one of them.
function assignTabPathToCategory(categoryId, tabPath) {
  const category = getSidebarCategoryById(categoryId);
  if (!category || !tabPath) return;

  state.sidebarCategories.forEach(c => {
    c.tabPaths = (c.tabPaths || []).filter(p => p !== tabPath);
  });
  if (!category.tabPaths.includes(tabPath)) {
    category.tabPaths.push(tabPath);
  }
  saveSidebarCategories();
}

//* Creates (or reuses) a category with the given name and moves the given folder
//* paths into it. Returns the category, or null when the name is invalid.
function createSidebarCategory(name, tabPaths) {
  const trimmed = (name || '').trim();
  if (!trimmed) return null;

  let category = state.sidebarCategories.find(c => c.name === trimmed);
  if (!category) {
    category = { id: generateCategoryId(), name: trimmed, tabPaths: [] };
    state.sidebarCategories.push(category);
  }

  (tabPaths || []).forEach(path => assignTabPathToCategory(category.id, path));
  pruneSidebarCategories();
  saveSidebarCategories();
  return category;
}

// --- Category header: inline rename ---
function handleStartEditCategoryLabel(categoryId) {
  state.editingCategoryId = categoryId;
  renderApp();
  const input = document.getElementById('category-label-input');
  if (input) { input.focus(); input.select(); }
}

function handleCategoryLabelInput(categoryId, val) {
  const category = getSidebarCategoryById(categoryId);
  if (category) category.name = val;
}

function handleCategoryLabelKeydown(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    event.target.blur();
  } else if (event.key === 'Escape') {
    event.preventDefault();
    event.stopPropagation();
    state.editingCategoryId = null;
    renderApp();
  }
}

function handleCategoryLabelBlur(categoryId) {
  const category = getSidebarCategoryById(categoryId);
  if (category) {
    category.name = (category.name || '').trim() || 'Category';
  }
  state.editingCategoryId = null;
  saveSidebarCategories();
  renderApp();
}

// --- Category header: delete (its folders move to the first remaining one) ---
function handleDeleteSidebarCategory(categoryId) {
  const categories = state.sidebarCategories;
  if (categories.length <= 1) {
    showToast("The last category cannot be removed", "info");
    return;
  }

  const index = categories.findIndex(c => c.id === categoryId);
  if (index === -1) return;
  const category = categories[index];
  if (!confirm(`Remove category "${category.name}"? Its folders move to "${categories[index === 0 ? 1 : 0].name}".`)) {
    return;
  }

  categories.splice(index, 1);
  const fallback = categories[0];
  (category.tabPaths || []).forEach(path => {
    if (!fallback.tabPaths.includes(path)) fallback.tabPaths.push(path);
  });

  saveSidebarCategories();
  renderApp();
}

async function handleDeleteTab(tabId) {
  if (window.removeTab) {
    if (confirm("Are you sure you want to remove this folder directory?")) {
      // Removing a tab re-indexes tab ids, so remember the active category by its stable path
      const activePathBefore = (state.tabs.find(t => t.id === state.activeTabId) || {}).path;
      const updated = await window.removeTab(tabId);
      state.tabs = updated;
      const stillActive = updated.find(t => t.path === activePathBefore);
      if (stillActive) {
        state.activeTabId = stillActive.id;
      } else if (updated.length > 0) {
        state.activeTabId = updated[0].id;
      }
      pruneSidebarCategories();
      saveSidebarCategories();
      renderApp();
    }
  }
}

async function toggleFavorite(soundId, currentFavState) {
  if (window.markFavorite) {
    await window.markFavorite(soundId, !currentFavState);
    state.tabs = await window.getTabs();
    renderApp();
  }
}

// --- Shared Helpers ---
function escapeHtml(str) {
  return String(str == null ? '' : str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function clampBoost(val) {
  const n = parseInt(val, 10);
  if (isNaN(n)) return 100;
  return Math.max(100, Math.min(400, n));
}

// --- Nested Soundboard Folder Helpers ---
//* Categories can contain an arbitrarily deep tree of subfolders. These helpers walk
//* that tree for counting, flattening, navigation and lookups.
function countFolderSounds(folder) {
  if (!folder) return 0;
  let count = (folder.sounds || []).length;
  for (const child of (folder.folders || [])) {
    count += countFolderSounds(child);
  }
  return count;
}

function countTabSounds(tab) {
  if (!tab) return 0;
  let count = (tab.sounds || []).length;
  for (const folder of (tab.folders || [])) {
    count += countFolderSounds(folder);
  }
  return count;
}

function flattenFolderSounds(folder, out) {
  if (!folder) return out;
  for (const sound of (folder.sounds || [])) {
    out.push(sound);
  }
  for (const child of (folder.folders || [])) {
    flattenFolderSounds(child, out);
  }
  return out;
}

function flattenTabSounds(tab) {
  const out = (tab && tab.sounds) ? [...tab.sounds] : [];
  for (const folder of ((tab && tab.folders) || [])) {
    flattenFolderSounds(folder, out);
  }
  return out;
}

//* Finds a folder (by id) anywhere inside a folder tree. Returns the folder node.
function findFolderInTree(folders, id) {
  for (const folder of (folders || [])) {
    if (folder.id === id) return folder;
    const nested = findFolderInTree(folder.folders || [], id);
    if (nested) return nested;
  }
  return null;
}

//* Resolves state.activeFolderPath against the active tab. Returns the chain of
//* folder nodes (empty array = category root) and prunes ids that no longer exist.
function resolveActiveFolderChain(tab) {
  const chain = [];
  if (!tab) return chain;
  let level = tab.folders || [];
  for (const id of (state.activeFolderPath || [])) {
    const folder = findFolderInTree(level, id);
    if (!folder) break;
    chain.push(folder);
    level = folder.folders || [];
  }
  state.activeFolderPath = chain.map(f => f.id);
  return chain;
}

//* Drops navigation levels that vanished (e.g. after a backend refresh or tab switch).
function normalizeActiveFolderPath() {
  const tab = state.tabs.find(t => t.id === state.activeTabId);
  if (tab) {
    resolveActiveFolderChain(tab);
  } else {
    state.activeFolderPath = [];
  }
}

//* Resolves the folder the user is currently browsing (null = category root).
function getActiveFolder(tab) {
  const chain = resolveActiveFolderChain(tab);
  return chain.length > 0 ? chain[chain.length - 1] : null;
}

//* Resolves the id-path from the category root to the given folder id.
function getFolderPathIds(tab, folderId) {
  const path = [];
  const walk = (folders, trail) => {
    for (const folder of (folders || [])) {
      const next = [...trail, folder.id];
      if (folder.id === folderId) {
        path.push(...next);
        return true;
      }
      if (walk(folder.folders || [], next)) return true;
    }
    return false;
  };
  walk(tab ? tab.folders : [], []);
  return path;
}

//* Recursively searches every category for a sound by id (nested folders included).
function findSoundInTabs(soundId) {
  for (const tab of state.tabs) {
    for (const sound of (tab.sounds || [])) {
      if (sound.id === soundId) return sound;
    }
    const inFolders = (folders) => {
      for (const folder of (folders || [])) {
        for (const sound of (folder.sounds || [])) {
          if (sound.id === soundId) return sound;
        }
        const found = inFolders(folder.folders || []);
        if (found) return found;
      }
      return null;
    };
    const found = inFolders(tab.folders || []);
    if (found) return found;
  }
  return null;
}

// --- Nested Folder Navigation ---
function navigateToTabRoot() {
  state.activeFolderPath = [];
  state.searchQuery = '';
  renderApp();
}

function navigateToFolder(folderId) {
  const tab = state.tabs.find(t => t.id === state.activeTabId);
  const path = getFolderPathIds(tab, folderId);
  if (path.length > 0) {
    state.activeFolderPath = path;
    state.searchQuery = '';
    state.selectedSoundIds = [];
  }
  renderApp();
}

// --- New Folder (inside soundboard categories) ---
function handleOpenNewFolderModal() {
  const tab = state.tabs.find(t => t.id === state.activeTabId);
  if (!tab) {
    showToast("Select a category first", "info");
    return;
  }
  const currentFolder = getActiveFolder(tab);
  state.newFolderModal = {
    visible: true,
    tabId: tab.id,
    parentFolderId: currentFolder ? currentFolder.id : null,
    name: '',
    isCreating: false
  };
  renderApp();
  const input = document.getElementById('new-folder-name-input');
  if (input) input.focus();
}

function handleCloseNewFolderModal() {
  state.newFolderModal.visible = false;
  state.newFolderModal.isCreating = false;
  renderApp();
}

function handleNewFolderNameInput(val) {
  state.newFolderModal.name = val;
}

function handleNewFolderNameKeydown(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    handleCreateNewFolder();
  } else if (event.key === 'Escape') {
    event.preventDefault();
    event.stopPropagation();
    handleCloseNewFolderModal();
  }
}

async function handleCreateNewFolder() {
  const modal = state.newFolderModal;
  if (!modal || !modal.visible || modal.isCreating) return;

  const rawName = (modal.name || '').trim();
  const sanitizedName = rawName.replace(/[/\\:*?"<>|]/g, '').trim();
  if (!sanitizedName) {
    showToast("Please enter a valid folder name", "error");
    return;
  }
  if (!window.createFolder) {
    showToast("Folder creation is not supported by this backend", "error");
    return;
  }

  const tab = state.tabs.find(t => t.id === modal.tabId);
  if (!tab) return;

  // Remember the current child ids so we can spot the freshly created folder.
  const parentFolder = modal.parentFolderId ? findFolderInTree(tab.folders, modal.parentFolderId) : null;
  const previousChildIds = new Set(((parentFolder ? parentFolder.folders : tab.folders) || []).map(f => f.id));

  modal.isCreating = true;
  renderApp();

  try {
    const updatedTab = await window.createFolder(modal.tabId, modal.parentFolderId, sanitizedName);
    if (updatedTab && updatedTab.id !== undefined) {
      state.tabs = state.tabs.map(t => t.id === updatedTab.id ? updatedTab : t);
      state.activeTabId = updatedTab.id;

      // Navigate into the newly created folder (the child that appeared).
      const newParent = modal.parentFolderId ? findFolderInTree(updatedTab.folders, modal.parentFolderId) : null;
      const children = (newParent ? newParent.folders : updatedTab.folders) || [];
      const created = children.find(f => !previousChildIds.has(f.id));
      state.activeFolderPath = getFolderPathIds(updatedTab, created ? created.id : null);
      showToast(`Folder "${created ? created.name : sanitizedName}" created`, "success");
    }
  } catch (e) {
    console.warn("Failed to create folder:", e);
  }

  state.newFolderModal.visible = false;
  state.newFolderModal.isCreating = false;
  renderApp();
}

// --- Import Folder (recursive, structure-preserving) ---
async function handleImportFolder() {
  if (state.isImportingFolder) return;
  if (!window.pickImportFolder || !window.importFolder) {
    showToast("Folder import is not supported by this backend", "error");
    return;
  }
  const tab = state.tabs.find(t => t.id === state.activeTabId);
  if (!tab) {
    showToast("Select a category first", "info");
    return;
  }

  const source = await window.pickImportFolder();
  if (!source) return; // dialog cancelled

  //* Exactly one folder is being imported — ask how it should be placed before
  //* anything is copied to disk.
  state.importConfirmModal = {
    visible: true,
    source,
    folderName: folderBaseName(source) || 'Folder',
    tabId: tab.id,
    parentFolderId: 0,
    isDrop: false
  };
  renderApp();
}

// --- Import Confirmation: one folder, two ways to place it ---
function handleCloseImportConfirm() {
  state.importConfirmModal.visible = false;
  renderApp();
}

async function handleImportConfirmChoice(mode) {
  const modal = state.importConfirmModal;
  if (!modal || !modal.visible || state.isImportingFolder) return;
  if (mode !== 'parent' && mode !== 'children') return;

  state.importConfirmModal.visible = false;
  state.isImportingFolder = true;
  renderApp();

  const tab = state.tabs.find(t => t.id === modal.tabId);
  const destinationLabel = tab ? tab.name : 'the category';

  try {
    const soundsBefore = tab ? countTabSounds(tab) : 0;
    let updatedTab = null;

    if (modal.isDrop) {
      updatedTab = await window.importDroppedPaths(modal.tabId, modal.parentFolderId, [modal.source], mode);
    } else {
      updatedTab = await window.importFolder(modal.tabId, modal.source, mode);
    }

    if (updatedTab && updatedTab.id !== undefined) {
      state.tabs = state.tabs.map(t => t.id === updatedTab.id ? updatedTab : t);
      const added = countTabSounds(updatedTab) - soundsBefore;
      const how = mode === 'parent'
        ? `kept "${modal.folderName}" as its own folder`
        : `imported the contents of "${modal.folderName}" directly`;
      if (added > 0) {
        showToast(`Imported ${added} sound${added === 1 ? '' : 's'} into "${destinationLabel}" (${how})`, 'success');
      } else {
        showToast(`No new sounds found — everything already existed (${how})`, 'info');
      }
    }
  } catch (e) {
    console.warn('Failed to import folder:', e);
    showToast('Failed to import folder', 'error');
  }

  state.isImportingFolder = false;
  renderApp();
}

// --- Target Window (exclusive audio routing) ---
async function refreshOpenWindows(render = true) {
  if (!window.getAppWindows) return;
  state.isLoadingWindows = true;
  try {
    state.openWindows = (await window.getAppWindows()) || [];
  } catch (e) {
    console.warn("Failed to query open windows:", e);
  }
  state.isLoadingWindows = false;
  if (render) renderApp();
}

function isTargetWindowRunning() {
  if (!state.settings.targetWindow) return false;
  return state.openWindows.some(w => w.processName === state.settings.targetWindow);
}

async function handleSelectTargetWindow(processName) {
  await updateSetting('targetWindow', processName || null);
  if (processName) {
    showToast(`Sounds now route exclusively into "${processName}" — you keep hearing them locally`, 'success');
  }
}

// --- Resizable Sidebar ---
const SIDEBAR_WIDTH_KEY = 'audiopad_sidebar_width';
const SIDEBAR_MIN_WIDTH = 180;
const SIDEBAR_MAX_WIDTH = 420;
const SIDEBAR_DEFAULT_WIDTH = 216;

function clampSidebarWidth(width) {
  return Math.max(SIDEBAR_MIN_WIDTH, Math.min(SIDEBAR_MAX_WIDTH, width));
}

function loadSidebarWidth() {
  try {
    const raw = parseInt(localStorage.getItem(SIDEBAR_WIDTH_KEY), 10);
    state.sidebarWidth = isNaN(raw) ? SIDEBAR_DEFAULT_WIDTH : clampSidebarWidth(raw);
  } catch (e) {
    state.sidebarWidth = SIDEBAR_DEFAULT_WIDTH;
  }
}

function persistSidebarWidth() {
  try {
    localStorage.setItem(SIDEBAR_WIDTH_KEY, String(state.sidebarWidth));
  } catch (e) {
    console.warn('Failed to persist sidebar width:', e);
  }
}

// --- Playback Dock Volume (single slider, Local / Remote toggle) ---
const DOCK_VOLUME_MODE_KEY = 'audiopad_dock_volume_mode';

function loadDockVolumeMode() {
  try {
    const raw = localStorage.getItem(DOCK_VOLUME_MODE_KEY);
    state.dockVolumeMode = raw === 'remote' ? 'remote' : 'local';
  } catch (e) {
    state.dockVolumeMode = 'local';
  }
}

function toggleDockVolumeMode() {
  state.dockVolumeMode = state.dockVolumeMode === 'local' ? 'remote' : 'local';
  try {
    localStorage.setItem(DOCK_VOLUME_MODE_KEY, state.dockVolumeMode);
  } catch (e) {
    console.warn('Failed to persist dock volume mode:', e);
  }
  renderApp();
}

function getDockVolumeValue() {
  return state.dockVolumeMode === 'remote' ? state.settings.remoteVolume : state.settings.localVolume;
}

//* The dock slider drives whichever mode the toggle selects — local changes only
//* what you hear, remote changes what everybody else hears.
async function handleDockVolumeInput(val) {
  const numVal = Math.max(0, Math.min(100, parseInt(val, 10) || 0));
  await handleMasterVolumeInput(state.dockVolumeMode, numVal);
}

function applySidebarWidth(width) {
  state.sidebarWidth = clampSidebarWidth(width);
  const sidebar = document.querySelector('.custom-sidebar');
  if (sidebar) {
    sidebar.style.setProperty('--sidebar-width', state.sidebarWidth + 'px');
  }
}

function handleSidebarResizeStart(event) {
  if (state.isResizingSidebar) return;
  event.preventDefault();
  event.stopPropagation();

  const handle = event.currentTarget;
  const startX = event.clientX;
  const startWidth = state.sidebarWidth;

  state.isResizingSidebar = true;
  state.sidebarResizeStartedAt = Date.now();
  document.body.classList.add('sidebar-resizing');
  try {
    handle.setPointerCapture(event.pointerId);
  } catch (e) { /* capture is an optimization — global fallbacks below cover the rest */ }

  const onMove = (moveEvent) => {
    state.sidebarResizeStartedAt = Date.now();
    applySidebarWidth(startWidth + (moveEvent.clientX - startX));
  };
  const onEnd = () => {
    handle.removeEventListener('pointermove', onMove);
    handle.removeEventListener('pointerup', onEnd);
    handle.removeEventListener('pointercancel', onEnd);
    if (!state.isResizingSidebar) return;
    state.isResizingSidebar = false;
    document.body.classList.remove('sidebar-resizing');
    persistSidebarWidth();
    renderApp();
  };

  handle.addEventListener('pointermove', onMove);
  handle.addEventListener('pointerup', onEnd);
  handle.addEventListener('pointercancel', onEnd);

  // Global fallbacks: release the resize even if the captured element is destroyed
  // mid-drag (e.g. by an unexpected re-render) or the pointerup lands elsewhere.
  activeSidebarResizeCleanup = onEnd;
}

let activeSidebarResizeCleanup = null;
window.addEventListener('pointerup', () => {
  if (activeSidebarResizeCleanup) activeSidebarResizeCleanup();
});
window.addEventListener('pointercancel', () => {
  if (activeSidebarResizeCleanup) activeSidebarResizeCleanup();
});

function handleSidebarResizeReset() {
  applySidebarWidth(SIDEBAR_DEFAULT_WIDTH);
  persistSidebarWidth();
  renderApp();
}

// --- Sidebar Folder Re-ordering (drag a folder above/below another one) ---

function getTabByPath(tabPath) {
  return state.tabs.find(t => t.path === tabPath) || null;
}

// Sends a complete new ordering of every tab id to the backend and keeps the active tab stable.
// Tab ids are re-indexed after re-ordering, so the active selection is tracked by path.
async function applyTabOrder(tabIds) {
  if (!window.moveTabs || !Array.isArray(tabIds)) return false;
  const activePathBefore = (state.tabs.find(t => t.id === state.activeTabId) || {}).path;
  try {
    const updated = await window.moveTabs(tabIds);
    if (updated && Array.isArray(updated)) {
      state.tabs = updated;
      if (activePathBefore) {
        const newActive = state.tabs.find(t => t.path === activePathBefore);
        if (newActive) state.activeTabId = newActive.id;
      }
      if (!state.tabs.find(t => t.id === state.activeTabId) && state.tabs.length > 0) {
        state.activeTabId = state.tabs[0].id;
      }
      return true;
    }
  } catch (e) {
    console.warn('moveTabs error:', e);
  }
  return false;
}

// Moves a tab id inside the current global order so that it lands before/after the target tab
async function reorderTabsGlobal(draggedTabId, targetTabId, insertAfter) {
  const ids = state.tabs.map(t => t.id);
  const from = ids.indexOf(draggedTabId);
  if (from < 0) return false;
  ids.splice(from, 1);
  let at = ids.indexOf(targetTabId);
  if (at < 0) {
    ids.push(draggedTabId);
  } else {
    at += insertAfter ? 1 : 0;
    ids.splice(at, 0, draggedTabId);
  }
  return await applyTabOrder(ids);
}

// --- Sidebar Drag & Drop ---
function handleSidebarDragStart(tabId, event) {
  if (!event) return;
  state.isDraggingSidebar = {
    type: 'tab',
    tabId,
    path: null
  };
  state.sidebarDragStartedAt = Date.now();
  const tab = state.tabs.find(t => t.id === tabId);
  state.isDraggingSidebar.path = tab ? tab.path : null;
  try {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', 'tab');
  } catch (e) {}
  document.body.classList.add('sidebar-drag-active');
  const el = event.currentTarget;
  if (el) el.classList.add('dragging');
}

function handleSidebarDragEnd() {
  state.isDraggingSidebar = null;
  document.body.classList.remove('sidebar-drag-active');
  clearSidebarDropIndicators();
  document.querySelectorAll('.folder-item.dragging').forEach(el => el.classList.remove('dragging'));
}

function clearSidebarDropIndicators() {
  document.querySelectorAll('.drop-above, .drop-below, .drop-inside').forEach(el => {
    el.classList.remove('drop-above', 'drop-below', 'drop-inside');
  });
}

function handleSidebarTabDragOver(tabId, event) {
  if (!event || !state.isDraggingSidebar) return;
  const drag = state.isDraggingSidebar;
  if (drag.type === 'tab' && drag.tabId === tabId) return; // No self-drop
  event.preventDefault();
  event.stopPropagation();
  event.dataTransfer.dropEffect = 'move';
  const el = event.currentTarget;
  const rect = el.getBoundingClientRect();
  const before = (event.clientY - rect.top) < rect.height / 2;
  clearSidebarDropIndicators();
  el.classList.add(before ? 'drop-above' : 'drop-below');
}

function handleSidebarTabDragLeave(event) {
  const el = event.currentTarget;
  if (el) el.classList.remove('drop-above', 'drop-below');
}

async function handleSidebarTabDrop(tabId, event) {
  if (!event) return;
  event.preventDefault();
  event.stopPropagation();
  const drag = state.isDraggingSidebar;
  const el = event.currentTarget;
  const rect = el.getBoundingClientRect();
  const insertAfter = (event.clientY - rect.top) >= rect.height / 2;
  clearSidebarDropIndicators();
  if (!drag || drag.type !== 'tab') return;

  const targetTab = state.tabs.find(t => t.id === tabId);
  if (!targetTab) {
    handleSidebarDragEnd();
    return;
  }

  if (drag.tabId === tabId) {
    handleSidebarDragEnd();
    return;
  }

  const draggedTab = getTabByPath(drag.path);
  if (!draggedTab) {
    handleSidebarDragEnd();
    return;
  }

  //* Re-order the flat folder list — the folder stays in its category.
  handleSidebarDragEnd();
  const reordered = await reorderTabsGlobal(draggedTab.id, targetTab.id, insertAfter);
  if (reordered) {
    renderApp();
  }
}

function handleSidebarRootZoneDragOver(event) {
  if (!event || !state.isDraggingSidebar) return;
  event.preventDefault();
  event.stopPropagation();
  event.dataTransfer.dropEffect = 'move';
  clearSidebarDropIndicators();
  const el = event.currentTarget;
  if (el) el.classList.add('drop-inside');
}

function handleSidebarRootZoneDragLeave(event) {
  const el = event.currentTarget;
  if (el) el.classList.remove('drop-inside');
}

async function handleSidebarRootZoneDrop(event) {
  if (!event) return;
  event.preventDefault();
  event.stopPropagation();
  const drag = state.isDraggingSidebar;
  clearSidebarDropIndicators();
  if (!drag || drag.type !== 'tab') return;

  const draggedTab = getTabByPath(drag.path);
  if (!draggedTab) {
    handleSidebarDragEnd();
    return;
  }
  handleSidebarDragEnd();
  // Move the folder to the very end of the global order
  const ids = state.tabs.map(t => t.id);
  const from = ids.indexOf(draggedTab.id);
  if (from >= 0) {
    ids.splice(from, 1);
    ids.push(draggedTab.id);
    const ok = await applyTabOrder(ids);
    if (ok) renderApp();
  }
}

// --- Sound Boost (Global + Per-Soundboard) ---
async function handleGlobalBoostInput(val) {
  const numVal = clampBoost(val);
  state.settings.soundBoost = numVal;

  document.querySelectorAll('#settings-boost-text').forEach(el => {
    el.innerText = numVal + '%';
    el.classList.toggle('boosted', numVal > 100);
  });
  document.querySelectorAll('#settings-boost-input').forEach(el => {
    if (document.activeElement !== el) {
      el.value = numVal;
      el.setAttribute('value', numVal);
    }
  });

  if (window.changeSettings) {
    try {
      await window.changeSettings(state.settings);
    } catch (e) {
      console.warn('changeSettings error:', e);
    }
  }
}

async function handleResetGlobalBoost() {
  await handleGlobalBoostInput(100);
  renderApp();
}

function handleTabBoostInput(tabId, val) {
  const numVal = clampBoost(val);
  const tab = state.tabs.find(t => t.id === tabId);
  if (tab) tab.boost = numVal;
  const textEl = document.getElementById('tab-boost-text');
  if (textEl) {
    textEl.innerText = numVal + '%';
    textEl.classList.toggle('boosted', numVal > 100);
  }
}

async function handleTabBoostCommit(tabId, val) {
  const numVal = clampBoost(val);
  if (window.setTabBoost) {
    try {
      const updatedTab = await window.setTabBoost(tabId, numVal);
      const idx = state.tabs.findIndex(t => t.id === tabId);
      if (idx >= 0 && updatedTab) {
        state.tabs[idx] = updatedTab;
      }
    } catch (e) {
      console.warn('setTabBoost error:', e);
    }
  }
}

async function handleTabBoostReset(tabId) {
  handleTabBoostInput(tabId, 100);
  await handleTabBoostCommit(tabId, 100);
  renderApp();
}

function handleSearch(val) {
  state.searchQuery = val;
  renderApp();
}

// --- Sound Image & Context Menu Operations ---
function handleSoundContextMenu(soundId, event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }

  const mouseX = event ? event.clientX : window.innerWidth / 2;
  const mouseY = event ? event.clientY : window.innerHeight / 2;

  const menuWidth = 230;
  const menuHeight = 240;

  const x = (mouseX + menuWidth > window.innerWidth) ? Math.max(10, window.innerWidth - menuWidth - 10) : mouseX;
  const y = (mouseY + menuHeight > window.innerHeight) ? Math.max(10, window.innerHeight - menuHeight - 10) : mouseY;

  state.contextMenu = {
    visible: true,
    x,
    y,
    soundId
  };
  renderApp();
}

function closeContextMenu() {
  if (state.contextMenu && state.contextMenu.visible) {
    state.contextMenu.visible = false;
    renderApp();
  }
}

function getTabSignature(t) {
  if (!t) return "";
  let sig = `${t.id}:${t.name}:${t.sortMode}:${t.boost || 100}:${t.sounds ? t.sounds.length : 0}:${(t.folders || []).length};`;
  const signatureSounds = (sounds) => {
    (sounds || []).forEach(s => {
      sig += `${s.id}-${s.name}-${s.modifiedDate}-${s.isFavorite}-${s.localVolume}-${s.remoteVolume}-${s.image ? s.image.length : 0}-${(s.hotkeys || []).join(',')};`;
    });
  };
  const signatureFolders = (folders) => {
    (folders || []).forEach(f => {
      sig += `F${f.id}-${f.name}-${f.path};`;
      signatureSounds(f.sounds);
      signatureFolders(f.folders);
    });
  };
  signatureSounds(t.sounds);
  signatureFolders(t.folders);
  return sig;
}

function getTabsSignature(tabs) {
  if (!tabs || !Array.isArray(tabs)) return "";
  let sig = "";
  for (let i = 0; i < tabs.length; i++) {
    sig += getTabSignature(tabs[i]);
    sig += "|";
  }
  return sig;
}

async function optimizeImage(dataUrl, maxWidth = 300, maxHeight = 300) {
  if (!dataUrl || typeof dataUrl !== 'string' || !dataUrl.startsWith('data:image/')) {
    return dataUrl;
  }
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      let width = img.width;
      let height = img.height;
      if (width <= maxWidth && height <= maxHeight && dataUrl.length < 35000) {
        return resolve(dataUrl);
      }
      if (width > height) {
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }
      }
      const canvas = document.createElement('canvas');
      canvas.width = Math.max(1, width);
      canvas.height = Math.max(1, height);
      const ctx = canvas.getContext('2d');
      if (!ctx) return resolve(dataUrl);
      ctx.drawImage(img, 0, 0, width, height);
      try {
        const webp = canvas.toDataURL('image/webp', 0.85);
        if (webp && webp.startsWith('data:image/webp') && webp.length < dataUrl.length) {
          return resolve(webp);
        }
      } catch (e) {}
      const png = canvas.toDataURL('image/png');
      resolve(png && png.length < dataUrl.length ? png : dataUrl);
    };
    img.onerror = () => resolve(dataUrl);
    img.src = dataUrl;
  });
}

function handleSoundCardClick(soundId, event) {
  if (event && (event.ctrlKey || event.metaKey)) {
    event.preventDefault();
    event.stopPropagation();
    handleToggleSelectSound(soundId, event);
    return;
  }
  handlePlaySound(soundId);
}

function handleToggleSelectSound(soundId, event) {
  if (event) {
    event.stopPropagation();
  }
  if (!state.selectedSoundIds) state.selectedSoundIds = [];
  const idx = state.selectedSoundIds.indexOf(soundId);
  if (idx >= 0) {
    state.selectedSoundIds.splice(idx, 1);
  } else {
    state.selectedSoundIds.push(soundId);
  }
  renderApp();
}

function handleClearSelectedSounds() {
  state.selectedSoundIds = [];
  renderApp();
}

async function handleAssignSoundImage(soundId) {
  closeContextMenu();
  let imageDataUrl = '';

  if (window.pickImageFile) {
    imageDataUrl = await window.pickImageFile();
  }

  if (!imageDataUrl && !window.pickImageFile) {
    imageDataUrl = await new Promise((resolve) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return resolve('');
        const reader = new FileReader();
        reader.onload = (ev) => resolve(ev.target.result);
        reader.readAsDataURL(file);
      };
      input.click();
    });
  }

  if (imageDataUrl) {
    imageDataUrl = await optimizeImage(imageDataUrl);
    if (window.setSoundImage) {
      await window.setSoundImage(soundId, imageDataUrl);
    }
    for (const tab of state.tabs) {
      const s = (tab.sounds || []).find(snd => snd.id === soundId);
      if (s) s.image = imageDataUrl;
    }
    showToast("Image background assigned successfully!", "success");
    renderApp();
  }
}

async function handleRemoveSoundImage(soundId) {
  closeContextMenu();
  if (window.setSoundImage) {
    await window.setSoundImage(soundId, "");
  }
  for (const tab of state.tabs) {
    const s = (tab.sounds || []).find(snd => snd.id === soundId);
    if (s) s.image = "";
  }
  if (state.selectedSoundIds) {
    const sIdx = state.selectedSoundIds.indexOf(soundId);
    if (sIdx >= 0) state.selectedSoundIds.splice(sIdx, 1);
  }
  showToast("Image background removed", "info");
  renderApp();
}

async function handleRemoveSoundsImage(soundIds) {
  closeContextMenu();
  if (!soundIds || soundIds.length === 0) return;
  const idsToRemove = [...soundIds];
  if (window.setSoundsImage) {
    await window.setSoundsImage(idsToRemove, "");
  }
  for (const tab of state.tabs) {
    for (const snd of (tab.sounds || [])) {
      if (idsToRemove.includes(snd.id)) {
        snd.image = "";
      }
    }
  }
  state.selectedSoundIds = [];
  showToast(`Image background removed from ${idsToRemove.length} sounds`, "info");
  renderApp();
}

function handleOpenMultiImageModal(initialSoundId = null) {
  closeContextMenu();
  const currentTab = state.tabs.find(t => t.id === state.activeTabId) || state.tabs[0];
  const allTabSoundIds = currentTab && currentTab.sounds ? currentTab.sounds.map(s => s.id) : [];

  let soundIdsToSelect = [];
  if (state.selectedSoundIds && state.selectedSoundIds.length > 0) {
    soundIdsToSelect = [...state.selectedSoundIds];
    if (initialSoundId && !soundIdsToSelect.includes(initialSoundId)) {
      soundIdsToSelect.push(initialSoundId);
    }
  } else if (initialSoundId) {
    soundIdsToSelect = [initialSoundId];
  } else {
    soundIdsToSelect = allTabSoundIds;
  }

  state.multiImageModal = {
    visible: true,
    selectedSoundIds: soundIdsToSelect,
    imageDataUrl: ''
  };
  renderApp();
}

function handleCloseMultiImageModal() {
  state.multiImageModal = {
    visible: false,
    selectedSoundIds: [],
    imageDataUrl: ''
  };
  renderApp();
}

function handleToggleSelectSoundForImage(soundId) {
  const idx = state.multiImageModal.selectedSoundIds.indexOf(soundId);
  if (idx >= 0) {
    state.multiImageModal.selectedSoundIds.splice(idx, 1);
  } else {
    state.multiImageModal.selectedSoundIds.push(soundId);
  }
  renderApp();
}

function handleSelectAllSoundsForImage(selectAll) {
  const currentTab = state.tabs.find(t => t.id === state.activeTabId) || state.tabs[0];
  if (!currentTab) return;

  if (selectAll) {
    state.multiImageModal.selectedSoundIds = currentViewSounds(currentTab).map(s => s.id);
  } else {
    state.multiImageModal.selectedSoundIds = [];
  }
  renderApp();
}

async function handleBrowseMultiImage() {
  let imageDataUrl = '';
  if (window.pickImageFile) {
    imageDataUrl = await window.pickImageFile();
  }
  if (!imageDataUrl && !window.pickImageFile) {
    imageDataUrl = await new Promise((resolve) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return resolve('');
        const reader = new FileReader();
        reader.onload = (ev) => resolve(ev.target.result);
        reader.readAsDataURL(file);
      };
      input.click();
    });
  }

  if (imageDataUrl) {
    imageDataUrl = await optimizeImage(imageDataUrl);
    state.multiImageModal.imageDataUrl = imageDataUrl;
    renderApp();
  }
}

async function handleApplyMultiSoundImage() {
  let { selectedSoundIds, imageDataUrl } = state.multiImageModal;
  if (!imageDataUrl) {
    showToast("Please select an image first", "error");
    return;
  }
  if (selectedSoundIds.length === 0) {
    showToast("Please select at least one sound", "error");
    return;
  }

  imageDataUrl = await optimizeImage(imageDataUrl);

  if (window.setSoundsImage) {
    await window.setSoundsImage(selectedSoundIds, imageDataUrl);
  }

  for (const tab of state.tabs) {
    for (const snd of (tab.sounds || [])) {
      if (selectedSoundIds.includes(snd.id)) {
        snd.image = imageDataUrl;
      }
    }
  }

  showToast(`Image assigned to ${selectedSoundIds.length} sounds!`, "success");
  handleCloseMultiImageModal();
}

let volumeHoverTimeout = null;
let masterVolumeHoverTimeout = null;
let isDraggingSlider = false;

function handleSliderDragStart(e) {
  isDraggingSlider = true;
  if (e) e.stopPropagation();
}

function handleVolumeMouseEnter(soundId, event) {
  if (volumeHoverTimeout) {
    clearTimeout(volumeHoverTimeout);
    volumeHoverTimeout = null;
  }
  state.hoveredVolumeSoundId = soundId;
  
  const target = event ? event.currentTarget : null;
  if (target) {
    target.classList.add('is-hovered');
    const parentSoundpad = target.closest('.soundpad-btn');
    if (parentSoundpad) parentSoundpad.classList.add('has-open-popover');
    const parentCard = target.closest('.sound-grid-card');
    if (parentCard) parentCard.classList.add('has-open-popover');
    const parentRow = target.closest('.sound-row');
    if (parentRow) parentRow.classList.add('has-open-popover');
  }
}

function handleVolumeMouseLeave(soundId, event) {
  const target = event ? event.currentTarget : null;
  
  if (volumeHoverTimeout) {
    clearTimeout(volumeHoverTimeout);
  }
  
  volumeHoverTimeout = setTimeout(() => {
    if (isDraggingSlider) return;
    if (state.activeVolumePopoverSoundId === soundId) return;
    
    if (state.hoveredVolumeSoundId === soundId) {
      state.hoveredVolumeSoundId = null;
    }
    
    if (target) {
      target.classList.remove('is-hovered');
      const parentSoundpad = target.closest('.soundpad-btn');
      if (parentSoundpad && state.activeVolumePopoverSoundId !== soundId) {
        parentSoundpad.classList.remove('has-open-popover');
      }
      const parentCard = target.closest('.sound-grid-card');
      if (parentCard && state.activeVolumePopoverSoundId !== soundId) {
        parentCard.classList.remove('has-open-popover');
      }
      const parentRow = target.closest('.sound-row');
      if (parentRow && state.activeVolumePopoverSoundId !== soundId) {
        parentRow.classList.remove('has-open-popover');
      }
    } else {
      document.querySelectorAll('.volume-popover-container.is-hovered').forEach(el => el.classList.remove('is-hovered'));
      document.querySelectorAll('.soundpad-btn.has-open-popover').forEach(el => {
        if (!el.querySelector('.volume-popover-container.open')) el.classList.remove('has-open-popover');
      });
      document.querySelectorAll('.sound-grid-card.has-open-popover').forEach(el => {
        if (!el.querySelector('.volume-popover-container.open')) el.classList.remove('has-open-popover');
      });
      document.querySelectorAll('.sound-row.has-open-popover').forEach(el => {
        if (!el.querySelector('.volume-popover-container.open')) el.classList.remove('has-open-popover');
      });
    }
  }, 300);
}

function handleMasterVolumeMouseEnter(event) {
  if (masterVolumeHoverTimeout) {
    clearTimeout(masterVolumeHoverTimeout);
    masterVolumeHoverTimeout = null;
  }
  state.isMasterVolumeHovered = true;
  const target = event ? event.currentTarget : null;
  if (target) {
    target.classList.add('is-hovered');
  }
}

function handleMasterVolumeMouseLeave(event) {
  const target = event ? event.currentTarget : null;
  if (masterVolumeHoverTimeout) {
    clearTimeout(masterVolumeHoverTimeout);
  }
  masterVolumeHoverTimeout = setTimeout(() => {
    if (isDraggingSlider) return;
    if (state.isMasterVolumeOpen) return;
    state.isMasterVolumeHovered = false;
    if (target) {
      target.classList.remove('is-hovered');
    } else {
      const el = document.querySelector('.master-volume-container');
      if (el) el.classList.remove('is-hovered');
    }
  }, 300);
}

function toggleVolumePopover(soundId, event) {
  if (event) event.stopPropagation();
  state.isMasterVolumeOpen = false;
  state.activeVolumePopoverSoundId = (state.activeVolumePopoverSoundId === soundId) ? null : soundId;
  renderApp();
}

function toggleMasterVolumePopover(event) {
  if (event) event.stopPropagation();
  state.activeVolumePopoverSoundId = null;
  state.isMasterVolumeOpen = !state.isMasterVolumeOpen;
  renderApp();
}

async function handleSoundVolumeInput(soundId, type, val) {
  const numVal = parseInt(val, 10);
  
  // Real-time label update without DOM re-render
  const textElem = document.getElementById(`vol-text-${soundId}-${type}`);
  if (textElem) {
    textElem.innerText = `${numVal}%`;
  }

  // Update in memory
  for (const tab of state.tabs) {
    if (tab.sounds) {
      const snd = tab.sounds.find(s => s.id === soundId);
      if (snd) {
        if (type === 'local') snd.localVolume = numVal;
        if (type === 'remote') snd.remoteVolume = numVal;
        break;
      }
    }
  }

  // Call C++ Webview bridge
  if (type === 'local' && window.setCustomLocalVolume) {
    await window.setCustomLocalVolume(soundId, numVal);
  } else if (type === 'remote' && window.setCustomRemoteVolume) {
    await window.setCustomRemoteVolume(soundId, numVal);
  }
}

async function handleResetSoundVolume(soundId, event) {
  if (event) event.stopPropagation();

  for (const tab of state.tabs) {
    if (tab.sounds) {
      const snd = tab.sounds.find(s => s.id === soundId);
      if (snd) {
        snd.localVolume = null;
        snd.remoteVolume = null;
        break;
      }
    }
  }

  if (window.setCustomLocalVolume) {
    await window.setCustomLocalVolume(soundId, null);
  }
  if (window.setCustomRemoteVolume) {
    await window.setCustomRemoteVolume(soundId, null);
  }

  renderApp();
}

async function handleMasterVolumeInput(type, val) {
  const numVal = Math.max(0, Math.min(100, parseInt(val, 10) || 0));

  if (state.settings.syncVolumes) {
    state.settings.localVolume = numVal;
    state.settings.remoteVolume = numVal;

    const elements = [
      { id: 'dock-vol-text', text: `${numVal}%` },
      { id: 'settings-vol-text-local', text: `${numVal}%` },
      { id: 'settings-vol-text-remote', text: `${numVal}%` },
      { id: 'dock-vol-input', val: numVal },
      { id: 'settings-vol-input-local', val: numVal },
      { id: 'settings-vol-input-remote', val: numVal }
    ];
    elements.forEach(item => {
      const el = document.getElementById(item.id);
      if (el) {
        if (item.text !== undefined) el.innerText = item.text;
        if (item.val !== undefined) {
          el.value = item.val;
          el.setAttribute('value', item.val);
        }
      }
    });
  } else {
    if (type === 'local') {
      state.settings.localVolume = numVal;
    } else {
      state.settings.remoteVolume = numVal;
    }

    const t1 = document.getElementById('settings-vol-text-local');
    const t2 = document.getElementById('settings-vol-text-remote');
    if (t1) t1.innerText = `${state.settings.localVolume}%`;
    if (t2) t2.innerText = `${state.settings.remoteVolume}%`;
    const i1 = document.getElementById('settings-vol-input-local');
    const i2 = document.getElementById('settings-vol-input-remote');
    if (i1) { i1.value = state.settings.localVolume; i1.setAttribute('value', state.settings.localVolume); }
    if (i2) { i2.value = state.settings.remoteVolume; i2.setAttribute('value', state.settings.remoteVolume); }

    //* Keep the dock volume module in sync. Writing the same value the user is
    //* dragging to is harmless, and linked settings changes must move it too.
    const dockText = document.getElementById('dock-vol-text');
    if (dockText) dockText.innerText = `${getDockVolumeValue()}%`;
    const dockInput = document.getElementById('dock-vol-input');
    if (dockInput) { dockInput.value = getDockVolumeValue(); }
  }

  if (window.changeSettings) {
    try {
      await window.changeSettings(state.settings);
    } catch (e) {
      console.warn("changeSettings error:", e);
    }
  }
}

// Backwards-compatible alias
async function changeVolume(soundId, type, val) {
  await handleSoundVolumeInput(soundId, type, val);
}

async function handleSetSortMode(tabId, mode) {
  if (window.setSortMode) {
    const parsedMode = parseInt(mode, 10);
    state.tabs = await window.setSortMode(tabId, parsedMode);
    renderApp();
  }
}

async function handleOpenFolder(tabId) {
  if (window.openFolder) {
    await window.openFolder(tabId);
  }
}

// --- Settings Changes Operations ---
async function updateSetting(key, val) {
  state.settings[key] = val;
  if (key === 'syncVolumes' && val) {
    state.settings.remoteVolume = state.settings.localVolume;
  }
  if (key === 'theme') {
    applyThemeStyles();
  }
  renderApp();
  if (window.changeSettings) {
    try {
      await window.changeSettings(state.settings);
    } catch (e) {
      console.warn("Failed to persist setting:", key, e);
    }
  }
}

async function toggleOutputDevice(deviceName) {
  let outputs = [...state.settings.outputs];
  if (state.settings.allowMultipleOutputs) {
    if (outputs.includes(deviceName)) {
      outputs = outputs.filter(name => name !== deviceName);
    } else {
      outputs.push(deviceName);
    }
  } else {
    outputs = [deviceName];
  }
  await updateSetting('outputs', outputs);
  loadSettingsAssets(); // Refresh settings inputs
}

async function handleSelectOutputDevice(deviceName) {
  await updateSetting('outputs', [deviceName]);
  if (window.getOutputs) {
    state.outputDevices = await window.getOutputs();
  }
  renderApp();
}

async function handleVBCableSetup() {
  if (window.setupVBCable) {
    if (!state.isVBCableInstalled) {
      showToast("VB-Audio Virtual Cable not detected. Opening download site...", "info");
      if (window.openUrl) {
        window.openUrl("https://vb-audio.com/Cable/");
      }
      return;
    }

    let micGuid = "";
    if (state.selectedMic && state.selectedMic.guid) {
      micGuid = state.selectedMic.guid;
    } else if (state.recordingDevices.length > 0) {
      micGuid = state.recordingDevices[0].guid;
    }

    if (!micGuid) {
      showToast("No recording device available to route", "error");
      return;
    }

    if (!state.isElevated) {
      showToast("Requesting Administrator privileges to configure Windows audio...", "info");
      if (window.restartAsAdmin) {
        await window.restartAsAdmin();
      }
      return;
    }

    const res = await window.setupVBCable(micGuid);
    if (res === "ok" || res === true) {
      showToast("VB-Cable configured successfully!", "success");
    } else if (res === "vb_cable_not_installed") {
      showToast("VB-Audio Virtual Cable not found. Opening download page...", "info");
      if (window.openUrl) {
        window.openUrl("https://vb-audio.com/Cable/");
      }
    } else {
      showToast("Could not configure device automatically. Use 'Sound Control Panel' button below to configure.", "error");
    }
    await loadSettingsAssets();
  }
}

async function handleMicOverrideChange(micGuid) {
  if (window.setupVBCable) {
    const selected = state.recordingDevices.find(d => d.guid === micGuid);
    const devName = selected ? selected.name : micGuid;

    if (!micGuid) {
      await window.setupVBCable("");
      showToast("Microphone override disabled", 'info');
      await loadSettingsAssets();
      return;
    }

    if (!state.isVBCableInstalled) {
      showToast("VB-Audio Virtual Cable not detected. Opening download site...", "info");
      if (window.openUrl) {
        window.openUrl("https://vb-audio.com/Cable/");
      }
      await loadSettingsAssets();
      return;
    }

    if (!state.isElevated) {
      showToast("Requesting Administrator privileges to change microphone override...", "info");
      if (window.restartAsAdmin) {
        await window.restartAsAdmin();
      }
      return;
    }

    const res = await window.setupVBCable(micGuid);
    if (res === "ok" || res === true) {
      showToast(`Microphone override set to: ${devName}`, 'success');
    } else if (res === "vb_cable_not_installed") {
      showToast("VB-Audio Cable is not installed. Opening download page...", "info");
      if (window.openUrl) {
        window.openUrl("https://vb-audio.com/Cable/");
      }
    } else {
      showToast("Could not set override automatically. Use 'Sound Control Panel' button below to configure manually.", 'error');
    }
    await loadSettingsAssets();
  }
}

async function handleRestartAsAdmin() {
  if (window.restartAsAdmin) {
    await window.restartAsAdmin();
  }
}

async function handleOpenSoundControlPanel() {
  if (window.openSoundControlPanel) {
    await window.openSoundControlPanel();
  }
}

function handleDownloadVBCable() {
  if (window.openUrl) {
    window.openUrl("https://vb-audio.com/Cable/");
  } else {
    window.open("https://vb-audio.com/Cable/", "_blank");
  }
  showToast("Opening VB-Audio Cable download page in your browser...", "info");
}

async function handleCheckVBCableInstalled() {
  state.isCheckingVBCable = true;
  renderApp();
  
  if (window.getOutputs) {
    state.outputDevices = await window.getOutputs();
  }
  if (window.getRecordingDevices) {
    const recData = await window.getRecordingDevices();
    if (recData) {
      state.recordingDevices = Array.isArray(recData) ? (recData[0] || []) : (recData.first || recData.devices || []);
      state.selectedMic = Array.isArray(recData) ? (recData[1] || null) : (recData.second || recData.selected || null);
    }
  }
  if (window.isVBCableInstalled) {
    state.isVBCableInstalled = await window.isVBCableInstalled();
  }
  if (window.isVBCableProperlySetup) {
    state.isVBCableSetup = await window.isVBCableProperlySetup();
  }

  state.isCheckingVBCable = false;

  if (state.isVBCableInstalled) {
    showToast("VB-Audio Virtual Cable detected! Welcome to AudioPad.", "success");
    renderApp();
  } else {
    showToast("VB-Audio Virtual Cable not detected yet. Please ensure setup completed.", "error");
    renderApp();
  }
}

function handleSkipVBCablePrompt() {
  state.dismissedVBCablePrompt = true;
  showToast("AudioPad loaded in local-playback mode. Microphone routing is disabled.", "warning");
  renderApp();
}

async function handleLinuxPassthrough(appName, activeState) {
  if (activeState) {
    if (window.stopPassthrough) {
      await window.stopPassthrough(appName);
    }
  } else {
    if (window.startPassthrough) {
      await window.startPassthrough(appName);
    }
  }
  loadSettingsAssets();
}

async function handleUnloadSwitchOnConnect() {
  if (window.unloadSwitchOnConnect) {
    await window.unloadSwitchOnConnect();
    showToast("Switch-on-connect module modified", "info");
    loadSettingsAssets();
  }
}


function handleOpenUrl(url) {
  if (window.openUrl) {
    window.openUrl(url);
  }
}

// --- Keyboard listener for Hotkey recorders & Desktop Shortcuts ---
function handleGlobalKeydown(e) {
  if (state.recordingHotkeySoundId === null && state.recordingTarget === null) {
    if (e.key === 'Escape') {
      if (state.contextMenu && state.contextMenu.visible) {
        state.contextMenu.visible = false;
        renderApp();
        return;
      }
      if (state.multiImageModal && state.multiImageModal.visible) {
        handleCloseMultiImageModal();
        return;
      }
      if (state.newFolderModal && state.newFolderModal.visible) {
        handleCloseNewFolderModal();
        return;
      }
      handleStopAll();
      return;
    }
    if ((e.ctrlKey || e.metaKey) && (e.key === 'f' || e.key === 'F')) {
      e.preventDefault();
      const searchEl = document.getElementById('search-input');
      if (searchEl) {
        searchEl.focus();
        searchEl.select();
      }
      return;
    }
    return;
  }
  e.preventDefault();

  const code = e.keyCode;
  if (!state.recordedKeys.includes(code)) {
    state.recordedKeys.push(code);
  }

  // Feed current key codes list back to get names formatting
  if (window.getHotkeySequence) {
    window.getHotkeySequence(state.recordedKeys).then(seq => {
      state.recordedKeyNames = seq;
      renderApp();
    });
  } else {
    state.recordedKeyNames = state.recordedKeys.join(' + ');
    renderApp();
  }
}

function startRecordHotkey(soundId, target = 'sound') {
  state.recordingHotkeySoundId = soundId;
  state.recordingTarget = target;
  state.recordedKeys = [];
  state.recordedKeyNames = 'Press key combination...';
  
  if (window.requestHotkey) {
    window.requestHotkey(true); // Expose hotkey intercept to frontend
  }
  renderApp();
}

function cancelRecordHotkey() {
  state.recordingHotkeySoundId = null;
  state.recordingTarget = null;
  state.recordedKeys = [];
  state.recordedKeyNames = '';
  
  if (window.requestHotkey) {
    window.requestHotkey(false);
  }
  renderApp();
}

async function saveRecordedHotkey() {
  if (window.requestHotkey) {
    window.requestHotkey(false);
  }

  if (state.recordingTarget === 'sound' && state.recordingHotkeySoundId !== null && window.setHotkey) {
    await window.setHotkey(state.recordingHotkeySoundId, state.recordedKeys);
    state.tabs = await window.getTabs();
  } else if (state.recordingTarget === 'stop') {
    await updateSetting('stopHotkey', state.recordedKeys);
  } else if (state.recordingTarget === 'ptt') {
    await updateSetting('pushToTalkKeys', state.recordedKeys);
  }
  
  cancelRecordHotkey();
}

async function clearRecordedHotkey() {
  if (window.requestHotkey) {
    window.requestHotkey(false);
  }

  if (state.recordingTarget === 'sound' && state.recordingHotkeySoundId !== null && window.setHotkey) {
    await window.setHotkey(state.recordingHotkeySoundId, []);
    state.tabs = await window.getTabs();
  } else if (state.recordingTarget === 'stop') {
    await updateSetting('stopHotkey', []);
  } else if (state.recordingTarget === 'ptt') {
    await updateSetting('pushToTalkKeys', []);
  }
  
  cancelRecordHotkey();
}

// Helper to filter sounds
function handleSearch(val) {
  state.searchQuery = val;
  renderApp();
  const input = document.getElementById('search-input');
  if (input) {
    input.focus();
    input.setSelectionRange(val.length, val.length);
  }
}

function changeListViewMode(mode) {
  state.listViewMode = mode;
  try {
    localStorage.setItem('audiopad_view_mode', mode);
    const viewCode = mode === 'grid' ? 1 : (mode === 'deck' ? 2 : 0);
    state.settings.viewMode = viewCode;
    if (window.changeSettings) {
      window.changeSettings(state.settings);
    }
  } catch (e) {}
  renderApp();
}

async function updateDefaultViewMode(mode) {
  changeListViewMode(mode);
}

// --- Templates Rendering ---
function renderVBCableRequiredPage() {
  return `
    ${renderAppTopbar()}
    <div style="width: 100%; flex: 1 1 auto; display: flex; align-items: center; justify-content: center; background: var(--bg-app); font-family: var(--font-sans); padding: 24px; box-sizing: border-box; overflow-y: auto;">
      <div style="max-width: 520px; width: 100%; background: var(--bg-surface); border: 1px solid var(--border-strong); border-radius: var(--radius-lg); padding: 28px 24px; box-shadow: var(--shadow-lg); display: flex; flex-direction: column; gap: 18px;">
        
        <!-- Header Icon & Title -->
        <div style="display: flex; align-items: flex-start; gap: 14px;">
          <div style="width: 42px; height: 42px; border-radius: var(--radius-sm); background: var(--bg-surface-inset); border: 1px solid var(--border-color); display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0; color: var(--color-accent);">
            🎙️
          </div>
          <div>
            <h2 style="margin: 0; font-size: 15px; font-weight: 700; color: var(--color-primary); letter-spacing: -0.01em;">
              VB-Audio Virtual Cable Required
            </h2>
            <p style="margin: 4px 0 0 0; font-size: 12px; color: var(--color-secondary); line-height: 1.45;">
              AudioPad uses the VB-Audio Virtual Cable driver to route soundboard effects into your microphone for Discord, OBS, TeamSpeak, and games.
            </p>
          </div>
        </div>

        <!-- 3-Step Installation Guide -->
        <div style="display: flex; flex-direction: column; gap: 8px; background: var(--bg-surface-inset); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 12px 14px;">
          <div style="display: flex; align-items: flex-start; gap: 10px;">
            <span style="font-family: var(--font-mono); font-size: 10.5px; font-weight: 700; background: var(--bg-surface); border: 1px solid var(--border-color); color: var(--color-primary); width: 20px; height: 20px; border-radius: var(--radius-xs); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">1</span>
            <div style="font-size: 12px; color: var(--color-primary); line-height: 1.4;">
              <strong>Download Driver:</strong> Download the official VB-CABLE driver zip archive.
            </div>
          </div>
          
          <div style="display: flex; align-items: flex-start; gap: 10px;">
            <span style="font-family: var(--font-mono); font-size: 10.5px; font-weight: 700; background: var(--bg-surface); border: 1px solid var(--border-color); color: var(--color-primary); width: 20px; height: 20px; border-radius: var(--radius-xs); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">2</span>
            <div style="font-size: 12px; color: var(--color-primary); line-height: 1.4;">
              <strong>Install as Administrator:</strong> Extract the archive, right-click <code style="font-family: var(--font-mono); font-size: 11px; background: rgba(255,255,255,0.08); padding: 1px 4px; border-radius: 2px;">VBCABLE_Setup_x64.exe</code>, select <em>Run as administrator</em>, and click <em>Install Driver</em>.
            </div>
          </div>

          <div style="display: flex; align-items: flex-start; gap: 10px;">
            <span style="font-family: var(--font-mono); font-size: 10.5px; font-weight: 700; background: var(--bg-surface); border: 1px solid var(--border-color); color: var(--color-primary); width: 20px; height: 20px; border-radius: var(--radius-xs); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">3</span>
            <div style="font-size: 12px; color: var(--color-primary); line-height: 1.4;">
              <strong>Verify Connection:</strong> Once installed, click <strong>"Check Installation Status"</strong> below to activate microphone routing.
            </div>
          </div>
        </div>

        <!-- Buttons -->
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <button class="btn-primary" style="padding: 10px 16px; font-size: 12.5px; width: 100%;" onclick="handleDownloadVBCable()">
            Download VB-Audio Virtual Cable (Official Website)
          </button>

          <button class="btn-primary" style="padding: 9px 16px; font-size: 12px; background: var(--bg-surface); border: 1px solid var(--border-color); color: var(--color-primary); width: 100%;" onclick="handleCheckVBCableInstalled()">
            <span>${state.isCheckingVBCable ? icons.spinner : '🔄'}</span> Check Installation Status
          </button>
        </div>

        <!-- Subtle Skip Link -->
        <div style="text-align: center; margin-top: -4px;">
          <button style="background: none; border: none; color: var(--color-muted); font-size: 11.5px; cursor: pointer; text-decoration: underline;" onclick="handleSkipVBCablePrompt()">
            Continue in local playback mode (soundboard on speakers only)
          </button>
        </div>

      </div>
    </div>
  `;
}

// --- Sidebar Rendering (multiple categories, each with its own folders) ---
function renderSidebarCategories() {
  pruneSidebarCategories();
  return state.sidebarCategories
    .map(category => renderSidebarCategoryGroup(category))
    .join('');
}

function renderSidebarCategoryGroup(category) {
  const folders = category.tabPaths
    .map(path => getTabByPath(path))
    .filter(Boolean);
  const soundCount = folders.reduce((acc, t) => acc + countTabSounds(t), 0);
  const isEditing = state.editingCategoryId === category.id;
  const canDelete = state.sidebarCategories.length > 1;

  return `
    <div class="sidebar-category-group">
      <div class="sidebar-section-header">
        ${isEditing ? `
          <input type="text" id="category-label-input" class="categories-label-input"
                 value="${escapeHtml(category.name)}" maxlength="40"
                 title="Press Enter to save, Esc to cancel"
                 oninput="handleCategoryLabelInput('${category.id}', this.value)"
                 onkeydown="handleCategoryLabelKeydown(event)"
                 onblur="handleCategoryLabelBlur('${category.id}')">
        ` : `
          <span class="categories-label-text" title="Double-click to rename this category"
                ondblclick="handleStartEditCategoryLabel('${category.id}')">${escapeHtml(category.name)}</span>
        `}
        <span class="sidebar-category-actions">
          <span class="sidebar-count-badge">${folders.length}</span>
          ${!isEditing ? `
            <button class="folder-action-btn categories-label-edit"
                    title="Rename the '${escapeHtml(category.name)}' category"
                    onclick="event.stopPropagation(); handleStartEditCategoryLabel('${category.id}')">${icons.pencil}</button>
            ${canDelete ? `
              <button class="folder-action-btn categories-label-edit delete"
                      title="Remove this category (its folders move to the first one)"
                      onclick="event.stopPropagation(); handleDeleteSidebarCategory('${category.id}')">${icons.trash}</button>
            ` : ''}
          ` : ''}
        </span>
      </div>
      ${folders.length === 0 ? `
        <div class="sidebar-category-empty">No folders yet</div>
      ` : ''}
      ${folders.map(t => renderSidebarTabItem(t)).join('')}
    </div>
  `;
}

function renderSidebarTabItem(t) {
  const count = countTabSounds(t);
  const isActive = state.currentView === 'folder' && t.id === state.activeTabId;
  const boost = typeof t.boost === 'number' ? t.boost : 100;

  return `
    <div class="folder-item ${isActive ? 'active' : ''}"
         data-tab-id="${t.id}"
         draggable="true"
         onclick="changeView('folder', ${t.id})"
         ondragstart="handleSidebarDragStart(${t.id}, event)"
         ondragend="handleSidebarDragEnd()"
         ondragover="handleSidebarTabDragOver(${t.id}, event)"
         ondragleave="handleSidebarTabDragLeave(event)"
         ondrop="handleSidebarTabDrop(${t.id}, event)">
      <div class="folder-name-container">
        <span class="nav-icon">${isActive ? icons.folderOpen : icons.folder}</span>
        <span title="${escapeHtml(t.name)}">${escapeHtml(t.name)}</span>
      </div>
      ${boost > 100 ? `<span class="boost-badge" title="Sound boost active: ${boost}%">${icons.boltSmall}${boost}%</span>` : ''}
      <span class="category-count">${count}</span>
      <div class="folder-actions">
        <button class="folder-action-btn" title="Rename Folder" onclick="event.stopPropagation(); handleOpenRenameTabModal(${t.id})">
          ${icons.pencil}
        </button>
        <button class="folder-action-btn" title="Open in File Explorer" onclick="event.stopPropagation(); handleOpenFolder(${t.id})">
          ${icons.openLink}
        </button>
        <button class="folder-action-btn delete" title="Remove Folder" onclick="event.stopPropagation(); handleDeleteTab(${t.id})">
          ${icons.trash}
        </button>
      </div>
    </div>
  `;
}

// Render the "Create Folder" modal (nested folders inside categories)
function renderNewFolderModal() {
  if (!state.newFolderModal || !state.newFolderModal.visible) return '';

  const modal = state.newFolderModal;
  const parentTab = state.tabs.find(t => t.id === modal.tabId);
  const parentFolder = modal.parentFolderId && parentTab ? findFolderInTree(parentTab.folders, modal.parentFolderId) : null;
  const locationLabel = parentFolder ? parentFolder.name : (parentTab ? parentTab.name : '');

  return `
    <div class="modal-overlay" onclick="handleCloseNewFolderModal()">
      <div class="modal-card" style="max-width: 420px; width: 100%;" onclick="event.stopPropagation()">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
          <h3 style="margin: 0; font-size: 16px; font-weight: 700; color: var(--color-primary);">${icons.folderPlus} New Folder</h3>
          <button class="action-btn" onclick="handleCloseNewFolderModal()">${icons.close}</button>
        </div>

        <div style="display: flex; flex-direction: column; gap: 14px;">
          <div style="display: flex; flex-direction: column; gap: 5px;">
            <label for="new-folder-name-input" style="font-size: 11px; color: var(--color-secondary);">
              Folder name — created inside <strong>${escapeHtml(locationLabel)}</strong>
            </label>
            <input type="text" id="new-folder-name-input" class="search-input" style="width: 100%; height: 32px;"
                   placeholder="e.g. Meme Clips" value="${escapeHtml(modal.name)}" maxlength="60"
                   oninput="handleNewFolderNameInput(this.value)"
                   onkeydown="handleNewFolderNameKeydown(event)">
          </div>
          <div class="checkbox-desc">A real folder is created on disk inside this soundboard category. Drop audio files into it or use “Import Folder” to fill it.</div>
        </div>

        <div class="modal-actions" style="margin-top: 16px; display: flex; gap: 8px; justify-content: flex-end;">
          <button class="modal-btn cancel-btn" onclick="handleCloseNewFolderModal()">Cancel</button>
          <button class="modal-btn save-btn" onclick="handleCreateNewFolder()" ${modal.isCreating ? 'disabled style="opacity: 0.55; cursor: not-allowed;"' : ''}>
            ${modal.isCreating ? 'Creating…' : 'Create Folder'}
          </button>
        </div>
      </div>
    </div>
  `;
}

// Render the "Rename Category" modal (display name only — disk folder keeps its path)
function renderRenameTabModal() {
  if (!state.renameTabModal || !state.renameTabModal.visible) return '';

  const modal = state.renameTabModal;
  const tab = state.tabs.find(t => t.id === modal.tabId);
  if (!tab) return '';

  return `
    <div class="modal-overlay" onclick="handleCloseRenameTabModal()">
      <div class="modal-card" style="max-width: 420px; width: 100%;" onclick="event.stopPropagation()">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
          <h3 style="margin: 0; font-size: 16px; font-weight: 700; color: var(--color-primary);">${icons.pencil} Rename Category</h3>
          <button class="action-btn" onclick="handleCloseRenameTabModal()">${icons.close}</button>
        </div>

        <div style="display: flex; flex-direction: column; gap: 14px;">
          <div style="display: flex; flex-direction: column; gap: 5px;">
            <label for="rename-tab-name-input" style="font-size: 11px; color: var(--color-secondary);">
              Category name
            </label>
            <input type="text" id="rename-tab-name-input" class="search-input" style="width: 100%; height: 32px;"
                   placeholder="e.g. Horror Sounds" value="${escapeHtml(modal.name)}" maxlength="60"
                   oninput="handleRenameTabNameInput(this.value)"
                   onkeydown="handleRenameTabNameKeydown(event)">
          </div>
          <div class="checkbox-desc">Only the displayed name changes — the folder on disk (and every sound, hotkey and favorite inside it) stays exactly where it is.</div>
        </div>

        <div class="modal-actions" style="margin-top: 16px; display: flex; gap: 8px; justify-content: flex-end;">
          <button class="modal-btn cancel-btn" onclick="handleCloseRenameTabModal()">Cancel</button>
          <button class="modal-btn save-btn" onclick="handleRenameTabConfirm()">Rename</button>
        </div>
      </div>
    </div>
  `;
}

// Render the "Import Confirmation" modal (single folder — keep parent or flatten)
function renderImportConfirmModal() {
  if (!state.importConfirmModal || !state.importConfirmModal.visible) return '';

  const modal = state.importConfirmModal;
  const tab = state.tabs.find(t => t.id === modal.tabId);
  const destination = tab ? tab.name : 'the current category';

  return `
    <div class="modal-overlay" onclick="handleCloseImportConfirm()">
      <div class="modal-card" style="max-width: 460px; width: 100%;" onclick="event.stopPropagation()">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
          <h3 style="margin: 0; font-size: 16px; font-weight: 700; color: var(--color-primary);">${icons.folderPlus} Import Confirmation</h3>
          <button class="action-btn" onclick="handleCloseImportConfirm()">${icons.close}</button>
        </div>

        <div style="display: flex; flex-direction: column; gap: 14px;">
          <div style="font-size: 12.5px; color: var(--color-primary); line-height: 1.55;">
            You're importing a single folder that likely contains other folders and sounds.
            <strong>What would you like to do?</strong>
          </div>

          <div style="display: flex; flex-direction: column; gap: 8px;">
            <button class="import-choice-btn" onclick="handleImportConfirmChoice('parent')">
              <span class="import-choice-title">${icons.folder} Import the parent folder</span>
              <span class="import-choice-desc">Everything lands inside a “${escapeHtml(modal.folderName)}” folder — its subfolders stay within it.</span>
            </button>
            <button class="import-choice-btn" onclick="handleImportConfirmChoice('children')">
              <span class="import-choice-title">${icons.layers} Import only the folders inside it</span>
              <span class="import-choice-desc">The parent folder is skipped — its subfolders and sounds are imported directly into “${escapeHtml(destination)}”.</span>
            </button>
          </div>
        </div>

        <div class="modal-actions" style="margin-top: 16px; display: flex; gap: 8px; justify-content: flex-end;">
          <button class="modal-btn cancel-btn" onclick="handleCloseImportConfirm()">Cancel</button>
        </div>
      </div>
    </div>
  `;
}

// Render the sidebar "New Folder" modal (name step + category picker step)
function renderNewSidebarFolderModal() {
  if (!state.newSidebarFolderModal || !state.newSidebarFolderModal.visible) return '';

  const modal = state.newSidebarFolderModal;
  const showCategoryStep = modal.step === 'category' && state.sidebarCategories.length > 1;

  return `
    <div class="modal-overlay" onclick="handleCloseSidebarNewFolderModal()">
      <div class="modal-card" style="max-width: 440px; width: 100%;" onclick="event.stopPropagation()">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
          <h3 style="margin: 0; font-size: 16px; font-weight: 700; color: var(--color-primary);">${icons.folderPlus} New Folder</h3>
          <button class="action-btn" onclick="handleCloseSidebarNewFolderModal()">${icons.close}</button>
        </div>

        ${showCategoryStep ? `
          <div style="display: flex; flex-direction: column; gap: 10px;">
            <div style="font-size: 12.5px; color: var(--color-primary);">Which category should <strong>${escapeHtml(modal.name)}</strong> go into?</div>
            <div style="display: flex; flex-direction: column; gap: 8px;">
              ${state.sidebarCategories.map(category => `
                <button class="import-choice-btn" onclick="handleSidebarNewFolderPickCategory('${category.id}')">
                  <span class="import-choice-title">${icons.folder} ${escapeHtml(category.name)}</span>
                  <span class="import-choice-desc">${category.tabPaths.length} folder${category.tabPaths.length === 1 ? '' : 's'} · added there</span>
                </button>
              `).join('')}
            </div>
          </div>
          <div class="modal-actions" style="margin-top: 16px; display: flex; gap: 8px; justify-content: flex-end;">
            <button class="modal-btn cancel-btn" onclick="modal.step = 'name'; renderApp();">Back</button>
            <button class="modal-btn cancel-btn" onclick="handleCloseSidebarNewFolderModal()">Cancel</button>
          </div>
        ` : `
          <div style="display: flex; flex-direction: column; gap: 14px;">
            <div style="display: flex; flex-direction: column; gap: 5px;">
              <label for="new-sidebar-folder-name-input" style="font-size: 11px; color: var(--color-secondary);">Folder name</label>
              <input type="text" id="new-sidebar-folder-name-input" class="search-input" style="width: 100%; height: 32px;"
                     placeholder="e.g. Meme Clips" value="${escapeHtml(modal.name)}" maxlength="60"
                     oninput="handleSidebarNewFolderNameInput(this.value)"
                     onkeydown="handleSidebarNewFolderNameKeydown(event)">
            </div>
            ${state.sidebarCategories.length <= 1 ? `
              <div class="checkbox-desc">A new soundboard folder is created${state.sidebarCategories[0] ? ` in <strong>${escapeHtml(state.sidebarCategories[0].name)}</strong>` : ''} — drop audio files into it or use “Import Folder”.</div>
            ` : `
              <div class="checkbox-desc">After naming the folder you'll pick which category it belongs to.</div>
            `}
          </div>
          <div class="modal-actions" style="margin-top: 16px; display: flex; gap: 8px; justify-content: flex-end;">
            <button class="modal-btn cancel-btn" onclick="handleCloseSidebarNewFolderModal()">Cancel</button>
            <button class="modal-btn save-btn" onclick="handleSidebarNewFolderConfirm()" ${modal.isCreating ? 'disabled style="opacity: 0.55; cursor: not-allowed;"' : ''}>
              ${modal.isCreating ? 'Creating…' : (state.sidebarCategories.length <= 1 ? 'Create Folder' : 'Next')}
            </button>
          </div>
        `}
      </div>
    </div>
  `;
}

// Render the "New Category" modal (creates a new empty sidebar section)
function renderNewSidebarCategoryModal() {
  if (!state.newSidebarCategoryModal || !state.newSidebarCategoryModal.visible) return '';

  const modal = state.newSidebarCategoryModal;

  return `
    <div class="modal-overlay" onclick="handleCloseNewSidebarCategoryModal()">
      <div class="modal-card" style="max-width: 420px; width: 100%;" onclick="event.stopPropagation()">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
          <h3 style="margin: 0; font-size: 16px; font-weight: 700; color: var(--color-primary);">${icons.plus} New Category</h3>
          <button class="action-btn" onclick="handleCloseNewSidebarCategoryModal()">${icons.close}</button>
        </div>

        <div style="display: flex; flex-direction: column; gap: 14px;">
          <div style="display: flex; flex-direction: column; gap: 5px;">
            <label for="new-sidebar-category-name-input" style="font-size: 11px; color: var(--color-secondary);">Category name</label>
            <input type="text" id="new-sidebar-category-name-input" class="search-input" style="width: 100%; height: 32px;"
                   placeholder="e.g. Game SFX" value="${escapeHtml(modal.name)}" maxlength="60"
                   oninput="handleNewSidebarCategoryNameInput(this.value)"
                   onkeydown="handleNewSidebarCategoryNameKeydown(event)">
          </div>
          <div class="checkbox-desc">Creates a new section in the sidebar. Add folders to it with “New Folder” or “Add Folder as Category”.</div>
        </div>

        <div class="modal-actions" style="margin-top: 16px; display: flex; gap: 8px; justify-content: flex-end;">
          <button class="modal-btn cancel-btn" onclick="handleCloseNewSidebarCategoryModal()">Cancel</button>
          <button class="modal-btn save-btn" onclick="handleCreateNewSidebarCategory()" ${modal.isCreating ? 'disabled style="opacity: 0.55; cursor: not-allowed;"' : ''}>
            ${modal.isCreating ? 'Creating…' : 'Create Category'}
          </button>
        </div>
      </div>
    </div>
  `;
}

// --- Custom Topbar (replaces the native window caption) ---
// Windows runs the shell frameless; this strip carries the brand, doubles as
// the drag region and hosts the window controls. On Linux the native titlebar
// stays, so the controls are hidden and dragging stays disabled.
function isTopbarInteractive() {
  return !state.isLinux;
}

function renderAppTopbar() {
  const interactive = isTopbarInteractive();
  return `
    <div class="app-topbar" id="app-topbar"
         ${interactive ? `onpointerdown="handleTopbarPointerDown(event)"
         ondblclick="handleTopbarDoubleClick(event)"` : ''}>
      <div class="topbar-brand">
        <span class="sidebar-logo">${icons.logo}</span>
        <span class="logo-text">AudioPad</span>
      </div>
      <div class="topbar-drag-hint" ${interactive ? '' : 'style="display: none;"'}></div>
      ${interactive ? `
        <div class="topbar-controls">
          <button class="topbar-btn" title="Minimize" aria-label="Minimize window"
                  onclick="handleWindowMinimize()">
            ${icons.winMinimize}
          </button>
          <button class="topbar-btn" title="${state.isWindowMaximized ? 'Restore' : 'Maximize'}"
                  aria-label="${state.isWindowMaximized ? 'Restore window' : 'Maximize window'}"
                  onclick="handleWindowMaximize()">
            ${state.isWindowMaximized ? icons.winRestore : icons.winMaximize}
          </button>
          <button class="topbar-btn topbar-close" title="Close" aria-label="Close window"
                  onclick="handleWindowClose()">
            ${icons.winClose}
          </button>
        </div>
      ` : ''}
    </div>
  `;
}

//* Drag-to-move: forwarded to the native shell, which enters the system move
//* loop (Aero Snap included). Only the left button starts a drag and the window
//* control buttons are excluded so clicks on them never move the window.
function handleTopbarPointerDown(event) {
  if (!isTopbarInteractive()) return;
  if (event.button !== 0) return;
  if (event.target.closest('.topbar-btn')) return;
  if (window.startWindowDrag) {
    try { window.startWindowDrag(); } catch (e) { /* shell binding missing — ignore */ }
  }
}

//* The floating shell leaves a visible app-canvas gutter around every panel.
//* Presses that land on that empty chrome (the shell host or the layout row
//* itself, never inside a panel or control) still move the window, so the
//* frameless window keeps a generous grab area despite the inset topbar.
function handleShellBackgroundPointerDown(event) {
  if (!isTopbarInteractive()) return;
  if (event.button !== 0) return;
  const target = event.target;
  if (!(target === event.currentTarget || target.id === 'custom-app' || target.classList.contains('custom-layout'))) return;
  if (window.startWindowDrag) {
    try { window.startWindowDrag(); } catch (e) { /* shell binding missing — ignore */ }
  }
}

//* Double-click on the topbar toggles maximize, mirroring the native caption.
function handleTopbarDoubleClick(event) {
  if (!isTopbarInteractive()) return;
  if (event.target.closest('.topbar-btn')) return;
  handleWindowMaximize();
}

async function refreshMaximizedState() {
  if (!isTopbarInteractive()) return;
  if (window.isWindowMaximized) {
    try {
      const next = !!(await window.isWindowMaximized());
      if (next !== state.isWindowMaximized) {
        state.isWindowMaximized = next;
        renderApp();
      }
    } catch (e) { /* keep previous state */ }
  }
}

async function handleWindowMinimize() {
  if (window.minimizeWindow) {
    try { await window.minimizeWindow(); } catch (e) { /* ignore */ }
  }
}

async function handleWindowMaximize() {
  if (window.maximizeWindow) {
    try { await window.maximizeWindow(); } catch (e) { /* ignore */ }
  }
  // The toggle is asynchronous — poll shortly after so the icon flips to the
  // correct restore/maximize glyph.
  setTimeout(refreshMaximizedState, 60);
}

async function handleWindowClose() {
  if (window.closeWindow) {
    try { await window.closeWindow(); } catch (e) { /* ignore */ }
  }
}

function renderApp() {
  const container = document.getElementById('custom-app');
  if (!container) return;

  // While the user drags the sidebar resize handle, re-rendering would destroy the
  // captured pointer element — the width is applied live instead.
  if (state.isResizingSidebar) return;

  if (state.isDraggingSeekbar) {
    cleanupScrubberDrag();
  }

  try {
    // Save scroll positions before re-rendering so list never jumps
  const wsBody = document.querySelector('.workspace-body');
  const wsScrollTop = wsBody ? wsBody.scrollTop : 0;
  const wsScrollLeft = wsBody ? wsBody.scrollLeft : 0;

  const folderList = document.querySelector('.folder-list');
  const folderScrollTop = folderList ? folderList.scrollTop : 0;

  const tableContainer = document.querySelector('.table-container');
  const tableScrollTop = tableContainer ? tableContainer.scrollTop : 0;
  const tableScrollLeft = tableContainer ? tableContainer.scrollLeft : 0;

  const activeElemId = document.activeElement && document.activeElement.id ? document.activeElement.id : null;
  const activeElemStart = (document.activeElement && 'selectionStart' in document.activeElement) ? document.activeElement.selectionStart : null;
  const activeElemEnd = (document.activeElement && 'selectionEnd' in document.activeElement) ? document.activeElement.selectionEnd : null;

  // On Windows, if VB-Cable is NOT installed and user hasn't dismissed, show mandatory setup screen
  if (!state.isLinux && !state.isVBCableInstalled && !state.dismissedVBCablePrompt) {
    container.innerHTML = renderVBCableRequiredPage();
    return;
  }

  // Retrieve current active category
  let activeTitle = "";
  let soundsList = [];
  let isFolderView = false;
  let activeTab = null;
  let activeFolder = null;

  if (state.currentView === 'folder') {
    activeTab = state.tabs.find(t => t.id === state.activeTabId) || state.tabs[0];
    if (activeTab) {
      state.activeTabId = activeTab.id;
      // Resolve (and prune) the nested folder navigation chain for this category
      const chain = resolveActiveFolderChain(activeTab);
      activeFolder = chain.length > 0 ? chain[chain.length - 1] : null;
      activeTitle = activeFolder ? activeFolder.name : activeTab.name;
      soundsList = activeFolder ? (activeFolder.sounds || []) : (activeTab.sounds || []);
      isFolderView = true;
    } else {
      activeTitle = "Soundboard";
    }
  } else if (state.currentView === 'favorites') {
    activeTitle = "Favorites";
    // Filter all sounds in all categories (nested folders included) marked as favorite
    const favs = [];
    state.tabs.forEach(t => {
      flattenTabSounds(t).forEach(s => {
        if (s.isFavorite) favs.push(s);
      });
    });
    soundsList = favs;
  } else if (state.currentView === 'settings') {
    activeTitle = "Settings";
  } else if (state.currentView === 'system-info') {
    activeTitle = "System Info";
  } else if (state.currentView === 'help') {
    activeTitle = "Help & Support";
  }

  // Filter lists based on search. Searching a category searches its whole folder tree.
  if (state.searchQuery.trim() && state.currentView === 'folder') {
    const query = state.searchQuery.toLowerCase();
    soundsList = flattenTabSounds(activeTab).filter(s => s.name.toLowerCase().includes(query));
  } else if (state.searchQuery.trim() && state.currentView === 'favorites') {
    soundsList = soundsList.filter(s => s.name.toLowerCase().includes(state.searchQuery.toLowerCase()));
  }

  const totalSounds = state.tabs.reduce((acc, t) => acc + countTabSounds(t), 0);
  const totalFavs = state.tabs.reduce((acc, t) => acc + flattenTabSounds(t).filter(s => s.isFavorite).length, 0);

  const targetWindow = state.settings.targetWindow || null;
  const targetRunning = targetWindow ? isTargetWindowRunning() : false;

  container.innerHTML = `
    ${renderAppTopbar()}
    <div class="custom-layout">
      <!-- Left Compact Category Rail -->
      <aside class="custom-sidebar" style="--sidebar-width: ${state.sidebarWidth}px;">
        <!-- Draggable edge: resize the category sidebar (double-click resets) -->
        <div class="sidebar-resize-handle"
             title="Drag to resize the sidebar — double-click to reset"
             onpointerdown="handleSidebarResizeStart(event)"
             ondblclick="handleSidebarResizeReset()"></div>

        <div class="folder-list">
          <div class="folder-item ${state.currentView === 'favorites' ? 'active' : ''}" onclick="changeView('favorites')">
            <div class="folder-name-container">
              <span class="nav-icon" style="color: var(--color-warning);">${icons.favorites}</span>
              <span>Favorites</span>
            </div>
            <span class="category-count">${totalFavs}</span>
          </div>

          ${renderSidebarCategories()}
        </div>

        <!-- Drop zone: dragging a folder here moves it to the end of the list -->
        <div class="sidebar-drop-zone"
             ondragover="handleSidebarRootZoneDragOver(event)"
             ondragleave="handleSidebarRootZoneDragLeave(event)"
             ondrop="handleSidebarRootZoneDrop(event)">
          <span>Drop here to move to the end</span>
        </div>

        <div class="sidebar-add-buttons">
          <button class="add-folder-btn" onclick="handleOpenSidebarNewFolderModal()" title="Create a brand-new, empty soundboard folder">
            ${icons.folderPlus} New Folder
          </button>
          <button class="add-folder-btn" onclick="handleAddTab()" title="Pick a folder from disk — it becomes a new category and its subfolders become the folders inside it">
            ${icons.importIcon} Add Folder as Category
          </button>
          <button class="add-folder-btn secondary" onclick="handleOpenNewSidebarCategoryModal()" title="Create a new empty section to group folders">
            ${icons.plus} New Category
          </button>
        </div>

        <!-- Sidebar Bottom Utility Dock -->
        <div class="sidebar-utility-dock">
          <div class="nav-item ${state.currentView === 'settings' ? 'active' : ''}" onclick="changeView('settings')">
            <span class="nav-icon">${icons.settings}</span>
            <span>Settings & Audio</span>
          </div>
          <div class="nav-item ${state.currentView === 'system-info' ? 'active' : ''}" onclick="changeView('system-info')">
            <span class="nav-icon">${icons.systemInfo}</span>
            <span>Diagnostics</span>
          </div>
          <div class="nav-item ${state.currentView === 'help' ? 'active' : ''}" onclick="changeView('help')">
            <span class="nav-icon">${icons.help}</span>
            <span>Help & Guide</span>
          </div>
        </div>
      </aside>
      
      <!-- Right Main content area -->
      <main class="custom-main">
        <header class="main-header">
          <div class="header-title-container">
            <h2 class="header-title">${activeTitle}</h2>
            ${targetWindow ? `
              <span class="status-pill ${targetRunning ? 'active' : 'warning'}" 
                    title="${targetRunning ? 'Soundboard audio routes exclusively into this window' : 'Target window is not currently open — sounds stay exclusive to it'}">
                ${icons.target} ${escapeHtml(targetWindow)}
              </span>
            ` : (!state.isLinux ? (state.isVBCableSetup ? `
              <span class="status-pill active" title="Microphone routing to VB-Cable is active">● Mic Active</span>
            ` : `
              <span class="status-pill warning" title="VB-Cable passthrough not active (speakers only)">○ Local Only</span>
            `) : '')}
          </div>
          
          <div class="header-actions">
            ${state.outputDevices.length > 0 ? `
              <div class="output-select-container" style="display: flex; align-items: center;">
                <select class="sort-select" style="max-width: min(170px, 24vw); height: 28px; font-size: 11px;" onchange="handleSelectOutputDevice(this.value)">
                  ${state.outputDevices.map(d => {
                    const isActive = state.settings.outputs.includes(d.name);
                    return `<option value="${d.name}" ${isActive ? 'selected' : ''}>Out: ${d.name} ${d.isDefault ? '(Default)' : ''}</option>`;
                  }).join('')}
                </select>
              </div>
            ` : ''}

            ${(state.currentView === 'folder' || state.currentView === 'favorites') ? `
              <div class="search-container">
                <span class="nav-icon" style="color: var(--color-muted);">${icons.search}</span>
                <input type="text" id="search-input" class="search-input" placeholder="Search (Ctrl+F)..." oninput="handleSearch(this.value)" value="${state.searchQuery}">
              </div>

              <div class="view-switcher">
                <button class="view-btn ${state.listViewMode === 'deck' ? 'active' : ''}" title="Stream Deck Macro Pads" onclick="changeListViewMode('deck')">
                  ${icons.deck}
                </button>
                <button class="view-btn ${state.listViewMode === 'table' || state.listViewMode === 'list' ? 'active' : ''}" title="Soundpad High-Density Table" onclick="changeListViewMode('table')">
                  ${icons.table}
                </button>
                <button class="view-btn ${state.listViewMode === 'grid' ? 'active' : ''}" title="Media Grid View" onclick="changeListViewMode('grid')">
                  ${icons.grid}
                </button>
              </div>
            ` : ''}
            
            <!-- Theme Quick Toggle -->
            <button class="action-btn theme-toggle-btn" 
                    style="width: 28px; height: 28px;" 
                    title="${document.body.classList.contains('light-theme') ? 'Switch to Dark Slate Theme' : 'Switch to Light Soft Theme'}" 
                    onclick="toggleTheme()">
              ${document.body.classList.contains('light-theme') ? icons.moon : icons.sun}
            </button>

            <!-- Emergency Panic Button -->
            <button class="panic-stop-btn" onclick="handleStopAll()" title="Emergency Panic Button (ESC)">
              <span class="panic-key">ESC</span>
              <span>STOP ALL</span>
            </button>
          </div>
        </header>
        
        <div class="workspace-body">
          ${renderViewContent(soundsList, isFolderView, activeTab, activeFolder)}
        </div>

        <!-- Bottom transport bar: lives inside the main workspace so it docks
             right next to the sidebar while the sidebar keeps full height -->
        ${renderPlaybackDock()}
      </main>
    </div>
    
    <!-- Modal Overlays -->
    ${renderModalOverlays()}
    ${renderContextMenu()}
    ${renderMultiImageModal()}
    ${renderImportConfirmModal()}
    ${renderNewFolderModal()}
    ${renderRenameTabModal()}
    ${renderNewSidebarFolderModal()}
    ${renderNewSidebarCategoryModal()}
    
    <!-- Toast Notifications container -->
    <div class="toast-container" id="toast-container">
      ${state.toasts.map(t => `
        <div class="toast-message ${t.type}">
          <span>${t.text}</span>
        </div>
      `).join('')}
    </div>
  `;

  // Restore scroll positions so the sound list never jumps to the top
  const newWsBody = document.querySelector('.workspace-body');
  if (newWsBody) {
    newWsBody.scrollTop = wsScrollTop;
    newWsBody.scrollLeft = wsScrollLeft;
  }
  const newFolderList = document.querySelector('.folder-list');
  if (newFolderList) {
    newFolderList.scrollTop = folderScrollTop;
  }
  const newTableContainer = document.querySelector('.table-container');
  if (newTableContainer) {
    newTableContainer.scrollTop = tableScrollTop;
    newTableContainer.scrollLeft = tableScrollLeft;
  }
  if (activeElemId) {
    const el = document.getElementById(activeElemId);
    if (el) {
      el.focus();
      if (activeElemStart !== null && 'setSelectionRange' in el) {
        try { el.setSelectionRange(activeElemStart, activeElemEnd); } catch (e) {}
      }
    }
  }
} catch (err) {
    console.error("Critical error in renderApp:", err);
    container.innerHTML = `
      <div style="padding: 40px; color: #ef4444; font-family: sans-serif; text-align: center;">
        <h2 style="margin-bottom: 12px;">Soundboard Interface Error</h2>
        <p style="color: #94a3b8; font-size: 13px;">An error occurred while displaying the application view.</p>
        <pre style="color: #cbd5e1; background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.1); padding: 16px; border-radius: 8px; max-width: 600px; margin: 20px auto; overflow: auto; text-align: left; font-size: 12px;">${err.stack || err.message}</pre>
        <button style="margin-top: 16px; padding: 8px 16px; background: #3b82f6; border: none; border-radius: 6px; color: #fff; cursor: pointer;" onclick="renderApp()">Retry</button>
      </div>
    `;
  }
}

// Helper to format track durations consistently
function formatDuration(ms) {
  if (!ms) return '';
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  return `${m}:${(s % 60).toString().padStart(2, '0')}`;
}

// Render breadcrumb + subfolder tiles for nested folder navigation inside a category
function renderFolderNavigation(activeTab, activeFolder, isSearching) {
  if (!activeTab || isSearching) return '';

  const chain = resolveActiveFolderChain(activeTab);
  const childFolders = activeFolder ? (activeFolder.folders || []) : (activeTab.folders || []);

  let breadcrumbHtml = '';
  if (chain.length > 0) {
    breadcrumbHtml = `
      <div class="folder-breadcrumb">
        <button class="breadcrumb-segment" title="Back to ${escapeHtml(activeTab.name)}" onclick="navigateToTabRoot()">
          <span class="nav-icon" style="color: var(--color-muted);">${icons.home}</span>
          <span>${escapeHtml(activeTab.name)}</span>
        </button>
        ${chain.map((f, idx) => `
          <span class="breadcrumb-sep">${icons.chevronRight}</span>
          <button class="breadcrumb-segment ${idx === chain.length - 1 ? 'current' : ''}"
                  title="${escapeHtml(f.path || f.name)}" onclick="navigateToFolder(${f.id})">
            <span>${escapeHtml(f.name)}</span>
          </button>
        `).join('')}
      </div>
    `;
  }

  let tilesHtml = '';
  if (childFolders.length > 0) {
    tilesHtml = `
      <div class="subfolder-tiles">
        ${childFolders.map(f => `
          <button class="subfolder-tile" data-drop-folder-id="${f.id}" onclick="navigateToFolder(${f.id})" title="${escapeHtml(f.path || f.name)} — ${countFolderSounds(f)} sound${countFolderSounds(f) === 1 ? '' : 's'}">
            <span class="subfolder-tile-icon">${icons.folder}</span>
            <span class="subfolder-tile-name" title="${escapeHtml(f.name)}">${escapeHtml(f.name)}</span>
            <span class="subfolder-tile-count">${countFolderSounds(f)}</span>
          </button>
        `).join('')}
      </div>
    `;
  }

  return breadcrumbHtml + tilesHtml;
}

// Render dynamic subcomponents inside the workspace body
function renderViewContent(soundsList, isFolderView, activeTab, activeFolder = null) {
  if (state.currentView === 'folder' || state.currentView === 'favorites') {
    const isSearching = !!(state.searchQuery && state.searchQuery.trim());
    const childFolderCount = activeFolder
      ? (activeFolder.folders || []).length
      : ((activeTab && activeTab.folders) || []).length;
    let contentHtml = '';
    
    if (soundsList.length === 0 && (isSearching || childFolderCount === 0)) {
      contentHtml = `
        <div class="table-container">
          <div class="empty-state">
            <div class="empty-icon" style="font-size: 24px;">${isSearching ? '🔎' : '📁'}</div>
            <div class="empty-text">${isSearching ? 'No sounds match your search' : 'No sounds found here'}</div>
            <div style="font-size: 12px; color: var(--color-muted); margin-top: 4px;">${isSearching ? 'Try a different keyword — search covers all subfolders' : 'Add audio files to folders or configure favorite items'}</div>
          </div>
        </div>
      `;
    } else if (state.listViewMode === 'deck' || state.listViewMode === 'soundpad') {
      contentHtml = `
        <div class="deck-grid">
          ${soundsList.map(sound => {
            const ps = state.playingSounds[sound.id];
            const isPlaying = !!ps;
            const hasImage = !!sound.image;
            const isSelected = state.selectedSoundIds && state.selectedSoundIds.includes(sound.id);
            const length = ps ? (ps.lengthInMs || 1) : 0;
            const current = ps ? (ps.readInMs || 0) : 0;
            const percentage = length > 0 ? Math.min((current / length) * 100, 100) : 0;

            return `
              <div class="deck-tile ${isPlaying ? 'playing' : ''} ${hasImage ? 'has-card-image' : ''} ${isSelected ? 'is-selected' : ''}" 
                   style="${hasImage ? `background-image: url('${sound.image}');` : ''}"
                   onclick="handleSoundCardClick(${sound.id}, event)"
                   oncontextmenu="handleSoundContextMenu(${sound.id}, event)">
                ${hasImage ? `<div class="card-image-overlay"></div>` : ''}

                <!-- Top: Favorite + Hotkey Keycap -->
                <div class="deck-tile-top" onclick="event.stopPropagation()">
                  <div style="display: flex; align-items: center; gap: 4px;">
                    <span class="fav-star ${sound.isFavorite ? 'active' : ''}" onclick="toggleFavorite(${sound.id}, ${sound.isFavorite})" title="Favorite">★</span>
                    <button class="action-btn" style="width: 20px; height: 20px; padding: 2px;" title="${hasImage ? 'Change Image (or RMB)' : 'Assign Image (or RMB)'}" onclick="handleAssignSoundImage(${sound.id})">
                      ${icons.image}
                    </button>
                  </div>
                  <button class="macro-keycap ${!sound.hotkeys || !sound.hotkeys.length ? 'unassigned' : ''}" onclick="startRecordHotkey(${sound.id})" title="${sound.hotkeys && sound.hotkeys.length > 0 ? sound.hotkeySequence + ' — click to reassign' : 'Click to assign hotkey'}">
                    ${sound.hotkeys && sound.hotkeys.length > 0 ? sound.hotkeySequence : '+ Key'}
                  </button>
                </div>

                <!-- Middle: Sound Name -->
                <div class="deck-tile-mid">
                  <span class="deck-sound-name" title="${sound.name}">${sound.name}</span>
                </div>

                <!-- Bottom: Equalizer / Duration + Transport -->
                <div class="deck-tile-bottom" onclick="event.stopPropagation()">
                  <div>
                    ${isPlaying ? `
                      <div class="eq-bars">
                        <span class="eq-bar"></span>
                        <span class="eq-bar"></span>
                        <span class="eq-bar"></span>
                        <span class="eq-bar"></span>
                      </div>
                    ` : `
                      <span class="deck-duration-pill">${sound.lengthInMs ? formatDuration(sound.lengthInMs) : ''}</span>
                    `}
                  </div>

                  <div style="display: flex; align-items: center; gap: 3px;">
                    <button class="action-btn play-btn" style="width: 24px; height: 24px;" onclick="handlePlaySound(${sound.id})" title="Play Sound">
                      ${icons.play}
                    </button>
                    <button class="action-btn stop-btn" style="width: 24px; height: 24px;" onclick="handleStopSound(${sound.id})" title="Stop Sound">
                      ${icons.stop}
                    </button>
                    
                    <div class="volume-popover-container ${state.activeVolumePopoverSoundId === sound.id ? 'open' : ''} ${state.hoveredVolumeSoundId === sound.id ? 'is-hovered' : ''}" 
                         onmouseenter="handleVolumeMouseEnter(${sound.id}, event)" 
                         onmouseleave="handleVolumeMouseLeave(${sound.id}, event)">
                      <button class="action-btn ${state.activeVolumePopoverSoundId === sound.id ? 'active' : ''} ${sound.localVolume !== null || sound.remoteVolume !== null ? 'has-custom' : ''}" 
                              style="width: 24px; height: 24px;" title="Volume Override" onclick="toggleVolumePopover(${sound.id}, event)">
                        ${icons.volume}
                      </button>
                      <div class="volume-dropdown ${state.activeVolumePopoverSoundId === sound.id ? 'open' : ''}" 
                           onmousedown="event.stopPropagation()" onpointerdown="event.stopPropagation()" onclick="event.stopPropagation()">
                        <div class="volume-dropdown-header">
                          <span class="vol-dropdown-title">Volume Overrides</span>
                          ${(sound.localVolume !== null || sound.remoteVolume !== null) ? `
                            <button class="vol-reset-btn" onclick="handleResetSoundVolume(${sound.id}, event)" title="Reset to Master Volume">Reset</button>
                          ` : ''}
                        </div>
                        <div class="vol-slider-row">
                          <div class="vol-label-group">
                            <label>Local</label>
                            <span id="vol-text-${sound.id}-local" class="vol-val-badge">${sound.localVolume !== null ? sound.localVolume + '%' : 'Default (' + state.settings.localVolume + '%)'}</span>
                          </div>
                          <input type="range" min="0" max="100" 
                                 value="${sound.localVolume !== null ? sound.localVolume : state.settings.localVolume}" 
                                 onpointerdown="handleSliderDragStart(event)" onmousedown="handleSliderDragStart(event)" 
                                 oninput="handleSoundVolumeInput(${sound.id}, 'local', this.value)">
                        </div>
                        <div class="vol-slider-row">
                          <div class="vol-label-group">
                            <label>Remote</label>
                            <span id="vol-text-${sound.id}-remote" class="vol-val-badge">${sound.remoteVolume !== null ? sound.remoteVolume + '%' : 'Default (' + state.settings.remoteVolume + '%)'}</span>
                          </div>
                          <input type="range" min="0" max="100" 
                                 value="${sound.remoteVolume !== null ? sound.remoteVolume : state.settings.remoteVolume}" 
                                 onpointerdown="handleSliderDragStart(event)" onmousedown="handleSliderDragStart(event)" 
                                 oninput="handleSoundVolumeInput(${sound.id}, 'remote', this.value)">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Live progress underline -->
                <div id="deck-progress-${sound.id}" class="deck-progress-line" style="width: ${percentage}%;"></div>
              </div>
            `;
          }).join('')}
        </div>
      `;
    } else if (state.listViewMode === 'grid') {
      contentHtml = `
        <div class="sound-grid">
          ${soundsList.map(sound => {
            const isPlaying = !!state.playingSounds[sound.id];
            const hasImage = !!sound.image;
            const isSelected = state.selectedSoundIds && state.selectedSoundIds.includes(sound.id);
            return `
              <div class="sound-grid-card ${isPlaying ? 'playing' : ''} ${hasImage ? 'has-card-image' : ''} ${isSelected ? 'is-selected' : ''}" 
                   style="${hasImage ? `background-image: url('${sound.image}');` : ''}"
                   onclick="handleSoundCardClick(${sound.id}, event)"
                   oncontextmenu="handleSoundContextMenu(${sound.id}, event)">
                ${hasImage ? `<div class="card-image-overlay"></div>` : ''}
                <div class="card-top" onclick="event.stopPropagation()">
                  <div style="display: flex; align-items: center; gap: 4px;">
                    <span class="fav-star ${sound.isFavorite ? 'active' : ''}" onclick="toggleFavorite(${sound.id}, ${sound.isFavorite})" title="Favorite">
                      ★
                    </span>
                    <button class="action-btn" style="width: 20px; height: 20px; padding: 2px;" title="${hasImage ? 'Change Image (or RMB)' : 'Assign Image (or RMB)'}" onclick="handleAssignSoundImage(${sound.id})">
                      ${icons.image}
                    </button>
                  </div>
                  <button class="macro-keycap ${!sound.hotkeys || !sound.hotkeys.length ? 'unassigned' : ''}" onclick="startRecordHotkey(${sound.id})" title="${sound.hotkeys && sound.hotkeys.length > 0 ? sound.hotkeySequence + ' — click to reassign' : 'Click to assign hotkey'}">
                    ${sound.hotkeys && sound.hotkeys.length > 0 ? sound.hotkeySequence : '+ Key'}
                  </button>
                </div>
                <div class="card-middle" onclick="handlePlaySound(${sound.id})">
                  ${hasImage ? '' : `<div class="card-sound-icon">${icons.music}</div>`}
                  <span class="card-sound-name" title="${sound.name}">${sound.name}</span>
                </div>
                <div class="card-bottom" onclick="event.stopPropagation()">
                  <div style="display: flex; gap: 4px;">
                    <button class="action-btn play-btn" onclick="handlePlaySound(${sound.id})" title="Play">
                      ${icons.play}
                    </button>
                    <button class="action-btn stop-btn" onclick="handleStopSound(${sound.id})" title="Stop">
                      ${icons.stop}
                    </button>
                  </div>
                  
                  <div class="volume-popover-container ${state.activeVolumePopoverSoundId === sound.id ? 'open' : ''} ${state.hoveredVolumeSoundId === sound.id ? 'is-hovered' : ''}" 
                       onmouseenter="handleVolumeMouseEnter(${sound.id}, event)" 
                       onmouseleave="handleVolumeMouseLeave(${sound.id}, event)" 
                       onclick="event.stopPropagation()">
                    <button class="action-btn ${state.activeVolumePopoverSoundId === sound.id ? 'active' : ''} ${sound.localVolume !== null || sound.remoteVolume !== null ? 'has-custom' : ''}" title="Adjust Volume" onclick="toggleVolumePopover(${sound.id}, event)">
                      ${icons.volume}
                    </button>
                    <div class="volume-dropdown ${state.activeVolumePopoverSoundId === sound.id ? 'open' : ''}" 
                         onmousedown="event.stopPropagation()" 
                         onpointerdown="event.stopPropagation()" 
                         onclick="event.stopPropagation()">
                      <div class="volume-dropdown-header">
                        <span class="vol-dropdown-title">Volume Overrides</span>
                        ${(sound.localVolume !== null || sound.remoteVolume !== null) ? `
                          <button class="vol-reset-btn" onclick="handleResetSoundVolume(${sound.id}, event)" title="Reset to Master Volume">Reset</button>
                        ` : ''}
                      </div>
                      <div class="vol-slider-row">
                        <div class="vol-label-group">
                          <label>Local</label>
                          <span id="vol-text-${sound.id}-local" class="vol-val-badge">${sound.localVolume !== null ? sound.localVolume + '%' : 'Default (' + state.settings.localVolume + '%)'}</span>
                        </div>
                        <input type="range" min="0" max="100" 
                               value="${sound.localVolume !== null ? sound.localVolume : state.settings.localVolume}" 
                               onpointerdown="handleSliderDragStart(event)" 
                               onmousedown="handleSliderDragStart(event)" 
                               oninput="handleSoundVolumeInput(${sound.id}, 'local', this.value)">
                      </div>
                      <div class="vol-slider-row">
                        <div class="vol-label-group">
                          <label>Remote</label>
                          <span id="vol-text-${sound.id}-remote" class="vol-val-badge">${sound.remoteVolume !== null ? sound.remoteVolume + '%' : 'Default (' + state.settings.remoteVolume + '%)'}</span>
                        </div>
                        <input type="range" min="0" max="100" 
                               value="${sound.remoteVolume !== null ? sound.remoteVolume : state.settings.remoteVolume}" 
                               onpointerdown="handleSliderDragStart(event)" 
                               onmousedown="handleSliderDragStart(event)" 
                               oninput="handleSoundVolumeInput(${sound.id}, 'remote', this.value)">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `;
    } else {
      // Soundpad High-Density Table View
      contentHtml = `
        <div class="table-container">
          <table class="sounds-table">
            <thead>
              <tr>
                <th style="width: 34px; text-align: center;">#</th>
                <th style="width: 30px; text-align: center;">★</th>
                <th style="width: 36px; text-align: center;">Play</th>
                <th>Sound Name</th>
                <th style="width: 140px;">Hotkey</th>
                <th style="width: 60px;">Length</th>
                <th style="width: 65px;">Status</th>
                <th style="width: 70px;">Volume</th>
                <th style="width: 90px; text-align: right;">Actions</th>
              </tr>
            </thead>
            <tbody>
              ${soundsList.map((sound, idx) => {
                const isPlaying = !!state.playingSounds[sound.id];
                const isSelected = state.selectedSoundIds && state.selectedSoundIds.includes(sound.id);
                return `
                  <tr class="sound-row ${isPlaying ? 'playing' : ''} ${isSelected ? 'is-selected' : ''}" 
                      onclick="handleSoundCardClick(${sound.id}, event)"
                      ondblclick="handlePlaySound(${sound.id})" 
                      oncontextmenu="handleSoundContextMenu(${sound.id}, event)">
                    <td style="text-align: center; font-family: var(--font-mono); font-size: 11px; color: var(--color-muted);">${idx + 1}</td>
                    <td style="text-align: center;">
                      <span class="fav-star ${sound.isFavorite ? 'active' : ''}" onclick="event.stopPropagation(); toggleFavorite(${sound.id}, ${sound.isFavorite})">
                        ★
                      </span>
                    </td>
                    <td style="text-align: center;">
                      <button class="action-btn ${isPlaying ? 'stop-btn' : 'play-btn'}" style="width: 22px; height: 22px; margin: 0 auto;" onclick="event.stopPropagation(); ${isPlaying ? `handleStopSound(${sound.id})` : `handlePlaySound(${sound.id})`}">
                        ${isPlaying ? icons.stop : icons.play}
                      </button>
                    </td>
                    <td>
                      <div class="sound-name-wrapper" style="display: flex; align-items: center; gap: 7px;">
                        ${sound.image ? `
                          <div class="sound-row-avatar" style="background-image: url('${sound.image}');" title="Assigned image"></div>
                        ` : ''}
                        <span class="sound-name-text">${sound.name}</span>
                      </div>
                    </td>
                    <td>
                      <button class="macro-keycap ${!sound.hotkeys || !sound.hotkeys.length ? 'unassigned' : ''}" onclick="event.stopPropagation(); startRecordHotkey(${sound.id})" title="${sound.hotkeys && sound.hotkeys.length > 0 ? sound.hotkeySequence + ' — click to reassign' : 'Click to assign hotkey'}">
                        ${sound.hotkeys && sound.hotkeys.length > 0 ? sound.hotkeySequence : '+ Key'}
                      </button>
                    </td>
                    <td>
                      <span style="font-family: var(--font-mono); font-size: 10.5px; color: var(--color-muted);">
                        ${sound.lengthInMs ? formatDuration(sound.lengthInMs) : '--'}
                      </span>
                    </td>
                    <td>
                      ${isPlaying ? `
                        <div class="eq-bars">
                          <span class="eq-bar"></span>
                          <span class="eq-bar"></span>
                          <span class="eq-bar"></span>
                          <span class="eq-bar"></span>
                        </div>
                      ` : `<span style="font-size: 11px; color: var(--color-muted);">Ready</span>`}
                    </td>
                    <td>
                      <span style="font-family: var(--font-mono); font-size: 11px; color: ${sound.localVolume !== null || sound.remoteVolume !== null ? 'var(--color-accent)' : 'var(--color-muted)'};">
                        ${sound.localVolume !== null ? sound.localVolume + '%' : 'Default'}
                      </span>
                    </td>
                    <td>
                      <div class="action-buttons" onclick="event.stopPropagation()">
                        <button class="action-btn" style="width: 22px; height: 22px;" title="${sound.image ? 'Change Image' : 'Assign Image'}" onclick="handleAssignSoundImage(${sound.id})">
                          ${icons.image}
                        </button>
                        
                        <!-- Volume Sliders Popover trigger -->
                        <div class="volume-popover-container ${state.activeVolumePopoverSoundId === sound.id ? 'open' : ''} ${state.hoveredVolumeSoundId === sound.id ? 'is-hovered' : ''}" 
                             onmouseenter="handleVolumeMouseEnter(${sound.id}, event)" 
                             onmouseleave="handleVolumeMouseLeave(${sound.id}, event)">
                          <button class="action-btn ${state.activeVolumePopoverSoundId === sound.id ? 'active' : ''} ${sound.localVolume !== null || sound.remoteVolume !== null ? 'has-custom' : ''}" style="width: 22px; height: 22px;" title="Adjust Volume" onclick="toggleVolumePopover(${sound.id}, event)">
                            ${icons.volume}
                          </button>
                          <div class="volume-dropdown ${state.activeVolumePopoverSoundId === sound.id ? 'open' : ''}" 
                               onmousedown="event.stopPropagation()" 
                               onpointerdown="event.stopPropagation()" 
                               onclick="event.stopPropagation()">
                            <div class="volume-dropdown-header">
                              <span class="vol-dropdown-title">Volume Overrides</span>
                              ${(sound.localVolume !== null || sound.remoteVolume !== null) ? `
                                <button class="vol-reset-btn" onclick="handleResetSoundVolume(${sound.id}, event)" title="Reset to Master Volume">Reset</button>
                              ` : ''}
                            </div>
                            <div class="vol-slider-row">
                              <div class="vol-label-group">
                                <label>Local Volume</label>
                                <span id="vol-text-${sound.id}-local" class="vol-val-badge">${sound.localVolume !== null ? sound.localVolume + '%' : 'Default (' + state.settings.localVolume + '%)'}</span>
                              </div>
                              <input type="range" min="0" max="100" 
                                     value="${sound.localVolume !== null ? sound.localVolume : state.settings.localVolume}" 
                                     onpointerdown="handleSliderDragStart(event)" 
                                     onmousedown="handleSliderDragStart(event)" 
                                     oninput="handleSoundVolumeInput(${sound.id}, 'local', this.value)">
                            </div>
                            <div class="vol-slider-row">
                              <div class="vol-label-group">
                                <label>Remote Volume</label>
                                <span id="vol-text-${sound.id}-remote" class="vol-val-badge">${sound.remoteVolume !== null ? sound.remoteVolume + '%' : 'Default (' + state.settings.remoteVolume + '%)'}</span>
                              </div>
                              <input type="range" min="0" max="100" 
                                     value="${sound.remoteVolume !== null ? sound.remoteVolume : state.settings.remoteVolume}" 
                                     onpointerdown="handleSliderDragStart(event)" 
                                     onmousedown="handleSliderDragStart(event)" 
                                     oninput="handleSoundVolumeInput(${sound.id}, 'remote', this.value)">
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      `;
    }

    let selectionBarHtml = '';
    if (state.selectedSoundIds && state.selectedSoundIds.length > 0) {
      selectionBarHtml = `
        <div class="selection-action-bar">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span><strong>${state.selectedSoundIds.length}</strong> sound(s) selected</span>
          </div>
          <div style="display: flex; gap: 8px;">
            <button class="btn-subtle" onclick="handleOpenMultiImageModal()">${icons.image} Assign Image...</button>
            <button class="btn-subtle danger" onclick="handleRemoveSoundsImage(state.selectedSoundIds)">${icons.trash} Remove Images</button>
            <button class="btn-subtle" onclick="handleClearSelectedSounds()">Deselect All</button>
          </div>
        </div>
      `;
    }

    return `
      ${isFolderView && activeTab ? `
        <div class="table-header-wrapper">
          <div class="checkbox-desc">Sort mode settings automatically sync with files order</div>
          <div class="toolbar-controls-group">
            <button class="btn-subtle" title="Create a new folder inside the current location" onclick="handleOpenNewFolderModal()">
              ${icons.folderPlus} New Folder
            </button>
            <button class="btn-subtle" title="Import a folder — every subfolder is scanned and sounds stay in their original folders"
                    onclick="handleImportFolder()" ${state.isImportingFolder ? 'disabled style="opacity: 0.55; pointer-events: none;"' : ''}>
              ${state.isImportingFolder ? icons.spinner : icons.importIcon} ${state.isImportingFolder ? 'Importing…' : 'Import Folder'}
            </button>
            <div class="boost-control" title="Sound boost for this soundboard only — amplifies playback above 100%">
              <span class="boost-control-label">${icons.bolt} Boost</span>
              <input type="range" id="tab-boost-input" class="fader-range boost-range" min="100" max="400" step="5"
                     value="${typeof activeTab.boost === 'number' ? activeTab.boost : 100}"
                     onpointerdown="handleSliderDragStart(event)"
                     onmousedown="handleSliderDragStart(event)"
                     oninput="handleTabBoostInput(${activeTab.id}, this.value)"
                     onchange="handleTabBoostCommit(${activeTab.id}, this.value)">
              <span id="tab-boost-text" class="vol-val-badge ${activeTab.boost > 100 ? 'boosted' : ''}">${typeof activeTab.boost === 'number' ? activeTab.boost : 100}%</span>
              ${activeTab.boost > 100 ? `
                <button class="vol-reset-btn" title="Reset boost to 100%" onclick="handleTabBoostReset(${activeTab.id})">Reset</button>
              ` : ''}
            </div>
            <select class="sort-select" onchange="handleSetSortMode(${activeTab.id}, this.value)">
              <option value="0" ${activeTab.sortMode === 0 ? 'selected' : ''}>Modified Date (Asc)</option>
              <option value="1" ${activeTab.sortMode === 1 ? 'selected' : ''}>Modified Date (Desc)</option>
              <option value="2" ${activeTab.sortMode === 2 ? 'selected' : ''}>Alphabetical (Asc)</option>
              <option value="3" ${activeTab.sortMode === 3 ? 'selected' : ''}>Alphabetical (Desc)</option>
            </select>
          </div>
        </div>
      ` : ''}
      
      ${selectionBarHtml}
      ${isFolderView && activeTab ? renderFolderNavigation(activeTab, activeFolder, isSearching) : ''}
      ${contentHtml}
    `;
  }


  if (state.currentView === 'settings') {
    return `
      <div class="settings-grid">
        <!-- Settings Panel Column 1 -->
        <div style="display: flex; flex-direction: column; gap: var(--spacing-xl);">
          <div class="card-section">
            <div class="card-title">Playback Configurations</div>
            <div style="display: flex; flex-direction: column; gap: var(--spacing-md);">
              <label class="checkbox-row">
                <input type="checkbox" ${state.settings.muteDuringPlayback ? 'checked' : ''} onchange="updateSetting('muteDuringPlayback', this.checked)">
                <div class="checkbox-label-wrapper">
                  <span class="checkbox-title">Mute Microphones during playback</span>
                  <span class="checkbox-desc">Mute your active micro input signal while playing soundboard effects.</span>
                </div>
              </label>
              <label class="checkbox-row">
                <input type="checkbox" ${state.settings.allowOverlapping ? 'checked' : ''} onchange="updateSetting('allowOverlapping', this.checked)">
                <div class="checkbox-label-wrapper">
                  <span class="checkbox-title">Allow Overlapping Sounds</span>
                  <span class="checkbox-desc">Permit multiple sound streams to play simultaneously without cutoffs.</span>
                </div>
              </label>
              <label class="checkbox-row">
                <input type="checkbox" ${state.settings.minimizeToTray ? 'checked' : ''} onchange="updateSetting('minimizeToTray', this.checked)">
                <div class="checkbox-label-wrapper">
                  <span class="checkbox-title">Minimize to system tray</span>
                  <span class="checkbox-desc">Minimize the soundboard window to the system taskbar tray on close.</span>
                </div>
              </label>
              <label class="checkbox-row">
                <input type="checkbox" ${state.settings.tabHotkeysOnly ? 'checked' : ''} onchange="updateSetting('tabHotkeysOnly', this.checked)">
                <div class="checkbox-label-wrapper">
                  <span class="checkbox-title">Restrict Hotkeys to Active Tab</span>
                  <span class="checkbox-desc">Disable hotkeys belonging to files outside the currently selected directory.</span>
                </div>
              </label>
              <label class="checkbox-row">
                <input type="checkbox" ${state.settings.deleteToTrash ? 'checked' : ''} onchange="updateSetting('deleteToTrash', this.checked)">
                <div class="checkbox-label-wrapper">
                  <span class="checkbox-title">Delete files to trash bin</span>
                  <span class="checkbox-desc">Move deleted soundboard files to system recycle bin rather than erasing.</span>
                </div>
              </label>
            </div>
          </div>
          
          <div class="card-section">
            <div class="card-title">System Themes</div>
            <div class="form-group">
              <label for="theme-select">Visual Design Appearance</label>
              <select id="theme-select" class="sort-select" style="width: 100%; height: 36px;" onchange="updateSetting('theme', parseInt(this.value, 10))">
                <option value="0" ${state.settings.theme === 0 ? 'selected' : ''}>Follow System Settings</option>
                <option value="1" ${state.settings.theme === 1 ? 'selected' : ''}>Dark Slate Theme</option>
                <option value="2" ${state.settings.theme === 2 ? 'selected' : ''}>Light Soft Theme</option>
              </select>
            </div>
          </div>

          <div class="card-section">
            <div class="card-title">Default Layout & View Mode</div>
            <div class="form-group">
              <label for="default-view-select">Default Soundboard View Mode</label>
              <select id="default-view-select" class="sort-select" style="width: 100%; height: 36px;" onchange="updateDefaultViewMode(this.value)">
                <option value="grid" ${state.listViewMode === 'grid' ? 'selected' : ''}>Media Grid View (Default)</option>
                <option value="deck" ${state.listViewMode === 'deck' ? 'selected' : ''}>Stream Deck Macro Pads</option>
                <option value="table" ${state.listViewMode === 'table' ? 'selected' : ''}>Soundpad High-Density Table</option>
              </select>
            </div>
          </div>
          
          <div class="card-section">
            <div class="card-title">Global Shortcut Hotkeys</div>
            <div style="display: flex; flex-direction: column; gap: var(--spacing-md);">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div class="checkbox-label-wrapper">
                  <span class="checkbox-title">PTT (Push-To-Talk) keys</span>
                  <span class="checkbox-desc">Exempt these keys from mute blocks.</span>
                </div>
                <button class="hotkey-badge" onclick="startRecordHotkey(null, 'ptt')">
                  ${state.settings.pushToTalkKeys && state.settings.pushToTalkKeys.length > 0 ? 'PTT Active' : 'Assign'}
                </button>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div class="checkbox-label-wrapper">
                  <span class="checkbox-title">Stop Hotkey</span>
                  <span class="checkbox-desc">Emergency shortcut to stop all audios.</span>
                </div>
                <button class="hotkey-badge" onclick="startRecordHotkey(null, 'stop')">
                  ${state.settings.stopHotkey && state.settings.stopHotkey.length > 0 ? 'Stop Active' : 'Assign'}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Settings Panel Column 2 -->
        <div style="display: flex; flex-direction: column; gap: var(--spacing-xl);">
          <div class="card-section">
            <div class="card-title">Master Audio Volumes</div>
            <div style="display: flex; flex-direction: column; gap: var(--spacing-md); margin-bottom: var(--spacing-md);">
              <div class="vol-slider-row">
                <div class="vol-label-group">
                  <label>Master Local Volume (You Hear)</label>
                  <span id="settings-vol-text-local" class="vol-val-badge">${state.settings.localVolume}%</span>
                </div>
                <input type="range" id="settings-vol-input-local" min="0" max="100" value="${state.settings.localVolume}" oninput="handleMasterVolumeInput('local', this.value)">
              </div>
              <div class="vol-slider-row">
                <div class="vol-label-group">
                  <label>Master Remote Volume (Others Hear)</label>
                  <span id="settings-vol-text-remote" class="vol-val-badge">${state.settings.remoteVolume}%</span>
                </div>
                <input type="range" id="settings-vol-input-remote" min="0" max="100" value="${state.settings.remoteVolume}" oninput="handleMasterVolumeInput('remote', this.value)">
              </div>
            </div>
            <label class="checkbox-row">
              <input type="checkbox" ${state.settings.syncVolumes ? 'checked' : ''} onchange="updateSetting('syncVolumes', this.checked)">
              <div class="checkbox-label-wrapper">
                <span class="checkbox-title">Sync Volume levels</span>
                <span class="checkbox-desc">Bind local and remote playback output slider volume levels together.</span>
              </div>
            </label>
          </div>

          <div class="card-section" style="margin-top: var(--spacing-xl);">
            <div class="card-title">Sound Boost</div>
            <div style="display: flex; flex-direction: column; gap: var(--spacing-md);">
              <div class="vol-slider-row">
                <div class="vol-label-group">
                  <label>Global Boost (all soundboards)</label>
                  <span id="settings-boost-text" class="vol-val-badge ${state.settings.soundBoost > 100 ? 'boosted' : ''}">${state.settings.soundBoost}%</span>
                </div>
                <input type="range" id="settings-boost-input" min="100" max="400" step="5" value="${state.settings.soundBoost}"
                       onpointerdown="handleSliderDragStart(event)" onmousedown="handleSliderDragStart(event)"
                       oninput="handleGlobalBoostInput(this.value)">
              </div>
              <div class="checkbox-desc boost-desc">
                Amplify quiet audio clips above 100% output. Stacks with the per-soundboard boost shown in each category view.
                Excessive boosting may introduce clipping distortion.
              </div>
              ${state.settings.soundBoost > 100 ? `
                <div>
                  <button class="vol-reset-btn" onclick="handleResetGlobalBoost()">Reset to 100%</button>
                </div>
              ` : ''}
            </div>
          </div>

          <div class="card-section">
            <div class="card-title">Audio Output Routing</div>
            <label class="checkbox-row">
              <input type="checkbox" ${state.settings.allowMultipleOutputs ? 'checked' : ''} onchange="updateSetting('allowMultipleOutputs', this.checked)">
              <div class="checkbox-label-wrapper">
                <span class="checkbox-title">Allow multi-device routing</span>
                <span class="checkbox-desc">Output sound streams to multiple output targets concurrently.</span>
              </div>
            </label>
            <label class="checkbox-row">
              <input type="checkbox" ${state.settings.useAsDefaultDevice ? 'checked' : ''} onchange="updateSetting('useAsDefaultDevice', this.checked)">
              <div class="checkbox-label-wrapper">
                <span class="checkbox-title">Use as Default Devices</span>
                <span class="checkbox-desc">Inject audio outputs as defaults.</span>
              </div>
            </label>
            
            <div style="margin-top: var(--spacing-md);">
              <span class="checkbox-title" style="font-size: 12px; font-weight: 600;">Available Sound Destinations</span>
              <div class="output-list">
                ${state.outputDevices.length === 0 ? `
                  <div class="checkbox-desc">No playback devices recognized</div>
                ` : state.outputDevices.map(d => {
                  const isActive = state.settings.outputs.includes(d.name);
                  return `
                    <div class="output-item ${isActive ? 'active' : ''}" onclick="toggleOutputDevice('${d.name}')">
                      <div style="width: 8px; height: 8px; border-radius: 50%; background-color: ${isActive ? 'var(--color-accent)' : 'var(--color-muted)'}; margin-right: 4px;"></div>
                      <span>${d.name} ${d.isDefault ? '(Default)' : ''}</span>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          </div>
          
          <!-- Target Window: exclusive audio routing into a single app -->
          <div class="card-section">
            <div class="card-title">Target Window Routing</div>
            <div style="display: flex; flex-direction: column; gap: var(--spacing-md);">
              <div class="target-window-desc">
                ${icons.target}
                <div>
                  <div class="checkbox-title">Route soundboard audio into one application</div>
                  <div class="checkbox-desc">When a target window is selected (e.g. Roblox), sounds are sent exclusively into that app — other programs such as Discord never receive soundboard audio. You always hear the sounds locally too.</div>
                </div>
              </div>

              <div class="target-window-desc">
                ${icons.list}
                <div>
                  <div class="checkbox-title">All open applications are listed</div>
                  <div class="checkbox-desc">The picker shows every application you currently have open — pick any of them as the routing target. Open the app you want, then press Refresh to re-scan.</div>
                </div>
              </div>

              <div class="target-window-row">
                <select id="target-window-select" class="sort-select" style="flex: 1; height: 32px;"
                        onchange="handleSelectTargetWindow(this.value)">
                  <option value="" ${!state.settings.targetWindow ? 'selected' : ''}>None — route normally</option>
                  ${state.settings.targetWindow && !state.openWindows.some(w => w.processName === state.settings.targetWindow) ? `
                    <option value="${escapeHtml(state.settings.targetWindow)}" selected>
                      ${escapeHtml(state.settings.targetWindow)} (not running)
                    </option>
                  ` : ''}
                  ${state.openWindows.map(w => `
                    <option value="${escapeHtml(w.processName)}" ${state.settings.targetWindow === w.processName ? 'selected' : ''}>
                      ${escapeHtml(w.title)} (${escapeHtml(w.processName)})
                    </option>
                  `).join('')}
                </select>
                <button class="btn-subtle" style="height: 32px;" title="Re-scan open application windows" onclick="refreshOpenWindows(true)">
                  ${state.isLoadingWindows ? icons.spinner : icons.refresh} Refresh
                </button>
              </div>

              ${state.settings.targetWindow ? `
                <div class="target-window-status ${isTargetWindowRunning() ? 'running' : 'offline'}">
                  ${isTargetWindowRunning() ? `${icons.target} <span><strong>${escapeHtml(state.settings.targetWindow)}</strong> is running — sounds route exclusively into it and you hear them locally.</span>` : `<span>⚠ <strong>${escapeHtml(state.settings.targetWindow)}</strong> is not open right now. Sounds stay exclusive to it and will not leak to other apps — open the app to send audio to it.</span>`}
                </div>
                ${!state.isLinux ? `
                  <div class="checkbox-desc">Tip: make sure the target app listens on the selected output below (e.g. set Roblox' microphone to the VB-Cable) so it picks up the soundboard.</div>
                ` : ''}
              ` : (state.openWindows.length === 0 && !state.isLoadingWindows ? `
                <div class="checkbox-desc">No open application windows detected${state.isLinux ? ' (Linux lists open windows as best-effort)' : ' — open the app you want to route into, then click Refresh'}</div>
              ` : '')}
            </div>
          </div>

          <!-- OS Specific Tools panels -->
          ${renderOsSettingsPanel()}
        </div>
      </div>
    `;
  }

  if (state.currentView === 'system-info') {
    const rawLines = state.systemInfo ? state.systemInfo.split('\n') : [];
    return `
      <div class="card-section">
        <div class="card-title">Hardware and Environment Specifications</div>
        <div class="system-info-grid">
          ${rawLines.map(line => {
            const parts = line.split(':');
            if (parts.length < 2) return '';
            return `
              <div class="info-card">
                <div class="info-card-label">${parts[0].trim()}</div>
                <div class="info-card-value">${parts.slice(1).join(':').trim()}</div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  if (state.currentView === 'help') {
    return `
      <div class="card-section">
        <div class="card-title">Soundboard Documentation & Help</div>
        <div style="display: flex; flex-direction: column; gap: var(--spacing-md); font-size: 13px; color: var(--color-secondary); line-height: 1.6;">
          <p>Welcome to <strong>Audiopad</strong>! This soundboard application allows you to play audio tracks through your output speakers and virtual microphones simultaneously to other channels (e.g. Discord, TeamSpeak, Skype).</p>
          
          <h4 style="font-weight: 600; color: var(--color-primary); margin-top: var(--spacing-sm);">Quick Instructions:</h4>
          <ol style="margin-left: var(--spacing-lg); display: flex; flex-direction: column; gap: var(--spacing-xs);">
            <li>Add folder directories holding your sound files (*.mp3, *.wav, *.ogg) in the left sidebar directory list.</li>
            <li>Assign custom shortcuts (hotkeys) by clicking the badge inside the sounds list rows.</li>
            <li>Configure audio sinks and mic settings in the <strong>Settings</strong> page to verify routing works.</li>
          </ol>
          
          <div style="display: flex; gap: var(--spacing-sm); margin-top: var(--spacing-md);">
            <button class="btn-primary" onclick="handleOpenUrl('https://audiopad.vercel.app/')">
              Visit Website
            </button>
            <button class="btn-primary" style="background-color: var(--color-secondary);" onclick="handleOpenUrl('https://github.com/audiopadapp/audiopad')">
              Source Code Repository
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

// Render dynamic Windows/Linux settings panel depending on OS detected
function renderOsSettingsPanel() {
  if (!state.isLinux) {
    // Windows VB-Cable settings
    const isSetup = !!state.isVBCableSetup;
    const isInstalled = !!state.isVBCableInstalled;
    const isElevated = !!state.isElevated;
    const selectedName = state.selectedMic ? state.selectedMic.name : '';
    return `
      <div class="card-section">
        <div class="card-title">Windows Routing Tools</div>
        <div style="display: flex; flex-direction: column; gap: var(--space-md);">
          ${!isInstalled ? `
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px 12px; background: var(--color-warning-subtle); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: var(--radius-sm);">
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="font-size: 16px;">⚠️</span>
                <div>
                  <div style="font-size: 11.5px; font-weight: 600; color: var(--color-warning);">VB-Audio Cable Not Detected</div>
                  <div style="font-size: 10.5px; color: var(--color-secondary);">Install driver to route soundboard audio into microphone.</div>
                </div>
              </div>
              <button class="btn-primary" style="padding: 5px 10px; font-size: 11px;" onclick="window.openUrl && window.openUrl('https://vb-audio.com/Cable/')">
                Download Cable
              </button>
            </div>
          ` : ''}

          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div class="checkbox-label-wrapper">
              <div style="display: flex; align-items: center; gap: 6px;">
                <span class="checkbox-title">VB-Audio Cable Integration</span>
                <span class="status-pill ${isSetup ? 'active' : (isInstalled ? 'warning' : 'admin')}">
                  ${isSetup ? '● Active' : (isInstalled ? '○ Not Configured' : '○ Missing Driver')}
                </span>
              </div>
              <span class="checkbox-desc">
                ${isSetup && selectedName 
                  ? `Routing <strong>${selectedName}</strong> audio stream to VB-Cable.` 
                  : (isInstalled ? `Routes microphone audio to virtual cable output.` : `Requires free VB-Audio Virtual Cable driver.`)}
              </span>
            </div>
            <button class="btn-primary" style="padding: 5px 10px; font-size: 11px; ${isSetup ? 'background-color: var(--bg-surface); border: 1px solid var(--border-color); color: var(--color-primary);' : ''}" onclick="handleVBCableSetup()">
              ${isSetup ? 'Reconfigure' : (isInstalled ? 'Configure Routing' : 'Get Driver')}
            </button>
          </div>
          
          <div style="display: flex; flex-direction: column; gap: 4px;">
            <label for="mic-override-select" style="font-size: 11px; color: var(--color-secondary);">Override Microphone device</label>
            <select id="mic-override-select" class="sort-select" style="width: 100%; height: 30px;" onchange="handleMicOverrideChange(this.value)">
              <option value="" ${!isSetup || !state.selectedMic ? 'selected' : ''}>No Override</option>
              ${state.recordingDevices.map(d => {
                const isSelected = isSetup && state.selectedMic && (state.selectedMic.guid === d.guid || state.selectedMic.name === d.name);
                return `<option value="${d.guid}" ${isSelected ? 'selected' : ''}>${d.name}</option>`;
              }).join('')}
            </select>
          </div>
          
          ${isElevated ? `
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 8px 12px; background: var(--color-active-subtle); border: 1px solid rgba(34, 197, 94, 0.25); border-radius: var(--radius-sm);">
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="font-size: 14px;">🛡️</span>
                <div>
                  <div style="font-size: 11.5px; font-weight: 600; color: var(--color-active-signal);">Administrator Privileges</div>
                  <div style="font-size: 10.5px; color: var(--color-secondary);">Direct audio endpoint permissions active</div>
                </div>
              </div>
              <button class="btn-primary" style="padding: 4px 10px; font-size: 11px; background: var(--bg-surface); border: 1px solid var(--border-color); color: var(--color-primary);" onclick="handleOpenSoundControlPanel()">
                Sound Control Panel
              </button>
            </div>
          ` : `
            <div style="display: flex; flex-direction: column; gap: 6px;">
              <button class="btn-primary" style="width: 100%; padding: 7px 12px;" onclick="handleRestartAsAdmin()">
                🛡️ Elevate Privileges (UAC)
              </button>
              <button class="btn-primary" style="padding: 5px 10px; font-size: 11px; background: transparent; border: 1px solid var(--border-color); color: var(--color-secondary); width: 100%;" onclick="handleOpenSoundControlPanel()">
                Open Sound Control Panel (Manual Fallback)
              </button>
            </div>
          `}
        </div>
      </div>
    `;
  } else {
    // Linux PulseAudio passthrough settings
    return `
      <div class="card-section">
        <div class="card-title">Linux PulseAudio Sinks</div>
        <div style="display: flex; flex-direction: column; gap: var(--space-md);">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div class="checkbox-label-wrapper">
              <span class="checkbox-title">PulseAudio Switch-On-Connect</span>
              <span class="checkbox-desc">Configure PA module connection state.</span>
            </div>
            <button class="btn-primary" style="padding: 4px 10px; font-size: 11px;" onclick="handleUnloadSwitchOnConnect()">
              Reset Modules
            </button>
          </div>
          
          <div style="margin-top: 4px;">
            <span class="checkbox-title" style="font-size: 11.5px; font-weight: 600;">Running Applications Passthrough</span>
            <div class="output-list" style="margin-top: 4px;">
              ${state.playbackApps.length === 0 ? `
                <div class="checkbox-desc">No running playback apps recognized</div>
              ` : state.playbackApps.map(app => {
                const isPassthroughActive = !!app.passthroughActive;
                return `
                  <div class="output-item ${isPassthroughActive ? 'active' : ''}" onclick="handleLinuxPassthrough('${app.name}', ${isPassthroughActive})">
                    <span>${app.name} ${isPassthroughActive ? '(Routing)' : '(No Routing)'}</span>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

function formatMs(ms) {
  if (!ms || ms < 0) return '0:00';
  const totalSecs = Math.floor(ms / 1000);
  const mins = Math.floor(totalSecs / 60);
  const secs = totalSecs % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function getActivePlayback() {
  if (state.currentPlayingSoundId !== null && state.currentPlayingSoundId !== undefined) {
    const details = state.playingSounds[state.currentPlayingSoundId];
    if (details) {
      const playId = (details.id !== undefined) ? details.id : (details.sound ? details.sound.id : state.currentPlayingSoundId);
      const soundId = (details.sound && details.sound.id !== undefined) ? details.sound.id : playId;
      return { soundKey: state.currentPlayingSoundId, details, playId, soundId };
    }
  }

  const activeIds = Object.keys(state.playingSounds);
  if (activeIds.length === 0) return null;
  for (let i = activeIds.length - 1; i >= 0; i--) {
    const soundKey = activeIds[i];
    const details = state.playingSounds[soundKey];
    if (details) {
      const playId = (details.id !== undefined) ? details.id : (details.sound ? details.sound.id : soundKey);
      const soundId = (details.sound && details.sound.id !== undefined) ? details.sound.id : playId;
      state.currentPlayingSoundId = soundKey;
      return { soundKey, details, playId, soundId };
    }
  }
  return null;
}

//* Ordered list of every currently playing sound (keyed by sound.id). Used by
//* the multi-sound dock: each entry renders as its own chip with an individual
//* progress bar, so simultaneous playbacks are all visible at once instead of
//* the old single-title slot that flickered between sounds.
function getPlayingSoundsList() {
  return Object.keys(state.playingSounds)
    .map(key => {
      const details = state.playingSounds[key];
      if (!details || !details.sound) return null;
      const playId = (details.id !== undefined) ? details.id : details.sound.id;
      return { key, details, playId, soundId: details.sound.id };
    })
    .filter(Boolean);
}

//* Selects which playing sound the transport controls act on (the highlighted
//* chip). A full re-render refreshes the chip highlighting.
function handleSelectDockChip(soundKey) {
  if (!Object.prototype.hasOwnProperty.call(state.playingSounds, soundKey)) return;
  if (state.currentPlayingSoundId === soundKey) return;
  state.currentPlayingSoundId = soundKey;
  cleanupScrubberDrag();
  renderApp();
}

function updateDockControlsInPlace() {
  const active = getActivePlayback();
  const isPlaying = active !== null;
  const details = active ? active.details : null;

  const btnRepeat = document.getElementById('dock-btn-repeat');
  if (btnRepeat) {
    if (details && details.repeat) {
      btnRepeat.classList.add('active');
      btnRepeat.style.color = 'var(--color-accent)';
    } else {
      btnRepeat.classList.remove('active');
      btnRepeat.style.color = 'inherit';
    }
    btnRepeat.disabled = !isPlaying;
  }

  const btnPlay = document.getElementById('dock-btn-playpause');
  if (btnPlay) {
    const isPaused = !details || !!details.paused;
    btnPlay.innerHTML = (isPlaying && !isPaused) ? icons.pause : icons.play;
    btnPlay.title = isPlaying ? (isPaused ? 'Resume Playback' : 'Pause Playback') : 'Play';
    btnPlay.disabled = !isPlaying;
    if (isPlaying && !isPaused) {
      btnPlay.classList.add('play-btn');
    } else {
      btnPlay.classList.remove('play-btn');
    }
  }

  const btnStop = document.getElementById('dock-btn-stop');
  if (btnStop) {
    btnStop.disabled = !isPlaying;
  }

  const eqBars = document.getElementById('dock-eq-bars');
  if (eqBars) {
    eqBars.style.display = (isPlaying && details && details.sound) ? '' : 'none';
    if (details && details.paused) {
      eqBars.classList.add('paused');
      eqBars.title = 'Playback Paused';
    } else {
      eqBars.classList.remove('paused');
      eqBars.title = 'Playing Audio Stream';
    }
  }

  const nameEl = document.getElementById('playback-dock-name');
  if (nameEl && details && details.sound) {
    nameEl.textContent = details.sound.name || 'Active Sound';
    nameEl.style.color = 'var(--color-primary)';
  }

  const pathEl = document.getElementById('playback-dock-path');
  if (pathEl && details && details.sound) {
    const isPaused = !details || !!details.paused;
    const current = details.readInMs || 0;
    const length = details.lengthInMs || 1;
    pathEl.textContent = `${isPaused ? 'Paused' : 'Playing stream'} • ${formatMs(current)} / ${formatMs(length)}`;
  }

  //* Keep the dock volume module aligned with the settings (e.g. after changes
  //* made on the settings page). Never fights an active drag — the drag handler
  //* writes the same values anyway.
  const dockText = document.getElementById('dock-vol-text');
  const dockInput = document.getElementById('dock-vol-input');
  if (dockText && dockText.innerText !== `${getDockVolumeValue()}%`) {
    dockText.innerText = `${getDockVolumeValue()}%`;
  }
  if (dockInput && String(dockInput.value) !== String(getDockVolumeValue())) {
    dockInput.value = getDockVolumeValue();
  }
}

async function handleTogglePlayPause() {
  const active = getActivePlayback();
  if (!active || !active.details) return;
  const { details, playId } = active;

  const willPause = !details.paused;
  details.paused = willPause;
  updateDockControlsInPlace();

  try {
    if (willPause) {
      if (window.pauseSound) {
        await window.pauseSound(playId);
      }
    } else {
      if (window.resumeSound) {
        await window.resumeSound(playId);
      }
    }
  } catch (e) {
    console.warn("toggle play/pause failed:", e);
    details.paused = !willPause;
    updateDockControlsInPlace();
  }
}

async function handleToggleRepeat() {
  const active = getActivePlayback();
  if (!active || !active.details) return;
  const { details, playId } = active;

  details.repeat = !details.repeat;
  updateDockControlsInPlace();

  try {
    if (window.repeatSound) {
      await window.repeatSound(playId, details.repeat);
    }
  } catch (e) {
    console.warn("toggle repeat failed:", e);
    details.repeat = !details.repeat;
    updateDockControlsInPlace();
  }
}

async function handleStopActiveSound() {
  const active = getActivePlayback();
  if (!active || !active.details) return;
  const { playId, soundId } = active;

  state.lastStopAt = Date.now();

  //* Clear the UI entry first so the dock resets instantly; the backend call
  //* below only tears down the native stream.
  delete state.playingSounds[soundId];
  delete state.playingSounds[playId];
  if (state.currentPlayingSoundId === soundId || state.currentPlayingSoundId === playId) {
    const remainingIds = Object.keys(state.playingSounds);
    state.currentPlayingSoundId = remainingIds.length > 0 ? remainingIds[remainingIds.length - 1] : null;
  }
  cleanupScrubberDrag();
  renderApp();

  try {
    if (window.stopSound) {
      await window.stopSound(playId);
    }
  } catch (e) {
    console.warn("stopSound error:", e);
  }
}

function handleScrubberPointerDown(event) {
  if (event.button !== 0) return;
  event.preventDefault();
  event.stopPropagation();

  const active = getActivePlayback();
  if (!active || !active.details) return;
  const bar = document.getElementById('playback-dock-bar');
  if (!bar) return;

  state.isDraggingSeekbar = true;
  bar.classList.add('dragging');

  try {
    bar.setPointerCapture(event.pointerId);
  } catch (e) {}

  updateScrubberFromEvent(event);

  bar.onpointermove = handleScrubberPointerMove;
  bar.onpointerup = handleScrubberPointerUp;
  bar.onpointercancel = handleScrubberPointerCancel;
}

function updateScrubberFromEvent(event) {
  const active = getActivePlayback();
  if (!active || !active.details) return;
  const bar = document.getElementById('playback-dock-bar');
  if (!bar) return;

  const rect = bar.getBoundingClientRect();
  const width = rect.width;
  if (width <= 0) return;

  let clickX = event.clientX - rect.left;
  clickX = Math.max(0, Math.min(clickX, width));
  const ratio = clickX / width;

  const length = active.details.lengthInMs || 1;
  const previewMs = Math.floor(length * ratio);
  state.dragSeekPosition = previewMs;
  const percentage = Math.min((previewMs / length) * 100, 100);

  const fill = document.getElementById('playback-dock-fill');
  if (fill) fill.style.width = `${percentage}%`;

  const thumb = document.getElementById('playback-dock-thumb');
  if (thumb) {
    thumb.style.left = `${percentage}%`;
    thumb.style.display = 'block';
  }

  const curTime = document.getElementById('playback-dock-current');
  if (curTime) curTime.textContent = formatMs(previewMs);
}

function handleScrubberPointerMove(event) {
  if (!state.isDraggingSeekbar) return;
  updateScrubberFromEvent(event);
}

async function handleScrubberPointerUp(event) {
  if (!state.isDraggingSeekbar) return;
  const bar = document.getElementById('playback-dock-bar');
  if (bar) {
    try {
      if (bar.hasPointerCapture(event.pointerId)) {
        bar.releasePointerCapture(event.pointerId);
      }
    } catch (e) {}
    bar.classList.remove('dragging');
    bar.onpointermove = null;
    bar.onpointerup = null;
    bar.onpointercancel = null;
  }
  state.isDraggingSeekbar = false;

  const active = getActivePlayback();
  if (!active || !active.details) return;

  const seekTargetMs = state.dragSeekPosition;
  active.details.readInMs = seekTargetMs;

  try {
    if (window.seekSound) {
      await window.seekSound(active.playId, seekTargetMs);
    }
  } catch (e) {
    console.warn("seekSound error:", e);
  }
}

function handleScrubberPointerCancel(event) {
  cleanupScrubberDrag();
}

function cleanupScrubberDrag() {
  state.isDraggingSeekbar = false;
  const bar = document.getElementById('playback-dock-bar');
  if (bar) {
    bar.classList.remove('dragging');
    bar.onpointermove = null;
    bar.onpointerup = null;
    bar.onpointercancel = null;
  }
}

function updatePlaybackDockInPlace(playingSound) {
  if (state.isDraggingSeekbar) {
    return;
  }
  const dock = document.getElementById('playback-dock');
  if (!dock) {
    renderApp();
    return;
  }

  // If dock controls were rendered in an idle/disabled state, promote and refresh the layout
  const playBtn = document.getElementById('dock-btn-playpause');
  if (!playBtn || playBtn.disabled) {
    renderApp();
    return;
  }

  const length = playingSound.lengthInMs || 1;
  const current = playingSound.readInMs || 0;
  const percentage = Math.min((current / length) * 100, 100);
  const isPaused = !!playingSound.paused;
  const soundKey = playingSound.sound ? playingSound.sound.id : undefined;

  //* --- Multi-sound mode: every sound updates ONLY its own chip. The shared
  //* transport (scrubber, times, play/pause, title) is driven exclusively by
  //* the active sound — this is what stops the title from flickering between
  //* simultaneously playing sounds. ---
  const chipEl = (soundKey !== undefined) ? document.getElementById(`dock-chip-${soundKey}`) : null;
  if (chipEl) {
    const chipFill = document.getElementById(`dock-chip-${soundKey}-fill`);
    if (chipFill) chipFill.style.width = `${percentage}%`;

    const chipTime = document.getElementById(`dock-chip-${soundKey}-time`);
    if (chipTime) chipTime.textContent = `${formatMs(current)} / ${formatMs(length)}`;

    if (isPaused) {
      chipEl.classList.add('paused');
    } else {
      chipEl.classList.remove('paused');
    }

    const isActiveChip = (String(state.currentPlayingSoundId) === String(soundKey));
    if (isActiveChip) {
      const activeHint = document.querySelector('.dock-controlling-hint strong');
      if (activeHint && playingSound.sound && playingSound.sound.name && activeHint.textContent !== playingSound.sound.name) {
        activeHint.textContent = playingSound.sound.name;
      }
    }
    if (!isActiveChip) {
      //* Not the controlled sound: its chip is now fully up to date and the
      //* transport must NOT be touched with this sound's data.
      const tileProgress = (soundKey !== undefined) ? document.getElementById(`deck-progress-${soundKey}`) : null;
      if (tileProgress) {
        tileProgress.style.width = `${percentage}%`;
      }
      return;
    }
  }

  const curTime = document.getElementById('playback-dock-current');
  if (curTime) curTime.textContent = formatMs(current);

  const totalTime = document.getElementById('playback-dock-length');
  if (totalTime) totalTime.textContent = formatMs(length);

  const fill = document.getElementById('playback-dock-fill');
  if (fill) fill.style.width = `${percentage}%`;

  const thumb = document.getElementById('playback-dock-thumb');
  if (thumb) {
    thumb.style.left = `${percentage}%`;
    thumb.style.display = 'block';
  }

  playBtn.innerHTML = isPaused ? icons.play : icons.pause;
  playBtn.title = isPaused ? 'Resume Playback' : 'Pause Playback';
  if (isPaused) {
    playBtn.classList.remove('play-btn');
  } else {
    playBtn.classList.add('play-btn');
  }

  const repeatBtn = document.getElementById('dock-btn-repeat');
  if (repeatBtn) {
    if (playingSound.repeat) {
      repeatBtn.classList.add('active');
      repeatBtn.style.color = 'var(--color-accent)';
    } else {
      repeatBtn.classList.remove('active');
      repeatBtn.style.color = 'inherit';
    }
  }

  const eqBars = document.getElementById('dock-eq-bars');
  if (eqBars) {
    eqBars.style.display = '';
    if (isPaused) {
      eqBars.classList.add('paused');
      eqBars.title = 'Playback Paused';
    } else {
      eqBars.classList.remove('paused');
      eqBars.title = 'Playing Audio Stream';
    }
  }

  const pathEl = document.getElementById('playback-dock-path');
  if (pathEl) {
    pathEl.textContent = `${isPaused ? 'Paused' : 'Playing stream'} • ${formatMs(current)} / ${formatMs(length)}`;
  }

  const nameEl = document.getElementById('playback-dock-name');
  if (nameEl && playingSound.sound && playingSound.sound.name && nameEl.textContent !== playingSound.sound.name) {
    nameEl.textContent = playingSound.sound.name;
    nameEl.style.color = 'var(--color-primary)';
  }

  if (playingSound.sound && playingSound.sound.id !== undefined) {
    const tileProgress = document.getElementById(`deck-progress-${playingSound.sound.id}`);
    if (tileProgress) {
      tileProgress.style.width = `${percentage}%`;
    }
  }
}

// Global bottom playback & hardware status bar (Docked 100% desktop transport)
//* Renders one chip per simultaneously playing sound. Every chip carries its
//* own progress bar and stop button, so the dock shows ALL active playbacks
//* side by side — no shared title slot, no flicker, no truncation (long names
//* ellipsize and the row scrolls horizontally when space runs out).
function renderDockSoundChip(entry, isActive) {
  const d = entry.details;
  const length = d.lengthInMs || 1;
  const current = d.readInMs || 0;
  const percentage = Math.min((current / length) * 100, 100);
  const isPaused = !!d.paused;

  return `
    <div class="dock-chip ${isActive ? 'active' : ''} ${isPaused ? 'paused' : ''}"
         id="dock-chip-${entry.key}"
         title="${isPaused ? 'Paused' : 'Playing'} — click to control this sound${d.sound && d.sound.name ? `: ${d.sound.name}` : ''}"
         onclick="event.stopPropagation(); handleSelectDockChip('${entry.key}')">
      <div class="dock-chip-top">
        <span class="dock-chip-eq" aria-hidden="true">
          <span class="eq-bar"></span><span class="eq-bar"></span><span class="eq-bar"></span>
        </span>
        <span class="dock-chip-name" id="dock-chip-${entry.key}-name">${escapeHtml(d.sound && d.sound.name ? d.sound.name : 'Active Sound')}</span>
        <span class="dock-chip-time" id="dock-chip-${entry.key}-time">${formatMs(current)} / ${formatMs(length)}</span>
        <button class="dock-chip-stop" title="Stop this sound"
                onclick="event.stopPropagation(); handleStopSound(${entry.soundId})">${icons.close}</button>
      </div>
      <div class="dock-chip-progress">
        <div class="dock-chip-fill" id="dock-chip-${entry.key}-fill" style="width: ${percentage}%;"></div>
      </div>
    </div>
  `;
}

function renderPlaybackDock() {
  const playingList = getPlayingSoundsList();
  const multiMode = playingList.length > 1;
  const active = getActivePlayback();
  const isPlaying = active !== null;
  const details = active ? active.details : null;

  const length = details ? (details.lengthInMs || 1) : 0;
  const current = details ? (details.readInMs || 0) : 0;
  const percentage = length > 0 ? Math.min((current / length) * 100, 100) : 0;
  const isPaused = details ? !!details.paused : false;

  const totalSounds = state.tabs.reduce((acc, t) => acc + countTabSounds(t), 0);
  const activeDeviceName = state.settings.outputs && state.settings.outputs.length > 0 ? state.settings.outputs[0] : 'Default Speakers';
  const targetWindow = state.settings.targetWindow || null;

  const isLocalMode = state.dockVolumeMode !== 'remote';
  const dockVolume = getDockVolumeValue();

  //* Left block: idle / single-track layout stays as it was; with several
  //* simultaneous sounds the block swaps to a scrollable chip strip headed by
  //* a "Now Playing (N)" label.
  let trackInfoHtml;
  if (multiMode) {
    trackInfoHtml = `
      <div class="dock-multitrack">
        <div class="dock-multitrack-head">
          <span class="dock-playing-count" title="${playingList.length} sounds playing simultaneously">
            <span class="eq-bars compact"><span class="eq-bar"></span><span class="eq-bar"></span><span class="eq-bar"></span></span>
            Now Playing (${playingList.length})
          </span>
          <span class="dock-multitrack-hint">click a chip to control it</span>
        </div>
        <div class="dock-chips-row">
          ${playingList.map(entry => renderDockSoundChip(entry, String(entry.key) === String(active ? active.soundKey : null))).join('')}
        </div>
      </div>
    `;
  } else {
    trackInfoHtml = `
      <div id="dock-eq-bars" class="eq-bars ${isPaused ? 'paused' : ''}" style="${isPlaying && details && details.sound ? '' : 'display: none;'}" title="${isPaused ? 'Playback Paused' : 'Playing Audio Stream'}">
        <span class="eq-bar"></span>
        <span class="eq-bar"></span>
        <span class="eq-bar"></span>
        <span class="eq-bar"></span>
      </div>
      ${!isPlaying ? `<span id="playback-dock-icon" style="color: var(--color-muted); display: flex; align-items: center;">${icons.music}</span>` : ''}
      <div class="dock-track-text">
        <span id="playback-dock-name" class="dock-track-title" style="${isPlaying && details && details.sound ? '' : 'color: var(--color-secondary);'}">
          ${isPlaying && details && details.sound ? (details.sound.name || 'Active Sound') : 'Soundboard Ready'}
        </span>
        <span id="playback-dock-path" class="dock-track-sub">
          ${isPlaying && details && details.sound ? `${isPaused ? 'Paused' : 'Playing stream'} • ${formatMs(current)} / ${formatMs(length)}` : 'Press hotkey or trigger sound pad'}
        </span>
      </div>
    `;
  }

  return `
    <footer id="playback-dock">
      <div class="dock-track-info ${multiMode ? 'multi' : ''}">
        ${trackInfoHtml}
      </div>
      
      <div class="dock-center-transport">
        ${multiMode && details && details.sound ? `
          <span class="dock-controlling-hint" title="The controls below act on this sound">
            Controlling: <strong>${escapeHtml(details.sound.name || 'Active Sound')}</strong>
          </span>
        ` : ''}
        <div class="dock-transport-controls">
          <button id="dock-btn-repeat" class="action-btn ${details && details.repeat ? 'active' : ''}" 
                  style="color: ${details && details.repeat ? 'var(--color-accent)' : 'inherit'};" 
                  title="Repeat Track" 
                  ${!isPlaying ? 'disabled' : ''}
                  onclick="event.stopPropagation(); handleToggleRepeat()">
            ${icons.repeat}
          </button>
          <button id="dock-btn-playpause" class="action-btn ${isPlaying && !isPaused ? 'play-btn' : ''}" 
                  title="${isPlaying ? (isPaused ? 'Resume Playback' : 'Pause Playback') : 'Play'}" 
                  ${!isPlaying ? 'disabled' : ''}
                  onclick="event.stopPropagation(); handleTogglePlayPause()">
            ${isPlaying && !isPaused ? icons.pause : icons.play}
          </button>
          <button id="dock-btn-stop" class="action-btn stop-btn" 
                  title="${multiMode ? 'Stop the controlled sound (Esc stops all)' : 'Stop Playback'}" 
                  ${!isPlaying ? 'disabled' : ''}
                  onclick="event.stopPropagation(); handleStopActiveSound()">
            ${icons.stop}
          </button>
        </div>

        <div class="dock-scrub-row">
          <span id="playback-dock-current" class="dock-time-text">${formatMs(current)}</span>
          <div id="playback-dock-bar" class="progress-bar-wrapper" 
               style="cursor: ${isPlaying ? 'pointer' : 'default'};" 
               onpointerdown="${isPlaying ? 'handleScrubberPointerDown(event)' : ''}">
            <div id="playback-dock-fill" class="progress-bar-fill" style="width: ${percentage}%"></div>
            <div id="playback-dock-thumb" class="progress-bar-thumb" style="left: ${percentage}%; display: ${isPlaying ? 'block' : 'none'};"></div>
          </div>
          <span id="playback-dock-length" class="dock-time-text">${formatMs(length)}</span>
        </div>
      </div>
      
      <div class="dock-right-meta">
        <div class="dock-volume" title="Single master volume — the toggle decides who hears the change">
          <button id="dock-vol-mode" class="dock-vol-toggle ${isLocalMode ? 'mode-local' : 'mode-remote'}"
                  title="${isLocalMode ? 'Local Volume — only you hear this level. Click to switch to Remote.' : 'Remote Volume — everybody else hears this level. Click to switch back to Local.'}"
                  onclick="event.stopPropagation(); toggleDockVolumeMode()">
            ${isLocalMode ? icons.headphones : icons.mic}
            <span>${isLocalMode ? 'Local' : 'Remote'}</span>
          </button>
          <input type="range" id="dock-vol-input" class="fader-range" min="0" max="100" 
                 value="${dockVolume}" 
                 title="${isLocalMode ? 'Local volume (only you)' : 'Remote volume (everybody else)'}"
                 onpointerdown="handleSliderDragStart(event)" 
                 onmousedown="handleSliderDragStart(event)" 
                 oninput="handleDockVolumeInput(this.value)">
          <span id="dock-vol-text" class="fader-val">${dockVolume}%</span>
        </div>
        <span class="dock-route-pill" title="${targetWindow ? `Exclusive routing: only ${targetWindow} receives soundboard audio` : 'Audio Device Endpoint Target'}">
          ${targetWindow ? `${icons.target} ${escapeHtml(targetWindow)}` : (!state.isLinux && state.isVBCableSetup ? '🎙️ Mic Active' : '🔉 ' + activeDeviceName)}
        </span>
        <span class="dock-count-text">
          ${totalSounds} sounds
        </span>
      </div>
    </footer>
  `;
}

// Render recording dialog popup modals
function renderModalOverlays() {
  if (state.recordingHotkeySoundId !== null || state.recordingTarget !== null) {
    const isPTT = state.recordingTarget === 'ptt';
    const isStop = state.recordingTarget === 'stop';
    
    let headingText = "Record Hotkey";
    let descText = "Press a key combination now (e.g. Ctrl + Shift + P). System hotkey sequences automatically intercept clicks.";
    
    if (isPTT) {
      headingText = "Record Push-To-Talk Shortcut";
      descText = "Press the key combination you wish to use as Push-To-Talk shortcut.";
    } else if (isStop) {
      headingText = "Record Emergency Stop Shortcut";
      descText = "Press the key combination you wish to use to stop all playbacks.";
    }

    return `
      <div class="modal-overlay">
        <div class="modal-card">
          <h3>${headingText}</h3>
          <p>${descText}</p>
          <div class="recorded-sequence">${state.recordedKeyNames}</div>
          <div class="modal-actions">
            <button class="modal-btn save-btn" onclick="saveRecordedHotkey()">Save Shortcut</button>
            <button class="modal-btn clear-btn" onclick="clearRecordedHotkey()">Clear Shortcut</button>
            <button class="modal-btn cancel-btn" onclick="cancelRecordHotkey()">Cancel</button>
          </div>
        </div>
      </div>
    `;
  }
  return '';
}

// Render sleek custom right-click context menu
function renderContextMenu() {
  if (!state.contextMenu || !state.contextMenu.visible) return '';

  const { x, y, soundId } = state.contextMenu;
  const targetSound = findSoundInTabs(soundId);
  if (!targetSound) return '';

  const isPlaying = !!state.playingSounds[soundId];
  const hasImage = !!targetSound.image;
  const isMultiSelected = state.selectedSoundIds && state.selectedSoundIds.length > 1 && state.selectedSoundIds.includes(soundId);

  return `
    <div class="custom-context-menu" style="left: ${x}px; top: ${y}px;" onclick="event.stopPropagation()">
      <div style="padding: 4px 8px 6px 8px; font-size: 11px; font-weight: 700; color: var(--color-muted); text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid var(--border-color); margin-bottom: 3px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
        ${isMultiSelected ? `${state.selectedSoundIds.length} Sounds Selected` : targetSound.name}
      </div>

      ${isMultiSelected ? `
        <button class="context-menu-item" onclick="handleOpenMultiImageModal()">
          <span class="context-menu-icon">📑</span>
          <span>Assign Image to Selected (${state.selectedSoundIds.length})...</span>
        </button>

        <button class="context-menu-item danger" onclick="handleRemoveSoundsImage(state.selectedSoundIds)">
          <span class="context-menu-icon">${icons.trash}</span>
          <span>Remove Images from Selected (${state.selectedSoundIds.length})</span>
        </button>

        <button class="context-menu-item" onclick="handleClearSelectedSounds(); closeContextMenu();">
          <span class="context-menu-icon">✖</span>
          <span>Deselect All</span>
        </button>
      ` : `
        <button class="context-menu-item" onclick="closeContextMenu(); handlePlaySound(${soundId})">
          <span class="context-menu-icon">${isPlaying ? icons.stop : icons.play}</span>
          <span>${isPlaying ? 'Restart Sound' : 'Play Sound'}</span>
        </button>

        ${isPlaying ? `
          <button class="context-menu-item danger" onclick="closeContextMenu(); handleStopSound(${soundId})">
            <span class="context-menu-icon">${icons.stop}</span>
            <span>Stop Sound</span>
          </button>
        ` : ''}

        <div class="context-menu-divider"></div>

        <button class="context-menu-item" onclick="handleAssignSoundImage(${soundId})">
          <span class="context-menu-icon">${icons.image}</span>
          <span>${hasImage ? 'Change Image...' : 'Assign Image...'}</span>
        </button>

        <button class="context-menu-item" onclick="handleOpenMultiImageModal(${soundId})">
          <span class="context-menu-icon">📑</span>
          <span>Assign Image to Multiple...</span>
        </button>

        ${hasImage ? `
          <button class="context-menu-item danger" onclick="handleRemoveSoundImage(${soundId})">
            <span class="context-menu-icon">${icons.trash}</span>
            <span>Remove Image</span>
          </button>
        ` : ''}

        <div class="context-menu-divider"></div>

        <button class="context-menu-item" onclick="closeContextMenu(); toggleFavorite(${soundId}, ${targetSound.isFavorite})">
          <span class="context-menu-icon">${targetSound.isFavorite ? '★' : '☆'}</span>
          <span>${targetSound.isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}</span>
        </button>

        <button class="context-menu-item" onclick="closeContextMenu(); startRecordHotkey(${soundId})">
          <span class="context-menu-icon">⌨️</span>
          <span>Assign Hotkey</span>
        </button>
      `}
    </div>
  `;
}

// Resolves the sound list the main view currently shows (active folder contents,
// or the whole category tree while searching).
function currentViewSounds(currentTab) {
  if (!currentTab) return [];
  if (state.searchQuery && state.searchQuery.trim()) {
    const query = state.searchQuery.toLowerCase();
    return flattenTabSounds(currentTab).filter(s => s.name.toLowerCase().includes(query));
  }
  const folder = getActiveFolder(currentTab);
  return folder ? (folder.sounds || []) : (currentTab.sounds || []);
}

// Render multi-sound image assignment modal
function renderMultiImageModal() {
  if (!state.multiImageModal || !state.multiImageModal.visible) return '';

  // Use the same sound list the main view shows (active folder or search results)
  const currentTab = state.tabs.find(t => t.id === state.activeTabId) || state.tabs[0];
  const sounds = currentViewSounds(currentTab);
  const { selectedSoundIds, imageDataUrl } = state.multiImageModal;

  return `
    <div class="modal-overlay" onclick="handleCloseMultiImageModal()">
      <div class="modal-card" style="max-width: 480px; width: 100%;" onclick="event.stopPropagation()">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
          <h3 style="margin: 0; font-size: 16px; font-weight: 700; color: var(--color-primary);">Assign Image to Multiple Sounds</h3>
          <button class="action-btn" onclick="handleCloseMultiImageModal()">${icons.close}</button>
        </div>

        <p style="font-size: 12px; color: var(--color-muted); margin: 0 0 12px 0;">
          Select the sounds in this folder to apply the image to:
        </p>

        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
          <span style="font-size: 11px; font-weight: 600; color: var(--color-muted);">${selectedSoundIds.length} of ${sounds.length} selected</span>
          <div style="display: flex; gap: 8px;">
            <button style="background: none; border: none; font-size: 11px; color: var(--color-accent); cursor: pointer;" onclick="handleSelectAllSoundsForImage(true)">Select All</button>
            <button style="background: none; border: none; font-size: 11px; color: var(--color-muted); cursor: pointer;" onclick="handleSelectAllSoundsForImage(false)">Clear</button>
          </div>
        </div>

        <div class="multi-image-sound-list">
          ${sounds.map(s => {
            const isChecked = selectedSoundIds.includes(s.id);
            return `
              <div class="multi-image-sound-item" onclick="handleToggleSelectSoundForImage(${s.id})">
                <input type="checkbox" ${isChecked ? 'checked' : ''} onclick="event.stopPropagation(); handleToggleSelectSoundForImage(${s.id})">
                ${s.image ? `
                  <div style="width: 22px; height: 22px; border-radius: 4px; background-image: url('${s.image}'); background-size: cover; background-position: center; border: 1px solid rgba(255,255,255,0.15); flex-shrink: 0;"></div>
                ` : `
                  <div style="width: 22px; height: 22px; border-radius: 4px; background: rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: center; font-size: 10px; color: var(--color-muted); flex-shrink: 0;">🎵</div>
                `}
                <span style="font-size: 12px; color: var(--color-primary); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex-grow: 1;">${s.name}</span>
              </div>
            `;
          }).join('')}
        </div>

        <!-- Image Selector & Preview -->
        <div style="margin-top: 14px;">
          <button class="btn-primary" style="width: 100%; display: flex; align-items: center; justify-content: center; gap: 8px; padding: 10px;" onclick="handleBrowseMultiImage()">
            ${icons.image} <span>${imageDataUrl ? 'Change Selected Image...' : 'Choose Image File...'}</span>
          </button>

          ${imageDataUrl ? `
            <div class="multi-image-preview-box" style="background-image: url('${imageDataUrl}'); border-style: solid; border-color: var(--color-accent);"></div>
          ` : `
            <div class="multi-image-preview-box">No image selected yet</div>
          `}
        </div>

        <div class="modal-actions" style="margin-top: 16px; display: flex; gap: 8px; justify-content: flex-end;">
          <button class="modal-btn danger-btn" onclick="handleRemoveSoundsImage(state.multiImageModal.selectedSoundIds); handleCloseMultiImageModal();" ${selectedSoundIds.length === 0 ? 'disabled style="opacity: 0.5; cursor: not-allowed;"' : ''}>Remove Images</button>
          <button class="modal-btn cancel-btn" onclick="handleCloseMultiImageModal()">Cancel</button>
          <button class="modal-btn save-btn" onclick="handleApplyMultiSoundImage()" ${!imageDataUrl || selectedSoundIds.length === 0 ? 'disabled style="opacity: 0.5; cursor: not-allowed;"' : ''}>Apply Image</button>
        </div>
      </div>
    </div>
  `;
}

// --- Preview demo mode (no native backend) -------------------------------
// When this UI runs outside the native shell (plain web server / sandbox
// preview) none of the C++ WebView bindings exist, which would leave the
// interface empty and non-interactive. This shim installs a compact, clearly
// marked simulation instead: demo categories & sounds, a timer-based playback
// engine that drives the exact same onSoundPlayed / updateSound / finishSound
// callbacks the native shell posts, and a target-window list of open apps.
// Inside the compiled app every binding already exists, so this
// block never activates and adds zero overhead.
function installPreviewDemoBindings() {
  let demoPlaySeq = 5000;
  const demoPlaying = new Map(); // playId -> { timer, ps }
  let demoWindowMaximized = false; // simulated window state for the topbar

  // Friendly labels for the virtual-key codes the demo data assigns, mirroring
  // the sequence strings the native shell sends for real sounds.
  const demoKeyName = (code) => ({
    56: 'Num 8', 162: 'Right Ctrl', 165: 'Fwd'
  }[code] || `Key ${code}`);

  const demoSound = (id, name, fav, hotkeys) => ({
    id, name, path: `C:/Soundboards/demo/${name}.mp3`, isFavorite: !!fav,
    hotkeys: hotkeys || [], hotkeySequence: (hotkeys || []).map(demoKeyName).join('+'),
    modifiedDate: 1700000000 + id, localVolume: null, remoteVolume: null, image: ''
  });

  const demoTabs = [
    {
      id: 1, name: 'Caseoh', path: 'C:/Soundboards/Caseoh', boost: 100,
      sounds: [
        demoSound(101, 'bro-is-finally-awake', true, [162]),
        demoSound(102, 'FAT SHAME 1'),
        demoSound(103, 'caseoh-bro-is-cribbing-about-a-burrito'),
        demoSound(104, 'MOMENT IN HISTORY'),
        demoSound(105, 'watermelon-explanation', false, [165]),
        demoSound(106, 'OG BUDDY')
      ],
      folders: [
        { id: 11, name: 'Screams', path: 'C:/Soundboards/Caseoh/Screams', sounds: [demoSound(107, 'AAAHH-15s'), demoSound(108, 'gutteral-scream')], folders: [] }
      ]
    },
    {
      id: 2, name: 'FNaf', path: 'C:/Soundboards/FNaf', boost: 130,
      sounds: [demoSound(201, 'fnaf-jumpscare'), demoSound(202, 'golden-freddy-breathing', true), demoSound(203, 'phone-guy-call')],
      folders: []
    },
    {
      id: 3, name: 'General 1', path: 'C:/Soundboards/General 1', boost: 100,
      sounds: [demoSound(301, 'airhorn'), demoSound(302, 'bruh'), demoSound(303, 'windows-xp-error', false, [56]), demoSound(304, 'heheheha')],
      folders: []
    },
    {
      id: 4, name: 'MoistCritikal', path: 'C:/Soundboards/MoistCritikal', boost: 100,
      sounds: [demoSound(401, 'penguinz0-chuckle'), demoSound(402, 'thats-terrible'), demoSound(403, 'mmm-big-boy')],
      folders: []
    }
  ];

  const demoSettings = {
    theme: 0, syncVolumes: false, allowMultipleOutputs: false, useAsDefaultDevice: false,
    muteDuringPlayback: false, allowOverlapping: true, minimizeToTray: false, tabHotkeysOnly: false,
    deleteToTrash: true, localVolume: 50, remoteVolume: 100, soundBoost: 100,
    pushToTalkKeys: [], stopHotkey: [], outputs: [], targetWindow: null
  };

  const findDemoSound = (soundId) => {
    for (const t of demoTabs) {
      const all = [...t.sounds, ...(t.folders || []).flatMap(f => f.sounds || [])];
      const hit = all.find(s => s.id === soundId);
      if (hit) return hit;
    }
    return null;
  };

  const deliver = (name, payload) => {
    // Mimic the native shell: callbacks are posted asynchronously into the
    // event loop, never invoked synchronously from the binding call.
    setTimeout(() => {
      if (typeof window[name] === 'function') window[name](JSON.parse(JSON.stringify(payload)));
    }, 0);
  };

  const stopDemoPlay = (playId) => {
    const entry = demoPlaying.get(playId);
    if (!entry) return;
    clearInterval(entry.timer);
    demoPlaying.delete(playId);
    deliver('finishSound', entry.ps);
  };

  window.isLinux = async () => false;
  window.isElevated = async () => false;
  window.isVBCableInstalled = async () => true;
  window.isVBCableProperlySetup = async () => true;
  window.getTabs = async () => JSON.parse(JSON.stringify(demoTabs));
  window.getSettings = async () => JSON.parse(JSON.stringify(demoSettings));
  window.changeSettings = async (s) => { Object.assign(demoSettings, s || {}); return s; };
  window.getOutputs = async () => [
    { name: 'Speakers (Realtek Audio)', isDefault: true },
    { name: 'CABLE Input (VB-Audio Virtual Cable)', isDefault: false }
  ];
  window.getRecordingDevices = async () => [
    [{ name: 'CABLE Output (VB-Audio Virtual Cable)' }, { name: 'Microphone (HyperX QuadCast)' }],
    { name: 'CABLE Output (VB-Audio Virtual Cable)' }
  ];
  window.getAppWindows = async () => [
    { title: 'Discord', processName: 'Discord', pid: 4212 },
    { title: 'Roblox', processName: 'RobloxPlayerBeta', pid: 8304 },
    { title: 'Skype', processName: 'skype', pid: 6118 }
  ];

  // Window control stubs: the preview has no native shell to drive, so the
  // topbar buttons become safe no-ops and the window reports as windowed.
  window.startWindowDrag = async () => {};
  window.minimizeWindow = async () => {};
  window.maximizeWindow = async () => {
    demoWindowMaximized = !demoWindowMaximized;
  };
  window.closeWindow = async () => {};
  window.isWindowMaximized = async () => demoWindowMaximized;
  window.getSystemInfo = async () =>
    'OS: Windows 11 (demo preview)\nCPU: demo\nGPU: demo\nRAM: demo\nAudio: miniaudio (simulated)';

  window.playSound = async (soundId) => {
    const sound = findDemoSound(soundId);
    if (!sound) return null;
    const ps = {
      id: demoPlaySeq++, sound: JSON.parse(JSON.stringify(sound)),
      readInMs: 0, lengthInMs: 6000 + (sound.id % 9) * 3000, paused: false, repeat: false
    };
    const entry = { ps, timer: null };
    entry.timer = setInterval(() => {
      if (!ps.paused) ps.readInMs += 200;
      if (ps.readInMs >= ps.lengthInMs) {
        if (ps.repeat) {
          ps.readInMs = 0;
        } else {
          clearInterval(entry.timer);
          demoPlaying.delete(ps.id);
          deliver('finishSound', ps);
          return;
        }
      }
      deliver('updateSound', ps);
    }, 200);
    demoPlaying.set(ps.id, entry);
    deliver('onSoundPlayed', ps);
    return JSON.parse(JSON.stringify(ps));
  };

  window.stopSound = async (playId) => { stopDemoPlay(playId); };
  window.stopSounds = async () => { [...demoPlaying.keys()].forEach(stopDemoPlay); };
  window.pauseSound = async (playId) => {
    const e = demoPlaying.get(playId);
    if (e) { e.ps.paused = true; deliver('updateSound', e.ps); }
  };
  window.resumeSound = async (playId) => {
    const e = demoPlaying.get(playId);
    if (e) { e.ps.paused = false; deliver('updateSound', e.ps); }
  };
  window.repeatSound = async (playId, enabled) => {
    const e = demoPlaying.get(playId);
    if (e) { e.ps.repeat = !!enabled; deliver('updateSound', e.ps); }
  };
  window.seekSound = async (playId, positionMs) => {
    const e = demoPlaying.get(playId);
    if (e) { e.ps.readInMs = Math.max(0, Math.min(positionMs, e.ps.lengthInMs)); deliver('updateSound', e.ps); }
  };
}

// Install the simulation only when the native shell did NOT provide bindings.
if (typeof window.getTabs !== 'function' && typeof window.playSound !== 'function') {
  installPreviewDemoBindings();

  //* Seed a two-category sidebar layout (once) so the preview shows the full
  //* multi-category experience — including the Edit + Remove header buttons,
  //* which only appear when more than one category exists.
  try {
    if (!localStorage.getItem('audiopad_sidebar_categories')) {
      localStorage.setItem('audiopad_sidebar_categories', JSON.stringify([
        { id: 'demo_cat_main', name: 'Main Categories', tabPaths: ['C:/Soundboards/Caseoh', 'C:/Soundboards/FNaf', 'C:/Soundboards/General 1'] },
        { id: 'demo_cat_games', name: 'Gaming', tabPaths: ['C:/Soundboards/MoistCritikal'] }
      ]));
    }
  } catch (e) { /* localStorage unavailable — single default category is fine */ }
}

// Run initial execution safely
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
