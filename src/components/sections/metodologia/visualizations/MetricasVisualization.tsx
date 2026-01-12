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

interface MetricasVisualizationProps {
  color: string
}

// Monthly ROI data
const MONTHS = [
  { label: 'Jan', value: 30 },
  { label: 'Fev', value: 38 },
  { label: 'Mar', value: 45 },
  { label: 'Abr', value: 52 },
  { label: 'Mai', value: 58 },
  { label: 'Jun', value: 65 },
  { label: 'Jul', value: 72 },
  { label: 'Ago', value: 78 },
  { label: 'Set', value: 85 },
  { label: 'Out', value: 88 },
  { label: 'Nov', value: 92 },
  { label: 'Dez', value: 95 },
]

// KPI cards
const KPIS = [
  { label: 'Taxa de Conversão', value: 23.4, unit: '%', trend: '+5.2%', trendUp: true },
  { label: 'Ticket Médio', value: 8.5, unit: 'k', prefix: 'R$ ', trend: '+12%', trendUp: true },
  { label: 'Ciclo de Venda', value: 18, unit: ' dias', trend: '-3 dias', trendUp: true },
  { label: 'Win Rate', value: 31, unit: '%', trend: '+9pp', trendUp: true },
]

// Chart dimensions - balanced layout
// Chart area: 55% of 720 = 396px, KPI area: 38% = 274px, gaps: 7% = 50px
const CHART_LEFT = 30
const CHART_TOP = 55
const CHART_WIDTH = 360
const CHART_HEIGHT = 140

// 12 bars in 360px: (360 - 11*4) / 12 = 26.3px per bar
const BAR_WIDTH = 24
const BAR_GAP = 4.7
const TOTAL_BARS_WIDTH = MONTHS.length * BAR_WIDTH + (MONTHS.length - 1) * BAR_GAP // = 339.7px

