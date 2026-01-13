"use client";

import {
  Calendar,
  ArrowRight,
  Clock,
  CheckCircle2,
  MessageCircle,
  Sparkles,
  Shield,
} from "lucide-react";
import { Container } from "@/components/layout";
import { Reveal } from "@/components/shared";

const BENEFICIOS_CALL = [
  "Entender seu momento atual de maturidade comercial",
  "Identificar gargalos de processo (não só de ferramenta)",
  "Ver se há fit com nossa metodologia",
  "Sair com próximos passos claros — mesmo que não feche conosco",
];

const TRUST_ELEMENTS = [
  {
    icon: Clock,
    texto: "20 minutos de diagnóstico",
    subtexto: "Objetivo e direto ao ponto",
  },
  {
    icon: Shield,
    texto: "Sem compromisso",
    subtexto: "Você decide se faz sentido",
  },
  {
    icon: Sparkles,
    texto: "Com especialista",
    subtexto: "Não é SDR vendendo licença",
  },
];

export function CTAFinalSection() {
  return (
    <section className="relative py-16 sm:py-24 bg-linear-to-b from-brand to-brand-hover overflow-hidden">
      {/* Background elements - simplificado */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient overlays sutis */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-black/10 rounded-full blur-3xl" />
      </div>

      <Container className="relative">
        <div className="max-w-4xl mx-auto">
          {/* Main content */}
          <Reveal>
            <div className="text-center mb-12">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full mb-8">
                <div className="w-2 h-2 rounded-full bg-white" />
                <span className="text-sm text-white/90 font-medium">
                  Vagas limitadas por mês
                </span>
              </div>

              {/* Headline */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
                Pronto para ter{" "}
                <span className="text-white/90 underline decoration-white/40 underline-offset-4">
                  receita auditável
                </span>
                ?
              </h2>

              {/* Subheadline */}
              <p className="mt-6 text-lg sm:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto">
                Em 20 minutos, você vai entender se o Fluidsales™ é o caminho certo
                para transformar sua operação comercial em uma máquina previsível.
              </p>
            </div>
          </Reveal>

          {/* CTA Card */}
          <Reveal delay={0.2}>
            <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden hover:-translate-y-1 transition-all duration-300">

              <div className="p-8 sm:p-10 lg:p-12">
                <div className="grid lg:grid-cols-[1fr,auto] gap-10 items-center">
                  {/* Left content */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      Diagnóstico de Arquitetura de Receita
                    </h3>

                    <p className="text-gray-600 mb-6">
                      Uma conversa estruturada para entender sua operação e
                      identificar onde está o maior potencial de melhoria.
                    </p>

                    {/* Benefits */}
                    <ul className="space-y-3 mb-8">
                      {BENEFICIOS_CALL.map((beneficio, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="text-gray-700">{beneficio}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Trust elements */}
                    <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-6 border-t border-gray-100">
                      {TRUST_ELEMENTS.map((item, index) => {
                        const Icon = item.icon;
                        return (
                          <div
                            key={index}
                            className="flex items-center gap-2"
                          >
                            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                              <Icon className="w-4 h-4 text-gray-500" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {item.texto}
                              </p>
                              <p className="text-xs text-gray-500">{item.subtexto}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right - CTA buttons */}
                  <div className="lg:border-l lg:border-gray-100 lg:pl-10 flex flex-col gap-4">
                    {/* Primary CTA */}
                    <a
                      href="https://wa.me/5547988459378?text=Ol%C3%A1!%20Quero%20agendar%20um%20diagn%C3%B3stico%20de%20arquitetura%20de%20receita."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center justify-center gap-3 px-8 py-5 bg-brand text-white text-lg font-bold rounded-2xl hover:bg-brand-hover transition-all duration-300 shadow-elevated shadow-brand/30 hover:shadow-elevated-hover hover:shadow-brand/40 hover:-translate-y-1"
                    >
                      <Calendar className="w-6 h-6" />
                      Agendar diagnóstico
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>

                    {/* Secondary */}
                    <a
                      href="https://wa.me/5547988459378?text=Ol%C3%A1!%20Tenho%20algumas%20d%C3%BAvidas%20antes%20de%20agendar."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 text-gray-600 font-medium rounded-2xl border-2 border-gray-200 hover:border-brand/30 hover:bg-brand/5 transition-all duration-300"
                    >
                      <MessageCircle className="w-5 h-5" />
                      Tenho uma dúvida primeiro
                    </a>

                    {/* Micro-copy */}
                    <p className="text-center text-xs text-gray-400">
                      Resposta em até 2h úteis
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Final micro-copy */}
          <Reveal delay={0.4}>
            <p className="mt-10 text-center text-white/70 text-sm">
              Mais de{" "}
              <span className="text-white font-semibold">450 empresas</span>{" "}
              já confiaram sua receita à Zopu. Sua vez?
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
