'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from '@phosphor-icons/react'
import { Container } from '@/components/layout'
import { Reveal } from '@/components/shared'
import { GROWTH_ARCHITECTURE_FAQ } from '@/lib/constants'

const customEase: [number, number, number, number] = [0.16, 1, 0.3, 1]

interface FAQItemProps {
  pergunta: string
  resposta: string
  isOpen: boolean
  onToggle: () => void
}

function FAQItem({ pergunta, resposta, isOpen, onToggle }: FAQItemProps) {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-5 text-left"
      >
        <span className="text-lg font-semibold text-gray-900">{pergunta}</span>
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
            isOpen ? 'bg-brand text-white' : 'bg-gray-100 text-gray-500'
          }`}
        >
          {isOpen ? <Minus size={16} weight="bold" /> : <Plus size={16} weight="bold" />}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: customEase }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-gray-600 leading-relaxed">{resposta}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function FAQMetodologia() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  // Group FAQs by category
  const processoFaqs = GROWTH_ARCHITECTURE_FAQ.filter((f) => f.categoria === 'processo')
  const bitrix24Faqs = GROWTH_ARCHITECTURE_FAQ.filter((f) => f.categoria === 'bitrix24')

  return (
    <section className="py-20 sm:py-28 lg:py-32 bg-white relative overflow-hidden">
      <Container className="relative">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Reveal>
              <p className="text-brand font-semibold text-sm uppercase tracking-wider mb-4">
                Dúvidas frequentes
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Perguntas e respostas
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-lg text-gray-600">
                As dúvidas mais comuns sobre a metodologia e implementação.
              </p>
            </Reveal>
          </div>

          {/* FAQ Sections */}
          <div className="space-y-8">
            {/* Processo */}
            {processoFaqs.length > 0 && (
              <Reveal delay={0.3}>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">
                    Sobre o Processo
                  </p>
                  <div className="bg-gray-50 rounded-2xl px-6 divide-y divide-gray-200">
                    {processoFaqs.map((faq, index) => (
                      <FAQItem
                        key={index}
                        pergunta={faq.pergunta}
                        resposta={faq.resposta}
                        isOpen={openIndex === index}
                        onToggle={() => handleToggle(index)}
                      />
                    ))}
                  </div>
                </div>
              </Reveal>
            )}

            {/* Bitrix24 */}
            {bitrix24Faqs.length > 0 && (
              <Reveal delay={0.4}>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">
                    Sobre o Bitrix24
                  </p>
                  <div className="bg-gray-50 rounded-2xl px-6 divide-y divide-gray-200">
                    {bitrix24Faqs.map((faq, index) => (
                      <FAQItem
                        key={index}
                        pergunta={faq.pergunta}
                        resposta={faq.resposta}
                        isOpen={openIndex === processoFaqs.length + index}
                        onToggle={() => handleToggle(processoFaqs.length + index)}
                      />
                    ))}
                  </div>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}
