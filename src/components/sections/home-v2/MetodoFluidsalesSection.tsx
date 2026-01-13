"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import {
  Target,
  Settings,
  Users,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  FileText,
  Puzzle,
  Headphones,
} from "lucide-react";
import { Container } from "@/components/layout";
import { Badge, Reveal } from "@/components/shared";
import { easings } from "@/lib/motion";

const ETAPAS = [
  {
    numero: "01",
    titulo: "Arquitetura de Receita",
    subtitulo: "(antes do CRM)",
    descricao:
      "Primeiro entendemos seu modelo de go-to-market, mapeamos jornada do lead→cliente, definimos regras de qualificação, SLAs entre times e métricas de cada etapa.",
    cor: "blue",
    icon: Target,
    itens: [
      "Mapeamento do modelo de go-to-market",
      "Jornada lead → cliente documentada",
      "Regras de qualificação definidas",
      "SLAs entre Marketing, Vendas e CS",
    ],
    duracao: "7 dias",
  },
  {
    numero: "02",
    titulo: "Implementação no Bitrix24",
    subtitulo: "(com integrações)",
    descricao:
      "Traduzimos esse blueprint em configurações concretas: pipelines, automações, dashboards, integração com WhatsApp (WhatsZopu), ERP e outras ferramentas críticas.",
    cor: "brand",
    icon: Puzzle,
    itens: [
      "Pipelines e funis configurados",
      "Automações e workflows",
      "Dashboards de gestão",
      "Integrações (WhatsApp, ERP, etc.)",
    ],
    duracao: "30 dias",
  },
  {
    numero: "03",
    titulo: "Adoção Assistida",
    subtitulo: "(30–90 dias)",
    descricao:
      "Treinamento por função via Fluidz, acompanhamento semanal, suporte prioritário, ajustes finos no processo. O pós-go-live é onde a maioria falha — a gente não falha.",
    cor: "emerald",
    icon: Headphones,
    itens: [
      "Treinamento por função (Fluidz)",
      "Acompanhamento semanal dedicado",
      "Suporte prioritário",
      "Ajustes finos baseados em uso real",
    ],
    duracao: "60-90 dias",
  },
];

const corClasses = {
  blue: {
    bg: "bg-blue-500",
    bgLight: "bg-blue-500/10",
    text: "text-blue-600",
    border: "border-blue-500/20",
    ring: "ring-blue-500/30",
    gradient: "from-blue-500 to-blue-600",
  },
  brand: {
    bg: "bg-brand",
    bgLight: "bg-brand/10",
    text: "text-brand",
    border: "border-brand/20",
    ring: "ring-brand/30",
    gradient: "from-brand to-brand-hover",
  },
  emerald: {
    bg: "bg-emerald-500",
    bgLight: "bg-emerald-500/10",
    text: "text-emerald-600",
    border: "border-emerald-500/20",
    ring: "ring-emerald-500/30",
    gradient: "from-emerald-500 to-emerald-600",
  },
};

