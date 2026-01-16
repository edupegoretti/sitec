'use client'

import Link from 'next/link'
import Image from 'next/image'
import { User, Users, Cpu, ArrowRight } from 'lucide-react'
import { ChartLineUp } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
import { ZOPU_LINKS } from '@/lib/constants'

type Category = {
  slug: string
  title: string
  count?: number
}

type Props = {
  categories: Category[]
  className?: string
}

const PERSONAS = [
  {
    id: 'comercial',
    label: 'Vendedor / Comercial',
    description: 'Foco em prospecção e fechamento',
    href: '/para/comercial',
    icon: User,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
  },
  {
    id: 'gestor',
    label: 'Gestor / CEO',
    description: 'Visão estratégica e resultados',
    href: '/para/gestores',
    icon: Users,
    color: 'text-violet-600',
    bg: 'bg-violet-50',
  },
  {
    id: 'ti',
    label: 'TI / Arquitetura',
    description: 'Integrações e infraestrutura',
    href: '/para/ti',
    icon: Cpu,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
]

const SOCIAL_PROOF = {
  clients: '450+',
  retention: '96%',
  logos: [
    { name: 'WEG', src: '/images/clients/weg.svg' },
    { name: 'Stone', src: '/images/clients/stone.svg' },
    { name: 'SBT', src: '/images/clients/sbt.svg' },
  ],
}

export function BlogSidebarV2({ categories, className }: Props) {
  const handleDiagnosticoClick = () => {
    if (typeof window !== 'undefined' && window.openDiagnosticoModal) {
      window.openDiagnosticoModal()
    }
  }

  return (
    <aside className={cn('space-y-6 sticky top-24', className)}>
      {/* Persona Selector */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Qual seu momento?</h3>
        <div className="space-y-2">
          {PERSONAS.map((persona) => {
            const Icon = persona.icon
            return (
              <Link
                key={persona.id}
                href={persona.href}
                className="group flex items-center gap-3 p-3 -mx-1 rounded-xl hover:bg-gray-50 transition-all duration-200"
              >
                <div className={cn('w-9 h-9 rounded-lg flex items-center justify-center', persona.bg)}>
                  <Icon className={cn('w-4 h-4', persona.color)} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 group-hover:text-brand transition-colors">
                    {persona.label}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{persona.description}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
              </Link>
            )
          })}
        </div>
      </div>

      {/* Diagnóstico CTA */}
      <div className="rounded-2xl bg-gradient-to-br from-brand-light to-brand/10 border border-brand/20 p-5">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-brand/20 flex items-center justify-center flex-shrink-0">
            <ChartLineUp className="w-5 h-5 text-brand" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-1">Diagnóstico Gratuito</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              15 minutos para descobrir onde seu CRM está travando receita.
            </p>
          </div>
        </div>
        <button
          onClick={handleDiagnosticoClick}
          className="w-full py-3 bg-brand text-white font-semibold rounded-xl hover:bg-brand-hover transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card"
        >
          Solicitar agora
        </button>
      </div>

      {/* Social Proof */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{SOCIAL_PROOF.clients}</p>
            <p className="text-xs text-gray-500">clientes</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{SOCIAL_PROOF.retention}</p>
            <p className="text-xs text-gray-500">retenção</p>
          </div>
        </div>
        <div className="pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-500 text-center mb-3">Confiam na Zopu</p>
          <div className="flex items-center justify-center gap-4 opacity-60">
            {/* Placeholder for client logos */}
            <span className="text-xs font-semibold text-gray-400">WEG</span>
            <span className="text-xs font-semibold text-gray-400">Stone</span>
            <span className="text-xs font-semibold text-gray-400">SBT</span>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Categorias</h3>
        <ul className="space-y-1">
          {categories.slice(0, 6).map((category) => (
            <li key={category.slug}>
              <Link
                href={`/recursos/tema/${category.slug}`}
                className="flex items-center justify-between py-2 px-2 -mx-2 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-brand transition-colors text-sm"
              >
                <span>{category.title}</span>
                {typeof category.count === 'number' && (
                  <span className="text-xs text-gray-400">
                    {category.count}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
        {categories.length > 6 && (
          <Link
            href="/recursos/blog"
            className="mt-3 flex items-center gap-1 text-xs text-brand font-medium hover:text-brand-hover transition-colors"
          >
            Ver todas as categorias
            <ArrowRight className="w-3 h-3" />
          </Link>
        )}
      </div>

      {/* WhatsApp CTA */}
      <a
        href={ZOPU_LINKS.whatsappEspecialista}
        target="_blank"
        rel="noopener noreferrer"
        className="block rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 p-5 text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-elevated"
      >
        <p className="font-bold mb-1">Dúvidas?</p>
        <p className="text-sm text-gray-400 mb-3">
          Fale direto com um especialista.
        </p>
        <span className="inline-flex items-center gap-2 text-sm text-brand font-medium">
          Abrir WhatsApp
          <ArrowRight className="w-4 h-4" />
        </span>
      </a>
    </aside>
  )
}
