import { Fragment, useEffect, useRef, useState } from 'react'
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

// Typing speed per block, in ms per character. All blocks start
// together — the name types out slowly, the long bio fast enough to
// finish in a few seconds.
const TYPE_START_DELAY = 300
const TYPE_SPEED = { name: 75, tagline: 30, bio: 4 }

interface Segment {
  text: string
  bold: boolean
}

// **marked** keywords become bold segments.
const toSegments = (text: string): Segment[] =>
  text.split(/\*\*(.+?)\*\*/).map((part, index) => ({ text: part, bold: index % 2 === 1 }))

const typedBlocks = [
  { segments: toSegments('Anthony'), speed: TYPE_SPEED.name },
  { segments: toSegments('Navarrez'), speed: TYPE_SPEED.name },
  { segments: toSegments('Computer Science @ UCLA'), speed: TYPE_SPEED.tagline },
  ...heroBio.map((paragraph) => ({ segments: toSegments(paragraph), speed: TYPE_SPEED.bio })),
]

const blockLength = (segments: Segment[]) => segments.reduce((sum, segment) => sum + segment.text.length, 0)

// Types out on the first page load only, like the photo pile's entrance.
let typingPlayed = false

// Returns how many characters of each block are typed so far.
function useTypedCounts() {
  const [animate] = useState(
    () => !typingPlayed && !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const full = typedBlocks.map((block) => blockLength(block.segments))
  const [counts, setCounts] = useState(() => (animate ? full.map(() => 0) : full))

  useEffect(() => {
    if (!animate) return
    typingPlayed = true

    let frame = 0
    const start = performance.now() + TYPE_START_DELAY
    const tick = (now: number) => {
      const elapsed = Math.max(0, now - start)
      const next = typedBlocks.map((block, index) => Math.min(full[index], Math.floor(elapsed / block.speed)))
      setCounts(next)
      if (next.some((count, index) => count < full[index])) {
        frame = requestAnimationFrame(tick)
      }
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animate])

  return { counts, full }
}

// Renders the first `count` characters of a block. The rest is laid
// out but invisible, so the text never reflows while it types.
function TypedText({ segments, count, caret }: { segments: Segment[]; count: number; caret: boolean }) {
  const starts = segments.map((_, index) => blockLength(segments.slice(0, index)))

  return (
    <>
      {segments.map((segment, index) => {
        const shown = segment.text.slice(0, Math.max(0, count - starts[index]))
        const hidden = segment.text.slice(shown.length)
        // The caret goes right after the last typed character.
        const showCaret = caret && shown.length < segment.text.length && count >= starts[index]
        const content = (
          <>
            {shown}
            {showCaret && <span className="hero__caret" aria-hidden="true" />}
            {hidden && <span className="hero__untyped">{hidden}</span>}
          </>
        )
        return segment.bold ? <strong key={index}>{content}</strong> : <Fragment key={index}>{content}</Fragment>
      })}
    </>
  )
}

// Synced from Figma (node 666:1485).
function Hero() {
  const { counts, full } = useTypedCounts()
  // Every block types at once; each shows a caret until it's finished.
  const typed = (index: number) => (
    <TypedText segments={typedBlocks[index].segments} count={counts[index]} caret={counts[index] < full[index]} />
  )

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
        <h1 className="hero__name" aria-label="Anthony Navarrez">
          {typed(0)}
          <br />
          {typed(1)}
        </h1>
        <p className="hero__tagline">
          <span className="hero__tagline-tick" aria-hidden="true" />
          <span>{typed(2)}</span>
        </p>

        {heroBio.map((paragraph, index) => (
          <p className="hero__bio" key={paragraph.slice(0, 24)}>
            {typed(3 + index)}
          </p>
        ))}
      </div>

      <PhotoCards placement="hero" />
    </section>
  )
}

export default Hero
