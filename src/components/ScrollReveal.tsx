import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const SELECTORS = [
  '.v4-header',
  '.v4-card',
  '.about-intro-row',
  '.about-section',
  '.designs-item',
  '.resume-section',
].join(',')

export default function ScrollReveal() {
  const { pathname } = useLocation()

  useEffect(() => {
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll<HTMLElement>(SELECTORS)
      if (!elements.length) return

      const obs = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('sr-visible')
              obs.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
      )

      elements.forEach(el => {
        el.classList.add('sr-hidden')
        obs.observe(el)
      })

      return () => obs.disconnect()
    }, 100)

    return () => clearTimeout(timer)
  }, [pathname])

  return null
}
