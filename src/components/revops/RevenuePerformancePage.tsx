'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CaretDown, Eye, Lightning, CheckCircle, ChartBar, BookOpen, ArrowsClockwise, Link as LinkIcon, CheckSquare, Target, type IconProps } from '@phosphor-icons/react'
import { Badge, Button, SectionHeader, WhatsAppButton, Reveal } from '@/components/shared'
import { Container } from '@/components/layout'
import { trackEvent } from '@/lib/analytics'

import { ZOPU_LINKS } from '@/lib/constants'

import {
  BITRIX_MAPPING,
  FUNNEL_STAGES,
  FLYWHEEL_MODELS,
} from '@/content/revenuePerformanceMap'

import { HeroTeaser } from './HeroTeaser'

type PhosphorIcon = React.ComponentType<IconProps>

const RevenuePerformanceMap = dynamic(
  () => import('./RevenuePerformanceMap').then((mod) => mod.RevenuePerformanceMap),
  {
    ssr: false,
    loading: () => (
      <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 sm:p-8">
        <div className="h-6 w-40 bg-white/10 rounded-full mb-4 animate-pulse" />
        <div className="h-4 w-72 bg-white/10 rounded-full mb-6 animate-pulse" />
        <div className="h-64 bg-white/10 rounded-2xl animate-pulse" />
      </div>
    ),
  }
)

const DELIVERABLES: Array<{ title: string; description: string; icon: PhosphorIcon; variant: 'purple' | 'green' }> = [
  {
    title: 'Mapa de Performance de Receita + Dashboards',
    description: 'Funil + flywheel + NRR no Bitrix24 com visão executiva e drill-down para diagnóstico',
    icon: ChartBar,
    variant: 'purple',
  },
  {
    title: 'Definições Universais',
    description: 'Glossário e triggers padronizados para toda a empresa',
    icon: BookOpen,
    variant: 'purple',
  },
  {
    title: 'Arquitetura de Pipelines',
    description: 'Marketing → Pré-vendas → Vendas → Pós-vendas conectados',
    icon: ArrowsClockwise,
    variant: 'green',
  },
  {
    title: 'Integrações Essenciais',
    description: 'Origem de leads, WhatsApp e ERP conectados',
    icon: LinkIcon,
    variant: 'green',
  },
  {
    title: 'Governança e SLAs',
    description: 'Handoffs, campos obrigatórios, qualidade de dados',
    icon: CheckSquare,
    variant: 'purple',
  },
  {
    title: 'Plano de Adoção',
    description: 'Treinamento por função + rituais de acompanhamento',
    icon: Target,
    variant: 'green',
  },
]

const FAQ_ITEMS = [
  {
    id: 'dashboard',
    question: '"Isso é só mais um dashboard?"',
    answer:
      'Não. O mapa é um modelo operacional com definições, métricas e ações no CRM. O dashboard é a consequência — ele existe porque o dado está correto e conectado.',
  },
  {
    id: 'mql-sql',
    question: '"Não temos MQL/SQL. Dá para usar?"',
    answer:
      'Sim. Os rótulos variam por empresa. O que importa é a definição do que é um lead qualificado e quando Vendas aceita. O modelo funciona com seus nomes.',
  },
  {
    id: 'numeros-diferentes',
    question: '"Como evitamos \'números diferentes\' entre Marketing e Vendas?"',
    answer:
      'Com definições universais, campos obrigatórios e regras de passagem. O RevOps Launch alinha critérios e validações no Bitrix24.',
  },
  {
    id: 'pos-vendas',
    question: '"Onde entram pós-vendas e renovação no CRM?"',
    answer:
      'Entram no flywheel: onboarding, retenção, expansão e churn com pipelines próprios, métricas V7–V13 e NRR.',
  },
  {
    id: 'tempo-esforco',
    question: '"Quanto tempo e esforço interno isso exige?"',
    answer:
      'O projeto é conduzido pela Zopu com rituais objetivos. O esforço do time é concentrado em workshops e validações — não em planilhas.',
  },
  {
    id: 'mudancas-bitrix',
    question: '"O que muda no Bitrix24 na prática?"',
    answer:
      'Objetos, campos, pipelines e dashboards passam a refletir o lead-to-cash completo. A liderança vê um número, e cada time sabe o que fazer.',
  },
] as const

const FOOTNOTES = [
  {
    label: 'Salesforce — definição de RevOps',
    href: 'https://www.salesforce.com/resources/articles/what-is-revenue-operations/',
  },
  {
    label: 'Zuora — fórmula de Net Revenue Retention',
    href: 'https://www.zuora.com/guides/net-revenue-retention/',
  },
] as const

