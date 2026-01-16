'use client'

import { useState, useEffect } from 'react'
import { Container } from '@/components/layout'
import { Badge, Reveal } from '@/components/shared'
import { ArrowRight } from 'lucide-react'
import {
  Robot,
  Lightning,
  Warning,
  ChatCircle,
  FileText,
  Calendar,
  TrendUp,
  CheckCircle,
  ArrowsClockwise,
} from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ZOPU_LINKS } from '@/lib/constants'
import { durations, easings } from '@/lib/motion'

// Capacidades dos Agentes de IA
const AI_CAPABILITIES = [
  {
    id: 'automate',
    icon: ArrowsClockwise,
    title: 'Automatiza o Operacional',
    subtitle: 'Menos tempo no sistema, mais tempo com cliente',
    description: 'O CoPilot move negócios no pipeline quando o cliente responde, dispara follow-up após reuniões e atualiza campos automaticamente. Menos tempo atualizando o CRM — mais tempo vendendo.',
    painPoint: 'Seu vendedor passou o dia atualizando status no CRM em vez de vender',
    result: 'Vendedor focado em vender, não em preencher formulário',
    flow: [
      { step: 'Cliente responde', icon: ChatCircle, status: 'trigger' },
      { step: 'CoPilot detecta', icon: Robot, status: 'processing' },
      { step: 'Move pipeline', icon: ArrowsClockwise, status: 'action' },
      { step: 'Follow-up agendado', icon: CheckCircle, status: 'done' },
    ],
  },
  {
    id: 'respond',
    icon: ChatCircle,
    title: 'Responde e Qualifica',
    subtitle: 'Menos leads sem resposta, mais velocidade.',
    description: 'A IA responde perguntas frequentes automaticamente (preço, horário, disponibilidade), qualifica o lead com perguntas configuradas e avisa o vendedor quando precisa de humano.',
    painPoint: 'Lead entrou no WhatsApp às 22h. Ninguém viu. Comprou do concorrente às 8h',
    result: 'Menos perdas por demora na resposta',
    flow: [
      { step: 'Mensagem 22h', icon: ChatCircle, status: 'trigger' },
      { step: 'IA responde', icon: Robot, status: 'processing' },
      { step: 'Qualifica lead', icon: TrendUp, status: 'action' },
      { step: 'Lead quente', icon: CheckCircle, status: 'done' },
    ],
  },
  {
    id: 'alert',
    icon: TrendUp,
    title: 'Avisa Antes de Perder',
    subtitle: 'Você age antes de perder. Não depois.',
    description: 'O CoPilot detecta quando um negócio parou de avançar, alerta sobre deals sem interação e sugere a próxima ação baseado no histórico. Você intervém antes que seja tarde.',
    painPoint: 'Descobriu que perdeu o deal quando o cliente já tinha assinado com outro',
    result: 'Intervenção no momento certo, não tarde demais',
    flow: [
      { step: 'Deal parado', icon: Warning, status: 'trigger' },
      { step: 'Analisa histórico', icon: Robot, status: 'processing' },
      { step: 'Identifica risco', icon: TrendUp, status: 'action' },
      { step: 'Alerta vendedor', icon: CheckCircle, status: 'done' },
    ],
  },
]

// Exemplos praticos por setor
const PRACTICAL_EXAMPLES = [
  {
    area: 'Saúde',
    icon: Calendar,
    example: 'Paciente envia "quero marcar consulta" -> IA verifica agenda -> Oferece horários -> Confirma e envia lembrete automático.',
  },
  {
    area: 'Serviços',
    icon: FileText,
    example: 'Cliente pede proposta -> IA puxa histórico de projetos similares -> Sugere escopo e preço -> Vendedor só revisa e envia.',
  },
  {
    area: 'Varejo',
    icon: ChatCircle,
    example: 'Cliente pergunta "tem na cor azul?" -> IA consulta estoque -> Responde com foto e preço -> Direciona para humano se quiser comprar.',
  },
  {
    area: 'Turismo',
    icon: TrendUp,
    example: 'Lead solicita cotação -> IA monta pacote baseado em preferências -> Envia opções personalizadas -> Agenda call se interessar.',
  },
]

