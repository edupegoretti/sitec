'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import {
  durations,
  easings,
  distances,
  viewport,
  type Direction,
  getDirectionOffset,
} from '@/lib/motion'

interface RevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  direction?: Direction
  /** Include blur effect on reveal */
  blur?: boolean
  /** Custom distance for movement */
  distance?: number
  /** Trigger once or every time */
  once?: boolean
  /** Viewport margin for trigger */
  margin?: string
}

export function Reveal({
  children,
  className,
  delay = 0,
  duration = durations.medium,
  direction = 'up',
  blur = false,
  distance = distances.lg,
  once = viewport.once,
  margin = viewport.margin,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: margin as `${number}px` })
  const prefersReducedMotion = useReducedMotion()

  // Respect reduced motion preference
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  const directionOffset = getDirectionOffset(direction, distance)
  const blurValue = blur ? 'blur(10px)' : undefined

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        ...directionOffset,
        ...(blur && { filter: blurValue }),
      }}
      animate={
        isInView
          ? {
              opacity: 1,
              x: 0,
              y: 0,
              ...(blur && { filter: 'blur(0px)' }),
            }
          : {
              opacity: 0,
              ...directionOffset,
              ...(blur && { filter: blurValue }),
            }
      }
      transition={{
        duration,
        delay,
        ease: easings.premium,
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
