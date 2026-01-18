'use client'

import { useState, useId } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import {
  Check,
  X,
  ChevronDown,
  Users,
  HardDrive,
  Sparkles,
  Building2,
  Rocket,
  Shield,
  Zap,
  Target,
  TrendingUp,
  Settings,
  Lock,
  BarChart3,
  Workflow,
  Bot,
  Database,
  Globe,
  Clock,
  AlertTriangle,
  MessageSquare,
  ShoppingCart,
  UserCog,
  LayoutDashboard,
  type LucideIcon,
} from 'lucide-react'
import { Reveal, Badge, SectionHeader } from '@/components/shared'
import { ZOPU_LINKS } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { durations, easings } from '@/lib/motion'

// Types
type BillingCycle = 'monthly' | 'annual'

// 7 Pilares do Bitrix24
const PILARES_BITRIX24 = [
  { id: 'crm', nome: 'CRM & Vendas', icon: TrendingUp },
  { id: 'comunicacao', nome: 'Comunicação', icon: MessageSquare },
  { id: 'projetos', nome: 'Tarefas & Projetos', icon: LayoutDashboard },
  { id: 'sites', nome: 'Sites & E-commerce', icon: ShoppingCart },
  { id: 'rh', nome: 'RH & Pessoas', icon: UserCog },
  { id: 'automacao', nome: 'Automação', icon: Workflow },
  { id: 'bi', nome: 'BI & Relatórios', icon: BarChart3 },
] as const

type FeatureCategory = typeof PILARES_BITRIX24[number]['id']

// Tabela Comparativa Padronizada - cada linha mostra o valor por plano
interface ComparisonRow {
  feature: string
  categoria: FeatureCategory
  free: string | boolean
  standard: string | boolean
  professional: string | boolean
  enterprise: string | boolean
  destaque?: boolean // Marca como diferencial importante
}

const TABELA_COMPARATIVA: ComparisonRow[] = [
  // CRM & Vendas
  { feature: 'Pipeline de vendas', categoria: 'crm', free: 'Básico', standard: 'Múltiplos', professional: 'Múltiplos + Sales Intelligence', enterprise: 'Ilimitado', destaque: true },
  { feature: 'Limite de negócios', categoria: 'crm', free: '1.000', standard: '100.000', professional: '200.000', enterprise: 'Ilimitado' },
  { feature: 'Catálogo de produtos', categoria: 'crm', free: false, standard: '5.000', professional: '500.000', enterprise: 'Ilimitado' },
  { feature: 'Cotações e faturas', categoria: 'crm', free: false, standard: true, professional: true, enterprise: true },
  { feature: 'Campos obrigatórios por estágio', categoria: 'crm', free: false, standard: false, professional: true, enterprise: true },
  { feature: 'Multi-filiais com isolamento', categoria: 'crm', free: false, standard: false, professional: false, enterprise: true, destaque: true },

  // Comunicação
  { feature: 'Chat interno', categoria: 'comunicacao', free: true, standard: true, professional: true, enterprise: true },
  { feature: 'Videochamadas', categoria: 'comunicacao', free: '24 participantes', standard: '48 participantes', professional: '100 participantes', enterprise: '100 participantes' },
  { feature: 'Contact Center (WhatsApp, Instagram)', categoria: 'comunicacao', free: false, standard: true, professional: true, enterprise: true, destaque: true },
  { feature: 'Telefonia integrada', categoria: 'comunicacao', free: false, standard: 'IVR 2 níveis', professional: 'IVR ilimitado + transcrição', enterprise: 'IVR ilimitado + transcrição', destaque: true },
  { feature: 'E-mail sincronizado', categoria: 'comunicacao', free: false, standard: '100k/mês', professional: '250k/mês', enterprise: 'Ilimitado' },

  // Tarefas & Projetos
  { feature: 'Tarefas e projetos', categoria: 'projetos', free: 'Ilimitado', standard: 'Ilimitado', professional: 'Ilimitado', enterprise: 'Ilimitado' },
  { feature: 'Kanban e Gantt', categoria: 'projetos', free: true, standard: true, professional: true, enterprise: true },
  { feature: 'Dependências de tarefas', categoria: 'projetos', free: false, standard: true, professional: true, enterprise: true },
  { feature: 'Controle de tempo', categoria: 'projetos', free: false, standard: true, professional: true, enterprise: true },
  { feature: 'Workflows de projeto avançados', categoria: 'projetos', free: false, standard: false, professional: true, enterprise: true, destaque: true },
  { feature: 'Gestão de recursos e capacidade', categoria: 'projetos', free: false, standard: false, professional: true, enterprise: true },

  // Sites & E-commerce
  { feature: 'Sites e landing pages', categoria: 'sites', free: 'Básico', standard: 'Completo', professional: 'Avançado', enterprise: 'Enterprise' },
  { feature: 'E-commerce', categoria: 'sites', free: false, standard: '3.000 produtos', professional: 'Avançado', enterprise: 'Enterprise' },
  { feature: 'Assinatura eletrônica', categoria: 'sites', free: false, standard: true, professional: true, enterprise: true },

  // RH & Pessoas
  { feature: 'Estrutura organizacional', categoria: 'rh', free: 'Básico', standard: 'Básico', professional: 'Completo', enterprise: 'Completo + compliance' },
  { feature: 'Gestão de ausências', categoria: 'rh', free: false, standard: false, professional: true, enterprise: true },
  { feature: 'Gestão de tempo e turnos', categoria: 'rh', free: false, standard: false, professional: true, enterprise: true },

  // Automação
  { feature: 'Regras de automação CRM', categoria: 'automacao', free: '5 regras', standard: 'Ilimitado', professional: 'Ilimitado', enterprise: 'Ilimitado', destaque: true },
  { feature: 'Processos inteligentes', categoria: 'automacao', free: '150', standard: '1.000', professional: 'Ilimitado', enterprise: 'Ilimitado', destaque: true },
  { feature: 'RPA (automação robótica)', categoria: 'automacao', free: false, standard: false, professional: 'Ilimitado', enterprise: 'Ilimitado', destaque: true },
  { feature: 'Designer de processos visual', categoria: 'automacao', free: false, standard: false, professional: true, enterprise: true },
  { feature: 'Workflows entre departamentos', categoria: 'automacao', free: false, standard: false, professional: true, enterprise: true },

  // BI & Relatórios
  { feature: 'Relatórios', categoria: 'bi', free: 'Básicos', standard: 'Personalizados', professional: 'Tempo real + análise de funil', enterprise: 'Ilimitado', destaque: true },
  { feature: 'BI - linhas de dados', categoria: 'bi', free: false, standard: '100k', professional: '250k', enterprise: '10M', destaque: true },
  { feature: 'Dashboards personalizados', categoria: 'bi', free: false, standard: true, professional: true, enterprise: true },
  { feature: 'SSO/SAML', categoria: 'bi', free: false, standard: false, professional: true, enterprise: true },
  { feature: 'SLA contratual', categoria: 'bi', free: false, standard: false, professional: false, enterprise: '99.999%', destaque: true },
  { feature: 'Servidor dedicado', categoria: 'bi', free: false, standard: false, professional: false, enterprise: true, destaque: true },
  { feature: 'Backup', categoria: 'bi', free: '7 dias', standard: '7 dias', professional: '7 dias', enterprise: '30 dias' },
]

// Interface para features por plano (mantida para compatibilidade)
interface PlanFeature {
  texto: string
  categoria: FeatureCategory
  destaque?: boolean
}

