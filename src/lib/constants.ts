// Métricas e estatísticas da Zopu
export const ZOPU_STATS = {
  clientes: "450+",
  projetos: "700+",
  paises: "18",
  retencao: "96%",
  churn: "4%",
  diasParaFuncionar: "30 dias",
  alunosFluidz: "9.500+",
  maiorOperacao: "5.000+",
  taxaFalha: "70%",
  equipe: "20",
  tempoResposta: "<5min",
  tempoRespostaContexto: "SLA de primeira resposta",
  integracoes: "100+",
  // SLA segmentado por plano
  slaEnterprise: "<2min",
  slaDemais: "<5min",
  slaDescricao: "SLA de primeira resposta (horário comercial)",
} as const;

// Capacidade operacional (usar no bloco de escassez)
export const ZOPU_CAPACIDADE: {
  projetosPorCiclo: string | null;
  proximoCiclo: string | null;
  janelaProxima: string | null;
} = {
  projetosPorCiclo: null,
  proximoCiclo: null,
  janelaProxima: null,
};

// Evidência do evento Bitrix24 Partner Summit
export const BITRIX24_SUMMIT_EVIDENCE = {
  titulo: "Citado pela Bitrix24 como exemplo em baixo churn/alta retenção",
  caption:
    'Partner Summit Brasil (Out/2025) — slide do evento exibindo a Zopu como "exemplo a ser seguido".',
  eventDate: "Outubro de 2025",
  eventName: "Bitrix24 Partner Summit Brasil 2025",
  imageSrc: "/images/proof/bitrix24-summit-2025-zopu.jpg",
  imageAlt:
    "Slide do evento Bitrix24 citando a Zopu como exemplo em baixo churn/alta retenção",
  footnote:
    "Partner Summit Brasil 2025 foi divulgado publicamente pelo Bitrix24 Brasil (out/2025).",
} as const;

// Fonte do dado de taxa de falha (validado por Gartner e Forrester)
export const FONTE_TAXA_FALHA = {
  percentual: "70%",
  fontes: ["Gartner", "Forrester Research"],
  citacao:
    "Segundo Gartner e Forrester, cerca de 70% das implementações de CRM não atingem os objetivos esperados devido a falta de estratégia e adoção inadequada.",
  ano: "2024-2025",
} as const;

// Reconhecimento oficial Bitrix24 - Partner Summit Brasil 2025
export const ZOPU_RECONHECIMENTO = {
  titulo: "Referência em retenção de clientes",
  tituloCompleto: "Citado como exemplo de menor churn entre parceiros",
  fonte: "Partner Summit Brasil 2025",
  fonteDetalhe: "CEO da Bitrix24 apresentou a Zopu como exemplo a ser seguido",
  periodo: "2025",
  descricao:
    "No Partner Summit Brasil 2025, a Zopu foi citada pelo CEO da Bitrix24 como exemplo de menor taxa de churn entre todos os parceiros.",
} as const;

// Compromisso Zopu (substituindo "garantia" para evitar riscos legais)
export const ZOPU_COMPROMISSO = {
  texto: "Nosso compromisso: sucesso mensurável",
  descricao: `Retenção anual de ${ZOPU_STATS.retencao} — foco em processo, dados e adoção real.`,
  subtexto: "Acompanhamento focado em uso contínuo e evolução.",
} as const;

// Mantido para compatibilidade (deprecated)
export const ZOPU_GARANTIA = ZOPU_COMPROMISSO;

// WhatsZopu - Integração própria
export const WHATSZOPU = {
  nome: "WhatsZopu",
  descricao: "Aplicativo próprio de integração WhatsApp + Bitrix24",
  diferenciais: [
    "Integração via API oficial do WhatsApp (Meta)",
    "Camadas de governança (histórico, responsáveis, SLAs)",
    "Arquitetura pensada para escala e estabilidade",
    "Desenvolvido internamente pela Zopu",
  ],
} as const;

// Integrações em destaque
export const INTEGRACOES_DESTAQUE = [
  "Apollo",
  "Clay",
  "RD Station",
  "Conta Azul",
  "Omie",
  "TOTVS",
  "SAP",
  "Active Campaign",
  "HubSpot",
  "Receita Federal",
  "Asaas",
] as const;

// Fluidz completo
export const FLUIDZ_COMPLETO = {
  nome: "Fluidz",
  descricao: "A única plataforma completa de treinamento para Bitrix24",
  alunos: "9.500+",
  diferenciais: [
    "Única plataforma completa de treinamento Bitrix24 do mercado",
    "Treinamentos para Gestores e Usuários",
    "Cursos de Vendas e Pós-vendas",
    "Estratégias de RevOps",
    "Certificação oficial Bitrix24",
  ],
  publicos: ["Gestores", "Vendedores", "Customer Success", "Operações"],
} as const;

// Case destaque - Ferro em Brasa
export const CASE_DESTAQUE = {
  empresa: "Ferro em Brasa",
  setor: "E-commerce (Identificação Bovina Personalizada)",
  contato: "João",
  cargo: "Proprietário",
  videoUrl: "https://youtu.be/IhrMZZRuH54",

  desafio: {
    titulo: "Da Implementação Básica à Previsibilidade Comercial",
    descricao:
      "A Ferro em Brasa tinha Bitrix24 implementado de forma básica. Com o crescimento da equipe comercial, surgiu a necessidade de previsibilidade no time de vendas.",
    dorPrincipal:
      "Precisava migrar de CRM básico para estratégia de Receita Previsível",
  },

  solucao: {
    titulo: "Estrutura SDR, Closer e Sucesso do Cliente",
    descricao:
      'A Zopu entrou "de cabeça" no negócio. Ao contrário de implementações simples, focamos na estratégia — entender as dores e necessidades reais antes de configurar.',
    entregas: [
      "Mudança de todo o layout de atendimento",
      "Implementação de função SDR",
      "Estruturação de Closer",
      "Criação de área de Sucesso do Cliente",
      "Relatórios semanais automatizados",
    ],
  },

  resultado: {
    metricaPrincipal: "+20%",
    metricaLabel: "taxa de conversão",
    descricao:
      "A partir dos ajustes realizados — incluindo eliminação de processos que geravam perda de tempo — a Ferro em Brasa alcançou melhoria de 20% na taxa de conversão.",
    extras: [
      "Uso completo do Bitrix24 (projetos, comunicação, calendário)",
      'Parceria descrita como "eterna"',
      "Novas oportunidades identificadas além do comercial",
    ],
  },

  depoimento: {
    texto:
      "A Zopu nos ajudou a enxergar novas oportunidades. A implementação foi surreal.",
    autor: "João",
    cargo: "Proprietário, Ferro em Brasa",
  },
} as const;

// Metodologia Fluidsales™ com 6 pilares completos (com antes/depois para visualização)
export const METODOLOGIA_ZOPU = {
  nome: "Metodologia Fluidsales™",
  nomeCompleto: "Metodologia Fluidsales™",
  subtitulo: "A metodologia que transforma Bitrix24 em máquina de vendas",
  descricao:
    "Implementação estratégica focada no seu segmento de mercado — não em configurações genéricas.",
  pilares: [
    {
      id: "journey",
      nome: "Customer Journey Map",
      descricao: "Mapeamento de como o cliente passa pelo negócio",
      descricaoCompleta:
        "Antes de qualquer configuração, mapeamos toda a jornada do seu cliente — desde o primeiro contato até a recompra. Isso garante que o Bitrix24 reflita a realidade do seu negócio.",
      icon: "Map",
      antes: {
        titulo: "Antes da Zopu",
        descricao: "Jornada do cliente sem visibilidade clara",
      },
      depois: {
        titulo: "Com Metodologia Fluidsales™",
        descricao:
          "Cada touchpoint rastreado, gargalos identificados automaticamente",
      },
      visual: "journey-map",
      iaDesbloqueia:
        "Automações que agem no momento certo de cada etapa da jornada.",
    },
    {
      id: "processos",
      nome: "Processos Mapeados",
      descricao: "Fluxos de vendas e entrega documentados antes de configurar",
      descricaoCompleta:
        "Documentamos seus processos de vendas, pós-vendas e entrega ANTES de tocar na ferramenta. Isso garante que a ferramenta sirva o processo.",
      icon: "GitBranch",
      antes: {
        titulo: "Antes da Zopu",
        descricao: "Processos não documentados ou cada um faz do seu jeito",
      },
      depois: {
        titulo: "Com Metodologia Fluidsales™",
        descricao: "Playbooks claros, automações que funcionam",
      },
      visual: "process-flow",
      iaDesbloqueia:
        "CoPilot executa tarefas operacionais automaticamente dentro do fluxo.",
    },
    {
      id: "dados",
      nome: "Dados Organizados",
      descricao: "Base higienizada, sem duplicidades, com campos preenchidos",
      descricaoCompleta:
        "Limpamos e organizamos sua base de dados antes da migração. Dados limpos = inteligência real e decisões baseadas em fatos.",
      icon: "Database",
      antes: {
        titulo: "Antes da Zopu",
        descricao: "Dados espalhados em planilhas ou sistemas diferentes",
      },
      depois: {
        titulo: "Com Metodologia Fluidsales™",
        descricao: "Base única, confiável e pronta para IA",
      },
      visual: "data-org",
      iaDesbloqueia:
        "Scoring e roteamento automático de leads. Sem duplicidade, sem erro.",
    },
    {
      id: "icp",
      nome: "ICPs Definidos",
      descricao: "Clareza sobre quem é o cliente ideal e seu comportamento",
      descricaoCompleta:
        "Definimos com precisão quem é seu cliente ideal, onde ele está, e como se comporta. O CRM passa a priorizar automaticamente os leads certos.",
      icon: "Target",
      antes: {
        titulo: "Antes da Zopu",
        descricao: "Qualificação manual ou critérios imprecisos",
      },
      depois: {
        titulo: "Com Metodologia Fluidsales™",
        descricao: "IA qualifica e prioriza os leads com maior potencial",
      },
      visual: "icp-target",
      iaDesbloqueia:
        "IA qualifica e prioriza leads com maior potencial de conversão.",
    },
    {
      id: "adocao",
      nome: "Plano de Adoção",
      descricao: "Estratégia de como a equipe vai usar no dia a dia",
      descricaoCompleta:
        "Criamos um plano realista de como sua equipe vai adotar a ferramenta. Treinamento via Fluidz por função, métricas de engajamento — tudo pensado para assegurar uso real.",
      icon: "Users",
      antes: {
        titulo: "Antes da Zopu",
        descricao: "Treinamento genérico ou só no go-live",
      },
      depois: {
        titulo: "Com Fluidz",
        descricao:
          "Equipe expert em semanas, com trilhas por função e métricas de engajamento",
      },
      visual: "adoption-plan",
      iaDesbloqueia:
        "IA aplicada em rotina real. Time que usa = IA que funciona.",
    },
    {
      id: "metricas",
      nome: "Métricas de Sucesso",
      descricao: 'Definição clara do que significa "funcionar"',
      descricaoCompleta:
        'Antes de começar, definimos juntos o que significa "sucesso" para sua operação. Métricas claras, metas realistas, dashboards prontos.',
      icon: "BarChart3",
      antes: {
        titulo: "Antes da Zopu",
        descricao: "Relatórios manuais ou sem padrão definido",
      },
      depois: {
        titulo: "Com Metodologia Fluidsales™",
        descricao: "Dashboards em tempo real mostrando ROI da implementação",
      },
      visual: "success-metrics",
      iaDesbloqueia:
        "Previsão de receita (forecast) baseada em dados reais, não achismo.",
    },
  ],
} as const;

// ============================================
// PÁGINA: METODOLOGIA (Redesign 2025)
// ============================================

// Estatísticas de mercado para página Metodologia
export const METODOLOGIA_STATS = {
  empresasNaoBatemMeta: "74%",
  empresasNaoBatemMetaFonte: "Panorama de Vendas 2024",
  crmsFalham: "55%",
  crmsFalhamFonte: "Johnny Grow 2025",
  pmesSemCrm: "56%",
  pmesSemCrmFonte: "Sebrae 2024",
  vendasWhatsApp: "84%",
  vendasWhatsAppFonte: "Panorama de Vendas 2024",
  integracaoMktVendas: "15%",
  integracaoMktVendasFonte: "Panorama de Vendas 2024",
} as const;

// Os 4 Sintomas do "CRM como projeto de TI"
export const METODOLOGIA_SINTOMAS = [
  {
    id: "processo",
    titulo: "Ferramenta sem Processo",
    descricao: "Configuraram o CRM, mas seu funil nunca foi desenhado",
    dado: "55% dos CRMs falham por isso",
    fonte: "Johnny Grow",
    icone: "Settings",
  },
  {
    id: "dados",
    titulo: "Dados sem Governança",
    descricao:
      "56% das PMEs nem usam CRM. Das que usam, a maioria tem dados inutilizáveis",
    dado: "Sebrae 2024",
    fonte: "Sebrae",
    icone: "Database",
  },
  {
    id: "whatsapp",
    titulo: "WhatsApp sem Controle",
    descricao: "84% vendem pelo WhatsApp, mas ninguém rastreia, ninguém mede",
    dado: "Panorama de Vendas",
    fonte: "RD Station",
    icone: "MessageCircle",
  },
  {
    id: "adocao",
    titulo: "Tecnologia sem Adoção",
    descricao:
      "Treinamento de 2h não muda comportamento. A equipe volta pro Excel",
    dado: "Principal causa de falha",
    fonte: "CIO Review",
    icone: "Users",
  },
] as const;

// Os 4 Pilares da Metodologia Fluidsales™
export const METODOLOGIA_PILARES = [
  {
    id: "processo",
    numero: "01",
    titulo: "Processo",
    headline: "Desenhamos seu funil antes de tocar na ferramenta",
    porqueImporta: "Sem processo claro, CRM é só planilha glorificada",
    entregas: [
      "Mapeamento completo do funil de vendas",
      "Definição de etapas e critérios de passagem",
      "SLAs entre marketing, vendas e CS",
      "Automações planejadas antes de configurar",
    ],
    icone: "GitBranch",
    cor: "#635BFF",
  },
  {
    id: "pessoas",
    numero: "02",
    titulo: "Pessoas",
    headline: "Adoção estruturada por função",
    porqueImporta:
      "Treinamento genérico não funciona. Vendedor aprende diferente de gestor.",
    entregas: [
      "Trilhas de aprendizado por função via Fluidz",
      "Treinamento hands-on, não teórico",
      "Métricas de adoção e engajamento",
      "Acompanhamento até autonomia total",
    ],
    icone: "Users",
    cor: "#10B981",
  },
  {
    id: "dados",
    numero: "03",
    titulo: "Dados",
    headline: "Governança desde o dia 1",
    porqueImporta: "Dados ruins = decisões ruins. Garbage in, garbage out.",
    entregas: [
      "Estrutura de campos padronizada",
      "Regras de preenchimento obrigatório",
      "Dashboards limpos e acionáveis",
      "Processo de higienização contínua",
    ],
    icone: "Database",
    cor: "#F59E0B",
  },
  {
    id: "plataforma",
    numero: "04",
    titulo: "Plataforma",
    headline: "Bitrix24 configurado pro SEU processo",
    porqueImporta: "Ferramenta serve o processo, não o contrário",
    entregas: [
      "Configuração customizada para seu negócio",
      "Integrações com sistemas existentes",
      "WhatsApp Business API governado",
      "Automações sem código",
    ],
    icone: "Layers",
    cor: "#EC4899",
  },
] as const;

// Comparativo Parceiro Tradicional vs Zopu
export const METODOLOGIA_COMPARATIVO = [
  {
    tradicional: "Vende licença primeiro",
    zopu: "Entende processo primeiro",
  },
  {
    tradicional: "Configura ferramenta genérica",
    zopu: "Desenha operação customizada",
  },
  {
    tradicional: "Treinamento de 2 horas",
    zopu: "Adoção estruturada (Fluidz)",
  },
  {
    tradicional: "Projeto com data de fim",
    zopu: "Acompanhamento evolutivo",
  },
  {
    tradicional: "Desaparece após entrega",
    zopu: "Parceiro de longo prazo",
  },
] as const;

