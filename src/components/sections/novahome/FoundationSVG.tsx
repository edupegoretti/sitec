'use client'

import { forwardRef, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useReducedMotion } from 'framer-motion'

const LAYERS = [
  {
    id: 'processo',
    titulo: 'Processo',
    color: '#475569',
    colorLight: '#64748b',
    colorDark: '#334155',
  },
  {
    id: 'adocao',
    titulo: 'Adoção',
    color: '#6366f1',
    colorLight: '#818cf8',
    colorDark: '#4f46e5',
  },
  {
    id: 'sustentacao',
    titulo: 'Sustentação',
    color: '#8b5cf6',
    colorLight: '#a78bfa',
    colorDark: '#7c3aed',
  },
  {
    id: 'evolucao',
    titulo: 'Evolução',
    color: '#10b981',
    colorLight: '#34d399',
    colorDark: '#059669',
  },
] as const

interface FoundationSVGProps {
  activeLayer?: number | null
  visibleLayers?: number
  showGrowth?: boolean
}

/*
 * GEOMETRIA ISOMÉTRICA - PIRÂMIDE MAXIMIZADA
 *
 * ViewBox: 400 x 440 (inclui espaço para apex)
 * Pirâmide ocupa ~90% do espaço horizontal
 * centerX = 200, baseY = 340
 */
const PYRAMID_GEOMETRY = {
  viewBox: { w: 400, h: 440 },
  centerX: 200,
  layers: [
    // Layer 0 - Processo (base maior, r=95)
    {
      base: { front: { x: 200, y: 420 }, right: { x: 390, y: 325 }, back: { x: 200, y: 230 }, left: { x: 10, y: 325 } },
      top: { front: { x: 200, y: 355 }, right: { x: 355, y: 277 }, back: { x: 200, y: 200 }, left: { x: 45, y: 277 } },
    },
    // Layer 1 - Adoção (r=78)
    {
      base: { front: { x: 200, y: 355 }, right: { x: 355, y: 277 }, back: { x: 200, y: 200 }, left: { x: 45, y: 277 } },
      top: { front: { x: 200, y: 295 }, right: { x: 322, y: 233 }, back: { x: 200, y: 170 }, left: { x: 78, y: 233 } },
    },
    // Layer 2 - Sustentação (r=61)
    {
      base: { front: { x: 200, y: 295 }, right: { x: 322, y: 233 }, back: { x: 200, y: 170 }, left: { x: 78, y: 233 } },
      top: { front: { x: 200, y: 238 }, right: { x: 290, y: 190 }, back: { x: 200, y: 142 }, left: { x: 110, y: 190 } },
    },
    // Layer 3 - Evolução (r=45)
    {
      base: { front: { x: 200, y: 238 }, right: { x: 290, y: 190 }, back: { x: 200, y: 142 }, left: { x: 110, y: 190 } },
      top: { front: { x: 200, y: 185 }, right: { x: 260, y: 150 }, back: { x: 200, y: 115 }, left: { x: 140, y: 150 } },
    },
  ],
  apex: { x: 200, y: 60 },
}

