'use client'

import { motion, AnimatePresence } from 'framer-motion'
import {
  TrendingUp,
  LayoutGrid,
  MessageSquare,
  Workflow,
  Bot,
  Plug,
} from 'lucide-react'

interface Feature {
  id: string
  screenshot: string
  mockupAlt: string
  icon: string
  stats?: {
    numero: string
    label: string
  }
}

interface FeatureMockupProps {
  feature: Feature
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  TrendingUp,
  LayoutGrid,
  MessageSquare,
  Workflow,
  Bot,
  Plug,
}

// Ilustrações SVG para cada feature (enquanto não temos screenshots reais)
function CRMIllustration() {
  return (
    <svg viewBox="0 0 400 250" className="w-full h-full">
      {/* Background */}
      <rect width="400" height="250" fill="#f8fafc" />

      {/* Header do CRM */}
      <rect x="20" y="20" width="360" height="30" rx="4" fill="#e2e8f0" />
      <circle cx="40" cy="35" r="6" fill="#635BFF" />
      <rect x="55" y="30" width="80" height="10" rx="2" fill="#cbd5e1" />

      {/* Colunas do Pipeline */}
      {[0, 1, 2, 3].map((col) => (
        <g key={col}>
          {/* Header da coluna */}
          <rect
            x={30 + col * 90}
            y="65"
            width="80"
            height="20"
            rx="4"
            fill={col === 0 ? '#635BFF' : col === 1 ? '#818cf8' : col === 2 ? '#a5b4fc' : '#22c55e'}
            opacity="0.2"
          />
          <rect
            x={35 + col * 90}
            y="71"
            width="50"
            height="8"
            rx="2"
            fill={col === 0 ? '#635BFF' : col === 1 ? '#818cf8' : col === 2 ? '#a5b4fc' : '#22c55e'}
          />

          {/* Cards */}
          {[0, 1, col < 2 ? 2 : -1].filter(i => i >= 0).map((card, idx) => (
            <g key={`${col}-${card}`}>
              <rect
                x={30 + col * 90}
                y={95 + idx * 50}
                width="80"
                height="42"
                rx="6"
                fill="white"
                stroke="#e2e8f0"
                strokeWidth="1"
              />
              <rect
                x={36 + col * 90}
                y={102 + idx * 50}
                width="55"
                height="8"
                rx="2"
                fill="#334155"
              />
              <rect
                x={36 + col * 90}
                y={115 + idx * 50}
                width="35"
                height="6"
                rx="2"
                fill="#94a3b8"
              />
              <rect
                x={36 + col * 90}
                y={125 + idx * 50}
                width="45"
                height="6"
                rx="2"
                fill="#22c55e"
                opacity="0.3"
              />
              <circle cx={100 + col * 90} cy={130 + idx * 50} r="6" fill="#ddd6fe" />
            </g>
          ))}
        </g>
      ))}
    </svg>
  )
}

function ProjetosIllustration() {
  return (
    <svg viewBox="0 0 400 250" className="w-full h-full">
      <rect width="400" height="250" fill="#f8fafc" />

      {/* Header */}
      <rect x="20" y="20" width="360" height="30" rx="4" fill="#e2e8f0" />
      <rect x="35" y="30" width="60" height="10" rx="2" fill="#635BFF" />
      <rect x="105" y="30" width="60" height="10" rx="2" fill="#cbd5e1" />
      <rect x="175" y="30" width="60" height="10" rx="2" fill="#cbd5e1" />

      {/* Kanban Columns */}
      {['A Fazer', 'Progresso', 'Revisão', 'Concluído'].map((_, col) => (
        <g key={col}>
          <rect
            x={25 + col * 92}
            y="60"
            width="82"
            height="175"
            rx="8"
            fill="#f1f5f9"
          />
          <rect
            x={32 + col * 92}
            y="68"
            width="50"
            height="8"
            rx="2"
            fill="#64748b"
          />

          {/* Task cards */}
          {[0, 1, col < 3 ? 2 : -1].filter(i => i >= 0).map((task, idx) => (
            <g key={`${col}-${task}`}>
              <rect
                x={32 + col * 92}
                y={85 + idx * 55}
                width="68"
                height="48"
                rx="6"
                fill="white"
                stroke="#e2e8f0"
              />
              <rect
                x={38 + col * 92}
                y={92 + idx * 55}
                width="45"
                height="6"
                rx="2"
                fill="#334155"
              />
              <rect
                x={38 + col * 92}
                y={102 + idx * 55}
                width="55"
                height="5"
                rx="2"
                fill="#94a3b8"
              />
              {/* Priority indicator */}
              <rect
                x={38 + col * 92}
                y={112 + idx * 55}
                width="20"
                height="12"
                rx="6"
                fill={idx === 0 ? '#fef3c7' : idx === 1 ? '#dcfce7' : '#dbeafe'}
              />
              {/* Avatar */}
              <circle cx={88 + col * 92} cy={123 + idx * 55} r="6" fill="#c4b5fd" />
            </g>
          ))}
        </g>
      ))}
    </svg>
  )
}

