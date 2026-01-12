export type BusinessModelId = 'servicos' | 'recorrencia' | 'uso'

export interface StageConnections {
  upstream?: string
  downstream?: string
}

export interface FunnelStage {
  id: string
  label: string
  shortLabel: string
  metricId: string
  definition: string
  bitrixObject: string
  leakage: string
  activation: string
  insight: string
  nextStep: string
  examples: string[]
  connections?: StageConnections
}

export interface ConversionMetric {
  id: string
  label: string
  formula: string
}

export interface FlywheelMetric {
  id: string
  label: string
  metricId: string
  definition: string
  bitrixObject: string
  leakage: string
  activation: string
  insight: string
  nextStep: string
  examples: string[]
  connections?: StageConnections
}

export interface MappingRow {
  id: string
  metric: string
  location: string
  notes: string
}

export const BUSINESS_MODELS = [
  { id: 'servicos', label: 'Serviços/Projetos' },
  { id: 'recorrencia', label: 'Recorrência' },
  { id: 'uso', label: 'Uso/Consumo' },
] as const

export type BusinessModel = (typeof BUSINESS_MODELS)[number]

export const BUSINESS_MODEL_DETAILS: Record<
  BusinessModelId,
  {
    description: string
    flywheelFocus: string
    examples: string[]
    icon: 'RefreshCw' | 'Briefcase' | 'Activity'
  }
> = {
  recorrencia: {
    description: 'Modelo SaaS/assinatura com receita recorrente mensal ou anual',
    flywheelFocus: 'NRR, expansão, churn, upgrades',
    examples: ['Software B2B', 'Plataformas SaaS', 'Serviços por assinatura'],
    icon: 'RefreshCw',
  },
  servicos: {
    description: 'Projetos e entregas pontuais com potencial de recontratação',
    flywheelFocus: 'Entrega, reconhecimento, recontratação',
    examples: ['Consultorias', 'Agências', 'Implementações'],
    icon: 'Briefcase',
  },
  uso: {
    description: 'Cobrança por consumo/volume com tiers de preço',
    flywheelFocus: 'Consumo, tiers, expansão de uso',
    examples: ['APIs', 'Cloud services', 'Plataformas de crédito'],
    icon: 'Activity',
  },
}

