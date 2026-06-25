import './SkillsCarousel.css'

export interface Skill {
  name: string
  icon: string
}

interface SkillsCarouselProps {
  skills: Skill[]
}

function SkillsCarousel({ skills }: SkillsCarouselProps) {
  const items = [...skills, ...skills]

  return (
    <div className="skills-carousel">
      <div className="skills-carousel__track">
        {items.map((skill, index) => (
          <span className="skills-carousel__item" key={`${skill.name}-${index}`}>
            <img className="skills-carousel__icon" src={skill.icon} alt="" />
            <span className="skills-carousel__label">{skill.name}</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default SkillsCarousel
