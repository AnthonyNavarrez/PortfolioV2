import {
  motion,
  useAnimationControls,
  useMotionValue,
  useSpring,
  useTransform,
} from 'motion/react'
import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'

import './DraggableCard.css'

interface DraggableCardBodyProps {
  className?: string
  children?: ReactNode
  rotate?: number
}

export function DraggableCardBody({
  className,
  children,
  rotate = 0,
}: DraggableCardBodyProps) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const cardRef = useRef<HTMLDivElement>(null)
  const controls = useAnimationControls()
  const [constraints, setConstraints] = useState({
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  })

  const springConfig = {
    stiffness: 100,
    damping: 20,
    mass: 0.5,
  }

  const rotateX = useSpring(
    useTransform(mouseY, [-300, 300], [25, -25]),
    springConfig,
  )
  const rotateY = useSpring(
    useTransform(mouseX, [-300, 300], [-25, 25]),
    springConfig,
  )

  const opacity = useSpring(
    useTransform(mouseX, [-300, 0, 300], [0.8, 1, 0.8]),
    springConfig,
  )

  const glareOpacity = useSpring(
    useTransform(mouseX, [-300, 0, 300], [0.2, 0, 0.2]),
    springConfig,
  )

  useEffect(() => {
    const updateConstraints = () => {
      if (typeof window !== 'undefined') {
        setConstraints({
          top: -window.innerHeight / 2,
          left: -window.innerWidth / 2,
          right: window.innerWidth / 2,
          bottom: window.innerHeight / 2,
        })
      }
    }

    updateConstraints()
    window.addEventListener('resize', updateConstraints)

    return () => {
      window.removeEventListener('resize', updateConstraints)
    }
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e
    const { width, height, left, top } =
      cardRef.current?.getBoundingClientRect() ?? {
        width: 0,
        height: 0,
        left: 0,
        top: 0,
      }
    const centerX = left + width / 2
    const centerY = top + height / 2
    mouseX.set(clientX - centerX)
    mouseY.set(clientY - centerY)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      drag
      dragMomentum={false}
      dragConstraints={constraints}
      onDragStart={() => {
        document.body.style.cursor = 'grabbing'
      }}
      onDragEnd={() => {
        document.body.style.cursor = 'default'

        controls.start({
          rotateX: 0,
          rotateY: 0,
          transition: {
            type: 'spring',
            ...springConfig,
          },
        })
      }}
      style={{
        rotate,
        rotateX,
        rotateY,
        opacity,
        willChange: 'transform',
      }}
      animate={controls}
      whileHover={{ scale: 1.02 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={
        className ? `draggable-card__body ${className}` : 'draggable-card__body'
      }
    >
      {children}
      <motion.div
        style={{ opacity: glareOpacity }}
        className="draggable-card__glare"
      />
    </motion.div>
  )
}

interface DraggableCardContainerProps {
  className?: string
  children?: ReactNode
}

export function DraggableCardContainer({
  className,
  children,
}: DraggableCardContainerProps) {
  return (
    <div
      className={
        className
          ? `draggable-card__container ${className}`
          : 'draggable-card__container'
      }
    >
      {children}
    </div>
  )
}