export const FUNNEL_STAGES: FunnelStage[] = [
  {
    id: 'v1',
    label: 'Sessões',
    shortLabel: 'Sessões',
    metricId: 'V1',
    definition: 'Visitas qualificadas em canais próprios ou pagos no período.',
    bitrixObject: 'Analytics + UTMs capturadas no Bitrix24',
    leakage: 'Tráfego sem intenção, UTMs inconsistentes, páginas sem foco.',
    activation: 'Padronizar UTMs, campanhas e páginas por ICP.',
    insight: 'Mostra o volume real de atenção gerada e a qualidade do topo.',
    nextStep: 'Ajustar origem, mensagem e landing pages por persona.',
    examples: ['utm_source', 'utm_campaign', 'page_path', 'lead_source'],
    connections: {
      downstream: 'V2 (qualidade do tráfego impacta leads)',
    },
  },
  {
    id: 'v2',
    label: 'Leads',
    shortLabel: 'Leads',
    metricId: 'V2',
    definition: 'Contatos que deixaram dados em formulários, chat ou WhatsApp.',
    bitrixObject: 'CRM Leads/Contacts',
    leakage: 'Duplicidade, perda de conversas, leads sem origem.',
    activation: 'Captura automática + dedupe + campos obrigatórios.',
    insight: 'Indica se o interesse virou dado acionável.',
    nextStep: 'Revisar formulários, botões e roteamento de canais.',
    examples: ['telefone', 'email', 'origem', 'campanha'],
    connections: {
      upstream: 'V1 (sessões geram leads)',
      downstream: 'V3 (qualidade do lead define MQL)',
    },
  },
  {
    id: 'v3',
    label: 'MQLs (Leads Qualificados)',
    shortLabel: 'MQLs',
    metricId: 'V3',
    definition: 'Leads que atingiram critérios mínimos de qualificação.',
    bitrixObject: 'Campo de score + regra de automação',
    leakage: 'Score frouxo ou rígido demais, critérios incoerentes.',
    activation: 'Definir critérios por ICP e calibrar score.',
    insight: 'Mostra a passagem de interesse para intenção real.',
    nextStep: 'Revisar critérios de qualificação com Marketing e Vendas.',
    examples: ['score', 'fit_icp', 'cargo', 'segmento'],
    connections: {
      upstream: 'V2 (qualidade dos leads)',
      downstream: 'V4 (fit para vendas)',
    },
  },
  {
    id: 'v4',
    label: 'SQLs (Leads Aceitos por Vendas)',
    shortLabel: 'SQLs',
    metricId: 'V4',
    definition: 'Leads aceitos por Vendas após checagem de critérios.',
    bitrixObject: 'Transição de estágio + campos de qualificação',
    leakage: 'Passagem sem critérios, aceite tardio, handoff sem SLA.',
    activation: 'Campos obrigatórios + SLA de aceite.',
    insight: 'Revela alinhamento entre Marketing e Vendas.',
    nextStep: 'Definir critérios de aceite e tempos máximos.',
    examples: ['criterios_sql', 'responsavel', 'data_aceite'],
    connections: {
      upstream: 'V3 (MQLs qualificados)',
      downstream: 'V5 (pipeline qualificado)',
    },
  },
  {
    id: 'v5',
    label: 'Oportunidades',
    shortLabel: 'Oportunidades',
    metricId: 'V5',
    definition: 'Negociações ativas com proposta em andamento.',
    bitrixObject: 'Deals (pipeline de vendas)',
    leakage: 'Pipeline sem etapas claras, propostas sem padrão.',
    activation: 'Arquitetar pipeline + playbook de proposta.',
    insight: 'Mostra capacidade real de transformar SQL em pipeline vivo.',
    nextStep: 'Rever critérios de entrada e próximos passos.',
    examples: ['stage', 'valor_estimado', 'probabilidade'],
    connections: {
      upstream: 'V4 (SQLs aceitos)',
      downstream: 'V6 (taxa de fechamento)',
    },
  },
  {
    id: 'v6',
    label: 'Fechados (Closed Won)',
    shortLabel: 'Fechados',
    metricId: 'V6',
    definition: 'Negócios ganhos com contrato ou aceite formal.',
    bitrixObject: 'Deal fechado + contrato/fatura',
    leakage: 'Perdas por follow-up, proposta lenta, falta de decisor.',
    activation: 'Templates, SLAs e automações de follow-up.',
    insight: 'Indica eficiência de conversão final e previsibilidade.',
    nextStep: 'Atacar gargalos de proposta, preço e timing.',
    examples: ['valor_fechado', 'data_fechamento', 'motivo_perda'],
    connections: {
      upstream: 'V5 (qualidade do pipeline)',
      downstream: 'Ativação (ativação do cliente)',
    },
  },
]

export const BRIDGE_STAGE = {
  id: 'onboarding',
  label: 'Ativação do Cliente',
  metricId: 'Bridge',
  definition: 'Início da ativação do cliente após o fechamento.',
  bitrixObject: 'Smart Process ou pipeline de Onboarding/Ativação',
  leakage: 'Handoff lento, tarefas críticas esquecidas.',
  activation: 'Automação de handoff + checklist de ativação.',
  insight: 'Mostra velocidade de ativação e risco de churn inicial.',
  nextStep: 'Definir SLAs e tarefas obrigatórias por perfil.',
  examples: ['data_kickoff', 'responsavel_cs', 'status_onboarding'],
  connections: {
    upstream: 'V6 (cliente recém fechado)',
    downstream: 'V7 (receita inicial ativa)',
  },
} as const

export const CONVERSION_METRICS: ConversionMetric[] = [
  { id: 'cr1', label: 'Leads / Sessões', formula: 'CR1 = V2 ÷ V1' },
  { id: 'cr2', label: 'MQL / Leads', formula: 'CR2 = V3 ÷ V2' },
  { id: 'cr3', label: 'SQL / MQL', formula: 'CR3 = V4 ÷ V3' },
  { id: 'cr4', label: 'Oportunidades / SQL', formula: 'CR4 = V5 ÷ V4' },
  { id: 'cr5', label: 'Fechados / Oportunidades', formula: 'CR5 = V6 ÷ V5' },
] as const

