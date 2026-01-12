// Dados para página de comparativo Bitrix24 vs Outras Ferramentas
// Última atualização: Dezembro 2025

// =======================
// PREÇOS BITRIX24 BRASIL
// =======================

export const BITRIX24_PRECOS = {
  standard: {
    mensal: 558,
    modalidade: 'Anual com 20% desconto',
    usuarios: 'Ilimitados',
    armazenamento: '100 GB',
    beneficios: [
      'Suporte ilimitado Zopu incluso',
      '13 meses pelo preço de 12 (30 dias grátis)',
      'Preço fixo em reais',
    ],
  },
  professional: {
    mensal: 1119,
    modalidade: 'Anual com 20% desconto',
    usuarios: 'Ilimitados',
    armazenamento: '1024 GB',
    beneficios: [
      'Suporte ilimitado Zopu incluso',
      '13 meses pelo preço de 12 (30 dias grátis)',
      'Preço fixo em reais',
    ],
  },
  enterprise: {
    mensal: 2238,
    modalidade: 'Anual com 20% desconto',
    usuarios: 'Ilimitados',
    armazenamento: '3 TB',
    beneficios: [
      'Suporte ilimitado Zopu incluso',
      '13 meses pelo preço de 12 (30 dias grátis)',
      'Preço fixo em reais',
    ],
  },
} as const

// =======================
// PREÇOS CONCORRENTES
// =======================

// Taxa de câmbio conservadora para cálculos
const USD_BRL = 6.0

export const PRECOS_CONCORRENTES = {
  hubspot: {
    nome: 'HubSpot Professional',
    baseUSD: 890, // 3 seats inclusos
    porUsuarioAdicionalUSD: 45,
    onboardingUSD: 3000,
    observacao: '3 usuários inclusos, adicional $45/user',
  },
  salesforce: {
    nome: 'Salesforce Professional',
    porUsuarioUSD: 100,
    addOnsNecessariosUSD: 50, // estimativa de add-ons típicos
    totalPorUsuarioUSD: 150,
    observacao: 'Add-ons necessários para equivalência',
  },
  pipedrive: {
    nome: 'Pipedrive Growth',
    porUsuarioUSD: 49, // plano anual
    addOnsNecessariosUSD: 20,
    totalPorUsuarioUSD: 69,
    observacao: 'Growth + integrações necessárias',
  },
  zoho: {
    nome: 'Zoho CRM Professional',
    porUsuarioUSD: 35, // mensal
    anualPorUsuarioUSD: 23,
    addOnsNecessariosUSD: 15,
    totalPorUsuarioUSD: 50,
    observacao: 'Professional + add-ons',
  },
  rdstation: {
    nome: 'RD Station CRM Pro',
    porUsuarioBRL: 85,
    minimoUsuarios: 4,
    onboardingBRL: 2599,
    observacao: 'Preço em reais, mínimo 4 usuários',
  },
} as const

// =======================
// TCO - TOTAL COST OF OWNERSHIP
// =======================

// Função helper para calcular TCO de cada CRM por cenário
function calcularTCO(usuarios: number) {
  // HubSpot
  const hubspotBase = PRECOS_CONCORRENTES.hubspot.baseUSD
  const hubspotAdicionais = Math.max(0, usuarios - 3) * PRECOS_CONCORRENTES.hubspot.porUsuarioAdicionalUSD
  const hubspotMensal = (hubspotBase + hubspotAdicionais) * USD_BRL
  const hubspotAnual = hubspotMensal * 12

  // Salesforce
  const salesforceMensal = usuarios * PRECOS_CONCORRENTES.salesforce.totalPorUsuarioUSD * USD_BRL
  const salesforceAnual = salesforceMensal * 12

  // Pipedrive
  const pipedriveMensal = usuarios * PRECOS_CONCORRENTES.pipedrive.totalPorUsuarioUSD * USD_BRL
  const pipedriveAnual = pipedriveMensal * 12

  // Zoho
  const zohoMensal = usuarios * PRECOS_CONCORRENTES.zoho.totalPorUsuarioUSD * USD_BRL
  const zohoAnual = zohoMensal * 12

  // RD Station
  const rdstationMensal = usuarios * PRECOS_CONCORRENTES.rdstation.porUsuarioBRL
  const rdstationAnual = rdstationMensal * 12

  // Bitrix24 Professional (recomendado para comparação)
  const bitrix24Mensal = BITRIX24_PRECOS.professional.mensal
  const bitrix24Anual = bitrix24Mensal * 12 // já inclui 13º mês grátis

  return {
    hubspot: { mensal: Math.round(hubspotMensal), anual: Math.round(hubspotAnual) },
    salesforce: { mensal: Math.round(salesforceMensal), anual: Math.round(salesforceAnual) },
    pipedrive: { mensal: Math.round(pipedriveMensal), anual: Math.round(pipedriveAnual) },
    zoho: { mensal: Math.round(zohoMensal), anual: Math.round(zohoAnual) },
    rdstation: { mensal: Math.round(rdstationMensal), anual: Math.round(rdstationAnual) },
    bitrix24: { mensal: bitrix24Mensal, anual: bitrix24Anual },
  }
}

