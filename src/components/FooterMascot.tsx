import { useEffect, useRef } from 'react'

const SVGNS = 'http://www.w3.org/2000/svg'
const PTS = 40
const rand = (a: number, b: number) => a + Math.random() * (b - a)

const MESSAGES = [
  "Anthony is always looking forward to connecting!",
  "Message Anthony about anything!",
  "Anthony is waiting for you to reach out!",
]

export default function FooterMascot({ color = '#717171' }: { color?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const SIZE = 460
    const r = 168
    const cx = SIZE / 2
    const cy = SIZE / 2

    const p1 = rand(0, 6.28)
    const p2 = rand(0, 6.28)
    const p3 = rand(0, 6.28)
    const sp = rand(0.7, 1.3)
    let t = 0, last = 0, raf = 0
    let s = 0, sv = 0

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let smoothMouseX = mouseX
    let smoothMouseY = mouseY

    const onMouseMove = (e: MouseEvent) => { mouseX = e.clientX; mouseY = e.clientY }
    window.addEventListener('mousemove', onMouseMove)

    let msgIndex = 0
    let wasHovered = false

    // Append bubble to the footer so it isn't clipped by overflow:hidden on the mascot container
    const footerEl = container.closest('.v4-footer') as HTMLElement | null
    const bubbleParent = footerEl ?? container

    const bubble = document.createElement('div')
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
      z-index:20;
    `
    // Tail points up — bubble sits below the visible mascot
    const tail = document.createElement('div')
    tail.style.cssText = `
      position:absolute;
      left:50%;top:-6px;
      transform:translateX(-50%);
      width:0;height:0;
      border-left:6px solid transparent;
      border-right:6px solid transparent;
      border-bottom:6px solid #fff;
      pointer-events:none;
    `
    bubble.appendChild(tail)
    bubbleParent.appendChild(bubble)

    const svgEl = document.createElementNS(SVGNS, 'svg')
    svgEl.setAttribute('width', String(SIZE))
    svgEl.setAttribute('height', String(SIZE))
    svgEl.setAttribute('viewBox', `0 0 ${SIZE} ${SIZE}`)
    svgEl.style.cssText = 'position:absolute;top:0;left:0;overflow:visible;pointer-events:none;'

    const blobPath = document.createElementNS(SVGNS, 'path')
    blobPath.setAttribute('fill', color)
    blobPath.style.cssText = 'pointer-events:fill;'
    svgEl.appendChild(blobPath)

    const eyeRx  = Math.round(r * 0.145)
    const eyeRy  = Math.round(r * 0.178)
    const pupilR = Math.round(r * 0.078)

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
      const P: { x: number; y: number }[] = []
      for (let i = 0; i < PTS; i++) {
        const a = (i / PTS) * Math.PI * 2
        const rr = r * (1
          + 0.045 * Math.sin(2 * a + p1 + tt * 0.6)
          + 0.035 * Math.sin(3 * a + p2 - tt * 0.8)
          + 0.02  * Math.sin(5 * a + p3 + tt * 1.3))
        P.push({ x: cx + Math.cos(a) * rr, y: cy + Math.sin(a) * rr })
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

      sv += ((1 - s) * 0.12 - sv * 0.32) * dt
      s  += sv * dt

      blobPath.setAttribute('d', computeShape())
      svgEl.style.transform = `scale(${Math.max(0, s).toFixed(3)})`
      svgEl.style.transformOrigin = `${cx}px ${cy}px`

      smoothMouseX += (mouseX - smoothMouseX) * 0.08 * dt
      smoothMouseY += (mouseY - smoothMouseY) * 0.08 * dt

      const rect = container.getBoundingClientRect()
      const localMx = mouseX - rect.left
      const localMy = mouseY - rect.top
      const hovered = s >= 0.95 && Math.hypot(localMx - cx, localMy - cy) < r * 1.05

      if (hovered && !wasHovered) {
        bubble.textContent = MESSAGES[msgIndex % MESSAGES.length]
        bubble.appendChild(tail)
        msgIndex++
      }
      wasHovered = hovered
      bubble.style.opacity = hovered ? '1' : '0'
      bubble.style.transform = hovered ? 'translateY(0)' : 'translateY(4px)'

      // Position bubble relative to bubbleParent — below the visible blob, inside the footer
      const bw = bubble.offsetWidth || 150
      const bh = bubble.offsetHeight || 40
      const parentRect = bubbleParent.getBoundingClientRect()
      // Center X on the mascot, Y just below the blob bottom
      const bubbleCx = rect.left - parentRect.left + cx
      const bubbleY  = rect.top  - parentRect.top  + cy + r + 14
      bubble.style.left = `${(bubbleCx - bw / 2).toFixed(0)}px`
      bubble.style.top  = `${bubbleY.toFixed(0)}px`

      const eyeSpread = Math.round(r * 0.24)
      const eyeOffsets = [
        { ex: SIZE / 2 - eyeSpread, ey: SIZE / 2 + Math.round(r * 0.32), group: leftGroup,  pupil: leftPupil  },
        { ex: SIZE / 2 + eyeSpread, ey: SIZE / 2 + Math.round(r * 0.32), group: rightGroup, pupil: rightPupil },
      ]
      for (const { ex, ey, group, pupil } of eyeOffsets) {
        group.setAttribute('transform', `translate(${ex},${ey})`)
        const pageEyeX = rect.left + cx + (ex - SIZE / 2)
        const pageEyeY = rect.top  + cy + (ey - SIZE / 2)
        const angle = Math.atan2(smoothMouseY - pageEyeY, smoothMouseX - pageEyeX)
        const dist  = Math.min(1, Math.hypot(smoothMouseX - pageEyeX, smoothMouseY - pageEyeY) / 120)
        pupil.setAttribute('cx', (Math.cos(angle) * 5 * dist).toFixed(2))
        pupil.setAttribute('cy', (Math.sin(angle) * 5 * dist).toFixed(2))
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
  }, [color])

  return <div ref={containerRef} className="footer-mascot" aria-hidden="true" />
}
