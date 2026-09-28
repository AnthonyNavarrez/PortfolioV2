import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useMobileStageTwo } from '../hooks/useMobileStageTwo'
import SkillsCarousel, { type Skill } from './SkillsCarousel'
import './ProjectCard.css'

interface ProjectCardPlaceholderProps {
  expand: 'right' | 'center' | 'left'
  background?: string
  hoverBackground?: string
  logo?: string
  logoAlt?: string
  description?: string
  mockup?: string
  skills?: Skill[]
  href?: string
  // Shown centered on the card until real Figma art is supplied.
  label?: string
  // Card-specific art rendered inside the card, above the backgrounds.
  children?: ReactNode
  variant?: string
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
  label,
  children,
  variant,
}: ProjectCardPlaceholderProps) {
  const { ref, active } = useMobileStageTwo()

  const className = variant
    ? `project-card-placeholder project-card-placeholder--${expand} project-card-placeholder--${variant}`
    : `project-card-placeholder project-card-placeholder--${expand}`
  const stageClassName = active ? `${className} is-stage2` : className

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
      {children}
      {logo && <img className="project-card-placeholder__logo" src={logo} alt={logoAlt ?? ''} />}
      {description && (
        <p className="project-card-placeholder__description">{description}</p>
      )}
      {label && <span className="project-card-placeholder__label">{label}</span>}
      {mockup && <img className="project-card-placeholder__mockup" src={mockup} alt="" />}
    </>
  )

  return (
    <div className="project-card-slot">
      {href ? (
        <Link ref={ref} className={stageClassName} to={href}>
          {content}
        </Link>
      ) : (
        <div ref={ref} className={stageClassName}>
          {content}
        </div>
      )}

      {skills && (
        <div
          className={`project-card-placeholder__carousel project-card-placeholder__carousel--${expand}`}
        >
          <SkillsCarousel skills={skills} />
        </div>
      )}
    </div>
  )
}

export default ProjectCardPlaceholder
