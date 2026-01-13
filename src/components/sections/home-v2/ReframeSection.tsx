"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Lightbulb, ArrowRight } from "lucide-react";
import { Container } from "@/components/layout";
import { Reveal } from "@/components/shared";
import { easings } from "@/lib/motion";

export function ReframeSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative py-16 sm:py-20 bg-white overflow-hidden">
      <Container>
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="relative">
              {/* Decorative quote marks */}
              <div className="absolute -top-8 -left-4 text-8xl text-brand/10 font-serif leading-none select-none">
                "
              </div>

              {/* Main statement card */}
              <motion.div
                whileHover={prefersReducedMotion ? undefined : { scale: 1.01 }}
                transition={{ duration: 0.3, ease: easings.premium }}
                className="relative bg-gradient-to-br from-brand/5 via-white to-amber-50/30 rounded-3xl p-8 sm:p-12 border border-brand/10 shadow-sm"
              >
                {/* Light bulb indicator */}
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-amber-100 rounded-full mb-8">
                  <Lightbulb className="w-5 h-5 text-amber-600" />
                  <span className="text-sm font-semibold text-amber-800">O reframe</span>
                </div>

                {/* Main quote */}
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                  Ativar CRM é fácil.
                  <span className="block mt-2 text-brand">
                    Difícil é manter adoção e ter dados confiáveis.
                  </span>
                </h2>

                {/* Closing statement */}
                <div className="mt-8 pt-8 border-t border-gray-100">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-brand rounded-xl flex items-center justify-center shrink-0 mt-1">
                      <ArrowRight className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
                        É exatamente aí que a maioria dos projetos "morre" —
                        <span className="font-semibold text-gray-900"> e é aí que a Zopu trabalha.</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Visual accent */}
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-brand/5 to-transparent rounded-tl-[100px] pointer-events-none" />
              </motion.div>

              {/* Decorative quote marks */}
              <div className="absolute -bottom-8 -right-4 text-8xl text-brand/10 font-serif leading-none select-none rotate-180">
                "
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
