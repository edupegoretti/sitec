type YouTubePlaylistEntry = {
  videoId: string
  title: string
  published: string
  url: string
  thumbnail: string
}

function decodeHtmlEntities(value: string): string {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, code: string) => {
      const n = Number(code)
      return Number.isFinite(n) ? String.fromCharCode(n) : _
    })
    .replace(/&#x([0-9a-fA-F]+);/g, (_, code: string) => {
      const n = parseInt(code, 16)
      return Number.isFinite(n) ? String.fromCharCode(n) : _
    })
}

function matchTag(entryXml: string, tagName: string): string | null {
  const match = entryXml.match(new RegExp(`<${tagName}>([\\s\\S]*?)<\\/${tagName}>`))
  return match?.[1] ? decodeHtmlEntities(match[1].trim()) : null
}

function matchYouTubeVideoId(entryXml: string): string | null {
  const explicit = matchTag(entryXml, 'yt:videoId')
  if (explicit) return explicit
  const fromId = matchTag(entryXml, 'id') // "yt:video:VIDEOID"
  if (!fromId) return null
  const parts = fromId.split(':')
  const maybeId = parts[parts.length - 1]
  return /^[a-zA-Z0-9_-]{11}$/.test(maybeId) ? maybeId : null
}

function matchAlternateUrl(entryXml: string): string | null {
  const match = entryXml.match(/<link[^>]+rel="alternate"[^>]+href="([^"]+)"[^>]*\/?>/)
  return match?.[1] ? decodeHtmlEntities(match[1].trim()) : null
}

function parseYouTubePlaylistFeed(xml: string): YouTubePlaylistEntry[] {
  const entries: YouTubePlaylistEntry[] = []
  const entryMatches = xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)
  for (const match of entryMatches) {
    const entryXml = match[1]
    if (!entryXml) continue

    const videoId = matchYouTubeVideoId(entryXml)
    const title = matchTag(entryXml, 'title')
    const published = matchTag(entryXml, 'published')
    const url = matchAlternateUrl(entryXml) ?? (videoId ? `https://www.youtube.com/watch?v=${videoId}` : null)

    if (!videoId || !title || !published || !url) continue

    entries.push({
      videoId,
      title,
      published,
      url,
      thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
    })
  }
  return entries
}

export async function fetchYouTubePlaylistEntries(
  playlistId: string,
  { revalidateSeconds = 60 * 60 }: { revalidateSeconds?: number } = {}
): Promise<YouTubePlaylistEntry[]> {
  const url = `https://www.youtube.com/feeds/videos.xml?playlist_id=${playlistId}`

  try {
    const res = await fetch(url, {
      next: { revalidate: revalidateSeconds },
    })

    if (!res.ok) return []

    const xml = await res.text()
    return parseYouTubePlaylistFeed(xml)
  } catch {
    return []
  }
}

export type YouTubeOEmbed = {
  title: string
  author_name: string
  author_url: string
  thumbnail_url: string
  thumbnail_width?: number
  thumbnail_height?: number
  html: string
  provider_name: string
  provider_url: string
  type: string
  version: string
}

export async function fetchYouTubeOEmbed(
  videoId: string,
  { revalidateSeconds = 60 * 60 }: { revalidateSeconds?: number } = {}
): Promise<YouTubeOEmbed | null> {
  const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
  try {
    const res = await fetch(url, { next: { revalidate: revalidateSeconds } })
    if (!res.ok) return null
    return (await res.json()) as YouTubeOEmbed
  } catch {
    return null
  }
}

export function formatPtBrDate(iso: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return iso
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
}

export type { YouTubePlaylistEntry }
