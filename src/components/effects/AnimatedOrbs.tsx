'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useMediaQuery } from '@/hooks/useMousePosition'

interface OrbConfig {
  color: 'brand' | 'success' | 'warning' | 'danger' | 'info'
  size: number
  position: { x: string; y: string }
  delay?: number
  duration?: number
  blur?: number
  opacity?: number
}

interface AnimatedOrbsProps {
  /** Predefined orb configurations */
  orbs?: OrbConfig[]
  /** Use preset configuration */
  preset?: 'hero' | 'dark' | 'subtle' | 'vibrant'
  /** Additional className for container */
  className?: string
  /** Disable on mobile for performance */
  disableOnMobile?: boolean
}

const COLOR_MAP = {
  brand: 'rgba(99, 91, 255, VAR)',    // #635BFF
  success: 'rgba(0, 166, 126, VAR)',   // #00A67E
  warning: 'rgba(245, 158, 11, VAR)',  // #F59E0B
  danger: 'rgba(220, 38, 38, VAR)',    // #DC2626
  info: 'rgba(59, 130, 246, VAR)',     // #3B82F6
}

const PRESETS: Record<string, OrbConfig[]> = {
  hero: [
    { color: 'brand', size: 400, position: { x: '70%', y: '10%' }, delay: 0, opacity: 0.15 },
    { color: 'success', size: 300, position: { x: '20%', y: '60%' }, delay: 0.5, opacity: 0.12 },
    { color: 'warning', size: 250, position: { x: '85%', y: '70%' }, delay: 1, opacity: 0.10 },
  ],
  dark: [
    { color: 'brand', size: 500, position: { x: '80%', y: '20%' }, delay: 0, opacity: 0.08 },
    { color: 'danger', size: 350, position: { x: '10%', y: '50%' }, delay: 0.3, opacity: 0.06 },
    { color: 'info', size: 280, position: { x: '60%', y: '80%' }, delay: 0.6, opacity: 0.05 },
  ],
  subtle: [
    { color: 'brand', size: 300, position: { x: '75%', y: '15%' }, delay: 0, opacity: 0.08 },
    { color: 'info', size: 200, position: { x: '15%', y: '70%' }, delay: 0.3, opacity: 0.06 },
  ],
  vibrant: [
    { color: 'brand', size: 450, position: { x: '65%', y: '5%' }, delay: 0, opacity: 0.20 },
    { color: 'success', size: 380, position: { x: '15%', y: '40%' }, delay: 0.2, opacity: 0.18 },
    { color: 'warning', size: 320, position: { x: '80%', y: '60%' }, delay: 0.4, opacity: 0.15 },
    { color: 'danger', size: 250, position: { x: '40%', y: '85%' }, delay: 0.6, opacity: 0.12 },
  ],
}

function Orb({
  color,
  size,
  position,
  delay = 0,
  duration = 6,
  blur = 100,
  opacity = 0.15,
}: OrbConfig) {
  const prefersReducedMotion = useReducedMotion()

  // Replace VAR placeholder with actual opacity
  const bgColor = COLOR_MAP[color].replace('VAR', String(opacity))

  const floatAnimation = prefersReducedMotion
    ? {}
    : {
        y: [0, -20, 0],
        x: [0, 10, 0],
        scale: [1, 1.05, 1],
      }

  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        left: position.x,
        top: position.y,
        background: `radial-gradient(circle, ${bgColor} 0%, transparent 70%)`,
        filter: `blur(${blur}px)`,
        transform: 'translate(-50%, -50%)',
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        scale: 1,
        ...floatAnimation,
      }}
      transition={{
        opacity: { duration: 1, delay },
        scale: { duration: 1, delay },
        y: {
          duration,
          repeat: Infinity,
          ease: 'easeInOut',
          delay,
        },
        x: {
          duration: duration * 1.3,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: delay + 0.5,
        },
      }}
      aria-hidden="true"
    />
  )
}

/**
 * AnimatedOrbs - Decorative floating orbs for premium backgrounds
 *
 * Creates atmospheric depth with subtle animated gradients.
 * Automatically disables animations for reduced motion preferences.
 */
export function AnimatedOrbs({
  orbs,
  preset = 'hero',
  className = '',
  disableOnMobile = true,
}: AnimatedOrbsProps) {
  const isMobile = useMediaQuery('(max-width: 640px)')
  const prefersReducedMotion = useReducedMotion()

  // Disable on mobile for performance
  if (disableOnMobile && isMobile) {
    return null
  }

  const orbConfigs = orbs || PRESETS[preset] || PRESETS.hero

  // For reduced motion, show static orbs with reduced opacity
  if (prefersReducedMotion) {
    return (
      <div
        className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
        aria-hidden="true"
      >
        {orbConfigs.map((orb, index) => (
          <div
            key={index}
            className="absolute rounded-full"
            style={{
              width: orb.size,
              height: orb.size,
              left: orb.position.x,
              top: orb.position.y,
              background: `radial-gradient(circle, ${COLOR_MAP[orb.color].replace('VAR', String((orb.opacity || 0.15) * 0.5))} 0%, transparent 70%)`,
              filter: `blur(${orb.blur || 100}px)`,
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}
      </div>
    )
  }

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {orbConfigs.map((orb, index) => (
        <Orb key={index} {...orb} />
      ))}
    </div>
  )
}

/**
 * Single animated orb for custom positioning
 */
export function SingleOrb(props: OrbConfig) {
  return <Orb {...props} />
}

export default AnimatedOrbs
