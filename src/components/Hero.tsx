import { Fragment, useEffect, useRef } from 'react'
import { heroBio } from '../data/about'
import Aurora from './Aurora'
import PhotoCards from './PhotoCards'
import './Hero.css'

// Fraction of normal scroll speed each layer moves at — lower means
// it lags behind more and reads as further away.
const PARALLAX_SPEED = {
  lines: 0.5,
  aurora: 0.25,
}

const AURORA_MOBILE_FADE_DISTANCE = 500

// Renders a bio paragraph, bolding the **marked** keywords.
function BioParagraph({ text }: { text: string }) {
  return (
    <p className="hero__bio">
      {text.split(/\*\*(.+?)\*\*/).map((part, index) =>
        index % 2 === 1 ? <strong key={index}>{part}</strong> : <Fragment key={index}>{part}</Fragment>,
      )}
    </p>
  )
}

// Synced from Figma (node 666:1485).
function Hero() {
  const linesRef = useRef<HTMLDivElement>(null)
  const auroraRef = useRef<HTMLDivElement>(null)

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

      <div className="hero__content">
        <h1 className="hero__name">
          Anthony
          <br />
          Navarrez
        </h1>
        <p className="hero__tagline">
          <span className="hero__tagline-tick" aria-hidden="true" />
          Computer Science @ UCLA
        </p>

        {heroBio.map((paragraph) => (
          <BioParagraph text={paragraph} key={paragraph.slice(0, 24)} />
        ))}
      </div>

      <PhotoCards placement="hero" />
    </section>
  )
}

export default Hero
