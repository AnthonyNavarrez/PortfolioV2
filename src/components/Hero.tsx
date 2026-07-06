import { useEffect, useRef } from 'react'
import heroPortraitSilhouette from '../assets/hero-portrait-silhouette.svg'
import heroPortraitPhoto from '../assets/hero-portrait-photo.png'
import Aurora from './Aurora'
import './Hero.css'

// Fraction of normal scroll speed each layer moves at — lower means
// it lags behind more and reads as further away.
const PARALLAX_SPEED = {
  lines: 0.5,
  portrait: 0.8,
  aurora: 0.25,
}

const PORTRAIT_SCALE_PER_PIXEL = 0.0006
const PORTRAIT_MAX_SCALE = 1.4

const PORTRAIT_MOBILE_SCALE_PER_PIXEL = 0.0004
const PORTRAIT_MOBILE_MAX_SCALE = 1.12
const PORTRAIT_MOBILE_FADE_DISTANCE = 700

const AURORA_MOBILE_FADE_DISTANCE = 500

// Rects the scan box cycles through, as percentages of the portrait
// box — each roughly frames a different part of the outfit. Kept
// within the top 40% of the portrait.
const SCAN_BOXES = [
  { top: '1%', left: '31%', width: '27%', height: '12%' },
  { top: '14%', left: '55%', width: '24%', height: '13%' },
  { top: '10%', left: '10%', width: '36%', height: '8%' },
  { top: '3%', left: '62%', width: '23%', height: '13%' },
]
const SCAN_INTERVAL_MS = 2500
const SCAN_INTERVAL_MOBILE_MS = 1500

// Size of the scan box while it's following the cursor (desktop only) —
// close to the average footprint of the SCAN_BOXES presets above.
const CURSOR_SCAN_WIDTH = 27
const CURSOR_SCAN_HEIGHT = 12

