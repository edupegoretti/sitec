'use client'

import { Suspense, useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Lock, Eye, EyeSlash, ArrowRight, Warning, CircleNotch } from '@phosphor-icons/react'

/**
 * Admin login page
 *
 * Features:
 * - Simple password-only login
 * - Show/hide password toggle
 * - Loading state
 * - Error handling with rate limit awareness
 * - Redirect to intended page after login
 */

// Login form component that uses useSearchParams
function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Get redirect URL from query params
  const redirectTo = searchParams.get('redirect') || '/admin/utm-builder'

  // Clear error when password changes
  useEffect(() => {
    if (error) setError(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!password.trim()) {
      setError('Digite a senha')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      })

      const data = await response.json()

      if (!response.ok) {
        // Handle rate limiting
        if (response.status === 429) {
          const retryAfter = response.headers.get('Retry-After')
          setError(`Muitas tentativas. Aguarde ${retryAfter || '60'} segundos.`)
        } else {
          setError(data.error || 'Erro ao fazer login')
        }
        return
      }

      // Success - redirect
      router.push(redirectTo)
      router.refresh()
    } catch (err) {
      console.error('Login error:', err)
      setError('Erro de conexao. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Password Input */}
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
          disabled={isLoading}
          autoFocus
          autoComplete="current-password"
          className={`w-full rounded-xl border bg-white px-4 py-3 pr-12 text-zinc-900 placeholder-zinc-400 outline-none transition-colors ${
            error
              ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
              : 'border-zinc-200 focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10'
          } disabled:cursor-not-allowed disabled:opacity-50`}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          disabled={isLoading}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-zinc-400 transition-colors hover:text-zinc-600 disabled:cursor-not-allowed"
          aria-label={showPassword ? 'Esconder senha' : 'Mostrar senha'}
        >
          {showPassword ? <EyeSlash className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          <Warning className="h-4 w-4 flex-shrink-0" weight="fill" />
          <span>{error}</span>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading || !password.trim()}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-900 px-4 py-3 font-medium text-white transition-all hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLoading ? (
          <>
            <CircleNotch className="h-5 w-5 animate-spin" />
            <span>Entrando...</span>
          </>
        ) : (
          <>
            <span>Entrar</span>
            <ArrowRight className="h-5 w-5" />
          </>
        )}
      </button>
    </form>
  )
}

// Loading fallback for Suspense
function LoginFormFallback() {
  return (
    <div className="space-y-4">
      <div className="h-12 animate-pulse rounded-xl bg-zinc-100" />
      <div className="h-12 animate-pulse rounded-xl bg-zinc-100" />
    </div>
  )
}

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo/Icon */}
        <div className="mb-8 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-900">
            <Lock className="h-8 w-8 text-white" weight="bold" />
          </div>
        </div>

        {/* Title */}
        <h1 className="mb-2 text-center text-2xl font-semibold text-zinc-900">Area Administrativa</h1>
        <p className="mb-8 text-center text-sm text-zinc-500">Digite a senha para continuar</p>

        {/* Form wrapped in Suspense */}
        <Suspense fallback={<LoginFormFallback />}>
          <LoginForm />
        </Suspense>

        {/* Footer */}
        <p className="mt-8 text-center text-xs text-zinc-400">Acesso restrito. Nao compartilhe sua senha.</p>
      </div>
    </div>
  )
}
