import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import SkillsCarousel, { type Skill } from './SkillsCarousel'
import './ProjectCard.css'

interface ProjectCardProps {
  background: string
  icon: ReactNode
  title: string
  description: string
  skills?: Skill[]
  mockups?: string[]
  href?: string
  variant?: string
}

function ProjectCard({
  background,
  icon,
  title,
  description,
  skills,
  mockups,
  href,
  variant,
}: ProjectCardProps) {
  const cardClassName = variant
    ? `project-card project-card--${variant}`
    : 'project-card'

  const cardContent = (
    <>
      <div className="project-card__overlay">
        <span className="project-card__icon">{icon}</span>
        <div className="project-card__content">
          <span className="project-card__title">{title}</span>
          <p className="project-card__description">{description}</p>
        </div>
      </div>

      {mockups?.map((mockup, index) => (
        <img
          className={`project-card__mockup project-card__mockup--${index}`}
          src={mockup}
          alt=""
          key={mockup}
        />
      ))}
    </>
  )

  return (
    <div className="project-card-slot">
      {href ? (
        <Link
          to={href}
          className={cardClassName}
          style={{ backgroundImage: `url(${background})` }}
        >
          {cardContent}
        </Link>
      ) : (
        <div
          className={cardClassName}
          style={{ backgroundImage: `url(${background})` }}
        >
          {cardContent}
        </div>
      )}

      {skills && (
        <div className="project-card__carousel">
          <SkillsCarousel skills={skills} />
        </div>
      )}
    </div>
  )
}

export default ProjectCard
