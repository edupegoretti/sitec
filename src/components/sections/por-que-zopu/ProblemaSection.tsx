"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout";
import { Badge, Reveal } from "@/components/shared";
import { Check, ArrowRight, X } from "lucide-react";
import { CaretRight } from "@phosphor-icons/react";
import { ZOPU_LINKS, ERROS_VS_SOLUCOES_ZOPU } from "@/lib/constants";
import { useCountUp } from "@/hooks/useCountUp";

// Animated 70% counter
function AnimatedPercent() {
  const { ref, value: animatedValue } = useCountUp(70, { delay: 500 });

  return <span ref={ref}>{Math.round(animatedValue)}</span>;
}

const FLOW_SEQUENCE = [
  "entendimento",
  "estrutura",
  "adoção",
  "métricas",
  "evolução",
];

export function ProblemaSection() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-[#F5F5F7] overflow-hidden relative">
      {/* Decorative blurred elements */}
      <div className="absolute top-32 right-0 w-80 h-80 bg-brand/3 rounded-full translate-x-1/2 blur-3xl" />
      <div className="absolute bottom-20 left-0 w-64 h-64 bg-red-500/2 rounded-full -translate-x-1/2 blur-3xl" />

      <Container>
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <Reveal>
            <Badge className="mb-4">O problema real</Badge>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              CRM falha quando vira{" "}
              <span className="text-red-500">
                &quot;projeto de software&quot;
              </span>
              .
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Implementação começa por telas e campos, não por processo. Ninguém
              define regras de passagem no funil. Não existe sponsor. Time não é
              treinado por função. Pós-go-live inexistente.
            </p>
          </Reveal>
        </div>

        {/* Estatística Central */}
        <Reveal delay={0.3}>
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-block relative">
              {/* Glow pulsante */}
              <motion.div
                className="absolute inset-0 blur-3xl bg-red-500/15 scale-150"
                animate={{
                  scale: [1.5, 1.7, 1.5],
                  opacity: [0.15, 0.25, 0.15],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <motion.div
                className="relative flex items-baseline justify-center gap-3 sm:gap-4"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="text-7xl sm:text-8xl lg:text-9xl font-bold bg-linear-to-b from-gray-900 via-gray-700 to-gray-400 bg-clip-text text-transparent">
                  <AnimatedPercent />
                </span>
                <motion.span
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold text-red-500"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8, duration: 0.4 }}
                >
                  %
                </motion.span>
              </motion.div>
              <motion.p
                className="text-lg sm:text-xl text-gray-700 mt-4 font-medium"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                dos projetos de CRM não atendem expectativas da liderança
              </motion.p>
              <motion.p
                className="text-sm text-gray-500 mt-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                Fonte: Gartner
              </motion.p>
            </div>
          </div>
        </Reveal>

        {/* Grid Erros vs Soluções - TODOS os 5 */}
        <Reveal delay={0.4}>
          <div className="grid lg:grid-cols-2 gap-0 max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-elevated">
            {/* Coluna de Erros - Dark */}
            <div className="bg-bg-dark p-6 sm:p-8 lg:p-10">
              <p className="text-xs text-red-400 uppercase tracking-wider font-semibold mb-6">
                Erros que consultorias tradicionais cometem
              </p>
              <div className="space-y-5">
                {ERROS_VS_SOLUCOES_ZOPU.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      <X className="w-3.5 h-3.5 text-red-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium leading-relaxed">
                        {item.erro.titulo}
                      </p>
                      <p className="text-sm text-gray-400 mt-1">
                        {item.erro.descricao}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Coluna de Soluções - Light */}
            <div className="bg-white p-6 sm:p-8 lg:p-10 border-l-4 border-brand">
              <p className="text-xs text-brand uppercase tracking-wider font-semibold mb-6">
                Como a Zopu resolve
              </p>
              <div className="space-y-5">
                {ERROS_VS_SOLUCOES_ZOPU.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-brand flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900 font-medium leading-relaxed">
                        {item.solucao.titulo}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {item.solucao.descricao}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Flow Sequence */}
        <Reveal delay={0.5}>
          <div className="mt-12 sm:mt-16">
            <p className="text-center text-sm text-gray-500 uppercase tracking-wider mb-6">
              A sequência que reduz risco
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {FLOW_SEQUENCE.map((step, index) => (
                <div key={step} className="flex items-center gap-2 sm:gap-3">
                  <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 border border-gray-200 shadow-sm">
                    {step}
                  </span>
                  {index < FLOW_SEQUENCE.length - 1 && (
                    <CaretRight
                      size={16}
                      weight="bold"
                      className="text-brand"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal delay={0.6}>
          <div className="mt-12 sm:mt-16 text-center">
            <a
              href={ZOPU_LINKS.whatsappEspecialista}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-bg-dark text-white font-semibold rounded-2xl hover:bg-[#0d2d4d] transition-all duration-300 shadow-elevated hover:shadow-elevated-hover hover:-translate-y-1"
            >
              Descobrir onde seu projeto pode quebrar
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
            <p className="text-sm text-gray-500 mt-4">
              Conversa de 20 min com especialista
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