// Timeline Interactive Component with Autoplay
function TimelineInterativa() {
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const AUTO_ADVANCE_TIME = 5000; // 5 seconds per step

  useEffect(() => {
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveStep((step) => (step + 1) % ETAPAS.length);
          return 0;
        }
        return prev + (100 / (AUTO_ADVANCE_TIME / 50)); // Update every 50ms
      });
    }, 50);

    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  const currentEtapa = ETAPAS[activeStep];
  const Icon = currentEtapa.icon;
  const cores = corClasses[currentEtapa.cor as keyof typeof corClasses];

  return (
    <div className="relative bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-elevated">
      {/* Timeline Progress Bars */}
      <div className="flex gap-2 mb-6">
        {ETAPAS.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setActiveStep(index);
              setProgress(0);
            }}
            className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden relative"
          >
            <motion.div
              className={`h-full ${index === activeStep ? corClasses[ETAPAS[index].cor as keyof typeof corClasses].bg : "bg-gray-300"}`}
              initial={{ width: "0%" }}
              animate={{
                width: index < activeStep ? "100%" : index === activeStep ? `${progress}%` : "0%",
              }}
              transition={{ duration: 0.1 }}
            />
          </button>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: easings.premium }}
        >
          <div className="flex items-start gap-6">
            {/* Icon */}
            <div className={`w-16 h-16 ${cores.bgLight} rounded-2xl flex items-center justify-center shrink-0 ring-4 ${cores.ring}`}>
              <Icon className={`w-8 h-8 ${cores.text}`} />
            </div>

            {/* Text Content */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className={`text-sm font-semibold ${cores.text}`}>{currentEtapa.duracao}</span>
                <span className="text-gray-300">•</span>
                <span className="text-sm text-gray-500">{currentEtapa.subtitulo}</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{currentEtapa.titulo}</h3>
              <p className="text-gray-600 leading-relaxed">{currentEtapa.descricao}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function MetodoFluidsalesSection() {
  return (
    <section className="relative py-16 sm:py-24 bg-white overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl" />

        {/* Connection line between steps - desktop only */}
        <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-gray-200 to-transparent" />
      </div>

      <Container className="relative">
        {/* Header */}
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge variant="default" className="mb-6">
              <FileText className="w-3.5 h-3.5 mr-1.5" />
              O método
            </Badge>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Fluidsales™:{" "}
              <span className="block mt-2">
                <span className="bg-linear-to-r from-blue-600 via-brand to-emerald-600 bg-clip-text text-transparent">
                  Arquitetura → Implementação → Adoção
                </span>
              </span>
            </h2>

            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              Cada etapa com entregáveis claros, prazos definidos e ROI mensurável.
              Sem prometer milagre — apenas método que funciona.
            </p>
          </div>
        </Reveal>

        {/* Timeline Interativa com Autoplay */}
        <Reveal delay={0.15}>
          <div className="max-w-5xl mx-auto mb-16">
            <TimelineInterativa />
          </div>
        </Reveal>

        {/* Timeline de Etapas */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-6">
          {ETAPAS.map((etapa, index) => {
            const cores = corClasses[etapa.cor as keyof typeof corClasses];
            const Icon = etapa.icon;

            return (
              <Reveal key={index} delay={0.1 + index * 0.15}>
                <div
                  className={`relative h-full bg-white rounded-2xl border ${cores.border} shadow-sm hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 overflow-hidden`}
                >
                  {/* Top gradient bar */}
                  <div className={`h-1.5 bg-linear-to-r ${cores.gradient}`} />

                  <div className="p-8">
                    {/* Número e Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-14 h-14 ${cores.bgLight} rounded-2xl flex items-center justify-center ring-4 ${cores.ring}`}
                        >
                          <Icon className={`w-7 h-7 ${cores.text}`} />
                        </div>
                        <span className={`text-5xl font-bold ${cores.text} opacity-20`}>
                          {etapa.numero}
                        </span>
                      </div>

                      {/* Duration badge */}
                      <div className={`px-3 py-1.5 ${cores.bgLight} rounded-full`}>
                        <span className={`text-xs font-semibold ${cores.text}`}>
                          {etapa.duracao}
                        </span>
                      </div>
                    </div>

                    {/* Title & Subtitle */}
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {etapa.titulo}
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">{etapa.subtitulo}</p>

                    {/* Description */}
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {etapa.descricao}
                    </p>

                    {/* Items checklist */}
                    <ul className="space-y-3">
                      {etapa.itens.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className={`w-5 h-5 ${cores.text} mt-0.5 shrink-0`} />
                          <span className="text-sm text-gray-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Arrow connector - between cards on desktop */}
                  {index < ETAPAS.length - 1 && (
                    <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 bg-white rounded-full shadow-sm items-center justify-center border border-gray-100">
                      <ArrowRight className="w-3 h-3 text-gray-400" />
                    </div>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Bottom summary */}
        <Reveal delay={0.6}>
          <div className="mt-16">
            <div className="relative bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-8 sm:p-10 overflow-hidden">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                />
              </div>

              <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">
                {/* Left content */}
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                    <Sparkles className="w-8 h-8 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Diferencial Zopu</p>
                    <p className="text-2xl sm:text-3xl font-bold text-white">
                      O pós-go-live é onde a maioria falha.
                    </p>
                    <p className="text-lg text-gray-300 mt-1">
                      A gente não falha.
                    </p>
                  </div>
                </div>

                {/* Right - Stats */}
                <div className="flex items-center gap-6 sm:gap-10">
                  <div className="text-center">
                    <div className="text-3xl sm:text-4xl font-bold text-white">97%</div>
                    <div className="text-xs text-gray-400 mt-1">Taxa de adoção</div>
                  </div>
                  <div className="w-px h-12 bg-white/20" />
                  <div className="text-center">
                    <div className="text-3xl sm:text-4xl font-bold text-white">90</div>
                    <div className="text-xs text-gray-400 mt-1">Dias de acompanhamento</div>
                  </div>
                  <div className="w-px h-12 bg-white/20" />
                  <div className="text-center">
                    <div className="text-3xl sm:text-4xl font-bold text-emerald-400">+450</div>
                    <div className="text-xs text-gray-400 mt-1">Projetos entregues</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
