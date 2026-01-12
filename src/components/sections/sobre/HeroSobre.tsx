'use client'

import { motion } from 'framer-motion'
import { Medal, Users, Briefcase, GraduationCap, ArrowsClockwise } from '@phosphor-icons/react'
import { Container } from '@/components/layout'
import { ZOPU_STATS } from '@/lib/constants'

const STATS = [
  {
    value: ZOPU_STATS.clientes,
    label: 'Clientes ativos',
    icon: Users,
  },
  {
    value: ZOPU_STATS.projetos,
    label: 'Projetos entregues',
    icon: Briefcase,
  },
  {
    value: ZOPU_STATS.alunosFluidz,
    label: 'Pessoas treinadas',
    icon: GraduationCap,
  },
  {
    value: ZOPU_STATS.retencao,
    label: 'Taxa de retenção',
    icon: ArrowsClockwise,
  },
]

export function HeroSobre() {
  return (
    <section className="relative bg-white overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-gray-50 via-white to-white" />

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full">
        <div className="absolute inset-0 bg-linear-to-l from-brand/3 to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2">
        <div className="absolute inset-0 bg-linear-to-t from-purple-50/50 to-transparent rounded-full blur-3xl" />
      </div>

      <Container className="relative pt-16 sm:pt-20 lg:pt-24 pb-16 sm:pb-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Gold Partner Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 bg-linear-to-r from-amber-50 to-amber-100/80 border border-amber-200/60 rounded-full mb-6 shadow-sm"
          >
            <Medal size={18} weight="duotone" className="text-amber-500" />
            <span className="text-sm font-medium text-amber-800">Parceiro Gold Bitrix24</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.1] tracking-tight"
          >
            Conheça a{' '}
            <span className="bg-linear-to-r from-brand to-purple-600 bg-clip-text text-transparent">
              Zopu
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto"
          >
            Somos especialistas em transformar operações comerciais com{' '}
            <span className="text-gray-900 font-medium">Bitrix24</span>.
            Mais do que implementar tecnologia, criamos sistemas que funcionam de verdade.
          </motion.p>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          >
            {STATS.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="relative group"
                >
                  <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md hover:border-brand/20 transition-all duration-300">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center group-hover:bg-brand/20 transition-colors duration-300">
                        <Icon size={24} weight="duotone" className="text-brand" />
                      </div>
                      <div className="text-center">
                        <p className="text-3xl sm:text-4xl font-bold text-gray-900">{stat.value}</p>
                        <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
