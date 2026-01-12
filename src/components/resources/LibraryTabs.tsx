'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

type LibraryTab = {
  label: string
  href: string
}

const TABS: readonly LibraryTab[] = [
  { label: 'Zopucast', href: '/recursos/biblioteca/zopucast' },
  { label: 'Webinars Bitrix24', href: '/recursos/biblioteca/webinars-bitrix24' },
  { label: 'Metodologias', href: '/recursos/biblioteca/metodologias' },
]

export function LibraryTabs() {
  const pathname = usePathname()
  const activeHref = TABS.find((tab) => pathname.startsWith(tab.href))?.href ?? null

  return (
    <div className="mt-8">
      <div className="inline-flex max-w-full overflow-x-auto rounded-2xl border border-gray-200 bg-white p-1">
        {TABS.map((tab) => {
          const isActive = activeHref === tab.href
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                'whitespace-nowrap px-4 py-2.5 text-sm font-semibold rounded-xl transition-colors',
                isActive ? 'bg-brand text-white' : 'text-gray-700 hover:bg-gray-50'
              )}
            >
              {tab.label}
            </Link>
          )
        })}
      </div>
    </div>
  )
}

