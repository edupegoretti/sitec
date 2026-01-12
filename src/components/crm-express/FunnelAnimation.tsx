'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

// Check for reduced motion preference
const prefersReducedMotion = typeof window !== 'undefined'
  ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
  : false

interface FunnelAnimationProps {
  className?: string
}

// Funnel stage configuration
const FUNNEL_STAGES = [
  { id: 'leads', label: 'Leads', count: 1247, y: 60, width: 280, color: 'brand', opacity: 0.4 },
  { id: 'qualified', label: 'Qualificados', count: 523, y: 130, width: 220, color: 'brand', opacity: 0.6 },
  { id: 'proposals', label: 'Propostas', count: 156, y: 200, width: 160, color: 'success', opacity: 0.6 },
  { id: 'sales', label: 'Vendas', count: 42, y: 270, width: 100, color: 'success', opacity: 0.9 },
]

export function FunnelAnimation({ className }: FunnelAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const particlesGroupRef = useRef<SVGGElement>(null)
  const countersRef = useRef<Map<string, SVGTextElement>>(new Map())
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  // IntersectionObserver to pause animation when not visible
  useEffect(() => {
    if (!containerRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
        if (timelineRef.current) {
          if (entry.isIntersecting) {
            timelineRef.current.play()
          } else {
            timelineRef.current.pause()
          }
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  // Create and animate particles
  const createParticles = useCallback(() => {
    if (!particlesGroupRef.current) return []

    const particles: SVGCircleElement[] = []
    const group = particlesGroupRef.current

    // Clear existing particles
    while (group.firstChild) {
      group.removeChild(group.firstChild)
    }

    // Create 15 particles
    for (let i = 0; i < 15; i++) {
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
      circle.setAttribute('r', '5')
      circle.setAttribute('fill', 'url(#particleGradient)')
      circle.setAttribute('opacity', '0')
      circle.setAttribute('cx', String(200 + (Math.random() - 0.5) * 200))
      circle.setAttribute('cy', '-20')
      group.appendChild(circle)
      particles.push(circle)
    }

    return particles
  }, [])

  useGSAP(() => {
    if (!containerRef.current || !svgRef.current) return

    // Skip animation for reduced motion preference
    if (prefersReducedMotion) {
      // Show static final state
      FUNNEL_STAGES.forEach((stage) => {
        const counter = countersRef.current.get(stage.id)
        if (counter) {
          counter.textContent = String(stage.count)
        }
      })
      return
    }

    const particles = createParticles()
    if (particles.length === 0) return

    // Main timeline
    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 2,
      paused: !isVisible, // Start paused if not visible
      defaults: { ease: 'power2.inOut' },
    })

    // Store timeline ref for visibility control
    timelineRef.current = tl

    // Reset counters at start
    FUNNEL_STAGES.forEach((stage) => {
      const counter = countersRef.current.get(stage.id)
      if (counter) {
        counter.textContent = '0'
      }
    })

    // Phase 1: Particles appear and fall to first stage
    particles.forEach((particle, i) => {
      const startX = 200 + (Math.random() - 0.5) * 180
      const stagger = i * 0.08

      tl.set(particle, { attr: { cx: startX, cy: -20 }, opacity: 0 }, 0)
      tl.to(particle, {
        opacity: 0.9,
        duration: 0.3,
      }, stagger)
      tl.to(particle, {
        attr: { cy: 80, cx: 200 + (Math.random() - 0.5) * 100 },
        duration: 0.8,
        ease: 'power2.in',
      }, stagger + 0.2)
    })

    // Counter: Leads
    tl.to({}, {
      duration: 1,
      onUpdate: function() {
        const counter = countersRef.current.get('leads')
        if (counter) {
          counter.textContent = String(Math.round(this.progress() * FUNNEL_STAGES[0].count))
        }
      },
    }, 0.5)

    // Phase 2: Some particles continue to qualified (60% pass)
    const qualifiedParticles = particles.slice(0, 9)
    const droppedParticles1 = particles.slice(9)

    qualifiedParticles.forEach((particle, i) => {
      tl.to(particle, {
        attr: { cy: 150, cx: 200 + (Math.random() - 0.5) * 80 },
        duration: 0.6,
      }, 1.5 + i * 0.05)
    })

    // Dropped particles fade out
    droppedParticles1.forEach((particle, i) => {
      tl.to(particle, {
        attr: { cx: particle.getAttribute('cx')! + (Math.random() > 0.5 ? 80 : -80) },
        opacity: 0,
        duration: 0.5,
      }, 1.5 + i * 0.05)
    })

    // Counter: Qualified
    tl.to({}, {
      duration: 0.8,
      onUpdate: function() {
        const counter = countersRef.current.get('qualified')
        if (counter) {
          counter.textContent = String(Math.round(this.progress() * FUNNEL_STAGES[1].count))
        }
      },
    }, 2)

    // Phase 3: Some continue to proposals (30% of qualified)
    const proposalParticles = qualifiedParticles.slice(0, 4)
    const droppedParticles2 = qualifiedParticles.slice(4)

    proposalParticles.forEach((particle, i) => {
      tl.to(particle, {
        attr: { cy: 220, cx: 200 + (Math.random() - 0.5) * 60 },
        fill: 'url(#successGradient)',
        duration: 0.6,
      }, 2.8 + i * 0.05)
    })

    droppedParticles2.forEach((particle, i) => {
      tl.to(particle, {
        attr: { cx: Number(particle.getAttribute('cx')) + (Math.random() > 0.5 ? 60 : -60) },
        opacity: 0,
        duration: 0.5,
      }, 2.8 + i * 0.05)
    })

    // Counter: Proposals
    tl.to({}, {
      duration: 0.8,
      onUpdate: function() {
        const counter = countersRef.current.get('proposals')
        if (counter) {
          counter.textContent = String(Math.round(this.progress() * FUNNEL_STAGES[2].count))
        }
      },
    }, 3.3)

    // Phase 4: Final sales (27% of proposals)
    const salesParticles = proposalParticles.slice(0, 2)
    const droppedParticles3 = proposalParticles.slice(2)

    salesParticles.forEach((particle, i) => {
      tl.to(particle, {
        attr: { cy: 290, cx: 200 + (Math.random() - 0.5) * 40 },
        duration: 0.6,
      }, 4 + i * 0.05)
    })

    droppedParticles3.forEach((particle, i) => {
      tl.to(particle, {
        opacity: 0,
        duration: 0.4,
      }, 4 + i * 0.05)
    })

    // Counter: Sales
    tl.to({}, {
      duration: 0.8,
      onUpdate: function() {
        const counter = countersRef.current.get('sales')
        if (counter) {
          counter.textContent = String(Math.round(this.progress() * FUNNEL_STAGES[3].count))
        }
      },
    }, 4.5)

    // Conversion rate bar
    tl.to('.conversion-bar', {
      attr: { width: 102 }, // 34% of 300
      duration: 1.5,
      ease: 'power2.out',
    }, 4)

    // Phase 5: Success celebration - particles exit with checkmark
    salesParticles.forEach((particle, i) => {
      tl.to(particle, {
        attr: { cy: 350, r: 8 },
        duration: 0.4,
      }, 5.5 + i * 0.1)

      tl.to(particle, {
        opacity: 0,
        duration: 0.3,
      }, 6)
    })

    // Show checkmark
    tl.to('.success-check', {
      opacity: 1,
      scale: 1,
      duration: 0.4,
      ease: 'back.out(2)',
    }, 5.8)

    tl.to('.success-check', {
      opacity: 0,
      scale: 0.8,
      duration: 0.3,
    }, 7)

    // Reset conversion bar for next cycle
    tl.to('.conversion-bar', {
      attr: { width: 0 },
      duration: 0.5,
    }, 7.5)

    return () => {
      tl.kill()
      timelineRef.current = null
    }
  }, { scope: containerRef, dependencies: [isVisible, createParticles] })

  const setCounterRef = useCallback((id: string) => (el: SVGTextElement | null) => {
    if (el) {
      countersRef.current.set(id, el)
    }
  }, [])

  return (
    <div ref={containerRef} className={className}>
      <div className="relative bg-white/3 backdrop-blur-sm rounded-3xl border border-white/10 overflow-hidden">
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-linear-to-br from-brand/5 via-transparent to-success/5" />

        <div className="relative p-6 sm:p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-xs font-medium text-white/60">Pipeline em tempo real</span>
            </div>
            <span className="text-xs text-white/40">CRM Express</span>
          </div>

          {/* SVG Funnel */}
          <svg
            ref={svgRef}
            viewBox="0 0 400 380"
            className="w-full h-auto"
            style={{ maxHeight: '340px', willChange: 'transform' }}
          >
            {/* Definitions */}
            <defs>
              <linearGradient id="funnelGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#635BFF" />
                <stop offset="100%" stopColor="#00A67E" />
              </linearGradient>
              <linearGradient id="particleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#635BFF" />
                <stop offset="100%" stopColor="#8B85FF" />
              </linearGradient>
              <linearGradient id="successGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00A67E" />
                <stop offset="100%" stopColor="#00D4A0" />
              </linearGradient>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Funnel outline (trapezoid) */}
            <path
              d="M60 50 L340 50 L280 320 L120 320 Z"
              fill="url(#funnelGradient)"
              opacity="0.08"
              stroke="url(#funnelGradient)"
              strokeWidth="1"
            />

            {/* Funnel stages */}
            {FUNNEL_STAGES.map((stage, index) => {
              const x = 200 - stage.width / 2
              const height = 50
              const fillColor = stage.color === 'brand' ? '#635BFF' : '#00A67E'

              return (
                <g key={stage.id} className={`stage-${stage.id}`}>
                  {/* Stage background */}
                  <rect
                    x={x}
                    y={stage.y}
                    width={stage.width}
                    height={height}
                    rx="8"
                    fill={fillColor}
                    opacity={stage.opacity * 0.3}
                  />
                  {/* Stage border */}
                  <rect
                    x={x}
                    y={stage.y}
                    width={stage.width}
                    height={height}
                    rx="8"
                    fill="none"
                    stroke={fillColor}
                    strokeWidth="1"
                    opacity={stage.opacity * 0.5}
                  />
                  {/* Stage label */}
                  <text
                    x={x + 12}
                    y={stage.y + 30}
                    fill="white"
                    fontSize="11"
                    fontWeight="500"
                    opacity="0.8"
                  >
                    {stage.label}
                  </text>
                  {/* Stage counter */}
                  <text
                    ref={setCounterRef(stage.id)}
                    x={x + stage.width - 12}
                    y={stage.y + 30}
                    fill="white"
                    fontSize="14"
                    fontWeight="700"
                    textAnchor="end"
                  >
                    0
                  </text>
                </g>
              )
            })}

            {/* Particles group */}
            <g ref={particlesGroupRef} filter="url(#glow)" />

            {/* Success checkmark */}
            <g className="success-check" opacity="0" style={{ transformOrigin: '200px 350px' }}>
              <circle cx="200" cy="350" r="16" fill="#00A67E" />
              <path
                d="M192 350 L198 356 L210 344"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </g>

            {/* Conversion rate bar */}
            <g transform="translate(50, 335)">
              <rect width="300" height="6" rx="3" fill="white" opacity="0.1" />
              <rect className="conversion-bar" width="0" height="6" rx="3" fill="url(#funnelGradient)" />
            </g>
            <text x="200" y="360" textAnchor="middle" fill="white" opacity="0.5" fontSize="10">
              Taxa de conversão: 3.4%
            </text>
          </svg>

          {/* Bottom comparison */}
          <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-white/10">
            <div className="text-center">
              <p className="text-base font-medium text-white/30 line-through decoration-white/20">
                6 meses
              </p>
              <p className="text-[10px] text-white/30">tradicional</p>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-8 h-[1px] bg-linear-to-r from-white/10 to-brand/50" />
              <svg className="w-4 h-4 text-success" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              <div className="w-8 h-[1px] bg-linear-to-r from-success/50 to-white/10" />
            </div>

            <div className="text-center">
              <p className="text-base font-bold text-success">
                30 dias
              </p>
              <p className="text-[10px] text-success/60">CRM Express</p>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-brand rounded-full blur-[100px] opacity-20 pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-success rounded-full blur-[80px] opacity-15 pointer-events-none" />
      </div>
    </div>
  )
}