function ComunicacaoIllustration() {
  return (
    <svg viewBox="0 0 400 250" className="w-full h-full">
      <rect width="400" height="250" fill="#f8fafc" />

      {/* Sidebar */}
      <rect x="20" y="20" width="80" height="210" rx="8" fill="#0A2540" />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <circle cx="45" cy={55 + i * 35} r="12" fill={i === 0 ? '#635BFF' : '#1e3a5f'} />
          <rect x="62" y={50 + i * 35} width="30" height="6" rx="2" fill="#64748b" />
        </g>
      ))}

      {/* Chat area */}
      <rect x="110" y="20" width="270" height="210" rx="8" fill="white" stroke="#e2e8f0" />

      {/* Chat header */}
      <rect x="120" y="30" width="250" height="35" rx="4" fill="#f8fafc" />
      <circle cx="140" cy="47" r="12" fill="#c4b5fd" />
      <rect x="160" y="40" width="80" height="8" rx="2" fill="#334155" />
      <rect x="160" y="52" width="50" height="5" rx="2" fill="#22c55e" />

      {/* Messages */}
      <rect x="130" y="80" width="140" height="35" rx="12" fill="#f1f5f9" />
      <rect x="140" y="90" width="100" height="6" rx="2" fill="#64748b" />
      <rect x="140" y="100" width="80" height="5" rx="2" fill="#94a3b8" />

      <rect x="200" y="125" width="160" height="45" rx="12" fill="#635BFF" opacity="0.1" />
      <rect x="210" y="135" width="120" height="6" rx="2" fill="#635BFF" />
      <rect x="210" y="145" width="90" height="5" rx="2" fill="#818cf8" />
      <rect x="210" y="155" width="60" height="5" rx="2" fill="#818cf8" />

      <rect x="130" y="180" width="120" height="30" rx="12" fill="#f1f5f9" />
      <rect x="140" y="190" width="80" height="6" rx="2" fill="#64748b" />

      {/* Input */}
      <rect x="120" y="215" width="250" height="1" fill="#e2e8f0" />
    </svg>
  )
}

function AutomacaoIllustration() {
  return (
    <svg viewBox="0 0 400 250" className="w-full h-full">
      <rect width="400" height="250" fill="#f8fafc" />

      {/* Nodes e conexões */}
      {/* Trigger node */}
      <rect x="30" y="100" width="70" height="50" rx="8" fill="#635BFF" />
      <rect x="45" y="115" width="40" height="6" rx="2" fill="white" />
      <rect x="45" y="125" width="30" height="5" rx="2" fill="white" opacity="0.7" />

      {/* Connection line 1 */}
      <path d="M 100 125 L 140 125" stroke="#635BFF" strokeWidth="2" strokeDasharray="5,5" />
      <circle cx="120" cy="125" r="4" fill="#635BFF" />

      {/* Condition node */}
      <g transform="translate(140, 100)">
        <path d="M 35 0 L 70 25 L 35 50 L 0 25 Z" fill="#f59e0b" />
        <rect x="15" y="20" width="40" height="5" rx="2" fill="white" />
      </g>

      {/* Branch lines */}
      <path d="M 210 115 L 250 80" stroke="#22c55e" strokeWidth="2" />
      <path d="M 210 135 L 250 170" stroke="#ef4444" strokeWidth="2" />

      {/* Yes action */}
      <rect x="250" y="55" width="70" height="50" rx="8" fill="#22c55e" />
      <rect x="265" y="70" width="40" height="6" rx="2" fill="white" />
      <rect x="265" y="80" width="30" height="5" rx="2" fill="white" opacity="0.7" />

      {/* No action */}
      <rect x="250" y="145" width="70" height="50" rx="8" fill="#f97316" />
      <rect x="265" y="160" width="40" height="6" rx="2" fill="white" />
      <rect x="265" y="170" width="30" height="5" rx="2" fill="white" opacity="0.7" />

      {/* Final connection */}
      <path d="M 320 80 L 350 110 L 320 170" stroke="#64748b" strokeWidth="2" fill="none" />

      {/* End node */}
      <circle cx="360" cy="125" r="20" fill="#0A2540" />
      <rect x="350" y="122" width="20" height="6" rx="2" fill="white" />

      {/* Labels */}
      <text x="45" y="165" fontSize="8" fill="#64748b">Trigger</text>
      <text x="152" y="165" fontSize="8" fill="#64748b">Condição</text>
      <text x="265" y="115" fontSize="8" fill="#64748b">Ação A</text>
      <text x="265" y="205" fontSize="8" fill="#64748b">Ação B</text>
    </svg>
  )
}

