"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  GraduationCap,
  Users,
  Target,
  Headphones,
  BarChart3,
  Settings,
  Play,
  CheckCircle2,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import { Container } from "@/components/layout";
import { Badge, Reveal } from "@/components/shared";
import { easings } from "@/lib/motion";

const PERFIS_TREINAMENTO = [
  {
    perfil: "SDR / BDR",
    icon: Target,
    cor: "blue",
    foco: "Qualificação e prospecção",
    modulos: ["Uso do pipeline", "Cadências", "Registro de atividades", "Lead scoring"],
    duracao: "4h + acompanhamento",
  },
  {
    perfil: "Vendedor / Closer",
    icon: Users,
    cor: "brand",
    foco: "Conversão e negociação",
    modulos: ["Gestão de oportunidades", "Proposta e follow-up", "WhatsApp integrado", "Forecast"],
    duracao: "6h + acompanhamento",
  },
  {
    perfil: "CS / Pós-venda",
    icon: Headphones,
    cor: "emerald",
    foco: "Retenção e expansão",
    modulos: ["Onboarding de cliente", "Health score", "Upsell e cross-sell", "NPS e feedback"],
    duracao: "4h + acompanhamento",
  },
  {
    perfil: "Gestor / Líder",
    icon: BarChart3,
    cor: "amber",
    foco: "Visibilidade e decisão",
    modulos: ["Dashboards de gestão", "Métricas de time", "Coaching via sistema", "Previsibilidade"],
    duracao: "4h + acompanhamento",
  },
];

const corClasses = {
  blue: {
    bg: "bg-blue-500",
    bgLight: "bg-blue-500/10",
    text: "text-blue-600",
    border: "border-blue-500/20",
  },
  brand: {
    bg: "bg-brand",
    bgLight: "bg-brand/10",
    text: "text-brand",
    border: "border-brand/20",
  },
  emerald: {
    bg: "bg-emerald-500",
    bgLight: "bg-emerald-500/10",
    text: "text-emerald-600",
    border: "border-emerald-500/20",
  },
  amber: {
    bg: "bg-amber-500",
    bgLight: "bg-amber-500/10",
    text: "text-amber-600",
    border: "border-amber-500/20",
  },
};

const DIFERENCIAIS = [
  {
    icon: BookOpen,
    titulo: "Trilhas por função",
    descricao: "Cada papel aprende exatamente o que precisa usar no dia a dia",
  },
  {
    icon: Play,
    titulo: "Vídeos gravados + ao vivo",
    descricao: "Biblioteca on-demand + sessões de dúvidas semanais",
  },
  {
    icon: Settings,
    titulo: "Ambiente de prática",
    descricao: "Sandbox para treinar sem medo de errar no sistema real",
  },
];

export function EnablementFluidzSection() {
  return (
    <section className="relative py-16 sm:py-24 bg-white overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-linear-to-bl from-brand/5 via-transparent to-transparent rounded-full" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-linear-to-tr from-emerald-500/5 via-transparent to-transparent rounded-full" />
      </div>

      <Container className="relative">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-12 items-end mb-14">
          <Reveal>
            <div>
              <Badge variant="default" className="mb-6">
                <GraduationCap className="w-3.5 h-3.5 mr-1.5" />
                Enablement
              </Badge>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Fluidz:{" "}
                <span className="bg-linear-to-r from-brand to-emerald-600 bg-clip-text text-transparent">
                  treinamento por função,
                </span>
                <span className="block mt-2">não treinamento genérico.</span>
              </h2>

              <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                CRM sem adoção é desperdício. Por isso criamos o Fluidz: trilhas de
                capacitação específicas para cada papel comercial, com foco no uso
                real do sistema.
              </p>
            </div>
          </Reveal>

          {/* Diferenciais */}
          <Reveal delay={0.1}>
            <div className="space-y-4">
              {DIFERENCIAIS.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl"
                  >
                    <div className="w-10 h-10 bg-brand/10 rounded-xl flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-brand" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{item.titulo}</h4>
                      <p className="text-sm text-gray-500">{item.descricao}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>

        {/* Training profiles grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PERFIS_TREINAMENTO.map((perfil, index) => {
            const cores = corClasses[perfil.cor as keyof typeof corClasses];
            const Icon = perfil.icon;

            return (
              <Reveal key={index} delay={0.15 + index * 0.1}>
                <div
                  className={`group relative h-full bg-white rounded-2xl border ${cores.border} shadow-sm hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 overflow-hidden`}
                >
                  {/* Top color bar */}
                  <div className={`h-1 ${cores.bg}`} />

                  <div className="p-6">
                    {/* Icon and title */}
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={`w-12 h-12 ${cores.bgLight} rounded-xl flex items-center justify-center transition-colors`}
                      >
                        <Icon className={`w-6 h-6 ${cores.text}`} />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{perfil.perfil}</h3>
                        <p className={`text-xs ${cores.text} font-medium`}>
                          {perfil.foco}
                        </p>
                      </div>
                    </div>

                    {/* Modules */}
                    <div className="mb-4">
                      <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">
                        Módulos
                      </p>
                      <ul className="space-y-2">
                        {perfil.modulos.map((modulo, idx) => (
                          <li
                            key={idx}
                            className="flex items-center gap-2 text-sm text-gray-600"
                          >
                            <CheckCircle2
                              className={`w-4 h-4 ${cores.text} shrink-0`}
                            />
                            {modulo}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Duration */}
                    <div
                      className={`mt-auto pt-4 border-t ${cores.border} flex items-center justify-between`}
                    >
                      <span className="text-xs text-gray-500">Carga horária</span>
                      <span className={`text-sm font-semibold ${cores.text}`}>
                        {perfil.duracao}
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <Reveal delay={0.6}>
          <div className="mt-14 text-center">
            <div className="inline-flex items-center gap-4 p-5 bg-linear-to-r from-brand/5 via-brand/10 to-brand/5 rounded-2xl border border-brand/20">
              <div className="w-12 h-12 bg-brand rounded-xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <p className="text-sm text-gray-600">Resultado do Fluidz</p>
                <p className="text-lg font-bold text-gray-900">
                  97% de adoção em 30 dias — contra média de mercado de 40%
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-brand" />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
