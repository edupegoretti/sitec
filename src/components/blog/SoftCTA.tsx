import Link from 'next/link'
import { BookOpen, MessageCircle } from 'lucide-react'

import { Reveal } from '@/components/shared'
import { cn } from '@/lib/utils'

type Props = {
  className?: string
}

const WHATSAPP_BLOG =
  'https://wa.me/554733079280?text=Oi!%20Vi%20o%20conte%C3%BAdo%20de%20voc%C3%AAs%20e%20queria%20entender%20mais.'

export function SoftCTA({ className }: Props) {
  return (
    <Reveal className={className}>
      <div className="rounded-3xl bg-linear-to-br from-gray-50 to-gray-100/50 border border-gray-200 p-8 lg:p-12">
        <div className="max-w-2xl mx-auto text-center">
          {/* Título gentil, sem pressão */}
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
            Quer continuar explorando?
          </h2>

          <p className="mt-4 text-gray-600 text-lg">
            Escolha o caminho que faz mais sentido para você agora.
          </p>

          {/* Opções de baixo para alto compromisso */}
          <div className="mt-10 grid sm:grid-cols-2 gap-4 max-w-xl mx-auto">
            {/* Opção 1: Mais conteúdo (zero compromisso) */}
            <Link
              href="/recursos"
              className="group flex items-center gap-4 p-5 rounded-2xl bg-white border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 text-left"
            >
              <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center shrink-0 group-hover:bg-brand/20 transition-colors">
                <BookOpen className="w-6 h-6 text-brand" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 group-hover:text-brand transition-colors">
                  Ver mais conteúdos
                </h3>
                <p className="text-sm text-gray-500 mt-0.5">Guias, templates e recursos</p>
              </div>
            </Link>

            {/* Opção 2: Conversar (só se quiser) */}
            <a
              href={WHATSAPP_BLOG}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-5 rounded-2xl bg-white border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 text-left"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0 group-hover:bg-emerald-100 transition-colors">
                <MessageCircle className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
                  Tirar uma dúvida
                </h3>
                <p className="text-sm text-gray-500 mt-0.5">Sem compromisso, só conversar</p>
              </div>
            </a>
          </div>

          {/* Nota de respeito */}
          <p className="mt-8 text-sm text-gray-400">
            Você decide quando e se quer conversar. Estamos aqui quando fizer sentido.
          </p>
        </div>
      </div>
    </Reveal>
  )
}