export const FLYWHEEL_MODELS: Record<BusinessModelId, FlywheelMetric[]> = {
  recorrencia: [
    {
      id: 'v7',
      label: 'Receita Inicial',
      metricId: 'V7',
      definition: 'Receita recorrente no início do período (inclui renovações).',
      bitrixObject: 'Contratos + recorrência em Deals',
      leakage: 'Base sem contrato ativo ou dados de renovação faltando.',
      activation: 'Padronizar contratos e vencimentos.',
      insight: 'Mostra a base real sobre a qual o NRR será calculado.',
      nextStep: 'Conferir contratos ativos e valores por cliente.',
      examples: ['valor_recorrente', 'data_renovacao', 'ciclo'],
      connections: {
        upstream: 'V13 período anterior + Ativação',
        downstream: 'Todas as métricas V8-V12',
      },
    },
    {
      id: 'v8',
      label: 'Receita Nova',
      metricId: 'V8',
      definition: 'Receita de novos logos no período.',
      bitrixObject: 'Deals novos + produtos/itens',
      leakage: 'Novos clientes sem classificação de origem.',
      activation: 'Separar novos logos de expansão.',
      insight: 'Indica crescimento por aquisição.',
      nextStep: 'Validar origem e canal de novos clientes.',
      examples: ['tipo_cliente', 'canal_aquisicao'],
      connections: {
        upstream: 'V6 (novos fechamentos)',
        downstream: 'V13 (receita final)',
      },
    },
    {
      id: 'v9',
      label: 'Cross-sell / Novos Produtos',
      metricId: 'V9',
      definition: 'Receita de produtos adicionais vendidos à base atual.',
      bitrixObject: 'Produtos/itens + histórico do cliente',
      leakage: 'Sem registro de produto anterior ou categoria.',
      activation: 'Catálogo padronizado e regras de cross-sell.',
      insight: 'Mostra capacidade de expandir carteira.',
      nextStep: 'Criar ofertas por segmento e timing.',
      examples: ['categoria_produto', 'linha', 'bundle'],
      connections: {
        upstream: 'V7 (base ativa)',
        downstream: 'V13 (receita final)',
      },
    },
    {
      id: 'v10',
      label: 'Upgrades / Expansão',
      metricId: 'V10',
      definition: 'Aumento de receita no mesmo produto/serviço.',
      bitrixObject: 'Contratos + alterações de valor',
      leakage: 'Upgrades não marcados como expansão.',
      activation: 'Campos de alteração e aprovação.',
      insight: 'Revela crescimento por aumento de ticket.',
      nextStep: 'Definir triggers e playbooks de expansão.',
      examples: ['novo_plano', 'tier', 'motivo_upgrade'],
      connections: {
        upstream: 'V7 (base ativa)',
        downstream: 'V13 (receita final)',
      },
    },
    {
      id: 'v11',
      label: 'Downgrades',
      metricId: 'V11',
      definition: 'Reduções de valor em clientes existentes.',
      bitrixObject: 'Contratos + histórico de mudanças',
      leakage: 'Redução registrada apenas como churn parcial.',
      activation: 'Definir downgrade vs churn.',
      insight: 'Mostra erosão silenciosa da base.',
      nextStep: 'Revisar motivos e antecipar risco.',
      examples: ['motivo_reducao', 'valor_reduzido'],
      connections: {
        upstream: 'V7 (clientes em risco)',
        downstream: 'V13 (impacto negativo)',
      },
    },
    {
      id: 'v12',
      label: 'Churn',
      metricId: 'V12',
      definition: 'Receita perdida por cancelamento completo.',
      bitrixObject: 'Pipeline de renovações + motivo de churn',
      leakage: 'Cancelamentos sem motivo e data.',
      activation: 'Checklist de churn + handoff para CS.',
      insight: 'Identifica perda direta de receita.',
      nextStep: 'Analisar churn por segmento e causa.',
      examples: ['motivo_churn', 'data_cancelamento'],
      connections: {
        upstream: 'V11 (downgrades podem virar churn)',
        downstream: 'V13 (impacto negativo direto)',
      },
    },
    {
      id: 'v13',
      label: 'Receita Final',
      metricId: 'V13',
      definition: 'Resultado do período após expansão e perdas.',
      bitrixObject: 'Dashboard financeiro consolidado',
      leakage: 'Dados desconectados entre CRM e financeiro.',
      activation: 'Integração com ERP/financeiro quando aplicável.',
      insight: 'Resume a saúde da receita recorrente.',
      nextStep: 'Comparar período vs meta e ajustar plano.',
      examples: ['receita_final', 'delta_periodo'],
      connections: {
        upstream: 'V7 + V8 + V9 + V10 - V11 - V12',
        downstream: 'V7 do próximo período (ciclo)',
      },
    },
  ],
  servicos: [
    {
      id: 'v7',
      label: 'Receita Contratada',
      metricId: 'V7',
      definition: 'Valor fechado em projetos no período.',
      bitrixObject: 'Deals fechados + contratos',
      leakage: 'Propostas sem aceite formal.',
      activation: 'Contratos e etapas obrigatórias.',
      insight: 'Mostra o volume de receita comprometida.',
      nextStep: 'Validar aceite e escopo firmado.',
      examples: ['escopo', 'valor_contratado'],
    },
    {
      id: 'v8',
      label: 'Receita Reconhecida',
      metricId: 'V8',
      definition: 'Receita entregue/realizada no período.',
      bitrixObject: 'Projetos + faturamento',
      leakage: 'Entrega sem registro de marcos.',
      activation: 'Marcos e status de entrega.',
      insight: 'Indica eficiência de execução.',
      nextStep: 'Rever marcos e prazos críticos.',
      examples: ['marco', 'status_entrega'],
    },
    {
      id: 'v9',
      label: 'Expansão de Escopo',
      metricId: 'V9',
      definition: 'Adicionais e change orders.',
      bitrixObject: 'Itens adicionais em projetos',
      leakage: 'Adicionais sem aprovação.',
      activation: 'Workflow de aprovação.',
      insight: 'Mostra capacidade de expandir projetos.',
      nextStep: 'Criar pacotes adicionais padronizados.',
      examples: ['adicional', 'aprovado_por'],
    },
    {
      id: 'v10',
      label: 'Recontratações',
      metricId: 'V10',
      definition: 'Novos projetos com clientes existentes.',
      bitrixObject: 'Deals recorrentes por cliente',
      leakage: 'Cliente recorrente sem etiqueta.',
      activation: 'Tags de recontratação.',
      insight: 'Sinaliza fidelização via novos projetos.',
      nextStep: 'Mapear padrões de recontratação.',
      examples: ['cliente_recorrente', 'origem_recontrato'],
    },
    {
      id: 'v11',
      label: 'Reduções',
      metricId: 'V11',
      definition: 'Descontos ou cortes de escopo.',
      bitrixObject: 'Histórico de revisão de contrato',
      leakage: 'Cortes sem motivo documentado.',
      activation: 'Motivo obrigatório de redução.',
      insight: 'Mostra erosão de margem.',
      nextStep: 'Revisar critérios de desconto.',
      examples: ['motivo_reducao', 'valor_reduzido'],
    },
    {
      id: 'v12',
      label: 'Cancelamentos',
      metricId: 'V12',
      definition: 'Projetos cancelados antes da entrega.',
      bitrixObject: 'Pipeline de projetos + motivo',
      leakage: 'Cancelamento sem processo de retenção.',
      activation: 'Playbook de recuperação.',
      insight: 'Mostra risco de churn em projetos.',
      nextStep: 'Investigar motivo por segmento.',
      examples: ['motivo_cancelamento', 'fase_cancelada'],
    },
    {
      id: 'v13',
      label: 'Receita Final',
      metricId: 'V13',
      definition: 'Receita total realizada no período.',
      bitrixObject: 'Painel financeiro consolidado',
      leakage: 'Diferença entre CRM e financeiro.',
      activation: 'Integração de faturamento.',
      insight: 'Resume a saúde do ciclo de projetos.',
      nextStep: 'Comparar receita entregue vs planejada.',
      examples: ['receita_realizada', 'delta_planejado'],
    },
  ],
  uso: [
    {
      id: 'v7',
      label: 'Base Ativa',
      metricId: 'V7',
      definition: 'Clientes com consumo ativo no período.',
      bitrixObject: 'Contratos + status de uso',
      leakage: 'Clientes ativos sem sinal de uso.',
      activation: 'Eventos de uso integrados.',
      insight: 'Mostra a base realmente ativa.',
      nextStep: 'Mapear contas com queda de uso.',
      examples: ['status_uso', 'data_ultimo_uso'],
    },
    {
      id: 'v8',
      label: 'Consumo Novo',
      metricId: 'V8',
      definition: 'Receita de novos clientes por uso.',
      bitrixObject: 'Deals novos + consumo inicial',
      leakage: 'Novos clientes sem rastreamento de uso.',
      activation: 'Integração de eventos de consumo.',
      insight: 'Indica crescimento por novos usuários.',
      nextStep: 'Revisar onboarding e ativação de uso.',
      examples: ['evento_consumo', 'volume_inicial'],
    },
    {
      id: 'v9',
      label: 'Expansão de Consumo',
      metricId: 'V9',
      definition: 'Aumento de uso por clientes existentes.',
      bitrixObject: 'Eventos de consumo + tiers',
      leakage: 'Uso cresce sem atualização de tier.',
      activation: 'Regras automáticas de tier.',
      insight: 'Mostra upsell via aumento de uso.',
      nextStep: 'Criar gatilhos de expansão.',
      examples: ['tier_atual', 'limite_consumo'],
    },
    {
      id: 'v10',
      label: 'Mudança de Tier',
      metricId: 'V10',
      definition: 'Migração entre faixas de consumo.',
      bitrixObject: 'Contratos + tiers',
      leakage: 'Tier atualizado manualmente e com atraso.',
      activation: 'Automatização de tier.',
      insight: 'Revela elasticidade de preço por uso.',
      nextStep: 'Definir regras de upgrade/downgrade.',
      examples: ['tier', 'data_mudanca'],
    },
    {
      id: 'v11',
      label: 'Redução de Uso',
      metricId: 'V11',
      definition: 'Queda significativa de consumo.',
      bitrixObject: 'Eventos de uso + alertas',
      leakage: 'Quedas sem alerta e sem playbook.',
      activation: 'Alertas automáticos de queda.',
      insight: 'Sinal precoce de churn.',
      nextStep: 'Ativar plano de risco por conta.',
      examples: ['alerta_queda', 'motivo_uso'],
    },
    {
      id: 'v12',
      label: 'Churn de Uso',
      metricId: 'V12',
      definition: 'Parada completa do consumo.',
      bitrixObject: 'Status de contrato + motivo',
      leakage: 'Cancelamento sem motivo e sem recuperação.',
      activation: 'Workflow de churn + motivos.',
      insight: 'Mostra perda direta por uso.',
      nextStep: 'Analisar churn por tier e segmento.',
      examples: ['motivo_churn', 'data_cancelamento'],
    },
    {
      id: 'v13',
      label: 'Receita Final',
      metricId: 'V13',
      definition: 'Receita total de consumo no período.',
      bitrixObject: 'Painel financeiro consolidado',
      leakage: 'Uso não conciliado com faturamento.',
      activation: 'Integração de consumo com ERP.',
      insight: 'Resume a saúde do modelo por uso.',
      nextStep: 'Comparar receita por uso vs metas.',
      examples: ['receita_consumo', 'delta_periodo'],
    },
  ],
}

