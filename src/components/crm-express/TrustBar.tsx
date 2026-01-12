'use client'

import Image from 'next/image'

// Logos selecionados para exibição compacta
const TRUST_LOGOS = [
  { name: 'WEG', src: '/images/clients/weg.webp', size: 'square' },
  { name: 'Stone', src: '/images/clients/stone.webp', size: 'medium' },
  { name: 'SBT', src: '/images/clients/sbt.webp', size: 'square' },
  { name: 'Komeco', src: '/images/clients/komeco.webp', size: 'medium' },
  { name: 'TS Shara', src: '/images/clients/ts-shara.webp', size: 'medium' },
  { name: 'Posthaus', src: '/images/clients/posthaus.webp', size: 'square' },
] as const

// Mapeamento de tamanhos
const sizeClasses = {
  square: 'h-8 sm:h-10',
  medium: 'h-6 sm:h-8',
  wide: 'h-5 sm:h-6',
  extrawide: 'h-4 sm:h-5',
} as const

export function TrustBar() {
  return (
    <div className="mt-12 pt-8 border-t border-gray-200">
      <p className="text-center text-xs text-gray-500 uppercase tracking-wider mb-6">
        Empresas que confiam na Zopu
      </p>

      {/* Container com overflow hidden para o carrossel */}
      <div className="relative overflow-hidden">
        {/* Gradientes de fade nas bordas - light mode */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-linear-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-linear-to-l from-white to-transparent z-10" />

        {/* Carrossel animado */}
        <div className="flex animate-scroll items-center">
          {/* Primeira cópia dos logos */}
          {TRUST_LOGOS.map((logo, index) => (
            <div
              key={`first-${index}`}
              className="shrink-0 mx-4 sm:mx-6 lg:mx-8 flex items-center"
            >
              <Image
                src={logo.src}
                alt={logo.name}
                width={150}
                height={45}
                className={`${sizeClasses[logo.size]} w-auto object-contain grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-300`}
              />
            </div>
          ))}
          {/* Segunda cópia para loop infinito */}
          {TRUST_LOGOS.map((logo, index) => (
            <div
              key={`second-${index}`}
              className="shrink-0 mx-4 sm:mx-6 lg:mx-8 flex items-center"
            >
              <Image
                src={logo.src}
                alt={logo.name}
                width={150}
                height={45}
                className={`${sizeClasses[logo.size]} w-auto object-contain grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-300`}
              />
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
