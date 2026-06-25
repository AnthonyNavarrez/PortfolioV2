import * as React from 'react'
import {
  type HTMLMotionProps,
  motion,
  useMotionValue,
  useSpring,
  type SpringOptions,
  type Transition,
} from 'motion/react'

import './Stars.css'

type StarLayerProps = HTMLMotionProps<'div'> & {
  count: number
  size: number
  transition: Transition
  starColor: string
}

function generateStars(count: number, starColor: string) {
  const shadows: string[] = []
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * 4000) - 2000
    const y = Math.floor(Math.random() * 4000) - 2000
    shadows.push(`${x}px ${y}px ${starColor}`)
  }
  return shadows.join(', ')
}

function StarLayer({
  count = 1000,
  size = 1,
  transition = { repeat: Infinity, duration: 50, ease: 'linear' },
  starColor = '#fff',
  className,
  ...props
}: StarLayerProps) {
  const boxShadow = React.useMemo(
    () => generateStars(count, starColor),
    [count, starColor],
  )

  return (
    <motion.div
      animate={{ y: [0, -2000] }}
      transition={transition}
      className={['star-layer', className].filter(Boolean).join(' ')}
      {...props}
    >
      <div
        className="star-layer__dot"
        style={{ width: size, height: size, boxShadow }}
      />
      <div
        className="star-layer__dot star-layer__dot--offset"
        style={{ width: size, height: size, boxShadow }}
      />
    </motion.div>
  )
}

interface StarsProps extends React.ComponentProps<'div'> {
  factor?: number
  speed?: number
  transition?: SpringOptions
  starColor?: string
  pointerEvents?: boolean
}

export default function Stars({
  className,
  factor = 0.05,
  speed = 50,
  transition = { stiffness: 50, damping: 20 },
  starColor = '#fff',
  pointerEvents = true,
  ...props
}: StarsProps) {
  const offsetX = useMotionValue(1)
  const offsetY = useMotionValue(1)

  const springX = useSpring(offsetX, transition)
  const springY = useSpring(offsetY, transition)

  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      offsetX.set(-(e.clientX - centerX) * factor)
      offsetY.set(-(e.clientY - centerY) * factor)
    },
    [offsetX, offsetY, factor],
  )

  return (
    <div
      className={['stars', className].filter(Boolean).join(' ')}
      onMouseMove={handleMouseMove}
      {...props}
    >
      <motion.div
        style={{ x: springX, y: springY }}
        className={pointerEvents ? undefined : 'stars__parallax--static'}
      >
        <StarLayer
          count={1000}
          size={1}
          transition={{ repeat: Infinity, duration: speed, ease: 'linear' }}
          starColor={starColor}
        />
        <StarLayer
          count={400}
          size={2}
          transition={{ repeat: Infinity, duration: speed * 2, ease: 'linear' }}
          starColor={starColor}
        />
        <StarLayer
          count={200}
          size={3}
          transition={{ repeat: Infinity, duration: speed * 3, ease: 'linear' }}
          starColor={starColor}
        />
      </motion.div>
    </div>
  )
}
