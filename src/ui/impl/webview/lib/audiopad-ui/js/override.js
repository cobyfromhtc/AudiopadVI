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
  winClose: `<svg viewBox="0 0 10 10" width="10" height="10" shape-rendering="crispEdges" stroke="currentColor" stroke-width="1.1"><path d="M1 1 L9 9 M9 1 L1 9"></path></svg>`,
  keyboard: `<svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"></rect><line x1="6" y1="10" x2="6.01" y2="10"></line><line x1="10" y1="10" x2="10.01" y2="10"></line><line x1="14" y1="10" x2="14.01" y2="10"></line><line x1="18" y1="10" x2="18.01" y2="10"></line><line x1="6" y1="14" x2="6.01" y2="14"></line><line x1="18" y1="14" x2="18.01" y2="14"></line><line x1="9" y1="14" x2="15" y2="14"></line></svg>`,
  rocket: `<svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path></svg>`,
  star: `<svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`,
  check: `<svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
  wrench: `<svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>`
};

// --- Application Reactive State ---
let state = {
  tabs: [],
  activeTabId: null,
  currentView: 'folder', // 'folder', 'favorites', 'settings', 'system-info', 'help'
  searchQuery: '',
  listViewMode: 'table', // 'grid' (Media Grid), 'deck' (Stream Deck Macro Tiles), 'table' (Soundpad High-Density Table — default)
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
    targetWindow: null,
    hearMyself: false,
    overlayEnabled: false,
    overlayPosition: 0,
    remoteControlEnabled: true,
    remotePin: null,
    remotePort: 38712,
    micMuteHotkey: [],
    hearMyselfHotkey: [],
    overlayHotkey: [],
    overlayPositionHotkey: []
  },

  //* --- Sound & board organization (V2 features) ---
  renameSoundModal: { visible: false, soundId: null, name: '' },
  tagsModal: { visible: false, soundId: null, value: '' },
  policiesModal: {
    visible: false, soundId: null,
    triggerMode: 0, loopByDefault: false, stopOthers: false,
    muteOthers: false, muteVoice: null, voicePreset: null, isVoiceSlot: false
  },
  moveModal: { visible: false, soundIds: [], targetTabId: null, targetFolderId: 0, moving: false },
  manualDrag: { soundId: null, overSoundId: null },
  //* Folder-tile drag & drop (reordering subfolders; `before` decides whether
  //* the drop inserts in front of or behind the hovered tile).
  folderDrag: { folderId: null, overFolderId: null, before: true },
  //* Whole-board loop state mirrored from the backend (mode: 0 off /
  //* 1 board-only / 2 board + subfolders).
  boardLoop: { mode: 0, tabId: null, index: 0, total: 0, currentSoundId: 0 },

  //* --- Recording & editing ---
  recorderModal: {
    visible: false, source: 0, isRecording: false, elapsedMs: 0, name: '',
    systemAvailable: true, replayArmed: false, busy: false, lastPath: ''
  },
  trimModal: {
    visible: false, soundId: null, name: '', peaks: null, durationMs: 0,
    startMs: 0, endMs: 0, dragging: null, saving: false
  },

  //* --- Live controls / remote / overlay ---
  micMuted: false,
  voicePreset: 'off',
  remoteInfo: { enabled: true, running: false, port: 38712, pin: '', address: '127.0.0.1' },

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

  //* Pause/resume round-trips through the backend while the native progress
  //* publisher keeps posting updateSound events asynchronously (30 Hz). An
  //* event generated just BEFORE the backend applied the pause can land just
  //* AFTER the click — carrying the stale pre-pause state. Worse: once the
  //* voice is paused its position freezes, so the publisher stops sending
  //* events for it entirely (it only publishes when the position changes) and
  //* nothing ever corrects the reverted button. Every user transport action
  //* therefore records its intent here; contradicting in-flight updates are
  //* pinned to the intent until the backend's authoritative promise
  //* resolution (or the grace expiry) settles the state.
  transportIntent: null,

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

  //* First-run onboarding tour. `pending` is set once per machine (nothing
  //* stored in localStorage yet) and the tour activates as soon as the real
  //* workspace renders. Finishing OR skipping persists the outcome, so the
  //* tour never appears again afterwards.
  onboarding: {
    pending: false,
    active: false,
    step: 0
  },

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
    // Keep the onboarding spotlight glued to its highlighted element across
    // window resizes (the tour overlay lives outside renderApp's re-renders).
    window.addEventListener('resize', () => {
      if (state.onboarding.active) {
        positionOnboarding();
      }
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

    // Whole-board loop state (a board may still be looping from before a reload)
    if (window.getBoardLoopState) {
      try {
        const raw = await window.getBoardLoopState();
        applyBoardLoopInfo(typeof raw === 'string' ? JSON.parse(raw) : raw);
      } catch (e) {
        console.warn("Failed to query getBoardLoopState:", e);
      }
    }

    // Restore the sidebar category sections (names + their folders) from localStorage
    loadSidebarCategories();
    // Restore user-preferred sidebar width (resizable via the drag handle)
    loadSidebarWidth();
    // Restore the dock volume mode toggle (Local / Remote)
    loadDockVolumeMode();
    // First-run check: the onboarding tour only stays pending when no outcome
    // (completed / skipped) has been stored on this machine yet.
    loadOnboardingState();

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

    // Determine initial view mode: localStorage override > savedSettings > default 'table'
    const localSavedMode = localStorage.getItem('audiopad_view_mode');
    if (localSavedMode && ['grid', 'deck', 'table'].includes(localSavedMode)) {
      state.listViewMode = localSavedMode;
    } else if (state.settings && state.settings.viewMode !== undefined) {
      if (state.settings.viewMode === 0) state.listViewMode = 'table';
      else if (state.settings.viewMode === 2) state.listViewMode = 'deck';
      else state.listViewMode = 'grid';
    } else {
      state.listViewMode = 'table';
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

    // V2 live-control state (voice preset, mic mute, remote info)
    if (window.getVoicePreset) {
      try { state.voicePreset = await window.getVoicePreset(); } catch (e) {}
    }
    if (window.isMicMuted) {
      try { state.micMuted = await window.isMicMuted(); } catch (e) {}
    }
    await refreshRemoteInfo();

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

    // Wheel scrolling across the "Now Playing" chips (delegated on the
    // persistent document — the dock's innerHTML is swapped on every render,
    // so binding on the row itself would silently die with the first swap).
    // Non-passive: the handler must be allowed to cancel the default
    // (useless here) vertical scroll when it converts the wheel into
    // horizontal list scrolling.
    document.addEventListener('wheel', handleDockChipsWheel, { passive: false });

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

    //* Transport-intent guard: while a pause/resume round-trip is still in
    //* flight the publisher may deliver an event that was generated BEFORE
    //* the backend applied the change — it carries the pre-click paused state
    //* and would visibly revert the transport button (and, for a paused
    //* voice, no follow-up event ever corrects it because the publisher only
    //* posts while the position advances). Pin the field to the user's
    //* intent; the promise resolution confirms the real state shortly.
    const intent = activeTransportIntentFor(soundKey);
    if (intent && !!playingSound.paused !== intent.paused) {
      playingSound = Object.assign({}, playingSound, { paused: intent.paused });
    }

    state.playingSounds[soundKey] = playingSound;
    if (state.currentPlayingSoundId === null || state.currentPlayingSoundId === undefined) {
      state.currentPlayingSoundId = soundKey;
    }
    updatePlaybackDockInPlace(playingSound);
  };

  window.finishSound = function(playingSound) {
    if (playingSound && playingSound.sound) {
      delete state.playingSounds[playingSound.sound.id];
      clearTransportIntent(playingSound.sound.id);
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
      19: "Failed to create folder",
      20: "Failed to start the recording",
      21: "Failed to save the recording",
      22: "Failed to trim the sound",
      23: "Failed to move the sound",
      24: "Failed to rename the sound",
      25: "Invalid name",
      26: "The overlay needs Remote Control to be enabled"
    };
    const message = errorMessages[errorCode] || `Unknown error occurred (Code: ${errorCode})`;
    showToast(message, 'error');
  };

  //* Live-control events pushed by the native shell (hotkeys, voice slots,
  //* remote clients): keep the indicator state in sync without a round-trip.
  window.onMicMuteChanged = function(muted) {
    state.micMuted = !!muted;
    renderApp();
  };

  window.onVoicePresetChanged = function(presetName) {
    state.voicePreset = presetName || 'off';
    renderApp();
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
         (state.newSidebarCategoryModal && state.newSidebarCategoryModal.visible) ||
         (state.renameSoundModal && state.renameSoundModal.visible) ||
         (state.tagsModal && state.tagsModal.visible) ||
         (state.policiesModal && state.policiesModal.visible) ||
         (state.moveModal && state.moveModal.visible) ||
         (state.recorderModal && state.recorderModal.visible) ||
         (state.trimModal && state.trimModal.visible) ||
         state.manualDrag.soundId !== null;
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

//* --- Transport intent guard (pause/resume) -----------------------------
//* How long a user's pause/resume click stays protected against contradicting
//* in-flight updateSound events. The native shell answers the click with an
//* authoritative PlayingSound promise long before this expires, so the window
//* only needs to cover the publisher's posting latency plus scheduling.
const TRANSPORT_INTENT_GRACE_MS = 750;

let transportActionSeq = 0;

//* Records that the user just requested `paused` for the sound keyed by
//* `soundKey`. `seq` tags the action so a newer click can supersede an older
//* in-flight one (rapid pause→resume without waiting for the first answer).
function recordTransportIntent(soundKey, paused) {
  state.transportIntent = { key: String(soundKey), paused: !!paused, at: Date.now(), seq: ++transportActionSeq };
}

//* The still-fresh intent for `soundKey`, or null. Lazily expires stale ones.
function activeTransportIntentFor(soundKey) {
  const intent = state.transportIntent;
  if (!intent || intent.key !== String(soundKey)) return null;
  if (Date.now() - intent.at > TRANSPORT_INTENT_GRACE_MS) {
    state.transportIntent = null;
    return null;
  }
  return intent;
}

//* Drops the intent when its sound leaves the playing set (stopped/finished)
//* so it can never pin the paused flag of a later, freshly started playback.
function clearTransportIntent(soundKey) {
  if (state.transportIntent && state.transportIntent.key === String(soundKey)) {
    state.transportIntent = null;
  }
}

//* Clears every trace of playback from the UI state immediately — the dock,
//* tile indicators and the "playing" titles reset on the very first Escape
//* press instead of waiting for (or being undone by) backend round-trips.
function clearAllPlaybackState() {
  state.playingSounds = {};
  state.currentPlayingSoundId = null;
  state.transportIntent = null;
  cleanupScrubberDrag();
}

async function handleStopSound(soundId) {
  state.lastStopAt = Date.now();
  clearTransportIntent(soundId);

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
//* Import Folder: opens the native folder picker and (after the keep/flatten
//* confirmation) copies the picked folder's audio into the given category —
//* or the active one when no tabId is passed (classic toolbar button).
async function handleImportFolder(tabId) {
  if (state.isImportingFolder) return;
  if (!window.pickImportFolder || !window.importFolder) {
    showToast("Folder import is not supported by this backend", "error");
    return;
  }
  const tab = state.tabs.find(t => t.id === (tabId !== undefined && tabId !== null ? tabId : state.activeTabId));
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

//* Import Sound: opens the native multi-select audio file picker and copies
//* the chosen files straight into the given category's root. Reuses the
//* battle-tested importDroppedPaths copy pipeline (same path as OS drag & drop).
async function handleImportSounds(tabId) {
  if (state.isImportingFolder) return;
  if (!window.pickImportFiles || !window.importDroppedPaths) {
    showToast("Sound import is not supported by this backend", "error");
    return;
  }
  const tab = state.tabs.find(t => t.id === tabId);
  if (!tab) {
    showToast("Select a category first", "info");
    return;
  }

  const files = await window.pickImportFiles();
  if (!Array.isArray(files) || files.length === 0) return; // dialog cancelled

  state.isImportingFolder = true;
  renderApp();

  try {
    const soundsBefore = countTabSounds(tab);
    const updatedTab = await window.importDroppedPaths(tab.id, 0, files, 'children');
    if (updatedTab && updatedTab.id !== undefined) {
      state.tabs = state.tabs.map(t => t.id === updatedTab.id ? updatedTab : t);
      const added = countTabSounds(updatedTab) - soundsBefore;
      if (added > 0) {
        showToast(`Imported ${added} sound${added === 1 ? '' : 's'} into "${tab.name}"`, 'success');
      } else {
        showToast('No new sounds found — everything already existed', 'info');
      }
    }
  } catch (e) {
    console.warn('Failed to import sounds:', e);
    showToast('Failed to import sounds', 'error');
  }

  state.isImportingFolder = false;
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
  //* Reveal/hide the "Reset to 100%" row in place — the row is always mounted
  //* (see the Sound Boost card) so no re-render is needed mid-drag.
  document.querySelectorAll('.boost-reset-row').forEach(el => {
    el.classList.toggle('visible', numVal > 100);
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
  const menuHeight = 500;

  const x = (mouseX + menuWidth > window.innerWidth) ? Math.max(10, window.innerWidth - menuWidth - 10) : mouseX;
  const y = (mouseY + menuHeight > window.innerHeight) ? Math.max(10, window.innerHeight - menuHeight - 10) : mouseY;

  state.contextMenu = {
    visible: true,
    x,
    y,
    type: 'sound',
    soundId
  };
  renderApp();
}

//* Right-click on a soundboard folder (sidebar category row): opens the folder
//* context menu — Open in Explorer, Import Sound, Import Folder, Edit, Delete.
function handleFolderContextMenu(tabId, event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }

  const tab = state.tabs.find(t => t.id === tabId);
  if (!tab) return;

  const mouseX = event ? event.clientX : window.innerWidth / 2;
  const mouseY = event ? event.clientY : window.innerHeight / 2;

  const menuWidth = 230;
  const menuHeight = 360;

  const x = (mouseX + menuWidth > window.innerWidth) ? Math.max(10, window.innerWidth - menuWidth - 10) : mouseX;
  const y = (mouseY + menuHeight > window.innerHeight) ? Math.max(10, window.innerHeight - menuHeight - 10) : mouseY;

  state.contextMenu = {
    visible: true,
    x,
    y,
    type: 'folder',
    tabId
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
    //* The binding returns the single refreshed tab — merge it into the list
    //* (assigning it wholesale used to corrupt state.tabs into an object).
    const updatedTab = await window.setSortMode(tabId, parsedMode);
    if (updatedTab && updatedTab.id !== undefined) {
      state.tabs = state.tabs.map(t => t.id === updatedTab.id ? updatedTab : t);
    }
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
  // The onboarding tour owns the keyboard while it is active: Esc skips the
  // tour, arrows navigate. Nothing else (panic stop, search, ...) fires.
  if (state.onboarding.active) {
    if (e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
      skipOnboarding();
    } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      if (state.onboarding.step >= ONBOARDING_STEPS.length - 1) {
        finishOnboarding();
      } else {
        advanceOnboarding(1);
      }
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      e.stopPropagation();
      advanceOnboarding(-1);
    }
    return;
  }

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
  } else if (state.recordingTarget === 'micmute') {
    await updateSetting('micMuteHotkey', state.recordedKeys);
  } else if (state.recordingTarget === 'hearmyself') {
    await updateSetting('hearMyselfHotkey', state.recordedKeys);
  } else if (state.recordingTarget === 'overlay') {
    await updateSetting('overlayHotkey', state.recordedKeys);
  } else if (state.recordingTarget === 'overlaypos') {
    await updateSetting('overlayPositionHotkey', state.recordedKeys);
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
  } else if (state.recordingTarget === 'micmute') {
    await updateSetting('micMuteHotkey', []);
  } else if (state.recordingTarget === 'hearmyself') {
    await updateSetting('hearMyselfHotkey', []);
  } else if (state.recordingTarget === 'overlay') {
    await updateSetting('overlayHotkey', []);
  } else if (state.recordingTarget === 'overlaypos') {
    await updateSetting('overlayPositionHotkey', []);
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

// --- V2: sound & board organization, recording, live controls -------------

//* Effective display name: the per-sound rename overrides the file stem.
function soundDisplayName(sound) {
  return (sound && sound.displayName) ? sound.displayName : (sound ? sound.name : '');
}

const TRIGGER_MODES = [
  { value: 0, label: 'Play / Restart', desc: 'Retrigger restarts the clip from the beginning' },
  { value: 1, label: 'Play / Pause', desc: 'Retrigger pauses, another trigger resumes' },
  { value: 2, label: 'Play / Stop', desc: 'Retrigger stops it; the next trigger starts fresh' },
  { value: 3, label: 'Push-to-Loop', desc: 'Loops while the key or pointer is held' }
];

const VOICE_PRESETS = [
  { value: 'off', label: 'Off' },
  { value: 'deep', label: 'Deep' },
  { value: 'high', label: 'High' },
  { value: 'echo', label: 'Echo' },
  { value: 'robot', label: 'Robot' }
];

//* --- Rename sound (display name only — the file keeps its name) ---
function handleOpenRenameSoundModal(soundId) {
  closeContextMenu();
  const sound = findSoundInTabs(soundId);
  if (!sound) return;
  state.renameSoundModal = { visible: true, soundId, name: soundDisplayName(sound) };
  renderApp();
}
function handleCloseRenameSoundModal() {
  state.renameSoundModal.visible = false;
  renderApp();
}
function handleRenameSoundInput(val) {
  state.renameSoundModal.name = val;
}
function handleRenameSoundKeydown(event) {
  if (event.key === 'Enter') { event.preventDefault(); handleSaveRenameSound(); }
  if (event.key === 'Escape') { event.preventDefault(); handleCloseRenameSoundModal(); }
}
async function handleSaveRenameSound() {
  const modal = state.renameSoundModal;
  if (!modal.soundId || !window.renameSound) return;
  try {
    const updated = await window.renameSound(modal.soundId, modal.name);
    if (updated) {
      for (const tab of state.tabs) {
        const s = flattenTabSounds(tab).find(snd => snd.id === modal.soundId);
        if (s) {
          s.displayName = updated.displayName;
          s.name = updated.name;
        }
      }
      showToast(`Renamed to "${soundDisplayName(updated)}"`, 'success');
    }
  } catch (e) {
    console.warn('renameSound failed:', e);
  }
  handleCloseRenameSoundModal();
}

//* --- Tags ---
function handleOpenTagsModal(soundId) {
  closeContextMenu();
  const sound = findSoundInTabs(soundId);
  if (!sound) return;
  state.tagsModal = { visible: true, soundId, value: (sound.tags || []).join(', ') };
  renderApp();
}
function handleCloseTagsModal() {
  state.tagsModal.visible = false;
  renderApp();
}
function handleTagsInput(val) {
  state.tagsModal.value = val;
}
function handleTagsKeydown(event) {
  if (event.key === 'Enter') { event.preventDefault(); handleSaveTags(); }
  if (event.key === 'Escape') { event.preventDefault(); handleCloseTagsModal(); }
}
async function handleSaveTags() {
  const modal = state.tagsModal;
  if (!modal.soundId || !window.setSoundTags) return;
  const tags = modal.value.split(',').map(t => t.trim()).filter(t => t.length > 0);
  try {
    const updated = await window.setSoundTags(modal.soundId, tags);
    if (updated) {
      for (const tab of state.tabs) {
        const s = flattenTabSounds(tab).find(snd => snd.id === modal.soundId);
        if (s) s.tags = updated.tags || [];
      }
      showToast('Tags saved', 'success');
    }
  } catch (e) {
    console.warn('setSoundTags failed:', e);
  }
  handleCloseTagsModal();
}

//* --- Per-sound playback policies / voice slot ---
function handleOpenPoliciesModal(soundId) {
  closeContextMenu();
  const sound = findSoundInTabs(soundId);
  if (!sound) return;
  state.policiesModal = {
    visible: true,
    soundId,
    triggerMode: sound.triggerMode || 0,
    loopByDefault: !!sound.loopByDefault,
    stopOthers: !!sound.stopOthers,
    muteOthers: !!sound.muteOthers,
    muteVoice: sound.muteVoice === undefined ? null : sound.muteVoice,
    voicePreset: sound.voicePreset || null,
    isVoiceSlot: !!sound.voicePreset
  };
  renderApp();
}
function handleClosePoliciesModal() {
  state.policiesModal.visible = false;
  renderApp();
}
function handlePolicyChange(field, value) {
  state.policiesModal[field] = value;
  renderApp();
}
async function handleSavePolicies() {
  const modal = state.policiesModal;
  if (!modal.soundId) return;

  if (modal.isVoiceSlot) {
    if (window.setSoundVoiceSlot) {
      try {
        const updated = await window.setSoundVoiceSlot(modal.soundId, modal.voicePreset || 'deep');
        if (updated) applySoundUpdateToTabs(updated);
      } catch (e) { console.warn('setSoundVoiceSlot failed:', e); }
    }
  } else if (window.setSoundPolicies) {
    try {
      const updated = await window.setSoundPolicies(
        modal.soundId,
        modal.triggerMode,
        modal.loopByDefault,
        modal.stopOthers,
        modal.muteOthers,
        modal.muteVoice
      );
      if (updated) applySoundUpdateToTabs(updated);
    } catch (e) { console.warn('setSoundPolicies failed:', e); }
  }
  showToast('Playback policies saved', 'success');
  handleClosePoliciesModal();
}
function applySoundUpdateToTabs(updated) {
  for (const tab of state.tabs) {
    const s = flattenTabSounds(tab).find(snd => snd.id === updated.id);
    if (s) Object.assign(s, updated);
  }
}

//* --- Move sounds between boards ---
function handleOpenMoveModal(soundIds) {
  closeContextMenu();
  const ids = Array.isArray(soundIds) ? soundIds : [soundIds];
  if (!ids.length) return;
  state.moveModal = {
    visible: true,
    soundIds: ids,
    targetTabId: state.activeTabId,
    targetFolderId: 0,
    moving: false
  };
  renderApp();
}
function handleCloseMoveModal() {
  if (state.moveModal.moving) return;
  state.moveModal.visible = false;
  renderApp();
}
function handleMoveSelectTab(tabId, folderId) {
  state.moveModal.targetTabId = tabId;
  state.moveModal.targetFolderId = folderId || 0;
  renderApp();
}
async function handleConfirmMove() {
  const modal = state.moveModal;
  if (!modal.soundIds.length || modal.moving || !window.moveSoundsToTab) return;
  modal.moving = true;
  renderApp();
  try {
    const tabs = await window.moveSoundsToTab(modal.soundIds, modal.targetTabId, modal.targetFolderId);
    if (Array.isArray(tabs)) state.tabs = tabs;
    state.selectedSoundIds = [];
    showToast(`Moved ${modal.soundIds.length} sound${modal.soundIds.length === 1 ? '' : 's'}`, 'success');
  } catch (e) {
    console.warn('moveSoundsToTab failed:', e);
    showToast('Failed to move sounds', 'error');
  }
  state.moveModal.visible = false;
  state.moveModal.moving = false;
  renderApp();
}

//* --- Board icons ---
async function handleAssignTabIcon(tabId) {
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
  if (imageDataUrl && window.setTabIcon) {
    imageDataUrl = await optimizeImage(imageDataUrl);
    const updated = await window.setTabIcon(tabId, imageDataUrl);
    if (updated) {
      state.tabs = state.tabs.map(t => t.id === updated.id ? updated : t);
      showToast('Board icon assigned', 'success');
    }
    renderApp();
  }
}
async function handleRemoveTabIcon(tabId) {
  closeContextMenu();
  if (!window.setTabIcon) return;
  const updated = await window.setTabIcon(tabId, "");
  if (updated) {
    state.tabs = state.tabs.map(t => t.id === updated.id ? updated : t);
    showToast('Board icon removed', 'info');
  }
  renderApp();
}

//* --- Manual ordering (drag & drop) ---
//* Dragging is always available: dropping in a non-manual sort mode switches
//* the board to Manual order automatically (persisted by the backend).
function isManualSortActive() {
  const tab = state.tabs.find(t => t.id === state.activeTabId);
  return !!(tab && (tab.sortMode === 4 || tab.sortMode === '4'));
}
function handleManualDragStart(soundId, event) {
  state.manualDrag.soundId = soundId;
  if (event && event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move';
    try { event.dataTransfer.setData('text/plain', 'sound:' + soundId); } catch (e) {}
  }
}
function handleManualDragOver(soundId, event) {
  if (state.manualDrag.soundId === null) return;
  if (event) event.preventDefault();
  if (event && event.dataTransfer) event.dataTransfer.dropEffect = 'move';
  if (state.manualDrag.overSoundId !== soundId) {
    state.manualDrag.overSoundId = soundId;
    renderApp();
  }
}
function handleManualDragLeave() {
  if (state.manualDrag.overSoundId !== null) {
    state.manualDrag.overSoundId = null;
    renderApp();
  }
}
async function handleManualDrop(soundId, event) {
  if (event) event.preventDefault();
  const draggedId = state.manualDrag.soundId;
  state.manualDrag = { soundId: null, overSoundId: null };
  if (draggedId === null || draggedId === soundId) {
    renderApp();
    return;
  }

  const tab = state.tabs.find(t => t.id === state.activeTabId);
  if (!tab || !window.setSoundOrder) return;

  //* Reorder the visible list, then splice it back into the flat model order
  //* so sounds of other folders keep their relative arrangement.
  const visible = currentViewSounds(tab).map(s => s.id);
  const from = visible.indexOf(draggedId);
  const to = visible.indexOf(soundId);
  if (from === -1 || to === -1) { renderApp(); return; }
  visible.splice(to, 0, visible.splice(from, 1)[0]);

  const visibleSet = new Set(visible);
  let cursor = 0;
  const flat = flattenTabSounds(tab).map(s => {
    if (visibleSet.has(s.id)) {
      return visible[cursor++];
    }
    return s.id;
  });

  const wasManual = tab.sortMode === 4 || tab.sortMode === '4';
  try {
    const updated = await window.setSoundOrder(tab.id, flat);
    if (updated) {
      state.tabs = state.tabs.map(t => t.id === updated.id ? updated : t);
    }
    if (!wasManual) showToast('Switched to Manual order — drag sounds to arrange them', 'info');
  } catch (e) {
    console.warn('setSoundOrder failed:', e);
  }
  renderApp();
}
function handleManualDragEnd() {
  state.manualDrag = { soundId: null, overSoundId: null };
  renderApp();
}

//* --- Subfolder ordering (drag & drop of folder tiles) ---
function currentLevelFolders(tab) {
  if (!tab) return [];
  const activeFolder = getActiveFolder(tab);
  return activeFolder ? (activeFolder.folders || []) : (tab.folders || []);
}
function flattenTabFolders(tab) {
  const out = [];
  const walk = (folders) => {
    (folders || []).forEach(f => { out.push(f.id); walk(f.folders); });
  };
  walk(tab ? tab.folders : []);
  return out;
}
function handleFolderDragStart(folderId, event) {
  state.folderDrag.folderId = folderId;
  if (event && event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move';
    try { event.dataTransfer.setData('text/plain', 'folder:' + folderId); } catch (e) {}
  }
}
function handleFolderDragOver(folderId, event) {
  if (state.folderDrag.folderId === null) return;
  if (event) event.preventDefault();
  if (event && event.dataTransfer) event.dataTransfer.dropEffect = 'move';
  //* Grid layout: the pointer half decides whether the tile lands in front of
  //* or behind the hovered one (left/right edge highlight mirrors it).
  let before = true;
  if (event) {
    const tile = event.currentTarget || (event.target && event.target.closest ? event.target.closest('.subfolder-tile') : null);
    if (tile) {
      const rect = tile.getBoundingClientRect();
      before = (rect.width === 0) || ((event.clientX - rect.left) < rect.width / 2);
    }
  }
  if (state.folderDrag.overFolderId !== folderId || state.folderDrag.before !== before) {
    state.folderDrag.overFolderId = folderId;
    state.folderDrag.before = before;
    renderApp();
  }
}
function handleFolderDragLeave() {
  if (state.folderDrag.overFolderId !== null) {
    state.folderDrag.overFolderId = null;
    renderApp();
  }
}
async function handleFolderDrop(folderId, event) {
  if (event) event.preventDefault();
  const draggedId = state.folderDrag.folderId;
  const insertBefore = state.folderDrag.before;
  state.folderDrag = { folderId: null, overFolderId: null, before: true };
  if (draggedId === null || draggedId === folderId) {
    renderApp();
    return;
  }

  const tab = state.tabs.find(t => t.id === state.activeTabId);
  if (!tab || !window.setFolderOrder) { renderApp(); return; }

  //* Reorder the visible tile row, then splice it back into the flat folder
  //* order so folders of other levels keep their relative arrangement.
  const visible = currentLevelFolders(tab).map(f => f.id);
  const from = visible.indexOf(draggedId);
  if (from === -1 || !visible.includes(folderId)) { renderApp(); return; }
  visible.splice(from, 1);
  const insertAt = visible.indexOf(folderId) + (insertBefore ? 0 : 1);
  visible.splice(insertAt, 0, draggedId);

  const visibleSet = new Set(visible);
  let cursor = 0;
  const flat = flattenTabFolders(tab).map(id => {
    if (visibleSet.has(id)) {
      return visible[cursor++];
    }
    return id;
  });

  const wasManual = tab.sortMode === 4 || tab.sortMode === '4';
  try {
    const updated = await window.setFolderOrder(tab.id, flat);
    if (updated) {
      state.tabs = state.tabs.map(t => t.id === updated.id ? updated : t);
    }
    if (!wasManual) showToast('Switched to Manual order — drag folders and sounds to arrange them', 'info');
  } catch (e) {
    console.warn('setFolderOrder failed:', e);
  }
  renderApp();
}
function handleFolderDragEnd() {
  state.folderDrag = { folderId: null, overFolderId: null, before: true };
  renderApp();
}

//* --- Whole-board loop ---
//* One button, three states: Off -> loop the board's own sounds -> loop the
//* board AND every subfolder (board sounds first, then subfolders left to
//* right, each subfolder's own sounds before its children) -> Off.
async function handleBoardLoopClick(tabId) {
  if (!window.boardLoopCycle) return;
  try {
    const raw = await window.boardLoopCycle(tabId);
    const info = typeof raw === 'string' ? JSON.parse(raw) : raw;
    applyBoardLoopInfo(info);
    if (!info || info.mode === 0) {
      showToast('Board loop stopped', 'info');
    } else if (info.total === 0 || !info.index) {
      showToast('Nothing to loop on this board', 'error');
    }
  } catch (e) {
    console.warn('boardLoopCycle failed:', e);
  }
}
function applyBoardLoopInfo(info) {
  state.boardLoop = {
    mode: info ? (info.mode || 0) : 0,
    tabId: info ? info.tabId : null,
    index: info ? (info.index || 0) : 0,
    total: info ? (info.total || 0) : 0,
    currentSoundId: info ? (info.currentSoundId || 0) : 0
  };
}
async function refreshBoardLoopState() {
  if (!window.getBoardLoopState) return;
  try {
    const raw = await window.getBoardLoopState();
    applyBoardLoopInfo(typeof raw === 'string' ? JSON.parse(raw) : raw);
  } catch (e) {
    console.warn('getBoardLoopState failed:', e);
  }
}
window.onBoardLoopChanged = function(mode, tabId) {
  applyBoardLoopInfo({ mode: mode, tabId: tabId, index: 0, total: 0, currentSoundId: 0 });
  //* Pull the full snapshot (position / total) so the button badge is exact.
  refreshBoardLoopState().then(renderApp).catch(() => renderApp());
};

//* --- Push-to-Loop (pointer side; the keyboard side is native) ---
let ptlHoldTimers = {};
let recorderPollTimer = null;
function handlePTLDown(soundId, event) {
  if (event && (event.ctrlKey || event.metaKey)) {
    handleToggleSelectSound(soundId, event);
    return;
  }
  const sound = findSoundInTabs(soundId);
  if (sound && sound.voicePreset) {
    handlePlaySound(soundId);
    return;
  }
  clearTimeout(ptlHoldTimers[soundId]);
  handlePlaySound(soundId);
}
function handlePTLUp(soundId) {
  if (ptlHoldTimers[soundId] !== undefined) {
    clearTimeout(ptlHoldTimers[soundId]);
    delete ptlHoldTimers[soundId];
  }
  handleStopSound(soundId);
}

//* --- Recorder ---
async function handleOpenRecorderModal() {
  state.recorderModal.visible = true;
  await refreshRecorderState();
  renderApp();
}
function handleCloseRecorderModal() {
  state.recorderModal.visible = false;
  renderApp();
}
async function refreshRecorderState() {
  const modal = state.recorderModal;
  if (window.systemRecordingAvailable) {
    try { modal.systemAvailable = await window.systemRecordingAvailable(); } catch (e) { modal.systemAvailable = false; }
  }
  if (window.recorderStatus) {
    try {
      const status = JSON.parse(await window.recorderStatus());
      modal.isRecording = !!status.active;
      modal.elapsedMs = status.elapsedMs || 0;
      if (status.active) modal.source = status.source;
    } catch (e) { modal.isRecording = false; }
  }
  if (window.instantReplayArmed) {
    try { modal.replayArmed = await window.instantReplayArmed(); } catch (e) { modal.replayArmed = false; }
  }
}
function handleRecorderSource(source) {
  if (state.recorderModal.isRecording) return;
  state.recorderModal.source = source;
  renderApp();
}
function handleRecorderName(val) {
  state.recorderModal.name = val;
}
async function handleToggleRecording() {
  const modal = state.recorderModal;
  if (modal.isRecording) {
    if (window.recorderStop) {
      try {
        const path = await window.recorderStop(modal.name || null);
        modal.lastPath = path || '';
        if (path) showToast('Recording saved', 'success');
        else showToast('Failed to save the recording', 'error');
      } catch (e) { console.warn('recorderStop failed:', e); }
    }
    modal.isRecording = false;
    renderApp();
    return;
  }
  if (modal.source === 1 && !modal.systemAvailable) return;
  if (window.recorderStart) {
    try {
      modal.isRecording = await window.recorderStart(modal.source, null);
      if (!modal.isRecording) showToast('Could not open the capture device', 'error');
    } catch (e) {
      modal.isRecording = false;
      showToast('Recording failed to start', 'error');
    }
  }
  renderApp();
}
async function handleToggleInstantReplay() {
  if (window.armInstantReplay && window.disarmInstantReplay) {
    if (state.recorderModal.replayArmed) {
      await window.disarmInstantReplay();
      state.recorderModal.replayArmed = false;
      showToast('Instant Replay disarmed', 'info');
    } else {
      const ok = await window.armInstantReplay();
      state.recorderModal.replayArmed = !!ok;
      showToast(ok ? 'Instant Replay armed — last 30s are kept rolling' : 'System capture is not available', ok ? 'success' : 'error');
    }
    renderApp();
  }
}
async function handleSaveInstantReplay() {
  if (!window.saveInstantReplay) return;
  try {
    const path = await window.saveInstantReplay(state.recorderModal.name || null);
    if (path) {
      state.recorderModal.lastPath = path;
      showToast('Instant Replay saved', 'success');
    } else {
      showToast('Nothing captured yet', 'info');
    }
  } catch (e) {
    console.warn('saveInstantReplay failed:', e);
  }
  renderApp();
}
async function handleAddLastRecordingToBoard() {
  const modal = state.recorderModal;
  const tab = state.tabs.find(t => t.id === state.activeTabId);
  if (!modal.lastPath || !tab || !window.importFileIntoTab) return;
  modal.busy = true;
  renderApp();
  try {
    let folderId = 0;
    if (state.currentView === 'folder') {
      const folder = getActiveFolder(tab);
      folderId = folder ? folder.id : 0;
    }
    const updated = await window.importFileIntoTab(tab.id, modal.lastPath, folderId);
    if (updated) {
      state.tabs = state.tabs.map(t => t.id === updated.id ? updated : t);
      showToast(`Added to "${tab.name}"`, 'success');
    }
  } catch (e) {
    console.warn('importFileIntoTab failed:', e);
    showToast('Failed to add the recording', 'error');
  }
  modal.busy = false;
  renderApp();
}

//* --- Trim / edit ---
async function handleOpenTrimModal(soundId) {
  closeContextMenu();
  const sound = findSoundInTabs(soundId);
  if (!sound || sound.voicePreset) return;
  state.trimModal = {
    visible: true, soundId, name: soundDisplayName(sound),
    peaks: null, durationMs: 0, startMs: 0, endMs: 0, dragging: null, saving: false
  };
  renderApp();
  if (window.getSoundWaveform) {
    try {
      const payload = JSON.parse(await window.getSoundWaveform(soundId, 480));
      state.trimModal.peaks = payload.peaks || [];
      state.trimModal.durationMs = payload.durationMs || 0;
      state.trimModal.endMs = state.trimModal.durationMs;
      renderApp();
    } catch (e) {
      console.warn('getSoundWaveform failed:', e);
      showToast('Could not read the audio file', 'error');
    }
  }
}
function handleCloseTrimModal() {
  state.trimModal.visible = false;
  renderApp();
}
function trimPositionFromEvent(event) {
  const canvas = document.getElementById('trim-waveform');
  if (!canvas) return 0;
  const rect = canvas.getBoundingClientRect();
  const ratio = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
  return Math.round(ratio * state.trimModal.durationMs);
}
function handleTrimPointerDown(which, event) {
  event.preventDefault();
  event.stopPropagation();
  state.trimModal.dragging = which;
  const position = trimPositionFromEvent(event);
  if (which === 'start') {
    state.trimModal.startMs = Math.min(position, state.trimModal.endMs - 50);
  } else if (which === 'end') {
    state.trimModal.endMs = Math.max(position, state.trimModal.startMs + 50);
  } else {
    state.trimModal.startMs = Math.min(position, state.trimModal.durationMs - 50);
    state.trimModal.endMs = Math.max(state.trimModal.startMs + 50, Math.min(position + 50, state.trimModal.durationMs));
  }
  renderApp();
}
function handleTrimPointerMove(event) {
  if (!state.trimModal.dragging) return;
  const position = trimPositionFromEvent(event);
  const which = state.trimModal.dragging;
  if (which === 'start') {
    state.trimModal.startMs = Math.min(Math.max(0, position), state.trimModal.endMs - 50);
  } else if (which === 'end') {
    state.trimModal.endMs = Math.max(Math.min(state.trimModal.durationMs, position), state.trimModal.startMs + 50);
  }
  const canvas = document.getElementById('trim-waveform');
  if (canvas) drawTrimWaveform(canvas);
  updateTrimLabels();
}
function handleTrimPointerUp() {
  if (state.trimModal.dragging) {
    state.trimModal.dragging = null;
    renderApp();
  }
}
function updateTrimLabels() {
  const startEl = document.getElementById('trim-start-label');
  const endEl = document.getElementById('trim-end-label');
  const lengthEl = document.getElementById('trim-length-label');
  if (startEl) startEl.textContent = formatDuration(state.trimModal.startMs);
  if (endEl) endEl.textContent = formatDuration(state.trimModal.endMs);
  if (lengthEl) lengthEl.textContent = formatDuration(Math.max(0, state.trimModal.endMs - state.trimModal.startMs));
}
function drawTrimWaveform(canvas) {
  const modal = state.trimModal;
  if (!canvas || !modal.peaks || !modal.peaks.length) return;
  const context = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;
  const isDark = document.body.classList.contains('dark-theme');
  const styles = getComputedStyle(document.body);
  const accent = styles.getPropertyValue('--color-accent').trim() || '#e8a33d';
  const muted = isDark ? 'rgba(255,255,255,0.22)' : 'rgba(0,0,0,0.18)';
  const dim = isDark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.08)';

  context.clearRect(0, 0, width, height);

  const buckets = modal.peaks.length / 2;
  const barWidth = width / buckets;
  const startRatio = modal.durationMs > 0 ? modal.startMs / modal.durationMs : 0;
  const endRatio = modal.durationMs > 0 ? modal.endMs / modal.durationMs : 1;

  for (let bucket = 0; bucket < buckets; bucket++) {
    const min = modal.peaks[bucket * 2];
    const max = modal.peaks[bucket * 2 + 1];
    const ratio = bucket / buckets;
    const inSelection = ratio >= startRatio && ratio <= endRatio;
    context.fillStyle = inSelection ? accent : muted;

    const yTop = height / 2 - Math.max(1, max * (height / 2 - 4));
    const yBottom = height / 2 + Math.max(1, -min * (height / 2 - 4));
    context.fillRect(bucket * barWidth, yTop, Math.max(1, barWidth - 0.5), yBottom - yTop);
  }

  //* Selection edges
  context.fillStyle = dim;
  context.fillRect(0, 0, startRatio * width, height);
  context.fillRect(endRatio * width, 0, width - endRatio * width, height);
  context.fillStyle = accent;
  context.fillRect(Math.max(0, startRatio * width - 1.5), 0, 3, height);
  context.fillRect(Math.min(width - 3, endRatio * width - 1.5), 0, 3, height);
}
async function handleTrimPreview() {
  const modal = state.trimModal;
  if (!modal.soundId) return;
  const duration = Math.max(100, modal.endMs - modal.startMs);
  const playing = await handlePlaySound(modal.soundId);
  if (playing && window.seekSound) {
    try { await window.seekSound(modal.soundId, modal.startMs); } catch (e) {}
    clearTimeout(ptlHoldTimers['trim-preview']);
    ptlHoldTimers['trim-preview'] = setTimeout(() => {
      handleStopSound(modal.soundId);
      delete ptlHoldTimers['trim-preview'];
    }, duration);
  }
}
async function handleTrimSave() {
  const modal = state.trimModal;
  if (!modal.soundId || modal.saving || !window.trimSound) return;
  modal.saving = true;
  renderApp();
  try {
    const created = await window.trimSound(modal.soundId, modal.startMs, modal.endMs);
    if (created) {
      const tab = state.tabs.find(t => t.id === state.activeTabId);
      if (tab && window.getTabs) {
        state.tabs = await window.getTabs();
      }
      showToast(`Saved "${soundDisplayName(created)}"`, 'success');
    } else {
      showToast('Trim failed', 'error');
    }
  } catch (e) {
    console.warn('trimSound failed:', e);
    showToast('Trim failed', 'error');
  }
  modal.saving = false;
  handleCloseTrimModal();
}

//* --- Live controls (mic, monitoring, voice presets) ---
async function handleToggleMicMute() {
  if (!window.toggleMicMute) return;
  try {
    state.micMuted = await window.toggleMicMute();
    renderApp();
  } catch (e) { console.warn('toggleMicMute failed:', e); }
}
async function handleToggleHearMyself() {
  if (!window.toggleHearMyself) return;
  try {
    await window.toggleHearMyself(); // settings arrive via the settings event
  } catch (e) { console.warn('toggleHearMyself failed:', e); }
}
async function handleSelectVoicePreset(preset) {
  if (!window.setVoicePreset) return;
  try {
    const ok = await window.setVoicePreset(preset);
    if (!ok) showToast('Unknown voice preset', 'error');
  } catch (e) { console.warn('setVoicePreset failed:', e); }
}

//* --- Overlay & remote panel helpers ---
async function handleSetOverlayPosition(position) {
  state.settings.overlayPosition = position;
  if (window.setOverlayPosition) {
    try { await window.setOverlayPosition(position); } catch (e) { console.warn('setOverlayPosition failed:', e); }
  }
  renderApp();
}

async function handleToggleOverlaySetting() {
  if (window.toggleOverlay) {
    try {
      state.settings.overlayEnabled = await window.toggleOverlay();
    } catch (e) {
      console.warn('toggleOverlay failed:', e);
    }
  }
  renderApp();
}

//* --- Remote control panel ---
async function refreshRemoteInfo() {
  if (!window.getRemoteInfo) return;
  try {
    state.remoteInfo = JSON.parse(await window.getRemoteInfo());
  } catch (e) { console.warn('getRemoteInfo failed:', e); }
}
function remoteControllerUrl() {
  const info = state.remoteInfo;
  return `http://${info.address}:${info.port}/`;
}
async function handleCopyRemoteUrl() {
  const url = remoteControllerUrl();
  try {
    await navigator.clipboard.writeText(url);
    showToast('Controller address copied', 'success');
  } catch (e) {
    showToast(url, 'info');
  }
}
async function handleRegeneratePin() {
  if (!window.regenerateRemotePin) return;
  try {
    await window.regenerateRemotePin();
    await refreshRemoteInfo();
    showToast('New pairing PIN generated', 'success');
    renderApp();
  } catch (e) { console.warn('regenerateRemotePin failed:', e); }
}

