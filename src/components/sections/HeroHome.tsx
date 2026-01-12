"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useMotionValueEvent, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ZOPU_LINKS } from "@/lib/constants";
import { useCountUp } from "@/hooks/useCountUp";
import { durations, easings, heroEntrance, staggers } from "@/lib/motion";

// Logos com altura ajustada por proporcao para peso visual uniforme
// Categorias: square (1:1), medium (1.5-2.5:1), wide (3-5:1), extrawide (6+:1)
const HERO_LOGOS = [
  { name: "WEG", src: "/images/clients/weg.webp", size: "square" },
  { name: "SBT", src: "/images/clients/sbt.webp", size: "square" },
  { name: "Stone", src: "/images/clients/stone.webp", size: "medium" },
  { name: "TS Shara", src: "/images/clients/ts-shara.webp", size: "medium" },
  { name: "Komeco", src: "/images/clients/komeco.webp", size: "medium" },
  { name: "Unimed", src: "/images/clients/unimed.webp", size: "extrawide" },
  {
    name: "Grupo Litoral",
    src: "/images/clients/grupo-litoral.webp",
    size: "wide",
  },
  { name: "BoxTop", src: "/images/clients/boxtop.webp", size: "medium" },
  { name: "Posthaus", src: "/images/clients/posthaus.webp", size: "square" },
  { name: "RK2", src: "/images/clients/rk2.webp", size: "square" },
  { name: "Valorem", src: "/images/clients/valorem.webp", size: "wide" },
  { name: "Viseu", src: "/images/clients/viseu.webp", size: "medium" },
] as const;

// Mapeamento de tamanhos para classes de altura
const sizeClasses = {
  square: "h-10 sm:h-12", // 40px/48px - logos quadrados
  medium: "h-8 sm:h-10", // 32px/40px - logos medios
  wide: "h-6 sm:h-8", // 24px/32px - logos largos
  extrawide: "h-5 sm:h-6", // 20px/24px - logos muito largos
} as const;

// Animation variants for staggered entrance
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

// Animated client count component
function AnimatedClientCount() {
  const { ref, value: animatedValue } = useCountUp(450, { delay: 500 });
  const [displayNumber, setDisplayNumber] = useState(0);

  useMotionValueEvent(animatedValue, "change", (latest) => {
    setDisplayNumber(latest);
  });

  return <span ref={ref}>{Math.round(displayNumber)}+</span>;
}