// Links externos
export const ZOPU_LINKS = {
  diagnostico: "https://diagnosticodematuridade.zopu.com.br/",
  whatsapp:
    "https://wa.me/554733079280?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Zopu%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es.",
  whatsappEspecialista:
    "https://wa.me/554733079280?text=Ol%C3%A1%2C%20gostaria%20de%20falar%20com%20um%20especialista%20sobre%20Bitrix24.",
  testeGratis: "https://www.bitrix24.com.br/create.php?p=15026259",
  fluidz: "https://fluidz.com.br",
  email: "contato@zopu.com.br",
  // Social
  linkedin: "https://br.linkedin.com/company/zopu",
  instagram: "https://www.instagram.com/souzopu/",
  youtube: "https://www.youtube.com/channel/UCD6akPmq0-7MGC-DSPjDjsw",
} as const;

// Escopos de implementação (sem preços - levar para conversa com consultor)
export const ZOPU_ESCOPOS = [
  {
    id: "crm-express",
    nome: "CRM Express",
    subtitulo: "Foco em vendas",
    prazo: "até 30 dias",
    para: "Empresas que precisam estruturar pré-vendas e vendas rapidamente",
    escopo: "Vendas",
    metodologia: "Processo enxuto e direto ao ponto",
    icon: "Zap",
    diferenciais: [
      "Setup focado em vendas",
      "Pipeline e funil configurados",
      "WhatsApp integrado",
      "Treinamento via Fluidz",
      "Métricas essenciais",
    ],
  },
  {
    id: "revops-launch",
    nome: "RevOps Launch™",
    subtitulo: "RevOps completo",
    prazo: "até 60 dias",
    para: "Empresas que querem transformar toda a operação de receita",
    escopo: "Revenue Operations",
    metodologia: "Metodologia Fluidsales™ completa com 6 pilares",
    icon: "Layers",
    recomendado: true,
    diferenciais: [
      "Diagnóstico profundo da operação",
      "Mapeamento completo de jornada",
      "Processos de vendas e pós-vendas",
      "Governança de dados",
      "Plano de adoção via Fluidz",
      "Métricas de sucesso definidas",
    ],
  },
  {
    id: "growth-architecture",
    nome: "Metodologia Fluidsales™",
    subtitulo: "Projetos personalizados",
    prazo: "prazo personalizado",
    para: "Enterprise com necessidades específicas e alta complexidade",
    escopo: "Personalizado",
    metodologia: "Arquitetura técnica detalhada sob medida",
    icon: "Settings",
    diferenciais: [
      "Escopo definido em conjunto",
      "Integrações complexas",
      "Multi-unidade / multi-país",
      "Governança enterprise",
      "Acompanhamento dedicado",
    ],
  },
] as const;

// @deprecated - Usar GROWTH_ARCHITECTURE_PRODUTOS ou ZOPU_ESCOPOS.
// Produtos (preços removidos - usar "Sob consulta")
export const ZOPU_PRODUTOS = [
  {
    id: "crm-express",
    nome: "CRM Express",
    subtitulo: "Revenue Intelligence",
    para: "PMEs que precisam de resultado rápido",
    preco: "Sob consulta",
    tipo: "projeto único",
    prazo: "30 dias",
    destaque: true,
    features: [
      "Setup completo do Bitrix24",
      "Processos de pré-vendas e vendas",
      "IA de qualificação configurada",
      "3 automações de WhatsApp com IA",
      "Dashboard com métricas essenciais",
      "30 dias de acompanhamento pós-go-live",
    ],
  },
  {
    id: "crm-futuro",
    nome: "CRM do Futuro",
    subtitulo: "Revenue Intelligence",
    para: "Transformação completa da operação de receita",
    preco: "Sob consulta",
    tipo: "projeto único",
    prazo: "90 dias",
    destaque: false,
    features: [
      "Tudo do CRM Express",
      "Processos de pós-vendas e CS",
      "IA de previsão de fechamento",
      "WhatsApp orquestrado completo",
      "Dashboards avançados com BI",
      "Health Score de clientes",
      "Playbooks de expansão e retenção",
    ],
  },
] as const;

// Planos Bitrix24 (Standard, Professional, Enterprise) - Preços Janeiro 2026
export const BITRIX24_PLANOS = [
  {
    id: "standard",
    nome: "Standard",
    para: "Para quem está começando",
    precoMensal: 699,
    precoAnual: 559,
    usuarios: "50",
    storage: "100 GB",
    destaque: false,
    features: [
      "CRM completo",
      "Gestão de tarefas e projetos",
      "Criação de sites",
      "E-commerce básico",
      "Assinatura eletrônica",
      "Suporte ao cliente",
    ],
  },
  {
    id: "professional",
    nome: "Professional",
    para: "Para quem precisa de todas as funcionalidades",
    precoMensal: 1399,
    precoAnual: 1119,
    usuarios: "100",
    storage: "1 TB",
    destaque: true,
    features: [
      "Tudo do Standard",
      "CRM 5X (recursos avançados)",
      "Recursos de RH",
      "Business Intelligence",
      "Automações avançadas",
      "Controles administrativos",
    ],
  },
  {
    id: "enterprise",
    nome: "Enterprise",
    para: "Para empresas grandes que precisam de ambiente dedicado",
    precoMensal: 2799,
    precoAnual: 2239,
    usuarios: "250+",
    storage: "3 TB+",
    destaque: false,
    features: [
      "Tudo do Professional",
      "SLA 99.95% contratual",
      "Suporte multi-filiais",
      "Servidor dedicado",
      "2 datacenters distribuídos",
      "Segurança enterprise",
    ],
  },
] as const;

// Setores atendidos
export const ZOPU_SETORES = [
  {
    id: "industria",
    nome: "Indústria",
    icon: "Factory",
    dor: "Processos despadronizados, silos entre áreas",
    solucao: "Do pedido à entrega, tudo integrado",
    metrica: "2x mais previsibilidade de forecast",
  },
  {
    id: "saude",
    nome: "Clínicas e Saúde",
    icon: "Heart",
    dor: "No-show alto, WhatsApp caótico, recepção sobrecarregada",
    solucao: "Agenda sempre cheia, recepção focada no presencial",
    metrica: "-65% a -72% no-show",
  },
  {
    id: "servicos",
    nome: "Serviços / Consultorias",
    icon: "Briefcase",
    dor: "Propostas demoram dias, follow-up escapa",
    solucao: "Propostas em horas, não em dias",
    metrica: "-87% tempo de proposta",
  },
  {
    id: "turismo",
    nome: "Turismo",
    icon: "Plane",
    dor: "Cotações demoradas, sazonalidade",
    solucao: "Quem responde primeiro fecha",
    metrica: "5x mais rápido para cotar",
  },
  {
    id: "varejo",
    nome: "Varejo / E-commerce",
    icon: "ShoppingCart",
    dor: "WhatsApp lotado, vendas reativas",
    solucao: "WhatsApp como canal de vendas, não como problema",
    metrica: "-78% tempo de resposta",
  },
  {
    id: "sst",
    nome: "SST",
    icon: "ShieldCheck",
    dor: "Controle manual de vencimentos, risco de multas",
    solucao: "Compliance certificado, escala sem proporção de custo",
    metrica: "Zero atrasos em compliance",
  },
] as const;

// Cases de sucesso
export const ZOPU_CASES = [
  {
    setor: "Serviços",
    metricaPrincipal: "-87%",
    metricaLabel: "tempo de proposta",
    descricao:
      "De 3 dias para 2 horas. Aumento de 72% no volume de propostas enviadas.",
    antes: "3 dias",
    depois: "2 horas",
  },
  {
    setor: "Varejo",
    metricaPrincipal: "-78%",
    metricaLabel: "tempo de resposta",
    descricao: "8 canais unificados. Resposta de 4 horas para 12 minutos.",
    antes: "4 horas",
    depois: "12 min",
  },
  {
    setor: "Indústria",
    metricaPrincipal: "+93%",
    metricaLabel: "acurácia de forecast",
    descricao: "Forecast de 45% para 87% de acurácia.",
    antes: "45%",
    depois: "87%",
  },
  {
    setor: "Saúde",
    metricaPrincipal: "-65%",
    metricaLabel: "no-show",
    descricao: "Taxa de no-show de 28% para 10%.",
    antes: "28%",
    depois: "10%",
  },
  {
    setor: "Turismo",
    metricaPrincipal: "5x",
    metricaLabel: "mais rápido",
    descricao: "Cotação de 6 horas para 45 minutos.",
    antes: "6 horas",
    depois: "45 min",
  },
  {
    setor: "SST",
    metricaPrincipal: "0%",
    metricaLabel: "atrasos",
    descricao: "De 15% de atrasos em compliance para zero.",
    antes: "15%",
    depois: "0%",
  },
] as const;

// Menu de navegação - Estrutura Consultiva (padrão B2B premium)
// Menu sugerido pela especificação Challenger:
// Soluções | Como funciona | Cases | Por que a Zopu | Segurança (Trust Center) | Conteúdos
export const NAVIGATION = {
  solucoes: [
    {
      nome: "CRM Express",
      href: "/crm-express",
      descricao: "Vendas e WhatsApp em 30 dias",
    },
    {
      nome: "RevOps Launch",
      href: "/revopslaunch",
      descricao: "Pipeline, metas e previsibilidade",
    },
    {
      nome: "Mapa de Performance de Receita",
      href: "/mapadeperformance",
      descricao: "Maturidade, governança e próximos passos",
    },
    {
      nome: "Enterprise",
      href: "/bitrix24-enterprise",
      descricao: "Multi-área e governança avançada",
    },
  ],
  comoFunciona: [
    {
      nome: "Metodologia Fluidsales",
      href: "/metodologia",
      descricao: "Os 6 pilares que fazem CRM funcionar",
    },
    {
      nome: "Por que Bitrix24",
      href: "/por-que-bitrix24",
      descricao: "All-in-one empresarial",
    },
    {
      nome: "Bitrix24 vs outros CRMs",
      href: "/bitrix24-vs-outras-ferramentas",
      descricao: "Comparativo objetivo",
    },
  ],
  porQueZopu: [
    {
      nome: "Por que a Zopu",
      href: "/por-que-zopu",
      descricao: "Metodologia e adoção real",
    },
    {
      nome: "Cases de Sucesso",
      href: "/cases",
      descricao: "Resultados mensuráveis",
    },
    { nome: "Segurança", href: "/seguranca", descricao: "Trust Center e SLAs" },
  ],
  recursos: [
    {
      nome: "Blog",
      href: "/recursos/blog",
      descricao: "Artigos e guias abertos",
    },
    {
      nome: "Biblioteca",
      href: "/recursos/biblioteca",
      descricao: "Materiais ricos em vídeo",
    },
    {
      nome: "Zopucast",
      href: "/recursos/biblioteca/zopucast",
      descricao: "Podcast (YouTube + Spotify)",
    },
    {
      nome: "Webinars Bitrix24",
      href: "/recursos/biblioteca/webinars-bitrix24",
      descricao: "Sessões abertas e demos",
    },
  ],
  // Seção Bitrix24 no menu principal
  bitrix24: [
    {
      nome: "Visão Geral",
      href: "/por-que-bitrix24",
      descricao: "All-in-one empresarial",
    },
    {
      nome: "Planos e Preços",
      href: "/planos-bitrix24",
      descricao: "Tabela comparativa completa",
    },
    {
      nome: "vs Outras Ferramentas",
      href: "/bitrix24-vs-outras-ferramentas",
      descricao: "HubSpot, Salesforce, Pipedrive e mais",
    },
  ],
  segmentos: [
    {
      nome: "Para Comercial",
      href: "/para/comercial",
      descricao: "Vendas com visibilidade",
    },
    {
      nome: "Para Gestores",
      href: "/para/gestores",
      descricao: "Pipeline, metas e previsibilidade",
    },
    {
      nome: "Para TI",
      href: "/para/ti",
      descricao: "Integrações, segurança e controle",
    },
    {
      nome: "Para PMEs",
      href: "/bitrix24-para-pmes",
      descricao: "5 a 50 usuários",
    },
    {
      nome: "Para Enterprise",
      href: "/bitrix24-enterprise",
      descricao: "100 a 5.000+ usuários",
    },
  ],
  empresa: [
    {
      nome: "Por que a Zopu",
      href: "/por-que-zopu",
      descricao: "Metodologia e adoção real",
    },
    {
      nome: "Zopu vs outros parceiros",
      href: "/zopu-vs-outros-parceiros",
      descricao: "Diferenças objetivas",
    },
    { nome: "Cases de Sucesso", href: "/cases", descricao: "Resultados reais" },
    { nome: "Segurança", href: "/seguranca", descricao: "Trust Center e SLAs" },
    { nome: "Sobre a Zopu", href: "/sobre", descricao: "Quem somos" },
    {
      nome: "Trabalhe Conosco",
      href: "/trabalhe-conosco",
      descricao: "Faça parte do time",
    },
  ],
} as const;

// Comparativo Zopu vs Mercado
export const COMPARATIVO_MERCADO = [
  {
    aspecto: "Objetivo",
    mercado: "Go-live e entrega",
    zopu: "ROI + adoção + satisfação no uso",
  },
  {
    aspecto: "Desenho de processo",
    mercado: "Replica o CRM antigo",
    zopu: "Desenha jornada, playbooks e rituais",
  },
  {
    aspecto: "Dados",
    mercado: "Campos soltos e cada um faz do seu jeito",
    zopu: "Modelo de dados + validações + dono do dado",
  },
  {
    aspecto: "Experiência do usuário",
    mercado: "Tela padrão, atrito alto",
    zopu: "Layout e automações para reduzir esforço",
  },
  {
    aspecto: "Adoção",
    mercado: "Treinamento único",
    zopu: "Treinamento por função + reforço contínuo (Fluidz)",
  },
  {
    aspecto: "Pós-go-live",
    mercado: "Suporte reativo (ticket quando quebra)",
    zopu: "Acompanhamento proativo e ajustes recorrentes",
  },
  {
    aspecto: "Automação/IA",
    mercado: "Promessa genérica",
    zopu: "Automações + CoPilot calibrados no seu contexto",
  },
  {
    aspecto: "Sucesso medido por",
    mercado: "Features entregues",
    zopu: "Uso real, qualidade do funil e retenção",
  },
] as const;

// Features do Bitrix24
export const BITRIX24_FEATURES = [
  {
    id: "crm",
    nome: "CRM + Vendas",
    descricao: "Do lead ao cliente fiel, tudo em um lugar",
    detalhes:
      "Pipeline visual, automações de follow-up, IA para qualificação, integração com WhatsApp.",
    tags: ["Pipeline visual", "IA CoPilot", "WhatsApp", "Automações"],
    destaque: true,
  },
  {
    id: "comunicacao",
    nome: "Comunicação",
    descricao: "Chat interno, videochamadas, feed de notícias",
    detalhes: "Sem Slack + Zoom + email separados.",
    tags: ["Chat", "Vídeo", "Feed"],
    destaque: false,
  },
  {
    id: "projetos",
    nome: "Tarefas e Projetos",
    descricao: "Kanban, Gantt, automações de workflow",
    detalhes: "Gerencie projetos integrados ao CRM.",
    tags: ["Kanban", "Gantt", "Workflows"],
    destaque: false,
  },
  {
    id: "automacao",
    nome: "Automação",
    descricao: "Regras, robôs, triggers sem código",
    detalhes: "Automatize processos repetitivos.",
    tags: ["No-code", "Triggers", "Workflows"],
    destaque: false,
  },
  {
    id: "ia",
    nome: "IA CoPilot",
    descricao: "Assistente de IA nativo em toda plataforma",
    detalhes: "Qualificação, previsão, automação inteligente.",
    tags: ["Qualificação", "Previsão", "Assistente"],
    destaque: false,
  },
  {
    id: "integracao",
    nome: "Integrações",
    descricao: "200+ integrações prontas",
    detalhes: "WhatsApp, ERPs, e-commerce, marketing.",
    tags: ["WhatsApp", "ERP", "E-commerce"],
    destaque: false,
  },
] as const;

