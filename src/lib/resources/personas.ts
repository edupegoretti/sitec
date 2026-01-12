export type ResourcePersonaId =
  | 'ceo'
  | 'diretor-comercial'
  | 'gestor-marketing'
  | 'diretor-operacoes'

export type ResourcePersona = {
  id: ResourcePersonaId
  label: string
  dor: string
  desejo: string
  promessa: string
}

// Fonte das personas: BRAND.md e ZOPU_MARKETING_MASTER.md (seção "Personas e Dores")
export const RESOURCE_PERSONAS: readonly ResourcePersona[] = [
  {
    id: 'ceo',
    label: 'CEO / Empresário / Dono',
    dor: 'Minha empresa depende demais de mim',
    desejo: 'Processos que funcionam sem ele',
    promessa: 'Sua empresa funcionando. Com ou sem você.',
  },
  {
    id: 'diretor-comercial',
    label: 'Diretor Comercial',
    dor: 'Meu pipeline está uma bagunça',
    desejo: 'Visibilidade e previsibilidade',
    promessa: 'De pipeline bagunçado a receita previsível.',
  },
  {
    id: 'gestor-marketing',
    label: 'Gestor de Marketing',
    dor: 'Vendas diz que meus leads são ruins',
    desejo: 'Alinhamento com vendas',
    promessa: 'Marketing e vendas no mesmo sistema = mesma fonte de verdade.',
  },
  {
    id: 'diretor-operacoes',
    label: 'Diretor de Operações',
    dor: 'Cada um faz de um jeito',
    desejo: 'Padronização e escala',
    promessa: 'Processos na plataforma, não nas pessoas.',
  },
] as const

export function isResourcePersonaId(value: string): value is ResourcePersonaId {
  return RESOURCE_PERSONAS.some((persona) => persona.id === value)
}
