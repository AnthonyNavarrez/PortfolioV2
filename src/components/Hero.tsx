import { useEffect, useRef } from 'react'
import heroPortrait from '../assets/hero-portrait-full.webp'
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

function Hero() {
  const linesRef = useRef<HTMLDivElement>(null)
  const auroraRef = useRef<HTMLDivElement>(null)
  const portraitRef = useRef<HTMLImageElement>(null)

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

      <img
        className="hero__portrait"
        ref={portraitRef}
        src={heroPortrait}
        alt="Portrait of Anthony Navarrez"
      />

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
