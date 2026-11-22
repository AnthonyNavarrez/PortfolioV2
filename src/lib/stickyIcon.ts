/**
 * Sticky-ink physics for the A icon.
 * Uses pre-sampled outline data (two layers: shadow + front).
 * Shadow trails the front with softer spring, lighter damping and weaker pull.
 * Constants tuned at 440px tall; scaled linearly by (iconHeight / 440).
 */

export interface AIconOutlines {
  w: number
  h: number
  layers: Array<{ fill: string; c: number[][] }>
}

export interface StickyIconOptions {
  outlines: AIconOutlines
  stickiness?: number
  jiggle?: number
  /** 0–1. How far the shadow trails the front. Approved: 0.5. */
  lag?: number
  /** Override layer colors: [shadow, front]. */
  colors?: [string, string]
  /** Icon height in viewBox units, for physics scaling. Defaults to outlines.h. */
  height?: number
}

interface Vertex { rx: number; ry: number; dx: number; dy: number; vx: number; vy: number; nx: number; ny: number }
interface Pt { x: number; y: number }

function computeNormals(all: Vertex[][]): void {
  let big = all[0], bigA = 0
  for (const c of all) {
    let a = 0
    for (let i = 0; i < c.length; i++) {
      const j = (i + 1) % c.length
      a += c[i].rx * c[j].ry - c[j].rx * c[i].ry
    }
    if (Math.abs(a) > Math.abs(bigA)) { bigA = a; big = c }
  }
  let cx = 0, cy = 0
  for (const q of big) { cx += q.rx; cy += q.ry }
  cx /= big.length; cy /= big.length
  let dot = 0
  for (let i = 0; i < big.length; i++) {
    const a = big[(i - 1 + big.length) % big.length], b = big[(i + 1) % big.length]
    dot += (b.ry - a.ry) * (big[i].rx - cx) - (b.rx - a.rx) * (big[i].ry - cy)
  }
  const sign = dot >= 0 ? 1 : -1
  for (const c of all) {
    for (let i = 0; i < c.length; i++) {
      const a = c[(i - 1 + c.length) % c.length], b = c[(i + 1) % c.length]
      const nx = (b.ry - a.ry) * sign, ny = -(b.rx - a.rx) * sign, l = Math.hypot(nx, ny) || 1
      c[i].nx = nx / l; c[i].ny = ny / l
    }
  }
}

function buildPath(contours: Vertex[][]): string {
  let d = ''
  for (const v of contours) {
    const n = v.length
    const P = v.map(q => ({ x: q.rx + q.dx, y: q.ry + q.dy }))
    d += `M${P[0].x.toFixed(1)} ${P[0].y.toFixed(1)}`
    for (let k = 0; k < n; k++) {
      const p0 = P[(k - 1 + n) % n], p1 = P[k], p2 = P[(k + 1) % n], p3 = P[(k + 2) % n]
      d +=
        `C${(p1.x + (p2.x - p0.x) / 6).toFixed(1)} ${(p1.y + (p2.y - p0.y) / 6).toFixed(1)} ` +
        `${(p2.x - (p3.x - p1.x) / 6).toFixed(1)} ${(p2.y - (p3.y - p1.y) / 6).toFixed(1)} ` +
        `${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`
    }
    d += 'Z'
  }
  return d
}

