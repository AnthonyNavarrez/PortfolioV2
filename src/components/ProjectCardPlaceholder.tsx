import { Link } from 'react-router-dom'
import SkillsCarousel, { type Skill } from './SkillsCarousel'
import './ProjectCard.css'

interface ProjectCardPlaceholderProps {
  expand: 'center' | 'left'
  background?: string
  hoverBackground?: string
  logo?: string
  logoAlt?: string
  description?: string
  mockup?: string
  skills?: Skill[]
  href?: string
}

function ProjectCardPlaceholder({
  expand,
  background,
  hoverBackground,
  logo,
  logoAlt,
  description,
  mockup,
  skills,
  href,
}: ProjectCardPlaceholderProps) {
  const className = `project-card-placeholder project-card-placeholder--${expand}`

  const content = (
    <>
      {background && (
        <div
          className="project-card-placeholder__bg"
          style={{ backgroundImage: `url(${background})` }}
        />
      )}
      {hoverBackground && (
        <div
          className="project-card-placeholder__bg project-card-placeholder__bg--hover"
          style={{ backgroundImage: `url(${hoverBackground})` }}
        />
      )}
      {logo && <img className="project-card-placeholder__logo" src={logo} alt={logoAlt ?? ''} />}
      {description && (
        <p className="project-card-placeholder__description">{description}</p>
      )}
      {mockup && <img className="project-card-placeholder__mockup" src={mockup} alt="" />}
    </>
  )

  return (
    <div className="project-card-slot">
      {href ? (
        <Link className={className} to={href}>
          {content}
        </Link>
      ) : (
        <div className={className}>{content}</div>
      )}

      {skills && (
        <div className="project-card-placeholder__carousel">
          <SkillsCarousel skills={skills} />
        </div>
      )}
    </div>
  )
}

export default ProjectCardPlaceholder
