'use client'

import { useRef, useCallback, useEffect } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import {
  useVisualizationAnimation,
  animateCounter,
  PREMIUM_EASINGS,
} from '@/hooks/useVisualizationAnimation'

gsap.registerPlugin(useGSAP)

interface DadosVisualizationProps {
  color: string
}

// Data grid configuration
const GRID_ROWS = 5
const GRID_COLS = 4
const DIRTY_CELLS = [0, 2, 5, 7, 9, 11, 13, 14, 17, 19] // Indices of "dirty" cells
const TOTAL_DUPLICATES = 12847

export function DadosVisualization({ color }: DadosVisualizationProps) {
  const {
    containerRef,
    svgRef,
    timelineRef,
    isVisible,
    prefersReducedMotion,
    cleanupTimeline,
  } = useVisualizationAnimation({ repeatDelay: 3 })

  const duplicateCounterRef = useRef<SVGTextElement>(null)
  const accuracyCounterRef = useRef<SVGTextElement>(null)
  const progressBarRef = useRef<SVGRectElement>(null)
  const particlesGroupRef = useRef<SVGGElement>(null)

  const initializeAnimation = useCallback(() => {
    if (!svgRef.current || prefersReducedMotion) return

    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 3,
      paused: !isVisible,
      defaults: { ease: PREMIUM_EASINGS.premium },
    })

    timelineRef.current = tl

    // Phase 1: Before section appears with slide
    tl.fromTo(
      '.before-section',
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.55 }
    )

    // Phase 2: Dirty cells start glitching with stronger effect
    DIRTY_CELLS.forEach((cellIdx, i) => {
      tl.to(
        `.before-cell-${cellIdx}`,
        {
          x: '+=3',
          duration: 0.04,
          yoyo: true,
          repeat: 6,
          ease: 'none',
        },
        0.9 + i * 0.04
      )
    })

    // Phase 3: Show duplicate count with shake
    tl.fromTo(
      '.duplicate-badge',
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.35, ease: PREMIUM_EASINGS.celebration },
      1.3
    )
    tl.to('.duplicate-badge', {
      x: 3,
      duration: 0.04,
      yoyo: true,
      repeat: 4,
      ease: 'none',
    })

    // Phase 4: Transformation process appears
    tl.fromTo(
      '.transform-section',
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.45 },
      1.9
    )

    // Phase 5: Progress bar fills with glow
    if (progressBarRef.current) {
      tl.fromTo(
        progressBarRef.current,
        { attr: { width: 0 } },
        { attr: { width: 160 }, duration: 2.2, ease: 'power1.inOut' },
        2.1
      )
    }

    // Shimmer effect on progress
    tl.fromTo(
      '.progress-shimmer',
      { attr: { x: -40 } },
      { attr: { x: 200 }, duration: 2, ease: 'power1.inOut' },
      2.3
    )

    // Phase 6: Data particles flow from BEFORE cells to AFTER cells
    const particleCount = 12
    for (let i = 0; i < particleCount; i++) {
      const col = i % 3
      const row = Math.floor(i / 3)

      const startX = 75 + col * 45
      const startY = 69 + row * 34
      const endX = 515 + col * 45
      const endY = 69 + row * 34

      // Particle appears at Before cell
      tl.fromTo(
        `.data-particle-${i}`,
        {
          attr: { cx: startX, cy: startY },
          opacity: 0,
          scale: 0,
        },
        {
          opacity: 0.95,
          scale: 1,
          duration: 0.28,
        },
        2.2 + i * 0.07
      )

      // Move particle to processing zone center
      tl.to(
        `.data-particle-${i}`,
        {
          attr: { cx: 360, cy: 140 },
          duration: 0.65,
          ease: 'power2.in',
        },
        2.5 + i * 0.07
      )

      // Change color at processing (red → green)
      tl.to(
        `.data-particle-${i}`,
        {
          fill: '#10B981',
          duration: 0.35,
        },
        3.15 + i * 0.05
      )

      // Continue to AFTER cell (exact position)
      tl.to(
        `.data-particle-${i}`,
        {
          attr: { cx: endX, cy: endY },
          duration: 0.65,
          ease: 'power2.out',
        },
        3.5 + i * 0.05
      )

      // Fade out as it "enters" the cell
      tl.to(
        `.data-particle-${i}`,
        {
          opacity: 0,
          scale: 0.5,
          duration: 0.4,
        },
        4.2 + i * 0.03
      )
    }

    // Phase 7: Counter decrements (duplicates removed)
    animateCounter(
      tl,
      duplicateCounterRef.current,
      TOTAL_DUPLICATES,
      0,
      2.2,
      2.8,
      (n) => n.toLocaleString()
    )

    // Phase 8: After section appears
    tl.fromTo(
      '.after-section',
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, duration: 0.55 },
      3.8
    )

    // Phase 9: Clean cells appear with checkmarks
    for (let i = 0; i < GRID_ROWS * GRID_COLS; i++) {
      tl.fromTo(
        `.after-cell-${i}`,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.18, ease: PREMIUM_EASINGS.celebration },
        4.0 + i * 0.025
      )
      tl.fromTo(
        `.check-${i}`,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.18, ease: PREMIUM_EASINGS.celebration },
        4.1 + i * 0.025
      )
    }

    // Phase 10: Accuracy counter
    animateCounter(
      tl,
      accuracyCounterRef.current,
      0,
      99.8,
      1.1,
      4.8,
      (n) => `${n.toFixed(1)}%`
    )

    // Phase 11: Success celebration with strong glow
    tl.to(
      '.accuracy-badge',
      {
        filter: 'url(#dadosStrongGlow)',
        scale: 1.08,
        duration: 0.35,
        yoyo: true,
        repeat: 2,
      },
      5.3
    )

    // Hold
    tl.to({}, { duration: 2.5 })

    // Reset
    tl.to('.before-section, .after-section, .transform-section', {
      opacity: 0,
      duration: 0.35,
    })
    tl.set(duplicateCounterRef.current, { textContent: TOTAL_DUPLICATES.toLocaleString() })
    tl.set(accuracyCounterRef.current, { textContent: '0%' })
    if (progressBarRef.current) {
      tl.set(progressBarRef.current, { attr: { width: 0 } })
    }

    return () => {
      tl.kill()
    }
  }, [isVisible, prefersReducedMotion, svgRef, timelineRef])

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        if (duplicateCounterRef.current) duplicateCounterRef.current.textContent = '0'
        if (accuracyCounterRef.current) accuracyCounterRef.current.textContent = '99.999%'
        return
      }

      return initializeAnimation()
    },
    { scope: containerRef, dependencies: [isVisible, initializeAnimation] }
  )

  useEffect(() => {
    return () => cleanupTimeline()
  }, [cleanupTimeline])

  return (
    <div ref={containerRef} className="w-full">
      <svg
        ref={svgRef}
        viewBox="0 0 720 280"
        className="w-full h-auto"
        aria-label="Higienização de Dados - Transformação visual"
        style={{ willChange: 'transform' }}
      >
        <defs>
          {/* Premium 5-stop gradient for progress */}
          <linearGradient id="dadosGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#EF4444" stopOpacity="1" />
            <stop offset="25%" stopColor="#F97316" stopOpacity="0.9" />
            <stop offset="50%" stopColor={color} stopOpacity="0.85" />
            <stop offset="75%" stopColor="#059669" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="1" />
          </linearGradient>

          {/* Error gradient */}
          <linearGradient id="errorGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#EF4444" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#DC2626" stopOpacity="0.2" />
          </linearGradient>

          {/* Success gradient */}
          <linearGradient id="successGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#059669" stopOpacity="0.2" />
          </linearGradient>

          {/* Glassmorphism gradients */}
          <linearGradient id="beforeGlassGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#EF4444" stopOpacity="0.12" />
            <stop offset="50%" stopColor="#EF4444" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#EF4444" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="afterGlassGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.12" />
            <stop offset="50%" stopColor="#10B981" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="transformGlassGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.08" />
            <stop offset="50%" stopColor={color} stopOpacity="0.04" />
            <stop offset="100%" stopColor={color} stopOpacity="0.02" />
          </linearGradient>

          {/* Shimmer gradient */}
          <linearGradient id="shimmerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="50%" stopColor="white" stopOpacity="0.2" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>

          {/* Particle gradient */}
          <radialGradient id="particleGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="white" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#EF4444" stopOpacity="0" />
          </radialGradient>

          {/* Glow filters */}
          <filter id="dadosGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="dadosStrongGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="errorGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glitchFilter" x="-10%" y="-10%" width="120%" height="120%">
            <feOffset in="SourceGraphic" dx="2" dy="0" result="r" />
            <feOffset in="SourceGraphic" dx="-2" dy="0" result="b" />
            <feBlend in="r" in2="b" mode="screen" />
          </filter>

          {/* Noise texture */}
          <filter id="dadosNoise" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" result="noise" />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.02" />
            </feComponentTransfer>
            <feBlend in="SourceGraphic" mode="overlay" />
          </filter>

          {/* Clip path for progress shimmer */}
          <clipPath id="progressClip">
            <rect x="280" y="135" width="160" height="8" rx="4" />
          </clipPath>
        </defs>

        {/* Background noise texture */}
        <rect x="0" y="0" width="720" height="280" fill="transparent" filter="url(#dadosNoise)" />

        {/* BEFORE Section */}
        <g className="before-section" opacity="0">
          <rect
            x="40"
            y="20"
            width="200"
            height="215"
            rx="16"
            fill="url(#beforeGlassGradient)"
            stroke="#EF4444"
            strokeOpacity="0.2"
            strokeWidth="1"
          />
          <text
            x="140"
            y="42"
            textAnchor="middle"
            fill="#EF4444"
            fontSize="10"
            fontWeight="600"
            letterSpacing="0.15em"
          >
            ANTES
          </text>

          {/* Data grid - before */}
          {Array.from({ length: GRID_ROWS * GRID_COLS }).map((_, i) => {
            const row = Math.floor(i / GRID_COLS)
            const col = i % GRID_COLS
            const isDirty = DIRTY_CELLS.includes(i)

            return (
              <rect
                key={`before-${i}`}
                className={`before-cell-${i}`}
                x={56 + col * 45}
                y={56 + row * 34}
                width="38"
                height="26"
                rx="5"
                fill={isDirty ? 'url(#errorGradient)' : color}
                fillOpacity={isDirty ? 1 : 0.15}
                stroke={isDirty ? '#EF4444' : 'transparent'}
                strokeWidth={isDirty ? 1 : 0}
                strokeOpacity="0.6"
                filter={isDirty ? 'url(#errorGlow)' : 'none'}
              />
            )
          })}

          {/* Duplicate count badge */}
          <g className="duplicate-badge" transform="translate(56, 215)">
            <rect
              width="135"
              height="24"
              rx="12"
              fill="#EF4444"
              fillOpacity="0.15"
              stroke="#EF4444"
              strokeWidth="1"
              strokeOpacity="0.2"
            />
            <text x="10" y="16" fill="#EF4444" fontSize="9" fontWeight="500">
              Duplicados:
            </text>
            <text
              ref={duplicateCounterRef}
              x="125"
              y="16"
              textAnchor="end"
              fill="#EF4444"
              fontSize="11"
              fontWeight="700"
            >
              {TOTAL_DUPLICATES.toLocaleString()}
            </text>
          </g>
        </g>

        {/* TRANSFORMATION Section */}
        <g className="transform-section" opacity="0">
          <rect
            x="260"
            y="85"
            width="200"
            height="105"
            rx="16"
            fill="url(#transformGlassGradient)"
            stroke={color}
            strokeOpacity="0.12"
            strokeWidth="1"
          />

          {/* Process label */}
          <text
            x="360"
            y="112"
            textAnchor="middle"
            fill="white"
            fillOpacity="0.5"
            fontSize="9"
            fontWeight="600"
            letterSpacing="0.12em"
          >
            FLUIDSALES™
          </text>

          {/* Progress track */}
          <rect
            x="280"
            y="132"
            width="160"
            height="10"
            rx="5"
            fill="white"
            fillOpacity="0.08"
          />
          {/* Progress fill */}
          <rect
            ref={progressBarRef}
            x="280"
            y="132"
            width="0"
            height="10"
            rx="5"
            fill="url(#dadosGradient)"
          />
          {/* Progress shimmer */}
          <g clipPath="url(#progressClip)">
            <rect
              className="progress-shimmer"
              x="-40"
              y="132"
              width="40"
              height="10"
              fill="url(#shimmerGradient)"
            />
          </g>

          {/* Process steps */}
          <text
            x="360"
            y="162"
            textAnchor="middle"
            fill={color}
            fontSize="9"
            fontWeight="500"
          >
            Limpeza · Validação · Merge
          </text>

          {/* Arrow indicators with glow */}
          <g filter="url(#dadosGlow)">
            <polygon
              points="250,137 262,132 262,142"
              fill="#EF4444"
              fillOpacity="0.7"
            />
            <polygon
              points="470,137 458,132 458,142"
              fill="#10B981"
              fillOpacity="0.7"
            />
          </g>
        </g>

        {/* Data particles - 12 particles (3 cols × 4 rows) */}
        <g ref={particlesGroupRef}>
          {Array.from({ length: 12 }).map((_, i) => (
            <circle
              key={i}
              className={`data-particle-${i}`}
              r="6"
              fill="#EF4444"
              opacity="0"
              filter="url(#dadosGlow)"
            />
          ))}
        </g>

        {/* AFTER Section */}
        <g className="after-section" opacity="0">
          <rect
            x="480"
            y="20"
            width="200"
            height="215"
            rx="16"
            fill="url(#afterGlassGradient)"
            stroke="#10B981"
            strokeOpacity="0.2"
            strokeWidth="1"
          />
          <text
            x="580"
            y="42"
            textAnchor="middle"
            fill="#10B981"
            fontSize="10"
            fontWeight="600"
            letterSpacing="0.15em"
          >
            DEPOIS
          </text>

          {/* Data grid - after (all clean) */}
          {Array.from({ length: GRID_ROWS * GRID_COLS }).map((_, i) => {
            const row = Math.floor(i / GRID_COLS)
            const col = i % GRID_COLS

            return (
              <g key={`after-${i}`}>
                <rect
                  className={`after-cell-${i}`}
                  x={496 + col * 45}
                  y={56 + row * 34}
                  width="38"
                  height="26"
                  rx="5"
                  fill="url(#successGradient)"
                  opacity="0"
                />
                {/* Checkmark */}
                <text
                  className={`check-${i}`}
                  x={515 + col * 45}
                  y={74 + row * 34}
                  textAnchor="middle"
                  fill="#10B981"
                  fontSize="13"
                  fontWeight="600"
                  opacity="0"
                >
                  ✓
                </text>
              </g>
            )
          })}

          {/* Accuracy badge */}
          <g className="accuracy-badge" transform="translate(496, 215)">
            <rect
              width="135"
              height="24"
              rx="12"
              fill="#10B981"
              fillOpacity="0.15"
              stroke="#10B981"
              strokeWidth="1"
              strokeOpacity="0.2"
            />
            <text x="10" y="16" fill="#10B981" fontSize="9" fontWeight="500">
              Acurácia:
            </text>
            <text
              ref={accuracyCounterRef}
              x="125"
              y="16"
              textAnchor="end"
              fill="#10B981"
              fontSize="11"
              fontWeight="700"
            >
              0%
            </text>
          </g>
        </g>

        {/* Summary with line */}
        <g transform="translate(260, 248)">
          <rect width="200" height="1" fill="white" fillOpacity="0.08" />
          <text
            y="18"
            fill="white"
            fillOpacity="0.4"
            fontSize="10"
            textAnchor="middle"
            x="100"
          >
            Dados limpos, decisões certeiras
          </text>
        </g>
      </svg>
    </div>
  )
}

export default DadosVisualization
