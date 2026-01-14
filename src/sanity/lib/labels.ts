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

