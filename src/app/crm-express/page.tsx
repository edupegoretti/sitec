'use client'

import { useRef, useState, useEffect, useMemo } from 'react'
import { motion, useInView, useReducedMotion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  Check,
  X,
  WhatsappLogo,
  Kanban,
  BellRinging,
  UserPlus,
  CheckCircle,
  Trophy,
  Sparkle,
  MagnifyingGlass,
  Gear,
  GraduationCap,
  Rocket,
  ListChecks,
  Database,
  WarningCircle,
  Quotes,
  TrendUp,
  Clock,
  ShieldCheck,
  Star,
  Lightning,
  ChartLineUp,
  Users,
} from '@phosphor-icons/react'
import { useFlashlightPosition, useMediaQuery } from '@/hooks/useMousePosition'

// ============================================================================
// CONSTANTS
// ============================================================================

const WHATSAPP_LINK = 'https://wa.me/554733079280?text=Ol%C3%A1%2C%20tenho%20interesse%20no%20CRM%20Express%20e%20gostaria%20de%20saber%20mais.'

const IDEAL_PARA = [
  'Vende via WhatsApp e perde histórico das conversas',
  'Depende da memória do vendedor para fazer follow-up',
  'Não sabe quantos leads tem no funil agora',
  'Quer organizar vendas sem projeto de 6 meses',
  'Time de 2 a 15 vendedores',
]

const NAO_E_PARA = [
  'Já tem um Bitrix24 funcional e quer expandir funcionalidades mais avançadas',
  'Quer integrar marketing + vendas + pós-vendas em uma operação completa',
  'Sua empresa possui operação complexa com múltiplas unidades',
]

const PROBLEMAS = [
  {
    numero: '67%',
    titulo: 'dos leads são esquecidos',
    descricao: 'Sem sistema, oportunidades morrem no WhatsApp do vendedor.',
    icon: Users,
  },
  {
    numero: '45%',
    titulo: 'das vendas perdem timing',
    descricao: 'Follow-up tardio ou inexistente mata a conversão.',
    icon: Clock,
  },
  {
    numero: '3h',
    titulo: 'por dia em retrabalho',
    descricao: 'Buscando informações que deveriam estar centralizadas.',
    icon: MagnifyingGlass,
  },
  {
    numero: '0%',
    titulo: 'de visibilidade',
    descricao: 'O gestor descobre os problemas quando já é tarde.',
    icon: ChartLineUp,
  },
]

const PIPELINE_STAGES = [
  { id: 'capture', label: 'Lead capturado', icon: UserPlus, color: 'brand' },
  { id: 'centralize', label: 'Conversa no CRM', icon: WhatsappLogo, color: 'success' },
  { id: 'organize', label: 'Pipeline visual', icon: Kanban, color: 'info' },
  { id: 'automate', label: 'Follow-up automático', icon: BellRinging, color: 'warning' },
  { id: 'close', label: 'Venda fechada', icon: CheckCircle, color: 'success', isFinal: true },
]

const JORNADA = [
  {
    fase: 1,
    nome: 'Entender',
    periodo: 'Semana 1',
    descricao: 'Mapeamos como sua equipe vende e identificamos gargalos.',
    entregas: ['Diagnóstico do fluxo comercial', 'Mapa de origem dos leads', 'Identificação de vazamentos'],
    icon: MagnifyingGlass,
    color: '#635BFF',
  },
  {
    fase: 2,
    nome: 'Configurar',
    periodo: 'Semanas 2-3',
    descricao: 'Configuramos o Bitrix24 para espelhar seu processo real.',
    entregas: ['Pipeline de leads', 'Pipeline de vendas', 'WhatsApp integrado', 'Automações'],
    icon: Gear,
    color: '#F59E0B',
  },
  {
    fase: 3,
    nome: 'Treinar',
    periodo: 'Semana 4',
    descricao: 'Certificação Fluidz por função. Cada um aprende o que precisa.',
    entregas: ['Trilha para vendedores', 'Trilha para gestores', 'Material de referência'],
    icon: GraduationCap,
    color: '#EC4899',
  },
  {
    fase: 4,
    nome: 'Lançar',
    periodo: 'Semana 4-5',
    descricao: 'Go-live com suporte dedicado. Ajustes inclusos.',
    entregas: ['CRM em produção', 'Suporte WhatsApp', 'Dashboard ativo'],
    icon: Rocket,
    color: '#00A67E',
  },
]

