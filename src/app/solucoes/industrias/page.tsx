import { Metadata } from 'next'
import { VerticalPageTemplate } from '@/components/templates'
import { VERTICAIS_SOLUCOES } from '@/lib/constants'

const vertical = VERTICAIS_SOLUCOES.industrias

export const metadata: Metadata = {
  title: `${vertical.headline} | Zopu`,
  description: vertical.subheadline,
}

export default function IndustriasPage() {
  return <VerticalPageTemplate vertical={vertical} />
}
