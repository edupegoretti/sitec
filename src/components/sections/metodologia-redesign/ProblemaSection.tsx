'use client'

import { motion } from 'framer-motion'
import { Settings, Database, MessageCircle, Users, AlertTriangle, TrendingDown } from 'lucide-react'
import { Container } from '@/components/layout'
import { Badge, Reveal } from '@/components/shared'
import { METODOLOGIA_SINTOMAS } from '@/lib/constants'

const customEase: [number, number, number, number] = [0.16, 1, 0.3, 1]

const SINTOMA_ICONS: Record<string, React.ElementType> = {
  Settings,
  Database,
  MessageCircle,
  Users,
}

interface Sintoma {
  id: string
  titulo: string
  descricao: string
  dado: string
  fonte: string
  icone: string
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2 + i * 0.1,
      duration: 0.6,
      ease: customEase,
    },
  }),
}

export function ProblemaSection() {
  const sintomas = METODOLOGIA_SINTOMAS as readonly Sintoma[]

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
      <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-red-500/30 to-transparent" />

      <Container className="relative">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200 rounded-full mb-6">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                <span className="text-sm font-semibold text-red-700">
                  A verdade que ninguém conta
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                Por que CRMs se tornam
                <br />
                <span className="relative inline-block">
                  <span className="relative z-10 text-red-600">elefantes brancos</span>
                  <motion.span
                    className="absolute bottom-1 left-0 right-0 h-3 bg-red-100 z-0 rounded"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                  />
                </span>
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                4 sintomas do <span className="font-semibold text-gray-800">"CRM como projeto de TI"</span>
              </p>
            </Reveal>
          </div>

          {/* Symptoms Grid */}
          <div className="grid md:grid-cols-2 gap-5 lg:gap-6 mb-16">
            {sintomas.map((sintoma, index) => {
              const Icon = SINTOMA_ICONS[sintoma.icone] || Settings

              return (
                <motion.div
                  key={sintoma.id}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-50px' }}
                  variants={cardVariants}
                  className="group relative"
                >
                  <div className="relative bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 hover:border-red-200 hover:shadow-xl hover:shadow-red-100/50 transition-all duration-500 h-full">
                    {/* Number indicator */}
                    <div className="absolute -top-3 -left-3 w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center shadow-lg shadow-red-500/30">
                      <span className="text-white text-sm font-bold">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col sm:flex-row gap-5">
                      {/* Icon */}
                      <div className="shrink-0">
                        <div className="w-14 h-14 bg-red-50 rounded-xl flex items-center justify-center group-hover:bg-red-100 transition-colors">
                          <Icon className="w-7 h-7 text-red-500" />
                        </div>
                      </div>

                      {/* Text content */}
                      <div className="flex-1">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-red-700 transition-colors">
                          {sintoma.titulo}
                        </h3>
                        <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4">
                          {sintoma.descricao}
                        </p>

                        {/* Impact badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-50 border border-red-100 rounded-full">
                          <TrendingDown className="w-3.5 h-3.5 text-red-500" />
                          <span className="text-xs sm:text-sm font-semibold text-red-700">
                            {sintoma.dado}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Source footnote */}
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <p className="text-xs text-gray-400">
                        Fonte: {sintoma.fonte}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Positioning Statement */}
          <Reveal delay={0.5}>
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

              <div className="relative text-center max-w-3xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.6, ease: customEase }}
                >
                  <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-6">
                    Não somos implementadores.
                    <br />
                    <span className="bg-linear-to-r from-brand to-violet-400 bg-clip-text text-transparent">
                      Somos consultoria de receita.
                    </span>
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  <p className="text-gray-400 text-lg max-w-xl mx-auto">
                    Por isso, antes de configurar qualquer ferramenta, desenhamos sua operação de receita com metodologia própria.
                  </p>
                </motion.div>

                {/* Arrow indicator to next section */}
                <motion.div
                  className="mt-10"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  <div className="inline-flex flex-col items-center gap-2 text-gray-500">
                    <span className="text-sm font-medium">Conheça a Metodologia Fluidsales™</span>
                    <motion.div
                      animate={{ y: [0, 6, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
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
