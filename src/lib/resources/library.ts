import { RESOURCES_CONFIG } from './config'
import { buildYouTubeSlug } from './slug'
import type { ResourcePersonaId } from './personas'
import { fetchYouTubeOEmbed, fetchYouTubePlaylistEntries, formatPtBrDate } from './youtube'

export type ResourceType = 'zopucast' | 'webinar' | 'metodologia'

export type ResourceItem = {
  id: string
  type: ResourceType
  title: string
  description?: string
  dateLabel?: string
  href: string
  externalUrl?: string
  thumbnail?: string
  personas?: ResourcePersonaId[]
  temas?: string[]
  durationLabel?: string
}

export async function getZopucastItems(): Promise<ResourceItem[]> {
  const entries = await fetchYouTubePlaylistEntries(RESOURCES_CONFIG.zopucast.youtubePlaylistId, {
    revalidateSeconds: 60 * 60,
  })

  return entries.map((entry) => {
    const slug = buildYouTubeSlug(entry.title, entry.videoId)
    return {
      id: entry.videoId,
      type: 'zopucast',
      title: entry.title,
      dateLabel: formatPtBrDate(entry.published),
      href: `/recursos/biblioteca/zopucast/${slug}`,
      externalUrl: entry.url,
      thumbnail: entry.thumbnail,
    }
  })
}

export async function getWebinarItems(): Promise<ResourceItem[]> {
  const items: ResourceItem[] = []

  for (const videoId of RESOURCES_CONFIG.webinars.seedVideos) {
    const oembed = await fetchYouTubeOEmbed(videoId, { revalidateSeconds: 60 * 60 })
    const title = oembed?.title ?? 'Webinar Bitrix24'
    const slug = buildYouTubeSlug(title, videoId)

    items.push({
      id: videoId,
      type: 'webinar',
      title,
      href: `/recursos/biblioteca/webinars-bitrix24/${slug}`,
      externalUrl: `https://www.youtube.com/watch?v=${videoId}`,
      thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
    })
  }

  return items
}

export async function getMetodologiaItems(): Promise<ResourceItem[]> {
  // Curadoria manual na etapa inicial.
  return []
}
