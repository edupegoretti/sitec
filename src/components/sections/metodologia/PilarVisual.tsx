'use client'

import { motion } from 'framer-motion'
import {
  Map,
  GitBranch,
  Database,
  Target,
  Users,
  BarChart3,
} from 'lucide-react'

interface PilarData {
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

interface PilarVisualProps {
  pilar: PilarData
  index: number
}

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
      {/* Nós do fluxograma */}
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

      {/* Linha de conexão 1 */}
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

      {/* Nó de decisão (losango) */}
      <motion.polygon
        points="100,65 130,90 100,115 70,90"
        fill="rgba(255,255,255,0.2)"
        stroke="white"
        strokeWidth="2"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      />

      {/* Linhas de bifurcação */}
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

      {/* Nós de ação */}
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

      {/* Linhas finais convergentes */}
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

      {/* Nó final (verde) */}
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
      {/* Container da tabela */}
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

      {/* Header da tabela */}
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

      {/* Linhas de dados */}
      {[0, 1, 2, 3].map((row) => (
        <motion.g key={row}>
          {/* Linha horizontal */}
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

          {/* Células de dados */}
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

          {/* Checkmark na última coluna */}
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
      {/* Círculos concêntricos do target */}
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

      {/* Centro pulsante */}
      <motion.circle
        cx="100"
        cy="100"
        r="12"
        fill="#10B981"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1] }}
        transition={{ delay: 0.6, duration: 0.5 }}
      />

      {/* Personas ao redor */}
      {[
        { x: 40, y: 60, size: 0.7, delay: 0.8 },
        { x: 160, y: 70, size: 0.6, delay: 0.9 },
        { x: 50, y: 150, size: 0.65, delay: 1.0 },
      ].map((persona, i) => (
        <motion.g key={i} initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ delay: persona.delay }}>
          <circle cx={persona.x} cy={persona.y} r={12 * persona.size} fill="rgba(255,255,255,0.3)" />
          <circle cx={persona.x} cy={persona.y - 12 * persona.size} r={6 * persona.size} fill="rgba(255,255,255,0.3)" />
        </motion.g>
      ))}

      {/* Persona ICP (no centro, destacada) */}
      <motion.g
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.5 }}
      >
        <circle cx="100" cy="85" r="15" fill="white" />
        <circle cx="100" cy="65" r="8" fill="white" />
        {/* Linha conectando ao centro */}
        <motion.line
          x1="100"
          y1="100"
          x2="100"
          y2="100"
          stroke="#10B981"
          strokeWidth="2"
          strokeDasharray="4"
          initial={{ y2: 100 }}
          animate={{ y2: 85 }}
          transition={{ delay: 1.3, duration: 0.3 }}
        />
      </motion.g>
    </svg>
  )
}

function AdoptionPlanVisual() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      {/* Grid de dias (calendário simplificado) */}
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

      {/* Checkmarks nos dias completos */}
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

      {/* Barra de progresso */}
      <motion.rect
        x="25"
        y="175"
        width="150"
        height="8"
        rx="4"
        fill="rgba(255,255,255,0.15)"
      />
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

      {/* Label do progresso */}
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
      {/* Container do dashboard */}
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

      {/* Gráfico de área */}
      <motion.path
        d="M 25 100 Q 50 90 70 85 Q 100 75 120 60 Q 145 45 165 35 L 165 100 L 25 100 Z"
        fill="url(#greenGradient)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      />

      {/* Linha do gráfico */}
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

      {/* Gradiente */}
      <defs>
        <linearGradient id="greenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#10B981" stopOpacity="0.05" />
        </linearGradient>
      </defs>

      {/* Cards de métricas na parte inferior */}
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
          <rect
            x={card.x}
            y="135"
            width="50"
            height="50"
            rx="6"
            fill="rgba(255,255,255,0.1)"
          />
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

export function PilarVisual({ pilar, index }: PilarVisualProps) {
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
