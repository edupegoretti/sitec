'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from '@phosphor-icons/react'
import {
    BRIDGE_STAGE,
    type FunnelStage,
    type FlywheelMetric,
} from '@/content/revenuePerformanceMap'

interface RevenueEngineDesktopProps {
    funnelStages: FunnelStage[]
    flywheelMetrics: FlywheelMetric[]
    activeStageId: string | null
    onStageHover: (id: string | null, position?: { x: number; y: number }) => void
    onStageOpen: (id: string) => void
    onStageLeave: (id: string) => void
}

const FUNNEL_COLORS = [
    '#6366f1', '#4f46e5', '#3b82f6', '#0ea5e9', '#06b6d4', '#14b8a6',
]

const FLYWHEEL_COLORS = [
    '#14b8a6', '#10b981', '#06b6d4', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6',
]

export function RevenueEngineDesktop({
    funnelStages,
    flywheelMetrics,
    activeStageId,
    onStageHover,
    onStageOpen,
    onStageLeave,
}: RevenueEngineDesktopProps) {

    // Master Geometry
    const vbW = 1100
    const vbH = 500 // Increased height for better label clearance
    const centerY_global = 250 // Center shifted down

    // Funnel Box
    const funnelX = 60
    const funnelW = 380
    const funnelH = 260
    const taper = 0.65
    const sectionW = funnelW / funnelStages.length

    // Flywheel Box
    const wheelCenterX = 840
    const wheelCenterY = centerY_global
    const outerR = 110
    const innerR = 45

    // Bridge Path
    const bridgeX1 = funnelX + funnelW
    const bridgeX2 = wheelCenterX - outerR
    const bridgeHitHeight = 120

    // Helper for Flywheel Arcs
    const describeArc = (rIn: number, rOut: number, start: number, end: number) => {
        const gap = 0.02
        const s = start + gap
        const e = end - gap
        const large = e - s > Math.PI ? 1 : 0
        const p1x = wheelCenterX + rOut * Math.cos(s); const p1y = wheelCenterY + rOut * Math.sin(s)
        const p2x = wheelCenterX + rOut * Math.cos(e); const p2y = wheelCenterY + rOut * Math.sin(e)
        const p3x = wheelCenterX + rIn * Math.cos(e); const p3y = wheelCenterY + rIn * Math.sin(e)
        const p4x = wheelCenterX + rIn * Math.cos(s); const p4y = wheelCenterY + rIn * Math.sin(s)
        return `M ${p1x} ${p1y} A ${rOut} ${rOut} 0 ${large} 1 ${p2x} ${p2y} L ${p3x} ${p3y} A ${rIn} ${rIn} 0 ${large} 0 ${p4x} ${p4y} Z`
    }

    return (
        <div className="w-full h-full flex items-center justify-center p-4">
            <svg
                viewBox={`0 0 ${vbW} ${vbH}`}
                className="w-full h-auto max-w-6xl overflow-visible selection:bg-transparent"
            >
                <defs>
                    <linearGradient id="volumetric-glass" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="white" stopOpacity="0.4" />
                        <stop offset="20%" stopColor="white" stopOpacity="0.1" />
                        <stop offset="50%" stopColor="white" stopOpacity="0.0" />
                        <stop offset="80%" stopColor="black" stopOpacity="0.1" />
                        <stop offset="100%" stopColor="black" stopOpacity="0.3" />
                    </linearGradient>

                    <filter id="intense-glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="4" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>

                {/* --- CONNECTION / BRIDGE PIEZA --- */}
                <g
                    className="cursor-pointer group/bridge"
                    onMouseEnter={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect()
                        const containerRect = e.currentTarget.closest('svg')?.getBoundingClientRect()
                        if (containerRect) {
                            onStageHover(BRIDGE_STAGE.id, {
                                x: rect.left - containerRect.left + rect.width / 2,
                                y: rect.top - containerRect.top
                            })
                        }
                    }}
                    onMouseLeave={() => onStageLeave(BRIDGE_STAGE.id)}
                    onClick={() => onStageOpen(BRIDGE_STAGE.id)}
                >
                    <rect
                        x={bridgeX1}
                        y={wheelCenterY - bridgeHitHeight / 2}
                        width={bridgeX2 - bridgeX1}
                        height={bridgeHitHeight}
                        fill="transparent"
                        className="pointer-events-auto"
                    />

                    <line
                        x1={bridgeX1}
                        y1={wheelCenterY}
                        x2={bridgeX2}
                        y2={wheelCenterY}
                        stroke="#14b8a6"
                        strokeWidth="1"
                        strokeDasharray="4 4"
                        opacity={activeStageId === BRIDGE_STAGE.id ? 0.8 : 0.4}
                        className="transition-opacity duration-300 pointer-events-none"
                    />

                    <g filter="url(#intense-glow)" className="pointer-events-none">
                        {[0, 0.4, 0.8].map((d, i) => (
                            <circle key={i} r="2.5" fill="#14b8a6">
                                <animateMotion
                                    path={`M ${bridgeX1} ${wheelCenterY} L ${bridgeX2} ${wheelCenterY}`}
                                    dur="1.2s"
                                    begin={`${d}s`}
                                    repeatCount="indefinite"
                                />
                                <animate attributeName="opacity" values="0;1;1;0" dur="1.2s" begin={`${d}s`} repeatCount="indefinite" />
                            </circle>
                        ))}
                    </g>

                    <foreignObject
                        x={(bridgeX1 + bridgeX2) / 2 - 90}
                        y={wheelCenterY - 45}
                        width="180"
                        height="90"
                        className="overflow-visible pointer-events-none"
                    >
                        <div className="flex flex-col items-center justify-center h-full">
                            <motion.div
                                animate={activeStageId === BRIDGE_STAGE.id ? { scale: 1.1, y: -2 } : { scale: 1, y: 0 }}
                                className={cn(
                                    "px-4 py-2.5 rounded-xl border border-teal-500 bg-[#0f172a] shadow-2xl transition-all",
                                    activeStageId === BRIDGE_STAGE.id ? "border-teal-400 bg-teal-950/40 shadow-teal-500/40" : ""
                                )}
                            >
                                <div className="flex flex-col items-center gap-0.5">
                                    <div className="flex items-center gap-1.5 text-teal-400">
                                        <span className="text-[10px] font-black uppercase tracking-widest">{BRIDGE_STAGE.metricId}</span>
                                        <ArrowRight size={10} weight="bold" />
                                    </div>
                                    <span className="text-xs font-bold text-white whitespace-nowrap">{BRIDGE_STAGE.label}</span>
                                </div>
                            </motion.div>
                        </div>
                    </foreignObject>
                </g>

                {/* --- FUNNEL STAGES --- */}
                {funnelStages.map((stage, i) => {
                    const x1 = funnelX + (i * sectionW)
                    const x2 = x1 + sectionW
                    const pStart = i / funnelStages.length
                    const pEnd = (i + 1) / funnelStages.length
                    const h1 = funnelH * (1 - pStart * taper)
                    const h2 = funnelH * (1 - pEnd * taper)

                    const y1T = wheelCenterY - h1 / 2; const y1B = wheelCenterY + h1 / 2
                    const y2T = wheelCenterY - h2 / 2; const y2B = wheelCenterY + h2 / 2
                    const path = `M ${x1} ${y1T} L ${x2} ${y2T} L ${x2} ${y2B} L ${x1} ${y1B} Z`

                    const isActive = activeStageId === stage.id

                    // Logic to prevent text overlap: Alternating Top and Bottom
                    const isOdd = i % 2 !== 0
                    const labelPivotY = isOdd ? Math.min(y1T, y2T) : Math.max(y1B, y2B)
                    const pinDir = isOdd ? -1 : 1
                    const labelOffsetY = isOdd ? -40 : 40

                    return (
                        <motion.g
                            key={stage.id}
                            className="cursor-pointer"
                            onMouseEnter={(e) => {
                                const rect = e.currentTarget.getBoundingClientRect()
                                const containerRect = e.currentTarget.closest('svg')?.getBoundingClientRect()
                                if (containerRect) {
                                    onStageHover(stage.id, {
                                        x: rect.left - containerRect.left + rect.width / 2,
                                        y: rect.top - containerRect.top
                                    })
                                }
                            }}
                            onMouseLeave={() => onStageLeave(stage.id)}
                            onClick={() => onStageOpen(stage.id)}
                            initial={false}
                            animate={
                                isActive
                                    ? { scale: 1.05, y: -5 }
                                    : i === 0
                                      ? {
                                            scale: [1, 1.04, 1],
                                            y: [0, -3, 0],
                                            transition: {
                                                duration: 1.2,
                                                repeat: 3,
                                                repeatDelay: 0.3,
                                                ease: "easeInOut"
                                            }
                                        }
                                      : { scale: 1, y: 0 }
                            }
                            style={{ transformOrigin: `${(x1 + x2) / 2}px ${wheelCenterY}px` }}
                        >
                            <path d={path} fill={FUNNEL_COLORS[i]} fillOpacity={isActive ? 1 : 0.85} stroke="white" strokeWidth={isActive ? 2 : 0} />
                            <path d={path} fill="url(#volumetric-glass)" pointerEvents="none" />

                            <text
                                x={(x1 + x2) / 2} y={wheelCenterY}
                                textAnchor="middle" dominantBaseline="middle"
                                fill="white" fontWeight="900" fontSize="18"
                                className="pointer-events-none select-none"
                                style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}
                            >
                                {stage.metricId}
                            </text>

                            {/* Staggered Label Logic */}
                            <motion.line
                                x1={(x1 + x2) / 2} y1={labelPivotY + (pinDir * 5)}
                                x2={(x1 + x2) / 2} y2={labelPivotY + (pinDir * 20)}
                                stroke="white" strokeWidth="1" strokeOpacity={isActive ? 0.8 : 0.3}
                            />
                            <text
                                x={(x1 + x2) / 2} y={labelPivotY + labelOffsetY}
                                textAnchor="middle"
                                dominantBaseline={isOdd ? "alphabetic" : "hanging"}
                                fill="white" fontSize="11"
                                fontWeight={isActive ? "bold" : "600"}
                                opacity={isActive ? 1 : 0.8}
                                className="pointer-events-none"
                            >
                                {/* Use a split approach for very long labels if active, or just standard for others */}
                                {stage.label.length > 20 && !isActive ? (stage.shortLabel || stage.label.substring(0, 15) + '...') : stage.label}
                            </text>
                        </motion.g>
                    )
                })}

                {/* --- FLYWHEEL / TURBINE --- */}
                <g className="origin-center">
                    {flywheelMetrics.map((m, i) => {
                        const step = (Math.PI * 2) / flywheelMetrics.length
                        const startAngle = Math.PI + (i * step)
                        const endAngle = Math.PI + ((i + 1) * step)
                        const path = describeArc(innerR, outerR, startAngle, endAngle)
                        const isActive = activeStageId === m.id

                        const midA = (startAngle + endAngle) / 2
                        const labelR_id = (innerR + outerR) / 2
                        const labelR_text = outerR + 40

                        const tx_id = wheelCenterX + labelR_id * Math.cos(midA)
                        const ty_id = wheelCenterY + labelR_id * Math.sin(midA)

                        const tx_label = wheelCenterX + labelR_text * Math.cos(midA)
                        const ty_label = wheelCenterY + labelR_text * Math.sin(midA)

                        const cosA = Math.cos(midA)
                        const anchor = cosA > 0.1 ? 'start' : cosA < -0.1 ? 'end' : 'middle'
                        const dx = cosA > 0.1 ? 5 : cosA < -0.1 ? -5 : 0

                        return (
                            <motion.g
                                key={m.id}
                                className="cursor-pointer"
                                onMouseEnter={(e) => {
                                    const rect = e.currentTarget.getBoundingClientRect()
                                    const containerRect = e.currentTarget.closest('svg')?.getBoundingClientRect()
                                    if (containerRect) {
                                        onStageHover(m.id, {
                                            x: rect.left - containerRect.left + rect.width / 2,
                                            y: rect.top - containerRect.top
                                        })
                                    }
                                }}
                                onMouseLeave={() => onStageLeave(m.id)}
                                onClick={() => onStageOpen(m.id)}
                                animate={isActive ? { scale: 1.08 } : { scale: 1 }}
                                style={{ transformOrigin: `${wheelCenterX}px ${wheelCenterY}px` }}
                            >
                                <path d={path} fill={FLYWHEEL_COLORS[i % FLYWHEEL_COLORS.length]} fillOpacity={isActive ? 1 : 0.8} stroke="white" strokeWidth={isActive ? 2 : 0.5} strokeOpacity={0.2} />
                                <path d={path} fill="url(#volumetric-glass)" pointerEvents="none" />

                                <text
                                    x={tx_id} y={ty_id}
                                    textAnchor="middle" dominantBaseline="middle"
                                    fill="white" fontWeight="900" fontSize="15"
                                    className="pointer-events-none select-none"
                                    style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}
                                >
                                    {m.metricId}
                                </text>

                                <g className="pointer-events-none">
                                    <motion.line
                                        x1={wheelCenterX + (outerR + 2) * Math.cos(midA)}
                                        y1={wheelCenterY + (outerR + 2) * Math.sin(midA)}
                                        x2={wheelCenterX + (outerR + 25) * Math.cos(midA)}
                                        y2={wheelCenterY + (outerR + 25) * Math.sin(midA)}
                                        stroke="white" strokeWidth="1" strokeOpacity={isActive ? 0.8 : 0.3}
                                    />
                                    <text
                                        x={tx_label} y={ty_label}
                                        dx={dx}
                                        textAnchor={anchor}
                                        dominantBaseline="middle"
                                        fill="white"
                                        fontSize="11"
                                        fontWeight={isActive ? "bold" : "600"}
                                        opacity={isActive ? 1 : 0.8}
                                    >
                                        {m.label}
                                    </text>
                                </g>
                            </motion.g>
                        )
                    })}

                    <g className="select-none pointer-events-none">
                        <circle cx={wheelCenterX} cy={wheelCenterY} r={innerR - 6} fill="#0d1f2d" stroke="#10b981" strokeWidth="2.5" />
                        <text x={wheelCenterX} y={wheelCenterY - 2} textAnchor="middle" fill="#10b981" fontWeight="900" fontSize="16">NRR</text>
                        <text x={wheelCenterX} y={wheelCenterY + 12} textAnchor="middle" fill="white" fontSize="9" opacity="0.6" letterSpacing="1">ENGINE</text>
                    </g>

                    <motion.circle
                        cx={wheelCenterX} cy={wheelCenterY} r={outerR + 15}
                        fill="none" stroke="white" strokeOpacity="0.05" strokeWidth="1" strokeDasharray="5 10"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        style={{ transformOrigin: `${wheelCenterX}px ${wheelCenterY}px` }}
                    />
                </g>

            </svg>
        </div>
    )
}

function cn(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}
