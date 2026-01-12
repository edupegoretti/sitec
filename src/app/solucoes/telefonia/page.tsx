import { Metadata } from 'next'
import { VerticalPageTemplate } from '@/components/templates'
import { CAPABILITIES_SOLUCOES } from '@/lib/constants'

const vertical = CAPABILITIES_SOLUCOES.telefonia

export const metadata: Metadata = {
  title: `${vertical.headline} | Zopu`,
  description: vertical.subheadline,
}

export default function TelefoniaPage() {
  return <VerticalPageTemplate vertical={vertical} />
}
