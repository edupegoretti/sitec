'use client'

import { useState, FormEvent } from 'react'
import { Mail, Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

type FormState = 'idle' | 'loading' | 'success' | 'error'

type Props = {
  variant?: 'sidebar' | 'inline' | 'footer'
  className?: string
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function NewsletterForm({ variant = 'sidebar', className }: Props) {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<FormState>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!email.trim()) {
      setState('error')
      setErrorMessage('Digite seu email')
      return
    }

    if (!isValidEmail(email)) {
      setState('error')
      setErrorMessage('Email invalido')
      return
    }

    setState('loading')
    setErrorMessage('')

    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (!res.ok) {
        throw new Error('Erro ao inscrever')
      }

      setState('success')
      setEmail('')
    } catch {
      setState('error')
      setErrorMessage('Erro ao inscrever. Tente novamente.')
    }
  }

  if (state === 'success') {
    return (
      <div
        className={cn(
          'flex flex-col items-center justify-center py-6 text-center',
          variant === 'inline' && 'rounded-2xl bg-gradient-to-br from-brand to-brand-hover p-8 text-white',
          variant === 'sidebar' && 'rounded-2xl border border-gray-200 bg-white p-6',
          variant === 'footer' && 'p-4',
          className
        )}
      >
        <div className={cn(
          'w-12 h-12 rounded-full flex items-center justify-center mb-4',
          variant === 'inline' ? 'bg-white/20' : 'bg-success-light'
        )}>
          <CheckCircle className={cn('w-6 h-6', variant === 'inline' ? 'text-white' : 'text-success')} />
        </div>
        <h4 className={cn('font-semibold', variant === 'inline' ? 'text-white' : 'text-gray-900')}>
          Inscricao confirmada!
        </h4>
        <p className={cn('mt-2 text-sm', variant === 'inline' ? 'text-white/80' : 'text-gray-600')}>
          Em breve voce recebera nossos melhores conteudos.
        </p>
      </div>
    )
  }

  if (variant === 'inline') {
    return (
      <div className={cn('rounded-2xl bg-gradient-to-br from-brand to-brand-hover p-8', className)}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <Mail className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white">Newsletter</h3>
        </div>

        <p className="text-white/90 mb-6">
          Receba insights de operacao de receita direto no seu email
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
            disabled={state === 'loading'}
            className={cn(
              'flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all',
              state === 'error' && 'border-red-300 ring-2 ring-red-300'
            )}
          />
          <button
            type="submit"
            disabled={state === 'loading'}
            className="px-6 py-3 rounded-xl bg-white text-brand font-semibold hover:bg-gray-100 disabled:opacity-70 transition-all flex items-center justify-center gap-2"
          >
            {state === 'loading' ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              'Inscrever-se'
            )}
          </button>
        </form>

        {state === 'error' && errorMessage && (
          <p className="mt-3 text-sm text-red-200 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errorMessage}
          </p>
        )}

        <p className="mt-4 text-xs text-white/60">
          Sem spam. Cancelamento a qualquer momento.
        </p>
      </div>
    )
  }

  // Sidebar and Footer variants
  return (
    <div
      className={cn(
        variant === 'sidebar' && 'rounded-2xl border border-gray-200 bg-white p-6',
        variant === 'footer' && 'p-4',
        className
      )}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-brand-light flex items-center justify-center">
          <Mail className="w-5 h-5 text-brand" />
        </div>
        <h3 className="text-lg font-bold text-gray-900">Newsletter</h3>
      </div>

      <p className="text-gray-600 text-sm mb-5">
        Receba insights de operacao direto no email.
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seu@email.com"
          disabled={state === 'loading'}
          className={cn(
            'w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all',
            state === 'error' && 'border-red-300 ring-2 ring-red-300/30'
          )}
        />
        <button
          type="submit"
          disabled={state === 'loading'}
          className="w-full px-4 py-3 rounded-xl bg-brand text-white font-semibold hover:bg-brand-hover disabled:opacity-70 transition-all flex items-center justify-center gap-2"
        >
          {state === 'loading' ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            'Inscrever-se'
          )}
        </button>
      </form>

      {state === 'error' && errorMessage && (
        <p className="mt-3 text-sm text-red-600 flex items-center gap-1">
          <AlertCircle className="w-4 h-4" />
          {errorMessage}
        </p>
      )}

      <p className="mt-4 text-xs text-gray-500">
        Sem spam. So conteudo util.
      </p>
    </div>
  )
}
