import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Parceiro Bitrix24 Brasil — Zopu: 96% Retenção (Menor Churn do Mundo)",
  description:
    "Por que 96% dos clientes Zopu renovam anualmente? Metodologia Metodologia Fluidsales™, treinamento Fluidz com 9.500+ certificados, SLA de 2 minutos. O parceiro Gold Bitrix24 com menor churn do mundo.",
  keywords: [
    "parceiro Bitrix24",
    "parceiro Bitrix24 Brasil",
    "implementador Bitrix24",
    "consultoria Bitrix24",
    "Gold Partner Bitrix24",
    "melhor parceiro Bitrix24",
    "Zopu Bitrix24",
    "implementação CRM",
  ],
  alternates: {
    canonical: "/por-que-zopu",
  },
  openGraph: {
    title: "Parceiro Bitrix24 Brasil — Zopu: 96% de Retenção",
    description:
      "O parceiro Gold Bitrix24 com menor churn do mundo. 96% de retenção anual. Metodologia Metodologia Fluidsales™ + Fluidz Academy.",
    type: "website",
    images: [
      {
        url: "/images/og-por-que-zopu.png",
        width: 1200,
        height: 630,
        alt: "Zopu - Parceiro Gold Bitrix24 com 96% de retenção",
      },
    ],
  },
};

import {
  HeroPorQueZopu,
  ProblemaSection,
  RiscosSection,
  DiferenciaisZopu,
  MetodologiaVisual,
  FAQPorQueZopu,
  CTASection,
} from "@/components/sections";

export default function PorQueZopuPage() {
  return (
    <main>
      {/* 1. Hero - Proposta de valor + ROI educacional */}
      <HeroPorQueZopu />

      {/* 2. Problema do Mercado - Erros vs Soluções */}
      <ProblemaSection />

      {/* 3. Riscos do Mercado - O custo do retrabalho */}
      <RiscosSection />

      {/* 4. Diferenciais Zopu - 6 cards com provas */}
      <DiferenciaisZopu />

      {/* 5. Metodologia Fluidsales™ - Reutiliza componente da Home */}
      <MetodologiaVisual />

      {/* 6. FAQ - Objeções reais */}
      <FAQPorQueZopu />

      {/* 7. CTA Final */}
      <CTASection
        title="Próximo passo: conversa de 20 min (sem compromisso)"
        description="Você sai com um plano claro — mesmo que não avance conosco. Se não fizer sentido para sua empresa, a gente fala na hora."
        ctaText="Quero diagnóstico gratuito"
        showStats={false}
        showBadges={true}
      />
    </main>
  );
}
