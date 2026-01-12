import { Metadata } from 'next'
import {
  HeroSobre,
  HistoriaSobre,
  ValoresSobre,
} from '@/components/sections/sobre'
import { CTASection } from '@/components/sections'

export const metadata: Metadata = {
  title: 'Sobre a Zopu | Quem Somos | Parceiro Gold Bitrix24',
  description:
    'Conheça a Zopu: +400 clientes, +900 projetos, 15+ anos de experiência. Existimos para libertar pessoas de ineficiências e destravar o crescimento dos negócios.',
  alternates: {
    canonical: '/sobre',
  },
  openGraph: {
    title: 'Sobre a Zopu | Quem Somos',
    description:
      'Conheça a Zopu: +400 clientes, +900 projetos, 15+ anos de experiência. Existimos para libertar pessoas de ineficiências e destravar o crescimento dos negócios.',
  },
}

export default function SobrePage() {
  return (
    <main>
      {/* 1. Hero - Apresentação da empresa com stats */}
      <HeroSobre />

      {/* 2. História - Quem somos e nossa trajetória */}
      <HistoriaSobre />

      {/* 3. Valores - Os 8 valores que guiam a Zopu */}
      <ValoresSobre />

      {/* 4. CTA Final */}
      <CTASection
        title="Vamos trabalhar juntos?"
        description="Agende uma conversa com nosso time e descubra como a Zopu pode ajudar sua empresa a crescer."
        ctaText="Falar com especialista"
        showStats={true}
        showBadges={true}
      />
    </main>
  )
}
