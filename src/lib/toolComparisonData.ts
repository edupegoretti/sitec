// Structured comparison data for Bitrix24 vs other tools

import { Icon } from '@phosphor-icons/react'
import { FunnelSimple, ChatsCircle, ListChecks, Robot, Database } from '@phosphor-icons/react'

export type ToolId = 'hubspot' | 'salesforce' | 'pipedrive' | 'rdstation' | 'zoho'

export interface Tool {
  id: ToolId
  name: string
  color: string
  logo: string
  tagline: string
}

export interface Feature {
  name: string
  description: string
  bitrix24: {
    available: boolean
    included: boolean
    note?: string
  }
  competitors: {
    [key in ToolId]: {
      available: boolean
      included: boolean
      addon?: string
      price?: number
      note?: string
    }
  }
}

export interface CategoryData {
  id: string
  name: string
  icon: Icon
  features: Feature[]
}

export const TOOLS: Record<ToolId, Tool> = {
  hubspot: {
    id: 'hubspot',
    name: 'HubSpot',
    color: '#FF7A59',
    logo: '/images/tools/hubspot.svg',
    tagline: 'CRM popular, mas custo cresce com a operação',
  },
  salesforce: {
    id: 'salesforce',
    name: 'Salesforce',
    color: '#00A1E0',
    logo: '/images/tools/salesforce.svg',
    tagline: 'Poderoso, mas complexo e fragmentado',
  },
  pipedrive: {
    id: 'pipedrive',
    name: 'Pipedrive',
    color: '#1A1A1A',
    logo: '/images/tools/pipedrive.svg',
    tagline: 'Simples para vendas, limitado para crescimento',
  },
  rdstation: {
    id: 'rdstation',
    name: 'RD Station',
    color: '#00A650',
    logo: '/images/tools/rdstation.svg',
    tagline: 'Focado em marketing, fraco em vendas',
  },
  zoho: {
    id: 'zoho',
    name: 'Zoho',
    color: '#D32F2F',
    logo: '/images/tools/zoho.svg',
    tagline: 'Barato mas fragmentado em 50+ apps',
  },
}

