'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

// Check for reduced motion preference
const getReducedMotionPreference = () => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

interface UseVisualizationAnimationOptions {
  /** Delay before animation starts when visible */
  delay?: number
  /** Number of times to repeat (-1 for infinite) */
  repeat?: number
  /** Delay between repeats in seconds */
  repeatDelay?: number
  /** Default GSAP ease */
  defaultEase?: string
}

interface UseVisualizationAnimationReturn {
  containerRef: React.RefObject<HTMLDivElement>
  svgRef: React.RefObject<SVGSVGElement>
  timelineRef: React.MutableRefObject<gsap.core.Timeline | null>
  isVisible: boolean
  prefersReducedMotion: boolean
  createTimeline: (options?: gsap.TimelineVars) => gsap.core.Timeline
  cleanupTimeline: () => void
}

/**
 * Shared hook for premium SVG visualizations with GSAP
 * Handles:
 * - IntersectionObserver for visibility
 * - Reduced motion preference
 * - Timeline creation and cleanup
 * - Play/pause on visibility change
 */
export function useVisualizationAnimation(
  options: UseVisualizationAnimationOptions = {}
): UseVisualizationAnimationReturn {
  const {
    delay = 0,
    repeat = -1,
    repeatDelay = 3,
    defaultEase = 'power2.inOut',
  } = options

  const containerRef = useRef<HTMLDivElement>(null!)
  const svgRef = useRef<SVGSVGElement>(null!)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  // Check reduced motion on mount
  useEffect(() => {
    setPrefersReducedMotion(getReducedMotionPreference())

    // Listen for changes
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // IntersectionObserver for visibility-based play/pause
  useEffect(() => {
    if (!containerRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting
        setIsVisible(visible)

        if (timelineRef.current) {
          if (visible) {
            // Small delay before playing to ensure smooth transition
            setTimeout(() => {
              timelineRef.current?.play()
            }, delay * 1000)
          } else {
            timelineRef.current.pause()
          }
        }
      },
      {
        threshold: 0.2, // Trigger when 20% visible
        rootMargin: '-50px', // Trigger slightly before fully in view
      }
    )

    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [delay])

  // Create a new timeline with default options
  const createTimeline = useCallback(
    (timelineOptions?: gsap.TimelineVars): gsap.core.Timeline => {
      // Kill existing timeline
      if (timelineRef.current) {
        timelineRef.current.kill()
      }

      const tl = gsap.timeline({
        repeat,
        repeatDelay,
        paused: !isVisible || prefersReducedMotion,
        defaults: { ease: defaultEase },
        ...timelineOptions,
      })

      timelineRef.current = tl
      return tl
    },
    [repeat, repeatDelay, defaultEase, isVisible, prefersReducedMotion]
  )

  // Cleanup timeline
  const cleanupTimeline = useCallback(() => {
    if (timelineRef.current) {
      timelineRef.current.kill()
      timelineRef.current = null
    }
  }, [])

  return {
    containerRef,
    svgRef,
    timelineRef,
    isVisible,
    prefersReducedMotion,
    createTimeline,
    cleanupTimeline,
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// UTILITY FUNCTIONS FOR VISUALIZATIONS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Create SVG particles dynamically
 */
export function createParticles(
  group: SVGGElement,
  count: number,
  options: {
    minRadius?: number
    maxRadius?: number
    fill?: string
    filter?: string
  } = {}
): SVGCircleElement[] {
  const { minRadius = 3, maxRadius = 5, fill = 'url(#particleGradient)', filter = 'url(#glow)' } = options

  const particles: SVGCircleElement[] = []

  // Clear existing particles
  while (group.firstChild) {
    group.removeChild(group.firstChild)
  }

  for (let i = 0; i < count; i++) {
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
    const radius = minRadius + Math.random() * (maxRadius - minRadius)
    circle.setAttribute('r', String(radius))
    circle.setAttribute('fill', fill)
    if (filter) circle.setAttribute('filter', filter)
    circle.setAttribute('opacity', '0')
    circle.setAttribute('cx', '0')
    circle.setAttribute('cy', '0')
    group.appendChild(circle)
    particles.push(circle)
  }

  return particles
}

/**
 * Animate a counter from start to end
 */
export function animateCounter(
  timeline: gsap.core.Timeline,
  element: SVGTextElement | HTMLElement | null,
  start: number,
  end: number,
  duration: number,
  position?: gsap.Position,
  format?: (n: number) => string
) {
  if (!element) return

  const formatter = format || ((n: number) => String(Math.round(n)))

  timeline.to(
    { val: start },
    {
      val: end,
      duration,
      ease: 'power2.out',
      onUpdate: function () {
        const current = this.targets()[0].val
        element.textContent = formatter(current)
      },
    },
    position
  )
}

/**
 * Create confetti burst effect
 */
export function spawnConfetti(
  group: SVGGElement,
  x: number,
  y: number,
  count: number = 20,
  colors: string[] = ['#635BFF', '#10B981', '#F59E0B', '#EC4899']
) {
  for (let i = 0; i < count; i++) {
    const confetti = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
    confetti.setAttribute('width', '6')
    confetti.setAttribute('height', '6')
    confetti.setAttribute('rx', '1')
    confetti.setAttribute('fill', colors[i % colors.length])
    confetti.setAttribute('x', String(x))
    confetti.setAttribute('y', String(y))
    group.appendChild(confetti)

    const angle = (Math.PI * 2 * i) / count
    const distance = 30 + Math.random() * 40

    gsap.to(confetti, {
      x: x + Math.cos(angle) * distance,
      y: y + Math.sin(angle) * distance + 30,
      rotation: Math.random() * 360,
      opacity: 0,
      duration: 0.8 + Math.random() * 0.4,
      ease: 'power1.out',
      onComplete: () => confetti.remove(),
    })
  }
}

/**
 * Create ripple effect at a point
 */
export function createRipple(
  group: SVGGElement,
  cx: number,
  cy: number,
  color: string,
  startRadius: number = 8,
  endRadius: number = 24
) {
  const ripple = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
  ripple.setAttribute('cx', String(cx))
  ripple.setAttribute('cy', String(cy))
  ripple.setAttribute('r', String(startRadius))
  ripple.setAttribute('fill', 'none')
  ripple.setAttribute('stroke', color)
  ripple.setAttribute('stroke-width', '2')
  group.appendChild(ripple)

  gsap.fromTo(
    ripple,
    { attr: { r: startRadius }, opacity: 0.8 },
    {
      attr: { r: endRadius },
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      onComplete: () => ripple.remove(),
    }
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// PREMIUM EASING FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

export const PREMIUM_EASINGS = {
  /** Zopu signature ease - smooth deceleration */
  premium: 'power3.out',
  /** Stripe-like ease */
  stripe: 'expo.out',
  /** Bouncy celebration */
  celebration: 'back.out(2)',
  /** Smooth entrance */
  entrance: 'power2.out',
  /** Quick snap */
  snap: 'power4.inOut',
}

// ═══════════════════════════════════════════════════════════════════════════
// PREMIUM DURATIONS
// ═══════════════════════════════════════════════════════════════════════════

export const DURATIONS = {
  micro: 0.15,
  fast: 0.3,
  medium: 0.5,
  slow: 0.8,
  narrative: 1.2,
}

// ═══════════════════════════════════════════════════════════════════════════
// SHARED SVG DEFINITIONS
// ═══════════════════════════════════════════════════════════════════════════

export const SVG_DEFS = `
  <!-- Brand Gradient -->
  <linearGradient id="brandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stopColor="#635BFF" />
    <stop offset="100%" stopColor="#8B85FF" />
  </linearGradient>

  <!-- Success Gradient -->
  <linearGradient id="successGradient" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stopColor="#00A67E" />
    <stop offset="100%" stopColor="#00D4A0" />
  </linearGradient>

  <!-- Particle Gradient -->
  <linearGradient id="particleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stopColor="#635BFF" />
    <stop offset="100%" stopColor="#8B85FF" />
  </linearGradient>

  <!-- Danger Gradient -->
  <linearGradient id="dangerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stopColor="#EF4444" />
    <stop offset="100%" stopColor="#F87171" />
  </linearGradient>

  <!-- Glow Filter -->
  <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
    <feGaussianBlur stdDeviation="3" result="blur" />
    <feMerge>
      <feMergeNode in="blur" />
      <feMergeNode in="SourceGraphic" />
    </feMerge>
  </filter>

  <!-- Soft Glow -->
  <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
    <feGaussianBlur stdDeviation="6" result="blur" />
    <feComposite in="SourceGraphic" in2="blur" operator="over" />
  </filter>

  <!-- Strong Glow for celebrations -->
  <filter id="strongGlow" x="-100%" y="-100%" width="300%" height="300%">
    <feGaussianBlur stdDeviation="8" result="blur" />
    <feMerge>
      <feMergeNode in="blur" />
      <feMergeNode in="blur" />
      <feMergeNode in="SourceGraphic" />
    </feMerge>
  </filter>

  <!-- Arrow Marker -->
  <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
    <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" />
  </marker>
`

export default useVisualizationAnimation
