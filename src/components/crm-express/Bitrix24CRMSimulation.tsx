'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useCallback } from 'react'
import {
  Users,
  Target,
  FileText,
  Trophy,
  Clock,
  Check,
  CaretRight,
} from '@phosphor-icons/react'
import Image from 'next/image'

/**
 * Bitrix24CRMSimulation - Simulação visual do CRM Bitrix24 2025
 *
 * Características:
 * - Visual light theme autêntico do Bitrix24
 * - Cores por estágio: azul, roxo, laranja, verde
 * - Cards com avatar, empresa, valor, prazo
 * - Animações contínuas de deals movendo pelo pipeline
 */

interface Deal {
  id: number
  stage: number
  value: number
  company: string
  avatar: string
  avatarColor: string
  dueDate: string
  isUrgent: boolean
}

// Configuração dos estágios com cores Bitrix24 2025
const BITRIX_STAGES = [
  {
    id: 0,
    name: 'Novos',
    icon: Users,
    color: '#19aef9', // Azul Bitrix24
    bgColor: 'bg-[#19aef9]',
    lightBg: 'bg-blue-50',
    textColor: 'text-[#19aef9]',
  },
  {
    id: 1,
    name: 'Qualificados',
    icon: Target,
    color: '#b141f5', // Roxo Bitrix24
    bgColor: 'bg-[#b141f5]',
    lightBg: 'bg-purple-50',
    textColor: 'text-[#b141f5]',
  },
  {
    id: 2,
    name: 'Proposta',
    icon: FileText,
    color: '#ff9839', // Laranja Bitrix24
    bgColor: 'bg-[#ff9839]',
    lightBg: 'bg-orange-50',
    textColor: 'text-[#ff9839]',
  },
  {
    id: 3,
    name: 'Fechados',
    icon: Trophy,
    color: '#00b33e', // Verde Bitrix24
    bgColor: 'bg-[#00b33e]',
    lightBg: 'bg-green-50',
    textColor: 'text-[#00b33e]',
  },
]

// Cores de avatar variadas
const AVATAR_COLORS = [
  'bg-blue-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-indigo-500',
  'bg-teal-500',
  'bg-cyan-500',
  'bg-rose-500',
  'bg-amber-500',
]

// Deals iniciais
const INITIAL_DEALS: Deal[] = [
  { id: 1, stage: 0, value: 15000, company: 'TechCorp', avatar: 'TC', avatarColor: AVATAR_COLORS[0], dueDate: 'Hoje, 14:00', isUrgent: true },
  { id: 2, stage: 0, value: 8500, company: 'StartupX', avatar: 'SX', avatarColor: AVATAR_COLORS[1], dueDate: 'Amanhã', isUrgent: false },
  { id: 3, stage: 0, value: 22000, company: 'InnovateLab', avatar: 'IL', avatarColor: AVATAR_COLORS[2], dueDate: 'Seg, 10:00', isUrgent: false },
  { id: 4, stage: 1, value: 35000, company: 'BigCo', avatar: 'BC', avatarColor: AVATAR_COLORS[3], dueDate: 'Hoje, 16:30', isUrgent: true },
  { id: 5, stage: 1, value: 12000, company: 'MediaPro', avatar: 'MP', avatarColor: AVATAR_COLORS[4], dueDate: 'Qua, 09:00', isUrgent: false },
  { id: 6, stage: 2, value: 45000, company: 'Enterprise', avatar: 'EN', avatarColor: AVATAR_COLORS[5], dueDate: 'Sex, 11:00', isUrgent: false },
  { id: 7, stage: 2, value: 28000, company: 'CloudSys', avatar: 'CS', avatarColor: AVATAR_COLORS[6], dueDate: 'Ter, 14:00', isUrgent: false },
  { id: 8, stage: 3, value: 52000, company: 'GlobalInc', avatar: 'GI', avatarColor: AVATAR_COLORS[7], dueDate: 'Concluído', isUrgent: false },
]

