'use client'

import { useEffect, useRef } from 'react'
import { useInView, useMotionValue, useSpring } from 'framer-motion'

export interface UseCountUpOptions {
  /**
   * Animation duration in seconds
   * @default 2
   */
  duration?: number
  /**
   * Delay before animation starts in milliseconds
   * @default 0
   */
  delay?: number
  /**
   * Number of decimal places to show
   * @default 0
   */
  decimals?: number
  /**
   * Prefix to add before the number (e.g., "R$ ")
   * @default ""
   */
  prefix?: string
  /**
   * Suffix to add after the number (e.g., "%", "+")
   * @default ""
   */
  suffix?: string
  /**
   * Spring animation stiffness
   * @default 100
   */
  stiffness?: number
  /**
   * Spring animation damping
   * @default 60
   */
  damping?: number
}

/**
 * Custom hook for animated number counting with Framer Motion
 * Triggers animation when element enters viewport
 *
 * @example
 * ```tsx
 * const { ref, value } = useCountUp(450, { suffix: '+', decimals: 0 })
 * return <span ref={ref}>{Math.round(value)}</span>
 * ```
 */
export function useCountUp(
  end: number,
  options: UseCountUpOptions = {}
) {
  const {
    duration = 2,
    delay = 0,
    decimals = 0,
    prefix = '',
    suffix = '',
    stiffness = 100,
    damping = 60,
  } = options

  const ref = useRef<HTMLElement>(null)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, {
    damping,
    stiffness,
  })

  const isInView = useInView(ref, {
    once: true,
    margin: '-50px' // Trigger 50px before entering viewport
  })

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        motionValue.set(end)
      }, delay)

      return () => clearTimeout(timer)
    }
  }, [isInView, end, motionValue, delay])

  return {
    ref,
    value: springValue,
    /**
     * Formatted value with prefix/suffix
     */
    formattedValue: () => {
      const numValue = springValue.get()
      const formatted = decimals > 0
        ? numValue.toFixed(decimals)
        : Math.round(numValue).toString()
      return `${prefix}${formatted}${suffix}`
    }
  }
}

/**
 * Variant for currency formatting (BRL)
 */
export function useCountUpCurrency(
  end: number,
  options: Omit<UseCountUpOptions, 'prefix' | 'decimals'> = {}
) {
  return useCountUp(end, {
    ...options,
    prefix: 'R$ ',
    decimals: 2,
  })
}

/**
 * Variant for percentage formatting
 */
export function useCountUpPercentage(
  end: number,
  options: Omit<UseCountUpOptions, 'suffix' | 'decimals'> = {}
) {
  return useCountUp(end, {
    ...options,
    suffix: '%',
    decimals: 0,
  })
}