// Features do Bitrix24 - Versão Expandida para Showcase
export const BITRIX24_FEATURES_EXPANDED = [
  {
    id: "crm",
    nome: "CRM + Vendas",
    headline: "Do lead ao cliente fiel",
    descricao:
      "Pipeline visual com IA que qualifica leads, automatiza follow-ups e integra WhatsApp nativamente.",
    beneficios: [
      "Pipeline visual arrastar/soltar",
      "IA qualifica leads automaticamente",
      "WhatsApp integrado nativamente",
      "Automações de follow-up sem código",
      "Previsão de fechamento com IA",
    ],
    screenshot: "/images/bitrix24/crm-pipeline.png",
    mockupAlt: "Pipeline de vendas do Bitrix24 com cards de negócio",
    cta: {
      texto: "Ver demonstração",
      link: "/por-que-bitrix24",
    },
    destaque: true,
    stats: {
      numero: "+45%",
      label: "conversão média",
    },
    icon: "TrendingUp",
  },
  {
    id: "projetos",
    nome: "Tarefas e Projetos",
    headline: "Projetos no prazo, sempre",
    descricao:
      "Kanban, Gantt, dependências e automações. Tudo integrado ao CRM para entregar o que vendeu.",
    beneficios: [
      "Kanban visual personalizável",
      "Gantt com dependências",
      "Automações de workflow",
      "Integrado ao CRM (venda → projeto)",
      "Templates reutilizáveis",
    ],
    screenshot: "/images/bitrix24/projetos-kanban.png",
    mockupAlt: "Quadro Kanban do Bitrix24 com tarefas organizadas",
    cta: {
      texto: "Ver como funciona",
      link: "/por-que-bitrix24",
    },
    destaque: false,
    icon: "LayoutGrid",
  },
  {
    id: "comunicacao",
    nome: "Comunicação",
    headline: "Sua equipe conectada",
    descricao:
      "Chat, videochamadas, feed de notícias e calendário. Substitui Slack + Zoom + Google Agenda.",
    beneficios: [
      "Chat em tempo real",
      "Videochamadas HD ilimitadas",
      "Feed de notícias da empresa",
      "Calendário compartilhado",
      "Histórico centralizado",
    ],
    screenshot: "/images/bitrix24/comunicacao-chat.png",
    mockupAlt: "Chat e videochamada do Bitrix24",
    cta: {
      texto: "Ver recursos",
      link: "/por-que-bitrix24",
    },
    destaque: false,
    icon: "MessageSquare",
  },
  {
    id: "automacao",
    nome: "Automação",
    headline: "Menos trabalho manual",
    descricao:
      "Crie automações sem código. Regras, triggers e robôs que trabalham enquanto você dorme.",
    beneficios: [
      "Editor visual no-code",
      "Triggers por evento ou tempo",
      "Robôs que executam ações",
      "Templates prontos",
      "Logs de execução",
    ],
    screenshot: "/images/bitrix24/automacao-workflow.png",
    mockupAlt: "Editor de automação do Bitrix24 com workflow visual",
    cta: {
      texto: "Ver automações",
      link: "/por-que-bitrix24",
    },
    destaque: false,
    icon: "Workflow",
  },
  {
    id: "ia",
    nome: "IA CoPilot",
    headline: "IA que trabalha por você",
    descricao:
      "Assistente de IA nativo que qualifica leads, prevê fechamentos, resume conversas e sugere ações.",
    beneficios: [
      "Qualificação automática de leads",
      "Previsão de probabilidade de fechamento",
      "Resumo de conversas longas",
      "Sugestões de próximas ações",
      "Análise de sentimento",
    ],
    screenshot: "/images/bitrix24/ia-copilot.png",
    mockupAlt: "CoPilot do Bitrix24 sugerindo ações em um negócio",
    cta: {
      texto: "Ver IA em ação",
      link: "/revopslaunch#ia",
    },
    destaque: false,
    badge: "Novo",
    icon: "Bot",
  },
  {
    id: "integracao",
    nome: "Integrações",
    headline: "Conecta com tudo",
    descricao:
      "200+ integrações prontas. WhatsApp, ERPs, e-commerce, marketing. API aberta para o resto.",
    beneficios: [
      "WhatsApp Business API",
      "ERPs (TOTVS, SAP, Omie)",
      "E-commerce (Shopify, WooCommerce)",
      "Marketing (RD Station, ActiveCampaign)",
      "API REST completa",
    ],
    screenshot: "/images/bitrix24/integracoes-grid.png",
    mockupAlt: "Grid de integrações disponíveis no Bitrix24",
    cta: {
      texto: "Ver integrações",
      link: "/por-que-bitrix24#integracoes",
    },
    destaque: false,
    icon: "Plug",
  },
] as const;

// 4 Pilares da metodologia (versão resumida)
export const PILARES_METODOLOGIA = [
  {
    id: "estrategia",
    numero: "01",
    nome: "Estratégia Primeiro",
    descricao: "Processos de receita definidos antes de tocar na ferramenta",
    detalhes: "Gap analysis, mapeamento de jornada, quick wins identificados.",
  },
  {
    id: "bitrix24",
    numero: "02",
    nome: "Bitrix24 como Motor",
    descricao: "Plataforma completa com IA nativa",
    detalhes: "CRM + Projetos + Comunicação + Automação. Preço fixo em reais.",
  },
  {
    id: "ia",
    numero: "03",
    nome: "IA CoPilot Integrada",
    descricao: "CoPilot configurado para seu contexto",
    detalhes:
      "IA nativa do Bitrix24 pronta para usar quando sua operação estiver rodando.",
  },
  {
    id: "equipe",
    numero: "04",
    nome: "Equipe Preparada",
    descricao: "Treinamento via Fluidz até autonomia total",
    detalhes: "9.500+ profissionais certificados. Capacitação contínua.",
  },
] as const;

// Fases da metodologia 30/60/90
export const FASES_METODOLOGIA = [
  {
    fase: 1,
    nome: "Diagnóstico",
    periodo: "Dias 1-30",
    descricao:
      "Entendemos sua operação atual e identificamos gaps e oportunidades.",
    entregas: [
      "Mapa do ICP",
      "Jornada do cliente documentada",
      "Gap analysis",
      "Quick wins identificados",
    ],
  },
  {
    fase: 2,
    nome: "Desenho",
    periodo: "Dias 31-60",
    descricao: "Arquitetamos a solução antes de tocar na ferramenta.",
    entregas: [
      "Arquitetura de funis",
      "Padrões de dados",
      "Mapa de automações",
      "Playbooks de uso",
    ],
  },
  {
    fase: 3,
    nome: "Implantação",
    periodo: "Dias 61-90",
    descricao: "Configuramos, integramos, treinamos e acompanhamos.",
    entregas: [
      "Bitrix24 configurado",
      "Integrações ativas",
      "Treinamento hands-on",
      "Governança implementada",
    ],
  },
] as const;

// ============================================
// PÁGINA: POR QUE BITRIX24
// ============================================

// Estatísticas globais do Bitrix24 (Fontes: bitrix24.com, G2, Capterra 2024)
export const BITRIX24_GLOBAL_STATS = {
  usuarios: "15M+",
  usuariosTexto: "usuários globais",
  ferramentas: "35+",
  ferramentasTexto: "ferramentas integradas",
  integracoes: "550+",
  integracoesTexto: "integrações disponíveis",
  avaliacaoG2: "4.1",
  avaliacaoCapterra: "4.2",
  precoFixo: true,
  precoFixoTexto: "Preço fixo em reais",
} as const;

// Estatísticas de mercado CRM (Fontes: Gartner, DemandSage, CRM.org 2024)
export const ESTATISTICAS_MERCADO_CRM = {
  empresasUsandoCRM: "91%",
  empresasUsandoCRMTexto: "das empresas com 10+ funcionários usam CRM",
  projetosFalham: "70%",
  projetosFalhamTexto: "dos projetos de CRM falham em entregar ROI",
  faltaTreinamento: "42%",
  faltaTreinamentoTexto: "citam falta de treinamento como barreira",
  tendenciaIA: "51%",
  tendenciaIATexto: "identificam IA generativa como tendência top",
  mercadoAtual: "$101.4B",
  mercado2032: "$262.74B",
  fonte: "Gartner, DemandSage, CRM.org 2024",
} as const;

// 7 Categorias de ferramentas do Bitrix24
export const BITRIX24_TOOL_CATEGORIES = [
  {
    id: "crm",
    nome: "CRM & Vendas",
    icone: "Zap",
    headline: "Do lead ao cliente fiel",
    subtitulo: "Pipeline visual, automação comercial e integrações",
    descricao:
      "Gerencie todo o ciclo de vendas em um lugar só. Do primeiro contato até o fechamento e pós-venda, com automações que eliminam trabalho manual.",
    ferramentas: [
      "Pipeline visual com drag & drop",
      "Leads e deals com histórico completo",
      "Cotações e propostas personalizadas",
      "Faturas e pagamentos integrados",
      "WhatsApp Business oficial",
      "Telefonia VoIP nativa",
      "E-signature para contratos",
      "Relatórios e dashboards",
    ],
    beneficios: [
      "Visão 360° de cada cliente",
      "Zero lead perdido por esquecimento",
      "Previsibilidade de receita",
    ],
    cor: "#635BFF",
    screenshotPlaceholder: "/images/bitrix24/crm-pipeline.png",
  },
  {
    id: "copilot",
    nome: "IA CoPilot",
    icone: "Bot",
    headline: "IA que trabalha. Não que promete.",
    subtitulo: "Inteligência artificial nativa em toda plataforma",
    descricao:
      "O CoPilot está presente em todas as ferramentas do Bitrix24, automatizando tarefas repetitivas e fornecendo insights em tempo real.",
    ferramentas: [
      "Transcrição de chamadas e reuniões",
      "Resumos automáticos de conversas",
      "Autopreenchimento de campos CRM",
      "Geração de textos e e-mails",
      "Análise de sentimento",
      "Sugestões de próximas ações",
      "Tradução automática",
      "Criação de tarefas por voz",
    ],
    beneficios: [
      "Sem custo adicional por IA",
      "Integrado em toda plataforma",
      "Reduz 40% do trabalho manual",
    ],
    cor: "#00A67E",
    screenshotPlaceholder: "/images/bitrix24/copilot-action.png",
  },
  {
    id: "projetos",
    nome: "Tarefas & Projetos",
    icone: "FolderKanban",
    headline: "Entregas no prazo. Sempre.",
    subtitulo: "Kanban, Gantt, Scrum e time tracking integrados",
    descricao:
      "Gerencie projetos de qualquer complexidade com metodologia flexível. Visualize em Kanban, Gantt ou Scrum conforme sua preferência.",
    ferramentas: [
      "Kanban visual com automações",
      "Gráfico de Gantt interativo",
      "Scrum boards com sprints",
      "Time tracking automático",
      "Templates de projetos",
      "Dependências entre tarefas",
      "Workload e capacidade",
      "Relatórios de produtividade",
    ],
    beneficios: [
      "Visibilidade total do time",
      "Gargalos identificados antes",
      "Projetos entregues no prazo",
    ],
    cor: "#F59E0B",
    screenshotPlaceholder: "/images/bitrix24/kanban-board.png",
  },
  {
    id: "comunicacao",
    nome: "Comunicação",
    icone: "MessageSquare",
    headline: "Tudo em um lugar. Nada perdido.",
    subtitulo: "Chat, videochamadas e feed unificados",
    descricao:
      "Elimine o caos de múltiplos canais. Chat interno, videochamadas HD, feed de atividades e calendário compartilhado em uma única interface.",
    ferramentas: [
      "Chat interno ilimitado",
      "Videochamadas HD com gravação",
      "Feed de atividades",
      "Calendário compartilhado",
      "Agendamento de reuniões",
      "Grupos e canais temáticos",
      "Compartilhamento de arquivos",
      "Notificações inteligentes",
    ],
    beneficios: [
      "Comunicação centralizada",
      "Decisões documentadas",
      "Time sempre alinhado",
    ],
    cor: "#3B82F6",
    screenshotPlaceholder: "/images/bitrix24/chat-video.png",
  },
  {
    id: "marketing",
    nome: "Marketing",
    icone: "Megaphone",
    headline: "Campanhas que convertem.",
    subtitulo: "Email marketing, landing pages e automações",
    descricao:
      "Crie campanhas completas sem sair da plataforma. Email marketing, landing pages, integração com ads e automações de nutrição.",
    ferramentas: [
      "Email marketing nativo",
      "Landing pages builder",
      "Formulários web",
      "Integração Facebook Ads",
      "Integração Google Ads",
      "Automações de nutrição",
      "Segmentação avançada",
      "A/B testing",
    ],
    beneficios: [
      "Leads qualificados automaticamente",
      "ROI de campanhas visível",
      "Marketing e vendas conectados",
    ],
    cor: "#EC4899",
    screenshotPlaceholder: "/images/bitrix24/email-marketing.png",
  },
  {
    id: "rh",
    nome: "RH & Automação",
    icone: "Users",
    headline: "Pessoas organizadas. Processos fluindo.",
    subtitulo: "Estrutura organizacional, workflows e RPA",
    descricao:
      "Organize sua estrutura de pessoas e automatize processos repetitivos. De aprovações a onboarding, tudo flui sem intervenção manual.",
    ferramentas: [
      "Perfis de funcionários",
      "Organograma visual",
      "Workflows de aprovação",
      "RPA e automações",
      "Knowledge base",
      "Solicitações e ausências",
      "Permissões granulares",
      "Relatórios de RH",
    ],
    beneficios: [
      "Processos padronizados",
      "Aprovações em minutos",
      "Compliance certificado",
    ],
    cor: "#8B5CF6",
    screenshotPlaceholder: "/images/bitrix24/workflow-rpa.png",
  },
  {
    id: "sites",
    nome: "Sites & E-commerce",
    icone: "Globe",
    headline: "Sites e landing pages em minutos.",
    subtitulo: "Builder no-code, loja online e pagamentos",
    descricao:
      "Crie sites e lojas online sem programação. Templates responsivos, integração nativa com CRM e processamento de pagamentos.",
    ferramentas: [
      "Site builder no-code",
      "Templates responsivos",
      "Loja online completa",
      "Carrinho e checkout",
      "Integração de pagamentos",
      "Gestão de estoque",
      "SEO básico incluso",
      "Analytics integrado",
    ],
    beneficios: [
      "Site pronto em horas",
      "Pedidos direto no CRM",
      "Zero custo de hospedagem",
    ],
    cor: "#06B6D4",
    screenshotPlaceholder: "/images/bitrix24/site-builder.png",
  },
] as const;

// FAQ específico para página Por que Bitrix24
export const FAQ_POR_QUE_BITRIX24 = [
  {
    pergunta: "Bitrix24 é difícil de usar?",
    resposta:
      "Não. O Bitrix24 foi projetado para ser intuitivo desde o primeiro acesso. Com interface em português, tutoriais integrados e nossa metodologia Fluidz de capacitação, sua equipe atinge autonomia em semanas, não meses. Mais de 9.500 profissionais já foram certificados por nós.",
  },
  {
    pergunta: "Preciso usar todas as 35+ ferramentas?",
    resposta:
      "Não. Você ativa apenas o que precisa, quando precisa. A maioria dos clientes começa com CRM + Projetos e vai expandindo conforme a maturidade digital aumenta. As ferramentas estão lá quando você precisar, sem custo adicional.",
  },
  {
    pergunta: "E se minha equipe não se adaptar?",
    resposta:
      "É por isso que investimos em capacitação, não só configuração. Nossa metodologia inclui treinamento hands-on, playbooks de uso e acompanhamento pós-implantação. Com 96% de retenção anual, podemos afirmar: equipes se adaptam quando o processo é bem conduzido.",
  },
  {
    pergunta: "Como funciona o suporte após a implantação?",
    resposta:
      "Você conta com calls mensais proativos para revisar uso, WhatsApp direto com time técnico para urgências, e ajustes contínuos inclusos no contrato. Não abandonamos você após o go-live.",
  },
  {
    pergunta: "Posso migrar de outro CRM para o Bitrix24?",
    resposta:
      "Sim. Realizamos migração assistida com limpeza e validação de dados. Já migramos clientes de HubSpot, Pipedrive, RD Station, Salesforce e dezenas de outros sistemas. Seus dados chegam limpos e organizados.",
  },
  {
    pergunta: "O Bitrix24 funciona bem no Brasil?",
    resposta:
      "Sim. Servidores locais garantem velocidade, interface em português nativo, integração oficial com WhatsApp Business, e preço fixo em reais sem variação cambial. Mais de 450 empresas brasileiras usam Bitrix24 com a Zopu.",
  },
  {
    pergunta: "A IA CoPilot tem custo adicional?",
    resposta:
      "Não. O CoPilot está incluso em todos os planos pagos do Bitrix24, integrado nativamente em CRM, Projetos, Tarefas e Comunicação. Você não paga por token ou uso adicional.",
  },
  {
    pergunta: "Bitrix24 é seguro para dados sensíveis?",
    resposta:
      "Sim. Bitrix24 possui certificação SOC 2 Type II, criptografia em trânsito e em repouso, data centers com redundância, e opção de instalação on-premise para empresas com requisitos específicos de compliance.",
  },
] as const;

