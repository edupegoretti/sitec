'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion, useInView } from 'framer-motion'
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
  User,
  Phone,
  Envelope,
  Buildings,
  Clock,
  TrendUp,
  Lightning,
} from '@phosphor-icons/react'
import { Container } from '@/components/layout'
import { Reveal } from '@/components/shared'
import { cn } from '@/lib/utils'

// ============================================================================
// CONSTANTS & TYPES
// ============================================================================

const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const

interface Pilar {
  id: string
  numero: string
  nome: string
  headline: string
  descricao: string
  voceRecebe: string
  icon: string
  cor: string
}

const PILARES: Pilar[] = [
  {
    id: 'journey',
    numero: '01',
    nome: 'Jornada do Cliente Mapeada',
    headline: 'Antes de configurar, entendemos como seu cliente compra',
    descricao: 'Não como você acha que ele compra — como ele realmente passa pelo seu negócio.',
    voceRecebe: 'Mapa visual da jornada com pontos de contato e oportunidades.',
    icon: 'Map',
    cor: '#635BFF',
  },
  {
    id: 'processos',
    numero: '02',
    nome: 'Processos Documentados',
    headline: 'Vendas não pode ser "cada um do seu jeito"',
    descricao: 'Documentamos fluxos, etapas, critérios de passagem e responsáveis.',
    voceRecebe: 'Processo de vendas claro, com SLAs e regras de handoff.',
    icon: 'GitBranch',
    cor: '#10B981',
  },
  {
    id: 'dados',
    numero: '03',
    nome: 'Dados Organizados',
    headline: 'CRM com dado sujo é pior que planilha',
    descricao: 'Limpamos, padronizamos e criamos regras para manter assim.',
    voceRecebe: 'Base higienizada, sem duplicidade, com validações automáticas.',
    icon: 'Database',
    cor: '#F59E0B',
  },
  {
    id: 'icp',
    numero: '04',
    nome: 'Cliente Ideal Definido',
    headline: 'Se você não sabe quem é seu cliente ideal, sua IA não vai saber qualificar',
    descricao: 'Definimos critérios objetivos de qualificação.',
    voceRecebe: 'ICP documentado e critérios de qualificação configurados.',
    icon: 'Target',
    cor: '#EC4899',
  },
  {
    id: 'adocao',
    numero: '05',
    nome: 'Adoção Planejada',
    headline: 'Treinamento de 2 horas não funciona',
    descricao: 'Criamos trilhas por função e rituais de acompanhamento.',
    voceRecebe: 'Time treinado com Fluidz, certificado por função, com suporte de 30 dias.',
    icon: 'Users',
    cor: '#8B5CF6',
  },
  {
    id: 'metricas',
    numero: '06',
    nome: 'Métricas de Sucesso',
    headline: 'Se você não sabe o que é "funcionar", como vai saber se funcionou?',
    descricao: 'Definimos KPIs antes de começar.',
    voceRecebe: 'Dashboard com suas métricas, baseline e meta.',
    icon: 'BarChart3',
    cor: '#06B6D4',
  },
]

const ICON_MAP: Record<string, React.ElementType> = {
  Map: MapTrifold,
  GitBranch,
  Database,
  Target,
  Users,
  BarChart3: ChartBar,
}

// ============================================================================
// HIGH-FIDELITY MOCKUPS
// ============================================================================

