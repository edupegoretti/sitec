'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { UsersThree, ShoppingCart, Headphones, Check, CaretRight } from '@phosphor-icons/react'

interface ModuleShowcaseProps {
  className?: string
}

// Design system aligned - usando apenas classes Tailwind
const MODULE_CLASSES = {
  leads: {
    accentBg: 'bg-brand',
    bgLight: 'bg-brand/5',
    border: 'border-brand/20',
    borderHover: 'hover:border-brand/40',
    text: 'text-brand',
    badge: 'bg-brand/10 text-brand',
    iconBg: 'bg-brand/10',
    checkBg: 'bg-brand/10',
    checkText: 'text-brand',
    dotBg: 'bg-brand',
  },
  vendas: {
    accentBg: 'bg-success',
    bgLight: 'bg-success/5',
    border: 'border-success/20',
    borderHover: 'hover:border-success/40',
    text: 'text-success',
    badge: 'bg-success/10 text-success',
    iconBg: 'bg-success/10',
    checkBg: 'bg-success/10',
    checkText: 'text-success',
    dotBg: 'bg-success',
  },
  'contact-center': {
    accentBg: 'bg-info',
    bgLight: 'bg-info/5',
    border: 'border-info/20',
    borderHover: 'hover:border-info/40',
    text: 'text-info',
    badge: 'bg-info/10 text-info',
    iconBg: 'bg-info/10',
    checkBg: 'bg-info/10',
    checkText: 'text-info',
    dotBg: 'bg-info',
  },
} as const

type ModuleId = keyof typeof MODULE_CLASSES

const MODULES: Array<{
  id: ModuleId
  title: string
  subtitle: string
  icon: typeof UsersThree
  features: string[]
  highlight: string
}> = [
  {
    id: 'leads',
    title: 'Módulo de Leads',
    subtitle: 'Capture e qualifique',
    icon: UsersThree,
    features: [
      'Formulários de captura integrados',
      'Qualificação automática por score',
      'Distribuição inteligente para vendedores',
      'Histórico completo de interações',
      'Importação de bases existentes',
    ],
    highlight: 'Nunca perca um lead',
  },
  {
    id: 'vendas',
    title: 'Módulo de Vendas',
    subtitle: 'Gerencie e feche',
    icon: ShoppingCart,
    features: [
      'Pipeline visual drag-and-drop',
      'Automações de follow-up',
      'Propostas e contratos digitais',
      'Métricas de conversão em tempo real',
      'Previsão de vendas',
    ],
    highlight: 'Pipeline sempre atualizado',
  },
  {
    id: 'contact-center',
    title: 'Contact Center',
    subtitle: 'Centralize canais',
    icon: Headphones,
    features: [
      'WhatsApp Business oficial',
      'E-mail centralizado',
      'Telefonia VoIP integrada',
      'Chat do site em tempo real',
      'Histórico unificado por cliente',
    ],
    highlight: 'Todos os canais em um lugar',
  },
]

export function ModuleShowcase({ className }: ModuleShowcaseProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [expandedModule, setExpandedModule] = useState<ModuleId | null>(null)

  return (
    <div ref={ref} className={className}>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {MODULES.map((module, index) => {
          const Icon = module.icon
          const isExpanded = expandedModule === module.id
          const classes = MODULE_CLASSES[module.id]

          return (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group"
            >
              <motion.div
                className={`relative h-full bg-white rounded-2xl border overflow-hidden cursor-pointer transition-all duration-300 ${classes.border} ${classes.borderHover} ${
                  isExpanded ? 'shadow-elevated' : 'shadow-sm hover:shadow-card'
                }`}
                onClick={() => setExpandedModule(isExpanded ? null : module.id)}
                whileHover={{ y: -2 }}
                layout
              >
                {/* Decorative accent line - usando classe Tailwind */}
                <div className={`absolute top-0 left-0 right-0 h-1 ${classes.accentBg}`} />

                {/* Content */}
                <div className="relative p-6">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="relative shrink-0">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${classes.iconBg}`}
                      >
                        <Icon size={24} weight="duotone" className={classes.text} />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-semibold text-text-primary group-hover:text-text-primary/80 transition-colors">
                        {module.title}
                      </h3>
                      <p className={`text-sm ${classes.text} font-medium`}>
                        {module.subtitle}
                      </p>
                    </div>

                    {/* Expand indicator */}
                    <motion.div
                      animate={{ rotate: isExpanded ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="w-7 h-7 rounded-full bg-bg-secondary flex items-center justify-center shrink-0"
                    >
                      <CaretRight size={16} weight="bold" className="text-text-muted" />
                    </motion.div>
                  </div>

                  {/* Highlight badge - usando classes Tailwind */}
                  <div
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium mb-4 ${classes.badge}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${classes.dotBg}`} />
                    {module.highlight}
                  </div>

                  {/* Features (always show first 2, expand for rest) */}
                  <ul className="space-y-2">
                    {module.features.slice(0, isExpanded ? undefined : 2).map((feature, idx) => (
                      <motion.li
                        key={idx}
                        initial={idx > 1 ? { opacity: 0, height: 0 } : false}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="flex items-start gap-2.5"
                      >
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${classes.checkBg}`}
                        >
                          <Check size={12} weight="bold" className={classes.checkText} />
                        </div>
                        <span className="text-sm text-text-secondary">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Show more indicator */}
                  {!isExpanded && (
                    <p className="mt-3 text-xs text-text-muted">
                      +{module.features.length - 2} recursos inclusos
                    </p>
                  )}

                  {/* Included badge - usando classes Tailwind */}
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 pt-4 border-t border-border-light"
                    >
                      <div
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium ${classes.badge}`}
                      >
                        <Check size={16} weight="bold" />
                        Incluso no CRM Express
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
