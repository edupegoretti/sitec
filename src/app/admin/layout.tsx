import type { Metadata } from 'next'

/**
 * Admin layout - minimal, no public header/footer
 *
 * Security features:
 * - robots noindex, nofollow (not indexed by search engines)
 * - No external analytics scripts
 * - Clean, minimal interface
 *
 * Note: This is a nested layout, so it cannot redefine <html> or <body>.
 * Those are defined in the root layout.
 */

export const metadata: Metadata = {
  title: {
    default: 'Admin | Zopu',
    template: '%s | Admin | Zopu',
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-gray-50">{children}</div>
}