// Workflow Visual Component with animated connections
function WorkflowVisual({ flow, activeIndex }: { flow: typeof AI_CAPABILITIES[0]['flow'], activeIndex: number }) {
  const prefersReducedMotion = useReducedMotion()
  const [animatedStep, setAnimatedStep] = useState(0)

  // Animate through steps
  useEffect(() => {
    if (prefersReducedMotion) return

    setAnimatedStep(0)
    const interval = setInterval(() => {
      setAnimatedStep((prev) => (prev < flow.length - 1 ? prev + 1 : 0))
    }, 2000)

    return () => clearInterval(interval)
  }, [flow.length, activeIndex, prefersReducedMotion])

  const statusColors = {
    trigger: { bg: 'bg-amber-100', border: 'border-amber-300', text: 'text-amber-700', line: '#F59E0B' },
    processing: { bg: 'bg-blue-100', border: 'border-blue-300', text: 'text-blue-700', line: '#3B82F6' },
    action: { bg: 'bg-purple-100', border: 'border-purple-300', text: 'text-purple-700', line: '#8B5CF6' },
    done: { bg: 'bg-green-100', border: 'border-green-300', text: 'text-green-700', line: '#10B981' },
  }

  return (
    <div className="relative py-4">
      {/* SVG Connection Lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="33%" stopColor="#3B82F6" />
            <stop offset="66%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
        </defs>
      </svg>

      {/* Workflow Nodes */}
      <div className="grid grid-cols-4 gap-3 sm:gap-4">
        {flow.map((item, idx) => {
          const Icon = item.icon
          const colors = statusColors[item.status as keyof typeof statusColors]
          const isActive = idx <= animatedStep
          const isCurrent = idx === animatedStep

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: durations.medium,
                delay: idx * 0.1,
                ease: easings.premium,
              }}
              className="relative"
            >
              {/* Connection line to next node */}
              {idx < flow.length - 1 && (
                <div className="absolute top-1/2 left-full w-full h-0.5 -translate-y-1/2 z-0">
                  <div className="h-full bg-gray-200 rounded-full" />
                  <motion.div
                    className="absolute top-0 left-0 h-full rounded-full"
                    style={{ backgroundColor: colors.line }}
                    initial={{ width: 0 }}
                    animate={{ width: isActive && idx < animatedStep ? '100%' : 0 }}
                    transition={{ duration: 0.5, ease: easings.premium }}
                  />
                </div>
              )}

              {/* Node */}
              <motion.div
                className={cn(
                  'relative z-10 flex flex-col items-center p-3 sm:p-4 rounded-2xl border-2 transition-all duration-300',
                  isActive ? colors.bg : 'bg-gray-50',
                  isActive ? colors.border : 'border-gray-200',
                  isCurrent && 'ring-2 ring-offset-2 ring-brand/30'
                )}
                animate={isCurrent ? { scale: [1, 1.02, 1] } : { scale: 1 }}
                transition={{ duration: 1, repeat: isCurrent ? Infinity : 0 }}
              >
                {/* Icon */}
                <div
                  className={cn(
                    'w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-2',
                    isActive ? 'bg-white shadow-sm' : 'bg-white/50'
                  )}
                >
                  <Icon
                    size={20}
                    weight="duotone"
                    className={cn(
                      'sm:w-6 sm:h-6',
                      isActive ? colors.text : 'text-gray-400'
                    )}
                  />
                </div>

                {/* Label */}
                <p
                  className={cn(
                    'text-xs sm:text-sm font-medium text-center leading-tight',
                    isActive ? 'text-gray-900' : 'text-gray-400'
                  )}
                >
                  {item.step}
                </p>

                {/* Active indicator dot */}
                {isCurrent && (
                  <motion.div
                    className="absolute -top-1 -right-1 w-3 h-3 bg-brand rounded-full"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                )}
              </motion.div>
            </motion.div>
          )
        })}
      </div>

      {/* Progress bar */}
      <div className="mt-6 h-1 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-amber-500 via-blue-500 via-purple-500 to-green-500"
          initial={{ width: 0 }}
          animate={{ width: `${((animatedStep + 1) / flow.length) * 100}%` }}
          transition={{ duration: 0.5, ease: easings.premium }}
        />
      </div>
    </div>
  )
}

