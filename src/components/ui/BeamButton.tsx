'use client'

import { forwardRef, useMemo } from 'react'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { ArrowRight } from '@phosphor-icons/react'
import { useMediaQuery } from '@/hooks/useMousePosition'

interface BeamButtonProps {
  /** Button content */
  children: React.ReactNode
  /** Button variant */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  /** Button size */
  size?: 'sm' | 'md' | 'lg' | 'xl'
  /** Show animated arrow icon */
  showArrow?: boolean
  /** External link (renders as anchor) */
  href?: string
  /** Open in new tab */
  external?: boolean
  /** Custom beam color (CSS gradient) */
  beamColor?: string
  /** Disable beam animation */
  disableBeam?: boolean
  /** Additional className */
  className?: string
  /** Loading state */
  loading?: boolean
  /** Full width */
  fullWidth?: boolean
  /** Disabled state */
  disabled?: boolean
  /** Click handler */
  onClick?: () => void
  /** Button type */
  type?: 'button' | 'submit' | 'reset'
}

// Beam animation keyframes
const beamVariants: Variants = {
  initial: { x: '-100%' },
  animate: {
    x: '200%',
    transition: {
      duration: 2,
      ease: 'linear' as const,
      repeat: Infinity,
      repeatDelay: 1,
    },
  },
}

const arrowVariants = {
  initial: { x: 0 },
  hover: { x: 4 },
}

/**
 * BeamButton - Premium button with animated border gradient
 *
 * Features:
 * - Gradient beam running along the border
 * - Hover effects with shadow expansion
 * - Arrow animation on hover
 * - Multiple variants and sizes
 * - Accessibility compliant
 */
export const BeamButton = forwardRef<HTMLButtonElement, BeamButtonProps>(
  function BeamButton(
    {
      children,
      variant = 'primary',
      size = 'md',
      showArrow = true,
      href,
      external = false,
      beamColor,
      disableBeam = false,
      className = '',
      loading = false,
      fullWidth = false,
      disabled,
      onClick,
      type = 'button',
    },
    ref
  ) {
    const prefersReducedMotion = useReducedMotion()
    const isMobile = useMediaQuery('(max-width: 640px)')

    // Disable beam on mobile or reduced motion
    const showBeam = !disableBeam && !prefersReducedMotion && !isMobile && variant === 'primary'

    // Size styles
    const sizeStyles = useMemo(() => {
      switch (size) {
        case 'sm':
          return 'px-4 py-2 text-sm gap-2'
        case 'lg':
          return 'px-8 py-4 text-lg gap-3'
        case 'xl':
          return 'px-10 py-5 text-xl gap-4'
        default:
          return 'px-6 py-3 text-base gap-2.5'
      }
    }, [size])

    // Variant styles
    const variantStyles = useMemo(() => {
      switch (variant) {
        case 'secondary':
          return `
            bg-white text-gray-900 border border-gray-200
            hover:border-gray-300 hover:shadow-card
            shadow-sm
          `
        case 'outline':
          return `
            bg-transparent text-brand border-2 border-brand
            hover:bg-brand/5
          `
        case 'ghost':
          return `
            bg-transparent text-gray-700
            hover:bg-gray-100 hover:text-gray-900
          `
        default: // primary
          return `
            bg-brand text-white
            shadow-elevated shadow-brand/20
            hover:bg-brand-hover hover:shadow-elevated-hover hover:shadow-brand/30
          `
      }
    }, [variant])

    // Arrow size based on button size
    const arrowSize = useMemo(() => {
      switch (size) {
        case 'sm':
          return 16
        case 'lg':
          return 22
        case 'xl':
          return 24
        default:
          return 18
      }
    }, [size])

    // Beam gradient
    const beamGradient = beamColor || 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)'

    const buttonContent = (
      <>
        {/* Beam effect overlay */}
        {showBeam && (
          <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
            <motion.div
              className="absolute inset-0 w-1/3"
              style={{
                background: beamGradient,
              }}
              variants={beamVariants}
              initial="initial"
              animate="animate"
            />
          </div>
        )}

        {/* Border beam for outline variant */}
        {variant === 'outline' && showBeam && (
          <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
            <motion.div
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(99, 91, 255, 0.8), transparent)',
              }}
              variants={beamVariants}
              initial="initial"
              animate="animate"
            />
          </div>
        )}

        {/* Loading spinner */}
        {loading && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-inherit rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>
        )}

        {/* Content */}
        <span className={`relative z-10 flex items-center justify-center ${loading ? 'opacity-0' : ''}`}>
          {children}
          {showArrow && (
            <motion.span
              className="inline-flex"
              variants={arrowVariants}
              initial="initial"
              whileHover="hover"
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <ArrowRight size={arrowSize} weight="bold" />
            </motion.span>
          )}
        </span>
      </>
    )

    const baseStyles = `
      relative inline-flex items-center justify-center
      font-semibold rounded-xl
      transition-all duration-300 ease-out
      hover:-translate-y-0.5
      focus:outline-none focus:ring-2 focus:ring-brand/50 focus:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0
      ${fullWidth ? 'w-full' : ''}
      ${sizeStyles}
      ${variantStyles}
      ${className}
    `

    // Render as anchor if href is provided
    if (href) {
      return (
        <motion.a
          href={href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          className={baseStyles}
          whileHover={{ scale: prefersReducedMotion ? 1 : 1.02 }}
          whileTap={{ scale: prefersReducedMotion ? 1 : 0.98 }}
        >
          {buttonContent}
        </motion.a>
      )
    }

    return (
      <motion.button
        ref={ref}
        type={type}
        className={baseStyles}
        disabled={disabled || loading}
        onClick={onClick}
        whileHover={{ scale: prefersReducedMotion ? 1 : 1.02 }}
        whileTap={{ scale: prefersReducedMotion ? 1 : 0.98 }}
      >
        {buttonContent}
      </motion.button>
    )
  }
)

