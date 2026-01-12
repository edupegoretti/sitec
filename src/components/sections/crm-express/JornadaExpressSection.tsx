'use client'

import { motion } from 'framer-motion'
import { MagnifyingGlass, Gear, GraduationCap, Rocket, Check, CaretRight } from '@phosphor-icons/react'
import { Container } from '@/components/layout'
import { Reveal } from '@/components/shared'

/**
 * JornadaExpressSection - Jornada de 30 dias visual
 *
 * Baseado no FrameworkVisual do RevOps Launch
 * 4 fases com cards premium, cores, entregas e resultados
 */

const customEase: [number, number, number, number] = [0.16, 1, 0.3, 1]

const FASES = [
  {
    fase: 1,
    nome: 'Entender',
    periodo: 'Semana 1',
    duracao: '~5 dias',
    descricao: 'Mapeamos como sua equipe vende hoje e identificamos os gargalos.',
    tagline: 'Processo primeiro',
    entregas: [
      'Diagnóstico do fluxo comercial',
      'Mapa de origem dos leads',
      'Identificação de vazamentos',
    ],
    resultado: 'Clareza do que precisa mudar',
    icon: MagnifyingGlass,
    color: '#635BFF',
    colorLight: 'rgba(99, 91, 255, 0.1)',
  },
  {
    fase: 2,
    nome: 'Configurar',
    periodo: 'Semanas 2-3',
    duracao: '~10 dias',
    descricao: 'Configuramos o Bitrix24 para espelhar seu processo real de vendas.',
    tagline: 'CRM sob medida',
    entregas: [
      'Pipeline de leads configurado',
      'Pipeline de vendas ativo',
      'WhatsApp integrado',
      'Automações de follow-up',
    ],
    resultado: 'Sistema pronto para usar',
    icon: Gear,
    color: '#F59E0B',
    colorLight: 'rgba(245, 158, 11, 0.1)',
  },
  {
    fase: 3,
    nome: 'Treinar',
    periodo: 'Semana 4',
    duracao: '~5 dias',
    descricao: 'Treinamento por função na Fluidz. Vendedor aprende o que vendedor precisa.',
    tagline: 'Certificação por função',
    entregas: [
      'Trilha para vendedores',
      'Trilha para gestores',
      'Material de referência',
    ],
    resultado: 'Time certificado e pronto',
    icon: GraduationCap,
    color: '#EC4899',
    colorLight: 'rgba(236, 72, 153, 0.1)',
  },
  {
    fase: 4,
    nome: 'Lançar',
    periodo: '+30 dias',
    duracao: 'Acompanhamento',
    descricao: 'Go-live com suporte dedicado. Ajustes e otimizações inclusos.',
    tagline: 'Suporte até funcionar',
    entregas: [
      'CRM em produção',
      'Suporte via WhatsApp',
      'Dashboard ativo',
      'Ajustes rápidos',
    ],
    resultado: 'Operação funcionando',
    icon: Rocket,
    color: '#00A67E',
    colorLight: 'rgba(0, 166, 126, 0.1)',
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.15 + i * 0.12,
      duration: 0.6,
      ease: customEase,
    },
  }),
}

export function JornadaExpressSection() {
  return (
    <section className="py-20 sm:py-28 bg-gray-50 relative overflow-hidden">
      {/* Subtle texture */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`,
          backgroundSize: '24px 24px',
        }}
      />

      <Container className="relative">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-14">
            <Reveal>
              <p className="text-brand font-semibold text-sm uppercase tracking-wider mb-4">
                Sua jornada
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Do zero ao CRM funcionando{' '}
                <span className="text-brand">em 30 dias</span>
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
                Processo estruturado em{' '}
                <span className="text-gray-900 font-semibold">4 etapas</span> — você sabe o que esperar em cada uma
              </p>
            </Reveal>
          </div>

          {/* Fases Grid */}
          <div className="relative">
            {/* Connection line - desktop */}
            <div className="hidden lg:block absolute top-20 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-brand via-warning via-50% to-success opacity-20" />

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {FASES.map((fase, index) => {
                const Icon = fase.icon

                return (
                  <motion.div
                    key={fase.fase}
                    custom={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                    variants={cardVariants}
                    className="relative"
                  >
                    {/* Arrow connector - mobile/tablet */}
                    {index < FASES.length - 1 && (
                      <div className="lg:hidden absolute -bottom-3 left-1/2 -translate-x-1/2 z-10">
                        <CaretRight
                          size={20}
                          weight="bold"
                          className="rotate-90 sm:rotate-0 text-gray-300"
                        />
                      </div>
                    )}

                    {/* Card */}
                    <motion.div
                      className="relative bg-white rounded-2xl p-5 sm:p-6 border border-gray-200 hover:border-gray-300 transition-all duration-300 h-full group"
                      whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.08)' }}
                    >
                      {/* Phase badge */}
                      <div
                        className="absolute -top-3 left-5 px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg"
                        style={{
                          backgroundColor: fase.color,
                          boxShadow: `0 4px 12px ${fase.color}40`,
                        }}
                      >
                        {fase.periodo}
                      </div>

                      {/* Icon */}
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 mt-2 transition-transform duration-300 group-hover:scale-110"
                        style={{ backgroundColor: fase.colorLight }}
                      >
                        <Icon
                          size={24}
                          weight="duotone"
                          style={{ color: fase.color }}
                        />
                      </div>

                      {/* Name */}
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {fase.nome}
                      </h3>

                      {/* Tagline */}
                      <p
                        className="text-sm font-semibold mb-3"
                        style={{ color: fase.color }}
                      >
                        {fase.tagline}
                      </p>

                      {/* Description */}
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">
                        {fase.descricao}
                      </p>

                      {/* Deliverables */}
                      <div className="space-y-2 mb-4">
                        {fase.entregas.map((entrega, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <div
                              className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                              style={{ backgroundColor: fase.colorLight }}
                            >
                              <Check
                                size={10}
                                weight="bold"
                                style={{ color: fase.color }}
                              />
                            </div>
                            <span className="text-xs text-gray-600">{entrega}</span>
                          </div>
                        ))}
                      </div>

                      {/* Result */}
                      <div
                        className="flex items-center gap-2 px-3 py-2 rounded-lg mt-auto"
                        style={{ backgroundColor: fase.colorLight }}
                      >
                        <span className="text-xs font-bold" style={{ color: fase.color }}>
                          → {fase.resultado}
                        </span>
                      </div>
                    </motion.div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Bottom summary */}
          <Reveal delay={0.6}>
            <motion.div
              className="mt-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
            >
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-full border border-gray-200 shadow-sm">
                <div className="flex -space-x-1">
                  {FASES.map((fase, i) => (
                    <div
                      key={i}
                      className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center"
                      style={{ backgroundColor: fase.color }}
                    >
                      <Check size={12} weight="bold" className="text-white" />
                    </div>
                  ))}
                </div>
                <span className="text-gray-900 font-medium">
                  4 semanas de trabalho focado = CRM rodando
                </span>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
