'use client'

import { BookOpen, Wrench, Scale } from 'lucide-react'
import { cn } from '@/lib/utils'
import { type PostIntent, INTENT_LABEL, INTENT_DESCRIPTION } from '@/sanity/lib/labels'

type IntentOption = {
  value: PostIntent
  label: string
  description: string
  icon: React.ElementType
  color: {
    active: string
    icon: string
  }
}

const INTENT_OPTIONS: IntentOption[] = [
  {
    value: 'aprender',
    label: INTENT_LABEL.aprender,
    description: INTENT_DESCRIPTION.aprender,
    icon: BookOpen,
    color: {
      active: 'bg-blue-50 border-blue-200 text-blue-700',
      icon: 'text-blue-500',
    },
  },
  {
    value: 'aplicar',
    label: INTENT_LABEL.aplicar,
    description: INTENT_DESCRIPTION.aplicar,
    icon: Wrench,
    color: {
      active: 'bg-emerald-50 border-emerald-200 text-emerald-700',
      icon: 'text-emerald-500',
    },
  },
  {
    value: 'decidir',
    label: INTENT_LABEL.decidir,
    description: INTENT_DESCRIPTION.decidir,
    icon: Scale,
    color: {
      active: 'bg-amber-50 border-amber-200 text-amber-700',
      icon: 'text-amber-500',
    },
  },
]

type Props = {
  activeIntent: PostIntent | null
  onIntentChange: (intent: PostIntent | null) => void
  counts?: Record<PostIntent, number>
  className?: string
}

export function IntentFilter({ activeIntent, onIntentChange, counts, className }: Props) {
  return (
    <div className={cn('flex flex-wrap gap-2 sm:gap-3', className)}>
      {INTENT_OPTIONS.map((option) => {
        const Icon = option.icon
        const isActive = activeIntent === option.value
        const count = counts?.[option.value]

        return (
          <button
            key={option.value}
            onClick={() => onIntentChange(isActive ? null : option.value)}
            className={cn(
              'group flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border-2 font-medium text-sm',
              'transition-all duration-300 ease-out-expo',
              isActive
                ? option.color.active
                : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
            )}
          >
            <Icon
              className={cn(
                'w-4 h-4 transition-colors',
                isActive ? option.color.icon : 'text-gray-400 group-hover:text-gray-500'
              )}
            />
            <span>{option.label}</span>
            {count !== undefined && count > 0 && (
              <span
                className={cn(
                  'text-xs px-1.5 py-0.5 rounded-lg',
                  isActive ? 'bg-white/50' : 'bg-gray-100 text-gray-500'
                )}
              >
                {count}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
