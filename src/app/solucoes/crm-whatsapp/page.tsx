import { Metadata } from 'next'
import { VerticalPageTemplate } from '@/components/templates'
import { CAPABILITIES_SOLUCOES } from '@/lib/constants'

const vertical = CAPABILITIES_SOLUCOES['crm-whatsapp']

export const metadata: Metadata = {
  title: 'Bitrix24 + WhatsApp — Integração Oficial CRM com WhatsApp Business',
  description:
    'Integre WhatsApp Business ao Bitrix24: atendimento centralizado, histórico completo no CRM, automações de mensagens. Implementação oficial por parceiro Gold Bitrix24.',
  keywords: [
    'Bitrix24 WhatsApp',
    'CRM WhatsApp',
    'WhatsApp Business CRM',
    'integração WhatsApp CRM',
    'Bitrix24 integração WhatsApp',
    'CRM com WhatsApp',
    'atendimento WhatsApp CRM',
  ],
  alternates: {
    canonical: '/solucoes/crm-whatsapp',
  },
  openGraph: {
    title: 'Bitrix24 + WhatsApp — Integração Oficial',
    description:
      'Centralize atendimento do WhatsApp no CRM. Histórico, automações e relatórios em um só lugar.',
    type: 'website',
  },
}

export default function CRMWhatsAppPage() {
  return <VerticalPageTemplate vertical={vertical} />
}
