'use client'

import {
  ChatSlash,
  Clock,
  EyeSlash,
  ChartBar,
  type IconProps,
} from '@phosphor-icons/react'
import { Reveal } from '@/components/shared'

type PhosphorIcon = React.ComponentType<IconProps>

const PROBLEMAS: {
  icon: PhosphorIcon
  titulo: string
  impacto: string
  descricao: string
}[] = [
  {
    icon: ChatSlash,
    titulo: 'Leads perdidos no WhatsApp',
    impacto: '~30% dos leads nunca recebem resposta',
    descricao:
      'Conversas espalhadas em celulares. Quando vendedor sai, histórico vai junto.',
  },
  {
    icon: Clock,
    titulo: 'Follow-up esquecido',
    impacto: '48% das vendas precisam de 5+ follow-ups',
    descricao:
      'Sem lembretes automáticos, seu vendedor depende da memória. E ele esquece.',
  },
  {
    icon: EyeSlash,
    titulo: 'Zero visibilidade do funil',
    impacto: 'Você descobre o mês ruim quando já acabou',
    descricao:
      'Sem saber quantos leads tem e onde estão, não dá pra prever receita.',
  },
  {
    icon: ChartBar,
    titulo: 'Decisões no achismo',
    impacto: 'Quem vende mais? Qual canal converte?',
    descricao:
      'Sem métricas por vendedor e por origem, você investe onde não deveria.',
  },
]

export function ProblemasGrid() {
  return (
    <div className="grid sm:grid-cols-2 gap-5">
      {PROBLEMAS.map((problema, index) => {
        const Icon = problema.icon
        return (
          <Reveal key={index} delay={0.1 + index * 0.05}>
            <div className="group flex flex-col p-6 rounded-2xl bg-white border border-gray-200 h-full hover:shadow-lg hover:border-red-200 transition-all duration-300">
              <div className="flex items-start gap-4 mb-3">
                <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center shrink-0 group-hover:bg-red-100 transition-colors">
                  <Icon size={22} weight="duotone" className="text-red-500" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">
                    {problema.titulo}
                  </h3>
                </div>
              </div>

              {/* Impacto quantificado */}
              <p className="text-red-600 font-medium text-sm mb-2 px-3 py-1.5 bg-red-50 rounded-lg inline-block w-fit">
                {problema.impacto}
              </p>

              <p className="text-gray-600 text-sm leading-relaxed mt-auto">
                {problema.descricao}
              </p>
            </div>
          </Reveal>
        )
      })}
    </div>
  )
}
