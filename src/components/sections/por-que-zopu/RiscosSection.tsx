"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout";
import { Badge, Reveal } from "@/components/shared";
import { Warning, Lightning } from "@phosphor-icons/react";
import { RISCOS_MERCADO_ZOPU } from "@/lib/constants";

export function RiscosSection() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-white overflow-hidden relative">
      {/* Decorative blurred elements */}
      <div className="absolute top-20 left-0 w-72 h-72 bg-red-500/2 rounded-full -translate-x-1/2 blur-3xl" />
      <div className="absolute bottom-20 right-0 w-64 h-64 bg-amber-500/2 rounded-full translate-x-1/2 blur-3xl" />

      <Container>
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <Reveal>
            <Badge variant="danger" className="mb-4">
              Os riscos que ninguém fala
            </Badge>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              "Go-live" não é sucesso.{" "}
              <span className="text-red-500">
                É onde 70% dos projetos param.
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Se o seu medo é "mais um projeto que não vira rotina", você está
              certo. Esses são os riscos reais — e como zeramos cada um.
            </p>
          </Reveal>
        </div>

        {/* Risk Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {RISCOS_MERCADO_ZOPU.map((risco, index) => {
            const isDanger = risco.impactoTipo === "danger";

            return (
              <Reveal key={risco.id} delay={0.1 + index * 0.1}>
                <motion.div
                  className={`bg-white rounded-2xl p-6 border border-gray-200 shadow-sm h-full cursor-default group ${
                    isDanger ? "hover:border-red-200" : "hover:border-amber-200"
                  }`}
                  whileHover={{
                    y: -4,
                    boxShadow: isDanger
                      ? "0 20px 40px -12px rgba(239, 68, 68, 0.15)"
                      : "0 20px 40px -12px rgba(245, 158, 11, 0.15)",
                  }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <motion.div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        isDanger ? "bg-red-100" : "bg-amber-100"
                      }`}
                      whileHover={{ rotate: [0, -5, 5, -5, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <Warning
                        size={20}
                        weight="duotone"
                        className={isDanger ? "text-red-600" : "text-amber-600"}
                      />
                    </motion.div>
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${
                        isDanger
                          ? "bg-red-100 text-red-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {risco.impacto}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors">
                    {risco.titulo}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {risco.descricao}
                  </p>
                </motion.div>
              </Reveal>
            );
          })}
        </div>

        {/* Bottom insight */}
        <Reveal delay={0.6}>
          <div className="mt-12 sm:mt-16 max-w-3xl mx-auto">
            <div className="bg-linear-to-r from-brand/5 to-brand/10 rounded-2xl p-6 sm:p-8 border border-brand/10">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center shrink-0">
                  <Lightning
                    size={20}
                    weight="duotone"
                    className="text-brand"
                  />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">
                    Cada risco acima tem uma contramedida específica
                  </h4>
                  <p className="text-gray-600">
                    Na metodologia Fluidsales, cada etapa existe para
                    neutralizar um desses riscos. Continue lendo para ver como.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
