"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Play, Calendar, Sparkles } from "lucide-react";
import { Container } from "@/components/layout";
import { durations, easings, heroEntrance, staggers } from "@/lib/motion";
import { useCountUp } from "@/hooks/useCountUp";

// Trust bar items
const TRUST_ITEMS = [
  { label: "Gold Partner Bitrix24", icon: "gold" },
  { label: "Metodologia Fluidsales™", icon: "methodology" },
  { label: "Treinamento por função (Fluidz)", icon: "training" },
  { label: "Integração WhatsApp (WhatsZopu)", icon: "whatsapp" },
] as const;

// Logos com altura ajustada por proporcao para peso visual uniforme
// Categorias: square (1:1), medium (1.5-2.5:1), wide (3-5:1), extrawide (6+:1)
const CLIENT_LOGOS = [
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

// Animated client count component
function AnimatedClientCount() {
  const { ref, value: animatedValue } = useCountUp(450, {
    animate: false,
  });

  return <span ref={ref}>{Math.round(animatedValue)}+</span>;
}

export function HeroArquitetura() {
  const prefersReducedMotion = useReducedMotion();

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  };

  const transition = {
    duration: durations.medium,
    ease: easings.premium,
  };

  return (
    <section className="relative min-h-[90vh] flex items-center bg-gradient-to-b from-white via-white to-gray-50/30 overflow-hidden">
      {/* Background decorative elements - Premium */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs - Aumentados e mais intensos */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-brand/8 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute top-1/3 -left-60 w-[500px] h-[500px] bg-amber-500/8 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s' }} />
        <div className="absolute -bottom-40 right-1/4 w-[450px] h-[450px] bg-emerald-500/8 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '12s' }} />
        <div className="absolute top-1/2 right-1/3 w-[350px] h-[350px] bg-purple-500/6 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '15s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-blue-500/6 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '11s' }} />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <Container className="relative py-16 sm:py-20 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column - Content */}
          <div className="max-w-xl lg:max-w-none">
            {/* Badge */}
            <motion.div
              variants={prefersReducedMotion ? undefined : fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ ...transition, delay: heroEntrance.badge }}
            >
              <span className="inline-flex items-center gap-2.5 px-4 py-2 bg-gradient-to-r from-amber-50 to-amber-100/80 border border-amber-200/60 rounded-full shadow-sm">
                <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-sm font-medium text-amber-800">Gold Partner Bitrix24</span>
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={prefersReducedMotion ? undefined : fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ ...transition, delay: heroEntrance.title }}
              className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.1] tracking-tight"
            >
              Arquitetura de Receita no Bitrix24
              <span className="block mt-2 bg-gradient-to-r from-brand via-brand to-brand-hover bg-clip-text text-transparent">
                para ROI mensurável e previsibilidade real.
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={prefersReducedMotion ? undefined : fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ ...transition, delay: heroEntrance.description }}
              className="mt-6 text-lg sm:text-xl text-gray-600 leading-relaxed"
            >
              Nós desenhamos e implementamos o modelo operacional de receita (Marketing → Vendas → CS)
              dentro do Bitrix24, com integrações críticas e treinamento por função — e acompanhamos
              o pós-go-live até o sistema virar base confiável para decisão.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={prefersReducedMotion ? undefined : fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ ...transition, delay: heroEntrance.cta }}
              className="mt-8 flex flex-col sm:flex-row gap-4"
            >
              <a
                href="https://wa.me/5547988459378?text=Ol%C3%A1!%20Vim%20pelo%20site%20e%20gostaria%20de%20agendar%20um%20diagn%C3%B3stico."
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-brand text-white text-base font-semibold rounded-2xl hover:bg-brand-hover transition-all duration-300 shadow-elevated shadow-brand/20 hover:shadow-elevated-hover hover:shadow-brand/30 hover:-translate-y-1"
              >
                <Calendar className="w-5 h-5" />
                Agendar diagnóstico (20 min)
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>

              <Link
                href="/metodologia"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-gray-700 text-base font-semibold rounded-2xl border-2 border-gray-200 hover:border-brand/30 hover:bg-brand-light/30 transition-all duration-300 shadow-sm hover:shadow-card"
              >
                <Play className="w-5 h-5 text-brand" />
                Ver o método
                <span className="text-sm text-gray-500 font-normal">(7/30/60/90 dias)</span>
              </Link>
            </motion.div>

            {/* Trust bar - Enhanced */}
            <motion.div
              variants={prefersReducedMotion ? undefined : fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ ...transition, delay: heroEntrance.cta + staggers.items }}
              className="mt-10 pt-8 border-t border-gray-100"
            >
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
                <div className="flex items-center gap-2 text-gray-500">
                  <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>Gold Partner Bitrix24</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <svg className="w-4 h-4 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="font-semibold text-brand">
                    <AnimatedClientCount />
                  </span>
                  <span>clientes ativos</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <svg className="w-4 h-4 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>Reconhecidos pela Bitrix24</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right column - Visual */}
          <motion.div
            variants={prefersReducedMotion ? undefined : scaleIn}
            initial="hidden"
            animate="visible"
            transition={{ ...transition, delay: heroEntrance.visual }}
            className="relative"
          >
            {/* Main visual container */}
            <div className="relative">
              {/* Glowing border effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-brand/20 via-amber-500/20 to-emerald-500/20 rounded-3xl blur-xl opacity-60" />

              {/* Main card */}
              <div className="relative bg-white rounded-3xl shadow-elevated overflow-hidden border border-gray-100">
                {/* Visual representation of Revenue Architecture */}
                <div className="p-8 sm:p-10">
                  {/* Title inside visual */}
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-brand/10 rounded-xl flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-brand" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Arquitetura de Receita</p>
                      <p className="text-sm font-semibold text-gray-900">Marketing → Vendas → CS</p>
                    </div>
                  </div>

                  {/* Flow diagram */}
                  <div className="space-y-4">
                    {/* Marketing */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8, duration: 0.5, ease: easings.premium }}
                      className="flex items-center gap-4"
                    >
                      <div className="w-14 h-14 bg-blue-500/10 rounded-xl flex items-center justify-center shrink-0">
                        <svg className="w-7 h-7 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                        </svg>
                      </div>
                      <div className="flex-1 bg-blue-50 rounded-xl p-4 border border-blue-100">
                        <p className="text-sm font-semibold text-blue-900">Marketing</p>
                        <p className="text-xs text-blue-700/70">Lead scoring + Automações</p>
                      </div>
                      <div className="w-6 h-6 text-gray-300">
                        <ArrowRight className="w-6 h-6" />
                      </div>
                    </motion.div>

                    {/* Vendas */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.0, duration: 0.5, ease: easings.premium }}
                      className="flex items-center gap-4"
                    >
                      <div className="w-14 h-14 bg-brand/10 rounded-xl flex items-center justify-center shrink-0">
                        <svg className="w-7 h-7 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <div className="flex-1 bg-brand/5 rounded-xl p-4 border border-brand/10">
                        <p className="text-sm font-semibold text-gray-900">Vendas</p>
                        <p className="text-xs text-gray-600">Pipeline com critérios claros</p>
                      </div>
                      <div className="w-6 h-6 text-gray-300">
                        <ArrowRight className="w-6 h-6" />
                      </div>
                    </motion.div>

                    {/* CS */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.2, duration: 0.5, ease: easings.premium }}
                      className="flex items-center gap-4"
                    >
                      <div className="w-14 h-14 bg-emerald-500/10 rounded-xl flex items-center justify-center shrink-0">
                        <svg className="w-7 h-7 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="flex-1 bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                        <p className="text-sm font-semibold text-emerald-900">Customer Success</p>
                        <p className="text-xs text-emerald-700/70">Retenção + Expansão</p>
                      </div>
                      <div className="w-6 h-6 text-emerald-500">
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </motion.div>
                  </div>

                  {/* ROI indicator */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4, duration: 0.5, ease: easings.premium }}
                    className="mt-8 pt-6 border-t border-gray-100"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider">Resultado</p>
                        <p className="text-lg font-bold text-gray-900">Receita Auditável</p>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-sm font-medium text-emerald-700">ROI Mensurável</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Floating elements - Premium */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6, duration: 0.5, ease: easings.premium }}
                className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-elevated p-4 border border-gray-100"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Acompanhamento</p>
                    <p className="text-sm font-semibold text-gray-900">30-90 dias pós go-live</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating element 2 - ROI Indicator */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.8, duration: 0.5, ease: easings.premium }}
                className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-elevated p-4 border border-gray-100"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Performance</p>
                    <p className="text-sm font-semibold text-emerald-700">+45% conversão média</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating element 3 - Integration Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.0, duration: 0.5, ease: easings.premium }}
                className="absolute top-1/2 -left-6 bg-white rounded-full shadow-card p-3 border border-gray-100"
              >
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </div>
              </motion.div>
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
          className="mt-16 pt-10 border-t border-gray-100"
        >
          <p className="text-center text-xs text-gray-400 uppercase tracking-wider mb-6">
            Empresas que confiam sua receita à Zopu
          </p>

          {/* Container com overflow hidden para o carrossel */}
          <div className="relative overflow-hidden">
            {/* Gradientes de fade nas bordas */}
            <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-white to-transparent z-10" />

            {/* Carrossel animado */}
            <div className="flex animate-scroll items-center">
              {/* Primeira copia dos logos */}
              {CLIENT_LOGOS.map((logo, index) => (
                <div
                  key={`first-${index}`}
                  className="shrink-0 mx-6 sm:mx-8 lg:mx-10 flex items-center"
                >
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    width={200}
                    height={60}
                    className={`${sizeClasses[logo.size]} w-auto object-contain grayscale opacity-60 hover:opacity-100 transition-opacity`}
                  />
                </div>
              ))}
              {/* Segunda copia para loop infinito */}
              {CLIENT_LOGOS.map((logo, index) => (
                <div
                  key={`second-${index}`}
                  className="shrink-0 mx-6 sm:mx-8 lg:mx-10 flex items-center"
                >
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    width={200}
                    height={60}
                    className={`${sizeClasses[logo.size]} w-auto object-contain grayscale opacity-60 hover:opacity-100 transition-opacity`}
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