// Pricing data - Janeiro 2026 - Estrutura rica com pilares
const PLANOS = [
  {
    id: 'free',
    nome: 'Free',
    para: 'Para testar e conhecer',
    subtitulo: 'Comece sem custo',
    icon: Zap,
    precoMensal: 0,
    precoAnual: 0,
    usuarios: 'Ilimitado',
    storage: '5 GB',
    destaque: false,
    color: 'gray',
    resumo: 'Todas as ferramentas essenciais para experimentar o Bitrix24. Ideal para validar se a plataforma atende suas necessidades.',
    features: [
      { texto: 'CRM básico com pipeline Kanban', categoria: 'crm' },
      { texto: 'Até 1.000 negócios', categoria: 'crm' },
      { texto: '5 regras de automação', categoria: 'automacao' },
      { texto: 'Chat interno ilimitado', categoria: 'comunicacao' },
      { texto: 'Videochamadas até 24 participantes', categoria: 'comunicacao' },
      { texto: 'Tarefas e projetos ilimitados', categoria: 'projetos' },
      { texto: 'Kanban e Gantt', categoria: 'projetos' },
      { texto: 'Calendário compartilhado', categoria: 'projetos' },
      { texto: 'Drive 5 GB', categoria: 'projetos' },
      { texto: 'Sites e landing pages básicos', categoria: 'sites' },
      { texto: 'Relatórios básicos', categoria: 'bi' },
    ] as PlanFeature[],
    limitacoes: ['Sem Contact Center', 'Sem telefonia', 'Automações muito limitadas', '150 processos inteligentes'],
  },
  {
    id: 'standard',
    nome: 'Standard',
    para: 'Para operações estruturadas',
    subtitulo: 'CRM completo + Contact Center',
    icon: Rocket,
    precoMensal: 699,
    precoAnual: 559,
    usuarios: '50',
    storage: '100 GB',
    destaque: false,
    color: 'blue',
    resumo: 'Operação comercial completa com CRM estruturado, automações básicas e atendimento ao cliente integrado.',
    features: [
      { texto: 'CRM completo com múltiplos pipelines', categoria: 'crm', destaque: true },
      { texto: 'Até 100.000 negócios', categoria: 'crm' },
      { texto: 'Catálogo de 5.000 produtos', categoria: 'crm' },
      { texto: 'Cotações e faturas', categoria: 'crm' },
      { texto: 'Automações ilimitadas no CRM', categoria: 'automacao', destaque: true },
      { texto: '1.000 processos inteligentes', categoria: 'automacao' },
      { texto: 'Contact Center completo', categoria: 'comunicacao', destaque: true },
      { texto: 'Telefonia integrada com IVR 2 níveis', categoria: 'comunicacao' },
      { texto: 'Videochamadas até 48 participantes', categoria: 'comunicacao' },
      { texto: 'E-mail sincronizado (100k/mês)', categoria: 'comunicacao' },
      { texto: 'Dependências de tarefas', categoria: 'projetos' },
      { texto: 'Controle de tempo', categoria: 'projetos' },
      { texto: 'E-commerce até 3.000 produtos', categoria: 'sites', destaque: true },
      { texto: 'Assinatura eletrônica', categoria: 'sites' },
      { texto: 'BI com 100k linhas', categoria: 'bi' },
      { texto: 'Dashboards personalizados', categoria: 'bi' },
    ] as PlanFeature[],
    limitacoes: ['BI limitado a 100k linhas', 'Processos inteligentes limitados', 'Sem workflows de projeto avançados'],
  },
  {
    id: 'professional',
    nome: 'Professional',
    para: 'Para quem quer escalar com automação',
    subtitulo: 'Automação ilimitada + BI avançado',
    icon: Building2,
    precoMensal: 1399,
    precoAnual: 1119,
    usuarios: '100',
    storage: '1 TB',
    destaque: true,
    color: 'brand',
    resumo: 'Potencial máximo do Bitrix24 com automações ilimitadas, processos inteligentes sem limite e Business Intelligence para decisões baseadas em dados.',
    features: [
      { texto: 'CRM com Sales Intelligence', categoria: 'crm', destaque: true },
      { texto: 'Até 200.000 negócios', categoria: 'crm' },
      { texto: 'Catálogo de 500.000 produtos', categoria: 'crm' },
      { texto: 'Campos obrigatórios por estágio', categoria: 'crm' },
      { texto: 'Processos Inteligentes ILIMITADOS', categoria: 'automacao', destaque: true },
      { texto: 'RPA ilimitado', categoria: 'automacao', destaque: true },
      { texto: 'Designer de processos visual', categoria: 'automacao' },
      { texto: 'Workflows entre departamentos', categoria: 'automacao' },
      { texto: 'IVR ilimitado + transcrição de chamadas', categoria: 'comunicacao', destaque: true },
      { texto: 'Videochamadas até 100 participantes', categoria: 'comunicacao' },
      { texto: 'E-mail sincronizado (250k/mês)', categoria: 'comunicacao' },
      { texto: 'Workflows de projeto avançados', categoria: 'projetos', destaque: true },
      { texto: 'Gestão de recursos e capacidade', categoria: 'projetos' },
      { texto: 'E-commerce avançado', categoria: 'sites' },
      { texto: 'RH completo: ausências, estrutura org.', categoria: 'rh', destaque: true },
      { texto: 'Gestão de tempo e turnos', categoria: 'rh' },
      { texto: 'BI com 250k linhas + análise de funil', categoria: 'bi', destaque: true },
      { texto: 'Relatórios em tempo real', categoria: 'bi' },
      { texto: 'SSO/SAML', categoria: 'bi' },
    ] as PlanFeature[],
    limitacoes: ['Sem SLA contratual', 'Servidor compartilhado', 'Backup 7 dias'],
  },
  {
    id: 'enterprise',
    nome: 'Enterprise',
    para: 'Para operações críticas',
    subtitulo: 'Infraestrutura dedicada + SLA',
    icon: Shield,
    precoMensal: 2799,
    precoAnual: 2239,
    usuarios: '250+',
    storage: '3 TB+',
    destaque: false,
    color: 'purple',
    resumo: 'Garantias enterprise com SLA contratual, servidor dedicado, multi-filiais com isolamento e compliance para operações críticas.',
    features: [
      { texto: 'CRM com negócios ILIMITADOS', categoria: 'crm', destaque: true },
      { texto: 'Catálogo ILIMITADO de produtos', categoria: 'crm' },
      { texto: 'Multi-filiais com isolamento total', categoria: 'crm', destaque: true },
      { texto: 'Tudo do Professional em automação', categoria: 'automacao' },
      { texto: 'Auditoria completa de processos', categoria: 'automacao' },
      { texto: 'E-mail sincronizado ILIMITADO', categoria: 'comunicacao', destaque: true },
      { texto: 'Sincronização e-mail 180 dias', categoria: 'comunicacao' },
      { texto: 'Tudo do Professional em projetos', categoria: 'projetos' },
      { texto: 'E-commerce enterprise', categoria: 'sites' },
      { texto: 'RH completo + compliance', categoria: 'rh' },
      { texto: 'BI ILIMITADO + 10M linhas dashboard', categoria: 'bi', destaque: true },
      { texto: 'SLA 99.999% contratual', categoria: 'bi', destaque: true },
      { texto: 'Servidor dedicado', categoria: 'bi', destaque: true },
      { texto: 'Backup 30 dias', categoria: 'bi' },
      { texto: 'Criptografia em repouso', categoria: 'bi' },
      { texto: '25 administradores', categoria: 'bi' },
    ] as PlanFeature[],
    limitacoes: [],
  },
]

