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

type LayerGeometry = {
  x: number
  y: number
  w: number
  h: number
  depthX: number
  depthY: number
}

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

function mixColor(base: string, mix: string, amount: number) {
  const a = hexToRgb(base)
  const b = hexToRgb(mix)
  const r = Math.round(a.r + (b.r - a.r) * amount)
  const g = Math.round(a.g + (b.g - a.g) * amount)
  const bValue = Math.round(a.b + (b.b - a.b) * amount)
  return `rgb(${r}, ${g}, ${bValue})`
}

function pointsToString(points: Array<[number, number]>) {
  return points.map((point) => point.join(',')).join(' ')
}

function topFacePoints(layer: LayerGeometry) {
  const { x, y, w, depthX, depthY } = layer
  return pointsToString([
    [x, y],
    [x + w, y],
    [x + w + depthX, y - depthY],
    [x + depthX, y - depthY],
  ])
}

function frontFacePoints(layer: LayerGeometry) {
  const { x, y, w, h } = layer
  return pointsToString([
    [x, y],
    [x + w, y],
    [x + w, y + h],
    [x, y + h],
  ])
}

function sideFacePoints(layer: LayerGeometry) {
  const { x, y, w, h, depthX, depthY } = layer
  return pointsToString([
    [x + w, y],
    [x + w + depthX, y - depthY],
    [x + w + depthX, y - depthY + h],
    [x + w, y + h],
  ])
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
      const viewBox = { w: 720, h: 520 }
      const depth = { x: 72, y: 32 }
      const base = {
        x: 190,
        y: 330,
        w: 330,
        h: 34,
        gap: 12,
      }

      const layers = Array.from({ length: LAYERS.length }, (_, index) => {
        const w = base.w - index * 26
        const x = base.x + index * 13
        const y = base.y - index * (base.h + base.gap)
        return {
          x,
          y,
          w,
          h: base.h,
          depthX: depth.x,
          depthY: depth.y,
        }
      })

      const spineX = 86
      const spineTop = layers[layers.length - 1].y + base.h / 2 - 8
      const spineBottom = layers[0].y + base.h / 2 + 22
      const connectorLen = layers[0].x - spineX - 12

      const ground = {
        x: base.x - 40,
        y: base.y + base.h + 18,
        w: base.w + 80,
        depthX: depth.x + 18,
        depthY: depth.y + 8,
      }

      const topLayer = layers[layers.length - 1]
      const growth = {
        x: topLayer.x + topLayer.w - 150,
        y: topLayer.y - 88,
        w: 150,
        h: 22,
        depthX: depth.x - 10,
        depthY: depth.y - 6,
      }

      return {
        viewBox,
        depth,
        base,
        layers,
        spineX,
        spineTop,
        spineBottom,
        connectorLen,
        ground,
        growth,
      }
    }, [])

    useEffect(() => {
      if (!svgRef.current) return

      const duration = prefersReducedMotion ? 0 : 0.55
      const microDuration = prefersReducedMotion ? 0 : 0.32
      const q = gsap.utils.selector(svgRef.current)

      geometry.layers.forEach((_, index) => {
        const isBuilt = index < visibleLayers

        gsap.to(q(`.foundation-layer[data-index="${index}"]`), {
          opacity: isBuilt ? 1 : 0,
          y: isBuilt ? 0 : 18,
          scale: isBuilt ? 1 : 0.98,
          duration,
          ease: 'power3.out',
          overwrite: 'auto',
          transformOrigin: 'center',
        })

        gsap.to(q(`.step-node[data-index="${index}"] .node-fill`), {
          opacity: isBuilt ? 1 : 0,
          scale: isBuilt ? 1 : 0,
          duration: microDuration,
          ease: 'back.out(1.6)',
          transformOrigin: 'center',
          overwrite: 'auto',
        })

        gsap.to(q(`.step-node[data-index="${index}"] .node-label`), {
          opacity: isBuilt ? 1 : 0.4,
          duration: microDuration,
          ease: 'power2.out',
          overwrite: 'auto',
        })
      })
    }, [geometry, prefersReducedMotion, visibleLayers])

    useEffect(() => {
      if (!svgRef.current) return

      const microDuration = prefersReducedMotion ? 0 : 0.32
      const q = gsap.utils.selector(svgRef.current)

      geometry.layers.forEach((_, index) => {
        const isActive = activeLayer === index

        gsap.to(q(`.layer-highlight[data-index="${index}"]`), {
          opacity: isActive ? 1 : 0,
          duration: microDuration,
          ease: 'power2.out',
          overwrite: 'auto',
        })

        gsap.to(q(`.layer-glow[data-index="${index}"]`), {
          opacity: isActive ? 0.35 : 0,
          duration: microDuration,
          ease: 'power2.out',
          overwrite: 'auto',
        })

        gsap.to(q(`.step-node[data-index="${index}"] .node-ring`), {
          opacity: isActive ? 1 : 0.3,
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
    }, [activeLayer, geometry, prefersReducedMotion])

    const shouldShowGrowth = showGrowth && visibleLayers >= LAYERS.length

    useEffect(() => {
      if (!svgRef.current) return

      const duration = prefersReducedMotion ? 0 : 0.55
      const microDuration = prefersReducedMotion ? 0 : 0.32
      const q = gsap.utils.selector(svgRef.current)

      gsap.to(q('.growth'), {
        opacity: shouldShowGrowth ? 1 : 0,
        y: shouldShowGrowth ? 0 : 14,
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
          delay: shouldShowGrowth && !prefersReducedMotion ? 0.14 : 0,
          overwrite: 'auto',
        })
      }

      gsap.to(q('.growth-dot'), {
        opacity: shouldShowGrowth ? 1 : 0,
        scale: shouldShowGrowth ? 1 : 0,
        duration: microDuration,
        ease: 'back.out(1.6)',
        delay: shouldShowGrowth && !prefersReducedMotion ? 0.62 : 0,
        transformOrigin: 'center',
        overwrite: 'auto',
      })
    }, [prefersReducedMotion, shouldShowGrowth])

    const viewBox = `0 0 ${geometry.viewBox.w} ${geometry.viewBox.h}`
    const stroke = rgba('#0F172A', 0.22)

    return (
      <div ref={ref} className="relative w-full max-w-xl mx-auto">
        <svg
          ref={svgRef}
          viewBox={viewBox}
          className="w-full h-auto"
          role="img"
          aria-label="Camadas de fundação da Arquitetura de Receita"
        >
          <defs>
            <radialGradient id="foundation-bg" cx="50%" cy="35%" r="60%">
              <stop offset="0%" stopColor={rgba('#FFFFFF', 1)} />
              <stop offset="55%" stopColor={rgba('#F8FAFC', 1)} />
              <stop offset="100%" stopColor={rgba('#EEF2FF', 0.7)} />
            </radialGradient>

            <filter id="soft-shadow" x="-20%" y="-20%" width="140%" height="160%">
              <feDropShadow
                dx="0"
                dy="10"
                stdDeviation="12"
                floodColor="#0F172A"
                floodOpacity="0.18"
              />
            </filter>
          </defs>

          <rect
            x="0"
            y="0"
            width={geometry.viewBox.w}
            height={geometry.viewBox.h}
            fill="url(#foundation-bg)"
          />

          <polygon
            points={pointsToString([
              [geometry.ground.x, geometry.ground.y],
              [geometry.ground.x + geometry.ground.w, geometry.ground.y],
              [
                geometry.ground.x + geometry.ground.w + geometry.ground.depthX,
                geometry.ground.y - geometry.ground.depthY,
              ],
              [
                geometry.ground.x + geometry.ground.depthX,
                geometry.ground.y - geometry.ground.depthY,
              ],
            ])}
            fill={rgba('#0F172A', 0.08)}
          />

          <line
            x1={geometry.spineX}
            y1={geometry.spineTop}
            x2={geometry.spineX}
            y2={geometry.spineBottom}
            stroke={rgba('#0F172A', 0.18)}
            strokeWidth="2"
            strokeDasharray="6 10"
            vectorEffect="non-scaling-stroke"
          />

          {geometry.layers.map((layer, index) => {
            const y = layer.y + layer.h / 2
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
                    stroke={rgba(accent, 0.7)}
                    strokeWidth="2"
                    strokeDasharray="3 8"
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
                  stroke={rgba(accent, 0.6)}
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                  opacity={0.3}
                />
                <circle
                  cx="0"
                  cy="0"
                  r="9"
                  fill={rgba('#FFFFFF', 0.95)}
                  stroke={rgba('#0F172A', 0.16)}
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
                <text
                  className="node-label"
                  x="-38"
                  y="4"
                  fill={rgba('#0F172A', 0.6)}
                  fontSize="12"
                  fontWeight="600"
                  letterSpacing="1"
                  opacity={0.4}
                >
                  {LAYERS[index].numero}
                </text>
              </g>
            )
          })}

          {geometry.layers.map((layer, index) => {
            const accent = LAYERS[index].accent
            const topFill = mixColor(accent, '#FFFFFF', 0.45)
            const frontFill = mixColor(accent, '#0B1220', 0.08)
            const sideFill = mixColor(accent, '#0B1220', 0.2)

            return (
              <g
                key={LAYERS[index].id}
                className="foundation-layer"
                data-index={index}
                opacity={0}
                filter="url(#soft-shadow)"
                style={{
                  transformBox: 'fill-box',
                  transformOrigin: 'center',
                }}
              >
                <polygon points={sideFacePoints(layer)} fill={sideFill} />
                <polygon points={frontFacePoints(layer)} fill={frontFill} />

                <path
                  d={`M ${layer.x + 16} ${layer.y + layer.h * 0.4} H ${
                    layer.x + layer.w - 16
                  }`}
                  stroke={rgba('#0F172A', 0.18)}
                  strokeWidth="1"
                />
                <path
                  d={`M ${layer.x + 16} ${layer.y + layer.h * 0.7} H ${
                    layer.x + layer.w - 16
                  }`}
                  stroke={rgba('#0F172A', 0.12)}
                  strokeWidth="1"
                />

                <polygon
                  className="layer-glow"
                  data-index={index}
                  points={topFacePoints(layer)}
                  fill={rgba(accent, 0.55)}
                  opacity={0}
                />

                <polygon
                  points={topFacePoints(layer)}
                  fill={topFill}
                  stroke={stroke}
                  strokeWidth="1.5"
                  vectorEffect="non-scaling-stroke"
                />

                <polyline
                  points={pointsToString([
                    [layer.x + 20, layer.y + 6],
                    [layer.x + layer.w - 20, layer.y + 6],
                  ])}
                  stroke={rgba('#FFFFFF', 0.6)}
                  strokeWidth="1.4"
                  vectorEffect="non-scaling-stroke"
                />

                <polygon
                  className="layer-highlight"
                  data-index={index}
                  points={topFacePoints(layer)}
                  fill="none"
                  stroke={rgba(accent, 0.9)}
                  strokeWidth="2.4"
                  vectorEffect="non-scaling-stroke"
                  opacity={0}
                />
              </g>
            )
          })}

          <g className="growth" opacity={0} transform="translate(0, 14)">
            <polygon
              points={sideFacePoints(geometry.growth)}
              fill={mixColor('#10B981', '#0B1220', 0.18)}
            />
            <polygon
              points={frontFacePoints(geometry.growth)}
              fill={mixColor('#10B981', '#0B1220', 0.06)}
            />
            <polygon
              points={topFacePoints(geometry.growth)}
              fill={mixColor('#10B981', '#FFFFFF', 0.45)}
              stroke={rgba('#10B981', 0.65)}
              strokeWidth="1.4"
              vectorEffect="non-scaling-stroke"
            />

            <line
              x1={geometry.growth.x + geometry.growth.w - 32}
              y1={geometry.growth.y + geometry.growth.h + 12}
              x2={geometry.growth.x + geometry.growth.w - 32}
              y2={geometry.growth.y + geometry.growth.h + 38}
              stroke={rgba('#0F172A', 0.25)}
              strokeWidth="3"
              strokeLinecap="round"
            />

            <path
              className="growth-line"
              d={`M ${geometry.growth.x + 22} ${geometry.growth.y + 48}
                  L ${geometry.growth.x + 58} ${geometry.growth.y + 34}
                  L ${geometry.growth.x + 88} ${geometry.growth.y + 38}
                  L ${geometry.growth.x + 122} ${geometry.growth.y + 20}`}
              stroke="#10B981"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
            <circle
              className="growth-dot"
              cx={geometry.growth.x + 122}
              cy={geometry.growth.y + 20}
              r="5"
              fill="#10B981"
              opacity={0}
              transform="scale(0)"
            />
            <path
              d={`M ${geometry.growth.x + 122} ${geometry.growth.y + 20}
                  L ${geometry.growth.x + 132} ${geometry.growth.y + 16}
                  L ${geometry.growth.x + 126} ${geometry.growth.y + 26} Z`}
              fill={rgba('#10B981', 0.95)}
            />
          </g>
        </svg>
      </div>
    )
  }
)
