'use client'

import { cn } from '@/lib/utils'
import { Reveal, Badge, Button } from '@/components/shared'
import { Check } from 'lucide-react'
import { ZOPU_LINKS } from '@/lib/constants'

interface Product {
  readonly id: string
  readonly nome: string
  readonly subtitulo: string
  readonly para: string
  readonly preco: string
  readonly tipo: string
  readonly prazo: string
  readonly destaque?: boolean
  readonly features: readonly string[]
}

interface ProductCardProps {
  product: Product
  className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-2xl border border-gray-200/80 overflow-hidden h-full flex flex-col',
        'shadow-sm hover:shadow-card-hover transition-all duration-300 ease-out-expo hover:-translate-y-1',
        'hover:border-gray-300',
        product.destaque && 'ring-2 ring-brand/20 border-brand/30',
        className
      )}
    >
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-900">{product.nome}</h3>
          {product.destaque && (
            <Badge variant="success" className="text-xs">
              Mais popular
            </Badge>
          )}
        </div>
        <p className="text-gray-600 text-sm leading-relaxed">{product.para}</p>
      </div>

      {/* Preço */}
      <div className="px-6 py-6 bg-linear-to-br from-gray-50 to-gray-100/50">
        <div className="flex items-baseline gap-1">
          <span className="text-sm text-gray-500">R$</span>
          <span className="text-4xl font-bold text-gray-900">
            {product.preco.replace('R$ ', '')}
          </span>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          {product.tipo} • {product.prazo}
        </p>
      </div>

      {/* Features */}
      <div className="px-6 py-6 grow">
        <ul className="space-y-3">
          {product.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3 h-3 text-green-600" />
              </div>
              <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <div className="px-6 pb-6 mt-auto">
        <Button href={ZOPU_LINKS.whatsappEspecialista} external className="w-full">
          Falar com especialista
        </Button>
      </div>
    </div>
  )
}

interface ProductGridProps {
  products: readonly Product[]
  className?: string
}

export function ProductGrid({ products, className }: ProductGridProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8',
        className
      )}
    >
      {products.map((product, index) => (
        <Reveal key={product.id} delay={index * 0.1}>
          <ProductCard product={product} />
        </Reveal>
      ))}
    </div>
  )
}
