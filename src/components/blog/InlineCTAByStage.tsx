'use client'

import Link from 'next/link'
import { Lightbulb, Rocket, TrendingUp, MessageCircle, ArrowRight } from 'lucide-react'
import { ChartLineUp } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
import { ZOPU_LINKS } from '@/lib/constants'
import type { PostStage } from '@/sanity/lib/labels'

type Props = {
  stage: PostStage | null
  className?: string
}

const CTA_CONFIG: Record<PostStage | 'default', {
  icon: typeof ChartLineUp
  title: string
  description: string
  cta: string
  href?: string
  isModal?: boolean
  gradient: string
  iconBg: string
  iconColor: string
}> = {
  diagnostico: {
    icon: ChartLineUp,
    title: 'Descubra onde seu CRM está travando',
    description: '15 minutos para identificar gargalos e oportunidades no seu processo de vendas.',
    cta: 'Fazer diagnóstico gratuito',
    isModal: true,
    gradient: 'from-blue-50 to-blue-100/50',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
  estruturacao: {
    icon: Lightbulb,
    title: 'Conheça a metodologia que funciona',
    description: 'Fluidsales™: processo, dados, adoção e evolução contínua para sua operação.',
    cta: 'Ver metodologia',
    href: '/metodologia',
    gradient: 'from-amber-50 to-amber-100/50',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
  },
  implementacao: {
    icon: Rocket,
    title: 'Pronto para implementar?',
    description: 'Escolha o escopo ideal: CRM Express (30d), RevOps Launch (60d) ou Enterprise.',
    cta: 'Ver soluções',
    href: '/solucoes',
    gradient: 'from-violet-50 to-violet-100/50',
    iconBg: 'bg-violet-100',
    iconColor: 'text-violet-600',
  },
  otimizacao: {
    icon: TrendingUp,
    title: 'Hora de escalar',
    description: 'Sua operação precisa de mais. Converse com um especialista sobre Enterprise.',
    cta: 'Falar sobre escala',
    href: ZOPU_LINKS.whatsappEspecialista,
    gradient: 'from-emerald-50 to-emerald-100/50',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
  },
  decisao: {
    icon: MessageCircle,
    title: 'Vamos conversar?',
    description: 'Tire suas dúvidas com quem já implementou em mais de 450 empresas.',
    cta: 'Falar com especialista',
    href: ZOPU_LINKS.whatsappEspecialista,
    gradient: 'from-red-50 to-red-100/50',
    iconBg: 'bg-red-100',
    iconColor: 'text-red-600',
  },
  default: {
    icon: ChartLineUp,
    title: 'CRM não precisa ser só cadastro',
    description: 'Diagnóstico gratuito de 15 minutos para descobrir onde sua receita está travando.',
    cta: 'Fazer diagnóstico',
    isModal: true,
    gradient: 'from-brand-light to-brand/10',
    iconBg: 'bg-brand-light',
    iconColor: 'text-brand',
  },
}

export function InlineCTAByStage({ stage, className }: Props) {
  const config = stage ? CTA_CONFIG[stage] : CTA_CONFIG.default
  const Icon = config.icon

  const handleClick = () => {
    if (config.isModal && typeof window !== 'undefined' && window.openDiagnosticoModal) {
      window.openDiagnosticoModal()
    }
  }

  const content = (
    <div
      className={cn(
        'group flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-6 rounded-2xl border border-gray-200 bg-gradient-to-br transition-all duration-300 hover:shadow-card hover:-translate-y-0.5',
        config.gradient,
        className
      )}
    >
      <div className={cn('w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0', config.iconBg)}>
        <Icon className={cn('w-7 h-7', config.iconColor)} />
      </div>

      <div className="flex-1">
        <h3 className="text-lg font-bold text-gray-900 mb-1">
          {config.title}
        </h3>
        <p className="text-gray-600 text-sm">
          {config.description}
        </p>
      </div>

      <div className="flex items-center gap-2 text-brand font-semibold transition-all group-hover:gap-3">
        <span className="whitespace-nowrap">{config.cta}</span>
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </div>
    </div>
  )

  if (config.isModal) {
    return (
      <button onClick={handleClick} className="w-full text-left">
        {content}
      </button>
    )
  }

  if (config.href?.startsWith('http')) {
    return (
      <a href={config.href} target="_blank" rel="noopener noreferrer" className="block">
        {content}
      </a>
    )
  }

  return (
    <Link href={config.href || '/'} className="block">
      {content}
    </Link>
  )
}
