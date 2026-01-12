import { cn } from '@/lib/utils'

interface ContainerProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'narrow' | 'medium'
}

export function Container({ children, className, variant = 'default' }: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto px-4 sm:px-6 lg:px-8',
        {
          'max-w-7xl': variant === 'default',
          'max-w-3xl': variant === 'narrow',
          'max-w-4xl': variant === 'medium',
        },
        className
      )}
    >
      {children}
    </div>
  )
}
