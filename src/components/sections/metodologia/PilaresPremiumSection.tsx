'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  MapTrifold,
  GitBranch,
  Database,
  Target,
  Users,
  ChartBar,
  Check,
  ArrowRight,
  CaretRight,
  Circle,
  CreditCard,
  Envelope,
  Phone,
  Buildings,
  User,
  Calendar,
  Clock,
  TrendUp,
  TrendDown,
  Lightning
} from '@phosphor-icons/react'
import { Container } from '@/components/layout'
import { Reveal } from '@/components/shared'
import { GROWTH_ARCHITECTURE_PILARES_CLIENTE } from '@/lib/constants'

// Premium easing - Stripe uses this exact curve
const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const

// Icon mapping
const ICON_MAP: Record<string, React.ElementType> = {
  Map: MapTrifold,
  GitBranch,
  Database,
  Target,
  Users,
  BarChart3: ChartBar,
}

// Connections between pilars (which ones connect to which)
const PILAR_CONNECTIONS: Record<string, string[]> = {
  journey: ['processos', 'icp'],
  processos: ['journey', 'dados', 'adocao'],
  dados: ['processos', 'metricas'],
  icp: ['journey', 'adocao'],
  adocao: ['processos', 'icp', 'metricas'],
  metricas: ['dados', 'adocao'],
}

// ============================================================================
// HIGH-FIDELITY MOCKUPS - Designed to look like real product UIs
// ============================================================================

