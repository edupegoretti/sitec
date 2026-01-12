import type { Metadata } from 'next'
import { Container } from '@/components/layout'
import { Badge, Reveal } from '@/components/shared'
import { ResourceGrid } from '@/components/resources/ResourceGrid'
import { RESOURCES_CONFIG } from '@/lib/resources/config'
import { getWebinarItems } from '@/lib/resources/library'

export const metadata: Metadata = {
  title: 'Webinars Bitrix24 | Biblioteca | Zopu',
  description: 'Webinars abertos sobre Bitrix24: demonstrações e exemplos práticos.',
  alternates: {
    canonical: '/recursos/biblioteca/webinars-bitrix24',
  },
}

export const revalidate = 3600

export default async function WebinarsLibraryPage() {
  const items = await getWebinarItems()

  return (
    <section className="py-16 sm:py-20 bg-white">
      <Container>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
              <div className="max-w-3xl">
                <Badge className="mb-4">Webinars</Badge>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Webinars Bitrix24</h2>
                <p className="text-gray-600 mt-3">
                  Aulas e sessões abertas para ver Bitrix24 em ação — com contexto de processo e adoção.
                </p>
              </div>
              <div>
                <a
                  href={RESOURCES_CONFIG.webinars.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white text-gray-700 border border-gray-200 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Abrir no YouTube
                </a>
              </div>
            </div>
          </Reveal>

          <ResourceGrid
            items={items}
            searchPlaceholder="Buscar webinar…"
            emptyTitle="Nenhum webinar encontrado"
            emptyDescription="Estamos organizando essa biblioteca por curadoria."
          />
        </div>
      </Container>
    </section>
  )
}
