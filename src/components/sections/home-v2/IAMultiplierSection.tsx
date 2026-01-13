"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Zap,
  MessageSquare,
  FileSearch,
  TrendingUp,
  Bot,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Database,
  Settings,
  Target,
} from "lucide-react";
import { Container } from "@/components/layout";
import { Badge, Reveal } from "@/components/shared";
import { easings } from "@/lib/motion";

const APLICACOES_IA = [
  {
    icon: MessageSquare,
    titulo: "Análise de conversas",
    descricao: "IA que lê histórico de WhatsApp e sugere próximo passo baseado em contexto real",
    status: "Disponível",
    statusColor: "emerald",
  },
  {
    icon: FileSearch,
    titulo: "Lead scoring preditivo",
    descricao: "Modelo que aprende com seus dados para priorizar leads com maior probabilidade de fechar",
    status: "Disponível",
    statusColor: "emerald",
  },
  {
    icon: TrendingUp,
    titulo: "Forecast assistido",
    descricao: "Previsão de receita baseada em padrões históricos e comportamento do pipeline",
    status: "Beta",
    statusColor: "amber",
  },
  {
    icon: Bot,
    titulo: "Automação inteligente",
    descricao: "Workflows que se adaptam baseados em respostas e comportamento do lead",
    status: "Disponível",
    statusColor: "emerald",
  },
];

const O_QUE_NAO_FAZEMOS = [
  "Não prometemos \"IA mágica\" que resolve sozinha",
  "Não vendemos chatbots genéricos como solução de vendas",
  "Não substituímos processo por tecnologia",
];

// Workflow steps for AI processing
const AI_WORKFLOW = [
  { step: "Dados", sublabel: "Histórico + Contexto", icon: Database, status: "input", color: "#3B82F6" },
  { step: "Processo IA", sublabel: "Análise + Aprendizado", icon: Brain, status: "processing", color: "#8B5CF6" },
  { step: "Insights", sublabel: "Padrões + Recomendações", icon: Target, status: "analysis", color: "#F59E0B" },
  { step: "Ação", sublabel: "Automatização", icon: Zap, status: "output", color: "#10B981" },
] as const;

