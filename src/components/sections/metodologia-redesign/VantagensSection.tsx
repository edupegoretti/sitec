'use client'

import { motion } from 'framer-motion'
import {
  GitBranch,
  Database,
  ChatCircle,
  GraduationCap,
  Check,
  TrendUp,
  Users,
  ArrowsClockwise,
  ArrowRight,
} from '@phosphor-icons/react'
import { Container } from '@/components/layout'
import { Reveal } from '@/components/shared'
import { ZOPU_STATS } from '@/lib/constants'

const customEase: [number, number, number, number] = [0.16, 1, 0.3, 1]

// Os 3 pilares de RevOps
const PILARES_REVOPS = [
  {
    id: 'aquisicao',
    icon: TrendUp,
    titulo: 'Aquisição',
    descricao: 'Atrair e captar leads de forma previsível',
    cor: '#22C55E',
  },
  {
    id: 'vendas',
    icon: Users,
    titulo: 'Vendas',
    descricao: 'Converter oportunidades em contratos',
    cor: '#3B82F6',
  },
  {
    id: 'retencao',
    icon: ArrowsClockwise,
    titulo: 'Retenção',
    descricao: 'Manter e expandir sua base atual',
    cor: '#8B5CF6',
  },
]

// Os 4 diferenciais de COMO fazemos
const DIFERENCIAIS = [
  {
    id: 'processo',
    icon: GitBranch,
    titulo: 'Processo Primeiro',
    descricao: 'Desenhamos seu funil antes de tocar na ferramenta',
    cor: '#635BFF',
    corLight: 'rgba(99, 91, 255, 0.1)',
  },
  {
    id: 'dados',
    icon: Database,
    titulo: 'Dados Organizados',
    descricao: 'Base limpa, campos padronizados, governança desde o dia 1',
    cor: '#F59E0B',
    corLight: 'rgba(245, 158, 11, 0.1)',
  },
  {
    id: 'whatsapp',
    icon: ChatCircle,
    titulo: 'WhatsApp Governado',
    descricao: 'Histórico centralizado, responsáveis definidos, SLAs claros',
    cor: '#00A67E',
    corLight: 'rgba(0, 166, 126, 0.1)',
  },
  {
    id: 'adocao',
    icon: GraduationCap,
    titulo: 'Adoção Estruturada',
    descricao: `Fluidz: ${ZOPU_STATS.alunosFluidz} profissionais já certificados`,
    cor: '#EC4899',
    corLight: 'rgba(236, 72, 153, 0.1)',
  },
]

// Resultados esperados
const RESULTADOS = [
  'Mais leads convertidos em clientes',
  'Mais vendas para sua base atual',
  'Menos dependência de planilhas',
  'Previsibilidade de receita',
]

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 + i * 0.08,
      duration: 0.5,
      ease: customEase,
    },
  }),
}

export function VantagensSection() {
  return (
    <section className="py-24 sm:py-32 bg-gray-50 relative overflow-hidden">
      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Accent gradient */}
      <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-brand/30 to-transparent" />

      <Container className="relative">
        <div className="max-w-6xl mx-auto">
          {/* BLOCO 1: O que é Metodologia Fluidsales */}
          <div className="text-center mb-20">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand/10 border border-brand/20 rounded-full mb-6">
                <span className="text-sm font-semibold text-brand">
                  Metodologia Fluidsales™
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Uma metodologia focada em{' '}
                <span className="text-brand">receita previsível</span>
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
                Metodologia Fluidsales™ organiza sua operação comercial em torno de um único objetivo:{' '}
                <span className="font-semibold text-gray-900">
                  alinhar aquisição, vendas e retenção
                </span>{' '}
                para que trabalhem juntos, não em silos.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                Isso é RevOps na prática. E é o que diferencia empresas que crescem de forma
                sustentável.
              </p>
            </Reveal>
          </div>

          {/* BLOCO 2: Os 3 pilares de RevOps */}
          <Reveal delay={0.3}>
            <div className="grid md:grid-cols-3 gap-6 mb-20">
              {PILARES_REVOPS.map((pilar, index) => {
                const Icon = pilar.icon
                return (
                  <motion.div
                    key={pilar.id}
                    custom={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={cardVariants}
                    className="relative"
                  >
                    <div className="bg-white rounded-2xl p-6 border border-gray-200 text-center h-full">
                      <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4"
                        style={{ backgroundColor: `${pilar.cor}15` }}
                      >
                        <Icon size={28} weight="duotone" style={{ color: pilar.cor }} />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{pilar.titulo}</h3>
                      <p className="text-gray-600">{pilar.descricao}</p>
                    </div>

                    {/* Connector arrow */}
                    {index < PILARES_REVOPS.length - 1 && (
                      <div className="hidden md:flex absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                        <ArrowRight size={24} weight="bold" className="text-gray-300" />
                      </div>
                    )}
                  </motion.div>
                )
              })}
            </div>
          </Reveal>

          {/* BLOCO 3: Como fazemos isso */}
          <div className="mb-16">
            <Reveal>
              <div className="text-center mb-10">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Como fazemos isso
                </p>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  4 diferenciais que garantem o resultado
                </h3>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-4">
              {DIFERENCIAIS.map((dif, index) => {
                const Icon = dif.icon
                return (
                  <motion.div
                    key={dif.id}
                    custom={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-30px' }}
                    variants={cardVariants}
                  >
                    <div className="flex items-start gap-4 bg-white rounded-xl p-5 border border-gray-200 hover:shadow-md transition-shadow h-full">
                      <div
                        className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
                        style={{ backgroundColor: dif.corLight }}
                      >
                        <Icon size={24} weight="duotone" style={{ color: dif.cor }} />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">{dif.titulo}</h4>
                        <p className="text-sm text-gray-600">{dif.descricao}</p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* BLOCO 4: Resultados esperados */}
          <Reveal delay={0.4}>
            <div className="relative bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-8 sm:p-12 overflow-hidden">
              {/* Background texture */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
                  backgroundSize: '20px 20px',
                }}
              />

              {/* Glow accent */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4" />

              <div className="relative">
                <div className="text-center mb-8">
                  <motion.p
                    className="text-sm font-semibold text-brand uppercase tracking-wider mb-3"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                  >
                    O resultado
                  </motion.p>
                  <motion.h3
                    className="text-2xl sm:text-3xl font-bold text-white"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                  >
                    O que você ganha com Metodologia Fluidsales™
                  </motion.h3>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-10">
                  {RESULTADOS.map((resultado, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-3 bg-white/5 rounded-lg px-4 py-3"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                    >
                      <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                        <Check size={16} weight="bold" className="text-green-400" />
                      </div>
                      <span className="text-white font-medium">{resultado}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Arrow indicator to next section */}
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="inline-flex flex-col items-center gap-2 text-gray-500">
                    <span className="text-sm font-medium">Veja como entregamos</span>
                    <motion.div
                      animate={{ y: [0, 6, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 14l-7 7m0 0l-7-7m7 7V3"
                        />
                      </svg>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
