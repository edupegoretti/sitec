"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ZOPU_LINKS } from "@/lib/constants";
import { useCountUp } from "@/hooks/useCountUp";
import { durations, easings, heroEntrance, staggers } from "@/lib/motion";

// Logos com altura baseada em PESO VISUAL (não uniformidade de pixels)
// Logos bold/grossos precisam de MENOS pixels para ter a mesma presença visual
// Logos finos/delicados precisam de MAIS pixels para serem legíveis
const HERO_LOGOS = [
  { name: "WEG", src: "/images/clients/weg.webp", h: "h-10 sm:h-12" }, // icone quadrado
  { name: "SBT", src: "/images/clients/sbt.webp", h: "h-10 sm:h-12" }, // icone quadrado
  { name: "Stone", src: "/images/clients/stone.webp", h: "h-7 sm:h-9" }, // texto médio-bold
  { name: "TS Shara", src: "/images/clients/ts-shara.webp", h: "h-10 sm:h-12" }, // texto FINO - precisa ser maior
  { name: "Komeco", src: "/images/clients/komeco.webp", h: "h-6 sm:h-8" }, // texto BOLD caps - precisa ser menor
  { name: "Unimed", src: "/images/clients/unimed.webp", h: "h-6 sm:h-7" }, // texto MUITO BOLD largo - bem menor
  { name: "Grupo Litoral", src: "/images/clients/grupo-litoral.webp", h: "h-8 sm:h-10" }, // médio
  { name: "BoxTop", src: "/images/clients/boxtop.webp", h: "h-9 sm:h-11" }, // texto fino
  { name: "Posthaus", src: "/images/clients/posthaus.webp", h: "h-10 sm:h-12" }, // texto fino
  { name: "RK2", src: "/images/clients/rk2.webp", h: "h-10 sm:h-12" }, // icone quadrado
  { name: "Valorem", src: "/images/clients/valorem.webp", h: "h-6 sm:h-7" }, // texto BOLD largo - menor
  { name: "Viseu", src: "/images/clients/viseu.webp", h: "h-8 sm:h-10" }, // médio
] as const;

// Animation variants for staggered entrance
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

// Animated client count component
function AnimatedClientCount() {
  const { ref, value: animatedValue } = useCountUp(450, {
    animate: false,
  });

  return <span ref={ref}>{Math.round(animatedValue)}+</span>;
}

export function HeroArquitetura() {
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

            {/* Headline - Nova copy */}
            <motion.h1
              variants={prefersReducedMotion ? undefined : fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ ...transition, delay: heroEntrance.title }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.1] tracking-tight"
            >
              Arquitetura de Receita no Bitrix24
              <br className="hidden sm:block" />
              <span className="text-brand">
                com processo que o time realmente usa.
              </span>
            </motion.h1>

            {/* Subtitulo - Nova copy */}
            <motion.p
              variants={prefersReducedMotion ? undefined : fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ ...transition, delay: heroEntrance.description }}
              className="mt-6 text-lg sm:text-xl text-gray-600 leading-relaxed"
            >
              Nós desenhamos e implementamos o modelo operacional de receita da
              sua empresa dentro do Bitrix24 — com processos, dados e adoção que
              se sustentam no longo prazo.
            </motion.p>

            {/* CTAs - Nova copy */}
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
                Falar com especialista
                <ArrowRight className="w-5 h-5 transition-transform duration-300 ease-out-expo group-hover:translate-x-1" />
              </a>
              <a
                href="#metodo"
                className="text-gray-600 font-medium hover:text-brand transition-colors"
              >
                Ver o método
              </a>
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
            Empresas que confiam seu Bitrix24 à Zopu
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
                    className={`${logo.h} w-auto object-contain`}
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
                    className={`${logo.h} w-auto object-contain`}
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
