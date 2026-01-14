import Image from 'next/image'
import Link from 'next/link'
import type { PortableTextComponents } from '@portabletext/react'
import { PortableText } from 'next-sanity'

import { urlForImage } from '@/sanity/lib/image'

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value) return null
      const url = urlForImage(value).width(1400).fit('max').auto('format').url()
      const alt = value.alt ?? ''
      const caption = value.caption ?? null

      return (
        <figure className="my-8">
          <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">
            <Image src={url} alt={alt} width={1400} height={800} className="h-auto w-full" />
          </div>
          {caption ? <figcaption className="mt-2 text-sm text-gray-500">{caption}</figcaption> : null}
        </figure>
      )
    },
  },
  marks: {
    link: ({ children, value }) => {
      const href = value?.href as string | undefined
      const blank = value?.blank as boolean | undefined
      if (!href) return <>{children}</>

      if (blank) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-brand underline decoration-brand/30 underline-offset-4 hover:decoration-brand/70"
          >
            {children}
          </a>
        )
      }

      return (
        <Link
          href={href}
          className="font-semibold text-brand underline decoration-brand/30 underline-offset-4 hover:decoration-brand/70"
        >
          {children}
        </Link>
      )
    },
    code: ({ children }) => (
      <code className="rounded-md bg-gray-100 px-1.5 py-0.5 font-mono text-[0.9em] text-gray-800">{children}</code>
    ),
  },
  block: {
    h2: ({ children }) => <h2 className="mt-10 scroll-mt-28 text-2xl font-bold text-gray-900">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-8 scroll-mt-28 text-xl font-bold text-gray-900">{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="my-8 rounded-2xl border border-gray-200 bg-gray-50 p-6 text-gray-700">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => <p className="mt-4 leading-relaxed text-gray-700">{children}</p>,
  },
  list: {
    bullet: ({ children }) => <ul className="mt-4 list-disc space-y-2 pl-6 text-gray-700">{children}</ul>,
    number: ({ children }) => <ol className="mt-4 list-decimal space-y-2 pl-6 text-gray-700">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
}

export function PostBody({ value }: { value: any }) {
  if (!value) return null
  return <PortableText value={value} components={components} />
}
