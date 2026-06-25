import './ProjectCard.css'

interface ProjectCardPlaceholderProps {
  expand: 'center' | 'left'
}

function ProjectCardPlaceholder({ expand }: ProjectCardPlaceholderProps) {
  return (
    <div className="project-card-slot">
      <div className={`project-card-placeholder project-card-placeholder--${expand}`} />
    </div>
  )
}

export default ProjectCardPlaceholder
