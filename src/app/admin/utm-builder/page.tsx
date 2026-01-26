'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import {
  Link as LinkIcon,
  Copy,
  Check,
  SignOut,
  CircleNotch,
  Plus,
  Clock,
  Warning,
  CaretDown,
  MagnifyingGlass,
} from '@phosphor-icons/react'

/**
 * UTM Builder page
 *
 * Features:
 * - Create UTM links with predefined sources/mediums
 * - Real-time URL preview
 * - Copy to clipboard
 * - History of created links
 * - Search/filter history
 */

// UTM Sources
const UTM_SOURCES = [
  { value: 'bitrix24', label: 'Bitrix24 (Diretorio)' },
  { value: 'google', label: 'Google Ads' },
  { value: 'meta', label: 'Meta Ads (Facebook/Instagram)' },
  { value: 'linkedin', label: 'LinkedIn Ads' },
  { value: 'email', label: 'Email Marketing' },
  { value: 'newsletter', label: 'Newsletter' },
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'partners', label: 'Parceiros' },
  { value: 'qrcode', label: 'QR Code' },
  { value: 'organic', label: 'Organico' },
  { value: 'other', label: 'Outro' },
]

// UTM Mediums
const UTM_MEDIUMS = [
  { value: 'cpc', label: 'CPC (Pago por clique)' },
  { value: 'cpm', label: 'CPM (Display)' },
  { value: 'social', label: 'Social (Organico)' },
  { value: 'email', label: 'Email' },
  { value: 'referral', label: 'Referral (Indicacao)' },
  { value: 'partner_directory', label: 'Diretorio de Parceiros' },
  { value: 'affiliate', label: 'Afiliado' },
  { value: 'banner', label: 'Banner' },
  { value: 'video', label: 'Video' },
  { value: 'qrcode', label: 'QR Code' },
  { value: 'other', label: 'Outro' },
]

// Common base URLs
const COMMON_URLS = [
  { value: 'https://zopu.com.br', label: 'Home' },
  { value: 'https://zopu.com.br/arquitetura-de-receita', label: 'Arquitetura de Receita' },
  { value: 'https://zopu.com.br/bitrix24', label: 'Bitrix24' },
  { value: 'https://zopu.com.br/recursos', label: 'Recursos' },
  { value: 'https://zopu.com.br/contato', label: 'Contato' },
  { value: 'custom', label: 'URL personalizada...' },
]

type UtmLink = {
  _id: string
  name: string
  baseUrl: string
  utmSource: string
  utmMedium: string
  utmCampaign: string
  utmTerm?: string
  utmContent?: string
  generatedUrl: string
  _createdAt: string
}

// Slugify helper
function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 100)
}

