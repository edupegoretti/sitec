'use client'

import { useState } from 'react'
import { FooterV1 } from './variants/FooterV1'
import { FooterV2 } from './variants/FooterV2'
import { FooterV3 } from './variants/FooterV3'
import { FooterV4 } from './variants/FooterV4'
import { FooterV5 } from './variants/FooterV5'

const variants = [
  { id: 1, name: 'Ultra-Minimal', description: 'Máximo espaço negativo, tipografia como elemento principal' },
  { id: 2, name: 'Statement CTA', description: 'CTA de WhatsApp como protagonista, links secundários' },
  { id: 3, name: 'Editorial', description: 'Layout assimétrico inspirado em revistas premium' },
  { id: 4, name: 'Compact Premium', description: 'Densidade alta com hierarquia clara e elegante' },
  { id: 5, name: 'Bold Asymmetric', description: 'Elementos gráficos marcantes com grid quebrado' },
]

export default function DesignLabPage() {
  const [activeVariant, setActiveVariant] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Design Lab</h1>
              <p className="text-sm text-gray-500">Footer — 5 variações para comparar</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveVariant(null)}
                className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                  activeVariant === null
                    ? 'bg-brand text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Ver todas
              </button>
              {variants.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setActiveVariant(v.id)}
                  className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                    activeVariant === v.id
                      ? 'bg-brand text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  V{v.id}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Variants Grid */}
      <div className="max-w-[1800px] mx-auto p-6">
        {activeVariant === null ? (
          <div className="grid grid-cols-1 gap-8">
            {variants.map((variant) => (
              <div key={variant.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-mono text-brand bg-brand/10 px-2 py-1 rounded">
                      V{variant.id}
                    </span>
                    <h2 className="text-lg font-semibold text-gray-900 mt-1">{variant.name}</h2>
                    <p className="text-sm text-gray-500">{variant.description}</p>
                  </div>
                  <button
                    onClick={() => setActiveVariant(variant.id)}
                    className="text-sm text-brand hover:underline"
                  >
                    Ver em tela cheia →
                  </button>
                </div>
                <div className="overflow-hidden">
                  {variant.id === 1 && <FooterV1 />}
                  {variant.id === 2 && <FooterV2 />}
                  {variant.id === 3 && <FooterV3 />}
                  {variant.id === 4 && <FooterV4 />}
                  {variant.id === 5 && <FooterV5 />}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-brand bg-brand/10 px-2 py-1 rounded">
                  V{activeVariant}
                </span>
                <h2 className="text-lg font-semibold text-gray-900 mt-1">
                  {variants.find((v) => v.id === activeVariant)?.name}
                </h2>
                <p className="text-sm text-gray-500">
                  {variants.find((v) => v.id === activeVariant)?.description}
                </p>
              </div>
              <button
                onClick={() => setActiveVariant(null)}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                ← Voltar para todas
              </button>
            </div>
            <div>
              {activeVariant === 1 && <FooterV1 />}
              {activeVariant === 2 && <FooterV2 />}
              {activeVariant === 3 && <FooterV3 />}
              {activeVariant === 4 && <FooterV4 />}
              {activeVariant === 5 && <FooterV5 />}
            </div>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="fixed bottom-6 right-6 bg-gray-900 text-white px-4 py-3 rounded-xl shadow-xl max-w-sm">
        <p className="text-sm font-medium">💡 Dica</p>
        <p className="text-xs text-gray-300 mt-1">
          Analise cada variação e me diga o que funciona em cada uma. Vou sintetizar o melhor de cada.
        </p>
      </div>
    </div>
  )
}
