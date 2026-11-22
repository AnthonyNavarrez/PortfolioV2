export interface StickyBlobOptions {
  stickiness?: number;
  jiggle?: number;
  color?: string;
  radius?: number;
  center?: { x: number; y: number };
  points?: number;
  /** Called every frame with the current path `d` string — use to drive clip-path or other effects. */
  onDraw?: (d: string) => void;
  /** When true, skips registering internal pointer-event listeners on the SVG.
   *  Drive the blob exclusively via the returned `setCursor`. */
  externalCursor?: boolean;
}

export interface StickyBlobHandle {
  destroy(): void;
  /** Push the current cursor position (in SVG viewBox coordinates), or null when cursor leaves. */
  setCursor(pt: { x: number; y: number } | null): void;
}

interface Vertex { rx: number; ry: number; dx: number; dy: number; vx: number; vy: number }
interface Pt { x: number; y: number }

export function createStickyBlob(svg: SVGSVGElement, opts: StickyBlobOptions = {}): StickyBlobHandle {
  const vb = svg.viewBox.baseVal;
  const W = vb && vb.width ? vb.width : svg.clientWidth;
  const H = vb && vb.height ? vb.height : svg.clientHeight;

  const stick = opts.stickiness ?? 0.7;
  const jig = opts.jiggle ?? 0.45;
  const N = opts.points ?? 72;
  const R = opts.radius ?? Math.min(W, H) * 0.27;
  const C = opts.center ?? { x: W / 2, y: H / 2 };

  const s = R / 190;
  const SIGMA = 58 * s;
  const REACH = 120 * s;
  const GRAB_DIST = 34 * s;
  const MAX_OFF = 150 * s;

  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('fill', opts.color ?? '#000');
  svg.appendChild(path);

  const v: Vertex[] = [];
  for (let i = 0; i < N; i++) {
    const a = (i / N) * Math.PI * 2;
    const r = R * (1 + 0.09 * Math.sin(2 * a + 0.7) + 0.06 * Math.sin(3 * a + 2.1) + 0.03 * Math.sin(5 * a + 0.4));
    v.push({ rx: C.x + Math.cos(a) * r, ry: C.y + Math.sin(a) * r, dx: 0, dy: 0, vx: 0, vy: 0 });
  }

  let cur: Pt | null = null;
  let pcur: Pt | null = null;
  let cvx = 0, cvy = 0;
  let grabbed = false;
  let running = false;
  let raf = 0;
  let last = 0;

  const toLocal = (e: PointerEvent): Pt => {
    const ctm = svg.getScreenCTM();
    if (!ctm) return { x: 0, y: 0 };
    const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(ctm.inverse());
    return { x: p.x, y: p.y };
  };

  const edgeDist = (p: Pt) => {
    let m = Infinity;
    for (const q of v) m = Math.min(m, Math.hypot(q.rx - p.x, q.ry - p.y));
    return m;
  };

  const inside = (p: Pt) => {
    let c = false;
    for (let i = 0, j = v.length - 1; i < v.length; j = i++) {
      const { rx: xi, ry: yi } = v[i], { rx: xj, ry: yj } = v[j];
      if ((yi > p.y) !== (yj > p.y) && p.x < ((xj - xi) * (p.y - yi)) / (yj - yi) + xi) c = !c;
    }
    return c;
  };

  const poke = (p: Pt, strength: number) => {
    if (reduced) return;
    for (const q of v) {
      const d = Math.hypot(q.rx - p.x, q.ry - p.y);
      const w = Math.exp(-(d * d) / (2 * SIGMA * SIGMA));
      const nx = q.rx - C.x, ny = q.ry - C.y, nl = Math.hypot(nx, ny) || 1;
      q.vx += (nx / nl) * strength * w * s;
      q.vy += (ny / nl) * strength * w * s;
    }
  };

  const buildPath = () => {
    const n = v.length;
    const P = v.map((q) => ({ x: q.rx + q.dx, y: q.ry + q.dy }));
    let d = `M${P[0].x.toFixed(1)} ${P[0].y.toFixed(1)}`;
    for (let k = 0; k < n; k++) {
      const p0 = P[(k - 1 + n) % n], p1 = P[k], p2 = P[(k + 1) % n], p3 = P[(k + 2) % n];
      d += `C${(p1.x + (p2.x - p0.x) / 6).toFixed(1)} ${(p1.y + (p2.y - p0.y) / 6).toFixed(1)} ` +
        `${(p2.x - (p3.x - p1.x) / 6).toFixed(1)} ${(p2.y - (p3.y - p1.y) / 6).toFixed(1)} ` +
        `${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
    }
    path.setAttribute('d', d + 'Z');
    opts.onDraw?.(d + 'Z');
  };

  const step = (now: number) => {
    const dt = Math.min(2.5, Math.max(0.1, (now - last) / 16.667));
    last = now;

    const k = 0.05 + 0.03 * (1 - jig);
    const damp = reduced ? 0.6 : 0.05 + 0.16 * (1 - jig);
    const kn = 0.22;

    if (cur && pcur) {
      cvx += ((cur.x - pcur.x) / dt - cvx) * 0.35;
      cvy += ((cur.y - pcur.y) / dt - cvy) * 0.35;
    } else { cvx *= 0.8; cvy *= 0.8; }
    pcur = cur ? { ...cur } : null;

    const was = grabbed;
    if (cur) {
      const release = REACH * (0.7 + 0.8 * stick);
      grabbed = inside(cur) || edgeDist(cur) < (grabbed ? release : GRAB_DIST);
    } else grabbed = false;
    if (grabbed && !was && cur) poke(cur, -2.2 * (0.4 + jig));
    if (!grabbed && was) poke(pcur ?? C, 1.2 * (0.4 + jig));

    for (let i = 0; i < v.length; i++) {
      const q = v[i], a = v[(i - 1 + v.length) % v.length], b = v[(i + 1) % v.length];
      let ax = -k * q.dx - damp * q.vx + kn * ((a.dx + b.dx) / 2 - q.dx);
      let ay = -k * q.dy - damp * q.vy + kn * ((a.dy + b.dy) / 2 - q.dy);
      if (grabbed && cur) {
        const ex = cur.x - q.rx, ey = cur.y - q.ry, d = Math.hypot(ex, ey);
        const w = Math.exp(-(d * d) / (2 * SIGMA * SIGMA));
        const pull = 0.35 + 0.55 * stick;
        ax += 0.22 * (ex * pull - q.dx) * w;
        ay += 0.22 * (ey * pull - q.dy) * w;
        if (!reduced) { ax += cvx * 0.06 * w * jig; ay += cvy * 0.06 * w * jig; }
      }
      q.vx += ax * dt; q.vy += ay * dt;
    }

    let energy = 0;
    for (const q of v) {
      q.dx += q.vx * dt; q.dy += q.vy * dt;
      const m = Math.hypot(q.dx, q.dy);
      if (m > MAX_OFF) { q.dx *= MAX_OFF / m; q.dy *= MAX_OFF / m; }
      energy = Math.max(energy, Math.abs(q.dx), Math.abs(q.dy), Math.abs(q.vx) * 8, Math.abs(q.vy) * 8);
    }

    if (!cur && !grabbed && energy < 0.05 * s) {
      for (const q of v) { q.dx = q.dy = q.vx = q.vy = 0; }
      running = false;
    }

    buildPath();
    if (running) raf = requestAnimationFrame(step);
  };

  const wake = () => {
    if (running) return;
    running = true;
    last = performance.now();
    raf = requestAnimationFrame(step);
  };

  const onMove = (e: PointerEvent) => { cur = toLocal(e); wake(); };
  const onLeave = () => { cur = null; wake(); };

  if (!opts.externalCursor) {
    svg.addEventListener('pointerenter', onMove);
    svg.addEventListener('pointermove', onMove);
    svg.addEventListener('pointerleave', onLeave);
  }
  buildPath();

  return {
    destroy() {
      cancelAnimationFrame(raf);
      running = false;
      svg.removeEventListener('pointerenter', onMove);
      svg.removeEventListener('pointermove', onMove);
      svg.removeEventListener('pointerleave', onLeave);
      path.remove();
    },
    setCursor(pt) {
      cur = pt;
      wake();
    },
  };
}
