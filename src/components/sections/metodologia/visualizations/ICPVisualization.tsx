'use client'

import { useRef, useCallback, useEffect, useMemo } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import {
  useVisualizationAnimation,
  animateCounter,
  createRipple,
  PREMIUM_EASINGS,
} from '@/hooks/useVisualizationAnimation'

gsap.registerPlugin(useGSAP)

interface ICPVisualizationProps {
  color: string
}

// Radar criteria - 6 axes
const CRITERIA = [
  { label: 'Budget', value: 85, angle: 0 },
  { label: 'Autoridade', value: 75, angle: 60 },
  { label: 'Necessidade', value: 95, angle: 120 },
  { label: 'Timeline', value: 90, angle: 180 },
  { label: 'Fit', value: 80, angle: 240 },
  { label: 'Tamanho', value: 70, angle: 300 },
]

// Tier distribution
const TIERS = [
  { name: 'TIER A', leads: 127, percent: 40, color: '#10B981' },
  { name: 'TIER B', leads: 284, percent: 60, color: '#F59E0B' },
  { name: 'TIER C', leads: 412, percent: 75, color: '#EF4444' },
]

// Increased radar dimensions for more impact
const RADAR_CENTER_X = 200
const RADAR_CENTER_Y = 140
const RADAR_RADIUS = 100 // Increased from 80

