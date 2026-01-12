'use client'

import { useRef } from 'react'
import { ArrowRight } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
import { BRIDGE_STAGE } from '@/content/revenuePerformanceMap'
import { motion } from 'framer-motion'

interface FlowConnectionProps {
  isActive?: boolean
  onBridgeClick?: () => void
  onBridgeHover?: (hovering: boolean) => void
  className?: string
}

export function FlowConnection({
  isActive = false,
  onBridgeClick,
  onBridgeHover,
  className,
}: FlowConnectionProps) {

  return (
    <div className={cn('relative flex flex-col items-center justify-center h-full w-full', className)}>

      {/* Desktop: High-Tech Accelerator Pipe */}
      <div className="hidden md:flex relative w-full items-center justify-center">
        <svg
          width="140"
          height="60"
          viewBox="0 0 140 60"
          className="overflow-visible"
        >
          <defs>
            <linearGradient id="accelerator-flow" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#14b8a6" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.3" />
            </linearGradient>
            <filter id="intense-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Core Pipe */}
          <rect x="0" y="24" width="140" height="12" rx="6" fill="#0f172a" stroke="url(#accelerator-flow)" strokeWidth="1" />

          {/* Energy Fluid */}
          <rect x="2" y="26" width="136" height="8" rx="4" fill="url(#accelerator-flow)" opacity="0.6" />

          {/* Rapid Particles */}
          <g filter="url(#intense-glow)">
            {[0, 0.3, 0.6, 0.9].map((delay, i) => (
              <circle key={i} r={i % 2 === 0 ? 3 : 2} fill="#ffffff">
                <animateMotion
                  path="M -10 30 L 150 30"
                  dur="1.2s"
                  begin={`${delay}s`}
                  repeatCount="indefinite"
                />
                <animate attributeName="opacity" values="0;1;1;0" dur="1.2s" begin={`${delay}s`} repeatCount="indefinite" />
              </circle>
            ))}
          </g>
        </svg>

        {/* Floating Bridge Badge - Distinct and Premium */}
        <motion.button
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBridgeClick}
          onMouseEnter={() => onBridgeHover?.(true)}
          onMouseLeave={() => onBridgeHover?.(false)}
          className={cn(
            'absolute z-10 flex flex-col items-center gap-1 px-5 py-2.5',
            'bg-[#0f172a] border border-teal-500 rounded-xl',
            'shadow-[0_0_20px_rgba(20,184,166,0.4)]',
            'transition-all duration-300'
          )}
        >
          <div className="flex items-center gap-2 text-teal-400">
            <span className="text-sm font-black uppercase tracking-wider">{BRIDGE_STAGE.metricId}</span>
            <ArrowRight size={14} weight="bold" />
          </div>
          <span className="text-xs text-white font-bold">{BRIDGE_STAGE.label}</span>
        </motion.button>
      </div>

      {/* Mobile: Vertical Connector */}
      <div className="md:hidden flex flex-col items-center gap-0 w-full h-16">
        <div className="w-0.5 h-full bg-linear-to-b from-teal-500/20 via-teal-500 to-teal-500/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/3 bg-white/50 blur-xs animate-[drop_1s_linear_infinite]" />
        </div>
      </div>
    </div>
  )
}
