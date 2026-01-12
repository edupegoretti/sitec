'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useMediaQuery } from '@/hooks/useMousePosition'

interface BorderBeamProps {
  /** Content to wrap */
  children: React.ReactNode
  /** Border radius */
  borderRadius?: string
  /** Border width in pixels */
  borderWidth?: number
  /** Animation duration in seconds */
  duration?: number
  /** Delay before animation starts */
  delay?: number
  /** Gradient colors */
  colors?: string[]
  /** Additional className for container */
  className?: string
  /** Additional className for inner content */
  contentClassName?: string
  /** Disable animation on mobile */
  disableOnMobile?: boolean
  /** Only animate once */
  once?: boolean
  /** Padding inside the border */
  padding?: string
}

/**
 * BorderBeam - Animated gradient border effect
 *
 * Creates a premium animated border where a gradient
 * continuously flows around the element's perimeter.
 */
export function BorderBeam({
  children,
  borderRadius = '1rem',
  borderWidth = 2,
  duration = 4,
  delay = 0,
  colors = ['transparent', '#635BFF', 'transparent'],
  className = '',
  contentClassName = '',
  disableOnMobile = true,
  once = false,
  padding = '0',
}: BorderBeamProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: '-50px' })
  const prefersReducedMotion = useReducedMotion()
  const isMobile = useMediaQuery('(max-width: 640px)')

  const isAnimated = !prefersReducedMotion && !(disableOnMobile && isMobile) && isInView

  // Create gradient string
  const gradient = `linear-gradient(90deg, ${colors.join(', ')})`

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      style={{
        borderRadius,
        padding: `${borderWidth}px`,
      }}
    >
      {/* Animated border container */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ borderRadius }}
        aria-hidden="true"
      >
        {/* Static border fallback */}
        <div
          className="absolute inset-0"
          style={{
            borderRadius,
            border: `${borderWidth}px solid rgba(99, 91, 255, 0.2)`,
          }}
        />

        {isAnimated && (
          <>
            {/* Top beam */}
            <motion.div
              className="absolute h-full"
              style={{
                top: 0,
                left: 0,
                width: '33%',
                background: gradient,
                height: `${borderWidth}px`,
              }}
              animate={{
                left: ['-33%', '100%'],
              }}
              transition={{
                duration,
                delay,
                repeat: Infinity,
                ease: 'linear',
              }}
            />

            {/* Right beam */}
            <motion.div
              className="absolute"
              style={{
                top: 0,
                right: 0,
                width: `${borderWidth}px`,
                height: '33%',
                background: gradient.replace('90deg', '180deg'),
              }}
              animate={{
                top: ['-33%', '100%'],
              }}
              transition={{
                duration,
                delay: delay + duration * 0.25,
                repeat: Infinity,
                ease: 'linear',
              }}
            />

            {/* Bottom beam */}
            <motion.div
              className="absolute"
              style={{
                bottom: 0,
                right: 0,
                width: '33%',
                height: `${borderWidth}px`,
                background: gradient,
              }}
              animate={{
                right: ['-33%', '100%'],
              }}
              transition={{
                duration,
                delay: delay + duration * 0.5,
                repeat: Infinity,
                ease: 'linear',
              }}
            />

            {/* Left beam */}
            <motion.div
              className="absolute"
              style={{
                bottom: 0,
                left: 0,
                width: `${borderWidth}px`,
                height: '33%',
                background: gradient.replace('90deg', '180deg'),
              }}
              animate={{
                bottom: ['-33%', '100%'],
              }}
              transition={{
                duration,
                delay: delay + duration * 0.75,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          </>
        )}
      </div>

      {/* Content */}
      <div
        className={`relative ${contentClassName}`}
        style={{
          borderRadius: `calc(${borderRadius} - ${borderWidth}px)`,
          padding,
        }}
      >
        {children}
      </div>
    </div>
  )
}

/**
 * GlowingBorderCard - Card with glowing animated border
 *
 * Combines BorderBeam with a card layout for easy use
 */
interface GlowingBorderCardProps extends BorderBeamProps {
  /** Card background */
  background?: string
  /** Glow color */
  glowColor?: string
  /** Glow intensity (0-1) */
  glowIntensity?: number
  /** Hover effects */
  hoverLift?: boolean
}

export function GlowingBorderCard({
  children,
  background = 'white',
  glowColor = 'rgba(99, 91, 255, 0.15)',
  glowIntensity = 0.3,
  hoverLift = true,
  className = '',
  contentClassName = '',
  padding = '2rem',
  ...borderProps
}: GlowingBorderCardProps) {
  const prefersReducedMotion = useReducedMotion()

  const hoverStyles = hoverLift && !prefersReducedMotion
    ? 'transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-elevated-hover'
    : ''

  return (
    <BorderBeam
      className={`${hoverStyles} ${className}`}
      contentClassName={contentClassName}
      padding={padding}
      {...borderProps}
    >
      <div
        className="relative overflow-hidden"
        style={{
          background,
          borderRadius: 'inherit',
        }}
      >
        {/* Glow effect */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            boxShadow: `inset 0 0 60px ${glowColor}`,
            opacity: glowIntensity,
          }}
          aria-hidden="true"
        />

        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </BorderBeam>
  )
}

/**
 * ShimmerBorder - Subtle shimmer effect on border
 *
 * Less dramatic than BorderBeam, good for subtle accents
 */
interface ShimmerBorderProps {
  children: React.ReactNode
  className?: string
  borderRadius?: string
  borderWidth?: number
  shimmerColor?: string
  duration?: number
}

export function ShimmerBorder({
  children,
  className = '',
  borderRadius = '0.75rem',
  borderWidth = 1,
  shimmerColor = 'rgba(255, 255, 255, 0.5)',
  duration = 2.5,
}: ShimmerBorderProps) {
  const prefersReducedMotion = useReducedMotion()
  const isMobile = useMediaQuery('(max-width: 640px)')

  const isAnimated = !prefersReducedMotion && !isMobile

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        borderRadius,
        padding: `${borderWidth}px`,
        background: 'linear-gradient(135deg, rgba(99, 91, 255, 0.2), rgba(99, 91, 255, 0.1))',
      }}
    >
      {/* Shimmer effect */}
      {isAnimated && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(90deg, transparent, ${shimmerColor}, transparent)`,
          }}
          animate={{
            x: ['-100%', '200%'],
          }}
          transition={{
            duration,
            repeat: Infinity,
            ease: 'easeInOut',
            repeatDelay: 1,
          }}
          aria-hidden="true"
        />
      )}

      {/* Content */}
      <div
        className="relative bg-white"
        style={{
          borderRadius: `calc(${borderRadius} - ${borderWidth}px)`,
        }}
      >
        {children}
      </div>
    </div>
  )
}

export default BorderBeam
