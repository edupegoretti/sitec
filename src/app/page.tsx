import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Governança de Receita no Bitrix24 | Gold Partner | Zopu",
  description:
    "Gold Partner Bitrix24 no Brasil. Governança de receita com processo, dados e adoção. +450 clientes e +9.500 certificados via Fluidz.",
  keywords: [
    "Bitrix24",
    "Bitrix24 Brasil",
    "parceiro Bitrix24",
    "implementação Bitrix24",
    "treinamento Bitrix24",
    "certificação Bitrix24",
    "CRM",
    "CRM para PME",
    "Gold Partner Bitrix24",
    "CRM WhatsApp",
    "Bitrix24 preço",
  ],
  alternates: {
    canonical: "/",
  },
};

import {
  HeroHome,
  CRORecognitionSection,
  StatusQuoSection,
  NovaCategoriaSection,
  ParaQuemSection,
  ComoFuncionaSection,
  AdocaoSection,
  WhatsAppGovernancaSection,
  CaseDestaque,
  IAAmplifierSection,
  TrustCenterSection,
  ComparacaoSection,
  SolucoesSection,
  FAQChallengerSection,
  EscassezSection,
} from "@/components/sections";

export default function Home() {
  return (
    <main>
      {/* 1. Hero - Challenger + Promessa segura + Social Proof */}
      <HeroHome />

      {/* 2. Status Quo - Postura desafiadora (o problema real) */}
      <StatusQuoSection />

      {/* 3. Nova Categoria - Zopu = Governança de Receita */}
      <NovaCategoriaSection />

      {/* 4. Reconhecimento CRO - Prova de credibilidade imediata */}
      <CRORecognitionSection />

      {/* 5. Case - Prova concreta com métricas */}
      <CaseDestaque />

      {/* 6. Fit do projeto - Para quem é / para quem não é */}
      <ParaQuemSection />

      {/* 7. Como Funciona - Método simples (óbvio bem feito) */}
      <ComoFuncionaSection />

      {/* 8. Adoção - Fluidz como arma */}
      <AdocaoSection />

      {/* 9. WhatsApp - Governança no canal crítico */}
      <WhatsAppGovernancaSection />

      {/* 10. 2026 / IA - Amplificador (não hype) */}
      <IAAmplifierSection />

      {/* 11. Segurança - Trust Center */}
      <TrustCenterSection />

      {/* 12. Comparação - Sem citar concorrente */}
      <ComparacaoSection />

      {/* 13. Soluções - Pacotes com foco em resultado */}
      <SolucoesSection />

      {/* 14. FAQ - Objeções reais */}
      <FAQChallengerSection />

      {/* 15. Fechamento - Escassez real */}
      <EscassezSection />
    </main>
  );
}