function Hero() {
  const linesRef = useRef<HTMLDivElement>(null)
  const auroraRef = useRef<HTMLDivElement>(null)
  const portraitRef = useRef<HTMLDivElement>(null)
  const scanBoxRef = useRef<HTMLDivElement>(null)
  const photoRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    let frame = 0

    const applyParallax = () => {
      const y = window.scrollY

      if (linesRef.current) {
        linesRef.current.style.transform = `translateY(${y * (1 - PARALLAX_SPEED.lines)}px)`
      }
      if (auroraRef.current) {
        auroraRef.current.style.transform = `translateY(${y * (1 - PARALLAX_SPEED.aurora)}px)`

        const isMobileAurora = window.matchMedia('(max-width: 1024px)').matches
        if (isMobileAurora) {
          const opacity = Math.max(0, 1 - y / AURORA_MOBILE_FADE_DISTANCE)
          auroraRef.current.style.opacity = `${opacity}`
        } else {
          auroraRef.current.style.opacity = ''
        }
      }
      if (portraitRef.current) {
        const isMobile = window.matchMedia('(max-width: 1024px)').matches
        if (isMobile) {
          const scale = Math.min(
            PORTRAIT_MOBILE_MAX_SCALE,
            1 + y * PORTRAIT_MOBILE_SCALE_PER_PIXEL,
          )
          const opacity = Math.max(0, 1 - y / PORTRAIT_MOBILE_FADE_DISTANCE)
          portraitRef.current.style.transform = `scale(${scale})`
          portraitRef.current.style.opacity = `${opacity}`
        } else {
          const scale = Math.min(
            PORTRAIT_MAX_SCALE,
            1 + y * PORTRAIT_SCALE_PER_PIXEL,
          )
          portraitRef.current.style.transform = `translate(-50%, ${y * (1 - PARALLAX_SPEED.portrait)}px) scale(${scale})`
          portraitRef.current.style.opacity = ''
        }
      }
    }

    const handleScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(applyParallax)
    }

    applyParallax()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    const box = scanBoxRef.current
    const photo = photoRef.current
    const portrait = portraitRef.current
    if (!box || !photo || !portrait) return

    const applyBox = (top: number, left: number, width: number, height: number) => {
      box.style.top = `${top}%`
      box.style.left = `${left}%`
      box.style.width = `${width}%`
      box.style.height = `${height}%`
      photo.style.clipPath = `inset(${top}% ${100 - left - width}% ${100 - top - height}% ${left}%)`
    }

    const isMobile = window.matchMedia('(max-width: 1024px)').matches

    let index = 0
    let intervalId: ReturnType<typeof setInterval> | null = null

    const applyPreset = () => {
      const { top, left, width, height } = SCAN_BOXES[index]
      applyBox(parseFloat(top), parseFloat(left), parseFloat(width), parseFloat(height))
    }

    const advance = () => {
      index = (index + 1) % SCAN_BOXES.length
      applyPreset()
    }

    const startCycle = () => {
      applyPreset()
      if (isMobile) {
        // On load, the cycle should feel like it's already 1s in, so
        // the first move lands 0.5s later instead of a full interval.
        intervalId = setTimeout(() => {
          advance()
          intervalId = setInterval(advance, SCAN_INTERVAL_MOBILE_MS)
        }, SCAN_INTERVAL_MOBILE_MS - 1000)
      } else {
        intervalId = setInterval(advance, SCAN_INTERVAL_MS)
      }
    }

    const stopCycle = () => {
      if (intervalId !== null) {
        clearTimeout(intervalId)
        clearInterval(intervalId)
        intervalId = null
      }
    }

    startCycle()

    // Cursor-follow is desktop-only — mobile has no hover, so it just
    // keeps the auto-cycle running.
    if (isMobile) {
      return () => stopCycle()
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = portrait.getBoundingClientRect()
      const xPct = ((e.clientX - rect.left) / rect.width) * 100
      const yPct = ((e.clientY - rect.top) / rect.height) * 100

      const left = Math.min(Math.max(xPct - CURSOR_SCAN_WIDTH / 2, 0), 100 - CURSOR_SCAN_WIDTH)
      const top = Math.min(Math.max(yPct - CURSOR_SCAN_HEIGHT / 2, 0), 100 - CURSOR_SCAN_HEIGHT)
      applyBox(top, left, CURSOR_SCAN_WIDTH, CURSOR_SCAN_HEIGHT)
    }

    const handleMouseEnter = (e: MouseEvent) => {
      stopCycle()
      // The box/photo transitions are tuned for the slow auto-cycle
      // glide — disable them so cursor-follow tracks instantly.
      box.style.transition = 'none'
      photo.style.transition = 'none'
      handleMouseMove(e)
    }

    const handleMouseLeave = () => {
      box.style.transition = ''
      photo.style.transition = ''
      startCycle()
    }

    portrait.addEventListener('mouseenter', handleMouseEnter)
    portrait.addEventListener('mousemove', handleMouseMove)
    portrait.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      stopCycle()
      portrait.removeEventListener('mouseenter', handleMouseEnter)
      portrait.removeEventListener('mousemove', handleMouseMove)
      portrait.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <section className="hero">
      <div className="hero__fx" aria-hidden="true">
        <div className="hero__aurora" ref={auroraRef} aria-hidden="true">
          <div className="hero__aurora-flip">
            <Aurora
              colorStops={['#F17953', '#FF4E17', '#FF4E17']}
              blend={1}
              amplitude={1.0}
              speed={0.5}
            />
          </div>
        </div>
      </div>

      <div className="hero__lines" ref={linesRef} aria-hidden="true">
        <span className="hero__bracket hero__bracket--top" aria-hidden="true" />
        <span className="hero__bracket hero__bracket--bottom" aria-hidden="true" />
      </div>

      <div className="hero__portrait" ref={portraitRef}>
        <img
          className="hero__portrait-img"
          src={heroPortraitSilhouette}
          alt=""
          aria-hidden="true"
        />
        <img
          className="hero__portrait-img hero__portrait-img--photo"
          ref={photoRef}
          src={heroPortraitPhoto}
          alt="Portrait of Anthony Navarrez"
        />
        <div className="hero__scan-box" ref={scanBoxRef} aria-hidden="true" />
      </div>

      <div className="hero__content">
        <h1 className="hero__name">
          Anthony
          <br />
          Navarrez
        </h1>
        <p className="hero__tagline">
          <span className="hero__tagline-tick" aria-hidden="true" />
          aspiring designer x developer
        </p>
      </div>
    </section>
  )
}

export default Hero