export const COMPARISON_DATA: CategoryData[] = [
  {
    id: 'crm',
    name: 'CRM & Vendas',
    icon: FunnelSimple,
    features: [
      {
        name: 'Pipeline visual completo',
        description: 'Funil de vendas com drag-and-drop e automações',
        bitrix24: { available: true, included: true },
        competitors: {
          hubspot: { available: true, included: true },
          salesforce: { available: true, included: true },
          pipedrive: { available: true, included: true },
          rdstation: { available: false, included: false },
          zoho: { available: true, included: true },
        },
      },
      {
        name: 'Telefonia VoIP integrada',
        description: 'Ligações direto no CRM com gravação',
        bitrix24: { available: true, included: true },
        competitors: {
          hubspot: { available: true, included: false, addon: 'Sales Hub Pro', price: 450 },
          salesforce: { available: true, included: false, addon: 'Service Cloud Voice', price: 380 },
          pipedrive: { available: true, included: false, addon: 'Aircall integration', price: 300 },
          rdstation: { available: false, included: false },
          zoho: { available: true, included: false, addon: 'Zoho PhoneBridge', price: 120 },
        },
      },
      {
        name: 'Email marketing',
        description: 'Campanhas, templates e automação de email',
        bitrix24: { available: true, included: true },
        competitors: {
          hubspot: { available: true, included: false, addon: 'Marketing Hub', price: 800 },
          salesforce: { available: true, included: false, addon: 'Marketing Cloud', price: 1250 },
          pipedrive: { available: true, included: false, addon: 'Campaigns add-on', price: 250 },
          rdstation: { available: true, included: true },
          zoho: { available: true, included: false, addon: 'Zoho Campaigns', price: 180 },
        },
      },
      {
        name: 'Cotações e propostas',
        description: 'Geração de orçamentos e contratos',
        bitrix24: { available: true, included: true },
        competitors: {
          hubspot: { available: true, included: false, addon: 'Sales Hub Pro', price: 450 },
          salesforce: { available: true, included: false, addon: 'CPQ', price: 750 },
          pipedrive: { available: true, included: false, addon: 'PandaDoc', price: 240 },
          rdstation: { available: false, included: false },
          zoho: { available: true, included: true },
        },
      },
      {
        name: 'Relatórios personalizados',
        description: 'Dashboards e analytics customizados',
        bitrix24: { available: true, included: true },
        competitors: {
          hubspot: { available: true, included: true },
          salesforce: { available: true, included: true },
          pipedrive: { available: true, included: true },
          rdstation: { available: true, included: true },
          zoho: { available: true, included: true },
        },
      },
    ],
  },
  {
    id: 'collaboration',
    name: 'Colaboração',
    icon: ChatsCircle,
    features: [
      {
        name: 'Chat em tempo real',
        description: 'Mensagens instantâneas com histórico',
        bitrix24: { available: true, included: true },
        competitors: {
          hubspot: { available: false, included: false, addon: 'Slack integration' },
          salesforce: { available: true, included: false, addon: 'Slack (Salesforce owns)', price: 420 },
          pipedrive: { available: false, included: false, addon: 'Slack/Teams', price: 420 },
          rdstation: { available: false, included: false },
          zoho: { available: true, included: false, addon: 'Zoho Cliq', price: 60 },
        },
      },
      {
        name: 'Videoconferência HD',
        description: 'Reuniões online até 48 participantes',
        bitrix24: { available: true, included: true },
        competitors: {
          hubspot: { available: false, included: false, addon: 'Zoom/Meet', price: 360 },
          salesforce: { available: false, included: false, addon: 'Zoom/Meet', price: 360 },
          pipedrive: { available: false, included: false, addon: 'Zoom/Meet', price: 360 },
          rdstation: { available: false, included: false },
          zoho: { available: true, included: false, addon: 'Zoho Meeting', price: 90 },
        },
      },
      {
        name: 'Feed de atividades',
        description: 'Timeline social com updates do time',
        bitrix24: { available: true, included: true },
        competitors: {
          hubspot: { available: false, included: false },
          salesforce: { available: true, included: true, note: 'Chatter' },
          pipedrive: { available: false, included: false },
          rdstation: { available: false, included: false },
          zoho: { available: true, included: false, addon: 'Zoho Connect', price: 36 },
        },
      },
      {
        name: 'Calendário compartilhado',
        description: 'Agendamento de reuniões e eventos',
        bitrix24: { available: true, included: true },
        competitors: {
          hubspot: { available: true, included: true },
          salesforce: { available: true, included: true },
          pipedrive: { available: true, included: false, addon: 'Scheduler', price: 80 },
          rdstation: { available: false, included: false },
          zoho: { available: true, included: true },
        },
      },
    ],
  },
  {
    id: 'projects',
    name: 'Gestão de Projetos',
    icon: ListChecks,
    features: [
      {
        name: 'Tarefas e kanban',
        description: 'Quadros visuais para gestão de tarefas',
        bitrix24: { available: true, included: true },
        competitors: {
          hubspot: { available: false, included: false, addon: 'Asana/Monday', price: 500 },
          salesforce: { available: false, included: false, addon: 'Asana/Monday', price: 500 },
          pipedrive: { available: false, included: false, addon: 'Asana/Monday', price: 500 },
          rdstation: { available: false, included: false },
          zoho: { available: true, included: false, addon: 'Zoho Projects', price: 120 },
        },
      },
      {
        name: 'Gráfico de Gantt',
        description: 'Timeline visual com dependências',
        bitrix24: { available: true, included: true },
        competitors: {
          hubspot: { available: false, included: false },
          salesforce: { available: false, included: false },
          pipedrive: { available: false, included: false },
          rdstation: { available: false, included: false },
          zoho: { available: true, included: false, addon: 'Zoho Projects Pro', price: 150 },
        },
      },
      {
        name: 'Timesheet integrado',
        description: 'Controle de horas trabalhadas',
        bitrix24: { available: true, included: true },
        competitors: {
          hubspot: { available: false, included: false, addon: 'Toggl', price: 180 },
          salesforce: { available: false, included: false, addon: 'Toggl', price: 180 },
          pipedrive: { available: false, included: false, addon: 'Toggl', price: 180 },
          rdstation: { available: false, included: false },
          zoho: { available: true, included: false, addon: 'Zoho Projects', price: 120 },
        },
      },
      {
        name: 'Templates de projetos',
        description: 'Modelos pré-configurados reutilizáveis',
        bitrix24: { available: true, included: true },
        competitors: {
          hubspot: { available: false, included: false },
          salesforce: { available: false, included: false },
          pipedrive: { available: false, included: false },
          rdstation: { available: false, included: false },
          zoho: { available: true, included: false, addon: 'Zoho Projects', price: 120 },
        },
      },
    ],
  },
  {
    id: 'automation',
    name: 'Automação & IA',
    icon: Robot,
    features: [
      {
        name: 'Automação sem código',
        description: 'Workflows visuais drag-and-drop',
        bitrix24: { available: true, included: true },
        competitors: {
          hubspot: { available: true, included: false, addon: 'Operations Hub', price: 800 },
          salesforce: { available: true, included: false, addon: 'Process Builder', price: 0, note: 'Limitado' },
          pipedrive: { available: true, included: false, addon: 'Workflow Automation', price: 150 },
          rdstation: { available: true, included: true, note: 'Apenas marketing' },
          zoho: { available: true, included: false, addon: 'Zoho Flow', price: 120 },
        },
      },
      {
        name: 'IA para resumos e insights',
        description: 'Copilot com sugestões automáticas',
        bitrix24: { available: true, included: true },
        competitors: {
          hubspot: { available: true, included: false, addon: 'ChatSpot', price: 450 },
          salesforce: { available: true, included: false, addon: 'Einstein', price: 500 },
          pipedrive: { available: true, included: false, addon: 'AI Sales Assistant', price: 300 },
          rdstation: { available: false, included: false },
          zoho: { available: true, included: false, addon: 'Zia AI', price: 200 },
        },
      },
      {
        name: 'Chatbots personalizados',
        description: 'Bots para atendimento e vendas',
        bitrix24: { available: true, included: true },
        competitors: {
          hubspot: { available: true, included: false, addon: 'Service Hub Pro', price: 450 },
          salesforce: { available: true, included: false, addon: 'Service Cloud', price: 750 },
          pipedrive: { available: false, included: false, addon: 'ManyChat', price: 150 },
          rdstation: { available: true, included: true, note: 'Apenas marketing' },
          zoho: { available: true, included: false, addon: 'Zoho SalesIQ', price: 140 },
        },
      },
      {
        name: 'RPA (robôs)',
        description: 'Automação de processos repetitivos',
        bitrix24: { available: true, included: true },
        competitors: {
          hubspot: { available: false, included: false },
          salesforce: { available: true, included: false, addon: 'MuleSoft', price: 2000 },
          pipedrive: { available: false, included: false },
          rdstation: { available: false, included: false },
          zoho: { available: false, included: false },
        },
      },
    ],
  },
  {
    id: 'storage',
    name: 'Dados & Storage',
    icon: Database,
    features: [
      {
        name: 'Armazenamento 1TB+',
        description: 'Espaço para documentos e arquivos',
        bitrix24: { available: true, included: true },
        competitors: {
          hubspot: { available: false, included: false, addon: 'Dropbox/GDrive', price: 300 },
          salesforce: { available: true, included: false, addon: 'Files Connect', price: 250 },
          pipedrive: { available: false, included: false, addon: 'Dropbox/GDrive', price: 300 },
          rdstation: { available: false, included: false },
          zoho: { available: true, included: false, addon: 'Zoho WorkDrive', price: 120 },
        },
      },
      {
        name: 'Dados centralizados',
        description: 'Base única sem sincronização',
        bitrix24: { available: true, included: true },
        competitors: {
          hubspot: { available: false, included: false },
          salesforce: { available: false, included: false },
          pipedrive: { available: false, included: false },
          rdstation: { available: false, included: false },
          zoho: { available: false, included: false, note: '50+ apps separados' },
        },
      },
      {
        name: 'Backup automático',
        description: 'Cópias diárias com restore rápido',
        bitrix24: { available: true, included: true },
        competitors: {
          hubspot: { available: true, included: true },
          salesforce: { available: true, included: false, addon: 'Backup & Restore', price: 300 },
          pipedrive: { available: false, included: false, note: 'Manual' },
          rdstation: { available: true, included: true },
          zoho: { available: true, included: false, addon: 'Zoho Backup', price: 60 },
        },
      },
      {
        name: 'Versionamento de arquivos',
        description: 'Histórico de alterações em documentos',
        bitrix24: { available: true, included: true },
        competitors: {
          hubspot: { available: false, included: false },
          salesforce: { available: true, included: true },
          pipedrive: { available: false, included: false },
          rdstation: { available: false, included: false },
          zoho: { available: true, included: true },
        },
      },
    ],
  },
]

