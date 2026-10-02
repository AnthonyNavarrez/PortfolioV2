import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AnimatedContent from './AnimatedContent'
import WipNotice from './WipNotice'
import {
  acmColors,
  acmFontsA,
  acmFontsB,
  acmIntro,
  acmSneakPeeks,
  acmSpacing,
  acmTypeSpecimen,
  acmTypeTable,
  acmWebsiteTexture,
  acmWordmarkLogo,
} from '../data/acmDesign'
import './AcmDesignCaseStudy.css'

// Small bobbing arrow at the bottom of the screen, shown only while
// the page is scrolled all the way to the top.
function ScrollHint() {
  const [atTop, setAtTop] = useState(true)

  useEffect(() => {
    const update = () => setAtTop(window.scrollY < 8)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <div className={`acm-design-case-study__scroll-hint${atTop ? '' : ' is-hidden'}`} aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9l6 6 6-6" />
      </svg>
    </div>
  )
}

// Synced from Figma (node 658:1253).
function AcmDesignCaseStudy() {
  return (
    <article className="acm-design-case-study">
      <WipNotice />
      <ScrollHint />

      <Link className="acm-design-case-study__back" to="/" state={{ scrollTo: 'projects' }}>
        Back to Projects
      </Link>

      <header className="acm-design-case-study__header">
        <h1 className="acm-design-case-study__title">
          <img className="acm-design-case-study__wordmark" src={acmWordmarkLogo} alt="acm.design" />
          <span
            className="acm-design-case-study__website"
            style={{ backgroundImage: `url(${acmWebsiteTexture})` }}
          >
            Website
          </span>
        </h1>
        <p className="acm-design-case-study__subtitle">sneak peak</p>
        <p className="acm-design-case-study__intro">{acmIntro}</p>
      </header>

      <div className="acm-design-case-study__videos">
        {acmSneakPeeks.map((clip, index) => (
          <AnimatedContent
            key={index}
            className={`acm-design-case-study__video${clip.src ? ' has-video' : ''}`}
            direction="vertical"
            distance={40}
            duration={0.8}
            threshold={0.2}
          >
            {clip.src && (
              <video src={clip.src} poster={clip.poster} autoPlay muted loop playsInline />
            )}
          </AnimatedContent>
        ))}
      </div>
      <section className="acm-design-case-study__design-system">
        <AnimatedContent direction="vertical" distance={40} duration={0.8} threshold={0.3}>
          <h2 className="acm-design-case-study__ds-heading">Design System</h2>
        </AnimatedContent>

        <AnimatedContent direction="vertical" distance={40} duration={0.8} threshold={0.2}>
          <img className="acm-design-case-study__ds-colors" src={acmColors} alt="acm.design color palette" />
        </AnimatedContent>

        <AnimatedContent className="acm-design-case-study__ds-grid" direction="vertical" distance={40} duration={0.8} threshold={0.1}>
          <img className="acm-design-case-study__ds-spacing" src={acmSpacing} alt="acm.design spacing scale" />
          <div className="acm-design-case-study__ds-fonts">
            <img src={acmFontsA} alt="acm.design typefaces" />
            <img src={acmFontsB} alt="acm.design typefaces" />
          </div>
          <img className="acm-design-case-study__ds-table" src={acmTypeTable} alt="acm.design type scale" />
          <div className="acm-design-case-study__ds-specimen">
            {acmTypeSpecimen.map((item, index) => (
              <p className={`acm-design-case-study__type acm-design-case-study__type--${item.modifier}`} key={index}>
                {item.label}
              </p>
            ))}
          </div>
        </AnimatedContent>
      </section>
    </article>
  )
}

export default AcmDesignCaseStudy