export const TCO_SCENARIOS = {
  '10_usuarios': calcularTCO(10),
  '30_usuarios': calcularTCO(30),
  '50_usuarios': calcularTCO(50),
} as const

// Cálculo de economia anual vs cada concorrente
export function calcularEconomia(usuarios: number, concorrente: keyof typeof PRECOS_CONCORRENTES) {
  const cenario = usuarios === 10 ? TCO_SCENARIOS['10_usuarios'] :
                  usuarios === 30 ? TCO_SCENARIOS['30_usuarios'] :
                  TCO_SCENARIOS['50_usuarios']

  const economiaAnual = cenario[concorrente].anual - cenario.bitrix24.anual
  const economiaPercentual = ((economiaAnual / cenario[concorrente].anual) * 100).toFixed(0)

  return {
    valorAnual: economiaAnual,
    percentual: economiaPercentual,
  }
}

// =======================
// ESTATÍSTICAS FRAGMENTAÇÃO
// =======================

export const FRAGMENTACAO_STATS = [
  {
    id: 'apps-saas',
    stat: '275',
    label: 'Ferramentas SaaS por empresa',
    fonte: 'Zylo, 2025',
    icon: 'Stack' as const,
  },
  {
    id: 'tempo-perdido',
    stat: '2.4h/dia',
    label: 'Tempo perdido trocando entre apps',
    fonte: 'Asana Anatomy of Work, 2025',
    icon: 'Clock' as const,
  },
  {
    id: 'dados-duplicados',
    stat: '32%',
    label: 'Das informações existem em 2+ lugares',
    fonte: 'Gartner, 2025',
    icon: 'Copy' as const,
  },
  {
    id: 'licencas-desperdicadas',
    stat: '53%',
    label: 'Das licenças não são utilizadas',
    fonte: 'Zylo, 2025',
    icon: 'CurrencyCircleDollar' as const,
  },
  {
    id: 'custo-por-funcionario',
    stat: 'R$ 9.100',
    label: 'Custo SaaS por funcionário/ano',
    fonte: 'Vertice, 2025',
    icon: 'TrendUp' as const,
  },
  {
    id: 'renovacoes-ano',
    stat: '247',
    label: 'Renovações de SaaS por ano',
    fonte: 'Zylo, 2025',
    icon: 'ArrowsClockwise' as const,
  },
] as const

// =======================
// TABELA COMPARATIVA FEATURES
// =======================

export type FeatureStatus = '✓' | '✗' | 'Add-on' | 'Beta' | string

export interface ComparativoFeature {
  feature: string
  hubspot: FeatureStatus
  salesforce: FeatureStatus
  pipedrive: FeatureStatus
  zoho: FeatureStatus
  rdstation: FeatureStatus
  bitrix24: FeatureStatus
  observacao?: string
}