// Comparativo de preços atualizado (valores aproximados - verificar bitrix24.com)
export const COMPARATIVO_PRECO_BITRIX24 = [
  {
    ferramenta: "HubSpot",
    tipo: "CRM + Marketing",
    precoInicial: "Grátis limitado",
    precoEscala: "$800+/mês",
    precoEnterprise: "$3.600+/mês",
    moeda: "USD",
    observacao: "Preço escala rápido com contatos",
  },
  {
    ferramenta: "Salesforce",
    tipo: "CRM Enterprise",
    precoInicial: "$25/usuário",
    precoEscala: "$150/usuário",
    precoEnterprise: "$300+/usuário",
    moeda: "USD",
    observacao: "Cada módulo é cobrado separadamente",
  },
  {
    ferramenta: "Pipedrive",
    tipo: "CRM Vendas",
    precoInicial: "$14/usuário",
    precoEscala: "$49/usuário",
    precoEnterprise: "$99/usuário",
    moeda: "USD",
    observacao: "Foco apenas em vendas",
  },
  {
    ferramenta: "Monday",
    tipo: "Projetos",
    precoInicial: "$9/usuário",
    precoEscala: "$16/usuário",
    precoEnterprise: "Sob consulta",
    moeda: "USD",
    observacao: "CRM e automações são extras",
  },
  {
    ferramenta: "Bitrix24",
    tipo: "Plataforma 360°",
    precoInicial: "Grátis",
    precoEscala: "R$ 559/mês",
    precoEnterprise: "R$ 1.119/mês",
    moeda: "BRL",
    observacao: "Preço fixo anual, usuários ilimitados",
    destaque: true,
  },
] as const;

// ============================================
// PÁGINA: BITRIX24 ENTERPRISE
// ============================================

// Certificações da Zopu
export const ENTERPRISE_CERTIFICATIONS = {
  aicpaSoc2: {
    titulo: "AICPA SOC 2 Type II",
    badge: "Único parceiro certificado",
    descricao:
      "Certificação de conformidade que atesta controles rigorosos de segurança, disponibilidade, integridade de processamento, confidencialidade e privacidade de dados.",
    significado:
      "Garante que seus dados são tratados com padrões de segurança equivalentes a instituições financeiras.",
    imagem: "/images/bitrix24screen/aicpasoc2.webp",
    beneficios: [
      "Auditoria externa anual por entidade independente",
      "Controles de acesso e autenticação verificados",
      "Proteção contra vazamento de dados sensíveis",
      "Conformidade facilitada com LGPD e regulamentações",
      "Audit trail completo de todas as operações",
    ],
  },
  pmp: {
    titulo: "PMP - Project Management Professional",
    descricao:
      "Certificação do Project Management Institute para gestão de projetos complexos.",
    imagem: "/images/bitrix24screen/pmp.webp",
    beneficios: [
      "Gestão estruturada de escopo, prazo e custo",
      "Comunicação executiva clara e objetiva",
      "Mitigação proativa de riscos",
      "Entregas previsíveis e documentadas",
    ],
  },
  sixSigma: {
    titulo: "Black Belt Lean Six Sigma",
    descricao:
      "Metodologia de melhoria contínua e redução de desperdício em processos.",
    beneficios: [
      "Processos otimizados desde o início",
      "Eliminação de retrabalho e gargalos",
      "Métricas de qualidade monitoradas",
    ],
  },
} as const;

// Práticas de segurança da Zopu
export const ENTERPRISE_SECURITY_PRACTICES = [
  "VPN obrigatória para todos os consultores",
  "Endpoint protection em todas as máquinas",
  "Autenticação multi-fator (2FA) obrigatória",
  "Política rigorosa de senhas",
  "Treinamento anual de segurança da informação",
  "Acordo de confidencialidade (NDA) padrão",
] as const;

// Trust signals para barra compacta
export const ENTERPRISE_TRUST_SIGNALS = [
  { icon: "Shield", texto: "Único parceiro AICPA SOC 2", highlight: true },
  { icon: "Award", texto: "Consultores PMP" },
  { icon: "Target", texto: "Black Belt Six Sigma" },
  { icon: "Lock", texto: "VPN + Endpoint" },
  { icon: "TrendingUp", texto: "96% retenção anual" },
] as const;

// Capacidades Enterprise detalhadas
export const ENTERPRISE_CAPABILITIES_DETAILED = [
  {
    id: "escala",
    icon: "Globe",
    titulo: "Escala Comprovada",
    subtitulo: "De 100 a 5.000+ usuários. Sem degradação de performance.",
    descricao:
      "Arquitetura preparada para operações multinacionais com múltiplas unidades, países e idiomas.",
    features: [
      "Multi-unidade com consolidação de dados",
      "Multi-país com fusos horários automáticos",
      "Multi-idioma nativo (35+ idiomas)",
      "Hierarquias organizacionais complexas",
      "Performance garantida em qualquer escala",
    ],
    metrica: { numero: "5.000+", label: "usuários na maior operação" },
  },
  {
    id: "governanca",
    icon: "Shield",
    titulo: "Governança e Compliance",
    subtitulo: "Controle granular. Rastreabilidade total.",
    descricao:
      "Estrutura completa de permissões, aprovações e audit trail para atender requisitos de compliance.",
    features: [
      "Permissões granulares por função e departamento",
      "Workflows de aprovação multi-nível",
      "Logs de auditoria com retenção configurável",
      "Políticas de acesso por IP e horário",
      "Integração com SSO corporativo",
    ],
    metrica: { numero: "100%", label: "rastreabilidade de ações" },
  },
  {
    id: "integracoes",
    icon: "Layers",
    titulo: "Integrações Complexas",
    subtitulo: "ERPs, legacy systems, APIs customizadas.",
    descricao:
      "Equipe especializada em conectar Bitrix24 com qualquer sistema existente na sua infraestrutura.",
    features: [
      "Conectores prontos para SAP, TOTVS, Oracle",
      "Middleware para sistemas legados",
      "APIs REST, SOAP, GraphQL",
      "Webhooks bidirecionais",
      "ETL e sincronização de dados",
    ],
    metrica: { numero: "100+", label: "integrações entregues" },
  },
  {
    id: "bi",
    icon: "BarChart3",
    titulo: "BI e Analytics",
    subtitulo: "Dashboards executivos. Previsibilidade de receita.",
    descricao:
      "Visão consolidada de toda operação de receita com métricas em tempo real para tomada de decisão.",
    features: [
      "Dashboards executivos personalizados",
      "Previsão de receita com IA",
      "Health Score de clientes",
      "Análise de cohort e churn",
      "Exportação para PowerBI/Tableau",
    ],
    metrica: { numero: "+93%", label: "acurácia de forecast" },
  },
  {
    id: "suporte",
    icon: "Headphones",
    titulo: "Suporte Dedicado",
    subtitulo: `SLA de primeira resposta: Enterprise ${ZOPU_STATS.slaEnterprise}.`,
    descricao:
      "Modelo de suporte enterprise com atendimento prioritário e gerente de sucesso dedicado.",
    features: [
      "Gerente de conta dedicado",
      `SLA 1ª resposta: Enterprise ${ZOPU_STATS.slaEnterprise} | Demais ${ZOPU_STATS.slaDemais}`,
      "Canal direto para suporte e incidentes",
      "Canal direto WhatsApp com equipe técnica",
      "Escalation prioritário para casos críticos",
    ],
    metrica: {
      numero: ZOPU_STATS.slaEnterprise,
      label: "SLA 1ª resposta (Enterprise)",
    },
  },
  {
    id: "seguranca",
    icon: "Lock",
    titulo: "Segurança Enterprise",
    subtitulo: "SSO, 2FA, criptografia, SLA.",
    descricao:
      "Infraestrutura de segurança preparada para os requisitos mais exigentes de compliance.",
    features: [
      "Single Sign-On (SSO) com SAML/OAuth",
      "Autenticação multi-fator (2FA)",
      "Criptografia em trânsito e em repouso",
      "Data residency configurável",
      "SLA de disponibilidade contratual",
    ],
    metrica: { numero: "99.9%", label: "SLA de disponibilidade" },
  },
] as const;

// Fases de implementação Enterprise
export const ENTERPRISE_IMPLEMENTATION_PHASES = [
  {
    fase: 1,
    nome: "Discovery & Assessment",
    periodo: "Semanas 1-4",
    descricao:
      "Imersão na operação para entender processos, sistemas existentes e stakeholders.",
    entregas: [
      "Assessment de processos operacionais",
      "Mapeamento de stakeholders e sponsors",
      "Inventário de sistemas e integrações",
      "Gap analysis detalhado",
      "Plano de change management",
      "Kick-off com liderança executiva",
    ],
  },
  {
    fase: 2,
    nome: "Arquitetura & Design",
    periodo: "Semanas 5-8",
    descricao: "Desenho da solução completa antes de qualquer configuração.",
    entregas: [
      "Arquitetura de funis e pipelines",
      "Modelo de dados e campos",
      "Mapa de automações e workflows",
      "Especificação de integrações",
      "Playbooks de uso por perfil",
      "Plano de migração de dados",
    ],
  },
  {
    fase: 3,
    nome: "Implementação & Go-Live",
    periodo: "Semanas 9-16",
    descricao:
      "Configuração, integração, migração e treinamento em fases controladas.",
    entregas: [
      "Bitrix24 configurado conforme arquitetura",
      "Integrações ativas e testadas",
      "Dados migrados e validados",
      "Treinamento por perfil (gestores, vendas, CS)",
      "Documentação técnica completa",
      "Go-live assistido com war room",
    ],
  },
  {
    fase: 4,
    nome: "Estabilização & Hypercare",
    periodo: "Semanas 17-28",
    descricao:
      "Acompanhamento intensivo pós-go-live para assegurar adoção e ajustes.",
    entregas: [
      "Suporte dedicado em período crítico",
      "Ajustes finos baseados em uso real",
      "Retreinamento de usuários com dificuldade",
      "Otimização de automações",
      "Dashboards de adoção e uso",
      "Handover para suporte contínuo",
    ],
  },
] as const;

// Diferenciais Enterprise
export const ENTERPRISE_DIFFERENTIALS = [
  "Implementação em fases sem interrupção da operação",
  "Change management com comunicação interna estruturada",
  "Gestão de stakeholders e sponsors executivos",
  "Treinamento segmentado por perfil (gestores, vendas, CS, operações)",
  "Documentação técnica e playbooks customizados",
  "Acompanhamento pós-go-live de 90 dias",
  "Roadmap de evolução contínua",
  "Canal direto com produto Bitrix24",
] as const;

// Integrações Enterprise
export const ENTERPRISE_INTEGRATIONS = [
  {
    categoria: "ERPs",
    icon: "Database",
    descricao: "Integração bidirecional com sistemas de gestão",
    integracoes: ["SAP", "TOTVS", "Oracle", "Sankhya", "Senior"],
  },
  {
    categoria: "Business Intelligence",
    icon: "Server",
    descricao: "Dashboards e análise de dados em tempo real",
    integracoes: ["Power BI", "Tableau", "Looker", "Qlik"],
  },
  {
    categoria: "Custom APIs",
    icon: "Plug",
    descricao: "Desenvolvimento de conectores sob demanda",
    integracoes: ["REST APIs", "SOAP", "GraphQL", "Webhooks"],
  },
] as const;

// Case Enterprise genérico
export const CASE_ENTERPRISE = {
  empresa: "Multinacional de Serviços",
  setor: "Enterprise (500+ usuários)",
  anonimizado: true,
  metricas: [
    { valor: "500+", label: "usuários ativos" },
    { valor: "3", label: "países" },
    { valor: "12", label: "integrações" },
    { valor: "45 dias", label: "go-live" },
  ],
  depoimento: {
    texto:
      "A Zopu entendeu a complexidade da nossa operação e entregou uma solução que escala. A certificação AICPA SOC 2 foi decisiva para nossa escolha.",
    autor: "Diretor de Operações",
    cargo: "Multinacional de Serviços",
  },
  resultados: [
    "Unificação de 3 sistemas legados",
    "Redução de 60% no tempo de onboarding",
    "Visibilidade total de pipeline cross-country",
    "Compliance com políticas globais",
  ],
} as const;

// ============================================
// PÁGINA: BITRIX24 PARA PMEs
// ============================================

// Timeline 30 dias para PME
export const PME_TIMELINE_30_DIAS = [
  {
    semana: 1,
    titulo: "Discovery",
    entregas: [
      "Entendemos sua operação",
      "Mapeamos processos",
      "Definimos prioridades",
    ],
  },
  {
    semana: 2,
    titulo: "Configuração",
    entregas: [
      "Funis configurados",
      "WhatsApp integrado",
      "Automações básicas",
    ],
  },
  {
    semana: 3,
    titulo: "Treinamento",
    entregas: ["Time na plataforma", "Playbooks entregues", "Dúvidas tiradas"],
  },
  {
    semana: 4,
    titulo: "Go-Live",
    entregas: ["Operação funcionando", "Suporte ativo", "Ajustes finos"],
  },
] as const;

// Dores reframadas como oportunidades
export const PME_OPORTUNIDADES = [
  {
    icon: "Target",
    titulo: "CRM como estratégia de receita",
    descricao: "Implementamos como estratégia de receita, não como software.",
  },
  {
    icon: "Users",
    titulo: "Time treinado até autonomia",
    descricao: "Fluidz com 9.500+ profissionais certificados.",
  },
  {
    icon: "BarChart3",
    titulo: "Dashboard pronto",
    descricao: "Métricas essenciais visíveis desde o início.",
  },
  {
    icon: "MessageSquare",
    titulo: "WhatsApp que vende",
    descricao: "Integrado com automações de IA.",
  },
  {
    icon: "Zap",
    titulo: "Operação em 30 dias",
    descricao: "Funcionando, não prometendo.",
  },
  {
    icon: "DollarSign",
    titulo: "Preço fixo em reais",
    descricao: "Sem surpresas cambiais.",
  },
] as const;

// FAQ específico para PME
export const FAQ_PME = [
  {
    pergunta: "Quantos usuários preciso ter no mínimo?",
    resposta: "A partir de 5 usuários. Ideal para times de 5 a 50 pessoas.",
  },
  {
    pergunta: "E se meu time não usar?",
    resposta:
      "Treinamento via Fluidz até autonomia total. 9.500+ profissionais já certificados.",
  },
  {
    pergunta: "Posso migrar dados do CRM anterior?",
    resposta: "Sim. Migração de dados está incluída no projeto.",
  },
  {
    pergunta: "O preço é em dólar?",
    resposta: "Não. Preço fixo em reais, sem variação cambial.",
  },
  {
    pergunta: "E se precisar de mais depois?",
    resposta: "Evoluímos para CRM do Futuro (90 dias) ou suporte contínuo.",
  },
  {
    pergunta: "Vocês integram com meu ERP?",
    resposta: "Sim. Integramos com Omie, Conta Azul, TOTVS e sistemas via API.",
  },
] as const;

// ============================================
// PÁGINA: POR QUE ZOPU
// ============================================

