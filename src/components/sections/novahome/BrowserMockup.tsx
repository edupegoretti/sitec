'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface BrowserMockupProps {
  url?: string
  children: ReactNode
  className?: string
  aspectRatio?: string
  /** Use dark background instead of white */
  dark?: boolean
}

/**
 * BrowserMockup - Frame de navegador sofisticado reutilizável
 * Usado para padronização visual em toda a home
 */
export function BrowserMockup({
  url = 'bitrix24.com.br',
  children,
  className = '',
  aspectRatio = '16/10',
  dark = false
}: BrowserMockupProps) {
  return (
    <div className={`relative bg-gray-900 rounded-2xl p-2 shadow-2xl ${className}`}>
      {/* Barra do navegador */}
      <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-t-xl">
        {/* Botões de janela */}
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        {/* Barra de URL */}
        <div className="flex-1 mx-4">
          <div className="bg-gray-700 rounded-md px-3 py-1 text-xs text-gray-400 max-w-50">
            {url}
          </div>
        </div>
      </div>
      {/* Área de conteúdo */}
      <motion.div
        className={`relative rounded-b-xl overflow-hidden ${dark ? 'bg-slate-900' : 'bg-white'}`}
        style={{ aspectRatio }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </div>
  )
}

/**
 * CRMKanbanVisual - Visualização de Kanban do CRM
 * Usado no Bitrix24Showcase e outras seções
 */
export function CRMKanbanVisual() {
  const columns = [
    { color: '#635BFF', opacity: 0.2, fillColor: '#635BFF' },
    { color: '#818cf8', opacity: 0.2, fillColor: '#818cf8' },
    { color: '#a5b4fc', opacity: 0.2, fillColor: '#a5b4fc' },
    { color: '#10B981', opacity: 0.2, fillColor: '#10B981' },
  ]

  return (
    <svg viewBox="0 0 400 250" className="w-full h-full">
      <rect width="400" height="250" fill="#f8fafc" />

      {/* Header */}
      <rect x="20" y="20" width="360" height="30" rx="4" fill="#e2e8f0" />
      <circle cx="40" cy="35" r="6" fill="#635BFF" />
      <rect x="55" y="30" width="80" height="10" rx="2" fill="#cbd5e1" />

      {/* Kanban Columns */}
      {columns.map((col, colIndex) => {
        const x = 30 + colIndex * 90
        return (
          <g key={colIndex}>
            {/* Column header */}
            <rect x={x} y="65" width="80" height="20" rx="4" fill={col.color} opacity={col.opacity} />
            <rect x={x + 5} y="71" width="50" height="8" rx="2" fill={col.fillColor} />

            {/* Cards */}
            {[0, 1, 2].map((cardIndex) => {
              const y = 95 + cardIndex * 50
              if (colIndex === 2 && cardIndex === 2) return null
              if (colIndex === 3 && cardIndex > 1) return null

              return (
                <g key={`${colIndex}-${cardIndex}`}>
                  <rect x={x} y={y} width="80" height="42" rx="6" fill="white" stroke="#e2e8f0" strokeWidth="1" />
                  <rect x={x + 6} y={y + 7} width="55" height="8" rx="2" fill="#334155" />
                  <rect x={x + 6} y={y + 20} width="35" height="6" rx="2" fill="#94a3b8" />
                  <rect x={x + 6} y={y + 30} width="45" height="6" rx="2" fill="#10B981" opacity="0.3" />
                  <circle cx={x + 70} cy={y + 35} r="6" fill="#ddd6fe" />
                </g>
              )
            })}
          </g>
        )
      })}
    </svg>
  )
}

/**
 * IADashboardVisual - Visualização de IA/Analytics
 * Usado na seção de IA
 */
export function IADashboardVisual() {
  return (
    <svg viewBox="0 0 400 250" className="w-full h-full">
      <rect width="400" height="250" fill="#0f172a" />

      {/* Header */}
      <rect x="20" y="15" width="360" height="35" rx="6" fill="#1e293b" />
      <circle cx="40" cy="32" r="8" fill="#635BFF" />
      <rect x="55" y="27" width="100" height="10" rx="2" fill="#334155" />
      <rect x="320" y="25" width="50" height="14" rx="4" fill="#10B981" opacity="0.2" />
      <text x="345" y="35" textAnchor="middle" fill="#10B981" fontSize="8" fontWeight="bold">AI ON</text>

      {/* Main chart area */}
      <rect x="20" y="60" width="230" height="120" rx="8" fill="#1e293b" />

      {/* Chart line */}
      <motion.path
        d="M 35 150 Q 60 140 90 130 Q 130 115 160 100 Q 190 85 220 70 L 235 65"
        fill="none"
        stroke="#635BFF"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
      />

      {/* Chart area fill */}
      <motion.path
        d="M 35 150 Q 60 140 90 130 Q 130 115 160 100 Q 190 85 220 70 L 235 65 L 235 165 L 35 165 Z"
        fill="url(#aiGradient)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      />

      {/* Gradient definition */}
      <defs>
        <linearGradient id="aiGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#635BFF" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#635BFF" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Right side - AI insights */}
      <rect x="260" y="60" width="120" height="120" rx="8" fill="#1e293b" />

      {/* Insight cards */}
      {[
        { y: 70, label: 'Lead Score', value: '87%', color: '#10B981' },
        { y: 105, label: 'Probabilidade', value: '92%', color: '#635BFF' },
        { y: 140, label: 'Próxima Ação', value: 'Follow-up', color: '#f59e0b' },
      ].map((item, i) => (
        <motion.g
          key={i}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 + i * 0.15 }}
        >
          <text x="270" y={item.y + 10} fill="#64748b" fontSize="8">{item.label}</text>
          <text x="270" y={item.y + 24} fill={item.color} fontSize="12" fontWeight="bold">{item.value}</text>
        </motion.g>
      ))}

      {/* Bottom stats */}
      <g transform="translate(20, 195)">
        {[
          { label: 'Leads Qualificados', value: '+34%', x: 0 },
          { label: 'Tempo Resposta', value: '-67%', x: 125 },
          { label: 'Conversão', value: '+28%', x: 250 },
        ].map((stat, i) => (
          <motion.g
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + i * 0.1 }}
          >
            <rect x={stat.x} y="0" width="115" height="40" rx="6" fill="#1e293b" />
            <text x={stat.x + 10} y="16" fill="#64748b" fontSize="8">{stat.label}</text>
            <text x={stat.x + 10} y="32" fill="#10B981" fontSize="14" fontWeight="bold">{stat.value}</text>
          </motion.g>
        ))}
      </g>
    </svg>
  )
}

