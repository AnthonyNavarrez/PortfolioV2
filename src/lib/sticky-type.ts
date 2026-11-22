/**
 * Sticky Puddle type — reference implementation.
 *
 * Renders a word in the Puddle typeface as live SVG outlines. At rest the
 * letters are perfectly still. When the pointer touches a letter, its edge
 * dents in, clings to the cursor and stretches with it; pull away and it
 * releases, springs back with one soft bounce, then the loop stops.
 *
 * Outlines come from puddle-glyphs.json (baked from Puddle-Regular.otf by
 * scripts/extract-puddle-glyphs.mjs). Framework-agnostic: pass an <svg> with a
 * viewBox; the word is laid out to fit it. Returns a cleanup function.
 * Tuned values match the approved Design canvas artboard.
 */

export interface PuddleGlyphData {
  /** Units per em (1000). */
  upm: number;
  /** Per character: advance width and closed contours as flat [x0,y0,x1,y1,…] in font units, y pointing DOWN, baseline at 0. */
  g: Record<string, { w: number; c: number[][] }>;
}

export interface StickyTypeOptions {
  text: string;
  glyphs: PuddleGlyphData;
  /** 0–1. How hard edges cling and how far they stretch before letting go. */
  stickiness?: number;
  /** 0–1. Wobble amount. Approved value: 0.25 ("less wobbly"). */
  jiggle?: number;
  color?: string;
  /** Horizontal padding inside the viewBox. */
  padding?: number;
  /** Max cap height in viewBox units (keeps short words from getting huge). */
  maxCapHeight?: number;
}

interface Vertex { rx: number; ry: number; dx: number; dy: number; vx: number; vy: number; nx: number; ny: number }
interface Glyph { minx: number; maxx: number; miny: number; maxy: number; cs: Vertex[][] }
interface Pt { x: number; y: number }

const CAP = 720;       // Puddle cap height in font units
const SPACE = 260;     // word-space advance in font units
const REF_SCALE = 0.31; // the font-unit → px scale the constants were tuned at (~223px cap height)

