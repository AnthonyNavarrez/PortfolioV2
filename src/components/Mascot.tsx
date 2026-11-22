import { useEffect, useRef } from 'react'
import './Mascot.css'

const SVGNS = 'http://www.w3.org/2000/svg'
const PTS = 40
const rand = (a: number, b: number) => a + Math.random() * (b - a)
let savedColorIndex = 0

export default function Mascot() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const SIZE = 230
    const r = 84

    // Blob physics
    let x = SIZE / 2
    let y = SIZE / 2
    let vx = rand(-0.1, 0.1)
    let vy = rand(-0.1, 0.1)
    let heading = rand(0, Math.PI * 2)
    const hf = rand(0.15, 0.35)
    const hp = rand(0, 6.28)
    const p1 = rand(0, 6.28)
    const p2 = rand(0, 6.28)
    const p3 = rand(0, 6.28)
    const sp = rand(0.7, 1.3)
    let t = 0
    let last = 0
    let raf = 0
    let s = 0, sv = 0  // scale spring for pop-in
    let spawnDelay = 0.6  // seconds before pop-in starts

    // Smooth mouse position
    let mouseX = window.innerWidth * 0.75
    let mouseY = window.innerHeight * 0.15
    let smoothMouseX = mouseX
    let smoothMouseY = mouseY

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }
    window.addEventListener('mousemove', onMouseMove)

    // Speech bubble
    const messages = [
      'Welcome!',
      "Check out Anthony's cool projects",
      'Leave Anthony a nice message on the message tab',
      'Hi again!',
      "Oh you're still here?",
    ]
    let msgIndex = 0
    let wasHovered = false

    const bubble = document.createElement('div')
    bubble.textContent = messages[0]
    bubble.style.cssText = `
      position:absolute;
      background:#fff;
      color:#1e1e1e;
      font-family:'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif;
      font-size:14px;
      font-weight:500;
      padding:8px 14px;
      border-radius:12px;
      white-space:nowrap;
      pointer-events:none;
      box-shadow:0 4px 16px rgba(0,0,0,0.12);
      opacity:0;
      transform:translateY(4px);
      transition:opacity 0.2s ease,transform 0.2s ease;
    `
    // Tail triangle via pseudo — do it with a sibling element
    const tail = document.createElement('div')
    tail.style.cssText = `
      position:absolute;
      left:50%;
      top:-6px;
      transform:translateX(-50%);
      width:0;height:0;
      border-left:6px solid transparent;
      border-right:6px solid transparent;
      border-bottom:6px solid #fff;
      pointer-events:none;
    `
    bubble.appendChild(tail)
    container.appendChild(bubble)

    // Build SVG
    const svgEl = document.createElementNS(SVGNS, 'svg')
    svgEl.setAttribute('width', String(SIZE))
    svgEl.setAttribute('height', String(SIZE))
    svgEl.setAttribute('viewBox', `0 0 ${SIZE} ${SIZE}`)
    svgEl.style.cssText = 'position:absolute;top:0;left:0;overflow:visible;pointer-events:none;'

    // Color cycle on click
    const colors = ['#717171', '#D6F05A', '#FF6B6B', '#5B8DEF', '#FFB347', '#C084FC']
    let colorIndex = savedColorIndex

    // Blob body
    const blobPath = document.createElementNS(SVGNS, 'path')
    blobPath.setAttribute('fill', colors[savedColorIndex])
    blobPath.setAttribute('role', 'button')
    blobPath.setAttribute('aria-label', 'Change mascot color')
    blobPath.style.cssText = 'pointer-events:fill;cursor:pointer;transition:fill 0.3s ease;'
    blobPath.addEventListener('click', () => {
      colorIndex = (colorIndex + 1) % colors.length
      savedColorIndex = colorIndex
      blobPath.setAttribute('fill', colors[colorIndex])
    })
    svgEl.appendChild(blobPath)

    // Eye sizes scale with blob radius
    const eyeRx   = Math.round(r * 0.145)
    const eyeRy   = Math.round(r * 0.178)
    const pupilR  = Math.round(r * 0.078)

    const makeEye = () => {
      const g = document.createElementNS(SVGNS, 'g')
      const oval = document.createElementNS(SVGNS, 'ellipse')
      oval.setAttribute('rx', String(eyeRx))
      oval.setAttribute('ry', String(eyeRy))
      oval.setAttribute('fill', '#d8d8d8')
      const pupil = document.createElementNS(SVGNS, 'circle')
      pupil.setAttribute('r', String(pupilR))
      pupil.setAttribute('fill', '#1e1e1e')
      g.append(oval, pupil)
      return { g, pupil }
    }

    const { g: leftGroup,  pupil: leftPupil  } = makeEye()
    const { g: rightGroup, pupil: rightPupil } = makeEye()
    svgEl.append(leftGroup, rightGroup)
    container.appendChild(svgEl)

    const computeShape = () => {
      const tt = t * sp
      const c = SIZE / 2
      const speed = Math.hypot(vx, vy)
      const dir = Math.atan2(vy, vx)
      const wobble = 1.0
      const stretch = Math.min(1, speed / 1.2) * 0.07 * wobble
      const P: { x: number; y: number }[] = []
      for (let i = 0; i < PTS; i++) {
        const a = (i / PTS) * Math.PI * 2
        const rr = r * (1
          + wobble * (0.045 * Math.sin(2 * a + p1 + tt * 0.6) + 0.035 * Math.sin(3 * a + p2 - tt * 0.8) + 0.02 * Math.sin(5 * a + p3 + tt * 1.3))
          + stretch * Math.cos(2 * (a - dir)))
        P.push({ x: c + Math.cos(a) * rr, y: c + Math.sin(a) * rr })
      }
      const n = P.length
      let d = `M${P[0].x.toFixed(1)} ${P[0].y.toFixed(1)}`
      for (let k = 0; k < n; k++) {
        const p0 = P[(k - 1 + n) % n], p1pt = P[k], p2pt = P[(k + 1) % n], p3pt = P[(k + 2) % n]
        d += `C${(p1pt.x + (p2pt.x - p0.x) / 6).toFixed(1)} ${(p1pt.y + (p2pt.y - p0.y) / 6).toFixed(1)} ` +
          `${(p2pt.x - (p3pt.x - p1pt.x) / 6).toFixed(1)} ${(p2pt.y - (p3pt.y - p1pt.y) / 6).toFixed(1)} ${p2pt.x.toFixed(1)} ${p2pt.y.toFixed(1)}`
      }
      return d + 'Z'
    }

    const step = (now: number) => {
      const dt = Math.min(2.5, Math.max(0.1, (now - last) / 16.667))
      last = now
      t += dt / 60

      const W = container.clientWidth
      const H = container.clientHeight

      // Drift
      heading += Math.sin(t * hf * 6.28 + hp) * 0.006 * dt
      const acc = 0.012 * 0.15
      vx += Math.cos(heading) * acc * dt
      vy += Math.sin(heading) * acc * dt

      // Soft walls — keep blob inside container
      const margin = r * 0.6
      if (x - r < margin) vx += (margin - (x - r)) * 0.006 * dt
      if (x + r > W - margin) vx -= (x + r - (W - margin)) * 0.006 * dt
      if (y - r < margin) vy += (margin - (y - r)) * 0.006 * dt
      if (y + r > H - margin) vy -= (y + r - (H - margin)) * 0.006 * dt

      // Speed cap
      const maxSp = 0.18
      const spd = Math.hypot(vx, vy)
      if (spd > maxSp) { vx = (vx / spd) * maxSp; vy = (vy / spd) * maxSp }

      x += vx * dt
      y += vy * dt

      // Bouncy pop-in spring with delay
      if (spawnDelay > 0) { spawnDelay -= dt / 60; }
      else { sv += ((1 - s) * 0.12 - sv * 0.32) * dt }
      s  += sv * dt

      blobPath.setAttribute('d', computeShape())
      svgEl.style.transform = `translate(${(x - SIZE / 2).toFixed(1)}px,${(y - SIZE / 2).toFixed(1)}px) scale(${Math.max(0, s).toFixed(3)})`
      svgEl.style.transformOrigin = `${x.toFixed(1)}px ${y.toFixed(1)}px`

      // Smooth mouse
      smoothMouseX += (mouseX - smoothMouseX) * 0.08 * dt
      smoothMouseY += (mouseY - smoothMouseY) * 0.08 * dt

      const rect = container.getBoundingClientRect()

      // Hover detection: mouse within blob radius
      const localMx = mouseX - rect.left
      const localMy = mouseY - rect.top
      const hovered = s >= 0.95 && Math.hypot(localMx - x, localMy - y) < r * 1.05
      if (hovered && !wasHovered) {
        bubble.textContent = messages[msgIndex % messages.length]
        bubble.appendChild(tail)
        msgIndex++
      }
      wasHovered = hovered
      bubble.style.opacity = hovered ? '1' : '0'
      bubble.style.transform = hovered ? 'translateY(0)' : 'translateY(4px)'
      const bw = bubble.offsetWidth || 90
      bubble.style.left = `${(x - bw / 2).toFixed(0)}px`
      bubble.style.top  = `${(y + r + 12).toFixed(0)}px`

      // Eye positions relative to blob center (in SVG coords, center = SIZE/2)
      const eyeSpread = Math.round(r * 0.24)
      const eyeOffsets = [
        { ex: SIZE / 2 - eyeSpread, ey: SIZE / 2 + Math.round(r * 0.07), group: leftGroup,  pupil: leftPupil  },
        { ex: SIZE / 2 + eyeSpread, ey: SIZE / 2 + Math.round(r * 0.07), group: rightGroup, pupil: rightPupil },
      ]

      for (const { ex, ey, group, pupil } of eyeOffsets) {
        group.setAttribute('transform', `translate(${ex},${ey})`)

        // Eye center in page coords
        const pageEyeX = rect.left + x + (ex - SIZE / 2)
        const pageEyeY = rect.top  + y + (ey - SIZE / 2)
        const angle = Math.atan2(smoothMouseY - pageEyeY, smoothMouseX - pageEyeX)
        const dist = Math.min(1, Math.hypot(smoothMouseX - pageEyeX, smoothMouseY - pageEyeY) / 120)
        const offset = 5 * dist
        pupil.setAttribute('cx', (Math.cos(angle) * offset).toFixed(2))
        pupil.setAttribute('cy', (Math.sin(angle) * offset).toFixed(2))
      }

      raf = requestAnimationFrame(step)
    }

    last = performance.now()
    raf = requestAnimationFrame(step)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMouseMove)
      svgEl.remove()
      bubble.remove()
    }
  }, [])

  return <div ref={containerRef} className="mascot" aria-hidden="true" />
}
