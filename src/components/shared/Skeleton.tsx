import { cn } from '@/lib/utils'

interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular' | 'card'
  width?: string
  height?: string
  className?: string
}

export function Skeleton({
  variant = 'rectangular',
  width = '100%',
  height = '20px',
  className = '',
}: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]',
        variant === 'circular' && 'rounded-full',
        variant === 'rectangular' && 'rounded-md',
        variant === 'card' && 'rounded-2xl',
        variant === 'text' && 'rounded h-4',
        className
      )}
      style={{ width, height }}
      aria-busy="true"
      aria-live="polite"
    />
  )
}

// Skeleton preset for common card pattern
export function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <div className={cn('space-y-4 p-6 border border-gray-200 rounded-2xl', className)}>
      <Skeleton variant="circular" width="48px" height="48px" />
      <Skeleton variant="text" width="80%" />
      <Skeleton variant="text" width="100%" />
      <Skeleton variant="text" width="60%" />
    </div>
  )
}

// Skeleton preset for stat cards
export function SkeletonStat({ className = '' }: { className?: string }) {
  return (
    <div className={cn('space-y-2 text-center', className)}>
      <Skeleton variant="text" width="120px" height="48px" className="mx-auto" />
      <Skeleton variant="text" width="90px" height="16px" className="mx-auto" />
    </div>
  )
}

// Skeleton preset for grid of cards
export function SkeletonGrid({
  count = 4,
  className = '',
}: {
  count?: number
  className?: string
}) {
  return (
    <div className={cn('grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6', className)}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}