export const COMPARATIVO_FEATURES: ComparativoFeature[] = [
  {
    feature: 'CRM Completo',
    hubspot: '✓',
    salesforce: '✓',
    pipedrive: '✓',
    zoho: '✓',
    rdstation: '✓',
    bitrix24: '✓',
  },
  {
    feature: 'Integração CRM ↔ Projetos ↔ Chat',
    hubspot: '✗',
    salesforce: 'Add-on',
    pipedrive: '✗',
    zoho: '✗',
    rdstation: '✗',
    bitrix24: '✓',
    observacao: 'Dados fluem automaticamente entre CRM, Projetos e Chat. Sem Zapier.',
  },
  {
    feature: 'Gestão de Projetos',
    hubspot: '✗',
    salesforce: 'Add-on',
    pipedrive: '✗',
    zoho: 'Add-on',
    rdstation: '✗',
    bitrix24: '✓',
    observacao: 'Kanban, Gantt, Scrum integrados',
  },
  {
    feature: 'Chat & Vídeo Ilimitado',
    hubspot: 'Add-on',
    salesforce: 'Add-on',
    pipedrive: '✗',
    zoho: '✗',
    rdstation: '✗',
    bitrix24: '✓',
    observacao: 'Substitui Slack + Zoom',
  },
  {
    feature: 'IA Nativa (sem custo extra)',
    hubspot: 'Beta',
    salesforce: 'Add-on',
    pipedrive: '✗',
    zoho: 'Add-on',
    rdstation: '✗',
    bitrix24: '✓',
    observacao: 'CoPilot incluso em todos planos pagos',
  },
  {
    feature: 'Email Marketing',
    hubspot: '✓',
    salesforce: 'Add-on',
    pipedrive: '✗',
    zoho: '✓',
    rdstation: '✗',
    bitrix24: '✓',
  },
  {
    feature: 'Automação de Processos',
    hubspot: 'Add-on',
    salesforce: 'Add-on',
    pipedrive: 'Add-on',
    zoho: '✓',
    rdstation: '✗',
    bitrix24: '✓',
    observacao: 'Workflows + RPA',
  },
  {
    feature: 'WhatsApp Oficial (Meta)',
    hubspot: 'Add-on',
    salesforce: 'Add-on',
    pipedrive: 'Add-on',
    zoho: 'Add-on',
    rdstation: '✗',
    bitrix24: '✓',
    observacao: 'API oficial WhatsApp Business',
  },
  {
    feature: 'Telefonia VoIP',
    hubspot: 'Add-on',
    salesforce: 'Add-on',
    pipedrive: '✗',
    zoho: 'Add-on',
    rdstation: '✗',
    bitrix24: '✓',
  },
  {
    feature: 'RH & Gestão de Pessoas',
    hubspot: '✗',
    salesforce: '✗',
    pipedrive: '✗',
    zoho: '✗',
    rdstation: '✗',
    bitrix24: '✓',
    observacao: 'Férias, ponto, organograma',
  },
  {
    feature: 'Criador de Sites',
    hubspot: '✓',
    salesforce: '✗',
    pipedrive: '✗',
    zoho: '✗',
    rdstation: '✗',
    bitrix24: '✓',
  },
  {
    feature: 'Usuários Ilimitados',
    hubspot: '✗',
    salesforce: '✗',
    pipedrive: '✗',
    zoho: '✗',
    rdstation: '✗',
    bitrix24: '✓',
    observacao: 'Único com usuários ilimitados',
  },
  {
    feature: 'Preço Fixo em Reais',
    hubspot: '✗',
    salesforce: '✗',
    pipedrive: '✗',
    zoho: '✗',
    rdstation: '✓',
    bitrix24: '✓',
    observacao: 'Sem variação cambial',
  },
  {
    feature: 'Armazenamento (1TB+)',
    hubspot: 'Add-on',
    salesforce: 'Add-on',
    pipedrive: '✗',
    zoho: '✗',
    rdstation: '✗',
    bitrix24: '✓',
    observacao: '1TB no Professional',
  },
  {
    feature: 'Assinatura Eletrônica',
    hubspot: 'Add-on',
    salesforce: 'Add-on',
    pipedrive: 'Add-on',
    zoho: 'Add-on',
    rdstation: '✗',
    bitrix24: '✓',
  },
  {
    feature: 'Kanban + Gantt + Scrum',
    hubspot: '✗',
    salesforce: '✗',
    pipedrive: '✗',
    zoho: '✗',
    rdstation: '✗',
    bitrix24: '✓',
    observacao: 'Gestão completa de projetos',
  },
] as const

// =======================
// PLATAFORMA UNIFICADA
// =======================

