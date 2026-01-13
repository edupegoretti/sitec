"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Rocket,
  Building2,
  Crown,
  Check,
  ArrowRight,
  Zap,
  Users,
  Star,
} from "lucide-react";
import { Container } from "@/components/layout";
import { Badge, Reveal } from "@/components/shared";
import { easings } from "@/lib/motion";

const OFERTAS = [
  {
    id: "crm-express",
    nome: "CRM Express",
    tagline: "Comece rápido",
    descricao:
      "Setup inicial do Bitrix24 com as configurações essenciais para times que querem começar a usar o CRM em semanas, não meses.",
    icon: Rocket,
    cor: "blue",
    preco: "A partir de R$ 15.000",
    prazo: "2-4 semanas",
    ideal: "Times de 5-15 vendedores",
    inclui: [
      "Setup Bitrix24 (pipelines, campos, automações básicas)",
      "Integração WhatsApp (WhatsZopu básico)",
      "Treinamento geral (4h)",
      "Suporte por 30 dias",
    ],
    naoInclui: [
      "Arquitetura de receita completa",
      "Integrações complexas (ERP, BI)",
      "Treinamento por função",
    ],
    cta: "Começar agora",
    destaque: false,
  },
  {
    id: "revops-launch",
    nome: "RevOps Launch",
    tagline: "Mais popular",
    descricao:
      "Arquitetura de receita completa + implementação no Bitrix24 + treinamento Fluidz + acompanhamento 90 dias. O pacote que mais gera ROI.",
    icon: Building2,
    cor: "brand",
    preco: "A partir de R$ 45.000",
    prazo: "8-12 semanas",
    ideal: "Times de 15-50 vendedores",
    inclui: [
      "Arquitetura de receita documentada",
      "Implementação Bitrix24 completa",
      "WhatsZopu com governança total",
      "Fluidz: treinamento por função (SDR, Closer, CS, Gestor)",
      "Integrações (WhatsApp, ERP básico)",
      "Acompanhamento 90 dias pós-go-live",
      "Dashboards de gestão",
    ],
    naoInclui: [
      "Integrações enterprise customizadas",
      "IA avançada (disponível como add-on)",
    ],
    cta: "Falar com especialista",
    destaque: true,
  },
  {
    id: "enterprise",
    nome: "Enterprise",
    tagline: "Máxima personalização",
    descricao:
      "Para operações complexas que precisam de customização profunda, múltiplas integrações e suporte dedicado permanente.",
    icon: Crown,
    cor: "amber",
    preco: "Sob consulta",
    prazo: "Customizado",
    ideal: "Times de 50+ vendedores",
    inclui: [
      "Tudo do RevOps Launch",
      "Arquitetura multi-unidade/regional",
      "Integrações enterprise (SAP, Salesforce, etc.)",
      "IA completa (análise de conversas, forecast, scoring)",
      "Customer Success Manager dedicado",
      "SLA de suporte prioritário",
      "Consultoria contínua de RevOps",
    ],
    naoInclui: [],
    cta: "Agendar consultoria",
    destaque: false,
  },
];

const corClasses = {
  blue: {
    bg: "bg-blue-500",
    bgLight: "bg-blue-500/10",
    text: "text-blue-600",
    border: "border-blue-500/20",
    gradient: "from-blue-500 to-blue-600",
    ring: "ring-blue-500/30",
    hoverBg: "hover:bg-blue-600",
  },
  brand: {
    bg: "bg-brand",
    bgLight: "bg-brand/10",
    text: "text-brand",
    border: "border-brand/30",
    gradient: "from-brand to-brand-hover",
    ring: "ring-brand/30",
    hoverBg: "hover:bg-brand-hover",
  },
  amber: {
    bg: "bg-amber-500",
    bgLight: "bg-amber-500/10",
    text: "text-amber-600",
    border: "border-amber-500/20",
    gradient: "from-amber-500 to-amber-600",
    ring: "ring-amber-500/30",
    hoverBg: "hover:bg-amber-600",
  },
};

