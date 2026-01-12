'use client'

import Image from 'next/image'
import { Container } from '@/components/layout'
import { Reveal } from '@/components/shared'
import { Check } from 'lucide-react'
import { Image as ImageIcon } from '@phosphor-icons/react'

interface ToolCategory {
  id: string
  nome: string
  icone: string
  headline: string
  subtitulo: string
  descricao: string
  ferramentas: readonly string[]
  beneficios: readonly string[]
  cor: string
  screenshotPlaceholder: string
}

interface CategorySectionAProps {
  category: ToolCategory
  imagePosition?: 'left' | 'right'
  background?: 'white' | 'gray'
  /** URL da imagem real do Bitrix24. Se nao fornecida, mostra placeholder */
  imageSrc?: string
}

export function CategorySectionA({
  category,
  imagePosition = 'left',
  background = 'white',
  imageSrc,
}: CategorySectionAProps) {
  const isImageLeft = imagePosition === 'left'
  const bgClass = background === 'white' ? 'bg-white' : 'bg-linear-to-b from-gray-50 to-white'

  return (
    <section className={`py-16 sm:py-24 lg:py-32 ${bgClass} relative overflow-hidden`} id={category.id}>
      {/* Decorative blur elements - seguindo design system */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none"
        style={{ backgroundColor: `${category.cor}05` }}
      />
      <div
        className="absolute bottom-0 left-0 w-64 h-64 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl pointer-events-none"
        style={{ backgroundColor: `${category.cor}03` }}
      />

      <Container className={imageSrc ? 'max-w-7xl' : ''}>
        <div className="relative z-10">
          <div className={`grid gap-12 lg:gap-16 items-center ${
            imageSrc
              ? (isImageLeft ? 'lg:grid-cols-[1.2fr_1fr]' : 'lg:grid-cols-[1fr_1.2fr]')
              : 'lg:grid-cols-2'
          }`}>
            {/* Area de Imagem/Screenshot */}
            <Reveal
              direction={isImageLeft ? 'left' : 'right'}
              className={isImageLeft ? 'lg:order-1' : 'lg:order-2'}
            >
              <div className="relative">
                {/* Container com gradiente sutil */}
                <div
                  className="rounded-3xl p-3 sm:p-4 shadow-card relative overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${category.cor}10 0%, ${category.cor}05 100%)`
                  }}
                >
                  {imageSrc ? (
                    /* Imagem real do Bitrix24 - proporcao original */
                    <div className="relative rounded-2xl overflow-hidden bg-white shadow-sm">
                      <Image
                        src={imageSrc}
                        alt={`Screenshot ${category.nome} - Bitrix24`}
                        width={800}
                        height={600}
                        className="w-full h-auto"
                        style={{ maxWidth: '100%', height: 'auto' }}
                      />
                    </div>
                  ) : (
                    /* Placeholder para screenshot */
                    <div
                      className="relative aspect-4/3 rounded-2xl overflow-hidden bg-white border-2 border-dashed flex flex-col items-center justify-center gap-4"
                      style={{ borderColor: `${category.cor}30` }}
                    >
                      {/* Icone placeholder */}
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center"
                        style={{ backgroundColor: `${category.cor}10` }}
                      >
                        <ImageIcon
                          size={32}
                          weight="duotone"
                          style={{ color: category.cor }}
                        />
                      </div>

                      {/* Texto do placeholder */}
                      <div className="text-center px-4">
                        <p
                          className="text-sm font-semibold mb-1"
                          style={{ color: category.cor }}
                        >
                          Screenshot {category.nome}
                        </p>
                        <p className="text-xs text-gray-400">
                          {category.screenshotPlaceholder}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Reveal>

            {/* Conteudo de texto */}
            <Reveal
              direction={isImageLeft ? 'right' : 'left'}
              delay={0.1}
              className={isImageLeft ? 'lg:order-2' : 'lg:order-1'}
            >
              <div>
                {/* Label da categoria - design system caption */}
                <p
                  className="text-xs font-semibold uppercase tracking-widest mb-4"
                  style={{ color: category.cor }}
                >
                  {category.nome}
                </p>

                {/* Headline - design system H1 */}
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-[1.1] tracking-tight">
                  {category.headline}
                </h2>

                {/* Descricao - design system body large */}
                <p className="text-lg sm:text-xl text-gray-600 mb-10 leading-relaxed">
                  {category.descricao}
                </p>

                {/* Lista de ferramentas em grid */}
                <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4 mb-10">
                  {category.ferramentas.map((ferramenta, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 group"
                    >
                      <div
                        className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-all duration-300 ease-out-expo group-hover:scale-110"
                        style={{ backgroundColor: `${category.cor}12` }}
                      >
                        <Check
                          className="w-3.5 h-3.5"
                          style={{ color: category.cor }}
                          strokeWidth={3}
                        />
                      </div>
                      <span className="text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors duration-300">
                        {ferramenta}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Beneficios em pills - com hover effect */}
                <div className="flex flex-wrap gap-3">
                  {category.beneficios.map((beneficio, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2.5 text-sm font-medium rounded-xl border transition-all duration-300 ease-out-expo hover:-translate-y-0.5 hover:shadow-sm cursor-default"
                      style={{
                        backgroundColor: `${category.cor}08`,
                        borderColor: `${category.cor}20`,
                        color: category.cor,
                      }}
                    >
                      {beneficio}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}
