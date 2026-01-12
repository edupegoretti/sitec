'use client'

import { motion, useMotionValueEvent } from 'framer-motion'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { useCountUp } from '@/hooks/useCountUp'

interface StatCardProps {
  value: string | number
  label: string
  variant?: 'default' | 'success' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  animated?: boolean
}

const valueStyles = {
  default: 'text-gray-900',
  success: 'text-success',
  danger: 'text-red-600',
}

const sizeStyles = {
  sm: 'text-2xl sm:text-3xl',
  md: 'text-3xl sm:text-4xl',
  lg: 'text-4xl sm:text-5xl lg:text-6xl',
}

// Helper function to parse value string into components
function parseValue(value: string | number): {
  numeric: number | null
  prefix: string
  suffix: string
  decimals: number
} {
  const valueStr = String(value)

  // Extract numeric part
  const numericMatch = valueStr.match(/([\d.,]+)/)
  if (!numericMatch) {
    return { numeric: null, prefix: '', suffix: valueStr, decimals: 0 }
  }

  const numericStr = numericMatch[1]
  const numericValue = parseFloat(numericStr.replace(/\./g, '').replace(',', '.'))

  // Determine decimals
  const decimals = numericStr.includes(',') ? numericStr.split(',')[1]?.length || 0 : 0

  // Extract prefix (everything before the number)
  const prefixEnd = valueStr.indexOf(numericMatch[0])
  const prefix = valueStr.substring(0, prefixEnd).trim()

  // Extract suffix (everything after the number)
  const suffixStart = prefixEnd + numericMatch[0].length
  const suffix = valueStr.substring(suffixStart).trim()

  return { numeric: numericValue, prefix, suffix, decimals }
}

export function StatCard({
  value,
  label,
  variant = 'default',
  size = 'md',
  className,
  animated = true,
}: StatCardProps) {
  const { numeric, prefix, suffix, decimals } = parseValue(value)
  const { ref, value: animatedValue } = useCountUp(numeric || 0, { delay: 200 })
  const [displayNumber, setDisplayNumber] = useState(0)

  useMotionValueEvent(animatedValue, 'change', (latest) => {
    setDisplayNumber(latest)
  })

  const displayValue = animated && numeric !== null ? (
    <span ref={ref}>
      {prefix && `${prefix} `}
      {displayNumber.toLocaleString('pt-BR', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix && `${suffix}`}
    </span>
  ) : (
    value
  )

  return (
    <div className={cn('text-center', className)}>
      <div
        className={cn(
          'font-bold mb-1',
          sizeStyles[size],
          valueStyles[variant]
        )}
      >
        {displayValue}
      </div>
      <div className="text-sm text-gray-500">{label}</div>
    </div>
  )
}

// Versão para fundos escuros
interface StatCardDarkProps extends StatCardProps {}

export function StatCardDark({
  value,
  label,
  variant = 'default',
  size = 'lg',
  className,
  animated = true,
}: StatCardDarkProps) {
  const darkValueStyles = {
    default: 'text-white',
    success: 'text-success',
    danger: 'text-red-600',
  }

  const { numeric, prefix, suffix, decimals } = parseValue(value)
  const { ref, value: animatedValue } = useCountUp(numeric || 0, { delay: 200 })
  const [displayNumber, setDisplayNumber] = useState(0)

  useMotionValueEvent(animatedValue, 'change', (latest) => {
    setDisplayNumber(latest)
  })

  const displayValue = animated && numeric !== null ? (
    <span ref={ref}>
      {prefix && `${prefix} `}
      {displayNumber.toLocaleString('pt-BR', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix && `${suffix}`}
    </span>
  ) : (
    value
  )

  return (
    <div className={cn('text-center', className)}>
      <div
        className={cn(
          'font-bold mb-2',
          sizeStyles[size],
          darkValueStyles[variant]
        )}
      >
        {displayValue}
      </div>
      <div className="text-gray-400 text-sm sm:text-base">{label}</div>
    </div>
  )
}
