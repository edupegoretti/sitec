'use client'

import { cn } from '@/lib/utils'
import { Reveal, SectionHeader } from '@/components/shared'

interface ComparisonItem {
  aspecto: string
  mercado: string
  zopu: string
  highlight?: boolean
}

interface ComparisonTableProps {
  title?: string
  description?: string
  items: ComparisonItem[]
  className?: string
}

export function ComparisonTable({
  title = 'Por que 70% falham e nós não',
  description = 'A diferença está na abordagem, não na ferramenta.',
  items,
  className,
}: ComparisonTableProps) {
  return (
    <section className={cn('py-20 sm:py-28 lg:py-32 bg-white', className)}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title={title} description={description} />

        <Reveal>
          <div className="overflow-x-auto">
            <div className="overflow-hidden rounded-3xl border border-gray-200/80 min-w-150 shadow-elevated">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50/80">
                    <th className="px-6 py-5 text-left text-sm font-semibold text-gray-500 uppercase tracking-wide w-1/3">
                      Aspecto
                    </th>
                    <th className="px-6 py-5 text-center text-sm font-semibold text-gray-400 uppercase tracking-wide w-1/3">
                      O mercado
                    </th>
                    <th className="px-6 py-5 text-center text-sm font-semibold text-brand uppercase tracking-wide bg-brand/5 w-1/3">
                      Zopu
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {items.map((item, index) => (
                    <tr key={index} className="transition-all duration-300 ease-out-expo hover:bg-gray-50/50">
                      <td className="px-6 py-5 text-gray-900 font-medium">
                        {item.aspecto}
                      </td>
                      <td className="px-6 py-5 text-center text-gray-500">
                        {item.mercado}
                      </td>
                      <td
                        className={cn(
                          'px-6 py-5 text-center bg-brand/3',
                          item.highlight
                            ? 'text-green-600 font-bold'
                            : 'text-gray-900 font-medium'
                        )}
                      >
                        {item.zopu}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
