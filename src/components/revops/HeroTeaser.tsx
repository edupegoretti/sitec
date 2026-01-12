'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface HeroTeaserProps {
  className?: string
}

export function HeroTeaser({ className }: HeroTeaserProps) {
  // CONFIGURATION
  const size = 500
  const center = size / 2

  // RADII
  const rCore = 55
  const rInnerIn = 65
  const rInnerOut = 125
  const rMainIn = 135
  const rMainOut = 210
  const rHeaderText = 245

  // COLORS
  const colors = {
    // Bitrix24 compatible blue
    crm: '#0F172A',
    atrair: '#FBbf24',
    engajar: '#10B981',
    encantar: '#0EA5E9',
    bg: '#0F172A',
    innerRing: '#1E293B',
  }

  // COORDINATES (0 deg = TOP, Clockwise)
  const p2c = (r: number, deg: number) => {
    const rad = (deg - 90) * Math.PI / 180
    return {
      x: center + r * Math.cos(rad),
      y: center + r * Math.sin(rad)
    }
  }

  // ROBUST PATH GENERATORS
  const describeTextPath = (r: number, start: number, end: number, side: 'top' | 'bottom') => {
    const isTop = side === 'top'
    const pStart = p2c(r, start)
    const pEnd = p2c(r, end)
    const sweep = isTop ? 1 : 0
    return `M ${pStart.x} ${pStart.y} A ${r} ${r} 0 0 ${sweep} ${pEnd.x} ${pEnd.y}`
  }

  const describeSector = (rIn: number, rOut: number, start: number, end: number) => {
    const p1 = p2c(rOut, start)
    const p2 = p2c(rOut, end)
    const p3 = p2c(rIn, end)
    const p4 = p2c(rIn, start)
    const large = Math.abs(end - start) > 180 ? 1 : 0
    return `M ${p1.x} ${p1.y} A ${rOut} ${rOut} 0 ${large} 1 ${p2.x} ${p2.y} L ${p3.x} ${p3.y} A ${rIn} ${rIn} 0 ${large} 0 ${p4.x} ${p4.y} Z`
  }

  const midMain = (rMainIn + rMainOut) / 2
  const midInner = (rInnerIn + rInnerOut) / 2

  return (
    <div className={cn("relative flex items-center justify-center p-4", className)}>
      <div className="absolute inset-0 bg-brand/5 blur-[120px] rounded-full opacity-30 pointer-events-none" />

      <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-auto max-w-[500px] overflow-visible select-none drop-shadow-2xl">
        <defs>
          {/* LABEL PATHS */}
          <path id="tp-atrair" d={describeTextPath(midMain + 6, -50, 50, 'top')} />
          <path id="tp-engajar" d={describeTextPath(midMain - 6, 170, 70, 'bottom')} />
          <path id="tp-encantar" d={describeTextPath(midMain - 6, 290, 190, 'bottom')} />

          {/* INNER RING PATHS */}
          <path id="tp-servico" d={describeTextPath(midInner + 5, -50, 50, 'top')} />
          <path id="tp-market" d={describeTextPath(midInner - 5, 170, 70, 'bottom')} />
          <path id="tp-vendas" d={describeTextPath(midInner - 5, 290, 190, 'bottom')} />

          {/* STATUS LABELS (OUT OF THE CIRCLE) */}
          <path id="tp-status-desc" d={describeTextPath(rHeaderText, -75, -15, 'top')} />
          <path id="tp-status-prosp" d={describeTextPath(rHeaderText, 15, 75, 'top')} />
          <path id="tp-status-cli" d={describeTextPath(rHeaderText - 5, 165, 105, 'bottom')} />
          <path id="tp-status-prom" d={describeTextPath(rHeaderText - 5, 255, 195, 'bottom')} />
        </defs>

        {/* 1. MAIN SECTORS (Outer) */}
        <g>
          <path d={describeSector(rMainIn, rMainOut, -59, 59)} fill={colors.atrair} stroke="white" strokeWidth="3" />
          <text fill="white" fontWeight="900" fontSize="19" className="uppercase tracking-[0.2em] pointer-events-none">
            <textPath href="#tp-atrair" startOffset="50%" textAnchor="middle">ATRAIR</textPath>
          </text>

          <path d={describeSector(rMainIn, rMainOut, 61, 179)} fill={colors.engajar} stroke="white" strokeWidth="3" />
          <text fill="white" fontWeight="900" fontSize="19" className="uppercase tracking-[0.2em] pointer-events-none">
            <textPath href="#tp-engajar" startOffset="50%" textAnchor="middle">ENGAJAR</textPath>
          </text>

          <path d={describeSector(rMainIn, rMainOut, 181, 299)} fill={colors.encantar} stroke="white" strokeWidth="3" />
          <text fill="white" fontWeight="900" fontSize="19" className="uppercase tracking-[0.2em] pointer-events-none">
            <textPath href="#tp-encantar" startOffset="50%" textAnchor="middle">ENCANTAR</textPath>
          </text>
        </g>

        {/* 2. PROCESS RING (Inner) */}
        <g>
          <path d={describeSector(rInnerIn, rInnerOut, -59, 59)} fill={colors.innerRing} />
          <text fill="white" fillOpacity="0.8" fontWeight="600" fontSize="12" className="uppercase tracking-widest pointer-events-none">
            <textPath href="#tp-servico" startOffset="50%" textAnchor="middle">Serviço</textPath>
          </text>

          <path d={describeSector(rInnerIn, rInnerOut, 61, 179)} fill={colors.innerRing} />
          <text fill="white" fillOpacity="0.8" fontWeight="600" fontSize="12" className="uppercase tracking-widest pointer-events-none">
            <textPath href="#tp-market" startOffset="50%" textAnchor="middle">Marketing</textPath>
          </text>

          <path d={describeSector(rInnerIn, rInnerOut, 181, 299)} fill={colors.innerRing} />
          <text fill="white" fillOpacity="0.8" fontWeight="600" fontSize="12" className="uppercase tracking-widest pointer-events-none">
            <textPath href="#tp-vendas" startOffset="50%" textAnchor="middle">Vendas</textPath>
          </text>
        </g>

        {/* 3. CENTER CORE with Bitrix24 Logo */}
        <g>
          <circle cx={center} cy={center} r={rCore} fill={colors.crm} stroke="white" strokeWidth="4" />
          {/* Bitrix24 Logo */}
          <image
            href="/images/Bitrix24_shortlogo.png"
            x={center - (rCore * 0.5)}
            y={center - (rCore * 0.5)}
            width={rCore}
            height={rCore}
          />
        </g>

        {/* 4. STATUS LABELS */}
        <g className="opacity-70 font-bold uppercase tracking-[0.2em] text-[13px] transition-all duration-300">
          <text fill="white"><textPath href="#tp-status-desc" startOffset="50%" textAnchor="middle">Desconhecidos</textPath></text>
          <text fill="white"><textPath href="#tp-status-prosp" startOffset="50%" textAnchor="middle">Prospects</textPath></text>
          <text fill="white"><textPath href="#tp-status-cli" startOffset="50%" textAnchor="middle">Clientes</textPath></text>
          <text fill="white"><textPath href="#tp-status-prom" startOffset="50%" textAnchor="middle">Promotores</textPath></text>
        </g>

        {/* 5. FLOW INDICATORS */}
        {[60, 180, 300].map(deg => {
          const p = p2c(rMainOut + 10, deg)
          return (
            <path
              key={deg}
              d="M -5 -5 L 0 0 L 5 -5"
              stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round"
              transform={`translate(${p.x}, ${p.y}) rotate(${deg - 90})`}
            />
          )
        })}
      </svg>
    </div>
  )
}
