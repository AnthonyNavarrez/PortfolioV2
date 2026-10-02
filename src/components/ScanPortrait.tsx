import { useEffect, useRef } from 'react'
import heroPortraitSilhouette from '../assets/hero-portrait-silhouette.svg'
import heroPortraitPhoto from '../assets/hero-portrait-photo.png'
import './ScanPortrait.css'

// Rects the scan box cycles through, as percentages of the portrait
// box — each roughly frames a different part of the outfit. Kept
// within the top of the portrait, which is the part that's on screen.
const SCAN_BOXES = [
  { top: 1, left: 31, width: 27, height: 12 },
  { top: 14, left: 55, width: 24, height: 13 },
  { top: 10, left: 10, width: 36, height: 8 },
  { top: 3, left: 62, width: 23, height: 13 },
]
const SCAN_INTERVAL_MS = 2500
const SCAN_INTERVAL_MOBILE_MS = 1500

// Size of the scan box while it's following the cursor (desktop only) —
// close to the average footprint of the SCAN_BOXES presets above.
const CURSOR_SCAN_WIDTH = 27
const CURSOR_SCAN_HEIGHT = 12

// Silhouette of Anthony with a scan box that roams over it, revealing
// the photo underneath (the V1 hero art). On desktop the box follows
// the cursor while it's over the portrait.
function ScanPortrait({ className }: { className?: string }) {
  const portraitRef = useRef<HTMLDivElement>(null)
  const scanBoxRef = useRef<HTMLDivElement>(null)
  const photoRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const box = scanBoxRef.current
    const photo = photoRef.current
    const portrait = portraitRef.current
    if (!box || !photo || !portrait) return

    const applyBox = (top: number, left: number, width: number, height: number) => {
      box.style.top = `${top}%`
      box.style.left = `${left}%`
      box.style.width = `${width}%`
      box.style.height = `${height}%`
      photo.style.clipPath = `inset(${top}% ${100 - left - width}% ${100 - top - height}% ${left}%)`
    }

    const isMobile = window.matchMedia('(max-width: 1024px)').matches

    let index = 0
    let intervalId: ReturnType<typeof setInterval> | null = null

    const applyPreset = () => {
      const { top, left, width, height } = SCAN_BOXES[index]
      applyBox(top, left, width, height)
    }

    const advance = () => {
      index = (index + 1) % SCAN_BOXES.length
      applyPreset()
    }

    const startCycle = () => {
      applyPreset()
      intervalId = setInterval(advance, isMobile ? SCAN_INTERVAL_MOBILE_MS : SCAN_INTERVAL_MS)
    }

    const stopCycle = () => {
      if (intervalId !== null) {
        clearInterval(intervalId)
        intervalId = null
      }
    }

    startCycle()

    // Cursor-follow is desktop-only — mobile has no hover, so it just
    // keeps the auto-cycle running.
    if (isMobile) {
      return () => stopCycle()
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = portrait.getBoundingClientRect()
      const xPct = ((e.clientX - rect.left) / rect.width) * 100
      const yPct = ((e.clientY - rect.top) / rect.height) * 100

      const left = Math.min(Math.max(xPct - CURSOR_SCAN_WIDTH / 2, 0), 100 - CURSOR_SCAN_WIDTH)
      const top = Math.min(Math.max(yPct - CURSOR_SCAN_HEIGHT / 2, 0), 100 - CURSOR_SCAN_HEIGHT)
      applyBox(top, left, CURSOR_SCAN_WIDTH, CURSOR_SCAN_HEIGHT)
    }

    const handleMouseEnter = (e: MouseEvent) => {
      stopCycle()
      // The box/photo transitions are tuned for the slow auto-cycle
      // glide — disable them so cursor-follow tracks instantly.
      box.style.transition = 'none'
      photo.style.transition = 'none'
      handleMouseMove(e)
    }

    const handleMouseLeave = () => {
      box.style.transition = ''
      photo.style.transition = ''
      startCycle()
    }

    portrait.addEventListener('mouseenter', handleMouseEnter)
    portrait.addEventListener('mousemove', handleMouseMove)
    portrait.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      stopCycle()
      portrait.removeEventListener('mouseenter', handleMouseEnter)
      portrait.removeEventListener('mousemove', handleMouseMove)
      portrait.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div className={className ? `scan-portrait ${className}` : 'scan-portrait'} ref={portraitRef}>
      <img className="scan-portrait__img" src={heroPortraitSilhouette} alt="" aria-hidden="true" />
      <img
        className="scan-portrait__img scan-portrait__img--photo"
        ref={photoRef}
        src={heroPortraitPhoto}
        alt="Portrait of Anthony Navarrez"
      />
      <div className="scan-portrait__box" ref={scanBoxRef} aria-hidden="true" />
    </div>
  )
}

export default ScanPortrait