export default function UtmBuilderPage() {
  const router = useRouter()

  // Form state
  const [name, setName] = useState('')
  const [selectedUrl, setSelectedUrl] = useState(COMMON_URLS[0].value)
  const [customUrl, setCustomUrl] = useState('')
  const [utmSource, setUtmSource] = useState('bitrix24')
  const [utmMedium, setUtmMedium] = useState('partner_directory')
  const [utmCampaign, setUtmCampaign] = useState('')
  const [utmTerm, setUtmTerm] = useState('')
  const [utmContent, setUtmContent] = useState('')

  // UI state
  const [isLoading, setIsLoading] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // History state
  const [history, setHistory] = useState<UtmLink[]>([])
  const [isLoadingHistory, setIsLoadingHistory] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [copiedId, setCopiedId] = useState<string | null>(null)

  // Get base URL
  const baseUrl = selectedUrl === 'custom' ? customUrl : selectedUrl

  // Generate preview URL
  const previewUrl = useMemo(() => {
    if (!baseUrl) return ''

    try {
      const url = new URL(baseUrl)
      const campaign = slugify(utmCampaign) || 'campanha'

      url.searchParams.set('utm_source', utmSource)
      url.searchParams.set('utm_medium', utmMedium)
      url.searchParams.set('utm_campaign', campaign)

      if (utmTerm.trim()) {
        url.searchParams.set('utm_term', utmTerm.trim())
      }
      if (utmContent.trim()) {
        url.searchParams.set('utm_content', utmContent.trim())
      }

      return url.toString()
    } catch {
      return ''
    }
  }, [baseUrl, utmSource, utmMedium, utmCampaign, utmTerm, utmContent])

  // Load history on mount
  useEffect(() => {
    loadHistory()
  }, [])

  async function loadHistory() {
    try {
      const response = await fetch('/api/admin/utm')
      if (response.ok) {
        const data = await response.json()
        setHistory(data.utmLinks || [])
      }
    } catch (err) {
      console.error('Error loading history:', err)
    } finally {
      setIsLoadingHistory(false)
    }
  }

  // Filter history by search
  const filteredHistory = useMemo(() => {
    if (!searchQuery.trim()) return history

    const query = searchQuery.toLowerCase()
    return history.filter(
      (link) =>
        link.name.toLowerCase().includes(query) ||
        link.utmCampaign.toLowerCase().includes(query) ||
        link.utmSource.toLowerCase().includes(query)
    )
  }, [history, searchQuery])

  // Copy to clipboard
  async function copyToClipboard(text: string, id?: string) {
    try {
      await navigator.clipboard.writeText(text)
      if (id) {
        setCopiedId(id)
        setTimeout(() => setCopiedId(null), 2000)
      } else {
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 2000)
      }
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  // Handle form submit
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (!name.trim()) {
      setError('Digite um nome descritivo')
      return
    }

    if (!baseUrl) {
      setError('Selecione ou digite uma URL')
      return
    }

    if (!utmCampaign.trim()) {
      setError('Digite o nome da campanha')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/admin/utm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          baseUrl,
          utmSource,
          utmMedium,
          utmCampaign: utmCampaign.trim(),
          utmTerm: utmTerm.trim() || undefined,
          utmContent: utmContent.trim() || undefined,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Erro ao criar link')
        return
      }

      // Success
      setSuccess('Link criado com sucesso!')
      copyToClipboard(data.utmLink.generatedUrl)

      // Reset form
      setName('')
      setUtmCampaign('')
      setUtmTerm('')
      setUtmContent('')

      // Reload history
      loadHistory()
    } catch (err) {
      console.error('Error creating UTM:', err)
      setError('Erro de conexao. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  // Handle logout
  async function handleLogout() {
    try {
      await fetch('/api/admin/logout', { method: 'POST' })
      router.push('/admin/login')
    } catch (err) {
      console.error('Logout error:', err)
    }
  }

  // Format date
  function formatDate(dateString: string): string {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900">
              <LinkIcon className="h-5 w-5 text-white" weight="bold" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-zinc-900">UTM Builder</h1>
              <p className="text-sm text-zinc-500">Crie links rastreáveis</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
          >
            <SignOut className="h-4 w-4" />
            <span>Sair</span>
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Form */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="mb-6 text-lg font-semibold text-zinc-900">Novo Link UTM</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-zinc-700">Nome descritivo</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Black Friday 2024 - Google Ads"
                  className="w-full rounded-lg border border-zinc-200 px-3 py-2.5 text-zinc-900 placeholder-zinc-400 outline-none transition-colors focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10"
                />
              </div>

              {/* Base URL */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-zinc-700">URL de destino</label>
                <div className="relative">
                  <select
                    value={selectedUrl}
                    onChange={(e) => setSelectedUrl(e.target.value)}
                    className="w-full appearance-none rounded-lg border border-zinc-200 bg-white px-3 py-2.5 pr-10 text-zinc-900 outline-none transition-colors focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10"
                  >
                    {COMMON_URLS.map((url) => (
                      <option key={url.value} value={url.value}>
                        {url.label}
                      </option>
                    ))}
                  </select>
                  <CaretDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                </div>
                {selectedUrl === 'custom' && (
                  <input
                    type="url"
                    value={customUrl}
                    onChange={(e) => setCustomUrl(e.target.value)}
                    placeholder="https://zopu.com.br/..."
                    className="mt-2 w-full rounded-lg border border-zinc-200 px-3 py-2.5 text-zinc-900 placeholder-zinc-400 outline-none transition-colors focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10"
                  />
                )}
              </div>

              {/* Source & Medium */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-zinc-700">Fonte (utm_source)</label>
                  <div className="relative">
                    <select
                      value={utmSource}
                      onChange={(e) => setUtmSource(e.target.value)}
                      className="w-full appearance-none rounded-lg border border-zinc-200 bg-white px-3 py-2.5 pr-10 text-zinc-900 outline-none transition-colors focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10"
                    >
                      {UTM_SOURCES.map((source) => (
                        <option key={source.value} value={source.value}>
                          {source.label}
                        </option>
                      ))}
                    </select>
                    <CaretDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-zinc-700">Meio (utm_medium)</label>
                  <div className="relative">
                    <select
                      value={utmMedium}
                      onChange={(e) => setUtmMedium(e.target.value)}
                      className="w-full appearance-none rounded-lg border border-zinc-200 bg-white px-3 py-2.5 pr-10 text-zinc-900 outline-none transition-colors focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10"
                    >
                      {UTM_MEDIUMS.map((medium) => (
                        <option key={medium.value} value={medium.value}>
                          {medium.label}
                        </option>
                      ))}
                    </select>
                    <CaretDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                  </div>
                </div>
              </div>

              {/* Campaign */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-zinc-700">Campanha (utm_campaign)</label>
                <input
                  type="text"
                  value={utmCampaign}
                  onChange={(e) => setUtmCampaign(e.target.value)}
                  placeholder="Ex: black-friday-2024"
                  className="w-full rounded-lg border border-zinc-200 px-3 py-2.5 text-zinc-900 placeholder-zinc-400 outline-none transition-colors focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10"
                />
                {utmCampaign && (
                  <p className="mt-1 text-xs text-zinc-500">
                    Sera salvo como: <code className="rounded bg-zinc-100 px-1">{slugify(utmCampaign)}</code>
                  </p>
                )}
              </div>

              {/* Optional fields */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-zinc-700">
                    Termo (utm_term) <span className="text-zinc-400">opcional</span>
                  </label>
                  <input
                    type="text"
                    value={utmTerm}
                    onChange={(e) => setUtmTerm(e.target.value)}
                    placeholder="palavras-chave"
                    className="w-full rounded-lg border border-zinc-200 px-3 py-2.5 text-zinc-900 placeholder-zinc-400 outline-none transition-colors focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-zinc-700">
                    Conteudo (utm_content) <span className="text-zinc-400">opcional</span>
                  </label>
                  <input
                    type="text"
                    value={utmContent}
                    onChange={(e) => setUtmContent(e.target.value)}
                    placeholder="botao-azul"
                    className="w-full rounded-lg border border-zinc-200 px-3 py-2.5 text-zinc-900 placeholder-zinc-400 outline-none transition-colors focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10"
                  />
                </div>
              </div>

              {/* Preview */}
              {previewUrl && (
                <div className="rounded-lg bg-zinc-50 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-medium text-zinc-500">Preview do link</span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(previewUrl)}
                      className="flex items-center gap-1 rounded px-2 py-1 text-xs text-zinc-600 transition-colors hover:bg-zinc-200"
                    >
                      {isCopied ? <Check className="h-3.5 w-3.5 text-green-600" /> : <Copy className="h-3.5 w-3.5" />}
                      <span>{isCopied ? 'Copiado!' : 'Copiar'}</span>
                    </button>
                  </div>
                  <code className="block break-all text-sm text-zinc-700">{previewUrl}</code>
                </div>
              )}

              {/* Error/Success messages */}
              {error && (
                <div className="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                  <Warning className="h-4 w-4 flex-shrink-0" weight="fill" />
                  <span>{error}</span>
                </div>
              )}

              {success && (
                <div className="flex items-center gap-2 rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">
                  <Check className="h-4 w-4 flex-shrink-0" weight="bold" />
                  <span>{success} Link copiado para a area de transferencia.</span>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-900 px-4 py-3 font-medium text-white transition-all hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <CircleNotch className="h-5 w-5 animate-spin" />
                    <span>Criando...</span>
                  </>
                ) : (
                  <>
                    <Plus className="h-5 w-5" />
                    <span>Criar Link</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* History */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-zinc-900">Historico</h2>
              <span className="text-sm text-zinc-500">{history.length} links</span>
            </div>

            {/* Search */}
            <div className="relative mb-4">
              <MagnifyingGlass className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por nome, campanha..."
                className="w-full rounded-lg border border-zinc-200 bg-white py-2 pl-9 pr-3 text-sm text-zinc-900 placeholder-zinc-400 outline-none transition-colors focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10"
              />
            </div>

            {/* List */}
            <div className="max-h-[500px] space-y-3 overflow-y-auto">
              {isLoadingHistory ? (
                <div className="flex items-center justify-center py-8">
                  <CircleNotch className="h-6 w-6 animate-spin text-zinc-400" />
                </div>
              ) : filteredHistory.length === 0 ? (
                <div className="py-8 text-center text-sm text-zinc-500">
                  {searchQuery ? 'Nenhum link encontrado' : 'Nenhum link criado ainda'}
                </div>
              ) : (
                filteredHistory.map((link) => (
                  <div key={link._id} className="rounded-lg border border-zinc-100 bg-zinc-50 p-3 transition-colors hover:border-zinc-200">
                    <div className="mb-1 flex items-start justify-between gap-2">
                      <span className="font-medium text-zinc-900">{link.name}</span>
                      <button
                        onClick={() => copyToClipboard(link.generatedUrl, link._id)}
                        className="flex-shrink-0 rounded p-1.5 text-zinc-500 transition-colors hover:bg-zinc-200 hover:text-zinc-700"
                        title="Copiar link"
                      >
                        {copiedId === link._id ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    <div className="mb-2 flex flex-wrap items-center gap-1.5 text-xs">
                      <span className="rounded bg-zinc-200 px-1.5 py-0.5 text-zinc-600">{link.utmSource}</span>
                      <span className="text-zinc-300">/</span>
                      <span className="rounded bg-zinc-200 px-1.5 py-0.5 text-zinc-600">{link.utmMedium}</span>
                      <span className="text-zinc-300">/</span>
                      <span className="rounded bg-blue-100 px-1.5 py-0.5 text-blue-700">{link.utmCampaign}</span>
                    </div>
                    <code className="mb-2 block truncate text-xs text-zinc-500">{link.generatedUrl}</code>
                    <div className="flex items-center gap-1 text-xs text-zinc-400">
                      <Clock className="h-3 w-3" />
                      <span>{formatDate(link._createdAt)}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
