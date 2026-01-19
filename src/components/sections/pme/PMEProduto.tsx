import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { Container } from '@/components/layout'
import { Badge, Reveal } from '@/components/shared'
import { ZOPU_PRODUTOS } from '@/lib/constants'

// WhatsApp personalizado para página PME
const WHATSAPP_PME = 'https://wa.me/554733079280?text=Ol%C3%A1%2C%20vim%20da%20p%C3%A1gina%20Bitrix24%20para%20PMEs%20e%20gostaria%20de%20falar%20com%20um%20especialista.'

const crmExpress = ZOPU_PRODUTOS.find((p) => p.id === 'crm-express')!

export function PMEProduto() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Reveal>
              <Badge className="mb-4">Solução recomendada</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                CRM Express
              </h2>
              <p className="text-xl text-gray-600">
                {crmExpress.para}
              </p>
            </Reveal>
          </div>

          <Reveal>
            <div className="bg-white rounded-2xl p-8 sm:p-12 border border-gray-100 shadow-lg">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 mb-8">
                <div>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-4xl sm:text-5xl font-bold text-gray-900">
                      {crmExpress.preco}
                    </span>
                    <span className="text-gray-500">{crmExpress.tipo}</span>
                  </div>
                  <p className="text-gray-600">Operação funcionando em {crmExpress.prazo}</p>
                </div>
                <a
                  href={WHATSAPP_PME}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand text-white font-semibold rounded-xl hover:bg-brand-hover transition-colors shadow-lg shadow-purple-500/20"
                >
                  Falar com especialista
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>

              <div className="border-t border-gray-100 pt-8">
                <p className="font-semibold text-gray-900 mb-4">O que está incluso:</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {crmExpress.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="text-center mt-8">
              <p className="text-gray-600 mb-4">
                Precisa de mais? Conheça também:
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/crm-express"
                  className="text-brand font-medium hover:underline"
                >
                  CRM Express (30 dias) →
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
