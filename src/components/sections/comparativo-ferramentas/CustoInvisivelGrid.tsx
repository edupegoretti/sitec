'use client'

import { motion } from 'framer-motion'
import { AlertTriangle, Headset, Megaphone } from 'lucide-react'
import { Reveal } from '@/components/shared'
import { cn } from '@/lib/utils'

const CASOS_REAIS = [
  {
    id: 'vendas-perde-contexto',
    icon: AlertTriangle,
    iconColor: 'text-red-600',
    iconBg: 'bg-red-100',
    titulo: 'Vendedor perde deal de R$ 50k',
    descricao:
      'Task crítico do projeto estava no Asana. Vendedor só via CRM. Cliente reclamou que "ninguém se comunicava internamente". Deal perdido.',
    solucao: 'Bitrix24: CRM + Projetos conectados',
    solucaoBg: 'bg-green-50',
    solucaoText: 'text-green-700',
  },
  {
    id: 'suporte-sem-contexto',
    icon: Headset,
    iconColor: 'text-orange-600',
    iconBg: 'bg-orange-100',
    titulo: 'Cliente reclama 3x da mesma coisa',
    descricao:
      'Reclamação veio por chat (Slack), depois email, depois WhatsApp. Três atendentes diferentes. Nenhum tinha histórico completo. Cliente cancelou.',
    solucao: 'Bitrix24: Histórico único por cliente',
    solucaoBg: 'bg-green-50',
    solucaoText: 'text-green-700',
  },
  {
    id: 'marketing-vendas-desalinhados',
    icon: Megaphone,
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-100',
    titulo: 'Marketing lança campanha que vendas não sabe',
    descricao:
      'Campanha no HubSpot, automação no ActiveCampaign, vendas no Pipedrive. Leads chegam mas time comercial não foi avisado. 40% dos leads não foram trabalhados.',
    solucao: 'Bitrix24: Marketing + Vendas na mesma plataforma',
    solucaoBg: 'bg-green-50',
    solucaoText: 'text-green-700',
  },
] as const

interface CustoInvisivelGridProps {
  className?: string
}

export function CustoInvisivelGrid({ className = '' }: CustoInvisivelGridProps) {
  return (
    <div className={cn('grid gap-6 md:grid-cols-2 lg:grid-cols-3', className)}>
      {CASOS_REAIS.map((caso, index) => {
        const Icon = caso.icon
        return (
          <Reveal key={caso.id} delay={index * 0.1}>
            <motion.div
              className="group relative h-full rounded-2xl border border-gray-200/80 hover:border-gray-300 bg-white p-6 shadow-card hover:shadow-card-hover transition-all duration-300 ease-out-expo"
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Ícone */}
              <div className="mb-4 flex items-start justify-between">
                <div className={cn('inline-flex rounded-xl p-3', caso.iconBg)}>
                  <Icon className={cn('h-6 w-6 group-hover:scale-110 transition-transform duration-300', caso.iconColor)} />
                </div>
              </div>

              {/* Título */}
              <h3 className="mb-3 text-lg font-bold text-gray-900 leading-tight">
                {caso.titulo}
              </h3>

              {/* Descrição do problema */}
              <p className="mb-4 text-sm text-gray-600 leading-relaxed">
                {caso.descricao}
              </p>

              {/* Solução com Bitrix24 */}
              <div className={cn('rounded-lg px-3 py-2 text-xs font-semibold', caso.solucaoBg, caso.solucaoText)}>
                ✓ {caso.solucao}
              </div>

              {/* Hover effect gradient */}
              <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-brand/0 to-brand/0 group-hover:from-brand/5 group-hover:to-purple-500/5 transition-all duration-300 pointer-events-none" />
            </motion.div>
          </Reveal>
        )
      })}
    </div>
  )
}