// Erros vs Soluções - Tabela comparativa
export const ERROS_VS_SOLUCOES_ZOPU = [
  {
    erro: {
      titulo: '"Go-live" sem processo mapeado',
      descricao: "Pipeline bonito, operação igual — sem regras, sem rituais.",
    },
    solucao: {
      titulo: "Metodologia Fluidsales™ mapeia antes de configurar",
      descricao: "Processos documentados antes da ferramenta.",
    },
  },
  {
    erro: {
      titulo: "Dados sem padrão e duplicados",
      descricao:
        "CRM vira bagunça em semanas: campos soltos, sem confiabilidade.",
    },
    solucao: {
      titulo: "Dados organizados com governança",
      descricao: "Base higienizada, padrões e deduplicação.",
    },
  },
  {
    erro: {
      titulo: "WhatsApp sem histórico e governança",
      descricao: "Canal crítico sem rastreio, responsáveis confusos.",
    },
    solucao: {
      titulo: "WhatsZopu com API oficial Meta",
      descricao: "Estabilidade, histórico e governança.",
    },
  },
  {
    erro: {
      titulo: "Treinamento genérico no go-live",
      descricao: "Equipe esquece em 30 dias, volta para planilhas.",
    },
    solucao: {
      titulo: "Fluidz por função (vendas, gestor, admin)",
      descricao: "Adoção real com trilhas personalizadas.",
    },
  },
  {
    erro: {
      titulo: "Pós go-live fraco ou inexistente",
      descricao: "Sistema nunca amadurece, ajustes não acontecem.",
    },
    solucao: {
      titulo: "Suporte contínuo com SLA",
      descricao: "Otimização mensal e suporte proativo.",
    },
  },
] as const;

// Riscos do mercado - Timeline
export const RISCOS_MERCADO_ZOPU = [
  {
    id: "go-live",
    titulo: '"Go-live" sem processo',
    descricao:
      "Pipeline bonito, operação igual — sem regras, sem rituais, sem dono do processo. Time volta para planilhas em semanas.",
    impacto: "Retrabalho em 3–6 meses",
    impactoTipo: "danger",
    icon: "FileX",
  },
  {
    id: "dados",
    titulo: "Dados sem padrão",
    descricao:
      "CRM vira bagunça em semanas: duplicidade, campos soltos, informação sem confiabilidade. Relatórios não servem para decisão.",
    impacto: "Base inutilizável",
    impactoTipo: "danger",
    icon: "DatabaseBackup",
  },
  {
    id: "whatsapp",
    titulo: "WhatsApp sem governança",
    descricao:
      "Histórico perdido, responsáveis confusos e risco operacional no canal mais crítico. Sem rastreio de quem atendeu.",
    impacto: "Risco operacional alto",
    impactoTipo: "warning",
    icon: "MessageCircleWarning",
  },
  {
    id: "treinamento",
    titulo: "Treinamento genérico",
    descricao:
      'Adoção cai rápido quando o CRM vira fiscalização, não rotina de trabalho. Time não sabe o "porquê" de usar.',
    impacto: "Adoção cai 60% em 30 dias",
    impactoTipo: "warning",
    icon: "GraduationCap",
  },
  {
    id: "gestao",
    titulo: "Gestão às cegas",
    descricao:
      "Dashboard bonito, decisão zero. Métricas que não viram ação. Gestor continua pedindo relatório no Excel.",
    impacto: "Investimento sem retorno",
    impactoTipo: "warning",
    icon: "ChartNoAxes",
  },
  {
    id: "pos-golive",
    titulo: "Pós go-live fraco",
    descricao:
      "Sem ajustes recorrentes, o sistema nunca amadurece — e o time volta para planilhas. Otimizações não acontecem.",
    impacto: "Estagnação permanente",
    impactoTipo: "danger",
    icon: "TrendingDown",
  },
] as const;

// Diferenciais Zopu com provas
export const DIFERENCIAIS_ZOPU = [
  {
    id: "roi",
    titulo: "ROI como accountability",
    descricao:
      'CRM bem implementado gera retorno real. Medimos sucesso pelo resultado, não pelo "projeto entregue".',
    prova: "8.71x",
    provaLabel: "ROI médio CRM",
    badgeVariant: "success",
    icon: "TrendingUp",
  },
  {
    id: "growth-architecture",
    titulo: "Metodologia Fluidsales™ (6 pilares)",
    descricao: "Processo, dados, adoção e métricas antes de configurar.",
    prova: "6 pilares",
    provaLabel: "com entregáveis",
    badgeVariant: "brand",
    icon: "Layers",
  },
  {
    id: "fluidz",
    titulo: "Fluidz (adoção vira produto)",
    descricao: "Treinamentos por função: gestor, vendas, pós-vendas, RevOps.",
    prova: "9.500+",
    provaLabel: "certificados",
    badgeVariant: "info",
    icon: "GraduationCap",
  },
  {
    id: "integracoes",
    titulo: "Integrações prontas",
    descricao:
      "CRM conversa com marketing, ERP e financeiro — menos TI, menos retrabalho.",
    prova: "100+",
    provaLabel: "integrações",
    badgeVariant: "brand",
    icon: "Plug",
  },
  {
    id: "whatszopu",
    titulo: "WhatsZopu (API oficial)",
    descricao: "Estabilidade e governança para canal crítico.",
    prova: "API Meta",
    provaLabel: "oficial",
    badgeVariant: "success",
    icon: "MessageCircle",
  },
  {
    id: "sla",
    titulo: "Suporte com SLA contratual",
    descricao:
      "1ª resposta em horário comercial: Enterprise <2 min; demais <5 min.",
    prova: "<2min",
    provaLabel: "Enterprise SLA",
    badgeVariant: "brand",
    icon: "Headphones",
  },
] as const;

// Caminhos de entrada (routing)
export const CAMINHOS_ENTRADA_ZOPU = [
  {
    id: "express",
    nome: "CRM Express",
    subtitulo: "Foco em vendas",
    prazo: "Até 30 dias",
    descricao:
      "Entrada rápida em operação para estruturar pré-vendas e vendas com o básico bem feito.",
    nota: "Ideal para quem precisa começar rápido com o básico bem estruturado.",
    destacado: false,
    icon: "Zap",
  },
  {
    id: "revops-launch",
    nome: "RevOps Launch™",
    subtitulo: "Operação completa",
    prazo: "Até 60 dias",
    descricao:
      "Estrutura + adoção + métricas + evolução contínua. Para quem quer governança e previsibilidade.",
    nota: "Para operações que precisam de processo completo desde o início.",
    destacado: false,
    icon: "Layers",
  },
  {
    id: "growth-architecture",
    nome: "Metodologia Fluidsales™",
    subtitulo: "Projetos complexos",
    prazo: "Sob medida",
    descricao:
      "Projetos enterprise com múltiplos times, integrações e governança avançada.",
    nota: "Para empresas com operação multiárea e necessidade de integrações.",
    destacado: false,
    icon: "BarChart3",
  },
] as const;

// FAQ específico para página Por que Zopu (objeções reais)
export const FAQ_POR_QUE_ZOPU = [
  {
    pergunta:
      "Meu time já tentou CRM e não usou. Por que agora seria diferente?",
    resposta:
      "Porque a maioria dos projetos foca em configurar campos, não em criar rotina. Nosso trabalho é tornar o CRM o sistema de trabalho do time — com rituais, playbooks e treinamento por função. Se não virar rotina em 30 dias, algo está errado na estrutura, não no time.",
  },
  {
    pergunta:
      "Falei com uma consultoria maior do que a Zopu. Por que devo escolher vocês?",
    resposta:
      "Porque 96% dos nossos clientes renovam. Consultoria grande não significa projeto que funciona — significa mais camadas, mais júniors no seu projeto, e menos pele em jogo. Na Zopu, seu projeto é uma % relevante do nosso faturamento, então nosso incentivo é que dê certo. Por isso medimos ROI (8.71x médio) e por isso a Bitrix24 nos cita como referência em retenção.",
  },
  {
    pergunta: "Vocês fazem integração com meu ERP/sistema legado?",
    resposta:
      "Sim. Temos +100 integrações prontas e equipe técnica para conectar sistemas específicos. Na conversa de 20 min, mapeamos suas integrações críticas e indicamos o caminho técnico mais seguro.",
  },
  {
    pergunta: "Quanto tempo meu time precisa dedicar?",
    resposta:
      "Implementação boa exige participação: decisão de regras, validação de processo e treinamento por função. A diferença é que nossa execução é estruturada por etapas — você sabe exatamente o que precisa fazer e quando.",
  },
  {
    pergunta: "E se eu não gostar do resultado?",
    resposta:
      "Cada etapa tem entregáveis claros e validação antes de avançar. Você não paga por surpresas. E se algo não funcionar como esperado, ajustamos até funcionar — faz parte do SLA.",
  },
  {
    pergunta: "O que eu recebo no diagnóstico de 20 min?",
    resposta:
      "Um plano claro de próximos passos — mesmo que não avance conosco. Entendemos seu cenário (processo, dados, WhatsApp e integrações) e indicamos o caminho mais seguro. Se não fizer sentido para sua empresa, a gente fala na hora.",
  },
] as const;

// Pilares Metodologia Fluidsales™ para página Por que Zopu (com entregáveis)
export const PILARES_GROWTH_ARCHITECTURE = [
  {
    id: "journey",
    nome: "Customer Journey Map",
    descricao: "Fluxo real do cliente e pontos de queda.",
    entregavel: "Mapa de jornada documentado",
    icon: "Map",
  },
  {
    id: "processos",
    nome: "Processos Mapeados",
    descricao: "Fluxos documentados antes da configuração.",
    entregavel: "Playbooks por etapa",
    icon: "GitBranch",
  },
  {
    id: "dados",
    nome: "Dados Organizados",
    descricao: "Padrões e base higienizada, sem duplicidades.",
    entregavel: "Base limpa e padronizada",
    icon: "Database",
  },
  {
    id: "icp",
    nome: "ICPs Definidos",
    descricao: "Critérios práticos de qualificação.",
    entregavel: "Scorecard de leads",
    icon: "Target",
  },
  {
    id: "adocao",
    nome: "Plano de Adoção",
    descricao: "Rituais de uso diário por função.",
    entregavel: "Trilhas Fluidz",
    icon: "Users",
  },
  {
    id: "metricas",
    nome: "Métricas de Sucesso",
    descricao: 'Definição objetiva do que é "funcionar".',
    entregavel: "Dashboard de KPIs",
    icon: "BarChart3",
  },
] as const;

// ============================================
// PÁGINAS: SOLUÇÕES VERTICALIZADAS
// ============================================

// Tipo para dados de vertical
export interface VerticalData {
  id: string;
  slug: string;
  nome: string;
  headline: string;
  subheadline: string;
  icon: string;
  cor: string;
  corLight: string;
  metricaDestaque: {
    valor: string;
    label: string;
  };
  problemas: Array<{
    titulo: string;
    descricao: string;
    icon: string;
  }>;
  solucoes: Array<{
    titulo: string;
    descricao: string;
    icon: string;
  }>;
  diferenciais: Array<{
    titulo: string;
    descricao: string;
    icon: string;
  }>;
  cases: Array<{
    empresa: string;
    metrica: string;
    quote: string;
  }>;
  faq: Array<{
    pergunta: string;
    resposta: string;
  }>;
}

