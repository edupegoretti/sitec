'use client'

import { Check } from 'lucide-react'
import { ChatCircle, Plug, GraduationCap } from '@phosphor-icons/react'
import { Container } from '@/components/layout'
import { SectionHeader, Reveal } from '@/components/shared'
import { WHATSZOPU, INTEGRACOES_DESTAQUE, FLUIDZ_COMPLETO } from '@/lib/constants'

export function DiferenciaisSection() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Decorative blurred elements */}
      <div className="absolute top-20 right-0 w-64 h-64 bg-green-500/3 rounded-full translate-x-1/2 blur-3xl" />
      <div className="absolute bottom-20 left-0 w-56 h-56 bg-brand/3 rounded-full -translate-x-1/2 blur-3xl" />

      <Container>
        <SectionHeader
          label="Vá muito além do Bitrix24"
          title="Temos um pacote único de benefícios para ajudar a você a ir mais rápido, mais longe e com resultados reais"
        />

        <div className="bg-linear-to-br from-gray-50 to-gray-100/80 rounded-3xl p-4 sm:p-6 lg:p-8 relative overflow-hidden shadow-card">
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {/* WhatsZopu */}
          <Reveal>
            <div className="bg-white rounded-2xl p-6 border border-gray-200/80 hover:border-gray-300 h-full shadow-sm hover:shadow-card-hover transition-all duration-300 ease-out-expo hover:-translate-y-1">
              {/* Card header */}
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                <div className="w-11 h-11 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
                  <ChatCircle size={20} weight="duotone" className="text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{WHATSZOPU.nome}</h3>
                  <p className="text-sm text-gray-500">WhatsApp oficial integrado</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4 leading-relaxed">{WHATSZOPU.descricao}</p>
              <ul className="space-y-2.5">
                {WHATSZOPU.diferenciais.map((d) => (
                  <li
                    key={d}
                    className="flex items-center gap-2.5 text-sm text-gray-600"
                  >
                    <Check className="w-4 h-4 text-green-500 shrink-0" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* 100+ Integrações */}
          <Reveal delay={0.1}>
            <div className="bg-white rounded-2xl p-6 border border-gray-200/80 hover:border-gray-300 h-full shadow-sm hover:shadow-card-hover transition-all duration-300 ease-out-expo hover:-translate-y-1">
              {/* Card header */}
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                <div className="w-11 h-11 bg-brand/10 rounded-xl flex items-center justify-center shrink-0">
                  <Plug size={20} weight="duotone" className="text-brand" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">100+ Integrações</h3>
                  <p className="text-sm text-gray-500">Conecte suas ferramentas</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Conectamos com as ferramentas que você já usa
              </p>
              <div className="flex flex-wrap gap-2">
                {INTEGRACOES_DESTAQUE.slice(0, 6).map((i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1.5 bg-gray-100 rounded-lg text-xs text-gray-600 font-medium"
                  >
                    {i}
                  </span>
                ))}
                <span className="px-2.5 py-1.5 bg-brand/10 rounded-lg text-xs text-brand font-semibold">
                  +{INTEGRACOES_DESTAQUE.length - 6 + 90} outras
                </span>
              </div>
            </div>
          </Reveal>

          {/* Fluidz */}
          <Reveal delay={0.2}>
            <div className="bg-white rounded-2xl p-6 border border-gray-200/80 hover:border-gray-300 h-full shadow-sm hover:shadow-card-hover transition-all duration-300 ease-out-expo hover:-translate-y-1">
              {/* Card header */}
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                <div className="w-11 h-11 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                  <GraduationCap size={20} weight="duotone" className="text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{FLUIDZ_COMPLETO.nome}</h3>
                  <p className="text-sm text-gray-500">Treinamento especializado</p>
                </div>
              </div>
              <p className="text-gray-600 mb-2 leading-relaxed">
                <span className="font-bold text-brand">
                  {FLUIDZ_COMPLETO.alunos}
                </span>{' '}
                profissionais certificados
              </p>
              <p className="text-sm text-gray-500 mb-4">
                {FLUIDZ_COMPLETO.diferenciais[0]}
              </p>
              <ul className="space-y-1.5">
                {FLUIDZ_COMPLETO.diferenciais.slice(1, 4).map((d) => (
                  <li key={d} className="text-sm text-gray-600 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand/40" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}