export const FoundationSVG = forwardRef<HTMLDivElement, FoundationSVGProps>(
  function FoundationSVG(
    { activeLayer = null, visibleLayers = 0, showGrowth = false },
    ref
  ) {
    const svgRef = useRef<SVGSVGElement>(null)
    const prefersReducedMotion = useReducedMotion()

    // Animação das camadas aparecendo
    useEffect(() => {
      if (!svgRef.current) return

      const duration = prefersReducedMotion ? 0 : 0.6
      const q = gsap.utils.selector(svgRef.current)

      PYRAMID_GEOMETRY.layers.forEach((_, index) => {
        const isBuilt = index < visibleLayers

        gsap.to(q(`.pyramid-layer[data-index="${index}"]`), {
          opacity: isBuilt ? 1 : 0,
          y: isBuilt ? 0 : 20,
          duration,
          ease: 'power2.out',
          overwrite: 'auto',
        })
      })
    }, [prefersReducedMotion, visibleLayers])

    // Animação do layer ativo
    useEffect(() => {
      if (!svgRef.current) return

      const duration = prefersReducedMotion ? 0 : 0.3
      const q = gsap.utils.selector(svgRef.current)

      PYRAMID_GEOMETRY.layers.forEach((_, index) => {
        const isActive = activeLayer === index
        const isBuilt = index < visibleLayers

        gsap.to(q(`.layer-highlight[data-index="${index}"]`), {
          opacity: isActive && isBuilt ? 1 : 0,
          duration,
          ease: 'power2.out',
          overwrite: 'auto',
        })
      })
    }, [activeLayer, prefersReducedMotion, visibleLayers])

    // Animação do apex
    const shouldShowGrowth = showGrowth && visibleLayers >= LAYERS.length

    useEffect(() => {
      if (!svgRef.current) return

      const duration = prefersReducedMotion ? 0 : 0.7
      const q = gsap.utils.selector(svgRef.current)

      gsap.to(q('.apex-group'), {
        opacity: shouldShowGrowth ? 1 : 0,
        y: shouldShowGrowth ? 0 : 15,
        duration,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    }, [prefersReducedMotion, shouldShowGrowth])

    const geo = PYRAMID_GEOMETRY
    const viewBox = `0 0 ${geo.viewBox.w} ${geo.viewBox.h}`

    return (
      <div ref={ref} className="relative w-full mx-auto">
        <svg
          ref={svgRef}
          viewBox={viewBox}
          className="w-full h-auto"
          role="img"
          aria-label="Pirâmide da Arquitetura de Receita"
        >
          <defs>
            {/* Gradientes para cada camada */}
            {LAYERS.map((layer, index) => (
              <linearGradient
                key={`left-${layer.id}`}
                id={`left-${index}`}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor={layer.colorDark} />
                <stop offset="100%" stopColor={layer.color} />
              </linearGradient>
            ))}
            {LAYERS.map((layer, index) => (
              <linearGradient
                key={`right-${layer.id}`}
                id={`right-${index}`}
                x1="100%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor={layer.colorLight} />
                <stop offset="100%" stopColor={layer.color} />
              </linearGradient>
            ))}
            {LAYERS.map((layer, index) => (
              <linearGradient
                key={`top-${layer.id}`}
                id={`top-${index}`}
                x1="0%"
                y1="100%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor={layer.color} />
                <stop offset="100%" stopColor={layer.colorLight} />
              </linearGradient>
            ))}
            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#0f172a" floodOpacity="0.15" />
            </filter>
          </defs>

          {/* Sombra no chão - posicionada abaixo da base da pirâmide */}
          <ellipse
            cx={geo.centerX}
            cy={428}
            rx={170}
            ry={35}
            fill="rgba(15, 23, 42, 0.12)"
          />

          {/* Camadas da pirâmide */}
          <g filter="url(#shadow)">
            {geo.layers.map((layerGeo, index) => {
              const layer = LAYERS[index]
              const { base, top } = layerGeo

              // Face esquerda (front-left)
              const leftFace = `M ${base.front.x} ${base.front.y} L ${base.left.x} ${base.left.y} L ${top.left.x} ${top.left.y} L ${top.front.x} ${top.front.y} Z`

              // Face direita (front-right)
              const rightFace = `M ${base.front.x} ${base.front.y} L ${base.right.x} ${base.right.y} L ${top.right.x} ${top.right.y} L ${top.front.x} ${top.front.y} Z`

              // Face superior
              const topFace = `M ${top.front.x} ${top.front.y} L ${top.right.x} ${top.right.y} L ${top.back.x} ${top.back.y} L ${top.left.x} ${top.left.y} Z`

              // Outline para highlight
              const outline = `M ${base.left.x} ${base.left.y} L ${base.front.x} ${base.front.y} L ${base.right.x} ${base.right.y} L ${top.right.x} ${top.right.y} L ${top.front.x} ${top.front.y} L ${top.left.x} ${top.left.y} Z`

              return (
                <g
                  key={layer.id}
                  className="pyramid-layer"
                  data-index={index}
                  opacity="0"
                >
                  <path d={leftFace} fill={`url(#left-${index})`} />
                  <path d={rightFace} fill={`url(#right-${index})`} />
                  <path d={topFace} fill={`url(#top-${index})`} />

                  {/* Highlight edges */}
                  <path
                    d={`M ${top.left.x} ${top.left.y} L ${top.front.x} ${top.front.y} L ${top.right.x} ${top.right.y}`}
                    fill="none"
                    stroke="rgba(255,255,255,0.4)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />

                  {/* Active highlight */}
                  <path
                    className="layer-highlight"
                    data-index={index}
                    d={outline}
                    fill="none"
                    stroke={layer.colorLight}
                    strokeWidth="3"
                    opacity="0"
                  />
                </g>
              )
            })}
          </g>

          {/* Apex - Crescimento */}
          <g className="apex-group" opacity="0">
            {/* Linha conectora do apex até o topo da pirâmide */}
            <line
              x1={geo.apex.x}
              y1={geo.apex.y + 20}
              x2={geo.apex.x}
              y2={geo.layers[3].top.back.y + 5}
              stroke="#10b981"
              strokeWidth="2"
              strokeDasharray="5 3"
              opacity="0.7"
            />
            {/* Diamante isométrico no apex */}
            <polygon
              points={`${geo.apex.x},${geo.apex.y - 6} ${geo.apex.x + 12},${geo.apex.y + 8} ${geo.apex.x},${geo.apex.y + 22} ${geo.apex.x - 12},${geo.apex.y + 8}`}
              fill="#10b981"
            />
            <polygon
              points={`${geo.apex.x},${geo.apex.y} ${geo.apex.x + 7},${geo.apex.y + 8} ${geo.apex.x},${geo.apex.y + 16} ${geo.apex.x - 7},${geo.apex.y + 8}`}
              fill="#34d399"
            />
            {/* Seta indicando crescimento */}
            <path
              d={`M ${geo.apex.x} ${geo.apex.y - 20} L ${geo.apex.x - 6} ${geo.apex.y - 11} M ${geo.apex.x} ${geo.apex.y - 20} L ${geo.apex.x + 6} ${geo.apex.y - 11}`}
              stroke="#10b981"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            {/* Label CRESCIMENTO */}
            <text
              x={geo.apex.x}
              y={geo.apex.y - 30}
              fill="#059669"
              fontSize="14"
              fontWeight="700"
              fontFamily="system-ui, sans-serif"
              textAnchor="middle"
              letterSpacing="1"
            >
              CRESCIMENTO
            </text>
          </g>
        </svg>
      </div>
    )
  }
)