// Verticais por Segmento
export const VERTICAIS_SOLUCOES: Record<string, VerticalData> = {
  industrias: {
    id: "industrias",
    slug: "industrias",
    nome: "Indústrias",
    headline: "Bitrix24 para Indústrias",
    subheadline: "Do pedido à entrega, tudo integrado",
    icon: "Factory",
    cor: "#F59E0B",
    corLight: "rgba(245, 158, 11, 0.1)",
    metricaDestaque: {
      valor: "+40%",
      label: "produtividade em processos",
    },
    problemas: [
      {
        titulo: "Processos despadronizados",
        descricao:
          "Cada área trabalha de um jeito diferente, sem visibilidade do todo",
        icon: "AlertTriangle",
      },
      {
        titulo: "Silos entre departamentos",
        descricao:
          "Vendas não fala com produção, produção não fala com expedição",
        icon: "Boxes",
      },
      {
        titulo: "Forecast impreciso",
        descricao: "Previsão de vendas desconectada da capacidade produtiva",
        icon: "TrendingDown",
      },
      {
        titulo: "Informação em planilhas",
        descricao: "Dados críticos espalhados em dezenas de planilhas Excel",
        icon: "FileSpreadsheet",
      },
    ],
    solucoes: [
      {
        titulo: "Workflow unificado",
        descricao: "Do pedido à entrega, um fluxo só com visibilidade total",
        icon: "GitBranch",
      },
      {
        titulo: "Integração com ERP",
        descricao: "Bitrix24 conversa com seu sistema de gestão existente",
        icon: "Link",
      },
      {
        titulo: "Forecast inteligente",
        descricao:
          "Previsão de vendas com IA conectada à realidade operacional",
        icon: "Brain",
      },
      {
        titulo: "Dashboards em tempo real",
        descricao:
          "Indicadores atualizados automaticamente para decisão rápida",
        icon: "BarChart3",
      },
    ],
    diferenciais: [
      {
        titulo: "Conectores ERP prontos",
        descricao: "Integração com TOTVS, SAP, Sankhya e outros",
        icon: "Plug",
      },
      {
        titulo: "Processos mapeados",
        descricao: "Metodologia Fluidsales™ documenta antes de configurar",
        icon: "Map",
      },
      {
        titulo: "Adoção por função",
        descricao: "Treinamento específico: vendas, PCP, expedição",
        icon: "Users",
      },
      {
        titulo: "Suporte especializado",
        descricao: "Time que entende a linguagem industrial",
        icon: "Headphones",
      },
    ],
    cases: [
      {
        empresa: "Indústria de manufatura",
        metrica: "+93% acurácia de forecast",
        quote: "Saímos de 45% para 87% de acurácia no forecast de vendas.",
      },
    ],
    faq: [
      {
        pergunta: "Bitrix24 integra com meu ERP?",
        resposta:
          "Sim. Temos conectores prontos para TOTVS, SAP, Sankhya, Senior e outros. Para ERPs específicos, desenvolvemos integrações customizadas via API.",
      },
      {
        pergunta: "Como funciona a integração com produção?",
        resposta:
          "O Bitrix24 pode receber informações do ERP sobre status de produção e atualizar automaticamente os negócios no CRM, mantendo vendas informados sobre prazos reais.",
      },
      {
        pergunta: "Vocês entendem de indústria?",
        resposta:
          "Temos cases em manufatura, metalurgia, plásticos e outros segmentos industriais. Entendemos a dinâmica de orçamento, produção e expedição.",
      },
      {
        pergunta: "Quanto tempo leva a implementação?",
        resposta:
          "Depende do escopo. CRM Express em 30 dias, RevOps Launch completo em 60-90 dias. Enterprise com integrações complexas pode levar mais.",
      },
    ],
  },

  saude: {
    id: "saude",
    slug: "saude",
    nome: "Saúde",
    headline: "Bitrix24 para Clínicas e Saúde",
    subheadline: "Agenda cheia, recepção focada no presencial",
    icon: "Heart",
    cor: "#EC4899",
    corLight: "rgba(236, 72, 153, 0.1)",
    metricaDestaque: {
      valor: "-65%",
      label: "redução no no-show",
    },
    problemas: [
      {
        titulo: "No-show alto",
        descricao: "Pacientes faltam sem avisar, agenda com buracos",
        icon: "UserX",
      },
      {
        titulo: "WhatsApp caótico",
        descricao: "Confirmações manuais, sem histórico centralizado",
        icon: "MessageCircleWarning",
      },
      {
        titulo: "Recepção sobrecarregada",
        descricao: "Time atendendo telefone em vez de cuidar do presencial",
        icon: "Phone",
      },
      {
        titulo: "Falta de follow-up",
        descricao: "Pacientes não retornam, oportunidades perdidas",
        icon: "UserMinus",
      },
    ],
    solucoes: [
      {
        titulo: "Confirmação automatizada",
        descricao: "WhatsApp confirma consultas automaticamente 24h antes",
        icon: "MessageSquareCheck",
      },
      {
        titulo: "Agenda integrada",
        descricao: "CRM conectado ao sistema de agenda da clínica",
        icon: "Calendar",
      },
      {
        titulo: "Follow-up automático",
        descricao: "Lembrete de retorno e campanhas de reativação",
        icon: "Bell",
      },
      {
        titulo: "Histórico centralizado",
        descricao: "Todas as interações do paciente em um lugar só",
        icon: "FileText",
      },
    ],
    diferenciais: [
      {
        titulo: "Integração com agendas",
        descricao: "Conectamos com os principais sistemas de clínicas",
        icon: "Calendar",
      },
      {
        titulo: "WhatsApp governado",
        descricao: "API oficial com templates aprovados para saúde",
        icon: "Shield",
      },
      {
        titulo: "LGPD compliance",
        descricao: "Dados de pacientes tratados com segurança",
        icon: "Lock",
      },
      {
        titulo: "Cases comprovados",
        descricao: "Clínicas com redução real de no-show",
        icon: "Award",
      },
    ],
    cases: [
      {
        empresa: "Clínica multiespecialidade",
        metrica: "-65% no-show",
        quote:
          "Taxa de no-show caiu de 28% para 10% com confirmação automatizada.",
      },
    ],
    faq: [
      {
        pergunta: "Integra com meu sistema de agenda?",
        resposta:
          "Sim. Integramos com os principais sistemas de gestão de clínicas via API. Consulte conosco sobre seu sistema específico.",
      },
      {
        pergunta: "Como funciona a confirmação de consulta?",
        resposta:
          "O Bitrix24 envia mensagem automática via WhatsApp 24h antes. O paciente confirma com um clique, e o status atualiza automaticamente no CRM.",
      },
      {
        pergunta: "E a LGPD?",
        resposta:
          "O Bitrix24 possui recursos de compliance e a Zopu configura permissões adequadas para dados sensíveis de saúde.",
      },
      {
        pergunta: "Funciona para clínicas pequenas?",
        resposta:
          "Sim. O CRM Express é ideal para clínicas de 5-20 profissionais que precisam reduzir no-show e organizar atendimento.",
      },
    ],
  },

  sst: {
    id: "sst",
    slug: "sst",
    nome: "SST",
    headline: "Bitrix24 para SST",
    subheadline: "Compliance garantido, escala sem proporção de custo",
    icon: "ShieldCheck",
    cor: "#10B981",
    corLight: "rgba(16, 185, 129, 0.1)",
    metricaDestaque: {
      valor: "0%",
      label: "atrasos em compliance",
    },
    problemas: [
      {
        titulo: "Controle manual de vencimentos",
        descricao: "Planilhas para controlar ASOs, NRs e treinamentos",
        icon: "FileSpreadsheet",
      },
      {
        titulo: "Risco de multas",
        descricao: "Documentação vencida gera autuações e processos",
        icon: "AlertTriangle",
      },
      {
        titulo: "Escala difícil",
        descricao: "Mais clientes = mais planilhas = mais erro humano",
        icon: "TrendingDown",
      },
      {
        titulo: "Comunicação fragmentada",
        descricao: "Cliente não sabe status, ligações constantes",
        icon: "PhoneOff",
      },
    ],
    solucoes: [
      {
        titulo: "Alertas automáticos",
        descricao: "Sistema avisa antes do vencimento de documentos",
        icon: "Bell",
      },
      {
        titulo: "Portal do cliente",
        descricao: "Cliente consulta status sem ligar para você",
        icon: "Globe",
      },
      {
        titulo: "Workflow de renovação",
        descricao: "Processo automático de agendamento e acompanhamento",
        icon: "RefreshCw",
      },
      {
        titulo: "Dashboard de compliance",
        descricao: "Visão consolidada de toda a carteira",
        icon: "BarChart3",
      },
    ],
    diferenciais: [
      {
        titulo: "Processos SST mapeados",
        descricao: "Entendemos ASO, NRs, treinamentos e prazos",
        icon: "ClipboardCheck",
      },
      {
        titulo: "Automações específicas",
        descricao: "Workflows prontos para rotinas de SST",
        icon: "Cog",
      },
      {
        titulo: "Escala sem custo proporcional",
        descricao: "Mais clientes sem mais planilhas",
        icon: "TrendingUp",
      },
      {
        titulo: "Integração eSocial",
        descricao: "Preparado para exigências do governo",
        icon: "FileCheck",
      },
    ],
    cases: [
      {
        empresa: "Consultoria SST",
        metrica: "0% atrasos",
        quote:
          "Saímos de 15% de atrasos em compliance para zero com alertas automáticos.",
      },
    ],
    faq: [
      {
        pergunta: "Vocês entendem de SST?",
        resposta:
          "Sim. Temos cases em consultorias de SST e entendemos a dinâmica de ASOs, NRs, treinamentos e prazos legais.",
      },
      {
        pergunta: "Como funcionam os alertas?",
        resposta:
          "O sistema monitora datas de vencimento e dispara alertas automáticos para você e para o cliente com antecedência configurável.",
      },
      {
        pergunta: "Integra com eSocial?",
        resposta:
          "O Bitrix24 pode ser configurado para apoiar o processo de envio ao eSocial, com campos e validações específicos.",
      },
      {
        pergunta: "Meus clientes podem acessar?",
        resposta:
          "Sim. Podemos configurar um portal onde seus clientes consultam status de documentos e agendamentos.",
      },
    ],
  },

  turismo: {
    id: "turismo",
    slug: "turismo",
    nome: "Turismo",
    headline: "Bitrix24 para Turismo",
    subheadline: "Quem responde primeiro, fecha",
    icon: "Plane",
    cor: "#06B6D4",
    corLight: "rgba(6, 182, 212, 0.1)",
    metricaDestaque: {
      valor: "5x",
      label: "mais rápido para cotar",
    },
    problemas: [
      {
        titulo: "Cotações demoradas",
        descricao: "Cliente pede orçamento e espera horas ou dias",
        icon: "Clock",
      },
      {
        titulo: "Sazonalidade cruel",
        descricao: "Alta temporada sobrecarrega, baixa temporada preocupa",
        icon: "Calendar",
      },
      {
        titulo: "Follow-up esquecido",
        descricao: "Leads quentes esfriam enquanto você monta pacote",
        icon: "UserMinus",
      },
      {
        titulo: "Histórico perdido",
        descricao: "Cada atendente com seu WhatsApp, sem visão centralizada",
        icon: "MessageCircleWarning",
      },
    ],
    solucoes: [
      {
        titulo: "Cotação rápida",
        descricao: "Templates e automações aceleram resposta",
        icon: "Zap",
      },
      {
        titulo: "Pipeline visual",
        descricao: "Todas as cotações em andamento visíveis",
        icon: "Kanban",
      },
      {
        titulo: "Follow-up automático",
        descricao: "Sistema lembra de fazer follow quando você esquece",
        icon: "Bell",
      },
      {
        titulo: "WhatsApp centralizado",
        descricao: "Todas as conversas em um lugar, qualquer pessoa atende",
        icon: "MessageSquare",
      },
    ],
    diferenciais: [
      {
        titulo: "Velocidade que converte",
        descricao: "Em turismo, quem responde primeiro fecha",
        icon: "Zap",
      },
      {
        titulo: "Templates de pacotes",
        descricao: "Cotações pré-montadas para destinos frequentes",
        icon: "FileText",
      },
      {
        titulo: "Gestão de alta temporada",
        descricao: "Processos que escalam quando demanda explode",
        icon: "TrendingUp",
      },
      {
        titulo: "Reativação inteligente",
        descricao: "Campanhas para clientes que viajaram no ano passado",
        icon: "RefreshCw",
      },
    ],
    cases: [
      {
        empresa: "Agência de viagens",
        metrica: "5x mais rápido",
        quote: "Tempo de cotação caiu de 6 horas para 45 minutos.",
      },
    ],
    faq: [
      {
        pergunta: "Funciona para agências pequenas?",
        resposta:
          "Sim. O CRM Express é ideal para agências de 3-10 pessoas que precisam responder rápido e não perder leads.",
      },
      {
        pergunta: "Integra com sistemas de reserva?",
        resposta:
          "Podemos integrar com os principais sistemas de reserva e consolidadores via API.",
      },
      {
        pergunta: "Como lidar com alta temporada?",
        resposta:
          "Automações assumem tarefas repetitivas, liberando sua equipe para fechar negócios. Pipeline visual mostra prioridades.",
      },
      {
        pergunta: "E para operadoras de turismo?",
        resposta:
          "Também atendemos operadoras com processos mais complexos de B2B e gestão de parceiros.",
      },
    ],
  },

  servicos: {
    id: "servicos",
    slug: "servicos",
    nome: "Serviços",
    headline: "Bitrix24 para Serviços",
    subheadline: "Propostas em horas, não em dias",
    icon: "Briefcase",
    cor: "#8B5CF6",
    corLight: "rgba(139, 92, 246, 0.1)",
    metricaDestaque: {
      valor: "-87%",
      label: "tempo de proposta",
    },
    problemas: [
      {
        titulo: "Propostas demoram dias",
        descricao: "Cada proposta é um documento novo do zero",
        icon: "Clock",
      },
      {
        titulo: "Follow-up escapa",
        descricao: "Proposta enviada e esquecida, lead esfria",
        icon: "UserMinus",
      },
      {
        titulo: "Sem visibilidade de pipeline",
        descricao: "Não sabe quantas propostas estão em andamento",
        icon: "EyeOff",
      },
      {
        titulo: "Dependência do dono",
        descricao: "Só o sócio sabe precificar e negociar",
        icon: "User",
      },
    ],
    solucoes: [
      {
        titulo: "Propostas em 2 horas",
        descricao: "Templates e campos automáticos aceleram criação",
        icon: "FileText",
      },
      {
        titulo: "Pipeline estruturado",
        descricao: "Cada proposta em seu estágio, nada escapa",
        icon: "Kanban",
      },
      {
        titulo: "Follow-up automático",
        descricao: "Sistema cobra resposta quando cliente demora",
        icon: "Bell",
      },
      {
        titulo: "Playbooks de vendas",
        descricao: "Processo documentado, time replica sucesso",
        icon: "BookOpen",
      },
    ],
    diferenciais: [
      {
        titulo: "Templates de proposta",
        descricao: "Modelos prontos por tipo de serviço",
        icon: "FileText",
      },
      {
        titulo: "Precificação padronizada",
        descricao: "Regras claras para qualquer pessoa cotar",
        icon: "Calculator",
      },
      {
        titulo: "Processo replicável",
        descricao: "Time vende como o fundador vendia",
        icon: "Users",
      },
      {
        titulo: "Métricas de conversão",
        descricao: "Sabe qual tipo de serviço converte mais",
        icon: "BarChart3",
      },
    ],
    cases: [
      {
        empresa: "Consultoria empresarial",
        metrica: "-87% tempo de proposta",
        quote: "De 3 dias para 2 horas. Volume de propostas aumentou 72%.",
      },
    ],
    faq: [
      {
        pergunta: "Funciona para serviços complexos?",
        resposta:
          "Sim. Mesmo serviços com precificação variável podem ter templates base que aceleram a criação de propostas.",
      },
      {
        pergunta: "Como padronizar propostas?",
        resposta:
          "Criamos templates com campos dinâmicos que puxam dados do CRM. A proposta se monta sozinha.",
      },
      {
        pergunta: "E para consultorias pequenas?",
        resposta:
          "O CRM Express é perfeito para consultorias de 3-10 pessoas que precisam escalar vendas sem contratar.",
      },
      {
        pergunta: "Integra com assinatura eletrônica?",
        resposta:
          "Sim. O Bitrix24 tem assinatura eletrônica nativa e integramos com DocuSign, Clicksign e outros.",
      },
    ],
  },

  tecnologia: {
    id: "tecnologia",
    slug: "tecnologia",
    nome: "Tecnologia",
    headline: "Bitrix24 para Tecnologia",
    subheadline: "Do lead ao onboarding, pipeline único",
    icon: "Code",
    cor: "#3B82F6",
    corLight: "rgba(59, 130, 246, 0.1)",
    metricaDestaque: {
      valor: "+45%",
      label: "conversão de trials",
    },
    problemas: [
      {
        titulo: "Marketing e vendas desconectados",
        descricao: "MQLs viram leads e somem no limbo",
        icon: "Unplug",
      },
      {
        titulo: "Trials que não convertem",
        descricao: "Usuário entra no trial e ninguém acompanha",
        icon: "UserX",
      },
      {
        titulo: "Onboarding manual",
        descricao: "Cada cliente é um projeto novo sem padrão",
        icon: "FileX",
      },
      {
        titulo: "Churn invisível",
        descricao: "Só descobre que cliente vai sair quando já saiu",
        icon: "TrendingDown",
      },
    ],
    solucoes: [
      {
        titulo: "Funil de trials estruturado",
        descricao: "Cada trial é acompanhado com automações",
        icon: "Filter",
      },
      {
        titulo: "Lead scoring com IA",
        descricao: "Identifica quais leads estão quentes",
        icon: "Brain",
      },
      {
        titulo: "Onboarding automatizado",
        descricao: "Workflow guia cliente pelos primeiros passos",
        icon: "Rocket",
      },
      {
        titulo: "Health Score de clientes",
        descricao: "Identifica risco de churn antes de acontecer",
        icon: "Heart",
      },
    ],
    diferenciais: [
      {
        titulo: "Integrações SaaS",
        descricao: "Conectamos com Stripe, Intercom, Segment e outros",
        icon: "Plug",
      },
      {
        titulo: "Product-led growth",
        descricao: "Processos para empresas que vendem via trial",
        icon: "Rocket",
      },
      {
        titulo: "CS estruturado",
        descricao: "Playbooks de onboarding e expansão",
        icon: "Users",
      },
      {
        titulo: "Métricas SaaS",
        descricao: "MRR, churn, LTV, CAC no dashboard",
        icon: "BarChart3",
      },
    ],
    cases: [
      {
        empresa: "SaaS B2B",
        metrica: "+45% conversão de trials",
        quote:
          "Acompanhamento estruturado de trials aumentou conversão significativamente.",
      },
    ],
    faq: [
      {
        pergunta: "Integra com ferramentas de produto?",
        resposta:
          "Sim. Integramos com Segment, Mixpanel, Amplitude e outras ferramentas de product analytics.",
      },
      {
        pergunta: "Como funciona o health score?",
        resposta:
          "Combinamos dados de uso do produto, interações de suporte e engajamento para calcular risco de churn.",
      },
      {
        pergunta: "Funciona para empresas early-stage?",
        resposta:
          "Sim. O CRM Express ajuda startups a estruturar processo comercial desde cedo.",
      },
      {
        pergunta: "E para vendas enterprise?",
        resposta:
          "O RevOps Launch é ideal para SaaS com ciclo de vendas mais longo e múltiplos stakeholders.",
      },
    ],
  },
};

