'use client'

import { forwardRef } from 'react'
import { motion } from 'framer-motion'

// Dados das 4 camadas (da base para o topo)
const LAYERS = [
  {
    id: 'processo',
    numero: 1,
    titulo: 'Processo',
    subtitulo: 'A fundação',
    gradient: 'from-slate-800 to-slate-700',
    shadowColor: 'shadow-slate-900/30',
    glowColor: 'rgba(51, 65, 85, 0.4)',
  },
  {
    id: 'adocao',
    numero: 2,
    titulo: 'Adoção',
    subtitulo: 'Por função',
    gradient: 'from-blue-600 to-blue-500',
    shadowColor: 'shadow-blue-900/30',
    glowColor: 'rgba(37, 99, 235, 0.4)',
  },
  {
    id: 'sustentacao',
    numero: 3,
    titulo: 'Sustentação',
    subtitulo: 'Contínua',
    gradient: 'from-violet-600 to-violet-500',
    shadowColor: 'shadow-violet-900/30',
    glowColor: 'rgba(124, 58, 237, 0.4)',
  },
  {
    id: 'evolucao',
    numero: 4,
    titulo: 'Evolução',
    subtitulo: 'Com o negócio',
    gradient: 'from-emerald-600 to-emerald-500',
    shadowColor: 'shadow-emerald-900/30',
    glowColor: 'rgba(16, 185, 129, 0.4)',
  },
] as const

interface FoundationSVGProps {
  activeLayer?: number | null
  visibleLayers?: number
  showGrowth?: boolean
}

