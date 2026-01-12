'use client'

import { motion } from 'framer-motion'
import { Quotes, ArrowRight, Check, Buildings, TrendUp } from '@phosphor-icons/react'
import { Container } from '@/components/layout'
import { Badge, Reveal } from '@/components/shared'
import { GROWTH_ARCHITECTURE_PROVA_SOCIAL } from '@/lib/constants'

const customEase: [number, number, number, number] = [0.16, 1, 0.3, 1]

const statVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.1 + i * 0.1,
      duration: 0.5,
      ease: customEase,
    },
  }),
}

export function ProvasSociaisSection() {
  const { numeros, cases, reconhecimentos } = GROWTH_ARCHITECTURE_PROVA_SOCIAL

  return (
    <section className="py-20 sm:py-28 lg:py-32 bg-[#FAFAFC] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-0 w-80 h-80 bg-brand/3 rounded-full translate-x-1/2 blur-3xl" />
      <div className="absolute bottom-20 left-0 w-64 h-64 bg-green-500/3 rounded-full -translate-x-1/2 blur-3xl" />

      <Container className="relative">
        {/* Header */}
        <div className="text-center mb-16">
          <Reveal>
            <Badge variant="default" className="mb-6">
              Resultados Comprovados
            </Badge>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              450+ empresas comprovaram:{' '}
              <span className="text-brand">o resultado é real.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Não promessas. Números. CRM que funciona e time que usa.
            </p>
          </Reveal>
        </div>

        {/* Stats Grid - Premium design */}
        <Reveal delay={0.3}>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-20">
            {numeros.map((stat, index) => (
              <motion.div
                key={index}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={statVariants}
                className="bg-white rounded-2xl p-6 text-center border border-gray-100 shadow-sm hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
              >
                <p className="text-3xl sm:text-4xl font-bold text-brand mb-1">{stat.valor}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </Reveal>

        {/* Cases Grid - 3 cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {cases.map((caseItem, index) => (
            <Reveal key={caseItem.empresa} delay={0.4 + index * 0.1}>
              <motion.div
                className={`rounded-3xl overflow-hidden h-full flex flex-col ${
                  caseItem.destaque
                    ? 'bg-bg-dark text-white'
                    : 'bg-white border border-gray-100 shadow-elevated'
                }`}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3, ease: customEase }}
              >
                {/* Header */}
                <div className="p-6 sm:p-8">
                  {/* Sector badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${
                        caseItem.destaque
                          ? 'bg-brand/20 text-brand'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      <Buildings size={14} weight="duotone" />
                      {caseItem.setor}
                    </div>
                    {caseItem.destaque && (
                      <span className="text-xs text-white/50 uppercase tracking-wider">
                        Destaque
                      </span>
                    )}
                  </div>

                  {/* Company name */}
                  <h3
                    className={`text-xl sm:text-2xl font-bold mb-4 ${
                      caseItem.destaque ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {caseItem.empresa}
                  </h3>

                  {/* Result highlight */}
                  <div className="flex items-baseline gap-2 mb-6">
                    <span
                      className={`text-4xl font-bold ${
                        caseItem.destaque ? 'text-brand' : 'text-green-600'
                      }`}
                    >
                      {caseItem.resultado}
                    </span>
                    <span
                      className={`text-sm ${
                        caseItem.destaque ? 'text-white/60' : 'text-gray-500'
                      }`}
                    >
                      {caseItem.metrica}
                    </span>
                  </div>

                  {/* Timeline */}
                  <div
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm ${
                      caseItem.destaque
                        ? 'bg-white/10 text-white/80'
                        : 'bg-green-50 text-green-700'
                    }`}
                  >
                    <TrendUp size={14} weight="bold" />
                    {caseItem.periodo}
                  </div>
                </div>

                {/* Testimonial */}
                <div
                  className={`flex-1 p-6 sm:p-8 ${
                    caseItem.destaque
                      ? 'bg-white/5 border-t border-white/10'
                      : 'bg-gray-50 border-t border-gray-100'
                  }`}
                >
                  <Quotes
                    size={32}
                    weight="fill"
                    className={caseItem.destaque ? 'text-brand/30 mb-4' : 'text-brand/20 mb-4'}
                  />

                  <p
                    className={`text-base leading-relaxed mb-6 ${
                      caseItem.destaque ? 'text-white/80' : 'text-gray-700'
                    }`}
                  >
                    "{caseItem.depoimento}"
                  </p>

                  <div>
                    <p
                      className={`font-semibold ${
                        caseItem.destaque ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      {caseItem.autor}
                    </p>
                    <p
                      className={`text-sm ${
                        caseItem.destaque ? 'text-white/50' : 'text-gray-500'
                      }`}
                    >
                      {caseItem.cargo}, {caseItem.empresa}
                    </p>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* CTA to see all cases */}
        <Reveal delay={0.7}>
          <div className="text-center mb-12">
            <a
              href="/cases"
              className="group inline-flex items-center gap-2 text-brand font-semibold hover:underline"
            >
              Ver todos os cases
              <ArrowRight
                size={18}
                weight="bold"
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
          </div>
        </Reveal>

        {/* Recognitions */}
        <Reveal delay={0.8}>
          <div className="flex flex-wrap justify-center gap-4">
            {reconhecimentos.map((item, index) => (
              <div
                key={index}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-100 rounded-full shadow-sm hover:shadow-card transition-shadow"
              >
                <Check size={16} weight="bold" className="text-green-500" />
                <span className="text-sm text-gray-700 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