export function AIInAction() {
  const [activeCapability, setActiveCapability] = useState(0)

  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-bg-secondary overflow-hidden">
      <Container>
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <Reveal>
            <Badge className="mb-4">CoPilot Bitrix24</Badge>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              IA que trabalha.{' '}
              <span className="text-brand">Não que promete.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
              Enquanto outros falam de IA para o futuro, o Bitrix24 CoPilot já está
              automatizando tarefas e prevendo resultados —{' '}
              <strong className="text-gray-900">desde o primeiro dia.</strong>
            </p>
          </Reveal>
        </div>

        {/* Tabs de capacidades - Premium styling */}
        <Reveal delay={0.3}>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 sm:mb-14">
            {AI_CAPABILITIES.map((cap, index) => {
              const Icon = cap.icon
              const isActive = index === activeCapability
              return (
                <button
                  key={cap.id}
                  onClick={() => setActiveCapability(index)}
                  className={cn(
                    'relative px-5 py-3 sm:px-6 sm:py-3.5 rounded-2xl font-medium transition-all duration-300 ease-out-expo',
                    isActive
                      ? 'text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/80'
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeAITab"
                      className="absolute inset-0 bg-brand rounded-2xl shadow-elevated shadow-brand/20"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <Icon size={16} weight="duotone" />
                    {cap.title}
                  </span>
                </button>
              )
            })}
          </div>
        </Reveal>

        {/* Conteudo da capacidade ativa */}
        <Reveal delay={0.4}>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Lado esquerdo - Descricao */}
            <div className="space-y-6">
              {/* Pain point - Premium card */}
              <div className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-card hover:shadow-card-hover transition-all duration-300 ease-out-expo">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-red-50 rounded-xl flex items-center justify-center shrink-0">
                    <Warning size={20} weight="duotone" className="text-red-500" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                      O desafio
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      {AI_CAPABILITIES[activeCapability].painPoint}
                    </p>
                  </div>
                </div>
              </div>

              {/* Titulo e descricao */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCapability}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: durations.fast, ease: easings.premium }}
                >
                  <p className="text-sm font-semibold text-brand uppercase tracking-wide mb-2">
                    {AI_CAPABILITIES[activeCapability].title}
                  </p>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                    {AI_CAPABILITIES[activeCapability].subtitle}
                  </h3>
                  <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                    {AI_CAPABILITIES[activeCapability].description}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Resultado - Premium card */}
              <div className="flex items-center gap-3 p-5 bg-green-50 rounded-2xl border border-green-100/80 shadow-sm">
                <CheckCircle size={20} weight="duotone" className="text-green-600 shrink-0" />
                <p className="text-green-800 font-medium">
                  {AI_CAPABILITIES[activeCapability].result}
                </p>
              </div>
            </div>

            {/* Lado direito - Workflow Visual */}
            <div className="bg-linear-to-br from-gray-50 to-gray-100/80 rounded-3xl p-6 sm:p-8 shadow-card">
              <div className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-sm">
                {/* Header do card */}
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                  <div className="w-10 h-10 bg-brand/10 rounded-lg flex items-center justify-center">
                    <Robot size={20} weight="duotone" className="text-brand" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">CoPilot em ação</p>
                    <p className="text-xs text-gray-500">Fluxo automático</p>
                  </div>
                </div>

                {/* Workflow Visual */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCapability}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <WorkflowVisual
                      flow={AI_CAPABILITIES[activeCapability].flow}
                      activeIndex={activeCapability}
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Footer */}
                <div className="mt-5 pt-4 border-t border-gray-100 flex items-center gap-2">
                  <Lightning size={16} weight="duotone" className="text-amber-500" />
                  <span className="text-xs text-gray-500">Automação completa em segundos</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Exemplos praticos - Premium styling */}
        <Reveal delay={0.5}>
          <div className="mt-14 sm:mt-20 bg-linear-to-br from-gray-50 to-gray-100/80 rounded-3xl p-6 sm:p-8 lg:p-10 relative overflow-hidden shadow-card">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-brand/3 rounded-full -translate-y-1/2 translate-x-1/2 blur-xl" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-brand/3 rounded-full translate-y-1/2 -translate-x-1/2 blur-xl" />

            <div className="relative z-10">
              <div className="text-center mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Automações na prática
                </h3>
                <p className="text-gray-600">
                  Veja como os agentes trabalham em diferentes áreas
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {PRACTICAL_EXAMPLES.map((example) => {
                  const Icon = example.icon
                  return (
                    <div
                      key={example.area}
                      className="bg-white p-5 rounded-2xl border border-gray-200/80 hover:border-gray-300 shadow-sm hover:shadow-card-hover transition-all duration-300 ease-out-expo hover:-translate-y-1"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-9 h-9 bg-brand/10 rounded-xl flex items-center justify-center">
                          <Icon size={16} weight="duotone" className="text-brand" />
                        </div>
                        <span className="font-semibold text-gray-900">{example.area}</span>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {example.example}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Stats - Premium styling */}
        <Reveal delay={0.6}>
          <div className="mt-12 sm:mt-16 grid grid-cols-3 gap-4">
            {[
              { numero: '100%', label: 'Nativo no Bitrix24' },
              { numero: '0', label: 'Integrações extras' },
              { numero: 'Nativo', label: 'Pronto para usar' },
            ].map((item, index) => (
              <div
                key={index}
                className="text-center p-5 rounded-2xl bg-gray-50 hover:bg-gray-100/80 transition-all duration-300 ease-out-expo border border-gray-100 hover:border-gray-200"
              >
                <p className="text-xl sm:text-2xl font-bold text-brand">
                  {item.numero}
                </p>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* CTA - Premium button */}
        <Reveal delay={0.7}>
          <div className="mt-12 sm:mt-16 text-center">
            <a
              href={ZOPU_LINKS.whatsappEspecialista}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-brand text-white font-semibold rounded-2xl hover:bg-brand-hover transition-all duration-300 ease-out-expo shadow-elevated shadow-brand/20 hover:shadow-elevated-hover hover:shadow-brand/30 hover:-translate-y-1 group"
            >
              Falar com especialista
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300 ease-out-expo" />
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
