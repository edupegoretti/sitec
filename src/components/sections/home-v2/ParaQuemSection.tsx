"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  CheckCircle2,
  XCircle,
  Users,
  Target,
  ArrowRight,
  AlertTriangle,
  Sparkles,
} from "lucide-react";
import { Container } from "@/components/layout";
import { Badge, Reveal } from "@/components/shared";
import { easings } from "@/lib/motion";

const PARA_QUEM = [
  {
    titulo: "Times comerciais de 10+ vendedores",
    descricao: "Onde falta de processo vira caos operacional",
  },
  {
    titulo: "Empresas B2B com ciclo de vendas consultivo",
    descricao: "Onde cada lead precisa de contexto e acompanhamento",
  },
  {
    titulo: "Operações que já tentaram CRM e não funcionou",
    descricao: "Porque sabemos que o problema não era o CRM",
  },
  {
    titulo: "Gestores que precisam de forecast confiável",
    descricao: "Não chute — dados para decisão de verdade",
  },
  {
    titulo: "Empresas que usam WhatsApp para vender",
    descricao: "Mas não querem perder governança e histórico",
  },
  {
    titulo: "Quem entende que ferramenta sem processo é desperdício",
    descricao: "E quer fazer certo dessa vez",
  },
];

const NAO_PARA_QUEM = [
  {
    titulo: "Quem quer o CRM mais barato do mercado",
    motivo: "Nosso foco é ROI, não preço mínimo",
  },
  {
    titulo: "Quem não vai se comprometer com o processo",
    motivo: "Sem engajamento do time, nenhuma ferramenta funciona",
  },
  {
    titulo: "Quem espera \"IA mágica\" que substitui vendedor",
    motivo: "IA é multiplicador — não faz milagre sozinha",
  },
  {
    titulo: "Quem quer implementar sozinho sem consultoria",
    motivo: "Oferecemos método completo, não só licença",
  },
];

export function ParaQuemSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative py-20 sm:py-28 bg-white overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-red-500/5 rounded-full blur-3xl" />
      </div>

      <Container className="relative">
        {/* Header */}
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <Badge variant="default" className="mb-6">
              <Target className="w-3.5 h-3.5 mr-1.5" />
              Fit ideal
            </Badge>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Somos{" "}
              <span className="bg-gradient-to-r from-emerald-500 to-emerald-600 bg-clip-text text-transparent">
                para você
              </span>{" "}
              se...
            </h2>

            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              Transparência desde o início: alguns perfis se beneficiam mais
              do nosso método do que outros. Veja se você se encaixa.
            </p>
          </div>
        </Reveal>

        {/* Two columns */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Para quem É */}
          <Reveal delay={0.1}>
            <motion.div
              whileHover={
                prefersReducedMotion ? undefined : { y: -4 }
              }
              transition={{ duration: 0.3, ease: easings.premium }}
              className="bg-gradient-to-br from-emerald-50 via-emerald-50/50 to-white rounded-3xl border border-emerald-200/60 p-8 shadow-sm"
            >
              {/* Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-emerald-500 rounded-2xl flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Ideal para você
                  </h3>
                  <p className="text-sm text-emerald-600 font-medium">
                    Máximo aproveitamento do método
                  </p>
                </div>
              </div>

              {/* Items */}
              <ul className="space-y-5">
                {PARA_QUEM.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + index * 0.05 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{item.titulo}</p>
                      <p className="text-sm text-gray-500 mt-0.5">
                        {item.descricao}
                      </p>
                    </div>
                  </motion.li>
                ))}
              </ul>

              {/* CTA */}
              <div className="mt-8 pt-6 border-t border-emerald-200/60">
                <a
                  href="https://wa.me/5547988459378?text=Ol%C3%A1!%20Acredito%20que%20a%20Zopu%20%C3%A9%20para%20mim.%20Vamos%20conversar?"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700 transition-colors"
                >
                  Isso sou eu — quero conversar
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          </Reveal>

          {/* Para quem NÃO É */}
          <Reveal delay={0.2}>
            <motion.div
              whileHover={
                prefersReducedMotion ? undefined : { y: -4 }
              }
              transition={{ duration: 0.3, ease: easings.premium }}
              className="bg-gradient-to-br from-gray-50 via-gray-50/50 to-white rounded-3xl border border-gray-200 p-8 shadow-sm"
            >
              {/* Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-gray-200 rounded-2xl flex items-center justify-center">
                  <XCircle className="w-7 h-7 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-500">
                    Talvez não seja para você
                  </h3>
                  <p className="text-sm text-gray-400 font-medium">
                    E está tudo bem — somos honestos
                  </p>
                </div>
              </div>

              {/* Items */}
              <ul className="space-y-5">
                {NAO_PARA_QUEM.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.25 + index * 0.05 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <XCircle className="w-4 h-4 text-gray-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-500">{item.titulo}</p>
                      <p className="text-sm text-gray-400 mt-0.5">
                        {item.motivo}
                      </p>
                    </div>
                  </motion.li>
                ))}
              </ul>

              {/* Note */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200/60 rounded-xl">
                  <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-amber-800 font-medium">
                      Não é para você agora?
                    </p>
                    <p className="text-xs text-amber-700 mt-1">
                      Pode ser no futuro. Salve nosso contato — quando estiver
                      pronto, estaremos aqui.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </Reveal>
        </div>

        {/* Bottom statement */}
        <Reveal delay={0.4}>
          <div className="mt-14 text-center">
            <div className="inline-flex items-center gap-4 p-5 bg-brand/5 border border-brand/20 rounded-2xl">
              <div className="w-12 h-12 bg-brand rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <p className="text-gray-900 font-semibold">
                  Fit ideal = resultado garantido
                </p>
                <p className="text-gray-600 text-sm">
                  Quando há match, a implementação flui e o ROI aparece rápido.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
