'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Gift, CheckCircle, ArrowRight, CircleNotch } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

export type ContentUpgradeFormat = 'checklist' | 'template' | 'pdf' | 'spreadsheet' | 'swipefile'

export type ContentUpgradeData = {
  _id: string
  title: string
  slug: string
  format: ContentUpgradeFormat
  headline?: string
  description?: string
  bulletPoints?: string[]
  ctaText?: string
  thankYouMessage?: string
}

type Props = {
  contentUpgrade: ContentUpgradeData
  variant?: 'card' | 'banner' | 'minimal'
  className?: string
}

const FORMAT_ICONS: Record<ContentUpgradeFormat, string> = {
  checklist: '✅',
  template: '📋',
  pdf: '📄',
  spreadsheet: '📊',
  swipefile: '💡',
}

const FORMAT_LABELS: Record<ContentUpgradeFormat, string> = {
  checklist: 'Checklist',
  template: 'Template',
  pdf: 'PDF',
  spreadsheet: 'Planilha',
  swipefile: 'Swipe File',
}

export function ContentUpgradeInline({ contentUpgrade, variant = 'card', className }: Props) {
  const [state, setState] = useState<'idle' | 'form' | 'loading' | 'success'>('idle')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email || !email.includes('@')) {
      setError('Digite um email válido')
      return
    }

    setState('loading')

    try {
      const res = await fetch('/api/content-upgrade/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          contentUpgradeId: contentUpgrade._id,
          contentUpgradeSlug: contentUpgrade.slug,
          contentUpgradeTitle: contentUpgrade.title,
        }),
      })

      if (!res.ok) throw new Error('Erro ao processar')

      setState('success')

      // Track conversion (se gtag estiver disponível)
      if (typeof window !== 'undefined' && 'gtag' in window) {
        const gtag = window.gtag as (
          command: string,
          action: string,
          params: Record<string, unknown>
        ) => void
        gtag('event', 'content_upgrade_conversion', {
          content_upgrade_id: contentUpgrade._id,
          content_upgrade_title: contentUpgrade.title,
          format: contentUpgrade.format,
        })
      }
    } catch {
      setError('Ocorreu um erro. Tente novamente.')
      setState('form')
    }
  }

  // Variant: Card (default)
  if (variant === 'card') {
    return (
      <div
        className={cn(
          'my-8 rounded-2xl border-2 border-brand/20 bg-gradient-to-br from-brand/5 via-white to-brand/5',
          'overflow-hidden',
          className
        )}
      >
        <AnimatePresence mode="wait">
          {/* Idle/Form State */}
          {(state === 'idle' || state === 'form' || state === 'loading') && (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-6 sm:p-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                {/* Icon */}
                <div className="shrink-0 w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center text-2xl">
                  {FORMAT_ICONS[contentUpgrade.format] || '📦'}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  {/* Badge */}
                  <span
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full
                                   bg-brand/10 text-brand text-xs font-semibold mb-3"
                  >
                    <Gift size={14} weight="fill" />
                    {FORMAT_LABELS[contentUpgrade.format] || 'Material'} gratuito
                  </span>

                  {/* Headline */}
                  <h4 className="text-lg sm:text-xl font-bold text-gray-900">
                    {contentUpgrade.headline || 'Quer levar isso na prática?'}
                  </h4>

                  {/* Title */}
                  <p className="mt-2 text-gray-700 font-medium">{contentUpgrade.title}</p>

                  {/* Description */}
                  {contentUpgrade.description && (
                    <p className="mt-2 text-sm text-gray-600">{contentUpgrade.description}</p>
                  )}

                  {/* Bullet points */}
                  {contentUpgrade.bulletPoints && contentUpgrade.bulletPoints.length > 0 && (
                    <ul className="mt-4 space-y-2">
                      {contentUpgrade.bulletPoints.map((point, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                          <CheckCircle
                            size={18}
                            weight="fill"
                            className="shrink-0 text-green-500 mt-0.5"
                          />
                          {point}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Form */}
                  {state === 'idle' ? (
                    <button
                      onClick={() => setState('form')}
                      className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl
                                 bg-brand text-white font-semibold
                                 hover:bg-brand-hover hover:-translate-y-0.5
                                 shadow-lg shadow-brand/20 hover:shadow-xl hover:shadow-brand/30
                                 transition-all duration-300"
                    >
                      {contentUpgrade.ctaText || 'Quero o material gratuito'}
                      <ArrowRight size={18} weight="bold" />
                    </button>
                  ) : (
                    <form onSubmit={handleSubmit} className="mt-6">
                      <div className="flex flex-col sm:flex-row gap-3">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Seu melhor email"
                          className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200
                                     focus:border-brand/50 focus:ring-2 focus:ring-brand/20
                                     outline-none transition-all"
                          disabled={state === 'loading'}
                        />
                        <button
                          type="submit"
                          disabled={state === 'loading'}
                          className="px-6 py-3 rounded-xl bg-brand text-white font-semibold
                                     hover:bg-brand-hover disabled:opacity-50
                                     transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          {state === 'loading' ? (
                            <CircleNotch size={20} className="animate-spin" />
                          ) : (
                            <>
                              Enviar
                              <ArrowRight size={18} weight="bold" />
                            </>
                          )}
                        </button>
                      </div>
                      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
                      <p className="mt-3 text-xs text-gray-500">
                        Seu email está seguro. Não fazemos spam.
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Success State */}
          {state === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 sm:p-8 text-center"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-4">
                <CheckCircle size={32} weight="fill" className="text-green-500" />
              </div>
              <h4 className="text-xl font-bold text-gray-900">
                {contentUpgrade.thankYouMessage || 'Pronto! Verifique seu email.'}
              </h4>
              <p className="mt-2 text-gray-600">
                Enviamos o {FORMAT_LABELS[contentUpgrade.format]?.toLowerCase() || 'material'} para{' '}
                {email}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  // Variant: Banner
  if (variant === 'banner') {
    return (
      <div
        className={cn(
          'my-8 rounded-2xl bg-brand text-white overflow-hidden',
          'shadow-xl shadow-brand/20',
          className
        )}
      >
        <AnimatePresence mode="wait">
          {(state === 'idle' || state === 'form' || state === 'loading') && (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-6 sm:p-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                {/* Icon */}
                <div className="shrink-0 w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-2xl">
                  {FORMAT_ICONS[contentUpgrade.format] || '📦'}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h4 className="text-lg font-bold">
                    {contentUpgrade.headline || 'Material gratuito'}
                  </h4>
                  <p className="text-white/90 text-sm mt-1">{contentUpgrade.title}</p>
                </div>

                {/* CTA */}
                {state === 'idle' ? (
                  <button
                    onClick={() => setState('form')}
                    className="shrink-0 px-6 py-3 rounded-xl bg-white text-brand font-semibold
                               hover:bg-gray-100 transition-all duration-300"
                  >
                    {contentUpgrade.ctaText || 'Baixar grátis'}
                  </button>
                ) : (
                  <form onSubmit={handleSubmit} className="shrink-0 flex gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Seu email"
                      className="w-48 px-4 py-3 rounded-xl bg-white/20 border border-white/30
                                 placeholder:text-white/60 text-white
                                 focus:bg-white/30 focus:outline-none transition-all"
                      disabled={state === 'loading'}
                    />
                    <button
                      type="submit"
                      disabled={state === 'loading'}
                      className="px-4 py-3 rounded-xl bg-white text-brand font-semibold
                                 disabled:opacity-50 transition-all"
                    >
                      {state === 'loading' ? (
                        <CircleNotch size={20} className="animate-spin" />
                      ) : (
                        <ArrowRight size={20} weight="bold" />
                      )}
                    </button>
                  </form>
                )}
              </div>
              {error && <p className="mt-2 text-sm text-red-200">{error}</p>}
            </motion.div>
          )}

          {state === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-6 sm:p-8 text-center"
            >
              <div className="flex items-center justify-center gap-3">
                <CheckCircle size={24} weight="fill" />
                <span className="font-semibold">
                  {contentUpgrade.thankYouMessage || 'Verifique seu email!'}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  // Variant: Minimal
  if (variant === 'minimal') {
    return (
      <div
        className={cn(
          'my-6 p-4 rounded-xl border border-gray-200 bg-gray-50',
          'flex flex-col sm:flex-row sm:items-center gap-4',
          className
        )}
      >
        <AnimatePresence mode="wait">
          {(state === 'idle' || state === 'form' || state === 'loading') && (
            <>
              <div className="flex items-center gap-3 flex-1">
                <span className="text-xl">{FORMAT_ICONS[contentUpgrade.format] || '📦'}</span>
                <div>
                  <p className="font-medium text-gray-900 text-sm">{contentUpgrade.title}</p>
                  <p className="text-xs text-gray-500">
                    {FORMAT_LABELS[contentUpgrade.format]} gratuito
                  </p>
                </div>
              </div>

              {state === 'idle' ? (
                <button
                  onClick={() => setState('form')}
                  className="text-sm font-semibold text-brand hover:text-brand-hover
                             flex items-center gap-1 transition-colors"
                >
                  Baixar
                  <ArrowRight size={16} weight="bold" />
                </button>
              ) : (
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-40 px-3 py-2 text-sm rounded-lg border border-gray-300
                               focus:border-brand focus:outline-none"
                    disabled={state === 'loading'}
                  />
                  <button
                    type="submit"
                    disabled={state === 'loading'}
                    className="px-3 py-2 rounded-lg bg-brand text-white text-sm font-semibold
                               disabled:opacity-50"
                  >
                    {state === 'loading' ? <CircleNotch size={16} className="animate-spin" /> : 'OK'}
                  </button>
                </form>
              )}
            </>
          )}

          {state === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 text-green-600"
            >
              <CheckCircle size={20} weight="fill" />
              <span className="text-sm font-medium">Enviado para {email}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return null
}
