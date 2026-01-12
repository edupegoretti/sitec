'use client'

import { useMotionValueEvent } from 'framer-motion'
import { useState } from 'react'
import { useCountUpCurrency } from '@/hooks/useCountUp'

interface AnimatedCostProps {
  /**
   * The target value in BRL (e.g., 1500.00)
   */
  value: number
  /**
   * Animation delay in milliseconds
   * @default 0
   */
  delay?: number
  /**
   * Show decimals (.00)
   * @default true
   */
  showDecimals?: boolean
  /**
   * Additional CSS classes
   */
  className?: string
}

/**
 * Animated currency component for Brazilian Real (R$)
 * Uses spring animation that triggers on scroll into view
 *
 * @example
 * ```tsx
 * <AnimatedCost value={1500} delay={200} />
 * // Renders: R$ 1.500,00
 * ```
 */
export function AnimatedCost({
  value,
  delay = 0,
  showDecimals = true,
  className = '',
}: AnimatedCostProps) {
  const { ref, value: animatedValue } = useCountUpCurrency(value, {
    delay,
    stiffness: 100,
    damping: 60,
  })

  const [displayNumber, setDisplayNumber] = useState(0)

  useMotionValueEvent(animatedValue, 'change', (latest) => {
    setDisplayNumber(latest)
  })

  const formatted = displayNumber.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: showDecimals ? 2 : 0,
    maximumFractionDigits: showDecimals ? 2 : 0,
  })

  return (
    <span ref={ref} className={className}>
      {formatted}
    </span>
  )
}

/**
 * Variant without currency symbol (just the number)
 */
export function AnimatedNumber({
  value,
  delay = 0,
  decimals = 0,
  suffix = '',
  className = '',
}: {
  value: number
  delay?: number
  decimals?: number
  suffix?: string
  className?: string
}) {
  const { ref, value: animatedValue } = useCountUpCurrency(value, {
    delay,
    stiffness: 100,
    damping: 60,
  })

  const [displayNumber, setDisplayNumber] = useState(0)

  useMotionValueEvent(animatedValue, 'change', (latest) => {
    setDisplayNumber(latest)
  })

  const formatted = displayNumber.toLocaleString('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

  return (
    <span ref={ref} className={className}>
      {formatted}
      {suffix}
    </span>
  )
}
