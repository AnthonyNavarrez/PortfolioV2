import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import StarsBg from './StarsBg'
import './CustomCursor.css'

function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const location = useLocation()

  useEffect(() => {
    const el = cursorRef.current
    if (!el) return
    el.classList.remove('custom-cursor--case-study')
    el.classList.remove('custom-cursor--wish')
    el.classList.remove('custom-cursor--add')
    el.classList.remove('custom-cursor--v4-card')
    el.classList.remove('custom-cursor--text')
    el.classList.remove('custom-cursor--email')
    el.classList.remove('custom-cursor--email-copied')
    el.classList.remove('custom-cursor--linkedin')
    el.classList.remove('custom-cursor--github')
    el.classList.remove('custom-cursor--resume')
    el.style.removeProperty('background')
    el.style.removeProperty('mix-blend-mode')
  }, [location.pathname])

  useEffect(() => {
    const el = cursorRef.current
    if (!el) return

    let raf: number
    let x = -100
    let y = -100
    let scale = 1
    let targetScale = 1

    const onMove = (e: MouseEvent) => {
      x = e.clientX
      y = e.clientY
    }

    const nearestCursor = (node: Element | null) =>
      node?.closest('[data-cursor]')?.getAttribute('data-cursor') ?? null

    const TEXT_SELECTORS = 'p, h1, h2, h3, h4, h5, h6, li, td, th, blockquote, span'
    const isTextEl = (node: Element | null) => {
      if (!node) return false
      if (node.closest('a, button, [role="button"], [data-cursor]')) return false
      return node.closest(TEXT_SELECTORS) !== null
    }

    const applyZone = (zone: string | null) => {
      el.classList.toggle('custom-cursor--case-study', zone === 'case-study')
      el.classList.toggle('custom-cursor--wish',       zone === 'wish')
      el.classList.toggle('custom-cursor--add',        zone === 'add')
      el.classList.toggle('custom-cursor--v4-card',    zone === 'v4-card')
      el.classList.toggle('custom-cursor--email',      zone === 'email')
      el.classList.toggle('custom-cursor--linkedin',   zone === 'linkedin')
      el.classList.toggle('custom-cursor--github',     zone === 'github')
      el.classList.toggle('custom-cursor--resume',     zone === 'resume')
    }

    let copyTimer: ReturnType<typeof setTimeout> | null = null
    const onEmailCopy = () => {
      el.classList.add('custom-cursor--email-copied')
      if (copyTimer) clearTimeout(copyTimer)
      copyTimer = setTimeout(() => el.classList.remove('custom-cursor--email-copied'), 2500)
    }
    const onEmailCopyEnd = () => {
      el.classList.remove('custom-cursor--email-copied')
      if (copyTimer) { clearTimeout(copyTimer); copyTimer = null }
    }
    window.addEventListener('email-copy',     onEmailCopy)
    window.addEventListener('email-copy-end', onEmailCopyEnd)

    const setSwatchColor = (color: string | null) => {
      if (color) {
        el.style.background = color
        el.style.mixBlendMode = 'normal'
      } else {
        el.style.removeProperty('background')
        el.style.removeProperty('mix-blend-mode')
      }
    }

    const onEnter = (e: MouseEvent) => {
      const t    = e.target as Element
      const from = e.relatedTarget as Element | null
      const toZone   = nearestCursor(t)
      const fromZone = nearestCursor(from)
      if (toZone !== fromZone) applyZone(toZone)
      el.classList.toggle('custom-cursor--text', isTextEl(t) && !toZone)
      if (t.closest('a, button, [role="button"]') && !from?.closest('a, button, [role="button"]')) {
        targetScale = 1.55
      }
      if (toZone === 'swatch') {
        const color = (t.closest('[data-cursor-color]') as HTMLElement | null)?.dataset.cursorColor ?? null
        setSwatchColor(color)
      } else if (fromZone === 'swatch') {
        setSwatchColor(null)
      }
    }

    const onLeave = (e: MouseEvent) => {
      const t  = e.target as Element
      const to = e.relatedTarget as Element | null
      const fromZone = nearestCursor(t)
      const toZone   = nearestCursor(to)
      if (toZone !== fromZone) applyZone(toZone)
      el.classList.toggle('custom-cursor--text', isTextEl(to) && !toZone)
      if (t.closest('a, button, [role="button"]') && !to?.closest('a, button, [role="button"]')) {
        targetScale = 1
      }
      if (fromZone === 'swatch' && toZone !== 'swatch') {
        setSwatchColor(null)
      }
    }

    const tick = () => {
      scale += (targetScale - scale) * 0.18
      el.style.transform = `translate(${x}px, ${y}px) scale(${scale})`
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onEnter)
    window.addEventListener('mouseout', onLeave)
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onEnter)
      window.removeEventListener('mouseout', onLeave)
      window.removeEventListener('email-copy',     onEmailCopy)
      window.removeEventListener('email-copy-end', onEmailCopyEnd)
      cancelAnimationFrame(raf)
      if (copyTimer) clearTimeout(copyTimer)
    }
  }, [])

  return (
    <div ref={cursorRef} className="custom-cursor">
      <StarsBg className="custom-cursor__stars" speed={12} factor={0} density={3} motion="float" />
      <span className="custom-cursor__label custom-cursor__label--case-study">View case study</span>
      <span className="custom-cursor__label custom-cursor__label--wish">Share a <em>Wish</em></span>
      <span className="custom-cursor__label custom-cursor__label--v4-card">Case Study</span>
      <span className="custom-cursor__label custom-cursor__label--email">Copy email</span>
      <span className="custom-cursor__label custom-cursor__label--email-copied">Copied!</span>
      <span className="custom-cursor__label custom-cursor__label--linkedin">LinkedIn ↗</span>
      <span className="custom-cursor__label custom-cursor__label--github">GitHub ↗</span>
      <span className="custom-cursor__label custom-cursor__label--resume">Resume ↗</span>
    </div>
  )
}

export default CustomCursor
