'use client'

import {
  Target,
  UsersThree,
  ChartBar,
  Clock,
  type IconProps,
} from '@phosphor-icons/react'
import { Reveal } from '@/components/shared'
import { ZOPU_STATS } from '@/lib/constants'

type PhosphorIcon = React.ComponentType<IconProps>

const PILARES_ZOPU: {
  icon: PhosphorIcon
  titulo: string
  descricao: string
  stat: string
  statLabel: string
}[] = [
  {
    icon: Target,
    titulo: 'Foco em Resultado',
    descricao: 'Não medimos projetos entregues. Medimos clientes que ficam. 96% de retenção anual prova que funciona.',
    stat: '96%',
    statLabel: 'retenção anual',
  },
  {
    icon: UsersThree,
    titulo: 'Equipe Certificada',
    descricao: '9.500+ profissionais formados via Fluidz Academy garantem adoção real da ferramenta.',
    stat: '9.500+',
    statLabel: 'certificados',
  },
  {
    icon: ChartBar,
    titulo: 'Metodologia Comprovada',
    descricao: 'Processo estruturado de 30 a 90 dias, com entregas claras. Testado em 450+ clientes.',
    stat: '450+',
    statLabel: 'clientes',
  },
  {
    icon: Clock,
    titulo: '365 Dias de Suporte',
    descricao: `SLA de primeira resposta ${ZOPU_STATS.tempoResposta}. Suporte completo por 1 ano contratando a licença Bitrix24 com a Zopu.`,
    stat: '365',
    statLabel: 'dias',
  },
]

export function PilaresZopu() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {PILARES_ZOPU.map((item, index) => {
        const IconComponent = item.icon
        return (
          <Reveal key={item.titulo} delay={index * 0.1}>
            <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 rounded-2xl bg-brand/10 flex items-center justify-center">
                  <IconComponent size={28} weight="duotone" className="text-brand" />
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-brand">{item.stat}</p>
                  <p className="text-xs text-gray-500">{item.statLabel}</p>
                </div>
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-lg">{item.titulo}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.descricao}</p>
            </div>
          </Reveal>
        )
      })}
    </div>
  )
}
