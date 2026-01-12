'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useCallback } from 'react'
import { Lightning, TrendUp, UsersThree, Target, Trophy } from '@phosphor-icons/react'
import Image from 'next/image'

/**
 * CRMPipelineVisual - Estado da arte em visualização de pipeline
 *
 * Características:
 * - Animações contínuas de cards movendo entre estágios
 * - Partículas fluindo representando leads
 * - Contadores que atualizam em tempo real
 * - Visual imersivo e memorável
 */

interface Deal {
  id: number
  stage: number
  value: string
  company: string
  avatar: string
}

// Configuração dos estágios do pipeline
const STAGES = [
  { id: 0, name: 'Leads', icon: UsersThree, color: 'from-blue-400 to-blue-500', count: 47 },
  { id: 1, name: 'Qualificação', icon: Target, color: 'from-purple-400 to-purple-500', count: 23 },
  { id: 2, name: 'Proposta', icon: TrendUp, color: 'from-amber-400 to-amber-500', count: 12 },
  { id: 3, name: 'Fechamento', icon: Trophy, color: 'from-emerald-400 to-emerald-500', count: 5 },
]

// Deals simulados que se movem pelo pipeline
const INITIAL_DEALS: Deal[] = [
  { id: 1, stage: 0, value: 'R$ 15k', company: 'TechCorp', avatar: 'T' },
  { id: 2, stage: 0, value: 'R$ 8k', company: 'StartupX', avatar: 'S' },
  { id: 3, stage: 1, value: 'R$ 25k', company: 'BigCo', avatar: 'B' },
  { id: 4, stage: 1, value: 'R$ 12k', company: 'MediaPro', avatar: 'M' },
  { id: 5, stage: 2, value: 'R$ 45k', company: 'Enterprise', avatar: 'E' },
  { id: 6, stage: 3, value: 'R$ 32k', company: 'GlobalInc', avatar: 'G' },
]