function JourneyMockup() {
  const stages = [
    { name: 'Descoberta', percent: 100, color: '#635BFF' },
    { name: 'Interesse', percent: 78, color: '#7C74FF' },
    { name: 'Consideracao', percent: 54, color: '#9B95FF' },
    { name: 'Intencao', percent: 32, color: '#B5B1FF' },
    { name: 'Compra', percent: 18, color: '#22C55E' },
  ]

  return (
    <div className="bg-white rounded-2xl shadow-2xl shadow-black/10 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-brand/10 flex items-center justify-center">
            <MapTrifold className="w-4 h-4 text-brand" weight="duotone" />
          </div>
          <span className="font-semibold text-gray-900">Customer Journey</span>
        </div>
        <span className="text-xs text-gray-400">Ultimo 30 dias</span>
      </div>

      {/* Funnel visualization */}
      <div className="p-6 space-y-3">
        {stages.map((stage, i) => (
          <motion.div
            key={stage.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5, ease: PREMIUM_EASE }}
            className="relative"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-medium text-gray-700">{stage.name}</span>
              <span className="text-sm font-semibold text-gray-900">{stage.percent}%</span>
            </div>
            <div className="h-8 bg-gray-100 rounded-lg overflow-hidden">
              <motion.div
                className="h-full rounded-lg"
                style={{ backgroundColor: stage.color }}
                initial={{ width: 0 }}
                animate={{ width: `${stage.percent}%` }}
                transition={{ delay: i * 0.1 + 0.2, duration: 0.8, ease: PREMIUM_EASE }}
              />
            </div>
            {i < stages.length - 1 && (
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-gray-300">
                <CaretRight className="w-4 h-4 rotate-90" />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Footer stats */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 grid grid-cols-3 gap-4">
        {[
          { label: 'Taxa conversao', value: '18%' },
          { label: 'Tempo medio', value: '12 dias' },
          { label: 'Touchpoints', value: '7.2' },
        ].map((stat, i) => (
          <div key={stat.label} className="text-center">
            <div className="text-lg font-bold text-gray-900">{stat.value}</div>
            <div className="text-xs text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ProcessosMockup() {
  const stages = [
    { name: 'Lead Entrada', icon: User, status: 'done', sla: '< 5min' },
    { name: 'Qualificacao', icon: Target, status: 'done', sla: '< 24h' },
    { name: 'Discovery Call', icon: Phone, status: 'done', sla: '< 48h' },
    { name: 'Proposta', icon: Envelope, status: 'current', sla: '< 72h' },
    { name: 'Negociacao', icon: Buildings, status: 'pending', sla: '< 5 dias' },
    { name: 'Fechamento', icon: Check, status: 'pending', sla: '< 7 dias' },
  ]

  return (
    <div className="bg-white rounded-2xl shadow-2xl shadow-black/10 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
            <GitBranch className="w-4 h-4 text-emerald-600" weight="duotone" />
          </div>
          <span className="font-semibold text-gray-900">Pipeline de Vendas</span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 rounded-full">
          <Circle className="w-2 h-2 text-emerald-500" weight="fill" />
          <span className="text-xs font-medium text-emerald-700">Ativo</span>
        </div>
      </div>

      {/* Process flow */}
      <div className="p-6">
        <div className="space-y-0">
          {stages.map((stage, i) => {
            const Icon = stage.icon
            const isDone = stage.status === 'done'
            const isCurrent = stage.status === 'current'

            return (
              <motion.div
                key={stage.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4, ease: PREMIUM_EASE }}
                className="relative"
              >
                <div className={`
                  flex items-center gap-4 p-3 rounded-xl transition-all
                  ${isCurrent ? 'bg-emerald-50 ring-1 ring-emerald-200' : ''}
                `}>
                  {/* Status indicator */}
                  <div className={`
                    w-10 h-10 rounded-xl flex items-center justify-center shrink-0
                    ${isDone ? 'bg-emerald-500' : isCurrent ? 'bg-emerald-500' : 'bg-gray-100'}
                  `}>
                    {isDone ? (
                      <Check className="w-5 h-5 text-white" weight="bold" />
                    ) : (
                      <Icon className={`w-5 h-5 ${isCurrent ? 'text-white' : 'text-gray-400'}`} weight="duotone" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className={`font-medium ${isDone || isCurrent ? 'text-gray-900' : 'text-gray-400'}`}>
                        {stage.name}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        isDone ? 'bg-emerald-100 text-emerald-700' :
                        isCurrent ? 'bg-amber-100 text-amber-700' :
                        'bg-gray-100 text-gray-500'
                      }`}>
                        SLA: {stage.sla}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Connector line */}
                {i < stages.length - 1 && (
                  <div className={`
                    absolute left-8 top-[52px] w-0.5 h-4
                    ${isDone ? 'bg-emerald-500' : 'bg-gray-200'}
                  `} />
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function DadosMockup() {
  const fields = [
    { name: 'Nome completo', value: 'Maria Silva', status: 'valid' },
    { name: 'Email corporativo', value: 'maria@empresa.com.br', status: 'valid' },
    { name: 'Telefone', value: '+55 11 99999-9999', status: 'valid' },
    { name: 'Empresa', value: 'Tech Solutions Ltda', status: 'valid' },
    { name: 'CNPJ', value: '12.345.678/0001-90', status: 'valid' },
    { name: 'Segmento', value: 'Tecnologia B2B', status: 'valid' },
  ]

  return (
    <div className="bg-white rounded-2xl shadow-2xl shadow-black/10 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
            <Database className="w-4 h-4 text-amber-600" weight="duotone" />
          </div>
          <span className="font-semibold text-gray-900">Qualidade dos Dados</span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 rounded-full">
          <span className="text-xs font-bold text-emerald-700">100%</span>
          <span className="text-xs text-emerald-600">completo</span>
        </div>
      </div>

      {/* Data table */}
      <div className="divide-y divide-gray-100">
        {fields.map((field, i) => (
          <motion.div
            key={field.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.06, duration: 0.3 }}
            className="px-6 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div>
              <div className="text-xs text-gray-400 mb-0.5">{field.name}</div>
              <div className="text-sm font-medium text-gray-900">{field.value}</div>
            </div>
            <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
              <Check className="w-3.5 h-3.5 text-emerald-600" weight="bold" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Duplicidades encontradas</span>
          <span className="font-bold text-emerald-600">0</span>
        </div>
      </div>
    </div>
  )
}

function ICPMockup() {
  const criteria = [
    { name: 'Faturamento anual', value: 'R$ 5M - R$ 50M', score: 25, maxScore: 25 },
    { name: 'Numero de funcionarios', value: '50 - 500', score: 20, maxScore: 20 },
    { name: 'Segmento de mercado', value: 'B2B SaaS / Tech', score: 20, maxScore: 20 },
    { name: 'Maturidade digital', value: 'Series A+', score: 15, maxScore: 15 },
    { name: 'Stack tecnologico', value: 'Cloud-first', score: 10, maxScore: 10 },
    { name: 'Localizacao', value: 'Brasil', score: 10, maxScore: 10 },
  ]

  const totalScore = criteria.reduce((acc, c) => acc + c.score, 0)

  return (
    <div className="bg-white rounded-2xl shadow-2xl shadow-black/10 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-pink-500/10 flex items-center justify-center">
            <Target className="w-4 h-4 text-pink-600" weight="duotone" />
          </div>
          <span className="font-semibold text-gray-900">ICP Score</span>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-pink-600">{totalScore}</div>
          <div className="text-xs text-gray-400">de 100 pontos</div>
        </div>
      </div>

      {/* Criteria */}
      <div className="p-6 space-y-4">
        {criteria.map((criterion, i) => (
          <motion.div
            key={criterion.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08, duration: 0.4, ease: PREMIUM_EASE }}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm text-gray-600">{criterion.name}</span>
              <span className="text-sm font-semibold text-gray-900">{criterion.value}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-pink-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(criterion.score / criterion.maxScore) * 100}%` }}
                  transition={{ delay: i * 0.08 + 0.2, duration: 0.6, ease: PREMIUM_EASE }}
                />
              </div>
              <span className="text-xs font-medium text-gray-500 w-12 text-right">
                {criterion.score}/{criterion.maxScore}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Qualification badge */}
      <div className="px-6 py-4 bg-pink-50 border-t border-pink-100">
        <div className="flex items-center justify-center gap-2">
          <Check className="w-5 h-5 text-pink-600" weight="bold" />
          <span className="font-semibold text-pink-700">Lead Qualificado - Pronto para Closer</span>
        </div>
      </div>
    </div>
  )
}

function AdocaoMockup() {
  const users = [
    { name: 'Vendedores', total: 12, trained: 11, certified: 9 },
    { name: 'SDRs', total: 6, trained: 6, certified: 5 },
    { name: 'Gestores', total: 4, trained: 4, certified: 4 },
    { name: 'Customer Success', total: 5, trained: 5, certified: 4 },
  ]

  const totalCertified = users.reduce((acc, u) => acc + u.certified, 0)
  const totalUsers = users.reduce((acc, u) => acc + u.total, 0)

  return (
    <div className="bg-white rounded-2xl shadow-2xl shadow-black/10 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center">
            <Users className="w-4 h-4 text-violet-600" weight="duotone" />
          </div>
          <span className="font-semibold text-gray-900">Adocao do Time</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center">
            <span className="text-sm font-bold text-violet-700">{Math.round((totalCertified/totalUsers)*100)}%</span>
          </div>
        </div>
      </div>

      {/* Teams */}
      <div className="p-6 space-y-4">
        {users.map((team, i) => (
          <motion.div
            key={team.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4, ease: PREMIUM_EASE }}
            className="p-4 bg-gray-50 rounded-xl"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-medium text-gray-900">{team.name}</span>
              <span className="text-sm text-gray-500">{team.total} pessoas</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-violet-400" />
                <span className="text-sm text-gray-600">Treinados: <strong>{team.trained}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-sm text-gray-600">Certificados: <strong>{team.certified}</strong></span>
              </div>
            </div>
            <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-violet-500 to-emerald-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(team.certified / team.total) * 100}%` }}
                transition={{ delay: i * 0.1 + 0.3, duration: 0.6, ease: PREMIUM_EASE }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Fluidz badge */}
      <div className="px-6 py-4 bg-violet-50 border-t border-violet-100 flex items-center justify-center gap-2">
        <Lightning className="w-4 h-4 text-violet-600" weight="fill" />
        <span className="text-sm font-medium text-violet-700">Certificados via Fluidz</span>
      </div>
    </div>
  )
}

function MetricasMockup() {
  const metrics = [
    { name: 'Taxa de Conversao', value: '23.4%', change: '+5.2%', up: true },
    { name: 'Ticket Medio', value: 'R$ 8.5k', change: '+12%', up: true },
    { name: 'Ciclo de Venda', value: '18 dias', change: '-3 dias', up: true },
    { name: 'CAC', value: 'R$ 1.2k', change: '-8%', up: true },
  ]

  return (
    <div className="bg-white rounded-2xl shadow-2xl shadow-black/10 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center">
            <ChartBar className="w-4 h-4 text-cyan-600" weight="duotone" />
          </div>
          <span className="font-semibold text-gray-900">Dashboard de Metricas</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Clock className="w-3.5 h-3.5" />
          Atualizado agora
        </div>
      </div>

      {/* Metrics grid */}
      <div className="p-6 grid grid-cols-2 gap-4">
        {metrics.map((metric, i) => (
          <motion.div
            key={metric.name}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1, duration: 0.4, ease: PREMIUM_EASE }}
            className="p-4 bg-gray-50 rounded-xl"
          >
            <div className="text-sm text-gray-500 mb-1">{metric.name}</div>
            <div className="text-2xl font-bold text-gray-900 mb-2">{metric.value}</div>
            <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
              metric.up ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
            }`}>
              {metric.up ? <TrendUp className="w-3 h-3" /> : <TrendDown className="w-3 h-3" />}
              {metric.change}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mini chart placeholder */}
      <div className="px-6 pb-6">
        <div className="h-20 bg-gradient-to-t from-cyan-50 to-transparent rounded-xl flex items-end justify-between px-4 pb-2">
          {[40, 55, 45, 60, 50, 70, 65, 80, 75, 85, 90, 95].map((h, i) => (
            <motion.div
              key={i}
              className="w-2 bg-cyan-500 rounded-t"
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ delay: i * 0.05 + 0.3, duration: 0.5, ease: PREMIUM_EASE }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// Mockup mapping
const PILAR_MOCKUPS: Record<string, React.FC> = {
  journey: JourneyMockup,
  processos: ProcessosMockup,
  dados: DadosMockup,
  icp: ICPMockup,
  adocao: AdocaoMockup,
  metricas: MetricasMockup,
}

// ============================================================================
// CONNECTED ICON GRID WITH SVG LINES
// ============================================================================

function IconGrid({
  pilares,
  activeId,
  onSelect
}: {
  pilares: typeof GROWTH_ARCHITECTURE_PILARES_CLIENTE
  activeId: string
  onSelect: (id: string) => void
}) {
  const gridRef = useRef<HTMLDivElement>(null)
  const [lines, setLines] = useState<{ x1: number; y1: number; x2: number; y2: number; active: boolean }[]>([])

  const connectedIds = PILAR_CONNECTIONS[activeId] || []

  // Calculate line positions
  useEffect(() => {
    const calculateLines = () => {
      if (!gridRef.current) return

      const icons = gridRef.current.querySelectorAll('[data-pilar-id]')
      const gridRect = gridRef.current.getBoundingClientRect()
      const positions: Record<string, { x: number; y: number }> = {}

      icons.forEach((icon) => {
        const id = icon.getAttribute('data-pilar-id')
        if (!id) return
        const rect = icon.getBoundingClientRect()
        positions[id] = {
          x: rect.left - gridRect.left + rect.width / 2,
          y: rect.top - gridRect.top + rect.height / 2,
        }
      })

      // Generate lines based on connections
      const newLines: typeof lines = []
      Object.entries(PILAR_CONNECTIONS).forEach(([fromId, toIds]) => {
        toIds.forEach(toId => {
          // Avoid duplicates (only draw line once per pair)
          if (fromId < toId && positions[fromId] && positions[toId]) {
            const isActive = activeId === fromId || activeId === toId
            newLines.push({
              x1: positions[fromId].x,
              y1: positions[fromId].y,
              x2: positions[toId].x,
              y2: positions[toId].y,
              active: isActive,
            })
          }
        })
      })

      setLines(newLines)
    }

    calculateLines()
    window.addEventListener('resize', calculateLines)
    return () => window.removeEventListener('resize', calculateLines)
  }, [activeId])

  return (
    <div ref={gridRef} className="relative">
      {/* SVG Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#635BFF" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#635BFF" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        {lines.map((line, i) => (
          <motion.line
            key={i}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke={line.active ? 'url(#lineGradient)' : '#E5E7EB'}
            strokeWidth={line.active ? 2 : 1}
            strokeDasharray={line.active ? '0' : '4 4'}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: i * 0.1, ease: PREMIUM_EASE }}
          />
        ))}
      </svg>

      {/* Icon Grid */}
      <div className="grid grid-cols-3 gap-x-12 gap-y-10 relative z-10">
        {pilares.map((pilar, index) => {
          const Icon = ICON_MAP[pilar.icon] || MapTrifold
          const isActive = pilar.id === activeId
          const isConnected = connectedIds.includes(pilar.id)

          return (
            <motion.button
              key={pilar.id}
              data-pilar-id={pilar.id}
              onClick={() => onSelect(pilar.id)}
              className="flex flex-col items-center gap-3 group focus:outline-none"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div
                className={`
                  relative w-16 h-16 rounded-2xl flex items-center justify-center
                  transition-all duration-500 ease-out
                  ${isActive
                    ? 'shadow-lg'
                    : isConnected
                      ? 'bg-white/80 shadow-md'
                      : 'bg-white/40'
                  }
                `}
                style={{
                  backgroundColor: isActive ? pilar.cor : undefined,
                  boxShadow: isActive ? `0 8px 30px ${pilar.cor}50` : undefined,
                }}
              >
                <Icon
                  className={`w-7 h-7 transition-colors duration-300 ${
                    isActive ? 'text-white' : isConnected ? 'text-gray-700' : 'text-gray-400'
                  }`}
                  weight={isActive ? 'fill' : 'duotone'}
                />

                {/* Number badge */}
                <div
                  className={`
                    absolute -top-2 -right-2 w-6 h-6 rounded-full
                    flex items-center justify-center text-xs font-bold
                    transition-all duration-300
                    ${isActive
                      ? 'bg-white text-gray-900 shadow-md'
                      : 'bg-gray-200 text-gray-500'
                    }
                  `}
                >
                  {pilar.numero}
                </div>
              </div>

              <span className={`
                text-sm font-medium transition-colors duration-300 text-center
                ${isActive ? 'text-white' : isConnected ? 'text-gray-300' : 'text-gray-500'}
              `}>
                {pilar.nome.split(' ')[0]}
              </span>
            </motion.button>
          )
        })}
      </div>

      {/* Connection label */}
      <motion.div
        className="mt-8 text-center"
        key={activeId}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <span className="text-sm text-gray-400">
          Conecta com:{' '}
          {connectedIds.map((id, i) => {
            const pilar = pilares.find(p => p.id === id)
            return (
              <span key={id}>
                <span className="text-brand font-medium">{pilar?.nome.split(' ')[0]}</span>
                {i < connectedIds.length - 1 && ', '}
              </span>
            )
          })}
        </span>
      </motion.div>
    </div>
  )
}

// ============================================================================
// MAIN SECTION COMPONENT
// ============================================================================

export function PilaresPremiumSection() {
  const pilares = GROWTH_ARCHITECTURE_PILARES_CLIENTE
  const [activeId, setActiveId] = useState<string>(pilares[0].id)
  const prefersReducedMotion = useReducedMotion()

  const activePilar = pilares.find(p => p.id === activeId) || pilares[0]
  const ActiveMockup = PILAR_MOCKUPS[activeId] || JourneyMockup

  return (
    <section className="py-24 sm:py-32 bg-[#0A0A0F] relative overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-brand/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-violet-500/5 rounded-full blur-[100px]" />
      </div>

      <Container className="relative">
        {/* Header */}
        <div className="text-center mb-20">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand/10 border border-brand/20 rounded-full mb-6">
              <span className="text-sm font-medium text-brand">A Solucao</span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
              6 Pilares que garantem
              <br />
              <span className="text-brand">CRM funcionando</span>
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Cada pilar resolve uma dor real. Juntos, transformam Bitrix24 em motor de receita previsivel.
            </p>
          </Reveal>
        </div>

        {/* Main layout */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-start">

          {/* Left: Icon Grid (Sticky) */}
          <div className="lg:sticky lg:top-32">
            <Reveal delay={0.3}>
              <IconGrid
                pilares={pilares}
                activeId={activeId}
                onSelect={setActiveId}
              />
            </Reveal>
          </div>

          {/* Right: Mockup + Content */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeId}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{ duration: 0.5, ease: PREMIUM_EASE }}
              >
                {/* Mockup */}
                <div className="mb-8">
                  <ActiveMockup />
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold"
                    style={{
                      backgroundColor: `${activePilar.cor}15`,
                      color: activePilar.cor
                    }}
                  >
                    <span>Pilar {activePilar.numero}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-white">
                    {activePilar.nome}
                  </h3>

                  <p className="text-xl text-gray-300 leading-relaxed">
                    {activePilar.headline}
                  </p>

                  <p className="text-gray-400 leading-relaxed">
                    {activePilar.descricao}
                  </p>

                  {/* Deliverable */}
                  <div
                    className="mt-6 p-5 rounded-2xl border"
                    style={{
                      backgroundColor: `${activePilar.cor}08`,
                      borderColor: `${activePilar.cor}20`,
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${activePilar.cor}25` }}
                      >
                        <Check className="w-3.5 h-3.5" style={{ color: activePilar.cor }} weight="bold" />
                      </div>
                      <span
                        className="text-xs font-bold uppercase tracking-wider"
                        style={{ color: activePilar.cor }}
                      >
                        Voce recebe
                      </span>
                    </div>
                    <p className="text-white font-medium">
                      {activePilar.voceRecebe}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  )
}
