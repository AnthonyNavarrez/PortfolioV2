/**
 * Message blobs — reference implementation.
 * Dependency-free. Mount on any positioned container.
 */
import { censor } from './censor'

export interface MessageBlobsOptions {
  drift?: number;
  wobble?: number;
  maxBlobs?: number;
  maxLength?: number;
  swatches?: string[];
  onDrop?: (msg: { id: number; text: string; name?: string; x: number; y: number; color: string }) => void;
  onEdit?: (dbId: number, update: { text: string; name?: string; color: string }) => void;
}

export interface MessageBlobsHandle {
  add(text: string, x?: number, y?: number, color?: string, name?: string, quiet?: boolean, own?: boolean, dbId?: number): void;
  linkDbId(internalId: number, dbId: number): void;
  dispose(): void;
}

interface Blob {
  id: number; text: string; r: number; x: number; y: number; vx: number; vy: number;
  heading: number; hf: number; hp: number; p1: number; p2: number; p3: number; sp: number;
  s: number; sv: number; spawnAt: number; hover: boolean; color: string;
  el: HTMLDivElement; svg: SVGSVGElement; path: SVGPathElement; size: number;
  textEl: HTMLParagraphElement; nameEl: HTMLSpanElement | null; textWrap: HTMLDivElement;
  own: boolean; dbId?: number;
}

const SVGNS = 'http://www.w3.org/2000/svg';
const PTS = 40;
const rand = (a: number, b: number) => a + Math.random() * (b - a);

const DEFAULT_SWATCHES = ['#1E1E1E', '#D6F05A', '#FF6B6B', '#5B8DEF', '#FFB347', '#C084FC'];

function textColorFor(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.55 ? '#1E1E1E' : '#f8f8f8';
}

