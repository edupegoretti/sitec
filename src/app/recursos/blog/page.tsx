import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/layout'
import { Badge, Reveal } from '@/components/shared'

export const metadata: Metadata = {
  title: 'Blog | Zopu',
  description:
    'Artigos e guias práticos sobre Bitrix24, CRM e operação de receita — com foco em adoção, processo e governança.',
  alternates: {
    canonical: '/recursos/blog',
  },
  openGraph: {
    title: 'Blog | Zopu',
    description:
      'Artigos e guias práticos sobre Bitrix24, CRM e operação de receita — com foco em adoção, processo e governança.',
  },
}

export default function RecursosBlogPage() {
  return (
    <main className="pt-20 lg:pt-24">
      <section className="py-16 sm:py-24 bg-linear-to-b from-gray-50 to-white">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <Reveal>
              <Badge className="mb-6">Blog</Badge>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Artigos e guias</h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
                Estamos estruturando o blog dentro do site (com categorias, busca e páginas de autor) para virar um
                repositório sólido de conteúdo.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/recursos/biblioteca"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand text-white font-semibold rounded-xl hover:bg-brand-hover transition-colors"
                >
                  Explorar a Biblioteca agora
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/recursos"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-700 border border-gray-200 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Voltar para Recursos
                </Link>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <Container variant="medium">
          <Reveal>
            <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-gray-900">O que vai entrar aqui</h2>
              <p className="text-gray-600 mt-3">
                Artigos curtos (decisões e boas práticas) e guias mais longos (checklists e playbooks). Tudo aberto,
                sem “captura de lead” no meio do caminho.
              </p>
              <div className="mt-6">
                <Link
                  href="/recursos/biblioteca/zopucast"
                  className="inline-flex items-center gap-2 text-brand font-semibold hover:text-brand-hover transition-colors"
                >
                  Enquanto isso, comece pelo Zopucast
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </main>
  )
}

