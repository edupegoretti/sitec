'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CaretDown } from '@phosphor-icons/react'
import { Reveal } from '@/components/shared'
import { FAQ_MIGRACAO } from '@/lib/comparativoFerramentas'
import { cn } from '@/lib/utils'

interface ComparativoFAQProps {
  className?: string
}

export function ComparativoFAQ({ className = '' }: ComparativoFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className={`max-w-3xl mx-auto ${className}`}>
      <div className="space-y-4">
        {FAQ_MIGRACAO.map((faq, index) => {
          const isOpen = openIndex === index

          return (
            <Reveal key={index} delay={index * 0.05}>
              <motion.div
                className={cn(
                  'bg-white rounded-2xl border transition-all duration-300',
                  isOpen
                    ? 'border-brand shadow-md'
                    : 'border-gray-200/80 shadow-sm hover:border-gray-300 hover:shadow-md'
                )}
                initial={false}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 text-left flex items-start justify-between gap-4 group"
                  aria-expanded={isOpen}
                >
                  <span
                    className={cn(
                      'text-base font-semibold transition-colors duration-300',
                      isOpen ? 'text-brand' : 'text-gray-900 group-hover:text-brand'
                    )}
                  >
                    {faq.pergunta}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="shrink-0"
                  >
                    <CaretDown
                      weight="duotone"
                      className={cn(
                        'w-5 h-5 transition-colors duration-300',
                        isOpen ? 'text-brand' : 'text-gray-400 group-hover:text-brand'
                      )}
                    />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 pt-2">
                        <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                          {faq.resposta}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </Reveal>
          )
        })}
      </div>
    </div>
  )
}
