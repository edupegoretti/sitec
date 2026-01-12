'use client'

import { motion } from 'framer-motion'
import { Award, Users, TrendingUp, Shield } from 'lucide-react'
import { Container } from '@/components/layout'
import { Badge, Reveal } from '@/components/shared'
import { ZOPU_STATS } from '@/lib/constants'

const STATS = [
  {
    icon: Users,
    value: ZOPU_STATS.clientes,
    label: 'Clientes ativos',
    description: 'Empresas que confiam na Zopu',
    color: '#635BFF',
  },
  {
    icon: Award,
    value: ZOPU_STATS.projetos,
    label: 'Projetos entregues',
    description: 'Implementações bem-sucedidas',
    color: '#00A67E',
  },
  {
    icon: TrendingUp,
    value: ZOPU_STATS.alunosFluidz,
    label: 'Certificados Fluidz',
    description: 'Profissionais treinados',
    color: '#F59E0B',
  },
  {
    icon: Shield,
    value: ZOPU_STATS.integracoes,
    label: 'Integrações prontas',
    description: 'Conectores disponíveis',
    color: '#EC4899',
  },
]

export function EvidenciaSocial() {
  return (
    <section className="py-20 sm:py-28 bg-gray-50 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-brand/2 to-transparent" />

      <Container className="relative">
        {/* Header */}
        <div className="text-center mb-16">
          <Reveal>
            <Badge className="mb-4">Resultados comprovados</Badge>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Números que{' '}
              <span className="text-brand">falam por si</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Reconhecidos pela Bitrix24 como referência em retenção e qualidade de implementação.
            </p>
          </Reveal>
        </div>

        {/* Stats grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16">
          {STATS.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Reveal key={stat.label} delay={0.2 + index * 0.1}>
                <motion.div
                  className="relative bg-white rounded-2xl p-6 border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 group"
                  whileHover={{ y: -4 }}
                >
                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${stat.color}15` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: stat.color }} />
                  </div>

                  {/* Value */}
                  <motion.p
                    className="text-4xl font-bold text-gray-900 mb-1"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    {stat.value}
                  </motion.p>

                  {/* Label */}
                  <p className="font-semibold text-gray-700 mb-1">{stat.label}</p>

                  {/* Description */}
                  <p className="text-sm text-gray-500">{stat.description}</p>

                  {/* Accent line */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ backgroundColor: stat.color }}
                  />
                </motion.div>
              </Reveal>
            )
          })}
        </div>

        {/* Recognition card */}
        <Reveal delay={0.6}>
          <div className="max-w-3xl mx-auto">
            <div className="relative bg-bg-dark rounded-2xl p-8 sm:p-10 overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-brand/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />

              <div className="relative flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
                {/* Badge icon */}
                <div className="shrink-0">
                  <div className="w-20 h-20 bg-linear-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/30">
                    <Award className="w-10 h-10 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 rounded-full text-amber-400 text-sm font-semibold mb-3">
                    <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
                    Gold Partner Bitrix24
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                    Reconhecidos no Partner Summit Bitrix24
                  </h3>
                  <p className="text-gray-400">
                    Destacados como referência em retenção de clientes e qualidade de implementação
                    entre todos os parceiros globais.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