// Capabilities (funcionalidades transversais)
export const CAPABILITIES_SOLUCOES: Record<string, VerticalData> = {
  telefonia: {
    id: "telefonia",
    slug: "telefonia",
    nome: "Telefonia",
    headline: "Telefonia Integrada ao CRM",
    subheadline: "Ligações que viram dados, não ruído",
    icon: "Phone",
    cor: "#10B981",
    corLight: "rgba(16, 185, 129, 0.1)",
    metricaDestaque: {
      valor: "100%",
      label: "ligações rastreadas",
    },
    problemas: [
      {
        titulo: "Ligações sem registro",
        descricao: "Vendedor liga e não anota, histórico perdido",
        icon: "PhoneOff",
      },
      {
        titulo: "Sem métricas de chamadas",
        descricao: "Não sabe quantas ligações são feitas por dia",
        icon: "BarChart3",
      },
      {
        titulo: "Custos descontrolados",
        descricao: "Telefonia cara sem visibilidade de uso",
        icon: "DollarSign",
      },
      {
        titulo: "Gravações inacessíveis",
        descricao: "Precisa ouvir chamada e não encontra",
        icon: "FileSearch",
      },
    ],
    solucoes: [
      {
        titulo: "Click-to-call no CRM",
        descricao: "Liga direto do cadastro do cliente",
        icon: "Phone",
      },
      {
        titulo: "Gravação automática",
        descricao: "Todas as chamadas gravadas e vinculadas ao lead",
        icon: "Mic",
      },
      {
        titulo: "Transcrição com IA",
        descricao: "CoPilot transcreve e resume chamadas",
        icon: "FileText",
      },
      {
        titulo: "Dashboard de ligações",
        descricao: "Métricas de volume, duração e resultado",
        icon: "BarChart3",
      },
    ],
    diferenciais: [
      {
        titulo: "VoIP nativo",
        descricao: "Telefonia integrada, sem gambiarras",
        icon: "Phone",
      },
      {
        titulo: "Custo previsível",
        descricao: "Planos com minutos inclusos em reais",
        icon: "DollarSign",
      },
      {
        titulo: "IA CoPilot",
        descricao: "Transcrição e resumo de chamadas",
        icon: "Bot",
      },
      {
        titulo: "Configuração Zopu",
        descricao: "Setup completo de ramais e filas",
        icon: "Settings",
      },
    ],
    cases: [
      {
        empresa: "Call center interno",
        metrica: "100% rastreado",
        quote:
          "Todas as ligações agora ficam no histórico do cliente automaticamente.",
      },
    ],
    faq: [
      {
        pergunta: "Preciso trocar minha operadora?",
        resposta:
          "Não necessariamente. O Bitrix24 tem telefonia VoIP nativa, mas também integra com outras soluções.",
      },
      {
        pergunta: "Como funciona o custo?",
        resposta:
          "A telefonia do Bitrix24 tem planos em reais com minutos inclusos. Sem surpresas.",
      },
      {
        pergunta: "As gravações ficam onde?",
        resposta:
          "As gravações ficam vinculadas ao lead/cliente no CRM, com acesso direto do histórico.",
      },
      {
        pergunta: "E para times remotos?",
        resposta:
          "Funciona via softphone no computador ou celular. Time pode ligar de qualquer lugar.",
      },
    ],
  },

  "crm-whatsapp": {
    id: "crm-whatsapp",
    slug: "crm-whatsapp",
    nome: "CRM + WhatsApp",
    headline: "WhatsApp que vira CRM, não caos",
    subheadline: "Governança no canal mais crítico",
    icon: "MessageCircle",
    cor: "#25D366",
    corLight: "rgba(37, 211, 102, 0.1)",
    metricaDestaque: {
      valor: "-78%",
      label: "tempo de resposta",
    },
    problemas: [
      {
        titulo: "WhatsApp pessoal do vendedor",
        descricao: "Histórico some quando funcionário sai",
        icon: "UserX",
      },
      {
        titulo: "Sem fila de atendimento",
        descricao: "Mensagens acumulam, ninguém sabe quem atende",
        icon: "Users",
      },
      {
        titulo: "Múltiplos números",
        descricao: "Cada vendedor com seu chip, sem padronização",
        icon: "Smartphone",
      },
      {
        titulo: "Sem métricas",
        descricao: "Não sabe tempo de resposta nem volume",
        icon: "BarChart3",
      },
    ],
    solucoes: [
      {
        titulo: "WhatsApp Business API",
        descricao: "Número único da empresa, múltiplos atendentes",
        icon: "MessageSquare",
      },
      {
        titulo: "Fila inteligente",
        descricao: "Distribui conversas por disponibilidade ou regra",
        icon: "GitBranch",
      },
      {
        titulo: "Histórico centralizado",
        descricao: "Todas as conversas no CRM, vinculadas ao cliente",
        icon: "Database",
      },
      {
        titulo: "Templates aprovados",
        descricao: "Mensagens padronizadas e em compliance",
        icon: "FileCheck",
      },
    ],
    diferenciais: [
      {
        titulo: "API oficial Meta",
        descricao: "WhatsZopu usa API oficial, sem risco de bloqueio",
        icon: "Shield",
      },
      {
        titulo: "Governança completa",
        descricao: "SLAs, responsáveis e escalation definidos",
        icon: "ClipboardCheck",
      },
      {
        titulo: "Automações de IA",
        descricao: "Respostas automáticas e qualificação via CoPilot",
        icon: "Bot",
      },
      {
        titulo: "Setup Zopu",
        descricao: "Configuração completa incluindo templates",
        icon: "Settings",
      },
    ],
    cases: [
      {
        empresa: "Varejo multicanal",
        metrica: "-78% tempo de resposta",
        quote: "De 4 horas para 12 minutos de tempo médio de resposta.",
      },
    ],
    faq: [
      {
        pergunta: "Posso usar meu número atual?",
        resposta:
          "Depende. Números pessoais precisam migrar para Business API. Números Business podem ser mantidos.",
      },
      {
        pergunta: "O que é WhatsZopu?",
        resposta:
          "É nossa solução de WhatsApp integrada ao Bitrix24 usando a API oficial da Meta. Estabilidade e governança garantidas.",
      },
      {
        pergunta: "Quantos atendentes podem usar?",
        resposta: "Ilimitado. Um número, múltiplos atendentes simultâneos.",
      },
      {
        pergunta: "E se a Meta mudar regras?",
        resposta:
          "Por usar API oficial, você está sempre em compliance. Atualizações são transparentes.",
      },
    ],
  },

  integracoes: {
    id: "integracoes",
    slug: "integracoes",
    nome: "Integrações",
    headline: "Bitrix24 conversa com tudo",
    subheadline: "ERPs, marketing, e-commerce conectados",
    icon: "Plug",
    cor: "#6366F1",
    corLight: "rgba(99, 102, 241, 0.1)",
    metricaDestaque: {
      valor: "100+",
      label: "integrações entregues",
    },
    problemas: [
      {
        titulo: "Sistemas em silos",
        descricao: "ERP não fala com CRM, marketing não fala com vendas",
        icon: "Unplug",
      },
      {
        titulo: "Retrabalho de dados",
        descricao: "Mesma informação digitada em 3 sistemas",
        icon: "Copy",
      },
      {
        titulo: "Relatórios inconsistentes",
        descricao: "Cada sistema mostra um número diferente",
        icon: "FileWarning",
      },
      {
        titulo: "Dependência de TI",
        descricao: "Qualquer mudança precisa de desenvolvedor",
        icon: "Code",
      },
    ],
    solucoes: [
      {
        titulo: "Conectores prontos",
        descricao: "200+ integrações nativas no Bitrix24",
        icon: "Plug",
      },
      {
        titulo: "Integrações customizadas",
        descricao: "Desenvolvemos conectores para seu sistema",
        icon: "Code",
      },
      {
        titulo: "Sincronização bidirecional",
        descricao: "Dados fluem nos dois sentidos, sempre atualizados",
        icon: "RefreshCw",
      },
      {
        titulo: "Automações cross-sistema",
        descricao: "Eventos em um sistema disparam ações em outro",
        icon: "Workflow",
      },
    ],
    diferenciais: [
      {
        titulo: "Time técnico dedicado",
        descricao: "Desenvolvedores especializados em integrações",
        icon: "Users",
      },
      {
        titulo: "ERPs principais",
        descricao: "TOTVS, SAP, Omie, Sankhya já integrados",
        icon: "Database",
      },
      {
        titulo: "Marketing automation",
        descricao: "RD Station, ActiveCampaign, HubSpot",
        icon: "Mail",
      },
      {
        titulo: "E-commerce",
        descricao: "Shopify, WooCommerce, Nuvemshop",
        icon: "ShoppingCart",
      },
    ],
    cases: [
      {
        empresa: "E-commerce + ERP",
        metrica: "100% sincronizado",
        quote:
          "Pedidos do e-commerce vão direto pro ERP e CRM. Zero retrabalho.",
      },
    ],
    faq: [
      {
        pergunta: "Meu sistema integra?",
        resposta:
          "Provavelmente sim. Se tem API, integramos. Temos conectores prontos para os sistemas mais comuns.",
      },
      {
        pergunta: "Quanto custa uma integração?",
        resposta:
          "Depende da complexidade. Integrações simples estão inclusas no projeto. Complexas são orçadas separadamente.",
      },
      {
        pergunta: "E sistemas legados?",
        resposta:
          "Também. Desenvolvemos middleware para sistemas que não têm API moderna.",
      },
      {
        pergunta: "Quem mantém a integração?",
        resposta:
          "Incluímos suporte e manutenção. Se a API do seu sistema mudar, ajustamos.",
      },
    ],
  },
};

// Cards para o hub de soluções
export const SOLUCOES_HUB = {
  verticais: [
    { id: "industrias", label: "Indústrias", icon: "Factory", cor: "#F59E0B" },
    { id: "saude", label: "Saúde", icon: "Heart", cor: "#EC4899" },
    { id: "sst", label: "SST", icon: "ShieldCheck", cor: "#10B981" },
    { id: "turismo", label: "Turismo", icon: "Plane", cor: "#06B6D4" },
    { id: "servicos", label: "Serviços", icon: "Briefcase", cor: "#8B5CF6" },
    { id: "tecnologia", label: "Tecnologia", icon: "Code", cor: "#3B82F6" },
  ],
  capabilities: [
    { id: "telefonia", label: "Telefonia", icon: "Phone", cor: "#10B981" },
    {
      id: "crm-whatsapp",
      label: "CRM + WhatsApp",
      icon: "MessageCircle",
      cor: "#25D366",
    },
    { id: "integracoes", label: "Integrações", icon: "Plug", cor: "#6366F1" },
  ],
} as const;

// ============================================
// PÁGINA: METODOLOGIA (Metodologia Fluidsales™ Site)
// Conteúdo completo baseado no documento de especificação
// ============================================

// Hero Headlines com variações
export const GROWTH_ARCHITECTURE_HERO = {
  // Posicionamento: Estatística âncora + AI-Ready (não AI-Powered)
  // Dados validados: Gartner/Forrester mostram ~70% de falha em CRM
  badge: "Metodologia Fluidsales™",
  headline: {
    parte1: "70% dos CRMs falham.",
    parte2: "O seu não precisa ser um deles.",
  },
  subheadline:
    "A metodologia que 450+ empresas usam para transformar Bitrix24 em motor de receita — com os fundamentos que fazem AI funcionar de verdade.",
  // Prova social removida - demonstrar autoridade através da metodologia, não de números
  provaSocialBadges: [],
  // CTAs
  ctaPrimario: {
    texto: "Entender os 6 pilares",
    destino: "#pilares",
    tipo: "scroll",
  },
  ctaSecundario: {
    texto: "Agendar diagnóstico",
    destino: "whatsapp",
    tipo: "link",
  },
  // Legado (mantido para compatibilidade)
  provaSocial: {
    numero: "450+",
    texto: "empresas já migraram para CRM com IA",
    destaque: "96% renovam",
    contexto: "porque funciona de verdade",
  },
  badges: [
    { texto: "Gold Partner Bitrix24", icon: "Trophy" },
    { texto: "96% de retenção anual", icon: "TrendingUp" },
    { texto: "450+ clientes ativos", icon: "Users" },
    { texto: "9.500+ certificados Fluidz", icon: "GraduationCap" },
  ],
} as const;

// Cards de Dor - O Problema (dados validados Gartner/Forrester/Validity/Cognism)
export const GROWTH_ARCHITECTURE_DOR = {
  titulo:
    "Se seu CRM virou um depósito de dados desatualizados e desorganizados, você não está sozinho",
  intro:
    "Pesquisas da Gartner e Forrester mostram que a maioria das falhas não é por tecnologia — é por planejamento inadequado, dados ruins e falta de adoção.",
  consequencias: [
    "Time que não usa",
    "Dados que ninguém confia",
    "Decisões baseadas em achismo",
    "Investimento que vira custo",
  ],
  cards: [
    {
      id: "adocao",
      titulo: "70% dos CRMs falham",
      descricao:
        "Causa #1: Adoção. O time não usa porque a ferramenta não reflete o processo real de trabalho.",
      icon: "FileSpreadsheet",
      fonte: "Gartner/Forrester",
    },
    {
      id: "dados",
      titulo: "<80% dos dados são confiáveis",
      descricao:
        "Resultado: Decisões baseadas em achismo. AI treinada em dados ruins entrega resultados ruins.",
      icon: "Calculator",
      fonte: "Validity Report",
    },
    {
      id: "ciclo",
      titulo: "75% dos ciclos de venda aumentaram",
      descricao:
        "Causa: Falta de processo. Deals que travam no pipeline porque ninguém sabe qual é o próximo passo.",
      icon: "UserMinus",
      fonte: "Cognism 2024",
    },
    {
      id: "silos",
      titulo: "50%+ das empresas B2B vão reorganizar",
      descricao:
        "Problema: Times em silos não vendem. Marketing, vendas e CS precisam de visão unificada.",
      icon: "Robot",
      fonte: "Forrester 2025",
    },
  ],
  estatistica: {
    numero: "60%",
    texto: "das empresas lutam com integração de dados para AI.",
    solucao: "A metodologia Fluidsales™ resolve os pré-requisitos.",
    fonte: "Forrester",
  },
  bridge:
    "Depois de 15 anos vendo esses padrões, criamos uma metodologia diferente.",
} as const;

// 6 Pilares com versão completa para cliente (+ conexaoAI para posicionamento AI-Ready)
export const GROWTH_ARCHITECTURE_PILARES_CLIENTE = [
  {
    id: "journey",
    numero: "01",
    nome: "Jornada do Cliente Mapeada",
    headline: "Antes de configurar, entendemos como seu cliente compra",
    descricao:
      "Não como você acha que ele compra — como ele realmente passa pelo seu negócio.",
    voceRecebe: "Mapa visual da jornada com pontos de contato e oportunidades.",
    conexaoAI: "AI precisa entender seu funil para prever próximos passos.",
    icon: "Map",
    cor: "#635BFF",
  },
  {
    id: "processos",
    numero: "02",
    nome: "Processos Documentados",
    headline: 'Vendas não pode ser "cada um do seu jeito"',
    descricao:
      "Documentamos fluxos, etapas, critérios de passagem e responsáveis.",
    voceRecebe: "Processo de vendas claro, com SLAs e regras de handoff.",
    conexaoAI: "Automação só funciona com regras claras e bem definidas.",
    icon: "GitBranch",
    cor: "#10B981",
  },
  {
    id: "dados",
    numero: "03",
    nome: "Dados Organizados",
    headline: "CRM com dado sujo é pior que planilha",
    descricao: "Limpamos, padronizamos e criamos regras para manter assim.",
    voceRecebe:
      "Base higienizada, sem duplicidade, com validações automáticas.",
    conexaoAI: "Garbage in, garbage out — mesmo com a melhor AI.",
    icon: "Database",
    cor: "#F59E0B",
  },
  {
    id: "icp",
    numero: "04",
    nome: "Cliente Ideal Definido",
    headline:
      "Se você não sabe quem é seu cliente ideal, sua IA não vai saber qualificar",
    descricao: "Definimos critérios objetivos de qualificação.",
    voceRecebe: "ICP documentado e critérios de qualificação configurados.",
    conexaoAI: "Scoring preciso precisa de critérios objetivos definidos.",
    icon: "Target",
    cor: "#EC4899",
  },
  {
    id: "adocao",
    numero: "05",
    nome: "Adoção Planejada",
    headline: "Treinamento de 2 horas não funciona",
    descricao: "Criamos trilhas por função e rituais de acompanhamento.",
    voceRecebe:
      "Time treinado com Fluidz, certificado por função, com suporte de 30 dias.",
    conexaoAI: "AI aprende com uso real, não com campos vazios.",
    icon: "Users",
    cor: "#8B5CF6",
  },
  {
    id: "metricas",
    numero: "06",
    nome: "Métricas de Sucesso",
    headline:
      'Se você não sabe o que é "funcionar", como vai saber se funcionou?',
    descricao: "Definimos KPIs antes de começar.",
    voceRecebe: "Dashboard com suas métricas, baseline e meta.",
    conexaoAI: "Você mede para AI otimizar. Sem métricas, AI vira achismo.",
    icon: "BarChart3",
    cor: "#06B6D4",
  },
] as const;