export const PLATAFORMA_UNIFICADA_CATEGORIAS = [
  {
    id: 'crm-vendas',
    titulo: 'CRM & Vendas',
    substitui: ['Salesforce', 'Pipedrive', 'HubSpot CRM'],
    ferramentas: [
      'Pipeline visual',
      'Gestão de leads',
      'Cotações e propostas',
      'Relatórios de vendas',
      'WhatsApp Business',
      'Telefonia VoIP',
    ],
    icon: 'ChartLineUp' as const,
  },
  {
    id: 'projetos-tarefas',
    titulo: 'Projetos & Tarefas',
    substitui: ['Asana', 'Monday', 'Trello', 'ClickUp'],
    ferramentas: [
      'Kanban visual',
      'Gráfico de Gantt',
      'Scrum boards',
      'Dependências',
      'Time tracking',
      'Templates',
    ],
    icon: 'ListChecks' as const,
  },
  {
    id: 'comunicacao',
    titulo: 'Comunicação',
    substitui: ['Slack', 'Zoom', 'Google Meet', 'Microsoft Teams'],
    ferramentas: [
      'Chat ilimitado',
      'Videochamadas HD',
      'Feed de atividades',
      'Calendário',
      'Grupos e canais',
      'Compartilhamento',
    ],
    icon: 'ChatCenteredDots' as const,
  },
  {
    id: 'ia-copilot',
    titulo: 'IA CoPilot',
    substitui: ['ChatGPT Teams', 'Notion AI', 'Assistentes pagos'],
    ferramentas: [
      'IA em CRM',
      'IA em Projetos',
      'Resumos automáticos',
      'Transcrição de chamadas',
      'Análise de sentimento',
      'Sugestões de ações',
    ],
    icon: 'Robot' as const,
  },
  {
    id: 'marketing',
    titulo: 'Marketing',
    substitui: ['Mailchimp', 'ActiveCampaign', 'Landing page builders'],
    ferramentas: [
      'Email marketing',
      'Automação',
      'Formulários web',
      'Landing pages',
      'SEO básico',
      'A/B testing',
    ],
    icon: 'MegaphoneSimple' as const,
  },
  {
    id: 'rh-automacao',
    titulo: 'RH & Automação',
    substitui: ['BambooHR', 'Gusto', 'Zapier'],
    ferramentas: [
      'Perfis de funcionários',
      'Organograma',
      'Férias e ausências',
      'Workflows',
      'RPA',
      'Aprovações',
    ],
    icon: 'UsersThree' as const,
  },
  {
    id: 'sites-ecommerce',
    titulo: 'Sites & E-commerce',
    substitui: ['WordPress', 'Wix', 'Shopify básico'],
    ferramentas: [
      'Site builder',
      'Templates responsivos',
      'Loja online',
      'Carrinho/checkout',
      'Gestão de estoque',
      'Analytics',
    ],
    icon: 'StorefrontDuotone' as const,
  },
] as const

// =======================
// DIFERENCIAIS BITRIX24
// =======================

export const DIFERENCIAIS_BITRIX24 = [
  {
    id: 'dados-centralizados',
    icone: 'Database',
    titulo: 'Todos os Dados no Mesmo Lugar',
    descricao: 'CRM, Projetos, Chat, Tarefas e Documentos conectados. Vendedor vê tasks. Suporte vê histórico completo. Marketing sabe o que vendas está fazendo. Contexto 360º do cliente.',
  },
  {
    id: 'automacao-cross-funcional',
    icone: 'GitBranch',
    titulo: 'Automação Entre Departamentos',
    descricao: 'Workflows que cruzam CRM + Projetos + Chat. Cliente fecha negócio → projeto é criado automaticamente → time é notificado no chat. Só possível com plataforma unificada.',
  },
  {
    id: 'usuarios-ilimitados',
    icone: 'Users',
    titulo: 'Usuários Ilimitados',
    descricao: 'Salesforce cobra $150/usuário. Pipedrive cobra $49/usuário. Bitrix24? Usuários ilimitados. Escale sem medo. Adicione estagiários, parceiros, fornecedores sem custo extra.',
  },
  {
    id: 'ia-inclusa',
    icone: 'Robot',
    titulo: 'IA Inclusa (CoPilot)',
    descricao: 'Salesforce cobra Einstein à parte ($50+/user). HubSpot tem beta limitado. Bitrix24 CoPilot: incluso, sem token, sem upsell. Resumos, transcrições, análise de sentimento.',
  },
  {
    id: 'preco-fixo-reais',
    icone: 'CurrencyCircleDollar',
    titulo: 'Preço Fixo em Reais',
    descricao: 'Enquanto HubSpot, Salesforce e Pipedrive cobram em dólar (variação cambial), Bitrix24 tem preço fixo em reais. Orçamento previsível, sem sustos.',
  },
] as const

// =======================
// FAQ MIGRAÇÃO
// =======================

