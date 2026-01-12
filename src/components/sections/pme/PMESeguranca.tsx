'use client'

import Image from 'next/image'
import { Shield, Clock, Trophy, Handshake } from '@phosphor-icons/react'
import { Container } from '@/components/layout'
import { Badge, Reveal } from '@/components/shared'
import { ZOPU_STATS } from '@/lib/constants'

const SEGURANCA_ITEMS = [
  {
    icon: Clock,
    titulo: '365 dias de suporte',
    descricao: 'Suporte completo por 1 ano se você contratar a licença Bitrix24 com a Zopu',
    color: 'blue',
  },
  {
    icon: Shield,
    titulo: 'Contrato claro e simples',
    descricao: 'Sem letras miúdas, sem surpresas. Entregamos o que prometemos, ou seu dinheiro de volta',
    color: 'green',
  },
  {
    icon: Trophy,
    titulo: 'Bitrix24 com preço fixo em reais',
    descricao: 'Sem variação cambial, sem custos ocultos',
    color: 'purple',
  },
  {
    icon: Handshake,
    titulo: 'Treinamento até autonomia',
    descricao: 'Via Fluidz, até seu time dominar a ferramenta',
    color: 'amber',
  },
]

const COLOR_CLASSES = {
  blue: {
    bg: 'bg-blue-100',
    icon: 'text-blue-600',
    border: 'border-blue-200',
  },
  green: {
    bg: 'bg-green-100',
    icon: 'text-green-600',
    border: 'border-green-200',
  },
  purple: {
    bg: 'bg-brand/10',
    icon: 'text-brand',
    border: 'border-brand/20',
  },
  amber: {
    bg: 'bg-amber-100',
    icon: 'text-amber-600',
    border: 'border-amber-200',
  },
}

export function PMESeguranca() {
  return (
    <section className="py-20 sm:py-32 bg-white relative overflow-hidden">
      {/* Decorative blurred elements */}
      <div className="absolute top-20 right-0 w-80 h-80 bg-green-500/4 rounded-full translate-x-1/2 blur-3xl" />
      <div className="absolute bottom-20 left-0 w-72 h-72 bg-brand/4 rounded-full -translate-x-1/2 blur-3xl" />

      <Container>
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <Reveal>
            <Badge className="mb-4 bg-green-100 text-green-700">Sua segurança</Badge>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Você está em{' '}
              <span className="text-green-600">boas mãos</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Transparência total do início ao fim. Sem surpresas, sem letras miúdas.
            </p>
          </Reveal>
        </div>

        {/* Main content */}
        <div className="bg-linear-to-br from-gray-50 to-gray-100/80 rounded-3xl p-6 sm:p-8 lg:p-10 relative overflow-hidden shadow-card">
          {/* Stats destacados no topo */}
          <Reveal delay={0.3}>
            <div className="flex flex-wrap justify-center gap-6 sm:gap-10 mb-10 pb-10 border-b border-gray-200">
              <div className="text-center">
                <p className="text-4xl sm:text-5xl font-bold text-green-600">{ZOPU_STATS.retencao}</p>
                <p className="text-sm text-gray-500 mt-1">retenção anual</p>
              </div>
              <div className="hidden sm:block w-px h-16 bg-gray-300" />
              <div className="text-center">
                <p className="text-4xl sm:text-5xl font-bold text-gray-900">{ZOPU_STATS.clientes}</p>
                <p className="text-sm text-gray-500 mt-1">clientes ativos</p>
              </div>
              <div className="hidden sm:block w-px h-16 bg-gray-300" />
              <div className="text-center">
                <p className="text-4xl sm:text-5xl font-bold text-gray-900">{ZOPU_STATS.alunosFluidz}</p>
                <p className="text-sm text-gray-500 mt-1">profissionais certificados</p>
              </div>
            </div>
          </Reveal>

          {/* Cards de segurança */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-10">
            {SEGURANCA_ITEMS.map((item, index) => {
              const colors = COLOR_CLASSES[item.color as keyof typeof COLOR_CLASSES]
              const IconComponent = item.icon
              return (
                <Reveal key={item.titulo} delay={0.4 + index * 0.1}>
                  <div className={`bg-white rounded-2xl p-5 border ${colors.border} hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full`}>
                    <div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center mb-4`}>
                      <IconComponent size={24} weight="duotone" className={colors.icon} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{item.titulo}</h3>
                    <p className="text-sm text-gray-600">{item.descricao}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>

          {/* Certificações */}
          <Reveal delay={0.8}>
            <div className="pt-8 border-t border-gray-200">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-6 text-center">
                Certificações e credenciais
              </p>
              <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12">
                <Image
                  src="/images/bitrix24screen/gold-partner.png"
                  alt="Gold Partner Bitrix24"
                  width={80}
                  height={80}
                  className="w-16 h-16 sm:w-20 sm:h-20 object-contain grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100"
                />
                <Image
                  src="/images/bitrix24screen/aicpasoc2.webp"
                  alt="AICPA SOC 2 Type II"
                  width={80}
                  height={80}
                  className="w-16 h-16 sm:w-20 sm:h-20 object-contain grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100"
                />
                <Image
                  src="/images/bitrix24screen/pmp.webp"
                  alt="PMP Certified"
                  width={80}
                  height={80}
                  className="w-16 h-16 sm:w-20 sm:h-20 object-contain grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100"
                />
                <Image
                  src="/images/bitrix24screen/awscertified.webp"
                  alt="AWS Certified"
                  width={80}
                  height={80}
                  className="w-16 h-16 sm:w-20 sm:h-20 object-contain grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100"
                />
                <Image
                  src="/images/bitrix24screen/googlegenai.png"
                  alt="Google Gen AI"
                  width={80}
                  height={80}
                  className="w-16 h-16 sm:w-20 sm:h-20 object-contain grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100"
                />
              </div>
            </div>
          </Reveal>
        </div>

        {/* Mensagem de reforço */}
        <Reveal delay={0.9}>
          <div className="mt-10 text-center">
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              <span className="font-semibold text-gray-900">{ZOPU_STATS.retencao} dos nossos clientes renovam</span>{' '}
              — citados pela Bitrix24 como referência em retenção.
              <br />
              <span className="text-gray-500">Isso só acontece quando o cliente tem resultado real.</span>
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
