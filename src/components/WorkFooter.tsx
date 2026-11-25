import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import FooterMascot from './FooterMascot'
import iconMail     from '../assets/v4/icon-mail.svg'
import iconLinkedin from '../assets/v4/icon-linkedin.svg'
import iconGithub   from '../assets/v4/icon-github.svg'
import iconResume   from '../assets/v4/icon-resume.svg'

const easeOut = (t: number) => 1 - Math.pow(1 - t, 2.5)

export default function WorkFooter() {
  const footerRef = useRef<HTMLElement>(null)
  const iconsRef  = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  // Mascot slide-in trigger
  useEffect(() => {
    const el = footerRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.05 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // Icon FLIP: scroll-driven fly from nav column → footer row
  useEffect(() => {
    const footer = footerRef.current
    const iconsEl = iconsRef.current
    if (!footer || !iconsEl) return

    const update = () => {
      const footerRect = footer.getBoundingClientRect()
      // Animation window: footer top goes from viewport bottom → 40% up screen
      const progress = Math.max(0, Math.min(1,
        (window.innerHeight - footerRect.top) / (window.innerHeight * 0.6)
      ))
      const eased = easeOut(progress)

      // Fade out the vertical nav icon column as icons depart
      const navSocial = document.querySelector<HTMLElement>('.nav-sb__social')
      if (navSocial) {
        navSocial.style.opacity    = String(Math.max(0, 1 - progress * 2.5))
        navSocial.style.pointerEvents = progress > 0.35 ? 'none' : ''
      }

      const navIcons = Array.from(
        document.querySelectorAll<HTMLElement>('.nav-sb__social > *')
      )
      const footerIconEls = Array.from(iconsEl.children as HTMLCollectionOf<HTMLElement>)

      footerIconEls.forEach((footerIcon, i) => {
        const navIcon = navIcons[i]

        // Opacity: fade in with progress
        footerIcon.style.opacity = String(eased)

        if (!navIcon || progress <= 0) {
          footerIcon.style.transform = ''
          return
        }

        // FLIP: compute delta from footer position to nav position, lerp to zero
        const nRect = navIcon.getBoundingClientRect()
        const fRect = footerIcon.getBoundingClientRect()
        const dx = (nRect.left + nRect.width  / 2) - (fRect.left + fRect.width  / 2)
        const dy = (nRect.top  + nRect.height / 2) - (fRect.top  + fRect.height / 2)

        footerIcon.style.transform =
          `translate(${(dx * (1 - eased)).toFixed(1)}px, ${(dy * (1 - eased)).toFixed(1)}px)`
      })
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => {
      window.removeEventListener('scroll', update)
      const navSocial = document.querySelector<HTMLElement>('.nav-sb__social')
      if (navSocial) { navSocial.style.opacity = ''; navSocial.style.pointerEvents = '' }
    }
  }, [])

  const handleEmailClick = () => {
    navigator.clipboard.writeText('pnav6546@g.ucla.edu')
    window.dispatchEvent(new CustomEvent('email-copy'))
    setTimeout(() => window.dispatchEvent(new CustomEvent('email-copy-end')), 2500)
  }

  return (
    <footer ref={footerRef} className="v4-footer">
      <div className={`v4-footer__mascot-wrap${visible ? ' v4-footer__mascot-wrap--visible' : ''}`}>
        <FooterMascot />
      </div>

      {/* Icons fly from nav vertical column → this horizontal row */}
      <div ref={iconsRef} className="v4-footer__icons">
        <button className="v4-footer__icon" onClick={handleEmailClick} aria-label="Copy email">
          <img src={iconMail} alt="Email" />
        </button>
        <a
          href="https://www.linkedin.com/in/anthonynavarrez"
          className="v4-footer__icon"
          target="_blank" rel="noreferrer"
          aria-label="LinkedIn"
        >
          <img src={iconLinkedin} alt="LinkedIn" />
        </a>
        <a
          href="https://github.com/AnthonyNavarrez"
          className="v4-footer__icon"
          target="_blank" rel="noreferrer"
          aria-label="GitHub"
        >
          <img src={iconGithub} alt="GitHub" />
        </a>
        <Link to="/resume" className="v4-footer__icon" aria-label="Resume">
          <img src={iconResume} alt="Resume" />
        </Link>
      </div>

      <div className="v4-footer__credits">
        <span className="v4-footer__name">Anthony Navarrez</span>
        <span className="v4-footer__updated">Last Updated: 11.14.26</span>
      </div>
    </footer>
  )
}
