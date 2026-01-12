'use client'

import { Check } from 'lucide-react'
import {
  Globe,
  Shield,
  Stack,
  ChartBar,
  Headphones,
  Lock,
  Trophy,
  Database,
  HardDrives,
  Plug,
  type IconProps,
} from '@phosphor-icons/react'
import { Reveal } from '@/components/shared'
import { ENTERPRISE_CAPABILITIES_DETAILED } from '@/lib/constants'

// Mapeamento de ícones
type PhosphorIcon = React.ComponentType<IconProps>
const ICON_MAP: Record<string, PhosphorIcon> = {
  Globe,
  Shield,
  Layers: Stack,
  BarChart3: ChartBar,
  Headphones,
  Lock,
  Award: Trophy,
  Database,
  Server: HardDrives,
  Plug,
}

export function EnterpriseCapabilities() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {ENTERPRISE_CAPABILITIES_DETAILED.map((capability, index) => {
        const IconComponent = ICON_MAP[capability.icon as keyof typeof ICON_MAP]
        return (
          <Reveal key={capability.id} delay={index * 0.05}>
            <div className="bg-white rounded-2xl p-6 h-full border border-gray-200 hover:border-brand/30 hover:shadow-card transition-all duration-300 group">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center group-hover:bg-brand transition-colors duration-300">
                  {IconComponent && <IconComponent size={24} weight="duotone" className="text-brand group-hover:text-white transition-colors duration-300" />}
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-brand">
                    {capability.metrica.numero}
                  </p>
                  <p className="text-xs text-gray-500">{capability.metrica.label}</p>
                </div>
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-1">{capability.titulo}</h3>
              <p className="text-sm text-gray-500 mb-4">{capability.subtitulo}</p>

              <div className="space-y-2">
                {capability.features.slice(0, 4).map((feature) => (
                  <div key={feature} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-gray-600 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        )
      })}
    </div>
  )
}
