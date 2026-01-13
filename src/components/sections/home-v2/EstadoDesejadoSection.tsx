"use client";

import {
  UserCheck,
  MessageSquare,
  GitBranch,
  FileX,
  BarChart3,
  CheckCircle2,
  Sparkles,
  Database,
  Settings,
  Users,
  Check,
} from "lucide-react";
import { Container } from "@/components/layout";
import { Badge, Reveal } from "@/components/shared";
import { RevenueArchitectureDiagram } from "./RevenueArchitectureDiagram";

const MUDANCAS = [
  {
    icon: UserCheck,
    titulo: "Todo lead tem dono + próximo passo",
    descricao: 'Responsabilidade clara, sem leads "no limbo"',
    cor: "brand",
  },
  {
    icon: MessageSquare,
    titulo: "WhatsApp tem histórico, SLA e responsável",
    descricao: "Conversa rastreável, governança real",
    cor: "green",
  },
  {
    icon: GitBranch,
    titulo: "Funil tem critérios claros",
    descricao: 'Menos "cada um faz de um jeito"',
    cor: "blue",
  },
  {
    icon: FileX,
    titulo: "Motivo de perda vira dado",
    descricao: "Informação útil, não desculpa",
    cor: "amber",
  },
  {
    icon: BarChart3,
    titulo: "Forecast vira ferramenta de gestão",
    descricao: "Previsibilidade real, não chute",
    cor: "purple",
  },
];

const corClasses = {
  brand: {
    bg: "bg-brand/10",
    text: "text-brand",
    border: "border-brand/20",
    ring: "ring-brand/20",
  },
  green: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-600",
    border: "border-emerald-500/20",
    ring: "ring-emerald-500/20",
  },
  blue: {
    bg: "bg-blue-500/10",
    text: "text-blue-600",
    border: "border-blue-500/20",
    ring: "ring-blue-500/20",
  },
  amber: {
    bg: "bg-amber-500/10",
    text: "text-amber-600",
    border: "border-amber-500/20",
    ring: "ring-amber-500/20",
  },
  purple: {
    bg: "bg-purple-500/10",
    text: "text-purple-600",
    border: "border-purple-500/20",
    ring: "ring-purple-500/20",
  },
};

export function EstadoDesejadoSection() {
  return (
    <section className="relative py-16 sm:py-24 bg-linear-to-b from-white via-emerald-50/20 to-white overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-brand/5 rounded-full blur-3xl" />
      </div>

      <Container className="relative">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <Reveal>
            <div className="text-center mb-14">
              <Badge variant="success" className="mb-6">
                <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                O estado desejado
              </Badge>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Receita auditável:
                <span className="block mt-2 bg-linear-to-r from-emerald-600 to-brand bg-clip-text text-transparent">
                  quando você pergunta, o sistema responde.
                </span>
              </h2>
            </div>
          </Reveal>

          {/* Revenue Architecture Diagram - Visual Premium */}
          <Reveal delay={0.15}>
            <div className="mb-14">
              <RevenueArchitectureDiagram />
            </div>
          </Reveal>

          {/* Section subtitle */}
          <Reveal delay={0.2}>
            <div className="flex items-center justify-center gap-4 mb-10">
              <div className="h-px flex-1 max-w-[100px] bg-linear-to-r from-transparent to-emerald-200" />
              <span className="text-sm text-gray-500 font-medium px-4">
                O que muda na prática
              </span>
              <div className="h-px flex-1 max-w-[100px] bg-linear-to-l from-transparent to-emerald-200" />
            </div>
          </Reveal>

          {/* Changes grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {MUDANCAS.map((mudanca, index) => {
              const cores = corClasses[mudanca.cor as keyof typeof corClasses];

              return (
                <Reveal key={index} delay={0.1 + index * 0.08}>
                  <div
                    className={`group relative bg-white rounded-2xl p-6 border ${cores.border} shadow-sm hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300`}
                  >
                    {/* Success indicator */}
                    <div className="absolute top-4 right-4">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    {/* Icon */}
                    <div
                      className={`w-12 h-12 ${cores.bg} rounded-xl flex items-center justify-center mb-4 transition-transform`}
                    >
                      <mudanca.icon className={`w-6 h-6 ${cores.text}`} />
                    </div>

                    {/* Content */}
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {mudanca.titulo}
                    </h3>
                    <p className="text-sm text-gray-500">{mudanca.descricao}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* Visual summary */}
          <Reveal delay={0.5}>
            <div className="mt-14">
              <div className="relative bg-linear-to-r from-emerald-50 via-brand/5 to-emerald-50 rounded-2xl p-8 sm:p-10 border border-emerald-100/50 overflow-hidden">
                <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">
                  {/* Left content */}
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-white rounded-2xl shadow-card flex items-center justify-center">
                      <div className="relative">
                        <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                          <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-brand rounded-full flex items-center justify-center">
                          <Sparkles className="w-2.5 h-2.5 text-white" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Isso é</p>
                      <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                        Receita Auditável
                      </p>
                    </div>
                  </div>

                  {/* Right content - visual representation */}
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl shadow-sm">
                      <Database className="w-6 h-6 text-brand" />
                      <span className="text-xs text-gray-500">Dados</span>
                    </div>
                    <div className="text-gray-300">+</div>
                    <div className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl shadow-sm">
                      <Settings className="w-6 h-6 text-amber-500" />
                      <span className="text-xs text-gray-500">Processo</span>
                    </div>
                    <div className="text-gray-300">+</div>
                    <div className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl shadow-sm">
                      <Users className="w-6 h-6 text-blue-500" />
                      <span className="text-xs text-gray-500">Adoção</span>
                    </div>
                    <div className="text-gray-300">=</div>
                    <div className="flex flex-col items-center gap-2 p-4 bg-emerald-500 rounded-xl shadow-sm">
                      <Check className="w-6 h-6 text-white" />
                      <span className="text-xs text-white">Confiança</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