// Empresas para novos leads
const NEW_COMPANIES = [
  { name: 'NovaCo', avatar: 'NC' },
  { name: 'FutureTech', avatar: 'FT' },
  { name: 'DataFlow', avatar: 'DF' },
  { name: 'SmartBiz', avatar: 'SB' },
  { name: 'DigiSoft', avatar: 'DS' },
  { name: 'NetWorks', avatar: 'NW' },
  { name: 'CodeLabs', avatar: 'CL' },
]

function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
}

function formatCompactCurrency(value: number): string {
  if (value >= 1000000) {
    return `R$ ${(value / 1000000).toFixed(1)}M`
  }
  if (value >= 1000) {
    return `R$ ${(value / 1000).toFixed(0)}k`
  }
  return formatCurrency(value)
}

export function Bitrix24CRMSimulation() {
  const [deals, setDeals] = useState<Deal[]>(INITIAL_DEALS)
  const [wonDeals, setWonDeals] = useState(1)
  const [showCelebration, setShowCelebration] = useState(false)
  const [celebrationDeal, setCelebrationDeal] = useState<Deal | null>(null)

  // Calcular valor total por estágio
  const getStageValue = useCallback(
    (stageId: number) => {
      return deals
        .filter((d) => d.stage === stageId)
        .reduce((sum, d) => sum + d.value, 0)
    },
    [deals]
  )

  // Move um deal aleatório para o próximo estágio
  const progressDeal = useCallback(() => {
    setDeals((currentDeals) => {
      const movableDeals = currentDeals.filter((d) => d.stage < 3)
      if (movableDeals.length === 0) return currentDeals

      const randomDeal = movableDeals[Math.floor(Math.random() * movableDeals.length)]

      return currentDeals.map((d) => {
        if (d.id === randomDeal.id) {
          const newStage = d.stage + 1

          // Se chegou ao fechamento, celebra
          if (newStage === 3) {
            setCelebrationDeal(d)
            setShowCelebration(true)
            setWonDeals((prev) => prev + 1)
            setTimeout(() => setShowCelebration(false), 3000)
          }

          return {
            ...d,
            stage: newStage,
            dueDate: newStage === 3 ? 'Concluído' : d.dueDate,
            isUrgent: newStage === 3 ? false : d.isUrgent,
          }
        }
        return d
      })
    })
  }, [])

  // Adiciona novo lead
  const addNewLead = useCallback(() => {
    const randomCompany = NEW_COMPANIES[Math.floor(Math.random() * NEW_COMPANIES.length)]
    const randomValue = Math.floor(Math.random() * 40000) + 10000
    const randomColor = AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)]
    const dueDates = ['Hoje, 15:00', 'Amanhã', 'Seg, 11:00', 'Ter, 09:00', 'Qua, 14:00']
    const randomDueDate = dueDates[Math.floor(Math.random() * dueDates.length)]

    const newDeal: Deal = {
      id: Date.now(),
      stage: 0,
      value: randomValue,
      company: randomCompany.name,
      avatar: randomCompany.avatar,
      avatarColor: randomColor,
      dueDate: randomDueDate,
      isUrgent: randomDueDate.includes('Hoje'),
    }

    setDeals((prev) => {
      // Remove deals antigos no estágio fechado se houver muitos
      const filtered = prev.filter(
        (d) => !(d.stage === 3 && prev.filter((x) => x.stage === 3).length > 3)
      )
      return [...filtered, newDeal]
    })
  }, [])

  // Loop de animação
  useEffect(() => {
    const progressInterval = setInterval(progressDeal, 4000)
    const newLeadInterval = setInterval(addNewLead, 6000)

    return () => {
      clearInterval(progressInterval)
      clearInterval(newLeadInterval)
    }
  }, [progressDeal, addNewLead])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-5xl mx-auto"
    >
      {/* Container principal - Estilo Bitrix24 light */}
      <div className="relative rounded-2xl bg-white border border-gray-200 shadow-xl overflow-hidden">
        {/* Header */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-3">
            {/* Bitrix24 Logo */}
            <div className="flex items-center">
              <Image
                src="/images/bitrix24_logo.png"
                alt="Bitrix24"
                width={100}
                height={24}
                className="h-5 sm:h-6 w-auto object-contain"
              />
            </div>
            <div className="hidden sm:block h-5 w-px bg-gray-300" />
            <span className="hidden sm:inline text-sm font-medium text-gray-600">
              Pipeline de Vendas
            </span>
          </div>

          {/* Indicador ao vivo */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 border border-green-200">
              <motion.div
                className="w-2 h-2 rounded-full bg-green-500"
                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
              <span className="text-xs font-medium text-green-700">Ao vivo</span>
            </div>
          </div>
        </div>

        {/* Pipeline - Área principal */}
        <div className="p-4 sm:p-6 bg-gray-50/30">
          {/* Grid de estágios */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {BITRIX_STAGES.map((stage, stageIndex) => {
              const stageDeals = deals.filter((d) => d.stage === stage.id)
              const stageValue = getStageValue(stage.id)
              const Icon = stage.icon

              return (
                <motion.div
                  key={stage.id}
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: stageIndex * 0.1 }}
                >
                  {/* Header da coluna */}
                  <div
                    className="rounded-t-xl px-3 py-2.5 border-t-4"
                    style={{ borderTopColor: stage.color, backgroundColor: `${stage.color}10` }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5">
                        <Icon
                          size={16}
                          weight="duotone"
                          style={{ color: stage.color }}
                        />
                        <span
                          className="text-xs sm:text-sm font-semibold"
                          style={{ color: stage.color }}
                        >
                          {stage.name}
                        </span>
                      </div>
                      <motion.span
                        key={stageDeals.length}
                        initial={{ scale: 1.3 }}
                        animate={{ scale: 1 }}
                        className="text-xs font-bold px-1.5 py-0.5 rounded-md bg-white text-gray-600 shadow-sm"
                      >
                        {stageDeals.length}
                      </motion.span>
                    </div>
                    <motion.p
                      key={stageValue}
                      initial={{ opacity: 0.5 }}
                      animate={{ opacity: 1 }}
                      className="text-xs font-medium text-gray-500"
                    >
                      {formatCompactCurrency(stageValue)}
                    </motion.p>
                  </div>

                  {/* Coluna de cards */}
                  <div className="min-h-[180px] sm:min-h-[220px] bg-white rounded-b-xl border border-t-0 border-gray-200 p-2 space-y-2">
                    <AnimatePresence mode="popLayout">
                      {stageDeals.slice(0, 3).map((deal) => (
                        <motion.div
                          key={deal.id}
                          layout
                          initial={{ opacity: 0, scale: 0.8, x: -30 }}
                          animate={{
                            opacity: 1,
                            scale: 1,
                            x: 0,
                            transition: {
                              type: 'spring',
                              stiffness: 350,
                              damping: 25,
                            },
                          }}
                          exit={{
                            opacity: 0,
                            scale: 0.9,
                            x: 30,
                            transition: { duration: 0.2 },
                          }}
                          className={`
                            relative p-2.5 rounded-lg bg-white border border-gray-200
                            shadow-sm hover:shadow-md transition-shadow cursor-pointer group
                            ${deal.isUrgent ? 'border-l-2 border-l-red-500' : ''}
                          `}
                          whileHover={{ y: -2 }}
                        >
                          <div className="flex items-start gap-2">
                            {/* Avatar */}
                            <div
                              className={`w-8 h-8 rounded-full ${deal.avatarColor} flex items-center justify-center text-white text-xs font-bold shrink-0`}
                            >
                              {deal.avatar}
                            </div>

                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-gray-900 truncate">
                                {deal.company}
                              </p>
                              <p className="text-xs font-bold text-gray-700">
                                {formatCurrency(deal.value)}
                              </p>

                              {/* Due date badge */}
                              <div className="flex items-center gap-1 mt-1">
                                {stage.id === 3 ? (
                                  <span className="inline-flex items-center gap-0.5 text-[10px] font-medium text-green-600 bg-green-50 px-1.5 py-0.5 rounded">
                                    <Check size={10} weight="bold" />
                                    Fechado
                                  </span>
                                ) : (
                                  <span
                                    className={`inline-flex items-center gap-0.5 text-[10px] font-medium px-1.5 py-0.5 rounded ${
                                      deal.isUrgent
                                        ? 'text-red-600 bg-red-50'
                                        : 'text-gray-500 bg-gray-100'
                                    }`}
                                  >
                                    <Clock size={10} weight="fill" />
                                    {deal.dueDate}
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Hover arrow */}
                            <CaretRight
                              size={14}
                              className="text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1"
                            />
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    {/* Indicador de mais deals */}
                    {stageDeals.length > 3 && (
                      <motion.div
                        className="text-center py-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <span className="text-xs text-gray-400 font-medium">
                          +{stageDeals.length - 3} mais
                        </span>
                      </motion.div>
                    )}

                    {/* Placeholder quando vazio */}
                    {stageDeals.length === 0 && (
                      <div className="flex items-center justify-center h-full text-gray-300">
                        <span className="text-xs">Sem deals</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Footer com métricas */}
        <div className="px-4 sm:px-6 py-3 border-t border-gray-100 bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 sm:gap-6">
              <div>
                <p className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wide">
                  Deals fechados
                </p>
                <motion.p
                  className="text-lg sm:text-xl font-bold text-gray-900"
                  key={wonDeals}
                  initial={{ scale: 1.2, color: '#00b33e' }}
                  animate={{ scale: 1, color: '#111827' }}
                  transition={{ duration: 0.5 }}
                >
                  {wonDeals}
                </motion.p>
              </div>
              <div className="hidden sm:block w-px h-8 bg-gray-200" />
              <div className="hidden sm:block">
                <p className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wide">
                  Valor total pipeline
                </p>
                <p className="text-lg sm:text-xl font-bold text-[#19aef9]">
                  {formatCompactCurrency(
                    deals.reduce((sum, d) => sum + d.value, 0)
                  )}
                </p>
              </div>
            </div>

            {/* Taxa de conversão */}
            <div className="text-right">
              <p className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wide">
                Conversão
              </p>
              <div className="flex items-center gap-2">
                <div className="w-16 sm:w-20 h-2 rounded-full bg-gray-100 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-linear-to-r from-[#19aef9] to-[#00b33e]"
                    initial={{ width: '0%' }}
                    animate={{ width: '28%' }}
                    transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
                  />
                </div>
                <span className="text-sm sm:text-base font-bold text-gray-700">
                  28%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Celebração quando fecha deal */}
        <AnimatePresence>
          {showCelebration && celebrationDeal && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white rounded-2xl p-6 shadow-2xl text-center max-w-xs mx-4"
                initial={{ scale: 0.5, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: -10, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              >
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 5, -5, 0],
                    y: [0, -5, 0],
                  }}
                  transition={{ duration: 0.6, repeat: 2 }}
                >
                  <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                    <Trophy size={32} weight="duotone" className="text-[#00b33e]" />
                  </div>
                </motion.div>
                <p className="text-gray-900 font-bold text-lg">Deal Fechado!</p>
                <p className="text-[#00b33e] font-semibold text-sm mt-1">
                  {celebrationDeal.company}
                </p>
                <p className="text-gray-600 font-bold text-lg mt-1">
                  {formatCurrency(celebrationDeal.value)}
                </p>
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
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 border border-gray-200">
          <span className="text-xs text-gray-500">Simulação ilustrativa do</span>
          <span className="text-xs font-semibold text-[#19aef9]">Bitrix24 CRM</span>
        </div>
      </motion.div>
    </motion.div>
  )
}
