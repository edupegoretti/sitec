'use client'

import { motion } from 'framer-motion'
import { GraduationCap, Check, ArrowRight, Users, BookOpen, Medal, ChartBar, ArrowsClockwise } from '@phosphor-icons/react'
import { Container } from '@/components/layout'
import { Reveal } from '@/components/shared'
import { FLUIDZ_COMPLETO, ZOPU_LINKS } from '@/lib/constants'

const FLUIDZ_BENEFICIOS = [
  {
    icon: GraduationCap,
    titulo: 'Onboarding Poderoso',
    descricao: 'Trilhas personalizadas por função: vendedor, gestor, admin. Cada pessoa aprende o que precisa, quando precisa.',
    cor: '#635BFF',
  },
  {
    icon: ChartBar,
    titulo: 'Adoção Mensurável',
    descricao: 'Dashboard de engajamento mostra quem está usando. Identificamos e corrigimos gaps de adoção rapidamente.',
    cor: '#00A67E',
  },
  {
    icon: ArrowsClockwise,
    titulo: 'Atualização Contínua',
    descricao: 'Conteúdo atualizado a cada release do Bitrix24. Sua equipe sempre preparada para novas funcionalidades.',
    cor: '#F59E0B',
  },
]

export function FluidzShowcase() {
  return (
    <section className="py-20 sm:py-28 bg-linear-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #635BFF 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      <Container className="relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Content */}
            <div>
              <Reveal>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full mb-6">
                  <span className="text-sm font-semibold text-amber-600">A objeção mais comum</span>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  <span className="text-gray-400">"E se minha equipe</span>{' '}
                  <span className="text-brand">não usar?"</span>
                </h2>
              </Reveal>

              <Reveal delay={0.2}>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Criamos a <span className="font-semibold text-brand">Fluidz</span> exatamente para isso.{' '}
                  <span className="font-semibold text-gray-900">Adoção real desde o primeiro dia.</span>
                </p>
              </Reveal>

              {/* Benefits cards */}
              <div className="space-y-4 mb-8">
                {FLUIDZ_BENEFICIOS.map((beneficio, index) => {
                  const Icon = beneficio.icon
                  return (
                    <Reveal key={beneficio.titulo} delay={0.3 + index * 0.1}>
                      <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                          style={{ backgroundColor: `${beneficio.cor}15` }}
                        >
                          <Icon size={20} weight="duotone" style={{ color: beneficio.cor }} />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 mb-1">{beneficio.titulo}</h3>
                          <p className="text-sm text-gray-600">{beneficio.descricao}</p>
                        </div>
                      </div>
                    </Reveal>
                  )
                })}
              </div>

              {/* Included note */}
              <Reveal delay={0.6}>
                <div className="flex items-center gap-2 px-4 py-3 bg-green-50 border border-green-200 rounded-xl mb-6">
                  <Check size={20} weight="bold" className="text-green-600 shrink-0" />
                  <p className="text-green-800 font-medium">
                    A Fluidz está inclusa em todos os projetos Zopu
                  </p>
                </div>
              </Reveal>

              {/* CTA */}
              <Reveal delay={0.7}>
                <a
                  href={ZOPU_LINKS.fluidz}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-brand font-semibold hover:gap-3 transition-all"
                >
                  Conhecer a Fluidz
                  <ArrowRight size={20} weight="bold" />
                </a>
              </Reveal>
            </div>

            {/* Right: Stats card */}
            <Reveal delay={0.3} direction="right">
              <div className="relative">
                {/* Main stats card */}
                <div className="bg-bg-dark rounded-3xl p-8 sm:p-10 text-center relative overflow-hidden">
                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-brand/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-500/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

                  <div className="relative">
                    <motion.p
                      className="text-7xl sm:text-8xl font-bold text-brand mb-3"
                      initial={{ scale: 0.5, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {FLUIDZ_COMPLETO.alunos}
                    </motion.p>
                    <p className="text-xl text-gray-300 mb-2">profissionais certificados</p>
                    <p className="text-sm text-gray-500">
                      Treinamento contínuo por função
                    </p>

                    {/* Audience tags */}
                    <div className="flex flex-wrap justify-center gap-2 mt-8">
                      {FLUIDZ_COMPLETO.publicos.map((publico) => (
                        <span
                          key={publico}
                          className="px-4 py-2 bg-white/10 rounded-full text-sm text-gray-300"
                        >
                          {publico}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floating badges */}
                <motion.div
                  className="absolute -top-4 -left-4 bg-white rounded-xl p-4 shadow-xl border border-gray-100"
                  initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: -6 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <Users size={24} weight="duotone" className="text-brand" />
                </motion.div>

                <motion.div
                  className="absolute -bottom-4 -right-4 bg-white rounded-xl p-4 shadow-xl border border-gray-100"
                  initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 6 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  <Medal size={24} weight="duotone" className="text-amber-500" />
                </motion.div>

                <motion.div
                  className="absolute top-1/2 -right-6 bg-white rounded-xl p-4 shadow-xl border border-gray-100"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                >
                  <BookOpen size={24} weight="duotone" className="text-green-500" />
                </motion.div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}
