import { Link } from 'react-router-dom'
import Sidebar from './Sidebar'
import StarsBg from './StarsBg'
import ConstellationFooter from './ConstellationFooter'
import { useFooterStars } from '../contexts/FooterStarsContext'
import sparkleDiamond from '../assets/v3/sparkle-diamond.svg'
import ellipsePurple from '../assets/v3/ellipse-purple.svg'
import homieThumbnail from '../assets/v3/homie-thumbnail.png'
import momentoThumbnail from '../assets/v3/momento-thumbnail.png'
import fitziThumbnail from '../assets/v3/fitzi-thumbnail.png'
import homebodyThumbnail from '../assets/v3/homebody-thumbnail.png'
import Mascot from './Mascot'
import './WorkPage.css'

interface Project {
  title: string
  thumbnail: string
  thumbnailHeight: string
  tags: string[]
  description: string
  href?: string
  bordered?: boolean
}

const projects: Project[] = [
  {
    title: 'Homie',
    thumbnail: homieThumbnail,
    thumbnailHeight: '147.33%',
    tags: ['Mobile app', 'UX Research', '0 → 1'],
    description: 'Designed a digital household facilitating roomate coordination',
    href: '/homie',
  },
  {
    title: 'Momento',
    thumbnail: momentoThumbnail,
    thumbnailHeight: '113.09%',
    tags: ['Web app', 'Design', '0 → 1'],
    description: 'Pin memories on a live interactive map of LA',
    href: '/momento',
  },
  {
    title: 'Fitzi',
    thumbnail: fitziThumbnail,
    thumbnailHeight: '136.71%',
    tags: ['Startup', 'Design', 'AI'],
    description: 'AI-powered digital wardrobe, style a personalized avatar',
    href: '/fitzi',
  },
  {
    title: 'Homebody',
    thumbnail: homebodyThumbnail,
    thumbnailHeight: '100.87%',
    tags: ['Videogame', 'Browser', '0 → 1'],
    description: 'Survive each night, protect your base, explore the map',
    href: '/homebody',
    bordered: true,
  },
]

function WorkPage() {
  const { placed } = useFooterStars()
  return (
    <div className="work-page">
      <Sidebar />

      {/* Main content */}
      <main className="work-page__main">
        <Mascot />
        <StarsBg className="main__stars" speed={90} factor={0.04} direction="up" />
        <div className="main__sparkle-wrap">
          <img src={sparkleDiamond} alt="" className="main__sparkle" />
          <Link to="/wishes" className="main__sparkle-link" data-cursor="wish" aria-label="Share a wish" />
        </div>
        <img src={ellipsePurple} alt="" className="main__ellipse-purple" />

        <div className="main__hero">
          <span className="main__greeting">Hi, I'm Anthony!</span><span className="main__bio"> ⋆˙⟡  A product designer with a technical background, sparking a little wonder by bringing cutting-edge tech to everyday people through thoughtful, intuitive design.</span>
        </div>

        <div className="main__grid">
          {projects.map((project) => {
            const card = (
              <div className={`project-item__card${project.bordered ? ' project-item__card--bordered' : ''}`}>
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="project-item__thumbnail"
                  style={{ height: project.thumbnailHeight }}
                />
              </div>
            )

            return (
              <div className="project-item" key={project.title}>
                {project.href ? (
                  <Link to={project.href} className="project-item__link" data-cursor="case-study">
                    {card}
                  </Link>
                ) : (
                  card
                )}
                <div className="project-item__meta">
                  <div className="project-item__title-row">
                    <h2 className="project-item__title">{project.title}</h2>
                    <div className="project-item__tags">
                      {project.tags.map((tag) => (
                        <span key={tag} className="project-item__tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <p className="project-item__desc">{project.description}</p>
                </div>
              </div>
            )
          })}
        </div>

        <ConstellationFooter className="main__footer">
          <p className={`main__footer-text${placed.length > 0 ? ' main__footer-text--hidden' : ''}`}>
            Click to add a <span className="main__footer-star">star</span>
          </p>
        </ConstellationFooter>
      </main>
    </div>
  )
}

export default WorkPage
