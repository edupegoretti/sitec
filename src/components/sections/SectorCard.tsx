'use client'

import { cn } from '@/lib/utils'
import { Reveal } from '@/components/shared'
import {
  Factory,
  Heart,
  Briefcase,
  Plane,
  ShoppingCart,
  ShieldCheck,
  Building2,
} from 'lucide-react'

interface Sector {
  readonly id: string
  readonly nome: string
  readonly icon: string
  readonly dor: string
  readonly solucao: string
  readonly metrica: string
}

interface SectorCardProps {
  sector: Sector
  className?: string
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Factory,
  Heart,
  Briefcase,
  Plane,
  ShoppingCart,
  ShieldCheck,
  Building2,
}

export function SectorCard({ sector, className }: SectorCardProps) {
  const IconComponent = iconMap[sector.icon] || Building2

  return (
    <div
      className={cn(
        'bg-white/5 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 ease-out-expo hover:-translate-y-1 group h-full flex flex-col border border-white/10',
        className
      )}
    >
      {/* Ícone */}
      <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-white/20 transition-all duration-300 ease-out-expo">
        <IconComponent className="w-6 h-6 text-white" />
      </div>

      <h3 className="text-xl font-bold text-white mb-2">{sector.nome}</h3>

      {/* Dor */}
      <p className="text-gray-400 text-sm mb-4">{sector.dor}</p>

      {/* Solução */}
      <p className="text-brand text-sm font-medium mb-4 grow">
        → {sector.solucao}
      </p>

      {/* Métrica */}
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-green-400">
          {sector.metrica.split(' ')[0]}
        </span>
        <span className="text-sm text-gray-400">
          {sector.metrica.split(' ').slice(1).join(' ')}
        </span>
      </div>
    </div>
  )
}

interface SectorGridProps {
  sectors: readonly Sector[]
  className?: string
}

export function SectorGrid({ sectors, className }: SectorGridProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6',
        className
      )}
    >
      {sectors.map((sector, index) => (
        <Reveal key={sector.id} delay={index * 0.1}>
          <SectorCard sector={sector} />
        </Reveal>
      ))}
    </div>
  )
}
