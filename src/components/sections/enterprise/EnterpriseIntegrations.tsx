'use client'

import {
  Database,
  HardDrives,
  Plug,
  type IconProps,
} from '@phosphor-icons/react'
import { Reveal } from '@/components/shared'
import { ENTERPRISE_INTEGRATIONS } from '@/lib/constants'

// Mapeamento de ícones
type PhosphorIcon = React.ComponentType<IconProps>
const ICON_MAP: Record<string, PhosphorIcon> = {
  Database,
  Server: HardDrives,
  Plug,
}

export function EnterpriseIntegrations() {
  return (
    <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
      {ENTERPRISE_INTEGRATIONS.map((integracao, index) => {
        const IconComponent = ICON_MAP[integracao.icon as keyof typeof ICON_MAP]
        return (
          <Reveal key={integracao.categoria} delay={index * 0.1}>
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 h-full">
              <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center mb-4">
                {IconComponent && <IconComponent size={24} weight="duotone" className="text-brand" />}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{integracao.categoria}</h3>
              <p className="text-gray-600 text-sm mb-4">{integracao.descricao}</p>
              <div className="flex flex-wrap gap-2">
                {integracao.integracoes.map((item) => (
                  <span
                    key={item}
                    className="text-xs bg-white text-gray-600 px-2 py-1 rounded-md border border-gray-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        )
      })}
    </div>
  )
}
