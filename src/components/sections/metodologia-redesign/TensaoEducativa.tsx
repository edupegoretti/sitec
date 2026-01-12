'use client'

import { motion } from 'framer-motion'
import { AlertTriangle, Clock, Check, Map, GitBranch, Database, Target, Users, BarChart3 } from 'lucide-react'
import { Container } from '@/components/layout'
import { Badge, Reveal } from '@/components/shared'
import { METODOLOGIA_ZOPU, ZOPU_STATS } from '@/lib/constants'

const PILAR_ICONS: Record<string, React.ElementType> = {
  Map,
  GitBranch,
  Database,
  Target,
  Users,
  BarChart3,
}

export function TensaoEducativa() {
  const pilares = METODOLOGIA_ZOPU.pilares

  return (
    <section className="py-20 sm:py-28 bg-gray-50 relative overflow-hidden">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      <Container className="relative">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <Reveal>
              <Badge variant="danger" className="mb-4">
                A verdade que ninguém conta
              </Badge>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Por que 30 dias —{' '}
                <span className="relative">
                  <span className="relative z-10">e não 3?</span>
                  <motion.span
                    className="absolute bottom-1 left-0 right-0 h-3 bg-red-200/60 z-0"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                  />
                </span>
              </h2>
            </Reveal>
          </div>

          {/* Alert Card */}
          <Reveal delay={0.2}>
            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 sm:p-8 mb-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-100 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />

              <div className="relative flex flex-col sm:flex-row gap-6">
                <div className="shrink-0">
                  <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center">
                    <AlertTriangle className="w-7 h-7 text-red-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-red-900 mb-3">
                    Alguns parceiros prometem CRM em 72 horas
                  </h3>
                  <p className="text-red-800 leading-relaxed mb-4">
                    Isso é impossível. Em 3 dias não dá tempo de entender seu negócio, muito menos transformá-lo.
                  </p>
                  <div className="flex items-center gap-3 text-red-700">
                    <Clock className="w-5 h-5" />
                    <span className="font-medium">
                      O resultado? Ferramenta configurada que ninguém usa.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Intro text */}
          <Reveal delay={0.3}>
            <p className="text-xl text-gray-700 text-center mb-12 max-w-3xl mx-auto">
              Para entregar resultado real, precisamos de tempo para estruturar{' '}
              <span className="font-semibold text-gray-900">6 pilares fundamentais</span>:
            </p>
          </Reveal>

          {/* 6 Pilares Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {pilares.map((pilar, index) => {
              const Icon = PILAR_ICONS[pilar.icon] || Map
              return (
                <Reveal key={pilar.id} delay={0.35 + index * 0.08}>
                  <motion.div
                    className="group relative bg-white rounded-2xl p-6 border border-gray-200 hover:border-brand/30 hover:shadow-lg transition-all duration-300"
                    whileHover={{ y: -4 }}
                  >
                    {/* Number badge */}
                    <div className="absolute -top-3 -left-3 w-8 h-8 bg-brand rounded-lg flex items-center justify-center shadow-lg">
                      <span className="text-white text-sm font-bold">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-brand/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-brand/15 transition-colors">
                        <Icon className="w-6 h-6 text-brand" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1 group-hover:text-brand transition-colors">
                          {pilar.nome}
                        </h4>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {pilar.descricao}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </Reveal>
              )
            })}
          </div>

          {/* Success Card */}
          <Reveal delay={0.7}>
            <div className="bg-linear-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 sm:p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-green-100 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />

              <div className="relative flex flex-col sm:flex-row gap-6 items-start">
                <div className="shrink-0">
                  <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center">
                    <Check className="w-7 h-7 text-green-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-green-900 mb-3">
                    Fazemos tudo isso ANTES de configurar a ferramenta
                  </h3>
                  <p className="text-green-800 leading-relaxed">
                    É por isso que{' '}
                    <span className="font-bold text-green-700">{ZOPU_STATS.retencao}</span> dos nossos
                    clientes ficam — enquanto{' '}
                    <span className="font-bold text-red-600">{ZOPU_STATS.taxaFalha}</span> dos projetos
                    do mercado falham.
                  </p>
                </div>
              </div>

              {/* Stats comparison */}
              <div className="relative grid sm:grid-cols-2 gap-4 mt-8 pt-8 border-t border-green-200">
                <div className="text-center p-4 bg-white/60 rounded-xl">
                  <p className="text-4xl font-bold text-green-600 mb-1">{ZOPU_STATS.retencao}</p>
                  <p className="text-sm text-green-700 font-medium">Retenção Zopu</p>
                </div>
                <div className="text-center p-4 bg-white/60 rounded-xl">
                  <p className="text-4xl font-bold text-red-500 mb-1">{ZOPU_STATS.taxaFalha}</p>
                  <p className="text-sm text-red-600 font-medium">Falha do mercado</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
