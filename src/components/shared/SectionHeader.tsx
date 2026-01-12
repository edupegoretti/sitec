import { cn } from '@/lib/utils'
import { Badge } from './Badge'

interface SectionHeaderProps {
  label?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  variant?: 'light' | 'dark'
  className?: string
  titleClassName?: string
  descriptionClassName?: string
  badgeClassName?: string
}

export function SectionHeader({
  label,
  title,
  description,
  align = 'center',
  variant = 'light',
  className,
  titleClassName,
  descriptionClassName,
  badgeClassName,
}: SectionHeaderProps) {
  const isDark = variant === 'dark'

  return (
    <div
      className={cn(
        'mb-12 lg:mb-16',
        align === 'center' ? 'text-center max-w-3xl mx-auto' : 'max-w-2xl',
        className
      )}
    >
      {label && (
        <Badge className={cn('mb-4', badgeClassName)} variant={isDark ? 'info' : 'default'}>
          {label}
        </Badge>
      )}
      <h2
        className={cn(
          'text-3xl sm:text-4xl font-bold mb-4',
          isDark ? 'text-white' : 'text-gray-900',
          titleClassName
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'text-lg leading-relaxed',
            isDark ? 'text-gray-300' : 'text-gray-600',
            descriptionClassName
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}