// Workflow Visual Component
function WorkflowAIVisual() {
  const prefersReducedMotion = useReducedMotion();
  const [animatedStep, setAnimatedStep] = useState(0);

  // Animate through steps
  useEffect(() => {
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setAnimatedStep((prev) => (prev < AI_WORKFLOW.length - 1 ? prev + 1 : 0));
    }, 2000);

    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  return (
    <div className="relative bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-elevated">
      {/* Title */}
      <div className="mb-6">
        <h3 className="text-base font-semibold text-gray-900">Fluxo de IA no Sistema</h3>
        <p className="text-sm text-gray-500 mt-1">Processo completo de multiplicação por IA</p>
      </div>

      {/* SVG Container */}
      <div className="relative" style={{ minHeight: "140px" }}>
        <svg viewBox="0 0 600 120" className="w-full h-auto">
          {/* Definitions for gradients */}
          <defs>
            <linearGradient id="aiFlowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
              <stop offset="33%" stopColor="#8B5CF6" stopOpacity="0.8" />
              <stop offset="66%" stopColor="#F59E0B" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.8" />
            </linearGradient>

            {/* Arrow marker */}
            <marker
              id="aiArrowhead"
              markerWidth="8"
              markerHeight="8"
              refX="7"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 8 3, 0 6" fill="url(#aiFlowGradient)" opacity="0.6" />
            </marker>
          </defs>

          {/* Connection lines */}
          {AI_WORKFLOW.slice(0, -1).map((_, index) => {
            const fromX = 70 + index * 160;
            const toX = 70 + (index + 1) * 160;
            const isActive = index <= animatedStep;

            return (
              <motion.line
                key={`line-${index}`}
                x1={fromX}
                y1="60"
                x2={toX}
                y2="60"
                stroke="url(#aiFlowGradient)"
                strokeWidth="2"
                strokeDasharray="4 4"
                markerEnd="url(#aiArrowhead)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: isActive ? 1 : 0,
                  opacity: isActive ? 0.6 : 0.2,
                }}
                transition={{ duration: 0.8, ease: easings.premium }}
              />
            );
          })}

          {/* Nodes */}
          {AI_WORKFLOW.map((node, index) => {
            const Icon = node.icon;
            const x = 70 + index * 160;
            const isActive = index <= animatedStep;
            const isCurrent = index === animatedStep;

            return (
              <g key={node.step} transform={`translate(${x - 50}, 10)`}>
                {/* Node circle background */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r="30"
                  fill={isActive ? node.color : "#F3F4F6"}
                  fillOpacity={isActive ? 0.15 : 0.5}
                  stroke={node.color}
                  strokeWidth={isCurrent ? 3 : 2}
                  strokeOpacity={isActive ? 0.8 : 0.3}
                  initial={{ scale: 0 }}
                  animate={{
                    scale: isCurrent ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* Icon circle */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r="16"
                  fill={node.color}
                  fillOpacity={isActive ? 1 : 0.3}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1 + index * 0.1, duration: 0.3 }}
                />

                {/* Text */}
                <text
                  x="50"
                  y="100"
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="600"
                  fill={isActive ? "#111827" : "#9CA3AF"}
                >
                  {node.step}
                </text>
                <text
                  x="50"
                  y="115"
                  textAnchor="middle"
                  fontSize="8"
                  fill={isActive ? "#6B7280" : "#D1D5DB"}
                >
                  {node.sublabel}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Progress indicator */}
      <div className="mt-4 flex items-center justify-center gap-2">
        {AI_WORKFLOW.map((_, index) => (
          <div
            key={index}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index <= animatedStep ? "w-8 bg-brand" : "w-1.5 bg-gray-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export function IAMultiplierSection() {
  return (
    <section className="relative py-16 sm:py-24 bg-[#F9FAFC] overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-brand/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <Container className="relative">
        {/* Workflow Visual - Full Width Premium */}
        <Reveal>
          <div className="max-w-4xl mx-auto mb-16">
            <WorkflowAIVisual />
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column - Content */}
          <div>
            <Reveal>
              <Badge variant="default" className="mb-6">
                <Brain className="w-3.5 h-3.5 mr-1.5" />
                Inteligência Artificial
              </Badge>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                IA sem hype:{" "}
                <span className="bg-linear-to-r from-brand to-blue-600 bg-clip-text text-transparent">
                  multiplicador,
                </span>
                <span className="block mt-2">não substituto.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                A nossa abordagem é clara: IA é ferramenta que potencializa processo bem
                desenhado. Sem processo, IA é só ruído caro. Por isso, só ativamos recursos
                de IA após a arquitetura de receita estar funcionando.
              </p>
            </Reveal>

            {/* O que não fazemos */}
            <Reveal delay={0.2}>
              <div className="mt-8 p-5 bg-amber-50 border border-amber-200/60 rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                  </div>
                  <span className="text-sm font-semibold text-amber-900">
                    O que NÃO fazemos
                  </span>
                </div>
                <ul className="space-y-2">
                  {O_QUE_NAO_FAZEMOS.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-amber-800">
                      <span className="text-amber-500 mt-1">✕</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Differentiator */}
            <Reveal delay={0.3}>
              <div className="mt-8 flex items-center gap-4 p-4 bg-emerald-50 border border-emerald-200/60 rounded-2xl">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center shrink-0">
                  <Zap className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-emerald-900">Nossa premissa</p>
                  <p className="text-sm text-emerald-700">
                    Processo + IA = Escala. IA sozinha = Custo sem retorno.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right column - AI Applications Grid */}
          <div className="space-y-5">
            <Reveal delay={0.15}>
              <div className="text-sm text-gray-500 font-medium mb-6 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-brand" />
                Recursos de IA disponíveis na plataforma
              </div>
            </Reveal>

            {APLICACOES_IA.map((aplicacao, index) => {
              const Icon = aplicacao.icon;
              const statusColors = {
                emerald: {
                  bg: "bg-emerald-100",
                  text: "text-emerald-700",
                  dot: "bg-emerald-500",
                },
                amber: {
                  bg: "bg-amber-100",
                  text: "text-amber-700",
                  dot: "bg-amber-500",
                },
              };
              const statusStyle =
                statusColors[aplicacao.statusColor as keyof typeof statusColors];

              return (
                <Reveal key={index} delay={0.2 + index * 0.1}>
                  <div className="group relative bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300">
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className="w-12 h-12 bg-brand/10 rounded-xl flex items-center justify-center shrink-0 transition-colors">
                        <Icon className="w-6 h-6 text-brand" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-3 mb-1">
                          <h3 className="text-base font-semibold text-gray-900">
                            {aplicacao.titulo}
                          </h3>
                          <div
                            className={`flex items-center gap-1.5 px-2.5 py-1 ${statusStyle.bg} rounded-full shrink-0`}
                          >
                            <div
                              className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`}
                            />
                            <span className={`text-xs font-medium ${statusStyle.text}`}>
                              {aplicacao.status}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">{aplicacao.descricao}</p>
                      </div>

                      {/* Arrow */}
                      <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-brand group-hover:translate-x-1 transition-all shrink-0" />
                    </div>
                  </div>
                </Reveal>
              );
            })}

            {/* Coming soon teaser */}
            <Reveal delay={0.6}>
              <div className="relative bg-linear-to-r from-gray-100 to-gray-50 rounded-2xl p-6 border border-dashed border-gray-300">
                <div className="absolute -top-3 right-4">
                  <span className="px-3 py-1 bg-brand text-white text-xs font-semibold rounded-full">
                    Em breve
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center">
                    <Brain className="w-6 h-6 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-500">
                      Copilot de Vendas
                    </h3>
                    <p className="text-sm text-gray-400">
                      Assistente integrado que sugere ações em tempo real
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
