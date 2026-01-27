import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight } from 'lucide-react'

import { Container } from '@/components/layout'
import { Badge, Reveal } from '@/components/shared'
import { ArticleJsonLd, BreadcrumbJsonLd } from '@/components/seo'
import { PostBody } from '@/components/blog/PostBody'
import { PostCard } from '@/components/blog/PostCard'
import { toPostCardDataList, type SanityRawPost } from '@/sanity/lib/transforms'
import { formatPtBrDate } from '@/lib/date'
import { ZOPU_LINKS } from '@/lib/constants'
import { sanityFetch } from '@/sanity/lib/fetch'
import { postBySlugQuery, postSlugsQuery, relatedPostsQuery } from '@/sanity/lib/queries'
import { FORMAT_LABEL, STAGE_LABEL, type PostFormat, type PostStage } from '@/sanity/lib/labels'
import { urlForImage } from '@/sanity/lib/image'

export const revalidate = 1800

export async function generateStaticParams() {
  const posts = await sanityFetch<Array<{ slug: string }>>({
    query: postSlugsQuery,
    tags: ['post'],
  })
  return posts.map((post) => ({ slug: post.slug }))
}

type PageProps = {
  params: Promise<{ slug: string }>
}

type Post = {
  _id: string
  _updatedAt?: string
  title: string
  slug: string
  excerpt?: string
  publishedAt: string
  stage: PostStage
  format: PostFormat
  coverImage?: any
  body?: unknown
  nextStep?: { title?: string; description?: string; href: string; label?: string }
  seo?: { title?: string; description?: string; canonical?: string; noindex?: boolean }
  primaryThemeId?: string
  interestIds?: string[]
  primaryTheme?: { title: string; slug: string; description?: string }
  interests?: Array<{ title: string; slug: string }>
  authors?: Array<{ name: string; slug: string; role?: string; image?: any }>
  series?: Array<{ title: string; slug: string }>
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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await sanityFetch<Post | null>({ query: postBySlugQuery, params: { slug }, tags: ['post'] })
  if (!post) return {}

  const title = post.seo?.title ?? post.title
  const description = post.seo?.description ?? post.excerpt ?? undefined
  const canonical = post.seo?.canonical ?? `/blog/${post.slug}`
  const coverUrl = post.coverImage ? urlForImage(post.coverImage).width(1200).height(630).fit('crop').url() : null

  return {
    title,
    description,
    alternates: { canonical },
    robots: post.seo?.noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description,
      type: 'article',
      url: canonical,
      images: coverUrl ? [{ url: coverUrl, width: 1200, height: 630, alt: post.title }] : undefined,
    },
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await sanityFetch<Post | null>({ query: postBySlugQuery, params: { slug }, tags: ['post'] })
  if (!post) notFound()

  const rawRelated =
    post.primaryThemeId || (post.interestIds && post.interestIds.length)
      ? await sanityFetch<SanityRawPost[]>({
          query: relatedPostsQuery,
          params: {
            id: post._id,
            primaryThemeId: post.primaryThemeId ?? '',
            interestIds: post.interestIds ?? [],
          },
          tags: ['post'],
        })
      : []
  const related = toPostCardDataList(rawRelated)

  const coverUrl = post.coverImage ? urlForImage(post.coverImage).width(1600).height(900).fit('crop').url() : null
  const coverAlt = post.coverImage?.alt ?? post.title
  const authors = post.authors ?? []
  const authorNames = authors.map((a) => a.name)

  const absoluteUrl = `https://zopu.com.br/blog/${post.slug}`

  return (
    <main className="pt-20 lg:pt-24">
      <BreadcrumbJsonLd
        items={[
          { name: 'Zopu', url: 'https://zopu.com.br' },
          { name: 'Blog', url: 'https://zopu.com.br/blog' },
          { name: post.title, url: absoluteUrl },
        ]}
      />
      <ArticleJsonLd
        title={post.title}
        description={post.excerpt}
        url={absoluteUrl}
        image={coverUrl ?? undefined}
        datePublished={post.publishedAt}
        dateModified={post._updatedAt}
        authorName={authorNames.length ? authorNames : 'Zopu'}
        section={post.primaryTheme?.title}
      />

      <section className="bg-linear-to-b from-gray-50 to-white border-b border-gray-100">
        <Container>
          <div className="max-w-3xl mx-auto py-14 sm:py-16">
            <Reveal>
              <nav className="text-sm text-gray-500">
                <Link href="/" className="hover:text-gray-700 transition-colors">
                  Início
                </Link>
                <span className="mx-2">/</span>
                <Link href="/blog" className="hover:text-gray-700 transition-colors">
                  Blog
                </Link>
              </nav>
            </Reveal>

            <div className="mt-8 flex flex-wrap gap-2">
              <Badge variant={stageVariant(post.stage)} size="sm">
                {STAGE_LABEL[post.stage]}
              </Badge>
              <Badge variant="dark" size="sm" className="bg-gray-900 text-white">
                {FORMAT_LABEL[post.format]}
              </Badge>
              {post.primaryTheme ? (
                <Link
                  href={`/recursos/tema/${post.primaryTheme.slug}`}
                  className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  {post.primaryTheme.title}
                </Link>
              ) : null}
            </div>

            <Reveal delay={0.08}>
              <h1 className="mt-6 text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">{post.title}</h1>
            </Reveal>

            {post.excerpt ? (
              <Reveal delay={0.12}>
                <p className="mt-5 text-lg text-gray-600 leading-relaxed">{post.excerpt}</p>
              </Reveal>
            ) : null}

            <Reveal delay={0.16}>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500">
                <span>{formatPtBrDate(post.publishedAt)}</span>
                {authors.length ? (
                  <span>
                    Por{' '}
                    {authors.map((author, index) => (
                      <span key={author.slug}>
                        <Link
                          href={`/recursos/autores/${author.slug}`}
                          className="font-semibold text-gray-700 hover:text-brand transition-colors"
                        >
                          {author.name}
                        </Link>
                        {index < authors.length - 1 ? ', ' : null}
                      </span>
                    ))}
                  </span>
                ) : null}
              </div>
            </Reveal>

            {post.series?.length ? (
              <Reveal delay={0.18}>
                <div className="mt-6 flex flex-wrap items-center gap-2 text-sm text-gray-600">
                  <span className="font-semibold text-gray-700">Série:</span>
                  {post.series.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/recursos/series/${s.slug}`}
                      className="text-brand font-semibold hover:text-brand-hover transition-colors"
                    >
                      {s.title}
                    </Link>
                  ))}
                </div>
              </Reveal>
            ) : null}
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-14 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto">
            {coverUrl ? (
              <Reveal>
                <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
                  <div className="relative aspect-[16/9]">
                    <Image src={coverUrl} alt={coverAlt} fill className="object-cover" sizes="100vw" />
                  </div>
                </div>
              </Reveal>
            ) : null}

            {post.interests?.length ? (
              <div className="mt-8 flex flex-wrap gap-2">
                {post.interests.map((interest) => (
                  <Link
                    key={interest.slug}
                    href={`/recursos/interesse/${interest.slug}`}
                    className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm font-semibold text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-colors"
                  >
                    {interest.title}
                  </Link>
                ))}
              </div>
            ) : null}

            <article className="mt-10">
              <PostBody value={post.body} />
            </article>

            <div className="mt-12 rounded-3xl border border-gray-200 bg-linear-to-br from-white via-gray-50 to-white p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900">{post.nextStep?.title ?? 'Próximo passo'}</h2>
              <p className="mt-3 text-gray-600">
                {post.nextStep?.description ??
                  'Se você quer transformar Bitrix24 em operação (e não só em cadastro), precisamos de um modelo operacional claro.'}
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <a
                  href={post.nextStep?.href ?? ZOPU_LINKS.whatsappEspecialista}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand text-white font-semibold rounded-xl hover:bg-brand-hover transition-colors"
                >
                  {post.nextStep?.label ?? 'Falar com um especialista'}
                  <ArrowRight className="w-5 h-5" />
                </a>
                <Link
                  href="/blog"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-700 border border-gray-200 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Ver mais conteúdos
                </Link>
              </div>
            </div>

            {related.length ? (
              <div className="mt-14">
                <h2 className="text-xl font-bold text-gray-900">Relacionados</h2>
                <div className="mt-6 grid sm:grid-cols-2 gap-6">
                  {related.slice(0, 4).map((p) => (
                    <PostCard key={p._id} post={p} basePath="/blog" />
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </Container>
      </section>
    </main>
  )
}
