import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import avatarLogo from '../assets/v3/avatar-logo.svg'
import iconCaretLeft from '../assets/v3/icon-caret-left.svg'
import ellipseBlue from '../assets/v3/ellipse-blue.svg'
import './CaseStudySidebar.css'

interface Section {
  id: string
  label: string
}

interface Props {
  sections: Section[]
  backTo?: string
}

function CaseStudySidebar({ sections, backTo = '/' }: Props) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const ids = sections.map(s => s.id)
    const observers: IntersectionObserver[] = []

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id)
        }
      }
    }

    ids.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(handleIntersect, {
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0,
      })
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach(o => o.disconnect())
  }, [sections])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
    <Link to={backTo} className="cs-sidebar__back-mobile">
      <img src={iconCaretLeft} alt="" className="cs-sidebar__back-icon" />
      <span>Back</span>
    </Link>
    <aside className="cs-sidebar">
      <div className="cs-sidebar__header">
        <img src={avatarLogo} alt="" className="cs-sidebar__avatar" />
        <div>
          <p className="cs-sidebar__name">Anthony Navarrez</p>
          <p className="cs-sidebar__school">CS and Ling @ UCLA</p>
        </div>
      </div>

      <Link to={backTo} className="cs-sidebar__back">
        <img src={iconCaretLeft} alt="" className="cs-sidebar__back-icon" />
        <span>Back</span>
      </Link>

      <nav className="cs-sidebar__nav">
        {sections.map(s => (
          <button
            key={s.id}
            className={`cs-sidebar__nav-item${activeId === s.id ? ' cs-sidebar__nav-item--active' : ''}`}
            onClick={() => scrollTo(s.id)}
          >
            {s.label}
          </button>
        ))}
      </nav>

      <img src={ellipseBlue} alt="" className="cs-sidebar__ellipse-blue" />
    </aside>
    </>
  )
}

export default CaseStudySidebar
