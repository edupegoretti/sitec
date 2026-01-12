'use client'

import { motion } from 'framer-motion'
import {
  UsersThree,
  Lightning,
  Target,
  Eye,
  Handshake,
  BookOpen,
  ChartLineUp,
  UsersFour,
} from '@phosphor-icons/react'
import { Container } from '@/components/layout'
import { Reveal } from '@/components/shared'

const VALORES = [
  {
    icon: UsersThree,
    titulo: 'Foco no cliente',
    descricao: 'Colocamos o sucesso do cliente no centro de todas as decisões.',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: Lightning,
    titulo: 'Inovação contínua',
    descricao: 'Buscamos constantemente novas formas de entregar mais valor.',
    color: 'from-amber-500 to-orange-500',
  },
  {
    icon: Target,
    titulo: 'Foco em resultados',
    descricao: 'Medimos nosso sucesso pelos resultados dos nossos clientes.',
    color: 'from-green-500 to-emerald-600',
  },
  {
    icon: Eye,
    titulo: 'Transparência',
    descricao: 'Comunicação clara e honesta em todas as interações.',
    color: 'from-purple-500 to-purple-600',
  },
  {
    icon: Handshake,
    titulo: 'Comprometimento',
    descricao: 'Assumimos responsabilidade e entregamos o que prometemos.',
    color: 'from-brand to-indigo-600',
  },
  {
    icon: BookOpen,
    titulo: 'Aprendizado contínuo',
    descricao: 'Evoluímos constantemente para oferecer o melhor.',
    color: 'from-pink-500 to-rose-600',
  },
  {
    icon: ChartLineUp,
    titulo: 'Orientação por dados',
    descricao: 'Decisões baseadas em métricas e evidências reais.',
    color: 'from-cyan-500 to-teal-600',
  },
  {
    icon: UsersFour,
    titulo: 'Trabalho em equipe',
    descricao: 'Colaboração e respeito são a base do nosso trabalho.',
    color: 'from-red-500 to-rose-600',
  },
]

export function ValoresSobre() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <Container>
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-12 lg:mb-16">
          <Reveal>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand/10 rounded-full mb-6">
              <Handshake size={16} weight="duotone" className="text-brand" />
              <span className="text-sm font-medium text-brand">Nossos Valores</span>
            </span>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
              O que nos guia{' '}
              <span className="text-brand">todos os dias</span>
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-4 text-lg text-gray-600">
              Esses são os princípios que orientam cada decisão e cada entrega da nossa equipe.
            </p>
          </Reveal>
        </div>

        {/* Values Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {VALORES.map((valor, index) => {
            const Icon = valor.icon
            return (
              <Reveal key={valor.titulo} delay={0.1 + index * 0.05}>
                <motion.div
                  className="group relative h-full"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative h-full bg-gray-50 hover:bg-white rounded-2xl border border-gray-100 hover:border-gray-200 p-6 transition-all duration-300 hover:shadow-lg">
                    {/* Icon with gradient */}
                    <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${valor.color} flex items-center justify-center mb-4 shadow-lg shadow-gray-200/50 group-hover:shadow-xl group-hover:scale-105 transition-all duration-300`}>
                      <Icon size={24} weight="fill" className="text-white" />
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {valor.titulo}
                    </h3>

                    <p className="text-sm text-gray-600 leading-relaxed">
                      {valor.descricao}
                    </p>
                  </div>
                </motion.div>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
