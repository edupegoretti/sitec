import { cn } from '@/lib/utils'
import { StatCardDark } from '@/components/shared'

interface Stat {
  value: string
  label: string
  variant?: 'default' | 'success' | 'danger'
}

interface StatsSectionProps {
  stats?: Stat[]
  className?: string
}

const defaultStats: Stat[] = [
  { value: '450+', label: 'clientes ativos' },
  { value: '96%', label: 'taxa de retenção', variant: 'success' },
  { value: '700+', label: 'projetos completos' },
  { value: '30', label: 'dias para funcionar' },
]

export function StatsSection({ stats = defaultStats, className }: StatsSectionProps) {
  return (
    <section className={cn('py-16 sm:py-20 bg-bg-dark', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <StatCardDark
              key={index}
              value={stat.value}
              label={stat.label}
              variant={stat.variant}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
