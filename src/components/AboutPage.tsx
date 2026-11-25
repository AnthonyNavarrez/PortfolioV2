import { useState, useEffect, useRef, useCallback } from 'react'

function useTypewriter(text: string, startDelay = 0, charDelay = 40): string {
  const [displayed, setDisplayed] = useState('')
  useEffect(() => {
    setDisplayed('')
    let i = 0
    let charTimer: ReturnType<typeof setInterval>
    const startTimer = setTimeout(() => {
      charTimer = setInterval(() => {
        i++
        setDisplayed(text.slice(0, i))
        if (i >= text.length) clearInterval(charTimer)
      }, charDelay)
    }, startDelay)
    return () => { clearTimeout(startTimer); clearInterval(charTimer) }
  }, [text, startDelay, charDelay])
  return displayed
}
import iconCaretLeft from '../assets/v4/icon-caret-left.svg'
import polaroid1 from '../assets/Headshot.JPG'
import polaroid2 from '../assets/about/photo-polaroid-2.png'
import danceResurrection from '../assets/about/dance-resurrection.png'
import dancerPhotoshoot from '../assets/about/dance-photoshoot.png'
import dancerSeniorSolo from '../assets/about/dance-senior-solo.png'
import danceWce from '../assets/about/dance-wce.png'
import cafeCommunityGoods from '../assets/about/cafe-community-goods.png'
import cafeSaba from '../assets/about/cafe-saba.png'
import cafeHeytea from '../assets/about/cafe-heytea.png'
import cafeDavien from '../assets/about/cafe-davien.png'
import miscKayaking from '../assets/about/misc-kayaking.png'
import miscBeach from '../assets/about/misc-beach.png'
import miscDisney from '../assets/about/misc-disney.png'
import miscPinkWall from '../assets/about/misc-pink-wall.png'
import albumOlivia from '../assets/about/album-olivia.png'
import albumAriana from '../assets/about/album-ariana.png'
import albumConan from '../assets/about/album-conan.png'
import albumLaufey from '../assets/about/album-laufey.png'
import album5 from '../assets/about/album-5.png'
import album6 from '../assets/about/album-6.png'
import './AboutPage.css'

const DANCE_PHOTOS: { src: string; caption: string; ghost?: boolean }[] = [
  { src: danceResurrection, caption: 'Resurection comp 1st place' },
  { src: dancerPhotoshoot,  caption: 'Dance team photoshoot' },
  { src: dancerSeniorSolo,  caption: 'Senior solo' },
  { src: danceWce,          caption: 'WCE Nationals 1st place' },
]

const CAFE_PHOTOS: { src: string; caption: string; ghost?: boolean }[] = [
  { src: cafeCommunityGoods, caption: 'Community Goods' },
  { src: cafeSaba,           caption: 'Saba Coffee' },
  { src: cafeHeytea,         caption: 'HeyTea' },
  { src: cafeDavien,         caption: 'Da Vien coffee' },
  { src: miscKayaking,       caption: 'Kayaking' },
  { src: miscBeach,          caption: 'Beach day' },
]

const SIDE_PHOTOS = [
  { src: miscDisney,   caption: 'Disney' },
  { src: miscPinkWall, caption: 'LA Pink wall' },
]

const ALBUMS = [
  albumOlivia,
  albumAriana,
  albumConan,
  albumLaufey,
  album5,
  album6,
]

