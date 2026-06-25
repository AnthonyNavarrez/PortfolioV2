import { useEffect, useRef } from 'react'
import homieOnboardingVideo from '../assets/Homie-onboarding.mp4'
import './HomieOnboardingPreview.css'

// Sampled from the source clip — a flat, uniform backdrop behind the
// phone mockup, ideal for a clean per-pixel color-key.
const KEY_COLOR = { r: 244, g: 214, b: 177 }
const INNER_THRESHOLD = 28
const OUTER_THRESHOLD = 60
const CANVAS_WIDTH = 420

// Flood-fills the background color in from the canvas edges instead of
// scanning every pixel in isolation — some of the app's pastel gradient
// colors land within color range of the backdrop too, but they're
// enclosed by the phone's bezel, so the fill can never reach them.
function keyOutBackground(ctx: CanvasRenderingContext2D, width: number, height: number) {
  const frame = ctx.getImageData(0, 0, width, height)
  const data = frame.data
  const total = width * height

  const UNVISITED = 0
  const BACKGROUND = 1
  const NOT_BACKGROUND = 2
  const state = new Uint8Array(total)

  const distanceAt = (idx: number) => {
    const i4 = idx * 4
    const dr = data[i4] - KEY_COLOR.r
    const dg = data[i4 + 1] - KEY_COLOR.g
    const db = data[i4 + 2] - KEY_COLOR.b
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

function HomieOnboardingPreview() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return

    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (!ctx) return

    const renderLoop = () => {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
      keyOutBackground(ctx, canvas.width, canvas.height)
      rafRef.current = requestAnimationFrame(renderLoop)
    }

    const handleLoadedData = () => {
      const scale = CANVAS_WIDTH / video.videoWidth
      canvas.width = Math.round(video.videoWidth * scale)
      canvas.height = Math.round(video.videoHeight * scale)
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
      keyOutBackground(ctx, canvas.width, canvas.height)
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
      className="homie-onboarding-preview"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={videoRef}
        className="homie-onboarding-preview__video"
        src={homieOnboardingVideo}
        muted
        loop
        playsInline
        preload="auto"
      />
      <canvas ref={canvasRef} className="homie-onboarding-preview__canvas" />
    </div>
  )
}

export default HomieOnboardingPreview
