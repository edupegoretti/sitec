'use client'

import { useRef, useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useFlashlightPosition, useMediaQuery, useIsTouchDevice } from '@/hooks/useMousePosition'

interface FlashlightEffectProps {
  /** Radius of the spotlight in pixels */
  radius?: number
  /** Color of the spotlight glow */
  color?: string
  /** Opacity of the spotlight (0-1) */
  opacity?: number
  /** Additional className */
  className?: string
  /** Children to wrap (the content the flashlight illuminates) */
  children?: React.ReactNode
  /** Disable on mobile */
  disableOnMobile?: boolean
  /** Disable on touch devices */
  disableOnTouch?: boolean
  /** Blur amount for the gradient edge */
  blur?: number
}

/**
 * FlashlightEffect - Interactive spotlight that follows the mouse
 *
 * Creates a premium interactive effect where a subtle radial gradient
 * follows the cursor, creating depth and highlighting content.
 *
 * Automatically disabled on:
 * - Mobile devices (performance)
 * - Touch devices (no mouse)
 * - Reduced motion preference
 */
export function FlashlightEffect({
  radius = 600,
  color = 'rgba(99, 91, 255, 0.06)', // brand color
  opacity = 1,
  className = '',
  children,
  disableOnMobile = true,
  disableOnTouch = true,
  blur = 0,
}: FlashlightEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { elementX, elementY, isInside } = useFlashlightPosition(containerRef)

  const isMobile = useMediaQuery('(max-width: 640px)')
  const isTouch = useIsTouchDevice()
  const prefersReducedMotion = useReducedMotion()

  // Determine if effect should be disabled
  const isDisabled = useMemo(() => {
    if (prefersReducedMotion) return true
    if (disableOnMobile && isMobile) return true
    if (disableOnTouch && isTouch) return true
    return false
  }, [prefersReducedMotion, disableOnMobile, isMobile, disableOnTouch, isTouch])

  // Generate gradient style
  const gradientStyle = useMemo(() => {
    if (isDisabled || !isInside) return {}

    return {
      background: `radial-gradient(${radius}px circle at ${elementX}px ${elementY}px, ${color}, transparent 40%)`,
      opacity,
      filter: blur > 0 ? `blur(${blur}px)` : undefined,
    }
  }, [isDisabled, isInside, radius, elementX, elementY, color, opacity, blur])

  if (isDisabled) {
    return (
      <div ref={containerRef} className={`relative ${className}`}>
        {children}
      </div>
    )
  }

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Flashlight overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-10"
        style={gradientStyle}
        initial={{ opacity: 0 }}
        animate={{ opacity: isInside ? opacity : 0 }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
        aria-hidden="true"
      />

      {/* Content */}
      {children}
    </div>
  )
}

/**
 * FlashlightCard - Card with built-in flashlight effect
 *
 * Combines the flashlight effect with a card container
 * for easy use on individual card components.
 */
interface FlashlightCardProps extends FlashlightEffectProps {
  /** Card styling variant */
  variant?: 'glass' | 'solid' | 'outline'
  /** Hover lift effect */
  hoverLift?: boolean
}

export function FlashlightCard({
  variant = 'glass',
  hoverLift = true,
  className = '',
  children,
  ...flashlightProps
}: FlashlightCardProps) {
  const variantStyles = {
    glass: 'bg-white/[0.03] backdrop-blur-sm border border-white/10 hover:bg-white/[0.06] hover:border-white/20',
    solid: 'bg-white border border-gray-200 hover:border-gray-300',
    outline: 'bg-transparent border border-white/20 hover:border-white/40',
  }

  const liftStyles = hoverLift
    ? 'transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-elevated'
    : ''

  return (
    <FlashlightEffect {...flashlightProps} className={className}>
      <div
        className={`
          relative rounded-2xl overflow-hidden
          ${variantStyles[variant]}
          ${liftStyles}
        `}
      >
        {children}
      </div>
    </FlashlightEffect>
  )
}

/**
 * GridFlashlight - Full section with flashlight and optional grid pattern
 *
 * Perfect for dark sections like the "Problemas" section.
 */
interface GridFlashlightProps extends FlashlightEffectProps {
  /** Show decorative grid pattern */
  showGrid?: boolean
  /** Grid opacity (0-1) */
  gridOpacity?: number
  /** Background color */
  bgColor?: string
}

export function GridFlashlight({
  showGrid = true,
  gridOpacity = 0.03,
  bgColor = '#0A2540',
  children,
  className = '',
  ...flashlightProps
}: GridFlashlightProps) {
  return (
    <div className={`relative ${className}`} style={{ backgroundColor: bgColor }}>
      {/* Grid pattern */}
      {showGrid && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,${gridOpacity}) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,${gridOpacity}) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
          aria-hidden="true"
        />
      )}

      {/* Flashlight effect wrapper */}
      <FlashlightEffect {...flashlightProps} disableOnMobile disableOnTouch>
        {children}
      </FlashlightEffect>
    </div>
  )
}

export default FlashlightEffect
