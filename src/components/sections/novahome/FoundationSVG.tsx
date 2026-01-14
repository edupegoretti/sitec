'use client'

import { forwardRef, useEffect, useMemo, useRef } from 'react'
import gsap from 'gsap'
import { useReducedMotion } from 'framer-motion'

const LAYERS = [
  {
    id: 'processo',
    numero: '01',
    titulo: 'Processo',
    subtitulo: 'A fundação',
    accent: '#334155',
  },
  {
    id: 'adocao',
    numero: '02',
    titulo: 'Adoção',
    subtitulo: 'Por função',
    accent: '#635BFF',
  },
  {
    id: 'sustentacao',
    numero: '03',
    titulo: 'Sustentação',
    subtitulo: 'Contínua',
    accent: '#7C3AED',
  },
  {
    id: 'evolucao',
    numero: '04',
    titulo: 'Evolução',
    subtitulo: 'Com o negócio',
    accent: '#10B981',
  },
] as const

function hexToRgb(hex: string) {
  const normalized = hex.replace('#', '').trim()
  const value =
    normalized.length === 3
      ? normalized
          .split('')
          .map((c) => c + c)
          .join('')
      : normalized

  const int = Number.parseInt(value, 16)
  const r = (int >> 16) & 255
  const g = (int >> 8) & 255
  const b = int & 255
  return { r, g, b }
}