const DIFERENCIAIS = [
  {
    id: 'processo',
    icon: ListChecks,
    label: 'Processo',
    antes: [
      'Configura campos e torce pra funcionar',
      'CRM vira planilha glorificada',
      'Equipe não sabe por que usar',
    ],
    depois: [
      'Mapeia a jornada de compra do seu cliente',
      'Mapeia seu funil real antes de configurar',
      'CRM espelha como você já vende',
      'Automações + IA planejadas para aumentar sua conversão',
    ],
    resultado: 'Sistema que a equipe quer usar',
  },
  {
    id: 'dados',
    icon: Database,
    label: 'Dados',
    antes: [
      'Dados bagunçados, campos livres',
      'Duplicatas e inconsistências',
      'Relatórios não confiáveis',
    ],
    depois: [
      'Campos padronizados, etapas definidas',
      'Base limpa desde o início',
      'Dashboards que refletem a realidade',
    ],
    resultado: 'Decisões baseadas em dados reais',
  },
  {
    id: 'whatsapp',
    icon: WhatsappLogo,
    label: 'WhatsApp',
    antes: [
      'Conversas no celular do vendedor',
      'Histórico perdido quando alguém sai',
      'Gestor sem visibilidade',
    ],
    depois: [
      'Histórico centralizado no CRM',
      'Responsáveis definidos por lead',
      'Conversas rastreáveis e auditáveis',
    ],
    resultado: 'WhatsApp governado, não caótico',
  },
  {
    id: 'treinamento',
    icon: GraduationCap,
    label: 'Treinamento',
    antes: [
      'Treinamento genérico',
      'Todo mundo junto, ninguém aprende',
      'A equipe esquece em 30 dias',
    ],
    depois: [
      'Certificação Fluidz por função',
      'Vendedor aprende o que vendedor precisa',
      'Conteúdo sempre atualizado',
    ],
    resultado: '96% de retenção anual',
  },
]

const INCLUSO = [
  'Diagnóstico do processo comercial',
  'Configuração completa do Bitrix24',
  'Pipeline de leads + pipeline de vendas',
  'WhatsApp Business integrado',
  'Automações de follow-up',
  'Dashboard de métricas',
  'Certificação Fluidz por função',
  '30 dias de acompanhamento pós-go-live',
]

// ============================================================================
// UTILITIES & HOOKS
// ============================================================================

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

function useCountUp(target: number, isInView: boolean, duration = 1500) {
  const [count, setCount] = useState(0)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (!isInView) return
    if (prefersReducedMotion) {
      setCount(target)
      return
    }

    const start = performance.now()
    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [isInView, target, duration, prefersReducedMotion])

  return count
}

// ============================================================================
// COMPONENTS
// ============================================================================