// Perfis de operação detalhados - FOCO EM NECESSIDADES, NÃO TAMANHO
const PERFIS_OPERACAO = [
  {
    plano: 'Free',
    titulo: 'Para validar a ferramenta',
    icon: Target,
    cor: 'gray',
    descricao: 'Ideal para testar o Bitrix24 antes de investir, ou para operações muito simples sem necessidade de processo definido.',
    perfisIdeais: [
      {
        titulo: 'Freelancers e consultores solo',
        descricao: 'Organizar contatos e tarefas pessoais sem custo',
      },
      {
        titulo: 'Empresas em fase de avaliação',
        descricao: 'Testar a ferramenta com o time antes de decidir',
      },
      {
        titulo: 'Projetos pessoais',
        descricao: 'Gerenciar hobbies, projetos paralelos ou associações',
      },
    ],
    limitacoesCriticas: [
      'Apenas 5 regras de automação no CRM',
      'Armazenamento limitado a 5 GB',
      'Sem Contact Center ou telefonia',
      'Funcionalidades básicas apenas',
    ],
    quandoFazSentido: 'Quando você quer conhecer a ferramenta sem compromisso, ou sua operação é tão simples que não precisa de automações.',
    quandoNaoFaz: 'Se você já sabe que precisa de automações, integrações ou um processo de vendas estruturado — vá direto para Standard ou Professional.',
  },
  {
    plano: 'Standard',
    titulo: 'Para operações que precisam de estrutura',
    icon: TrendingUp,
    cor: 'blue',
    descricao: 'Para empresas que precisam de um CRM completo e organizado, com automações básicas, mas sem complexidade de processos multi-departamento.',
    perfisIdeais: [
      {
        titulo: 'Time comercial estruturado',
        descricao: 'Pipeline de vendas definido, necessidade de acompanhar negócios e metas',
      },
      {
        titulo: 'Operações com ciclo de venda simples',
        descricao: 'Vendas consultivas ou transacionais sem muitas etapas de aprovação',
      },
      {
        titulo: 'Empresas que precisam de Contact Center',
        descricao: 'Atendimento ao cliente via chat, e-mail e telefone integrados',
      },
      {
        titulo: 'E-commerce básico',
        descricao: 'Loja online integrada ao CRM com até 3.000 produtos',
      },
    ],
    limitacoesCriticas: [
      'Processos Inteligentes limitados a 1.000',
      'BI com limite de 100.000 linhas',
      'Sem workflows de projeto avançados',
      'IVR telefônico limitado a 2 níveis',
    ],
    quandoFazSentido: 'Quando sua operação precisa de CRM estruturado, automações básicas (ex: mover negócio automaticamente, enviar e-mail) e atendimento organizado.',
    quandoNaoFaz: 'Se você precisa de automações complexas, processos inteligentes ilimitados, ou BI robusto para tomada de decisão — o Professional é necessário.',
  },
  {
    plano: 'Professional',
    titulo: 'Para quem quer escalar com inteligência',
    icon: Settings,
    cor: 'brand',
    descricao: 'Para operações que precisam de automação avançada, processos inteligentes ilimitados e Business Intelligence para tomar decisões baseadas em dados.',
    perfisIdeais: [
      {
        titulo: 'Empresas que querem automatizar processos complexos',
        descricao: 'Aprovações multi-nível, workflows entre departamentos, RPA',
      },
      {
        titulo: 'Operações com ciclo de venda longo',
        descricao: 'Vendas B2B complexas com múltiplos stakeholders e etapas',
      },
      {
        titulo: 'Times que precisam de BI para decisão',
        descricao: 'Dashboards, relatórios avançados, análise de funil e conversão',
      },
      {
        titulo: 'Múltiplos departamentos usando a mesma plataforma',
        descricao: 'Comercial, marketing, projetos, RH — todos integrados',
      },
      {
        titulo: 'Empresas pequenas com necessidades avançadas',
        descricao: 'Tamanho não importa: se precisa de automação, precisa de Professional',
      },
    ],
    limitacoesCriticas: [
      'Sem SLA contratual garantido',
      'Servidor compartilhado (não dedicado)',
      'Backup limitado a 7 dias',
      'Sem isolamento de dados para multi-filiais',
    ],
    quandoFazSentido: 'Quando você quer extrair o máximo potencial do Bitrix24 com automações ilimitadas, processos inteligentes e BI avançado. Mesmo sendo uma empresa pequena, se a necessidade é de automação — Professional é a resposta.',
    quandoNaoFaz: 'Se você tem requisitos de compliance, precisa de SLA garantido, opera com múltiplas filiais que não podem compartilhar dados, ou sua operação é crítica demais para ficar em servidor compartilhado.',
  },
  {
    plano: 'Enterprise',
    titulo: 'Para operações críticas e reguladas',
    icon: Lock,
    cor: 'purple',
    descricao: 'Para empresas que não podem ter downtime, precisam de compliance rigoroso, operam com múltiplas filiais ou têm requisitos de segurança enterprise.',
    perfisIdeais: [
      {
        titulo: 'Operações que não toleram indisponibilidade',
        descricao: 'SLA 99.999% contratual com garantias formais',
      },
      {
        titulo: 'Multi-filiais com isolamento de dados',
        descricao: 'Cada filial vê apenas seus dados, sem vazamento entre unidades',
      },
      {
        titulo: 'Requisitos de compliance e auditoria',
        descricao: 'Criptografia em repouso, backup 30 dias, logs de auditoria',
      },
      {
        titulo: 'Grandes volumes de dados',
        descricao: 'Catálogo ilimitado de produtos, negócios ilimitados, 3TB+ de storage',
      },
      {
        titulo: 'Infraestrutura dedicada',
        descricao: 'Servidor exclusivo, sem compartilhamento com outros clientes',
      },
    ],
    limitacoesCriticas: [],
    quandoFazSentido: 'Quando sua operação é crítica para o negócio e você precisa de garantias contratuais de disponibilidade, segurança enterprise, ou opera com múltiplas unidades de negócio que precisam de isolamento.',
    quandoNaoFaz: 'Se você não tem requisitos de compliance, sua operação tolera indisponibilidade ocasional, e não precisa de isolamento entre filiais — o Professional atende com menor investimento.',
  },
]

