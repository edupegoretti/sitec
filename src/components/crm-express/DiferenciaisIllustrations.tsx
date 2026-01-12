'use client'

import { motion } from 'framer-motion'

interface IllustrationProps {
  className?: string
}

// 1. Rocket with animated trail - "Implementação Rápida"
export function RocketIllustration({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      {/* Gradient definitions */}
      <defs>
        <linearGradient id="rocketTrail" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.8" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Rocket body */}
      <motion.g
        initial={{ y: 4, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {/* Main body */}
        <path
          d="M24 8L30 20L30 32L24 36L18 32L18 20L24 8Z"
          fill="currentColor"
          opacity="0.9"
        />
        {/* Window */}
        <circle cx="24" cy="18" r="3" fill="white" opacity="0.3" />
        {/* Fins */}
        <path d="M18 28L12 34L18 32V28Z" fill="currentColor" opacity="0.7" />
        <path d="M30 28L36 34L30 32V28Z" fill="currentColor" opacity="0.7" />
        {/* Nose cone highlight */}
        <path
          d="M24 8L27 14L24 12L21 14L24 8Z"
          fill="white"
          opacity="0.2"
        />
      </motion.g>

      {/* Animated exhaust flames */}
      <motion.g
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        style={{ transformOrigin: '24px 36px' }}
      >
        {/* Main flame */}
        <motion.path
          d="M24 36L27 44L24 40L21 44L24 36Z"
          fill="url(#rocketTrail)"
          animate={{
            d: [
              'M24 36L27 44L24 40L21 44L24 36Z',
              'M24 36L28 46L24 41L20 46L24 36Z',
              'M24 36L27 44L24 40L21 44L24 36Z',
            ],
          }}
          transition={{ duration: 0.4, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Side flames */}
        <motion.circle
          cx="21"
          cy="38"
          r="1.5"
          fill="currentColor"
          opacity="0.4"
          animate={{ cy: [38, 40, 38], opacity: [0.4, 0.2, 0.4] }}
          transition={{ duration: 0.3, repeat: Infinity }}
        />
        <motion.circle
          cx="27"
          cy="38"
          r="1.5"
          fill="currentColor"
          opacity="0.4"
          animate={{ cy: [38, 40, 38], opacity: [0.4, 0.2, 0.4] }}
          transition={{ duration: 0.3, repeat: Infinity, delay: 0.15 }}
        />
      </motion.g>

      {/* Speed lines */}
      <motion.g
        initial={{ opacity: 0, x: 5 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        <motion.line
          x1="8"
          y1="16"
          x2="14"
          y2="16"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.3"
          animate={{ x1: [8, 6, 8], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        <motion.line
          x1="6"
          y1="22"
          x2="13"
          y2="22"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.2"
          animate={{ x1: [6, 4, 6], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}
        />
      </motion.g>
    </svg>
  )
}

// 2. Puzzle pieces connecting - "Adaptado ao Seu Negócio"
export function PuzzleIllustration({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      {/* Left piece */}
      <motion.path
        d="M8 14H18V18C18 19.1 17.1 20 16 20C14.9 20 14 19.1 14 18V14H8V34H18V30C18 28.9 17.1 28 16 28C14.9 28 14 28.9 14 30V34H8V14Z"
        fill="currentColor"
        opacity="0.6"
        initial={{ x: -8, opacity: 0 }}
        animate={{ x: 0, opacity: 0.6 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Right piece - slides in to connect */}
      <motion.path
        d="M22 14H32V18C32 19.1 32.9 20 34 20C35.1 20 36 19.1 36 18V14H40V34H36V30C36 28.9 35.1 28 34 28C32.9 28 32 28.9 32 30V34H22V14Z"
        fill="currentColor"
        opacity="0.9"
        initial={{ x: 8, opacity: 0 }}
        animate={{ x: 0, opacity: 0.9 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Connection indicator - pulse when pieces meet */}
      <motion.circle
        cx="20"
        cy="24"
        r="2"
        fill="currentColor"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.5, 1], opacity: [0, 0.8, 0] }}
        transition={{ duration: 0.8, delay: 0.7, repeat: Infinity, repeatDelay: 2 }}
      />

      {/* Highlight lines */}
      <motion.path
        d="M12 18L12 30"
        stroke="white"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      />
    </svg>
  )
}

// 3. Chat bubble with animated checkmark - "Suporte Estruturado"
export function SupportIllustration({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      {/* Chat bubble */}
      <motion.path
        d="M8 12C8 10.9 8.9 10 10 10H38C39.1 10 40 10.9 40 12V30C40 31.1 39.1 32 38 32H16L10 38V32H10C8.9 32 8 31.1 8 30V12Z"
        fill="currentColor"
        opacity="0.15"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.15 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      />

      {/* Chat bubble border */}
      <motion.path
        d="M8 12C8 10.9 8.9 10 10 10H38C39.1 10 40 10.9 40 12V30C40 31.1 39.1 32 38 32H16L10 38V32H10C8.9 32 8 31.1 8 30V12Z"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />

      {/* Animated checkmark */}
      <motion.path
        d="M18 21L22 25L30 17"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 0.5, ease: 'easeOut' }}
      />

      {/* Success ripple */}
      <motion.circle
        cx="24"
        cy="21"
        r="8"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1.5, opacity: [0, 0.3, 0] }}
        transition={{ duration: 1, delay: 0.8, repeat: Infinity, repeatDelay: 2 }}
      />
    </svg>
  )
}

// 4. Growing bar chart - "ROI Rápido"
export function ChartIllustration({ className }: IllustrationProps) {
  const bars = [
    { x: 10, height: 12, delay: 0 },
    { x: 18, height: 18, delay: 0.1 },
    { x: 26, height: 24, delay: 0.2 },
    { x: 34, height: 32, delay: 0.3 },
  ]

  return (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      {/* Base line */}
      <motion.line
        x1="6"
        y1="40"
        x2="42"
        y2="40"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.3"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
        style={{ transformOrigin: '6px 40px' }}
      />

      {/* Animated bars */}
      {bars.map((bar, index) => (
        <motion.rect
          key={index}
          x={bar.x}
          y={40 - bar.height}
          width="6"
          height={bar.height}
          rx="2"
          fill="currentColor"
          opacity={0.4 + index * 0.15}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 0.4 + index * 0.15 }}
          transition={{
            duration: 0.5,
            delay: 0.2 + bar.delay,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{ transformOrigin: `${bar.x + 3}px 40px` }}
        />
      ))}

      {/* Trend line */}
      <motion.path
        d="M13 34L21 28L29 22L37 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
      />

      {/* Arrow at the end of trend line */}
      <motion.g
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 1.2 }}
      >
        <circle cx="37" cy="12" r="3" fill="currentColor" />
        <motion.circle
          cx="37"
          cy="12"
          r="5"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
          opacity="0.5"
          animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
          transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
        />
      </motion.g>
    </svg>
  )
}

// Export map for easy access by key
export const DIFERENCIAIS_ILLUSTRATIONS = {
  rocket: RocketIllustration,
  puzzle: PuzzleIllustration,
  support: SupportIllustration,
  chart: ChartIllustration,
} as const
