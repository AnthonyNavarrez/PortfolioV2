import aboutBaby from '../assets/about/about-baby.webp'
import aboutDrinks from '../assets/about/about-drinks.webp'
import aboutHeadshot from '../assets/about/about-headshot.webp'
import aboutLeg from '../assets/about/about-leg.webp'
import aboutResurgance from '../assets/about/about-resurgance.webp'
import aboutSolo from '../assets/about/about-solo.webp'
import aboutTrophy from '../assets/about/about-trophy.webp'
import { aboutBio, aboutContactLinks } from '../data/about'
import './About.css'
import { DraggableCardBody, DraggableCardContainer } from './DraggableCard'

interface AboutPhoto {
  src: string
  alt: string
  position: number
  rotate: number
  caption?: string
}

const aboutPhotos: AboutPhoto[] = [
  { src: aboutHeadshot, alt: 'Headshot of Anthony Navarrez', position: 1, rotate: 2, caption: 'Drag me!' },
  { src: aboutBaby, alt: 'Anthony Navarrez as a baby', position: 2, rotate: -1 },
  { src: aboutDrinks, alt: 'Anthony Navarrez enjoying a drink', position: 3, rotate: 0 },
  { src: aboutTrophy, alt: 'Anthony Navarrez holding a dance competition trophy', position: 4, rotate: -2 },
  { src: aboutLeg, alt: 'Anthony Navarrez recovering from a leg injury', position: 5, rotate: 2 },
  { src: aboutResurgance, alt: 'Anthony Navarrez at a comeback moment', position: 6, rotate: 2 },
  { src: aboutSolo, alt: 'Anthony Navarrez solo photo', position: 7, rotate: -9 },
]

function About() {
  return (
    <section className="about">
      <div className="about__content">
        <h2 className="about__heading">Hello, I’m Anthony</h2>
        <p className="about__subtitle">Computer science student at UCLA</p>

        {aboutBio.map((paragraph) => (
          <p className="about__bio" key={paragraph.slice(0, 24)}>
            {paragraph}
          </p>
        ))}

        <h2 className="about__heading about__heading--contact">
          Contact Me
        </h2>

        <ul className="about__links">
          {aboutContactLinks.map((link) => (
            <li className="about__link-item" key={link.name}>
              <a
                className="about__link"
                href={link.href}
                target="_blank"
                rel="noreferrer"
              >
                <img className="about__link-icon" src={link.icon} alt="" />
                <span>{link.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <DraggableCardContainer className="about__cards">
        {aboutPhotos.map((photo) => (
          <DraggableCardBody
            className={`about__card about__card--photo about__card--${photo.position}`}
            rotate={photo.rotate}
            key={photo.src}
          >
            <div className="about__photo-inset">
              <img className="about__card-image" src={photo.src} alt={photo.alt} />
            </div>
            {photo.caption && (
              <span className="about__card-caption">{photo.caption}</span>
            )}
          </DraggableCardBody>
        ))}
      </DraggableCardContainer>
    </section>
  )
}

export default About
