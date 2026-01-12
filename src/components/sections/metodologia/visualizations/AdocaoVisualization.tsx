'use client'

import { useRef, useCallback, useEffect } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import {
  useVisualizationAnimation,
  spawnConfetti,
  PREMIUM_EASINGS,
} from '@/hooks/useVisualizationAnimation'

gsap.registerPlugin(useGSAP)

interface AdocaoVisualizationProps {
  color: string
}

// Team data
const TEAMS = [
  { name: 'Vendedores', members: 8, certified: 8, color: '#635BFF' },
  { name: 'SDRs', members: 4, certified: 4, color: '#10B981' },
  { name: 'CS', members: 3, certified: 3, color: '#F59E0B' },
  { name: 'Gestores', members: 2, certified: 2, color: '#EC4899' },
]

// Timeline phases
const PHASES = [
  { name: 'Onboarding', weeks: '1-2', status: 'complete' },
  { name: 'Prática', weeks: '3-4', status: 'complete' },
  { name: 'Certificação', weeks: '5-6', status: 'complete' },
  { name: 'Uso Real', weeks: '7+', status: 'current' },
]

const TOTAL_MEMBERS = TEAMS.reduce((acc, team) => acc + team.members, 0)

export function AdocaoVisualization({ color }: AdocaoVisualizationProps) {
  const {
    containerRef,
    svgRef,
    timelineRef,
    isVisible,
    prefersReducedMotion,
    cleanupTimeline,
  } = useVisualizationAnimation({ repeatDelay: 4 })

  const confettiGroupRef = useRef<SVGGElement>(null)
  const totalCounterRef = useRef<SVGTextElement>(null)

  const initializeAnimation = useCallback(() => {
    if (!svgRef.current || prefersReducedMotion) return

    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 4,
      paused: !isVisible,
      defaults: { ease: PREMIUM_EASINGS.premium },
    })

    timelineRef.current = tl

    // Phase 1: Team rows appear with slide
    TEAMS.forEach((_, teamIdx) => {
      tl.fromTo(
        `.team-row-${teamIdx}`,
        { opacity: 0, x: -25 },
        { opacity: 1, x: 0, duration: 0.35 },
        teamIdx * 0.18
      )
    })

    // Phase 2: Member dots illuminate one by one with glow
    let globalDelay = 1.0
    TEAMS.forEach((team, teamIdx) => {
      for (let memberIdx = 0; memberIdx < team.members; memberIdx++) {
        const dotSelector = `.member-dot-${teamIdx}-${memberIdx}`

        // Start gray
        tl.set(dotSelector, { fill: 'white', fillOpacity: 0.15 }, 0)

        // Illuminate with team color and scale
        tl.to(
          dotSelector,
          {
            fill: team.color,
            fillOpacity: 1,
            scale: 1.1,
            duration: 0.22,
            ease: PREMIUM_EASINGS.celebration,
          },
          globalDelay
        )

        // Add glow and settle
        tl.to(
          dotSelector,
          {
            filter: 'url(#adocaoGlow)',
            scale: 1,
            duration: 0.12,
          },
          globalDelay + 0.12
        )

        globalDelay += 0.09
      }

      // Team completion checkmark
      tl.fromTo(
        `.team-check-${teamIdx}`,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.25, ease: PREMIUM_EASINGS.celebration },
        globalDelay
      )

      // Mini confetti for team completion
      if (confettiGroupRef.current) {
        const confettiX = 310
        const confettiY = 52 + teamIdx * 46
        tl.call(
          () => {
            if (confettiGroupRef.current) {
              spawnConfetti(confettiGroupRef.current, confettiX, confettiY, 10, [team.color])
            }
          },
          [],
          globalDelay + 0.12
        )
      }

      // 100% badge appears
      tl.fromTo(
        `.percent-badge-${teamIdx}`,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.22 },
        globalDelay + 0.18
      )

      globalDelay += 0.22
    })

    // Phase 3: Timeline progression
    PHASES.forEach((phase, i) => {
      const isComplete = phase.status === 'complete'
      const isCurrent = phase.status === 'current'

      tl.fromTo(
        `.phase-node-${i}`,
        { scale: 0 },
        { scale: 1, duration: 0.28, ease: PREMIUM_EASINGS.celebration },
        globalDelay + i * 0.22
      )

      if (isComplete) {
        tl.to(
          `.phase-node-${i}`,
          { fill: '#10B981', duration: 0.18 },
          globalDelay + i * 0.22 + 0.18
        )
        tl.fromTo(
          `.phase-check-${i}`,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.18 },
          globalDelay + i * 0.22 + 0.22
        )
      }

      if (isCurrent) {
        // Pulsing effect for current phase
        tl.to(
          `.phase-node-${i}`,
          {
            scale: 1.25,
            filter: 'url(#adocaoGlow)',
            duration: 0.35,
            yoyo: true,
            repeat: 2,
          },
          globalDelay + i * 0.22 + 0.18
        )
      }

      // Progress line
      if (i < PHASES.length - 1) {
        tl.fromTo(
          `.phase-line-${i}`,
          { scaleY: 0, transformOrigin: 'top' },
          { scaleY: 1, duration: 0.22 },
          globalDelay + i * 0.22 + 0.32
        )
      }
    })

    // Phase 4: Total counter
    const counterDelay = globalDelay + PHASES.length * 0.22 + 0.6
    tl.fromTo(
      '.total-badge',
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.35 },
      counterDelay
    )

    // Animate counter
    tl.to(
      { val: 0 },
      {
        val: TOTAL_MEMBERS,
        duration: 0.9,
        ease: 'power2.out',
        onUpdate: function () {
          if (totalCounterRef.current) {
            totalCounterRef.current.textContent = `${Math.round(this.targets()[0].val)}/${TOTAL_MEMBERS}`
          }
        },
      },
      counterDelay
    )

    // Phase 5: Final celebration
    tl.to(
      '.total-badge',
      {
        filter: 'url(#adocaoStrongGlow)',
        scale: 1.06,
        duration: 0.35,
        yoyo: true,
        repeat: 2,
      },
      counterDelay + 0.9
    )

    // Big confetti burst
    if (confettiGroupRef.current) {
      tl.call(
        () => {
          if (confettiGroupRef.current) {
            spawnConfetti(confettiGroupRef.current, 360, 248, 35)
          }
        },
        [],
        counterDelay + 1.1
      )
    }

    // Hold
    tl.to({}, { duration: 2.8 })

    // Reset - Clean up confetti elements to prevent memory leak
    tl.call(() => {
      if (confettiGroupRef.current) {
        while (confettiGroupRef.current.firstChild) {
          confettiGroupRef.current.removeChild(confettiGroupRef.current.firstChild)
        }
      }
    })

    TEAMS.forEach((_, teamIdx) => {
      for (let memberIdx = 0; memberIdx < TEAMS[teamIdx].members; memberIdx++) {
        tl.set(`.member-dot-${teamIdx}-${memberIdx}`, {
          fill: 'white',
          fillOpacity: 0.15,
          filter: 'none',
          scale: 1,
        })
      }
      tl.set(`.team-check-${teamIdx}, .percent-badge-${teamIdx}`, { opacity: 0, scale: 0 })
    })
    PHASES.forEach((_, i) => {
      tl.set(`.phase-node-${i}`, { scale: 0, fill: color, filter: 'none' })
      tl.set(`.phase-check-${i}`, { opacity: 0, scale: 0 })
      tl.set(`.phase-line-${i}`, { scaleY: 0 })
    })
    tl.set('.total-badge', { opacity: 0, scale: 0.9, filter: 'none' })
    tl.set('.team-row', { opacity: 0, x: -25 })
    if (totalCounterRef.current) {
      tl.set(totalCounterRef.current, { textContent: `0/${TOTAL_MEMBERS}` })
    }

    return () => {
      tl.kill()
    }
  }, [isVisible, prefersReducedMotion, svgRef, timelineRef, color])

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        if (totalCounterRef.current) totalCounterRef.current.textContent = `${TOTAL_MEMBERS}/${TOTAL_MEMBERS}`
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
        aria-label="Certificação de equipe com timeline"
        style={{ willChange: 'transform' }}
      >
        <defs>
          {/* Premium gradients for each team */}
          <linearGradient id="vendedoresGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#635BFF" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#8B85FF" stopOpacity="0.15" />
          </linearGradient>
          <linearGradient id="sdrsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#34D399" stopOpacity="0.15" />
          </linearGradient>
          <linearGradient id="csGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#FBBF24" stopOpacity="0.15" />
          </linearGradient>
          <linearGradient id="gestoresGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EC4899" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#F472B6" stopOpacity="0.15" />
          </linearGradient>

          {/* Glassmorphism gradient */}
          <linearGradient id="glassGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="white" stopOpacity="0.06" />
            <stop offset="50%" stopColor="white" stopOpacity="0.03" />
            <stop offset="100%" stopColor="white" stopOpacity="0.01" />
          </linearGradient>

          {/* Timeline track gradient */}
          <linearGradient id="timelineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#059669" stopOpacity="0.2" />
          </linearGradient>

          {/* Glow filters */}
          <filter id="adocaoGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="adocaoStrongGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="dotGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Noise texture */}
          <filter id="adocaoNoise" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" result="noise" />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.02" />
            </feComponentTransfer>
            <feBlend in="SourceGraphic" mode="overlay" />
          </filter>
        </defs>

        {/* Background noise texture */}
        <rect x="0" y="0" width="720" height="280" fill="transparent" filter="url(#adocaoNoise)" />

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
          CERTIFICAÇÃO POR FUNÇÃO
        </text>

        {/* Team rows with glassmorphism backgrounds */}
        {TEAMS.map((team, teamIdx) => {
          const gradientId = ['vendedoresGradient', 'sdrsGradient', 'csGradient', 'gestoresGradient'][teamIdx]
          return (
            <g
              key={teamIdx}
              className={`team-row team-row-${teamIdx}`}
              transform={`translate(30, ${42 + teamIdx * 46})`}
              opacity="0"
            >
              {/* Row background with glassmorphism */}
              <rect
                x="0"
                y="-6"
                width="310"
                height="32"
                rx="16"
                fill={`url(#${gradientId})`}
                stroke={team.color}
                strokeWidth="1"
                strokeOpacity="0.15"
              />

              {/* Team name */}
              <text
                x="12"
                y="12"
                fill="white"
                fillOpacity="0.8"
                fontSize="11"
                fontWeight="500"
              >
                {team.name}
              </text>

              {/* Member dots with better spacing */}
              {Array.from({ length: team.members }).map((_, memberIdx) => (
                <circle
                  key={memberIdx}
                  className={`member-dot-${teamIdx}-${memberIdx}`}
                  cx={95 + memberIdx * 20}
                  cy="8"
                  r="7"
                  fill="white"
                  fillOpacity="0.15"
                  style={{ transformOrigin: `${95 + memberIdx * 20}px 8px` }}
                />
              ))}

              {/* Certification count */}
              <text
                x={95 + team.members * 20 + 12}
                y="12"
                fill="white"
                fillOpacity="0.5"
                fontSize="10"
              >
                {team.certified}/{team.members}
              </text>

              {/* Checkmark */}
              <text
                className={`team-check-${teamIdx}`}
                x={95 + team.members * 20 + 45}
                y="13"
                fill="#10B981"
                fontSize="14"
                fontWeight="600"
                opacity="0"
              >
                ✓
              </text>

              {/* 100% badge */}
              <g
                className={`percent-badge-${teamIdx}`}
                transform={`translate(${95 + team.members * 20 + 62}, -2)`}
                opacity="0"
              >
                <rect
                  width="42"
                  height="20"
                  rx="10"
                  fill={team.color}
                  fillOpacity="0.2"
                  stroke={team.color}
                  strokeWidth="1"
                  strokeOpacity="0.3"
                />
                <text
                  x="21"
                  y="14"
                  textAnchor="middle"
                  fill={team.color}
                  fontSize="10"
                  fontWeight="700"
                >
                  100%
                </text>
              </g>
            </g>
          )
        })}

        {/* Timeline section with improved styling */}
        <g transform="translate(400, 32)">
          <text
            fill="white"
            fillOpacity="0.4"
            fontSize="10"
            fontWeight="600"
            letterSpacing="0.12em"
          >
            TIMELINE FLUIDZ
          </text>

          {/* Timeline track with gradient */}
          <rect
            x="16"
            y="22"
            width="10"
            height="150"
            rx="5"
            fill="url(#glassGradient)"
            stroke="white"
            strokeWidth="1"
            strokeOpacity="0.05"
          />

          {/* Phase nodes and labels */}
          {PHASES.map((phase, i) => {
            const y = 35 + i * 40
            const isComplete = phase.status === 'complete'
            const isCurrent = phase.status === 'current'

            return (
              <g key={i}>
                {/* Connection line to next node */}
                {i < PHASES.length - 1 && (
                  <rect
                    className={`phase-line-${i}`}
                    x="18"
                    y={y + 12}
                    width="6"
                    height="28"
                    rx="3"
                    fill="url(#timelineGradient)"
                    style={{ transformOrigin: `21px ${y + 12}px` }}
                  />
                )}

                {/* Node with glow effect */}
                <circle
                  className={`phase-node-${i}`}
                  cx="21"
                  cy={y}
                  r="11"
                  fill={isComplete ? '#10B981' : isCurrent ? color : 'white'}
                  fillOpacity={isComplete ? 1 : isCurrent ? 0.85 : 0.15}
                  stroke={isComplete ? '#10B981' : isCurrent ? color : 'white'}
                  strokeWidth="2"
                  strokeOpacity={isComplete ? 0.3 : isCurrent ? 0.4 : 0.1}
                  style={{ transformOrigin: `21px ${y}px` }}
                />

                {/* Checkmark for complete */}
                {isComplete && (
                  <text
                    className={`phase-check-${i}`}
                    x="21"
                    y={y + 4}
                    textAnchor="middle"
                    fill="white"
                    fontSize="11"
                    fontWeight="bold"
                    opacity="0"
                  >
                    ✓
                  </text>
                )}

                {/* Phase label */}
                <text
                  x="45"
                  y={y - 4}
                  fill="white"
                  fillOpacity={isComplete || isCurrent ? 0.9 : 0.4}
                  fontSize="11"
                  fontWeight={isCurrent ? '600' : '400'}
                >
                  {phase.name}
                </text>
                <text
                  x="45"
                  y={y + 10}
                  fill="white"
                  fillOpacity="0.4"
                  fontSize="9"
                >
                  Semana {phase.weeks}
                </text>

                {/* Current indicator badge */}
                {isCurrent && (
                  <g transform={`translate(130, ${y - 9})`}>
                    <rect
                      width="65"
                      height="18"
                      rx="9"
                      fill={color}
                      fillOpacity="0.25"
                      stroke={color}
                      strokeWidth="1"
                      strokeOpacity="0.3"
                    />
                    <text
                      x="32"
                      y="13"
                      textAnchor="middle"
                      fill={color}
                      fontSize="9"
                      fontWeight="600"
                    >
                      EM CURSO
                    </text>
                  </g>
                )}
              </g>
            )
          })}
        </g>

        {/* Confetti group */}
        <g ref={confettiGroupRef} />

        {/* Total badge with premium styling */}
        <g className="total-badge" transform="translate(230, 230)" opacity="0">
          <rect
            width="260"
            height="40"
            rx="20"
            fill={color}
            fillOpacity="0.12"
            stroke={color}
            strokeWidth="1"
            strokeOpacity="0.25"
          />
          <text
            x="22"
            y="26"
            fill="white"
            fillOpacity="0.7"
            fontSize="11"
            fontWeight="500"
          >
            CERTIFICADOS:
          </text>
          <text
            ref={totalCounterRef}
            x="140"
            y="26"
            fill="white"
            fontSize="17"
            fontWeight="700"
          >
            0/{TOTAL_MEMBERS}
          </text>
          <rect
            x="185"
            y="10"
            width="55"
            height="20"
            rx="10"
            fill="#10B981"
            fillOpacity="0.2"
          />
          <text
            x="212"
            y="24"
            textAnchor="middle"
            fill="#10B981"
            fontSize="11"
            fontWeight="700"
          >
            100%
          </text>
        </g>
      </svg>
    </div>
  )
}

export default AdocaoVisualization
