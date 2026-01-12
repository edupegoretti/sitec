'use client'

import { useRef, useMemo } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useMediaQuery } from '@/hooks/useMousePosition'
import {
  durations,
  easings,
  staggers,
  distances,
  viewport,
  blur as blurTokens,
  type Direction,
} from '@/lib/motion'

interface TextRevealProps {
  /** The text to animate */
  text: string
  /** Element type to render */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div'
  /** Split mode: by word, character, or line */
  splitBy?: 'word' | 'character' | 'line'
  /** Stagger delay between each element (in seconds) */
  stagger?: number
  /** Base animation duration */
  duration?: number
  /** Initial delay before animation starts */
  delay?: number
  /** Animation direction */
  direction?: Direction
  /** Additional className */
  className?: string
  /** Class for each animated segment */
  segmentClassName?: string
  /** Highlight specific words with a different color */
  highlightWords?: string[]
  /** Highlight color class */
  highlightClassName?: string
  /** Trigger animation once or every time in view */
  once?: boolean
  /** Viewport margin for trigger (e.g., "-50px") */
  margin?: string
  /** Blur effect on reveal */
  blur?: boolean
  /** Custom easing (cubic bezier) */
  ease?: [number, number, number, number]
  /** Disable on mobile for performance */
  disableOnMobile?: boolean
}

/**
 * TextReveal - Premium text animation with split reveal
 *
 * Splits text into words/characters and animates them sequentially
 * for a polished, professional entrance effect.
 */
export function TextReveal({
  text,
  as: Tag = 'div',
  splitBy = 'word',
  stagger = staggers.text,
  duration = durations.medium,
  delay = 0,
  direction = 'up',
  className = '',
  segmentClassName = '',
  highlightWords = [],
  highlightClassName = 'text-brand',
  once = viewport.once,
  margin = viewport.margin,
  blur = false,
  ease = easings.premium,
  disableOnMobile = false,
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: margin as `${number}px` })
  const prefersReducedMotion = useReducedMotion()
  const isMobile = useMediaQuery('(max-width: 640px)')

  // Split text into segments
  const segments = useMemo(() => {
    if (splitBy === 'character') {
      return text.split('').map((char, i) => ({
        text: char === ' ' ? '\u00A0' : char,
        isSpace: char === ' ',
        isHighlight: false,
        key: i,
      }))
    }

    if (splitBy === 'line') {
      return text.split('\n').map((line, i) => ({
        text: line,
        isSpace: false,
        isHighlight: highlightWords.some(word =>
          line.toLowerCase().includes(word.toLowerCase())
        ),
        key: i,
      }))
    }

    // Default: split by word
    return text.split(' ').map((word, i) => ({
      text: word,
      isSpace: false,
      isHighlight: highlightWords.some(hw =>
        word.toLowerCase().includes(hw.toLowerCase())
      ),
      key: i,
    }))
  }, [text, splitBy, highlightWords])

  // Calculate animation variants based on direction
  const getInitialState = useMemo(() => {
    const blurValue = blur ? blurTokens.md : blurTokens.none

    switch (direction) {
      case 'up':
        return { opacity: 0, y: distances.lg, filter: blurValue }
      case 'down':
        return { opacity: 0, y: -distances.lg, filter: blurValue }
      case 'left':
        return { opacity: 0, x: distances.lg, filter: blurValue }
      case 'right':
        return { opacity: 0, x: -distances.lg, filter: blurValue }
      case 'none':
      default:
        return { opacity: 0, filter: blurValue }
    }
  }, [direction, blur])

  const getFinalState = useMemo(() => ({
    opacity: 1,
    y: 0,
    x: 0,
    filter: blurTokens.none,
  }), [])

  // Disable animation on mobile if specified, or for reduced motion
  const shouldAnimate = !prefersReducedMotion && !(disableOnMobile && isMobile)

  if (!shouldAnimate) {
    return (
      <Tag ref={ref} className={className}>
        {segments.map((segment, i) => (
          <span
            key={segment.key}
            className={`${segmentClassName} ${segment.isHighlight ? highlightClassName : ''}`}
          >
            {segment.text}
            {splitBy === 'word' && i < segments.length - 1 ? ' ' : ''}
          </span>
        ))}
      </Tag>
    )
  }

  return (
    <Tag ref={ref} className={className}>
      {segments.map((segment, i) => (
        <motion.span
          key={segment.key}
          className={`
            inline-block
            ${segmentClassName}
            ${segment.isHighlight ? highlightClassName : ''}
          `}
          initial={getInitialState}
          animate={isInView ? getFinalState : getInitialState}
          transition={{
            duration,
            delay: delay + i * stagger,
            ease,
          }}
        >
          {segment.text}
          {splitBy === 'word' && i < segments.length - 1 ? '\u00A0' : ''}
        </motion.span>
      ))}
    </Tag>
  )
}

