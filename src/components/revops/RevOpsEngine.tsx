'use client'

import { useMemo, useState, useEffect } from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import {
    BRIDGE_STAGE,
    FUNNEL_STAGES,
    type FunnelStage,
    type FlywheelMetric,
} from '@/content/revenuePerformanceMap'
import { ArrowRight } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

interface RevOpsEngineProps {
    flywheelMetrics: FlywheelMetric[]
    activeStageId: string | null
    onStageHover: (id: string | null) => void
    onStageOpen: (id: string) => void
    onStageLeave: (id: string) => void
}

// === Constants ===
const ENGINE_COLORS = {
    funnel: ['#6366f1', '#4f46e5', '#3b82f6', '#0ea5e9', '#06b6d4', '#14b8a6'],
    flywheel: ['#14b8a6', '#10b981', '#06b6d4', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'],
}

export function RevOpsEngine({
    flywheelMetrics,
    activeStageId,
    onStageHover,
    onStageOpen,
    onStageLeave,
}: RevOpsEngineProps) {
    // === Layout Geometry (Desktop) ===
    const width = 1200
    const height = 500
    const centerY = height / 2

    // Funnel Geometry
    const funnelStartX = 50
    const funnelWidth = 550
    const funnelEndX = funnelStartX + funnelWidth
    const funnelHeightStart = 260
    const funnelHeightEnd = 100 // Tapers down

    // Flywheel Geometry
    const flywheelCenterX = 950
    const flywheelCenterY = centerY
    const flywheelRadiusOuter = 160
    const flywheelRadiusInner = 70

    // Bridge Geometry
    // Connects Funnel End (at funnelEndX) to Flywheel Left (at flywheelCenterX - flywheelRadiusOuter)
    const bridgeStartX = funnelEndX
    const bridgeEndX = flywheelCenterX - flywheelRadiusOuter - 10 // little gap for aesthetics? No, unified.
    // Actually, we want it to flow INTO the flywheel.
    // Let's make the bridge encompass the V6->V7 transition area.

    // === Helper Functions ===
    const getFunnelShape = (index: number, total: number) => {
        const segmentWidth = funnelWidth / total
        const x1 = funnelStartX + (index * segmentWidth)
        const x2 = x1 + segmentWidth

        // Lerp height
        const t1 = index / total
        const t2 = (index + 1) / total
        const h1 = funnelHeightStart * (1 - t1) + funnelHeightEnd * t1
        const h2 = funnelHeightStart * (1 - t2) + funnelHeightEnd * t2

        const y1Top = centerY - h1 / 2
        const y1Bottom = centerY + h1 / 2
        const y2Top = centerY - h2 / 2
        const y2Bottom = centerY + h2 / 2

        return {
            path: `M ${x1} ${y1Top} L ${x2} ${y2Top} L ${x2} ${y2Bottom} L ${x1} ${y1Bottom} Z`,
            center: { x: (x1 + x2) / 2, y: centerY },
            labelY: y2Bottom + 30
        }
    }

    const getFlywheelShape = (index: number, total: number) => {
        const step = (Math.PI * 2) / total
        // Rotate so V7 (index 0) is at 9 o'clock (PI) to meet the funnel
        const startOffset = Math.PI

        const startAngle = startOffset + index * step
        const endAngle = startOffset + (index + 1) * step

        // Add gap
        const gap = 0.03
        const a1 = startAngle + gap
        const a2 = endAngle - gap

        // Geometry
        const cx = flywheelCenterX
        const cy = flywheelCenterY
        const rIn = flywheelRadiusInner
        const rOut = flywheelRadiusOuter

        const p1x = cx + rOut * Math.cos(a1); const p1y = cy + rOut * Math.sin(a1)
        const p2x = cx + rOut * Math.cos(a2); const p2y = cy + rOut * Math.sin(a2)
        const p3x = cx + rIn * Math.cos(a2); const p3y = cy + rIn * Math.sin(a2)
        const p4x = cx + rIn * Math.cos(a1); const p4y = cy + rIn * Math.sin(a1)

        const large = (a2 - a1) > Math.PI ? 1 : 0

        return {
            path: `M ${p1x} ${p1y} A ${rOut} ${rOut} 0 ${large} 1 ${p2x} ${p2y} L ${p3x} ${p3y} A ${rIn} ${rIn} 0 ${large} 0 ${p4x} ${p4y} Z`,
            center: {
                x: cx + ((rIn + rOut) / 2) * Math.cos((a1 + a2) / 2),
                y: cy + ((rIn + rOut) / 2) * Math.sin((a1 + a2) / 2)
            }
        }
    }

    return (
        <div className="w-full h-full relative group">
            {/* Mobile Layout (Vertical) - Rendered via CSS hidden/block toggling or just media query in JS?
          For now, let's assume desktop-only usage or scaling SVG significantly. 
          The Plan said "Mobile Vertical Engine". 
          Let's render TWO SVGs and toggle visibility for perfection.
      */}
            <div className="hidden md:block w-full">
                <DesktopEngine
                    width={width} height={height} centerY={centerY}
                    funnelMetrics={FUNNEL_STAGES}
                    flywheelMetrics={flywheelMetrics}
                    bridgeMetric={BRIDGE_STAGE}
                    activeStageId={activeStageId}
                    onStageHover={onStageHover}
                    onStageOpen={onStageOpen}
                    onStageLeave={onStageLeave}
                    getFunnelShape={getFunnelShape}
                    getFlywheelShape={getFlywheelShape}
                    flywheelCenterX={flywheelCenterX}
                    flywheelCenterY={flywheelCenterY}
                    funnelEndX={funnelEndX}
                    funnelHeightEnd={funnelHeightEnd}
                    flywheelRadiusOuter={flywheelRadiusOuter}
                />
            </div>

            <div className="md:hidden w-full h-[800px]">
                <MobileVerticalEngine
                    // Similar props, passing down
                    flywheelMetrics={flywheelMetrics}
                    activeStageId={activeStageId}
                    onStageOpen={onStageOpen}
                />
            </div>
        </div>
    )
}

// === Subcomponents for Cleanness ===

function DesktopEngine(props: any) {
    const {
        width, height, centerY,
        funnelMetrics, flywheelMetrics, bridgeMetric,
        activeStageId, onStageHover, onStageOpen, onStageLeave,
        getFunnelShape, getFlywheelShape,
        flywheelCenterX, flywheelCenterY, funnelEndX, funnelHeightEnd, flywheelRadiusOuter
    } = props

    // Pulse Logic
    // When hovering V1, trigger flow
    const [pulseActive, setPulseActive] = useState(false)

    useEffect(() => {
        if (activeStageId === funnelMetrics[0].id) {
            setPulseActive(true)
            const t = setTimeout(() => setPulseActive(false), 3000)
            return () => clearTimeout(t)
        }
    }, [activeStageId, funnelMetrics])

    return (
        <svg
            viewBox={`0 0 ${width} ${height}`}
            className="w-full h-auto overflow-visible"
            style={{ filter: 'drop-shadow(0 0 40px rgba(99,102,241,0.1))' }}
        >
            <defs>
                <linearGradient id="engine-glow" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity="0.1" />
                    <stop offset="50%" stopColor="#14b8a6" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.1" />
                </linearGradient>
                <filter id="glass-blur">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <linearGradient id="bridge-flow" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
                </linearGradient>
            </defs>

            {/* --- Connecting Pipe (Bridge) --- */}
            {/* 
          A fluid tube connecting Funnel End to Flywheel.
          Funnel End: Rect at x=funnelEndX, y=centerY, height=funnelHeightEnd
          Flywheel Entry: We want it to hit ~9 o'clock. 
          We'll draw a pipe from x=funnelEndX to x=(flywheelCenterX - flywheelRadiusOuter).
      */}
            <g
                onClick={() => onStageOpen(bridgeMetric.id)}
                onMouseEnter={() => onStageHover(bridgeMetric.id)}
                onMouseLeave={() => onStageLeave(bridgeMetric.id)}
                className="cursor-pointer transition-opacity"
            >
                {/* Pipe Body */}
                <rect
                    x={funnelEndX}
                    y={centerY - funnelHeightEnd / 2 + 10}
                    width={flywheelCenterX - flywheelRadiusOuter - funnelEndX}
                    height={funnelHeightEnd - 20}
                    fill="url(#bridge-flow)"
                    opacity={activeStageId === bridgeMetric.id ? 1 : 0.3}
                    className="transition-all duration-300"
                />
                {/* Particles in Pipe */}
                <g opacity="0.6">
                    <circle r="3" fill="white">
                        <animateMotion
                            path={`M ${funnelEndX} ${centerY} L ${flywheelCenterX - flywheelRadiusOuter} ${centerY}`}
                            dur="1s"
                            repeatCount="indefinite"
                        />
                    </circle>
                    <circle r="2" fill="white">
                        <animateMotion
                            path={`M ${funnelEndX} ${centerY} L ${flywheelCenterX - flywheelRadiusOuter} ${centerY}`}
                            dur="1s"
                            begin="0.5s"
                            repeatCount="indefinite"
                        />
                    </circle>
                </g>
                {/* Label */}
                <text
                    x={funnelEndX + (flywheelCenterX - flywheelRadiusOuter - funnelEndX) / 2}
                    y={centerY}
                    dominantBaseline="middle"
                    textAnchor="middle"
                    fill="white"
                    fontWeight="bold"
                    fontSize="14"
                    style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}
                    className="pointer-events-none"
                >
                    {bridgeMetric.metricId}
                </text>
            </g>

            {/* --- Funnel Stages --- */}
            {funnelMetrics.map((stage: any, i: number) => {
                const { path, center, labelY } = getFunnelShape(i, funnelMetrics.length)
                const isActive = activeStageId === stage.id
                const color = ENGINE_COLORS.funnel[i]

                return (
                    <g
                        key={stage.id}
                        onClick={() => onStageOpen(stage.id)}
                        onMouseEnter={() => onStageHover(stage.id)}
                        onMouseLeave={() => onStageLeave(stage.id)}
                        className="cursor-pointer"
                    >
                        <path
                            d={path}
                            fill={color}
                            fillOpacity={isActive ? 0.9 : (activeStageId ? 0.3 : 0.6)}
                            stroke="white"
                            strokeWidth={isActive ? 2 : 0.5}
                            className="transition-all duration-300"
                        />
                        <text
                            x={center.x} y={center.y}
                            textAnchor="middle" dominantBaseline="middle"
                            fill="white" fontWeight="800" fontSize="16"
                            className="pointer-events-none select-none"
                            style={{ textShadow: '0 2px 5px rgba(0,0,0,0.3)' }}
                        >
                            {stage.metricId}
                        </text>
                        {/* External Label */}
                        <text
                            x={center.x} y={labelY}
                            textAnchor="middle" fill="white" fontSize="12" opacity="0.6"
                            className="pointer-events-none"
                        >
                            {stage.shortLabel}
                        </text>
                    </g>
                )
            })}

            {/* --- Flywheel Stages --- */}
            {flywheelMetrics.map((metric: any, i: number) => {
                const { path, center } = getFlywheelShape(i, flywheelMetrics.length)
                const isActive = activeStageId === metric.id
                const color = ENGINE_COLORS.flywheel[i]

                return (
                    <g
                        key={metric.id}
                        onClick={() => onStageOpen(metric.id)}
                        onMouseEnter={() => onStageHover(metric.id)}
                        onMouseLeave={() => onStageLeave(metric.id)}
                        className="cursor-pointer"
                    >
                        <path
                            d={path}
                            fill={color}
                            fillOpacity={isActive ? 0.9 : (activeStageId ? 0.3 : 0.6)}
                            stroke="white"
                            strokeWidth={isActive ? 2 : 0.5}
                            className="transition-all duration-300"
                        />
                        <text
                            x={center.x} y={center.y}
                            textAnchor="middle" dominantBaseline="middle"
                            fill="white" fontWeight="800" fontSize="14"
                            className="pointer-events-none select-none"
                        >
                            {metric.metricId}
                        </text>
                    </g>
                )
            })}

            {/* --- NRR Core --- */}
            <circle
                cx={flywheelCenterX} cy={flywheelCenterY} r={50}
                fill="#0f172a" stroke="#10b981" strokeWidth="3"
            />
            <text
                x={flywheelCenterX} y={flywheelCenterY + 5}
                textAnchor="middle" fill="#10b981" fontWeight="900" fontSize="20"
            >
                NRR
            </text>

            {/* --- Pulse Particle (The "Wow" Factor) --- */}
            {/* 
          This particle follows a massive path covering the whole system.
          Funnel Center Line -> Bridge -> Flywheel Circle -> Loop
      */}
            {pulseActive && (
                <circle r="6" fill="#ffffff" filter="url(#glass-blur)">
                    {/* We composite a motion path */}
                    <animateMotion
                        dur="2s"
                        repeatCount="1"
                        // Simplified path: Funnel Start -> Funnel End -> Flywheel Top -> Flywheel Bottom
                        path={`M ${50} ${centerY} L ${funnelEndX} ${centerY} L ${flywheelCenterX} ${centerY - 120} A 120 120 0 1 1 ${flywheelCenterX - 0.1} ${centerY - 120}`}
                    />
                </circle>
            )}

        </svg>
    )
}

function MobileVerticalEngine(props: any) {
    // A simplified stack for mobile props
    // Just reusing the list we made before? No, let's make it an SVG tower.
    return (
        <div className="flex flex-col items-center gap-2 py-8">
            {/* Just a placeholder for the mobile logical structure */}
            <div className="w-1 h-20 bg-gradient-to-b from-indigo-500 to-teal-500 rounded-full" />
            <div className="text-white text-center text-sm opacity-50">Mobile Engine Layout active</div>
            {/* In a real implementation this would hold the vertical SVG stack */}
        </div>
    )
}
