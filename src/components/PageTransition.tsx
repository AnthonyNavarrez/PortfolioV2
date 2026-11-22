import { useEffect, useRef, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import './PageTransition.css'

function PageTransition({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const location = useLocation()

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.classList.remove('page-enter')
    void el.offsetWidth // force reflow
    el.classList.add('page-enter')
  }, [location.pathname])

  return (
    <div ref={ref} className="page-enter">
      {children}
    </div>
  )
}

export default PageTransition
