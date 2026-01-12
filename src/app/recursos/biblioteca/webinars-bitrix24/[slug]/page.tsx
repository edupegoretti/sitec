import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/layout'
import { Badge, Reveal } from '@/components/shared'
import { RESOURCES_CONFIG } from '@/lib/resources/config'
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
  const title = oembed?.title ?? 'Webinar Bitrix24'

  return {
    title: `${title} | Webinars Bitrix24 | Zopu`,
    description: 'Webinar Bitrix24 (YouTube).',
    alternates: {
      canonical: `/recursos/biblioteca/webinars-bitrix24/${slug}`,
    },
    openGraph: {
      title: `${title} | Webinars Bitrix24`,
      description: 'Webinar Bitrix24 (YouTube).',
    },
  }
}

export default async function WebinarDetailPage({ params }: PageProps) {
  const { slug } = await params
  const videoId = getYouTubeIdFromSlug(slug)
  if (!videoId) notFound()

  const oembed = await fetchYouTubeOEmbed(videoId, { revalidateSeconds: 60 * 60 })
  const title = oembed?.title ?? 'Webinar Bitrix24'

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
                <Link href="/recursos/biblioteca/webinars-bitrix24" className="hover:text-gray-700 transition-colors">
                  Webinars Bitrix24
                </Link>
              </div>

              <Badge className="mt-6 mb-4">Webinar</Badge>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">{title}</h1>
              <p className="text-gray-600 mt-3">
                Demonstração e contexto para levar Bitrix24 do básico para um sistema de operação.
              </p>
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
                href={`https://www.youtube.com/watch?v=${videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-brand text-white font-semibold rounded-xl hover:bg-brand-hover transition-colors"
              >
                Abrir no YouTube
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href={RESOURCES_CONFIG.webinars.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white text-gray-700 border border-gray-200 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
              >
                Ver todos os webinars
              </a>
              <Link
                href="/recursos/biblioteca/webinars-bitrix24"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white text-gray-700 border border-gray-200 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
              >
                Voltar
              </Link>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
