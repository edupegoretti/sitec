'use client'

import { Check } from 'lucide-react'
import { motion } from 'framer-motion'
import { Reveal, Button } from '@/components/shared'

interface QuickPitchBoxProps {
  className?: string
}

export function QuickPitchBox({ className = '' }: QuickPitchBoxProps) {
  return (
    <Reveal>
      <div className={`max-w-4xl mx-auto ${className}`}>
        <motion.div
          className="relative bg-gradient-to-br from-brand/5 via-purple-50/50 to-brand/5 rounded-2xl p-8 sm:p-10 border-2 border-brand/20 shadow-elevated overflow-hidden"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Decorative gradient orbs */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10">
            {/* Header */}
            <div className="text-center mb-6">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                O Essencial em 10 Segundos
              </h3>
              <p className="text-sm text-gray-600">
                Entenda o que é Bitrix24 e por que empresas estão migrando
              </p>
            </div>

            {/* Key Points */}
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3 group">
                <div className="flex-shrink-0 mt-0.5">
                  <div className="w-6 h-6 rounded-full bg-brand/10 flex items-center justify-center group-hover:bg-brand/20 transition-colors duration-300">
                    <Check className="w-4 h-4 text-brand" strokeWidth={3} />
                  </div>
                </div>
                <span className="text-base sm:text-lg text-gray-800 leading-snug">
                  <strong className="font-semibold text-gray-900">Plataforma All-in-One:</strong>{' '}
                  CRM + Chat + Projetos + Automação + IA em um único lugar
                </span>
              </li>

              <li className="flex items-start gap-3 group">
                <div className="flex-shrink-0 mt-0.5">
                  <div className="w-6 h-6 rounded-full bg-brand/10 flex items-center justify-center group-hover:bg-brand/20 transition-colors duration-300">
                    <Check className="w-4 h-4 text-brand" strokeWidth={3} />
                  </div>
                </div>
                <span className="text-base sm:text-lg text-gray-800 leading-snug">
                  <strong className="font-semibold text-gray-900">Preço fixo em reais:</strong>{' '}
                  A partir de R$ 1.119/mês com <strong>usuários ilimitados</strong>
                </span>
              </li>

              <li className="flex items-start gap-3 group">
                <div className="flex-shrink-0 mt-0.5">
                  <div className="w-6 h-6 rounded-full bg-brand/10 flex items-center justify-center group-hover:bg-brand/20 transition-colors duration-300">
                    <Check className="w-4 h-4 text-brand" strokeWidth={3} />
                  </div>
                </div>
                <span className="text-base sm:text-lg text-gray-800 leading-snug">
                  <strong className="font-semibold text-gray-900">Substitui 5+ ferramentas desconectadas:</strong>{' '}
                  Elimina Slack, Asana, HubSpot, Zoom e integrações frágeis
                </span>
              </li>

              <li className="flex items-start gap-3 group">
                <div className="flex-shrink-0 mt-0.5">
                  <div className="w-6 h-6 rounded-full bg-brand/10 flex items-center justify-center group-hover:bg-brand/20 transition-colors duration-300">
                    <Check className="w-4 h-4 text-brand" strokeWidth={3} />
                  </div>
                </div>
                <span className="text-base sm:text-lg text-gray-800 leading-snug">
                  <strong className="font-semibold text-gray-900">Dados centralizados:</strong>{' '}
                  Sem duplicação, sem perda de contexto, sem silos
                </span>
              </li>
            </ul>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a
                href="#comparacao"
                className="group flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-brand text-white font-semibold rounded-xl hover:bg-brand-hover transition-all duration-300 shadow-lg shadow-brand/25 hover:shadow-brand/40 hover:-translate-y-0.5"
              >
                <span>Ver comparação detalhada</span>
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </a>

              <a
                href="#tco"
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white border-2 border-brand text-brand font-semibold rounded-xl hover:bg-brand hover:text-white transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <span>Calcular economia</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </a>
            </div>

            {/* Social Proof Mini */}
            <div className="mt-6 pt-6 border-t border-gray-300/50 flex flex-wrap items-center justify-center gap-4 text-xs text-gray-600">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-brand" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                <strong className="font-semibold">Gold Partner</strong> Bitrix24
              </span>
              <span className="text-gray-400">•</span>
              <span className="flex items-center gap-1.5">
                <strong className="font-semibold text-gray-900">96%</strong> retenção anual
              </span>
              <span className="text-gray-400">•</span>
              <span className="flex items-center gap-1.5">
                <strong className="font-semibold text-gray-900">450+</strong> empresas ativas
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </Reveal>
  )
}
