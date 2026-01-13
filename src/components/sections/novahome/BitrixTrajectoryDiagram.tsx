'use client'

import { cn } from '@/lib/utils'
import dynamic from 'next/dynamic'

// Dynamic import to avoid SSR issues with Three.js
const Globe3D = dynamic(() => import('@/components/3d/Globe3D').then((mod) => mod.Globe3D), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full rounded-full bg-linear-to-br from-blue-300 via-blue-500 to-blue-900 animate-pulse" />
  ),
})

interface BitrixTrajectoryDiagramProps {
  className?: string
}

export function BitrixTrajectoryDiagram({ className }: BitrixTrajectoryDiagramProps) {
  const width = 900
  const height = 360

  const left = { cx: 150, cy: 180, r: 120 }
  const target = { cx: 760, cy: 110, r: 52 }
  const sink = { cx: 720, cy: 260, r: 28 }

  const circleEdgeX = (y: number) => {
    const dy = y - left.cy
    const dx = Math.sqrt(Math.max(0, left.r * left.r - dy * dy))
    return left.cx + dx
  }

  const topY = target.cy
  const topStartX = circleEdgeX(topY) - 2
  const topEndX = target.cx - target.r - 10
  const topMidX = topStartX + (topEndX - topStartX) * 0.52
  const topGap = 14

  const bottomStartY = left.cy + 24
  const bottomStartX = circleEdgeX(bottomStartY) - 2
  const bottomEndX = sink.cx - sink.r - 8
  const bottomEndY = sink.cy
  const bottomControlX = bottomStartX + 190
  const bottomControlY = bottomStartY + 80

  const topLabelX = (topStartX + topEndX) / 2
  const bottomLabelX = (bottomStartX + bottomEndX) / 2

  // Globe dimensions for foreignObject
  const globeSize = left.r * 2
  const globeX = left.cx - left.r
  const globeY = left.cy - left.r

  return (
    <div className={cn('relative flex items-center justify-center', className)}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto max-w-[900px]"
        role="img"
        aria-label="Trajetórias do Bitrix24 com e sem modelo operacional"
      >
        <defs>
          <linearGradient id="target-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#16a34a" />
          </linearGradient>

          <filter id="soft-shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#0f172a" floodOpacity="0.25" />
          </filter>

          <marker id="arrow-green" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
            <path d="M0,0 L10,5 L0,10 L3,5 Z" fill="#22c55e" />
          </marker>
          <marker id="arrow-red" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
            <path d="M0,0 L10,5 L0,10 L3,5 Z" fill="#ef4444" />
          </marker>
        </defs>

        {/* 3D Globe using foreignObject for perfect SVG alignment */}
        <foreignObject x={globeX} y={globeY} width={globeSize} height={globeSize}>
          <div className="w-full h-full">
            <Globe3D
              size={globeSize}
              className="w-full h-full"
              dotColor="#93c5fd"
              oceanColor="#1e3a8a"
              rotationSpeed={0.002}
              showLogo={true}
              logoSrc="/images/bitrix24_logo.png"
            />
          </div>
        </foreignObject>

        {/* Top trajectory: with operating model */}
        <path
          d={`M ${topStartX} ${topY} L ${topMidX} ${topY}`}
          stroke="#22c55e"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d={`M ${topMidX + topGap} ${topY} L ${topEndX} ${topY}`}
          stroke="#22c55e"
          strokeWidth="4"
          strokeDasharray="10 10"
          strokeLinecap="round"
          markerEnd="url(#arrow-green)"
        />

        {/* Bottom trajectory: without operating model */}
        <path
          d={`M ${bottomStartX} ${bottomStartY} Q ${bottomControlX} ${bottomControlY} ${bottomEndX} ${bottomEndY}`}
          stroke="#ef4444"
          strokeWidth="4"
          strokeLinecap="round"
          markerEnd="url(#arrow-red)"
          fill="none"
        />

        {/* Outcome circles */}
        <g filter="url(#soft-shadow)">
          <circle cx={target.cx} cy={target.cy} r={target.r} fill="url(#target-grad)" />
          <circle cx={target.cx} cy={target.cy} r={target.r} fill="none" stroke="#15803d" strokeWidth="3" />
        </g>
        <g filter="url(#soft-shadow)">
          <circle cx={sink.cx} cy={sink.cy} r={sink.r} fill="#fee2e2" />
          <circle cx={sink.cx} cy={sink.cy} r={sink.r} fill="none" stroke="#ef4444" strokeWidth="2" />
          <line x1={sink.cx - 10} y1={sink.cy - 10} x2={sink.cx + 10} y2={sink.cy + 10} stroke="#ef4444" strokeWidth="2" />
          <line x1={sink.cx - 10} y1={sink.cy + 10} x2={sink.cx + 10} y2={sink.cy - 10} stroke="#ef4444" strokeWidth="2" />
        </g>

        {/* Labels */}
        <text x={topLabelX} y={topY - 18} textAnchor="middle" fill="#16a34a" fontSize="14" fontWeight="600">
          Com modelo operacional
        </text>
        <text x={bottomLabelX} y={bottomEndY + 32} textAnchor="middle" fill="#dc2626" fontSize="14" fontWeight="600">
          Sem modelo operacional
        </text>

        <text x={target.cx} y={target.cy - 4} textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="700">
          Receita
        </text>
        <text x={target.cx} y={target.cy + 16} textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="600">
          previsível
        </text>

        <text x={sink.cx} y={sink.cy + 46} textAnchor="middle" fill="#b91c1c" fontSize="12" fontWeight="600">
          Adoção travada
        </text>
      </svg>
    </div>
  )
}