// TCO Pricing data (monthly, 30 users baseline)
export const TCO_PRICING: Record<ToolId, {
  base: number
  perUser: number
  addons: { name: string; cost: number }[]
  totalForUsers: (users: number) => number
}> = {
  hubspot: {
    base: 2400,
    perUser: 80,
    addons: [
      { name: 'Marketing Hub', cost: 800 },
      { name: 'Sales Hub Pro', cost: 450 },
      { name: 'Service Hub', cost: 450 },
    ],
    totalForUsers: (users) => {
      if (users <= 5) return 2400 + 1700
      if (users <= 30) return 2400 + (users - 5) * 80 + 1700
      return 2400 + (30 - 5) * 80 + (users - 30) * 100 + 1700
    },
  },
  salesforce: {
    base: 1800,
    perUser: 150,
    addons: [
      { name: 'Marketing Cloud', cost: 1250 },
      { name: 'Service Cloud', cost: 750 },
      { name: 'CPQ', cost: 750 },
    ],
    totalForUsers: (users) => {
      return 1800 + users * 150 + 2750
    },
  },
  pipedrive: {
    base: 600,
    perUser: 60,
    addons: [
      { name: 'Campaigns', cost: 250 },
      { name: 'Asana', cost: 500 },
      { name: 'Aircall', cost: 300 },
      { name: 'Slack', cost: 420 },
    ],
    totalForUsers: (users) => {
      return 600 + users * 60 + 1470
    },
  },
  rdstation: {
    base: 1200,
    perUser: 40,
    addons: [
      { name: 'Pipedrive CRM', cost: 600 },
      { name: 'Asana', cost: 500 },
      { name: 'Slack', cost: 420 },
    ],
    totalForUsers: (users) => {
      return 1200 + users * 40 + 1520
    },
  },
  zoho: {
    base: 800,
    perUser: 50,
    addons: [
      { name: 'Zoho Projects', cost: 120 },
      { name: 'Zoho Campaigns', cost: 180 },
      { name: 'Zoho Meeting', cost: 90 },
      { name: 'Zoho Cliq', cost: 60 },
    ],
    totalForUsers: (users) => {
      return 800 + users * 50 + 450
    },
  },
}
