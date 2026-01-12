'use client'

import { useEffect, useRef, useMemo } from 'react'
import { motion, useAnimation } from 'framer-motion'

interface Particle {
  id: number
  x: number
  y: number
  size: number
  color: string
  delay: number
  duration: number
}

interface RevenueParticleSystemProps {
  isPlaying?: boolean
  intensity?: number // 0-1, controls particle count/speed based on context
  containerRef: React.RefObject<HTMLDivElement | null>
}

/**
 * RevenueParticleSystem
 * 
 * Manages a layer of "Revenue Particles" that flow through the entire system:
 * Funnel (Top -> Bottom) -> Bridge -> Flywheel (Spin) -> Recirculation
 * 
 * Uses HTML Canvas for performance if many particles, or optimized Framer Motion nodes.
 * Given the complexity of the path, we'll use an absolute SVG overlay with <animateMotion> 
 * or Framer Motion along path for best control over the complex route.
 */
export function RevenueParticleSystem({ 
  isPlaying = true, 
  intensity = 0.5,
  containerRef 
}: RevenueParticleSystemProps) {
  
  // Implementation Note:
  // Since the specific coordinates depend on the layout of child components (Funnel, Flywheel)
  // which are responsive, we create a unified SVG path that overlays the grid.
  // 
  // We assume the container has the grid: [Funnel ] [Bridge] [Flywheel]
  // We will define a key path relative to this container.

  // Simplified Path Logic for MVP:
  // 1. Start at Top-Leftish (Funnel Top)
  // 2. Converge to Middle-Left (Funnel Bottom)
  // 3. Move straight Right (Bridge)
  // 4. Enter Circle Path (Flywheel)
  
  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible z-0">
      <svg className="w-full h-full overflow-visible">
        <defs>
          <radialGradient id="particle-glow-rad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
      {/* 
          Actual particles will be handled inside individual components 
          OR coordinate-synced here. 
          
          DECISION: 
          To ensure perfect alignment with the SVG shapes (which might scale/move),
          it is safer to let the `FunnelSvg` and `FlywheelSvg` render their own internal 
          particles, BUT synchronize their timing/density via this context/prop.
          
          However, for the 'Bridge' transition to be seamless, we need a shared layer.
          
          Let's implement a 'Global Overlay' particle set specifically for the visual cues 
          that cross boundaries, while local internal flows can be handled locally.
      */}
    </div>
  )
}
