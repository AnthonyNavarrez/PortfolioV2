import './SkillsCarousel.css'

export interface Skill {
  name: string
  icon: string
  // Chip variant only: icon box size in px, and an optional crop of the
  // source image inside that box as % of the box (left, top, width,
  // height), as Figma lays it out. Without a crop the image covers it.
  iconWidth?: number
  iconHeight?: number
  iconCrop?: [number, number, number, number]
}

interface SkillsCarouselProps {
  skills: Skill[]
  // 'chips' — each skill in its own translucent pill (Hand VFX, node 623:940).
  variant?: 'chips'
}

function ChipIcon({ skill }: { skill: Skill }) {
  const [left, top, width, height] = skill.iconCrop ?? [0, 0, 100, 100]
  return (
    <span
      className="skills-carousel__chip-icon"
      style={{ width: skill.iconWidth, height: skill.iconHeight }}
    >
      <img
        src={skill.icon}
        alt=""
        className={skill.iconCrop ? undefined : 'skills-carousel__chip-icon-img--cover'}
        style={
          skill.iconCrop
            ? { left: `${left}%`, top: `${top}%`, width: `${width}%`, height: `${height}%` }
            : undefined
        }
      />
    </span>
  )
}

function SkillsCarousel({ skills, variant }: SkillsCarouselProps) {
  const items = [...skills, ...skills]

  return (
    <div className={variant ? `skills-carousel skills-carousel--${variant}` : 'skills-carousel'}>
      <div className="skills-carousel__track">
        {items.map((skill, index) => (
          <span className="skills-carousel__item" key={`${skill.name}-${index}`}>
            {variant === 'chips' ? (
              <ChipIcon skill={skill} />
            ) : (
              <img className="skills-carousel__icon" src={skill.icon} alt="" />
            )}
            <span className="skills-carousel__label">{skill.name}</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default SkillsCarousel
