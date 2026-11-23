import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import StarsBg from './StarsBg'
import avatarLogo from '../assets/v3/avatar-logo.svg'
import iconLocation from '../assets/v3/icon-location.svg'
import iconFolder from '../assets/v3/icon-folder.svg'
import iconPalette from '../assets/v3/icon-palette.svg'
import iconUser from '../assets/v3/icon-user.svg'
import ellipseBlue from '../assets/v3/ellipse-blue.svg'
import './Sidebar.css'

const NAV_ITEMS = [
  { label: 'Work',    icon: iconFolder,  href: '/',        iconClass: '' },
  { label: 'Designs', icon: iconPalette, href: '/designs', iconClass: '' },
  { label: 'About',   icon: iconUser,    href: '/about',   iconClass: '' },
]

function NavItem({ label, icon, href, iconClass, active, onClose }: {
  label: string
  icon: string
  href: string | null
  iconClass: string
  active: boolean
  onClose?: () => void
}) {
  const inner = (
    <>
      {active && (
        <StarsBg className="sidebar__nav-stars" speed={12} factor={0.015} density={3} motion="float" />
      )}
      <img src={icon} alt="" className={`sidebar__nav-icon ${iconClass}`} style={{ position: 'relative', zIndex: 1 }} />
      <span className="sidebar__nav-item-label" style={{ position: 'relative', zIndex: 1 }}>{label}</span>
    </>
  )

  const cls = `sidebar__nav-item${active ? ' sidebar__nav-item--active' : ''}`

  if (href) {
    return <Link to={href} className={cls} onClick={onClose}>{inner}</Link>
  }
  return <a href="#" className={cls} onClick={onClose}>{inner}</a>
}

function Sidebar() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)

  return (
    <>
      <button className="sidebar__hamburger" onClick={() => setOpen(o => !o)} aria-label="Menu">
        <span /><span /><span />
      </button>
      <div className={`sidebar__overlay${open ? ' sidebar__overlay--visible' : ''}`} onClick={() => setOpen(false)} />
      <aside className={`sidebar${open ? ' sidebar--open' : ''}`}>
        <div className="sidebar__header">
          <img src={avatarLogo} alt="" className="sidebar__avatar" />
          <div>
            <p className="sidebar__name">Anthony Navarrez</p>
            <p className="sidebar__school">CS and Ling @ UCLA</p>
          </div>
        </div>

        <div className="sidebar__location">
          <div className="sidebar__location-row">
            <img src={iconLocation} alt="" className="sidebar__location-icon" />
            <span className="sidebar__location-text">Los Angeles, CA</span>
          </div>
          <p className="sidebar__updated">Last Updated: 11.18.26</p>
        </div>

        <nav className="sidebar__nav">
          {NAV_ITEMS.map(item => (
            <NavItem
              key={item.label}
              {...item}
              active={item.href !== null && pathname === item.href}
              onClose={() => setOpen(false)}
            />
          ))}
        </nav>

        <div className="sidebar__links">
          <a href="mailto:pnav6546@g.ucla.edu" className="sidebar__link">Email</a>
          <a href="https://www.linkedin.com/in/anthonynavarrez" target="_blank" rel="noreferrer" className="sidebar__link">LinkedIn</a>
          <a href="https://github.com/AnthonyNavarrez" target="_blank" rel="noreferrer" className="sidebar__link">GitHub</a>
          <Link to="/resume" className="sidebar__link" onClick={() => setOpen(false)}>Resume</Link>
        </div>

        <img src={ellipseBlue} alt="" className="sidebar__ellipse-blue" />
      </aside>
    </>
  )
}

export default Sidebar
