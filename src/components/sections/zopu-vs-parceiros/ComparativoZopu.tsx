'use client'

import { Check } from 'lucide-react'
import {
  Target,
  ChartBar,
  GraduationCap,
  Headphones,
  Lightning,
  Heart,
  TrendUp,
  Trophy,
  Minus,
  type IconProps,
} from '@phosphor-icons/react'
import { Reveal } from '@/components/shared'
import { ZOPU_STATS } from '@/lib/constants'

type PhosphorIcon = React.ComponentType<IconProps>

const DIFERENCIAIS_ZOPU: {
  categoria: string
  zopu: string
  zopuDetalhe: string
  mercado: string
  mercadoDetalhe: string
  icon: PhosphorIcon
}[] = [
  {
    categoria: 'Foco',
    zopu: 'Retenção de clientes',
    zopuDetalhe: '96% ficam conosco',
    mercado: 'Volume de projetos',
    mercadoDetalhe: 'Foco em entregas, não em resultados',
    icon: Target,
  },
  {
    categoria: 'Metodologia',
    zopu: 'Processo de 30 a 90 dias',
    zopuDetalhe: 'Entregas claras em cada fase',
    mercado: 'Variável',
    mercadoDetalhe: 'Sem padrão definido',
    icon: ChartBar,
  },
  {
    categoria: 'Treinamento',
    zopu: 'Fluidz Academy contínuo',
    zopuDetalhe: '9.500+ profissionais certificados',
    mercado: 'Treinamento único',
    mercadoDetalhe: 'Na entrega do projeto',
    icon: GraduationCap,
  },
  {
    categoria: 'Suporte',
    zopu: '365 dias de suporte',
    zopuDetalhe: 'Contratando licença com Zopu',
    mercado: 'Suporte reativo',
    mercadoDetalhe: 'Horário comercial',
    icon: Headphones,
  },
  {
    categoria: 'IA e Automação',
    zopu: 'CoPilot configurado',
    zopuDetalhe: 'Pronto para usar quando a operação rodar',
    mercado: 'Configuração posterior',
    mercadoDetalhe: 'Sem previsão ou escopo definido',
    icon: Lightning,
  },
  {
    categoria: 'Pós-implementação',
    zopu: 'Acompanhamento estratégico',
    zopuDetalhe: 'Até o uso entrar em ritmo',
    mercado: 'Projeto encerrado',
    mercadoDetalhe: 'Sem acompanhamento estruturado',
    icon: Heart,
  },
  {
    categoria: 'Resultado',
    zopu: 'Operação funcionando',
    zopuDetalhe: `Em ${ZOPU_STATS.diasParaFuncionar} dias`,
    mercado: 'Sistema configurado',
    mercadoDetalhe: 'Prazo indefinido',
    icon: TrendUp,
  },
]

export function ComparativoZopu() {
  return (
    <Reveal>
      <div className="max-w-5xl mx-auto">
        {/* Header da tabela */}
        <div className="grid grid-cols-12 gap-4 mb-4">
          <div className="col-span-4" />
          <div className="col-span-4 text-center">
            <div className="bg-brand text-white rounded-t-2xl py-4 px-6">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Trophy size={20} weight="duotone" />
                <span className="font-bold text-lg">Zopu</span>
              </div>
              <p className="text-xs text-white/80">Gold Partner Bitrix24</p>
            </div>
          </div>
          <div className="col-span-4 text-center">
            <div className="bg-gray-100 text-gray-600 rounded-t-2xl py-4 px-6">
              <span className="font-semibold">Mercado em geral</span>
              <p className="text-xs text-gray-500 mt-1">Média dos parceiros</p>
            </div>
          </div>
        </div>

        {/* Linhas da tabela */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-lg">
          {DIFERENCIAIS_ZOPU.map((row, index) => {
            const IconComponent = row.icon
            return (
              <div
                key={row.categoria}
                className={`grid grid-cols-12 gap-4 items-center ${
                  index !== DIFERENCIAIS_ZOPU.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                {/* Categoria */}
                <div className="col-span-4 p-5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                    <IconComponent size={20} weight="duotone" className="text-gray-600" />
                  </div>
                  <span className="font-semibold text-gray-900">{row.categoria}</span>
                </div>

                {/* Zopu */}
                <div className="col-span-4 p-5 bg-brand/5 border-x border-brand/10">
                  <div className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{row.zopu}</p>
                      <p className="text-xs text-brand mt-0.5">{row.zopuDetalhe}</p>
                    </div>
                  </div>
                </div>

                {/* Mercado */}
                <div className="col-span-4 p-5">
                  <div className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center shrink-0 mt-0.5">
                      <Minus size={12} weight="bold" className="text-gray-400" />
                    </div>
                    <div>
                      <p className="text-gray-600">{row.mercado}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{row.mercadoDetalhe}</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Footer da tabela */}
        <div className="grid grid-cols-12 gap-4 mt-4">
          <div className="col-span-4" />
          <div className="col-span-4">
            <div className="bg-brand text-white rounded-b-2xl py-4 px-6 text-center">
              <p className="text-sm font-medium">Compromisso com sucesso mensurável</p>
              <p className="text-xs text-white/70 mt-1">métricas e critérios acordados no diagnóstico</p>
            </div>
          </div>
          <div className="col-span-4" />
        </div>
      </div>
    </Reveal>
  )
}
