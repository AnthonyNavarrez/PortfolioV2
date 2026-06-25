import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'
import homieGetStartedScreen from '../assets/homie-get-started-screen.webp'
import homieMockupFrame from '../assets/homie-mockup-frame.webp'
import homieTextConvoScreen from '../assets/homie-text-convo-screen.webp'
import './HomieDescriptionMockup.css'

gsap.registerPlugin(ScrollTrigger)

function HomieDescriptionMockup() {
  const rootRef = useRef<HTMLDivElement>(null)
  const slideRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const root = rootRef.current
    const slide = slideRef.current
    if (!root || !slide) return

    gsap.set(slide, { yPercent: 100 })

    // Tied to the mockup's own position (not the description section's),
    // so the scrub range is guaranteed to occur while it's still on
    // screen — "halfway down" is when it's centered in the viewport.
    const st = ScrollTrigger.create({
      trigger: root,
      start: 'center center',
      end: 'top top',
      scrub: true,
      onUpdate: (self) => {
        gsap.set(slide, { yPercent: 100 - self.progress * 100 })
      },
    })

    return () => {
      st.kill()
    }
  }, [])

  return (
    <div className="homie-description-mockup" ref={rootRef}>
      <img
        className="homie-description-mockup__frame"
        src={homieMockupFrame}
        alt=""
      />

      <div className="homie-description-mockup__screen">
        <img
          className="homie-description-mockup__screen-img"
          src={homieTextConvoScreen}
          alt="Text conversation between roommates about chores and chore-related conflict"
        />
        <img
          ref={slideRef}
          className="homie-description-mockup__screen-img homie-description-mockup__screen-img--overlay"
          src={homieGetStartedScreen}
          alt="Homie onboarding welcome screen"
        />
      </div>
    </div>
  )
}

export default HomieDescriptionMockup