export const FoundationSVG = forwardRef<HTMLDivElement, FoundationSVGProps>(
  function FoundationSVG({ activeLayer, visibleLayers = 0, showGrowth = false }, ref) {
    return (
      <div ref={ref} className="relative w-full max-w-sm mx-auto" style={{ perspective: '1000px' }}>
        {/* Container das layers com perspectiva 3D */}
        <div className="relative flex flex-col-reverse gap-3">
          {LAYERS.map((layer, index) => {
            const isActive = activeLayer === index
            const isVisible = index < visibleLayers

            return (
              <motion.div
                key={layer.id}
                className="relative"
                initial={{
                  opacity: 0,
                  y: 80,
                  rotateX: -20,
                  scale: 0.9
                }}
                animate={{
                  opacity: isVisible ? 1 : 0,
                  y: isVisible ? 0 : 80,
                  rotateX: isVisible ? 0 : -20,
                  scale: isVisible ? 1 : 0.9
                }}
                transition={{
                  type: 'spring',
                  stiffness: 100,
                  damping: 15,
                  delay: index * 0.15,
                }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Sombra projetada */}
                <motion.div
                  className="absolute -bottom-2 left-4 right-4 h-4 bg-black/10 blur-md rounded-full"
                  animate={{
                    opacity: isVisible ? 0.6 : 0,
                    scale: isActive ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* Layer principal */}
                <motion.div
                  className={`
                    relative bg-linear-to-br ${layer.gradient}
                    rounded-xl px-5 py-4
                    shadow-lg ${layer.shadowColor}
                    border border-white/10
                    cursor-pointer
                    overflow-hidden
                  `}
                  animate={{
                    scale: isActive ? 1.02 : 1,
                    y: isActive ? -4 : 0,
                  }}
                  whileHover={{
                    scale: 1.02,
                    y: -4,
                    transition: { duration: 0.2 }
                  }}
                  transition={{ duration: 0.2 }}
                  style={{
                    boxShadow: isActive
                      ? `0 20px 40px -10px ${layer.glowColor}, 0 0 0 1px rgba(255,255,255,0.1)`
                      : undefined
                  }}
                >
                  {/* Brilho no topo */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/30 to-transparent" />

                  {/* Face lateral 3D (efeito de profundidade) */}
                  <div
                    className="absolute -right-3 top-1 bottom-1 w-3 rounded-r-lg opacity-50"
                    style={{
                      background: 'linear-gradient(to right, rgba(0,0,0,0.2), rgba(0,0,0,0.4))',
                      transform: 'skewY(-45deg)',
                      transformOrigin: 'top left',
                    }}
                  />

                  {/* Conteúdo */}
                  <div className="flex items-center gap-4 relative z-10">
                    {/* Número */}
                    <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center backdrop-blur-xs shrink-0">
                      <span className="text-white font-bold text-lg">{layer.numero}</span>
                    </div>

                    {/* Texto */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-semibold text-base leading-tight">
                        {layer.titulo}
                      </h4>
                      <p className="text-white/60 text-sm">
                        {layer.subtitulo}
                      </p>
                    </div>

                    {/* Indicador de status */}
                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/10 rounded-full">
                      <motion.div
                        className="w-2 h-2 rounded-full bg-emerald-400"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.7, 1, 0.7]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut'
                        }}
                      />
                      <span className="text-white/70 text-xs font-medium">Ativo</span>
                    </div>
                  </div>

                  {/* Conector para próxima layer */}
                  {index < LAYERS.length - 1 && isVisible && (
                    <motion.div
                      className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0.5 h-3 z-20"
                      initial={{ scaleY: 0, opacity: 0 }}
                      animate={{ scaleY: 1, opacity: 1 }}
                      transition={{ delay: index * 0.15 + 0.3, duration: 0.3 }}
                      style={{
                        background: 'linear-gradient(to bottom, rgba(99, 91, 255, 0.8), rgba(99, 91, 255, 0.3))',
                        transformOrigin: 'top'
                      }}
                    />
                  )}
                </motion.div>
              </motion.div>
            )
          })}
        </div>

        {/* Growth Indicator - emerge após todas as layers */}
        <motion.div
          className="mt-6 flex flex-col items-center"
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{
            opacity: showGrowth && visibleLayers === 4 ? 1 : 0,
            y: showGrowth && visibleLayers === 4 ? 0 : 20,
            scale: showGrowth && visibleLayers === 4 ? 1 : 0.8,
          }}
          transition={{
            type: 'spring',
            stiffness: 100,
            damping: 12,
            delay: 0.8
          }}
        >
          {/* Linha conectora do growth */}
          <motion.div
            className="w-0.5 h-8 mb-3"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: showGrowth && visibleLayers === 4 ? 1 : 0 }}
            transition={{ delay: 0.9, duration: 0.4 }}
            style={{
              background: 'linear-gradient(to bottom, rgba(99, 91, 255, 0.6), rgba(16, 185, 129, 0.8))',
              transformOrigin: 'top'
            }}
          />

          {/* Card de crescimento */}
          <div className="relative bg-linear-to-br from-emerald-500/10 to-emerald-600/5 rounded-2xl px-6 py-4 border border-emerald-500/20">
            {/* Glow de fundo */}
            <div className="absolute inset-0 bg-emerald-500/5 rounded-2xl blur-xl" />

            {/* Barras do gráfico */}
            <div className="flex items-end gap-2 h-12 mb-2 relative z-10">
              {[40, 60, 100].map((height, i) => (
                <motion.div
                  key={i}
                  className={`w-4 rounded-sm ${i === 2 ? 'bg-emerald-500' : 'bg-violet-500/80'}`}
                  initial={{ height: 0 }}
                  animate={{
                    height: showGrowth && visibleLayers === 4 ? `${height}%` : 0
                  }}
                  transition={{
                    delay: 1.0 + i * 0.1,
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                />
              ))}

              {/* Trend line */}
              <motion.svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 60 48"
                initial={{ opacity: 0 }}
                animate={{ opacity: showGrowth && visibleLayers === 4 ? 1 : 0 }}
                transition={{ delay: 1.3 }}
              >
                <motion.path
                  d="M 8 38 Q 28 28 52 8"
                  stroke="#10b981"
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: showGrowth && visibleLayers === 4 ? 1 : 0 }}
                  transition={{ delay: 1.4, duration: 0.6 }}
                />
                <motion.circle
                  cx="52"
                  cy="8"
                  r="4"
                  fill="#10b981"
                  initial={{ scale: 0 }}
                  animate={{ scale: showGrowth && visibleLayers === 4 ? 1 : 0 }}
                  transition={{ delay: 1.9, type: 'spring' }}
                />
              </motion.svg>
            </div>

            {/* Label */}
            <motion.p
              className="text-emerald-600 font-semibold text-sm text-center tracking-wide relative z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: showGrowth && visibleLayers === 4 ? 1 : 0 }}
              transition={{ delay: 1.6 }}
            >
              CRESCIMENTO PREVISÍVEL
            </motion.p>
          </div>
        </motion.div>
      </div>
    )
  }
)
