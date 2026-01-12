import { Metadata } from 'next'
import { VerticalPageTemplate } from '@/components/templates'
import { VERTICAIS_SOLUCOES } from '@/lib/constants'

const vertical = VERTICAIS_SOLUCOES.servicos

export const metadata: Metadata = {
  title: `${vertical.headline} | Zopu`,
  description: vertical.subheadline,
}

export default function ServicosPage() {
  return <VerticalPageTemplate vertical={vertical} />
}
