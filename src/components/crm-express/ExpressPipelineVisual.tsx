'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  UserPlus,
  WhatsappLogo,
  Kanban,
  BellRinging,
  CheckCircle,
} from '@phosphor-icons/react'

/**
 * ExpressPipelineVisual - Premium Pipeline Flow
 *
 * Design System:
 * - Single color (brand) with tonal variations
 * - Mobile: vertical timeline | Desktop: horizontal flow
 * - One animation: sequential reveal on scroll
 * - Typography: 15-16px labels, 13px descriptions
 * - Generous whitespace, no visual clutter
 *
 * Inspired by: Linear, Stripe, Notion process flows
 */

const STAGES = [
  {
    id: 'capture',
    label: 'Lead capturado',
    description: 'Site, WhatsApp ou indicação',
    icon: UserPlus,
  },
  {
    id: 'centralize',
    label: 'Conversa no CRM',
    description: 'Histórico centralizado',
    icon: WhatsappLogo,
  },
  {
    id: 'organize',
    label: 'Pipeline visual',
    description: 'Etapas claras de venda',
    icon: Kanban,
  },
  {
    id: 'automate',
    label: 'Follow-up automático',
    description: 'Lembretes no tempo certo',
    icon: BellRinging,
  },
  {
    id: 'close',
    label: 'Venda fechada',
    description: 'Processo replicável',
    icon: CheckCircle,
  },
]

export function ExpressPipelineVisual() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.4 })

  return (
    <div ref={ref} className="w-full py-4">
      {/* ========== DESKTOP: Horizontal Flow ========== */}
      <div className="hidden lg:block">
        <div className="relative flex items-start justify-between max-w-4xl mx-auto px-4">
          {/* Connector line - base */}
          <div
            className="absolute top-6 left-[calc(10%)] right-[calc(10%)] h-[2px] bg-gray-100 rounded-full"
            aria-hidden="true"
          />

          {/* Connector line - animated progress */}
          <motion.div
            className="absolute top-6 left-[calc(10%)] right-[calc(10%)] h-[2px] bg-brand/40 rounded-full origin-left"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{
              duration: 1.8,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.2,
            }}
            aria-hidden="true"
          />

          {/* Stages */}
          {STAGES.map((stage, index) => {
            const Icon = stage.icon
            const isLast = index === STAGES.length - 1

            return (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.15 + index * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative z-10 flex flex-col items-center w-[18%]"
              >
                {/* Icon container */}
                <div
                  className={`
                    w-12 h-12 rounded-xl flex items-center justify-center
                    transition-all duration-300 ease-out
                    ${isLast
                      ? 'bg-brand text-white shadow-lg shadow-brand/20'
                      : 'bg-white border border-gray-200 text-gray-500 hover:border-brand/40 hover:text-brand hover:shadow-md hover:shadow-brand/5'
                    }
                  `}
                >
                  <Icon size={22} weight={isLast ? 'fill' : 'regular'} />
                </div>

                {/* Label */}
                <p
                  className={`
                    mt-4 text-[15px] font-medium text-center leading-snug
                    ${isLast ? 'text-brand' : 'text-gray-900'}
                  `}
                >
                  {stage.label}
                </p>

                {/* Description */}
                <p className="mt-1.5 text-[13px] text-gray-500 text-center leading-relaxed">
                  {stage.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* ========== TABLET: Compact Horizontal ========== */}
      <div className="hidden md:block lg:hidden">
        <div className="relative flex items-start justify-between max-w-2xl mx-auto px-2">
          {/* Connector line */}
          <div
            className="absolute top-5 left-[8%] right-[8%] h-[2px] bg-gray-100 rounded-full"
            aria-hidden="true"
          />
          <motion.div
            className="absolute top-5 left-[8%] right-[8%] h-[2px] bg-brand/40 rounded-full origin-left"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            aria-hidden="true"
          />

          {STAGES.map((stage, index) => {
            const Icon = stage.icon
            const isLast = index === STAGES.length - 1

            return (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.1 + index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative z-10 flex flex-col items-center w-[18%]"
              >
                <div
                  className={`
                    w-10 h-10 rounded-lg flex items-center justify-center
                    ${isLast
                      ? 'bg-brand text-white shadow-md shadow-brand/20'
                      : 'bg-white border border-gray-200 text-gray-500'
                    }
                  `}
                >
                  <Icon size={18} weight={isLast ? 'fill' : 'regular'} />
                </div>

                <p
                  className={`
                    mt-3 text-xs font-medium text-center leading-tight
                    ${isLast ? 'text-brand' : 'text-gray-900'}
                  `}
                >
                  {stage.label}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* ========== MOBILE: Vertical Timeline ========== */}
      <div className="md:hidden">
        <div className="relative">
          {/* Vertical connector line */}
          <div
            className="absolute left-[19px] top-6 bottom-6 w-[2px] bg-gray-100 rounded-full"
            aria-hidden="true"
          />
          <motion.div
            className="absolute left-[19px] top-6 bottom-6 w-[2px] bg-brand/40 rounded-full origin-top"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            aria-hidden="true"
          />

          {/* Stages */}
          <div className="space-y-5">
            {STAGES.map((stage, index) => {
              const Icon = stage.icon
              const isLast = index === STAGES.length - 1

              return (
                <motion.div
                  key={stage.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: 0.1 + index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="flex items-start gap-4"
                >
                  {/* Icon */}
                  <div
                    className={`
                      relative z-10 w-10 h-10 rounded-lg flex items-center justify-center shrink-0
                      ${isLast
                        ? 'bg-brand text-white shadow-md shadow-brand/20'
                        : 'bg-white border border-gray-200 text-gray-500'
                      }
                    `}
                  >
                    <Icon size={18} weight={isLast ? 'fill' : 'regular'} />
                  </div>

                  {/* Content */}
                  <div className="pt-2">
                    <p
                      className={`
                        text-[15px] font-medium leading-tight
                        ${isLast ? 'text-brand' : 'text-gray-900'}
                      `}
                    >
                      {stage.label}
                    </p>
                    <p className="text-[13px] text-gray-500 mt-0.5 leading-relaxed">
                      {stage.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
