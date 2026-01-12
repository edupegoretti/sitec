"use client";

import { Container } from "@/components/layout";
import { Badge, Reveal } from "@/components/shared";
import { Zap, Layers, Building, ArrowRight, Check } from "lucide-react";
import Link from "next/link";

type Solucao = {
  id: string;
  icon: typeof Zap;
  nome: string;
  tagline: string;
  prazo: string;
  descricao: string;
  features: string[];
  cta: string;
  href: string;
  destaque: boolean;
  recomendado?: boolean;
  cor: "amber" | "brand" | "gray";
};

const SOLUCOES: Solucao[] = [
  {
    id: "crm-express",
    icon: Zap,
    nome: "CRM Express",
    tagline: "Para organizar vendas e WhatsApp rápido",
    prazo: "Go-live em 30 dias",
    descricao:
      "Entrada rápida em operação para estruturar pré-vendas e vendas com o básico bem feito.",
    features: [
      "Pipeline de vendas configurado",
      "WhatsApp integrado",
      "Automações de follow-up",
      "Dashboard do gestor",
      "Treinamento via Fluidz",
    ],
    cta: "Quero organizar minhas vendas",
    href: "/crm-express",
    destaque: false,
    cor: "amber",
  },
  {
    id: "revops-launch",
    icon: Layers,
    nome: "RevOps Launch",
    tagline: "Para pipeline, previsibilidade e operação completa",
    prazo: "Até 60 dias",
    descricao:
      "Marketing, Vendas e CS em uma única operação de receita. Para quem quer governança e previsibilidade.",
    features: [
      "Tudo do CRM Express",
      "Pipeline de pós-vendas/CS",
      "Health Score de clientes",
      "Dashboards avançados (BI)",
      "60 dias de acompanhamento",
    ],
    cta: "Quero previsibilidade",
    href: "/revopslaunch",
    destaque: true,
    recomendado: true,
    cor: "brand",
  },
  {
    id: "enterprise",
    icon: Building,
    nome: "Enterprise",
    tagline: "Multiárea, integrações complexas e governança avançada",
    prazo: "Prazo personalizado",
    descricao:
      "Para operações com múltiplos times, países ou integrações enterprise.",
    features: [
      "Tudo do RevOps Launch",
      "Multi-BU rollout",
      "Integrações enterprise",
      "Governance framework",
      "Acompanhamento contínuo",
    ],
    cta: "Quero uma arquitetura",
    href: "/bitrix24-enterprise",
    destaque: false,
    cor: "gray",
  },
];

const corClasses = {
  amber: {
    bg: "bg-amber-500/10",
    border: "border-amber-500/20 hover:border-amber-500/40",
    icon: "text-amber-500",
    badge: "bg-amber-500/10 text-amber-700",
  },
  brand: {
    bg: "bg-brand/10",
    border: "border-brand/30 hover:border-brand/50",
    icon: "text-brand",
    badge: "bg-brand/10 text-brand",
  },
  gray: {
    bg: "bg-gray-500/10",
    border: "border-gray-300 hover:border-gray-400",
    icon: "text-gray-600",
    badge: "bg-gray-100 text-gray-700",
  },
} as const;

export function SolucoesSection() {
  return (
    <section className="py-16 sm:py-24 bg-[#F9FAFC] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-brand/4 rounded-full -translate-y-1/2 blur-3xl" />

      <Container>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <Reveal>
              <Badge className="mb-6">Soluções</Badge>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                Escolha o nível de operação{" "}
                <span className="text-brand">que você precisa agora</span>
              </h2>
            </Reveal>
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {SOLUCOES.map((solucao, index) => {
              const cores = corClasses[solucao.cor as keyof typeof corClasses];
              return (
                <Reveal key={solucao.id} delay={0.1 * (index + 1)}>
                  <div
                    className={`relative h-full flex flex-col p-6 sm:p-8 bg-white rounded-2xl border-2 ${cores.border} shadow-sm hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 ${solucao.destaque ? "ring-2 ring-brand/20" : ""}`}
                  >
                    {/* Recomendado badge */}
                    {solucao.recomendado && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className="px-3 py-1 bg-brand text-white text-xs font-bold rounded-full shadow-lg">
                          Recomendado
                        </span>
                      </div>
                    )}

                    {/* Icon */}
                    <div
                      className={`w-12 h-12 rounded-xl ${cores.bg} flex items-center justify-center mb-4`}
                    >
                      <solucao.icon className={`w-6 h-6 ${cores.icon}`} />
                    </div>

                    {/* Nome e prazo */}
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {solucao.nome}
                    </h3>
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${cores.badge} mb-3`}
                    >
                      {solucao.prazo}
                    </span>

                    {/* Tagline */}
                    <p className="text-sm text-gray-500 mb-4">
                      {solucao.tagline}
                    </p>

                    {/* Descrição */}
                    <p className="text-gray-600 text-sm leading-relaxed mb-6">
                      {solucao.descricao}
                    </p>

                    {/* Features */}
                    <ul className="space-y-2 mb-8 flex-grow">
                      {solucao.features.map((feature, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-gray-600"
                        >
                          <Check
                            className={`w-4 h-4 ${cores.icon} shrink-0 mt-0.5`}
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <Link
                      href={solucao.href}
                      className={`inline-flex items-center justify-center gap-2 w-full px-6 py-3 font-semibold rounded-xl transition-all duration-300 ${
                        solucao.destaque
                          ? "bg-brand text-white hover:bg-brand-hover shadow-lg shadow-brand/20"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {solucao.cta}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
