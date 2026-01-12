import { Metadata } from 'next'
import { PMETimeline30Dias } from '@/components/sections/pme'
import { PMEHero } from '@/components/sections/pme/PMEHero'
import { PMETrustBar } from '@/components/sections/pme/PMETrustBar'
import { PMEOportunidades } from '@/components/sections/pme/PMEOportunidades'
import { PMESeguranca } from '@/components/sections/pme/PMESeguranca'
import { PMECTAFinal } from '@/components/sections/pme/PMECTAFinal'

export const metadata: Metadata = {
  title: 'Bitrix24 para PMEs | CRM que Funciona | Zopu',
  description:
    'CRM implementado como estratégia de receita para pequenas e médias empresas. A partir de 5 usuários. Operação funcionando em 30 dias. 96% de retenção anual.',
  alternates: {
    canonical: '/bitrix24-para-pmes',
  },
  openGraph: {
    title: 'Bitrix24 para PMEs | CRM que Funciona',
    description:
      'CRM para pequenas e médias empresas. Operação funcionando em 30 dias. 96% de retenção anual.',
  },
}

export default function Bitrix24ParaPMEsPage() {
  return (
    <main className="pt-20 lg:pt-24">
      {/* 1. Hero */}
      <PMEHero />

      {/* 2. Trust Bar */}
      <PMETrustBar />

      {/* 3. Oportunidades */}
      <PMEOportunidades />

      {/* 4. Timeline 30 Dias (Metodologia Fluidsales™ UI) */}
      <PMETimeline30Dias />

      {/* 5. Segurança - Você está em boas mãos */}
      <PMESeguranca />

      {/* 6. CTA Final */}
      <PMECTAFinal />
    </main>
  )
}
