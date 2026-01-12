'use client'

import { motion } from 'framer-motion'
import {
  ChartLineUp,
  ListChecks,
  ChatCenteredDots,
  Robot,
  MegaphoneSimple,
  UsersThree,
  Storefront,
  ArrowRight,
  type IconProps,
} from '@phosphor-icons/react'
import { Reveal } from '@/components/shared'
import { PLATAFORMA_UNIFICADA_CATEGORIAS } from '@/lib/comparativoFerramentas'
import { cn } from '@/lib/utils'

// Icon mapping - note that icon names in data use different format
const iconMap: Record<string, React.ComponentType<IconProps>> = {
  ChartLineUp,
  ListChecks,
  ChatCenteredDots,
  Robot,
  MegaphoneSimple,
  UsersThree,
  StorefrontDuotone: Storefront,
}

interface PlataformaUnificadaGridProps {
  className?: string
}

export function PlataformaUnificadaGrid({ className = '' }: PlataformaUnificadaGridProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {PLATAFORMA_UNIFICADA_CATEGORIAS.map((categoria, index) => {
        const Icon = iconMap[categoria.icon] || ChartLineUp

        return (
          <Reveal key={categoria.id} delay={index * 0.1}>
            <motion.div
              className="group relative bg-white rounded-2xl p-6 border border-gray-200/80 shadow-card hover:shadow-card-hover transition-all duration-300 ease-out-expo hover:-translate-y-1 h-full flex flex-col"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              {/* Icon & Title */}
              <div className="mb-4">
                <div className="w-14 h-14 rounded-xl bg-brand/10 flex items-center justify-center mb-4 group-hover:bg-brand/20 transition-colors duration-300">
                  <Icon size={28} weight="duotone" className="text-brand" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{categoria.titulo}</h3>
              </div>

              {/* Substitui */}
              <div className="mb-4">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Substitui
                </p>
                <div className="flex flex-wrap gap-2">
                  {categoria.substitui.map((ferramenta) => (
                    <span
                      key={ferramenta}
                      className="inline-flex items-center px-2.5 py-1 rounded-lg bg-red-50 text-red-700 text-xs font-medium border border-red-200/50"
                    >
                      {ferramenta}
                    </span>
                  ))}
                </div>
              </div>

              {/* Ferramentas Inclusas */}
              <div className="flex-1">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Ferramentas inclusas
                </p>
                <ul className="space-y-2">
                  {categoria.ferramentas.map((ferramenta) => (
                    <li key={ferramenta} className="flex items-start gap-2 text-sm text-gray-600">
                      <ArrowRight size={16} className="text-brand mt-0.5 flex-shrink-0" weight="bold" />
                      <span>{ferramenta}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tagline (if we add it to data) */}
              {/* Hover gradient effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand/0 to-brand/0 group-hover:from-brand/5 group-hover:to-purple-500/5 transition-all duration-300 pointer-events-none" />
            </motion.div>
          </Reveal>
        )
      })}
    </div>
  )
}