export function CRMPipelineVisual() {
  const [deals, setDeals] = useState<Deal[]>(INITIAL_DEALS)
  const [wonDeals, setWonDeals] = useState(0)
  const [totalValue, setTotalValue] = useState(137000)
  const [showCelebration, setShowCelebration] = useState(false)

  // Move um deal aleatório para o próximo estágio
  const progressDeal = useCallback(() => {
    setDeals(currentDeals => {
      const movableDeals = currentDeals.filter(d => d.stage < 3)
      if (movableDeals.length === 0) return currentDeals

      const randomDeal = movableDeals[Math.floor(Math.random() * movableDeals.length)]

      return currentDeals.map(d => {
        if (d.id === randomDeal.id) {
          const newStage = d.stage + 1

          // Se chegou ao fechamento, celebra com duração adequada
          if (newStage === 3) {
            setShowCelebration(true)
            setWonDeals(prev => prev + 1)
            setTotalValue(prev => prev + parseInt(d.value.replace(/\D/g, '')) * 1000)
            setTimeout(() => setShowCelebration(false), 3500) // Mais tempo para apreciar a vitória
          }

          return { ...d, stage: newStage }
        }
        return d
      })
    })
  }, [])

  // Adiciona novo lead periodicamente
  const addNewLead = useCallback(() => {
    const companies = ['NovaCo', 'FutureTech', 'CloudSys', 'DataFlow', 'SmartBiz']
    const values = ['R$ 18k', 'R$ 22k', 'R$ 9k', 'R$ 35k', 'R$ 14k']
    const randomCompany = companies[Math.floor(Math.random() * companies.length)]
    const randomValue = values[Math.floor(Math.random() * values.length)]

    const newDeal: Deal = {
      id: Date.now(),
      stage: 0,
      value: randomValue,
      company: randomCompany,
      avatar: randomCompany[0],
    }

    setDeals(prev => {
      // Remove deals muito antigos no estágio 3
      const filtered = prev.filter(d => !(d.stage === 3 && prev.filter(x => x.stage === 3).length > 2))
      return [...filtered, newDeal]
    })
  }, [])

  // Loop de animação contínua - timing calibrado para UX premium
  useEffect(() => {
    const progressInterval = setInterval(progressDeal, 4500) // Mais lento para sentir o progresso
    const newLeadInterval = setInterval(addNewLead, 7000) // Menos frequente, mais impactante

    return () => {
      clearInterval(progressInterval)
      clearInterval(newLeadInterval)
    }
  }, [progressDeal, addNewLead])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full"
    >
      {/* Container principal - Maior e mais imersivo */}
      <div className="relative rounded-3xl bg-linear-to-br from-brand via-[#7C3AED] to-[#8B5CF6] overflow-hidden shadow-2xl shadow-brand/30">
        {/* Decorações de fundo */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

          {/* Grid pattern sutil */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        {/* Header */}
        <div className="relative px-4 sm:px-6 pt-4 sm:pt-5 pb-3 sm:pb-4 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Lightning size={20} weight="duotone" className="text-white" />
            </div>
            <div>
              <p className="text-white font-semibold text-xs sm:text-sm">Pipeline CRM Express</p>
              <p className="text-white/50 text-[10px] sm:text-xs">Simulação ilustrativa</p>
            </div>
          </div>

          {/* Right side: Bitrix24 logo + Live indicator */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Bitrix24 Logo */}
            <div className="flex items-center px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-white/10 backdrop-blur-sm">
              <Image
                src="/images/bitrix24_logo.png"
                alt="Bitrix24"
                width={80}
                height={20}
                className="h-4 sm:h-5 w-auto object-contain brightness-0 invert"
              />
            </div>

            {/* Indicador ao vivo */}
            <div className="flex items-center gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/10 backdrop-blur-sm">
              <motion.div
                className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400"
                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.6, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              />
              <span className="text-[10px] sm:text-xs font-medium text-white/80">Ao vivo</span>
            </div>
          </div>
        </div>

        {/* Pipeline Visual - Área principal */}
        <div className="relative px-4 py-6 sm:px-6 sm:py-8">
          {/* Estágios do Pipeline */}
          <div className="grid grid-cols-4 gap-2 sm:gap-3">
            {STAGES.map((stage, stageIndex) => {
              const stageDeals = deals.filter(d => d.stage === stage.id)
              const Icon = stage.icon

              return (
                <motion.div
                  key={stage.id}
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: stageIndex * 0.1 }}
                >
                  {/* Header do estágio */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1.5">
                      <div className={`w-6 h-6 rounded-lg bg-linear-to-br ${stage.color} flex items-center justify-center`}>
                        <Icon size={14} weight="duotone" className="text-white" />
                      </div>
                      <span className="text-xs font-semibold text-white/90 hidden sm:inline">
                        {stage.name}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-white/60 bg-white/10 px-1.5 py-0.5 rounded">
                      {stageDeals.length}
                    </span>
                  </div>

                  {/* Coluna de cards */}
                  <div className="min-h-[160px] sm:min-h-[200px] space-y-2 relative">
                    {/* Área de drop visual */}
                    <div className="absolute inset-0 rounded-xl bg-white/5 border border-dashed border-white/10" />

                    {/* Cards dos deals */}
                    <AnimatePresence mode="popLayout">
                      {stageDeals.slice(0, 3).map((deal, dealIndex) => (
                        <motion.div
                          key={deal.id}
                          layout
                          initial={{ opacity: 0, scale: 0.8, x: -50 }}
                          animate={{
                            opacity: 1,
                            scale: 1,
                            x: 0,
                            transition: {
                              type: 'spring',
                              stiffness: 380, // Mais suave para sentimento premium
                              damping: 25,
                              delay: dealIndex * 0.08 // Stagger ligeiramente maior
                            }
                          }}
                          exit={{
                            opacity: 0,
                            scale: 0.8,
                            x: 50,
                            transition: { duration: 0.3, ease: 'easeOut' } // Exit mais suave
                          }}
                          className={`relative p-2.5 sm:p-3 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 cursor-pointer group hover:bg-white/25 transition-all ${
                            stage.id === 3 ? 'ring-2 ring-emerald-400/50' : ''
                          }`}
                          whileHover={{ scale: 1.02, y: -2 }}
                        >
                          <div className="flex items-center gap-2">
                            {/* Avatar */}
                            <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-linear-to-br ${stage.color} flex items-center justify-center text-white text-xs font-bold shadow-lg`}>
                              {deal.avatar}
                            </div>

                            <div className="flex-1 min-w-0">
                              <p className="text-white font-semibold text-xs sm:text-sm truncate">
                                {deal.company}
                              </p>
                              <p className="text-white/60 text-[10px] sm:text-xs font-medium">
                                {deal.value}
                              </p>
                            </div>

                            {/* Indicador de won */}
                            {stage.id === 3 && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-5 h-5 rounded-full bg-emerald-400 flex items-center justify-center"
                              >
                                <Trophy size={12} weight="duotone" className="text-white" />
                              </motion.div>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    {/* Indicador de mais cards */}
                    {stageDeals.length > 3 && (
                      <motion.div
                        className="text-center py-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <span className="text-xs text-white/40">
                          +{stageDeals.length - 3} mais
                        </span>
                      </motion.div>
                    )}
                  </div>

                </motion.div>
              )
            })}
          </div>

          {/* Partículas fluindo (decorativas) - movimento mais orgânico */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-white/25"
                initial={{ x: '-10%', y: `${20 + i * 15}%`, opacity: 0 }}
                animate={{
                  x: '110%',
                  y: `${20 + i * 15 + Math.sin(i) * 10}%`,
                  opacity: [0, 0.8, 0.8, 0]
                }}
                transition={{
                  duration: 5 + i * 0.6, // Mais lento
                  repeat: Infinity,
                  delay: i * 1.2, // Mais espaçado
                  ease: [0.4, 0, 0.2, 1] // Easing suave
                }}
              />
            ))}
          </div>
        </div>

        {/* Footer com métricas */}
        <div className="relative px-6 py-4 border-t border-white/10 bg-black/10">
          <div className="flex items-center justify-between">
            {/* Métricas */}
            <div className="flex items-center gap-4 sm:gap-6">
              <div>
                <p className="text-white/50 text-[10px] sm:text-xs uppercase tracking-wider">Deals fechados</p>
                <motion.p
                  className="text-white font-bold text-lg sm:text-xl"
                  key={wonDeals}
                  initial={{ scale: 1.3, color: '#4ade80' }}
                  animate={{ scale: 1, color: '#ffffff' }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} // Easing premium
                >
                  {wonDeals + 5}
                </motion.p>
              </div>
              <div className="hidden sm:block w-px h-8 bg-white/10" />
              <div className="hidden sm:block">
                <p className="text-white/50 text-[10px] sm:text-xs uppercase tracking-wider">Receita gerada</p>
                <motion.p
                  className="text-emerald-400 font-bold text-lg sm:text-xl"
                  key={totalValue}
                  initial={{ scale: 1.15, opacity: 0.7 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  R$ {(totalValue / 1000).toFixed(0)}k
                </motion.p>
              </div>
            </div>

            {/* Conversão */}
            <div className="text-right">
              <p className="text-white/50 text-[10px] sm:text-xs uppercase tracking-wider">Conversão</p>
              <div className="flex items-center gap-2">
                <div className="w-16 sm:w-24 h-2 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    className="h-full bg-linear-to-r from-brand-light to-emerald-400 rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: '25%' }}
                    transition={{ delay: 1, duration: 1.5, ease: 'easeOut' }}
                  />
                </div>
                <span className="text-white font-bold text-sm sm:text-base">25%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Celebração quando fecha deal */}
        <AnimatePresence>
          {showCelebration && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white rounded-2xl p-8 shadow-2xl text-center"
                initial={{ scale: 0.5, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: -10, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              >
                <motion.div
                  animate={{
                    rotate: [0, 12, -12, 8, -8, 0],
                    y: [0, -5, 0]
                  }}
                  transition={{ duration: 0.8, repeat: 2, ease: 'easeInOut' }}
                >
                  <Trophy size={56} weight="duotone" className="mx-auto text-amber-500 mb-3" />
                </motion.div>
                <p className="text-gray-900 font-bold text-xl">Deal Fechado!</p>
                <p className="text-emerald-600 font-semibold mt-1">+ Nova venda no pipeline</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Badge inferior */}
      <motion.div
        className="flex justify-center mt-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 border border-gray-200">
          <div className="flex items-center gap-1.5">
            <Lightning size={14} weight="duotone" className="text-success" />
            <span className="text-sm font-bold text-success">6x</span>
          </div>
          <span className="text-xs text-gray-600">mais rápido que implementação tradicional</span>
        </div>
      </motion.div>
    </motion.div>
  )
}