export const FAQ_MIGRACAO = [
  {
    pergunta: 'Como funciona a migração de HubSpot/Salesforce para Bitrix24?',
    resposta: 'Migração assistida pela Zopu em 3 fases: (1) Diagnóstico e mapeamento de dados, (2) Migração em ambiente de testes para validação, (3) Migração final com treinamento do time. Você não perde histórico de negociações, clientes ou comunicações. Média: 30-45 dias do diagnóstico ao go-live.',
  },
  {
    pergunta: 'Meu time realmente vai usar? Ou vai virar "mais uma ferramenta parada"?',
    resposta: '96% de retenção anual da Zopu prova que funciona. Como? (1) Metodologia Fluidz para adoção estruturada, (2) Treinamento hands-on (não só teoria), (3) SLA <5min de suporte quando trava, (4) Acompanhamento mensal proativo. Você não está sozinho após o go-live.',
  },
  {
    pergunta: 'Vou ter que substituir TUDO de uma vez ou posso ir aos poucos?',
    resposta: 'Aos poucos. Recomendamos começar com CRM + Projetos (núcleo da operação), validar adoção, depois expandir para Chat, Marketing, RH conforme maturidade. Bitrix24 integra com Slack, Asana, Google Workspace e 100+ ferramentas — você decide o ritmo da migração.',
  },
  {
    pergunta: 'Bitrix24 é difícil de usar por ter tantas ferramentas?',
    resposta: 'Não. Você ativa apenas o que precisa, quando precisa. Interface em português, tutoriais integrados, e metodologia Fluidz para adoção estruturada. 450+ clientes da Zopu começaram pelo básico (CRM + Projetos) e expandiram conforme necessidade.',
  },
  {
    pergunta: 'Como a Zopu garante que a implementação vai dar certo?',
    resposta: 'Começamos com diagnóstico gratuito que avalia fit real. Se identificarmos que Bitrix24 não é a melhor solução, somos transparentes — nosso sucesso depende do seu. Pós go-live: SLA <5min, calls mensais proativas, ajustes contínuos. 96% de retenção anual prova que funciona.',
  },
  {
    pergunta: 'O preço "fixo" realmente não varia?',
    resposta: 'Sim. Preço em reais, sem variação cambial, usuários ilimitados. Sem surpresas de add-ons ou cobranças por funcionalidades extras como IA ou telefonia.',
  },
  {
    pergunta: 'É seguro para dados sensíveis?',
    resposta: 'Sim. Certificações AICPA SOC 2 Type II, GDPR compliant, servidores locais no Brasil via AWS. Mais seguro que planilhas e e-mails, que é onde 60% das empresas ainda guardam dados de clientes.',
  },
  {
    pergunta: 'Quanto tempo leva a implementação completa?',
    resposta: 'Depende do escopo. Projetos típicos: 30 a 90 dias do diagnóstico ao go-live. Começamos com diagnóstico gratuito que mapeia necessidades e define cronograma realista. Não vendemos projetos que não vão dar certo.',
  },
  {
    pergunta: 'Preciso de consultoria cara ou consigo implementar sozinho?',
    resposta: 'Depende da complexidade. Empresas até 20 usuários podem começar com Fluidz (treinamento autoguiado) e suporte da Zopu. Empresas maiores ou com operações complexas se beneficiam de consultoria para migração de dados, automações customizadas e integração com ERPs. Diagnóstico gratuito indica o caminho mais seguro.',
  },
  {
    pergunta: 'Bitrix24 tem limitações? O que ele NÃO faz bem?',
    resposta: 'Sim. (1) Curva de aprendizado inicial se você ativar muitas features de uma vez — por isso recomendamos adoção gradual. (2) Relatórios avançados exigem configuração — não é plug-and-play como ferramentas específicas. (3) Interface pode parecer "carregada" — mas você esconde o que não usa. Somos transparentes: Bitrix24 é poderoso, mas exige acompanhamento para adoção real.',
  },
] as const

// =======================
// FONTES E REFERÊNCIAS
// =======================

export const FONTES_DADOS = {
  hubspot: 'https://www.emailtooltester.com/en/crm/hubspot-review/pricing/',
  salesforce: 'https://zeeg.me/en/blog/post/salesforce-pricing',
  pipedrive: 'https://www.g2.com/products/pipedrive/pricing',
  zoho: 'https://www.zoho.com/crm/zohocrm-pricing.html',
  rdstation: 'https://www.rdstation.com/planos/crm/',
  fragmentacaoZylo: 'https://zylo.com/blog/saas-statistics/',
  fragmentacaoVertice: 'https://www.vertice.one/l/saas-inflation-index-report',
  dataAtualizacao: 'Dezembro 2025',
} as const
