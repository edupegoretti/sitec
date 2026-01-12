'use client'

import { Container } from '@/components/layout'
import { Reveal } from '@/components/shared'
import {
  Lightning,
  Robot,
  Kanban,
  ChatCircle,
  Megaphone,
  UsersThree,
  Globe,
  Sparkle,
} from '@phosphor-icons/react'

const ICON_MAP = {
  Zap: Lightning,
  Bot: Robot,
  FolderKanban: Kanban,
  MessageSquare: ChatCircle,
  Megaphone: Megaphone,
  Users: UsersThree,
  Globe: Globe,
} as const

interface ToolCategory {
  id: string
  nome: string
  icone: keyof typeof ICON_MAP
  headline: string
  subtitulo: string
  descricao: string
  ferramentas: readonly string[]
  beneficios: readonly string[]
  cor: string
  screenshotPlaceholder: string
}

interface CategorySectionBProps {
  category: ToolCategory
}

export function CategorySectionB({ category }: CategorySectionBProps) {
  const Icon = ICON_MAP[category.icone]

  return (
    <section
      className="py-16 sm:py-20 lg:py-24 relative overflow-hidden"
      id={category.id}
      style={{
        background: `linear-gradient(135deg, ${category.cor}08 0%, transparent 50%, ${category.cor}05 100%)`,
      }}
    >
      {/* Elementos decorativos de fundo */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-30"
        style={{ backgroundColor: `${category.cor}10` }}
      />
      <div
        className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl opacity-20"
        style={{ backgroundColor: `${category.cor}15` }}
      />

      <Container>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Icone */}
          <Reveal>
            <div
              className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg"
              style={{ backgroundColor: `${category.cor}15` }}
            >
              <Icon
                size={40}
                weight="duotone"
                style={{ color: category.cor }}
              />
            </div>
          </Reveal>

          {/* Header */}
          <Reveal delay={0.1}>
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: category.cor }}
            >
              {category.nome}
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              {category.headline}
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-lg sm:text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto">
              {category.descricao}
            </p>
          </Reveal>

          {/* Ferramentas em pills horizontais */}
          <Reveal delay={0.25}>
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {category.ferramentas.map((ferramenta, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2.5 bg-white rounded-xl text-sm text-gray-700 border border-gray-200/80 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-300 hover:-translate-y-0.5"
                >
                  {ferramenta}
                </span>
              ))}
            </div>
          </Reveal>

          {/* Beneficios em badges destacados */}
          <Reveal delay={0.3}>
            <div className="flex flex-wrap justify-center gap-4">
              {category.beneficios.map((beneficio, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 px-5 py-3 rounded-2xl font-medium"
                  style={{
                    backgroundColor: `${category.cor}15`,
                    color: category.cor,
                  }}
                >
                  <Sparkle size={16} weight="duotone" />
                  <span>{beneficio}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
