import { useEffect, useRef, useState } from 'react'
import BackToTop from './BackToTop'

// ACM Design Marketing
import designW1 from '../assets/designs/design-w1.webp'
import designW2 from '../assets/designs/design-w2.webp'
import designW3 from '../assets/designs/design-w3.webp'
import designW4 from '../assets/designs/design-w4.webp'
import designW6 from '../assets/designs/design-w6.webp'
import designW7 from '../assets/designs/design-w7.webp'
import designW8 from '../assets/designs/design-w8.webp'
import designFrame5a from '../assets/designs/design-frame5-1.webp'
import designFrame14 from '../assets/designs/design-frame14.webp'
import designFrame31 from '../assets/designs/Frame 31 (1).png'
import designFrame32 from '../assets/designs/Frame 32 (1).png'
import designFrameNew from '../assets/designs/Frame (1).png'

// AWS @ UCLA Marketing
import designWinterRecap from '../assets/designs/design-winterrecap.webp'
import designIgFireside from '../assets/designs/design-ig-fireside.webp'

// Fitzi Marketing
import fitziMarketing1 from '../assets/fitzi/marketing-1.webp'
import fitziMarketing2 from '../assets/fitzi/marketing-2.webp'
import fitziMarketing3 from '../assets/fitzi/marketing-3.webp'
import fitziMarketing4 from '../assets/fitzi/marketing-4.webp'

// Personal
import design1 from '../assets/design1.png'
import design3 from '../assets/design3.png'
import design4 from '../assets/design4.png'

import './DesignsPage.css'

const sections = [
  {
    label: 'ACM Design Marketing',
    images: [
      designFrame31, designW1, designW2, designW3, designW4, designW6, designW7,
      designW8, designFrame5a, designFrame14,
      designFrame32, designFrameNew,
    ],
  },
  {
    label: 'Fitzi Marketing',
    images: [fitziMarketing1, fitziMarketing2, fitziMarketing3, fitziMarketing4],
  },
  {
    label: 'AWS @ UCLA Marketing',
    images: [designWinterRecap, designIgFireside],
  },
  {
    label: 'Personal',
    images: [design1, design3, design4],
  },
]

function DesignsPage() {
  const mainRef = useRef<HTMLElement>(null)
  const [lightbox, setLightbox] = useState<string | null>(null)

  useEffect(() => {
    if (!lightbox) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightbox(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox])

  useEffect(() => {
    const els = mainRef.current?.querySelectorAll<HTMLElement>('.designs__section')
    if (!els) return
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target) } }),
      { threshold: 0.06 }
    )
    els.forEach(s => obs.observe(s))
    return () => obs.disconnect()
  }, [])

  return (
    <div className="designs-page">
      <main className="designs-page__main" ref={mainRef}>
        {sections.map(section => (
          <div key={section.label} className="designs__section">
            <p className="designs__section-label">{section.label}</p>
            <div className="designs__grid">
              {section.images.map((src, i) => (
                <div key={i} className="designs__item" style={{ animationDelay: `${0.06 + i * 0.04}s` }} onClick={() => setLightbox(src)}>
                  <img src={src} alt="" className="designs__img" />
                </div>
              ))}
            </div>
          </div>
        ))}

        <BackToTop />
      </main>

      {lightbox && (
        <div className="designs__lightbox" onClick={() => setLightbox(null)}>
          <img src={lightbox} alt="" className="designs__lightbox-img" onClick={e => e.stopPropagation()} />
        </div>
      )}
    </div>
  )
}

export default DesignsPage
