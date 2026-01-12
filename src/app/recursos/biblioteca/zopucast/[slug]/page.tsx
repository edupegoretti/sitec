import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/layout'
import { Badge, Reveal } from '@/components/shared'
import { RESOURCES_CONFIG } from '@/lib/resources/config'
import { getZopucastItems } from '@/lib/resources/library'
import { getYouTubeIdFromSlug } from '@/lib/resources/slug'
import { fetchYouTubeOEmbed } from '@/lib/resources/youtube'

type PageProps = {
  params: Promise<{ slug: string }>
}

export const revalidate = 3600

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const videoId = getYouTubeIdFromSlug(slug)
  if (!videoId) return {}

  const oembed = await fetchYouTubeOEmbed(videoId, { revalidateSeconds: 60 * 60 })
  const title = oembed?.title ?? 'Episódio Zopucast'

  return {
    title: `${title} | Zopucast | Zopu`,
    description: 'Episódio do Zopucast (YouTube + Spotify).',
    alternates: {
      canonical: `/recursos/biblioteca/zopucast/${slug}`,
    },
    openGraph: {
      title: `${title} | Zopucast`,
      description: 'Episódio do Zopucast (YouTube + Spotify).',
    },
  }
}

export default async function ZopucastEpisodePage({ params }: PageProps) {
  const { slug } = await params
  const videoId = getYouTubeIdFromSlug(slug)
  if (!videoId) notFound()

  const [oembed, items] = await Promise.all([
    fetchYouTubeOEmbed(videoId, { revalidateSeconds: 60 * 60 }),
    getZopucastItems(),
  ])

  const item = items.find((x) => x.id === videoId) ?? null
  const title = oembed?.title ?? item?.title ?? 'Episódio Zopucast'

  return (
    <section className="py-16 sm:py-20 bg-white">
      <Container>
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="mb-10">
              <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
                <Link href="/recursos" className="hover:text-gray-700 transition-colors">
                  Recursos
                </Link>
                <span>/</span>
                <Link href="/recursos/biblioteca/zopucast" className="hover:text-gray-700 transition-colors">
                  Zopucast
                </Link>
              </div>

              <Badge className="mt-6 mb-4">Zopucast</Badge>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">{title}</h1>
              {item?.dateLabel && <p className="text-gray-600 mt-3">Publicado em {item.dateLabel}</p>}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-gray-200 overflow-hidden bg-black">
              <div className="aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}?rel=0`}
                  title={title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
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
                href={`https://www.youtube.com/watch?v=${videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-brand text-white font-semibold rounded-xl hover:bg-brand-hover transition-colors"
              >
                Abrir no YouTube
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="/recursos/biblioteca/zopucast"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white text-gray-700 border border-gray-200 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
              >
                Ver lista
              </Link>
            </div>
          </Reveal>

          <div className="mt-12">
            <Reveal>
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 sm:p-8">
                <h2 className="text-xl font-bold text-gray-900">Próximo passo</h2>
                <p className="text-gray-600 mt-2">
                  Se este episódio te ajudou, navegue pela lista completa e escolha o próximo pelo tema (ou pela dor).
                </p>
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/recursos/biblioteca/zopucast"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white text-gray-700 border border-gray-200 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    Ver todos os episódios
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/recursos"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white text-gray-700 border border-gray-200 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    Voltar para Recursos
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}
