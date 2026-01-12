'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Target, Pencil, Rocket, Check, ChevronRight } from 'lucide-react'
import { Container } from '@/components/layout'
import { Badge, Reveal } from '@/components/shared'
import { FASES_METODOLOGIA } from '@/lib/constants'

const FASE_ICONS = [Target, Pencil, Rocket]
const FASE_COLORS = ['#635BFF', '#F59E0B', '#00A67E']

export function TimelineImersiva() {
  const [activeFase, setActiveFase] = useState(0)

  return (
    <section className="py-24 sm:py-32 bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-brand/3 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-500/3 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />

      <Container>
        {/* Header */}
        <div className="text-center mb-16">
          <Reveal>
            <Badge className="mb-4">As 3 fases</Badge>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Processo estruturado de{' '}
              <span className="text-brand">implementação</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Cada fase tem entregas claras e mensuráveis. Nada de promessas vazias.
            </p>
          </Reveal>
        </div>

        {/* Timeline Navigation - Desktop */}
        <Reveal delay={0.3}>
          <div className="hidden lg:block mb-16">
            <div className="relative max-w-4xl mx-auto">
              {/* Progress line background */}
              <div className="absolute top-8 left-0 right-0 h-1 bg-gray-100 rounded-full" />

              {/* Active progress line */}
              <motion.div
                className="absolute top-8 left-0 h-1 rounded-full"
                style={{ backgroundColor: FASE_COLORS[activeFase] }}
                initial={{ width: '0%' }}
                animate={{ width: `${(activeFase / (FASES_METODOLOGIA.length - 1)) * 100}%` }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              />

              {/* Phase buttons */}
              <div className="relative flex justify-between">
                {FASES_METODOLOGIA.map((fase, index) => {
                  const Icon = FASE_ICONS[index]
                  const isActive = index === activeFase
                  const isCompleted = index < activeFase

                  return (
                    <button
                      key={fase.fase}
                      onClick={() => setActiveFase(index)}
                      className="group flex flex-col items-center focus:outline-none"
                    >
                      <motion.div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 mb-4"
                        style={{
                          backgroundColor: isActive || isCompleted
                            ? FASE_COLORS[index]
                            : '#F3F4F6',
                          boxShadow: isActive
                            ? `0 8px 30px ${FASE_COLORS[index]}40`
                            : 'none',
                        }}
                        animate={{
                          scale: isActive ? 1.1 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <Icon
                          className="w-7 h-7 transition-colors"
                          style={{
                            color: isActive || isCompleted ? 'white' : '#9CA3AF',
                          }}
                        />
                      </motion.div>
                      <span
                        className="text-sm font-semibold transition-colors"
                        style={{
                          color: isActive ? FASE_COLORS[index] : '#6B7280',
                        }}
                      >
                        Fase {fase.fase}
                      </span>
                      <span
                        className="text-base font-bold transition-colors"
                        style={{
                          color: isActive ? '#111827' : '#9CA3AF',
                        }}
                      >
                        {fase.nome}
                      </span>
                      <span className="text-xs text-gray-400 mt-1">
                        {fase.periodo}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Mobile Navigation */}
        <div className="lg:hidden mb-8">
          <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
            {FASES_METODOLOGIA.map((fase, index) => {
              const isActive = index === activeFase
              return (
                <button
                  key={fase.fase}
                  onClick={() => setActiveFase(index)}
                  className="shrink-0 px-4 py-3 rounded-xl font-semibold text-sm transition-all"
                  style={{
                    backgroundColor: isActive ? FASE_COLORS[index] : '#F3F4F6',
                    color: isActive ? 'white' : '#6B7280',
                  }}
                >
                  {fase.nome}
                </button>
              )
            })}
          </div>
        </div>

        {/* Phase Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFase}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-5xl mx-auto"
          >
            {(() => {
              const fase = FASES_METODOLOGIA[activeFase]
              const Icon = FASE_ICONS[activeFase]
              const color = FASE_COLORS[activeFase]

              return (
                <div
                  className="relative rounded-3xl p-8 sm:p-10 lg:p-12 border overflow-hidden"
                  style={{
                    backgroundColor: `${color}08`,
                    borderColor: `${color}20`,
                  }}
                >
                  {/* Background decoration */}
                  <div
                    className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2"
                    style={{ backgroundColor: color }}
                  />

                  <div className="relative grid lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Left: Info */}
                    <div>
                      <div
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold mb-6"
                        style={{
                          backgroundColor: `${color}15`,
                          color: color,
                        }}
                      >
                        <Icon className="w-4 h-4" />
                        {fase.periodo}
                      </div>

                      <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        {fase.nome}
                      </h3>

                      <p className="text-lg text-gray-600 leading-relaxed mb-8">
                        {fase.descricao}
                      </p>

                      {/* Visual progress indicator */}
                      <div className="flex items-center gap-3 mb-8">
                        {[1, 2, 3].map((step) => (
                          <div
                            key={step}
                            className="flex items-center"
                          >
                            <div
                              className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
                              style={{
                                backgroundColor: step <= activeFase + 1 ? color : '#E5E7EB',
                                color: step <= activeFase + 1 ? 'white' : '#9CA3AF',
                              }}
                            >
                              {step <= activeFase ? (
                                <Check className="w-5 h-5" />
                              ) : (
                                step
                              )}
                            </div>
                            {step < 3 && (
                              <div
                                className="w-8 h-0.5 mx-1"
                                style={{
                                  backgroundColor: step <= activeFase ? color : '#E5E7EB',
                                }}
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right: Entregas */}
                    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100">
                      <h4 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <span
                          className="w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${color}15` }}
                        >
                          <Check className="w-4 h-4" style={{ color }} />
                        </span>
                        Entregas desta fase
                      </h4>

                      <div className="space-y-4">
                        {fase.entregas.map((entrega, i) => (
                          <motion.div
                            key={entrega}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 + i * 0.1 }}
                            className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                          >
                            <div
                              className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                              style={{ backgroundColor: `${color}15` }}
                            >
                              <ChevronRight
                                className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                                style={{ color }}
                              />
                            </div>
                            <span className="text-gray-700 font-medium">
                              {entrega}
                            </span>
                          </motion.div>
                        ))}
                      </div>

                      {/* Resultado visual */}
                      <div
                        className="mt-8 p-4 rounded-xl"
                        style={{ backgroundColor: `${color}10` }}
                      >
                        <p className="text-sm" style={{ color }}>
                          <span className="font-semibold">Resultado:</span>{' '}
                          {activeFase === 0 && 'Diagnóstico completo da operação com roadmap de ação'}
                          {activeFase === 1 && 'Arquitetura técnica e processos prontos para configurar'}
                          {activeFase === 2 && 'Operação rodando com equipe treinada e autônoma'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Navigation arrows */}
                  <div className="flex justify-between mt-8 pt-8 border-t border-gray-200/50">
                    <button
                      onClick={() => setActiveFase(Math.max(0, activeFase - 1))}
                      disabled={activeFase === 0}
                      className="flex items-center gap-2 text-gray-500 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronRight className="w-5 h-5 rotate-180" />
                      <span className="font-medium">Fase anterior</span>
                    </button>
                    <button
                      onClick={() => setActiveFase(Math.min(FASES_METODOLOGIA.length - 1, activeFase + 1))}
                      disabled={activeFase === FASES_METODOLOGIA.length - 1}
                      className="flex items-center gap-2 font-medium disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      style={{ color: FASE_COLORS[Math.min(activeFase + 1, 2)] }}
                    >
                      <span>Próxima fase</span>
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )
            })()}
          </motion.div>
        </AnimatePresence>
      </Container>
    </section>
  )
}
