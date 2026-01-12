'use client'

import { motion } from 'framer-motion'
import { Target, Pencil, Rocket, Check, CaretRight } from '@phosphor-icons/react'
import { Container } from '@/components/layout'
import { Reveal } from '@/components/shared'

const customEase: [number, number, number, number] = [0.16, 1, 0.3, 1]

// Fases com entregas E resultados
const FASES_FRAMEWORK = [
  {
    fase: 1,
    nome: 'Entender',
    periodo: 'Fase inicial',
    descricao: 'Mapeamos sua operação atual, identificamos gaps e desenhamos o caminho.',
    tagline: 'Entendemos antes de fazer',
    entregas: [
      'Diagnóstico completo da operação',
      'Mapa de jornada do cliente',
      'Gap analysis e quick wins',
      'Roadmap de implementação',
    ],
    resultado: 'Visão clara do que precisa mudar',
    icon: Target,
    color: '#635BFF',
    colorLight: 'rgba(99, 91, 255, 0.1)',
  },
  {
    fase: 2,
    nome: 'Desenhar',
    periodo: 'Arquitetura',
    descricao: 'Arquitetamos a solução antes de configurar. Cada processo pensado.',
    tagline: 'Arquitetamos antes de configurar',
    entregas: [
      'Blueprint técnico completo',
      'Arquitetura de funis e pipelines',
      'Mapa de automações',
      'Playbooks por função',
    ],
    resultado: 'Solução desenhada sob medida',
    icon: Pencil,
    color: '#F59E0B',
    colorLight: 'rgba(245, 158, 11, 0.1)',
  },
  {
    fase: 3,
    nome: 'Entregar',
    periodo: 'Go-live',
    descricao: 'Configuramos, integramos e treinamos. Sua operação funcionando.',
    tagline: 'Treinamos até funcionar',
    entregas: [
      'Bitrix24 configurado e rodando',
      'Integrações ativas e testadas',
      'Equipe treinada via Fluidz',
      'Operação funcionando',
    ],
    resultado: 'Sistema rodando + equipe usando',
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
      delay: 0.2 + i * 0.15,
      duration: 0.6,
      ease: customEase,
    },
  }),
}

export function FrameworkVisual() {
  return (
    <section className="py-24 sm:py-32 bg-white relative overflow-hidden">
      {/* Subtle background texture */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      <Container className="relative">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <Reveal>
              <p className="text-brand font-semibold text-sm uppercase tracking-wider mb-4">
                Metodologia Fluidsales™
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Como entregamos na prática
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Processo estruturado em{' '}
                <span className="text-gray-900 font-semibold">3 etapas</span> — cada uma com entregas claras
              </p>
            </Reveal>
          </div>

          {/* Phases Grid */}
          <div className="relative">
            {/* Connection line - desktop only */}
            <div className="hidden lg:block absolute top-24 left-[16%] right-[16%] h-0.5 bg-linear-to-r from-brand via-warning to-success opacity-20" />

            <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
              {FASES_FRAMEWORK.map((fase, index) => {
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
                    {index < FASES_FRAMEWORK.length - 1 && (
                      <div className="lg:hidden absolute -bottom-3 left-1/2 -translate-x-1/2 z-10">
                        <CaretRight
                          size={24}
                          weight="bold"
                          className="rotate-90 text-gray-300"
                        />
                      </div>
                    )}

                    {/* Card */}
                    <div className="relative bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-500 h-full">
                      {/* Phase number badge */}
                      <div
                        className="absolute -top-4 left-6 px-4 py-1.5 rounded-full text-sm font-bold text-white shadow-lg"
                        style={{
                          backgroundColor: fase.color,
                          boxShadow: `0 4px 14px ${fase.color}40`,
                        }}
                      >
                        Etapa {fase.fase}
                      </div>

                      {/* Icon */}
                      <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 mt-2"
                        style={{ backgroundColor: fase.colorLight }}
                      >
                        <Icon
                          size={28}
                          weight="duotone"
                          style={{ color: fase.color }}
                        />
                      </div>

                      {/* Name */}
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {fase.nome}
                      </h3>

                      {/* Tagline */}
                      <p
                        className="text-sm font-semibold mb-4"
                        style={{ color: fase.color }}
                      >
                        {fase.tagline}
                      </p>

                      {/* Description */}
                      <p className="text-gray-600 leading-relaxed mb-6">
                        {fase.descricao}
                      </p>

                      {/* Deliverables */}
                      <div className="space-y-3 mb-6">
                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                          Entregas
                        </p>
                        {fase.entregas.map((entrega, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-2"
                          >
                            <div
                              className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                              style={{ backgroundColor: fase.colorLight }}
                            >
                              <Check
                                size={12}
                                weight="bold"
                                style={{ color: fase.color }}
                              />
                            </div>
                            <span className="text-sm text-gray-700">{entrega}</span>
                          </div>
                        ))}
                      </div>

                      {/* Result badge */}
                      <div
                        className="flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 border-dashed"
                        style={{
                          borderColor: `${fase.color}40`,
                          backgroundColor: fase.colorLight,
                        }}
                      >
                        <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                          Resultado:
                        </span>
                        <span
                          className="text-sm font-bold"
                          style={{ color: fase.color }}
                        >
                          {fase.resultado}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Transition to next section */}
          <Reveal delay={0.6}>
            <div className="text-center mt-16">
              <p className="text-xl text-gray-600">
                Entregar é metade do trabalho.{' '}
                <span className="font-semibold text-gray-900">A outra é garantir que o time use.</span>
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