export function createMessageBlobs(container: HTMLElement, opts: MessageBlobsOptions = {}): MessageBlobsHandle {
  const maxBlobs = opts.maxBlobs ?? 30;
  const maxLen = opts.maxLength ?? 80;
  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
  const swatches = opts.swatches ?? DEFAULT_SWATCHES;

  if (getComputedStyle(container).position === 'static') container.style.position = 'relative';
  container.style.overflow = 'hidden';

  const layer = document.createElement('div');
  layer.style.cssText = 'position:absolute;inset:0;cursor:crosshair;';
  container.appendChild(layer);

  // ---- Color picker state ------------------------------------------------
  let currentColor = swatches[0];

  // ---- Input pill --------------------------------------------------------
  const form = document.createElement('form');
  form.setAttribute('aria-label', 'New message');
  form.style.cssText = `position:absolute;z-index:50;display:none;flex-direction:column;gap:0;width:340px;max-width:calc(100% - 32px);box-sizing:border-box;background:#fff;border:2px solid #1E1E1E;border-radius:20px;cursor:default;font-family:'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif;overflow:hidden;`;

  // Color swatch row
  const swatchRow = document.createElement('div');
  swatchRow.style.cssText = 'display:flex;gap:8px;padding:12px 16px 10px;border-bottom:1.5px solid #ebebeb;';

  const swatchCursor = (hex: string) => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"><circle cx="10" cy="10" r="8" fill="${hex}" stroke="white" stroke-width="1.5"/></svg>`;
    return `url("data:image/svg+xml;base64,${btoa(svg)}") 10 10, pointer`;
  };

  const selectSwatch = (col: string) => {
    currentColor = col;
    swatchBtns.forEach(b => {
      b.style.transform = b.dataset.color === col ? 'scale(1.45)' : 'scale(1)';
    });
  };

  const swatchBtns: HTMLButtonElement[] = [];
  swatches.forEach((col) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.dataset.color = col;
    btn.setAttribute('aria-label', `Color ${col}`);
    btn.setAttribute('data-cursor', 'swatch');
    btn.setAttribute('data-cursor-color', col);
    btn.style.cssText = `width:22px;height:22px;border-radius:50%;background:${col};border:none;cursor:pointer;flex-shrink:0;transition:transform 0.15s cubic-bezier(0.22,1,0.36,1);box-sizing:border-box;outline:none;`;
    btn.style.cursor = swatchCursor(col);
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      selectSwatch(col);
      input.focus({ preventScroll: true });
    });
    if (col === currentColor) btn.style.transform = 'scale(1.45)';
    swatchBtns.push(btn);
    swatchRow.appendChild(btn);
  });

  // Input row
  const inputRow = document.createElement('div');
  inputRow.style.cssText = 'display:flex;align-items:center;gap:8px;padding:6px 6px 6px 16px;';

  const label = document.createElement('label');
  label.textContent = 'Message for the new blob';
  label.htmlFor = 'message-blob-input';
  label.style.cssText = 'position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;';
  const input = document.createElement('input');
  input.id = 'message-blob-input';
  input.type = 'text';
  input.maxLength = maxLen;
  input.placeholder = 'Your message…';
  input.autocomplete = 'off';
  input.style.cssText = `flex:1;min-width:0;height:40px;border:0;background:transparent;font:inherit;font-size:15px;color:#1E1E1E;outline:none;`;
  const counter = document.createElement('span');
  counter.setAttribute('aria-hidden', 'true');
  counter.style.cssText = `font-size:11px;color:#9b9b9b;font-variant-numeric:tabular-nums;white-space:nowrap;`;
  const button = document.createElement('button');
  button.type = 'submit';
  button.textContent = 'Drop';
  button.style.cssText = `height:40px;padding:0 16px;border:0;border-radius:999px;background:#1E1E1E;color:#f8f8f8;font:inherit;font-size:14px;font-weight:500;cursor:pointer;white-space:nowrap;flex-shrink:0;`;

  // Name row
  const nameRow = document.createElement('div');
  nameRow.style.cssText = 'display:flex;align-items:center;padding:4px 6px 8px 16px;border-top:1.5px solid #ebebeb;';
  const nameLabel = document.createElement('label');
  nameLabel.textContent = 'Name for the blob';
  nameLabel.htmlFor = 'message-blob-name';
  nameLabel.style.cssText = 'position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;';
  const nameInput = document.createElement('input');
  nameInput.id = 'message-blob-name';
  nameInput.type = 'text';
  nameInput.maxLength = 40;
  nameInput.placeholder = 'Your name (optional)';
  nameInput.autocomplete = 'off';
  nameInput.style.cssText = `flex:1;min-width:0;height:36px;border:0;background:transparent;font:inherit;font-size:14px;color:#6b6b6b;outline:none;`;
  nameRow.append(nameLabel, nameInput);

  inputRow.append(label, input, counter, button);
  form.append(swatchRow, inputRow, nameRow);
  container.appendChild(form);

  let draft: { x: number; y: number } | null = null;
  let editTarget: Blob | null = null;
  const updateCounter = () => { counter.textContent = String(maxLen - input.value.length); };

  const openDraft = (x: number, y: number, prefill?: { text: string; name: string; color: string }) => {
    draft = { x, y };
    if (prefill) {
      input.value = prefill.text;
      nameInput.value = prefill.name;
      selectSwatch(swatches.includes(prefill.color) ? prefill.color : swatches[0]);
      button.textContent = 'Save';
    } else {
      button.textContent = 'Drop';
    }
    const W = container.clientWidth, H = container.clientHeight;
    form.style.display = 'flex';
    requestAnimationFrame(() => {
      form.style.left = `${Math.max(16, Math.min(x, W - form.offsetWidth - 16))}px`;
      form.style.top = `${Math.max(16, Math.min(y - 20, H - form.offsetHeight - 16))}px`;
    });
    updateCounter();
    input.focus({ preventScroll: true });
  };

  const closeDraft = () => {
    draft = null;
    editTarget = null;
    form.style.display = 'none';
    input.value = '';
    nameInput.value = '';
    button.textContent = 'Drop';
  };

  const local = (e: MouseEvent) => {
    const rect = container.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const onLayerClick = (e: MouseEvent) => {
    if (draft !== null) { closeDraft(); return; }
    const p = local(e); editTarget = null; openDraft(p.x, p.y);
  };
  const onSubmit = (e: Event) => {
    e.preventDefault();
    if (!draft) return;
    const msg = censor(input.value.trim().slice(0, maxLen));
    const name = censor(nameInput.value.trim().slice(0, 40));
    if (!msg) { closeDraft(); return; }

    if (editTarget !== null) {
      const b = editTarget;
      // Update visual
      const newColor = currentColor;
      const newTextColor = textColorFor(newColor);
      b.color = newColor;
      b.text = msg;
      b.path.setAttribute('fill', newColor);
      const len = msg.length;
      const fs = len < 18 ? 16 : len < 44 ? 14 : 12;
      b.textEl.textContent = msg;
      b.textEl.style.color = newTextColor;
      b.textEl.style.fontSize = `${fs}px`;
      if (name) {
        const nameColor = newTextColor === '#1E1E1E' ? 'rgba(30,30,30,0.55)' : 'rgba(248,248,248,0.65)';
        if (b.nameEl) {
          b.nameEl.textContent = `— ${name}`;
          b.nameEl.style.color = nameColor;
        } else {
          const nameEl = document.createElement('span');
          nameEl.textContent = `— ${name}`;
          nameEl.style.cssText = `font-family:'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif;font-size:11px;font-weight:400;color:${nameColor};user-select:none;text-align:center;overflow-wrap:anywhere;`;
          b.textWrap.appendChild(nameEl);
          b.nameEl = nameEl;
        }
      } else if (b.nameEl) {
        b.nameEl.remove();
        b.nameEl = null;
      }
      if (b.dbId != null) opts.onEdit?.(b.dbId, { text: msg, name: name || undefined, color: newColor });
    } else {
      add(msg, draft.x, draft.y, currentColor, name || undefined, false, true);
    }
    closeDraft();
  };
  const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { e.stopPropagation(); closeDraft(); } };

  layer.addEventListener('click', onLayerClick);
  form.addEventListener('submit', onSubmit);
  form.addEventListener('click', (e) => e.stopPropagation());
  input.addEventListener('input', updateCounter);
  input.addEventListener('keydown', onKey);
  nameInput.addEventListener('keydown', onKey);

  // ---- Blobs -------------------------------------------------------------
  const blobs: Blob[] = [];
  let nextId = 1, t = 0, running = false, raf = 0, last = 0;

  function add(text: string, x?: number, y?: number, color?: string, name?: string, quiet = false, own = false, dbId?: number) {
    const W = container.clientWidth, H = container.clientHeight;
    const len = text.length;
    const r = Math.round(44 + Math.sqrt(len) * 6);
    const blobColor = color ?? currentColor;
    const textColor = textColorFor(blobColor);
    const size = Math.round(r * 2.4);
    const ang = rand(0, Math.PI * 2);

    const el = document.createElement('div');
    el.style.cssText = `position:absolute;left:0;top:0;width:${size}px;height:${size}px;will-change:transform;cursor:${own ? 'pointer' : 'default'};`;
    const svg = document.createElementNS(SVGNS, 'svg');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('width', String(size));
    svg.setAttribute('height', String(size));
    svg.setAttribute('viewBox', `0 0 ${size} ${size}`);
    svg.style.cssText = 'position:absolute;inset:0;overflow:visible;';
    const path = document.createElementNS(SVGNS, 'path');
    path.setAttribute('fill', blobColor);
    svg.appendChild(path);

    const textWrap = document.createElement('div');
    textWrap.style.cssText = `position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:${Math.round(r * 1.3)}px;display:flex;flex-direction:column;align-items:center;gap:3px;`;
    const textEl = document.createElement('p');
    textEl.textContent = text;
    const fs = len < 18 ? 16 : len < 44 ? 14 : 12;
    textEl.style.cssText = `margin:0;text-align:center;font-family:'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif;font-size:${fs}px;font-weight:500;line-height:1.25;overflow-wrap:anywhere;color:${textColor};user-select:none;`;
    textWrap.appendChild(textEl);
    let nameEl: HTMLSpanElement | null = null;
    if (name) {
      nameEl = document.createElement('span');
      nameEl.textContent = `— ${name}`;
      const nameColor = textColor === '#1E1E1E' ? 'rgba(30,30,30,0.55)' : 'rgba(248,248,248,0.65)';
      nameEl.style.cssText = `font-family:'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif;font-size:11px;font-weight:400;color:${nameColor};user-select:none;text-align:center;overflow-wrap:anywhere;`;
      textWrap.appendChild(nameEl);
    }
    el.append(svg, textWrap);
    layer.appendChild(el);

    const b: Blob = {
      id: nextId++, text, r,
      x: Math.min(W - r, Math.max(r, x ?? rand(r, W - r))),
      y: Math.min(H - r, Math.max(r, y ?? rand(r, H - r))),
      vx: quiet ? 0 : Math.cos(ang) * 0.6, vy: quiet ? 0 : Math.sin(ang) * 0.6,
      heading: ang, hf: rand(0.15, 0.4), hp: rand(0, 6.28),
      p1: rand(0, 6.28), p2: rand(0, 6.28), p3: rand(0, 6.28), sp: rand(0.7, 1.3),
      s: reduced ? 1 : 0, sv: 0, spawnAt: quiet ? t + blobs.length * 0.04 : 0, hover: false, color: blobColor,
      el, svg, path, size, textEl, nameEl, textWrap, own, dbId,
    };

    el.addEventListener('click', (e) => {
      e.stopPropagation();
      if (b.own) {
        editTarget = b;
        const currentName = b.nameEl?.textContent?.replace(/^— /, '') ?? '';
        openDraft(b.x, b.y, { text: b.text, name: currentName, color: b.color });
      }
    });
    el.addEventListener('mouseenter', () => { b.hover = true; el.style.zIndex = '40'; });
    el.addEventListener('mouseleave', () => { b.hover = false; el.style.zIndex = ''; });

    blobs.push(b);
    if (blobs.length > maxBlobs) blobs.shift()!.el.remove();
    if (!quiet) opts.onDrop?.({ id: b.id, text, name, x: b.x, y: b.y, color: blobColor });
    wake();
  }

  const shape = (b: Blob) => {
    const wob = reduced ? 0.3 : (opts.wobble ?? 0.5) * 2;
    const tt = t * b.sp, c = b.size / 2;
    const sp = Math.hypot(b.vx, b.vy), dir = Math.atan2(b.vy, b.vx);
    const stretch = Math.min(1, sp / 1.2) * 0.07 * wob;
    const P: { x: number; y: number }[] = [];
    for (let i = 0; i < PTS; i++) {
      const a = (i / PTS) * Math.PI * 2;
      const rr = b.r * (1
        + wob * (0.045 * Math.sin(2 * a + b.p1 + tt * 0.6) + 0.035 * Math.sin(3 * a + b.p2 - tt * 0.8) + 0.02 * Math.sin(5 * a + b.p3 + tt * 1.3))
        + stretch * Math.cos(2 * (a - dir)));
      P.push({ x: c + Math.cos(a) * rr, y: c + Math.sin(a) * rr });
    }
    const n = P.length;
    let d = `M${P[0].x.toFixed(1)} ${P[0].y.toFixed(1)}`;
    for (let k = 0; k < n; k++) {
      const p0 = P[(k - 1 + n) % n], p1 = P[k], p2 = P[(k + 1) % n], p3 = P[(k + 2) % n];
      d += `C${(p1.x + (p2.x - p0.x) / 6).toFixed(1)} ${(p1.y + (p2.y - p0.y) / 6).toFixed(1)} ` +
        `${(p2.x - (p3.x - p1.x) / 6).toFixed(1)} ${(p2.y - (p3.y - p1.y) / 6).toFixed(1)} ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
    }
    return d + 'Z';
  };

  const step = (now: number) => {
    const dt = Math.min(2.5, Math.max(0.1, (now - last) / 16.667));
    last = now;
    t += dt / 60;
    const W = container.clientWidth, H = container.clientHeight;
    const drift = reduced ? 0 : (opts.drift ?? 0.5);
    const maxSp = 0.25 + 1.1 * drift;

    for (const b of blobs) {
      if (!reduced && t >= b.spawnAt) { b.sv += ((1 - b.s) * 0.09 - b.sv * 0.18) * dt; b.s += b.sv * dt; }
      if (b.s >= 0.95) {
        b.heading += Math.sin(t * b.hf * 6.28 + b.hp) * 0.012 * dt;
        const acc = 0.012 * drift;
        b.vx += Math.cos(b.heading) * acc * dt;
        b.vy += Math.sin(b.heading) * acc * dt;
      }
      const m = 12;
      if (b.s >= 0.95) {
        if (b.x - b.r < m) b.vx += (m - (b.x - b.r)) * 0.004 * dt;
        if (b.x + b.r > W - m) b.vx -= (b.x + b.r - (W - m)) * 0.004 * dt;
        if (b.y - b.r < m) b.vy += (m - (b.y - b.r)) * 0.004 * dt;
        if (b.y + b.r > H - m) b.vy -= (b.y + b.r - (H - m)) * 0.004 * dt;
        if (b.x < b.r + 40 || b.x > W - b.r - 40 || b.y < b.r + 40 || b.y > H - b.r - 40) {
          const toC = Math.atan2(H / 2 - b.y, W / 2 - b.x);
          b.heading += Math.atan2(Math.sin(toC - b.heading), Math.cos(toC - b.heading)) * 0.02 * dt;
        }
      }
    }

    for (let i = 0; i < blobs.length; i++) {
      for (let j = i + 1; j < blobs.length; j++) {
        const A = blobs[i], B = blobs[j];
        if (A.s < 0.95 || B.s < 0.95) continue;
        const dx = B.x - A.x, dy = B.y - A.y, d = Math.hypot(dx, dy) || 0.01;
        const minD = (A.r * A.s + B.r * B.s) * 0.98 + 10;
        if (d < minD) {
          const push = (minD - d) * 0.006 * dt, nx = dx / d, ny = dy / d;
          A.vx -= nx * push; A.vy -= ny * push;
          B.vx += nx * push; B.vy += ny * push;
        }
      }
    }

    for (const b of blobs) {
      const sp = Math.hypot(b.vx, b.vy), cap = b.hover ? 0.04 : maxSp;
      if (sp > cap) {
        const f = 1 - Math.min(1, (b.hover ? 0.12 : 0.04) * dt);
        b.vx = b.vx * f + (b.vx / sp) * cap * (1 - f);
        b.vy = b.vy * f + (b.vy / sp) * cap * (1 - f);
      }
      if (reduced) { b.vx = 0; b.vy = 0; }
      b.x += b.vx * dt; b.y += b.vy * dt;
      b.path.setAttribute('d', shape(b));
      b.el.style.transform = `translate(${(b.x - b.size / 2).toFixed(1)}px, ${(b.y - b.size / 2).toFixed(1)}px) scale(${Math.max(0, b.s).toFixed(3)})`;
    }

    if (!blobs.length || reduced) running = false;
    if (running) raf = requestAnimationFrame(step);
  };

  function wake() {
    if (running) return;
    running = true;
    last = performance.now();
    raf = requestAnimationFrame(step);
  }

  const onVis = () => { if (document.hidden) { cancelAnimationFrame(raf); running = false; } else if (blobs.length) wake(); };
  document.addEventListener('visibilitychange', onVis);

  return {
    add,
    linkDbId(internalId: number, dbId: number) {
      const b = blobs.find(b => b.id === internalId)
      if (b) b.dbId = dbId
    },
    dispose() {
      cancelAnimationFrame(raf);
      running = false;
      document.removeEventListener('visibilitychange', onVis);
      layer.remove();
      form.remove();
    },
  };
}
