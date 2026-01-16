'use client'

import { motion, AnimatePresence } from 'framer-motion'
import {
  Map,
  GitBranch,
  Database,
  Target,
  Users,
  BarChart3,
  X,
  Check,
} from 'lucide-react'

// ============================================================================
// TYPES
// ============================================================================

export interface PilarData {
  id: string
  nome: string
  descricao: string
  descricaoCompleta?: string
  icon: string
  antes?: {
    titulo: string
    descricao: string
  }
  depois?: {
    titulo: string
    descricao: string
  }
  visual?: string
}

// ============================================================================
// PILAR TIMELINE - Versão customizada sem restrição de tipo
// ============================================================================

interface PilarTimelineProps {
  pilares: readonly PilarData[]
  activeIndex: number
  onSelect: (index: number) => void
  loadingProgress?: number
  isAutoPlaying?: boolean
}

export function PilarTimelineCustom({
  pilares,
  activeIndex,
  onSelect,
  loadingProgress = 0,
  isAutoPlaying = false,
}: PilarTimelineProps) {
  const segmentWidth = 100 / (pilares.length - 1)
  const baseProgress = activeIndex * segmentWidth
  const isLastPilar = activeIndex === pilares.length - 1
  const currentProgress = isLastPilar ? 100 : baseProgress + loadingProgress * segmentWidth

  return (
    <div className="relative py-8">
      {/* Linha de fundo */}
      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2" />

      {/* Linha de progresso animada */}
      <motion.div
        className="absolute top-1/2 left-0 h-0.5 bg-linear-to-r from-brand to-brand-gradient -translate-y-1/2"
        initial={{ width: '0%' }}
        animate={{ width: `${currentProgress}%` }}
        transition={isAutoPlaying ? { duration: 0 } : { duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Pontos */}
      <div className="relative flex justify-between">
        {pilares.map((pilar, index) => {
          const isActive = index === activeIndex
          const isCompleted = index < activeIndex

          return (
            <button
              key={pilar.id}
              onClick={() => onSelect(index)}
              className="relative flex flex-col items-center group focus:outline-none"
              aria-label={`Ver ${pilar.nome}`}
            >
              {/* Ponto */}
              <motion.div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                  isActive
                    ? 'bg-linear-to-br from-brand to-brand-gradient shadow-lg shadow-purple-500/40'
                    : isCompleted
                      ? 'bg-brand'
                      : 'bg-white border-2 border-gray-300 group-hover:border-brand'
                }`}
                animate={{
                  scale: isActive ? 1.15 : 1,
                }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <span
                  className={`text-sm font-bold ${
                    isActive || isCompleted ? 'text-white' : 'text-gray-400 group-hover:text-brand'
                  }`}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
              </motion.div>

              {/* Label */}
              <motion.span
                className={`absolute -bottom-8 text-xs font-medium whitespace-nowrap transition-colors ${
                  isActive ? 'text-brand' : 'text-gray-400 group-hover:text-gray-600'
                }`}
                animate={{
                  opacity: isActive ? 1 : 0.7,
                }}
              >
                <span className="hidden sm:inline">{pilar.nome}</span>
                <span className="sm:hidden">{index + 1}</span>
              </motion.span>

              {/* Indicador de ativo (glow) */}
              {isActive && (
                <motion.div
                  className="absolute inset-0 w-10 h-10 rounded-full bg-brand/20"
                  initial={{ scale: 1, opacity: 0.5 }}
                  animate={{ scale: 1.8, opacity: 0 }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeOut',
                  }}
                />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ============================================================================
// BEFORE AFTER CARD - Versão customizada
// ============================================================================

interface BeforeAfterCardProps {
  type: 'before' | 'after'
  titulo: string
  descricao: string
}

function BeforeAfterCard({ type, titulo, descricao }: BeforeAfterCardProps) {
  const isBefore = type === 'before'

  return (
    <motion.div
      className={`rounded-2xl p-5 transition-all duration-300 ease-out-expo hover:-translate-y-1 ${
        isBefore
          ? 'bg-white border border-red-200/80 hover:border-red-300 shadow-sm hover:shadow-card-hover'
          : 'bg-white border border-green-200/80 hover:border-green-300 shadow-sm hover:shadow-card-hover'
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-start gap-3">
        <div
          className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
            isBefore ? 'bg-red-100' : 'bg-green-100'
          }`}
        >
          {isBefore ? (
            <X className="w-4 h-4 text-red-600" />
          ) : (
            <Check className="w-4 h-4 text-green-600" />
          )}
        </div>
        <div>
          <p
            className={`text-xs font-semibold uppercase tracking-wide mb-1 ${
              isBefore ? 'text-red-600' : 'text-green-600'
            }`}
          >
            {isBefore ? 'Antes' : 'Depois'}
          </p>
          <p className={`font-semibold mb-1 ${isBefore ? 'text-red-900' : 'text-green-900'}`}>
            {titulo}
          </p>
          <p className={`text-sm leading-relaxed ${isBefore ? 'text-red-700' : 'text-green-700'}`}>
            {descricao}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

// ============================================================================
// PILAR CONTENT - Versão customizada
// ============================================================================

interface PilarContentProps {
  pilar: PilarData
  index: number
  direction: number
}

export function PilarContentCustom({ pilar, index, direction }: PilarContentProps) {
  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={pilar.id}
        custom={direction}
        initial={{ opacity: 0, x: direction > 0 ? 60 : -60 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: direction > 0 ? -60 : 60 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-6"
      >
        {/* Número + Título */}
        <div className="flex items-center gap-4">
          <span className="text-6xl sm:text-7xl font-bold text-brand/15">
            {String(index + 1).padStart(2, '0')}
          </span>
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">{pilar.nome}</h3>
          </div>
        </div>

        {/* Descrição expandida */}
        <p className="text-lg text-gray-600 leading-relaxed">
          {pilar.descricaoCompleta || pilar.descricao}
        </p>

        {/* Cards Antes/Depois */}
        <div className="grid sm:grid-cols-2 gap-4 pt-2">
          <BeforeAfterCard
            type="before"
            titulo={pilar.antes?.titulo || 'Antes'}
            descricao={pilar.antes?.descricao || ''}
          />
          <BeforeAfterCard
            type="after"
            titulo={pilar.depois?.titulo || 'Depois'}
            descricao={pilar.depois?.descricao || ''}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

// ============================================================================
// PILAR VISUAL - Versão customizada com visualizações SVG
// ============================================================================

// Componentes visuais animados para cada pilar
function JourneyMapVisual() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      {/* Caminho curvo */}
      <motion.path
        d="M 20 180 Q 50 140 70 120 Q 100 90 100 60 Q 100 30 130 30 Q 160 30 180 60"
        fill="none"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
      />

      {/* Pontos do caminho (touchpoints) */}
      {[
        { cx: 20, cy: 180, delay: 0.3 },
        { cx: 70, cy: 120, delay: 0.6 },
        { cx: 100, cy: 60, delay: 0.9 },
        { cx: 130, cy: 30, delay: 1.2 },
        { cx: 180, cy: 60, delay: 1.5 },
      ].map((point, i) => (
        <motion.circle
          key={i}
          cx={point.cx}
          cy={point.cy}
          r="8"
          fill="white"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: point.delay, duration: 0.4 }}
        />
      ))}

      {/* Ponto final destacado (verde) */}
      <motion.circle
        cx="180"
        cy="60"
        r="12"
        fill="#10B981"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1] }}
        transition={{ delay: 1.6, duration: 0.5 }}
      />
    </svg>
  )
}

function ProcessFlowVisual() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <motion.rect
        x="75"
        y="10"
        width="50"
        height="30"
        rx="15"
        fill="white"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      />
      <motion.line
        x1="100"
        y1="40"
        x2="100"
        y2="65"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.4, duration: 0.3 }}
      />
      <motion.polygon
        points="100,65 130,90 100,115 70,90"
        fill="rgba(255,255,255,0.2)"
        stroke="white"
        strokeWidth="2"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      />
      <motion.line
        x1="70"
        y1="90"
        x2="35"
        y2="130"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.7, duration: 0.3 }}
      />
      <motion.line
        x1="130"
        y1="90"
        x2="165"
        y2="130"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.7, duration: 0.3 }}
      />
      <motion.rect
        x="10"
        y="130"
        width="50"
        height="25"
        rx="4"
        fill="white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      />
      <motion.rect
        x="140"
        y="130"
        width="50"
        height="25"
        rx="4"
        fill="white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      />
      <motion.line
        x1="35"
        y1="155"
        x2="80"
        y2="175"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 1.1, duration: 0.3 }}
      />
      <motion.line
        x1="165"
        y1="155"
        x2="120"
        y2="175"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 1.1, duration: 0.3 }}
      />
      <motion.rect
        x="75"
        y="170"
        width="50"
        height="25"
        rx="4"
        fill="#10B981"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.3 }}
      />
    </svg>
  )
}

function DataOrgVisual() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <motion.rect
        x="20"
        y="30"
        width="160"
        height="140"
        rx="8"
        fill="rgba(255,255,255,0.1)"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
      <motion.rect
        x="20"
        y="30"
        width="160"
        height="25"
        rx="8"
        fill="rgba(255,255,255,0.25)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      />
      {[0, 1, 2, 3].map((row) => (
        <motion.g key={row}>
          <motion.line
            x1="20"
            y1={80 + row * 25}
            x2="180"
            y2={80 + row * 25}
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 + row * 0.1 }}
          />
          {[0, 1, 2].map((col) => (
            <motion.rect
              key={col}
              x={30 + col * 50}
              y={62 + row * 25}
              width="40"
              height="14"
              rx="2"
              fill="rgba(255,255,255,0.15)"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5 + row * 0.1 + col * 0.05, duration: 0.3 }}
            />
          ))}
          <motion.circle
            cx="165"
            cy={69 + row * 25}
            r="6"
            fill="#10B981"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8 + row * 0.15 }}
          />
        </motion.g>
      ))}
    </svg>
  )
}

function ICPTargetVisual() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      {[60, 45, 30].map((r, i) => (
        <motion.circle
          key={r}
          cx="100"
          cy="100"
          r={r}
          fill="none"
          stroke={`rgba(255,255,255,${0.15 + i * 0.1})`}
          strokeWidth="2"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 + i * 0.15, duration: 0.5 }}
        />
      ))}
      <motion.circle
        cx="100"
        cy="100"
        r="12"
        fill="#10B981"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1] }}
        transition={{ delay: 0.6, duration: 0.5 }}
      />
      {[
        { x: 40, y: 60, size: 0.7, delay: 0.8 },
        { x: 160, y: 70, size: 0.6, delay: 0.9 },
        { x: 50, y: 150, size: 0.65, delay: 1.0 },
      ].map((persona, i) => (
        <motion.g
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: persona.delay }}
        >
          <circle cx={persona.x} cy={persona.y} r={12 * persona.size} fill="rgba(255,255,255,0.3)" />
          <circle
            cx={persona.x}
            cy={persona.y - 12 * persona.size}
            r={6 * persona.size}
            fill="rgba(255,255,255,0.3)"
          />
        </motion.g>
      ))}
      <motion.g
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.5 }}
      >
        <circle cx="100" cy="85" r="15" fill="white" />
        <circle cx="100" cy="65" r="8" fill="white" />
      </motion.g>
    </svg>
  )
}

function AdoptionPlanVisual() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      {Array.from({ length: 20 }).map((_, i) => {
        const row = Math.floor(i / 5)
        const col = i % 5
        const delay = 0.3 + i * 0.05
        const isCompleted = i < 14

        return (
          <motion.rect
            key={i}
            x={25 + col * 32}
            y={40 + row * 32}
            width="26"
            height="26"
            rx="4"
            fill={isCompleted ? 'rgba(0, 210, 106, 0.3)' : 'rgba(255,255,255,0.1)'}
            stroke={isCompleted ? '#10B981' : 'rgba(255,255,255,0.2)'}
            strokeWidth="1"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay, duration: 0.2 }}
          />
        )
      })}
      {Array.from({ length: 14 }).map((_, i) => {
        const row = Math.floor(i / 5)
        const col = i % 5
        return (
          <motion.path
            key={`check-${i}`}
            d={`M ${33 + col * 32} ${53 + row * 32} l 4 4 l 8 -8`}
            stroke="#10B981"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.5 + i * 0.08, duration: 0.2 }}
          />
        )
      })}
      <motion.rect x="25" y="175" width="150" height="8" rx="4" fill="rgba(255,255,255,0.15)" />
      <motion.rect
        x="25"
        y="175"
        width="0"
        height="8"
        rx="4"
        fill="#10B981"
        animate={{ width: 105 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      />
      <motion.text
        x="100"
        y="168"
        textAnchor="middle"
        fill="white"
        fontSize="12"
        fontWeight="bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        70% adoção
      </motion.text>
    </svg>
  )
}

function SuccessMetricsVisual() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <motion.rect
        x="15"
        y="20"
        width="170"
        height="100"
        rx="8"
        fill="rgba(255,255,255,0.1)"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      />
      <motion.path
        d="M 25 100 Q 50 90 70 85 Q 100 75 120 60 Q 145 45 165 35 L 165 100 L 25 100 Z"
        fill="url(#greenGradient)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      />
      <motion.path
        d="M 25 100 Q 50 90 70 85 Q 100 75 120 60 Q 145 45 165 35"
        fill="none"
        stroke="#10B981"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
      />
      <defs>
        <linearGradient id="greenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#10B981" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      {[
        { x: 20, label: '96%', sublabel: 'Retenção' },
        { x: 75, label: '+45%', sublabel: 'Conversão' },
        { x: 130, label: '30d', sublabel: 'Go-live' },
      ].map((card, i) => (
        <motion.g
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 + i * 0.15 }}
        >
          <rect x={card.x} y="135" width="50" height="50" rx="6" fill="rgba(255,255,255,0.1)" />
          <text
            x={card.x + 25}
            y="158"
            textAnchor="middle"
            fill={i === 0 ? '#10B981' : 'white'}
            fontSize="14"
            fontWeight="bold"
          >
            {card.label}
          </text>
          <text
            x={card.x + 25}
            y="175"
            textAnchor="middle"
            fill="rgba(255,255,255,0.6)"
            fontSize="9"
          >
            {card.sublabel}
          </text>
        </motion.g>
      ))}
    </svg>
  )
}

// Mapeamento de visual por id do pilar
const visualComponents: Record<string, React.FC> = {
  journey: JourneyMapVisual,
  processos: ProcessFlowVisual,
  dados: DataOrgVisual,
  icp: ICPTargetVisual,
  adocao: AdoptionPlanVisual,
  metricas: SuccessMetricsVisual,
}

// Mapeamento de ícones
const iconComponents: Record<string, React.FC<{ className?: string }>> = {
  Map: Map,
  GitBranch: GitBranch,
  Database: Database,
  Target: Target,
  Users: Users,
  BarChart3: BarChart3,
}

interface PilarVisualProps {
  pilar: PilarData
  index: number
}

export function PilarVisualCustom({ pilar, index }: PilarVisualProps) {
  const VisualComponent = visualComponents[pilar.id]
  const IconComponent = iconComponents[pilar.icon]

  return (
    <motion.div
      key={pilar.id}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative aspect-square max-w-md mx-auto"
    >
      {/* Container com gradiente */}
      <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-brand to-brand-gradient overflow-hidden">
        {/* Padrão de fundo decorativo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        </div>

        {/* Conteúdo visual animado */}
        <div className="relative w-full h-full p-8">
          {VisualComponent && <VisualComponent />}
        </div>

        {/* Ícone no canto */}
        <div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
          {IconComponent && <IconComponent className="w-6 h-6 text-white" />}
        </div>

        {/* Número do pilar */}
        <div className="absolute bottom-4 right-4 text-7xl font-bold text-white/10">
          {String(index + 1).padStart(2, '0')}
        </div>
      </div>
    </motion.div>
  )
}
