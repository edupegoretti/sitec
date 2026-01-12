import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/layout'
import { Reveal } from '@/components/shared'

export const metadata: Metadata = {
  title: 'Biblioteca | Materiais ricos | Zopu',
  description:
    'Biblioteca de conteúdos abertos da Zopu: Zopucast, Webinars Bitrix24 e metodologias. Tudo organizado para facilitar a navegação.',
  alternates: {
    canonical: '/recursos/biblioteca',
  },
}

export default function BibliotecaHomePage() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <Container>
        <Reveal>
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              <Link
                href="/recursos/biblioteca/zopucast"
                className="group block rounded-2xl border border-gray-200 bg-white p-6 hover:shadow-lg hover:shadow-gray-200/40 transition-all duration-300"
              >
                <h2 className="font-bold text-gray-900 group-hover:text-brand transition-colors">Zopucast</h2>
                <p className="text-gray-600 mt-2 text-sm">
                  Episódios sequenciais para sair do improviso e operar com processo.
                </p>
                <p className="mt-4 text-sm text-brand font-semibold inline-flex items-center gap-2">
                  Abrir
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </p>
              </Link>

              <Link
                href="/recursos/biblioteca/webinars-bitrix24"
                className="group block rounded-2xl border border-gray-200 bg-white p-6 hover:shadow-lg hover:shadow-gray-200/40 transition-all duration-300"
              >
                <h2 className="font-bold text-gray-900 group-hover:text-brand transition-colors">Webinars Bitrix24</h2>
                <p className="text-gray-600 mt-2 text-sm">
                  Sessões abertas: demonstração, perguntas e exemplos práticos.
                </p>
                <p className="mt-4 text-sm text-brand font-semibold inline-flex items-center gap-2">
                  Abrir
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </p>
              </Link>

              <Link
                href="/recursos/biblioteca/metodologias"
                className="group block rounded-2xl border border-gray-200 bg-white p-6 hover:shadow-lg hover:shadow-gray-200/40 transition-all duration-300"
              >
                <h2 className="font-bold text-gray-900 group-hover:text-brand transition-colors">Metodologias</h2>
                <p className="text-gray-600 mt-2 text-sm">Frameworks e playbooks em vídeo: decisões de implementação.</p>
                <p className="mt-4 text-sm text-brand font-semibold inline-flex items-center gap-2">
                  Abrir
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </p>
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
