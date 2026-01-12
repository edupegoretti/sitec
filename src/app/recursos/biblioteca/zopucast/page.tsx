import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/layout'
import { Badge, Reveal } from '@/components/shared'
import { ResourceGrid } from '@/components/resources/ResourceGrid'
import { RESOURCES_CONFIG } from '@/lib/resources/config'
import { getZopucastItems } from '@/lib/resources/library'

export const metadata: Metadata = {
  title: 'Zopucast | Biblioteca | Zopu',
  description: 'Episódios do Zopucast (YouTube + Spotify) sobre CRM, operação, adoção e governança.',
  alternates: {
    canonical: '/recursos/biblioteca/zopucast',
  },
}

export const revalidate = 3600

export default async function ZopucastLibraryPage() {
  const items = await getZopucastItems()

  return (
    <section className="py-16 sm:py-20 bg-white">
      <Container>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
              <div className="max-w-3xl">
                <Badge className="mb-4">Zopucast</Badge>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Episódios</h2>
                <p className="text-gray-600 mt-3">
                  Série sequencial em vídeo para quem quer parar de “configurar por feeling” e operar com processo.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={RESOURCES_CONFIG.zopucast.spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white text-gray-700 border border-gray-200 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Ouvir no Spotify
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href={RESOURCES_CONFIG.zopucast.youtubePlaylistUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-brand text-white font-semibold rounded-xl hover:bg-brand-hover transition-colors"
                >
                  Ver no YouTube
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </Reveal>

          <ResourceGrid
            items={items}
            searchPlaceholder="Buscar episódio do Zopucast…"
            emptyTitle="Nenhum episódio encontrado"
            emptyDescription="Tente outro termo de busca."
          />

          <div className="mt-10">
            <Reveal>
              <Link
                href="/recursos"
                className="inline-flex items-center gap-2 text-brand font-semibold hover:text-brand-hover transition-colors"
              >
                Voltar para Recursos
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}