//* --- Overlay position picker labels ---
const OVERLAY_POSITIONS = [
  'Top Left', 'Top Center', 'Top Right', 'Right Center',
  'Bottom Right', 'Bottom Center', 'Bottom Left', 'Left Center'
];

//* --- Minimal QR encoder (byte mode, versions 1-5, ECC level M) -------------
//* Self-contained: draws the pairing URL into the settings canvas. Byte-mode
//* only, single/dual RS block structures — exactly what short URLs need.
const QR = (() => {
  // Reed-Solomon block tables per version (level M): [eccPerBlock, [dataCodewords per block]]
  const BLOCKS = {
    1: [10, [16]],
    2: [16, [28]],
    3: [26, [44]],
    4: [18, [32, 32]],
    5: [24, [43, 43]]
  };
  const ALIGN = { 1: [], 2: [6, 18], 3: [6, 22], 4: [6, 26], 5: [6, 30] };

  const gfExp = new Array(512);
  const gfLog = new Array(256);
  (() => {
    let x = 1;
    for (let i = 0; i < 255; i++) {
      gfExp[i] = x;
      gfLog[x] = i;
      x <<= 1;
      if (x & 0x100) x ^= 0x11d;
    }
    for (let i = 255; i < 512; i++) gfExp[i] = gfExp[i - 255];
  })();
  const gfMul = (a, b) => (a === 0 || b === 0) ? 0 : gfExp[gfLog[a] + gfLog[b]];

  function rsGenerator(degree) {
    let poly = [1];
    for (let i = 0; i < degree; i++) {
      const next = new Array(poly.length + 1).fill(0);
      for (let j = 0; j < poly.length; j++) {
        next[j] ^= gfMul(poly[j], 1);
        next[j + 1] ^= gfMul(poly[j], gfExp[i]);
      }
      poly = next;
    }
    return poly;
  }

  function rsEncode(data, eccLength) {
    const generator = rsGenerator(eccLength);
    const remainder = new Array(eccLength).fill(0);
    for (const byte of data) {
      const factor = byte ^ remainder[0];
      remainder.shift();
      remainder.push(0);
      if (factor !== 0) {
        for (let i = 0; i < eccLength; i++) {
          remainder[i] ^= gfMul(generator[i + 1], factor);
        }
      }
    }
    return remainder;
  }

  function buildMatrix(text) {
    const bytes = [];
    for (let i = 0; i < text.length; i++) bytes.push(text.charCodeAt(i) & 0xff);
    if (bytes.length > 43) return null;

    let version = 1;
    while (version < 5 && BLOCKS[version][1].reduce((a, b) => a + b, 0) < bytes.length + 2) version++;
    const [eccPerBlock, dataBlocks] = BLOCKS[version];
    const dataCodewords = dataBlocks.reduce((a, b) => a + b, 0);
    if (bytes.length + 2 > dataCodewords) return null;

    const size = 17 + 4 * version;
    const modules = Array.from({ length: size }, () => new Array(size).fill(null));
    const reserved = Array.from({ length: size }, () => new Array(size).fill(false));

    const setModule = (row, col, value) => {
      if (row < 0 || col < 0 || row >= size || col >= size) return;
      modules[row][col] = value;
      reserved[row][col] = true;
    };

    // Finder patterns + separators
    const drawFinder = (row, col) => {
      for (let r = -1; r <= 7; r++) {
        for (let c = -1; c <= 7; c++) {
          const rr = row + r, cc = col + c;
          if (rr < 0 || cc < 0 || rr >= size || cc >= size) continue;
          const inRing = r >= 0 && r <= 6 && c >= 0 && c <= 6 &&
            (r === 0 || r === 6 || c === 0 || c === 6 || (r >= 2 && r <= 4 && c >= 2 && c <= 4));
          setModule(rr, cc, inRing);
        }
      }
    };
    drawFinder(0, 0);
    drawFinder(0, size - 7);
    drawFinder(size - 7, 0);

    // Timing patterns
    for (let i = 8; i < size - 8; i++) {
      setModule(6, i, i % 2 === 0);
      setModule(i, 6, i % 2 === 0);
    }

    // Alignment patterns (skipping finder corners)
    const centers = ALIGN[version];
    for (const r of centers) {
      for (const c of centers) {
        if ((r <= 8 && c <= 8) || (r <= 8 && c >= size - 9) || (r >= size - 9 && c <= 8)) continue;
        for (let dr = -2; dr <= 2; dr++) {
          for (let dc = -2; dc <= 2; dc++) {
            setModule(r + dr, c + dc, Math.max(Math.abs(dr), Math.abs(dc)) !== 1);
          }
        }
      }
    }

    // Format info areas (values filled after mask choice)
    for (let i = 0; i < 9; i++) {
      if (i !== 6) { reserved[8][i] = true; reserved[i][8] = true; }
    }
    for (let i = 0; i < 8; i++) {
      reserved[8][size - 1 - i] = true;
      reserved[size - 1 - i][8] = true;
    }
    // Dark module
    setModule(size - 8, 8, true);

    // --- data bit stream ---
    const bits = [];
    const pushBits = (value, count) => {
      for (let i = count - 1; i >= 0; i--) bits.push((value >> i) & 1);
    };
    pushBits(4, 4);            // byte mode
    pushBits(bytes.length, 8); // v1-9 char count
    for (const byte of bytes) pushBits(byte, 8);
    const capacityBits = dataCodewords * 8;
    pushBits(0, Math.min(4, capacityBits - bits.length)); // terminator
    while (bits.length % 8 !== 0) bits.push(0);
    const padBytes = [0xec, 0x11];
    let padIndex = 0;
    while (bits.length < capacityBits) {
      pushBits(padBytes[padIndex % 2], 8);
      padIndex++;
    }
    const dataBytes = [];
    for (let i = 0; i < bits.length; i += 8) {
      let value = 0;
      for (let j = 0; j < 8; j++) value = (value << 1) | bits[i + j];
      dataBytes.push(value);
    }

    // --- RS blocks + interleave ---
    const finalBytes = [];
    const eccBytes = [];
    let offset = 0;
    for (const blockLength of dataBlocks) {
      const block = dataBytes.slice(offset, offset + blockLength);
      offset += blockLength;
      finalBytes.push(block);
      eccBytes.push(rsEncode(block, eccPerBlock));
    }
    const interleaved = [];
    const maxBlock = Math.max(...dataBlocks);
    for (let i = 0; i < maxBlock; i++) {
      for (const block of finalBytes) if (i < block.length) interleaved.push(block[i]);
    }
    for (let i = 0; i < eccPerBlock; i++) {
      for (const ecc of eccBytes) interleaved.push(ecc[i]);
    }

    // --- place data with a given mask ---
    const maskFunctions = [
      (r, c) => (r + c) % 2 === 0,
      (r, c) => r % 2 === 0,
      (r, c) => c % 3 === 0,
      (r, c) => (r + c) % 3 === 0,
      (r, c) => (Math.floor(r / 2) + Math.floor(c / 3)) % 2 === 0,
      (r, c) => (r * c) % 2 + (r * c) % 3 === 0,
      (r, c) => ((r * c) % 2 + (r * c) % 3) % 2 === 0,
      (r, c) => ((r * c) % 3 + (r + c) % 2) % 2 === 0
    ];

    const placeData = (mask) => {
      let bitIndex = 0;
      const totalBits = interleaved.length * 8;
      let column = size - 1;
      let upward = true;
      while (column > 0) {
        if (column === 6) column--; // timing column
        for (let i = 0; i < size; i++) {
          const row = upward ? size - 1 - i : i;
          for (let dc = 0; dc < 2; dc++) {
            const col = column - dc;
            if (reserved[row][col]) continue;
            let bit = false;
            if (bitIndex < totalBits) {
              bit = ((interleaved[bitIndex >> 3] >> (7 - (bitIndex & 7))) & 1) === 1;
            }
            if (maskFunctions[mask](row, col)) bit = !bit;
            modules[row][col] = bit;
            bitIndex++;
          }
        }
        upward = !upward;
        column -= 2;
      }
    };

    const formatBits = (mask) => {
      // Level M (00) + mask in the 5 data bits, BCH(15,5) remainder appended,
      // the whole 15-bit word XORed with the static mask 0x5412.
      const data = mask << 10;
      let value = data;
      for (let i = 4; i >= 0; i--) {
        if ((value >> (i + 10)) & 1) value ^= 0x537 << i;
      }
      return ((data | (value & 0x3ff)) ^ 0x5412) & 0x7fff;
    };

    const placeFormat = (bits) => {
      // Format string read MSB-first (verified against the reference encoder):
      // copy 1 wraps the top-left finder, copy 2 runs up column 8 and along row 8.
      const positions1 = [[8,0],[8,1],[8,2],[8,3],[8,4],[8,5],[8,7],[8,8],[7,8],[5,8],[4,8],[3,8],[2,8],[1,8],[0,8]];
      for (let i = 0; i < 15; i++) {
        const [r, c] = positions1[i];
        modules[r][c] = ((bits >> (14 - i)) & 1) === 1;
      }
      for (let i = 0; i < 7; i++) modules[size - 1 - i][8] = ((bits >> (14 - i)) & 1) === 1;
      for (let i = 0; i < 8; i++) modules[8][size - 8 + i] = ((bits >> (7 - i)) & 1) === 1;
      modules[size - 8][8] = true; // dark module
    };

    const penalty = () => {
      let score = 0;
      // Rule 1: runs of 5+
      for (let row = 0; row < size; row++) {
        let run = 1;
        for (let col = 1; col < size; col++) {
          if (modules[row][col] === modules[row][col - 1]) run++;
          else { if (run >= 5) score += 3 + (run - 5); run = 1; }
        }
        if (run >= 5) score += 3 + (run - 5);
      }
      for (let col = 0; col < size; col++) {
        let run = 1;
        for (let row = 1; row < size; row++) {
          if (modules[row][col] === modules[row - 1][col]) run++;
          else { if (run >= 5) score += 3 + (run - 5); run = 1; }
        }
        if (run >= 5) score += 3 + (run - 5);
      }
      // Rule 2: 2x2 blocks
      for (let row = 0; row < size - 1; row++) {
        for (let col = 0; col < size - 1; col++) {
          const v = modules[row][col];
          if (v === modules[row][col + 1] && v === modules[row + 1][col] && v === modules[row + 1][col + 1]) score += 3;
        }
      }
      // Rule 3: 11-module windows shaped like 00001011101 or 10111010000
      // (a finder-like run with four light modules on one side), fully inside
      // the symbol — matching the reference scoring.
      const finderWindow = (getWindow) => {
        let points = 0;
        for (let index = 0; index < 11; index++) {
          if (getWindow(index) === null) return 0;
        }
        let value = 0;
        for (let index = 0; index < 11; index++) {
          value = ((value << 1) | (getWindow(index) ? 1 : 0)) & 0x7ff;
        }
        if (value === 0x5d0 || value === 0x05d) points++;
        return points;
      };
      for (let a = 0; a < size; a++) {
        for (let b = 0; b + 10 < size; b++) {
          score += 40 * finderWindow((k) => modules[a][b + k] !== undefined && b + k < size ? modules[a][b + k] : null);
          score += 40 * finderWindow((k) => modules[b + k] !== undefined && b + k < size ? modules[b + k][a] : null);
        }
      }
      // Rule 4: dark/light balance
      let dark = 0;
      for (let row = 0; row < size; row++) for (let col = 0; col < size; col++) if (modules[row][col]) dark++;
      const percent = (dark * 100) / (size * size);
      score += Math.floor(Math.abs(percent - 50) / 5) * 10;
      return score;
    };

    let bestMask = 0;
    let bestScore = Infinity;
    for (let mask = 0; mask < 8; mask++) {
      placeData(mask);
      placeFormat(formatBits(mask));
      const score = penalty();
      if (score < bestScore) { bestScore = score; bestMask = mask; }
    }
    placeData(bestMask);
    placeFormat(formatBits(bestMask));

    return { size, modules };
  }

  function draw(canvas, text, dark, light) {
    const matrix = buildMatrix(text);
    if (!matrix || !canvas) return false;
    const context = canvas.getContext('2d');
    const quiet = 4;
    const cell = Math.floor(Math.min(canvas.width, canvas.height) / (matrix.size + quiet * 2));
    const offset = Math.floor((canvas.width - cell * matrix.size) / 2);
    context.fillStyle = light || '#ffffff';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = dark || '#10131a';
    for (let row = 0; row < matrix.size; row++) {
      for (let col = 0; col < matrix.size; col++) {
        if (matrix.modules[row][col]) {
          context.fillRect(offset + col * cell, offset + row * cell, cell, cell);
        }
      }
    }
    return true;
  }

  return { draw, buildMatrix };
})();

