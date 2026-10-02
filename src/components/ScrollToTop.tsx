import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Route changes start at the top, unless the link asked to land on a
// section of the page (e.g. "Back to Projects" passes `scrollTo`).
function ScrollToTop() {
  const { pathname, state } = useLocation()
  const target = (state as { scrollTo?: string } | null)?.scrollTo

  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    const section = target ? document.getElementById(target) : null
    if (section) {
      section.scrollIntoView({ behavior: 'instant', block: 'start' })
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }
  }, [pathname, target])

  return null
}

export default ScrollToTop
