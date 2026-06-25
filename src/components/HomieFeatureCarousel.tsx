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

const FEATURES = [
  {
    src: homieOnboardingVideo,
    title: 'Onboarding',
    description: 'Get started with the app by setting up your account and creating a new household.',
  },
  {
    src: dashboardVideo,
    title: 'Dashboard',
    description: 'See an overview of your household details, notices, and manage your settings.',
  },
  {
    src: shoppingVideo,
    title: 'Shopping List',
    description: 'Easily add and edit recurring grocery items you purchase to your group shopping list.',
  },
  {
    src: pantryVideo,
    title: 'Pantry',
    description: 'Scan barcodes for expiry dates to keep your current pantry items fresh.',
  },
  {
    src: choresVideo,
    title: 'Chores',
    description: "Keep track of your home's completion progress with the statistics at the top of the page.",
  },
  {
    src: calendarVideo,
    title: 'Calendar',
    description: 'Tap to easily schedule new tasks, assign them to roommates, and set up automatic reminders.',
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
