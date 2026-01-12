import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/layout'
import { Reveal } from '@/components/shared'
import { ZOPU_STATS } from '@/lib/constants'

// WhatsApp personalizado para página PME
const WHATSAPP_PME = 'https://wa.me/554733079280?text=Ol%C3%A1%2C%20vim%20da%20p%C3%A1gina%20Bitrix24%20para%20PMEs%20e%20gostaria%20de%20falar%20com%20um%20especialista.'

export function PMECTAFinal() {
  return (
    <section className="py-16 sm:py-24 bg-bg-dark">
      <Container>
        <Reveal>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Pronto para um CRM que funciona?
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Converse com um especialista e descubra como podemos transformar sua operação de
              receita em 30 dias.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={WHATSAPP_PME}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand text-white font-semibold rounded-xl hover:bg-brand-hover transition-all duration-300 shadow-elevated shadow-brand/30 hover:-translate-y-1"
              >
                Falar com especialista
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>

            {/* Stats compactos */}
            <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap justify-center gap-8 sm:gap-12">
              <div className="text-center">
                <p className="text-3xl font-bold text-white">{ZOPU_STATS.clientes}</p>
                <p className="text-sm text-gray-400">clientes</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-green-400">{ZOPU_STATS.retencao}</p>
                <p className="text-sm text-gray-400">retenção</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-white">{ZOPU_STATS.diasParaFuncionar}</p>
                <p className="text-sm text-gray-400">dias</p>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
