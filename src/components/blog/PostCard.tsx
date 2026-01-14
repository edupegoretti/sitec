import Link from 'next/link'
import Image from 'next/image'

import { Badge } from '@/components/shared'
import { formatPtBrDate } from '@/lib/date'
import { FORMAT_LABEL, STAGE_LABEL, type PostFormat, type PostStage } from '@/sanity/lib/labels'
import { urlForImage } from '@/sanity/lib/image'

type PostCardTheme = {
  title: string
  slug: string
}

type PostCardAuthor = {
  name: string
  slug: string
  role?: string
  image?: unknown
}

export type PostCardData = {
  _id: string
  title: string
  slug: string
  excerpt?: string
  publishedAt: string
  stage: PostStage
  format: PostFormat
  coverImage?: any
  primaryTheme?: PostCardTheme
  authors?: PostCardAuthor[]
}

function stageVariant(stage: PostStage): 'default' | 'success' | 'warning' | 'info' | 'danger' {
  switch (stage) {
    case 'diagnostico':
      return 'info'
    case 'estruturacao':
      return 'warning'
    case 'implementacao':
      return 'default'
    case 'otimizacao':
      return 'success'
    case 'decisao':
      return 'danger'
  }
}

export function PostCard({ post }: { post: PostCardData }) {
  const coverUrl = post.coverImage ? urlForImage(post.coverImage).width(1200).height(675).fit('crop').url() : null
  const coverAlt = post.coverImage?.alt ?? post.title

  return (
    <Link
      href={`/recursos/blog/${post.slug}`}
      className="group block h-full overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gray-200/40"
    >
      <div className="relative aspect-[16/9] bg-linear-to-br from-gray-100 to-gray-200">
        {coverUrl ? (
          <Image
            src={coverUrl}
            alt={coverAlt}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
        ) : null}
        <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/10 to-transparent" />

        <div className="absolute bottom-3 left-3 flex flex-wrap items-center gap-2">
          <Badge variant={stageVariant(post.stage)} size="sm">
            {STAGE_LABEL[post.stage]}
          </Badge>
          <Badge variant="dark" size="sm">
            {FORMAT_LABEL[post.format]}
          </Badge>
        </div>
        <div className="absolute bottom-3 right-3 text-xs font-medium text-white/90">
          {formatPtBrDate(post.publishedAt)}
        </div>
      </div>

      <div className="p-5">
        {post.primaryTheme ? (
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand/80">{post.primaryTheme.title}</p>
        ) : null}
        <h3 className="mt-2 font-bold text-gray-900 leading-snug transition-colors group-hover:text-brand">
          {post.title}
        </h3>
        {post.excerpt ? <p className="mt-3 text-sm text-gray-600 leading-relaxed line-clamp-3">{post.excerpt}</p> : null}

        {post.authors?.length ? (
          <p className="mt-4 text-xs text-gray-500">
            {post.authors.map((author) => author.name).join(', ')}
          </p>
        ) : null}
      </div>
    </Link>
  )
}

