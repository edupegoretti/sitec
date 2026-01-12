'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { MapTrifold, GitBranch, Database, Target, Users, ChartBar, Check, ArrowRight } from '@phosphor-icons/react'
import { Container } from '@/components/layout'
import { Reveal } from '@/components/shared'
import { PilaresConnectedGrid } from './PilaresConnectedGrid'
import { GROWTH_ARCHITECTURE_PILARES_CLIENTE } from '@/lib/constants'
import { durations, easings } from '@/lib/motion'

const ICON_MAP: Record<string, React.ElementType> = {
  Map: MapTrifold,
  GitBranch,
  Database,
  Target,
  Users,
  BarChart3: ChartBar,
}

// Visual mockups for each pilar - representing what user receives
const PILAR_VISUALS: Record<string, React.ReactNode> = {
  journey: <JourneyVisual />,
  processos: <ProcessVisual />,
  dados: <DataVisual />,
  icp: <ICPVisual />,
  adocao: <AdocaoVisual />,
  metricas: <MetricasVisual />,
}

// Journey Map Visual
function JourneyVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        {/* Journey stages */}
        {['Descoberta', 'Consideracao', 'Decisao', 'Compra', 'Pos-venda'].map((stage, i) => (
          <motion.div
            key={stage}
            className="flex items-center gap-3 mb-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 + 0.2, duration: 0.4 }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm"
              style={{ backgroundColor: `hsl(${250 + i * 20}, 70%, ${55 + i * 5}%)` }}
            >
              {i + 1}
            </div>
            <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: `hsl(${250 + i * 20}, 70%, 60%)` }}
                initial={{ width: 0 }}
                animate={{ width: `${100 - i * 15}%` }}
                transition={{ delay: i * 0.1 + 0.3, duration: 0.6 }}
              />
            </div>
            <span className="text-sm text-gray-300 w-24">{stage}</span>
          </motion.div>
        ))}
        <motion.p
          className="text-xs text-gray-500 mt-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Mapa de jornada com touchpoints
        </motion.p>
      </div>
    </div>
  )
}

// Process Flow Visual
function ProcessVisual() {
  const steps = ['Lead', 'Qualificacao', 'Proposta', 'Negociacao', 'Fechamento']
  return (
    <div className="relative w-full h-full flex items-center justify-center p-6">
      <div className="flex flex-col gap-2 w-full max-w-xs">
        {steps.map((step, i) => (
          <motion.div
            key={step}
            className="flex items-center gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 + 0.2 }}
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
              <Check size={16} weight="bold" className="text-emerald-400" />
            </div>
            <div className="flex-1 px-3 py-2 bg-white/5 rounded-lg border border-white/10">
              <span className="text-sm text-gray-300">{step}</span>
            </div>
            {i < steps.length - 1 && (
              <ArrowRight size={16} className="text-gray-600" />
            )}
          </motion.div>
        ))}
        <motion.div
          className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
        >
          <p className="text-xs text-emerald-400 font-medium">SLA definido por etapa</p>
        </motion.div>
      </div>
    </div>
  )
}

// Data Organization Visual
function DataVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-6">
      <div className="w-full max-w-xs">
        <motion.div
          className="bg-white/5 rounded-xl border border-white/10 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Table header */}
          <div className="flex bg-amber-500/10 border-b border-white/10 p-2">
            <span className="flex-1 text-xs font-medium text-amber-400">Campo</span>
            <span className="w-20 text-xs font-medium text-amber-400">Status</span>
          </div>
          {/* Table rows */}
          {[
            { field: 'Nome', status: 'ok' },
            { field: 'Email', status: 'ok' },
            { field: 'Telefone', status: 'ok' },
            { field: 'Empresa', status: 'ok' },
            { field: 'Segmento', status: 'ok' },
          ].map((row, i) => (
            <motion.div
              key={row.field}
              className="flex items-center p-2 border-b border-white/5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.08 + 0.3 }}
            >
              <span className="flex-1 text-sm text-gray-300">{row.field}</span>
              <span className="w-20">
                <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs rounded-full">
                  Limpo
                </span>
              </span>
            </motion.div>
          ))}
        </motion.div>
        <motion.p
          className="text-xs text-gray-500 mt-3 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          0 duplicidades | 100% preenchido
        </motion.p>
      </div>
    </div>
  )
}

