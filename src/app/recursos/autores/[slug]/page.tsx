import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'

import { Container } from '@/components/layout'
import { Badge, Reveal } from '@/components/shared'
import { PostCard, type PostCardData } from '@/components/blog/PostCard'
import { sanityFetch } from '@/sanity/lib/fetch'
import { authorBySlugQuery, postsByAuthorQuery } from '@/sanity/lib/queries'
import { urlForImage } from '@/sanity/lib/image'

export const revalidate = 1800

type PageProps = {
  params: Promise<{ slug: string }>
}

type Author = {
  _id: string
  name: string
  slug: string
  role?: string
  image?: any
  bio?: string
  links?: { website?: string; linkedin?: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const author = await sanityFetch<Author | null>({ query: authorBySlugQuery, params: { slug }, tags: ['author'] })
  if (!author) return {}

  const title = `${author.name} | Autor | Zopu`
  const description = author.bio ?? `Conteúdos publicados por ${author.name}.`

  return {
    title,
    description,
    alternates: { canonical: `/recursos/autores/${author.slug}` },
    openGraph: { title, description },
  }
}

export default async function AutorPage({ params }: PageProps) {
  const { slug } = await params

  const [author, posts] = await Promise.all([
    sanityFetch<Author | null>({ query: authorBySlugQuery, params: { slug }, tags: ['author'] }),
    sanityFetch<PostCardData[]>({ query: postsByAuthorQuery, params: { slug }, tags: ['post'] }),
  ])

  if (!author) notFound()

  const avatarUrl = author.image ? urlForImage(author.image).width(160).height(160).fit('crop').url() : null

  return (
    <main className="pt-20 lg:pt-24">
      <section className="py-16 sm:py-24 bg-linear-to-b from-gray-50 to-white border-b border-gray-100">
        <Container>
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <nav className="text-sm text-gray-500">
                <Link href="/recursos" className="hover:text-gray-700 transition-colors">
                  Recursos
                </Link>
                <span className="mx-2">/</span>
                <Link href="/recursos/blog" className="hover:text-gray-700 transition-colors">
                  Blog
                </Link>
              </nav>
            </Reveal>

            <div className="mt-8 flex flex-col sm:flex-row gap-6 sm:items-center">
              {avatarUrl ? (
                <div className="h-20 w-20 overflow-hidden rounded-2xl border border-gray-200 bg-white">
                  <Image src={avatarUrl} alt={author.name} width={160} height={160} className="h-full w-full object-cover" />
                </div>
              ) : (
                <div className="h-20 w-20 rounded-2xl border border-gray-200 bg-white flex items-center justify-center text-gray-400 font-bold">
                  {author.name.slice(0, 1).toUpperCase()}
                </div>
              )}

              <div>
                <Reveal>
                  <Badge>Autor</Badge>
                </Reveal>
                <Reveal delay={0.1}>
                  <h1 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">{author.name}</h1>
                </Reveal>
                {author.role ? (
                  <Reveal delay={0.12}>
                    <p className="mt-2 text-gray-600">{author.role}</p>
                  </Reveal>
                ) : null}
              </div>
            </div>

            {author.bio ? (
              <Reveal delay={0.16}>
                <p className="mt-6 text-lg text-gray-600 max-w-3xl">{author.bio}</p>
              </Reveal>
            ) : null}

            {author.links?.website || author.links?.linkedin ? (
              <Reveal delay={0.2}>
                <div className="mt-6 flex flex-wrap gap-3">
                  {author.links?.website ? (
                    <a
                      href={author.links.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Website
                    </a>
                  ) : null}
                  {author.links?.linkedin ? (
                    <a
                      href={author.links.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      LinkedIn
                    </a>
                  ) : null}
                </div>
              </Reveal>
            ) : null}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <Container>
          <div className="max-w-6xl mx-auto">
            {posts.length === 0 ? (
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8 text-center">
                <p className="text-lg font-bold text-gray-900">Nenhum post publicado</p>
                <p className="text-gray-600 mt-2">Este autor ainda não tem posts publicados.</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <Reveal key={post._id}>
                    <PostCard post={post} />
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </Container>
      </section>
    </main>
  )
}

