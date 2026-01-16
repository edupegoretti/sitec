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
  const entries = await fetchYouTubePlaylistEntries(RESOURCES_CONFIG.webinars.youtubePlaylistId, {
    revalidateSeconds: 60 * 60,
  })

  // YouTube RSS feed já retorna em ordem de mais recente primeiro
  return entries.map((entry) => {
    const slug = buildYouTubeSlug(entry.title, entry.videoId)
    return {
      id: entry.videoId,
      type: 'webinar',
      title: entry.title,
      dateLabel: formatPtBrDate(entry.published),
      href: `/recursos/biblioteca/webinars-bitrix24/${slug}`,
      externalUrl: entry.url,
      thumbnail: entry.thumbnail,
    }
  })
}

export async function getMetodologiaItems(): Promise<ResourceItem[]> {
  // Curadoria manual na etapa inicial.
  return []
}
