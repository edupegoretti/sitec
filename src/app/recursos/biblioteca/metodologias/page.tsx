import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/layout'
import { Badge, Reveal } from '@/components/shared'
import { ResourceGrid } from '@/components/resources/ResourceGrid'
import { getMetodologiaItems } from '@/lib/resources/library'

export const metadata: Metadata = {
  title: 'Metodologias | Biblioteca | Zopu',
  description: 'Vídeos e materiais sobre metodologias, frameworks e playbooks para implementação e adoção.',
  alternates: {
    canonical: '/recursos/biblioteca/metodologias',
  },
}

export default async function MetodologiasLibraryPage() {
  const items = await getMetodologiaItems()

  return (
    <section className="py-16 sm:py-20 bg-white">
      <Container>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="mb-10">
              <Badge className="mb-4">Metodologias</Badge>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Frameworks e playbooks</h2>
              <p className="text-gray-600 mt-3">
                Aqui vão entrar vídeos curados do canal da Zopu com decisões de implementação, rituais e padrões de
                operação.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/mapadeperformance"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white text-gray-700 border border-gray-200 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Conhecer o Mapa de Performance de Receita
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/recursos/biblioteca/zopucast"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-brand text-white font-semibold rounded-xl hover:bg-brand-hover transition-colors"
                >
                  Ir para o Zopucast
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </Reveal>

          <ResourceGrid
            items={items}
            searchPlaceholder="Buscar metodologia…"
            emptyTitle="Curadoria em construção"
            emptyDescription="Enquanto isso, explore o Zopucast e os Webinars Bitrix24."
          />
        </div>
      </Container>
    </section>
  )
}
