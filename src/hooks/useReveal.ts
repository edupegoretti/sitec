'use client'

import { useRef } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'
import {
  viewport,
  durations,
  easings,
  getDirectionOffset,
  type Direction,
} from '@/lib/motion'

interface UseRevealOptions {
  /** Trigger animation once or every time */
  once?: boolean
  /** Viewport margin for trigger */
  margin?: string
  /** Percentage of element visible to trigger (0-1) */
  amount?: number
  /** Animation direction */
  direction?: Direction
  /** Animation duration */
  duration?: number
  /** Animation delay */
  delay?: number
  /** Custom easing curve */
  ease?: [number, number, number, number]
  /** Disable on mobile */
  disableOnMobile?: boolean
  /** Include blur effect */
  blur?: boolean
}

interface UseRevealReturn {
  ref: React.RefObject<HTMLDivElement | null>
  isInView: boolean
  shouldAnimate: boolean
  initial: Record<string, unknown>
  animate: Record<string, unknown>
  transition: {
    duration: number
    delay: number
    ease: [number, number, number, number]
  }
}

/**
 * useReveal - Hook centralizado para animações de scroll reveal
 *
 * Uso:
 * ```tsx
 * const { ref, isInView, initial, animate, transition } = useReveal({ direction: 'up' })
 *
 * return (
 *   <motion.div
 *     ref={ref}
 *     initial={initial}
 *     animate={isInView ? animate : initial}
 *     transition={transition}
 *   >
 *     Content
 *   </motion.div>
 * )
 * ```
 */
export function useReveal(options: UseRevealOptions = {}): UseRevealReturn {
  const {
    once = viewport.once,
    margin = viewport.margin,
    amount = viewport.amount,
    direction = 'up',
    duration = durations.medium,
    delay = 0,
    ease = easings.premium,
    disableOnMobile = false,
    blur = false,
  } = options

  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, {
    once,
    margin: margin as `${number}px`,
    amount,
  })
  const prefersReducedMotion = useReducedMotion()

  // Check for mobile (simple check, could use media query hook)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640

  const shouldAnimate = !prefersReducedMotion && !(disableOnMobile && isMobile)

  const directionOffset = getDirectionOffset(direction)
  const blurValue = blur ? 'blur(10px)' : 'blur(0px)'

  const initial: Record<string, unknown> = {
    opacity: 0,
    ...directionOffset,
    ...(blur && { filter: blurValue }),
  }

  const animate: Record<string, unknown> = {
    opacity: 1,
    x: 0,
    y: 0,
    ...(blur && { filter: 'blur(0px)' }),
  }

  const transition = {
    duration,
    delay,
    ease,
  }

  return {
    ref,
    isInView,
    shouldAnimate,
    initial: shouldAnimate ? initial : {},
    animate: shouldAnimate ? animate : {},
    transition,
  }
}

/**
 * useStaggerReveal - Hook para animações com stagger
 *
 * Retorna funções para calcular delay baseado no índice
 */
export function useStaggerReveal(options: UseRevealOptions & { stagger?: number } = {}) {
  const { stagger = 0.1, ...revealOptions } = options
  const reveal = useReveal(revealOptions)

  const getStaggerDelay = (index: number) => ({
    ...reveal.transition,
    delay: (revealOptions.delay || 0) + index * stagger,
  })

  return {
    ...reveal,
    stagger,
    getStaggerDelay,
  }
}

export default useReveal
