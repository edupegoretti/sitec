'use client'

import { Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'

type Props = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export function BlogSearch({ value, onChange, placeholder = 'Buscar conteúdo...', className }: Props) {
  return (
    <div className={cn('relative', className)}>
      <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          'w-full pl-14 pr-12 py-4 rounded-2xl',
          'bg-white border-2 border-gray-200',
          'text-gray-900 placeholder:text-gray-400',
          'transition-all duration-300 ease-out-expo',
          'hover:border-gray-300 hover:shadow-card',
          'focus:outline-none focus:border-brand focus:shadow-elevated focus:shadow-brand/10',
          'text-base'
        )}
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          aria-label="Limpar busca"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}
