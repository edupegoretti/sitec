'use client'

import Image from 'next/image'
import { useState } from 'react'
import { X, ZoomIn } from 'lucide-react'
import { cn } from '@/lib/utils'

interface EvidenceCardProps {
  eyebrow?: string
  title: string
  caption: string
  imageSrc: string
  imageAlt: string
  eventDate?: string
  footnote?: string
  className?: string
}

export function EvidenceCard({
  eyebrow = 'Evidência externa',
  title,
  caption,
  imageSrc,
  imageAlt,
  eventDate,
  footnote,
  className,
}: EvidenceCardProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div
        className={cn(
          'rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm hover:shadow-card transition-shadow',
          className
        )}
      >
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="flex-1">
            <p className="text-sm font-medium tracking-wide text-brand">
              {eyebrow}
            </p>
            <h3 className="mt-2 text-xl sm:text-2xl font-bold text-gray-900">
              {title}
            </h3>
            <p className="mt-3 text-gray-600 leading-relaxed">
              {caption}
            </p>
            {eventDate && (
              <p className="mt-2 text-sm text-gray-500">
                {eventDate}
              </p>
            )}

            <button
              className="mt-4 inline-flex items-center gap-2 text-brand font-semibold hover:text-gray-900 transition-colors"
              onClick={() => setOpen(true)}
              type="button"
            >
              <ZoomIn className="w-4 h-4" />
              Ver imagem em tamanho real
            </button>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="hidden lg:block shrink-0 rounded-2xl border border-gray-200 overflow-hidden hover:border-gray-300 hover:shadow-card transition-all group"
            type="button"
            aria-label="Abrir evidência em tela cheia"
          >
            <div className="relative">
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={280}
                height={180}
                className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" />
              </div>
            </div>
          </button>

          {/* Mobile thumbnail */}
          <button
            onClick={() => setOpen(true)}
            className="lg:hidden rounded-2xl border border-gray-200 overflow-hidden"
            type="button"
            aria-label="Abrir evidência em tela cheia"
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={600}
              height={400}
              className="w-full h-auto object-cover"
            />
          </button>
        </div>

        {footnote && (
          <p className="mt-6 pt-4 border-t border-gray-100 text-sm text-gray-500">
            {footnote}
          </p>
        )}
      </div>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm p-4 sm:p-6 lg:p-10 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-5xl bg-white rounded-3xl p-4 sm:p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 mb-4">
              <div>
                <p className="font-semibold text-gray-900">{title}</p>
                {eventDate && (
                  <p className="text-sm text-gray-500">{eventDate}</p>
                )}
              </div>
              <button
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors"
                onClick={() => setOpen(false)}
                type="button"
              >
                <X className="w-4 h-4" />
                Fechar
              </button>
            </div>

            <div className="overflow-hidden rounded-2xl border border-gray-200">
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={1600}
                height={900}
                className="w-full h-auto"
              />
            </div>

            <p className="mt-4 text-sm text-gray-500">
              {caption}
            </p>
          </div>
        </div>
      )}
    </>
  )
}
