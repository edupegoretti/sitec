import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bitrix24: Sistema Operacional do seu Negócio | Gold Partner | Zopu",
  description:
    "Integramos marketing, pré-vendas, vendas e pós-vendas em um fluxo único no Bitrix24 — para aumentar vendas e margem em 30 dias. Gold Partner Bitrix24.",
  keywords: [
    "Bitrix24",
    "implementação Bitrix24",
    "parceiro Bitrix24",
    "Gold Partner Bitrix24",
    "sistema operacional comercial",
    "integração comercial",
    "CRM integrado",
    "Bitrix24 Brasil",
    "RevOps",
    "Fluidsales",
    "Fluidz",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Transforme o Bitrix24 no Sistema Operacional do seu Negócio | Zopu",
    description:
      "Integramos marketing, pré-vendas, vendas e pós-vendas em um fluxo único — para aumentar vendas e margem em 30 dias.",
    url: "https://zopu.com.br",
    siteName: "Zopu",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Transforme o Bitrix24 no Sistema Operacional do seu Negócio | Zopu",
    description:
      "Integramos marketing, pré-vendas, vendas e pós-vendas em um fluxo único — para aumentar vendas e margem em 30 dias.",
  },
};

import {
  HeroArquitetura,
  ProblemaModeloSection,
  ReframeSection,
  MetodoFluidsalesShowcase,
  FoundationLayersSection,
  MetodoFluidsalesSection,
  IAMultiplierSection,
  EnablementFluidzSection,
  WhatsZopuSection,
  Bitrix24Showcase,
  CasesProvaSection,
  ComparacaoSection,
  OfertasSection,
  CTAFinalSection,
} from "@/components/sections/novahome";
import { CRORecognitionSection } from "@/components/sections/CRORecognitionSection";

export default function Home() {
  return (
    <main>
      {/* 1. Hero */}
      <HeroArquitetura />

      {/* 2. Problema - O modelo mental errado (CRM-first) */}
      <ProblemaModeloSection />

      {/* 3. Reframe - A nova abordagem (Arquitetura de Receita) */}
      <ReframeSection />

      {/* 4. Metodo Showcase - Fluidsales 6 pilares interativos */}
      <MetodoFluidsalesShowcase />

      {/* 5. Fundação - Os 4 pilares da Arquitetura de Receita */}
      <FoundationLayersSection />

      {/* 6. Metodo Timeline - 3 etapas de entrega */}
      <MetodoFluidsalesSection />

      {/* 7. IA - Como multiplicador, nao substituto */}
      <IAMultiplierSection />

      {/* 8. Enablement - Fluidz (treinamento por funcao) */}
      <EnablementFluidzSection />

      {/* 9. WhatsApp - WhatsZopu (dentro do processo) */}
      <WhatsZopuSection />

      {/* 10. Plataforma - Bitrix24 Showcase com tabs */}
      <Bitrix24Showcase />

      {/* 11. Prova - Cases com metricas reais */}
      <CasesProvaSection />

      {/* 12. Reconhecimento - Gold Partner + Certificações */}
      <CRORecognitionSection />

      {/* 13. Arquitetura de Receita - 4 Pilares */}
      <ComparacaoSection />

      {/* 13. Ofertas - CRM Express, RevOps Launch, Enterprise */}
      <OfertasSection />

      {/* 14. CTA Final - Diagnostico de Arquitetura de Receita */}
      <CTAFinalSection />
    </main>
  );
}
