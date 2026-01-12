'use client'

import {
  Target,
  UsersThree,
  ChartBar,
  ChatCircle,
  Lightning,
  CurrencyDollar,
  type IconProps,
} from '@phosphor-icons/react'
import { Container } from '@/components/layout'
import { Badge, Reveal } from '@/components/shared'
import { PME_OPORTUNIDADES } from '@/lib/constants'

// Mapeamento de ícones para oportunidades
type PhosphorIcon = React.ComponentType<IconProps>
const ICON_MAP: Record<string, PhosphorIcon> = {
  Target,
  Users: UsersThree,
  BarChart3: ChartBar,
  MessageSquare: ChatCircle,
  Zap: Lightning,
  DollarSign: CurrencyDollar,
}

export function PMEOportunidades() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="text-center mb-12">
          <Reveal>
            <Badge className="mb-4">O que você ganha</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Tudo que sua operação precisa
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Implementação focada em resultado, não em funcionalidades.
            </p>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PME_OPORTUNIDADES.map((item, index) => {
            const IconComponent = ICON_MAP[item.icon] || Target
            return (
              <Reveal key={item.titulo} delay={index * 0.05}>
                <div className="bg-white rounded-xl p-6 h-full border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center mb-4">
                    <IconComponent size={24} weight="duotone" className="text-brand" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.titulo}</h3>
                  <p className="text-gray-600">{item.descricao}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
