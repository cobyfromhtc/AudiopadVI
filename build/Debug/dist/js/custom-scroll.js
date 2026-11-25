/* AudioPad — Custom themed scrollbars for every scrollable list.
   Replaces the native Windows scrollbar app-wide. The mouse wheel scrolls
   natively; the overlay thumb can be hovered, dragged, or clicked to jump.
   The track is a sibling overlay (never inside the scroller), so it can never
   inflate the list's own scrollable size. */
(function () {
  'use strict';
  if (window.__apxScroll) return;
  window.__apxScroll = true;

  /* Containers we always manage (the generic scanner below catches every
     scrollable element regardless of its class name). */
  var FORCED    = ['.workspace-body', '.table-container', '.folder-list', '.multi-image-sound-list', '.apx-scroll'];
  var FADE_MS   = 800;   /* idle time before the bar fades out */
  var THUMB_MIN = 28;    /* minimum thumb height in px */
  var TRACK_W   = 15;    /* overlay track width in px */
  var INSET     = 2;     /* gap from the container edge in px */

  var contexts    = [];
  var scanPending = false;

  function clamp(v, lo, hi) { return v < lo ? lo : (v > hi ? hi : v); }

  /* ------------------------------------------------------------------ */
  /* Track placement (sibling overlay, anchored over the scroller edge)  */
  /* ------------------------------------------------------------------ */
  function positionTrack(ctx) {
    var el = ctx.el, track = ctx.track;
    var anchor = track.offsetParent || ctx.parent || document.body;
    if (anchor === track) anchor = document.body;
    var er = el.getBoundingClientRect();
    var ar = anchor.getBoundingClientRect();
    var top  = er.top + el.clientTop + INSET - ar.top + anchor.scrollTop;
    var left = er.left + el.clientLeft + el.clientWidth - TRACK_W - INSET - ar.left + anchor.scrollLeft;
    track.style.top    = Math.round(top) + 'px';
    track.style.left   = Math.round(left) + 'px';
    track.style.height = Math.max(0, Math.round(el.clientHeight - INSET * 2)) + 'px';
  }

  function repositionAll() {
    for (var i = 0; i < contexts.length; i++) {
      if (contexts[i].max > 4) positionTrack(contexts[i]);
    }
  }

  /* ------------------------------------------------------------------ */
  /* Geometry                                                            */
  /* ------------------------------------------------------------------ */
  function refresh(ctx) {
    var el = ctx.el;
    var max = el.scrollHeight - el.clientHeight;
    ctx.max = max > 0 ? max : 0;
    var vertical = ctx.max > 4;

    /* Hide the native scrollbar only while we actually show ours */
    el.classList.toggle('apx-managed', vertical);
    if (!vertical) { ctx.track.classList.add('apx-off'); suppressCheck(); return; }
    ctx.track.classList.remove('apx-off');
    positionTrack(ctx);

    var trackH = el.clientHeight - INSET * 2;
    var thumbH = clamp(Math.round(trackH * (el.clientHeight / el.scrollHeight)), THUMB_MIN, trackH);
    var travel = Math.max(1, trackH - thumbH);
    ctx.travel = travel;
    ctx.top = clamp(Math.round((el.scrollTop / ctx.max) * travel), 0, travel);
    ctx.thumb.style.height = thumbH + 'px';
    ctx.thumb.style.transform = 'translateY(' + ctx.top + 'px)';
    suppressCheck();
  }

  /* When a scrollable list sits inside another one, show only the inner bar
     so the two never stack on the same edge. */
  function suppressCheck() {
    var i, j, a, b;
    for (i = 0; i < contexts.length; i++) contexts[i].track.classList.remove('apx-suppressed');
    for (i = 0; i < contexts.length; i++) {
      a = contexts[i];
      if (a.max <= 4) continue;
      for (j = 0; j < contexts.length; j++) {
        b = contexts[j];
        if (b !== a && b.max > 4 && a.el.contains(b.el)) { a.track.classList.add('apx-suppressed'); break; }
      }
    }
  }

  function flash(ctx, keep) {
    clearTimeout(ctx.timer);
    ctx.track.classList.remove('apx-hidden');
    if (keep) return;
    ctx.timer = setTimeout(function () {
      if (!ctx.hover && !ctx.dragging && !ctx.hoveringList) ctx.track.classList.add('apx-hidden');
    }, FADE_MS);
  }

  /* ------------------------------------------------------------------ */
  /* Attach / detach                                                     */
  /* ------------------------------------------------------------------ */
  function attach(el) {
    if (!el || el.__apxManaged || !el.appendChild) return;
    if (el.classList && el.classList.contains('apx-native')) return;
    if (el.closest && el.closest('.apx-native')) return;
    var tag = el.tagName;
    if (tag === 'TEXTAREA' || tag === 'SELECT' || tag === 'INPUT') return;
    var parent = el.parentNode;
    if (!parent || parent.nodeType !== 1) return;
    el.__apxManaged = true;

    var track = document.createElement('div');
    track.className = 'apx-sb apx-hidden';
    var thumb = document.createElement('div');
    thumb.className = 'apx-sb-thumb';
    track.appendChild(thumb);
    parent.appendChild(track); /* sibling overlay — never inside the scroller */

    var ctx = { el: el, parent: parent, track: track, thumb: thumb, max: 0, top: 0, travel: 1,
                timer: 0, hover: false, hoveringList: false, dragging: false,
                ro: null, mo: null };
    el.__apxCtx = ctx;
    contexts.push(ctx);

    ctx.ro = new ResizeObserver(function () { refresh(ctx); });
    ctx.ro.observe(el);
    ctx.mo = new MutationObserver(function () { refresh(ctx); });
    ctx.mo.observe(el, { childList: true, subtree: true });

    el.addEventListener('scroll', function () { refresh(ctx); flash(ctx); }, { passive: true });
    el.addEventListener('wheel',   function () { flash(ctx); },               { passive: true });
    el.addEventListener('mouseenter', function () { ctx.hoveringList = true;  flash(ctx, true); });
    el.addEventListener('mouseleave', function () { ctx.hoveringList = false; flash(ctx); });
    track.addEventListener('mouseenter', function () { ctx.hover = true;  flash(ctx, true); });
    track.addEventListener('mouseleave', function () { ctx.hover = false; flash(ctx); });

    track.addEventListener('pointerdown', function (e) {
      if (e.button !== 0) return;
      e.preventDefault();
      e.stopPropagation(); /* never let the click reach list rows below */
      if (e.target === thumb) startThumbDrag(e, ctx); else jumpTo(e, ctx);
    });

    refresh(ctx);
    flash(ctx); /* reveal once so the bar is discoverable */
  }

  function detach(ctx) {
    clearTimeout(ctx.timer);
    if (ctx.ro) ctx.ro.disconnect();
    if (ctx.mo) ctx.mo.disconnect();
    if (ctx.track && ctx.track.parentNode) ctx.track.parentNode.removeChild(ctx.track);
    if (ctx.el) {
      ctx.el.classList.remove('apx-managed');
      ctx.el.__apxManaged = false;
      delete ctx.el.__apxCtx;
    }
  }

  /* ------------------------------------------------------------------ */
  /* Interactions                                                        */
  /* ------------------------------------------------------------------ */
  function startThumbDrag(e, ctx) {
    ctx.dragging = true;
    ctx.track.classList.add('apx-dragging');
    document.body.classList.add('apx-dragging-active');
    var startY   = e.clientY;
    var startTop = ctx.top;
    var travel   = ctx.travel, max = ctx.max;

    function move(ev) {
      var top = clamp(startTop + (ev.clientY - startY), 0, travel);
      ctx.thumb.style.transform = 'translateY(' + top + 'px)';
      ctx.el.scrollTop = Math.round((top / travel) * max);
    }
    function up() {
      ctx.dragging = false;
      ctx.track.classList.remove('apx-dragging');
      document.body.classList.remove('apx-dragging-active');
      window.removeEventListener('pointermove', move);
      flash(ctx);
    }
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up, { once: true });
    window.addEventListener('pointercancel', up, { once: true });
    flash(ctx, true);
  }

  function jumpTo(e, ctx) {
    var rect  = ctx.el.getBoundingClientRect();
    var ratio = clamp((e.clientY - rect.top) / Math.max(1, rect.height), 0, 1);
    ctx.el.scrollTo({ top: ratio * ctx.max, behavior: 'smooth' });
    flash(ctx, true);
  }

  /* ------------------------------------------------------------------ */
  /* Generic scanner — finds every scrollable element in the document    */
  /* ------------------------------------------------------------------ */
  function scan() {
    scanPending = false;
    var i, j, ctx;

    for (i = contexts.length - 1; i >= 0; i--) {
      ctx = contexts[i];
      if (!ctx.el.isConnected) { detach(ctx); contexts.splice(i, 1); }
    }

    for (i = 0; i < FORCED.length; i++) {
      var forced = document.querySelectorAll(FORCED[i]);
      for (j = 0; j < forced.length; j++) attach(forced[j]);
    }

    var all = document.querySelectorAll('body *');
    for (i = 0; i < all.length; i++) {
      var el = all[i];
      if (el.__apxManaged) continue;
      if (el.clientHeight < 24) continue;                  /* too small / hidden */
      if (el.scrollHeight <= el.clientHeight + 4) continue; /* nothing to scroll */
      var cs = getComputedStyle(el);
      if (cs.overflowY === 'auto' || cs.overflowY === 'scroll') attach(el);
    }

    for (i = 0; i < contexts.length; i++) refresh(contexts[i]);
  }

  function scheduleScan() {
    if (scanPending) return;
    scanPending = true;
    requestAnimationFrame(function () { setTimeout(scan, 60); });
  }

  /* The app re-renders its DOM on every state change, so rescan on any
     structural change (debounced), on resize, and a few times after load.
     A capture-phase scroll listener keeps sibling tracks glued to their
     lists even when an outer container is scrolled. */
  new MutationObserver(scheduleScan).observe(document.documentElement, { childList: true, subtree: true });
  window.addEventListener('resize', scheduleScan);
  document.addEventListener('scroll', repositionAll, true);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', scan); else scan();
    setTimeout(scan, 400);
  setTimeout(scan, 1500);
})();