function rgba(hex: string, alpha: number) {
  const { r, g, b } = hexToRgb(hex)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

interface FoundationSVGProps {
  activeLayer?: number | null
  visibleLayers?: number
  showGrowth?: boolean
}

export const FoundationSVG = forwardRef<HTMLDivElement, FoundationSVGProps>(
  function FoundationSVG(
    { activeLayer = null, visibleLayers = 0, showGrowth = false },
    ref
  ) {
    const svgRef = useRef<SVGSVGElement>(null)
    const prefersReducedMotion = useReducedMotion()

    const geometry = useMemo(() => {
      const viewBox = { w: 520, h: 520 }
      const layer = {
        x: 160,
        w: 320,
        h: 64,
        r: 18,
        baseY: 360,
        offset: 72,
      }

      const frames = Array.from({ length: LAYERS.length }, (_, index) => {
        const y = layer.baseY - index * layer.offset
        return { x: layer.x, y, w: layer.w, h: layer.h, r: layer.r }
      })

      const spineX = 96
      const topY = frames[frames.length - 1].y + frames[frames.length - 1].h / 2
      const bottomY = frames[0].y + frames[0].h / 2
      const connectorLen = frames[0].x - spineX - 12

      const growth = {
        x: frames[frames.length - 1].x + frames[frames.length - 1].w - 150,
        y: 56,
        w: 140,
        h: 86,
      }

      return { viewBox, frames, spineX, topY, bottomY, connectorLen, growth }
    }, [])

    useEffect(() => {
      if (!svgRef.current) return

      const duration = prefersReducedMotion ? 0 : 0.55
      const microDuration = prefersReducedMotion ? 0 : 0.35
      const q = gsap.utils.selector(svgRef.current)

      LAYERS.forEach((_, index) => {
        const isBuilt = index < visibleLayers
        const frame = geometry.frames[index]

        gsap.to(q(`.reveal-rect[data-index="${index}"]`), {
          attr: {
            y: isBuilt ? frame.y : frame.y + frame.h,
            height: isBuilt ? frame.h : 0,
          },
          duration,
          ease: 'power3.out',
          overwrite: 'auto',
        })

        gsap.to(q(`.foundation-layer[data-index="${index}"]`), {
          opacity: isBuilt ? 1 : 0,
          duration,
          ease: 'power3.out',
          overwrite: 'auto',
        })

        gsap.to(q(`.step-node[data-index="${index}"] .node-fill`), {
          opacity: isBuilt ? 1 : 0,
          scale: isBuilt ? 1 : 0,
          duration: microDuration,
          ease: 'back.out(1.7)',
          transformOrigin: 'center',
          overwrite: 'auto',
        })
      })
    }, [geometry, prefersReducedMotion, visibleLayers])

    useEffect(() => {
      if (!svgRef.current) return

      const microDuration = prefersReducedMotion ? 0 : 0.35
      const q = gsap.utils.selector(svgRef.current)

      LAYERS.forEach((_, index) => {
        const isActive = activeLayer === index

        gsap.to(q(`.foundation-layer[data-index="${index}"] .layer-highlight`), {
          opacity: isActive ? 1 : 0,
          duration: microDuration,
          ease: 'power2.out',
          overwrite: 'auto',
        })

        gsap.to(q(`.step-node[data-index="${index}"] .node-ring`), {
          opacity: isActive ? 1 : 0,
          scale: isActive ? 1 : 0.92,
          duration: microDuration,
          ease: 'power2.out',
          transformOrigin: 'center',
          overwrite: 'auto',
        })

        gsap.to(q(`.step-node[data-index="${index}"] .node-connector`), {
          opacity: isActive ? 1 : 0,
          scaleX: isActive ? 1 : 0,
          duration: microDuration,
          ease: 'power3.out',
          transformOrigin: 'left center',
          overwrite: 'auto',
        })
      })
    }, [activeLayer, prefersReducedMotion])

    const shouldShowGrowth = showGrowth && visibleLayers >= LAYERS.length

    useEffect(() => {
      if (!svgRef.current) return

      const duration = prefersReducedMotion ? 0 : 0.55
      const microDuration = prefersReducedMotion ? 0 : 0.35
      const q = gsap.utils.selector(svgRef.current)

      gsap.to(q('.growth'), {
        opacity: shouldShowGrowth ? 1 : 0,
        y: shouldShowGrowth ? 0 : 12,
        duration,
        ease: 'power3.out',
        overwrite: 'auto',
      })

      const growthPath = svgRef.current.querySelector(
        '.growth-line'
      ) as SVGPathElement | null
      if (growthPath) {
        const length = growthPath.getTotalLength()
        gsap.set(growthPath, {
          strokeDasharray: length,
          strokeDashoffset: length,
        })
        gsap.to(growthPath, {
          strokeDashoffset: shouldShowGrowth ? 0 : length,
          duration: prefersReducedMotion ? 0 : 0.9,
          ease: 'power2.out',
          delay: shouldShowGrowth && !prefersReducedMotion ? 0.12 : 0,
          overwrite: 'auto',
        })
      }

      gsap.to(q('.growth-dot'), {
        opacity: shouldShowGrowth ? 1 : 0,
        scale: shouldShowGrowth ? 1 : 0,
        duration: microDuration,
        ease: 'back.out(1.7)',
        delay: shouldShowGrowth && !prefersReducedMotion ? 0.62 : 0,
        transformOrigin: 'center',
        overwrite: 'auto',
      })
    }, [prefersReducedMotion, shouldShowGrowth])

    const viewBox = `0 0 ${geometry.viewBox.w} ${geometry.viewBox.h}`

    return (
      <div ref={ref} className="relative w-full max-w-md mx-auto">
        <svg
          ref={svgRef}
          viewBox={viewBox}
          className="w-full h-auto"
          role="img"
          aria-label="Camadas de fundação da Arquitetura de Receita"
        >
          <defs>
            <pattern
              id="blueprint-grid"
              width="24"
              height="24"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 24 0 L 0 0 0 24"
                fill="none"
                stroke={rgba('#635BFF', 0.08)}
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
            </pattern>

            <pattern
              id="brick-pattern"
              width="28"
              height="18"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M0 0 H28 M0 9 H28 M0 18 H28"
                fill="none"
                stroke={rgba('#0F172A', 0.2)}
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M0 0 V9 M14 0 V9 M28 0 V9"
                fill="none"
                stroke={rgba('#0F172A', 0.16)}
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M7 9 V18 M21 9 V18"
                fill="none"
                stroke={rgba('#0F172A', 0.16)}
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
            </pattern>

            <filter
              id="soft-shadow"
              x="-20%"
              y="-20%"
              width="140%"
              height="160%"
              colorInterpolationFilters="sRGB"
            >
              <feDropShadow
                dx="0"
                dy="10"
                stdDeviation="10"
                floodColor="#0F172A"
                floodOpacity="0.14"
              />
            </filter>

            {geometry.frames.map((frame, index) => (
              <mask
                key={index}
                id={`reveal-layer-${index}`}
                maskUnits="userSpaceOnUse"
              >
                <rect
                  x="0"
                  y="0"
                  width={geometry.viewBox.w}
                  height={geometry.viewBox.h}
                  fill="black"
                />
                <rect
                  className="reveal-rect"
                  data-index={index}
                  x={frame.x}
                  y={frame.y + frame.h}
                  width={frame.w}
                  height={0}
                  rx={frame.r}
                  fill="white"
                />
              </mask>
            ))}
          </defs>

          {/* Blueprint background */}
          <rect
            x="0"
            y="0"
            width={geometry.viewBox.w}
            height={geometry.viewBox.h}
            fill="url(#blueprint-grid)"
          />

          {/* Ground / base shadow */}
          <ellipse
            cx={geometry.frames[0].x + geometry.frames[0].w / 2}
            cy={geometry.frames[0].y + geometry.frames[0].h + 26}
            rx={geometry.frames[0].w / 2.3}
            ry="18"
            fill={rgba('#0F172A', 0.08)}
          />

          {/* Step spine */}
          <line
            x1={geometry.spineX}
            y1={geometry.topY}
            x2={geometry.spineX}
            y2={geometry.bottomY}
            stroke={rgba('#0F172A', 0.16)}
            strokeWidth="2"
            strokeDasharray="4 8"
            vectorEffect="non-scaling-stroke"
          />

          {/* Step nodes + connectors */}
          {geometry.frames.map((frame, index) => {
            const y = frame.y + frame.h / 2
            const accent = LAYERS[index].accent
            return (
              <g
                key={LAYERS[index].id}
                className="step-node"
                data-index={index}
                transform={`translate(${geometry.spineX}, ${y})`}
              >
                <g
                  className="node-connector"
                  opacity={0}
                  transform="scale(0, 1)"
                  style={{
                    transformBox: 'fill-box',
                    transformOrigin: 'left center',
                  }}
                >
                  <line
                    x1="0"
                    y1="0"
                    x2={geometry.connectorLen}
                    y2="0"
                    stroke={rgba(accent, 0.6)}
                    strokeWidth="2"
                    strokeDasharray="3 7"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                  />
                </g>

                <circle
                  className="node-ring"
                  cx="0"
                  cy="0"
                  r="14"
                  fill="none"
                  stroke={rgba(accent, 0.35)}
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                  opacity={0}
                />
                <circle
                  cx="0"
                  cy="0"
                  r="9"
                  fill={rgba('#FFFFFF', 0.85)}
                  stroke={rgba('#0F172A', 0.18)}
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                />
                <circle
                  className="node-fill"
                  cx="0"
                  cy="0"
                  r="4.5"
                  fill={accent}
                  opacity={0}
                  transform="scale(0)"
                />
              </g>
            )
          })}

          {/* Foundation layers */}
          {geometry.frames.map((frame, index) => {
            const accent = LAYERS[index].accent
            return (
              <g
                key={LAYERS[index].id}
                className="foundation-layer"
                data-index={index}
                mask={`url(#reveal-layer-${index})`}
                opacity={0}
                filter="url(#soft-shadow)"
              >
                <rect
                  x={frame.x}
                  y={frame.y}
                  width={frame.w}
                  height={frame.h}
                  rx={frame.r}
                  fill={rgba(accent, 0.08)}
                  stroke={rgba('#0F172A', 0.16)}
                  strokeWidth="1.5"
                  vectorEffect="non-scaling-stroke"
                />

                {/* Brick texture */}
                <rect
                  x={frame.x + 14}
                  y={frame.y + 14}
                  width={frame.w - 28}
                  height={frame.h - 28}
                  rx={frame.r - 10}
                  fill="url(#brick-pattern)"
                  opacity={0.55}
                />

                {/* Subtle side depth */}
                <rect
                  x={frame.x + frame.w - 14}
                  y={frame.y + 10}
                  width="10"
                  height={frame.h - 20}
                  rx="8"
                  fill={rgba('#0F172A', 0.08)}
                />

                {/* Top sheen */}
                <rect
                  x={frame.x + 20}
                  y={frame.y + 10}
                  width={frame.w - 40}
                  height="2"
                  rx="1"
                  fill={rgba('#FFFFFF', 0.55)}
                  opacity={0.6}
                />

                {/* Active highlight */}
                <rect
                  className="layer-highlight"
                  x={frame.x - 1}
                  y={frame.y - 1}
                  width={frame.w + 2}
                  height={frame.h + 2}
                  rx={frame.r + 1}
                  fill="none"
                  stroke={rgba(accent, 0.8)}
                  strokeWidth="2.5"
                  vectorEffect="non-scaling-stroke"
                  opacity={0}
                />
              </g>
            )
          })}

          {/* Growth payoff */}
          <g className="growth" opacity={0} transform="translate(0, 12)">
            <rect
              x={geometry.growth.x}
              y={geometry.growth.y}
              width={geometry.growth.w}
              height={geometry.growth.h}
              rx="18"
              fill={rgba('#10B981', 0.08)}
              stroke={rgba('#10B981', 0.32)}
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
            />

            <path
              className="growth-line"
              d={`M ${geometry.growth.x + 22} ${geometry.growth.y + 58}
                  L ${geometry.growth.x + 52} ${geometry.growth.y + 42}
                  L ${geometry.growth.x + 78} ${geometry.growth.y + 48}
                  L ${geometry.growth.x + 110} ${geometry.growth.y + 28}`}
              stroke="#10B981"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />

            <circle
              className="growth-dot"
              cx={geometry.growth.x + 110}
              cy={geometry.growth.y + 28}
              r="5"
              fill="#10B981"
              opacity={0}
              transform="scale(0)"
            />

            <path
              d={`M ${geometry.growth.x + 110} ${geometry.growth.y + 28}
                  L ${geometry.growth.x + 118} ${geometry.growth.y + 24}
                  L ${geometry.growth.x + 114} ${geometry.growth.y + 32} Z`}
              fill={rgba('#10B981', 0.9)}
            />
          </g>
        </svg>
      </div>
    )
  }
)
