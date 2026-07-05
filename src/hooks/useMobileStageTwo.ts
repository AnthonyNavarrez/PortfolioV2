import { useCallback, useEffect, useRef, useState } from 'react'

const MOBILE_QUERY = '(max-width: 1024px)'
const VISIBILITY_THRESHOLD = 0.75

// Mirrors the desktop `:hover` "stage 2" reveal, but for mobile (no
// hover) — triggers once enough of the card has scrolled into view.
export function useMobileStageTwo() {
  const [active, setActive] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)

  const ref = useCallback((node: Element | null) => {
    observerRef.current?.disconnect()
    observerRef.current = null

    if (!node || !window.matchMedia(MOBILE_QUERY).matches) return

    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: VISIBILITY_THRESHOLD },
    )
    observer.observe(node)
    observerRef.current = observer
  }, [])

  useEffect(() => () => observerRef.current?.disconnect(), [])

  return { ref, active }
}
