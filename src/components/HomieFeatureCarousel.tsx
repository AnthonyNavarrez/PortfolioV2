import { useEffect, useRef } from 'react'
import homieOnboardingVideo from '../assets/Homie-onboarding.mp4'
import dashboardVideo from '../assets/Homie-dashboard.mp4'
import shoppingVideo from '../assets/Homie-Shopping.mp4'
import pantryVideo from '../assets/Homie-Pantry.mp4'
import choresVideo from '../assets/Homie-Chores.mp4'
import calendarVideo from '../assets/Homie-Calendar.mp4'
import './HomieFeatureCarousel.css'

const INNER_THRESHOLD = 28
const OUTER_THRESHOLD = 60
const CANVAS_WIDTH = 420

type RGB = { r: number; g: number; b: number }

function keyOutBackground(ctx: CanvasRenderingContext2D, width: number, height: number, keyColor: RGB) {
  const frame = ctx.getImageData(0, 0, width, height)
  const data = frame.data
  const total = width * height

  const UNVISITED = 0
  const BACKGROUND = 1
  const NOT_BACKGROUND = 2
  const state = new Uint8Array(total)

  const distanceAt = (idx: number) => {
    const i4 = idx * 4
    const dr = data[i4] - keyColor.r
    const dg = data[i4 + 1] - keyColor.g
    const db = data[i4 + 2] - keyColor.b
    return Math.sqrt(dr * dr + dg * dg + db * db)
  }

  const queue = new Int32Array(total)
  let queueTail = 0

  const visit = (idx: number) => {
    if (state[idx] !== UNVISITED) return
    if (distanceAt(idx) >= OUTER_THRESHOLD) {
      state[idx] = NOT_BACKGROUND
      return
    }
    state[idx] = BACKGROUND
    queue[queueTail++] = idx
  }

  for (let x = 0; x < width; x++) {
    visit(x)
    visit((height - 1) * width + x)
  }
  for (let y = 0; y < height; y++) {
    visit(y * width)
    visit(y * width + (width - 1))
  }

  for (let queueHead = 0; queueHead < queueTail; queueHead++) {
    const idx = queue[queueHead]
    const x = idx % width
    const y = (idx - x) / width
    if (x > 0) visit(idx - 1)
    if (x < width - 1) visit(idx + 1)
    if (y > 0) visit(idx - width)
    if (y < height - 1) visit(idx + width)
  }

  for (let idx = 0; idx < total; idx++) {
    if (state[idx] !== BACKGROUND) continue
    const distance = distanceAt(idx)
    const i4 = idx * 4
    data[i4 + 3] =
      distance < INNER_THRESHOLD
        ? 0
        : Math.round((255 * (distance - INNER_THRESHOLD)) / (OUTER_THRESHOLD - INNER_THRESHOLD))
  }

  ctx.putImageData(frame, 0, 0)
}

interface FeatureCardProps {
  src: string
  title: string
  description: string
}

function FeatureCard({ src, title, description }: FeatureCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number | null>(null)
  const keyColorRef = useRef<RGB>({ r: 244, g: 214, b: 177 })

  useEffect(() => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return

    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (!ctx) return

    const renderLoop = () => {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
      keyOutBackground(ctx, canvas.width, canvas.height, keyColorRef.current)
      rafRef.current = requestAnimationFrame(renderLoop)
    }

    const handleLoadedData = () => {
      const scale = CANVAS_WIDTH / video.videoWidth
      canvas.width = Math.round(video.videoWidth * scale)
      canvas.height = Math.round(video.videoHeight * scale)
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
      // Average all four corners for a more robust background color sample
      const corners = [
        ctx.getImageData(1, 1, 1, 1).data,
        ctx.getImageData(canvas.width - 2, 1, 1, 1).data,
        ctx.getImageData(1, canvas.height - 2, 1, 1).data,
        ctx.getImageData(canvas.width - 2, canvas.height - 2, 1, 1).data,
      ]
      keyColorRef.current = {
        r: Math.round(corners.reduce((s, p) => s + p[0], 0) / 4),
        g: Math.round(corners.reduce((s, p) => s + p[1], 0) / 4),
        b: Math.round(corners.reduce((s, p) => s + p[2], 0) / 4),
      }
      keyOutBackground(ctx, canvas.width, canvas.height, keyColorRef.current)
    }

    const handlePlay = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(renderLoop)
    }

    const handlePause = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }

    video.addEventListener('loadeddata', handleLoadedData)
    video.addEventListener('play', handlePlay)
    video.addEventListener('pause', handlePause)

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData)
      video.removeEventListener('play', handlePlay)
      video.removeEventListener('pause', handlePause)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  // Mobile has no hover, so the mouseenter-triggered play() below never
  // fires. Instead, play each video only while its card is on screen so
  // off-screen features aren't silently burning CPU/battery.
  useEffect(() => {
    const card = cardRef.current
    const video = videoRef.current
    if (!card || !video) return
    if (!window.matchMedia('(max-width: 1024px)').matches) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play()
        } else {
          video.pause()
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(card)

    return () => observer.disconnect()
  }, [])

  const handleMouseEnter = () => {
    const video = videoRef.current
    if (!video) return
    video.currentTime = 0
    void video.play()
  }

  const handleMouseLeave = () => {
    videoRef.current?.pause()
  }

  return (
    <div
      ref={cardRef}
      className="homie-feature-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={videoRef}
        className="homie-feature-card__video"
        src={src}
        muted
        loop
        playsInline
        preload="auto"
      />
      <canvas ref={canvasRef} className="homie-feature-card__canvas" />
      <p className="homie-feature-card__title">{title}</p>
      <p className="homie-feature-card__description">{description}</p>
    </div>
  )
}

// Final Designs (Figma node 671:1426) — in Figma's reading order.
const FEATURES = [
  {
    src: homieOnboardingVideo,
    title: 'Onboarding',
    description:
      'Get started with the app by setting up your account. Create a new household and invite roommates with a room code, or join an existing room. Customize your name and your household name',
  },
  {
    src: dashboardVideo,
    title: 'Dashboard',
    description:
      'Each feature shows up as a widget with one glanceable line: "Your chore this week: bathroom," "Milk expires in 2 days," "Game night Monday 7pm." Tap a widget to open the feature. The most important information is readable in two seconds without opening anything.',
  },
  {
    src: shoppingVideo,
    title: 'Shopping List',
    description:
      "Each request holds an item name, who it's for (one roommate or the house), due date, type (grocery, cleaning, etc), who claimed it, and a note. The list sorts by urgency. Marking it bought can record a price, and bought items go into a purchase history.",
  },
  {
    src: pantryVideo,
    title: 'Pantry',
    description:
      'Each item holds a name, quantity, expiration date, and a tag (ex: “throw away”). Users can add items manually or through scanning product bar codes. The overview sorts by soonest expiration.',
  },
  {
    src: choresVideo,
    title: 'Chores',
    description:
      'Adding a chore takes a name, an assignee, a due date, and a frequency (as needed, 3 times a week, and so on). Chores can also be added to household calendar. Completions are represented visually with a donut graph.',
  },
  {
    src: calendarVideo,
    title: 'Calendar',
    description:
      'Each event holds a name, date and time, recurrence, and notes. The calendar has a week view and a month view with arrows to move between periods. Tapping an event opens a detail sheet over the calendar, the owner sees Edit, everyone else sees details.',
  },
]

function HomieFeatureCarousel() {
  return (
    <div className="homie-feature-carousel">
      {FEATURES.map(f => (
        <FeatureCard key={f.title} {...f} />
      ))}
    </div>
  )
}

export default HomieFeatureCarousel
