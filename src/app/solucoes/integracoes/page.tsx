import { Metadata } from 'next'
import { VerticalPageTemplate } from '@/components/templates'
import { CAPABILITIES_SOLUCOES } from '@/lib/constants'

const vertical = CAPABILITIES_SOLUCOES.integracoes

export const metadata: Metadata = {
  title: `${vertical.headline} | Zopu`,
  description: vertical.subheadline,
}

export default function IntegracoesPage() {
  return <VerticalPageTemplate vertical={vertical} />
}
