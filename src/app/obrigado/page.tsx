import { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/layout'
import { CheckCircle, Clock, ArrowRight, Play } from '@phosphor-icons/react/dist/ssr'
import { ZOPU_STATS, ZOPU_LINKS } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Obrigado pelo Contato — Zopu',
  description: 'Recebemos seu contato e em breve um especialista entrará em contato com você.',
  robots: 'noindex, nofollow',
}

export default function ObrigadoPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#F9FAFC] to-white pt-24 pb-16">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full">
              <CheckCircle size={48} weight="duotone" className="text-green-600" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Obrigado pelo contato!
          </h1>

          <p className="text-lg text-gray-600 mb-8">
            Recebemos sua mensagem. Um de nossos especialistas entrará em contato em breve
            para entender seu cenário e indicar o melhor caminho.
          </p>

          {/* Next Steps */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 mb-8 text-left">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Clock size={24} weight="duotone" className="text-brand" />
              Próximos passos
            </h2>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-brand/10 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-brand">1</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Análise do seu cenário</p>
                  <p className="text-sm text-gray-600">
                    Nosso time irá revisar sua mensagem e preparar uma análise inicial.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-brand/10 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-brand">2</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Contato em até 24h úteis</p>
                  <p className="text-sm text-gray-600">
                    Um especialista entrará em contato via WhatsApp ou telefone.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-brand/10 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-brand">3</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Conversa de 20 minutos</p>
                  <p className="text-sm text-gray-600">
                    Vamos entender seu processo comercial e indicar o caminho mais seguro.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Case Study Link */}
          <div className="bg-gradient-to-r from-brand/5 to-purple-500/5 rounded-2xl p-6 sm:p-8 mb-8 text-left border border-brand/10">
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              Enquanto isso, veja como a Ferro em Brasa aumentou 20% a conversão
            </h3>
            <p className="text-gray-600 mb-4">
              Descubra como estruturamos a operação de pré-vendas, vendas e pós-vendas
              para um e-commerce de identificação bovina.
            </p>
            <a
              href="https://youtu.be/IhrMZZRuH54"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-brand font-semibold hover:underline"
            >
              <Play size={20} weight="duotone" />
              Assistir depoimento do João
            </a>
          </div>

          {/* Trust Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-8 py-6 border-t border-b border-gray-100">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{ZOPU_STATS.clientes}</p>
              <p className="text-sm text-gray-500">clientes ativos</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{ZOPU_STATS.retencao}</p>
              <p className="text-sm text-gray-500">taxa de retenção</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{ZOPU_STATS.diasParaFuncionar}</p>
              <p className="text-sm text-gray-500">dias para funcionar</p>
            </div>
          </div>

          {/* Back to Home */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand text-white font-semibold rounded-xl hover:bg-brand-hover transition-colors"
            >
              Voltar para a home
              <ArrowRight size={20} />
            </Link>
            <a
              href={ZOPU_LINKS.fluidz}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-700 font-semibold rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              Conhecer a Fluidz Academy
            </a>
          </div>
        </div>
      </Container>
    </main>
  )
}
