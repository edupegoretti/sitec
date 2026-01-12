// Dados dos apps para calculadora de economia
// Preços baseados na calculadora oficial do Bitrix24 (Dez/2025)

export interface AppData {
  id: string
  name: string
  pricePerUser: number // em BRL
  category: 'crm' | 'project' | 'communication' | 'productivity' | 'marketing' | 'ai'
  logo: string
  popular?: boolean
}

export const CALCULATOR_APPS: AppData[] = [
  // CRM
  {
    id: 'salesforce',
    name: 'Salesforce',
    pricePerUser: 157,
    category: 'crm',
    logo: '/images/tools/salesforce.svg',
    popular: true,
  },
  {
    id: 'hubspot',
    name: 'HubSpot',
    pricePerUser: 84,
    category: 'crm',
    logo: '/images/tools/hubspot.svg',
    popular: true,
  },
  {
    id: 'pipedrive',
    name: 'Pipedrive',
    pricePerUser: 303,
    category: 'crm',
    logo: '/images/tools/pipedrive.svg',
  },
  {
    id: 'kommo',
    name: 'Kommo',
    pricePerUser: 132,
    category: 'crm',
    logo: '/images/tools/kommo.svg',
  },
  {
    id: 'zoho',
    name: 'Zoho CRM',
    pricePerUser: 217,
    category: 'crm',
    logo: '/images/tools/zoho.svg',
  },
  // Marketing
  {
    id: 'rdstation',
    name: 'RD Station',
    pricePerUser: 61,
    category: 'marketing',
    logo: '/images/tools/rdstation.svg',
    popular: true,
  },
  // Gestão de Projetos
  {
    id: 'asana',
    name: 'Asana',
    pricePerUser: 76,
    category: 'project',
    logo: '/images/tools/asana.svg',
    popular: true,
  },
  {
    id: 'monday',
    name: 'Monday',
    pricePerUser: 88,
    category: 'project',
    logo: '/images/tools/monday.svg',
  },
  {
    id: 'jira',
    name: 'Jira',
    pricePerUser: 48,
    category: 'project',
    logo: '/images/tools/jira.svg',
  },
  {
    id: 'trello',
    name: 'Trello',
    pricePerUser: 34,
    category: 'project',
    logo: '/images/tools/trello.svg',
  },
  {
    id: 'clickup',
    name: 'ClickUp',
    pricePerUser: 105,
    category: 'project',
    logo: '/images/tools/clickup.svg',
  },
  {
    id: 'wrike',
    name: 'Wrike',
    pricePerUser: 140,
    category: 'project',
    logo: '/images/tools/wrike.svg',
  },
  // Comunicação & Produtividade
  {
    id: 'googledrive',
    name: 'Google Workspace',
    pricePerUser: 63,
    category: 'productivity',
    logo: '/images/tools/google-workspace.svg',
    popular: true,
  },
  {
    id: 'miro',
    name: 'Miro',
    pricePerUser: 56,
    category: 'productivity',
    logo: '/images/tools/miro.svg',
  },
  {
    id: 'calendly',
    name: 'Calendly',
    pricePerUser: 67,
    category: 'productivity',
    logo: '/images/tools/calendly.svg',
  },
  {
    id: 'clockify',
    name: 'Clockify',
    pricePerUser: 39,
    category: 'productivity',
    logo: '/images/tools/clockify.svg',
  },
  // IA
  {
    id: 'chatgpt',
    name: 'ChatGPT Plus',
    pricePerUser: 112,
    category: 'ai',
    logo: '/images/tools/chatgpt.svg',
    popular: true,
  },
]

// Categorias para filtro opcional
export const APP_CATEGORIES = {
  crm: { name: 'CRM & Vendas', color: '#FF6B35' },
  project: { name: 'Projetos', color: '#7C3AED' },
  communication: { name: 'Comunicação', color: '#10B981' },
  productivity: { name: 'Produtividade', color: '#3B82F6' },
  marketing: { name: 'Marketing', color: '#EC4899' },
  ai: { name: 'Inteligência Artificial', color: '#F59E0B' },
}

// Preços do Bitrix24 por faixa de usuários (mensal)
export const BITRIX24_PRICING = [
  { maxUsers: 5, price: 0, plan: 'Free' },
  { maxUsers: 24, price: 249, plan: 'Basic' },
  { maxUsers: 50, price: 499, plan: 'Standard' },
  { maxUsers: 100, price: 699, plan: 'Professional' },
  { maxUsers: 250, price: 1399, plan: 'Enterprise 250' },
  { maxUsers: 500, price: 2799, plan: 'Enterprise 500' },
  { maxUsers: 1000, price: 5599, plan: 'Enterprise 1000' },
  { maxUsers: 10000, price: 11199, plan: 'Enterprise 10000' },
]

export function getBitrix24Price(users: number): { price: number; plan: string } {
  for (const tier of BITRIX24_PRICING) {
    if (users <= tier.maxUsers) {
      return { price: tier.price, plan: tier.plan }
    }
  }
  return { price: 11199, plan: 'Enterprise 10000' }
}

// Features incluídas no Bitrix24 (para exibir ao lado)
export const BITRIX24_FEATURES = [
  { id: 'crm', name: 'CRM completo', icon: 'FunnelSimple' },
  { id: 'projects', name: 'Tarefas e projetos', icon: 'ListChecks' },
  { id: 'chat', name: 'Chat e videochamadas', icon: 'ChatsCircle' },
  { id: 'drive', name: 'Drive ilimitado', icon: 'HardDrives' },
  { id: 'calendar', name: 'Calendário integrado', icon: 'CalendarBlank' },
  { id: 'time', name: 'Controle de tempo', icon: 'Clock' },
  { id: 'automation', name: 'Automações', icon: 'Robot' },
  { id: 'ai', name: 'CoPilot IA incluso', icon: 'Brain' },
]