function IAIllustration() {
  return (
    <svg viewBox="0 0 400 250" className="w-full h-full">
      <rect width="400" height="250" fill="#f8fafc" />

      {/* Card de negócio */}
      <rect x="30" y="30" width="200" height="190" rx="12" fill="white" stroke="#e2e8f0" strokeWidth="2" />

      {/* Header do card */}
      <rect x="40" y="40" width="180" height="40" rx="6" fill="#f8fafc" />
      <circle cx="60" cy="60" r="12" fill="#c4b5fd" />
      <rect x="80" y="52" width="80" height="8" rx="2" fill="#334155" />
      <rect x="80" y="64" width="50" height="6" rx="2" fill="#94a3b8" />

      {/* Info do negócio */}
      <rect x="40" y="90" width="60" height="6" rx="2" fill="#64748b" />
      <rect x="40" y="102" width="100" height="10" rx="2" fill="#22c55e" />

      <rect x="40" y="125" width="60" height="6" rx="2" fill="#64748b" />
      <rect x="40" y="137" width="80" height="8" rx="2" fill="#334155" />

      <rect x="40" y="160" width="60" height="6" rx="2" fill="#64748b" />
      <rect x="40" y="172" width="120" height="8" rx="2" fill="#334155" />

      {/* CoPilot suggestion card */}
      <rect x="245" y="50" width="140" height="150" rx="12" fill="#635BFF" />

      {/* AI icon */}
      <circle cx="270" cy="75" r="15" fill="white" opacity="0.2" />
      <circle cx="270" cy="75" r="8" fill="white" />

      <rect x="295" y="68" width="70" height="6" rx="2" fill="white" />
      <rect x="295" y="78" width="50" height="5" rx="2" fill="white" opacity="0.7" />

      {/* Suggestion content */}
      <rect x="260" y="105" width="110" height="6" rx="2" fill="white" opacity="0.9" />
      <rect x="260" y="117" width="100" height="5" rx="2" fill="white" opacity="0.7" />
      <rect x="260" y="129" width="90" height="5" rx="2" fill="white" opacity="0.7" />

      {/* Probability */}
      <rect x="260" y="150" width="80" height="20" rx="10" fill="white" opacity="0.2" />
      <rect x="268" y="156" width="50" height="8" rx="2" fill="white" />

      {/* Action button */}
      <rect x="260" y="178" width="110" height="14" rx="7" fill="white" />
      <rect x="280" y="182" width="70" height="6" rx="2" fill="#635BFF" />

      {/* Connection line */}
      <path d="M 230 125 L 245 125" stroke="#635BFF" strokeWidth="2" strokeDasharray="4,4" />
    </svg>
  )
}