export function ICPVisualization({ color }: ICPVisualizationProps) {
  const {
    containerRef,
    svgRef,
    timelineRef,
    isVisible,
    prefersReducedMotion,
    cleanupTimeline,
  } = useVisualizationAnimation({ repeatDelay: 3 })

  const scoreCounterRef = useRef<SVGTextElement>(null)
  const rippleGroupRef = useRef<SVGGElement>(null)
  const scanLineRef = useRef<SVGLineElement>(null)

  // Calculate radar points with larger radius
  const radarPoints = useMemo(() => {
    return CRITERIA.map((criterion) => {
      const angleRad = (criterion.angle - 90) * (Math.PI / 180)
      const distance = (criterion.value / 100) * RADAR_RADIUS
      return {
        x: RADAR_CENTER_X + Math.cos(angleRad) * distance,
        y: RADAR_CENTER_Y + Math.sin(angleRad) * distance,
        // Adjusted label positions for better spacing
        labelX: RADAR_CENTER_X + Math.cos(angleRad) * (RADAR_RADIUS + 20),
        labelY: RADAR_CENTER_Y + Math.sin(angleRad) * (RADAR_RADIUS + 18),
        axisEndX: RADAR_CENTER_X + Math.cos(angleRad) * RADAR_RADIUS,
        axisEndY: RADAR_CENTER_Y + Math.sin(angleRad) * RADAR_RADIUS,
        ...criterion,
      }
    })
  }, [])

  // Generate polygon points string
  const polygonPoints = radarPoints.map((p) => `${p.x},${p.y}`).join(' ')
  const centerPoints = radarPoints
    .map(() => `${RADAR_CENTER_X},${RADAR_CENTER_Y}`)
    .join(' ')

  const initializeAnimation = useCallback(() => {
    if (!svgRef.current || prefersReducedMotion) return

    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 3,
      paused: !isVisible,
      defaults: { ease: PREMIUM_EASINGS.premium },
    })

    timelineRef.current = tl

    // Phase 0: Start scan line rotation
    if (scanLineRef.current) {
      gsap.set(scanLineRef.current.parentElement, { rotation: -90, transformOrigin: `${RADAR_CENTER_X}px ${RADAR_CENTER_Y}px` })
      tl.to(
        scanLineRef.current.parentElement,
        {
          rotation: 270,
          duration: 4,
          ease: 'none',
        },
        0
      )
      tl.fromTo(
        scanLineRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 },
        0
      )
      tl.to(
        scanLineRef.current,
        { opacity: 0, duration: 0.5 },
        3.5
      )
    }

    // Phase 1: Radar grid circles draw with pulsing rings
    const gridPercents = [33, 66, 100]
    gridPercents.forEach((percent, i) => {
      const radius = (percent / 100) * RADAR_RADIUS
      tl.fromTo(
        `.radar-circle-${i}`,
        { attr: { r: 0 }, opacity: 0 },
        { attr: { r: radius }, opacity: 1, duration: 0.5 },
        0.2 + i * 0.2
      )
    })

    // Add pulsing effect to outer ring
    tl.to(
      '.radar-circle-2',
      {
        scale: 1.05,
        opacity: 0.2,
        duration: 1,
        yoyo: true,
        repeat: 3,
        ease: 'sine.inOut',
        transformOrigin: `${RADAR_CENTER_X}px ${RADAR_CENTER_Y}px`,
      },
      0.8
    )

    // Phase 2: Axis lines draw with glow
    radarPoints.forEach((point, i) => {
      tl.fromTo(
        `.radar-axis-${i}`,
        { attr: { x2: RADAR_CENTER_X, y2: RADAR_CENTER_Y }, opacity: 0 },
        { attr: { x2: point.axisEndX, y2: point.axisEndY }, opacity: 1, duration: 0.4 },
        0.8 + i * 0.1
      )
    })

    // Phase 3: Labels appear with scale
    radarPoints.forEach((_, i) => {
      tl.fromTo(
        `.radar-label-${i}`,
        { opacity: 0, scale: 0.7 },
        { opacity: 1, scale: 1, duration: 0.25 },
        1.4 + i * 0.06
      )
    })

    // Phase 4: Polygon morphs from center to data shape
    tl.fromTo(
      '.radar-polygon',
      { attr: { points: centerPoints }, opacity: 0 },
      {
        attr: { points: polygonPoints },
        opacity: 1,
        duration: 1.2,
        ease: 'power2.out',
      },
      1.8
    )

    // Polygon glow pulse
    tl.to(
      '.radar-polygon',
      {
        filter: 'url(#icpStrongGlow)',
        duration: 0.4,
        yoyo: true,
        repeat: 1,
      },
      3.0
    )

    // Phase 5: Data points appear with ripple effect
    radarPoints.forEach((point, i) => {
      tl.fromTo(
        `.data-point-${i}`,
        { scale: 0, opacity: 0, transformOrigin: 'center' },
        {
          scale: 1,
          opacity: 1,
          duration: 0.3,
          ease: PREMIUM_EASINGS.celebration,
          onComplete: () => {
            if (rippleGroupRef.current) {
              createRipple(rippleGroupRef.current, point.x, point.y, color, 8, 24)
            }
          },
        },
        2.8 + i * 0.12
      )

      // Show score labels
      tl.fromTo(
        `.score-label-${i}`,
        { opacity: 0, y: 5 },
        { opacity: 1, y: 0, duration: 0.25 },
        3.0 + i * 0.1
      )
    })

    // Phase 6: Center score counter
    animateCounter(tl, scoreCounterRef.current, 0, 86, 1.5, 3.2, (n) => String(Math.round(n)))

    // Phase 7: Center glow pulse celebration
    tl.to(
      '.center-score-bg',
      {
        scale: 1.2,
        opacity: 1,
        duration: 0.35,
        yoyo: true,
        repeat: 2,
        ease: PREMIUM_EASINGS.celebration,
      },
      4.0
    )

    // Phase 8: Tier bars animate with glow
    TIERS.forEach((tier, i) => {
      tl.fromTo(
        `.tier-bar-${i}`,
        { attr: { width: 0 } },
        {
          attr: { width: tier.percent * 1.6 },
          duration: 0.7,
          ease: 'power2.out',
        },
        4.5 + i * 0.18
      )
      tl.fromTo(
        `.tier-count-${i}`,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.35 },
        4.7 + i * 0.15
      )
      // Badge glow
      tl.to(
        `.tier-badge-${i}`,
        {
          filter: 'url(#tierGlow)',
          duration: 0.3,
          yoyo: true,
          repeat: 1,
        },
        5.0 + i * 0.12
      )
    })

    // Hold
    tl.to({}, { duration: 2.5 })

    // Reset
    tl.to('.radar-polygon', { attr: { points: centerPoints }, opacity: 0, duration: 0.4 })
    tl.to('.data-point, .score-label, .tier-bar-fill, .tier-count', {
      opacity: 0,
      duration: 0.3,
    }, '-=0.3')
    tl.to('.radar-circle, .radar-axis, .radar-label', { opacity: 0, duration: 0.3 }, '-=0.2')
    tl.set(scoreCounterRef.current, { textContent: '0' })
    tl.set('.center-score-bg', { scale: 1 })
    TIERS.forEach((_, i) => {
      tl.set(`.tier-bar-${i}`, { attr: { width: 0 } })
    })

    return () => {
      tl.kill()
    }
  }, [isVisible, prefersReducedMotion, svgRef, timelineRef, radarPoints, polygonPoints, centerPoints, color])

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        if (scoreCounterRef.current) scoreCounterRef.current.textContent = '86'
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
        aria-label="ICP Radar Chart com distribuição de tiers"
        style={{ willChange: 'transform' }}
      >
        <defs>
          {/* Premium 4-stop gradient for polygon fill */}
          <linearGradient id="icpGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.5" />
            <stop offset="35%" stopColor={color} stopOpacity="0.35" />
            <stop offset="70%" stopColor="#7C3AED" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.15" />
          </linearGradient>

          {/* Radial gradient for center */}
          <radialGradient id="centerGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="60%" stopColor={color} stopOpacity="0.15" />
            <stop offset="100%" stopColor={color} stopOpacity="0.05" />
          </radialGradient>

          {/* Scan line gradient */}
          <linearGradient id="scanGradient" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor={color} stopOpacity="0" />
            <stop offset="50%" stopColor={color} stopOpacity="0.6" />
            <stop offset="100%" stopColor={color} stopOpacity="0.9" />
          </linearGradient>

          {/* Tier bar gradients */}
          <linearGradient id="tierAGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#34D399" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="tierBGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#FBBF24" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="tierCGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#EF4444" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#F87171" stopOpacity="0.7" />
          </linearGradient>

          {/* Glow filters */}
          <filter id="icpGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="icpStrongGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="scoreBgGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="tierGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Noise texture for premium feel */}
          <filter id="icpNoise" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" result="noise" />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.025" />
            </feComponentTransfer>
            <feBlend in="SourceGraphic" mode="overlay" />
          </filter>
        </defs>

        {/* Background with subtle noise */}
        <rect
          x="0"
          y="0"
          width="720"
          height="280"
          fill="transparent"
          filter="url(#icpNoise)"
        />

        {/* RADAR CHART */}
        <g transform="translate(0, 0)">
          {/* Outer glow ring */}
          <circle
            cx={RADAR_CENTER_X}
            cy={RADAR_CENTER_Y}
            r={RADAR_RADIUS + 5}
            fill="none"
            stroke={color}
            strokeWidth="1"
            strokeOpacity="0.1"
          />

          {/* Grid circles - concentric rings */}
          {[33, 66, 100].map((percent, i) => (
            <circle
              key={i}
              className={`radar-circle radar-circle-${i}`}
              cx={RADAR_CENTER_X}
              cy={RADAR_CENTER_Y}
              r="0"
              fill="none"
              stroke="white"
              strokeWidth={i === 2 ? '1.5' : '1'}
              strokeOpacity={0.08 + i * 0.04}
              strokeDasharray={i === 2 ? '0' : '4 4'}
              opacity="0"
              style={{ transformOrigin: `${RADAR_CENTER_X}px ${RADAR_CENTER_Y}px` }}
            />
          ))}

          {/* Scan line for radar effect */}
          <g style={{ transformOrigin: `${RADAR_CENTER_X}px ${RADAR_CENTER_Y}px` }}>
            <line
              ref={scanLineRef}
              x1={RADAR_CENTER_X}
              y1={RADAR_CENTER_Y}
              x2={RADAR_CENTER_X + RADAR_RADIUS}
              y2={RADAR_CENTER_Y}
              stroke="url(#scanGradient)"
              strokeWidth="2"
              opacity="0"
            />
          </g>

          {/* Axis lines */}
          {radarPoints.map((point, i) => (
            <line
              key={i}
              className={`radar-axis radar-axis-${i}`}
              x1={RADAR_CENTER_X}
              y1={RADAR_CENTER_Y}
              x2={RADAR_CENTER_X}
              y2={RADAR_CENTER_Y}
              stroke="white"
              strokeWidth="1"
              strokeOpacity="0.2"
              opacity="0"
            />
          ))}

          {/* Data polygon with premium gradient */}
          <polygon
            className="radar-polygon"
            points={centerPoints}
            fill="url(#icpGradient)"
            stroke={color}
            strokeWidth="2"
            strokeOpacity="0.9"
            filter="url(#icpGlow)"
            opacity="0"
          />

          {/* Data points with double circles */}
          {radarPoints.map((point, i) => (
            <g key={i}>
              {/* Outer glow circle */}
              <circle
                className={`data-point data-point-${i}`}
                cx={point.x}
                cy={point.y}
                r="8"
                fill={color}
                fillOpacity="0.3"
                opacity="0"
              />
              {/* Main colored circle */}
              <circle
                className={`data-point data-point-${i}`}
                cx={point.x}
                cy={point.y}
                r="5"
                fill={color}
                opacity="0"
                filter="url(#icpGlow)"
              />
              {/* Inner white dot */}
              <circle
                className={`data-point data-point-${i}`}
                cx={point.x}
                cy={point.y}
                r="2"
                fill="white"
                opacity="0"
              />
            </g>
          ))}

          {/* Labels with better positioning */}
          {radarPoints.map((point, i) => {
            // Adjust text anchor based on position
            const isLeft = point.angle > 90 && point.angle < 270
            const isTop = point.angle < 180
            const textAnchor = point.angle === 0 || point.angle === 180 ? 'middle' : isLeft ? 'end' : 'start'
            const adjustedX = point.labelX + (isLeft ? -5 : point.angle === 0 || point.angle === 180 ? 0 : 5)

            return (
              <g key={`label-${i}`} className={`radar-label radar-label-${i}`} opacity="0">
                <text
                  x={adjustedX}
                  y={point.labelY}
                  textAnchor={textAnchor}
                  dominantBaseline={isTop && point.angle !== 0 ? 'auto' : 'middle'}
                  fill="white"
                  fillOpacity="0.7"
                  fontSize="10"
                  fontWeight="500"
                >
                  {point.label}
                </text>
                <text
                  className={`score-label score-label-${i}`}
                  x={adjustedX}
                  y={point.labelY + (isTop && point.angle !== 0 ? 13 : 12)}
                  textAnchor={textAnchor}
                  fill={color}
                  fontSize="11"
                  fontWeight="700"
                  opacity="0"
                >
                  {point.value}%
                </text>
              </g>
            )
          })}

          {/* Center score with enhanced visuals */}
          <g transform={`translate(${RADAR_CENTER_X}, ${RADAR_CENTER_Y})`}>
            {/* Outer glow pulse ring */}
            <circle
              className="center-score-bg"
              r="35"
              fill="url(#centerGradient)"
              filter="url(#scoreBgGlow)"
              style={{ transformOrigin: 'center' }}
            />
            {/* Main background */}
            <circle r="28" fill="rgba(10, 37, 64, 0.95)" />
            {/* Border ring */}
            <circle
              r="28"
              fill="none"
              stroke={color}
              strokeWidth="2"
              strokeOpacity="0.8"
            />
            {/* Score number */}
            <text
              ref={scoreCounterRef}
              textAnchor="middle"
              dominantBaseline="middle"
              y="0"
              fill="white"
              fontSize="24"
              fontWeight="700"
            >
              0
            </text>
            {/* Score label */}
            <text
              textAnchor="middle"
              y="18"
              fill="white"
              fillOpacity="0.5"
              fontSize="8"
              fontWeight="600"
              letterSpacing="0.1em"
            >
              SCORE
            </text>
          </g>
        </g>

        {/* Ripple effects group */}
        <g ref={rippleGroupRef} />

        {/* TIER DISTRIBUTION - moved right for better spacing */}
        <g transform="translate(420, 35)">
          <text
            fill="white"
            fillOpacity="0.4"
            fontSize="10"
            fontWeight="600"
            letterSpacing="0.15em"
          >
            DISTRIBUIÇÃO DE LEADS
          </text>

          {TIERS.map((tier, i) => (
            <g key={i} transform={`translate(0, ${35 + i * 60})`}>
              {/* Tier badge with gradient */}
              <rect
                className={`tier-badge-${i}`}
                width="55"
                height="22"
                rx="11"
                fill={tier.color}
                fillOpacity="0.2"
                stroke={tier.color}
                strokeWidth="1"
                strokeOpacity="0.3"
              />
              <text
                x="27"
                y="15"
                textAnchor="middle"
                fill={tier.color}
                fontSize="10"
                fontWeight="700"
              >
                {tier.name}
              </text>

              {/* Lead count */}
              <text
                className={`tier-count tier-count-${i}`}
                x="75"
                y="15"
                fill="white"
                fontSize="18"
                fontWeight="700"
                opacity="0"
              >
                {tier.leads}
              </text>
              <text
                x="125"
                y="15"
                fill="white"
                fillOpacity="0.4"
                fontSize="10"
              >
                leads
              </text>

              {/* Progress bar with gradient */}
              <rect
                y="30"
                width="160"
                height="10"
                rx="5"
                fill="white"
                fillOpacity="0.08"
              />
              <rect
                className={`tier-bar-fill tier-bar-${i}`}
                y="30"
                width="0"
                height="10"
                rx="5"
                fill={`url(#tier${['A', 'B', 'C'][i]}Gradient)`}
              />

              {/* Percentage */}
              <text
                x="175"
                y="39"
                fill="white"
                fillOpacity="0.6"
                fontSize="10"
                fontWeight="500"
              >
                {tier.percent}%
              </text>
            </g>
          ))}
        </g>

        {/* Summary with better styling */}
        <g transform="translate(420, 232)">
          <rect
            width="260"
            height="36"
            rx="18"
            fill={color}
            fillOpacity="0.08"
            stroke={color}
            strokeWidth="1"
            strokeOpacity="0.15"
          />
          <text
            x="18"
            y="23"
            fill="white"
            fillOpacity="0.6"
            fontSize="10"
          >
            ICP Score médio:{' '}
            <tspan fill="white" fontWeight="700" fillOpacity="1">
              86
            </tspan>
            {' · Tier A: '}
            <tspan fill="#10B981" fontWeight="700">
              40%
            </tspan>
            {' do pipeline'}
          </text>
        </g>
      </svg>
    </div>
  )
}

export default ICPVisualization
