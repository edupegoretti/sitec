'use client'

import { motion } from 'framer-motion'
import { Check, Clock, GitBranch, Map, GraduationCap, MessageCircle, Headphones } from 'lucide-react'
import { Container } from '@/components/layout'
import { Reveal } from '@/components/shared'
import { ZOPU_STATS } from '@/lib/constants'

const DIFERENCIAIS_ZOPU = [
  {
    icon: Clock,
    titulo: 'Implementação estruturada',
    descricao: 'CRM Express em até 30 dias, RevOps Launch™ em até 60 dias, ou prazo personalizado para projetos complexos.',
    cor: '#635BFF',
  },
  {
    icon: GitBranch,
    titulo: 'Processo antes da ferramenta',
    descricao: 'Desenhamos seu funil, mapeamos processos e definimos regras antes de configurar qualquer coisa.',
    cor: '#00A67E',
  },
  {
    icon: Map,
    titulo: 'Diagnóstico completo de jornada',
    descricao: 'Mapeamento de ponta a ponta: do primeiro contato até a recompra, com gaps identificados.',
    cor: '#F59E0B',
  },
  {
    icon: GraduationCap,
    titulo: 'Fluidz: adoção estruturada',
    descricao: `Plataforma própria com ${ZOPU_STATS.alunosFluidz} profissionais certificados. Trilhas por função, não treinamento genérico.`,
    cor: '#EC4899',
  },
  {
    icon: MessageCircle,
    titulo: 'WhatsApp governado',
    descricao: 'WhatsZopu com API oficial Meta. Histórico completo, responsáveis definidos e SLAs configurados.',
    cor: '#3B82F6',
  },
  {
    icon: Headphones,
    titulo: 'Suporte com SLA contratual',
    descricao: `1ª resposta: Enterprise ${ZOPU_STATS.slaEnterprise}, demais planos ${ZOPU_STATS.slaDemais}. Canal direto via WhatsApp.`,
    cor: '#8B5CF6',
  },
]

const customEase: [number, number, number, number] = [0.16, 1, 0.3, 1]

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.15 + i * 0.08,
      duration: 0.5,
      ease: customEase,
    },
  }),
}

export function ComparativoModerno() {
  return (
    <section className="py-20 sm:py-28 bg-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand/2 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-green-500/3 rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl" />

      <Container className="relative">
        {/* Header */}
        <div className="text-center mb-16">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand/10 border border-brand/20 rounded-full mb-6">
              <span className="text-sm font-semibold text-brand">Por que a Zopu</span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              O que faz a <span className="text-brand">diferença</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Não prometemos — entregamos. Cada diferencial abaixo é parte da nossa metodologia.
            </p>
          </Reveal>
        </div>

        {/* Benefits Grid */}
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DIFERENCIAIS_ZOPU.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.titulo}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-50px' }}
                  variants={cardVariants}
                >
                  <div className="h-full bg-gray-50 hover:bg-white rounded-2xl p-6 border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300">
                    {/* Icon */}
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                      style={{ backgroundColor: `${item.cor}15` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: item.cor }} />
                    </div>

                    {/* Content */}
                    <h3 className="font-bold text-gray-900 mb-2">{item.titulo}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.descricao}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Bottom highlight */}
        <Reveal delay={0.6}>
          <div className="mt-16 max-w-3xl mx-auto">
            <div className="bg-linear-to-r from-brand/10 to-green-500/10 rounded-2xl p-8 border border-brand/20">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 text-center">
                <div>
                  <p className="text-4xl sm:text-5xl font-bold text-brand mb-1">{ZOPU_STATS.clientes}</p>
                  <p className="text-sm text-gray-600">clientes ativos</p>
                </div>
                <div className="hidden sm:block w-px h-12 bg-gray-200" />
                <div>
                  <p className="text-4xl sm:text-5xl font-bold text-brand mb-1">{ZOPU_STATS.alunosFluidz}</p>
                  <p className="text-sm text-gray-600">certificados Fluidz</p>
                </div>
                <div className="hidden sm:block w-px h-12 bg-gray-200" />
                <div>
                  <p className="text-4xl sm:text-5xl font-bold text-green-600 mb-1">{ZOPU_STATS.integracoes}</p>
                  <p className="text-sm text-gray-600">integrações prontas</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