// Comparativo detalhado expandido
const COMPARATIVO_DETALHADO = {
  'CRM & Gestão de Vendas': [
    { nome: 'Leads e Negócios', free: true, standard: true, professional: true, enterprise: true, destaque: false },
    { nome: 'Pipeline visual (Kanban)', free: true, standard: true, professional: true, enterprise: true, destaque: false },
    { nome: 'Negócios pesquisáveis', free: '1.000', standard: '100.000', professional: '200.000', enterprise: 'Ilimitado', destaque: true },
    { nome: 'Catálogo de produtos', free: '100', standard: '5.000', professional: '500.000', enterprise: 'Ilimitado', destaque: true },
    { nome: 'Cotações e faturas', free: false, standard: true, professional: true, enterprise: true, destaque: false },
    { nome: 'Múltiplos pipelines', free: false, standard: true, professional: true, enterprise: true, destaque: false },
    { nome: 'Campos obrigatórios por estágio', free: false, standard: false, professional: true, enterprise: true, destaque: true },
    { nome: 'Visibilidade de campos por usuário', free: false, standard: false, professional: true, enterprise: true, destaque: true },
    { nome: 'Sales Intelligence (BI de vendas)', free: false, standard: false, professional: true, enterprise: true, destaque: true },
  ],
  'Automação & Processos Inteligentes': [
    { nome: 'Regras de automação CRM', free: '5', standard: 'Ilimitado', professional: 'Ilimitado', enterprise: 'Ilimitado', destaque: true },
    { nome: 'Gatilhos automáticos', free: false, standard: 'Básico', professional: 'Avançado', enterprise: 'Avançado', destaque: true },
    { nome: 'Processos Inteligentes', free: '150', standard: '1.000', professional: 'Ilimitado', enterprise: 'Ilimitado', destaque: true },
    { nome: 'Designer de Processos', free: false, standard: false, professional: true, enterprise: true, destaque: true },
    { nome: 'RPA (Robotic Process Automation)', free: '1', standard: '5', professional: 'Ilimitado', enterprise: 'Ilimitado', destaque: true },
    { nome: 'Workflows entre departamentos', free: false, standard: false, professional: true, enterprise: true, destaque: true },
    { nome: 'Aprovações multi-nível', free: false, standard: false, professional: true, enterprise: true, destaque: false },
    { nome: 'Webhooks e API', free: true, standard: true, professional: true, enterprise: true, destaque: false },
  ],
  'Business Intelligence & Relatórios': [
    { nome: 'Relatórios básicos', free: true, standard: true, professional: true, enterprise: true, destaque: false },
    { nome: 'Linhas em relatório BI', free: '-', standard: '100.000', professional: '250.000', enterprise: 'Ilimitado', destaque: true },
    { nome: 'Linhas em dashboard', free: '-', standard: '1.000.000', professional: '5.000.000', enterprise: '10.000.000', destaque: true },
    { nome: 'Dashboards personalizados', free: false, standard: true, professional: true, enterprise: true, destaque: false },
    { nome: 'Análise de funil avançada', free: false, standard: false, professional: true, enterprise: true, destaque: true },
    { nome: 'Relatórios de tempo real', free: false, standard: false, professional: true, enterprise: true, destaque: false },
  ],
  'Comunicação & Contact Center': [
    { nome: 'Chat interno', free: true, standard: true, professional: true, enterprise: true, destaque: false },
    { nome: 'Videochamadas', free: '24 part.', standard: '48 part.', professional: '100 part.', enterprise: '100 part.', destaque: false },
    { nome: 'Contact Center', free: false, standard: true, professional: true, enterprise: true, destaque: false },
    { nome: 'Telefonia integrada', free: false, standard: true, professional: true, enterprise: true, destaque: false },
    { nome: 'IVR (URA)', free: false, standard: '2 níveis', professional: 'Ilimitado', enterprise: 'Ilimitado', destaque: true },
    { nome: 'Transcrição automática de chamadas', free: false, standard: false, professional: true, enterprise: true, destaque: true },
    { nome: 'E-mails sincronizados/mês', free: '-', standard: '100.000', professional: '250.000', enterprise: 'Ilimitado', destaque: false },
    { nome: 'Período de sincronização e-mail', free: '-', standard: '30 dias', professional: '90 dias', enterprise: '180 dias', destaque: false },
  ],
  'Tarefas & Projetos': [
    { nome: 'Tarefas ilimitadas', free: true, standard: true, professional: true, enterprise: true, destaque: false },
    { nome: 'Kanban e Gantt', free: true, standard: true, professional: true, enterprise: true, destaque: false },
    { nome: 'Controle de tempo', free: true, standard: true, professional: true, enterprise: true, destaque: false },
    { nome: 'Dependências de tarefas', free: false, standard: true, professional: true, enterprise: true, destaque: false },
    { nome: 'Workflows de projeto', free: false, standard: false, professional: true, enterprise: true, destaque: true },
    { nome: 'Recursos e capacidade', free: false, standard: false, professional: true, enterprise: true, destaque: false },
  ],
  'Armazenamento & Infraestrutura': [
    { nome: 'Drive', free: '5 GB', standard: '100 GB', professional: '1 TB', enterprise: '3 TB+', destaque: true },
    { nome: 'Backup automático', free: true, standard: true, professional: true, enterprise: true, destaque: false },
    { nome: 'Período de backup', free: '1 dia', standard: '3 dias', professional: '7 dias', enterprise: '30 dias', destaque: true },
    { nome: 'Servidor dedicado', free: false, standard: false, professional: false, enterprise: true, destaque: true },
    { nome: 'Criptografia em repouso', free: false, standard: false, professional: false, enterprise: true, destaque: true },
  ],
  'Administração & Segurança': [
    { nome: 'Administradores', free: '1', standard: '5', professional: '10', enterprise: '25', destaque: false },
    { nome: 'Logs de auditoria', free: false, standard: true, professional: true, enterprise: true, destaque: false },
    { nome: 'SLA garantido', free: '-', standard: '-', professional: '-', enterprise: '99.999%', destaque: true },
    { nome: 'Multi-filiais com isolamento', free: false, standard: false, professional: false, enterprise: true, destaque: true },
    { nome: '2FA obrigatório', free: false, standard: true, professional: true, enterprise: true, destaque: false },
    { nome: 'SSO/SAML', free: false, standard: false, professional: true, enterprise: true, destaque: false },
  ],
}

// Billing Toggle Component - Following project patterns
function BillingToggle({
  value,
  onChange,
}: {
  value: BillingCycle
  onChange: (value: BillingCycle) => void
}) {
  const layoutId = useId()

  const options: { id: BillingCycle; label: string; badge?: string }[] = [
    { id: 'monthly', label: 'Mensal' },
    { id: 'annual', label: 'Anual', badge: '-20%' },
  ]

  return (
    <LayoutGroup>
      <div className="flex flex-col items-center gap-4">
        {/* Toggle Container */}
        <div
          className="relative inline-flex p-1.5 bg-gray-100/80 rounded-2xl backdrop-blur-sm border border-gray-200/50"
          role="radiogroup"
          aria-label="Ciclo de cobrança"
        >
          {options.map((option) => {
            const isActive = value === option.id

            return (
              <button
                key={option.id}
                role="radio"
                aria-checked={isActive}
                onClick={() => onChange(option.id)}
                className={cn(
                  'relative z-10 px-6 py-3 sm:px-8 sm:py-3.5 rounded-xl font-medium text-sm sm:text-base',
                  'transition-colors duration-300 ease-out',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2',
                  isActive ? 'text-white' : 'text-gray-600 hover:text-gray-900'
                )}
              >
                {/* Animated background pill */}
                {isActive && (
                  <motion.div
                    layoutId={`${layoutId}-toggle-bg`}
                    className="absolute inset-0 bg-brand rounded-xl shadow-lg shadow-brand/25"
                    transition={{
                      type: 'spring',
                      stiffness: 400,
                      damping: 30,
                    }}
                  />
                )}

                {/* Button content */}
                <span className="relative z-10 flex items-center gap-2">
                  {option.label}
                  {option.badge && (
                    <motion.span
                      animate={{
                        backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : 'rgb(220 252 231)',
                        color: isActive ? 'rgb(255,255,255)' : 'rgb(21 128 61)',
                      }}
                      transition={{ duration: durations.fast, ease: easings.premium }}
                      className="px-2 py-0.5 text-xs font-bold rounded-lg"
                    >
                      {option.badge}
                    </motion.span>
                  )}
                </span>
              </button>
            )
          })}
        </div>

        {/* Economy message */}
        <AnimatePresence mode="wait">
          {value === 'annual' && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{
                duration: durations.fast,
                ease: easings.premium,
              }}
              className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full border border-green-100"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-medium text-green-700">
                Economia de 20% no plano anual
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </LayoutGroup>
  )
}

// Price formatter
function formatPrice(price: number): string {
  if (price === 0) return 'Grátis'
  return price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
}