function JourneyMockup() {
  const stages = [
    { name: 'Descoberta', percent: 100, color: '#635BFF' },
    { name: 'Interesse', percent: 78, color: '#7C74FF' },
    { name: 'Consideração', percent: 54, color: '#9B95FF' },
    { name: 'Intenção', percent: 32, color: '#B5B1FF' },
    { name: 'Compra', percent: 18, color: '#22C55E' },
  ]

  return (
    <div className="bg-white rounded-2xl shadow-2xl shadow-black/10 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-brand/10 flex items-center justify-center">
            <MapTrifold className="w-4 h-4 text-brand" weight="duotone" />
          </div>
          <span className="font-semibold text-gray-900">Customer Journey</span>
        </div>
        <span className="text-xs text-gray-400">Últimos 30 dias</span>
      </div>

      <div className="p-6 space-y-3">
        {stages.map((stage, i) => (
          <motion.div
            key={stage.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5, ease: PREMIUM_EASE }}
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
          </motion.div>
        ))}
      </div>

      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 grid grid-cols-3 gap-4">
        {[
          { label: 'Taxa conversão', value: '18%' },
          { label: 'Tempo médio', value: '12 dias' },
          { label: 'Touchpoints', value: '7.2' },
        ].map((stat) => (
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
    { name: 'Qualificação', icon: Target, status: 'done', sla: '< 24h' },
    { name: 'Discovery Call', icon: Phone, status: 'done', sla: '< 48h' },
    { name: 'Proposta', icon: Envelope, status: 'current', sla: '< 72h' },
    { name: 'Negociação', icon: Buildings, status: 'pending', sla: '< 5 dias' },
    { name: 'Fechamento', icon: Check, status: 'pending', sla: '< 7 dias' },
  ]

  return (
    <div className="bg-white rounded-2xl shadow-2xl shadow-black/10 overflow-hidden">
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

      <div className="p-4">
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
              <div className={cn(
                'flex items-center gap-3 p-2.5 rounded-xl transition-all',
                isCurrent && 'bg-emerald-50 ring-1 ring-emerald-200'
              )}>
                <div className={cn(
                  'w-9 h-9 rounded-lg flex items-center justify-center shrink-0',
                  isDone ? 'bg-emerald-500' : isCurrent ? 'bg-emerald-500' : 'bg-gray-100'
                )}>
                  {isDone ? (
                    <Check className="w-4 h-4 text-white" weight="bold" />
                  ) : (
                    <Icon className={cn('w-4 h-4', isCurrent ? 'text-white' : 'text-gray-400')} weight="duotone" />
                  )}
                </div>
                <div className="flex-1 min-w-0 flex items-center justify-between">
                  <span className={cn('text-sm font-medium', isDone || isCurrent ? 'text-gray-900' : 'text-gray-400')}>
                    {stage.name}
                  </span>
                  <span className={cn(
                    'text-xs px-2 py-0.5 rounded-full',
                    isDone ? 'bg-emerald-100 text-emerald-700' :
                    isCurrent ? 'bg-amber-100 text-amber-700' :
                    'bg-gray-100 text-gray-500'
                  )}>
                    SLA: {stage.sla}
                  </span>
                </div>
              </div>
              {i < stages.length - 1 && (
                <div className={cn(
                  'absolute left-[26px] top-[44px] w-0.5 h-2',
                  isDone ? 'bg-emerald-500' : 'bg-gray-200'
                )} />
              )}
            </motion.div>
          )
        })}
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
    { name: 'Número de funcionários', value: '50 - 500', score: 20, maxScore: 20 },
    { name: 'Segmento de mercado', value: 'B2B SaaS / Tech', score: 20, maxScore: 20 },
    { name: 'Maturidade digital', value: 'Series A+', score: 15, maxScore: 15 },
    { name: 'Stack tecnológico', value: 'Cloud-first', score: 10, maxScore: 10 },
    { name: 'Localização', value: 'Brasil', score: 10, maxScore: 10 },
  ]

  const totalScore = criteria.reduce((acc, c) => acc + c.score, 0)

  return (
    <div className="bg-white rounded-2xl shadow-2xl shadow-black/10 overflow-hidden">
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
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center">
            <Users className="w-4 h-4 text-violet-600" weight="duotone" />
          </div>
          <span className="font-semibold text-gray-900">Adoção do Time</span>
        </div>
        <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center">
          <span className="text-sm font-bold text-violet-700">{Math.round((totalCertified/totalUsers)*100)}%</span>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {users.map((team, i) => (
          <motion.div
            key={team.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4, ease: PREMIUM_EASE }}
            className="p-3 bg-gray-50 rounded-xl"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-gray-900 text-sm">{team.name}</span>
              <span className="text-xs text-gray-500">{team.total} pessoas</span>
            </div>
            <div className="flex items-center gap-4 text-xs mb-2">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-violet-400" />
                <span className="text-gray-600">Treinados: <strong>{team.trained}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-gray-600">Certificados: <strong>{team.certified}</strong></span>
              </div>
            </div>
            <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
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

      <div className="px-6 py-3 bg-violet-50 border-t border-violet-100 flex items-center justify-center gap-2">
        <Lightning className="w-4 h-4 text-violet-600" weight="fill" />
        <span className="text-sm font-medium text-violet-700">Certificados via Fluidz</span>
      </div>
    </div>
  )
}

function MetricasMockup() {
  const metrics = [
    { name: 'Taxa de Conversão', value: '23.4%', change: '+5.2%', up: true },
    { name: 'Ticket Médio', value: 'R$ 8.5k', change: '+12%', up: true },
    { name: 'Ciclo de Venda', value: '18 dias', change: '-3 dias', up: true },
    { name: 'CAC', value: 'R$ 1.2k', change: '-8%', up: true },
  ]

  return (
    <div className="bg-white rounded-2xl shadow-2xl shadow-black/10 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center">
            <ChartBar className="w-4 h-4 text-cyan-600" weight="duotone" />
          </div>
          <span className="font-semibold text-gray-900">Dashboard de Métricas</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Clock className="w-3.5 h-3.5" />
          Atualizado agora
        </div>
      </div>

      <div className="p-4 grid grid-cols-2 gap-3">
        {metrics.map((metric, i) => (
          <motion.div
            key={metric.name}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1, duration: 0.4, ease: PREMIUM_EASE }}
            className="p-3 bg-gray-50 rounded-xl"
          >
            <div className="text-xs text-gray-500 mb-1">{metric.name}</div>
            <div className="text-xl font-bold text-gray-900 mb-1">{metric.value}</div>
            <div className={cn(
              'inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-xs font-medium',
              metric.up ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
            )}>
              <TrendUp className="w-3 h-3" />
              {metric.change}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="px-4 pb-4">
        <div className="h-16 bg-gradient-to-t from-cyan-50 to-transparent rounded-xl flex items-end justify-between px-3 pb-2">
          {[40, 55, 45, 60, 50, 70, 65, 80, 75, 85, 90, 95].map((h, i) => (
            <motion.div
              key={i}
              className="w-1.5 bg-cyan-500 rounded-t"
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

const PILAR_MOCKUPS: Record<string, React.FC> = {
  journey: JourneyMockup,
  processos: ProcessosMockup,
  dados: DadosMockup,
  icp: ICPMockup,
  adocao: AdocaoMockup,
  metricas: MetricasMockup,
}

// ============================================================================
// VERTICAL STEPPER COMPONENT
// ============================================================================

interface StepItemProps {
  pilar: Pilar
  index: number
  status: 'completed' | 'current' | 'upcoming'
  onClick: () => void
  isLast: boolean
}

function StepItem({ pilar, index, status, onClick, isLast }: StepItemProps) {
  const Icon = ICON_MAP[pilar.icon] || MapTrifold
  const isCompleted = status === 'completed'
  const isCurrent = status === 'current'

  return (
    <div className="relative">
      {/* Connecting line */}
      {!isLast && (
        <div
          className={cn(
            'absolute left-6 top-[56px] w-0.5 h-[calc(100%-32px)] transition-colors duration-500',
            isCompleted ? 'bg-brand' : 'bg-gray-700'
          )}
        />
      )}

      <button
        onClick={onClick}
        className={cn(
          'w-full flex items-start gap-4 p-4 rounded-2xl text-left transition-all duration-300',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0F]',
          isCurrent && 'bg-white/5 ring-1 ring-white/10',
          !isCurrent && 'hover:bg-white/[0.02]'
        )}
      >
        {/* Step indicator */}
        <div className="relative shrink-0">
          <motion.div
            className={cn(
              'w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500',
              isCompleted && 'bg-brand shadow-lg shadow-brand/30',
              isCurrent && 'shadow-lg',
              !isCompleted && !isCurrent && 'bg-gray-800'
            )}
            style={{
              backgroundColor: isCurrent ? pilar.cor : undefined,
              boxShadow: isCurrent ? `0 8px 30px ${pilar.cor}40` : undefined,
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isCompleted ? (
              <Check className="w-5 h-5 text-white" weight="bold" />
            ) : (
              <Icon
                className={cn(
                  'w-5 h-5 transition-colors duration-300',
                  isCurrent ? 'text-white' : 'text-gray-500'
                )}
                weight={isCurrent ? 'fill' : 'duotone'}
              />
            )}
          </motion.div>

          {/* Step number badge */}
          <div
            className={cn(
              'absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center',
              'text-[10px] font-bold transition-all duration-300',
              isCompleted && 'bg-brand/20 text-brand',
              isCurrent && 'bg-white text-gray-900 shadow-md',
              !isCompleted && !isCurrent && 'bg-gray-700 text-gray-400'
            )}
          >
            {pilar.numero}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 pt-1">
          <h4 className={cn(
            'font-semibold mb-1 transition-colors duration-300',
            isCurrent ? 'text-white' : isCompleted ? 'text-gray-300' : 'text-gray-500'
          )}>
            {pilar.nome}
          </h4>

          <p className={cn(
            'text-sm leading-relaxed transition-all duration-300',
            isCurrent ? 'text-gray-300 opacity-100' : 'text-gray-600 opacity-0 h-0 overflow-hidden'
          )}>
            {pilar.headline}
          </p>
        </div>

        {/* Arrow indicator for current */}
        {isCurrent && (
          <motion.div
            className="shrink-0 pt-2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowRight className="w-5 h-5 text-brand" weight="bold" />
          </motion.div>
        )}
      </button>
    </div>
  )
}

// ============================================================================
// MOBILE HORIZONTAL STEPPER
// ============================================================================

function MobileStepper({
  pilares,
  activeIndex,
  onSelect
}: {
  pilares: Pilar[]
  activeIndex: number
  onSelect: (index: number) => void
}) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const hasMounted = useRef(false)

  // Auto-scroll to active (only after user interaction, not on mount)
  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true
      return
    }
    if (scrollRef.current) {
      const buttons = scrollRef.current.querySelectorAll('button')
      if (buttons[activeIndex]) {
        buttons[activeIndex].scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        })
      }
    }
  }, [activeIndex])

  return (
    <div className="lg:hidden mb-8">
      {/* Progress bar */}
      <div className="h-1 bg-gray-800 rounded-full mb-4 mx-4">
        <motion.div
          className="h-full bg-brand rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${((activeIndex + 1) / pilares.length) * 100}%` }}
          transition={{ duration: 0.5, ease: PREMIUM_EASE }}
        />
      </div>

      {/* Horizontal scroll */}
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto pb-2 px-4 scrollbar-hide snap-x snap-mandatory"
      >
        {pilares.map((pilar, i) => {
          const isCompleted = i < activeIndex
          const isCurrent = i === activeIndex
          const Icon = ICON_MAP[pilar.icon] || MapTrifold

          return (
            <button
              key={pilar.id}
              onClick={() => onSelect(i)}
              className={cn(
                'shrink-0 snap-start flex items-center gap-2 px-4 py-2.5 rounded-xl',
                'font-medium text-sm transition-all duration-300',
                isCurrent && 'bg-brand text-white shadow-lg shadow-brand/30',
                isCompleted && 'bg-brand/20 text-brand',
                !isCurrent && !isCompleted && 'bg-gray-800 text-gray-400'
              )}
            >
              <Icon className="w-4 h-4" weight={isCurrent ? 'fill' : 'duotone'} />
              <span>{pilar.nome.split(' ')[0]}</span>
            </button>
          )
        })}
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-1.5 mt-4">
        {pilares.map((_, i) => (
          <button
            key={i}
            onClick={() => onSelect(i)}
            className={cn(
              'h-1.5 rounded-full transition-all duration-300',
              i === activeIndex ? 'bg-brand w-6' : 'bg-gray-700 w-1.5'
            )}
          />
        ))}
      </div>
    </div>
  )
}

// ============================================================================
// MAIN SECTION COMPONENT
// ============================================================================

export function PilaresStepperSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])
  const prefersReducedMotion = useReducedMotion()

  const activePilar = PILARES[activeIndex]
  const ActiveMockup = PILAR_MOCKUPS[activePilar.id] || JourneyMockup

  // Scroll-driven activation
  useEffect(() => {
    if (prefersReducedMotion) return

    const observers = stepRefs.current.map((ref, index) => {
      if (!ref) return null

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
              setActiveIndex(index)
            }
          })
        },
        {
          threshold: 0.5,
          rootMargin: '-30% 0px -30% 0px'
        }
      )

      observer.observe(ref)
      return observer
    })

    return () => {
      observers.forEach((observer) => observer?.disconnect())
    }
  }, [prefersReducedMotion])

  const getStatus = (index: number): 'completed' | 'current' | 'upcoming' => {
    if (index < activeIndex) return 'completed'
    if (index === activeIndex) return 'current'
    return 'upcoming'
  }

  return (
    <section ref={sectionRef} className="py-24 sm:py-32 bg-[#0A0A0F] relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-brand/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-violet-500/5 rounded-full blur-[100px]" />
      </div>

      <Container className="relative">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand/10 border border-brand/20 rounded-full mb-6">
              <span className="text-sm font-medium text-brand">A Solução</span>
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
              Cada pilar resolve uma dor real. Juntos, transformam Bitrix24 em motor de receita previsível.
            </p>
          </Reveal>

          {/* Progress indicator */}
          <Reveal delay={0.3}>
            <div className="mt-8 flex items-center justify-center gap-3">
              <span className="text-sm text-gray-500">Progresso</span>
              <div className="w-32 h-2 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-brand to-violet-500 rounded-full"
                  animate={{ width: `${((activeIndex + 1) / PILARES.length) * 100}%` }}
                  transition={{ duration: 0.5, ease: PREMIUM_EASE }}
                />
              </div>
              <span className="text-sm font-semibold text-white">
                {activeIndex + 1}/{PILARES.length}
              </span>
            </div>
          </Reveal>
        </div>

        {/* Mobile stepper */}
        <MobileStepper
          pilares={PILARES}
          activeIndex={activeIndex}
          onSelect={setActiveIndex}
        />

        {/* Desktop layout */}
        <div className="hidden lg:grid lg:grid-cols-[340px_1fr] gap-12 xl:gap-16 items-start">

          {/* LEFT: Vertical Stepper (sticky) */}
          <div className="sticky top-24 space-y-1">
            {PILARES.map((pilar, index) => (
              <div
                key={pilar.id}
                ref={(el) => { stepRefs.current[index] = el }}
              >
                <StepItem
                  pilar={pilar}
                  index={index}
                  status={getStatus(index)}
                  onClick={() => setActiveIndex(index)}
                  isLast={index === PILARES.length - 1}
                />
              </div>
            ))}
          </div>

          {/* RIGHT: Mockup + Content */}
          <div className="sticky top-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePilar.id}
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.98 }}
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
                    Etapa {activeIndex + 1} de {PILARES.length}
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
                        Você recebe
                      </span>
                    </div>
                    <p className="text-white font-medium">
                      {activePilar.voceRecebe}
                    </p>
                  </div>

                  {/* Navigation hint */}
                  {activeIndex < PILARES.length - 1 && (
                    <motion.button
                      onClick={() => setActiveIndex(activeIndex + 1)}
                      className="mt-6 flex items-center gap-2 text-sm text-gray-400 hover:text-brand transition-colors group"
                      whileHover={{ x: 5 }}
                    >
                      <span>Próximo: {PILARES[activeIndex + 1].nome}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  )}

                  {/* Final step celebration */}
                  {activeIndex === PILARES.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mt-6 p-4 bg-gradient-to-r from-brand/10 to-violet-500/10 rounded-2xl border border-brand/20"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-brand/20 flex items-center justify-center">
                          <Check className="w-5 h-5 text-brand" weight="bold" />
                        </div>
                        <div>
                          <div className="font-semibold text-white">Metodologia completa!</div>
                          <div className="text-sm text-gray-400">Todos os 6 pilares trabalhando juntos</div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile content */}
        <div className="lg:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePilar.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: PREMIUM_EASE }}
            >
              {/* Mockup */}
              <div className="mb-6">
                <ActiveMockup />
              </div>

              {/* Content */}
              <div className="space-y-4 px-4">
                <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold"
                  style={{
                    backgroundColor: `${activePilar.cor}15`,
                    color: activePilar.cor
                  }}
                >
                  Etapa {activeIndex + 1} de {PILARES.length}
                </div>

                <h3 className="text-2xl font-bold text-white">
                  {activePilar.nome}
                </h3>

                <p className="text-lg text-gray-300 leading-relaxed">
                  {activePilar.headline}
                </p>

                <p className="text-gray-400 leading-relaxed">
                  {activePilar.descricao}
                </p>

                {/* Deliverable */}
                <div
                  className="mt-4 p-4 rounded-xl border"
                  style={{
                    backgroundColor: `${activePilar.cor}08`,
                    borderColor: `${activePilar.cor}20`,
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${activePilar.cor}25` }}
                    >
                      <Check className="w-3 h-3" style={{ color: activePilar.cor }} weight="bold" />
                    </div>
                    <span
                      className="text-xs font-bold uppercase tracking-wider"
                      style={{ color: activePilar.cor }}
                    >
                      Você recebe
                    </span>
                  </div>
                  <p className="text-white font-medium text-sm">
                    {activePilar.voceRecebe}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  )
}
