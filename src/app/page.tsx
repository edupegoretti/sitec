import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Parceiro Gold Bitrix24 no Brasil | +9.500 Certificados | Zopu",
  description:
    "Líder global em retenção de clientes Bitrix24. +450 clientes, +9.500 certificados via Fluidz. Implementação em 30 dias.",
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
  IAAmplifierSection,
  NovaCategoriaSection,
  ComoFuncionaSection,
  AdocaoSection,
  WhatsAppGovernancaSection,
  CaseDestaque,
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

      {/* 2. Reconhecimento CRO - Prova de credibilidade imediata */}
      <CRORecognitionSection />

      {/* 3. Status Quo - Postura desafiadora (o problema real) */}
      <StatusQuoSection />

      {/* 4. 2026 / IA - Amplificador (não hype) */}
      <IAAmplifierSection />

      {/* 5. Nova Categoria - Zopu = Operação de Receita */}
      <NovaCategoriaSection />

      {/* 6. Como Funciona - Método simples (óbvio bem feito) */}
      <ComoFuncionaSection />

      {/* 7. Adoção - Fluidz como arma */}
      <AdocaoSection />

      {/* 8. WhatsApp - Governança no canal crítico */}
      <WhatsAppGovernancaSection />

      {/* 9. Case - Prova concreta com métricas */}
      <CaseDestaque />

      {/* 10. Segurança - Trust Center */}
      <TrustCenterSection />

      {/* 11. Comparação - Sem citar concorrente */}
      <ComparacaoSection />

      {/* 12. Soluções - Pacotes com foco em resultado */}
      <SolucoesSection />

      {/* 13. FAQ - Objeções reais */}
      <FAQChallengerSection />

      {/* 14. Fechamento - Escassez real */}
      <EscassezSection />
    </main>
  );
}
