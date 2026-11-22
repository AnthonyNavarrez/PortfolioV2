import { useRef, useEffect, useMemo } from 'react'
import { useSpring } from 'motion/react'
import { frame } from 'motion'
import './StarsBg.css'

function makeStars(count: number): string {
  const parts: string[] = []
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * 2000)
    const y = Math.floor(Math.random() * 2000)
    parts.push(`${x}px ${y}px #fff`)
  }
  return parts.join(', ')
}

interface StarsBgProps {
  speed?: number
  factor?: number
  starColor?: string
  direction?: 'up' | 'down'
  motion?: 'scroll' | 'float'
  density?: number
  className?: string
}

function StarsBg({ speed = 50, factor = 0.05, starColor = '#fff', direction = 'down', motion = 'scroll', density = 1, className = '' }: StarsBgProps) {
  const stars = useMemo(() => ({
    l1: makeStars(Math.round(700 * density)),
    l2: makeStars(Math.round(200 * density)),
    l3: makeStars(Math.round(100 * density)),
  }), [density])
  const containerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  const springX = useSpring(0, { stiffness: 50, damping: 20 })
  const springY = useSpring(0, { stiffness: 50, damping: 20 })

  useEffect(() => {
    const container = containerRef.current
    const inner = innerRef.current
    if (!container || !inner) return

    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      springX.set((e.clientX - cx) * -factor)
      springY.set((e.clientY - cy) * -factor)
    }

    const unsubX = springX.on('change', (v) => {
      frame.render(() => {
        if (inner) inner.style.setProperty('--px', `${v}px`)
      })
    })
    const unsubY = springY.on('change', (v) => {
      frame.render(() => {
        if (inner) inner.style.setProperty('--py', `${v}px`)
      })
    })

    window.addEventListener('mousemove', onMove)
    return () => {
      window.removeEventListener('mousemove', onMove)
      unsubX()
      unsubY()
    }
  }, [springX, springY, factor])

  const cssVars = useMemo(() => ({
    '--star-color': starColor,
    '--layer1-shadows': stars.l1,
    '--layer2-shadows': stars.l2,
    '--layer3-shadows': stars.l3,
    '--speed': `${speed}s`,
    '--scroll-anim': direction === 'up' ? 'stars-scroll-up' : 'stars-scroll-down',
    '--motion': motion,
  } as React.CSSProperties), [starColor, speed, direction, motion, stars])

  return (
    <div ref={containerRef} className={`stars-bg ${className}`} style={cssVars}>
      <div ref={innerRef} className="stars-bg__inner">
        <div className="stars-bg__l1" />
        <div className="stars-bg__l2" />
        <div className="stars-bg__l3" />
      </div>
    </div>
  )
}

export default StarsBg
