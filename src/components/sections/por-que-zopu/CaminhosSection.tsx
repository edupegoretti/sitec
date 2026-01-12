"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import {
  Lightning,
  Stack,
  ChartBar,
  Star,
  type IconProps,
} from "@phosphor-icons/react";
import { Container } from "@/components/layout";
import { SectionHeader, Reveal } from "@/components/shared";
import { CAMINHOS_ENTRADA_ZOPU, ZOPU_LINKS } from "@/lib/constants";

// Mapeamento de ícones
type PhosphorIcon = React.ComponentType<IconProps>;
const iconMap: Record<string, PhosphorIcon> = {
  Zap: Lightning,
  Layers: Stack,
  BarChart3: ChartBar,
};

export function CaminhosSection() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-[#F5F5F7] relative overflow-hidden">
      {/* Decorative blurred elements */}
      <div className="absolute top-20 left-0 w-64 h-64 bg-brand/3 rounded-full -translate-x-1/2 blur-3xl" />
      <div className="absolute bottom-20 right-0 w-56 h-56 bg-amber-500/3 rounded-full translate-x-1/2 blur-3xl" />

      <Container>
        <SectionHeader
          label="Risco zero para começar"
          title="Diagnóstico de 20 min. Se não fizer sentido, a gente fala na hora."
          description="Você não precisa decidir nada agora. Escolha uma conversa — e saia com clareza sobre o melhor caminho."
        />

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {CAMINHOS_ENTRADA_ZOPU.map((caminho, index) => {
            const Icon = iconMap[caminho.icon] || Stack;
            const isHighlighted = caminho.destacado;

            return (
              <Reveal key={caminho.id} delay={index * 0.1}>
                <motion.div
                  className={`relative bg-white rounded-2xl p-6 sm:p-8 h-full ${
                    isHighlighted
                      ? "border-2 border-brand ring-4 ring-brand/10"
                      : "border border-gray-200/80"
                  }`}
                  initial={{ scale: isHighlighted ? 1.02 : 1 }}
                  whileHover={{
                    y: -8,
                    scale: isHighlighted ? 1.04 : 1.02,
                  }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    boxShadow: isHighlighted
                      ? "0 25px 50px -12px rgba(104, 71, 255, 0.25)"
                      : "0 4px 12px -2px rgba(0, 0, 0, 0.08)",
                  }}
                >
                  {/* Animated glow for highlighted */}
                  {isHighlighted && (
                    <motion.div
                      className="absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-brand via-purple-500 to-brand opacity-20 blur-sm -z-10"
                      animate={{
                        opacity: [0.2, 0.4, 0.2],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  )}

                  {/* Recommended badge */}
                  {isHighlighted && (
                    <motion.div
                      className="absolute -top-3 left-1/2 -translate-x-1/2"
                      initial={{ y: -10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <motion.span
                        className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-brand text-white text-xs font-bold rounded-full shadow-lg"
                        animate={{
                          boxShadow: [
                            "0 4px 14px -2px rgba(104, 71, 255, 0.4)",
                            "0 8px 20px -4px rgba(104, 71, 255, 0.5)",
                            "0 4px 14px -2px rgba(104, 71, 255, 0.4)",
                          ],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Star size={12} weight="fill" />
                        RECOMENDADO
                      </motion.span>
                    </motion.div>
                  )}

                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <motion.div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        isHighlighted
                          ? "bg-brand text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Icon size={24} weight="duotone" />
                    </motion.div>
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                        isHighlighted
                          ? "bg-brand/10 text-brand"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {caminho.prazo}
                    </span>
                  </div>

                  {/* Content */}
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-1">
                      {caminho.subtitulo}
                    </p>
                    <h3
                      className={`text-xl font-bold mb-3 ${
                        isHighlighted ? "text-brand" : "text-gray-900"
                      }`}
                    >
                      {caminho.nome}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {caminho.descricao}
                    </p>

                    {/* Nota (if exists) */}
                    {caminho.nota && (
                      <p className="text-xs text-gray-400 italic border-t border-gray-100 pt-3">
                        {caminho.nota}
                      </p>
                    )}

                    {/* CTA for highlighted */}
                    {isHighlighted && (
                      <div className="mt-4 pt-4 border-t border-brand/10">
                        <motion.a
                          href="/revopslaunch"
                          className="inline-flex items-center gap-2 text-sm font-semibold text-brand"
                          whileHover={{ x: 4 }}
                          transition={{ duration: 0.2 }}
                        >
                          Ver metodologia completa
                          <ArrowRight className="w-4 h-4" />
                        </motion.a>
                      </div>
                    )}
                  </div>
                </motion.div>
              </Reveal>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <Reveal delay={0.5}>
          <div className="mt-12 sm:mt-16 text-center">
            <motion.a
              href={ZOPU_LINKS.whatsappEspecialista}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-brand text-white font-semibold rounded-2xl overflow-hidden"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{
                boxShadow: "0 20px 40px -12px rgba(104, 71, 255, 0.3)",
              }}
            >
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: "easeInOut",
                }}
              />
              <span className="relative z-10">
                Não sabe o melhor caminho? Conversa de 20 min.
              </span>
              <ArrowRight className="relative z-10 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </motion.a>
            <p className="text-sm text-gray-500 mt-4">
              Analisamos seu cenário e recomendamos a entrada ideal.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