function drawRemoteQr() {
  const canvas = document.getElementById('remote-qr');
  if (canvas) {
    QR.draw(canvas, remoteControllerUrl());
  }
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
         oncontextmenu="handleFolderContextMenu(${t.id}, event)"
         ondragstart="handleSidebarDragStart(${t.id}, event)"
         ondragend="handleSidebarDragEnd()"
         ondragover="handleSidebarTabDragOver(${t.id}, event)"
         ondragleave="handleSidebarTabDragLeave(event)"
         ondrop="handleSidebarTabDrop(${t.id}, event)">
      <div class="folder-name-container">
        ${t.icon ? `<img class="nav-icon board-icon-img" src="${t.icon}" alt="" onerror="this.outerHTML='<span class=\\'nav-icon\\'>${isActive ? icons.folderOpen : icons.folder}</span>'">` : `<span class="nav-icon">${isActive ? icons.folderOpen : icons.folder}</span>`}
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

      <div class="topbar-live-controls">
        <button class="topbar-live-btn ${state.micMuted ? 'danger' : ''}" title="${state.micMuted ? 'Unmute microphone' : 'Mute microphone'}"
                onclick="handleToggleMicMute()">
          <span class="live-mic-icon ${state.micMuted ? 'muted' : ''}">🎤</span>
          <span class="topbar-live-label">${state.micMuted ? 'Mic off' : 'Mic on'}</span>
        </button>
        <button class="topbar-live-btn ${state.settings.hearMyself ? 'active' : ''}" title="Hear myself — monitor the (voice-processed) microphone locally"
                onclick="handleToggleHearMyself()">
          <span>🎧</span>
          <span class="topbar-live-label">Monitor</span>
        </button>
        ${state.voicePreset && state.voicePreset !== 'off' ? `
          <span class="topbar-voice-pill" title="Live voice preset — change it in Settings or via voice slots">🎙 ${state.voicePreset}</span>
        ` : ''}
        <button class="topbar-live-btn" title="Recorder — microphone & desktop capture, instant replay, trim"
                onclick="handleOpenRecorderModal()">
          <span class="live-rec-dot">●</span>
          <span class="topbar-live-label">Record</span>
        </button>
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

  //* V2: paint the trim waveform canvas once it exists, and keep the
  //* recording timer ticking while the recorder modal is open.
  if (state.trimModal && state.trimModal.visible) {
    const canvas = document.getElementById('trim-waveform');
    if (canvas) drawTrimWaveform(canvas);
  }
  if (state.currentView === 'settings' && state.remoteInfo.running) {
    drawRemoteQr();
  }
  if (state.recorderModal && state.recorderModal.visible && state.recorderModal.isRecording) {
    if (!recorderPollTimer) {
      recorderPollTimer = setInterval(async () => {
        await refreshRecorderState();
        const timerEl = document.getElementById('recorder-elapsed');
        if (timerEl) {
          timerEl.textContent = (state.recorderModal.elapsedMs / 1000).toFixed(1);
        } else if (state.recorderModal.isRecording) {
          renderApp();
        }
      }, 250);
    }
  } else if (recorderPollTimer) {
    clearInterval(recorderPollTimer);
    recorderPollTimer = null;
  }

  // First-run onboarding: starts the tour overlay once the real workspace is
  // on screen (this line is unreachable for the VB-Cable setup page).
  maybeStartOnboarding();
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
        ${childFolders.map(f => {
          const dragState = state.folderDrag;
          const tileClasses = ['subfolder-tile'];
          if (dragState.folderId === f.id) tileClasses.push('dragging');
          if (dragState.overFolderId === f.id) tileClasses.push(dragState.before ? 'drop-before' : 'drop-after');
          return `
          <button class="${tileClasses.join(' ')}" data-drop-folder-id="${f.id}"
                  draggable="true"
                  ondragstart="handleFolderDragStart(${f.id}, event)"
                  ondragover="handleFolderDragOver(${f.id}, event)"
                  ondragleave="handleFolderDragLeave()"
                  ondrop="handleFolderDrop(${f.id}, event)"
                  ondragend="handleFolderDragEnd()"
                  onclick="navigateToFolder(${f.id})"
                  title="${escapeHtml(f.path || f.name)} — ${countFolderSounds(f)} sound${countFolderSounds(f) === 1 ? '' : 's'} — drag to reorder">
            <span class="subfolder-tile-icon">${icons.folder}</span>
            <span class="subfolder-tile-name" title="${escapeHtml(f.name)}">${escapeHtml(f.name)}</span>
            <span class="subfolder-tile-count">${countFolderSounds(f)}</span>
          </button>
        `;}).join('')}
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
      //* Empty folder vs. no search hits vs. no favorites yet — each variant
      //* gets its own artwork, copy and call-to-action so the state never
      //* reads as a dead end.
      const canImportHere = isFolderView && activeTab && !isSearching;
      contentHtml = `
        <div class="table-container empty-state-container">
          <div class="empty-state">
            <div class="empty-state-icon">${isSearching ? icons.search : icons.logo}</div>
            <div class="empty-state-title">${isSearching ? 'No sounds match your search' : 'No sounds found here'}</div>
            <div class="empty-state-desc">
              ${isSearching
                ? 'Try a different keyword — search covers every subfolder of this category.'
                : (isFolderView
                    ? 'Drag audio files in from your file explorer, or import a folder. MP3, WAV and FLAC are supported.'
                    : 'Star sounds as favorites and they will collect here for one-tap access.')}
            </div>
            <div class="empty-state-actions">
              ${isSearching ? `
                <button class="btn-primary" onclick="handleSearch('')">
                  ${icons.close} Clear Search
                </button>
              ` : ''}
              ${canImportHere ? `
                <button class="btn-primary" onclick="handleImportFolder()" ${state.isImportingFolder ? 'disabled style="opacity: 0.55; pointer-events: none;"' : ''}>
                  ${state.isImportingFolder ? icons.spinner : icons.importIcon} ${state.isImportingFolder ? 'Importing…' : 'Import Folder'}
                </button>
                <button class="btn-subtle" onclick="handleOpenFolder(${activeTab.id})" title="Open this folder in your file explorer and drop files in">
                  ${icons.folderOpen} Open in Explorer
                </button>
              ` : ''}
            </div>
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
            const isPTL = sound.triggerMode === 3;
            const manualDragAttrs = !sound.voicePreset
              ? ` draggable="true" ondragstart="handleManualDragStart(${sound.id}, event)" ondragover="handleManualDragOver(${sound.id}, event)" ondragleave="handleManualDragLeave()" ondrop="handleManualDrop(${sound.id}, event)" ondragend="handleManualDragEnd()"`
              : '';
            const clickAttrs = isPTL
              ? `onpointerdown="handlePTLDown(${sound.id}, event)" onpointerup="handlePTLUp(${sound.id})" onpointerleave="handlePTLUp(${sound.id})"`
              : `onclick="handleSoundCardClick(${sound.id}, event)"`;

            return `
              <div class="deck-tile ${isPlaying ? 'playing' : ''} ${hasImage ? 'has-card-image' : ''} ${isSelected ? 'is-selected' : ''} ${state.manualDrag.overSoundId === sound.id ? 'drag-over' : ''}" 
                   style="${hasImage ? `background-image: url('${sound.image}');` : ''}"
                   ${clickAttrs}
                   ${manualDragAttrs}
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
                  ${sound.voicePreset ? `<span class="voice-slot-badge" title="Live voice slot">${sound.voicePreset}</span>` : ''}
                  ${!sound.voicePreset && sound.triggerMode && sound.triggerMode !== 0 ? `<span class="policy-badge" title="${(TRIGGER_MODES[sound.triggerMode] || {}).label || ''}">${(TRIGGER_MODES[sound.triggerMode] || {}).label || ''}</span>` : ''}
                  <span class="deck-sound-name" title="${soundDisplayName(sound)}">${soundDisplayName(sound)}</span>
                  ${(sound.tags && sound.tags.length) ? `<span class="sound-tag-row">${sound.tags.slice(0, 3).map(tag => `<em class="sound-tag">${escapeHtml(tag)}</em>`).join('')}</span>` : ''}
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
            const isPTL = sound.triggerMode === 3;
            const manualDragAttrs = !sound.voicePreset
              ? ` draggable="true" ondragstart="handleManualDragStart(${sound.id}, event)" ondragover="handleManualDragOver(${sound.id}, event)" ondragleave="handleManualDragLeave()" ondrop="handleManualDrop(${sound.id}, event)" ondragend="handleManualDragEnd()"`
              : '';
            const clickAttrs = isPTL
              ? `onpointerdown="handlePTLDown(${sound.id}, event)" onpointerup="handlePTLUp(${sound.id})" onpointerleave="handlePTLUp(${sound.id})"`
              : `onclick="handleSoundCardClick(${sound.id}, event)"`;
            return `
              <div class="sound-grid-card ${isPlaying ? 'playing' : ''} ${hasImage ? 'has-card-image' : ''} ${isSelected ? 'is-selected' : ''} ${state.manualDrag.overSoundId === sound.id ? 'drag-over' : ''}" 
                   style="${hasImage ? `background-image: url('${sound.image}');` : ''}"
                   ${clickAttrs}
                   ${manualDragAttrs}
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
                  ${sound.voicePreset ? `<span class="voice-slot-badge" title="Live voice slot">${sound.voicePreset}</span>` : ''}
                  ${hasImage ? '' : `<div class="card-sound-icon">${icons.music}</div>`}
                  <span class="card-sound-name" title="${soundDisplayName(sound)}">${soundDisplayName(sound)}</span>
                  ${(sound.tags && sound.tags.length) ? `<span class="sound-tag-row">${sound.tags.slice(0, 3).map(tag => `<em class="sound-tag">${escapeHtml(tag)}</em>`).join('')}</span>` : ''}
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
                const isPTL = sound.triggerMode === 3;
                const manualDragAttrs = !sound.voicePreset
                  ? ` draggable="true" ondragstart="handleManualDragStart(${sound.id}, event)" ondragover="handleManualDragOver(${sound.id}, event)" ondragleave="handleManualDragLeave()" ondrop="handleManualDrop(${sound.id}, event)" ondragend="handleManualDragEnd()"`
                  : '';
                const clickAttrs = isPTL
                  ? `onpointerdown="handlePTLDown(${sound.id}, event)" onpointerup="handlePTLUp(${sound.id})" onpointerleave="handlePTLUp(${sound.id})"`
                  : `onclick="handleSoundCardClick(${sound.id}, event)"`;
                return `
                  <tr class="sound-row ${isPlaying ? 'playing' : ''} ${isSelected ? 'is-selected' : ''} ${state.manualDrag.overSoundId === sound.id ? 'drag-over' : ''}" 
                      ${clickAttrs}
                      ondblclick="handlePlaySound(${sound.id})" 
                      ${manualDragAttrs}
                      oncontextmenu="handleSoundContextMenu(${sound.id}, event)">
                    <td style="text-align: center; font-family: var(--font-mono); font-size: 11px; color: var(--color-muted);">${isManualSortActive() ? '⠿' : (idx + 1)}</td>
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
                        ${sound.voicePreset ? `<span class="voice-slot-badge" title="Live voice slot">${sound.voicePreset}</span>` : ''}
                        <span class="sound-name-text">${soundDisplayName(sound)}</span>
                        ${(sound.tags && sound.tags.length) ? `<span class="sound-tag-row">${sound.tags.slice(0, 4).map(tag => `<em class="sound-tag">${escapeHtml(tag)}</em>`).join('')}</span>` : ''}
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

    //* Whole-board loop button state: Off -> board-only -> board + subfolders.
    const boardLoop = state.boardLoop || { mode: 0, tabId: null, index: 0, total: 0 };
    const loopActiveHere = boardLoop.mode > 0 && boardLoop.tabId === activeTab.id;
    const loopBadge = loopActiveHere && boardLoop.total > 0 ? ` (${boardLoop.index}/${boardLoop.total})` : '';
    const loopLabel = !loopActiveHere
      ? 'Loop Board'
      : (boardLoop.mode === 1 ? `Looping Board${loopBadge}` : `Looping All Folders${loopBadge}`);
    const loopClass = loopActiveHere ? (boardLoop.mode === 1 ? 'loop-board' : 'loop-folders') : '';
    const loopTitle = !loopActiveHere
      ? 'Play every sound of this board in order, top to bottom, and repeat. Click again to include all subfolders.'
      : (boardLoop.mode === 1
          ? `Looping this board's own sounds (${boardLoop.index}/${boardLoop.total}). Click to also loop every subfolder — board first, then subfolders left to right.`
          : `Looping the board and all subfolders (${boardLoop.index}/${boardLoop.total}) — board sounds first, then each subfolder left to right. Click to stop.`);

    return `
      ${isFolderView && activeTab ? `
        <div class="table-header-wrapper">
          <div class="checkbox-desc">Sort mode settings automatically sync with files order — dragging sounds or folders switches to Manual order</div>
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
            <button class="btn-subtle board-loop-btn ${loopClass} ${loopActiveHere ? 'active' : ''}"
                    onclick="handleBoardLoopClick(${activeTab.id})"
                    title="${loopTitle}">
              ${icons.repeat} ${loopLabel}
            </button>
            <select class="sort-select" onchange="handleSetSortMode(${activeTab.id}, this.value)">
              <option value="0" ${activeTab.sortMode === 0 ? 'selected' : ''}>Modified Date (Asc)</option>
              <option value="1" ${activeTab.sortMode === 1 ? 'selected' : ''}>Modified Date (Desc)</option>
              <option value="2" ${activeTab.sortMode === 2 ? 'selected' : ''}>Alphabetical (Asc)</option>
              <option value="3" ${activeTab.sortMode === 3 ? 'selected' : ''}>Alphabetical (Desc)</option>
              <option value="4" ${activeTab.sortMode === 4 ? 'selected' : ''}>Manual (Drag &amp; Drop)</option>
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
    const themeMode = state.settings.theme;
    return `
      <div class="settings-shell">
        <!-- Page header -->
        <div class="settings-header">
          <div class="settings-header-icon">${icons.settings}</div>
          <div class="settings-header-text">
            <div class="settings-header-title">Settings &amp; Audio</div>
            <div class="settings-header-desc">Playback behaviour, appearance, volumes and audio routing — every change applies instantly and is saved automatically.</div>
          </div>
        </div>

        <div class="settings-grid">
          <!-- Settings Panel Column 1 -->
          <div class="settings-col">

            <!-- Appearance -->
            <section class="settings-card">
              <header class="settings-card-head">
                <span class="settings-card-icon">${icons.palette}</span>
                <div class="settings-card-heading">
                  <div class="settings-card-title">Appearance</div>
                  <div class="settings-card-sub">Theme and default soundboard layout</div>
                </div>
              </header>
              <div class="settings-card-body">
                <div class="settings-field">
                  <div class="settings-field-label">Visual Design Appearance</div>
                  <div class="segmented-control">
                    <button type="button" class="segment ${themeMode === 0 ? 'active' : ''}" onclick="updateSetting('theme', 0)">
                      ${icons.monitor} System
                    </button>
                    <button type="button" class="segment ${themeMode === 1 ? 'active' : ''}" onclick="updateSetting('theme', 1)">
                      ${icons.moon} Dark
                    </button>
                    <button type="button" class="segment ${themeMode === 2 ? 'active' : ''}" onclick="updateSetting('theme', 2)">
                      ${icons.sun} Light
                    </button>
                  </div>
                </div>

                <div class="settings-field">
                  <div class="settings-field-label">Default Soundboard View Mode</div>
                  <div class="viewmode-picker">
                    <button type="button" class="viewmode-card ${state.listViewMode === 'table' ? 'active' : ''}" onclick="updateDefaultViewMode('table')" title="Soundpad High-Density Table — the default layout">
                      <span class="viewmode-tag">Default</span>
                      <span class="viewmode-icon">${icons.table}</span>
                      <span class="viewmode-name">Soundpad Table</span>
                      <span class="viewmode-desc">High-density sound rows</span>
                    </button>
                    <button type="button" class="viewmode-card ${state.listViewMode === 'deck' ? 'active' : ''}" onclick="updateDefaultViewMode('deck')" title="Stream Deck Macro Pads">
                      <span class="viewmode-icon">${icons.deck}</span>
                      <span class="viewmode-name">Stream Deck</span>
                      <span class="viewmode-desc">Macro pad tiles</span>
                    </button>
                    <button type="button" class="viewmode-card ${state.listViewMode === 'grid' ? 'active' : ''}" onclick="updateDefaultViewMode('grid')" title="Media Grid View">
                      <span class="viewmode-icon">${icons.grid}</span>
                      <span class="viewmode-name">Media Grid</span>
                      <span class="viewmode-desc">Visual card grid</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <!-- Playback & Behaviour -->
            <section class="settings-card">
              <header class="settings-card-head">
                <span class="settings-card-icon">${icons.play}</span>
                <div class="settings-card-heading">
                  <div class="settings-card-title">Playback &amp; Behaviour</div>
                  <div class="settings-card-sub">How sounds start, stack and stop</div>
                </div>
              </header>
              <div class="settings-card-body">
                <label class="setting-toggle-row">
                  <div class="setting-toggle-info">
                    <span class="setting-toggle-title">Mute microphones during playback</span>
                    <span class="setting-toggle-desc">Mute your active mic input while soundboard effects are playing.</span>
                  </div>
                  <span class="modern-switch">
                    <input type="checkbox" ${state.settings.muteDuringPlayback ? 'checked' : ''} onchange="updateSetting('muteDuringPlayback', this.checked)">
                    <span class="switch-track"><span class="switch-thumb"></span></span>
                  </span>
                </label>
                <label class="setting-toggle-row">
                  <div class="setting-toggle-info">
                    <span class="setting-toggle-title">Allow overlapping sounds</span>
                    <span class="setting-toggle-desc">Play multiple sound streams at the same time without cutoffs.</span>
                  </div>
                  <span class="modern-switch">
                    <input type="checkbox" ${state.settings.allowOverlapping ? 'checked' : ''} onchange="updateSetting('allowOverlapping', this.checked)">
                    <span class="switch-track"><span class="switch-thumb"></span></span>
                  </span>
                </label>
                <label class="setting-toggle-row">
                  <div class="setting-toggle-info">
                    <span class="setting-toggle-title">Restrict hotkeys to active tab</span>
                    <span class="setting-toggle-desc">Hotkeys of sounds outside the currently selected category are ignored.</span>
                  </div>
                  <span class="modern-switch">
                    <input type="checkbox" ${state.settings.tabHotkeysOnly ? 'checked' : ''} onchange="updateSetting('tabHotkeysOnly', this.checked)">
                    <span class="switch-track"><span class="switch-thumb"></span></span>
                  </span>
                </label>
              </div>
            </section>

            <!-- Application -->
            <section class="settings-card">
              <header class="settings-card-head">
                <span class="settings-card-icon">${icons.systemInfo}</span>
                <div class="settings-card-heading">
                  <div class="settings-card-title">Application</div>
                  <div class="settings-card-sub">Window and file behaviour</div>
                </div>
              </header>
              <div class="settings-card-body">
                <label class="setting-toggle-row">
                  <div class="setting-toggle-info">
                    <span class="setting-toggle-title">Minimize to system tray</span>
                    <span class="setting-toggle-desc">Send the soundboard window to the system tray on close.</span>
                  </div>
                  <span class="modern-switch">
                    <input type="checkbox" ${state.settings.minimizeToTray ? 'checked' : ''} onchange="updateSetting('minimizeToTray', this.checked)">
                    <span class="switch-track"><span class="switch-thumb"></span></span>
                  </span>
                </label>
                <label class="setting-toggle-row">
                  <div class="setting-toggle-info">
                    <span class="setting-toggle-title">Delete files to trash bin</span>
                    <span class="setting-toggle-desc">Move deleted sound files to the recycle bin instead of erasing them.</span>
                  </div>
                  <span class="modern-switch">
                    <input type="checkbox" ${state.settings.deleteToTrash ? 'checked' : ''} onchange="updateSetting('deleteToTrash', this.checked)">
                    <span class="switch-track"><span class="switch-thumb"></span></span>
                  </span>
                </label>
              </div>
            </section>

            <!-- Global Shortcut Hotkeys -->
            <section class="settings-card">
              <header class="settings-card-head">
                <span class="settings-card-icon">${icons.keyboard}</span>
                <div class="settings-card-heading">
                  <div class="settings-card-title">Global Shortcut Hotkeys</div>
                  <div class="settings-card-sub">System-wide key combinations</div>
                </div>
              </header>
              <div class="settings-card-body">
                <div class="hotkey-row">
                  <div class="setting-toggle-info">
                    <span class="setting-toggle-title">Push-To-Talk keys</span>
                    <span class="setting-toggle-desc">Keys exempt from the mute block — hold to speak.</span>
                  </div>
                  <button class="hotkey-badge ${state.settings.pushToTalkKeys && state.settings.pushToTalkKeys.length > 0 ? 'assigned' : ''}" onclick="startRecordHotkey(null, 'ptt')">
                    ${state.settings.pushToTalkKeys && state.settings.pushToTalkKeys.length > 0 ? 'PTT Active' : 'Assign'}
                  </button>
                </div>
                <div class="hotkey-row">
                  <div class="setting-toggle-info">
                    <span class="setting-toggle-title">Emergency stop hotkey</span>
                    <span class="setting-toggle-desc">Instantly stops every playing sound.</span>
                  </div>
                  <button class="hotkey-badge ${state.settings.stopHotkey && state.settings.stopHotkey.length > 0 ? 'assigned' : ''}" onclick="startRecordHotkey(null, 'stop')">
                    ${state.settings.stopHotkey && state.settings.stopHotkey.length > 0 ? 'Stop Active' : 'Assign'}
                  </button>
                </div>
                <div class="hotkey-row">
                  <div class="setting-toggle-info">
                    <span class="setting-toggle-title">Microphone mute hotkey</span>
                    <span class="setting-toggle-desc">Toggles your microphone mute from anywhere.</span>
                  </div>
                  <button class="hotkey-badge ${state.settings.micMuteHotkey && state.settings.micMuteHotkey.length > 0 ? 'assigned' : ''}" onclick="startRecordHotkey(null, 'micmute')">
                    ${state.settings.micMuteHotkey && state.settings.micMuteHotkey.length > 0 ? 'Mute Active' : 'Assign'}
                  </button>
                </div>
                <div class="hotkey-row">
                  <div class="setting-toggle-info">
                    <span class="setting-toggle-title">Hear myself hotkey</span>
                    <span class="setting-toggle-desc">Toggles monitoring of your (voice-processed) microphone.</span>
                  </div>
                  <button class="hotkey-badge ${state.settings.hearMyselfHotkey && state.settings.hearMyselfHotkey.length > 0 ? 'assigned' : ''}" onclick="startRecordHotkey(null, 'hearmyself')">
                    ${state.settings.hearMyselfHotkey && state.settings.hearMyselfHotkey.length > 0 ? 'Monitor Active' : 'Assign'}
                  </button>
                </div>
                <div class="hotkey-row">
                  <div class="setting-toggle-info">
                    <span class="setting-toggle-title">Overlay show / hide hotkey</span>
                    <span class="setting-toggle-desc">Shows or hides the floating now-playing overlay.</span>
                  </div>
                  <button class="hotkey-badge ${state.settings.overlayHotkey && state.settings.overlayHotkey.length > 0 ? 'assigned' : ''}" onclick="startRecordHotkey(null, 'overlay')">
                    ${state.settings.overlayHotkey && state.settings.overlayHotkey.length > 0 ? 'Overlay Active' : 'Assign'}
                  </button>
                </div>
                <div class="hotkey-row">
                  <div class="setting-toggle-info">
                    <span class="setting-toggle-title">Overlay position hotkey</span>
                    <span class="setting-toggle-desc">Cycles the overlay between the eight screen positions.</span>
                  </div>
                  <button class="hotkey-badge ${state.settings.overlayPositionHotkey && state.settings.overlayPositionHotkey.length > 0 ? 'assigned' : ''}" onclick="startRecordHotkey(null, 'overlaypos')">
                    ${state.settings.overlayPositionHotkey && state.settings.overlayPositionHotkey.length > 0 ? 'Position Active' : 'Assign'}
                  </button>
                </div>
              </div>
            </section>

            <!-- Live Voice & Monitoring -->
            <section class="settings-card">
              <header class="settings-card-head">
                <span class="settings-card-icon">${icons.volume}</span>
                <div class="settings-card-heading">
                  <div class="settings-card-title">Live Voice &amp; Monitoring</div>
                  <div class="settings-card-sub">Original local voice presets for your microphone</div>
                </div>
              </header>
              <div class="settings-card-body">
                <div class="settings-field">
                  <div class="settings-field-label">Voice preset</div>
                  <div class="segmented-control" style="flex-wrap: wrap;">
                    ${VOICE_PRESETS.map(preset => `
                      <button type="button" class="segment ${state.voicePreset === preset.value ? 'active' : ''}" onclick="handleSelectVoicePreset('${preset.value}')">
                        ${preset.label}
                      </button>
                    `).join('')}
                  </div>
                  <div style="font-size: 11px; color: var(--color-muted); margin-top: 8px;">
                    The processed microphone feeds your configured output pathway; add “Hear myself” to monitor it locally. Trigger presets instantly from soundboard <em>voice slots</em> or hotkeys.
                  </div>
                </div>
                <label class="setting-toggle-row">
                  <div class="setting-toggle-info">
                    <span class="setting-toggle-title">Hear myself</span>
                    <span class="setting-toggle-desc">Monitor the (voice-processed) microphone on your speakers or headphones.</span>
                  </div>
                  <span class="modern-switch">
                    <input type="checkbox" ${state.settings.hearMyself ? 'checked' : ''} onchange="handleToggleHearMyself()">
                    <span class="switch-track"><span class="switch-thumb"></span></span>
                  </span>
                </label>
                <label class="setting-toggle-row">
                  <div class="setting-toggle-info">
                    <span class="setting-toggle-title">Microphone muted</span>
                    <span class="setting-toggle-desc">${state.micMuted ? 'Your microphone is currently muted.' : 'Your microphone is currently live.'}</span>
                  </div>
                  <span class="modern-switch">
                    <input type="checkbox" ${state.micMuted ? 'checked' : ''} onchange="handleToggleMicMute()">
                    <span class="switch-track"><span class="switch-thumb"></span></span>
                  </span>
                </label>
              </div>
            </section>
          </div>

          <!-- Settings Panel Column 2 -->
          <div class="settings-col">

            <!-- Now-Playing Overlay -->
            <section class="settings-card">
              <header class="settings-card-head">
                <span class="settings-card-icon">${icons.monitor}</span>
                <div class="settings-card-heading">
                  <div class="settings-card-title">Now-Playing Overlay</div>
                  <div class="settings-card-sub">Floating HUD with active sounds and the live voice</div>
                </div>
              </header>
              <div class="settings-card-body">
                <label class="setting-toggle-row">
                  <div class="setting-toggle-info">
                    <span class="setting-toggle-title">Show the overlay</span>
                    <span class="setting-toggle-desc">A small always-on-top window with the current sounds. Drag it anywhere; needs Remote Control below.</span>
                  </div>
                  <span class="modern-switch">
                    <input type="checkbox" ${state.settings.overlayEnabled ? 'checked' : ''} onchange="handleToggleOverlaySetting()">
                    <span class="switch-track"><span class="switch-thumb"></span></span>
                  </span>
                </label>
                <div class="settings-field">
                  <div class="settings-field-label">Position</div>
                  <div class="overlay-position-grid">
                    ${OVERLAY_POSITIONS.map((label, index) => `
                      <button type="button" class="overlay-position-cell ${state.settings.overlayPosition === index ? 'active' : ''}"
                              title="${label}"
                              onclick="handleSetOverlayPosition(${index})">${label}</button>
                    `).join('')}
                  </div>
                </div>
              </div>
            </section>

            <!-- Remote Control -->
            <section class="settings-card">
              <header class="settings-card-head">
                <span class="settings-card-icon">${icons.systemInfo}</span>
                <div class="settings-card-heading">
                  <div class="settings-card-title">Remote Control</div>
                  <div class="settings-card-sub">Phone / tablet soundboard and local automation — all on your LAN</div>
                </div>
              </header>
              <div class="settings-card-body">
                <label class="setting-toggle-row">
                  <div class="setting-toggle-info">
                    <span class="setting-toggle-title">Enable the control server</span>
                    <span class="setting-toggle-desc">Serves the mobile controller page and a PIN-protected WebSocket protocol from this computer. No cloud, no accounts.</span>
                  </div>
                  <span class="modern-switch">
                    <input type="checkbox" ${state.settings.remoteControlEnabled ? 'checked' : ''} onchange="updateSetting('remoteControlEnabled', this.checked); setTimeout(refreshRemoteInfo, 600);">
                    <span class="switch-track"><span class="switch-thumb"></span></span>
                  </span>
                </label>

                ${state.remoteInfo.running ? `
                  <div class="remote-pairing-box">
                    <div class="remote-pairing-row">
                      <span class="remote-pairing-label">Address</span>
                      <code class="remote-pairing-value">${remoteControllerUrl()}</code>
                      <button class="btn-subtle remote-copy-btn" onclick="handleCopyRemoteUrl()">Copy</button>
                    </div>
                    <div class="remote-pairing-row">
                      <span class="remote-pairing-label">Pairing PIN</span>
                      <code class="remote-pairing-value remote-pin">${state.remoteInfo.pin || '——————'}</code>
                      <button class="btn-subtle remote-copy-btn" onclick="handleRegeneratePin()">New PIN</button>
                    </div>
                    <div class="remote-qr-wrap">
                      <canvas id="remote-qr" width="132" height="132"></canvas>
                      <div class="remote-qr-hint">
                        Open the address on your phone, enter the PIN, and the full soundboard becomes a remote with a customizable button grid, live now-playing, voice presets and a 10-second voice recorder.
                      </div>
                    </div>
                  </div>
                ` : `
                  <div style="font-size: 12px; color: var(--color-muted); padding: 6px 2px;">
                    ${state.remoteInfo.enabled ? 'The server could not bind its port — try a different one.' : 'Turn the toggle on to pair a phone or tablet as a remote controller.'}
                  </div>
                `}

                <div class="settings-field">
                  <div class="settings-field-label">Port (restarts the server)</div>
                  <input class="modal-text-input" style="width: 140px;" type="number" min="1024" max="65535"
                         value="${state.settings.remotePort}"
                         onchange="const v = parseInt(this.value, 10); if (v >= 1024 && v <= 65535) updateSetting('remotePort', v);">
                </div>
              </div>
            </section>

            <!-- Master Audio Volumes -->
            <section class="settings-card">
              <header class="settings-card-head">
                <span class="settings-card-icon">${icons.volume}</span>
                <div class="settings-card-heading">
                  <div class="settings-card-title">Master Audio Volumes</div>
                  <div class="settings-card-sub">Global levels for what you and others hear</div>
                </div>
              </header>
              <div class="settings-card-body">
                <div class="settings-slider">
                  <div class="settings-slider-head">
                    <span class="settings-slider-label">${icons.headphones} Master Local Volume <em>you hear</em></span>
                    <span id="settings-vol-text-local" class="vol-val-badge">${state.settings.localVolume}%</span>
                  </div>
                  <input type="range" id="settings-vol-input-local" min="0" max="100" value="${state.settings.localVolume}"
                         onpointerdown="handleSliderDragStart(event)" onmousedown="handleSliderDragStart(event)"
                         oninput="handleMasterVolumeInput('local', this.value)">
                </div>
                <div class="settings-slider">
                  <div class="settings-slider-head">
                    <span class="settings-slider-label">${icons.mic} Master Remote Volume <em>others hear</em></span>
                    <span id="settings-vol-text-remote" class="vol-val-badge">${state.settings.remoteVolume}%</span>
                  </div>
                  <input type="range" id="settings-vol-input-remote" min="0" max="100" value="${state.settings.remoteVolume}"
                         onpointerdown="handleSliderDragStart(event)" onmousedown="handleSliderDragStart(event)"
                         oninput="handleMasterVolumeInput('remote', this.value)">
                </div>
                <label class="setting-toggle-row">
                  <div class="setting-toggle-info">
                    <span class="setting-toggle-title">Sync volume levels</span>
                    <span class="setting-toggle-desc">Bind the local and remote sliders together.</span>
                  </div>
                  <span class="modern-switch">
                    <input type="checkbox" ${state.settings.syncVolumes ? 'checked' : ''} onchange="updateSetting('syncVolumes', this.checked)">
                    <span class="switch-track"><span class="switch-thumb"></span></span>
                  </span>
                </label>
              </div>
            </section>

            <!-- Sound Boost -->
            <section class="settings-card">
              <header class="settings-card-head">
                <span class="settings-card-icon">${icons.bolt}</span>
                <div class="settings-card-heading">
                  <div class="settings-card-title">Sound Boost</div>
                  <div class="settings-card-sub">Global amplification for every soundboard</div>
                </div>
              </header>
              <div class="settings-card-body">
                <div class="settings-slider">
                  <div class="settings-slider-head">
                    <span class="settings-slider-label">${icons.boltSmall} Global Boost</span>
                    <span id="settings-boost-text" class="vol-val-badge ${state.settings.soundBoost > 100 ? 'boosted' : ''}">${state.settings.soundBoost}%</span>
                  </div>
                  <input type="range" id="settings-boost-input" min="100" max="400" step="5" value="${state.settings.soundBoost}"
                         onpointerdown="handleSliderDragStart(event)" onmousedown="handleSliderDragStart(event)"
                         oninput="handleGlobalBoostInput(this.value)">
                </div>
                <div class="settings-note ${state.settings.soundBoost > 100 ? 'warn' : ''}">
                  Amplify quiet clips above 100% output. Stacks with the per-soundboard boost in each category view — excessive boosting may introduce clipping distortion.
                </div>
                ${/* Always mounted so the in-place slider updater below can reveal it
                      without a full re-render (a re-render mid-drag would break the
                      slider drag lock). Visibility is class-driven. */ ''}
                <div class="boost-reset-row ${state.settings.soundBoost > 100 ? 'visible' : ''}">
                  <button class="vol-reset-btn" onclick="handleResetGlobalBoost()">Reset to 100%</button>
                </div>
              </div>
            </section>

            <!-- Audio Output Routing -->
            <section class="settings-card">
              <header class="settings-card-head">
                <span class="settings-card-icon">${icons.headphones}</span>
                <div class="settings-card-heading">
                  <div class="settings-card-title">Audio Output Routing</div>
                  <div class="settings-card-sub">Where soundboard audio is sent</div>
                </div>
              </header>
              <div class="settings-card-body">
                <label class="setting-toggle-row">
                  <div class="setting-toggle-info">
                    <span class="setting-toggle-title">Allow multi-device routing</span>
                    <span class="setting-toggle-desc">Stream to multiple output targets at the same time.</span>
                  </div>
                  <span class="modern-switch">
                    <input type="checkbox" ${state.settings.allowMultipleOutputs ? 'checked' : ''} onchange="updateSetting('allowMultipleOutputs', this.checked)">
                    <span class="switch-track"><span class="switch-thumb"></span></span>
                  </span>
                </label>
                <label class="setting-toggle-row">
                  <div class="setting-toggle-info">
                    <span class="setting-toggle-title">Use as default devices</span>
                    <span class="setting-toggle-desc">Inject audio outputs as system defaults.</span>
                  </div>
                  <span class="modern-switch">
                    <input type="checkbox" ${state.settings.useAsDefaultDevice ? 'checked' : ''} onchange="updateSetting('useAsDefaultDevice', this.checked)">
                    <span class="switch-track"><span class="switch-thumb"></span></span>
                  </span>
                </label>

                <div class="settings-field">
                  <div class="settings-field-label">Available Sound Destinations</div>
                  <div class="output-list">
                    ${state.outputDevices.length === 0 ? `
                      <div class="settings-note inset">No playback devices recognized</div>
                    ` : state.outputDevices.map(d => {
                      const isActive = state.settings.outputs.includes(d.name);
                      return `
                        <div class="output-item ${isActive ? 'active' : ''}" onclick="toggleOutputDevice('${d.name}')" title="${isActive ? 'Active destination — click to remove' : 'Click to route soundboard audio here'}">
                          <span class="output-item-check">${isActive ? icons.check : ''}</span>
                          <span class="output-item-name">${d.name}${d.isDefault ? ' <em>(Default)</em>' : ''}</span>
                        </div>
                      `;
                    }).join('')}
                  </div>
                </div>
              </div>
            </section>

            <!-- Target Window: exclusive audio routing into a single app -->
            <section class="settings-card">
              <header class="settings-card-head">
                <span class="settings-card-icon">${icons.target}</span>
                <div class="settings-card-heading">
                  <div class="settings-card-title">Target Window Routing</div>
                  <div class="settings-card-sub">Send soundboard audio into one application only</div>
                </div>
              </header>
              <div class="settings-card-body">
                <div class="settings-note">
                  When a target window is selected (e.g. Roblox), sounds are sent exclusively into that app — other programs such as Discord never receive soundboard audio. You always hear the sounds locally too.
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
                    <div class="settings-note">Tip: make sure the target app listens on the selected output (e.g. set Roblox' microphone to the VB-Cable) so it picks up the soundboard.</div>
                  ` : ''}
                ` : (state.openWindows.length === 0 && !state.isLoadingWindows ? `
                  <div class="settings-note">No open application windows detected${state.isLinux ? ' (Linux lists open windows as best-effort)' : ' — open the app you want to route into, then click Refresh'}.</div>
                ` : '')}
              </div>
            </section>

            <!-- OS Specific Tools panels -->
            ${renderOsSettingsPanel()}
          </div>
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
      <div class="help-hub">
        <!-- Hero banner -->
        <div class="help-hero">
          <div class="help-hero-icon">${icons.help}</div>
          <div class="help-hero-text">
            <div class="help-hero-title">Soundboard Documentation &amp; Help</div>
            <div class="help-hero-desc">
              Welcome to <strong>Audiopad</strong> — play audio tracks through your speakers and into virtual
              microphones at the same time, so Discord, TeamSpeak, Skype and games all hear your soundboard.
              Everything below walks you from your first folder to advanced routing.
            </div>
          </div>
          <div class="help-hero-actions">
            <button class="btn-primary" onclick="handleOpenUrl('https://audiopad.vercel.app/')">
              ${icons.openLink} Visit Website
            </button>
            <button class="btn-subtle" onclick="handleOpenUrl('https://github.com/audiopadapp/audiopad')">
              ${icons.link} Source Code Repository
            </button>
          </div>
        </div>

        <!-- Quick start steps -->
        <div class="help-section">
          <div class="help-section-title">${icons.rocket} Quick Start</div>
          <div class="help-steps">
            <div class="help-step">
              <div class="help-step-num">1</div>
              <div class="help-step-body">
                <div class="help-step-title">Add your sound folders</div>
                <div class="help-step-desc">
                  Use <strong>New Folder</strong> or <strong>Add Folder as Category</strong> in the left sidebar —
                  or simply drag folders in from your file explorer. MP3, WAV and FLAC files are detected
                  automatically, including nested subfolders.
                </div>
              </div>
            </div>
            <div class="help-step">
              <div class="help-step-num">2</div>
              <div class="help-step-body">
                <div class="help-step-title">Assign hotkeys</div>
                <div class="help-step-desc">
                  Click the <span class="help-key">+ Key</span> badge on any sound to record a shortcut.
                  Hotkeys fire from anywhere on your system — even while Audiopad sits in the background or tray.
                </div>
              </div>
            </div>
            <div class="help-step">
              <div class="help-step-num">3</div>
              <div class="help-step-body">
                <div class="help-step-title">Route your audio</div>
                <div class="help-step-desc">
                  Open <strong>Settings &amp; Audio</strong> and pick your destinations. On Windows, the VB-Cable
                  integration feeds the soundboard straight into your microphone channel; on Linux, choose a
                  PulseAudio sink or app passthrough.
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Feature guide -->
        <div class="help-section">
          <div class="help-section-title">${icons.bolt} Features at a Glance</div>
          <div class="help-features">
            <div class="help-feature">
              <div class="help-feature-icon">${icons.soundpad}</div>
              <div class="help-feature-title">Three Sound Views</div>
              <div class="help-feature-desc">Switch between the Soundpad high-density table, Stream Deck macro pads and the Media Grid from the toolbar at any time.</div>
            </div>
            <div class="help-feature">
              <div class="help-feature-icon">${icons.keyboard}</div>
              <div class="help-feature-title">Global Hotkeys</div>
              <div class="help-feature-desc">Every sound can carry its own key combination, plus dedicated Push-To-Talk and emergency Stop shortcuts in Settings.</div>
            </div>
            <div class="help-feature">
              <div class="help-feature-icon">${icons.star}</div>
              <div class="help-feature-title">Favorites</div>
              <div class="help-feature-desc">Star sounds in any folder — the Favorites view collects them across all categories for one-tap access.</div>
            </div>
            <div class="help-feature">
              <div class="help-feature-icon">${icons.search}</div>
              <div class="help-feature-title">Instant Search</div>
              <div class="help-feature-desc">Press <span class="help-key">Ctrl + F</span> to jump into search. Queries cover the whole folder tree of the active category.</div>
            </div>
            <div class="help-feature">
              <div class="help-feature-icon">${icons.headphones}</div>
              <div class="help-feature-title">Local &amp; Remote Volume</div>
              <div class="help-feature-desc"><strong>Local</strong> is what you hear, <strong>Remote</strong> is what everybody else hears — set them globally or override them per sound.</div>
            </div>
            <div class="help-feature">
              <div class="help-feature-icon">${icons.target}</div>
              <div class="help-feature-title">Target Window Routing</div>
              <div class="help-feature-desc">Route soundboard audio exclusively into one application (e.g. Roblox) so other programs never receive it.</div>
            </div>
            <div class="help-feature">
              <div class="help-feature-icon">${icons.importIcon}</div>
              <div class="help-feature-title">Drag &amp; Drop Import</div>
              <div class="help-feature-desc">Drop audio files or whole folders from the OS file explorer straight into any category — the structure is preserved.</div>
            </div>
            <div class="help-feature">
              <div class="help-feature-icon">${icons.bolt}</div>
              <div class="help-feature-title">Sound Boost</div>
              <div class="help-feature-desc">Amplify quiet clips up to 400% — a global boost in Settings plus a separate boost for every soundboard.</div>
            </div>
          </div>
        </div>

        <!-- Shortcuts -->
        <div class="help-section">
          <div class="help-section-title">${icons.keyboard} Shortcuts &amp; Controls</div>
          <div class="help-shortcut-list">
            <div class="help-shortcut-row">
              <span class="help-key">Esc</span>
              <span class="help-shortcut-label">Emergency stop — instantly silences every playing sound</span>
            </div>
            <div class="help-shortcut-row">
              <span class="help-key">Ctrl + F</span>
              <span class="help-shortcut-label">Focus the sound search field</span>
            </div>
            <div class="help-shortcut-row">
              <span class="help-key">Right-click</span>
              <span class="help-shortcut-label">Open a sound's context menu — play, assign images, adjust volumes</span>
            </div>
            <div class="help-shortcut-row">
              <span class="help-key">Ctrl + Click</span>
              <span class="help-shortcut-label">Select multiple sounds to assign images in bulk</span>
            </div>
            <div class="help-shortcut-row">
              <span class="help-key">Double-click</span>
              <span class="help-shortcut-label">Play a sound directly from the Soundpad table view</span>
            </div>
          </div>
        </div>

        <!-- Troubleshooting -->
        <div class="help-section">
          <div class="help-section-title">${icons.wrench} Troubleshooting</div>
          <div class="help-trouble-list">
            <div class="help-trouble-row">
              <div class="help-trouble-q">Other apps can't hear my soundboard</div>
              <div class="help-trouble-a">Open <strong>Settings &amp; Audio</strong> and check <strong>Audio Output Routing</strong>. On Windows, run <strong>Configure Routing</strong> under Windows Routing Tools so the VB-Cable driver is installed and selected — then pick it as the input device inside Discord or your game.</div>
            </div>
            <div class="help-trouble-row">
              <div class="help-trouble-q">My hotkeys stopped working</div>
              <div class="help-trouble-a">Make sure Audiopad is still running (check the tray icon), and that <strong>Restrict Hotkeys to Active Tab</strong> is not filtering the sound you are triggering — it disables hotkeys from outside the selected category.</div>
            </div>
            <div class="help-trouble-row">
              <div class="help-trouble-q">Sounds cut each other off</div>
              <div class="help-trouble-a">Enable <strong>Allow Overlapping Sounds</strong> in Settings &amp; Audio so multiple streams can play simultaneously without cutting off.</div>
            </div>
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
      <section class="settings-card">
        <header class="settings-card-head">
          <span class="settings-card-icon">${icons.mic}</span>
          <div class="settings-card-heading">
            <div class="settings-card-title">Windows Routing Tools</div>
            <div class="settings-card-sub">VB-Audio Cable driver and microphone passthrough</div>
          </div>
        </header>
        <div class="settings-card-body">
          ${!isInstalled ? `
            <div class="settings-alert warn">
              <div class="settings-alert-body">
                <div class="settings-alert-title">VB-Audio Cable Not Detected</div>
                <div class="settings-alert-desc">Install the driver to route soundboard audio into your microphone.</div>
              </div>
              <button class="btn-primary" style="padding: 5px 10px; font-size: 11px;" onclick="window.openUrl && window.openUrl('https://vb-audio.com/Cable/')">
                Download Cable
              </button>
            </div>
          ` : ''}

          <div class="settings-inline-row">
            <div class="setting-toggle-info">
              <div class="settings-inline-title">
                <span>VB-Audio Cable Integration</span>
                <span class="status-pill ${isSetup ? 'active' : (isInstalled ? 'warning' : 'admin')}">
                  ${isSetup ? '● Active' : (isInstalled ? '○ Not Configured' : '○ Missing Driver')}
                </span>
              </div>
              <span class="setting-toggle-desc">
                ${isSetup && selectedName
                  ? `Routing <strong>${selectedName}</strong> audio stream to VB-Cable.`
                  : (isInstalled ? `Routes microphone audio to the virtual cable output.` : `Requires the free VB-Audio Virtual Cable driver.`)}
              </span>
            </div>
            <button class="btn-subtle" onclick="handleVBCableSetup()">
              ${isSetup ? 'Reconfigure' : (isInstalled ? 'Configure Routing' : 'Get Driver')}
            </button>
          </div>

          <div class="settings-field">
            <div class="settings-field-label">Override microphone device</div>
            <select id="mic-override-select" class="sort-select" style="width: 100%; height: 32px;" onchange="handleMicOverrideChange(this.value)">
              <option value="" ${!isSetup || !state.selectedMic ? 'selected' : ''}>No Override</option>
              ${state.recordingDevices.map(d => {
                const isSelected = isSetup && state.selectedMic && (state.selectedMic.guid === d.guid || state.selectedMic.name === d.name);
                return `<option value="${d.guid}" ${isSelected ? 'selected' : ''}>${d.name}</option>`;
              }).join('')}
            </select>
          </div>

          ${isElevated ? `
            <div class="settings-alert ok">
              <div class="settings-alert-body">
                <div class="settings-alert-title">Administrator Privileges</div>
                <div class="settings-alert-desc">Direct audio endpoint permissions active</div>
              </div>
              <button class="btn-subtle" onclick="handleOpenSoundControlPanel()">
                Sound Control Panel
              </button>
            </div>
          ` : `
            <div class="settings-field">
              <button class="btn-primary" style="width: 100%; padding: 8px 12px;" onclick="handleRestartAsAdmin()">
                🛡️ Elevate Privileges (UAC)
              </button>
              <button class="btn-subtle" style="width: 100%; justify-content: center;" onclick="handleOpenSoundControlPanel()">
                Open Sound Control Panel (Manual Fallback)
              </button>
            </div>
          `}
        </div>
      </section>
    `;
  } else {
    // Linux PulseAudio passthrough settings
    return `
      <section class="settings-card">
        <header class="settings-card-head">
          <span class="settings-card-icon">${icons.mic}</span>
          <div class="settings-card-heading">
            <div class="settings-card-title">Linux PulseAudio Sinks</div>
            <div class="settings-card-sub">Passthrough and module management</div>
          </div>
        </header>
        <div class="settings-card-body">
          <div class="settings-inline-row">
            <div class="setting-toggle-info">
              <span class="setting-toggle-title">PulseAudio Switch-On-Connect</span>
              <span class="setting-toggle-desc">Configure the PA module connection state.</span>
            </div>
            <button class="btn-subtle" onclick="handleUnloadSwitchOnConnect()">
              Reset Modules
            </button>
          </div>

          <div class="settings-field">
            <div class="settings-field-label">Running Applications Passthrough</div>
            <div class="output-list">
              ${state.playbackApps.length === 0 ? `
                <div class="settings-note inset">No running playback apps recognized</div>
              ` : state.playbackApps.map(app => {
                const isPassthroughActive = !!app.passthroughActive;
                return `
                  <div class="output-item ${isPassthroughActive ? 'active' : ''}" onclick="handleLinuxPassthrough('${app.name}', ${isPassthroughActive})">
                    <span class="output-item-check">${isPassthroughActive ? icons.check : ''}</span>
                    <span class="output-item-name">${app.name} <em>${isPassthroughActive ? '· Routing' : '· No routing'}</em></span>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </div>
      </section>
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

//* Status label for the dock's track-info slot. With several sounds playing
//* the slot shows the CONTROLLED chip, so the label says so — the in-place
//* updaters reuse this so their 200ms ticks never clobber the multi-sound
//* wording back to the single-sound one.
function dockTransportStatusLabel(isPaused) {
  const playingCount = Object.keys(state.playingSounds).filter(k => state.playingSounds[k]).length;
  if (playingCount > 1) return 'Controlling this chip';
  return isPaused ? 'Paused' : 'Playing stream';
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
    const label = dockTransportStatusLabel(isPaused);
    pathEl.textContent = `${label} • ${formatMs(current)} / ${formatMs(length)}`;
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
  const { soundKey, details, playId } = active;

  const willPause = !details.paused;
  const actionSeq = transportActionSeq + 1;
  details.paused = willPause;
  recordTransportIntent(soundKey, willPause);
  updateDockControlsInPlace();
  setDockChipPaused(soundKey, willPause);

  try {
    if (willPause) {
      if (window.pauseSound) {
        applyAuthoritativeTransportState(await window.pauseSound(playId), soundKey, actionSeq);
      }
    } else {
      if (window.resumeSound) {
        applyAuthoritativeTransportState(await window.resumeSound(playId), soundKey, actionSeq);
      }
    }
  } catch (e) {
    console.warn("toggle play/pause failed:", e);
    revertTransportStateIfCurrent(soundKey, actionSeq, willPause);
  }
}

//* Applies the PlayingSound the backend resolved the pause/resume call with.
//* This is the authoritative answer to the click — in the native shell it is
//* also the ONLY confirmation a paused voice ever sends, because the progress
//* publisher stops posting once the position freezes (it only publishes while
//* the position advances). Without applying it, one click could be silently
//* reverted by a stale in-flight update with no event left to correct it —
//* the "pause only works after several clicks" bug.
function applyAuthoritativeTransportState(resolved, soundKey, actionSeq) {
  if (resolved && resolved.sound) {
    //* A newer transport click for the same sound superseded this answer —
    //* let that click's own resolution settle the state instead.
    const intent = state.transportIntent;
    if (intent && intent.key === String(soundKey) && intent.seq > actionSeq) return;

    //* NOTE: the intent is deliberately NOT dropped here. The promise answer
    //* and the progress events travel through different dispatch paths
    //* (webview RPC resolution vs. publisher events posted from the audio
    //* thread), so a pre-pause event can still be executed AFTER this
    //* resolution lands. The intent keeps pinning `paused` until it expires,
    //* which is what makes one-click pause reliable regardless of ordering.
    const targetKey = (resolved.sound.id !== undefined) ? resolved.sound.id : soundKey;
    if (Object.prototype.hasOwnProperty.call(state.playingSounds, targetKey)) {
      state.playingSounds[targetKey] = resolved;
      setDockChipPaused(targetKey, resolved.paused);
      updatePlaybackDockInPlace(resolved);
    }
    return;
  }

  if (resolved === null) {
    //* Explicit backend failure (the native shell resolves a failed
    //* pause/resume with null — e.g. the sound finished mid-click). Undo the
    //* optimistic flip so the button never claims a state the audio layer
    //* never reached. `undefined` (demo preview bindings) is not a failure:
    //* there the update events confirm the optimistic state instead.
    revertTransportStateIfCurrent(soundKey, actionSeq, null);
  }
  //* Any other falsy value (undefined): keep the optimistic state and wait
  //* for the regular update events to confirm it.
}

//* Restores the pre-click paused flag — used when the backend explicitly
//* failed the action. Skipped when a newer click already took over (checked
//* through the intent's sequence tag) so a failed older request can never
//* stomp the state a newer user action just set.
function revertTransportStateIfCurrent(soundKey, actionSeq, willPause) {
  const intent = state.transportIntent;
  if (intent && intent.key === String(soundKey) && intent.seq > actionSeq) return;

  if (state.transportIntent && state.transportIntent.seq === actionSeq) {
    state.transportIntent = null;
  }
  const details = state.playingSounds[soundKey];
  if (!details) return;
  details.paused = (willPause === null) ? !details.paused : !willPause;
  updateDockControlsInPlace();
  setDockChipPaused(soundKey, details.paused);
}

//* Instantly mirrors a pause/resume flip onto the sound's "Now Playing" chip
//* (dimmed state + tooltip) without a full re-render.
function setDockChipPaused(soundKey, paused) {
  const chipEl = document.getElementById(`dock-chip-${soundKey}`);
  if (!chipEl) return;
  chipEl.classList.toggle('paused', !!paused);
  const ps = state.playingSounds[soundKey];
  const name = (ps && ps.sound && ps.sound.name) ? `: ${ps.sound.name}` : '';
  chipEl.title = `${paused ? 'Paused' : 'Playing'} — click to control this sound${name}`;
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
  clearTransportIntent(soundId);

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
    pathEl.textContent = `${dockTransportStatusLabel(isPaused)} • ${formatMs(current)} / ${formatMs(length)}`;
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

//* Mouse-wheel scrolling for the "Now Playing" strip. The chips list runs
//* horizontally, but a plain wheel gesture only produces vertical deltas —
//* over the strip they did nothing at all (the list never scrolls vertically
//* and the page below the dock has nothing to scroll). Translating the wheel
//* into horizontal chip scrolling lets one roll walk through every playing
//* sound, exactly like the request describes. Delegated from the persistent
//* document node (the dock is re-rendered by innerHTML constantly), and
//* registered non-passive so the default vertical scroll can be cancelled.
function handleDockChipsWheel(event) {
  const target = event.target;
  if (!target || !target.closest) return;
  const strip = target.closest('.dock-multitrack-strip');
  if (!strip) return;

  const row = strip.querySelector('.dock-chips-row');
  if (!row) return;

  const maxScrollLeft = row.scrollWidth - row.clientWidth;
  if (maxScrollLeft <= 1) return; // every chip already fits — nothing to scroll

  // Prefer the vertical wheel (up/down rolls), fall back to true horizontal
  // deltas from trackpads and tilt wheels.
  let delta = (Math.abs(event.deltaY) >= Math.abs(event.deltaX)) ? event.deltaY : event.deltaX;
  if (!delta) return;

  // Normalize line/page based deltas (older mice / some Linux toolkits) so
  // every input device scrolls the list by a comparable distance.
  if (event.deltaMode === 1) {
    delta *= 16;
  } else if (event.deltaMode === 2) {
    delta *= row.clientWidth;
  }

  const next = Math.max(0, Math.min(row.scrollLeft + delta, maxScrollLeft));
  event.preventDefault();
  row.scrollLeft = next;
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

  //* Multi-sound layout: every simultaneously playing sound gets its own chip
  //* inside a dedicated full-width strip rendered ABOVE the transport row.
  //* The chips live in their own horizontal list, so they never crowd or
  //* overlap the playback timeline — the transport bar keeps its full width.
  const chipsStripHtml = multiMode ? `
      <div class="dock-multitrack-strip">
        <div class="dock-multitrack-head">
          <span class="dock-playing-count" title="${playingList.length} sounds playing simultaneously">
            <span class="eq-bars compact"><span class="eq-bar"></span><span class="eq-bar"></span><span class="eq-bar"></span></span>
            Now Playing (${playingList.length})
          </span>
          <span class="dock-multitrack-hint">click a chip to control it — the bar below drives the highlighted chip</span>
        </div>
        <div class="dock-chips-row">
          ${playingList.map(entry => renderDockSoundChip(entry, String(entry.key) === String(active ? active.soundKey : null))).join('')}
        </div>
      </div>
    ` : '';

  //* Track info slot: single mode shows the one playing sound; multi mode
  //* shows the CONTROLLED sound (the highlighted chip) in the same compact
  //* slot, so the transport bar always carries a clear readout of what the
  //* timeline and the buttons act on.
  const trackInfoHtml = `
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
          ${isPlaying && details && details.sound ? `${multiMode ? 'Controlling this chip' : (isPaused ? 'Paused' : 'Playing stream')} • ${formatMs(current)} / ${formatMs(length)}` : 'Press hotkey or trigger sound pad'}
        </span>
      </div>
    `;

  return `
    <footer id="playback-dock" class="${multiMode ? 'multi' : ''}">
      ${chipsStripHtml}
      <div class="dock-track-info">
        ${trackInfoHtml}
      </div>
      
      <div class="dock-center-transport">
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

// --- First-Run Onboarding Tour ---------------------------------------------
// A one-time interactive spotlight tour guiding new users through the
// interface. The tour overlay lives directly on <body> (outside renderApp's
// innerHTML re-renders) so the spotlight and card animate smoothly while the
// app keeps re-rendering underneath. The outcome — 'completed' or 'skipped' —
// is persisted in localStorage: once the tour has been finished OR skipped it
// never appears again on that machine.
const ONBOARDING_STORAGE_KEY = 'audiopad_onboarding_tour';

const ONBOARDING_STEPS = [
  {
    icon: icons.logo,
    title: 'Welcome to Audiopad',
    text: 'A quick, interactive tour of your soundboard — where categories live, how to import sounds, and how playback works. It only shows this one time.',
    cta: 'Start Tour'
  },
  {
    target: '.custom-sidebar',
    icon: icons.folder,
    title: 'Categories & Folders',
    text: 'Every soundboard folder is a category in the left rail. Click one to browse its sounds, drag rows to reorder them, and double-click a section header to rename the section.'
  },
  {
    target: '.custom-sidebar',
    icon: icons.wrench,
    title: 'Right-click for quick actions',
    text: 'Right-click any folder to open it in your file explorer, import single sounds or whole folders, edit its name, or delete it — all in one place.'
  },
  {
    target: '.sidebar-add-buttons',
    icon: icons.plus,
    title: 'Build your library',
    text: 'Create brand-new empty folders, add existing folders from your disk as categories, or group folders into custom sections.'
  },
  {
    target: '.header-actions',
    icon: icons.search,
    title: 'Find & switch views',
    text: 'Search across the whole category (Ctrl+F) and switch between Stream Deck pads, the high-density table, or the media grid — whatever fits your style.'
  },
  {
    target: '.workspace-body',
    icon: icons.music,
    title: 'Play, hotkey, favorite',
    text: 'Click a sound to play it instantly. Hover a row for per-sound volume, right-click it for images, favorites and hotkeys — global hotkeys fire even when Audiopad is in the background.'
  },
  {
    target: '#playback-dock',
    icon: icons.repeat,
    title: 'The transport dock',
    text: 'Playback controls sit above the timeline: loop, pause or stop the active sound, and scrub the timeline below to jump anywhere in the track.'
  },
  {
    target: '.dock-volume',
    icon: icons.headphones,
    title: 'Local vs Remote volume',
    text: 'One slider, two audiences. Local changes what you hear; Remote changes what everybody else hears through your mic. Click the toggle to switch between them.'
  },
  {
    target: '.panic-stop-btn',
    icon: icons.bolt,
    title: 'The panic button',
    text: 'Everything playing at once? Hit this button — or press ESC anywhere — to instantly stop all playback.'
  },
  {
    icon: icons.rocket,
    title: "You're all set!",
    text: 'That was the whole tour. Check Settings & Audio for output devices, themes and push-to-talk — and enjoy the noise.',
    cta: 'Finish'
  }
];

let onboardingResizeObserver = null;

//* Reads the persisted tour outcome. `pending` stays true only when nothing
//* has been stored yet (true first launch).
function loadOnboardingState() {
  let outcome = null;
  try {
    const raw = localStorage.getItem(ONBOARDING_STORAGE_KEY);
    outcome = (raw === 'completed' || raw === 'skipped') ? raw : null;
  } catch (e) {
    outcome = null; // localStorage unavailable — show the tour, best effort
  }
  state.onboarding.pending = outcome === null;
}

function persistOnboardingOutcome(outcome) {
  try {
    localStorage.setItem(ONBOARDING_STORAGE_KEY, outcome);
  } catch (e) {
    console.warn('Failed to persist onboarding outcome:', e);
  }
}

//* Called at the end of every renderApp pass: once the real workspace is on
//* screen (not the VB-Cable setup page) and no outcome has been recorded, the
//* tour overlay is created exactly once.
function maybeStartOnboarding() {
  if (!state.onboarding.pending || state.onboarding.active) return;
  if (!document.querySelector('.custom-layout')) return;

  state.onboarding.pending = false;
  state.onboarding.active = true;
  state.onboarding.step = 0;

  buildOnboardingOverlay();

  //* Layout shifts underneath (e.g. sidebar resizing) must keep the spotlight
  //* glued to its target — observe the app root while the tour is running.
  if (typeof ResizeObserver !== 'undefined') {
    onboardingResizeObserver = new ResizeObserver(() => positionOnboarding());
    const appRoot = document.getElementById('custom-app');
    if (appRoot) onboardingResizeObserver.observe(appRoot);
  }
}

function buildOnboardingOverlay() {
  destroyOnboardingOverlay();
  const overlay = document.createElement('div');
  overlay.id = 'onboarding-overlay';
  overlay.className = 'onboarding-overlay';
  // Spotlight + card shell are created once and survive step changes, so the
  // spotlight glide transition animates between steps.
  overlay.innerHTML = `
    <div class="onboarding-spotlight" id="onboarding-spotlight"></div>
    <div class="onboarding-card" id="onboarding-card" role="dialog" aria-modal="true"></div>
  `;
  document.body.appendChild(overlay);
  updateOnboardingOverlay();
}

function destroyOnboardingOverlay() {
  const existing = document.getElementById('onboarding-overlay');
  if (existing) existing.remove();
}

function onboardingStepDef() {
  return ONBOARDING_STEPS[state.onboarding.step] || ONBOARDING_STEPS[0];
}

//* Rebuilds the tour card content for the current step and repositions the
//* spotlight around the step's target element.
function updateOnboardingOverlay() {
  if (!state.onboarding.active) return;
  const card = document.getElementById('onboarding-card');
  if (!card) return;

  const stepIndex = state.onboarding.step;
  const def = onboardingStepDef();
  const isLast = stepIndex >= ONBOARDING_STEPS.length - 1;
  const nextLabel = def.cta || (isLast ? 'Finish' : 'Next');

  card.setAttribute('aria-label', def.title);
  card.innerHTML = `
    <div class="onboarding-card-inner">
      <div class="onboarding-card-top">
        <span class="onboarding-icon-chip" aria-hidden="true">${def.icon}</span>
        <span class="onboarding-step-count">${stepIndex + 1} / ${ONBOARDING_STEPS.length}</span>
      </div>
      <h3 class="onboarding-title">${def.title}</h3>
      <p class="onboarding-text">${def.text}</p>
      <div class="onboarding-progress" aria-hidden="true">
        ${ONBOARDING_STEPS.map((s, i) => `<span class="onboarding-dot ${i === stepIndex ? 'active' : (i < stepIndex ? 'done' : '')}"></span>`).join('')}
      </div>
      <div class="onboarding-actions">
        <button type="button" class="onboarding-btn ghost" onclick="skipOnboarding()">Skip tour</button>
        <div class="onboarding-actions-right">
          ${stepIndex > 0 ? `<button type="button" class="onboarding-btn ghost" onclick="advanceOnboarding(-1)">Back</button>` : ''}
          <button type="button" class="onboarding-btn primary" onclick="${isLast ? 'finishOnboarding()' : 'advanceOnboarding(1)'}">${nextLabel}</button>
        </div>
      </div>
      <div class="onboarding-kbd-hint"><kbd>←</kbd> back&nbsp;&nbsp;<kbd>→</kbd> next&nbsp;&nbsp;<kbd>Esc</kbd> skip</div>
    </div>
  `;

  positionOnboarding();
}

//* Measures the step's target and positions the spotlight hole plus the guide
//* card around it. Steps without a reachable target (welcome / finish, or a
//* hidden control) fall back to a centered card over a fully dimmed backdrop.
function positionOnboarding() {
  if (!state.onboarding.active) return;
  const overlay = document.getElementById('onboarding-overlay');
  const spotlight = document.getElementById('onboarding-spotlight');
  const card = document.getElementById('onboarding-card');
  if (!overlay || !spotlight || !card) return;

  const def = onboardingStepDef();
  const target = def.target ? document.querySelector(def.target) : null;

  if (target) {
    overlay.classList.add('has-spotlight');
    overlay.classList.remove('no-spotlight');
    const rect = target.getBoundingClientRect();
    const pad = 8;
    spotlight.style.display = 'block';
    spotlight.style.top = `${Math.round(rect.top - pad)}px`;
    spotlight.style.left = `${Math.round(rect.left - pad)}px`;
    spotlight.style.width = `${Math.round(rect.width + pad * 2)}px`;
    spotlight.style.height = `${Math.round(rect.height + pad * 2)}px`;
    positionOnboardingCard(card, rect);
  } else {
    overlay.classList.add('no-spotlight');
    overlay.classList.remove('has-spotlight');
    spotlight.style.display = 'none';
    card.style.left = '50%';
    card.style.top = '50%';
    card.style.transform = 'translate(-50%, -50%)';
  }
}

//* Places the card below the spotlight target when there is room, above it
//* otherwise — and when the target spans the full height (e.g. the sidebar),
//* beside it instead, so the highlighted element is never covered.
function positionOnboardingCard(card, targetRect) {
  card.style.transform = 'none';
  const cardWidth = card.offsetWidth || 380;
  const cardHeight = card.offsetHeight || 260;
  const margin = 14;

  let left = targetRect.left + targetRect.width / 2 - cardWidth / 2;
  left = Math.max(margin, Math.min(left, window.innerWidth - cardWidth - margin));

  let top;
  const spaceBelow = window.innerHeight - targetRect.bottom;
  if (spaceBelow >= cardHeight + margin) {
    top = targetRect.bottom + margin;
  } else if (targetRect.top >= cardHeight + margin) {
    top = targetRect.top - cardHeight - margin;
  } else {
    //* Full-height target: dock the card to its side (right preferred) so the
    //* spotlight stays fully visible, vertically centered on the target.
    const spaceRight = window.innerWidth - targetRect.right;
    if (spaceRight >= cardWidth + margin) {
      left = targetRect.right + margin;
    } else if (targetRect.left >= cardWidth + margin) {
      left = targetRect.left - cardWidth - margin;
    }
    top = Math.max(margin, Math.min(
      targetRect.top + targetRect.height / 2 - cardHeight / 2,
      window.innerHeight - cardHeight - margin));
  }

  card.style.left = `${Math.round(left)}px`;
  card.style.top = `${Math.round(top)}px`;
}

//* Next / Back navigation. Steps whose target is not currently rendered are
//* skipped in the travel direction; the first and last steps never have a
//* target, so the loop always terminates on them.
function advanceOnboarding(direction) {
  if (!state.onboarding.active) return;
  const dir = direction >= 0 ? 1 : -1;

  let step = state.onboarding.step + dir;
  while (step > 0 && step < ONBOARDING_STEPS.length - 1) {
    const def = ONBOARDING_STEPS[step];
    if (!def.target || document.querySelector(def.target)) break;
    step += dir;
  }

  state.onboarding.step = Math.max(0, Math.min(step, ONBOARDING_STEPS.length - 1));
  updateOnboardingOverlay();
}

function finishOnboarding() {
  persistOnboardingOutcome('completed');
  endOnboarding();
}

function skipOnboarding() {
  persistOnboardingOutcome('skipped');
  endOnboarding();
}

function endOnboarding() {
  state.onboarding.active = false;
  if (onboardingResizeObserver) {
    onboardingResizeObserver.disconnect();
    onboardingResizeObserver = null;
  }
  destroyOnboardingOverlay();
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
    } else if (state.recordingTarget === 'micmute') {
      headingText = "Record Microphone Mute Shortcut";
      descText = "Press the key combination that toggles your microphone mute.";
    } else if (state.recordingTarget === 'hearmyself') {
      headingText = "Record Hear-Myself Shortcut";
      descText = "Press the key combination that toggles local microphone monitoring.";
    } else if (state.recordingTarget === 'overlay') {
      headingText = "Record Overlay Shortcut";
      descText = "Press the key combination that shows or hides the now-playing overlay.";
    } else if (state.recordingTarget === 'overlaypos') {
      headingText = "Record Overlay Position Shortcut";
      descText = "Press the key combination that cycles the overlay position.";
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
  return renderV2Modals();
}

//* --- V2 feature modals: rename, tags, policies, move, recorder, trim -------
function renderV2Modals() {
  let html = '';

  //* Rename sound
  if (state.renameSoundModal && state.renameSoundModal.visible) {
    const modal = state.renameSoundModal;
    html += `
      <div class="modal-overlay" onclick="handleCloseRenameSoundModal()">
        <div class="modal-card" style="max-width: 420px; width: 100%;" onclick="event.stopPropagation()">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
            <h3 style="margin: 0; font-size: 16px; font-weight: 700; color: var(--color-primary);">Rename Sound</h3>
            <button class="action-btn" onclick="handleCloseRenameSoundModal()">${icons.close}</button>
          </div>
          <p style="font-size: 12px; color: var(--color-muted); margin: 0 0 12px 0;">
            Changes the display name only — the audio file on disk keeps its original name.
          </p>
          <input class="modal-text-input" style="width: 100%;" value="${escapeHtml(modal.name)}"
                 oninput="handleRenameSoundInput(this.value)"
                 onkeydown="handleRenameSoundKeydown(event)"
                 placeholder="Display name" autofocus>
          <div class="modal-actions" style="margin-top: 16px;">
            <button class="modal-btn cancel-btn" onclick="handleCloseRenameSoundModal()">Cancel</button>
            <button class="modal-btn save-btn" onclick="handleSaveRenameSound()">Save Name</button>
          </div>
        </div>
      </div>
    `;
  }

  //* Tags
  if (state.tagsModal && state.tagsModal.visible) {
    const modal = state.tagsModal;
    html += `
      <div class="modal-overlay" onclick="handleCloseTagsModal()">
        <div class="modal-card" style="max-width: 460px; width: 100%;" onclick="event.stopPropagation()">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
            <h3 style="margin: 0; font-size: 16px; font-weight: 700; color: var(--color-primary);">Edit Tags</h3>
            <button class="action-btn" onclick="handleCloseTagsModal()">${icons.close}</button>
          </div>
          <p style="font-size: 12px; color: var(--color-muted); margin: 0 0 12px 0;">
            Comma-separated tags, e.g. <em>funny, memes, loud</em>. Tags are searched alongside names.
          </p>
          <input class="modal-text-input" style="width: 100%;" value="${escapeHtml(modal.value)}"
                 oninput="handleTagsInput(this.value)"
                 onkeydown="handleTagsKeydown(event)"
                 placeholder="tag1, tag2, tag3" autofocus>
          <div class="modal-actions" style="margin-top: 16px;">
            <button class="modal-btn cancel-btn" onclick="handleCloseTagsModal()">Cancel</button>
            <button class="modal-btn save-btn" onclick="handleSaveTags()">Save Tags</button>
          </div>
        </div>
      </div>
    `;
  }

  //* Playback policies / voice slot
  if (state.policiesModal && state.policiesModal.visible) {
    const modal = state.policiesModal;
    html += `
      <div class="modal-overlay" onclick="handleClosePoliciesModal()">
        <div class="modal-card" style="max-width: 520px; width: 100%;" onclick="event.stopPropagation()">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
            <h3 style="margin: 0; font-size: 16px; font-weight: 700; color: var(--color-primary);">
              ${modal.isVoiceSlot ? 'Voice Slot' : 'Playback Policies'}
            </h3>
            <button class="action-btn" onclick="handleClosePoliciesModal()">${icons.close}</button>
          </div>

          <label class="setting-toggle-row" style="border: 0; padding: 0; margin-bottom: 12px;">
            <div class="setting-toggle-info">
              <span class="setting-toggle-title">Live voice slot</span>
              <span class="setting-toggle-desc">Triggering selects a live voice filter instead of playing a file.</span>
            </div>
            <span class="modern-switch">
              <input type="checkbox" ${modal.isVoiceSlot ? 'checked' : ''} onchange="handlePolicyChange('isVoiceSlot', this.checked)">
              <span class="switch-track"><span class="switch-thumb"></span></span>
            </span>
          </label>

          ${modal.isVoiceSlot ? `
            <div class="settings-field">
              <div class="settings-field-label">Voice preset</div>
              <div class="segmented-control" style="flex-wrap: wrap;">
                ${VOICE_PRESETS.slice(1).map(preset => `
                  <button type="button" class="segment ${modal.voicePreset === preset.value ? 'active' : ''}"
                          onclick="handlePolicyChange('voicePreset', '${preset.value}')">${preset.label}</button>
                `).join('')}
              </div>
              <p style="font-size: 11px; color: var(--color-muted); margin: 8px 0 0 0;">
                Original, local DSP presets — the processed microphone is routed to your outputs (and to your own ears with "Hear myself").
              </p>
            </div>
          ` : `
            <div class="settings-field">
              <div class="settings-field-label">Trigger behaviour</div>
              ${TRIGGER_MODES.map(mode => `
                <button type="button" class="policy-option ${modal.triggerMode === mode.value ? 'active' : ''}"
                        onclick="handlePolicyChange('triggerMode', ${mode.value})" style="width: 100%; text-align: left; margin-bottom: 6px;">
                  <strong>${mode.label}</strong>
                  <span style="display: block; font-size: 11px; color: var(--color-muted); font-weight: 400;">${mode.desc}</span>
                </button>
              `).join('')}
            </div>

            <label class="setting-toggle-row">
              <div class="setting-toggle-info">
                <span class="setting-toggle-title">Loop by default</span>
                <span class="setting-toggle-desc">Start with repeat enabled every time this sound triggers.</span>
              </div>
              <span class="modern-switch">
                <input type="checkbox" ${modal.loopByDefault ? 'checked' : ''} onchange="handlePolicyChange('loopByDefault', this.checked)">
                <span class="switch-track"><span class="switch-thumb"></span></span>
              </span>
            </label>
            <label class="setting-toggle-row">
              <div class="setting-toggle-info">
                <span class="setting-toggle-title">Stop other sounds</span>
                <span class="setting-toggle-desc">Starting this sound stops every other clip.</span>
              </div>
              <span class="modern-switch">
                <input type="checkbox" ${modal.stopOthers ? 'checked' : ''} onchange="handlePolicyChange('stopOthers', this.checked)">
                <span class="switch-track"><span class="switch-thumb"></span></span>
              </span>
            </label>
            <label class="setting-toggle-row">
              <div class="setting-toggle-info">
                <span class="setting-toggle-title">Mute other sounds</span>
                <span class="setting-toggle-desc">Temporarily silence other clips while this one plays; their volumes return when it ends.</span>
              </div>
              <span class="modern-switch">
                <input type="checkbox" ${modal.muteOthers ? 'checked' : ''} onchange="handlePolicyChange('muteOthers', this.checked)">
                <span class="switch-track"><span class="switch-thumb"></span></span>
              </span>
            </label>

            <div class="settings-field" style="margin-top: 10px;">
              <div class="settings-field-label">Mute microphone while this plays</div>
              <div class="segmented-control">
                <button type="button" class="segment ${modal.muteVoice === null ? 'active' : ''}" onclick="handlePolicyChange('muteVoice', null)">Inherit global</button>
                <button type="button" class="segment ${modal.muteVoice === true ? 'active' : ''}" onclick="handlePolicyChange('muteVoice', true)">Always mute</button>
                <button type="button" class="segment ${modal.muteVoice === false ? 'active' : ''}" onclick="handlePolicyChange('muteVoice', false)">Never mute</button>
              </div>
            </div>
          `}

          <div class="modal-actions" style="margin-top: 16px;">
            <button class="modal-btn cancel-btn" onclick="handleClosePoliciesModal()">Cancel</button>
            <button class="modal-btn save-btn" onclick="handleSavePolicies()">Save</button>
          </div>
        </div>
      </div>
    `;
  }

  //* Move to board
  if (state.moveModal && state.moveModal.visible) {
    const modal = state.moveModal;
    html += `
      <div class="modal-overlay" onclick="handleCloseMoveModal()">
        <div class="modal-card" style="max-width: 480px; width: 100%;" onclick="event.stopPropagation()">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
            <h3 style="margin: 0; font-size: 16px; font-weight: 700; color: var(--color-primary);">
              Move ${modal.soundIds.length} sound${modal.soundIds.length === 1 ? '' : 's'} to…
            </h3>
            <button class="action-btn" onclick="handleCloseMoveModal()">${icons.close}</button>
          </div>
          <p style="font-size: 12px; color: var(--color-muted); margin: 0 0 12px 0;">
            Files are moved on disk; hotkeys, favorites, images, tags and policies are preserved.
          </p>
          <div class="move-target-list">
            ${state.tabs.map(tab => `
              <button type="button" class="move-target-item ${modal.targetTabId === tab.id && modal.targetFolderId === 0 ? 'active' : ''}"
                      onclick="handleMoveSelectTab(${tab.id}, 0)">
                ${tab.icon ? `<img src="${tab.icon}" alt="" class="move-target-icon">` : `<span class="move-target-icon">${icons.folder}</span>`}
                <span>${escapeHtml(tab.name)}</span>
                <span style="margin-left: auto; font-size: 10.5px; color: var(--color-muted);">${tab.sounds.length + countTabSounds(tab) - tab.sounds.length} sounds</span>
              </button>
              ${(tab.folders || []).slice(0, 12).map(folder => `
                <button type="button" class="move-target-item indent ${modal.targetTabId === tab.id && modal.targetFolderId === folder.id ? 'active' : ''}"
                        onclick="handleMoveSelectTab(${tab.id}, ${folder.id})">
                  <span class="move-target-icon">${icons.folder}</span>
                  <span>${escapeHtml(folder.name)}</span>
                  <span style="margin-left: auto; font-size: 10.5px; color: var(--color-muted);">in ${escapeHtml(tab.name)}</span>
                </button>
              `).join('')}
            `).join('')}
          </div>
          <div class="modal-actions" style="margin-top: 16px;">
            <button class="modal-btn cancel-btn" onclick="handleCloseMoveModal()" ${modal.moving ? 'disabled' : ''}>Cancel</button>
            <button class="modal-btn save-btn" onclick="handleConfirmMove()" ${modal.moving ? 'disabled' : ''}>
              ${modal.moving ? 'Moving…' : 'Move here'}
            </button>
          </div>
        </div>
      </div>
    `;
  }

  //* Recorder
  if (state.recorderModal && state.recorderModal.visible) {
    const modal = state.recorderModal;
    const elapsed = (modal.elapsedMs / 1000).toFixed(1);
    html += `
      <div class="modal-overlay" onclick="handleCloseRecorderModal()">
        <div class="modal-card" style="max-width: 520px; width: 100%;" onclick="event.stopPropagation()">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
            <h3 style="margin: 0; font-size: 16px; font-weight: 700; color: var(--color-primary);">Recorder</h3>
            <button class="action-btn" onclick="handleCloseRecorderModal()">${icons.close}</button>
          </div>

          <div class="settings-field">
            <div class="settings-field-label">Source</div>
            <div class="segmented-control">
              <button type="button" class="segment ${modal.source === 0 ? 'active' : ''}" onclick="handleRecorderSource(0)">Microphone</button>
              <button type="button" class="segment ${modal.source === 1 ? 'active' : ''}" onclick="handleRecorderSource(1)"
                      ${modal.systemAvailable ? '' : 'disabled style="opacity: 0.45; cursor: not-allowed;" title="No monitor source / loopback available"'}>
                Desktop audio
              </button>
            </div>
            ${modal.source === 1 && !modal.systemAvailable ? `
              <p style="font-size: 11px; color: var(--color-muted); margin: 6px 0 0 0;">
                Desktop capture needs a monitor source (Linux) or WASAPI loopback (Windows).
              </p>
            ` : ''}
          </div>

          <div style="display: flex; align-items: center; gap: 12px; margin: 14px 0;">
            <button class="btn-primary" style="flex: 0 0 auto; padding: 12px 20px; background: ${modal.isRecording ? 'var(--color-danger, #e0564b)' : 'var(--color-accent)'}; color: #1a1204; border: 0; border-radius: 10px; font-weight: 800; cursor: pointer;"
                    onclick="handleToggleRecording()">
              ${modal.isRecording ? '■ Stop' : '● Record'}
            </button>
            <div style="font-family: var(--font-mono); font-size: 22px; font-weight: 700;">
              <span id="recorder-elapsed">${elapsed}</span>s
              ${modal.isRecording ? '<span class="rec-pulse">●</span>' : ''}
            </div>
            <input class="modal-text-input" style="flex: 1;" value="${escapeHtml(modal.name)}"
                   oninput="handleRecorderName(this.value)" placeholder="Recording name">
          </div>

          ${modal.lastPath ? `
            <button class="btn-subtle" style="width: 100%; padding: 10px; cursor: pointer; border-radius: 10px; border: 1px dashed var(--border-color); background: none; color: var(--color-primary); font-size: 12px; font-weight: 600;"
                    onclick="handleAddLastRecordingToBoard()" ${modal.busy ? 'disabled style="opacity: 0.5;"' : ''}>
              ${modal.busy ? 'Adding…' : '＋ Add last recording to "' + escapeHtml((state.tabs.find(t => t.id === state.activeTabId) || {}).name || 'board') + '"'}
            </button>
          ` : ''}

          <div style="border-top: 1px solid var(--border-color); margin-top: 16px; padding-top: 14px;">
            <label class="setting-toggle-row">
              <div class="setting-toggle-info">
                <span class="setting-toggle-title">Instant Replay (30 s)</span>
                <span class="setting-toggle-desc">Keep a rolling buffer of desktop audio and save the last half minute on demand.</span>
              </div>
              <span class="modern-switch">
                <input type="checkbox" ${modal.replayArmed ? 'checked' : ''} onchange="handleToggleInstantReplay()">
                <span class="switch-track"><span class="switch-thumb"></span></span>
              </span>
            </label>
            <button class="btn-subtle" style="width: 100%; margin-top: 8px; padding: 10px; cursor: pointer; border-radius: 10px; border: 1px solid var(--border-color); background: none; color: var(--color-primary); font-size: 12px; font-weight: 600;"
                    onclick="handleSaveInstantReplay()" ${modal.replayArmed ? '' : 'disabled style="opacity: 0.5;"'}>
              ⏱ Save last 30 seconds
            </button>
          </div>

          <div class="modal-actions" style="margin-top: 16px;">
            <button class="modal-btn cancel-btn" onclick="handleCloseRecorderModal()">Close</button>
          </div>
        </div>
      </div>
    `;
  }

  //* Trim
  if (state.trimModal && state.trimModal.visible) {
    const modal = state.trimModal;
    html += `
      <div class="modal-overlay" onclick="handleCloseTrimModal()">
        <div class="modal-card" style="max-width: 640px; width: 100%;" onclick="event.stopPropagation()">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
            <h3 style="margin: 0; font-size: 16px; font-weight: 700; color: var(--color-primary);">Trim — ${escapeHtml(modal.name)}</h3>
            <button class="action-btn" onclick="handleCloseTrimModal()">${icons.close}</button>
          </div>
          <p style="font-size: 12px; color: var(--color-muted); margin: 0 0 12px 0;">
            Drag the handles to pick the region, preview it, then save a trimmed copy next to the original.
          </p>

          <div class="trim-waveform-wrap">
            ${modal.peaks && modal.peaks.length ? `
              <canvas id="trim-waveform" class="trim-waveform" width="600" height="120"
                      onpointerdown="handleTrimPointerDown('area', event)"
                      onpointermove="handleTrimPointerMove(event)"
                      onpointerup="handleTrimPointerUp()"
                      onpointerleave="handleTrimPointerUp()"></canvas>
              <div class="trim-handle" id="trim-handle-start"
                   style="left: ${modal.durationMs > 0 ? (modal.startMs / modal.durationMs * 100) : 0}%;"
                   onpointerdown="handleTrimPointerDown('start', event)"></div>
              <div class="trim-handle" id="trim-handle-end"
                   style="left: ${modal.durationMs > 0 ? (modal.endMs / modal.durationMs * 100) : 100}%;"
                   onpointerdown="handleTrimPointerDown('end', event)"></div>
            ` : `
              <div class="trim-waveform trim-empty">${modal.peaks ? 'Empty audio' : 'Decoding…'}</div>
            `}
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px; font-family: var(--font-mono); font-size: 12px;">
            <span>Start: <strong id="trim-start-label">${formatDuration(modal.startMs)}</strong></span>
            <span>Selection: <strong id="trim-length-label">${formatDuration(Math.max(0, modal.endMs - modal.startMs))}</strong></span>
            <span>End: <strong id="trim-end-label">${formatDuration(modal.endMs)}</strong> / ${formatDuration(modal.durationMs)}</span>
          </div>

          <div class="modal-actions" style="margin-top: 16px;">
            <button class="modal-btn cancel-btn" onclick="handleCloseTrimModal()">Cancel</button>
            <button class="modal-btn clear-btn" onclick="handleTrimPreview()" ${modal.peaks ? '' : 'disabled'}>▶ Preview</button>
            <button class="modal-btn save-btn" onclick="handleTrimSave()" ${modal.peaks && !modal.saving ? '' : 'disabled'}>
              ${modal.saving ? 'Saving…' : 'Save trimmed copy'}
            </button>
          </div>
        </div>
      </div>
    `;
  }

  return html;
}

// Render sleek custom right-click context menu
function renderContextMenu() {
  if (!state.contextMenu || !state.contextMenu.visible) return '';

  const { x, y } = state.contextMenu;

  //* Folder (sidebar category row) context menu — quick folder actions.
  if (state.contextMenu.type === 'folder') {
    const tabId = state.contextMenu.tabId;
    const tab = state.tabs.find(t => t.id === tabId);
    if (!tab) return '';

    return `
    <div class="custom-context-menu" style="left: ${x}px; top: ${y}px;" onclick="event.stopPropagation()">
      <div style="padding: 4px 8px 6px 8px; font-size: 11px; font-weight: 700; color: var(--color-muted); text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid var(--border-color); margin-bottom: 3px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
        ${escapeHtml(tab.name)}
      </div>

      <button class="context-menu-item" onclick="closeContextMenu(); handleOpenFolder(${tabId})">
        <span class="context-menu-icon">${icons.openLink}</span>
        <span>Open in explorer</span>
      </button>

      <button class="context-menu-item" onclick="handleAssignTabIcon(${tabId})">
        <span class="context-menu-icon">${icons.image}</span>
        <span>${tab.icon ? 'Change Board Icon...' : 'Assign Board Icon...'}</span>
      </button>

      ${tab.icon ? `
        <button class="context-menu-item danger" onclick="handleRemoveTabIcon(${tabId})">
          <span class="context-menu-icon">${icons.trash}</span>
          <span>Remove Board Icon</span>
        </button>
      ` : ''}

      <div class="context-menu-divider"></div>

      <button class="context-menu-item" onclick="closeContextMenu(); handleImportSounds(${tabId})" ${state.isImportingFolder ? 'disabled style="opacity: 0.5; cursor: not-allowed;"' : ''}>
        <span class="context-menu-icon">${icons.music}</span>
        <span>Import Sound</span>
      </button>

      <button class="context-menu-item" onclick="closeContextMenu(); handleImportFolder(${tabId})" ${state.isImportingFolder ? 'disabled style="opacity: 0.5; cursor: not-allowed;"' : ''}>
        <span class="context-menu-icon">${icons.folderPlus}</span>
        <span>Import Folder</span>
      </button>

      <div class="context-menu-divider"></div>

      <button class="context-menu-item" onclick="closeContextMenu(); handleOpenRenameTabModal(${tabId})">
        <span class="context-menu-icon">${icons.pencil}</span>
        <span>Edit</span>
      </button>

      <button class="context-menu-item danger" onclick="closeContextMenu(); handleDeleteTab(${tabId})">
        <span class="context-menu-icon">${icons.trash}</span>
        <span>Delete</span>
      </button>
    </div>
  `;
  }

  const soundId = state.contextMenu.soundId;
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

        <button class="context-menu-item" onclick="handleOpenMoveModal([...state.selectedSoundIds])">
          <span class="context-menu-icon">${icons.folderPlus || '📁'}</span>
          <span>Move to Board... (${state.selectedSoundIds.length})</span>
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

        <button class="context-menu-item" onclick="closeContextMenu(); handleOpenRenameSoundModal(${soundId})">
          <span class="context-menu-icon">${icons.pencil}</span>
          <span>Rename...</span>
        </button>

        <button class="context-menu-item" onclick="closeContextMenu(); handleOpenTagsModal(${soundId})">
          <span class="context-menu-icon">🏷</span>
          <span>Edit Tags...</span>
        </button>

        <button class="context-menu-item" onclick="closeContextMenu(); handleOpenPoliciesModal(${soundId})">
          <span class="context-menu-icon">⚙</span>
          <span>Playback Policies...</span>
        </button>

        ${targetSound.voicePreset ? '' : `
          <button class="context-menu-item" onclick="closeContextMenu(); handleOpenTrimModal(${soundId})">
            <span class="context-menu-icon">✂</span>
            <span>Trim / Edit...</span>
          </button>
        `}

        <button class="context-menu-item" onclick="closeContextMenu(); handleOpenMoveModal([${soundId}])">
          <span class="context-menu-icon">${icons.folderPlus || '📁'}</span>
          <span>Move to Board...</span>
        </button>

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
    return flattenTabSounds(currentTab).filter(s => {
      const name = (s.displayName || s.name || '').toLowerCase();
      const tags = (s.tags || []).some(t => (t || '').toLowerCase().includes(query));
      return name.includes(query) || tags;
    });
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

  const deliver = (name, ...payload) => {
    // Mimic the native shell: callbacks are posted asynchronously into the
    // event loop, never invoked synchronously from the binding call.
    setTimeout(() => {
      if (typeof window[name] === 'function') window[name](...JSON.parse(JSON.stringify(payload)));
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

  // Import & folder stubs (folder context menu + toolbar buttons): simulate the
  // native pickers and the on-disk copy pipeline so the whole import flow is
  // clickable in the preview. Cancelled pickers would return '' / [] exactly
  // like the native shell — here they always "pick" demo content.
  let demoImportSeq = 9000;
  let demoFolderSeq = 20000;

  const findDemoTab = (tabId) => demoTabs.find(t => t.id === tabId) || null;

  const cloneDemoTab = (tab) => JSON.parse(JSON.stringify(tab));

  window.openFolder = async (tabId) => {
    const tab = findDemoTab(tabId);
    if (tab) showToast(`(demo) Opening "${tab.path}" in the file manager`, 'info');
  };

  window.pickImportFiles = async () => [
    'C:/Users/demo/Downloads/vine-boom.wav',
    'C:/Users/demo/Downloads/bruh-sound-effect-2.mp3'
  ];

  window.pickImportFolder = async () => 'C:/Users/demo/Downloads/Meme Pack';

  window.importDroppedPaths = async (tabId, parentFolderId, paths) => {
    const tab = findDemoTab(tabId);
    if (!tab) return null;

    const newSounds = [];
    const newFolders = [];
    (paths || []).forEach(p => {
      if (/\.(mp3|wav|flac)$/i.test(p)) {
        newSounds.push(demoSound(demoImportSeq++, folderBaseName(p).replace(/\.[^.]+$/, ''), false, []));
      } else {
        const name = folderBaseName(p) || 'Imported Folder';
        newFolders.push({
          id: demoFolderSeq++,
          name,
          path: `C:/Soundboards/${tab.name}/${name}`,
          sounds: [
            demoSound(demoImportSeq++, `${name}-clip-1`, false, []),
            demoSound(demoImportSeq++, `${name}-clip-2`, false, [])
          ],
          folders: []
        });
      }
    });

    if (parentFolderId && parentFolderId !== 0) {
      const target = findFolderInTree(tab.folders, parentFolderId);
      if (target) {
        target.sounds = [...(target.sounds || []), ...newSounds];
        target.folders = [...(target.folders || []), ...newFolders];
      }
    } else {
      tab.sounds = [...(tab.sounds || []), ...newSounds];
      tab.folders = [...(tab.folders || []), ...newFolders];
    }
    return cloneDemoTab(tab);
  };

  window.importFolder = async (tabId, sourcePath, mode) => {
    const tab = findDemoTab(tabId);
    if (!tab) return null;

    const name = folderBaseName(sourcePath) || 'Imported Folder';
    const children = [
      demoSound(demoImportSeq++, 'clip-01', false, []),
      demoSound(demoImportSeq++, 'clip-02', false, []),
      demoSound(demoImportSeq++, 'clip-03', false, [])
    ];

    if (mode === 'parent') {
      tab.folders = [...(tab.folders || []), {
        id: demoFolderSeq++,
        name,
        path: `C:/Soundboards/${tab.name}/${name}`,
        sounds: children,
        folders: []
      }];
    } else {
      tab.sounds = [...(tab.sounds || []), ...children];
    }
    return cloneDemoTab(tab);
  };

  //* ---- V2 feature simulations ----
  //* Locates a demo sound together with its owning tab (moves need both).
  const locateDemoSound = (soundId) => {
    for (const t of demoTabs) {
      const all = [...t.sounds, ...(t.folders || []).flatMap(f => f.sounds || [])];
      const hit = all.find(s => s.id === soundId);
      if (hit) return { tab: t, sound: hit };
    }
    return null;
  };

  window.renameSound = async (soundId, name) => {
    const hit = locateDemoSound(soundId);
    if (!hit) return null;
    hit.sound.displayName = name;
    return JSON.parse(JSON.stringify(hit.sound));
  };

  window.setSoundTags = async (soundId, tags) => {
    const hit = locateDemoSound(soundId);
    if (!hit) return null;
    hit.sound.tags = (tags || []).slice(0, 16);
    return JSON.parse(JSON.stringify(hit.sound));
  };

  window.setSoundPolicies = async (soundId, triggerMode, loopByDefault, stopOthers, muteOthers, muteVoice) => {
    const hit = locateDemoSound(soundId);
    if (!hit) return null;
    Object.assign(hit.sound, { triggerMode, loopByDefault, stopOthers, muteOthers, muteVoice });
    return JSON.parse(JSON.stringify(hit.sound));
  };

  window.setSoundVoiceSlot = async (soundId, preset) => {
    const hit = locateDemoSound(soundId);
    if (!hit) return null;
    hit.sound.voicePreset = preset || null;
    return JSON.parse(JSON.stringify(hit.sound));
  };

  window.setTabIcon = async (tabId, icon) => {
    const tab = findDemoTab(tabId);
    if (!tab) return null;
    tab.icon = icon || '';
    return cloneDemoTab(tab);
  };

  window.setSoundOrder = async (tabId, orderedIds) => {
    const tab = findDemoTab(tabId);
    if (!tab) return null;
    tab.sortMode = 4;
    const orderOf = new Map(orderedIds.map((id, index) => [id, index]));
    const byOrder = (a, b) => {
      const ia = orderOf.has(a.id) ? orderOf.get(a.id) : 1e9;
      const ib = orderOf.has(b.id) ? orderOf.get(b.id) : 1e9;
      return ia - ib;
    };
    tab.sounds = [...tab.sounds].sort(byOrder);
    const sortFolders = (folders) => {
      folders.forEach(folder => {
        folder.sounds = [...(folder.sounds || [])].sort(byOrder);
        sortFolders(folder.folders || []);
      });
    };
    sortFolders(tab.folders || []);
    return cloneDemoTab(tab);
  };

  window.setFolderOrder = async (tabId, orderedIds) => {
    const tab = findDemoTab(tabId);
    if (!tab) return null;
    tab.sortMode = 4;
    const orderOf = new Map(orderedIds.map((id, index) => [id, index]));
    const byFolderOrder = (a, b) => {
      const ia = orderOf.has(a.id) ? orderOf.get(a.id) : 1e9;
      const ib = orderOf.has(b.id) ? orderOf.get(b.id) : 1e9;
      return ia - ib;
    };
    const sortLevel = (folders) => {
      const sorted = [...folders].sort(byFolderOrder);
      folders.length = 0;
      folders.push(...sorted);
      folders.forEach(folder => sortLevel(folder.folders || []));
    };
    sortLevel(tab.folders || []);
    return cloneDemoTab(tab);
  };

  let demoBoardLoop = { mode: 0, tabId: null, index: 0, total: 0, currentSoundId: 0 };
  window.boardLoopCycle = async (tabId) => {
    const tab = findDemoTab(tabId);
    if (!tab) return JSON.stringify({ ...demoBoardLoop });
    const next = demoBoardLoop.tabId === tabId ? (demoBoardLoop.mode + 1) % 3 : 1;
    let total = (tab.sounds || []).filter(s => !s.voicePreset).length;
    if (next === 2) {
      let extra = 0;
      const walk = (folders) => {
        (folders || []).forEach(f => {
          extra += (f.sounds || []).filter(s => !s.voicePreset).length;
          walk(f.folders);
        });
      };
      walk(tab.folders);
      total += extra;
    }
    if (total === 0) {
      demoBoardLoop = { mode: 0, tabId: null, index: 0, total: 0, currentSoundId: 0 };
    } else {
      demoBoardLoop = { mode: next, tabId: tabId, index: 1, total: total, currentSoundId: 0 };
    }
    deliver('onBoardLoopChanged', demoBoardLoop.mode, demoBoardLoop.tabId);
    return JSON.stringify({ ...demoBoardLoop });
  };
  window.getBoardLoopState = async () => JSON.stringify({ ...demoBoardLoop });

  window.setSortMode = async (tabId, mode) => {
    const tab = findDemoTab(tabId);
    if (!tab) return null;
    tab.sortMode = parseInt(mode, 10) || 0;
    return cloneDemoTab(tab);
  };

  window.moveSoundsToTab = async (soundIds, targetTabId, targetFolderId) => {
    for (const soundId of (soundIds || [])) {
      const hit = locateDemoSound(soundId);
      if (!hit) continue;
      const target = findDemoTab(targetTabId);
      if (!target) continue;
      hit.tab.sounds = hit.tab.sounds.filter(s => s.id !== soundId);
      (hit.tab.folders || []).forEach(f => { f.sounds = (f.sounds || []).filter(s => s.id !== soundId); });
      const entry = JSON.parse(JSON.stringify(hit.sound));
      entry.path = `C:/Soundboards/${target.name}/${entry.name}.mp3`;
      if (targetFolderId && targetFolderId !== 0) {
        const folder = findFolderInTree(target.folders, targetFolderId);
        if (folder) folder.sounds = [...(folder.sounds || []), entry];
        else target.sounds = [...target.sounds, entry];
      } else {
        target.sounds = [...target.sounds, entry];
      }
    }
    return demoTabs.map(cloneDemoTab);
  };

  let demoRecording = { active: false, source: 0, startedAt: 0 };
  let demoReplayArmed = false;

  window.systemRecordingAvailable = async () => true;
  window.recorderStart = async (source) => {
    if (demoRecording.active) return false;
    demoRecording = { active: true, source, startedAt: Date.now() };
    return true;
  };
  window.recorderStop = async (name) => {
    demoRecording.active = false;
    return `C:/Users/demo/Recordings/${(name || 'Demo Recording')}.wav`;
  };
  window.recorderStatus = async () => JSON.stringify({
    active: demoRecording.active,
    source: demoRecording.source,
    elapsedMs: demoRecording.active ? (Date.now() - demoRecording.startedAt) : 0,
    capturedFrames: 0, sampleRate: 48000, channels: 2
  });
  window.armInstantReplay = async () => { demoReplayArmed = true; return true; };
  window.disarmInstantReplay = async () => { demoReplayArmed = false; };
  window.instantReplayArmed = async () => demoReplayArmed;
  window.saveInstantReplay = async (name) =>
    `C:/Users/demo/Recordings/${(name || 'Instant Replay')}.wav`;

  window.getSoundWaveform = async (soundId, buckets) => {
    const count = buckets || 480;
    const peaks = [];
    for (let i = 0; i < count; i++) {
      const t = i / count;
      const envelope = Math.sin(Math.PI * t) * (0.35 + 0.65 * Math.abs(Math.sin(t * 21 + soundId)));
      peaks.push(-envelope * (0.6 + 0.4 * Math.abs(Math.sin(t * 53))));
      peaks.push(envelope * (0.6 + 0.4 * Math.abs(Math.cos(t * 37))));
    }
    return JSON.stringify({ peaks, durationMs: 8400 + (soundId % 7) * 300 });
  };

  window.trimSound = async (soundId, startMs, endMs) => {
    const hit = locateDemoSound(soundId);
    if (!hit) return null;
    const created = demoSound(demoImportSeq++, `${hit.sound.name} (trimmed)`, false, []);
    created.path = hit.sound.path.replace(/\.[^.]+$/, '') + ' (trimmed).wav';
    hit.tab.sounds = [...hit.tab.sounds, created];
    return JSON.parse(JSON.stringify(created));
  };

  window.importFileIntoTab = async (tabId, path, parentFolderId) => {
    const tab = findDemoTab(tabId);
    if (!tab) return null;
    const name = folderBaseName(path).replace(/\.[^.]+$/, '') || 'Recording';
    const created = demoSound(demoImportSeq++, name, false, []);
    if (parentFolderId && parentFolderId !== 0) {
      const folder = findFolderInTree(tab.folders, parentFolderId);
      if (folder) folder.sounds = [...(folder.sounds || []), created];
      else tab.sounds = [...tab.sounds, created];
    } else {
      tab.sounds = [...tab.sounds, created];
    }
    return cloneDemoTab(tab);
  };

  let demoMicMuted = false;
  window.toggleMicMute = async () => {
    demoMicMuted = !demoMicMuted;
    deliver('onMicMuteChanged', demoMicMuted);
    return demoMicMuted;
  };
  window.isMicMuted = async () => demoMicMuted;
  window.toggleHearMyself = async () => {
    demoSettings.hearMyself = !demoSettings.hearMyself;
    return demoSettings.hearMyself;
  };
  window.setVoicePreset = async (preset) => {
    if (!['off', 'deep', 'high', 'echo', 'robot'].includes(preset)) return false;
    deliver('onVoicePresetChanged', preset);
    return true;
  };
  window.getVoicePreset = async () => 'off';

  window.toggleOverlay = async () => {
    demoSettings.overlayEnabled = !demoSettings.overlayEnabled;
    showToast(demoSettings.overlayEnabled
      ? '(demo) The overlay window opens in the compiled app'
      : '(demo) Overlay hidden', 'info');
    return demoSettings.overlayEnabled;
  };
  let demoRemotePin = '482913';
  window.setOverlayPosition = async (position) => {
    demoSettings.overlayPosition = position;
  };
  window.getRemoteInfo = async () => JSON.stringify({
    enabled: true, running: true, port: 38712, pin: demoRemotePin, address: '192.168.1.42'
  });
  window.regenerateRemotePin = async () => {
    demoRemotePin = String(Math.floor(100000 + Math.random() * 900000));
    return demoRemotePin;
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