function useScrollDrag(ref: React.RefObject<HTMLDivElement | null>) {
  const dragging  = useRef(false)
  const startX    = useRef(0)
  const scrollLeft = useRef(0)
  const rafId     = useRef<number | null>(null)
  const edgeSpeed = useRef(0)

  const stopEdge = useCallback(() => {
    if (rafId.current !== null) { cancelAnimationFrame(rafId.current); rafId.current = null }
    edgeSpeed.current = 0
  }, [])

  const edgeTick = useCallback(() => {
    const el = ref.current
    if (!el || edgeSpeed.current === 0) return
    el.scrollLeft += edgeSpeed.current
    rafId.current = requestAnimationFrame(edgeTick)
  }, [ref])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onMouseDown = (e: MouseEvent) => {
      dragging.current  = true
      startX.current    = e.pageX - el.offsetLeft
      scrollLeft.current = el.scrollLeft
      el.style.cursor   = 'grabbing'
      el.style.userSelect = 'none'
      stopEdge()
    }

    const rectCache = { left: 0, width: 0 }
    const updateRect = () => { const r = el.getBoundingClientRect(); rectCache.left = r.left; rectCache.width = r.width }
    updateRect()
    el.addEventListener('mouseenter', updateRect)
    window.addEventListener('resize', updateRect, { passive: true })

    const onMouseMove = (e: MouseEvent) => {
      if (dragging.current) {
        const x = e.pageX - el.offsetLeft
        el.scrollLeft = scrollLeft.current - (x - startX.current)
        return
      }
      // Edge hover (uses cached rect)
      const zone  = rectCache.width * 0.12
      const relX  = e.clientX - rectCache.left
      if (relX < zone) {
        edgeSpeed.current = -((zone - relX) / zone) * 6
      } else if (relX > rectCache.width - zone) {
        edgeSpeed.current = ((relX - (rectCache.width - zone)) / zone) * 6
      } else {
        edgeSpeed.current = 0
      }
      if (edgeSpeed.current !== 0 && rafId.current === null) {
        rafId.current = requestAnimationFrame(edgeTick)
      } else if (edgeSpeed.current === 0) {
        stopEdge()
      }
    }

    const onMouseUp = () => {
      dragging.current   = false
      el.style.cursor    = 'grab'
      el.style.userSelect = ''
    }

    const onMouseLeave = () => {
      dragging.current   = false
      el.style.cursor    = ''
      el.style.userSelect = ''
      stopEdge()
    }

    el.style.cursor = 'grab'
    el.addEventListener('mousedown',  onMouseDown)
    el.addEventListener('mousemove',  onMouseMove)
    el.addEventListener('mouseup',    onMouseUp)
    el.addEventListener('mouseleave', onMouseLeave)
    window.addEventListener('mouseup', onMouseUp)

    return () => {
      el.removeEventListener('mouseenter', updateRect)
      window.removeEventListener('resize', updateRect)
      el.removeEventListener('mousedown',  onMouseDown)
      el.removeEventListener('mousemove',  onMouseMove)
      el.removeEventListener('mouseup',    onMouseUp)
      el.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('mouseup', onMouseUp)
      stopEdge()
    }
  }, [ref, edgeTick, stopEdge])
}

