import { Metadata } from 'next'
import {
  HeroTrabalheConosco,
  SobreZoper,
  FormularioVagas,
} from '@/components/sections/trabalhe-conosco'

export const metadata: Metadata = {
  title: 'Trabalhe Conosco | Carreiras na Zopu',
  description:
    'Quer fazer parte da Zopu? Buscamos pessoas que querem libertar empresas de ineficiências e destravar o crescimento dos negócios. Confira nossas vagas.',
  alternates: {
    canonical: '/trabalhe-conosco',
  },
  openGraph: {
    title: 'Trabalhe Conosco | Carreiras na Zopu',
    description:
      'Quer fazer parte da Zopu? Buscamos pessoas que querem libertar empresas de ineficiências e destravar o crescimento dos negócios.',
  },
}

export default function TrabalheConoscoPage() {
  return (
    <main>
      {/* 1. Hero - Chamada principal */}
      <HeroTrabalheConosco />

      {/* 2. O que é ser um Zoper */}
      <SobreZoper />

      {/* 3. Formulário de candidatura */}
      <FormularioVagas />
    </main>
  )
}
