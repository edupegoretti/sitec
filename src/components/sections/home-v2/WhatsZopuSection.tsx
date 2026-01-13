"use client";

import {
  MessageCircle,
  Shield,
  History,
  Users,
  BarChart3,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Smartphone,
  Building2,
} from "lucide-react";
import { Container } from "@/components/layout";
import { Badge, Reveal } from "@/components/shared";

const PROBLEMAS_WHATSAPP = [
  {
    icon: AlertTriangle,
    problema: "Conversas no celular pessoal",
    consequencia: "Vendedor sai, histórico some",
  },
  {
    icon: Clock,
    problema: "Sem SLA de resposta",
    consequencia: "Lead esfria, oportunidade perdida",
  },
  {
    icon: Users,
    problema: "Sem dono definido",
    consequencia: "Vários vendedores no mesmo lead",
  },
];

const SOLUCOES_WHATSZOPU = [
  {
    icon: History,
    titulo: "Histórico centralizado",
    descricao: "Toda conversa fica no CRM, não no celular do vendedor",
    destaque: true,
  },
  {
    icon: Shield,
    titulo: "Governança real",
    descricao: "SLAs de resposta configuráveis e alertas automáticos",
    destaque: false,
  },
  {
    icon: Users,
    titulo: "Dono + responsável",
    descricao: "Lead sempre tem um responsável claro no sistema",
    destaque: false,
  },
  {
    icon: BarChart3,
    titulo: "Métricas de atendimento",
    descricao: "Tempo de resposta, conversão por canal, performance por vendedor",
    destaque: false,
  },
];

export function WhatsZopuSection() {
  return (
    <section className="relative py-16 sm:py-24 bg-white overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* WhatsApp-inspired pattern */}
        <div className="absolute top-20 right-10 w-32 h-32 opacity-5">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-emerald-600">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </div>
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl" />
      </div>

      <Container className="relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column - Problem + Solution visual */}
          <div className="order-2 lg:order-1">
            {/* The Problem */}
            <Reveal>
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                  </div>
                  <span className="text-sm font-semibold text-red-700">
                    O problema comum
                  </span>
                </div>

                <div className="space-y-3">
                  {PROBLEMAS_WHATSAPP.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-4 bg-red-50/50 border border-red-100 rounded-xl"
                    >
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center shrink-0">
                        <Smartphone className="w-5 h-5 text-red-500" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {item.problema}
                        </p>
                        <p className="text-xs text-red-600">{item.consequencia}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Arrow transition */}
            <Reveal delay={0.3}>
              <div className="flex justify-center my-6">
                <div className="flex flex-col items-center gap-2">
                  <ArrowRight className="w-6 h-6 text-emerald-500 rotate-90" />
                  <span className="text-xs text-gray-400 font-medium">Com WhatsZopu</span>
                </div>
              </div>
            </Reveal>

            {/* The Solution Visual */}
            <Reveal delay={0.4}>
              <div className="relative bg-white rounded-2xl border border-emerald-200 shadow-elevated hover:shadow-elevated-hover hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                {/* Header */}
                <div className="bg-linear-to-r from-emerald-500 to-emerald-600 p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                      <MessageCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-bold">WhatsZopu</p>
                      <p className="text-emerald-100 text-xs">WhatsApp dentro do processo</p>
                    </div>
                  </div>
                </div>

                {/* Chat simulation */}
                <div className="p-6">
                  <div className="space-y-4">
                    {/* Incoming message */}
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center shrink-0">
                        <span className="text-xs font-semibold text-gray-500">JD</span>
                      </div>
                      <div>
                        <div className="bg-gray-100 rounded-2xl rounded-tl-none p-3 max-w-[240px]">
                          <p className="text-sm text-gray-700">
                            Oi, preciso de um orçamento para 50 licenças
                          </p>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">João da Silva • Lead #2847</p>
                      </div>
                    </div>

                    {/* System notification */}
                    <div className="flex justify-center">
                      <div className="px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full">
                        <p className="text-xs text-emerald-700 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3 h-3" />
                          Atribuído automaticamente a Carlos (SDR)
                        </p>
                      </div>
                    </div>

                    {/* Outgoing message */}
                    <div className="flex gap-3 justify-end">
                      <div>
                        <div className="bg-emerald-500 rounded-2xl rounded-tr-none p-3 max-w-[240px]">
                          <p className="text-sm text-white">
                            Olá João! Vou preparar o orçamento. Qual seu melhor email?
                          </p>
                        </div>
                        <p className="text-xs text-gray-400 mt-1 text-right">
                          Carlos • Resp. em 2min
                        </p>
                      </div>
                      <div className="w-8 h-8 bg-brand rounded-full flex items-center justify-center shrink-0">
                        <span className="text-xs font-semibold text-white">CV</span>
                      </div>
                    </div>
                  </div>

                  {/* SLA indicator */}
                  <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="text-xs text-gray-500">SLA: OK (15min)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-gray-400" />
                      <span className="text-xs text-gray-500">Histórico no CRM</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right column - Content */}
          <div className="order-1 lg:order-2">
            <Reveal>
              <Badge variant="success" className="mb-6">
                <MessageCircle className="w-3.5 h-3.5 mr-1.5" />
                WhatsZopu
              </Badge>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                WhatsApp{" "}
                <span className="bg-linear-to-r from-emerald-500 to-emerald-600 bg-clip-text text-transparent">
                  dentro do processo,
                </span>
                <span className="block mt-2">não fora dele.</span>
              </h2>

              <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                Sua equipe usa WhatsApp? Ótimo. Mas se a conversa fica no celular pessoal,
                você perdeu governança, histórico e SLA. O WhatsZopu coloca o WhatsApp
                dentro do CRM — com rastreabilidade total.
              </p>
            </Reveal>

            {/* Features grid */}
            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              {SOLUCOES_WHATSZOPU.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Reveal key={index} delay={0.15 + index * 0.1}>
                    <div
                      className={`p-4 rounded-2xl border hover:-translate-y-1 transition-all duration-300 ${
                        item.destaque
                          ? "bg-emerald-50 border-emerald-200 shadow-sm hover:shadow-card-hover"
                          : "bg-white border-gray-100 hover:border-emerald-200 hover:shadow-sm"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                            item.destaque
                              ? "bg-emerald-500 text-white"
                              : "bg-emerald-100 text-emerald-600"
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{item.titulo}</h4>
                          <p className="text-sm text-gray-500 mt-1">{item.descricao}</p>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            {/* Bottom quote */}
            <Reveal delay={0.6}>
              <div className="mt-8 p-5 bg-gray-900 rounded-2xl">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                    <Shield className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">
                      "Vendedor saiu? O histórico fica."
                    </p>
                    <p className="text-gray-400 text-sm mt-1">
                      Governança de verdade significa que a empresa é dona dos dados,
                      não o vendedor.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
