"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Check,
  X,
  HelpCircle,
  ArrowRight,
  Sparkles,
  Scale,
} from "lucide-react";
import { Container } from "@/components/layout";
import { Badge, Reveal } from "@/components/shared";
import { easings } from "@/lib/motion";

const COMPARACAO_ITEMS = [
  {
    categoria: "Abordagem",
    zopu: "Arquitetura de receita primeiro, CRM depois",
    outros: "Implementa CRM sem revisar processo",
    zopuDestaque: true,
  },
  {
    categoria: "Processo",
    zopu: "Desenho completo do modelo operacional",
    outros: "Configuração técnica apenas",
    zopuDestaque: true,
  },
  {
    categoria: "WhatsApp",
    zopu: "Integrado com governança (WhatsZopu)",
    outros: "Por conta do cliente ou terceiros",
    zopuDestaque: true,
  },
  {
    categoria: "Treinamento",
    zopu: "Por função + acompanhamento 90 dias (Fluidz)",
    outros: "Genérico ou EAD básico",
    zopuDestaque: true,
  },
  {
    categoria: "IA",
    zopu: "Após processo validado — multiplicador",
    outros: "Promessa de \"IA mágica\" sem base",
    zopuDestaque: true,
  },
  {
    categoria: "Pós-go-live",
    zopu: "Acompanhamento dedicado por 30-90 dias",
    outros: "Suporte padrão (tickets)",
    zopuDestaque: true,
  },
  {
    categoria: "Forecast",
    zopu: "Com critérios claros desde o início",
    outros: "\"Depois a gente vê\"",
    zopuDestaque: true,
  },
  {
    categoria: "Resultado",
    zopu: "Receita auditável com ROI mensurável",
    outros: "\"CRM implantado\" (sem garantia de uso)",
    zopuDestaque: true,
  },
];

const FEATURES_CHECK = [
  { feature: "Arquitetura de receita documentada", zopu: true, outros: false },
  { feature: "Integração WhatsApp com governança", zopu: true, outros: "parcial" },
  { feature: "Treinamento por função", zopu: true, outros: false },
  { feature: "Acompanhamento pós-go-live", zopu: true, outros: "parcial" },
  { feature: "Métricas de adoção garantidas", zopu: true, outros: false },
  { feature: "IA como multiplicador", zopu: true, outros: "parcial" },
];

export function ComparacaoSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative py-20 sm:py-28 bg-white overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-brand/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl" />
      </div>

      <Container className="relative">
        {/* Header */}
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <Badge variant="default" className="mb-6">
              <Scale className="w-3.5 h-3.5 mr-1.5" />
              Comparação honesta
            </Badge>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Por que a Zopu{" "}
              <span className="bg-gradient-to-r from-brand to-brand-hover bg-clip-text text-transparent">
                é diferente
              </span>
            </h2>

            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              Não somos a opção mais barata. Somos a opção que entrega resultado
              mensurável. Veja a diferença na prática.
            </p>
          </div>
        </Reveal>

        {/* Comparison Table */}
        <Reveal delay={0.1}>
          <div className="mb-16">
            <div className="bg-white rounded-3xl border border-gray-200 shadow-elevated overflow-hidden">
              {/* Table header */}
              <div className="grid grid-cols-[1fr,1fr,1fr] bg-gray-50 border-b border-gray-200">
                <div className="p-5">
                  <span className="text-sm font-semibold text-gray-500">
                    Aspecto
                  </span>
                </div>
                <div className="p-5 bg-brand/5 border-x border-brand/10">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-brand" />
                    <span className="text-sm font-bold text-brand">Zopu</span>
                  </div>
                </div>
                <div className="p-5">
                  <span className="text-sm font-semibold text-gray-500">
                    Implementadores tradicionais
                  </span>
                </div>
              </div>

              {/* Table rows */}
              {COMPARACAO_ITEMS.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  className={`grid grid-cols-[1fr,1fr,1fr] ${
                    index < COMPARACAO_ITEMS.length - 1
                      ? "border-b border-gray-100"
                      : ""
                  }`}
                >
                  <div className="p-5 flex items-center">
                    <span className="text-sm font-medium text-gray-700">
                      {item.categoria}
                    </span>
                  </div>
                  <div className="p-5 bg-brand/5 border-x border-brand/10 flex items-center">
                    <div className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-900">{item.zopu}</span>
                    </div>
                  </div>
                  <div className="p-5 flex items-center">
                    <div className="flex items-start gap-2">
                      <X className="w-5 h-5 text-gray-300 shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-500">{item.outros}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Feature checklist */}
        <Reveal delay={0.3}>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Zopu column */}
            <motion.div
              whileHover={
                prefersReducedMotion ? undefined : { y: -4 }
              }
              transition={{ duration: 0.3, ease: easings.premium }}
              className="bg-gradient-to-br from-brand/5 via-brand/10 to-brand/5 rounded-3xl p-8 border border-brand/20"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-brand rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Com a Zopu</h3>
                  <p className="text-sm text-brand">Receita auditável garantida</p>
                </div>
              </div>

              <ul className="space-y-4">
                {FEATURES_CHECK.map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4 text-emerald-600" />
                    </div>
                    <span className="text-sm text-gray-700">{item.feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Others column */}
            <motion.div
              whileHover={
                prefersReducedMotion ? undefined : { y: -4 }
              }
              transition={{ duration: 0.3, ease: easings.premium }}
              className="bg-gray-50 rounded-3xl p-8 border border-gray-200"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center">
                  <HelpCircle className="w-6 h-6 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-500">
                    Implementador tradicional
                  </h3>
                  <p className="text-sm text-gray-400">Resultado incerto</p>
                </div>
              </div>

              <ul className="space-y-4">
                {FEATURES_CHECK.map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    {item.outros === true ? (
                      <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
                        <Check className="w-4 h-4 text-emerald-600" />
                      </div>
                    ) : item.outros === "parcial" ? (
                      <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center shrink-0">
                        <span className="text-xs text-amber-600 font-bold">~</span>
                      </div>
                    ) : (
                      <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center shrink-0">
                        <X className="w-4 h-4 text-red-400" />
                      </div>
                    )}
                    <span className="text-sm text-gray-500">{item.feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </Reveal>

        {/* Bottom message */}
        <Reveal delay={0.5}>
          <div className="mt-14 text-center">
            <div className="inline-flex items-center gap-4 p-5 bg-amber-50 border border-amber-200/60 rounded-2xl">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <Scale className="w-6 h-6 text-amber-600" />
              </div>
              <div className="text-left">
                <p className="text-amber-900 font-semibold">
                  A pergunta certa não é "quanto custa?"
                </p>
                <p className="text-amber-700 text-sm">
                  É "quanto custa <span className="font-semibold">não funcionar</span>?"
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
