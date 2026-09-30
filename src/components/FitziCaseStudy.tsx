import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect, useRef, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import AnimatedContent from './AnimatedContent'
import WipNotice from './WipNotice'
import {
  brandMoodboard,
  brandType,
  fitziBrandIdentity,
  fitziCompetitive,
  fitziCompetitiveShots,
  fitziHeroPhone,
  fitziMarketing,
  fitziProblem,
  fitziSolution,
  fitziWireframing,
  hifiA,
  hifiB,
  wave1,
  wave2,
  wave3,
  wave4,
  wireframesA,
  wireframesB,
  wireframesC,
} from '../data/fitzi'
import './FitziCaseStudy.css'

function Reveal({ className, delay = 0, children }: { className?: string; delay?: number; children: ReactNode }) {
  return (
    <AnimatedContent
      className={className}
      direction="vertical"
      distance={40}
      duration={0.8}
      delay={delay}
      threshold={0.2}
    >
      {children}
    </AnimatedContent>
  )
}

gsap.registerPlugin(ScrollTrigger)

// Synced from Figma (node 641:1114).
function FitziCaseStudy() {
  const heroRef = useRef<HTMLElement>(null)
  const phoneRef = useRef<HTMLDivElement>(null)

  // The hero phone grows, tilts a little further and drifts up as the page is
  // scrolled past the hero, scrubbed to the scroll position.
  useLayoutEffect(() => {
    const hero = heroRef.current
    const phone = phoneRef.current
    if (!hero || !phone) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const tween = gsap.to(phone, {
      scale: 1.2,
      rotation: 6,
      // Drifts up faster than the page scrolls. Function-based so it's
      // recomputed from the hero's height on resize.
      y: () => -0.3 * hero.offsetHeight,
      ease: 'none',
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.6,
        invalidateOnRefresh: true,
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
      gsap.set(phone, { clearProps: 'transform' })
    }
  }, [])

  return (
    <article className="fitzi-case-study">
      <WipNotice />

      <Link className="fitzi-case-study__back" to="/">
        Back to Projects
      </Link>

      {/* Node 641:1115 — the phone renders its own "Fitzi / Your Digital
          Wardrobe" title, so the heading is for screen readers only. */}
      <section ref={heroRef} className="fitzi-case-study__hero">
        <h1 className="fitzi-case-study__sr-only">Fitzi — Your Digital Wardrobe</h1>
        <div ref={phoneRef} className="fitzi-case-study__hero-phone-wrap">
          <img
            className="fitzi-case-study__hero-phone"
            src={fitziHeroPhone}
            alt="Fitzi welcome screen on an iPhone"
          />
        </div>
        <div className="fitzi-case-study__hero-fade" aria-hidden="true" />
      </section>

      <section className="fitzi-case-study__statement fitzi-case-study__statement--problem">
        <img className="fitzi-case-study__wave" src={wave1} alt="" />
        <Reveal className="fitzi-case-study__statement-body">
          <h2 className="fitzi-case-study__heading fitzi-case-study__heading--shadow">
            Problem Statement:
          </h2>
          <p className="fitzi-case-study__text">{fitziProblem}</p>
        </Reveal>
      </section>

      <section className="fitzi-case-study__statement fitzi-case-study__statement--solution">
        <img className="fitzi-case-study__wave" src={wave2} alt="" />
        <Reveal className="fitzi-case-study__statement-body">
          <h2 className="fitzi-case-study__heading fitzi-case-study__heading--shadow">
            Our Solution
          </h2>
          <p className="fitzi-case-study__text">{fitziSolution}</p>
        </Reveal>
      </section>

      <section className="fitzi-case-study__split fitzi-case-study__split--wireframing">
        <img className="fitzi-case-study__wave fitzi-case-study__wave--wireframing" src={wave3} alt="" />
        <Reveal className="fitzi-case-study__copy">
          <h2 className="fitzi-case-study__heading">Wireframing</h2>
          {fitziWireframing.map((paragraph) => (
            <p className="fitzi-case-study__text" key={paragraph}>
              {paragraph}
            </p>
          ))}
          <p className="fitzi-case-study__text">
            {fitziCompetitive.title}
            <br />
            {fitziCompetitive.text}
          </p>
        </Reveal>

        <Reveal className="fitzi-case-study__media fitzi-case-study__media--wireframing" delay={0.1}>
          <img className="fitzi-case-study__wireframes-a" src={wireframesA} alt="Fitzi wireframes" />
          <img className="fitzi-case-study__wireframes-b" src={wireframesB} alt="Outfit Builder layout explorations" />
          <img className="fitzi-case-study__wireframes-c" src={wireframesC} alt="Fitzi wireframes" />
          <div className="fitzi-case-study__competitive">
            {fitziCompetitiveShots.map((shot, index) => (
              <img
                className={`fitzi-case-study__competitive-shot fitzi-case-study__competitive-shot--${index + 1}`}
                src={shot}
                alt=""
                key={shot}
              />
            ))}
          </div>
        </Reveal>
      </section>

      <section className="fitzi-case-study__split fitzi-case-study__split--brand">
        <img className="fitzi-case-study__wave fitzi-case-study__wave--brand" src={wave4} alt="" />
        <Reveal className="fitzi-case-study__copy">
          <h2 className="fitzi-case-study__heading">Brand Identity</h2>
          <p className="fitzi-case-study__text">{fitziBrandIdentity}</p>
        </Reveal>

        <Reveal className="fitzi-case-study__media fitzi-case-study__media--brand" delay={0.1}>
          <img className="fitzi-case-study__brand-moodboard" src={brandMoodboard} alt="Fitzi moodboard" />
          <img className="fitzi-case-study__brand-type" src={brandType} alt="Fitzi typography and color palette" />
        </Reveal>
      </section>

      <section className="fitzi-case-study__split fitzi-case-study__split--hifi">
        <Reveal className="fitzi-case-study__copy">
          <h2 className="fitzi-case-study__heading">HI-FI</h2>
        </Reveal>

        <Reveal className="fitzi-case-study__media fitzi-case-study__media--hifi" delay={0.1}>
          <img src={hifiA} alt="High-fidelity Fitzi screens" />
          <img src={hifiB} alt="High-fidelity Fitzi closet and try-on screens" />
        </Reveal>
      </section>

      <section className="fitzi-case-study__marketing">
        <Reveal>
          <h2 className="fitzi-case-study__heading">Marketing Designs</h2>
        </Reveal>
        <div className="fitzi-case-study__posts">
          {fitziMarketing.map((post, index) => (
            <Reveal className="fitzi-case-study__post" delay={index * 0.1} key={post.src}>
              <img src={post.src} alt={post.alt} />
            </Reveal>
          ))}
        </div>
      </section>
    </article>
  )
}

export default FitziCaseStudy
