import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useNavSidebarCtx } from '../contexts/NavSidebarContext'
import iconCaretLeft from '../assets/v4/icon-caret-left.svg'
import iconMail     from '../assets/v4/icon-mail.svg'
import iconLinkedin from '../assets/v4/icon-linkedin.svg'
import iconGithub   from '../assets/v4/icon-github.svg'
import iconResume   from '../assets/v4/icon-resume.svg'
import './NavSidebar.css'

const darkRoutes: string[] = []

export default function NavSidebar() {
  const { pathname } = useLocation()
  const { sections } = useNavSidebarCtx()
  const dark = darkRoutes.includes(pathname)
  const [activeId, setActiveId] = useState('')
  const [emailCopied, setEmailCopied] = useState(false)
  const [atBottom, setAtBottom] = useState(false)

  useEffect(() => {
    const check = () => {
      const { scrollY, innerHeight } = window
      const { scrollHeight } = document.documentElement
      setAtBottom(scrollY + innerHeight >= scrollHeight - 32)
    }
    check()
    window.addEventListener('scroll', check, { passive: true })
    return () => window.removeEventListener('scroll', check)
  }, [])
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleEmailClick = () => {
    navigator.clipboard.writeText('pnav6546@g.ucla.edu')
    setEmailCopied(true)
    window.dispatchEvent(new CustomEvent('email-copy'))
    if (copyTimerRef.current) clearTimeout(copyTimerRef.current)
    copyTimerRef.current = setTimeout(() => {
      setEmailCopied(false)
      window.dispatchEvent(new CustomEvent('email-copy-end'))
    }, 2500)
  }

  useEffect(() => {
    if (!sections?.length) return
    const observers: IntersectionObserver[] = []
    sections.forEach(s => {
      const el = document.getElementById(s.id)
      if (!el) return
      const obs = new IntersectionObserver(
        entries => { for (const e of entries) if (e.isIntersecting) setActiveId(e.target.id) },
        { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [sections])

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  const NAV = [
    { to: '/', label: 'Work' },
    { to: '/designs', label: 'Designs' },
    { to: '/about', label: 'About' },
    { to: '/message', label: 'Message' },
  ]
  const isCaseStudy = !['/', '/designs', '/about', '/resume', '/message'].includes(pathname)
  const activeNavIndex = NAV.findIndex(n => n.to === pathname)

  const ITEM_H  = 30
  const ITEM_GAP = 10

  const { navHeader } = useNavSidebarCtx()

  return (
    <>
    {isCaseStudy && (
      <Link to="/" className="nav-sb__back-mobile">
        <img src={iconCaretLeft} alt="" className="nav-sb__back-icon" />
        Back
      </Link>
    )}
    <aside className={`nav-sb${dark ? ' nav-sb--dark' : ''}`}>
      {navHeader && (
        <div className="nav-sb__header-slot">
          {navHeader}
        </div>
      )}
      {isCaseStudy && (
        <Link to="/" className="nav-sb__back">
          <img src={iconCaretLeft} alt="" className="nav-sb__back-icon" />
          Back
        </Link>
      )}
      <div className="nav-sb__group">
        {!isCaseStudy && (
          <nav className="nav-sb__main">
            {activeNavIndex !== -1 && (
              <span
                className="nav-sb__indicator"
                style={{ transform: `translateY(${activeNavIndex * (ITEM_H + ITEM_GAP)}px)` }}
              />
            )}
            {NAV.map(n => (
              <Link
                key={n.to}
                to={n.to}
                className={`nav-sb__navlink${n.to === pathname ? ' nav-sb__navlink--active' : ''}`}
              >
                {n.label}
              </Link>
            ))}
          </nav>
        )}
        {sections?.length ? (
          <nav className={`nav-sb__sections${isCaseStudy ? ' nav-sb__sections--alone' : ''}`}>
            {sections.map(s => (
              <button
                key={s.id}
                className={`nav-sb__section-btn${activeId === s.id ? ' nav-sb__section-btn--active' : ''}`}
                onClick={() => scrollTo(s.id)}
              >
                {s.label}
              </button>
            ))}
          </nav>
        ) : null}
      </div>

      {!isCaseStudy && (
        <>
          <div className="nav-sb__social">
            <button
              className="nav-sb__email-btn"
              data-cursor="email"
              onClick={handleEmailClick}
              aria-label="Copy email address"
            >
              {emailCopied
                ? <span className="nav-sb__email-copied">Copied!</span>
                : <img src={iconMail} alt="Email" />
              }
            </button>
            <a href="https://www.linkedin.com/in/anthonynavarrez" className="nav-sb__social-link" target="_blank" rel="noreferrer" data-cursor="linkedin"><img src={iconLinkedin} alt="LinkedIn"  /></a>
            <a href="https://github.com/AnthonyNavarrez"          className="nav-sb__social-link" target="_blank" rel="noreferrer" data-cursor="github"><img src={iconGithub}   alt="GitHub"   /></a>
            <Link to="/resume"                                     className="nav-sb__social-link"><img src={iconResume}  alt="Resume"   /></Link>
          </div>

          <p className={`nav-sb__updated${atBottom ? ' nav-sb__updated--visible' : ''}`}>Last Updated: 11.20.26</p>
        </>
      )}
    </aside>
    </>
  )
}