function IntegracoesIllustration() {
  // Integrações populares para empreendedores brasileiros
  const integrations = [
    { x: 85, y: 45, color: '#4285F4', label: 'Google', bgColor: '#E8F0FE' },
    { x: 200, y: 25, color: '#1877F2', label: 'Meta', bgColor: '#E7F3FF' },
    { x: 315, y: 45, color: '#25D366', label: 'WhatsApp', bgColor: '#E8F8F0' },
    { x: 365, y: 125, color: '#FF6B00', label: 'ERP', bgColor: '#FFF3E8' },
    { x: 315, y: 205, color: '#6366F1', label: 'Apollo', bgColor: '#EEF2FF' },
    { x: 200, y: 225, color: '#8B5CF6', label: 'Clay', bgColor: '#F3E8FF' },
    { x: 85, y: 205, color: '#0066FF', label: 'RD Station', bgColor: '#E6F0FF' },
    { x: 35, y: 125, color: '#FF4081', label: 'Hotmart', bgColor: '#FFE4EC' },
  ]

  return (
    <svg viewBox="0 0 400 250" className="w-full h-full">
      {/* Background */}
      <rect width="400" height="250" fill="#f8fafc" />

      {/* Grid pattern */}
      <defs>
        <pattern id="showcase-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="0.5" />
        </pattern>
        <linearGradient id="showcase-center-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#635BFF" />
          <stop offset="100%" stopColor="#0A2540" />
        </linearGradient>
      </defs>
      <rect width="400" height="250" fill="url(#showcase-grid)" />

      {/* Connection lines with animation */}
      {integrations.map((item, i) => (
        <g key={`line-${i}`}>
          <line
            x1="200"
            y1="125"
            x2={item.x}
            y2={item.y}
            stroke="#635BFF"
            strokeWidth="1.5"
            strokeDasharray="4,3"
            opacity="0.4"
          >
            <animate attributeName="stroke-dashoffset" values="7;0" dur="1s" repeatCount="indefinite" />
          </line>
        </g>
      ))}

      {/* Data flow particles */}
      <circle r="3" fill="#635BFF">
        <animateMotion dur="2s" repeatCount="indefinite" path="M200,125 L85,45" />
      </circle>
      <circle r="3" fill="#8B5CF6">
        <animateMotion dur="2s" repeatCount="indefinite" begin="0.5s" path="M200,125 L365,125" />
      </circle>
      <circle r="3" fill="#635BFF">
        <animateMotion dur="2s" repeatCount="indefinite" begin="1s" path="M200,125 L200,225" />
      </circle>
      <circle r="3" fill="#0A2540">
        <animateMotion dur="2s" repeatCount="indefinite" begin="1.5s" path="M200,125 L35,125" />
      </circle>

      {/* Center Bitrix24 Hub */}
      <circle cx="200" cy="125" r="48" fill="url(#showcase-center-grad)" />
      <circle cx="200" cy="125" r="40" fill="white" />
      <text x="200" y="122" textAnchor="middle" fill="#0A2540" fontSize="11" fontWeight="700">BITRIX24</text>
      <text x="200" y="135" textAnchor="middle" fill="#635BFF" fontSize="8" fontWeight="500">Hub Central</text>

      {/* Animated pulse rings */}
      <circle cx="200" cy="125" r="55" fill="none" stroke="#635BFF" strokeWidth="1" opacity="0.3">
        <animate attributeName="r" values="48;60;48" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.3;0.1;0.3" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="200" cy="125" r="65" fill="none" stroke="#635BFF" strokeWidth="1" opacity="0.2">
        <animate attributeName="r" values="55;70;55" dur="2s" repeatCount="indefinite" begin="0.5s" />
        <animate attributeName="opacity" values="0.2;0.05;0.2" dur="2s" repeatCount="indefinite" begin="0.5s" />
      </circle>

      {/* Integration nodes */}
      {integrations.map((item, i) => (
        <g key={`node-${i}`}>
          {/* Outer circle with background color */}
          <circle cx={item.x} cy={item.y} r="28" fill="white" stroke="#e2e8f0" strokeWidth="1.5" />
          <circle cx={item.x} cy={item.y} r="22" fill={item.bgColor} />

          {/* Label */}
          <text
            x={item.x}
            y={item.y + 4}
            textAnchor="middle"
            fontSize="8"
            fontWeight="600"
            fill={item.color}
          >
            {item.label}
          </text>
        </g>
      ))}
    </svg>
  )
}

const illustrationMap: Record<string, React.ComponentType> = {
  crm: CRMIllustration,
  projetos: ProjetosIllustration,
  comunicacao: ComunicacaoIllustration,
  automacao: AutomacaoIllustration,
  ia: IAIllustration,
  integracao: IntegracoesIllustration,
}

export function FeatureMockup({ feature }: FeatureMockupProps) {
  const IconComponent = iconMap[feature.icon] || Bot
  const IllustrationComponent = illustrationMap[feature.id] || CRMIllustration

  return (
    <div className="relative">
      {/* Container do mockup (laptop frame) */}
      <div className="relative bg-gray-900 rounded-2xl p-2 shadow-2xl">
        {/* Barra do browser */}
        <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-t-xl">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="flex-1 mx-4">
            <div className="bg-gray-700 rounded-md px-3 py-1 text-xs text-gray-400 max-w-50">
              bitrix24.com.br
            </div>
          </div>
        </div>

        {/* Screenshot/Ilustração */}
        <AnimatePresence mode="wait">
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="relative aspect-16/10 bg-white rounded-b-xl overflow-hidden"
          >
            <IllustrationComponent />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Ícone flutuante no canto superior */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, type: 'spring', stiffness: 400 }}
        className="absolute -left-2 sm:-left-4 -top-2 sm:-top-4 w-12 h-12 sm:w-14 sm:h-14 bg-brand rounded-xl shadow-lg flex items-center justify-center"
      >
        <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
      </motion.div>
    </div>
  )
}