// 4 Fases do Processo
export const GROWTH_ARCHITECTURE_FASES = [
  {
    fase: 1,
    nome: "Entender",
    duracao: "1-2 semanas",
    descricao:
      "Mapeamos sua operação atual. Processo, dados, dores, oportunidades. Sem achismo — com seu time na sala.",
    voceParticipa: "Workshop de discovery",
    entregas: [
      "Diagnóstico da operação atual",
      "Mapa de dores e oportunidades",
      "Gap analysis detalhado",
    ],
    icon: "MagnifyingGlass",
    cor: "#635BFF",
  },
  {
    fase: 2,
    nome: "Desenhar",
    duracao: "1-2 semanas",
    descricao:
      "Criamos a arquitetura da sua operação no Bitrix24. Pipelines, campos, automações, dashboards. Tudo documentado antes de configurar.",
    voceRecebe: "Documentação técnica aprovada",
    entregas: [
      "Arquitetura de pipelines",
      "Modelo de dados",
      "Mapa de automações",
      "Especificação de integrações",
    ],
    icon: "PencilSimple",
    cor: "#F59E0B",
  },
  {
    fase: 3,
    nome: "Entregar",
    duracao: "2-4 semanas",
    descricao:
      "Configuramos, migramos, integramos. Testamos com seu time. Ajustamos até funcionar.",
    voceRecebe: "Bitrix24 funcionando + time treinado",
    entregas: [
      "Bitrix24 configurado",
      "Dados migrados",
      "Integrações ativas",
      "Treinamento hands-on",
    ],
    icon: "Rocket",
    cor: "#10B981",
  },
  {
    fase: 4,
    nome: "Operar",
    duracao: "30 dias pós-go-live",
    descricao:
      "Acompanhamos os primeiros 30 dias. Ajustamos o que precisar. Garantimos que virou rotina.",
    voceRecebe: "Suporte proativo + ajustes inclusos",
    entregas: [
      "Acompanhamento diário/semanal",
      "Ajustes de processo",
      "Otimização de automações",
      "Métricas de adoção",
    ],
    icon: "ChartLineUp",
    cor: "#EC4899",
  },
] as const;

// Produtos com detalhes completos
export const GROWTH_ARCHITECTURE_PRODUTOS = [
  {
    id: "crm-express",
    nome: "CRM Express",
    tagline: "Go-live em 30 dias. Resultado desde o primeiro mês.",
    timeline: "30 dias",
    investimento: "Sob consulta",
    parcelamento: "Fale com um especialista",
    paraQuem: [
      "Times de 2-15 vendedores",
      "Vendas por WhatsApp",
      "Primeira implementação de CRM (ou recomeço)",
      "Precisa de resultado rápido",
    ],
    resolve: [
      "Time vendendo sem processo",
      "Leads perdidos no WhatsApp",
      "Falta de visibilidade do funil",
      'Gestor "no escuro"',
    ],
    voceRecebe: [
      "Bitrix24 configurado e funcionando",
      "Pipeline de pré-vendas e vendas",
      "WhatsApp integrado (histórico no CRM)",
      "3 automações de follow-up",
      "Dashboard do gestor",
      "Time treinado (Fluidz)",
      "30 dias de acompanhamento",
    ],
    cta: "Quero CRM Express",
    href: "/crm-express",
    destaque: false,
    icon: "Zap",
  },
  {
    id: "revops-launch",
    nome: "RevOps Launch",
    tagline: "Marketing, Vendas e CS em uma única operação de receita.",
    timeline: "60 dias",
    investimento: "Sob consulta",
    parcelamento: "Fale com um especialista",
    paraQuem: [
      "Empresas com Marketing + Vendas + CS",
      "Precisa de previsibilidade",
      "Quer um número só (não três)",
      "Tem maturidade para processo completo",
    ],
    resolve: [
      "Silos entre Marketing, Vendas e CS",
      "Forecast que não fecha",
      "Leads que somem no handoff",
      "Clientes que churnam sem aviso",
    ],
    voceRecebe: [
      "Tudo do CRM Express",
      "Pipeline de pós-vendas/CS",
      "Mapa de Performance de Receita™ (V1-V13)",
      "Health Score de clientes",
      "Playbooks de retenção e indicação",
      "Dashboards avançados (BI)",
      "Integração com origem de leads",
      "60 dias de acompanhamento",
    ],
    cta: "Quero RevOps Launch",
    href: "/revopslaunch",
    destaque: true,
    recomendado: true,
    icon: "Layers",
  },
  {
    id: "enterprise",
    nome: "Enterprise",
    tagline: "Para quem precisa de governança, multi-unidade e escala.",
    timeline: "Custom (90-180 dias)",
    investimento: "Sob consulta",
    parcelamento: "Condições personalizadas",
    paraQuem: [
      "Empresas com múltiplas BUs ou países",
      "Integrações complexas (ERP, sistemas legados)",
      "Necessidade de compliance e auditoria",
      "Operação de grande escala (100+ usuários)",
    ],
    resolve: [
      "Cada BU com processo diferente",
      "Falta de governança e permissões",
      "Integrações críticas não funcionando",
      "Visão consolidada inexistente",
    ],
    voceRecebe: [
      "Tudo do RevOps Launch",
      "Governance framework",
      "Multi-BU rollout plan",
      "Integrações enterprise",
      "QBR (Quarterly Business Review)",
      "Squad dedicado",
      "Acompanhamento contínuo",
    ],
    cta: "Falar com especialista",
    href: "/bitrix24-enterprise",
    destaque: false,
    icon: "Building",
  },
] as const;

// Timeline por produto
export const GROWTH_ARCHITECTURE_TIMELINE = [
  {
    produto: "CRM Express",
    total: "30 dias",
    entender: "1 sem",
    desenhar: "1 sem",
    entregar: "2 sem",
    operar: "30 dias",
  },
  {
    produto: "RevOps Launch",
    total: "60 dias",
    entender: "2 sem",
    desenhar: "2 sem",
    entregar: "4 sem",
    operar: "60 dias",
  },
  {
    produto: "Enterprise",
    total: "Custom",
    entender: "4+ sem",
    desenhar: "4+ sem",
    entregar: "8+ sem",
    operar: "Contínuo",
  },
] as const;

// Comparativo tabela
export const GROWTH_ARCHITECTURE_COMPARATIVO_TABELA = {
  headers: ["", "CRM Express", "RevOps Launch", "Enterprise"],
  rows: [
    {
      feature: "Timeline",
      express: "30 dias",
      revops: "60 dias",
      enterprise: "Custom",
    },
    {
      feature: "Pipelines",
      express: "Pré-vendas + Vendas",
      revops: "+ Pós-vendas/CS",
      enterprise: "+ Multi-BU",
    },
    {
      feature: "WhatsApp",
      express: "Integrado",
      revops: "Integrado",
      enterprise: "Integrado",
    },
    {
      feature: "Automações",
      express: "3 básicas",
      revops: "Avançadas",
      enterprise: "Custom",
    },
    {
      feature: "Dashboard",
      express: "Vendas",
      revops: "+ BI",
      enterprise: "+ Consolidado",
    },
    {
      feature: "Health Score",
      express: "—",
      revops: "Incluso",
      enterprise: "Incluso",
    },
    {
      feature: "RPM (V1-V13)",
      express: "—",
      revops: "Incluso",
      enterprise: "Incluso",
    },
    { feature: "Governance", express: "—", revops: "—", enterprise: "Incluso" },
    {
      feature: "Acompanhamento",
      express: "30 dias",
      revops: "60 dias",
      enterprise: "Contínuo",
    },
    {
      feature: "Investimento",
      express: "Sob consulta",
      revops: "Sob consulta",
      enterprise: "Sob consulta",
    },
  ],
} as const;

// Mapa de Performance de Receita
export const GROWTH_ARCHITECTURE_RPM = {
  titulo: "Mapa de Performance de Receita™",
  subtitulo:
    "Um modelo visual que conecta todo o caminho do lead ao cliente que renova e indica.",
  descricao: "Funil + Retenção + Expansão em uma única visão.",
  porQueImporta:
    "A maioria das empresas mede funil (até a venda) e para por aí. Mas 70-80% da receita de uma empresa saudável vem da base existente.",
  componentes: [
    {
      nome: "Funil",
      descricao: "Como leads viram clientes",
      metricas: "V1-V6",
    },
    {
      nome: "Retenção",
      descricao: "Como clientes continuam",
      metricas: "V7-V10",
    },
    {
      nome: "Expansão",
      descricao: "Como clientes crescem",
      metricas: "V11-V13",
    },
  ],
  funil: {
    etapas: ["Sessões", "Leads", "MQLs", "SQLs", "Opps", "Fechados"],
    exemplo: ["1.000", "200", "60", "40", "25", "10"],
  },
  flywheel: {
    formula:
      "Receita Inicial + Nova + Expansão - Downgrades - Churn = Receita Final",
    exemplo: "R$ 100k + R$ 20k + R$ 15k - R$ 5k - R$ 8k = R$ 122k",
    nrr: "122%",
    nrrLabel: "crescimento endógeno",
  },
} as const;

// Diferenciais comparativos
export const GROWTH_ARCHITECTURE_DIFERENCIAIS = {
  vsConfiguracaoPadrao: [
    { padrao: "Começa pela ferramenta", zopu: "Começa pelo processo" },
    {
      padrao: "Copia campos do CRM antigo",
      zopu: "Desenha modelo de dados correto",
    },
    { padrao: "Treinamento único de 2h", zopu: "Adoção por função com Fluidz" },
    { padrao: "Projeto com data de fim", zopu: "Acompanhamento evolutivo" },
    { padrao: "Mede: features entregues", zopu: "Mede: uso real + resultado" },
    { padrao: '"Promessa" de IA', zopu: "IA calibrada no seu contexto" },
  ],
  vsOutrosParceiros: [
    { outros: "Vendem licença primeiro", zopu: "Entendem processo primeiro" },
    { outros: "Go-live = sucesso", zopu: "Go-live = começo" },
    { outros: "Suporte reativo", zopu: "Acompanhamento proativo" },
    { outros: "Treinamento genérico", zopu: "Fluidz por função" },
    { outros: "60% retenção média", zopu: "96% retenção anual" },
  ],
  iaCalibrada: {
    outros: '"IA que revoluciona suas vendas!" (e não configuram nada)',
    zopu: [
      "Dados limpos → Scoring preciso",
      "Processo definido → Automação que faz sentido",
      "Time que usa → IA que aprende",
    ],
  },
} as const;

// Prova Social
export const GROWTH_ARCHITECTURE_PROVA_SOCIAL = {
  numeros: [
    { valor: "450+", label: "clientes ativos" },
    { valor: "96%", label: "retenção anual" },
    { valor: "9.500+", label: "certificados Fluidz" },
    { valor: "700+", label: "projetos entregues" },
    { valor: "18", label: "países" },
  ],
  cases: [
    {
      empresa: "Ferro em Brasa",
      setor: "E-commerce",
      problema:
        "Vendas espalhadas em WhatsApp, Instagram, site. Ninguém sabia o funil real.",
      solucao: "CRM Express com WhatsApp integrado e processo unificado.",
      resultado: "+20%",
      metrica: "conversão",
      periodo: "em 60 dias",
      depoimento:
        "Antes, cada vendedor tinha seu WhatsApp. Hoje, tudo está no CRM. Sabemos exatamente onde estamos perdendo e onde estamos ganhando.",
      autor: "João",
      cargo: "Proprietário",
      destaque: true,
    },
    {
      empresa: "Grupo Conexão",
      setor: "Serviços B2B",
      problema:
        "Time de 12 vendedores sem processo. Cada um fazia do seu jeito.",
      solucao: "RevOps Launch com processo documentado e Fluidz.",
      resultado: "-35%",
      metrica: "ciclo de vendas",
      periodo: "em 90 dias",
      depoimento:
        "Finalmente temos visibilidade do funil. Os gestores conseguem agir antes do problema virar crise.",
      autor: "Marina",
      cargo: "Diretora Comercial",
      destaque: false,
    },
    {
      empresa: "TechFlow Sistemas",
      setor: "SaaS",
      problema:
        "Base de 50k leads sem scoring. Time perdia tempo com leads frios.",
      solucao: "ICP + Lead Scoring com CoPilot calibrado.",
      resultado: "+60%",
      metrica: "produtividade SDR",
      periodo: "em 45 dias",
      depoimento:
        "O scoring mudou tudo. Agora os SDRs focam só em quem tem fit. A conversão explodiu.",
      autor: "Rafael",
      cargo: "Head de Vendas",
      destaque: false,
    },
  ],
  caseDestaque: {
    empresa: "Ferro em Brasa",
    problema:
      "E-commerce com vendas espalhadas em WhatsApp, Instagram, site. Ninguém sabia o funil real.",
    solucao: "CRM Express com WhatsApp integrado e processo unificado.",
    resultado: "+20% de conversão",
    periodo: "nos primeiros 60 dias",
    depoimento:
      "Antes, cada vendedor tinha seu WhatsApp. Hoje, tudo está no CRM. Sabemos exatamente onde estamos perdendo e onde estamos ganhando.",
    autor: "João",
    cargo: "Proprietário, Ferro em Brasa",
  },
  reconhecimentos: [
    "Gold Partner Bitrix24 (certificação máxima)",
    "Partner Summit 2025 — Destaque em implementação",
    "NPS médio: >50",
  ],
} as const;

// FAQ da página Metodologia
export const GROWTH_ARCHITECTURE_FAQ = [
  {
    categoria: "processo",
    pergunta: "Quanto tempo leva para implementar?",
    resposta:
      "CRM Express: 30 dias. RevOps Launch: 60 dias. Enterprise: sob medida, mas tipicamente 90-180 dias.",
  },
  {
    categoria: "processo",
    pergunta: "Vocês migram meus dados do CRM antigo?",
    resposta:
      'Sim, com limpeza. Não "jogamos" dados — migramos com higienização inclusa.',
  },
  {
    categoria: "processo",
    pergunta: "E se meu time não usar?",
    resposta:
      "Por isso temos Fluidz. Treinamento por função, certificação obrigatória, e 30 dias de acompanhamento para garantir que virou rotina.",
  },
  {
    categoria: "investimento",
    pergunta: "Por que é mais caro que outros parceiros?",
    resposta:
      "Porque entregamos resultado, não configuração. 96% dos nossos clientes continuam conosco — a maioria dos parceiros tem 60% de churn.",
  },
  {
    categoria: "investimento",
    pergunta: "Posso parcelar?",
    resposta:
      "CRM Express: 3x sem juros. RevOps Launch e Enterprise: condições sob consulta.",
  },
  {
    categoria: "investimento",
    pergunta: "Tem custo mensal além da licença?",
    resposta:
      "Opcional. Oferecemos acompanhamento contínuo para quem quer evolução constante.",
  },
  {
    categoria: "bitrix24",
    pergunta: "Por que Bitrix24 e não HubSpot/Salesforce?",
    resposta:
      "Bitrix24 oferece 90% das funcionalidades por uma fração do custo. E com CoPilot nativo, a IA já está inclusa.",
  },
  {
    categoria: "bitrix24",
    pergunta: "Vocês só trabalham com Bitrix24?",
    resposta:
      "Sim. Somos especialistas, não generalistas. Por isso conhecemos cada detalhe da plataforma.",
  },
] as const;

// CTAs
export const GROWTH_ARCHITECTURE_CTAS = {
  principal: {
    headline: "Pronto para CRM que funciona?",
    subheadline:
      "Diagnóstico gratuito. Entendemos seu cenário antes de propor qualquer coisa.",
    botao: "Falar com especialista",
    href: "https://wa.me/554733079280?text=Olá,%20vim%20pelo%20site%20e%20gostaria%20de%20saber%20mais%20sobre%20a%20metodologia%20Growth%20Architecture.",
  },
  secundario: {
    headline: "Ainda pesquisando?",
    subheadline: "Baixe nosso comparativo: Zopu vs outros parceiros Bitrix24.",
    botao: "Baixar comparativo",
    href: "/recursos/biblioteca/metodologias",
  },
  formulario: {
    campos: [
      "Nome",
      "Email",
      "Telefone/WhatsApp",
      "Empresa",
      "Quantos vendedores?",
      "Já usa Bitrix24?",
    ],
    aposEnvio:
      "Recebemos! Um especialista vai entrar em contato em até 24 horas úteis.",
  },
} as const;