export function OfertasSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative py-20 sm:py-28 bg-gradient-to-b from-gray-50 via-white to-gray-50/50 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl" />
      </div>

      <Container className="relative">
        {/* Header */}
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <Badge variant="default" className="mb-6">
              <Zap className="w-3.5 h-3.5 mr-1.5" />
              Nossas ofertas
            </Badge>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Escolha o caminho certo{" "}
              <span className="bg-gradient-to-r from-brand to-brand-hover bg-clip-text text-transparent">
                para o seu momento
              </span>
            </h2>

            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              Três opções desenhadas para diferentes estágios de maturidade comercial.
              Comece onde faz sentido — evolua quando precisar.
            </p>
          </div>
        </Reveal>

        {/* Pricing cards */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {OFERTAS.map((oferta, index) => {
            const cores = corClasses[oferta.cor as keyof typeof corClasses];
            const Icon = oferta.icon;

            return (
              <Reveal key={oferta.id} delay={0.1 + index * 0.15}>
                <motion.div
                  whileHover={
                    prefersReducedMotion ? undefined : { y: -8 }
                  }
                  transition={{ duration: 0.3, ease: easings.premium }}
                  className={`relative h-full flex flex-col bg-white rounded-3xl border-2 ${
                    oferta.destaque
                      ? `${cores.border} shadow-elevated ring-4 ${cores.ring}`
                      : "border-gray-200 shadow-card hover:shadow-elevated"
                  } overflow-hidden transition-all duration-300`}
                >
                  {/* Popular badge */}
                  {oferta.destaque && (
                    <div className="absolute top-0 right-0">
                      <div
                        className={`px-4 py-1.5 bg-gradient-to-r ${cores.gradient} text-white text-xs font-bold rounded-bl-2xl`}
                      >
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          {oferta.tagline}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="p-8 flex-1 flex flex-col">
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-6">
                      <div
                        className={`w-14 h-14 ${cores.bgLight} rounded-2xl flex items-center justify-center`}
                      >
                        <Icon className={`w-7 h-7 ${cores.text}`} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {oferta.nome}
                        </h3>
                        {!oferta.destaque && (
                          <p className={`text-sm ${cores.text} font-medium`}>
                            {oferta.tagline}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 mb-6">{oferta.descricao}</p>

                    {/* Price & Timeline */}
                    <div className="mb-6 pb-6 border-b border-gray-100">
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-gray-900">
                          {oferta.preco}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <span>⏱️ {oferta.prazo}</span>
                        <span>👥 {oferta.ideal}</span>
                      </div>
                    </div>

                    {/* What's included */}
                    <div className="mb-6 flex-1">
                      <p className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-3">
                        O que inclui
                      </p>
                      <ul className="space-y-3">
                        {oferta.inclui.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <Check
                              className={`w-5 h-5 ${cores.text} shrink-0 mt-0.5`}
                            />
                            <span className="text-sm text-gray-600">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* What's not included */}
                    {oferta.naoInclui.length > 0 && (
                      <div className="mb-6">
                        <p className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-3">
                          Não inclui
                        </p>
                        <ul className="space-y-2">
                          {oferta.naoInclui.map((item, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-3 text-sm text-gray-400"
                            >
                              <span className="shrink-0">—</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* CTA */}
                    <a
                      href={`https://wa.me/5547988459378?text=Ol%C3%A1!%20Tenho%20interesse%20no%20${encodeURIComponent(oferta.nome)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`mt-auto inline-flex items-center justify-center gap-2 w-full px-6 py-4 ${cores.bg} text-white font-semibold rounded-2xl ${cores.hoverBg} transition-all duration-300 shadow-sm hover:shadow-elevated hover:-translate-y-0.5`}
                    >
                      {oferta.cta}
                      <ArrowRight className="w-5 h-5" />
                    </a>
                  </div>
                </motion.div>
              </Reveal>
            );
          })}
        </div>

        {/* Bottom note */}
        <Reveal delay={0.6}>
          <div className="mt-12 text-center">
            <p className="text-sm text-gray-500">
              Não sabe qual escolher?{" "}
              <a
                href="https://wa.me/5547988459378?text=Ol%C3%A1!%20Gostaria%20de%20ajuda%20para%20escolher%20o%20melhor%20pacote."
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand font-medium hover:text-brand-hover transition-colors"
              >
                Fale com um especialista
              </a>{" "}
              — ajudamos a identificar o melhor caminho para você.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
