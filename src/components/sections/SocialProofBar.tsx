'use client'

import { Container } from '@/components/layout'
import Image from 'next/image'
import { ZOPU_STATS } from '@/lib/constants'

// Grandes Contas - Empresas com faturamento acima de R$ 100M/ano
const GRANDES_CONTAS = [
  { name: 'WEG', src: '/images/clients/weg.webp', setor: 'Indústria' },
  { name: 'SBT', src: '/images/clients/sbt.webp', setor: 'Mídia' },
  { name: 'Stone', src: '/images/clients/stone.webp', setor: 'Fintech' },
  { name: 'Unimed', src: '/images/clients/unimed.webp', setor: 'Saúde' },
]

// PMEs - Empresas em crescimento
const PMES = [
  { name: 'Komeco', src: '/images/clients/komeco.webp', setor: 'HVAC' },
  { name: 'TS Shara', src: '/images/clients/ts-shara.webp', setor: 'Nobreaks' },
  { name: 'Posthaus', src: '/images/clients/posthaus.webp', setor: 'Fashion' },
  { name: 'BoxTop', src: '/images/clients/boxtop.webp', setor: 'Logística' },
  { name: 'Grupo Litoral', src: '/images/clients/grupo-litoral.webp', setor: 'Varejo' },
  { name: 'Valorem', src: '/images/clients/valorem.webp', setor: 'Financeiro' },
  { name: 'Viseu', src: '/images/clients/viseu.webp', setor: 'Serviços' },
  { name: 'RK2', src: '/images/clients/rk2.webp', setor: 'Tech' },
]

const PROOF_STATS = [
  { value: ZOPU_STATS.clientes, label: 'clientes ativos', highlight: true },
  { value: '+20%', label: 'conversão (case real)' },
  { value: `${ZOPU_STATS.diasParaFuncionar} dias`, label: 'para entrar em operação' },
  { value: ZOPU_STATS.tempoResposta, label: 'SLA de resposta' },
]

export function SocialProofBar() {
  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <Container>
        {/* Stats Bar - Elegante e minimalista */}
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 sm:gap-x-16 lg:gap-x-20 mb-16">
          {PROOF_STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className={`text-3xl sm:text-4xl font-bold tracking-tight ${
                stat.highlight ? 'text-brand' : 'text-gray-900'
              }`}>
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-gray-500 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Grandes Contas */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">
              Grandes contas
            </span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
          <LogoGrid logos={GRANDES_CONTAS} columns="lg:grid-cols-4" />
        </div>

        {/* PMEs */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">
              PMEs em crescimento
            </span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
          <LogoGrid logos={PMES} columns="lg:grid-cols-4" />
        </div>
      </Container>
    </section>
  )
}

type Logo = { name: string; src: string; setor: string }

function LogoGrid({ logos, columns = 'lg:grid-cols-6' }: { logos: Logo[]; columns?: string }) {
  return (
    <div className={`grid grid-cols-2 sm:grid-cols-4 ${columns} gap-x-8 gap-y-8 sm:gap-x-12 sm:gap-y-10 items-center justify-items-center`}>
      {logos.map((logo) => (
        <div
          key={logo.name}
          className="group flex flex-col items-center justify-center w-full gap-2"
        >
          <div className="h-10 sm:h-12 flex items-center">
            <Image
              src={logo.src}
              alt={`${logo.name} - ${logo.setor}`}
              width={140}
              height={56}
              className="
                max-h-7 sm:max-h-9 w-auto max-w-24 sm:max-w-28
                object-contain
                opacity-70 group-hover:opacity-100
                transition-opacity duration-300 ease-out
              "
            />
          </div>
          <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
            {logo.setor}
          </span>
        </div>
      ))}
    </div>
  )
}