// Feature Cell Component
function FeatureCell({ value, highlight = false }: { value: boolean | string; highlight?: boolean }) {
  if (value === true) {
    return <Check className={cn('w-5 h-5 mx-auto', highlight ? 'text-brand' : 'text-green-500')} />
  }
  if (value === false) {
    return <X className="w-5 h-5 text-gray-300 mx-auto" />
  }
  return (
    <span className={cn('text-sm font-medium', highlight ? 'text-brand font-semibold' : 'text-gray-700')}>
      {value}
    </span>
  )
}

// Comparison Table Cell Component
function ComparisonCell({ value, isHighlighted }: { value: string | boolean; isHighlighted: boolean }) {
  return (
    <div className={cn(
      'p-3 text-center text-sm border-r border-gray-200 last:border-r-0',
      isHighlighted && 'bg-brand/5'
    )}>
      {value === true ? (
        <Check className={cn('w-5 h-5 mx-auto', isHighlighted ? 'text-brand' : 'text-green-500')} />
      ) : value === false ? (
        <X className="w-5 h-5 mx-auto text-gray-300" />
      ) : (
        <span className={cn(
          'text-sm',
          isHighlighted ? 'font-semibold text-brand' : 'font-medium text-gray-700'
        )}>
          {value}
        </span>
      )}
    </div>
  )
}

// Table Row Component for Comparison Table
function TableRow({
  label,
  icon,
  values,
  highlightIdx,
  isHighlight = false,
}: {
  label: string
  icon?: React.ReactNode
  values: (string | boolean)[]
  highlightIdx: number
  isHighlight?: boolean
}) {
  return (
    <div className={cn(
      'grid grid-cols-5 border-b border-gray-100 hover:bg-gray-50/50 transition-colors',
      isHighlight && 'bg-amber-50/30'
    )}>
      <div className={cn(
        'p-3 px-4 text-sm text-gray-700 flex items-center gap-2',
        isHighlight && 'font-medium'
      )}>
        {icon && <span className="text-gray-400">{icon}</span>}
        {label}
        {isHighlight && (
          <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded text-xs font-semibold ml-1">
            DIFERENCIAL
          </span>
        )}
      </div>
      {values.map((value, idx) => (
        <div
          key={idx}
          className={cn(
            'p-3 text-center text-sm',
            idx === highlightIdx && 'bg-brand/5'
          )}
        >
          {value === true ? (
            <Check className={cn('w-5 h-5 mx-auto', idx === highlightIdx ? 'text-brand' : 'text-success')} />
          ) : value === false ? (
            <X className="w-5 h-5 mx-auto text-gray-300" />
          ) : (
            <span className={cn(
              'text-sm',
              idx === highlightIdx ? 'font-semibold text-brand' : 'font-medium text-gray-700'
            )}>
              {value}
            </span>
          )}
        </div>
      ))}
    </div>
  )
}

