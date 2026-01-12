'use client'

import { motion } from 'framer-motion'
import { UsersThree, Rocket, Heart } from '@phosphor-icons/react'
import { Container } from '@/components/layout'

export function HeroTrabalheConosco() {
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
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 bg-brand/10 rounded-full mb-6"
          >
            <UsersThree size={18} weight="duotone" className="text-brand" />
            <span className="text-sm font-medium text-brand">Carreiras</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.1] tracking-tight"
          >
            Trabalhe na{' '}
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
            Buscamos pessoas que querem fazer a diferença.
            <br className="hidden sm:block" />
            Venha construir o futuro das operações de receita conosco.
          </motion.p>

          {/* Quick stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-wrap justify-center gap-6 sm:gap-10"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center">
                <Rocket size={20} weight="duotone" className="text-brand" />
              </div>
              <div className="text-left">
                <p className="text-lg font-bold text-gray-900">Crescimento</p>
                <p className="text-sm text-gray-500">Acelerado</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center">
                <Heart size={20} weight="duotone" className="text-brand" />
              </div>
              <div className="text-left">
                <p className="text-lg font-bold text-gray-900">Cultura</p>
                <p className="text-sm text-gray-500">Colaborativa</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center">
                <UsersThree size={20} weight="duotone" className="text-brand" />
              </div>
              <div className="text-left">
                <p className="text-lg font-bold text-gray-900">Equipe</p>
                <p className="text-sm text-gray-500">Engajada</p>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
