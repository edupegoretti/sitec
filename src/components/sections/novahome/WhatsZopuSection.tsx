'use client'

import { Container } from '@/components/layout'
import { Badge, Reveal } from '@/components/shared'
import { MessageSquare, Shield, Clock, History, Users, AlertCircle } from 'lucide-react'

const BENEFICIOS = [
  {
    icon: Shield,
    titulo: 'API oficial Meta',
    descricao: 'Reduz risco de bloqueio e mantém estabilidade do canal.',
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

export function WhatsZopuSection() {
  return (
    <section className="py-16 sm:py-24 bg-bg-secondary relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-red-500/5 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl" />

      <Container>
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Visual */}
            <Reveal>
              <div className="relative">
                <div className="bg-gradient-to-br from-red-50 to-orange-50/80 rounded-3xl p-8 sm:p-10 border border-red-200/60">
                  {/* WhatsApp mockup */}
                  <div className="bg-white rounded-2xl shadow-card overflow-hidden">
                    {/* Header - WhatsApp genérico */}
                    <div className="bg-[#075E54] px-4 py-3 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold text-sm">
                        <Users className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm">Vendas</p>
                        <p className="text-green-100 text-xs">online</p>
                      </div>
                    </div>

                    {/* Messages - Lead tentando contato sem sucesso */}
                    <div className="p-3 space-y-2 bg-[#ECE5DD] max-h-70 overflow-y-auto">
                      {/* Dia 1 - Segunda */}
                      <div className="flex justify-center">
                        <span className="text-[10px] text-gray-500 bg-white/80 px-2 py-0.5 rounded-full">Segunda, 10:15</span>
                      </div>
                      <div className="flex justify-start">
                        <div className="bg-white rounded-lg px-3 py-2 max-w-[85%] shadow-sm">
                          <p className="text-sm text-gray-800">Olá! Vi o anúncio de vocês. Preciso de um orçamento para 50 licenças</p>
                          <p className="text-[10px] text-gray-500 text-right mt-1">10:15 ✓✓</p>
                        </div>
                      </div>

                      {/* Dia 2 - Terça */}
                      <div className="flex justify-center mt-3">
                        <span className="text-[10px] text-gray-500 bg-white/80 px-2 py-0.5 rounded-full">Terça, 14:42</span>
                      </div>
                      <div className="flex justify-start">
                        <div className="bg-white rounded-lg px-3 py-2 max-w-[85%] shadow-sm">
                          <p className="text-sm text-gray-800">Oi, conseguiram ver minha mensagem?</p>
                          <p className="text-[10px] text-gray-500 text-right mt-1">14:42 ✓✓</p>
                        </div>
                      </div>

                      {/* Dia 4 - Quinta */}
                      <div className="flex justify-center mt-3">
                        <span className="text-[10px] text-gray-500 bg-white/80 px-2 py-0.5 rounded-full">Quinta, 09:30</span>
                      </div>
                      <div className="flex justify-start">
                        <div className="bg-white rounded-lg px-3 py-2 max-w-[85%] shadow-sm">
                          <p className="text-sm text-gray-800">Pessoal, ainda aguardo o orçamento... é urgente</p>
                          <p className="text-[10px] text-gray-500 text-right mt-1">09:30 ✓✓</p>
                        </div>
                      </div>

                      {/* Dia 7 - Segunda seguinte */}
                      <div className="flex justify-center mt-3">
                        <span className="text-[10px] text-gray-500 bg-white/80 px-2 py-0.5 rounded-full">Segunda, 16:20</span>
                      </div>
                      <div className="flex justify-start">
                        <div className="bg-white rounded-lg px-3 py-2 max-w-[85%] shadow-sm">
                          <p className="text-sm text-gray-800">Fechei com o concorrente. Vocês demoraram demais.</p>
                          <p className="text-[10px] text-gray-500 text-right mt-1">16:20 ✓✓</p>
                        </div>
                      </div>
                    </div>

                    {/* Status bar - Problema evidente */}
                    <div className="px-4 py-3 bg-red-50 border-t border-red-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        <span className="text-xs text-red-600 font-medium">Lead perdido — sem resposta</span>
                      </div>
                      <span className="text-xs text-red-400">7 dias ignorado</span>
                    </div>
                  </div>

                  {/* Badge flutuante - Problema */}
                  <div className="absolute -bottom-4 -right-4 bg-red-50 rounded-xl shadow-lg px-4 py-2 border border-red-200">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      <span className="text-sm font-medium text-red-700">
                        WhatsApp fora do CRM
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
                  Se o WhatsApp está fora do CRM,{' '}
                  <span className="text-green-600">sua operação está fora de controle.</span>
                </h2>
              </Reveal>

              <Reveal delay={0.2}>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  No Brasil, WhatsApp é rotina diária em vendas para muitos times, mas a integração
                  com CRM ainda é exceção — e isso explica por que o histórico e a rastreabilidade
                  se perdem.
                </p>
                <p className="text-gray-700 font-medium mb-8">
                  WhatsZopu: conversa com histórico, dono, SLA e rastreabilidade dentro do Bitrix24.
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
