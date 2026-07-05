import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useMobileStageTwo } from '../hooks/useMobileStageTwo'
import SkillsCarousel, { type Skill } from './SkillsCarousel'
import './ProjectCard.css'

interface ProjectCardProps {
  background: string
  icon: ReactNode
  title: string
  description: string
  skills?: Skill[]
  mockups?: string[]
  // Mobile-only stage-2 treatment — hidden on desktop, where
  // `mockups` is used instead.
  mobileMockup?: string
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
  mobileMockup,
  href,
  variant,
}: ProjectCardProps) {
  const { ref, active } = useMobileStageTwo()

  const cardClassName = variant
    ? `project-card project-card--${variant}`
    : 'project-card'
  const stageClassName = active ? `${cardClassName} is-stage2` : cardClassName

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

      {mobileMockup && (
        <img className="project-card__device-mockup" src={mobileMockup} alt="" />
      )}
    </>
  )

  return (
    <div className="project-card-slot">
      {href ? (
        <Link
          ref={ref}
          to={href}
          className={stageClassName}
          style={{ backgroundImage: `url(${background})` }}
        >
          {cardContent}
        </Link>
      ) : (
        <div
          ref={ref}
          className={stageClassName}
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
