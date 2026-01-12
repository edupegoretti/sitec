'use client'

import { Container } from '@/components/layout'
import { Badge, Reveal } from '@/components/shared'
import { MessageSquare, Shield, Clock, History, Users, CheckCircle } from 'lucide-react'

const BENEFICIOS = [
  {
    icon: Shield,
    titulo: 'API oficial Meta',
    descricao: 'Sem risco de bloqueio. Estabilidade garantida.',
  },
  {
    icon: History,
    titulo: 'Histórico centralizado',
    descricao: 'Todas as conversas no CRM. Auditável.',
  },
  {
    icon: Users,
    titulo: 'Distribuição inteligente',
    descricao: 'Regras de fila por disponibilidade ou critério.',
  },
  {
    icon: Clock,
    titulo: 'SLAs por etapa',
    descricao: 'Tempo de resposta definido e monitorado.',
  },
] as const

export function WhatsAppGovernancaSection() {
  return (
    <section className="py-16 sm:py-24 bg-[#F9FAFC] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-green-500/5 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl" />

      <Container>
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Visual */}
            <Reveal>
              <div className="relative">
                <div className="bg-gradient-to-br from-green-50 to-green-100/80 rounded-3xl p-8 sm:p-10 border border-green-200/60">
                  {/* WhatsApp mockup */}
                  <div className="bg-white rounded-2xl shadow-card overflow-hidden">
                    {/* Header */}
                    <div className="bg-green-600 px-4 py-3 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                        <MessageSquare className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm">WhatsZopu</p>
                        <p className="text-green-100 text-xs">API Oficial Meta</p>
                      </div>
                    </div>

                    {/* Messages */}
                    <div className="p-4 space-y-3 bg-[#ECE5DD]">
                      <div className="flex justify-end">
                        <div className="bg-[#DCF8C6] rounded-lg px-3 py-2 max-w-[80%] shadow-sm">
                          <p className="text-sm text-gray-800">
                            Olá! Vi que você pediu um orçamento
                          </p>
                          <p className="text-[10px] text-gray-500 text-right mt-1">14:32</p>
                        </div>
                      </div>
                      <div className="flex justify-start">
                        <div className="bg-white rounded-lg px-3 py-2 max-w-[80%] shadow-sm">
                          <p className="text-sm text-gray-800">
                            Isso! Preciso de ajuda com meu CRM
                          </p>
                          <p className="text-[10px] text-gray-500 text-right mt-1">14:33</p>
                        </div>
                      </div>
                    </div>

                    {/* Status bar */}
                    <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="text-xs text-gray-500">Vinculado ao CRM</span>
                      </div>
                      <span className="text-xs text-gray-400">Resp: João Silva</span>
                    </div>
                  </div>

                  {/* Badge flutuante */}
                  <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg px-4 py-2 border border-gray-200">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-gray-900">
                        Histórico salvo automaticamente
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Right: Content */}
            <div>
              <Reveal>
                <Badge variant="success" className="mb-6 bg-green-500/10 text-green-700 border-green-500/20">
                  <MessageSquare className="w-3.5 h-3.5 mr-1.5" />
                  WhatsZopu
                </Badge>
              </Reveal>

              <Reveal delay={0.1}>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                  WhatsApp não pode ser{' '}
                  <span className="text-green-600">'terra sem lei'.</span>
                </h2>
              </Reveal>

              <Reveal delay={0.2}>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  Se você vende ou atende por WhatsApp, você precisa de: histórico, responsável,
                  SLA e rastreabilidade dentro do CRM.
                </p>
              </Reveal>

              {/* Benefícios */}
              <Reveal delay={0.3}>
                <div className="grid sm:grid-cols-2 gap-4">
                  {BENEFICIOS.map((beneficio, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-200/80 hover:border-green-200 hover:bg-green-50/30 transition-all duration-300"
                    >
                      <div className="w-9 h-9 rounded-lg bg-green-500/10 flex items-center justify-center shrink-0">
                        <beneficio.icon className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm">{beneficio.titulo}</h4>
                        <p className="text-xs text-gray-500 mt-0.5">{beneficio.descricao}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
