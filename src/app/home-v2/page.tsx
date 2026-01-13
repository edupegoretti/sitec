import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Arquitetura de Receita no Bitrix24 | Gold Partner | Zopu",
  description:
    "Arquitetura de Receita no Bitrix24 para ROI mensurável e previsibilidade real. Gold Partner com metodologia Fluidsales™, treinamento Fluidz e integração WhatsZopu.",
  keywords: [
    "Bitrix24",
    "Arquitetura de Receita",
    "RevOps",
    "Governança de Receita",
    "Bitrix24 Brasil",
    "parceiro Bitrix24",
    "implementação Bitrix24",
    "treinamento Bitrix24",
    "CRM",
    "Gold Partner Bitrix24",
    "CRM WhatsApp",
    "Fluidsales",
    "Fluidz",
    "WhatsZopu",
  ],
  alternates: {
    canonical: "/home-v2",
  },
};

import {
  HeroArquitetura,
  ProblemaModeloSection,
  ReframeSection,
  EstadoDesejadoSection,
  MetodoFluidsalesShowcase,
  IAMultiplierSection,
  EnablementFluidzSection,
  WhatsZopuSection,
  CasesProvaSection,
  ComparacaoSection,
  OfertasSection,
  ParaQuemSection,
  CTAFinalSection,
} from "@/components/sections/home-v2";

export default function HomeV2() {
  return (
    <main>
      {/* 1. Hero - Arquitetura de Receita + Promessa + Social Proof */}
      <HeroArquitetura />

      {/* 2. Problema - O modelo mental errado (CRM-first) */}
      <ProblemaModeloSection />

      {/* 3. Reframe - A nova abordagem (Arquitetura de Receita) */}
      <ReframeSection />

      {/* 4. Estado Desejado - Receita Auditável */}
      <EstadoDesejadoSection />

      {/* 5. Método - Fluidsales™ (Arquitetura → Implementação → Adoção) */}
      <MetodoFluidsalesShowcase />

      {/* 6. IA - Como multiplicador, não substituto */}
      <IAMultiplierSection />

      {/* 7. Enablement - Fluidz (treinamento por função) */}
      <EnablementFluidzSection />

      {/* 8. WhatsApp - WhatsZopu (dentro do processo) */}
      <WhatsZopuSection />

      {/* 9. Prova - Cases com métricas reais */}
      <CasesProvaSection />

      {/* 10. Comparação - Por que somos diferentes */}
      <ComparacaoSection />

      {/* 11. Ofertas - CRM Express, RevOps Launch, Enterprise */}
      <OfertasSection />

      {/* 12. Para Quem - Fit ideal */}
      <ParaQuemSection />

      {/* 13. CTA Final - Diagnóstico de Arquitetura de Receita */}
      <CTAFinalSection />
    </main>
  );
}