export function createStickyIcon(svg: SVGSVGElement, opts: StickyIconOptions): () => void {
  const { outlines } = opts
  const jig   = opts.jiggle    ?? 0.25
  const stick = opts.stickiness ?? 0.7
  const lag   = opts.lag        ?? 0.5
  const iconH = opts.height     ?? outlines.h
  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false

  // Scale physics to icon size (constants tuned at 440px tall)
  const s = iconH / 440

  const SIGMA   = 50  * s
  const GRAB    = 26  * s
  const REACH   = 100 * s
  const MAX_OFF = 100 * s

  // Build layer structs: contours + path element (back to front = shadow, front)
  const layerData = outlines.layers.map((layer, li) => {
    const contours: Vertex[][] = layer.c.map(flat => {
      const verts: Vertex[] = []
      for (let i = 0; i < flat.length; i += 2)
        verts.push({ rx: flat[i], ry: flat[i + 1], dx: 0, dy: 0, vx: 0, vy: 0, nx: 0, ny: 0 })
      return verts
    })
    computeNormals(contours)

    const pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    pathEl.setAttribute('fill', opts.colors?.[li] ?? layer.fill)
    pathEl.setAttribute('fill-rule', 'nonzero')
    svg.appendChild(pathEl)

    const allVerts = contours.flat()
    return {
      contours, pathEl,
      minx: Math.min(...allVerts.map(v => v.rx)),
      maxx: Math.max(...allVerts.map(v => v.rx)),
      miny: Math.min(...allVerts.map(v => v.ry)),
      maxy: Math.max(...allVerts.map(v => v.ry)),
    }
  })

  const insideAny = (p: Pt) => {
    for (const { contours, minx, maxx, miny, maxy } of layerData) {
      if (p.x < minx || p.x > maxx || p.y < miny || p.y > maxy) continue
      let hit = false
      for (const v of contours) {
        for (let i = 0, j = v.length - 1; i < v.length; j = i++) {
          if ((v[i].ry > p.y) !== (v[j].ry > p.y) &&
            p.x < ((v[j].rx - v[i].rx) * (p.y - v[i].ry)) / (v[j].ry - v[i].ry) + v[i].rx)
            hit = !hit
        }
      }
      if (hit) return true
    }
    return false
  }

  const edgeDist = (p: Pt, reach: number) => {
    let m = Infinity
    for (const { contours, minx, maxx, miny, maxy } of layerData) {
      if (p.x < minx - reach || p.x > maxx + reach || p.y < miny - reach || p.y > maxy + reach) continue
      for (const v of contours) for (const q of v) m = Math.min(m, Math.hypot(q.rx - p.x, q.ry - p.y))
    }
    return m
  }

  const poke = (p: Pt, strength: number) => {
    if (reduced) return
    layerData.forEach(({ contours }, li) => {
      const str = li === 0 ? strength * 0.7 : strength
      for (const v of contours) for (const q of v) {
        const d = Math.hypot(q.rx - p.x, q.ry - p.y)
        const w = Math.exp(-(d * d) / (2 * SIGMA * SIGMA))
        q.vx += q.nx * str * w * s
        q.vy += q.ny * str * w * s
      }
    })
  }

  let cur: Pt | null = null, pcur: Pt | null = null
  let cvx = 0, cvy = 0, grabbed = false, running = false, raf = 0, last = 0

  const toLocal = (e: PointerEvent): Pt => {
    const m = svg.getScreenCTM()
    if (!m) return { x: 0, y: 0 }
    const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(m.inverse())
    return { x: p.x, y: p.y }
  }

  const step = (now: number) => {
    const dt = Math.min(2.5, Math.max(0.1, (now - last) / 16.667))
    last = now

    if (cur && pcur) {
      cvx += ((cur.x - pcur.x) / dt - cvx) * 0.35
      cvy += ((cur.y - pcur.y) / dt - cvy) * 0.35
    } else { cvx *= 0.8; cvy *= 0.8 }
    pcur = cur ? { ...cur } : null

    const was = grabbed
    if (cur) {
      const release = REACH * (0.7 + 0.8 * stick)
      grabbed = insideAny(cur) || edgeDist(cur, release) < (grabbed ? release : GRAB)
    } else grabbed = false
    if (grabbed && !was && cur) poke(cur, -2.2 * (0.4 + jig))
    if (!grabbed && was && pcur) poke(pcur, 1.2 * (0.4 + jig))

    let energy = 0

    layerData.forEach(({ contours }, li) => {
      const isShadow = li === 0
      const kBase    = 0.05 + 0.03 * (1 - jig)
      const dampBase = reduced ? 0.6 : 0.08 + 0.2 * (1 - jig)
      const pullBase = 0.35 + 0.55 * stick
      const k_l    = kBase    * (isShadow ? 1 - 0.55 * lag : 1)
      const damp_l = dampBase * (isShadow ? 1 - 0.35 * lag : 1)
      const pull_l = pullBase * (isShadow ? 1 - 0.3  * lag : 1)
      const gain_l = 0.22     * (isShadow ? 1 - 0.6  * lag : 1)
      const kn = 0.22

      for (const v of contours) {
        const n = v.length
        for (let i = 0; i < n; i++) {
          const q = v[i], a = v[(i - 1 + n) % n], b = v[(i + 1) % n]
          let ax = -k_l * q.dx - damp_l * q.vx + kn * ((a.dx + b.dx) / 2 - q.dx)
          let ay = -k_l * q.dy - damp_l * q.vy + kn * ((a.dy + b.dy) / 2 - q.dy)
          if (grabbed && cur) {
            const ex = cur.x - q.rx, ey = cur.y - q.ry, d2 = ex * ex + ey * ey
            if (d2 < 9 * SIGMA * SIGMA) {
              const w = Math.exp(-d2 / (2 * SIGMA * SIGMA))
              ax += gain_l * (ex * pull_l - q.dx) * w
              ay += gain_l * (ey * pull_l - q.dy) * w
              if (!reduced) { ax += cvx * 0.06 * w * jig; ay += cvy * 0.06 * w * jig }
            }
          }
          q.vx += ax * dt; q.vy += ay * dt
        }
        for (const q of v) {
          q.dx += q.vx * dt; q.dy += q.vy * dt
          const m = Math.hypot(q.dx, q.dy)
          if (m > MAX_OFF) { q.dx *= MAX_OFF / m; q.dy *= MAX_OFF / m }
          energy = Math.max(energy, Math.abs(q.dx), Math.abs(q.dy), Math.abs(q.vx) * 8, Math.abs(q.vy) * 8)
        }
      }
    })

    if (!cur && !grabbed && energy < 0.05 * s) {
      for (const { contours } of layerData) for (const v of contours) for (const q of v) { q.dx = q.dy = q.vx = q.vy = 0 }
      running = false
    }

    for (const { contours, pathEl } of layerData) pathEl.setAttribute('d', buildPath(contours))
    svg.style.cursor = grabbed ? 'grabbing' : ''
    if (running) raf = requestAnimationFrame(step)
  }

  const wake = () => {
    if (running) return
    running = true
    last = performance.now()
    raf = requestAnimationFrame(step)
  }

  const onMove  = (e: PointerEvent) => { cur = toLocal(e); wake() }
  const onLeave = () => { cur = null; wake() }

  svg.addEventListener('pointerenter', onMove)
  svg.addEventListener('pointermove', onMove)
  svg.addEventListener('pointerleave', onLeave)

  for (const { contours, pathEl } of layerData) pathEl.setAttribute('d', buildPath(contours))

  return () => {
    cancelAnimationFrame(raf)
    running = false
    svg.removeEventListener('pointerenter', onMove)
    svg.removeEventListener('pointermove', onMove)
    svg.removeEventListener('pointerleave', onLeave)
    for (const { pathEl } of layerData) pathEl.remove()
  }
}
