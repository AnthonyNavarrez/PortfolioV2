import type { ReactNode } from 'react'
import AnimatedContent from './AnimatedContent'

interface RevealProps {
  className?: string
  delay?: number
  distance?: number
  children: ReactNode
}

export default function Reveal({ className, delay = 0, distance = 36, children }: RevealProps) {
  return (
    <AnimatedContent
      className={className}
      direction="vertical"
      distance={distance}
      duration={0.72}
      delay={delay}
      threshold={0.12}
    >
      {children}
    </AnimatedContent>
  )
}
