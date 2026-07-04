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
      }
      if (portraitRef.current) {
        const scale = Math.min(
          PORTRAIT_MAX_SCALE,
          1 + y * PORTRAIT_SCALE_PER_PIXEL,
        )
        portraitRef.current.style.transform = `translate(-50%, ${y * (1 - PARALLAX_SPEED.portrait)}px) scale(${scale})`
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
    let index = 0

    const applyScanBox = () => {
      const box = scanBoxRef.current
      const photo = photoRef.current
      if (!box || !photo) return
      const { top, left, width, height } = SCAN_BOXES[index]
      box.style.top = top
      box.style.left = left
      box.style.width = width
      box.style.height = height

      const t = parseFloat(top)
      const l = parseFloat(left)
      const w = parseFloat(width)
      const h = parseFloat(height)
      photo.style.clipPath = `inset(${t}% ${100 - l - w}% ${100 - t - h}% ${l}%)`
    }

    applyScanBox()
    const id = setInterval(() => {
      index = (index + 1) % SCAN_BOXES.length
      applyScanBox()
    }, SCAN_INTERVAL_MS)

    return () => clearInterval(id)
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
