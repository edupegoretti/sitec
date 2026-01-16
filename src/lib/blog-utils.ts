/**
 * Blog utilities
 * Utilitários para o blog - tempo de leitura, datas relativas, cores de tópicos
 */

/**
 * Calcula tempo de leitura em minutos
 */
export function calculateReadingTime(text?: string): number {
  if (!text) return 1
  const wordCount = text.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(wordCount / 200))
}

/**
 * Formata data relativa em português
 */
export function formatRelativeDate(dateString: string): string {
  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) return dateString

  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'Hoje'
  if (diffDays === 1) return 'Ontem'
  if (diffDays < 7) return `há ${diffDays} dias`
  if (diffDays < 14) return 'há 1 semana'
  if (diffDays < 30) return `há ${Math.floor(diffDays / 7)} semanas`
  if (diffDays < 60) return 'há 1 mês'
  if (diffDays < 365) return `há ${Math.floor(diffDays / 30)} meses`

  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

/**
 * Cores por tópico (baseado em temas do Sanity)
 */
export const TOPIC_COLORS: Record<
  string,
  {
    bg: string
    text: string
    border: string
    gradient: string
    dot: string
  }
> = {
  vendas: {
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    border: 'border-amber-200',
    gradient: 'from-amber-500 to-orange-500',
    dot: 'bg-amber-400',
  },
  marketing: {
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-200',
    gradient: 'from-blue-500 to-cyan-500',
    dot: 'bg-blue-400',
  },
  automacao: {
    bg: 'bg-violet-50',
    text: 'text-violet-700',
    border: 'border-violet-200',
    gradient: 'from-violet-500 to-purple-500',
    dot: 'bg-violet-400',
  },
  processos: {
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    border: 'border-emerald-200',
    gradient: 'from-emerald-500 to-teal-500',
    dot: 'bg-emerald-400',
  },
  dados: {
    bg: 'bg-cyan-50',
    text: 'text-cyan-700',
    border: 'border-cyan-200',
    gradient: 'from-cyan-500 to-blue-500',
    dot: 'bg-cyan-400',
  },
  time: {
    bg: 'bg-rose-50',
    text: 'text-rose-700',
    border: 'border-rose-200',
    gradient: 'from-rose-500 to-pink-500',
    dot: 'bg-rose-400',
  },
  crm: {
    bg: 'bg-indigo-50',
    text: 'text-indigo-700',
    border: 'border-indigo-200',
    gradient: 'from-indigo-500 to-purple-500',
    dot: 'bg-indigo-400',
  },
  gestao: {
    bg: 'bg-teal-50',
    text: 'text-teal-700',
    border: 'border-teal-200',
    gradient: 'from-teal-500 to-emerald-500',
    dot: 'bg-teal-400',
  },
  default: {
    bg: 'bg-gray-50',
    text: 'text-gray-700',
    border: 'border-gray-200',
    gradient: 'from-gray-500 to-gray-600',
    dot: 'bg-gray-400',
  },
}

export function getTopicColors(slug?: string | null) {
  if (!slug) return TOPIC_COLORS.default
  return TOPIC_COLORS[slug] || TOPIC_COLORS.default
}
