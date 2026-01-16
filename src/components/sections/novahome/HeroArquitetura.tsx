"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ZOPU_LINKS } from "@/lib/constants";
import { useCountUp } from "@/hooks/useCountUp";
import { durations, easings, heroEntrance, staggers } from "@/lib/motion";

// Alturas calculadas individualmente baseadas em:
// 1. Proporção da imagem (largura:altura) - logos mais largos precisam de altura menor
// 2. Tamanho do texto dentro do logo - texto pequeno/fino precisa de altura maior
// 3. Presença visual desejada - todas devem ter impacto visual similar
const HERO_LOGOS = [
  { name: "WEG", src: "/images/clients/weg.webp", h: "h-11 sm:h-12" }, // 100×100 (1:1) - quadrado, texto pequeno interno
  { name: "SBT", src: "/images/clients/sbt.webp", h: "h-10 sm:h-11" }, // 100×100 (1:1) - círculo colorido, alto impacto visual
  { name: "Stone", src: "/images/clients/stone.webp", h: "h-8 sm:h-9" }, // 197×100 (2:1) - horizontal, texto médio
  { name: "TS Shara", src: "/images/clients/ts-shara.webp", h: "h-11 sm:h-12" }, // 171×100 (1.7:1) - subtexto MUITO fino precisa altura
  { name: "Komeco", src: "/images/clients/komeco.webp", h: "h-7 sm:h-8" }, // 251×100 (2.5:1) - largo, BOLD caps
  { name: "Unimed", src: "/images/clients/unimed.webp", h: "h-5 sm:h-6" }, // 690×100 (6.9:1) - EXTREMAMENTE largo, precisa ser bem pequeno
  { name: "Grupo Litoral", src: "/images/clients/grupo-litoral.webp", h: "h-7 sm:h-8" }, // 395×100 (4:1) - largo com ícone
  { name: "BoxTop", src: "/images/clients/boxtop.webp", h: "h-10 sm:h-11" }, // 178×100 (1.8:1) - compacto com subtexto fino
  { name: "Posthaus", src: "/images/clients/posthaus.webp", h: "h-12 sm:h-14" }, // 100×100 (1:1) - quadrado, texto MUITO fino/pequeno
  { name: "RK2", src: "/images/clients/rk2.webp", h: "h-10 sm:h-11" }, // 100×100 (1:1) - quadrado, texto bold interno
  { name: "Valorem", src: "/images/clients/valorem.webp", h: "h-6 sm:h-7" }, // 441×100 (4.4:1) - largo, texto bold
  { name: "Viseu", src: "/images/clients/viseu.webp", h: "h-8 sm:h-9" }, // 262×100 (2.6:1) - médio, ilustração + texto
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
            {/* Eyebrow */}
            <motion.div
              variants={prefersReducedMotion ? undefined : fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ ...transition, delay: heroEntrance.badge }}
              className="inline-flex items-center gap-2.5 px-4 py-2 bg-linear-to-r from-brand/5 to-brand/10 border border-brand/20 rounded-full mb-6 shadow-sm"
            >
              <span className="text-sm font-medium text-brand">
                Organizar para crescer
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={prefersReducedMotion ? undefined : fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ ...transition, delay: heroEntrance.title }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.1] tracking-tight"
            >
              Transforme o Bitrix24 no{" "}
              <span className="text-brand">
                sistema operacional do seu negócio.
              </span>
            </motion.h1>

            {/* Subtitulo */}
            <motion.p
              variants={prefersReducedMotion ? undefined : fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ ...transition, delay: heroEntrance.description }}
              className="mt-6 text-lg sm:text-xl text-gray-600 leading-relaxed"
            >
              Integramos marketing, pré-vendas, vendas e pós-vendas em um fluxo único
              — para aumentar vendas e margem em 30 dias.
            </motion.p>

            {/* CTAs */}
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