export function MetricasVisualization({ color }: MetricasVisualizationProps) {
  const {
    containerRef,
    svgRef,
    timelineRef,
    isVisible,
    prefersReducedMotion,
    cleanupTimeline,
  } = useVisualizationAnimation({ repeatDelay: 3 })

  const roiCounterRef = useRef<SVGTextElement>(null)
  const kpiRefs = useRef<(SVGTextElement | null)[]>([])

  const initializeAnimation = useCallback(() => {
    if (!svgRef.current || prefersReducedMotion) return

    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 3,
      paused: !isVisible,
      defaults: { ease: PREMIUM_EASINGS.premium },
    })

    timelineRef.current = tl

    // Phase 1: Grid lines draw with stagger
    for (let i = 0; i < 5; i++) {
      tl.fromTo(
        `.grid-line-${i}`,
        { attr: { x2: CHART_LEFT } },
        { attr: { x2: CHART_LEFT + CHART_WIDTH }, duration: 0.35 },
        i * 0.1
      )
    }

    // Phase 2: Y-axis labels fade in
    tl.fromTo(
      '.y-axis-label',
      { opacity: 0 },
      { opacity: 1, stagger: 0.06, duration: 0.25 },
      0.3
    )

    // Phase 3: Bars grow up with stagger and glow
    MONTHS.forEach((month, i) => {
      const barHeight = (month.value / 100) * CHART_HEIGHT
      const barY = CHART_TOP + CHART_HEIGHT - barHeight

      tl.fromTo(
        `.chart-bar-${i}`,
        { attr: { height: 0, y: CHART_TOP + CHART_HEIGHT } },
        {
          attr: { height: barHeight, y: barY },
          duration: 0.4,
          ease: 'power2.out',
        },
        0.5 + i * 0.07
      )

      // Month labels appear
      tl.fromTo(
        `.month-label-${i}`,
        { opacity: 0, y: 5 },
        { opacity: 1, y: 0, duration: 0.2 },
        0.7 + i * 0.06
      )
    })

    // Phase 4: Shimmer effect across all bars
    tl.fromTo(
      '.shimmer-overlay',
      { attr: { x: -100 } },
      {
        attr: { x: CHART_WIDTH + 50 },
        duration: 2,
        ease: 'power1.inOut',
      },
      1.8
    )

    // Phase 5: ROI badge appears with celebration
    tl.fromTo(
      '.roi-badge',
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.35, ease: PREMIUM_EASINGS.celebration },
      2.2
    )

    // ROI counter animation
    animateCounter(tl, roiCounterRef.current, 0, 8, 1.2, 2.3, (n) => `${n.toFixed(1)}x`)

    // ROI badge glow pulse
    tl.to(
      '.roi-badge',
      {
        filter: 'url(#metricasStrongGlow)',
        scale: 1.08,
        duration: 0.3,
        yoyo: true,
        repeat: 2,
      },
      3.0
    )

    // Phase 6: KPI cards flip in with glassmorphism reveal
    KPIS.forEach((kpi, i) => {
      // Card appears
      tl.fromTo(
        `.kpi-card-${i}`,
        { rotationY: -90, opacity: 0, transformOrigin: 'left center' },
        { rotationY: 0, opacity: 1, duration: 0.5 },
        3.5 + i * 0.15
      )

      // Counter for each KPI
      const ref = kpiRefs.current[i]
      if (ref) {
        const formatter = (n: number) => {
          if (kpi.prefix) return `${kpi.prefix}${n.toFixed(1)}${kpi.unit}`
          return `${n.toFixed(kpi.unit === '%' ? 1 : 0)}${kpi.unit}`
        }
        animateCounter(tl, ref, 0, kpi.value, 0.9, 3.7 + i * 0.15, formatter)
      }
    })

    // Phase 7: Trend badges appear with bounce
    KPIS.forEach((_, i) => {
      tl.fromTo(
        `.trend-badge-${i}`,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.25, ease: PREMIUM_EASINGS.celebration },
        4.2 + i * 0.1
      )
    })

    // Phase 8: Summary line appears
    tl.fromTo(
      '.summary-line',
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.3 },
      4.8
    )

    // Hold
    tl.to({}, { duration: 2.5 })

    // Reset
    MONTHS.forEach((_, i) => {
      tl.set(`.chart-bar-${i}`, { attr: { height: 0, y: CHART_TOP + CHART_HEIGHT } })
      tl.set(`.month-label-${i}`, { opacity: 0 })
    })
    tl.set('.grid-line', { attr: { x2: CHART_LEFT } })
    tl.set('.y-axis-label', { opacity: 0 })
    tl.set('.roi-badge', { scale: 0, opacity: 0, filter: 'none' })
    tl.set(roiCounterRef.current, { textContent: '0x' })
    tl.set('.shimmer-overlay', { attr: { x: -100 } })
    tl.set('.summary-line', { opacity: 0 })
    KPIS.forEach((_, i) => {
      tl.set(`.kpi-card-${i}`, { rotationY: -90, opacity: 0 })
      tl.set(`.trend-badge-${i}`, { scale: 0, opacity: 0 })
      if (kpiRefs.current[i]) {
        tl.set(kpiRefs.current[i], { textContent: '0' })
      }
    })

    return () => {
      tl.kill()
    }
  }, [isVisible, prefersReducedMotion, svgRef, timelineRef])

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        if (roiCounterRef.current) roiCounterRef.current.textContent = '8x'
        KPIS.forEach((kpi, i) => {
          const ref = kpiRefs.current[i]
          if (ref) {
            if (kpi.prefix) ref.textContent = `${kpi.prefix}${kpi.value}${kpi.unit}`
            else ref.textContent = `${kpi.value}${kpi.unit}`
          }
        })
        return
      }

      return initializeAnimation()
    },
    { scope: containerRef, dependencies: [isVisible, initializeAnimation] }
  )

  useEffect(() => {
    return () => cleanupTimeline()
  }, [cleanupTimeline])

  const setKpiRef = (index: number) => (el: SVGTextElement | null) => {
    kpiRefs.current[index] = el
  }

  // Calculate bar starting X to center bars in chart area
  const barsStartX = CHART_LEFT + (CHART_WIDTH - TOTAL_BARS_WIDTH) / 2

  return (
    <div ref={containerRef} className="w-full">
      <svg
        ref={svgRef}
        viewBox="0 0 720 280"
        className="w-full h-auto"
        aria-label="Dashboard de métricas com gráfico de barras e KPIs"
        style={{ willChange: 'transform' }}
      >
        <defs>
          {/* Premium multi-stop bar gradient */}
          <linearGradient id="barGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="1" />
            <stop offset="40%" stopColor={color} stopOpacity="0.85" />
            <stop offset="80%" stopColor="#7C3AED" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.5" />
          </linearGradient>

          {/* Success gradient for high-performing months */}
          <linearGradient id="barGradientSuccess" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="1" />
            <stop offset="40%" stopColor="#10B981" stopOpacity="0.9" />
            <stop offset="80%" stopColor="#059669" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#047857" stopOpacity="0.6" />
          </linearGradient>

          {/* Shimmer gradient for effect */}
          <linearGradient id="shimmerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="50%" stopColor="white" stopOpacity="0.15" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>

          {/* Glassmorphism gradient for KPI cards */}
          <linearGradient id="glassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="white" stopOpacity="0.08" />
            <stop offset="50%" stopColor="white" stopOpacity="0.04" />
            <stop offset="100%" stopColor="white" stopOpacity="0.02" />
          </linearGradient>

          {/* ROI badge gradient */}
          <linearGradient id="roiBadgeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#059669" stopOpacity="0.15" />
          </linearGradient>

          {/* Glow filters */}
          <filter id="metricasGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="metricasStrongGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Glass blur filter for KPI cards */}
          <filter id="glassBlur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="glow"
            />
            <feComposite in="SourceGraphic" in2="glow" operator="over" />
          </filter>

          {/* Noise texture */}
          <filter id="metricasNoise" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" result="noise" />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.02" />
            </feComponentTransfer>
            <feBlend in="SourceGraphic" mode="overlay" />
          </filter>

          {/* Clip path for shimmer */}
          <clipPath id="chartClip">
            <rect x={CHART_LEFT} y={CHART_TOP} width={CHART_WIDTH} height={CHART_HEIGHT + 20} />
          </clipPath>
        </defs>

        {/* Background noise texture */}
        <rect x="0" y="0" width="720" height="280" fill="transparent" filter="url(#metricasNoise)" />

        {/* Chart header */}
        <text
          x={CHART_LEFT}
          y="28"
          fill="white"
          fillOpacity="0.4"
          fontSize="10"
          fontWeight="600"
          letterSpacing="0.15em"
        >
          EVOLUÇÃO DO ROI (12 MESES)
        </text>

        {/* ROI Badge - positioned after header */}
        <g className="roi-badge" transform={`translate(${CHART_LEFT + 200}, 12)`} opacity="0">
          <rect
            width="85"
            height="30"
            rx="15"
            fill="url(#roiBadgeGradient)"
            stroke="#10B981"
            strokeWidth="1"
            strokeOpacity="0.4"
          />
          <text
            x="15"
            y="20"
            fill="#10B981"
            fontSize="10"
            fontWeight="600"
          >
            ROI
          </text>
          <text
            ref={roiCounterRef}
            x="70"
            y="20"
            textAnchor="end"
            fill="white"
            fontSize="16"
            fontWeight="700"
          >
            0x
          </text>
        </g>

        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((value, i) => {
          const y = CHART_TOP + CHART_HEIGHT - (value / 100) * CHART_HEIGHT
          return (
            <g key={i}>
              <line
                className={`grid-line grid-line-${i}`}
                x1={CHART_LEFT}
                y1={y}
                x2={CHART_LEFT}
                y2={y}
                stroke="white"
                strokeWidth="1"
                strokeOpacity={value === 100 ? 0.15 : 0.08}
                strokeDasharray={value === 100 ? '0' : '4 4'}
              />
              <text
                className="y-axis-label"
                x={CHART_LEFT - 10}
                y={y + 3}
                textAnchor="end"
                fill="white"
                fillOpacity="0.35"
                fontSize="9"
                opacity="0"
              >
                {value}%
              </text>
            </g>
          )
        })}

        {/* Chart bars */}
        <g clipPath="url(#chartClip)">
          {MONTHS.map((month, i) => {
            const x = barsStartX + i * (BAR_WIDTH + BAR_GAP)
            const isLast = i >= 9 // Last 3 months are success colored

            return (
              <g key={i}>
                <rect
                  className={`chart-bar chart-bar-${i}`}
                  x={x}
                  y={CHART_TOP + CHART_HEIGHT}
                  width={BAR_WIDTH}
                  height="0"
                  rx="4"
                  fill={isLast ? 'url(#barGradientSuccess)' : 'url(#barGradient)'}
                  filter="url(#metricasGlow)"
                />
              </g>
            )
          })}

          {/* Shimmer overlay */}
          <rect
            className="shimmer-overlay"
            x="-100"
            y={CHART_TOP}
            width="80"
            height={CHART_HEIGHT}
            fill="url(#shimmerGradient)"
          />
        </g>

        {/* Month labels */}
        {MONTHS.map((month, i) => {
          const x = barsStartX + i * (BAR_WIDTH + BAR_GAP) + BAR_WIDTH / 2
          return (
            <text
              key={i}
              className={`month-label month-label-${i}`}
              x={x}
              y={CHART_TOP + CHART_HEIGHT + 18}
              textAnchor="middle"
              fill="white"
              fillOpacity="0.45"
              fontSize="8"
              opacity="0"
            >
              {month.label}
            </text>
          )
        })}

        {/* KPI Cards - 2x2 grid layout for better balance */}
        <g transform="translate(420, 30)">
          <text
            fill="white"
            fillOpacity="0.4"
            fontSize="10"
            fontWeight="600"
            letterSpacing="0.12em"
          >
            KPIs PRINCIPAIS
          </text>

          {KPIS.map((kpi, i) => {
            const col = i % 2
            const row = Math.floor(i / 2)
            const x = col * 145
            const y = 22 + row * 90
            return (
              <g
                key={i}
                className={`kpi-card-${i}`}
                transform={`translate(${x}, ${y})`}
                opacity="0"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Glassmorphism card background */}
                <rect
                  width="138"
                  height="78"
                  rx="12"
                  fill="url(#glassGradient)"
                  stroke="white"
                  strokeWidth="1"
                  strokeOpacity="0.1"
                />

                {/* Left accent line */}
                <rect
                  x="0"
                  y="12"
                  width="3"
                  height="54"
                  rx="1.5"
                  fill={kpi.trendUp ? '#10B981' : '#EF4444'}
                  fillOpacity="0.6"
                />

                {/* Label */}
                <text
                  x="14"
                  y="24"
                  fill="white"
                  fillOpacity="0.55"
                  fontSize="9"
                  fontWeight="500"
                >
                  {kpi.label}
                </text>

                {/* Value */}
                <text
                  ref={setKpiRef(i)}
                  x="14"
                  y="48"
                  fill="white"
                  fontSize="18"
                  fontWeight="700"
                >
                  0
                </text>

                {/* Trend badge */}
                <g className={`trend-badge-${i}`} transform="translate(14, 56)" opacity="0">
                  <rect
                    width="60"
                    height="18"
                    rx="9"
                    fill={kpi.trendUp ? '#10B981' : '#EF4444'}
                    fillOpacity="0.15"
                    stroke={kpi.trendUp ? '#10B981' : '#EF4444'}
                    strokeWidth="1"
                    strokeOpacity="0.3"
                  />
                  <text
                    x="30"
                    y="13"
                    textAnchor="middle"
                    fill={kpi.trendUp ? '#10B981' : '#EF4444'}
                    fontSize="9"
                    fontWeight="600"
                  >
                    {kpi.trendUp ? '↑' : '↓'} {kpi.trend}
                  </text>
                </g>
              </g>
            )
          })}
        </g>

        {/* Summary line */}
        <g className="summary-line" transform="translate(30, 258)" opacity="0">
          <rect
            width="660"
            height="1"
            fill="white"
            fillOpacity="0.1"
          />
          <text
            y="16"
            fill="white"
            fillOpacity="0.4"
            fontSize="10"
          >
            Métricas consolidadas · Baseline documentado · Metas claras · Tracking contínuo
          </text>
        </g>
      </svg>
    </div>
  )
}

export default MetricasVisualization
