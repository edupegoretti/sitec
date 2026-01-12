export function slugify(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 90)
}

export function buildYouTubeSlug(title: string, videoId: string): string {
  const base = slugify(title)
  return base ? `${base}-${videoId}` : videoId
}

export function getYouTubeIdFromSlug(slug: string): string | null {
  const parts = slug.split('-')
  const last = parts[parts.length - 1]
  return /^[a-zA-Z0-9_-]{11}$/.test(last) ? last : null
}
