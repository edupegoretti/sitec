'use client'

import { TrendUp } from '@phosphor-icons/react'
import { Reveal } from '@/components/shared'
import { CASE_DESTAQUE } from '@/lib/constants'

export function CaseDestaque() {
  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      {/* Conteúdo */}
      <Reveal>
        <div>
          {/* Desafio */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              O desafio
            </h3>
            <p className="text-gray-600">
              {CASE_DESTAQUE.desafio.descricao}
            </p>
          </div>

          {/* Solução */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              A solução
            </h3>
            <p className="text-gray-600 mb-4">
              {CASE_DESTAQUE.solucao.descricao}
            </p>
            <ul className="space-y-2">
              {CASE_DESTAQUE.solucao.entregas.map((entrega) => (
                <li
                  key={entrega}
                  className="flex items-start gap-2 text-sm text-gray-600"
                >
                  <span className="text-green-500 mt-1">✓</span>
                  {entrega}
                </li>
              ))}
            </ul>
          </div>

          {/* Métrica principal */}
          <div className="bg-green-50 rounded-xl p-6 mb-6">
            <div className="flex items-center gap-3">
              <TrendUp size={40} weight="duotone" className="text-green-500" />
              <div>
                <p className="text-5xl font-bold text-green-600">
                  {CASE_DESTAQUE.resultado.metricaPrincipal}
                </p>
                <p className="text-lg text-gray-700">
                  {CASE_DESTAQUE.resultado.metricaLabel}
                </p>
              </div>
            </div>
          </div>

          {/* Depoimento */}
          <blockquote className="border-l-4 border-brand pl-4">
            <p className="text-lg text-gray-700 italic">
              &quot;{CASE_DESTAQUE.depoimento.texto}&quot;
            </p>
            <footer className="text-sm text-gray-500 mt-2">
              — {CASE_DESTAQUE.depoimento.autor},{' '}
              {CASE_DESTAQUE.depoimento.cargo}
            </footer>
          </blockquote>
        </div>
      </Reveal>

      {/* Vídeo Embed */}
      <Reveal delay={0.2}>
        <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl">
          <iframe
            src="https://www.youtube.com/embed/IhrMZZRuH54?autoplay=1&mute=1&loop=1&playlist=IhrMZZRuH54&rel=0"
            title="Case Ferro em Brasa - Depoimento"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>
        <p className="text-sm text-gray-500 text-center mt-3">
          {CASE_DESTAQUE.contato}, {CASE_DESTAQUE.cargo} da {CASE_DESTAQUE.empresa}
        </p>
      </Reveal>
    </div>
  )
}
