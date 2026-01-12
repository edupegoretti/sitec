'use client'

import { Container } from '@/components/layout'
import { Badge, Reveal } from '@/components/shared'
import { Shield, Clock, Lock, ExternalLink } from 'lucide-react'
import { ZOPU_STATS } from '@/lib/constants'
import Link from 'next/link'

const TRUST_ITEMS = [
  {
    icon: Shield,
    titulo: 'LGPD Compliance',
    descricao: 'Práticas de segurança e proteção de dados pessoais.',
  },
  {
    icon: Clock,
    titulo: 'SLA de suporte',
    descricao: `Primeira resposta: Enterprise ${ZOPU_STATS.slaEnterprise}, demais ${ZOPU_STATS.slaDemais}.`,
  },
  {
    icon: Lock,
    titulo: 'Segurança certificada',
    descricao: 'AICPA SOC 2, criptografia em trânsito e em repouso.',
  },
] as const

export function TrustCenterSection() {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-brand/10 rounded-full -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-56 h-56 bg-emerald-500/10 rounded-full translate-y-1/2 blur-3xl" />

      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Reveal>
              <Badge className="mb-6 bg-white/10 text-white border-white/20">
                <Shield className="w-3.5 h-3.5 mr-1.5" />
                Segurança
              </Badge>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                CRM é dado sensível.{' '}
                <span className="text-brand">Você precisa dormir tranquilo.</span>
              </h2>
            </Reveal>
          </div>

          {/* Trust cards */}
          <Reveal delay={0.2}>
            <div className="grid sm:grid-cols-3 gap-6 mb-10">
              {TRUST_ITEMS.map((item, index) => (
                <div
                  key={index}
                  className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-brand/30 hover:bg-white/10 transition-all duration-300 text-center"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand/20 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-6 h-6 text-brand" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{item.titulo}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{item.descricao}</p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Link to Trust Center */}
          <Reveal delay={0.3}>
            <div className="text-center">
              <Link
                href="/seguranca"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 hover:border-white/30 transition-all duration-300"
              >
                Ver Trust Center completo
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
