import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import AnimatedContent from './AnimatedContent'
import {
  handvfxGithubUrl,
  handvfxHeroPoster,
  handvfxHeroVideo,
  handvfxLiveUrl,
  handvfxOverview,
  handvfxTechStack,
  handvfxTools,
  type HandvfxTechItem,
} from '../data/handvfx'
import './HandVfxCaseStudy.css'

function HeroButton({ href, label, modifier }: { href: string; label: string; modifier: string }) {
  const className = `hand-vfx-case-study__pill hand-vfx-case-study__hero-button hand-vfx-case-study__hero-button--${modifier}`
  return href ? (
    <a className={className} href={href} target="_blank" rel="noreferrer">
      {label}
    </a>
  ) : (
    <span className={className}>{label}</span>
  )
}

function TechIcon({ item }: { item: HandvfxTechItem }) {
  const [left, top, width, height] = item.iconCrop ?? [0, 0, 100, 100]
  return (
    <span
      className="hand-vfx-case-study__tech-icon"
      style={{ width: item.iconWidth, height: item.iconHeight }}
    >
      <img
        src={item.icon}
        alt=""
        className={item.iconCrop ? undefined : 'hand-vfx-case-study__tech-icon-img--cover'}
        style={
          item.iconCrop
            ? { left: `${left}%`, top: `${top}%`, width: `${width}%`, height: `${height}%` }
            : undefined
        }
      />
    </span>
  )
}

gsap.registerPlugin(ScrollTrigger)

// How much of the overview card shows above the fold on first load.
const OVERVIEW_PEEK = 90
// Never pulled up closer than this to the hero buttons (short screens).
const OVERVIEW_ACTIONS_CLEARANCE = 24

// Synced from Figma (node 628:1351).
function HandVfxCaseStudy() {
  const overviewRef = useRef<HTMLDivElement>(null)
  const actionsRef = useRef<HTMLDivElement>(null)

  // On load the overview card is pulled up to peek in from the bottom
  // of the screen, then scrubs back down into its normal spot as the
  // page scrolls. Offsets are function-based so they're recomputed on
  // every ScrollTrigger refresh (resize, late-loading media).
  useLayoutEffect(() => {
    const card = overviewRef.current
    const actions = actionsRef.current
    if (!card || !actions) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const pageTop = (el: Element) => el.getBoundingClientRect().top + window.scrollY
    const naturalTop = () => pageTop(card) - Number(gsap.getProperty(card, 'y'))
    const peekOffset = () => {
      const peekTop = Math.max(
        window.innerHeight - OVERVIEW_PEEK,
        pageTop(actions) + actions.offsetHeight + OVERVIEW_ACTIONS_CLEARANCE,
      )
      // Only ever pull the card up — if it's already on screen at its
      // natural spot (tall viewports), leave it there.
      return Math.min(0, peekTop - naturalTop())
    }

    const tween = gsap.fromTo(
      card,
      { y: peekOffset },
      {
        y: 0,
        ease: 'none',
        scrollTrigger: {
          start: 0,
          // Settled once its natural top would sit 3/4 down the screen.
          end: () => Math.max(200, naturalTop() - window.innerHeight * 0.75),
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      },
    )

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
      gsap.set(card, { clearProps: 'transform' })
    }
  }, [])

  return (
    <article className="hand-vfx-case-study">
      <Link className="hand-vfx-case-study__back" to="/" state={{ scrollTo: 'projects' }}>
        Back to Projects
      </Link>

      <section className="hand-vfx-case-study__hero">
        <video
          className="hand-vfx-case-study__hero-video"
          src={handvfxHeroVideo}
          poster={handvfxHeroPoster}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
        <div className="hand-vfx-case-study__hero-fade" aria-hidden="true" />

        <h1 className="hand-vfx-case-study__title">Hand VFX</h1>
        <div ref={actionsRef} className="hand-vfx-case-study__hero-actions">
          <HeroButton href={handvfxLiveUrl} label="Try it Live" modifier="live" />
          <HeroButton href={handvfxGithubUrl} label="Github" modifier="github" />
        </div>
      </section>

      <div ref={overviewRef} className="hand-vfx-case-study__overview">
        <h3 className="hand-vfx-case-study__overview-heading">Overview</h3>
        <p className="hand-vfx-case-study__overview-text">{handvfxOverview}</p>
      </div>

      <section className="hand-vfx-case-study__tools">
        {handvfxTools.map((tool, index) => (
          <AnimatedContent
            key={tool.name}
            className="hand-vfx-case-study__tool"
            direction="vertical"
            distance={40}
            duration={0.8}
            delay={index * 0.1}
            threshold={0.2}
          >
            <a
              className="hand-vfx-case-study__pill hand-vfx-case-study__tool-name"
              href={tool.url}
              target="_blank"
              rel="noreferrer"
            >
              {tool.name}
            </a>
            <p className="hand-vfx-case-study__tool-description">{tool.description}</p>
          </AnimatedContent>
        ))}
      </section>

      <section className="hand-vfx-case-study__tech">
        <AnimatedContent direction="vertical" distance={40} duration={0.8} threshold={0.3}>
          <h3 className="hand-vfx-case-study__tech-heading">Tech Stack</h3>
        </AnimatedContent>

        <AnimatedContent
          className="hand-vfx-case-study__tech-rows"
          direction="vertical"
          distance={30}
          duration={0.8}
          threshold={0.2}
        >
          {handvfxTechStack.map((row, rowIndex) => (
            <div className="hand-vfx-case-study__tech-row" key={rowIndex}>
              {row.map((item) => (
                <div className="hand-vfx-case-study__tech-item" key={item.name}>
                  <span className="hand-vfx-case-study__tech-chip">
                    <TechIcon item={item} />
                    <span>{item.name}</span>
                  </span>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          ))}
        </AnimatedContent>
      </section>
    </article>
  )
}

export default HandVfxCaseStudy