export function createStickyType(svg: SVGSVGElement, opts: StickyTypeOptions): () => void {
  const vb = svg.viewBox.baseVal;
  const W = vb && vb.width ? vb.width : svg.clientWidth;
  const H = vb && vb.height ? vb.height : svg.clientHeight;
  const stick = opts.stickiness ?? 0.7;
  const jig = opts.jiggle ?? 0.25;
  const pad = opts.padding ?? W * 0.075;
  const maxCap = opts.maxCapHeight ?? H * 0.42;
  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
  const f = opts.glyphs;

  // ---- Layout ----------------------------------------------------------
  // Puddle is unicase: lowercase renders as caps. Unsupported characters are dropped.
  let chars = opts.text.toUpperCase().split('').filter((ch) => ch === ' ' || f.g[ch]);
  if (!chars.length) chars = 'PUDDLE'.split('');
  const width = chars.reduce((sum, ch) => sum + (ch === ' ' ? SPACE : f.g[ch].w), 0);
  const sc = Math.min((W - 2 * pad) / width, maxCap / CAP);
  const s = sc / REF_SCALE; // scales all distance constants with the type size
  let x = (W - width * sc) / 2;
  const base = H / 2 + (CAP * sc) / 2 - 8 * s;

  const glyphs: Glyph[] = [];
  const contours: Vertex[][] = [];
  for (const ch of chars) {
    if (ch === ' ') { x += SPACE * sc; continue; }
    const g = f.g[ch];
    const gl: Glyph = { minx: Infinity, maxx: -Infinity, miny: Infinity, maxy: -Infinity, cs: [] };
    for (const src of g.c) {
      const verts: Vertex[] = [];
      for (let p = 0; p < src.length; p += 2) {
        const rx = x + src[p] * sc, ry = base + src[p + 1] * sc;
        verts.push({ rx, ry, dx: 0, dy: 0, vx: 0, vy: 0, nx: 0, ny: 0 });
        gl.minx = Math.min(gl.minx, rx); gl.maxx = Math.max(gl.maxx, rx);
        gl.miny = Math.min(gl.miny, ry); gl.maxy = Math.max(gl.maxy, ry);
      }
      contours.push(verts); gl.cs.push(verts);
    }
    glyphs.push(gl);
    x += g.w * sc;
  }

  // ---- Outward-from-ink normals ----------------------------------------
  // Font holes wind opposite to outer contours, so one rotation direction (calibrated on
  // the largest contour) points "away from ink" for both outer edges and counters.
  {
    let big = contours[0], bigA = 0;
    for (const c of contours) {
      let a = 0;
      for (let i = 0; i < c.length; i++) { const j = (i + 1) % c.length; a += c[i].rx * c[j].ry - c[j].rx * c[i].ry; }
      if (Math.abs(a) > Math.abs(bigA)) { bigA = a; big = c; }
    }
    let cx = 0, cy = 0;
    for (const q of big) { cx += q.rx; cy += q.ry; }
    cx /= big.length; cy /= big.length;
    let dot = 0;
    for (let i = 0; i < big.length; i++) {
      const a = big[(i - 1 + big.length) % big.length], b = big[(i + 1) % big.length];
      dot += (b.ry - a.ry) * (big[i].rx - cx) - (b.rx - a.rx) * (big[i].ry - cy);
    }
    const sign = dot >= 0 ? 1 : -1;
    for (const c of contours) {
      for (let i = 0; i < c.length; i++) {
        const a = c[(i - 1 + c.length) % c.length], b = c[(i + 1) % c.length];
        const nx = (b.ry - a.ry) * sign, ny = -(b.rx - a.rx) * sign, l = Math.hypot(nx, ny) || 1;
        c[i].nx = nx / l; c[i].ny = ny / l;
      }
    }
  }

  // ---- Constants (tuned at REF_SCALE, scaled by s) ----------------------
  const SIGMA = 42 * s;   // gaussian falloff of the touch along the outline
  const REACH = 90 * s;   // pull distance before the ink lets go (× stickiness factor)
  const GRAB = 22 * s;    // how close to an edge counts as touching
  const MAX_OFF = 80 * s; // displacement cap (no tearing)

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('fill', opts.color ?? '#1E1E1E');
  path.setAttribute('fill-rule', 'nonzero');
  svg.appendChild(path);

  let cur: Pt | null = null, pcur: Pt | null = null;
  let cvx = 0, cvy = 0, grabbed = false, running = false, raf = 0, last = 0;

  const toLocal = (e: PointerEvent): Pt => {
    const ctm = svg.getScreenCTM();
    if (!ctm) return { x: 0, y: 0 };
    const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(ctm.inverse());
    return { x: p.x, y: p.y };
  };

  const insideAny = (p: Pt) => {
    for (const gl of glyphs) {
      if (p.x < gl.minx || p.x > gl.maxx || p.y < gl.miny || p.y > gl.maxy) continue;
      let hit = false; // even-odd across the glyph's contours (counters are holes)
      for (const v of gl.cs) {
        for (let i = 0, j = v.length - 1; i < v.length; j = i++) {
          if ((v[i].ry > p.y) !== (v[j].ry > p.y) &&
            p.x < ((v[j].rx - v[i].rx) * (p.y - v[i].ry)) / (v[j].ry - v[i].ry) + v[i].rx) hit = !hit;
        }
      }
      if (hit) return true;
    }
    return false;
  };

  const edgeDist = (p: Pt, reach: number) => {
    let m = Infinity;
    for (const gl of glyphs) {
      if (p.x < gl.minx - reach || p.x > gl.maxx + reach || p.y < gl.miny - reach || p.y > gl.maxy + reach) continue;
      for (const v of gl.cs) for (const q of v) m = Math.min(m, Math.hypot(q.rx - p.x, q.ry - p.y));
    }
    return m;
  };

  /** Impulse along outline normals. Negative = dent into the ink (touch), positive = push out (release). */
  const poke = (p: Pt, strength: number) => {
    if (reduced) return;
    for (const v of contours) for (const q of v) {
      const d = Math.hypot(q.rx - p.x, q.ry - p.y);
      const w = Math.exp(-(d * d) / (2 * SIGMA * SIGMA));
      q.vx += q.nx * strength * w * s;
      q.vy += q.ny * strength * w * s;
    }
  };

  const buildPath = () => {
    let d = '';
    for (const v of contours) {
      const n = v.length;
      const P = v.map((q) => ({ x: q.rx + q.dx, y: q.ry + q.dy }));
      d += `M${P[0].x.toFixed(1)} ${P[0].y.toFixed(1)}`;
      for (let k = 0; k < n; k++) { // closed Catmull-Rom → cubic Bézier
        const p0 = P[(k - 1 + n) % n], p1 = P[k], p2 = P[(k + 1) % n], p3 = P[(k + 2) % n];
        d += `C${(p1.x + (p2.x - p0.x) / 6).toFixed(1)} ${(p1.y + (p2.y - p0.y) / 6).toFixed(1)} ` +
          `${(p2.x - (p3.x - p1.x) / 6).toFixed(1)} ${(p2.y - (p3.y - p1.y) / 6).toFixed(1)} ` +
          `${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
      }
      d += 'Z';
    }
    path.setAttribute('d', d);
  };

  const step = (now: number) => {
    const dt = Math.min(2.5, Math.max(0.1, (now - last) / 16.667)); // in 60fps frames
    last = now;
    const k = 0.05 + 0.03 * (1 - jig);                      // spring to rest
    const damp = reduced ? 0.6 : 0.08 + 0.2 * (1 - jig);    // ≈ one soft bounce at jiggle 0.25
    const kn = 0.22;                                        // neighbour coupling → ripples travel
    const pull = 0.35 + 0.55 * stick;

    if (cur && pcur) {
      cvx += ((cur.x - pcur.x) / dt - cvx) * 0.35;
      cvy += ((cur.y - pcur.y) / dt - cvy) * 0.35;
    } else { cvx *= 0.8; cvy *= 0.8; }
    pcur = cur ? { ...cur } : null;

    // Grab with hysteresis: latch on at the edge, only let go after pulling well away.
    const was = grabbed;
    if (cur) {
      const release = REACH * (0.7 + 0.8 * stick);
      grabbed = insideAny(cur) || edgeDist(cur, release) < (grabbed ? release : GRAB);
    } else grabbed = false;
    if (grabbed && !was && cur) poke(cur, -2.2 * (0.4 + jig));
    if (!grabbed && was && pcur) poke(pcur, 1.2 * (0.4 + jig));

    let energy = 0;
    for (const v of contours) {
      const n = v.length;
      for (let i = 0; i < n; i++) {
        const q = v[i], a = v[(i - 1 + n) % n], b = v[(i + 1) % n];
        let ax = -k * q.dx - damp * q.vx + kn * ((a.dx + b.dx) / 2 - q.dx);
        let ay = -k * q.dy - damp * q.vy + kn * ((a.dy + b.dy) / 2 - q.dy);
        if (grabbed && cur) {
          const ex = cur.x - q.rx, ey = cur.y - q.ry, d2 = ex * ex + ey * ey;
          if (d2 < 9 * SIGMA * SIGMA) { // skip vertices beyond 3σ
            const w = Math.exp(-d2 / (2 * SIGMA * SIGMA));
            ax += 0.22 * (ex * pull - q.dx) * w;
            ay += 0.22 * (ey * pull - q.dy) * w;
            if (!reduced) { ax += cvx * 0.06 * w * jig; ay += cvy * 0.06 * w * jig; }
          }
        }
        q.vx += ax * dt; q.vy += ay * dt;
      }
      for (const q of v) {
        q.dx += q.vx * dt; q.dy += q.vy * dt;
        const m = Math.hypot(q.dx, q.dy);
        if (m > MAX_OFF) { q.dx *= MAX_OFF / m; q.dy *= MAX_OFF / m; }
        energy = Math.max(energy, Math.abs(q.dx), Math.abs(q.dy), Math.abs(q.vx) * 8, Math.abs(q.vy) * 8);
      }
    }

    // At rest: snap exactly to the outlines and stop (zero idle CPU).
    if (!cur && !grabbed && energy < 0.05 * s) {
      for (const v of contours) for (const q of v) { q.dx = q.dy = q.vx = q.vy = 0; }
      running = false;
    }

    buildPath();
    svg.style.cursor = grabbed ? 'grabbing' : '';
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

  svg.addEventListener('pointerenter', onMove);
  svg.addEventListener('pointermove', onMove);
  svg.addEventListener('pointerleave', onLeave);
  buildPath();

  return () => {
    cancelAnimationFrame(raf);
    running = false;
    svg.removeEventListener('pointerenter', onMove);
    svg.removeEventListener('pointermove', onMove);
    svg.removeEventListener('pointerleave', onLeave);
    path.remove();
  };
}