/**
 * BorderBeamButton - Button with animated border only
 *
 * Gradient runs around the entire border for a more subtle effect
 */
interface BorderBeamButtonProps extends Omit<BeamButtonProps, 'variant'> {
  /** Border color when not animating */
  borderColor?: string
  /** Beam gradient */
  beamGradient?: string
}

export function BorderBeamButton({
  children,
  size = 'md',
  showArrow = true,
  className = '',
  borderColor = 'rgba(99, 91, 255, 0.3)',
  beamGradient = 'linear-gradient(90deg, transparent, #635BFF, transparent)',
  ...props
}: BorderBeamButtonProps) {
  const prefersReducedMotion = useReducedMotion()
  const isMobile = useMediaQuery('(max-width: 640px)')

  const showBeam = !prefersReducedMotion && !isMobile

  // Size styles
  const sizeStyles = useMemo(() => {
    switch (size) {
      case 'sm':
        return 'px-4 py-2 text-sm gap-2'
      case 'lg':
        return 'px-8 py-4 text-lg gap-3'
      case 'xl':
        return 'px-10 py-5 text-xl gap-4'
      default:
        return 'px-6 py-3 text-base gap-2.5'
    }
  }, [size])

  const arrowSize = size === 'sm' ? 16 : size === 'lg' ? 22 : size === 'xl' ? 24 : 18

  return (
    <motion.button
      className={`
        relative inline-flex items-center justify-center
        font-semibold rounded-xl
        bg-white text-gray-900
        transition-all duration-300 ease-out
        hover:-translate-y-0.5 hover:shadow-card
        focus:outline-none focus:ring-2 focus:ring-brand/50 focus:ring-offset-2
        overflow-hidden
        ${sizeStyles}
        ${className}
      `}
      style={{
        border: `2px solid ${borderColor}`,
      }}
      whileHover={{ scale: prefersReducedMotion ? 1 : 1.02 }}
      whileTap={{ scale: prefersReducedMotion ? 1 : 0.98 }}
      {...props}
    >
      {/* Animated border beam */}
      {showBeam && (
        <div className="absolute inset-[-2px] rounded-xl overflow-hidden pointer-events-none">
          {/* Top border */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-[2px]"
            style={{ background: beamGradient }}
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />
          {/* Right border */}
          <motion.div
            className="absolute top-0 right-0 bottom-0 w-[2px]"
            style={{ background: beamGradient.replace('90deg', '180deg') }}
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear', delay: 0.75 }}
          />
          {/* Bottom border */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[2px]"
            style={{ background: beamGradient }}
            animate={{ x: ['200%', '-100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear', delay: 1.5 }}
          />
          {/* Left border */}
          <motion.div
            className="absolute top-0 left-0 bottom-0 w-[2px]"
            style={{ background: beamGradient.replace('90deg', '180deg') }}
            animate={{ y: ['200%', '-100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear', delay: 2.25 }}
          />
        </div>
      )}

      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {showArrow && (
          <motion.span
            className="inline-flex"
            initial={{ x: 0 }}
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowRight size={arrowSize} weight="bold" />
          </motion.span>
        )}
      </span>
    </motion.button>
  )
}

export default BeamButton
