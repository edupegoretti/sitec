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

interface ProcessosVisualizationProps {
  color: string
}

// Pipeline stages
const STAGES = [
  { name: 'Lead', deals: 45, percent: 100, color: 'brand' },
  { name: 'Qualificação', deals: 32, percent: 71, color: 'brand' },
  { name: 'Proposta', deals: 18, percent: 40, color: 'brand' },
  { name: 'Negociação', deals: 12, percent: 27, color: 'brand' },
  { name: 'Won', deals: 8, percent: 18, color: 'success' },
]

const CONVERSION_RATES = [71, 56, 67, 67] // Between stages

export function ProcessosVisualization({ color }: ProcessosVisualizationProps) {
  const {
    containerRef,
    svgRef,
    timelineRef,
    isVisible,
    prefersReducedMotion,
    cleanupTimeline,
  } = useVisualizationAnimation({ repeatDelay: 3 })

  const winRateRef = useRef<SVGTextElement>(null)
  const pipelineValueRef = useRef<SVGTextElement>(null)
  const cycleRef = useRef<SVGTextElement>(null)
  const dealsGroupRef = useRef<SVGGElement>(null)

  const initializeAnimation = useCallback(() => {
    if (!svgRef.current || prefersReducedMotion) return

    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 3,
      paused: !isVisible,
      defaults: { ease: PREMIUM_EASINGS.premium },
    })

    timelineRef.current = tl

    // Phase 1: Column backgrounds appear with glassmorphism reveal
    STAGES.forEach((_, i) => {
      tl.fromTo(
        `.column-bg-${i}`,
        { opacity: 0, scaleY: 0 },
        { opacity: 1, scaleY: 1, duration: 0.45, transformOrigin: 'bottom' },
        i * 0.12
      )
    })

    // Phase 2: Stage headers slide in with glow
    STAGES.forEach((_, i) => {
      tl.fromTo(
        `.stage-header-${i}`,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.35 },
        0.4 + i * 0.1
      )
    })

    // Phase 3: Deal dots appear with stagger and pulse (max 4 dots per stage)
    STAGES.forEach((stage, stageIdx) => {
      const dotsCount = Math.min(Math.ceil(stage.deals / 10), 4)
      for (let i = 0; i < dotsCount; i++) {
        tl.fromTo(
          `.deal-dot-${stageIdx}-${i}`,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 0.9,
            duration: 0.3,
            ease: PREMIUM_EASINGS.celebration,
          },
          0.7 + stageIdx * 0.15 + i * 0.06
        )
      }
    })

    // Phase 4: Bars grow up with glow effect
    STAGES.forEach((stage, i) => {
      tl.fromTo(
        `.progress-bar-${i}`,
        { attr: { height: 0 }, y: 200 },
        {
          attr: { height: stage.percent * 1.2 },
          y: 200 - stage.percent * 1.2,
          duration: 0.55,
          ease: 'power2.out',
        },
        1.2 + i * 0.12
      )
    })

    // Phase 5: Conversion arrows draw with label reveal
    CONVERSION_RATES.forEach((_, i) => {
      tl.fromTo(
        `.conversion-arrow-${i}`,
        { strokeDashoffset: 50, opacity: 0 },
        { strokeDashoffset: 0, opacity: 1, duration: 0.45 },
        1.7 + i * 0.12
      )
      tl.fromTo(
        `.conversion-label-${i}`,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.35 },
        1.85 + i * 0.12
      )
    })

    // Phase 6: Deal dots flow animation (some move between stages)
    for (let i = 0; i < 3; i++) {
      // First make flow dot visible and position at start
      tl.set(`.flow-dot-${i}`, {
        opacity: 1,
        attr: { cx: 75, cy: 100 },
      }, 2.2 + i * 0.15)

      // Then animate along path
      tl.to(
        `.flow-dot-${i}`,
        {
          motionPath: {
            path: `#flow-path-0`,
            align: `#flow-path-0`,
            autoRotate: false,
          },
          duration: 0.85,
          ease: 'power1.inOut',
        },
        2.3 + i * 0.15
      )

      // Fade out after reaching destination
      tl.to(`.flow-dot-${i}`, {
        opacity: 0,
        duration: 0.35,
      }, 3.1 + i * 0.15)
    }

    // Phase 7: Win rate ring animates (18% of perimeter 75.4 ≈ 13.6)
    tl.fromTo(
      '.win-rate-ring',
      { strokeDashoffset: 75.4 },
      { strokeDashoffset: 75.4 - 13.6, duration: 1.2, ease: 'power2.out' },
      2.8
    )

    // Counter animations
    animateCounter(tl, winRateRef.current, 0, 18, 1.3, 2.8, (n) => `${Math.round(n)}%`)
    animateCounter(tl, pipelineValueRef.current, 0, 2.1, 1.1, 2.3, (n) => `R$ ${n.toFixed(1)}M`)
    animateCounter(tl, cycleRef.current, 0, 35, 0.9, 3.0, (n) => `-${Math.round(n)}%`)

    // Phase 8: Success pulse on Won column with strong glow
    tl.to(
      '.won-column',
      {
        filter: 'url(#processStrongGlow)',
        duration: 0.35,
        yoyo: true,
        repeat: 2,
      },
      3.8
    )

    // Hold
    tl.to({}, { duration: 2.5 })

    // Reset animations
    tl.to('.deal-dot, .flow-dot', { opacity: 0, scale: 0, duration: 0.3 })
    tl.to('.progress-bar', { attr: { height: 0 }, duration: 0.3 }, '-=0.2')
    tl.to('.conversion-arrow, .conversion-label', { opacity: 0, duration: 0.2 }, '-=0.2')

    return () => {
      tl.kill()
    }
  }, [isVisible, prefersReducedMotion, svgRef, timelineRef])

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        // Show static final state
        if (winRateRef.current) winRateRef.current.textContent = '18%'
        if (pipelineValueRef.current) pipelineValueRef.current.textContent = 'R$ 2.1M'
        if (cycleRef.current) cycleRef.current.textContent = '-35%'
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
        aria-label="Pipeline de Vendas com fluxo animado"
        style={{ willChange: 'transform' }}
      >
        <defs>
          {/* Premium 4-stop gradient for bars */}
          <linearGradient id="processGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="1" />
            <stop offset="35%" stopColor={color} stopOpacity="0.85" />
            <stop offset="70%" stopColor="#7C3AED" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.5" />
          </linearGradient>

          {/* Premium success gradient */}
          <linearGradient id="successBarGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="1" />
            <stop offset="40%" stopColor="#10B981" stopOpacity="0.9" />
            <stop offset="75%" stopColor="#059669" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#047857" stopOpacity="0.6" />
          </linearGradient>

          {/* Glassmorphism column gradient */}
          <linearGradient id="columnGlassGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="white" stopOpacity="0.06" />
            <stop offset="50%" stopColor="white" stopOpacity="0.03" />
            <stop offset="100%" stopColor="white" stopOpacity="0.01" />
          </linearGradient>

          {/* Win rate ring gradient */}
          <linearGradient id="winRateGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#34D399" />
          </linearGradient>

          {/* Deal dot gradient */}
          <radialGradient id="dealDotGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="white" stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </radialGradient>

          {/* Glow filters */}
          <filter id="processGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="processStrongGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="dotGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Noise texture */}
          <filter id="processNoise" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" result="noise" />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.02" />
            </feComponentTransfer>
            <feBlend in="SourceGraphic" mode="overlay" />
          </filter>

          {/* Flow paths between stages */}
          {STAGES.slice(0, -1).map((_, i) => (
            <path
              key={`flow-path-${i}`}
              id={`flow-path-${i}`}
              d={`M ${75 + i * 130} 100 Q ${120 + i * 130} 80 ${155 + i * 130} 100`}
              fill="none"
            />
          ))}

          {/* Arrow marker with gradient */}
          <marker
            id="arrowhead"
            markerWidth="8"
            markerHeight="6"
            refX="7"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 8 3, 0 6" fill={color} fillOpacity="0.6" />
          </marker>
        </defs>

        {/* Background noise texture */}
        <rect x="0" y="0" width="720" height="280" fill="transparent" filter="url(#processNoise)" />

        {/* Header */}
        <text
          x="40"
          y="24"
          fill="white"
          fillOpacity="0.4"
          fontSize="10"
          fontWeight="600"
          letterSpacing="0.15em"
        >
          PIPELINE DE VENDAS
        </text>

        {/* Win Rate badge with premium styling */}
        <g transform="translate(580, 8)">
          <rect
            width="105"
            height="42"
            rx="12"
            fill="#10B981"
            fillOpacity="0.12"
            stroke="#10B981"
            strokeWidth="1"
            strokeOpacity="0.2"
          />
          {/* Ring background */}
          <circle
            cx="26"
            cy="21"
            r="13"
            fill="none"
            stroke="#10B981"
            strokeWidth="3"
            strokeOpacity="0.15"
          />
          {/* Animated ring - r=12, perimeter = 2πr ≈ 75.4 */}
          <circle
            className="win-rate-ring"
            cx="26"
            cy="21"
            r="12"
            fill="none"
            stroke="url(#winRateGradient)"
            strokeWidth="3"
            strokeDasharray="75.4"
            strokeDashoffset="75.4"
            strokeLinecap="round"
            transform="rotate(-90 26 21)"
          />
          <text x="52" y="15" fill="#10B981" fontSize="8" fontWeight="600" letterSpacing="0.05em">
            WIN RATE
          </text>
          <text
            ref={winRateRef}
            x="52"
            y="32"
            fill="white"
            fontSize="15"
            fontWeight="700"
          >
            0%
          </text>
        </g>

        {/* Stage columns */}
        {STAGES.map((stage, i) => {
          const x = 40 + i * 130
          const isWon = i === STAGES.length - 1
          const stageColor = isWon ? '#10B981' : color
          const barHeight = stage.percent * 1.2

          return (
            <g key={i} className={isWon ? 'won-column' : ''}>
              {/* Column background with glassmorphism */}
              <rect
                className={`column-bg-${i}`}
                x={x}
                y="45"
                width="115"
                height="175"
                rx="12"
                fill="url(#columnGlassGradient)"
                stroke="white"
                strokeWidth="1"
                strokeOpacity="0.05"
              />

              {/* Stage header */}
              <g className={`stage-header-${i}`}>
                <rect
                  x={x}
                  y="45"
                  width="115"
                  height="34"
                  rx="12"
                  fill={stageColor}
                  fillOpacity="0.18"
                  stroke={stageColor}
                  strokeWidth="1"
                  strokeOpacity="0.15"
                />
                <text
                  x={x + 57}
                  y="67"
                  textAnchor="middle"
                  fill="white"
                  fontSize="11"
                  fontWeight="600"
                >
                  {stage.name}
                </text>
              </g>

              {/* Deal count badge */}
              <rect
                x={x + 30}
                y="90"
                width="54"
                height="28"
                rx="14"
                fill={stageColor}
                fillOpacity="0.25"
                stroke={stageColor}
                strokeWidth="1"
                strokeOpacity="0.2"
              />
              <text
                x={x + 57}
                y="109"
                textAnchor="middle"
                fill="white"
                fontSize="14"
                fontWeight="700"
              >
                {stage.deals}
              </text>

              {/* Deal dots grid - 2x2 layout on left side with glow */}
              <g ref={i === 0 ? dealsGroupRef : undefined}>
                {Array.from({ length: Math.min(Math.ceil(stage.deals / 10), 4) }).map(
                  (_, dotIdx) => {
                    const row = Math.floor(dotIdx / 2)
                    const col = dotIdx % 2
                    return (
                      <g key={dotIdx}>
                        {/* Outer glow */}
                        <circle
                          className={`deal-dot deal-dot-${i}-${dotIdx}`}
                          cx={x + 20 + col * 20}
                          cy={132 + row * 20}
                          r="8"
                          fill={stageColor}
                          fillOpacity="0.2"
                          opacity="0"
                        />
                        {/* Inner dot */}
                        <circle
                          className={`deal-dot deal-dot-${i}-${dotIdx}`}
                          cx={x + 20 + col * 20}
                          cy={132 + row * 20}
                          r="5"
                          fill={stageColor}
                          filter="url(#dotGlow)"
                          opacity="0"
                        />
                      </g>
                    )
                  }
                )}
              </g>

              {/* Progress bar - positioned on right side, clear of dots */}
              <rect
                className={`progress-bar progress-bar-${i}`}
                x={x + 72}
                y={200}
                width="30"
                height="0"
                rx="6"
                fill={isWon ? 'url(#successBarGradient)' : 'url(#processGradient)'}
                filter="url(#processGlow)"
              />

              {/* Percentage label below bar */}
              <text
                x={x + 87}
                y="228"
                textAnchor="middle"
                fill="white"
                fillOpacity="0.5"
                fontSize="10"
              >
                {stage.percent}%
              </text>

              {/* Conversion arrow to next stage */}
              {i < STAGES.length - 1 && (
                <g>
                  <line
                    className={`conversion-arrow conversion-arrow-${i}`}
                    x1={x + 115}
                    y1="105"
                    x2={x + 130}
                    y2="105"
                    stroke={color}
                    strokeWidth="2"
                    strokeOpacity="0.5"
                    strokeDasharray="15"
                    markerEnd="url(#arrowhead)"
                  />
                  {/* Conversion rate label */}
                  <g className={`conversion-label conversion-label-${i}`}>
                    <rect
                      x={x + 105}
                      y="114"
                      width="36"
                      height="18"
                      rx="9"
                      fill={color}
                      fillOpacity="0.15"
                      stroke={color}
                      strokeWidth="1"
                      strokeOpacity="0.2"
                    />
                    <text
                      x={x + 123}
                      y="126"
                      textAnchor="middle"
                      fill={color}
                      fontSize="9"
                      fontWeight="600"
                    >
                      {CONVERSION_RATES[i]}%
                    </text>
                  </g>
                </g>
              )}
            </g>
          )
        })}

        {/* Flow dots (animated particles) */}
        {[0, 1, 2].map((i) => (
          <circle
            key={i}
            className={`flow-dot flow-dot-${i}`}
            r="5"
            fill={color}
            filter="url(#processStrongGlow)"
            opacity="0"
          />
        ))}

        {/* Summary footer with line */}
        <g transform="translate(40, 248)">
          <rect width="640" height="1" fill="white" fillOpacity="0.08" />
          <text y="20" fill="white" fillOpacity="0.4" fontSize="10">
            Total:{' '}
            <tspan ref={pipelineValueRef} fill="white" fillOpacity="0.9" fontWeight="600">
              R$ 0M
            </tspan>
            {' em pipeline · '}
            <tspan ref={cycleRef} fill="#10B981" fontWeight="600">
              0%
            </tspan>
            {' ciclo de venda'}
          </text>
        </g>
      </svg>
    </div>
  )
}

export default ProcessosVisualization
