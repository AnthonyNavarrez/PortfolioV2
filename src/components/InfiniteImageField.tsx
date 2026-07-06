import type { HTMLAttributes } from 'react'
import { useEffect, useRef } from 'react'

import './InfiniteImageField.css'

const INFINITE_IMAGE_FIELD_IMAGES: string[] = [
  'https://plus.unsplash.com/premium_photo-1665311515452-a9f54c4266c9?w=400&h=560&fit=crop&q=80',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=560&fit=crop&q=80',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=560&fit=crop&q=80',
  'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=400&h=560&fit=crop&q=80',
  'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&h=560&fit=crop&q=80',
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=560&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400&h=560&fit=crop&q=80',
  'https://images.unsplash.com/photo-1440342359743-84fcb8c21f21?w=400&h=560&fit=crop&q=80',
  'https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=400&h=560&fit=crop&q=80',
  'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=560&fit=crop&q=80',
  'https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&h=560&fit=crop&q=80',
  'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=400&h=560&fit=crop&q=80',
]

export interface InfiniteImageFieldProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  className?: string
  images?: string[]
  imageWidth?: number
  imageHeight?: number
  gap?: number
  maxSpeed?: number
  smoothing?: number
  borderRadius?: number
}

// Crops to the box's aspect ratio (like CSS `object-fit: cover`)
// instead of stretching — source images keep their native pixels,
// only the visible crop window changes.
function drawImageCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  dx: number,
  dy: number,
  dWidth: number,
  dHeight: number,
) {
  const imgRatio = img.naturalWidth / img.naturalHeight
  const boxRatio = dWidth / dHeight

  let sx = 0
  let sy = 0
  let sWidth = img.naturalWidth
  let sHeight = img.naturalHeight

  if (imgRatio > boxRatio) {
    sWidth = img.naturalHeight * boxRatio
    sx = (img.naturalWidth - sWidth) / 2
  } else {
    sHeight = img.naturalWidth / boxRatio
    sy = (img.naturalHeight - sHeight) / 2
  }

  ctx.drawImage(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  const clampedR = Math.min(r, w / 2, h / 2)
  ctx.beginPath()
  ctx.moveTo(x + clampedR, y)
  ctx.lineTo(x + w - clampedR, y)
  ctx.quadraticCurveTo(x + w, y, x + w, y + clampedR)
  ctx.lineTo(x + w, y + h - clampedR)
  ctx.quadraticCurveTo(x + w, y + h, x + w - clampedR, y + h)
  ctx.lineTo(x + clampedR, y + h)
  ctx.quadraticCurveTo(x, y + h, x, y + h - clampedR)
  ctx.lineTo(x, y + clampedR)
  ctx.quadraticCurveTo(x, y, x + clampedR, y)
  ctx.closePath()
}

function InfiniteImageField({
  className,
  images = INFINITE_IMAGE_FIELD_IMAGES,
  imageWidth = 200,
  imageHeight = 280,
  gap = 28,
  maxSpeed = 5,
  smoothing = 0.07,
  borderRadius = 0,
  ...rest
}: InfiniteImageFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const loadedImagesRef = useRef<HTMLImageElement[]>([])
  const dimsRef = useRef({ w: 0, h: 0 })
  const camRef = useRef({ x: 0, y: 0 })
  const velRef = useRef({ x: 0, y: 0 })
  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const isInsideRef = useRef(false)
  const dragRef = useRef({ active: false, lastX: 0, lastY: 0 })
  const rafRef = useRef<number>(0)

  // Pre-load images
  useEffect(() => {
    const imgs = images.map((src) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.src = src
      return img
    })
    loadedImagesRef.current = imgs
  }, [images])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      dimsRef.current = { w: rect.width, h: rect.height }
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
    }

    resize()

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      }
    }

    const onEnter = () => {
      isInsideRef.current = true
    }
    const onLeave = () => {
      isInsideRef.current = false
    }

    canvas.addEventListener('mousemove', onMove)
    canvas.addEventListener('mouseenter', onEnter)
    canvas.addEventListener('mouseleave', onLeave)

    // Touch: drag directly pans the camera (finger-follows-content),
    // instead of the desktop hover's cursor-offset-driven drift.
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return
      const t = e.touches[0]
      dragRef.current = { active: true, lastX: t.clientX, lastY: t.clientY }
      velRef.current = { x: 0, y: 0 }
    }

    const onTouchMove = (e: TouchEvent) => {
      if (!dragRef.current.active || e.touches.length !== 1) return
      e.preventDefault()
      const t = e.touches[0]
      const dx = t.clientX - dragRef.current.lastX
      const dy = t.clientY - dragRef.current.lastY
      camRef.current.x -= dx
      camRef.current.y -= dy
      dragRef.current.lastX = t.clientX
      dragRef.current.lastY = t.clientY
    }

    const onTouchEnd = () => {
      dragRef.current.active = false
    }

    canvas.addEventListener('touchstart', onTouchStart, { passive: true })
    canvas.addEventListener('touchmove', onTouchMove, { passive: false })
    canvas.addEventListener('touchend', onTouchEnd)
    canvas.addEventListener('touchcancel', onTouchEnd)

    const draw = () => {
      const { w: W, h: H } = dimsRef.current
      if (W === 0 || H === 0) {
        rafRef.current = requestAnimationFrame(draw)
        return
      }

      const dpr = window.devicePixelRatio || 1
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const cellW = imageWidth + gap
      const cellH = imageHeight + gap
      const imgs = loadedImagesRef.current
      const numImages = imgs.length

      // Physics — cursor offset from center drives velocity
      const tx = isInsideRef.current
        ? (mouseRef.current.x - 0.5) * 2 * maxSpeed
        : 0
      const ty = isInsideRef.current
        ? (mouseRef.current.y - 0.5) * 2 * maxSpeed
        : 0

      velRef.current.x += (tx - velRef.current.x) * smoothing
      velRef.current.y += (ty - velRef.current.y) * smoothing

      camRef.current.x += velRef.current.x
      camRef.current.y += velRef.current.y

      const camX = camRef.current.x
      const camY = camRef.current.y

      ctx.clearRect(0, 0, W, H)

      // Compute visible cell range
      const colMin = Math.floor((camX - W / 2) / cellW) - 1
      const colMax = Math.ceil((camX + W / 2) / cellW) + 1
      const rowMin = Math.floor((camY - H / 2) / cellH) - 1
      const rowMax = Math.ceil((camY + H / 2) / cellH) + 1

      for (let row = rowMin; row <= rowMax; row++) {
        for (let col = colMin; col <= colMax; col++) {
          // Top-left corner in screen space
          const sx = col * cellW - camX + W / 2 - imageWidth / 2
          const sy = row * cellH - camY + H / 2 - imageHeight / 2

          // Deterministic image assignment — same cell always gets same image
          const imgIdx =
            Math.abs(col * 7 + row * 13 + ((col * row * 3) | 0)) % numImages
          const img = imgs[imgIdx]

          ctx.save()
          drawRoundedRect(ctx, sx, sy, imageWidth, imageHeight, borderRadius)
          ctx.clip()

          if (img && img.complete && img.naturalWidth > 0) {
            drawImageCover(ctx, img, sx, sy, imageWidth, imageHeight)
          } else {
            // Placeholder while loading — semi-transparent so background shows
            ctx.fillStyle = 'rgba(0,0,0,0.15)'
            ctx.fillRect(sx, sy, imageWidth, imageHeight)
          }
          ctx.restore()

          // Subtle border overlay for glass-panel effect
          ctx.save()
          drawRoundedRect(ctx, sx, sy, imageWidth, imageHeight, borderRadius)
          ctx.strokeStyle = 'rgba(255,255,255,0.06)'
          ctx.lineWidth = 1
          ctx.stroke()
          ctx.restore()
        }
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
      canvas.removeEventListener('mousemove', onMove)
      canvas.removeEventListener('mouseenter', onEnter)
      canvas.removeEventListener('mouseleave', onLeave)
      canvas.removeEventListener('touchstart', onTouchStart)
      canvas.removeEventListener('touchmove', onTouchMove)
      canvas.removeEventListener('touchend', onTouchEnd)
      canvas.removeEventListener('touchcancel', onTouchEnd)
    }
  }, [imageWidth, imageHeight, gap, maxSpeed, smoothing, borderRadius])

  const rootClassName = className
    ? `infinite-image-field ${className}`
    : 'infinite-image-field'

  return (
    <div {...rest} className={rootClassName}>
      <canvas ref={canvasRef} className="infinite-image-field__canvas" />
    </div>
  )
}

export default InfiniteImageField