function AboutPage() {
  const [stripScrolled,  setStripScrolled]  = useState(false)
  const [albumsScrolled, setAlbumsScrolled] = useState(false)
  const [stripCanRight,  setStripCanRight]  = useState(true)
  const [albumsCanRight, setAlbumsCanRight] = useState(true)
  const title = useTypewriter("Hi, I'm Anthony!", 700)
  const stripRef  = useRef<HTMLDivElement>(null)
  const albumsRef = useRef<HTMLDivElement>(null)
  useScrollDrag(stripRef)
  useScrollDrag(albumsRef)

  const scrollBy = (ref: React.RefObject<HTMLDivElement | null>, dir: 1 | -1) => {
    ref.current?.scrollBy({ left: dir * 320, behavior: 'smooth' })
  }

  const onStripScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget
    setStripScrolled(el.scrollLeft > 0)
    setStripCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 2)
  }

  const onAlbumsScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget
    setAlbumsScrolled(el.scrollLeft > 0)
    setAlbumsCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 2)
  }

  return (
    <div className="about-page">
      <main className="about-main">

        {/* ── Intro row: text left, polaroids right ── */}
        <div className="about-intro-row">
          <section className="about-intro">
            <h1 className="about-title">{title}</h1>
            <div className="about-bio">
              <p className="about-bio__p">
                I am a product designer, studying <strong>computer science</strong> at UCLA.
              </p>
              <p className="about-bio__p">
                As a kid I had an insatiable creativity, I was always creating, whether that was creating video games on scratch or choreography in a dance room.
              </p>
              <p className="about-bio__p">
                Today I believe there is constant a <strong>gap</strong> between what technology <em>can</em> do and what people actually get to use. I design and build intuitive tools that turn the newest ideas into something anyone can pick up on day one.
              </p>
            </div>
          </section>

          <div className="about-polaroids" aria-hidden>
            <p className="about-polaroid__label about-polaroid__label--top">This is me</p>
            <div className="about-polaroid about-polaroid--large">
              <div className="about-polaroid__frame">
                <div className="about-polaroid__img-clip">
                  <img src={polaroid1} alt="" className="about-polaroid__img" />
                </div>
              </div>
            </div>
            <p className="about-polaroid__label about-polaroid__label--bottom">and me on the inside</p>
            <div className="about-polaroid about-polaroid--small">
              <div className="about-polaroid__frame">
                <img src={polaroid2} alt="" className="about-polaroid__img" />
              </div>
            </div>
          </div>
        </div>

        {/* ── Free time ── */}
        <section className="about-freetime">
          <h2 className="about-title">In my free time you'll find me ...</h2>

          <div className="about-strip-wrapper">
            {stripScrolled && (
              <button className="about-scroll-arrow about-scroll-arrow--left" onClick={() => scrollBy(stripRef, -1)} aria-label="Scroll left">
                <img src={iconCaretLeft} alt="" />
              </button>
            )}
          <div
            ref={stripRef}
            className="about-photo-strip"
            onScroll={onStripScroll}
          >
              <div className="about-strip-category">
                <span className="about-strip-label">Dancing</span>
                <div className="about-strip-category__photos">
                  {DANCE_PHOTOS.map(p => (
                    <div key={p.caption} className={`about-strip-item${p.ghost ? ' about-strip-item--ghost' : ''}`}>
                      <img src={p.src} alt={p.caption} className="about-strip-item__img" loading="lazy" decoding="async" />
                      <p className="about-strip-item__caption">{p.caption}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="about-strip-category">
                <span className="about-strip-label">Exploring Cafes</span>
                <div className="about-strip-category__photos">
                  {CAFE_PHOTOS.map(p => (
                    <div key={p.caption} className={`about-strip-item${p.ghost ? ' about-strip-item--ghost' : ''}`}>
                      <img src={p.src} alt={p.caption} className="about-strip-item__img" loading="lazy" decoding="async" />
                      <p className="about-strip-item__caption">{p.caption}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="about-strip-category">
                <span className="about-strip-label about-strip-label--sidequest">Sidequesting</span>
                <div className="about-strip-category__photos">
                  {SIDE_PHOTOS.map(p => (
                    <div key={p.caption} className="about-strip-item">
                      <img src={p.src} alt={p.caption} className="about-strip-item__img" loading="lazy" decoding="async" />
                      <p className="about-strip-item__caption">{p.caption}</p>
                    </div>
                  ))}
                </div>
              </div>
          </div>
            {stripCanRight && (
              <button className="about-scroll-arrow about-scroll-arrow--right" onClick={() => scrollBy(stripRef, 1)} aria-label="Scroll right">
                <img src={iconCaretLeft} alt="" className="about-scroll-arrow__icon--flip" />
              </button>
            )}
          </div>
        </section>

        {/* ── Albums ── */}
        <section className="about-albums">
          <h2 className="about-title">Albums on repeat</h2>
          <div className="about-albums-wrapper">
            {albumsScrolled && (
              <button className="about-scroll-arrow about-scroll-arrow--left about-scroll-arrow--albums" onClick={() => scrollBy(albumsRef, -1)} aria-label="Scroll left">
                <img src={iconCaretLeft} alt="" />
              </button>
            )}
            <div
              ref={albumsRef}
              className="about-albums__row"
              onScroll={onAlbumsScroll}
            >
              {ALBUMS.map((src, i) => (
                <img key={i} src={src} alt="" className="about-albums__cover" loading="lazy" decoding="async" />
              ))}
            </div>
            {albumsCanRight && (
              <button className="about-scroll-arrow about-scroll-arrow--right about-scroll-arrow--albums" onClick={() => scrollBy(albumsRef, 1)} aria-label="Scroll right">
                <img src={iconCaretLeft} alt="" className="about-scroll-arrow__icon--flip" />
              </button>
            )}
          </div>
        </section>

      </main>
    </div>
  )
}

export default AboutPage
