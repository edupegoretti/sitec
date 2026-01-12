'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { BeforeAfterCard } from './BeforeAfterCard'

interface PilarData {
  id: string
  nome: string
  descricao: string
  descricaoCompleta?: string
  icon: string
  antes?: {
    titulo: string
    descricao: string
  }
  depois?: {
    titulo: string
    descricao: string
  }
  visual?: string
}

interface PilarContentProps {
  pilar: PilarData
  index: number
  direction: number
}

export function PilarContent({ pilar, index, direction }: PilarContentProps) {
  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={pilar.id}
        custom={direction}
        initial={{ opacity: 0, x: direction > 0 ? 60 : -60 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: direction > 0 ? -60 : 60 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-6"
      >
        {/* Número + Título */}
        <div className="flex items-center gap-4">
          <span className="text-6xl sm:text-7xl font-bold text-brand/15">
            {String(index + 1).padStart(2, '0')}
          </span>
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {pilar.nome}
            </h3>
          </div>
        </div>

        {/* Descrição expandida */}
        <p className="text-lg text-gray-600 leading-relaxed">
          {pilar.descricaoCompleta || pilar.descricao}
        </p>

        {/* Cards Antes/Depois */}
        <div className="grid sm:grid-cols-2 gap-4 pt-2">
          <BeforeAfterCard
            type="before"
            titulo={pilar.antes?.titulo || 'Antes'}
            descricao={pilar.antes?.descricao || ''}
          />
          <BeforeAfterCard
            type="after"
            titulo={pilar.depois?.titulo || 'Depois'}
            descricao={pilar.depois?.descricao || ''}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