/**
 * TextRevealLine - Reveal entire lines with clip animation
 *
 * Uses overflow hidden and translateY for a clean reveal effect
 */
interface TextRevealLineProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  className?: string
  once?: boolean
}

export function TextRevealLine({
  children,
  delay = 0,
  duration = durations.slow,
  className = '',
  once = viewport.once,
}: TextRevealLineProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: viewport.margin as `${number}px` })
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: '100%', opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { y: '100%', opacity: 0 }}
        transition={{
          duration,
          delay,
          ease: easings.premium,
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}

/**
 * HeadlineReveal - Specialized for headlines with line breaks
 *
 * Animates each line separately for dramatic effect
 */
interface HeadlineRevealProps {
  /** Headline text with \n for line breaks */
  text: string
  as?: 'h1' | 'h2' | 'h3'
  className?: string
  lineClassName?: string
  highlightLines?: number[]
  highlightClassName?: string
  stagger?: number
  baseDelay?: number
}

export function HeadlineReveal({
  text,
  as: Tag = 'h1',
  className = '',
  lineClassName = '',
  highlightLines = [],
  highlightClassName = 'text-brand',
  stagger = staggers.sections,
  baseDelay = 0,
}: HeadlineRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: viewport.once, margin: viewport.margin as `${number}px` })
  const prefersReducedMotion = useReducedMotion()

  const lines = text.split('\n')

  if (prefersReducedMotion) {
    return (
      <Tag ref={ref} className={className}>
        {lines.map((line, i) => (
          <span
            key={i}
            className={`block ${lineClassName} ${highlightLines.includes(i) ? highlightClassName : ''}`}
          >
            {line}
          </span>
        ))}
      </Tag>
    )
  }

  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span
            className={`block ${lineClassName} ${highlightLines.includes(i) ? highlightClassName : ''}`}
            initial={{ y: '100%', opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: '100%', opacity: 0 }}
            transition={{
              duration: durations.slow,
              delay: baseDelay + i * stagger,
              ease: easings.premium,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}

/**
 * TypewriterText - Typewriter effect for subtitles
 */
interface TypewriterTextProps {
  text: string
  className?: string
  speed?: number // ms per character
  delay?: number
  cursor?: boolean
  cursorClassName?: string
}

export function TypewriterText({
  text,
  className = '',
  speed = 50,
  delay = 0,
  cursor = true,
  cursorClassName = 'text-brand',
}: TypewriterTextProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: viewport.once, margin: viewport.margin as `${number}px` })
  const prefersReducedMotion = useReducedMotion()

  const characters = text.split('')
  const totalDuration = (characters.length * speed) / 1000

  if (prefersReducedMotion) {
    return <span className={className}>{text}</span>
  }

  return (
    <span ref={ref} className={className}>
      {characters.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{
            duration: 0.01,
            delay: delay + (i * speed) / 1000,
          }}
        >
          {char}
        </motion.span>
      ))}
      {cursor && (
        <motion.span
          className={cursorClassName}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: [1, 0, 1] } : { opacity: 0 }}
          transition={{
            opacity: {
              duration: durations.slow,
              repeat: Infinity,
              delay: delay + totalDuration,
            },
          }}
        >
          |
        </motion.span>
      )}
    </span>
  )
}

export default TextReveal
