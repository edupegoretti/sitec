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
  ChatText,
  VideoCamera,
  Newspaper,
  Calendar,
  UsersFour,
  FolderOpen,
  Bell,
  CalendarCheck,
  Layout,
  ShoppingCart,
  CreditCard,
  Warehouse,
  MagnifyingGlass,
  ChartBar,
  Palette,
  type IconProps,
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

// Icones especificos para ferramentas do grid
type PhosphorIcon = React.ComponentType<IconProps>
const TOOL_ICONS: Record<string, PhosphorIcon> = {
  'Chat interno ilimitado': ChatText,
  'Videochamadas HD com gravacao': VideoCamera,
  'Feed de atividades': Newspaper,
  'Calendario compartilhado': Calendar,
  'Agendamento de reunioes': CalendarCheck,
  'Grupos e canais tematicos': UsersFour,
  'Compartilhamento de arquivos': FolderOpen,
  'Notificacoes inteligentes': Bell,
  'Site builder no-code': Layout,
  'Templates responsivos': Palette,
  'Loja online completa': ShoppingCart,
  'Carrinho e checkout': CreditCard,
  'Integracao de pagamentos': CreditCard,
  'Gestao de estoque': Warehouse,
  'SEO basico incluso': MagnifyingGlass,
  'Analytics integrado': ChartBar,
}

// Funcao para normalizar texto (remover acentos)
function normalizeText(text: string): string {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

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

interface CategorySectionDProps {
  category: ToolCategory
  background?: 'white' | 'gray'
}

export function CategorySectionD({
  category,
  background = 'white',
}: CategorySectionDProps) {
  const Icon = ICON_MAP[category.icone]
  const bgClass = background === 'white' ? 'bg-white' : 'bg-gray-50'

  // Funcao para obter icone da ferramenta
  const getToolIcon = (ferramenta: string) => {
    const normalizedFerramenta = normalizeText(ferramenta)
    for (const [key, IconComponent] of Object.entries(TOOL_ICONS)) {
      if (normalizedFerramenta.toLowerCase().includes(normalizeText(key).toLowerCase())) {
        return IconComponent
      }
    }
    return Icon // Fallback para icone da categoria
  }

  return (
    <section className={`py-16 sm:py-20 lg:py-24 ${bgClass}`} id={category.id}>
      <Container>
        {/* Header centralizado */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Reveal>
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
              style={{ backgroundColor: `${category.cor}15` }}
            >
              <Icon
                size={32}
                weight="duotone"
                style={{ color: category.cor }}
              />
            </div>
          </Reveal>

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
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
              {category.descricao}
            </p>
          </Reveal>
        </div>

        {/* Grid 2x4 de ferramentas */}
        <Reveal delay={0.25}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mb-10">
            {category.ferramentas.map((ferramenta, idx) => {
              const ToolIcon = getToolIcon(ferramenta)
              return (
                <div
                  key={idx}
                  className="group p-5 rounded-2xl bg-white border border-gray-200/80 shadow-sm hover:shadow-card-hover hover:border-gray-300 transition-all duration-300 hover:-translate-y-1"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${category.cor}10` }}
                  >
                    <ToolIcon
                      size={20}
                      weight="duotone"
                      style={{ color: category.cor }}
                    />
                  </div>
                  <p className="text-sm font-medium text-gray-900 leading-tight">
                    {ferramenta}
                  </p>
                </div>
              )
            })}
          </div>
        </Reveal>

        {/* Beneficios em pills */}
        <Reveal delay={0.3}>
          <div className="flex flex-wrap justify-center gap-3">
            {category.beneficios.map((beneficio, idx) => (
              <span
                key={idx}
                className="px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: `${category.cor}10`,
                  color: category.cor,
                }}
              >
                {beneficio}
              </span>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
