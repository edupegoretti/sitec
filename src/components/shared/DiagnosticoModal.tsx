'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChartLineUp, WhatsappLogo, Envelope, User, Phone } from '@phosphor-icons/react'

interface DiagnosticoModalProps {
  /** Scroll percentage to trigger modal (0-100). Default: 70 */
  scrollTrigger?: number
  /** Delay in ms after scroll trigger. Default: 2000 */
  triggerDelay?: number
  /** If true, modal won't auto-open on scroll */
  manualOnly?: boolean
}

const STORAGE_KEY = 'zopu_diagnostico_shown'
const STORAGE_EXPIRY = 7 * 24 * 60 * 60 * 1000 // 7 days

export function DiagnosticoModal({
  scrollTrigger = 70,
  triggerDelay = 2000,
  manualOnly = false,
}: DiagnosticoModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    whatsapp: '',
  })

  // Check if modal was recently shown
  const wasRecentlyShown = useCallback(() => {
    if (typeof window === 'undefined') return true
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return false
    const timestamp = parseInt(stored, 10)
    return Date.now() - timestamp < STORAGE_EXPIRY
  }, [])

  // Mark as shown
  const markAsShown = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, Date.now().toString())
    }
  }, [])

  // Scroll trigger logic
  useEffect(() => {
    if (manualOnly || hasTriggered || wasRecentlyShown()) return

    const handleScroll = () => {
      const scrollPercentage = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100

      if (scrollPercentage >= scrollTrigger && !hasTriggered) {
        setHasTriggered(true)
        setTimeout(() => {
          setIsOpen(true)
          markAsShown()
        }, triggerDelay)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrollTrigger, triggerDelay, hasTriggered, manualOnly, wasRecentlyShown, markAsShown])

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission - replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSuccess(true)

    // Close after success
    setTimeout(() => {
      setIsOpen(false)
      setIsSuccess(false)
      setFormData({ nome: '', email: '', whatsapp: '' })
    }, 3000)
  }

  // Expose open function for manual trigger
  useEffect(() => {
    const openDiagnostico = () => {
      setIsOpen(true)
      markAsShown()
    }
    window.openDiagnosticoModal = openDiagnostico
    return () => {
      delete window.openDiagnosticoModal
    }
  }, [markAsShown])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-lg md:w-full bg-bg-dark border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors z-10"
            >
              <X size={20} className="text-white/60" />
            </button>

            {isSuccess ? (
              /* Success State */
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-8 text-center"
              >
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ChartLineUp size={32} className="text-green-400" weight="duotone" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  Diagnóstico solicitado
                </h3>
                <p className="text-gray-400">
                  Um especialista entrará em contato em até 24 horas úteis.
                </p>
              </motion.div>
            ) : (
              /* Form State */
              <div className="p-6 md:p-8">
                {/* Header */}
                <div className="mb-6">
                  <div className="w-12 h-12 bg-brand/20 rounded-xl flex items-center justify-center mb-4">
                    <ChartLineUp size={24} className="text-brand" weight="duotone" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Diagnóstico de CRM
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Descubra onde seu CRM está travando. Análise gratuita de 15 minutos
                    com um especialista para identificar gargalos e oportunidades.
                  </p>
                </div>

                {/* Benefits - subtle */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {[
                    'Análise do funil atual',
                    'Identificação de gargalos',
                    'Oportunidades de automação',
                    'Recomendações práticas',
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-400">
                      <div className="w-1.5 h-1.5 bg-brand rounded-full shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                      type="text"
                      name="nome"
                      placeholder="Seu nome"
                      required
                      value={formData.nome}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/50 transition-colors"
                    />
                  </div>

                  <div className="relative">
                    <Envelope size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                      type="email"
                      name="email"
                      placeholder="Seu melhor email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/50 transition-colors"
                    />
                  </div>

                  <div className="relative">
                    <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                      type="tel"
                      name="whatsapp"
                      placeholder="WhatsApp (opcional)"
                      value={formData.whatsapp}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/50 transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-brand text-white font-semibold rounded-xl hover:bg-brand-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Enviando...' : 'Solicitar diagnóstico gratuito'}
                  </button>
                </form>

                {/* Trust note */}
                <p className="text-center text-xs text-gray-500 mt-4">
                  Sem compromisso. Seus dados estão seguros.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// Button to manually trigger the modal
export function DiagnosticoButton({ className = '' }: { className?: string }) {
  const handleClick = () => {
    if (typeof window !== 'undefined' && window.openDiagnosticoModal) {
      window.openDiagnosticoModal()
    }
  }

  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-medium hover:bg-white/10 hover:border-white/20 transition-all ${className}`}
    >
      <ChartLineUp size={20} weight="duotone" className="text-brand" />
      Diagnóstico gratuito
    </button>
  )
}

// TypeScript declaration for window
declare global {
  interface Window {
    openDiagnosticoModal?: () => void
  }
}
