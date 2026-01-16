import { Metadata } from 'next'
import { ContatoPage } from '@/components/contato/ContatoPage'

export const metadata: Metadata = {
  title: 'Contato | Fale com a Zopu — Gold Partner Bitrix24',
  description:
    'Entre em contato com a Zopu. Tire suas dúvidas sobre Bitrix24, agende uma conversa com nossos especialistas ou solicite um diagnóstico gratuito.',
  alternates: {
    canonical: '/contato',
  },
  openGraph: {
    title: 'Contato | Fale com a Zopu — Gold Partner Bitrix24',
    description:
      'Entre em contato com a Zopu. Tire suas dúvidas sobre Bitrix24, agende uma conversa com nossos especialistas.',
    url: 'https://zopu.com.br/contato',
  },
}

export default function ContactPage() {
  return <ContatoPage />
}