// Live CRM Simulation - Cards moving through pipeline
function LivePipelineSimulation({ isInView }: { isInView: boolean }) {
  const [leads, setLeads] = useState<Array<{ id: number; name: string; stage: number; value: string }>>([])
  const prefersReducedMotion = useReducedMotion()

  const LEAD_NAMES = ['Maria Silva', 'João Santos', 'Ana Costa', 'Pedro Lima', 'Carla Souza', 'Bruno Reis']
  const LEAD_VALUES = ['R$ 5.200', 'R$ 12.800', 'R$ 8.400', 'R$ 3.900', 'R$ 15.000', 'R$ 7.600']

  useEffect(() => {
    if (!isInView || prefersReducedMotion) return

    // Add initial leads
    const initialLeads = [
      { id: 1, name: 'Maria Silva', stage: 0, value: 'R$ 5.200' },
      { id: 2, name: 'João Santos', stage: 1, value: 'R$ 12.800' },
      { id: 3, name: 'Pedro Lima', stage: 2, value: 'R$ 8.400' },
    ]
    setLeads(initialLeads)

    // Progress leads through stages
    const progressInterval = setInterval(() => {
      setLeads(prev => prev.map(lead => ({
        ...lead,
        stage: lead.stage < 4 ? lead.stage + 1 : lead.stage
      })).filter(lead => lead.stage <= 4))
    }, 2500)

    // Add new leads
    const addInterval = setInterval(() => {
      setLeads(prev => {
        if (prev.length >= 5) return prev
        const newId = Date.now()
        return [...prev, {
          id: newId,
          name: LEAD_NAMES[Math.floor(Math.random() * LEAD_NAMES.length)],
          stage: 0,
          value: LEAD_VALUES[Math.floor(Math.random() * LEAD_VALUES.length)]
        }]
      })
    }, 4000)

    return () => {
      clearInterval(progressInterval)
      clearInterval(addInterval)
    }
  }, [isInView, prefersReducedMotion])

  const stageColors = ['#635BFF', '#25D366', '#3B82F6', '#F59E0B', '#00A67E']
  const stageNames = ['Novo', 'Contato', 'Qualificado', 'Proposta', 'Fechado']

  return (
    <div className="relative w-full">
      {/* Pipeline columns */}
      <div className="grid grid-cols-5 gap-2">
        {stageNames.map((name, stageIndex) => (
          <div key={name} className="flex flex-col">
            {/* Stage header */}
            <div
              className="text-xs font-bold text-center py-2 rounded-t-lg text-white"
              style={{ backgroundColor: stageColors[stageIndex] }}
            >
              {name}
            </div>

            {/* Stage column */}
            <div className="bg-white/5 backdrop-blur-sm min-h-[180px] rounded-b-lg p-2 border border-white/10 relative overflow-hidden">
              <AnimatePresence mode="popLayout">
                {leads.filter(l => l.stage === stageIndex).map((lead) => (
                  <motion.div
                    key={lead.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8, y: -20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, x: 50 }}
                    transition={{ duration: 0.4, ease }}
                    className="bg-white rounded-lg p-2.5 mb-2 shadow-lg border border-gray-100"
                  >
                    <p className="text-xs font-semibold text-gray-900 truncate">{lead.name}</p>
                    <p className="text-[10px] text-gray-500">{lead.value}</p>
                    {stageIndex === 4 && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="mt-1 flex items-center gap-1"
                      >
                        <CheckCircle size={12} weight="fill" className="text-success" />
                        <span className="text-[10px] text-success font-medium">Ganho!</span>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Empty state indicator */}
              {leads.filter(l => l.stage === stageIndex).length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full border-2 border-dashed border-white/20" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Animated metric counter
function MetricCounter({ value, suffix, label, delay, isInView }: { value: number; suffix: string; label: string; delay: number; isInView: boolean }) {
  const count = useCountUp(value, isInView, 1500)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease }}
      className="text-center"
    >
      <div className="text-2xl sm:text-3xl font-bold text-white">
        {count}{suffix}
      </div>
      <div className="text-xs text-slate-400 mt-1">{label}</div>
    </motion.div>
  )
}

// Hero Section - Split layout with live simulation
function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const isMobile = useMediaQuery('(max-width: 1024px)')
  const prefersReducedMotion = useReducedMotion()

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden bg-[#0A0F1C]">
      {/* Subtle gradient background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand/5 via-transparent to-purple-900/10" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-success/5 via-transparent to-transparent" />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`min-h-screen flex ${isMobile ? 'flex-col justify-center py-16' : 'items-center'}`}>
          <div className={`grid ${isMobile ? 'grid-cols-1 gap-12' : 'lg:grid-cols-2 gap-16 items-center'} w-full`}>

            {/* Left side - Copy */}
            <div className={isMobile ? 'text-center' : ''}>
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease }}
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 mb-6 ${isMobile ? '' : ''}`}
              >
                <Image
                  src="/images/bitrix24screen/gold-partner.png"
                  alt="Bitrix24 Gold Partner"
                  width={18}
                  height={18}
                  className="rounded"
                />
                <span className="text-xs font-medium text-amber-300">Gold Partner Bitrix24</span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1, ease }}
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-6"
              >
                Seu Bitrix24
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand via-purple-400 to-pink-400">
                  entregando resultado em até 30 dias
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2, ease }}
                className="text-base sm:text-lg text-slate-400 mb-8 max-w-lg"
              >
                Para times comerciais que precisam <span className="text-white font-medium">bater meta agora</span> —
                não esperar 6 meses para ver resultado.
              </motion.p>

              {/* Benefits */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3, ease }}
                className={`flex flex-wrap gap-4 mb-10 ${isMobile ? 'justify-center' : ''}`}
              >
                {[
                  { icon: WhatsappLogo, text: 'WhatsApp integrado' },
                  { icon: Kanban, text: 'Pipeline visual' },
                  { icon: BellRinging, text: 'Follow-up automático' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-slate-300">
                    <item.icon size={16} weight="duotone" className="text-brand" />
                    <span>{item.text}</span>
                  </div>
                ))}
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4, ease }}
                className={`flex flex-col sm:flex-row gap-4 ${isMobile ? 'items-center' : ''}`}
              >
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-2 px-6 py-3 bg-brand text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(99,91,255,0.4)] hover:-translate-y-0.5"
                >
                  {!prefersReducedMotion && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
                    />
                  )}
                  <span className="relative z-10">Quero organizar minhas vendas</span>
                  <ArrowRight size={18} weight="bold" className="relative z-10 transition-transform group-hover:translate-x-1" />
                </a>

                <a
                  href="#como-funciona"
                  className="inline-flex items-center gap-2 px-6 py-3 text-slate-300 font-medium hover:text-white transition-colors"
                >
                  Como funciona
                  <ArrowRight size={16} weight="bold" />
                </a>
              </motion.div>

              {/* Trust metrics */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.6, ease }}
                className="mt-12 pt-8 border-t border-white/10"
              >
                <div className={`grid grid-cols-3 gap-6 ${isMobile ? 'max-w-sm mx-auto' : 'max-w-md'}`}>
                  <MetricCounter value={450} suffix="+" label="empresas" delay={0.7} isInView={isInView} />
                  <MetricCounter value={30} suffix=" dias" label="implementação" delay={0.8} isInView={isInView} />
                  <MetricCounter value={96} suffix="%" label="satisfação" delay={0.9} isInView={isInView} />
                </div>
              </motion.div>
            </div>

            {/* Right side - Live CRM Simulation */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3, ease }}
              className="relative"
            >
              {/* Glow effect behind */}
              <div className="absolute -inset-4 bg-gradient-to-r from-brand/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl opacity-50" />

              {/* Simulation container */}
              <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl rounded-2xl border border-white/10 p-4 sm:p-6 shadow-2xl">
                {/* Browser chrome */}
                <div className="flex items-center gap-2 mb-4 pb-4 border-b border-white/10">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="bg-white/5 rounded-lg px-3 py-1.5 text-xs text-slate-400 flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-brand/50" />
                      suaempresa.bitrix24.com.br/pipeline
                    </div>
                  </div>
                </div>

                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-semibold text-white">Pipeline de Vendas</h3>
                    <p className="text-xs text-slate-400">Atualizado em tempo real</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                    <span className="text-xs text-success">Ao vivo</span>
                  </div>
                </div>

                {/* Live Pipeline */}
                <LivePipelineSimulation isInView={isInView} />

                {/* Footer metrics */}
                <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-lg font-bold text-white">12</p>
                    <p className="text-[10px] text-slate-400">Leads ativos</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-success">R$ 48k</p>
                    <p className="text-[10px] text-slate-400">Em negociação</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-brand">32%</p>
                    <p className="text-[10px] text-slate-400">Taxa conversão</p>
                  </div>
                </div>
              </div>

              {/* Floating notification */}
              <motion.div
                initial={{ opacity: 0, y: 20, x: 20 }}
                animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 1.5, ease }}
                className="absolute -bottom-4 -left-4 sm:-left-8 bg-white rounded-xl p-3 shadow-2xl border border-gray-100 max-w-[200px]"
              >
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center shrink-0">
                    <Trophy size={16} weight="fill" className="text-success" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-900">Venda fechada!</p>
                    <p className="text-[10px] text-gray-500">Maria Silva - R$ 5.200</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

    </section>
  )
}

// Qualificacao Section - Premium Design
function QualificacaoSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const prefersReducedMotion = useReducedMotion()

  return (
    <section ref={ref} className="py-20 sm:py-28 bg-gradient-to-b from-white via-gray-50/50 to-white relative overflow-hidden">
      {/* Subtle decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-success/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-64 h-64 bg-brand/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
          className="text-center mb-14"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, ease }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-brand/5 border border-brand/10 rounded-full mb-5"
          >
            <div className="w-2 h-2 rounded-full bg-brand animate-pulse" />
            <span className="text-brand font-semibold text-sm uppercase tracking-wider">
              Antes de continuar
            </span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
            CRM Express é para{' '}
            <span className="relative">
              <span className="relative z-10">você</span>
              <motion.span
                initial={{ width: 0 }}
                animate={isInView ? { width: '100%' } : {}}
                transition={{ duration: 0.8, delay: 0.5, ease }}
                className="absolute bottom-2 left-0 h-3 bg-brand/20 -z-0"
              />
            </span>
            ?
          </h2>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* É para você - Premium Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            className="relative group"
          >
            {/* Glow effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-br from-success/30 via-emerald-400/20 to-success/30 rounded-[28px] opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />

            {/* Card */}
            <div className="relative bg-white rounded-3xl p-8 border-2 border-success/20 shadow-xl shadow-success/5 overflow-hidden">
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-success/10 to-transparent rounded-bl-[80px]" />

              {/* Header */}
              <div className="flex items-center gap-4 mb-8 relative">
                <motion.div
                  className="w-14 h-14 rounded-2xl bg-gradient-to-br from-success to-emerald-400 flex items-center justify-center shadow-lg shadow-success/30"
                  whileHover={!prefersReducedMotion ? { scale: 1.05, rotate: 5 } : {}}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <Check size={28} weight="bold" className="text-white" />
                </motion.div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">É para você se:</h3>
                </div>
              </div>

              {/* Items */}
              <ul className="space-y-4">
                {IDEAL_PARA.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.08, ease }}
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-success/5 transition-colors duration-200 group/item"
                  >
                    <motion.div
                      className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center shrink-0 mt-0.5"
                      whileHover={!prefersReducedMotion ? { scale: 1.2 } : {}}
                    >
                      <Check size={14} weight="bold" className="text-success" />
                    </motion.div>
                    <span className="text-gray-700 group-hover/item:text-gray-900 transition-colors">{item}</span>
                  </motion.li>
                ))}
              </ul>

              {/* Bottom accent */}
              <div className="mt-6 pt-6 border-t border-success/10">
                <div className="flex items-center gap-2 text-success">
                  <Lightning size={18} weight="fill" />
                  <span className="text-sm font-semibold">Implementação em 30 dias</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Não é para você - Premium Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease }}
            className="relative group"
          >
            {/* Card */}
            <div className="relative bg-gradient-to-br from-slate-50 to-gray-100 rounded-3xl p-8 border border-gray-200 shadow-lg overflow-hidden h-full">
              {/* Pattern overlay */}
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage: 'radial-gradient(circle at 2px 2px, #64748b 1px, transparent 0)',
                  backgroundSize: '16px 16px',
                }}
              />

              {/* Header */}
              <div className="flex items-center gap-4 mb-8 relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                  <X size={28} weight="bold" className="text-slate-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Talvez não seja ideal se:</h3>
                </div>
              </div>

              {/* Items */}
              <ul className="space-y-4 relative">
                {NAO_E_PARA.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.08, ease }}
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/50 transition-colors duration-200"
                  >
                    <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center shrink-0 mt-0.5">
                      <X size={14} weight="bold" className="text-gray-400" />
                    </div>
                    <span className="text-gray-600">{item}</span>
                  </motion.li>
                ))}
              </ul>

              {/* Alternative suggestions */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6, ease }}
                className="mt-8 pt-6 border-t border-gray-200 relative"
              >
                <p className="text-sm text-gray-600 mb-4">
                  Para operações mais complexas, conheça:
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/revopslaunch"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:border-brand hover:text-brand hover:shadow-md transition-all duration-200"
                  >
                    <Rocket size={16} weight="duotone" />
                    RevOps Launch
                  </Link>
                  <Link
                    href="/fluidsales"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:border-brand hover:text-brand hover:shadow-md transition-all duration-200"
                  >
                    <ChartLineUp size={16} weight="duotone" />
                    Metodologia Fluidsales
                  </Link>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Problemas Section - Dark Navy com Flashlight
function ProblemasSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { x, y } = useFlashlightPosition(ref)
  const isMobile = useMediaQuery('(max-width: 768px)')
  const prefersReducedMotion = useReducedMotion()

  return (
    <section ref={ref} className="relative py-20 sm:py-28 bg-[#0A1628] overflow-hidden">
      {/* Flashlight effect */}
      {!isMobile && !prefersReducedMotion && (
        <div
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(800px circle at ${x}px ${y}px, rgba(99, 91, 255, 0.08), transparent 40%)`,
          }}
        />
      )}

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Orbs */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-red-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-20 left-20 w-48 h-48 bg-brand/10 rounded-full blur-[100px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
          className="text-center mb-14"
        >
          <p className="text-red-400 font-semibold text-sm uppercase tracking-wider mb-3">
            O problema
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Por que vendas{' '}
            <span className="text-red-400">escapam</span>?
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Sem processo estruturado, sua equipe perde dinheiro todos os dias.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROBLEMAS.map((problema, index) => {
            const Icon = problema.icon
            const countRef = useRef<HTMLDivElement>(null)
            const countInView = useInView(countRef, { once: true })

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + index * 0.1, ease }}
                className="relative p-6 rounded-2xl bg-white/[0.03] backdrop-blur-sm border border-white/10 hover:border-red-500/30 hover:bg-white/[0.05] transition-all duration-300 group"
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon size={24} weight="duotone" className="text-red-400" />
                </div>

                {/* Number */}
                <div ref={countRef} className="text-4xl font-bold text-red-400 mb-2">
                  {problema.numero}
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-white mb-2">
                  {problema.titulo}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-400">
                  {problema.descricao}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* Fontes */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-[10px] text-slate-500/60 text-center mt-10"
        >
          Fontes: HubSpot Sales Report 2024 • Harvard Business Review • McKinsey Global Institute
        </motion.p>
      </div>
    </section>
  )
}

