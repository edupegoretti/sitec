'use client'

import { cn } from '@/lib/utils'
import { NewsletterForm } from './NewsletterForm'

type Props = {
  className?: string
}

export function NewsletterInline({ className }: Props) {
  return (
    <div className={cn('animate-fade-in-up', className)}>
      <NewsletterForm variant="inline" />
    </div>
  )
}
