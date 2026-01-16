export type PostStage = 'diagnostico' | 'estruturacao' | 'implementacao' | 'otimizacao' | 'decisao'

export type PostFormat = 'artigo' | 'guia' | 'playbook' | 'template' | 'caso' | 'comparativo'

export const STAGE_LABEL: Record<PostStage, string> = {
  diagnostico: 'Diagnóstico',
  estruturacao: 'Estruturação',
  implementacao: 'Implementação',
  otimizacao: 'Otimização',
  decisao: 'Decisão',
}

export const FORMAT_LABEL: Record<PostFormat, string> = {
  artigo: 'Artigo',
  guia: 'Guia',
  playbook: 'Playbook',
  template: 'Template',
  caso: 'Caso',
  comparativo: 'Comparativo',
}

// Intenções do visitante - mapeamento de formatos
export type PostIntent = 'aprender' | 'aplicar' | 'decidir'

export const INTENT_LABEL: Record<PostIntent, string> = {
  aprender: 'Aprender',
  aplicar: 'Aplicar',
  decidir: 'Decidir',
}

export const INTENT_DESCRIPTION: Record<PostIntent, string> = {
  aprender: 'Artigos e guias para entender conceitos',
  aplicar: 'Templates e playbooks prontos para usar',
  decidir: 'Cases e comparativos para avaliar opções',
}

export const FORMAT_TO_INTENT: Record<PostFormat, PostIntent> = {
  artigo: 'aprender',
  guia: 'aprender',
  playbook: 'aplicar',
  template: 'aplicar',
  caso: 'decidir',
  comparativo: 'decidir',
}

export const INTENT_FORMATS: Record<PostIntent, PostFormat[]> = {
  aprender: ['artigo', 'guia'],
  aplicar: ['playbook', 'template'],
  decidir: ['caso', 'comparativo'],
}

