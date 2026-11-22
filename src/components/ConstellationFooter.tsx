import { useEffect, useMemo, useRef, useState, type MouseEvent, type ReactNode } from 'react'
import { useFooterStars, type Pt } from '../contexts/FooterStarsContext'
import './ConstellationFooter.css'

type Props = {
  radius?: number
  maxLinks?: number
  lineColor?: string
  density?: number
  twinkle?: boolean
  parallaxFactor?: number
  className?: string
  children?: ReactNode
}

function makeAmbient(n: number) {
  let seed = 7
  const rnd = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646 }
  return Array.from({ length: n }, (_, i) => {
    const big = rnd() > 0.88
    return {
      id: 'a' + i,
      fx: rnd(),
      fy: rnd(),
      size: big ? 2.4 : rnd() > 0.5 ? 1.6 : 1.1,
      o: big ? 0.55 : 0.2 + rnd() * 0.28,
      delay: rnd() * 5,
    }
  })
}

export default function ConstellationFooter({
  radius = 190,
  maxLinks = 3,
  lineColor = '#C8D4FF',
  density = 110,
  twinkle = true,
  parallaxFactor = 0.45,
  className,
  children,
}: Props) {
  const ref = useRef<HTMLElement>(null)
  const skyRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)
  const [size, setSize] = useState({ w: 1440, h: 520 })
  const { placed, setPlaced, links, setLinks, lit, setLit } = useFooterStars()
  const ambient = useMemo(() => makeAmbient(density), [density])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () => setSize({ w: el.offsetWidth, h: el.offsetHeight })
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const sky = skyRef.current
    const footer = ref.current
    if (!sky || !footer) return

    const update = () => {
      const rect = footer.getBoundingClientRect()
      const viewH = window.innerHeight
      // 0 when footer just enters from bottom, 1 when it just leaves the top
      const progress = (viewH - rect.top) / (viewH + rect.height)
      const clamped = Math.max(0, Math.min(1, progress))
      const offset = (clamped - 0.5) * parallaxFactor * rect.height
      sky.style.transform = `translateY(${offset}px)`
    }

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafRef.current)
    }
  }, [parallaxFactor])

  const addStar = (e: MouseEvent<HTMLElement>) => {
    const el = ref.current
    if (!el || (e.target as HTMLElement).closest('a,button,input,textarea,select,label')) return
    const r = el.getBoundingClientRect()
    const fx = (e.clientX - r.left) / r.width
    const fy = (e.clientY - r.top) / r.height
    const w = el.offsetWidth, h = el.offsetHeight
    const px = fx * w, py = fy * h

    const near = [...ambient.map(({ id, fx, fy }) => ({ id, fx, fy })), ...placed]
      .map((c) => ({ c, d: Math.hypot(c.fx * w - px, c.fy * h - py) }))
      .filter((o) => o.d > 6 && o.d < radius)
      .sort((a, b) => a.d - b.d)
      .slice(0, maxLinks)

    const star: Pt = { id: 'p' + Date.now() + Math.floor(Math.random() * 1000), fx, fy }
    const newLit = { ...lit }
    const newLinks = near.map((o, i) => {
      const delay = 0.25 + i * 0.35
      if (o.c.id.startsWith('a')) newLit[o.c.id] = delay + 1.1
      return { id: star.id + '-' + o.c.id, a: star, b: o.c, delay }
    })

    setPlaced((p) => [...p, star])
    setLinks((l) => [...l, ...newLinks])
    setLit(newLit)
  }

  const { w: W, h: H } = size

  return (
    <footer ref={ref} className={`cf${className ? ' ' + className : ''}`} data-cursor="add" onClick={addStar}>
      <div ref={skyRef} className="cf-sky" aria-hidden="true" />
      {ambient.map((s) => {
        const isLit = lit[s.id] != null
        return (
          <span
            key={s.id}
            className={'cf-amb' + (twinkle ? ' cf-tw' : '') + (isLit ? ' cf-lit' : '')}
            style={{
              left: `${s.fx * 100}%`,
              top: `${s.fy * 100}%`,
              width: s.size,
              height: s.size,
              ['--o' as string]: s.o,
              animationDelay: `${s.delay}s`,
              transitionDelay: isLit ? `${lit[s.id]}s` : '0s',
            }}
          />
        )
      })}
      {links.map((k) => {
          const x1 = k.a.fx * W, y1 = k.a.fy * H
          const dx = k.b.fx * W - x1, dy = k.b.fy * H - y1
          return (
            <div
              key={k.id}
              className="cf-line"
              style={{
                left: x1,
                top: y1,
                width: Math.hypot(dx, dy),
                transform: `rotate(${(Math.atan2(dy, dx) * 180) / Math.PI}deg)`,
                zIndex: 1,
              }}
            >
              <span style={{ background: lineColor, animationDelay: `${k.delay}s` }} />
            </div>
          )
        })}
      {placed.map((p) => (
        <span key={p.id} className="cf-star" style={{ left: `${p.fx * 100}%`, top: `${p.fy * 100}%`, zIndex: 1 }} />
      ))}
      <div className="cf-content">{children}</div>
    </footer>
  )
}