const fallbackFlywheel = FLYWHEEL_MODELS.recorrencia

export function RevenuePerformancePage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const handleFaqToggle = (index: number, id: string) => {
    const nextIndex = openIndex === index ? null : index
    setOpenIndex(nextIndex)
    if (nextIndex !== null) {
      trackEvent('rpm_faq_open', { question_id: id })
    }
  }

  return (
    <main className="bg-white text-text-primary">
      {/* Hero: Aspiracional - Jornada Completa */}
      <section className="relative overflow-hidden pt-12 sm:pt-16 lg:pt-20 pb-16 sm:pb-24 bg-[#07090f]">
        {/* LUXURY BACKGROUND SYSTEM */}
        <div className="absolute inset-0 bg-linear-to-b from-[#0f121d] via-[#07090f] to-[#07090f]" />

        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[10%] -right-[5%] h-[600px] w-[600px] rounded-full bg-brand/10 blur-[120px]"
        />
        <motion.div
          animate={{ opacity: [0.2, 0.5, 0.2], x: [0, 40, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-[10%] -left-[5%] h-[500px] w-[500px] rounded-full bg-success/5 blur-[120px]"
        />

        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(ellipse at center, black, transparent 80%)'
          }}
        />

        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.01),rgba(0,255,0,0.005),rgba(0,0,255,0.01))] bg-[length:100%_4px,4px_100%] opacity-20" />

        <Container className="relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Lado esquerdo: Copy */}
            <div className="max-w-xl">
              <Reveal direction="down" delay={0.1}>
                {/* Badge formatted similarly to Home Gold Partner Badge */}
                <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-6 shadow-sm backdrop-blur-md">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
                  <span className="text-sm font-medium text-white/80 uppercase tracking-widest">Mapa de Performance de Receita™</span>
                </div>
              </Reveal>

              <Reveal direction="up" delay={0.2}>
                {/* Unified Typography from Home: text-4xl sm:text-5xl lg:text-6xl */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight">
                  Do primeiro lead ao
                  <br className="hidden sm:block" />
                  <span className="text-brand">cliente que renova e indica.</span>
                </h1>
              </Reveal>

              <Reveal direction="up" delay={0.4}>
                {/* Unified Subtitle from Home: mt-6 text-lg sm:text-xl text-white/60 */}
                <p className="mt-6 text-lg sm:text-xl text-white/60 leading-relaxed">
                  Conecte funil, retenção e expansão no Bitrix24 —
                  <br className="hidden sm:block" />
                  menos vazamento de receita, mais previsibilidade.
                </p>
              </Reveal>

              <Reveal direction="up" delay={0.6}>
                {/* CTAs using Home pattern */}
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Button
                    href="#mapa"
                    showArrow
                    onClick={() => trackEvent('rpm_hero_cta_primary_click')}
                    className="px-8 py-4 bg-brand text-white text-base font-semibold rounded-2xl hover:bg-brand-hover transition-all duration-300 shadow-elevated shadow-brand/20 hover:shadow-elevated-hover hover:-translate-y-1"
                  >
                    Ver o mapa completo
                  </Button>
                  <Button
                    href={ZOPU_LINKS.whatsappEspecialista}
                    variant="ghost"
                    external
                    onClick={() => trackEvent('rpm_hero_cta_secondary_click')}
                    className="text-white border-white/20 bg-white/5 hover:bg-white/10 rounded-2xl px-8 py-4 text-base font-semibold transition-all hover:-translate-y-1"
                  >
                    Falar com especialista
                  </Button>
                </div>
              </Reveal>
            </div>

            {/* Lado direito: Mini-diagrama (desktop) */}
            <div className="relative lg:order-last order-first">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
              >
                <HeroTeaser />
              </motion.div>
            </div>
          </div>
        </Container>

        {/* Scroll indicator - mouse/pill style */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
            <motion.div
              className="w-1.5 h-1.5 bg-white/60 rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          </div>
        </motion.div>
      </section>

      {/* Problem */}
      <section className="py-20 sm:py-28 bg-bg-secondary">
        <Container>
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16 items-start">
            {/* Lado esquerdo: Contexto */}
            <Reveal direction="up">
              <div>
                <Badge variant="default" className="mb-4">
                  O problema real
                </Badge>
                <h2 className="text-3xl sm:text-4xl font-bold text-text-primary leading-tight">
                  O CRM está cheio.
                  <br />
                  <span className="text-text-secondary">O forecast, vazio.</span>
                </h2>
                <p className="mt-6 text-text-secondary text-lg leading-relaxed">
                  Todo mundo tem dado. Ninguém confia no número. A liderança pede o pipeline e recebe três versões diferentes.
                </p>
                <div className="mt-8 flex items-center gap-3 text-sm text-text-muted">
                  <span className="w-2 h-2 rounded-full bg-red-400" />
                  <span>Sintoma comum em empresas de R$ 5M a R$ 100M/ano</span>
                </div>
              </div>
            </Reveal>

            {/* Lado direito: Os dois gaps */}
            <div className="space-y-4">
              <Reveal direction="up" delay={0.1}>
                <div className="group relative rounded-2xl border border-gray-200/80 bg-white p-6 sm:p-8 shadow-sm hover:shadow-card-hover transition-all duration-300 overflow-hidden">
                  {/* Número grande decorativo */}
                  <span className="absolute -top-4 -right-2 text-[120px] font-bold text-brand/5 leading-none select-none">
                    1
                  </span>
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center">
                        <Eye size={20} weight="duotone" className="text-brand" />
                      </div>
                      <h3 className="text-xl font-bold text-text-primary">Falta ver onde vaza</h3>
                    </div>
                    <p className="text-text-secondary">
                      Qual estágio do funil está travando? Qual vendedor perde mais negócios no mesmo ponto? O dado existe, mas está espalhado em 4 planilhas.
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal direction="up" delay={0.2}>
                <div className="group relative rounded-2xl border border-gray-200/80 bg-white p-6 sm:p-8 shadow-sm hover:shadow-card-hover transition-all duration-300 overflow-hidden">
                  {/* Número grande decorativo */}
                  <span className="absolute -top-4 -right-2 text-[120px] font-bold text-success/5 leading-none select-none">
                    2
                  </span>
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
                        <Lightning size={20} weight="duotone" className="text-success" />
                      </div>
                      <h3 className="text-xl font-bold text-text-primary">Falta saber o que fazer</h3>
                    </div>
                    <p className="text-text-secondary">
                      A conversão de proposta caiu. E agora? Quem age? O que muda no processo? Sem resposta clara, vira reunião de apontamento.
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal direction="up" delay={0.3}>
                <div className="rounded-xl bg-gray-100 p-4 flex items-start gap-3">
                  <span className="text-lg">→</span>
                  <p className="text-sm text-text-secondary">
                    <strong className="text-text-primary">Resultado:</strong> problemas viram opiniões, reuniões viram debates, e nada muda até o próximo quarter.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* MAPA: Seção Dedicada Full-Width */}
      <section id="mapa" className="py-16 sm:py-20 bg-linear-to-br from-bg-dark to-bg-dark-secondary">
        <Container className="max-w-7xl">
          {/* Header da seção */}
          <Reveal direction="up">
            <div className="text-center mb-10 sm:mb-12">
              <Badge variant="dark" className="mb-4">
                Explore o modelo
              </Badge>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                Mapa de Performance de Receita
              </h2>
              <p className="text-white/70 mt-3 max-w-xl mx-auto text-sm sm:text-base">
                Clique em qualquer etapa para ver definição, vazamentos e ação recomendada.
              </p>
            </div>
          </Reveal>

          {/* MAPA: Agora com espaço adequado */}
          <Reveal direction="up" delay={0.1}>
            <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-4 sm:p-6 lg:p-10">
              <RevenuePerformanceMap />
            </div>
          </Reveal>

          {/* Fallback para noscript */}
          <noscript>
            <div className="mt-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-6">
              <div className="rounded-2xl bg-white/10 p-4">
                <img
                  src="/images/revops/revenue-performance-map-simple.svg"
                  alt="Diagrama simplificado do Revenue Performance Map"
                  className="w-full h-auto"
                />
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 text-sm text-white/80">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand mb-2">
                    Funil (V1–V6)
                  </p>
                  <ul className="space-y-1">
                    {FUNNEL_STAGES.map((stage) => (
                      <li key={stage.id}>{stage.metricId} • {stage.label}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-success mb-2">
                    Flywheel (V7–V13)
                  </p>
                  <ul className="space-y-1">
                    {fallbackFlywheel.map((stage) => (
                      <li key={stage.id}>{stage.metricId} • {stage.label}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </noscript>
        </Container>
      </section>

      {/* Bitrix24 mapping - Como funciona */}
      <section id="como-funciona" className="py-20 sm:py-28 bg-white">
        <Container>
          <Reveal direction="up">
            <SectionHeader
              label="Implementação"
              title="Onde isso vive no Bitrix24"
              description="O modelo só funciona quando métricas moram na fonte única da verdade. No RevOps Launch™, a Zopu desenha objetos, campos, pipelines e dashboards para que liderança veja o mesmo número — e cada time saiba o que fazer."
              align="left"
            />
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {BITRIX_MAPPING.map((row, idx) => {
                // Determinar cor baseada no ID da métrica
                const isGreen = row.id === 'bridge' || row.id.startsWith('v7') || row.id === 'v7'
                return (
                  <div
                    key={row.id}
                    className="rounded-2xl border border-gray-200/80 bg-white p-5 hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold ${isGreen ? 'bg-success/10 text-success' : 'bg-brand/10 text-brand'
                          }`}
                      >
                        {row.metric.split(' ')[0]}
                      </span>
                    </div>
                    <p className="font-semibold text-text-primary text-sm mb-2">
                      {row.metric.replace(/^V\d+\s*/, '').replace(/^Onboarding\s*/, 'Onboarding')}
                    </p>
                    <p className="text-xs text-text-secondary mb-2">{row.location}</p>
                    <p className="text-xs text-text-muted">{row.notes}</p>
                  </div>
                )
              })}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Deliverables */}
      <section id="revops-launch" className="py-20 sm:py-28 bg-bg-secondary">
        <Container>
          <Reveal direction="up">
            <SectionHeader
              label="RevOps Launch™"
              title="O que você recebe"
              description="Implementação completa do modelo operacional no seu Bitrix24"
              align="center"
            />
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {DELIVERABLES.map((item, idx) => {
              const isPurple = item.variant === 'purple'
              return (
                <Reveal key={item.title} direction="up" delay={0.1 + idx * 0.05}>
                  <div className="group rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 h-full">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${isPurple ? 'bg-brand/10' : 'bg-success/10'
                        }`}
                    >
                      <item.icon size={24} weight="duotone" className={isPurple ? 'text-brand' : 'text-success'} />
                    </div>
                    <h3 className="text-lg font-bold text-text-primary mb-2">{item.title}</h3>
                    <p className="text-sm text-text-secondary">{item.description}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 sm:py-28 bg-white">
        <Container>
          <Reveal direction="up">
            <SectionHeader
              label="Dúvidas Frequentes"
              title="Perguntas que decisores fazem antes de implementar RevOps"
              align="center"
            />
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <div className="mt-12 max-w-3xl mx-auto rounded-2xl border border-gray-200/80 bg-white shadow-sm overflow-hidden">
              {FAQ_ITEMS.map((item, index) => {
                const isOpen = openIndex === index
                return (
                  <div key={item.id} className="border-b border-gray-200/80 last:border-0">
                    <button
                      type="button"
                      onClick={() => handleFaqToggle(index, item.id)}
                      className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50/50 transition-colors duration-200"
                      aria-expanded={isOpen}
                    >
                      <span className="font-semibold text-text-primary pr-4">{item.question}</span>
                      <CaretDown
                        size={20}
                        weight="bold"
                        className={`text-brand shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-200 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                    >
                      <p className="px-6 pb-5 text-text-secondary">{item.answer}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Final CTA - DARK SECTION */}
      <section className="py-20 sm:py-28 bg-linear-to-br from-bg-dark to-bg-dark-secondary relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-1/2 left-0 h-96 w-96 rounded-full bg-brand/20 blur-[100px] -translate-y-1/2" />
        <div className="absolute top-1/2 right-0 h-72 w-72 rounded-full bg-success/20 blur-[100px] -translate-y-1/2" />

        <Container className="relative z-10">
          <Reveal direction="up">
            <div className="text-center max-w-2xl mx-auto">
              <Badge variant="dark" className="mb-6">
                Próximo Passo
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Quer mapear seus vazamentos e sair com um{' '}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-brand to-success">
                  plano claro?
                </span>
              </h2>
              <p className="mt-6 text-lg text-white/80">
                Em 20 minutos, entendemos seu cenário (processo, dados, handoffs) e indicamos o caminho mais seguro para implementar RevOps no Bitrix24.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  href={ZOPU_LINKS.whatsappEspecialista}
                  external
                  showArrow
                  onClick={() => trackEvent('rpm_final_cta_primary_click')}
                >
                  Falar com especialista
                </Button>
              </div>

              <p className="mt-6 text-sm text-white/80">
                Sem apresentação padrão. Uma conversa objetiva com diagnóstico de riscos.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Footnotes */}
      <section className="py-12 bg-white">
        <Container>
          <div className="border-t border-gray-200/80 pt-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand mb-3">Fontes</p>
            <ul className="space-y-2">
              {FOOTNOTES.map((note) => (
                <li key={note.href}>
                  <a
                    href={note.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-text-secondary hover:text-brand transition-colors"
                  >
                    {note.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>
    </main>
  )
}
