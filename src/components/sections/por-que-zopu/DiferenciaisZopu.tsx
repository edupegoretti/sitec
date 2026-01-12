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
import { SectionHeader, Reveal } from "@/components/shared";
import { DIFERENCIAIS_ZOPU } from "@/lib/constants";
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

// Mapeamento de cores dos badges
const badgeColors: Record<string, string> = {
  success: "bg-green-100 text-green-700",
  brand: "bg-brand/10 text-brand",
  info: "bg-blue-100 text-blue-700",
};

// Animated numbers for featured cards
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

// Bento layout configuration
const BENTO_CONFIG = [
  {
    id: "roi-accountability",
    size: "large",
    gridClass: "md:col-span-2 md:row-span-2",
  },
  { id: "fluidsales", size: "medium", gridClass: "md:col-span-1" },
  { id: "fluidz", size: "medium", gridClass: "md:col-span-1" },
  { id: "integracoes", size: "small", gridClass: "md:col-span-1" },
  { id: "whatszopu", size: "small", gridClass: "md:col-span-1" },
  { id: "suporte-sla", size: "wide", gridClass: "md:col-span-2" },
];

export function DiferenciaisZopu() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-[#F5F5F7] relative overflow-hidden">
      {/* Decorative blurred elements */}
      <div className="absolute top-20 right-0 w-64 h-64 bg-green-500/5 rounded-full translate-x-1/2 blur-3xl" />
      <div className="absolute bottom-20 left-0 w-56 h-56 bg-brand/5 rounded-full -translate-x-1/2 blur-3xl" />

      <Container>
        <SectionHeader
          label="Por que 96% renovam"
          title="Não prometemos resultado. Estruturamos para ele acontecer."
          description="Cada ponto abaixo é uma contramedida para um risco real — com prova mensurável."
        />

        {/* Bento Grid Layout */}
        <div className="grid md:grid-cols-4 gap-4 lg:gap-6 max-w-6xl mx-auto">
          {DIFERENCIAIS_ZOPU.map((diferencial, index) => {
            const Icon = iconMap[diferencial.icon] || TrendUp;
            const badgeColorClass =
              badgeColors[diferencial.badgeVariant] || badgeColors.brand;
            const bentoConfig = BENTO_CONFIG[index] || {
              size: "small",
              gridClass: "",
            };
            const isLarge = bentoConfig.size === "large";
            const isWide = bentoConfig.size === "wide";

            return (
              <Reveal
                key={diferencial.id}
                delay={index * 0.08}
                className={bentoConfig.gridClass}
              >
                <motion.div
                  className={`relative h-full rounded-2xl overflow-hidden group cursor-default ${
                    isLarge
                      ? "bg-gradient-to-br from-brand via-brand to-brand-hover p-8 min-h-[320px]"
                      : isWide
                        ? "bg-gradient-to-r from-gray-900 to-gray-800 p-6"
                        : "bg-white border border-gray-200/80 p-6"
                  }`}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    boxShadow: isLarge
                      ? "0 25px 50px -12px rgba(104, 71, 255, 0.25)"
                      : isWide
                        ? "0 20px 40px -12px rgba(0, 0, 0, 0.15)"
                        : "0 4px 12px -2px rgba(0, 0, 0, 0.08)",
                  }}
                >
                  {/* Glassmorphism overlay for large card */}
                  {isLarge && (
                    <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px]" />
                  )}

                  {/* Card content */}
                  <div
                    className={`relative z-10 h-full flex flex-col ${isLarge ? "justify-between" : ""}`}
                  >
                    {/* Header */}
                    <div
                      className={`flex items-start justify-between gap-3 ${isLarge ? "mb-6" : "mb-4"}`}
                    >
                      <motion.div
                        className={`rounded-xl flex items-center justify-center shrink-0 ${
                          isLarge
                            ? "w-14 h-14 bg-white/20 backdrop-blur-sm"
                            : isWide
                              ? "w-11 h-11 bg-white/10"
                              : "w-11 h-11 bg-brand/10"
                        }`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Icon
                          size={isLarge ? 28 : 20}
                          weight="duotone"
                          className={
                            isLarge || isWide ? "text-white" : "text-brand"
                          }
                        />
                      </motion.div>
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-bold shrink-0 ${
                          isLarge
                            ? "bg-white/20 text-white backdrop-blur-sm"
                            : isWide
                              ? "bg-white/10 text-white"
                              : badgeColorClass
                        }`}
                      >
                        {diferencial.prova}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <div className={isLarge ? "flex-1" : ""}>
                      <h3
                        className={`font-bold mb-2 ${
                          isLarge
                            ? "text-2xl text-white"
                            : isWide
                              ? "text-lg text-white"
                              : "text-lg text-gray-900"
                        }`}
                      >
                        {diferencial.titulo}
                      </h3>
                      <p
                        className={`leading-relaxed ${
                          isLarge
                            ? "text-white/80 text-base"
                            : isWide
                              ? "text-gray-300 text-sm"
                              : "text-gray-600 text-sm mb-4"
                        }`}
                      >
                        {diferencial.descricao}
                      </p>
                    </div>

                    {/* Proof label */}
                    <div
                      className={`flex items-center gap-2 text-sm ${
                        isLarge
                          ? "text-white/70 mt-6 pt-4 border-t border-white/10"
                          : isWide
                            ? "text-gray-400 mt-3"
                            : "text-gray-500"
                      }`}
                    >
                      <Check
                        className={`w-4 h-4 ${isLarge || isWide ? "text-green-400" : "text-green-500"}`}
                      />
                      <span>{diferencial.provaLabel}</span>
                    </div>
                  </div>

                  {/* Animated glow for large card */}
                  {isLarge && (
                    <motion.div
                      className="absolute -bottom-20 -right-20 w-40 h-40 bg-white/10 rounded-full blur-3xl"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.1, 0.2, 0.1],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  )}
                </motion.div>
              </Reveal>
            );
          })}
        </div>

        {/* Bottom highlight - Insight educacional */}
        <Reveal delay={0.7}>
          <motion.div
            className="mt-12 sm:mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-flex items-center gap-4 px-6 py-4 bg-white rounded-2xl border border-gray-100 shadow-card"
              whileHover={{
                y: -2,
                boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.1)",
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
              >
                <GraduationCap
                  size={24}
                  weight="duotone"
                  className="text-brand"
                />
              </motion.div>
              <div className="text-left">
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                  <AnimatedNumber value={70} suffix="%" />
                  <span className="text-lg font-medium text-gray-600 ml-2">
                    do aprendizado é prático
                  </span>
                </p>
                <p className="text-sm text-gray-500">
                  Por isso nossa metodologia é hands-on, não teórica
                </p>
              </div>
            </motion.div>
          </motion.div>
        </Reveal>
      </Container>
    </section>
  );
}
