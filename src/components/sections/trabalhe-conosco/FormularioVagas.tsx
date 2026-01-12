'use client'

import { useEffect } from 'react'
import { FileText } from '@phosphor-icons/react'
import { Container } from '@/components/layout'
import { Reveal } from '@/components/shared'

export function FormularioVagas() {
  useEffect(() => {
    // Load Bitrix24 form script
    const script = document.createElement('script')
    script.src = `https://cdn.bitrix24.com.br/b19877839/crm/form/loader_9.js?${Math.floor(Date.now() / 180000)}`
    script.async = true
    script.dataset.b24Form = 'inline/9/tqwy13'
    script.dataset.skipMoving = 'true'

    const container = document.getElementById('bitrix24-form-container')
    if (container) {
      container.appendChild(script)
    }

    return () => {
      if (container && script.parentNode === container) {
        container.removeChild(script)
      }
    }
  }, [])

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Reveal>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand/10 rounded-full mb-6">
                <FileText size={16} weight="duotone" className="text-brand" />
                <span className="text-sm font-medium text-brand">Candidate-se</span>
              </span>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
                Quer fazer parte da{' '}
                <span className="text-brand">nossa equipe?</span>
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Temos várias oportunidades abertas. Preencha o formulário abaixo
                e nosso time de People entrará em contato.
              </p>
            </Reveal>
          </div>

          {/* Form Container */}
          <Reveal delay={0.3}>
            <div className="bg-gray-50 rounded-2xl border border-gray-200/80 p-6 sm:p-8 lg:p-10">
              <div
                id="bitrix24-form-container"
                className="min-h-[400px]"
              />
            </div>
          </Reveal>

          {/* Additional info */}
          <Reveal delay={0.4}>
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500">
                Não encontrou uma vaga para você?{' '}
                <a
                  href="mailto:people@zopu.com.br"
                  className="text-brand hover:text-brand-hover font-medium transition-colors"
                >
                  Envie seu currículo mesmo assim
                </a>
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
