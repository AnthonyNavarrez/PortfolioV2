import { Link } from 'react-router-dom'
import AnimatedContent from './AnimatedContent'
import WipNotice from './WipNotice'
import { acmSneakPeeks, acmWebsiteTexture, acmWordmarkLogo } from '../data/acmDesign'
import './AcmDesignCaseStudy.css'

// Synced from Figma (node 658:1253).
function AcmDesignCaseStudy() {
  return (
    <article className="acm-design-case-study">
      <WipNotice />

      <Link className="acm-design-case-study__back" to="/">
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
    </article>
  )
}

export default AcmDesignCaseStudy
