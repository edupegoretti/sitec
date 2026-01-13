import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Arquitetura de Receita no Bitrix24 | Gold Partner | Zopu",
  description:
    "Arquitetura de Receita no Bitrix24 para ROI mensurável e previsibilidade real. Gold Partner com metodologia Fluidsales, treinamento Fluidz e integração WhatsZopu.",
  keywords: [
    "Bitrix24",
    "Arquitetura de Receita",
    "RevOps",
    "Bitrix24 Brasil",
    "parceiro Bitrix24",
    "Gold Partner Bitrix24",
    "implementação Bitrix24",
    "treinamento Bitrix24",
    "CRM",
    "CRM para PME",
    "CRM WhatsApp",
    "Fluidsales",
    "Fluidz",
    "WhatsZopu",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Arquitetura de Receita no Bitrix24 | Zopu",
    description:
      "Gold Partner Bitrix24. Arquitetura de Receita com processo, dados e adoção para operação comercial previsível.",
    url: "https://zopu.com.br",
    siteName: "Zopu",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arquitetura de Receita no Bitrix24 | Zopu",
    description:
      "Gold Partner Bitrix24. Arquitetura de Receita com processo, dados e adoção para operação comercial previsível.",
  },
};

import {
  HeroArquitetura,
  ProblemaModeloSection,
  ReframeSection,
  MetodoFluidsalesShowcase,
  EstadoDesejadoSection,
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

export default function Home() {
  return (
    <main>
      {/* 1. Hero - Arquitetura de Receita + Promessa + Social Proof */}
      <HeroArquitetura />

      {/* 2. Problema - O modelo mental errado (CRM-first) */}
      <ProblemaModeloSection />

      {/* 3. Reframe - A nova abordagem (Arquitetura de Receita) */}
      <ReframeSection />

      {/* 4. Metodo Showcase - Fluidsales 6 pilares interativos */}
      <MetodoFluidsalesShowcase />

      {/* 5. Estado Desejado - Receita Auditavel */}
      <EstadoDesejadoSection />

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

      {/* 12. Arquitetura de Receita - 4 Pilares */}
      <ComparacaoSection />

      {/* 13. Ofertas - CRM Express, RevOps Launch, Enterprise */}
      <OfertasSection />

      {/* 14. CTA Final - Diagnostico de Arquitetura de Receita */}
      <CTAFinalSection />
    </main>
  );
}
