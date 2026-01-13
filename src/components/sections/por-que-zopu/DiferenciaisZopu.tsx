"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import {
  TrendUp,
  Stack,
  GraduationCap,
  Plug,
  ChatCircle,
  Headphones,
  type IconProps,
} from "@phosphor-icons/react";
import { Container } from "@/components/layout";
import { Badge, Reveal } from "@/components/shared";
import { useCountUp } from "@/hooks/useCountUp";

// Mapeamento de ícones
type PhosphorIcon = React.ComponentType<IconProps>;
const iconMap: Record<string, PhosphorIcon> = {
  TrendingUp: TrendUp,
  Layers: Stack,
  GraduationCap,
  Plug,
  MessageCircle: ChatCircle,
  Headphones,
};

// Animated number component
function AnimatedNumber({
  value,
  suffix = "",
  decimals = 0,
}: {
  value: number;
  suffix?: string;
  decimals?: number;
}) {
  const { ref, value: animatedValue } = useCountUp(value, {
    delay: 300,
    decimals,
  });

  return (
    <span ref={ref}>
      {decimals > 0
        ? animatedValue.toFixed(decimals)
        : Math.round(animatedValue)}
      {suffix}
    </span>
  );
}

// Diferenciais (sem Fluidsales que é o hero)
const DIFERENCIAIS = [
  {
    id: "fluidz",
    titulo: "Fluidz",
    subtitulo: "Adoção vira produto",
    descricao: "Treinamentos por função: gestor, vendas, pós-vendas, RevOps.",
    prova: "9.500+",
    provaLabel: "certificados",
    icon: "GraduationCap",
  },
  {
    id: "whatszopu",
    titulo: "WhatsZopu",
    subtitulo: "API oficial Meta",
    descricao: "Estabilidade e governança para o canal mais crítico.",
    prova: "API Meta",
    provaLabel: "oficial",
    icon: "MessageCircle",
  },
  {
    id: "integracoes",
    titulo: "Integrações",
    subtitulo: "100+ conectores",
    descricao: "CRM conversa com marketing, ERP e financeiro — menos TI.",
    prova: "100+",
    provaLabel: "integrações",
    icon: "Plug",
  },
  {
    id: "sla",
    titulo: "Suporte com SLA",
    subtitulo: "Resposta garantida",
    descricao: "Enterprise: <2 min. Demais planos: <5 min em horário comercial.",
    prova: "<2min",
    provaLabel: "Enterprise SLA",
    icon: "Headphones",
  },
];

export function DiferenciaisZopu() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Decorative blurred elements */}
      <div className="absolute top-20 right-0 w-64 h-64 bg-brand/4 rounded-full translate-x-1/2 blur-3xl" />
      <div className="absolute bottom-20 left-0 w-56 h-56 bg-brand/4 rounded-full -translate-x-1/2 blur-3xl" />

      <Container>
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <Reveal>
            <Badge className="mb-4">Por que 96% renovam</Badge>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Estruturamos para o resultado{" "}
              <span className="text-brand">acontecer.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Cada diferencial abaixo é uma contramedida para um risco real.
            </p>
          </Reveal>
        </div>

        {/* Hero Card - Fluidsales */}
        <Reveal delay={0.3}>
          <motion.div
            className="max-w-4xl mx-auto mb-12 p-8 sm:p-10 bg-linear-to-br from-brand to-brand-hover rounded-3xl relative overflow-hidden"
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              boxShadow: "0 25px 50px -12px rgba(99, 91, 255, 0.3)",
            }}
          >
            {/* Glow effect */}
            <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-white/10 rounded-full blur-3xl" />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                    <Stack size={24} weight="duotone" className="text-white" />
                  </div>
                  <span className="text-white/80 text-sm font-medium">
                    Metodologia proprietária
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                  Fluidsales™ — 6 pilares
                </h3>

                <p className="text-white/80 text-lg leading-relaxed mb-6 max-w-xl">
                  Processo, dados, adoção e métricas estruturados antes de
                  configurar a ferramenta. É por isso que nossos projetos viram
                  rotina, não gaveta.
                </p>

                <div className="flex flex-wrap gap-3">
                  {[
                    "Diagnóstico",
                    "Processo",
                    "Dados",
                    "Automação",
                    "Adoção",
                    "Métricas",
                  ].map((pilar) => (
                    <span
                      key={pilar}
                      className="px-3 py-1.5 bg-white/10 text-white text-sm font-medium rounded-full"
                    >
                      {pilar}
                    </span>
                  ))}
                </div>
              </div>

              {/* ROI Proof */}
              <div className="lg:text-right">
                <div className="inline-block p-6 bg-white/10 backdrop-blur-sm rounded-2xl">
                  <p className="text-5xl sm:text-6xl font-bold text-white mb-1">
                    <AnimatedNumber value={8.71} suffix="x" decimals={2} />
                  </p>
                  <p className="text-white/70 text-sm font-medium">
                    ROI médio dos clientes
                  </p>
                  <div className="flex items-center gap-2 mt-3 text-white/60 text-xs">
                    <Check className="w-3.5 h-3.5 text-green-400" />
                    <span>Medido em 12 meses</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </Reveal>

        {/* Grid 2x2 - Outros diferenciais */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
          {DIFERENCIAIS.map((diferencial, index) => {
            const Icon = iconMap[diferencial.icon] || TrendUp;

            return (
              <Reveal key={diferencial.id} delay={0.4 + index * 0.08}>
                <motion.div
                  className="group p-6 bg-gray-50 rounded-2xl border border-gray-200 hover:border-brand/30 hover:bg-white hover:shadow-lg transition-all duration-300 h-full"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Icon + Badge */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-brand/10 flex items-center justify-center group-hover:bg-brand/15 transition-colors">
                      <Icon
                        size={22}
                        weight="duotone"
                        className="text-brand"
                      />
                    </div>
                    <span className="text-xs font-bold text-brand bg-brand/10 px-2 py-1 rounded-full">
                      {diferencial.prova}
                    </span>
                  </div>

                  {/* Content */}
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-1">
                    {diferencial.subtitulo}
                  </p>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">
                    {diferencial.titulo}
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {diferencial.descricao}
                  </p>

                  {/* Proof label */}
                  <div className="flex items-center gap-2 mt-4 pt-3 border-t border-gray-100 text-xs text-gray-500">
                    <Check className="w-3.5 h-3.5 text-success" />
                    <span>{diferencial.provaLabel}</span>
                  </div>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
