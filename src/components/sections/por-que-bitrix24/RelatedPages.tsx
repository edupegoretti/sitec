'use client'

import Link from 'next/link'
import { Container } from '@/components/layout'
import { Reveal } from '@/components/shared'
import { ArrowRight } from 'lucide-react'
import { UsersThree, Buildings, GitFork } from '@phosphor-icons/react'

interface RelatedPage {
  title: string
  description: string
  href: string
  icon: 'pme' | 'enterprise' | 'compare'
}

const ICON_MAP = {
  pme: UsersThree,
  enterprise: Buildings,
  compare: GitFork,
}

const RELATED_PAGES: RelatedPage[] = [
  {
    title: 'Para PMEs',
    description: 'Bitrix24 para equipes de 5-50 usuários. Foco em agilidade e custo-benefício.',
    href: '/bitrix24-para-pmes',
    icon: 'pme',
  },
  {
    title: 'Enterprise',
    description: 'Soluções para 50-5.000+ usuários. Segurança, compliance e escalabilidade.',
    href: '/bitrix24-enterprise',
    icon: 'enterprise',
  },
  {
    title: 'vs Outros CRMs',
    description: 'Comparativo detalhado com HubSpot, Salesforce, Pipedrive e outros.',
    href: '/bitrix24-vs-outros-crms',
    icon: 'compare',
  },
]

export function RelatedPages() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <Container>
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Continue explorando
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-lg text-gray-600">
              Encontre a solução ideal para o tamanho e necessidades da sua empresa.
            </p>
          </Reveal>
        </div>

        {/* Grid de paginas */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {RELATED_PAGES.map((page, idx) => {
            const Icon = ICON_MAP[page.icon]
            return (
              <Reveal key={page.href} delay={0.1 + idx * 0.1}>
                <Link
                  href={page.href}
                  className="group block p-6 rounded-2xl bg-gray-50 border border-gray-200/80 hover:border-brand/30 hover:bg-brand/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover h-full"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center mb-4 group-hover:bg-brand/20 transition-colors">
                    <Icon size={24} weight="duotone" className="text-brand" />
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-brand transition-colors">
                    {page.title}
                  </h3>

                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {page.description}
                  </p>

                  <span className="inline-flex items-center gap-2 text-sm font-medium text-brand group-hover:gap-3 transition-all">
                    Explorar
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
