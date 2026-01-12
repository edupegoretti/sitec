'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Reveal } from '@/components/shared'
import {
  Zap,
  Bot,
  FolderKanban,
  MessageSquare,
  Megaphone,
  Users,
  Globe,
  Check,
  ChevronDown,
  ImageIcon,
} from 'lucide-react'

// Mapeamento de ícones
const ICON_MAP = {
  Zap,
  Bot,
  FolderKanban,
  MessageSquare,
  Megaphone,
  Users,
  Globe,
} as const

interface ToolCategory {
  id: string
  nome: string
  icone: keyof typeof ICON_MAP
  headline: string
  subtitulo: string
  descricao: string
  ferramentas: string[]
  beneficios: string[]
  cor: string
  screenshotPlaceholder: string
}

interface ToolCategoryCardProps {
  category: ToolCategory
  index: number
  isExpanded?: boolean
  onToggle?: () => void
}

export function ToolCategoryCard({
  category,
  index,
  isExpanded = false,
  onToggle,
}: ToolCategoryCardProps) {
  const Icon = ICON_MAP[category.icone]
  const isEven = index % 2 === 0

  return (
    <Reveal delay={index * 0.1}>
      <div
        className={cn(
          'bg-white rounded-3xl border border-gray-200/80 overflow-hidden',
          'shadow-card hover:shadow-card-hover transition-all duration-300 ease-out-expo',
          isExpanded && 'shadow-elevated'
        )}
      >
        {/* Header sempre visível */}
        <button
          onClick={onToggle}
          className="w-full p-6 sm:p-8 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 rounded-t-3xl"
        >
          <div className="flex items-start gap-4 sm:gap-5">
            {/* Ícone */}
            <div
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${category.cor}15` }}
            >
              <Icon
                className="w-6 h-6 sm:w-7 sm:h-7"
                style={{ color: category.cor }}
              />
            </div>

            {/* Conteúdo principal */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p
                    className="text-xs font-semibold uppercase tracking-wide mb-1"
                    style={{ color: category.cor }}
                  >
                    {category.nome}
                  </p>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                    {category.headline}
                  </h3>
                </div>
                <ChevronDown
                  className={cn(
                    'w-5 h-5 text-gray-400 transition-transform duration-300 ease-out-expo shrink-0',
                    isExpanded && 'rotate-180'
                  )}
                />
              </div>
              <p className="text-gray-600 mt-2 line-clamp-2">{category.subtitulo}</p>
            </div>
          </div>
        </button>

        {/* Conteúdo expandido */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="overflow-hidden"
            >
              <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-0">
                {/* Descrição completa */}
                <p className="text-gray-600 leading-relaxed mb-6">
                  {category.descricao}
                </p>

                {/* Grid de ferramentas e screenshot */}
                <div
                  className={cn(
                    'grid gap-6 lg:gap-8',
                    isEven ? 'lg:grid-cols-[1fr,1.2fr]' : 'lg:grid-cols-[1.2fr,1fr]'
                  )}
                >
                  {/* Lista de ferramentas */}
                  <div className={cn(isEven ? 'lg:order-1' : 'lg:order-2')}>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">
                      Ferramentas incluídas
                    </p>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {category.ferramentas.map((ferramenta, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <Check
                            className="w-4 h-4 shrink-0"
                            style={{ color: category.cor }}
                          />
                          <span className="text-sm text-gray-700">{ferramenta}</span>
                        </div>
                      ))}
                    </div>

                    {/* Benefícios */}
                    <div className="mt-6 pt-5 border-t border-gray-100">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
                        Resultados
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {category.beneficios.map((beneficio, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1.5 text-sm font-medium rounded-full"
                            style={{
                              backgroundColor: `${category.cor}10`,
                              color: category.cor,
                            }}
                          >
                            {beneficio}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Screenshot placeholder */}
                  <div className={cn(isEven ? 'lg:order-2' : 'lg:order-1')}>
                    <div className="relative aspect-16/10 bg-linear-to-br from-gray-100 to-gray-50 rounded-2xl border border-gray-200/80 overflow-hidden">
                      {/* Placeholder visual */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 gap-3">
                        <ImageIcon className="w-12 h-12 opacity-50" />
                        <div className="text-center px-4">
                          <p className="text-sm font-medium">Screenshot: {category.nome}</p>
                          <p className="text-xs text-gray-400 mt-1">
                            {category.screenshotPlaceholder}
                          </p>
                        </div>
                      </div>

                      {/* Borda decorativa com cor da categoria */}
                      <div
                        className="absolute top-0 left-0 right-0 h-1"
                        style={{ backgroundColor: category.cor }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  )
}

// Componente para exibir todas as categorias com accordion
interface ToolCategoriesAccordionProps {
  categories: ToolCategory[]
}

export function ToolCategoriesAccordion({ categories }: ToolCategoriesAccordionProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)

  const handleToggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  return (
    <div className="space-y-4">
      {categories.map((category, index) => (
        <ToolCategoryCard
          key={category.id}
          category={category}
          index={index}
          isExpanded={expandedIndex === index}
          onToggle={() => handleToggle(index)}
        />
      ))}
    </div>
  )
}

// Versão compacta para grid overview
interface ToolCategoryPillProps {
  category: ToolCategory
  isActive?: boolean
  onClick?: () => void
}

export function ToolCategoryPill({ category, isActive, onClick }: ToolCategoryPillProps) {
  const Icon = ICON_MAP[category.icone]

  return (
    <button
      onClick={onClick}
      className={cn(
        'relative px-5 py-3 rounded-2xl font-medium transition-all duration-300 ease-out-expo',
        isActive
          ? 'text-white'
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/80'
      )}
    >
      {isActive && (
        <motion.div
          layoutId="activeToolCategory"
          className="absolute inset-0 rounded-2xl shadow-elevated"
          style={{ backgroundColor: category.cor, boxShadow: `0 10px 40px -10px ${category.cor}40` }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
      )}
      <span className="relative z-10 flex items-center gap-2">
        <Icon className="w-4 h-4" />
        <span className="hidden sm:inline">{category.nome}</span>
      </span>
    </button>
  )
}
