"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import {
  Lightning,
  Stack,
  ChartBar,
  type IconProps,
} from "@phosphor-icons/react";
import { Container } from "@/components/layout";
import { Reveal } from "@/components/shared";
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
    <section className="py-16 sm:py-24 lg:py-32 bg-linear-to-b from-brand to-brand-hover relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />

      <Container>
        {/* Header - Estilo CTAFinalSection */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16 relative z-10">
          <Reveal>
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-6">
              <Clock className="w-7 h-7 text-white" />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Diagnóstico de 20 minutos.{" "}
              <span className="text-white/80">Sem promessa vazia.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-lg sm:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto">
              Se o seu cenário não tem as condições mínimas para dar certo, a
              gente te diz na hora. Se tem, você sai com clareza sobre o melhor
              caminho.
            </p>
          </Reveal>
        </div>

        {/* Cards - Brancos sobre fundo brand */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto relative z-10">
          {CAMINHOS_ENTRADA_ZOPU.map((caminho, index) => {
            const Icon = iconMap[caminho.icon] || Stack;

            return (
              <Reveal key={caminho.id} delay={0.3 + index * 0.1}>
                <motion.div
                  className="relative bg-white rounded-2xl p-6 sm:p-8 h-full shadow-2xl shadow-black/10"
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-brand/10 text-brand">
                      <Icon size={24} weight="duotone" />
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-full font-semibold bg-brand/10 text-brand">
                      {caminho.prazo}
                    </span>
                  </div>

                  {/* Content */}
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-1">
                      {caminho.subtitulo}
                    </p>
                    <h3 className="text-xl font-bold mb-3 text-gray-900">
                      {caminho.nome}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {caminho.descricao}
                    </p>

                    {/* Nota */}
                    {caminho.nota && (
                      <p className="text-xs text-gray-500 mt-4 pt-3 border-t border-gray-100">
                        {caminho.nota}
                      </p>
                    )}
                  </div>
                </motion.div>
              </Reveal>
            );
          })}
        </div>

        {/* Bottom CTA - Branco sobre brand */}
        <Reveal delay={0.6}>
          <div className="mt-12 sm:mt-16 text-center relative z-10">
            <motion.a
              href={ZOPU_LINKS.whatsappEspecialista}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-brand font-bold rounded-2xl hover:bg-gray-100 transition-all duration-300 shadow-2xl shadow-black/20 hover:-translate-y-1"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <span>Qual é o melhor para mim?</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </motion.a>
            <p className="text-sm text-white/60 mt-4">
              Conversa de 20 min. Sem compromisso.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
