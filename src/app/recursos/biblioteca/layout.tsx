import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/layout'
import { Badge, Reveal } from '@/components/shared'
import { LibraryTabs } from '@/components/resources/LibraryTabs'

export default function BibliotecaLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="pt-20 lg:pt-24">
      <section className="py-12 sm:py-16 bg-linear-to-b from-gray-50 to-white border-b border-gray-100">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <Reveal>
              <Badge className="mb-6">Biblioteca</Badge>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Materiais ricos</h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Conteúdos abertos em vídeo (sem captura) para ajudar você a tomar decisões melhores sobre processo,
                adoção e governança.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-6">
                <Link
                  href="/recursos"
                  className="inline-flex items-center gap-2 text-brand font-semibold hover:text-brand-hover transition-colors"
                >
                  Voltar para Recursos
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.35}>
              <LibraryTabs />
            </Reveal>
          </div>
        </Container>
      </section>

      {children}
    </main>
  )
}