// Mobile Plan Accordion
function MobilePlanAccordion({
  plano,
  features,
  planKey,
  billing,
}: {
  plano: typeof PLANOS[0]
  features: typeof TABELA_COMPARATIVA
  planKey: 'free' | 'standard' | 'professional' | 'enterprise'
  billing: BillingCycle
}) {
  const [isOpen, setIsOpen] = useState(plano.destaque)
  const Icon = plano.icon
  const currentPrice = billing === 'annual' ? plano.precoAnual : plano.precoMensal

  return (
    <div className={cn(
      'rounded-2xl border overflow-hidden transition-all',
      plano.destaque ? 'border-brand shadow-md' : 'border-gray-200'
    )}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'w-full p-4 flex items-center gap-3 text-left transition-colors',
          plano.destaque ? 'bg-brand/5' : 'bg-white hover:bg-gray-50'
        )}
      >
        <div className={cn(
          'w-10 h-10 rounded-xl flex items-center justify-center shrink-0',
          plano.destaque ? 'bg-brand/10' : 'bg-gray-100'
        )}>
          <Icon className={cn('w-5 h-5', plano.destaque ? 'text-brand' : 'text-gray-600')} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className={cn(
              'font-bold',
              plano.destaque ? 'text-brand' : 'text-gray-900'
            )}>
              {plano.nome}
            </h3>
            {plano.destaque && (
              <span className="bg-brand text-white text-xs font-semibold px-2 py-1 rounded-full">
                Popular
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 truncate">{plano.subtitulo}</p>
        </div>
        <div className="text-right shrink-0">
          <AnimatePresence mode="wait">
            <motion.span
              key={`${plano.id}-${billing}-acc`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={cn(
                'text-lg font-bold',
                plano.destaque ? 'text-brand' : 'text-gray-900'
              )}
            >
              {formatPrice(currentPrice)}
            </motion.span>
          </AnimatePresence>
          {currentPrice > 0 && <span className="text-gray-500 text-xs">/mês</span>}
        </div>
        <ChevronDown className={cn(
          'w-5 h-5 text-gray-400 transition-transform shrink-0',
          isOpen && 'rotate-180'
        )} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-0 space-y-4">
              {/* Specs */}
              <div className="flex gap-4 py-3 border-b border-gray-100">
                <span className="text-sm text-gray-600">
                  <Users className="w-4 h-4 inline mr-1 text-gray-400" />
                  {plano.usuarios} usuários
                </span>
                <span className="text-sm text-gray-600">
                  <HardDrive className="w-4 h-4 inline mr-1 text-gray-400" />
                  {plano.storage}
                </span>
              </div>

              {/* Features categorizados */}
              {PILARES_BITRIX24.map((pilar) => {
                const pilarFeatures = features.filter(f => f.categoria === pilar.id && f[planKey] !== false)
                if (pilarFeatures.length === 0) return null
                const PilarIcon = pilar.icon

                return (
                  <div key={pilar.id}>
                    <div className="flex items-center gap-2 mb-2">
                      <PilarIcon className="w-4 h-4 text-brand" />
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        {pilar.nome}
                      </span>
                    </div>
                    <ul className="space-y-1.5 pl-6">
                      {pilarFeatures.slice(0, 4).map((feat, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <Check className={cn(
                            'w-4 h-4 shrink-0 mt-0.5',
                            plano.destaque ? 'text-brand' : 'text-success'
                          )} />
                          <span className="text-gray-700">
                            {feat.feature}: {typeof feat[planKey] === 'boolean' ? 'Sim' : feat[planKey]}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}

              {/* Limitações */}
              {plano.limitacoes.length > 0 && (
                <div className="p-3 bg-amber-50 rounded-xl">
                  <p className="text-xs font-semibold text-amber-800 mb-1.5 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Limitações
                  </p>
                  <p className="text-xs text-amber-700">
                    {plano.limitacoes.join(' • ')}
                  </p>
                </div>
              )}

              {/* CTA */}
              <a
                href={ZOPU_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'block w-full py-3 rounded-xl font-semibold text-center transition-all',
                  plano.destaque
                    ? 'bg-brand text-white hover:bg-brand-hover'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                )}
              >
                {plano.precoMensal === 0 ? 'Começar grátis' : 'Falar com especialista'}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Collapsible Category Component
function FeatureCategory({
  title,
  features,
  defaultOpen = false,
}: {
  title: string
  features: Array<{
    nome: string
    free: boolean | string
    standard: boolean | string
    professional: boolean | string
    enterprise: boolean | string
    destaque?: boolean
  }>
  defaultOpen?: boolean
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="border-b border-gray-100 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 px-4 hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-gray-900">{title}</span>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">{features.length} recursos</span>
          <ChevronDown
            className={cn('w-5 h-5 text-gray-400 transition-transform', isOpen && 'rotate-180')}
          />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pb-4">
              {features.map((feature, idx) => (
                <div
                  key={feature.nome}
                  className={cn(
                    'grid grid-cols-5 gap-4 py-3 px-4 text-sm',
                    idx % 2 === 0 ? 'bg-gray-50/50' : 'bg-white',
                    feature.destaque && 'bg-amber-50/50'
                  )}
                >
                  <div className={cn('col-span-1', feature.destaque && 'font-medium text-gray-900')}>
                    {feature.nome}
                    {feature.destaque && (
                      <span className="ml-2 text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-semibold">
                        DIFERENCIAL
                      </span>
                    )}
                  </div>
                  <div className="text-center">
                    <FeatureCell value={feature.free} />
                  </div>
                  <div className="text-center">
                    <FeatureCell value={feature.standard} />
                  </div>
                  <div className="text-center bg-brand/5 -mx-2 px-2 rounded">
                    <FeatureCell value={feature.professional} highlight={feature.destaque} />
                  </div>
                  <div className="text-center">
                    <FeatureCell value={feature.enterprise} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Plan Profile Card - Symmetrical, accessible design
function PlanProfileCard({
  perfil,
  index,
  isExpanded,
  onToggle,
}: {
  perfil: typeof PERFIS_OPERACAO[0]
  index: number
  isExpanded: boolean
  onToggle: () => void
}) {
  const isRecommended = perfil.cor === 'brand'
  const Icon = perfil.icon

  // Color mappings for accessible contrast (4.5:1+ ratio)
  const colorStyles = {
    gray: {
      iconBg: 'bg-gray-100',
      iconColor: 'text-gray-600',
      border: 'border-gray-200',
      badge: 'bg-gray-100 text-gray-700',
      accent: 'border-gray-300',
    },
    blue: {
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-600',
      border: 'border-blue-200',
      badge: 'bg-blue-50 text-blue-700',
      accent: 'border-blue-400',
    },
    brand: {
      iconBg: 'bg-brand/10',
      iconColor: 'text-brand',
      border: 'border-brand/30',
      badge: 'bg-brand text-white',
      accent: 'border-brand',
    },
    purple: {
      iconBg: 'bg-purple-50',
      iconColor: 'text-purple-600',
      border: 'border-purple-200',
      badge: 'bg-purple-50 text-purple-700',
      accent: 'border-purple-400',
    },
  }

  const colors = colorStyles[perfil.cor as keyof typeof colorStyles] || colorStyles.gray

  return (
    <Reveal delay={0.08 * index}>
      <article className="h-full">
        <div className={cn(
          'relative h-full flex flex-col overflow-hidden rounded-2xl transition-all duration-300 ease-out-expo',
          isRecommended
            ? 'bg-white border-2 border-brand shadow-elevated shadow-brand/15 hover:shadow-elevated-hover hover:shadow-brand/20 hover:-translate-y-1'
            : 'bg-white border border-gray-200 hover:border-gray-300 hover:shadow-card hover:-translate-y-0.5'
        )}>
          {/* Recommended badge */}
          {isRecommended && (
            <div className="absolute -top-px left-1/2 -translate-x-1/2">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-brand text-white text-sm font-semibold rounded-b-xl shadow-lg shadow-brand/25">
                <Sparkles className="w-4 h-4" />
                Nossa recomendação
              </span>
            </div>
          )}

          <div className={cn('flex flex-col h-full p-6 lg:p-8', isRecommended && 'pt-10')}>
            {/* Header */}
            <header className="mb-6">
              <div className="flex items-start gap-4 mb-4">
                <div className={cn(
                  'w-12 h-12 rounded-2xl flex items-center justify-center shrink-0',
                  colors.iconBg
                )}>
                  <Icon className={cn('w-6 h-6', colors.iconColor)} />
                </div>
                <div>
                  <h3 className={cn(
                    'text-2xl font-bold tracking-tight',
                    isRecommended ? 'text-brand' : 'text-gray-900'
                  )}>
                    {perfil.plano}
                  </h3>
                  <p className="text-base font-medium text-gray-600 mt-1">
                    {perfil.titulo}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-base text-gray-600 leading-relaxed">
                {perfil.descricao}
              </p>
            </header>

            {/* Ideal profiles - always show first 3 */}
            <div className="flex-1 mb-6">
              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                Ideal para
              </h4>
              <ul className="space-y-3">
                {perfil.perfisIdeais.slice(0, 3).map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className={cn(
                      'shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold',
                      isRecommended ? 'bg-brand/10 text-brand' : 'bg-gray-100 text-gray-600'
                    )}>
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-gray-900 text-base">{item.titulo}</p>
                      <p className="text-sm text-gray-500 mt-0.5 leading-relaxed">{item.descricao}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Expandable details */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pt-6 border-t border-gray-100 space-y-4">
                    {/* Additional profiles if any */}
                    {perfil.perfisIdeais.length > 3 && (
                      <div className="space-y-3">
                        {perfil.perfisIdeais.slice(3).map((item, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <span className={cn(
                              'shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold',
                              isRecommended ? 'bg-brand/10 text-brand' : 'bg-gray-100 text-gray-600'
                            )}>
                              {i + 4}
                            </span>
                            <div>
                              <p className="font-semibold text-gray-900 text-base">{item.titulo}</p>
                              <p className="text-sm text-gray-500 mt-0.5 leading-relaxed">{item.descricao}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Limitations */}
                    {perfil.limitacoesCriticas.length > 0 && (
                      <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                        <h4 className="text-base font-semibold text-amber-900 mb-3 flex items-center gap-2">
                          <AlertTriangle className="w-5 h-5 text-amber-600" />
                          Limitações a considerar
                        </h4>
                        <ul className="space-y-2">
                          {perfil.limitacoesCriticas.map((item, i) => (
                            <li key={i} className="text-sm text-amber-800 flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-2" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* When to use / not use */}
                    <div className="space-y-3">
                      <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                        <h4 className="text-base font-semibold text-green-900 mb-2 flex items-center gap-2">
                          <Check className="w-5 h-5 text-green-600" />
                          Quando faz sentido
                        </h4>
                        <p className="text-sm text-green-800 leading-relaxed">{perfil.quandoFazSentido}</p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                        <h4 className="text-base font-semibold text-gray-800 mb-2 flex items-center gap-2">
                          <X className="w-5 h-5 text-gray-500" />
                          Quando não faz sentido
                        </h4>
                        <p className="text-sm text-gray-600 leading-relaxed">{perfil.quandoNaoFaz}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Toggle button */}
            <button
              onClick={onToggle}
              className={cn(
                'mt-auto pt-6 w-full py-3 rounded-xl font-semibold text-base transition-all duration-300 ease-out-expo flex items-center justify-center gap-2',
                isRecommended
                  ? isExpanded
                    ? 'bg-brand/10 text-brand hover:bg-brand/15'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              )}
            >
              <ChevronDown className={cn(
                'w-5 h-5 transition-transform duration-300',
                isExpanded && 'rotate-180'
              )} />
              {isExpanded ? 'Ocultar detalhes' : 'Ver detalhes completos'}
            </button>
          </div>
        </div>
      </article>
    </Reveal>
  )
}

// Plan Profiles Section with synchronized expansion
function PlanProfilesSection() {
  // Track which row is expanded (row 0: indices 0,1 | row 1: indices 2,3)
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set())

  const toggleRow = (index: number) => {
    // Calculate which row this index belongs to (0-1 = row 0, 2-3 = row 1)
    const rowIndex = Math.floor(index / 2)
    setExpandedRows(prev => {
      const next = new Set(prev)
      if (next.has(rowIndex)) {
        next.delete(rowIndex)
      } else {
        next.add(rowIndex)
      }
      return next
    })
  }

  const isRowExpanded = (index: number) => {
    const rowIndex = Math.floor(index / 2)
    return expandedRows.has(rowIndex)
  }

  return (
    <section className="mb-24">
      {/* Section header */}
      <Reveal>
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-brand uppercase tracking-wider mb-3">
            Guia de escolha
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Para quem é cada plano
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Baseado em necessidade, não tamanho. Empresas pequenas podem precisar do Professional.
            Empresas grandes podem usar o Standard. A escolha depende do que você precisa fazer.
          </p>
        </div>
      </Reveal>

      {/* Symmetrical 2x2 grid - all cards equal size, paired expansion */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {PERFIS_OPERACAO.map((perfil, index) => (
          <PlanProfileCard
            key={perfil.plano}
            perfil={perfil}
            index={index}
            isExpanded={isRowExpanded(index)}
            onToggle={() => toggleRow(index)}
          />
        ))}
      </div>

      {/* Insight callout - redesigned with accessible colors */}
      <Reveal delay={0.4}>
        <div className="mt-12 bg-amber-50 border border-amber-200 rounded-2xl p-8 lg:p-10">
          <div className="flex flex-col lg:flex-row lg:items-center gap-6">
            <div className="lg:w-2/3">
              <p className="text-sm font-semibold text-amber-700 uppercase tracking-wider mb-2">
                Insight importante
              </p>
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3">
                Tamanho da empresa não define o plano ideal
              </h3>
              <p className="text-base text-gray-700 leading-relaxed">
                Uma empresa de 10 pessoas que precisa de automações complexas, processos inteligentes e BI avançado{' '}
                <strong className="text-gray-900">deve ir para o Professional</strong>. Uma empresa de 40 pessoas com
                processo simples pode usar o Standard tranquilamente.
              </p>
            </div>
            <div className="lg:w-1/3 lg:text-right lg:border-l lg:border-amber-200 lg:pl-6">
              <p className="text-base text-amber-800 italic leading-relaxed">
                "A escolha é sobre o que você quer extrair da ferramenta, não sobre quantas pessoas você tem."
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

// Main Component
export function PlanosBitrix24Content() {
  const [billing, setBilling] = useState<BillingCycle>('annual')

  return (
    <div className="py-16 lg:py-24">
      {/* Hero */}
      <Reveal>
        <div className="text-center mb-12">
          <Badge className="mb-4">Preços Janeiro 2026</Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Planos e Preços Bitrix24
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Compare todos os planos e escolha o ideal para sua operação.
            <strong className="text-gray-900"> Não é sobre tamanho — é sobre necessidade.</strong>
          </p>
        </div>
      </Reveal>

      {/* Billing Toggle */}
      <Reveal delay={0.1}>
        <div className="flex justify-center mb-12">
          <BillingToggle value={billing} onChange={setBilling} />
        </div>
      </Reveal>

      {/* Cards de Planos - Layout limpo inspirado em Stripe/Notion */}
      <Reveal delay={0.1}>
        <div className="mb-16">
          {/* Grid de 4 planos */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {PLANOS.map((plano, index) => {
              const Icon = plano.icon
              const currentPrice = billing === 'annual' ? plano.precoAnual : plano.precoMensal
              const savings = plano.precoMensal - plano.precoAnual

              return (
                <Reveal key={plano.id} delay={0.05 * index}>
                  <div
                    className={cn(
                      'relative flex flex-col h-full rounded-2xl transition-all duration-300 ease-out-expo',
                      plano.destaque
                        ? 'bg-white border-2 border-brand shadow-elevated shadow-brand/15 hover:shadow-elevated-hover hover:shadow-brand/20 hover:-translate-y-1'
                        : 'bg-white border border-gray-200 hover:border-gray-300 hover:shadow-card hover:-translate-y-0.5'
                    )}
                  >
                    {/* Badge destaque */}
                    {plano.destaque && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-brand text-white text-xs font-semibold rounded-full shadow-lg shadow-brand/25">
                          <Sparkles className="w-3.5 h-3.5" />
                          Mais escolhido
                        </span>
                      </div>
                    )}

                    <div className={cn('p-6 flex flex-col h-full', plano.destaque && 'pt-8')}>
                      {/* Header */}
                      <div className="mb-6">
                        <div className={cn(
                          'w-12 h-12 rounded-2xl flex items-center justify-center mb-4',
                          plano.destaque ? 'bg-brand/10' : 'bg-gray-100'
                        )}>
                          <Icon className={cn('w-6 h-6', plano.destaque ? 'text-brand' : 'text-gray-600')} />
                        </div>
                        <h3 className={cn(
                          'text-xl font-bold mb-1',
                          plano.destaque ? 'text-brand' : 'text-gray-900'
                        )}>
                          {plano.nome}
                        </h3>
                        <p className="text-sm text-gray-500">{plano.subtitulo}</p>
                      </div>

                      {/* Preço */}
                      <div className="mb-6">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={`${plano.id}-${billing}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="flex items-baseline gap-1">
                              <span className={cn(
                                'text-3xl font-bold',
                                plano.destaque ? 'text-brand' : 'text-gray-900'
                              )}>
                                {formatPrice(currentPrice)}
                              </span>
                              {currentPrice > 0 && (
                                <span className="text-gray-500 text-sm">/mês</span>
                              )}
                            </div>
                            {billing === 'annual' && savings > 0 && (
                              <p className="text-sm text-success font-medium mt-1">
                                Economia de {formatPrice(savings * 12)}/ano
                              </p>
                            )}
                          </motion.div>
                        </AnimatePresence>
                      </div>

                      {/* Specs rápidos */}
                      <div className="flex gap-4 pb-6 mb-6 border-b border-gray-100 text-sm">
                        <div className="flex items-center gap-1.5 text-gray-600">
                          <Users className="w-4 h-4 text-gray-400" />
                          <span className="font-medium">{plano.usuarios}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-600">
                          <HardDrive className="w-4 h-4 text-gray-400" />
                          <span className="font-medium">{plano.storage}</span>
                        </div>
                      </div>

                      {/* Destaques principais */}
                      <div className="flex-1 mb-6">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                          Destaques
                        </p>
                        <ul className="space-y-2.5">
                          {plano.features.filter(f => f.destaque).slice(0, 4).map((feat, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-sm">
                              <Check className={cn(
                                'w-4 h-4 shrink-0 mt-0.5',
                                plano.destaque ? 'text-brand' : 'text-success'
                              )} />
                              <span className="text-gray-700">{feat.texto}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* CTA */}
                      <a
                        href={ZOPU_LINKS.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          'block w-full py-3.5 rounded-2xl font-semibold text-center transition-all duration-300 ease-out-expo',
                          plano.destaque
                            ? 'bg-brand text-white hover:bg-brand-hover shadow-elevated shadow-brand/20 hover:shadow-elevated-hover hover:shadow-brand/30 hover:-translate-y-0.5'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        )}
                      >
                        {plano.precoMensal === 0 ? 'Começar grátis' : 'Falar com especialista'}
                      </a>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </Reveal>

      {/* Tabela Comparativa Detalhada */}
      <Reveal delay={0.2}>
        <div className="mb-24">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Comparativo detalhado
            </h2>
            <p className="text-gray-500">
              Veja todas as funcionalidades lado a lado
            </p>
          </div>

          {/* Desktop Table */}
          <div className="hidden lg:block">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              {/* Header fixo */}
              <div className="grid grid-cols-5 bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
                <div className="p-4 font-semibold text-gray-700 text-sm">
                  Funcionalidade
                </div>
                {PLANOS.map((plano) => (
                  <div
                    key={plano.id}
                    className={cn(
                      'p-4 text-center font-semibold text-sm',
                      plano.destaque ? 'bg-brand/5 text-brand' : 'text-gray-700'
                    )}
                  >
                    {plano.nome}
                  </div>
                ))}
              </div>

              {/* Specs básicos */}
              <TableRow
                label="Usuários"
                icon={<Users className="w-4 h-4" />}
                values={PLANOS.map(p => p.usuarios)}
                highlightIdx={2}
              />
              <TableRow
                label="Armazenamento"
                icon={<HardDrive className="w-4 h-4" />}
                values={PLANOS.map(p => p.storage)}
                highlightIdx={2}
              />

              {/* Features por categoria */}
              {PILARES_BITRIX24.map((pilar) => {
                const PilarIcon = pilar.icon
                const pilarRows = TABELA_COMPARATIVA.filter(row => row.categoria === pilar.id)
                if (pilarRows.length === 0) return null

                return (
                  <div key={pilar.id}>
                    {/* Categoria header */}
                    <div className="grid grid-cols-5 bg-gray-50 border-y border-gray-200">
                      <div className="col-span-5 p-3 px-4 flex items-center gap-2">
                        <PilarIcon className="w-4 h-4 text-brand" />
                        <span className="font-semibold text-gray-900 text-sm">{pilar.nome}</span>
                      </div>
                    </div>
                    {/* Linhas */}
                    {pilarRows.map((row, i) => (
                      <TableRow
                        key={i}
                        label={row.feature}
                        values={[row.free, row.standard, row.professional, row.enterprise]}
                        highlightIdx={2}
                        isHighlight={row.destaque}
                      />
                    ))}
                  </div>
                )
              })}

              {/* Limitações */}
              <div className="grid grid-cols-5 bg-amber-50/70 border-t border-gray-200">
                <div className="p-4 text-sm font-medium text-amber-800 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Limitações
                </div>
                {PLANOS.map((plano, idx) => (
                  <div
                    key={plano.id}
                    className={cn(
                      'p-4 text-xs text-amber-700',
                      idx === 2 && 'bg-brand/5'
                    )}
                  >
                    {plano.limitacoes.length > 0 ? (
                      <ul className="space-y-1">
                        {plano.limitacoes.map((lim, i) => (
                          <li key={i}>• {lim}</li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-success font-medium">Sem limitações</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile: Accordion por plano */}
          <div className="lg:hidden space-y-3">
            {PLANOS.map((plano) => {
              const planKey = plano.id as 'free' | 'standard' | 'professional' | 'enterprise'
              return (
                <MobilePlanAccordion
                  key={plano.id}
                  plano={plano}
                  features={TABELA_COMPARATIVA}
                  planKey={planKey}
                  billing={billing}
                />
              )
            })}
          </div>

          {/* Legenda */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-success" />
              <span>Incluído</span>
            </div>
            <div className="flex items-center gap-2">
              <X className="w-4 h-4 text-gray-300" />
              <span>Não disponível</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded text-xs font-semibold">
                DIFERENCIAL
              </span>
              <span>Impacta na decisão</span>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Para quem é cada plano - Symmetrical Grid */}
      <PlanProfilesSection />

      {/* Comparativo Detalhado - EXPANDIDO */}
      <Reveal>
        <div className="mb-24">
          <SectionHeader
            label="Comparativo completo"
            title="O que está incluído em cada plano"
            description="Veja todas as funcionalidades lado a lado. Os itens marcados como 'DIFERENCIAL' são os que mais impactam na decisão entre planos."
            align="center"
          />

          <div className="mt-12 bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            {/* Header */}
            <div className="grid grid-cols-5 gap-4 py-4 px-4 bg-gray-50 border-b border-gray-200 sticky top-16 z-10">
              <div className="font-semibold text-gray-500 text-sm">Funcionalidade</div>
              <div className="text-center font-semibold text-gray-700 text-sm">Free</div>
              <div className="text-center font-semibold text-gray-700 text-sm">Standard</div>
              <div className="text-center font-semibold text-brand bg-brand/5 -mx-2 px-2 py-1 rounded text-sm">
                Professional
              </div>
              <div className="text-center font-semibold text-gray-700 text-sm">Enterprise</div>
            </div>

            {/* Categories */}
            {Object.entries(COMPARATIVO_DETALHADO).map(([category, features], idx) => (
              <FeatureCategory
                key={category}
                title={category}
                features={features}
                defaultOpen={idx < 2}
              />
            ))}
          </div>

          {/* Legenda */}
          <div className="mt-4 flex items-center justify-center gap-6 text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>Incluído</span>
            </div>
            <div className="flex items-center gap-2">
              <X className="w-4 h-4 text-gray-300" />
              <span>Não incluído</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded text-xs font-semibold">
                DIFERENCIAL
              </span>
              <span>Impacta na decisão</span>
            </div>
          </div>
        </div>
      </Reveal>

      {/* FAQ */}
      <Reveal>
        <div className="mb-24">
          <SectionHeader
            label="Dúvidas frequentes"
            title="Perguntas sobre os planos"
            align="center"
          />

          <div className="mt-12 max-w-3xl mx-auto space-y-4">
            {[
              {
                q: 'Posso mudar de plano depois?',
                a: 'Sim! Você pode fazer upgrade a qualquer momento. O valor é calculado proporcionalmente ao período restante. Downgrade só é possível na renovação.',
              },
              {
                q: 'O que acontece se passar o limite de usuários?',
                a: 'Você pode continuar usando, mas precisará fazer upgrade para adicionar mais usuários. Nenhum dado é perdido.',
              },
              {
                q: 'O preço é em reais mesmo? Não varia com dólar?',
                a: 'Sim! O Bitrix24 Brasil cobra em reais, sem variação cambial. O preço que você vê é o preço que você paga.',
              },
              {
                q: 'Qual a diferença de contratar pela Zopu?',
                a: 'Além do mesmo preço do Bitrix24 direto, você ganha 365 dias de suporte especializado incluso e implementação com metodologia Fluidsales. Ou seja: você paga o mesmo e ganha mais.',
              },
              {
                q: 'Preciso de automações avançadas mas tenho poucos usuários. Qual plano?',
                a: 'Professional. O número de usuários não define o plano — suas necessidades definem. Se você precisa de Processos Inteligentes ilimitados, BI avançado ou automações complexas, Professional é a resposta mesmo para equipes pequenas.',
              },
              {
                q: 'O que são "Processos Inteligentes"?',
                a: 'São workflows automatizados que conectam diferentes áreas da empresa. Por exemplo: quando um negócio é fechado no CRM, automaticamente cria um projeto, notifica o financeiro e dispara uma sequência de onboarding. No Standard você tem 1.000 — no Professional, ilimitados.',
              },
            ].map((faq, idx) => (
              <Reveal key={idx} delay={0.05 * idx}>
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-2">{faq.q}</h4>
                  <p className="text-gray-600">{faq.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>

      {/* CTA Final */}
      <Reveal>
        <div className="bg-linear-to-br from-brand/5 via-brand/10 to-purple-100/50 rounded-3xl p-8 lg:p-12 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
            Ainda em dúvida sobre qual plano escolher?
          </h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Fale com um especialista Zopu. Analisamos sua operação e recomendamos o plano ideal
            para suas necessidades — não para o tamanho da sua empresa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={ZOPU_LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand text-white font-semibold rounded-xl hover:bg-brand-hover transition-all shadow-lg shadow-brand/25"
            >
              Falar no WhatsApp
            </a>
            <Link
              href="/bitrix24-vs-outras-ferramentas"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all border border-gray-200"
            >
              Comparar com outras ferramentas
            </Link>
          </div>
        </div>
      </Reveal>
    </div>
  )
}