// ICP Definition Visual
function ICPVisual() {
  const criteria = [
    { label: 'Faturamento', value: 'R$ 5M+/ano' },
    { label: 'Funcionarios', value: '50-500' },
    { label: 'Segmento', value: 'B2B SaaS' },
    { label: 'Maturidade', value: 'Series A+' },
  ]
  return (
    <div className="relative w-full h-full flex items-center justify-center p-6">
      <div className="w-full max-w-xs">
        <motion.div
          className="flex items-center gap-3 mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Target size={24} weight="duotone" className="text-pink-400" />
          <span className="text-lg font-semibold text-white">ICP Definido</span>
        </motion.div>
        <div className="space-y-2">
          {criteria.map((item, i) => (
            <motion.div
              key={item.label}
              className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-pink-500/20"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 + 0.2 }}
            >
              <span className="text-sm text-gray-400">{item.label}</span>
              <span className="text-sm font-medium text-pink-400">{item.value}</span>
            </motion.div>
          ))}
        </div>
        <motion.div
          className="mt-4 flex items-center justify-center gap-2 p-2 bg-pink-500/10 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <span className="text-xs text-pink-400">Score minimo: 70 pontos</span>
        </motion.div>
      </div>
    </div>
  )
}

// Adoption Visual
function AdocaoVisual() {
  const roles = [
    { role: 'Vendedor', progress: 85 },
    { role: 'SDR', progress: 92 },
    { role: 'Gestor', progress: 78 },
    { role: 'CS', progress: 88 },
  ]
  return (
    <div className="relative w-full h-full flex items-center justify-center p-6">
      <div className="w-full max-w-xs">
        <motion.div
          className="flex items-center gap-3 mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Users size={24} weight="duotone" className="text-violet-400" />
          <span className="text-lg font-semibold text-white">Trilhas por funcao</span>
        </motion.div>
        <div className="space-y-3">
          {roles.map((item, i) => (
            <motion.div
              key={item.role}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 + 0.2 }}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-300">{item.role}</span>
                <span className="text-sm font-medium text-violet-400">{item.progress}%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-violet-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${item.progress}%` }}
                  transition={{ delay: i * 0.1 + 0.3, duration: 0.6 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div
          className="mt-4 p-3 bg-violet-500/10 border border-violet-500/20 rounded-xl flex items-center justify-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <span className="text-xs text-violet-400">Certificados Fluidz</span>
          <span className="text-sm font-bold text-violet-300">12/15</span>
        </motion.div>
      </div>
    </div>
  )
}

// Metrics Dashboard Visual
function MetricasVisual() {
  const metrics = [
    { label: 'Taxa Conversao', value: '23%', delta: '+5%', up: true },
    { label: 'Ticket Medio', value: 'R$ 8.5k', delta: '+12%', up: true },
    { label: 'Ciclo Medio', value: '18 dias', delta: '-3d', up: true },
  ]
  return (
    <div className="relative w-full h-full flex items-center justify-center p-6">
      <div className="w-full max-w-xs">
        <motion.div
          className="flex items-center gap-3 mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <ChartBar size={24} weight="duotone" className="text-cyan-400" />
          <span className="text-lg font-semibold text-white">Dashboard</span>
        </motion.div>
        <div className="space-y-3">
          {metrics.map((item, i) => (
            <motion.div
              key={item.label}
              className="p-3 bg-white/5 rounded-xl border border-cyan-500/20"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 + 0.2 }}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">{item.label}</span>
                <span className={`text-xs font-medium ${item.up ? 'text-emerald-400' : 'text-red-400'}`}>
                  {item.delta}
                </span>
              </div>
              <span className="text-2xl font-bold text-white">{item.value}</span>
            </motion.div>
          ))}
        </div>
        <motion.p
          className="text-xs text-gray-500 mt-3 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Atualizado em tempo real
        </motion.p>
      </div>
    </div>
  )
}

export function PilaresClienteSection() {
  const pilares = GROWTH_ARCHITECTURE_PILARES_CLIENTE
  const [activeId, setActiveId] = useState<string>(pilares[0].id)
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRefs = useRef<(HTMLDivElement | null)[]>([])

  const activePilar = pilares.find((p) => p.id === activeId) || pilares[0]
  const Icon = ICON_MAP[activePilar.icon] || MapTrifold

  // Scroll-driven step change
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const sectionTop = sectionRef.current.getBoundingClientRect().top
      const viewportHeight = window.innerHeight

      // Only activate scroll-driven behavior when section is in view
      if (sectionTop > viewportHeight * 0.5 || sectionTop < -viewportHeight) return

      // Find which content section is most visible
      let maxVisibility = 0
      let mostVisibleId = activeId

      contentRefs.current.forEach((ref, index) => {
        if (!ref) return
        const rect = ref.getBoundingClientRect()
        const visibility = Math.max(
          0,
          Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0)
        )
        if (visibility > maxVisibility) {
          maxVisibility = visibility
          mostVisibleId = pilares[index].id
        }
      })

      if (mostVisibleId !== activeId) {
        setActiveId(mostVisibleId)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [activeId, pilares])

  return (
    <section ref={sectionRef} className="py-20 sm:py-28 bg-bg-dark relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-brand/10 rounded-full -translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-amber-500/10 rounded-full translate-x-1/2 blur-3xl" />
      </div>

      <Container className="relative">
        {/* Header */}
        <div className="text-center mb-16">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand/20 border border-brand/30 rounded-full mb-4">
              <span className="text-sm font-semibold text-brand">A Solucao</span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              6 Pilares que garantem{' '}
              <span className="text-brand">CRM funcionando</span>
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Cada pilar resolve uma dor real. Juntos, transformam Bitrix24 em motor de receita.
            </p>
          </Reveal>
        </div>

        {/* Main Layout: Grid + Content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Connected Grid (Sticky) */}
          <div className="lg:sticky lg:top-32">
            <Reveal delay={0.3}>
              <PilaresConnectedGrid
                pilares={pilares}
                activeId={activeId}
                onPilarClick={setActiveId}
              />
            </Reveal>
          </div>

          {/* Right: Content Sections (Scrollable) */}
          <div className="space-y-8">
            {pilares.map((pilar, index) => {
              const PilarIcon = ICON_MAP[pilar.icon] || MapTrifold
              const isActive = pilar.id === activeId

              return (
                <div
                  key={pilar.id}
                  ref={(el) => { contentRefs.current[index] = el }}
                  className="scroll-mt-32"
                >
                  <motion.div
                    className={cn(
                      'relative rounded-3xl overflow-hidden transition-all duration-500 cursor-pointer',
                      isActive ? 'ring-2' : 'ring-1 ring-white/10 opacity-60 hover:opacity-80'
                    )}
                    style={{
                      ['--tw-ring-color' as string]: isActive ? pilar.cor : undefined,
                      backgroundColor: isActive ? `${pilar.cor}08` : 'rgba(255,255,255,0.02)',
                    }}
                    onClick={() => setActiveId(pilar.id)}
                  >
                    {/* Visual mockup area */}
                    <div
                      className="h-64 sm:h-72 relative"
                      style={{
                        background: isActive
                          ? `linear-gradient(135deg, ${pilar.cor}15 0%, transparent 100%)`
                          : 'transparent',
                      }}
                    >
                      <AnimatePresence mode="wait">
                        {isActive && (
                          <motion.div
                            key={pilar.id}
                            className="absolute inset-0"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: durations.medium, ease: easings.premium }}
                          >
                            {PILAR_VISUALS[pilar.id]}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Number watermark */}
                      <div className="absolute top-4 right-4 text-6xl font-bold text-white/5">
                        {pilar.numero}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold mb-4"
                        style={{ backgroundColor: `${pilar.cor}20`, color: pilar.cor }}
                      >
                        <PilarIcon size={16} weight="fill" />
                        Pilar {pilar.numero}
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                        {pilar.nome}
                      </h3>

                      <p className="text-lg text-gray-300 mb-3">
                        {pilar.headline}
                      </p>

                      <p className="text-gray-400 text-sm mb-4">
                        {pilar.descricao}
                      </p>

                      {/* Voce recebe */}
                      <div
                        className="rounded-xl p-4 border"
                        style={{
                          backgroundColor: `${pilar.cor}08`,
                          borderColor: `${pilar.cor}20`,
                        }}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div
                            className="w-5 h-5 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: `${pilar.cor}30` }}
                          >
                            <Check size={12} weight="bold" style={{ color: pilar.cor }} />
                          </div>
                          <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: pilar.cor }}>
                            Voce recebe
                          </span>
                        </div>
                        <p className="text-white text-sm font-medium">
                          {pilar.voceRecebe}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}

// Helper cn function if not imported
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}