export function HeroHome() {
  const prefersReducedMotion = useReducedMotion();

  // Animation transition config
  const transition = {
    duration: durations.medium,
    ease: easings.premium,
  };

  return (
    <section className="relative bg-white overflow-hidden">
      {/* Background gradient minimalista */}
      <div className="absolute inset-0 bg-linear-to-b from-white via-white to-gray-50/50" />

      {/* Elemento decorativo sutil */}
      <div className="absolute top-0 right-0 w-1/2 h-full">
        <div className="absolute inset-0 bg-linear-to-l from-brand/2 to-transparent" />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-20 pb-12 sm:pb-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Coluna de texto */}
          <div className="max-w-xl">
            {/* Badge Gold Partner - Premium styling */}
            <motion.div
              variants={prefersReducedMotion ? undefined : fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ ...transition, delay: heroEntrance.badge }}
              className="inline-flex items-center gap-2.5 px-4 py-2 bg-linear-to-r from-amber-50 to-amber-100/80 border border-amber-200/60 rounded-full mb-6 shadow-sm"
            >
              <svg
                className="w-4 h-4 text-amber-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm font-medium text-amber-800">
                Gold Partner Bitrix24
              </span>
            </motion.div>

            {/* Headline - Challenger: promessa segura */}
            <motion.h1
              variants={prefersReducedMotion ? undefined : fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ ...transition, delay: heroEntrance.title }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.1] tracking-tight"
            >
              Bitrix24 que vira rotina.
              <br className="hidden sm:block" />
              <span className="text-brand">
                E vira número que a liderança confia.
              </span>
            </motion.h1>

            {/* Subtitulo com posicionamento claro - Operação de Receita */}
            <motion.p
              variants={prefersReducedMotion ? undefined : fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ ...transition, delay: heroEntrance.description }}
              className="mt-6 text-lg sm:text-xl text-gray-600 leading-relaxed"
            >
              A Zopu implementa Bitrix24 como{" "}
              <strong className="text-gray-900">Operação de Receita</strong>:
              processo, dados e adoção — com acompanhamento pós-go-live para o
              CRM não morrer depois da implementação.
            </motion.p>

            {/* Bullets de benefícios */}
            <motion.ul
              variants={prefersReducedMotion ? undefined : fadeUp}
              initial="hidden"
              animate="visible"
              transition={{
                ...transition,
                delay: heroEntrance.description + 0.1,
              }}
              className="mt-5 space-y-2"
            >
              <li className="flex items-center gap-2 text-gray-600">
                <svg
                  className="w-4 h-4 text-brand shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>
                  Pipeline com critérios claros (sem "achismo" no forecast)
                </span>
              </li>
              <li className="flex items-center gap-2 text-gray-600">
                <svg
                  className="w-4 h-4 text-brand shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>
                  WhatsApp com governança (histórico, responsável e SLA)
                </span>
              </li>
              <li className="flex items-center gap-2 text-gray-600">
                <svg
                  className="w-4 h-4 text-brand shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>
                  Time treinado por função para usar o sistema no dia a dia
                </span>
              </li>
            </motion.ul>

            {/* CTAs - Premium hover effects */}
            <motion.div
              variants={prefersReducedMotion ? undefined : fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ ...transition, delay: heroEntrance.cta }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <a
                href={ZOPU_LINKS.whatsappEspecialista}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-brand text-white text-base font-semibold rounded-2xl hover:bg-brand-hover transition-all duration-300 ease-out-expo shadow-elevated shadow-brand/20 hover:shadow-elevated-hover hover:shadow-brand/30 hover:-translate-y-1"
              >
                Quero um diagnóstico (20 min)
                <ArrowRight className="w-5 h-5 transition-transform duration-300 ease-out-expo group-hover:translate-x-1" />
              </a>
              <a
                href="/cases"
                className="text-gray-600 font-medium hover:text-brand transition-colors"
              >
                Ver cases reais
              </a>
            </motion.div>

            {/* Microcopy */}
            <motion.p
              variants={prefersReducedMotion ? undefined : fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ ...transition, delay: heroEntrance.cta + 0.1 }}
              className="mt-3 text-xs text-gray-400"
            >
              Se não fizer sentido para sua empresa, a gente fala na hora.
            </motion.p>

            {/* Trust bar - Credenciais complementares (sem repetir 96%) */}
            <motion.div
              variants={prefersReducedMotion ? undefined : fadeUp}
              initial="hidden"
              animate="visible"
              transition={{
                ...transition,
                delay: heroEntrance.cta + staggers.items,
              }}
              className="mt-8 flex flex-wrap items-center gap-6 text-sm text-gray-500"
            >
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-amber-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>Gold Partner Bitrix24</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-brand"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span>
                  <AnimatedClientCount /> clientes ativos
                </span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-brand"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <span>Reconhecidos pela Bitrix24</span>
              </div>
            </motion.div>
          </div>

          {/* Coluna da imagem */}
          <motion.div
            variants={prefersReducedMotion ? undefined : fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ ...transition, delay: heroEntrance.visual }}
            className="relative lg:order-last order-first"
          >
            <div className="relative lg:-mr-8 xl:-mr-16">
              <Image
                src="/images/bitrix24crm.webp"
                alt="Bitrix24 CRM - Pipeline de vendas organizado"
                width={1200}
                height={786}
                priority
                className="w-full h-auto"
              />
            </div>
          </motion.div>
        </div>

        {/* Trust logos - Carrossel infinito */}
        <motion.div
          variants={prefersReducedMotion ? undefined : fadeUp}
          initial="hidden"
          animate="visible"
          transition={{
            ...transition,
            delay: heroEntrance.visual + staggers.sections,
          }}
          className="mt-12 pt-10 border-t border-gray-100"
        >
          <p className="text-center text-xs text-gray-400 uppercase tracking-wider mb-6">
            Empresas que não podem "brincar" com CRM confiam na Zopu
          </p>

          {/* Container com overflow hidden para o carrossel */}
          <div className="relative overflow-hidden">
            {/* Gradientes de fade nas bordas */}
            <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-linear-to-r from-white to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-linear-to-l from-white to-transparent z-10" />

            {/* Carrossel animado */}
            <div className="flex animate-scroll items-center">
              {/* Primeira copia dos logos */}
              {HERO_LOGOS.map((logo, index) => (
                <div
                  key={`first-${index}`}
                  className="shrink-0 mx-6 sm:mx-8 lg:mx-10 flex items-center"
                >
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    width={200}
                    height={60}
                    className={`${sizeClasses[logo.size]} w-auto object-contain`}
                  />
                </div>
              ))}
              {/* Segunda copia para loop infinito */}
              {HERO_LOGOS.map((logo, index) => (
                <div
                  key={`second-${index}`}
                  className="shrink-0 mx-6 sm:mx-8 lg:mx-10 flex items-center"
                >
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    width={200}
                    height={60}
                    className={`${sizeClasses[logo.size]} w-auto object-contain`}
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