export const SECONDARY_KPIS = [
  {
    label: 'Quem',
    items: ['SDR/Closer', 'equipe', 'canal'],
  },
  {
    label: 'O quê',
    items: ['produto/serviço', 'segmento'],
  },
  {
    label: 'Onde',
    items: ['região/unidade'],
  },
  {
    label: 'Quando',
    items: ['semana/mês/campanha'],
  },
] as const

export const BITRIX_MAPPING: MappingRow[] = [
  {
    id: 'v1',
    metric: 'V1 Sessões',
    location: 'Analytics (GA4) + UTMs → Bitrix24',
    notes: 'Captura de origem e campanha no lead.',
  },
  {
    id: 'v2',
    metric: 'V2 Leads',
    location: 'CRM Leads/Contacts',
    notes: 'Regra de criação e deduplicação.',
  },
  {
    id: 'v3',
    metric: 'V3 MQL',
    location: 'Campo custom + automação de score',
    notes: 'Critérios por ICP e comportamento.',
  },
  {
    id: 'v4',
    metric: 'V4 SQL',
    location: 'Stage + campos obrigatórios',
    notes: 'Qualificação validada por Vendas.',
  },
  {
    id: 'v5',
    metric: 'V5 Oportunidades',
    location: 'Deals pipeline (Bitrix24)',
    notes: 'Etapas com SLAs e próximas ações.',
  },
  {
    id: 'v6',
    metric: 'V6 Closed Won',
    location: 'Deal fechado + contrato/fatura',
    notes: 'Integração com financeiro quando aplicável.',
  },
  {
    id: 'bridge',
    metric: 'Ativação',
    location: 'Smart Process ou pipeline de Ativação',
    notes: 'Handoff com checklist e tarefas.',
  },
  {
    id: 'v7',
    metric: 'V7–V13 Receita',
    location: 'Deals + contratos + renovações + produtos',
    notes: 'Dashboards consolidados de receita e NRR.',
  },
] as const

export const NRR_FORMULA = 'NRR = (Receita Inicial + Expansão + Cross-sell - Downgrades - Churn) ÷ Receita Inicial'
