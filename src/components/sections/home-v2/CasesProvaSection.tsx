"use client";

import {
  TrendingUp,
  ArrowRight,
  Quote,
  Building2,
  Target,
  BarChart3,
  CheckCircle2,
} from "lucide-react";
import { Container } from "@/components/layout";
import { Badge, Reveal } from "@/components/shared";

const CASES = [
  {
    empresa: "TechCorp B2B",
    segmento: "Software Enterprise",
    logo: "/images/cases/techcorp-logo.webp",
    desafio:
      "Vendedores perdiam 40% do tempo procurando informações em múltiplas ferramentas. Pipeline desorganizado e sem forecast confiável.",
    solucao:
      "Arquitetura de receita completa no Bitrix24 + WhatsZopu + Fluidz para 25 vendedores.",
    metricas: [
      { label: "Tempo de resposta", antes: "4h", depois: "23min", melhoria: "-85%" },
      { label: "Taxa de conversão", antes: "12%", depois: "19%", melhoria: "+58%" },
      { label: "Acuracidade forecast", antes: "45%", depois: "87%", melhoria: "+93%" },
    ],
    quote:
      "Pela primeira vez, consigo confiar no número que o time apresenta. Isso mudou como tomamos decisões.",
    autor: "Diretor Comercial",
    cor: "brand",
  },
  {
    empresa: "IndústriaMax",
    segmento: "Manufatura",
    logo: "/images/cases/industriamax-logo.webp",
    desafio:
      "Equipe comercial de 80 pessoas com zero processo padronizado. Cada regional fazia diferente.",
    solucao:
      "Padronização nacional de processo + Bitrix24 + treinamento Fluidz por função.",
    metricas: [
      { label: "Leads sem dono", antes: "35%", depois: "0%", melhoria: "-100%" },
      { label: "Ciclo de vendas", antes: "120 dias", depois: "78 dias", melhoria: "-35%" },
      { label: "Adoção do CRM", antes: "30%", depois: "94%", melhoria: "+213%" },
    ],
    quote:
      "O problema nunca foi o CRM — era falta de processo. A Zopu entendeu isso antes de tocar em tecnologia.",
    autor: "VP de Vendas",
    cor: "emerald",
  },
  {
    empresa: "FinServ Plus",
    segmento: "Serviços Financeiros",
    logo: "/images/cases/finserv-logo.webp",
    desafio:
      "Compliance exigia rastreabilidade de todas as interações. WhatsApp pessoal era um risco.",
    solucao:
      "WhatsZopu com governança completa + integração com sistema de compliance interno.",
    metricas: [
      { label: "Conversas rastreadas", antes: "20%", depois: "100%", melhoria: "+400%" },
      { label: "Risco de compliance", antes: "Alto", depois: "Baixo", melhoria: "Resolvido" },
      { label: "Tempo auditoria", antes: "5 dias", depois: "2h", melhoria: "-98%" },
    ],
    quote:
      "O auditor ficou impressionado. Primeira vez que apresentamos histórico completo de todas as interações comerciais.",
    autor: "Head de Compliance",
    cor: "blue",
  },
];

const corClasses = {
  brand: {
    bg: "bg-brand",
    bgLight: "bg-brand/10",
    text: "text-brand",
    border: "border-brand/20",
    gradient: "from-brand to-brand-hover",
  },
  emerald: {
    bg: "bg-emerald-500",
    bgLight: "bg-emerald-500/10",
    text: "text-emerald-600",
    border: "border-emerald-500/20",
    gradient: "from-emerald-500 to-emerald-600",
  },
  blue: {
    bg: "bg-blue-500",
    bgLight: "bg-blue-500/10",
    text: "text-blue-600",
    border: "border-blue-500/20",
    gradient: "from-blue-500 to-blue-600",
  },
};

