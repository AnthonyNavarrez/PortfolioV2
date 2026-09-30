import { useEffect, useRef, useState } from 'react'
import './WipNotice.css'

// Matches the fade-out duration in WipNotice.css.
const CLOSE_MS = 300

// "Work in progress" pop-up shown when an in-progress case study opens
// (node 653:1388). Clicking anywhere or pressing Escape dismisses it.
function WipNotice() {
  const [state, setState] = useState<'open' | 'closing' | 'closed'>('open')
  const cardRef = useRef<HTMLDivElement>(null)

  const close = () => setState((current) => (current === 'open' ? 'closing' : current))
  const isOpen = state !== 'closed'

  useEffect(() => {
    if (!isOpen) return

    cardRef.current?.focus()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setState((current) => (current === 'open' ? 'closing' : current))
      }
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen])

  useEffect(() => {
    if (state !== 'closing') return
    const timeout = setTimeout(() => setState('closed'), CLOSE_MS)
    return () => clearTimeout(timeout)
  }, [state])

  if (state === 'closed') return null

  return (
    <div
      className={`wip-notice${state === 'closing' ? ' is-closing' : ''}`}
      onClick={close}
    >
      <div
        ref={cardRef}
        className="wip-notice__card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="wip-notice-title"
        aria-describedby="wip-notice-text"
        tabIndex={-1}
      >
        <p id="wip-notice-title" className="wip-notice__title">
          Note:
        </p>
        <p id="wip-notice-text" className="wip-notice__text">
          This project is ongoing and currently a work in progress
        </p>
      </div>
    </div>
  )
}

export default WipNotice
