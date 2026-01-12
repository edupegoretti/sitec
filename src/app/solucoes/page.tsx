'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Factory,
  Heart,
  ShieldCheck,
  Plane,
  Briefcase,
  Code,
  Phone,
  MessageCircle,
  Plug,
  ArrowRight,
  Building2,
  Layers,
} from 'lucide-react'
import { Container } from '@/components/layout'
import { Reveal } from '@/components/shared'
import { SOLUCOES_HUB, ZOPU_LINKS } from '@/lib/constants'

const customEase: [number, number, number, number] = [0.16, 1, 0.3, 1]

// Icon mapping
const iconMap: Record<string, React.ElementType> = {
  Factory,
  Heart,
  ShieldCheck,
  Plane,
  Briefcase,
  Code,
  Phone,
  MessageCircle,
  Plug,
}

function getIcon(iconName: string): React.ElementType {
  return iconMap[iconName] || Building2
}

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

export default function SolucoesPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-linear-to-b from-gray-50 to-white" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />

        {/* Accent gradient */}
        <div className="absolute top-0 right-0 w-150 h-150 bg-brand rounded-full blur-[150px] opacity-10 -translate-y-1/2 translate-x-1/4" />

        <Container className="relative">
          <div className="max-w-4xl mx-auto text-center">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand/10 border border-brand/20 rounded-full mb-6">
                <Layers className="w-4 h-4 text-brand" />
                <span className="text-sm font-semibold text-brand">
                  Soluções Bitrix24 + Zopu
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Soluções para seu{' '}
                <span className="text-brand">segmento</span>
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Cada segmento tem suas dores específicas. Veja como o Bitrix24
                com metodologia Zopu resolve o seu.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Verticais por Segmento */}
      <section className="py-20 sm:py-28 bg-white">
        <Container>
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-14">
              <Reveal>
                <p className="text-brand font-semibold text-sm uppercase tracking-wider mb-4">
                  Por segmento
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  Bitrix24 para o seu mercado
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Selecione seu segmento e veja como resolvemos as dores específicas
                </p>
              </Reveal>
            </div>

            {/* Grid de verticais */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {SOLUCOES_HUB.verticais.map((vertical, index) => {
                const Icon = getIcon(vertical.icon)
                return (
                  <motion.div
                    key={vertical.id}
                    custom={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                    variants={cardVariants}
                  >
                    <Link
                      href={`/solucoes/${vertical.id}`}
                      className="group block h-full"
                    >
                      <div className="relative h-full bg-white rounded-2xl p-6 border border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-500 overflow-hidden">
                        {/* Background glow on hover */}
                        <div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{
                            background: `radial-gradient(ellipse at top left, ${vertical.cor}10 0%, transparent 60%)`,
                          }}
                        />

                        <div className="relative">
                          {/* Icon */}
                          <div
                            className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                            style={{ backgroundColor: `${vertical.cor}15` }}
                          >
                            <Icon
                              className="w-7 h-7"
                              style={{ color: vertical.cor }}
                            />
                          </div>

                          {/* Title */}
                          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-800">
                            {vertical.label}
                          </h3>

                          {/* Link indicator */}
                          <div className="flex items-center gap-2 text-gray-500 group-hover:text-gray-900 transition-colors">
                            <span className="text-sm font-medium">
                              Ver solução
                            </span>
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* Capabilities */}
      <section className="py-20 sm:py-28 bg-gray-50">
        <Container>
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="text-center mb-14">
              <Reveal>
                <p className="text-brand font-semibold text-sm uppercase tracking-wider mb-4">
                  Por funcionalidade
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  Funcionalidades que transformam
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Recursos específicos para potencializar sua operação
                </p>
              </Reveal>
            </div>

            {/* Grid de capabilities */}
            <div className="grid sm:grid-cols-3 gap-6">
              {SOLUCOES_HUB.capabilities.map((cap, index) => {
                const Icon = getIcon(cap.icon)
                return (
                  <motion.div
                    key={cap.id}
                    custom={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={cardVariants}
                  >
                    <Link
                      href={`/solucoes/${cap.id}`}
                      className="group block h-full"
                    >
                      <div className="relative h-full bg-white rounded-2xl p-6 border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-500 text-center">
                        {/* Icon */}
                        <div
                          className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-transform duration-300 group-hover:scale-110"
                          style={{ backgroundColor: `${cap.cor}15` }}
                        >
                          <Icon
                            className="w-8 h-8"
                            style={{ color: cap.cor }}
                          />
                        </div>

                        {/* Title */}
                        <h3 className="text-lg font-bold text-gray-900 mb-3">
                          {cap.label}
                        </h3>

                        {/* Link indicator */}
                        <div className="flex items-center justify-center gap-2 text-gray-500 group-hover:text-gray-900 transition-colors">
                          <span className="text-sm font-medium">
                            Saiba mais
                          </span>
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-brand rounded-3xl p-8 sm:p-12 lg:p-16 overflow-hidden">
              {/* Background pattern */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
                  backgroundSize: '24px 24px',
                }}
              />

              <div className="relative text-center">
                <Reveal>
                  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                    Não encontrou seu segmento?
                  </h2>
                </Reveal>

                <Reveal delay={0.1}>
                  <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                    Atendemos diversos outros segmentos. Fale com um especialista
                    e descubra como podemos ajudar.
                  </p>
                </Reveal>

                <Reveal delay={0.2}>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href={ZOPU_LINKS.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-brand rounded-xl font-semibold transition-all hover:scale-105"
                    >
                      Falar com especialista
                      <ArrowRight className="w-5 h-5" />
                    </a>
                    <Link
                      href="/revopslaunch"
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 border border-white/30 rounded-xl font-semibold text-white hover:bg-white/20 transition-all"
                    >
                      Ver metodologia
                    </Link>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}
