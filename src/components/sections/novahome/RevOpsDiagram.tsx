'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface RevOpsDiagramProps {
  className?: string
}

export function RevOpsDiagram({ className }: RevOpsDiagramProps) {
  const [activeSegment, setActiveSegment] = useState<string | null>(null)

  // CONFIGURATION
  const size = 700
  const center = size / 2

  // RADII - Matching the original image structure precisely
  const rCore = 70                    // Centro - Revenue Operations
  const rDataIn = 75                  // Data & Analytics inner
  const rDataOut = 115                // Data & Analytics outer
  const rOpsIn = 120                  // Operations ring inner
  const rOpsOut = 200                 // Operations ring outer
  const rTechIn = 205                 // Technology Stack inner
  const rTechOut = 260                // Technology Stack outer
  const rFeedbackIn = 265             // Feedback ring inner
  const rFeedbackOut = 330            // Feedback ring outer

  // COLORS - Based on original image (blues and teals)
  const colors = {
    feedback: '#1a365d',       // Dark navy blue (outer)
    feedbackLight: '#2c5282',  // Slightly lighter navy
    tech: '#2b6cb0',           // Medium blue
    ops: '#319795',            // Teal
    opsSegment: '#4fd1c5',     // Lighter teal for segments
    data: '#81e6d9',           // Light teal
    dataLight: '#b2f5ea',      // Very light teal
    core: '#e6fffa',           // Very light (almost white)
    coreStroke: '#38b2ac',
    textDark: '#1a365d',
    textLight: '#ffffff',
    divider: '#ffffff',
    strokeLight: 'rgba(255,255,255,0.8)',
  }

  // SEGMENT DATA
  const segments = {
    marketing: {
      name: 'Marketing Operations',
      description: 'Lead generation and acquisition',
      items: ['Sales and Lead generation']
    },
    sales: {
      name: 'Sales Operations',
      description: 'Pipeline and commercial processes',
      items: ['Pipeline Management', 'Sales Processes']
    },
    success: {
      name: 'Customer Success Operations',
      description: 'Retention and expansion',
      items: ['Customer Retention', 'Upselling', 'Lifetime Value']
    }
  }

  // COORDINATES (0 deg = TOP, Clockwise)
  const p2c = (r: number, deg: number) => {
    const rad = (deg - 90) * Math.PI / 180
    return {
      x: center + r * Math.cos(rad),
      y: center + r * Math.sin(rad)
    }
  }

  // Arc path - always draws from start to end clockwise
  const describeArc = (r: number, startDeg: number, endDeg: number, clockwise: boolean = true) => {
    const pStart = p2c(r, startDeg)
    const pEnd = p2c(r, endDeg)
    const largeArc = Math.abs(endDeg - startDeg) > 180 ? 1 : 0
    const sweep = clockwise ? 1 : 0
    return `M ${pStart.x} ${pStart.y} A ${r} ${r} 0 ${largeArc} ${sweep} ${pEnd.x} ${pEnd.y}`
  }

  // For bottom text (reads left to right when on bottom half) - reverse the arc
  const describeArcReversed = (r: number, startDeg: number, endDeg: number) => {
    const pStart = p2c(r, endDeg)
    const pEnd = p2c(r, startDeg)
    const largeArc = Math.abs(endDeg - startDeg) > 180 ? 1 : 0
    return `M ${pStart.x} ${pStart.y} A ${r} ${r} 0 ${largeArc} 0 ${pEnd.x} ${pEnd.y}`
  }

  // Sector path for colored segments
  const describeSector = (rIn: number, rOut: number, start: number, end: number) => {
    const p1 = p2c(rOut, start)
    const p2 = p2c(rOut, end)
    const p3 = p2c(rIn, end)
    const p4 = p2c(rIn, start)
    const large = Math.abs(end - start) > 180 ? 1 : 0
    return `M ${p1.x} ${p1.y} A ${rOut} ${rOut} 0 ${large} 1 ${p2.x} ${p2.y} L ${p3.x} ${p3.y} A ${rIn} ${rIn} 0 ${large} 0 ${p4.x} ${p4.y} Z`
  }

  const rOpsDivider = rOpsIn + 35
  const rOpsSubInner = rOpsIn + 12
  const rOpsSubOuter = rOpsDivider - 3
  const rOpsSubMid = (rOpsSubInner + rOpsSubOuter) / 2
  const rOpsOuterLabel = rOpsOut - 12

  const segmentOpacity = (base: number, id: string) => (
    activeSegment ? (activeSegment === id ? base : base * 0.6) : base
  )

  const midFeedback = (rFeedbackIn + rFeedbackOut) / 2
  const midTech = (rTechIn + rTechOut) / 2
  const midData = (rDataIn + rDataOut) / 2

  const activeData = activeSegment ? segments[activeSegment as keyof typeof segments] : null

  return (
    <div className={cn("relative flex items-center justify-center p-4", className)}>
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="w-full h-auto max-w-[700px] overflow-visible select-none drop-shadow-2xl"
        role="img"
        aria-label="RevOps diagram with continuous feedback and monitoring across technology stack, operations, and data analytics"
      >
        <defs>
          {/* =================================== */}
          {/* MARKERS */}
          {/* =================================== */}
          <marker
            id="arrow-head"
            markerWidth="10"
            markerHeight="10"
            refX="8"
            refY="5"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <path d="M0,0 L10,5 L0,10 L3,5 Z" fill={colors.textLight} />
          </marker>

          {/* =================================== */}
          {/* TEXT PATH DEFINITIONS */}
          {/* =================================== */}

          {/* Main title - Continuous Feedback & Monitoring (top arc, -80° to 80°) */}
          <path id="tp-main-title" d={describeArc(midFeedback, -80, 80)} />

          {/* Tracking (left side) - reads bottom to top */}
          <path id="tp-tracking" d={describeArc(midFeedback, 250, 290)} />

          {/* Feedback (right side) - reads top to bottom */}
          <path id="tp-feedback-label" d={describeArc(midFeedback, 70, 110)} />

          {/* Optimization (bottom) - reads left to right */}
          <path id="tp-optimization" d={describeArcReversed(midFeedback, 160, 200)} />

          {/* Technology Stack (bottom, 130° to 230°) - reversed */}
          <path id="tp-tech-stack" d={describeArcReversed(midTech, 135, 225)} />

          {/* Marketing Operations (top section, -50° to 50°) */}
          <path id="tp-marketing-ops" d={describeArc(rOpsOuterLabel, -55, 55)} />

          {/* Sales Operations (left section) - reads bottom to top */}
          <path id="tp-sales-ops" d={describeArc(rOpsOuterLabel, 190, 300)} />

          {/* Customer Success Operations (right section) - reads top to bottom */}
          <path id="tp-success-ops" d={describeArc(rOpsOuterLabel, 60, 170)} />

          {/* Sales and Lead generation (inner band, top) */}
          <path id="tp-marketing-sub" d={describeArc(rOpsSubMid, -50, 50)} />

          {/* Sales Operations sub-segments (inner band, left) - reads bottom to top */}
          <path id="tp-pipeline" d={describeArc(rOpsSubInner, 244, 296)} />
          <path id="tp-management" d={describeArc(rOpsSubOuter, 244, 296)} />
          <path id="tp-sales-processes" d={describeArc(rOpsSubOuter, 184, 236)} />

          {/* Customer Success sub-segments (inner band, right) - reads top to bottom */}
          <path id="tp-customer" d={describeArc(rOpsSubInner, 64, 96)} />
          <path id="tp-retention" d={describeArc(rOpsSubOuter, 64, 96)} />
          <path id="tp-upselling" d={describeArc(rOpsSubOuter, 104, 136)} />
          <path id="tp-lifetime" d={describeArc(rOpsSubInner, 144, 176)} />
          <path id="tp-value" d={describeArc(rOpsSubOuter, 144, 176)} />

          {/* Data and Analytics (top arc, -65° to 65°) */}
          <path id="tp-data-analytics" d={describeArc(midData, -65, 65)} />
        </defs>

        {/* ============================================ */}
        {/* 1. OUTER FEEDBACK RING (Dark Navy) */}
        {/* ============================================ */}
        <g>
          <circle cx={center} cy={center} r={rFeedbackOut} fill={colors.feedback} />
          <circle cx={center} cy={center} r={rFeedbackIn} fill={colors.tech} />
          <circle
            cx={center}
            cy={center}
            r={rFeedbackOut}
            fill="none"
            stroke={colors.strokeLight}
            strokeWidth="2"
            strokeOpacity="0.6"
          />
          <circle
            cx={center}
            cy={center}
            r={rFeedbackIn}
            fill="none"
            stroke={colors.strokeLight}
            strokeWidth="2"
            strokeOpacity="0.8"
          />

          {/* Flow arcs - clockwise arrows between text labels */}
          {/* Arrow between Tracking and Continuous (top-left, ~295° to 330°) */}
          <path
            d={describeArc(midFeedback, 295, 335)}
            fill="none"
            stroke={colors.textLight}
            strokeWidth="2"
            strokeOpacity="0.7"
            strokeLinecap="round"
            markerEnd="url(#arrow-head)"
          />
          {/* Arrow after Continuous Feedback (top-right, ~25° to 65°) */}
          <path
            d={describeArc(midFeedback, 25, 65)}
            fill="none"
            stroke={colors.textLight}
            strokeWidth="2"
            strokeOpacity="0.7"
            strokeLinecap="round"
            markerEnd="url(#arrow-head)"
          />
          {/* Arrow between Feedback and Optimization (bottom-right, ~115° to 155°) */}
          <path
            d={describeArc(midFeedback, 115, 155)}
            fill="none"
            stroke={colors.textLight}
            strokeWidth="2"
            strokeOpacity="0.7"
            strokeLinecap="round"
            markerEnd="url(#arrow-head)"
          />
          {/* Arrow between Optimization and Tracking (bottom-left, ~205° to 245°) */}
          <path
            d={describeArc(midFeedback, 205, 245)}
            fill="none"
            stroke={colors.textLight}
            strokeWidth="2"
            strokeOpacity="0.7"
            strokeLinecap="round"
            markerEnd="url(#arrow-head)"
          />

          {/* Main title - Continuous Feedback & Monitoring */}
          <text
            fill={colors.textLight}
            fontWeight="600"
            fontSize="20"
            letterSpacing="0.5"
            textAnchor="middle"
            className="pointer-events-none"
          >
            <textPath href="#tp-main-title" startOffset="50%">
              Continuous Feedback &amp; Monitoring
            </textPath>
          </text>

          {/* Tracking (left) */}
          <text
            fill={colors.textLight}
            fontWeight="600"
            fontSize="16"
            letterSpacing="0.5"
            textAnchor="middle"
            className="pointer-events-none"
          >
            <textPath href="#tp-tracking" startOffset="50%">
              Tracking
            </textPath>
          </text>

          {/* Feedback (right) */}
          <text
            fill={colors.textLight}
            fontWeight="600"
            fontSize="16"
            letterSpacing="0.5"
            textAnchor="middle"
            className="pointer-events-none"
          >
            <textPath href="#tp-feedback-label" startOffset="50%">
              Feedback
            </textPath>
          </text>

          {/* Optimization (bottom) */}
          <text
            fill={colors.textLight}
            fontWeight="600"
            fontSize="16"
            letterSpacing="0.5"
            textAnchor="middle"
            className="pointer-events-none"
          >
            <textPath href="#tp-optimization" startOffset="50%">
              Optimization
            </textPath>
          </text>
        </g>

        {/* ============================================ */}
        {/* 2. TECHNOLOGY STACK RING */}
        {/* ============================================ */}
        <g>
          <circle cx={center} cy={center} r={rTechOut} fill={colors.tech} />
          <circle cx={center} cy={center} r={rTechIn} fill={colors.ops} />
          <circle
            cx={center}
            cy={center}
            r={rTechOut}
            fill="none"
            stroke={colors.strokeLight}
            strokeWidth="2"
          />
          <circle
            cx={center}
            cy={center}
            r={rTechIn}
            fill="none"
            stroke={colors.strokeLight}
            strokeWidth="1.5"
          />

          {/* Technology Stack label */}
          <text
            fill={colors.textLight}
            fontWeight="600"
            fontSize="18"
            letterSpacing="0.5"
            textAnchor="middle"
            className="pointer-events-none"
          >
            <textPath href="#tp-tech-stack" startOffset="50%">
              Technology Stack
            </textPath>
          </text>

          {/* CRM - bottom center */}
          <text
            x={center}
            y={center + rTechIn + 30}
            textAnchor="middle"
            dominantBaseline="middle"
            fill={colors.textLight}
            fontSize="12"
            fontWeight="500"
          >
            CRM
          </text>

          {/* Analytics Platform - bottom left, rotated to follow the curve */}
          <text
            x={p2c(midTech, 240).x}
            y={p2c(midTech, 240).y}
            textAnchor="middle"
            dominantBaseline="middle"
            fill={colors.textLight}
            fontSize="11"
            fontWeight="500"
            transform={`rotate(${240 - 90}, ${p2c(midTech, 240).x}, ${p2c(midTech, 240).y})`}
          >
            Analytics Platform
          </text>

          {/* Automation Solutions - bottom right, rotated to follow the curve */}
          <text
            x={p2c(midTech, 120).x}
            y={p2c(midTech, 120).y}
            textAnchor="middle"
            dominantBaseline="middle"
            fill={colors.textLight}
            fontSize="11"
            fontWeight="500"
            transform={`rotate(${120 - 90}, ${p2c(midTech, 120).x}, ${p2c(midTech, 120).y})`}
          >
            Automation Solutions
          </text>
        </g>

        {/* ============================================ */}
        {/* 3. OPERATIONS RING (Teal Area with 3 sections) */}
        {/* ============================================ */}
        <g>
          {/* Background segments with slightly different shades */}
          <path
            d={describeSector(rOpsIn, rOpsOut, -60, 60)}
            fill={colors.opsSegment}
            opacity={segmentOpacity(1, 'marketing')}
          />
          <path
            d={describeSector(rOpsIn, rOpsOut, 60, 180)}
            fill={colors.opsSegment}
            opacity={segmentOpacity(1, 'success')}
          />
          <path
            d={describeSector(rOpsIn, rOpsOut, 180, 300)}
            fill={colors.opsSegment}
            opacity={segmentOpacity(1, 'sales')}
          />

          {/* Inner circle to create the ring */}
          <circle cx={center} cy={center} r={rOpsIn} fill={colors.dataLight} />
          <circle
            cx={center}
            cy={center}
            r={rOpsDivider}
            fill="none"
            stroke={colors.strokeLight}
            strokeWidth="1.5"
          />
          <circle
            cx={center}
            cy={center}
            r={rOpsOut}
            fill="none"
            stroke={colors.strokeLight}
            strokeWidth="2"
          />
          <circle
            cx={center}
            cy={center}
            r={rOpsIn}
            fill="none"
            stroke={colors.strokeLight}
            strokeWidth="2"
          />

          {/* Divider lines for 3 sections */}
          <line
            x1={p2c(rOpsIn, -60).x}
            y1={p2c(rOpsIn, -60).y}
            x2={p2c(rOpsOut, -60).x}
            y2={p2c(rOpsOut, -60).y}
            stroke={colors.divider}
            strokeWidth="2"
          />
          <line
            x1={p2c(rOpsIn, 60).x}
            y1={p2c(rOpsIn, 60).y}
            x2={p2c(rOpsOut, 60).x}
            y2={p2c(rOpsOut, 60).y}
            stroke={colors.divider}
            strokeWidth="2"
          />
          <line
            x1={p2c(rOpsIn, 180).x}
            y1={p2c(rOpsIn, 180).y}
            x2={p2c(rOpsOut, 180).x}
            y2={p2c(rOpsOut, 180).y}
            stroke={colors.divider}
            strokeWidth="2"
          />

          {/* Sub-segment dividers (inner band) */}
          <line
            x1={p2c(rOpsIn, 240).x}
            y1={p2c(rOpsIn, 240).y}
            x2={p2c(rOpsDivider, 240).x}
            y2={p2c(rOpsDivider, 240).y}
            stroke={colors.divider}
            strokeWidth="1.5"
          />
          <line
            x1={p2c(rOpsIn, 100).x}
            y1={p2c(rOpsIn, 100).y}
            x2={p2c(rOpsDivider, 100).x}
            y2={p2c(rOpsDivider, 100).y}
            stroke={colors.divider}
            strokeWidth="1.5"
          />
          <line
            x1={p2c(rOpsIn, 140).x}
            y1={p2c(rOpsIn, 140).y}
            x2={p2c(rOpsDivider, 140).x}
            y2={p2c(rOpsDivider, 140).y}
            stroke={colors.divider}
            strokeWidth="1.5"
          />

          {/* MARKETING OPERATIONS (Top) -60° to 60° */}
          <motion.g
            animate={{ opacity: activeSegment ? (activeSegment === 'marketing' ? 1 : 0.6) : 1 }}
            onMouseEnter={() => setActiveSegment('marketing')}
            onMouseLeave={() => setActiveSegment(null)}
            className="cursor-pointer"
          >
            <path
              d={describeSector(rOpsIn, rOpsOut, -60, 60)}
              fill="transparent"
              pointerEvents="all"
            />
            <text fill={colors.textDark} fontWeight="600" fontSize="14" textAnchor="middle" className="pointer-events-none">
              <textPath href="#tp-marketing-ops" startOffset="50%">
                Marketing Operations
              </textPath>
            </text>
            {/* Sub-item: Sales and Lead generation */}
            <text
              fill={colors.textDark}
              fontSize="9"
              fontWeight="500"
              textAnchor="middle"
              className="pointer-events-none"
            >
              <textPath href="#tp-marketing-sub" startOffset="50%">
                Sales and Lead generation
              </textPath>
            </text>
          </motion.g>

          {/* SALES OPERATIONS (Left) 180° to 320° */}
          <motion.g
            animate={{ opacity: activeSegment ? (activeSegment === 'sales' ? 1 : 0.6) : 1 }}
            onMouseEnter={() => setActiveSegment('sales')}
            onMouseLeave={() => setActiveSegment(null)}
            className="cursor-pointer"
          >
            <path
              d={describeSector(rOpsIn, rOpsOut, 180, 300)}
              fill="transparent"
              pointerEvents="all"
            />
            <text fill={colors.textDark} fontWeight="600" fontSize="14" textAnchor="middle" className="pointer-events-none">
              <textPath href="#tp-sales-ops" startOffset="50%">
                Sales Operations
              </textPath>
            </text>
            {/* Sub-items - positioned in readable orientation */}
            {/* Pipeline Management - upper left area */}
            <text
              fill={colors.textDark}
              fontSize="8"
              fontWeight="500"
              textAnchor="middle"
              className="pointer-events-none"
            >
              <textPath href="#tp-pipeline" startOffset="50%">
                Pipeline
              </textPath>
            </text>
            <text
              fill={colors.textDark}
              fontSize="8"
              fontWeight="500"
              textAnchor="middle"
              className="pointer-events-none"
            >
              <textPath href="#tp-management" startOffset="50%">
                Management
              </textPath>
            </text>
            {/* Sales Processes - lower left area */}
            <text
              fill={colors.textDark}
              fontSize="8"
              fontWeight="500"
              textAnchor="middle"
              className="pointer-events-none"
            >
              <textPath href="#tp-sales-processes" startOffset="50%">
                Sales Processes
              </textPath>
            </text>
          </motion.g>

          {/* CUSTOMER SUCCESS OPERATIONS (Right) 40° to 160° */}
          <motion.g
            animate={{ opacity: activeSegment ? (activeSegment === 'success' ? 1 : 0.6) : 1 }}
            onMouseEnter={() => setActiveSegment('success')}
            onMouseLeave={() => setActiveSegment(null)}
            className="cursor-pointer"
          >
            <path
              d={describeSector(rOpsIn, rOpsOut, 60, 180)}
              fill="transparent"
              pointerEvents="all"
            />
            <text fill={colors.textDark} fontWeight="600" fontSize="12" textAnchor="middle" className="pointer-events-none">
              <textPath href="#tp-success-ops" startOffset="50%">
                Customer Success Operations
              </textPath>
            </text>
            {/* Sub-items - positioned in readable orientation */}
            {/* Customer Retention - upper right area */}
            <text
              fill={colors.textDark}
              fontSize="8"
              fontWeight="500"
              textAnchor="middle"
              className="pointer-events-none"
            >
              <textPath href="#tp-customer" startOffset="50%">
                Customer
              </textPath>
            </text>
            <text
              fill={colors.textDark}
              fontSize="8"
              fontWeight="500"
              textAnchor="middle"
              className="pointer-events-none"
            >
              <textPath href="#tp-retention" startOffset="50%">
                Retention
              </textPath>
            </text>
            {/* Upselling - middle right area */}
            <text
              fill={colors.textDark}
              fontSize="8"
              fontWeight="500"
              textAnchor="middle"
              className="pointer-events-none"
            >
              <textPath href="#tp-upselling" startOffset="50%">
                Upselling
              </textPath>
            </text>
            {/* Lifetime Value - lower right area */}
            <text
              fill={colors.textDark}
              fontSize="8"
              fontWeight="500"
              textAnchor="middle"
              className="pointer-events-none"
            >
              <textPath href="#tp-lifetime" startOffset="50%">
                Lifetime
              </textPath>
            </text>
            <text
              fill={colors.textDark}
              fontSize="8"
              fontWeight="500"
              textAnchor="middle"
              className="pointer-events-none"
            >
              <textPath href="#tp-value" startOffset="50%">
                Value
              </textPath>
            </text>
          </motion.g>
        </g>

        {/* ============================================ */}
        {/* 4. DATA & ANALYTICS RING */}
        {/* ============================================ */}
        <g>
          <circle cx={center} cy={center} r={rDataOut} fill={colors.dataLight} />
          <circle cx={center} cy={center} r={rDataIn} fill={colors.core} stroke={colors.strokeLight} strokeWidth="2" />
          <circle cx={center} cy={center} r={rDataOut} fill="none" stroke={colors.strokeLight} strokeWidth="2" />

          <text
            fill={colors.textDark}
            fontWeight="600"
            fontSize="16"
            fontStyle="italic"
            textAnchor="middle"
            className="pointer-events-none"
          >
            <textPath href="#tp-data-analytics" startOffset="50%">
              Data and Analytics
            </textPath>
          </text>
        </g>

        {/* ============================================ */}
        {/* 5. CENTER CORE */}
        {/* ============================================ */}
        <g>
          <circle
            cx={center}
            cy={center}
            r={rCore}
            fill={colors.core}
            stroke={colors.coreStroke}
            strokeWidth="3"
          />
          <text
            x={center}
            y={center - 15}
            textAnchor="middle"
            fill={colors.textDark}
            fontSize="16"
            fontWeight="700"
          >
            Revenue
          </text>
          <text
            x={center}
            y={center + 5}
            textAnchor="middle"
            fill={colors.textDark}
            fontSize="16"
            fontWeight="700"
          >
            Operations
          </text>
          <text
            x={center}
            y={center + 28}
            textAnchor="middle"
            fill={colors.textDark}
            fontSize="14"
            fontWeight="600"
          >
            (RevOps)
          </text>
        </g>
      </svg>

      {/* ============================================ */}
      {/* FLOATING TOOLTIP */}
      {/* ============================================ */}
      <AnimatePresence>
        {activeData && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 translate-y-full bg-slate-900 rounded-xl px-5 py-4 border border-white/10 shadow-2xl z-10 min-w-[220px]"
          >
            <p className="text-white font-bold text-sm mb-1">
              {activeData.name}
            </p>
            <p className="text-gray-400 text-xs mb-3">
              {activeData.description}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {activeData.items.map((item, i) => (
                <span
                  key={i}
                  className="text-[10px] px-2 py-0.5 bg-white/10 text-white/80 rounded-full"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
