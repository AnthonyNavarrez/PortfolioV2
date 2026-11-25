import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { createStickyType } from '../lib/sticky-type'
import type { PuddleGlyphData } from '../lib/sticky-type'
import { createStickyIcon } from '../lib/stickyIcon'
import type { AIconOutlines } from '../lib/stickyIcon'
import glyphData    from '../assets/v4/puddle-glyphs.json'
import aIconOutlines from '../assets/v4/a-icon-outlines.json'

import iconLocation from '../assets/v4/icon-location.svg'
import iconClock    from '../assets/v4/icon-clock.svg'

import HomieAnimation from './HomieAnimation'
import GCalAnimation  from './GCalAnimation'
import coverMomento   from '../assets/v4/cover-momento.png'
import coverFitzi     from '../assets/v4/cover-fitzi.png'
import videHomebody   from '../assets/homebody-cs/resources.mp4'

import Mascot from './Mascot'
import WorkFooter from './WorkFooter'
import './WorkPageV4.css'

type ProjectAnimation = React.ComponentType
const PROJECTS: { title: string; titleSuffix: string; desc: string; cover?: string; video?: string; animation?: ProjectAnimation; href: string }[] = [
  { title: 'Homie',                   titleSuffix: '',             desc: 'Mobile app digitizing your household, facilitating roommates lives', animation: HomieAnimation,                     href: '/homie'    },
  { title: 'Google Calendar Polling', titleSuffix: '| concept',   desc: 'Turning speculative plans into scheduled events',                    animation: GCalAnimation,                      href: '/gcal'     },
  { title: 'Fitzi',                   titleSuffix: '| AI Startup', desc: 'AI-powered digital wardrobe, style a personalized avatar',           cover: coverFitzi,                             href: '/fitzi'    },
  { title: 'Homebody',                titleSuffix: '',             desc: 'Survive each night, protect your base, explore the map',             video: videHomebody,                           href: '/homebody' },
  { title: 'Momento',                 titleSuffix: '',             desc: 'Pin memories on a live interactive map of LA',                       cover: coverMomento,                           href: '/momento'  },
]

function useClock() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const fmt = () => new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true })
    setTime(fmt())
    const id = setInterval(() => setTime(fmt()), 1000)
    return () => clearInterval(id)
  }, [])
  return time
}

function useTypewriter(text: string, startDelay = 0, charDelay = 38): [string, boolean] {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  useEffect(() => {
    if (!text) return
    setDisplayed('')
    setDone(false)
    let i = 0
    let charTimer: ReturnType<typeof setInterval>
    const startTimer = setTimeout(() => {
      charTimer = setInterval(() => {
        i++
        setDisplayed(text.slice(0, i))
        if (i >= text.length) { clearInterval(charTimer); setDone(true) }
      }, charDelay)
    }, startDelay)
    return () => { clearTimeout(startTimer); clearInterval(charTimer) }
  }, [text, startDelay, charDelay])
  return [displayed, done]
}

export default function WorkPageV4() {
  const time = useClock()
  const aIconSvgRef  = useRef<SVGSVGElement>(null)
  const nthonySvgRef = useRef<SVGSVGElement>(null)
  const [loaded, setLoaded] = useState(false)

  useLayoutEffect(() => {
    const id = setTimeout(() => setLoaded(true), 50)
    return () => clearTimeout(id)
  }, [])

  // Capture first clock value so the typewriter runs once on that snapshot
  const [initialTime, setInitialTime] = useState('')
  useEffect(() => {
    if (!initialTime && time) setInitialTime(time)
  }, [time, initialTime])

  const [taglineTyped]           = useTypewriter('A product designer shaping AI and emerging tech into experiences that spark wonder.', 320, 36)
  const [locationTyped]          = useTypewriter('Los Angeles, CA', 530, 46)
  const [timeTyped, timeDone]    = useTypewriter(initialTime, 740, 46)
  const displayedTime = timeDone ? time : timeTyped

  useEffect(() => {
    const prev = document.body.style.background
    document.body.style.background = '#f8f8f8'
    return () => { document.body.style.background = prev }
  }, [])

  useEffect(() => {
    const cards = Array.from(document.querySelectorAll<HTMLElement>('.v4-card'))
    if (!cards.length) return
    const mountTime = Date.now()
    let initialIdx = 0
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        const el = entry.target as HTMLElement
        const isInitial = Date.now() - mountTime < 400
        const delay = isInitial ? initialIdx++ * 80 : 0
        setTimeout(() => el.classList.add('v4-card--visible'), delay)
        obs.unobserve(el)
      })
    }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' })
    cards.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const svgIcon = aIconSvgRef.current
    const svgN    = nthonySvgRef.current
    if (!svgIcon || !svgN) return

    const cleanupA = createStickyIcon(svgIcon, { outlines: aIconOutlines as AIconOutlines, jiggle: 0.25, stickiness: 0.7, lag: 0.5, height: 100 })
    const cleanupN = createStickyType(svgN, {
      glyphs: glyphData as PuddleGlyphData,
      jiggle: 0.25,
      color: '#1a1a1a',
      maxCapHeight: 59,
      padding: 0,
      text: 'NTHONY',
    })

    return () => { cleanupA(); cleanupN() }
  }, [])

  return (
    <div className="v4" style={{ position: 'relative' }}>
      <Mascot />
      {/* Main */}
      <main
        className="v4-main"
        style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.2s ease' }}
      >
        {/* Header */}
        <div className="v4-header">
          <div
            className="v4-name"
            aria-label="Anthony"
            style={{
              transform: loaded ? 'scale(1)' : 'scale(0.75)',
              transition: 'transform 0.75s cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            <svg
              ref={aIconSvgRef}
              aria-hidden="true"
              viewBox="-8 -5 116 115"
              className="v4-name__svg v4-name__svg--a"
            />
            <svg
              ref={nthonySvgRef}
              aria-hidden="true"
              viewBox="0 0 320 70"
              className="v4-name__svg v4-name__svg--nthony"
            />
          </div>

          <p className="v4-tagline">{taglineTyped}</p>

          <div className="v4-meta">
            <span className="v4-meta__item">
              <img src={iconLocation} alt="" className="v4-meta__icon" />
              {locationTyped}
            </span>
            <span className="v4-meta__item">
              <img src={iconClock} alt="" className="v4-meta__icon" />
              {displayedTime}
            </span>
          </div>
        </div>

        {/* Project grid */}
        <div className="v4-grid">
          {PROJECTS.map(p => (
            <Link
              key={p.title}
              to={p.href}
              className="v4-card"
            >
              <div className="v4-card__img-wrap" data-cursor="v4-card">
                {p.animation
                  ? <p.animation />
                  : p.video
                  ? <video
                      src={p.video}
                      className="v4-card__img"
                      autoPlay
                      muted
                      playsInline
                      onLoadedMetadata={e => { e.currentTarget.currentTime = 2 }}
                      onTimeUpdate={e => { const v = e.currentTarget; if (v.currentTime >= 10) v.currentTime = 2 }}
                    />
                  : <img src={p.cover!} alt={p.title} className="v4-card__img" />
                }
              </div>
              <p className="v4-card__title">
                {p.title}
                {p.titleSuffix && <span className="v4-card__title-suffix"> {p.titleSuffix}</span>}
              </p>
              <p className="v4-card__desc">{p.desc}</p>
            </Link>
          ))}
        </div>
      </main>
      <WorkFooter />
    </div>
  )
}
