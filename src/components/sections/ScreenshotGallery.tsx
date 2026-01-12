'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Container } from '@/components/layout'
import { Badge, Reveal } from '@/components/shared'
import { cn } from '@/lib/utils'
import {
  Zap,
  Bot,
  FolderKanban,
  MessageSquare,
  Megaphone,
  Users,
  Globe,
  ImageIcon,
  Maximize2,
  X,
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

interface Screenshot {
  src: string
  alt: string
  titulo: string
  descricao: string
}

interface GalleryCategory {
  id: string
  nome: string
  icone: keyof typeof ICON_MAP
  cor: string
  screenshots: Screenshot[]
}

// Dados das screenshots por categoria (placeholders)
const GALLERY_DATA: GalleryCategory[] = [
  {
    id: 'crm',
    nome: 'CRM & Vendas',
    icone: 'Zap',
    cor: '#635BFF',
    screenshots: [
      {
        src: '/images/bitrix24/crm-pipeline.png',
        alt: 'Pipeline visual de vendas do Bitrix24',
        titulo: 'Pipeline Visual',
        descricao: 'Arraste e solte negócios entre etapas. Visualize valor e probabilidade em cada fase.',
      },
      {
        src: '/images/bitrix24/crm-lead.png',
        alt: 'Ficha de lead detalhada',
        titulo: 'Ficha do Lead',
        descricao: 'Histórico completo de interações, tarefas associadas e timeline de atividades.',
      },
      {
        src: '/images/bitrix24/crm-analytics.png',
        alt: 'Dashboard de analytics de vendas',
        titulo: 'Analytics de Vendas',
        descricao: 'Métricas em tempo real: conversão, ciclo de vendas, performance por vendedor.',
      },
    ],
  },
  {
    id: 'copilot',
    nome: 'IA CoPilot',
    icone: 'Bot',
    cor: '#00A67E',
    screenshots: [
      {
        src: '/images/bitrix24/copilot-chat.png',
        alt: 'CoPilot assistente de IA',
        titulo: 'Assistente Inteligente',
        descricao: 'Pergunte qualquer coisa sobre seus dados. O CoPilot responde com contexto.',
      },
      {
        src: '/images/bitrix24/copilot-transcricao.png',
        alt: 'Transcrição automática de chamadas',
        titulo: 'Transcrição de Chamadas',
        descricao: 'Chamadas transcritas automaticamente com resumo e próximos passos.',
      },
      {
        src: '/images/bitrix24/copilot-email.png',
        alt: 'Geração de e-mails com IA',
        titulo: 'Geração de Conteúdo',
        descricao: 'E-mails, propostas e mensagens gerados com um clique.',
      },
    ],
  },
  {
    id: 'projetos',
    nome: 'Tarefas e Projetos',
    icone: 'FolderKanban',
    cor: '#F59E0B',
    screenshots: [
      {
        src: '/images/bitrix24/kanban-board.png',
        alt: 'Kanban board de projetos',
        titulo: 'Kanban Board',
        descricao: 'Visualização clara do status de cada tarefa. Automações para mover cards.',
      },
      {
        src: '/images/bitrix24/gantt-chart.png',
        alt: 'Gráfico de Gantt',
        titulo: 'Gráfico de Gantt',
        descricao: 'Planejamento visual com dependências, marcos e caminho crítico.',
      },
      {
        src: '/images/bitrix24/workload.png',
        alt: 'Gestão de workload da equipe',
        titulo: 'Workload da Equipe',
        descricao: 'Veja quem está sobrecarregado e redistribua tarefas facilmente.',
      },
    ],
  },
  {
    id: 'comunicacao',
    nome: 'Comunicação',
    icone: 'MessageSquare',
    cor: '#3B82F6',
    screenshots: [
      {
        src: '/images/bitrix24/chat-interno.png',
        alt: 'Chat interno da equipe',
        titulo: 'Chat Interno',
        descricao: 'Mensagens em tempo real, grupos por projeto, histórico pesquisável.',
      },
      {
        src: '/images/bitrix24/video-call.png',
        alt: 'Videochamada HD',
        titulo: 'Videochamadas HD',
        descricao: 'Reuniões com até 48 participantes, gravação e compartilhamento de tela.',
      },
      {
        src: '/images/bitrix24/calendario.png',
        alt: 'Calendário compartilhado',
        titulo: 'Calendário',
        descricao: 'Agendas da equipe sincronizadas, reserva de salas, lembretes automáticos.',
      },
    ],
  },
  {
    id: 'marketing',
    nome: 'Marketing',
    icone: 'Megaphone',
    cor: '#EC4899',
    screenshots: [
      {
        src: '/images/bitrix24/email-marketing.png',
        alt: 'Editor de email marketing',
        titulo: 'Email Marketing',
        descricao: 'Templates prontos, segmentação avançada, métricas de abertura e cliques.',
      },
      {
        src: '/images/bitrix24/landing-builder.png',
        alt: 'Builder de landing pages',
        titulo: 'Landing Pages',
        descricao: 'Crie páginas de captura em minutos. Leads vão direto para o CRM.',
      },
      {
        src: '/images/bitrix24/automacao-marketing.png',
        alt: 'Automação de marketing',
        titulo: 'Automações',
        descricao: 'Sequências de nutrição, triggers por comportamento, lead scoring.',
      },
    ],
  },
  {
    id: 'rh',
    nome: 'RH & Automação',
    icone: 'Users',
    cor: '#8B5CF6',
    screenshots: [
      {
        src: '/images/bitrix24/organograma.png',
        alt: 'Organograma da empresa',
        titulo: 'Organograma',
        descricao: 'Estrutura visual da empresa com hierarquias e departamentos.',
      },
      {
        src: '/images/bitrix24/workflow.png',
        alt: 'Workflow de aprovação',
        titulo: 'Workflows',
        descricao: 'Aprovações de férias, compras, documentos - tudo automatizado.',
      },
      {
        src: '/images/bitrix24/rpa.png',
        alt: 'RPA - Automação robótica',
        titulo: 'RPA',
        descricao: 'Robôs que executam tarefas repetitivas sem intervenção humana.',
      },
    ],
  },
  {
    id: 'sites',
    nome: 'Sites',
    icone: 'Globe',
    cor: '#06B6D4',
    screenshots: [
      {
        src: '/images/bitrix24/site-builder.png',
        alt: 'Site builder no-code',
        titulo: 'Site Builder',
        descricao: 'Arraste blocos para criar seu site. Sem código, sem desenvolvedor.',
      },
      {
        src: '/images/bitrix24/loja-online.png',
        alt: 'Loja online integrada',
        titulo: 'Loja Online',
        descricao: 'E-commerce completo: catálogo, carrinho, checkout, integração de pagamento.',
      },
      {
        src: '/images/bitrix24/formularios.png',
        alt: 'Formulários web',
        titulo: 'Formulários',
        descricao: 'Capture leads com formulários personalizados. Dados vão direto ao CRM.',
      },
    ],
  },
]

interface ScreenshotGalleryProps {
  className?: string
}

export function ScreenshotGallery({ className }: ScreenshotGalleryProps) {
  const [activeTab, setActiveTab] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxImage, setLightboxImage] = useState<Screenshot | null>(null)

  const activeCategory = GALLERY_DATA[activeTab]

  const openLightbox = (screenshot: Screenshot) => {
    setLightboxImage(screenshot)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    setLightboxImage(null)
  }

  return (
    <section className={cn('py-16 sm:py-24 lg:py-32 bg-linear-to-b from-white to-gray-50', className)}>
      <Container>
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <Reveal>
            <Badge className="mb-4">Veja o Bitrix24 em ação</Badge>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Interface pensada para{' '}
              <span className="text-brand">produtividade.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Explore as telas principais de cada área e veja como tudo se conecta.
            </p>
          </Reveal>
        </div>

        {/* Tabs de categorias */}
        <Reveal delay={0.3}>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 sm:mb-14">
            {GALLERY_DATA.map((cat, index) => {
              const Icon = ICON_MAP[cat.icone]
              const isActive = index === activeTab
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(index)}
                  className={cn(
                    'relative px-4 py-2.5 sm:px-5 sm:py-3 rounded-2xl font-medium transition-all duration-300 ease-out-expo',
                    isActive
                      ? 'text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/80'
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeGalleryTab"
                      className="absolute inset-0 rounded-2xl shadow-elevated"
                      style={{
                        backgroundColor: cat.cor,
                        boxShadow: `0 10px 40px -10px ${cat.cor}40`,
                      }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{cat.nome}</span>
                  </span>
                </button>
              )
            })}
          </div>
        </Reveal>

        {/* Grid de screenshots */}
        <Reveal delay={0.4}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
            >
              {activeCategory.screenshots.map((screenshot, idx) => (
                <button
                  key={idx}
                  onClick={() => openLightbox(screenshot)}
                  className="group text-left bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 ease-out-expo hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                >
                  {/* Imagem/Placeholder */}
                  <div className="relative aspect-16/10 bg-linear-to-br from-gray-100 to-gray-50 overflow-hidden">
                    {/* Placeholder visual */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 gap-2">
                      <ImageIcon className="w-10 h-10 opacity-40" />
                      <p className="text-xs opacity-60">Placeholder</p>
                    </div>

                    {/* Overlay no hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <Maximize2 className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Borda decorativa */}
                    <div
                      className="absolute top-0 left-0 right-0 h-1"
                      style={{ backgroundColor: activeCategory.cor }}
                    />
                  </div>

                  {/* Conteúdo */}
                  <div className="p-4 sm:p-5">
                    <h4 className="font-semibold text-gray-900 mb-1">{screenshot.titulo}</h4>
                    <p className="text-sm text-gray-600 line-clamp-2">{screenshot.descricao}</p>
                  </div>
                </button>
              ))}
            </motion.div>
          </AnimatePresence>
        </Reveal>

        {/* Nota sobre screenshots */}
        <Reveal delay={0.5}>
          <p className="text-center text-sm text-gray-500 mt-8">
            Screenshots ilustrativos. Interface pode variar conforme versão e configurações.
          </p>
        </Reveal>
      </Container>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors"
            >
              <X className="w-8 h-8" />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Placeholder no lightbox */}
              <div className="relative aspect-video bg-linear-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden mb-4">
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 gap-3">
                  <ImageIcon className="w-16 h-16 opacity-50" />
                  <p className="text-sm">Screenshot: {lightboxImage.titulo}</p>
                  <p className="text-xs opacity-60">{lightboxImage.src}</p>
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-xl font-bold text-white mb-2">{lightboxImage.titulo}</h3>
                <p className="text-gray-400">{lightboxImage.descricao}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
