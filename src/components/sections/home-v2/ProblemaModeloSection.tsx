"use client";

import {
  AlertTriangle,
  TrendingDown,
  Users,
  FileQuestion,
  Eye,
  Calculator,
} from "lucide-react";
import { Container } from "@/components/layout";
import { Badge, Reveal } from "@/components/shared";

const SINAIS_PROBLEMA = [
  {
    icon: TrendingDown,
    texto: 'Pipeline vira opinião ("acho que fecha")',
    detail: "Sem critérios claros de passagem entre etapas",
  },
  {
    icon: Users,
    texto: "Follow-up sem dono",
    detail: 'Leads "no limbo" sem responsável definido',
  },
  {
    icon: FileQuestion,
    texto: "Histórico do cliente fragmentado",
    detail: "Informação espalhada em WhatsApp, e-mail, planilhas",
  },
  {
    icon: Eye,
    texto: "Gestor vira fiscal de CRM",
    detail: "Tempo perdido cobrando preenchimento ao invés de vender",
  },
  {
    icon: Calculator,
    texto: "Decisões importantes sem número confiável",
    detail: "Forecast que é chute, não ferramenta de gestão",
  },
];

export function ProblemaModeloSection() {
  return (
    <section className="relative py-16 sm:py-24 bg-[#F9FAFC] overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500/3 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-amber-500/3 rounded-full blur-3xl" />
      </div>

      <Container className="relative">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <Reveal>
            <div className="text-center mb-12">
              <Badge variant="danger" className="mb-6">
                <AlertTriangle className="w-3.5 h-3.5 mr-1.5" />
                O problema real
              </Badge>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                O Bitrix24 não falha por falta de recursos.
                <span className="block mt-2 text-red-600">
                  Ele falha por falta de modelo operacional.
                </span>
              </h2>

              <p className="mt-6 text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
                Configurar etapas é fácil. O que quebra é o mês seguinte: dados inconsistentes,
                uso opcional e WhatsApp fora do processo.
              </p>
            </div>
          </Reveal>

          {/* Visual separator */}
          <Reveal delay={0.1}>
            <div className="flex items-center justify-center gap-4 my-10">
              <div className="h-px flex-1 bg-linear-to-r from-transparent via-gray-200 to-transparent" />
              <span className="text-sm text-gray-400 font-medium px-4">
                Sinais de que você está nesse cenário
              </span>
              <div className="h-px flex-1 bg-linear-to-r from-transparent via-gray-200 to-transparent" />
            </div>
          </Reveal>

          {/* Problem cards */}
          <div className="space-y-4">
            {SINAIS_PROBLEMA.map((sinal, index) => (
              <Reveal key={index} delay={0.1 + index * 0.08}>
                <div className="group flex items-start gap-4 p-5 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-card-hover hover:border-red-200/60 hover:-translate-y-1 transition-all duration-300">
                  {/* Icon */}
                  <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-red-100 transition-colors">
                    <sinal.icon className="w-6 h-6 text-red-500" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-base sm:text-lg font-semibold text-gray-900 group-hover:text-red-700 transition-colors">
                      {sinal.texto}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      {sinal.detail}
                    </p>
                  </div>

                  {/* Visual indicator */}
                  <div className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full bg-gray-50 group-hover:bg-red-50 transition-colors">
                    <AlertTriangle className="w-4 h-4 text-gray-300 group-hover:text-red-400 transition-colors" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Visual impact indicator */}
          <Reveal delay={0.6}>
            <div className="mt-12 p-6 bg-linear-to-r from-red-50 to-amber-50 rounded-2xl border border-red-100/50">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center">
                    <svg className="w-7 h-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Resultado previsível</p>
                    <p className="text-lg font-bold text-gray-900">CRM que ninguém confia</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 px-5 py-3 bg-white rounded-xl shadow-sm">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center">
                      <span className="text-xs">👤</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center">
                      <span className="text-xs">👤</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center">
                      <span className="text-xs">👤</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Time volta para</p>
                    <p className="text-sm font-semibold text-gray-900">planilha + WhatsApp</p>
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