// Jornada Section
function JornadaSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const isMobile = useMediaQuery('(max-width: 768px)')

  return (
    <section ref={ref} className="py-20 sm:py-28 bg-gray-50 relative overflow-hidden">
      {/* Texture */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #000 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
          className="text-center mb-14"
        >
          <p className="text-brand font-semibold text-sm uppercase tracking-wider mb-3">
            Sua jornada
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Do zero ao CRM funcionando{' '}
            <span className="text-brand">em 30 dias</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Processo estruturado em 4 etapas. Você sabe o que esperar em cada uma.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Connection line - desktop */}
          {!isMobile && (
            <div className="hidden lg:block absolute top-24 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-brand via-amber-500 to-success opacity-20" />
          )}

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {JORNADA.map((fase, index) => {
              const Icon = fase.icon

              return (
                <motion.div
                  key={fase.fase}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 + index * 0.1, ease }}
                  className="relative"
                >
                  <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-300 h-full group">
                    {/* Badge */}
                    <div
                      className="absolute -top-3 left-6 px-3 py-1 rounded-full text-xs font-bold text-white"
                      style={{ backgroundColor: fase.color, boxShadow: `0 4px 12px ${fase.color}40` }}
                    >
                      {fase.periodo}
                    </div>

                    {/* Icon */}
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 mt-2 group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: `${fase.color}15` }}
                    >
                      <Icon size={28} weight="duotone" style={{ color: fase.color }} />
                    </div>

                    {/* Name */}
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{fase.nome}</h3>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-4">{fase.descricao}</p>

                    {/* Entregas */}
                    <div className="space-y-2">
                      {fase.entregas.map((entrega, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <div
                            className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                            style={{ backgroundColor: `${fase.color}20` }}
                          >
                            <Check size={10} weight="bold" style={{ color: fase.color }} />
                          </div>
                          <span className="text-xs text-gray-600">{entrega}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6, ease }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-full border border-gray-200 shadow-sm">
            <div className="flex -space-x-1">
              {JORNADA.map((fase, i) => (
                <div
                  key={i}
                  className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center"
                  style={{ backgroundColor: fase.color }}
                >
                  <Check size={12} weight="bold" className="text-white" />
                </div>
              ))}
            </div>
            <span className="text-gray-900 font-medium">4 semanas de trabalho focado = CRM rodando</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Diferenciais Section - Premium Split Layout com Tabs
function DiferenciaisSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [activeTab, setActiveTab] = useState(0)
  const [direction, setDirection] = useState(0)
  const isMobile = useMediaQuery('(max-width: 768px)')

  const handleSelect = (index: number) => {
    setDirection(index > activeTab ? 1 : -1)
    setActiveTab(index)
  }

  const diferencial = DIFERENCIAIS[activeTab]
  const Icon = diferencial.icon

  return (
    <section ref={ref} className="py-20 sm:py-28 bg-[#FAFAFC] relative overflow-hidden">
      {/* Decorative blurs */}
      <div className="absolute top-32 right-0 w-80 h-80 bg-brand/5 rounded-full translate-x-1/2 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 left-0 w-64 h-64 bg-success/5 rounded-full -translate-x-1/2 blur-[100px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
          className="text-center mb-10"
        >
          <p className="text-brand font-semibold text-sm uppercase tracking-wider mb-3">
            Por que funciona
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            O que fazemos diferente
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A maioria dos CRMs falha porque é implementada como software.
            Nós implementamos como sistema de vendas.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10"
        >
          {DIFERENCIAIS.map((item, index) => {
            const TabIcon = item.icon
            const isActive = index === activeTab
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(index)}
                className={`relative px-4 py-2.5 sm:px-5 sm:py-3 rounded-2xl font-medium transition-all duration-300 ${
                  isActive
                    ? 'text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/80'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeDiferencialTab"
                    className="absolute inset-0 bg-brand rounded-2xl shadow-lg shadow-brand/20"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <TabIcon size={16} weight="duotone" />
                  <span className={isMobile ? 'hidden' : ''}>{item.label}</span>
                </span>
              </button>
            )
          })}
        </motion.div>

        {/* Split Content with AnimatePresence */}
        <AnimatePresence mode="wait">
          <motion.div
            key={diferencial.id}
            initial={{ opacity: 0, x: direction > 0 ? 40 : -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -40 : 40 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="grid lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-xl">
              {/* Coluna ANTES - Dark */}
              <div className="bg-[#0A1628] p-6 sm:p-8 lg:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
                    <Icon size={20} weight="duotone" className="text-red-400" />
                  </div>
                  <p className="text-xs text-red-300 uppercase tracking-wider font-semibold">
                    Abordagem tradicional
                  </p>
                </div>

                <div className="space-y-4">
                  {diferencial.antes.map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 + idx * 0.08 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center shrink-0 mt-0.5">
                        <X size={14} weight="bold" className="text-red-400" />
                      </div>
                      <p className="text-white/90 leading-relaxed">{item}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Coluna DEPOIS - Light */}
              <div className="bg-white p-6 sm:p-8 lg:p-10 lg:border-l-4 border-brand">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center">
                    <Icon size={20} weight="duotone" className="text-brand" />
                  </div>
                  <p className="text-xs text-brand uppercase tracking-wider font-semibold">
                    Metodologia Zopu
                  </p>
                </div>

                <div className="space-y-4">
                  {diferencial.depois.map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 + idx * 0.08 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-brand flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={14} weight="bold" className="text-white" />
                      </div>
                      <p className="text-gray-900 font-medium leading-relaxed">{item}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Resultado */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                  className="mt-8 pt-6 border-t border-gray-100"
                >
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-success/10">
                    <div className="w-8 h-8 rounded-full bg-success flex items-center justify-center shrink-0">
                      <ArrowRight size={16} weight="bold" className="text-white" />
                    </div>
                    <p className="text-gray-900 font-semibold">
                      {diferencial.resultado}
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Progress dots - mobile indicator */}
        <div className="flex justify-center gap-2 mt-6 lg:hidden">
          {DIFERENCIAIS.map((_, index) => (
            <button
              key={index}
              onClick={() => handleSelect(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === activeTab ? 'w-6 bg-brand' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// Objecao Section
function ObjecaoSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-20 sm:py-28 bg-gradient-to-b from-white via-amber-50/30 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-0 w-80 h-80 bg-amber-200/20 rounded-full translate-x-1/2 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-64 h-64 bg-success/10 rounded-full -translate-x-1/2 blur-[80px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, ease }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 border border-amber-200 rounded-full mb-6"
          >
            <WarningCircle size={18} weight="duotone" className="text-amber-600" />
            <span className="text-amber-700 font-semibold text-sm uppercase tracking-wider">
              Objeção comum
            </span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            "E se meu time{' '}
            <span className="relative">
              <span className="relative z-10">não usar</span>
              <motion.span
                initial={{ width: 0 }}
                animate={isInView ? { width: '100%' } : {}}
                transition={{ duration: 0.8, delay: 0.4, ease }}
                className="absolute bottom-2 left-0 h-3 bg-amber-200/60 -z-0"
              />
            </span>
            {' '}o CRM?"
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A principal razão de fracasso em implementações de CRM é a falta de adoção.
            Por isso, criamos uma solução específica para isso.
          </p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden"
        >
          {/* Answer Section */}
          <div className="p-8 sm:p-10 bg-gradient-to-br from-success/5 via-emerald-50/50 to-white border-b border-gray-100">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.3, ease }}
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-success to-emerald-400 flex items-center justify-center shadow-lg shadow-success/30 shrink-0"
              >
                <GraduationCap size={32} weight="duotone" className="text-white" />
              </motion.div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Por isso criamos a Fluidz.
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed mb-4">
                  A maior plataforma de certificação Bitrix24 do mundo, com trilhas específicas por função.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-success/20 shadow-sm">
                    <span className="text-2xl font-bold text-success">9.500+</span>
                    <span className="text-gray-600 text-sm">profissionais certificados</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-brand/20 shadow-sm">
                    <span className="text-2xl font-bold text-brand">96%</span>
                    <span className="text-gray-600 text-sm">de retenção anual</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Comparison Grid */}
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Traditional */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4, ease }}
              className="p-8 sm:p-10 bg-gradient-to-br from-red-50/80 to-white border-b lg:border-b-0 lg:border-r border-gray-100"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                  <X size={20} weight="bold" className="text-red-500" />
                </div>
                <p className="text-red-700 font-bold uppercase tracking-wider text-sm">
                  Treinamento tradicional
                </p>
              </div>

              <ul className="space-y-4">
                {[
                  'Treinamento de algumas horas',
                  'Todo mundo junto, independente da função',
                  'Material não atualizado',
                  'Esquece tudo em 30 dias',
                ].map((item, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.3, delay: 0.5 + idx * 0.08 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
                      <X size={12} weight="bold" className="text-red-500" />
                    </div>
                    <span className="text-gray-600 leading-relaxed">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Fluidz */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4, ease }}
              className="p-8 sm:p-10 bg-white"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
                  <Check size={20} weight="bold" className="text-success" />
                </div>
                <p className="text-success font-bold uppercase tracking-wider text-sm">
                  Certificação Fluidz
                </p>
              </div>

              <ul className="space-y-4">
                {[
                  'Trilhas específicas por função',
                  'Vendedor aprende o que vendedor precisa',
                  'Conteúdo sempre atualizado',
                  'Certificado de conclusão',
                ].map((item, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: 10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.3, delay: 0.5 + idx * 0.08 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-5 h-5 rounded-full bg-success flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={12} weight="bold" className="text-white" />
                    </div>
                    <span className="text-gray-900 font-medium leading-relaxed">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* CTA Footer */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.7, ease }}
            className="p-6 sm:p-8 bg-gray-50 border-t border-gray-100"
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center">
                  <Sparkle size={20} weight="duotone" className="text-brand" />
                </div>
                <p className="text-gray-700">
                  A Fluidz está <span className="font-semibold text-gray-900">inclusa no CRM Express</span>
                </p>
              </div>
              <Link
                href="/fluidz"
                className="group inline-flex items-center gap-2 px-5 py-2.5 bg-brand text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-brand/20 hover:-translate-y-0.5 transition-all duration-300"
              >
                Conhecer a Fluidz
                <ArrowRight size={18} weight="bold" className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// Case Section
function CaseSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const count = useCountUp(20, isInView)

  return (
    <section ref={ref} className="py-20 sm:py-28 bg-white relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-success/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-brand/5 rounded-full blur-[100px]" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
          className="text-center mb-10"
        >
          <p className="text-xs uppercase tracking-widest text-gray-500 font-medium mb-2">
            Resultado real
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Sucesso dos clientes que adotaram nossa metodologia
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          className="grid lg:grid-cols-12 gap-0 rounded-3xl overflow-hidden shadow-2xl bg-white"
        >
          {/* Left - Metric */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-800 p-8 sm:p-10 lg:p-12 flex flex-col justify-center relative overflow-hidden">
            {/* Pattern */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(-45deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            />
            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-success rounded-full blur-[80px] opacity-30" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-success/20 rounded-full mb-6">
                <TrendUp size={14} weight="duotone" className="text-success" />
                <span className="text-xs font-semibold text-success uppercase tracking-wide">Conversao</span>
              </div>

              <p className="text-6xl sm:text-7xl lg:text-8xl font-bold text-white tracking-tight mb-3">
                +{count}%
              </p>
              <p className="text-lg text-white/70">taxa de conversão</p>

              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-sm text-white/50">Case de sucesso</p>
                <p className="text-white font-semibold mt-1">Ferro em Brasa</p>
                <p className="text-sm text-white/60">E-commerce • Identificação Bovina</p>
              </div>
            </div>
          </div>

          {/* Right - Testimonial */}
          <div className="lg:col-span-7 p-8 sm:p-10 lg:p-12 flex flex-col justify-between">
            <div className="relative">
              <Quotes size={40} weight="duotone" className="text-brand/20 mb-4" />
              <blockquote className="text-xl sm:text-2xl text-gray-800 font-medium leading-relaxed mb-6">
                A Zopu nos ajudou a enxergar novas oportunidades. A implementação foi{' '}
                <span className="text-brand">surreal</span>.
              </blockquote>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center">
                  <span className="text-brand font-bold text-lg">J</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">João</p>
                  <p className="text-sm text-gray-500">Proprietário, Ferro em Brasa</p>
                </div>
              </div>
            </div>

            {/* Video */}
            <div className="mt-8 rounded-2xl overflow-hidden shadow-lg">
              <div className="relative w-full aspect-video">
                <iframe
                  src="https://www.youtube.com/embed/IhrMZZRuH54?autoplay=0&mute=1&rel=0"
                  title="Case Ferro em Brasa"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Investimento Section
function InvestimentoSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  // Price removed - using "Sob consulta" instead
  const prefersReducedMotion = useReducedMotion()
  const isMobile = useMediaQuery('(max-width: 640px)')

  return (
    <section ref={ref} className="py-20 sm:py-28 bg-gray-50 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none">
        <div className="absolute inset-0 bg-brand/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
          className="text-center mb-12"
        >
          <p className="text-brand font-semibold text-sm uppercase tracking-wider mb-3">
            Investimento
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Preço justo.{' '}
            <span className="text-brand">Escopo fechado.</span>
          </h2>
          <p className="text-lg text-gray-600">
            Sem surpresas. Sem escopo que cresce. Tudo definido antes de começar.
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          className="relative"
        >
          {/* Outer glow */}
          <motion.div
            className="absolute -inset-1 bg-gradient-to-r from-brand via-purple-500 to-success rounded-[28px] opacity-20 blur-xl"
            animate={!prefersReducedMotion ? { opacity: [0.15, 0.25, 0.15] } : {}}
            transition={{ duration: 3, repeat: Infinity }}
          />

          <div className="relative bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 rounded-3xl overflow-hidden border border-white/10">
            {/* Border beam */}
            {!isMobile && !prefersReducedMotion && (
              <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                <motion.div
                  className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-brand to-transparent"
                  style={{ width: '33%' }}
                  animate={{ left: ['-33%', '100%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                />
                <motion.div
                  className="absolute top-0 right-0 w-[2px] bg-gradient-to-b from-transparent via-success to-transparent"
                  style={{ height: '33%' }}
                  animate={{ top: ['-33%', '100%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear', delay: 0.75 }}
                />
                <motion.div
                  className="absolute bottom-0 right-0 h-[2px] bg-gradient-to-l from-transparent via-brand to-transparent"
                  style={{ width: '33%' }}
                  animate={{ right: ['-33%', '100%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear', delay: 1.5 }}
                />
                <motion.div
                  className="absolute bottom-0 left-0 w-[2px] bg-gradient-to-t from-transparent via-success to-transparent"
                  style={{ height: '33%' }}
                  animate={{ bottom: ['-33%', '100%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear', delay: 2.25 }}
                />
              </div>
            )}

            {/* Grid pattern */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />

            {/* Glow spots */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand/20 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-success/10 rounded-full blur-[80px]" />

            <div className="relative z-10 p-8 sm:p-10 lg:p-12">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* Left - Price */}
                <div className="text-center lg:text-left">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-amber-500/20 to-amber-400/10 border border-amber-400/30 rounded-full mb-6">
                    <Trophy size={16} weight="fill" className="text-amber-400" />
                    <span className="text-sm font-medium text-amber-200">Mais Popular</span>
                  </div>

                  {/* Investment */}
                  <div className="mb-6">
                    <p className="text-white/50 text-sm mb-1">Investimento</p>
                    <div className="flex items-baseline gap-2 justify-center lg:justify-start">
                      <span className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
                        Sob consulta
                      </span>
                    </div>
                    <p className="text-white/50 text-sm mt-2">
                      Fale com um especialista • Licenças Bitrix24 à parte
                    </p>
                  </div>

                  {/* Garantias */}
                  <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                    {[
                      { icon: Clock, label: '30 dias ou menos' },
                      { icon: ShieldCheck, label: 'Escopo fechado' },
                      { icon: Sparkle, label: 'Suporte incluso' },
                    ].map((item, index) => {
                      const Icon = item.icon
                      return (
                        <div key={index} className="flex items-center gap-2">
                          <Icon size={16} weight="fill" className="text-success" />
                          <span className="text-sm text-white/80">{item.label}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Right - Incluso */}
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <p className="font-semibold text-white mb-4 flex items-center gap-2">
                    <Check size={18} weight="bold" className="text-success" />
                    O que esta incluso
                  </p>
                  <ul className="space-y-3">
                    {INCLUSO.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check size={14} weight="bold" className="text-success shrink-0 mt-0.5" />
                        <span className="text-white/80 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-10 pt-8 border-t border-white/10">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                  <p className="text-white/60 text-center sm:text-left">
                    Quer saber o valor exato para sua operação?
                  </p>
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 font-semibold rounded-xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    Solicitar orçamento
                    <ArrowRight size={18} weight="bold" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5, ease }}
          className="text-center text-sm text-gray-500 mt-8"
        >
          O valor final depende do número de usuários e complexidade do processo.
          <br />
          Em 20 minutos de conversa, você sai com o orçamento fechado.
        </motion.p>
      </div>
    </section>
  )
}

// CTA Final Section
function CTAFinalSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const prefersReducedMotion = useReducedMotion()
  const isMobile = useMediaQuery('(max-width: 768px)')

  return (
    <section ref={ref} className="relative py-24 sm:py-32 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Animated orbs */}
      {!isMobile && !prefersReducedMotion && (
        <>
          <motion.div
            className="absolute top-10 left-[20%] w-[400px] h-[400px] rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, rgba(99,91,255,0.5) 0%, transparent 70%)' }}
            animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-10 right-[20%] w-[300px] h-[300px] rounded-full opacity-15"
            style={{ background: 'radial-gradient(circle, rgba(0,166,126,0.5) 0%, transparent 70%)' }}
            animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />
        </>
      )}

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Pronto para organizar{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-purple-400">
              suas vendas
            </span>
            ?
          </h2>
          <p className="text-lg sm:text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            Em 20 minutos de conversa, você descobre se o CRM Express é para você
            e sai com um orçamento fechado.
          </p>

          {/* CTA */}
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 px-10 py-5 bg-brand text-white font-semibold text-lg rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_50px_rgba(99,91,255,0.5)] hover:-translate-y-1"
          >
            {/* Beam */}
            {!prefersReducedMotion && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              />
            )}
            <span className="relative z-10">Falar com especialista</span>
            <ArrowRight size={22} weight="bold" className="relative z-10 transition-transform group-hover:translate-x-1" />
          </a>

          {/* Benefits */}
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {['Sem compromisso', 'Resposta em 24h', 'Orçamento na hora'].map((benefit, index) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1, ease }}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10"
              >
                <Check size={14} weight="bold" className="text-success" />
                <span className="text-sm text-white/80">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ============================================================================
// MAIN PAGE
// ============================================================================

export default function CRMExpressPage() {
  return (
    <main>
      <HeroSection />
      <QualificacaoSection />
      <ProblemasSection />
      <JornadaSection />
      <DiferenciaisSection />
      <ObjecaoSection />
      <CaseSection />
      <InvestimentoSection />
      <CTAFinalSection />
    </main>
  )
}
