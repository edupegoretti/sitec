'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface Feature {
  id: string
  nome: string
  headline: string
  descricao: string
  beneficios: readonly string[]
  cta: {
    texto: string
    link: string
  }
  badge?: string
}

interface FeatureContentProps {
  feature: Feature
  direction: number
}

export function FeatureContent({ feature, direction }: FeatureContentProps) {
  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={feature.id}
        custom={direction}
        initial={{ opacity: 0, x: direction > 0 ? 40 : -40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: direction > 0 ? -40 : 40 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-6"
      >
        {/* Badge (se existir) */}
        {feature.badge && (
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-block px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full"
          >
            {feature.badge}
          </motion.span>
        )}

        {/* Título */}
        <div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.05 }}
            className="text-sm font-semibold text-brand uppercase tracking-wide mb-2"
          >
            {feature.nome}
          </motion.p>
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900"
          >
            {feature.headline}
          </motion.h3>
        </div>

        {/* Descrição */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="text-base sm:text-lg text-gray-600 leading-relaxed"
        >
          {feature.descricao}
        </motion.p>

        {/* Lista de benefícios */}
        <ul className="space-y-3">
          {feature.beneficios.map((beneficio, index) => (
            <motion.li
              key={beneficio}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.05 }}
              className="flex items-start gap-3"
            >
              <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3 h-3 text-green-600" />
              </div>
              <span className="text-gray-700 text-sm sm:text-base">{beneficio}</span>
            </motion.li>
          ))}
        </ul>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Link
            href={feature.cta.link}
            className="inline-flex items-center gap-2 text-brand font-semibold hover:underline group"
          >
            {feature.cta.texto}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
