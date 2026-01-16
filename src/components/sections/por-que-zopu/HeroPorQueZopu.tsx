"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { ZOPU_LINKS } from "@/lib/constants";
import { useCountUp } from "@/hooks/useCountUp";

// Logos para carousel (mesmos da home)
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
] as const;

const sizeClasses = {
  square: "h-10 sm:h-12",
  medium: "h-8 sm:h-10",
  wide: "h-6 sm:h-8",
  extrawide: "h-5 sm:h-6",
} as const;

// Animated ROI counter
function AnimatedROI() {
  const { ref, value: animatedValue } = useCountUp(8.71, {
    delay: 300,
    decimals: 2,
    animate: false,
  });

  return <span ref={ref}>{animatedValue.toFixed(2)}</span>;
}

export function HeroPorQueZopu() {
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
            {/* Badge Gold Partner */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-linear-to-r from-amber-50 to-amber-100/80 border border-amber-200/60 rounded-full mb-6 shadow-sm">
              <svg
                className="w-4 h-4 text-amber-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm font-medium text-amber-800">
                Parceiro Gold Bitrix24
              </span>
            </div>

            {/* Headline - Insight que educa */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.1] tracking-tight">
              A maioria dos projetos de CRM não falha por falta de esforço.
              <br />
              <span className="text-brand">Falha por falta de metodologia.</span>
            </h1>

            {/* Subtítulo - Risk Reversal */}
            <p className="mt-6 text-lg sm:text-xl text-gray-600 leading-relaxed">
              A diferença não é "qual ferramenta".
              <br className="hidden sm:block" />É{" "}
              <span className="text-gray-900 font-medium">
                como o projeto é conduzido
              </span>{" "}
              e{" "}
              <span className="text-gray-900 font-medium">
                quem assume a responsabilidade pelo pós-go-live.
              </span>
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={ZOPU_LINKS.whatsappEspecialista}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-brand text-white text-base font-semibold rounded-2xl hover:bg-brand-hover transition-all duration-300 ease-out-expo shadow-elevated shadow-brand/20 hover:shadow-elevated-hover hover:shadow-brand/30 hover:-translate-y-1"
              >
                Quero diagnóstico (20 min)
                <ArrowRight className="w-5 h-5 transition-transform duration-300 ease-out-expo group-hover:translate-x-1" />
              </a>
              <a
                href="/seguranca"
                className="inline-flex items-center gap-2 px-6 py-4 text-gray-700 font-semibold rounded-2xl hover:text-brand hover:bg-gray-50 transition-all duration-300 ease-out-expo"
              >
                Ver Trust Center
              </a>
            </div>
          </div>

          {/* Coluna do número destaque - Estatística educacional */}
          <div className="relative lg:order-last order-first flex items-center justify-center">
            <div className="relative text-center">
              {/* Glow pulsante */}
              <motion.div
                className="absolute inset-0 blur-3xl bg-brand/15 scale-150 rounded-full"
                animate={{
                  scale: [1.5, 1.7, 1.5],
                  opacity: [0.15, 0.25, 0.15],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Número principal - ROI médio de CRM */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="text-[8rem] sm:text-[10rem] lg:text-[12rem] font-bold leading-none bg-linear-to-b from-gray-900 via-gray-700 to-gray-400 bg-clip-text text-transparent">
                  <AnimatedROI />
                </span>
                <motion.span
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold text-brand align-top"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                >
                  x
                </motion.span>
              </motion.div>

              {/* Label */}
              <motion.p
                className="text-xl sm:text-2xl text-gray-700 font-medium mt-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                é o ROI médio de CRM bem implementado
              </motion.p>
              <motion.p
                className="text-sm text-gray-500 mt-2 max-w-xs mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                Pesquisa realizada em agosto de 2025 com 103 clientes da Zopu
                que possuem acompanhamento evolutivo de RevOps
              </motion.p>
            </div>
          </div>
        </div>

        {/* Trust logos - Carrossel infinito */}
        <div className="mt-12 pt-10 border-t border-gray-100">
          <p className="text-center text-xs text-gray-400 uppercase tracking-wider mb-6">
            Empresas que confiam na Zopu
          </p>

          {/* Container com overflow hidden para o carrossel */}
          <div className="relative overflow-hidden">
            {/* Gradientes de fade nas bordas */}
            <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-linear-to-r from-white to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-linear-to-l from-white to-transparent z-10" />

            {/* Carrossel animado */}
            <div className="flex animate-scroll items-center">
              {/* Primeira cópia dos logos */}
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
                    className={`${sizeClasses[logo.size]} w-auto object-contain opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300`}
                  />
                </div>
              ))}
              {/* Segunda cópia para loop infinito */}
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
                    className={`${sizeClasses[logo.size]} w-auto object-contain opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
