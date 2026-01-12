'use client'

import Image from 'next/image'
import { Container } from '@/components/layout'
import { Badge, Reveal } from '@/components/shared'
import { Trophy } from '@phosphor-icons/react'
import { ZOPU_STATS, ZOPU_RECONHECIMENTO } from '@/lib/constants'

export function CRORecognitionSection() {
  return (
    <section className="py-16 sm:py-24 bg-[#F9FAFC] relative overflow-hidden">
      {/* Decorative blurred elements */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-brand/4 rounded-full -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-56 h-56 bg-amber-500/3 rounded-full translate-y-1/2 blur-3xl" />

      <Container>
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <Reveal>
            <Badge className="mb-6">
              Reconhecimento Bitrix24
            </Badge>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              A Bitrix24 nos reconhece como exemplo.{' '}
              <span className="text-brand">Nossos clientes também.</span>
            </h2>
          </Reveal>
        </div>

        {/* Imagem centralizada com destaque */}
        <Reveal delay={0.2}>
          <div className="max-w-3xl mx-auto mb-10 sm:mb-14 bg-linear-to-br from-gray-100 to-gray-200/80 rounded-3xl p-4 sm:p-6 lg:p-8 shadow-card">
            <div className="relative">
              {/* Badge flutuante */}
              <div className="absolute -top-3 -right-3 sm:right-4 z-10">
                <div className="flex items-center gap-2 bg-brand rounded-full px-3 py-1.5 shadow-lg shadow-brand/30">
                  <Trophy size={16} weight="duotone" className="text-white" />
                  <span className="text-xs font-bold text-white">
                    Partner Summit 2025
                  </span>
                </div>
              </div>

              {/* Imagem do CRO */}
              <div className="relative rounded-2xl overflow-hidden border border-gray-200/80 shadow-elevated">
                <Image
                  src="/images/cro-bitrix24.jpg"
                  alt="CRO da Bitrix24 reconhecendo a Zopu no evento de parceiros"
                  width={800}
                  height={500}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>

              {/* Legenda */}
              <p className="text-gray-500 text-sm mt-4 text-center">
                Evento de Parceiros Bitrix24 Brasil • {ZOPU_RECONHECIMENTO.periodo}
              </p>
            </div>
          </div>
        </Reveal>

        {/* Texto explicativo (paráfrase, sem aspas) */}
        <Reveal delay={0.3}>
          <div className="max-w-2xl mx-auto text-center mb-10 sm:mb-14">
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
              No evento anual de parceiros, a Bitrix24 reconheceu a Zopu como{' '}
              <strong className="text-brand">exemplo a ser seguido</strong>, por manter{' '}
              <strong className="text-gray-900">96% de retenção anual</strong> — sinal de CRM
              vivo, uso contínuo e governança real. Nossa metodologia prioriza adoção e
              resultados.
            </p>
          </div>
        </Reveal>

        {/* Stats reais */}
        <Reveal delay={0.4}>
          <div className="grid grid-cols-3 gap-4 sm:gap-6 max-w-2xl mx-auto">
            {/* Stat: Clientes */}
            <div className="text-center p-5 rounded-2xl bg-white border border-gray-200/80 hover:border-gray-300 shadow-sm hover:shadow-card-hover transition-all duration-300 ease-out-expo hover:-translate-y-1">
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">{ZOPU_STATS.clientes}</p>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">clientes ativos</p>
            </div>

            {/* Stat: Parceiro desde */}
            <div className="text-center p-5 rounded-2xl bg-white border border-gray-200/80 hover:border-gray-300 shadow-sm hover:shadow-card-hover transition-all duration-300 ease-out-expo hover:-translate-y-1">
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">2021</p>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">parceiro oficial</p>
            </div>

            {/* Stat: Taxa de retenção */}
            <div className="text-center p-5 rounded-2xl bg-white border border-brand/30 hover:border-brand/50 shadow-sm hover:shadow-card-hover transition-all duration-300 ease-out-expo hover:-translate-y-1">
              <p className="text-2xl sm:text-3xl font-bold text-brand">{ZOPU_STATS.retencao}</p>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">taxa de retenção</p>
            </div>
          </div>
        </Reveal>

        {/* Verificar credenciais */}
        <Reveal delay={0.5}>
          <div className="mt-12 sm:mt-16 pt-10 border-t border-gray-200">
            <div className="flex items-center justify-center mb-8">
              <p className="text-xs text-gray-500 uppercase tracking-wider">
                Certificações e credenciais
              </p>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-10 sm:gap-14">
              <a
                href="https://www.bitrix24.com.br/partners/brazil/1892406/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-105 transition-transform"
              >
                <Image
                  src="/images/bitrix24screen/gold-partner.png"
                  alt="Gold Partner Bitrix24 - Verificar"
                  width={128}
                  height={128}
                  className="w-28 h-28 sm:w-32 sm:h-32 object-contain"
                />
              </a>
              <Image
                src="/images/bitrix24screen/aicpasoc2.webp"
                alt="AICPA SOC 2 Type II"
                width={128}
                height={128}
                className="w-28 h-28 sm:w-32 sm:h-32 object-contain hover:scale-105 transition-transform"
              />
              <Image
                src="/images/bitrix24screen/pmp.webp"
                alt="PMP Certified"
                width={128}
                height={128}
                className="w-28 h-28 sm:w-32 sm:h-32 object-contain hover:scale-105 transition-transform"
              />
              <Image
                src="/images/bitrix24screen/awscertified.webp"
                alt="AWS Certified"
                width={128}
                height={128}
                className="w-28 h-28 sm:w-32 sm:h-32 object-contain hover:scale-105 transition-transform"
              />
              <Image
                src="/images/bitrix24screen/googlegenai.png"
                alt="Google Gen AI"
                width={128}
                height={128}
                className="w-28 h-28 sm:w-32 sm:h-32 object-contain hover:scale-105 transition-transform"
              />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
