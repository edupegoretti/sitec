import { cn } from '@/lib/utils'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface HeroSecondaryProps {
  title: string
  description?: string
  breadcrumbs?: BreadcrumbItem[]
  className?: string
}

export function HeroSecondary({
  title,
  description,
  breadcrumbs,
  className,
}: HeroSecondaryProps) {
  return (
    <section
      className={cn('relative bg-bg-dark overflow-hidden', className)}
    >
      {/* Pattern decorativo */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,91,255,0.4),transparent_50%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        {/* Breadcrumb */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm">
              <li>
                <a
                  href="/"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Home
                </a>
              </li>
              {breadcrumbs.map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="text-gray-600">/</span>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <span className="text-white font-medium">{item.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            {title}
          </h1>
          {description && (
            <p className="text-xl text-gray-300 leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
