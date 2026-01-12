'use client'

import {
  CurrencyDollar,
  Stack,
  Robot,
  Globe,
  type IconProps,
} from '@phosphor-icons/react'
import { Reveal } from '@/components/shared'

type PhosphorIcon = React.ComponentType<IconProps>

const VANTAGENS: { icon: PhosphorIcon; titulo: string; descricao: string }[] = [
  {
    icon: CurrencyDollar,
    titulo: 'Preço em Reais',
    descricao: 'Sem variação de câmbio. Previsibilidade total no orçamento.',
  },
  {
    icon: Stack,
    titulo: 'Tudo em Um',
    descricao: 'CRM + Projetos + Comunicação + RH + Sites. Uma única plataforma.',
  },
  {
    icon: Robot,
    titulo: 'IA Incluída',
    descricao: 'CoPilot nativo, sem custo extra. Não é add-on ou upsell.',
  },
  {
    icon: Globe,
    titulo: '15M+ Empresas',
    descricao: 'Uma das plataformas mais usadas no mundo. Evolução constante.',
  },
]

export function ComparativoVantagens() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {VANTAGENS.map((item, index) => {
        const IconComponent = item.icon
        return (
          <Reveal key={item.titulo} delay={index * 0.1}>
            <div className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-shadow text-center">
              <div className="w-14 h-14 rounded-2xl bg-brand/10 flex items-center justify-center mx-auto mb-4">
                <IconComponent size={28} weight="duotone" className="text-brand" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{item.titulo}</h3>
              <p className="text-gray-600 text-sm">{item.descricao}</p>
            </div>
          </Reveal>
        )
      })}
    </div>
  )
}