export function CasesProvaSection() {
  return (
    <section className="relative py-16 sm:py-24 bg-gray-900 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient overlays - sutis */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl" />
      </div>

      <Container className="relative">
        {/* Header */}
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <Badge variant="dark" className="mb-6">
              <BarChart3 className="w-3.5 h-3.5 mr-1.5" />
              Resultados reais
            </Badge>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Não acredite em nós.{" "}
              <span className="block mt-2 bg-linear-to-r from-amber-400 via-amber-300 to-amber-400 bg-clip-text text-transparent">
                Acredite nos números.
              </span>
            </h2>

            <p className="mt-6 text-lg text-gray-400 leading-relaxed">
              Cases reais com métricas verificáveis. Pedimos permissão para compartilhar
              — e nossos clientes dizem sim porque têm orgulho do resultado.
            </p>
          </div>
        </Reveal>

        {/* Cases grid */}
        <div className="space-y-8">
          {CASES.map((caseItem, index) => {
            const cores = corClasses[caseItem.cor as keyof typeof corClasses];

            return (
              <Reveal key={index} delay={0.1 + index * 0.15}>
                <div className="relative bg-white/5 rounded-2xl border border-white/10 overflow-hidden hover:border-white/20 hover:-translate-y-1 transition-all duration-300">
                  <div className="grid lg:grid-cols-[1fr,auto] gap-8 p-8 sm:p-10">
                    {/* Left content */}
                    <div>
                      {/* Company header */}
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center p-2">
                          <Building2 className="w-8 h-8 text-gray-400" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">
                            {caseItem.empresa}
                          </h3>
                          <p className="text-sm text-gray-400">{caseItem.segmento}</p>
                        </div>
                      </div>

                      {/* Challenge & Solution */}
                      <div className="grid sm:grid-cols-2 gap-6 mb-8">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Target className="w-4 h-4 text-red-400" />
                            <span className="text-xs text-red-400 font-medium uppercase tracking-wider">
                              Desafio
                            </span>
                          </div>
                          <p className="text-sm text-gray-300">{caseItem.desafio}</p>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            <span className="text-xs text-emerald-400 font-medium uppercase tracking-wider">
                              Solução
                            </span>
                          </div>
                          <p className="text-sm text-gray-300">{caseItem.solucao}</p>
                        </div>
                      </div>

                      {/* Quote */}
                      <div className="p-5 bg-white/5 rounded-2xl border border-white/10">
                        <Quote className="w-6 h-6 text-white/20 mb-3" />
                        <p className="text-white italic">&ldquo;{caseItem.quote}&rdquo;</p>
                        <p className="text-sm text-gray-400 mt-3">— {caseItem.autor}</p>
                      </div>
                    </div>

                    {/* Right - Metrics */}
                    <div className="lg:w-72 lg:border-l lg:border-white/10 lg:pl-8">
                      <div className="flex items-center gap-2 mb-6">
                        <TrendingUp className={`w-5 h-5 ${cores.text}`} />
                        <span className="text-sm text-white font-medium">
                          Métricas de impacto
                        </span>
                      </div>

                      <div className="space-y-6">
                        {caseItem.metricas.map((metrica, idx) => (
                          <div key={idx}>
                            <p className="text-xs text-gray-400 mb-2">{metrica.label}</p>
                            <div className="flex items-end gap-3">
                              <div className="flex-1">
                                <div className="flex items-center justify-between text-sm mb-1">
                                  <span className="text-gray-500">Antes</span>
                                  <span className="text-gray-400 font-medium">
                                    {metrica.antes}
                                  </span>
                                </div>
                                <div className="h-2 bg-white/10 rounded-full" />
                              </div>
                              <ArrowRight className="w-4 h-4 text-gray-500 shrink-0" />
                              <div className="flex-1">
                                <div className="flex items-center justify-between text-sm mb-1">
                                  <span className="text-gray-500">Depois</span>
                                  <span className={`font-bold ${cores.text}`}>
                                    {metrica.depois}
                                  </span>
                                </div>
                                <div className={`h-2 bg-linear-to-r ${cores.gradient} rounded-full`} />
                              </div>
                            </div>
                            <div className="text-right mt-1">
                              <span
                                className={`text-xs font-bold ${
                                  metrica.melhoria.includes("+")
                                    ? "text-emerald-400"
                                    : metrica.melhoria.includes("-")
                                    ? "text-emerald-400"
                                    : cores.text
                                }`}
                              >
                                {metrica.melhoria}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Color accent bar */}
                  <div className={`h-1 bg-linear-to-r ${cores.gradient}`} />
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* CTA */}
        <Reveal delay={0.6}>
          <div className="mt-14 text-center">
            <a
              href="https://wa.me/5547988459378?text=Ol%C3%A1!%20Gostaria%20de%20ver%20mais%20cases%20de%20sucesso."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-900 font-semibold rounded-2xl hover:bg-gray-100 transition-all duration-300 shadow-elevated hover:shadow-elevated-hover hover:-translate-y-1"
            >
              Ver mais cases detalhados
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