/**
 * RevenueArchitectureVisual - Visualização de Arquitetura de Receita
 * Usado na seção de Método/Arquitetura
 */
export function RevenueArchitectureVisual() {
  return (
    <svg viewBox="0 0 400 250" className="w-full h-full">
      <rect width="400" height="250" fill="#f8fafc" />

      {/* Header */}
      <rect x="15" y="15" width="370" height="30" rx="4" fill="#e2e8f0" />
      <text x="30" y="34" fill="#334155" fontSize="10" fontWeight="600">Arquitetura de Receita</text>

      {/* Three columns representing Process > Data > Adoption */}
      {[
        { x: 20, label: 'Processo', color: '#635BFF', items: ['Funil definido', 'Critérios claros', 'SLAs acordados'] },
        { x: 145, label: 'Dados', color: '#f59e0b', items: ['Base limpa', 'Campos validados', 'Dashboards'] },
        { x: 270, label: 'Adoção', color: '#10B981', items: ['Treino por função', 'Fluidz', 'Rotina'] },
      ].map((col, colIndex) => (
        <motion.g
          key={colIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + colIndex * 0.15 }}
        >
          {/* Column header */}
          <rect x={col.x} y="55" width="110" height="28" rx="6" fill={col.color} opacity="0.15" />
          <text x={col.x + 55} y="73" textAnchor="middle" fill={col.color} fontSize="10" fontWeight="600">{col.label}</text>

          {/* Items */}
          {col.items.map((item, itemIndex) => (
            <g key={itemIndex}>
              <rect x={col.x} y={95 + itemIndex * 45} width="110" height="38" rx="6" fill="white" stroke="#e2e8f0" strokeWidth="1" />
              <circle cx={col.x + 15} cy={95 + itemIndex * 45 + 19} r="5" fill={col.color} opacity="0.3" />
              <text x={col.x + 28} y={95 + itemIndex * 45 + 23} fill="#334155" fontSize="9">{item}</text>
            </g>
          ))}
        </motion.g>
      ))}

      {/* Arrows connecting columns */}
      {[0, 1].map((i) => (
        <motion.path
          key={i}
          d={`M ${130 + i * 125} 140 L ${140 + i * 125} 140`}
          stroke="#94a3b8"
          strokeWidth="2"
          markerEnd="url(#arrowhead)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.8 + i * 0.2, duration: 0.3 }}
        />
      ))}

      <defs>
        <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M 0 0 L 6 3 L 0 6 Z" fill="#94a3b8" />
        </marker>
      </defs>
    </svg>
  )
}
