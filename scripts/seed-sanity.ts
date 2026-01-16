/**
 * Script para popular o Sanity com dados iniciais
 * Execute: npx tsx scripts/seed-sanity.ts
 */

import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'

// Carrega variáveis de ambiente
dotenv.config({ path: '.env.local' })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_WRITE_TOKEN

if (!projectId) {
  console.error('❌ NEXT_PUBLIC_SANITY_PROJECT_ID não configurado no .env.local')
  process.exit(1)
}

if (!token) {
  console.error(`
❌ SANITY_API_WRITE_TOKEN não configurado no .env.local

Para criar um token de escrita:
1. Acesse: https://www.sanity.io/manage/project/${projectId}/api#tokens
2. Clique em "Add API token"
3. Nome: "Seed Script"
4. Permissões: "Editor" (precisa de permissão de escrita)
5. Copie o token e adicione no .env.local:

   SANITY_API_WRITE_TOKEN=seu_token_aqui
`)
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2025-01-01',
  useCdn: false,
})

// ============================================
// DADOS PARA CRIAR
// ============================================

const CATEGORIAS = [
  {
    _type: 'theme',
    title: 'Vendas',
    slug: { _type: 'slug', current: 'vendas' },
    description: 'Processo comercial, técnicas de venda, negociação, gestão de pipeline e metas.',
    order: 10,
  },
  {
    _type: 'theme',
    title: 'Marketing',
    slug: { _type: 'slug', current: 'marketing' },
    description: 'Geração de demanda, leads, campanhas, conversão e automação de marketing.',
    order: 20,
  },
  {
    _type: 'theme',
    title: 'Operações',
    slug: { _type: 'slug', current: 'operacoes' },
    description: 'Processos, automação, integração, eficiência operacional e RevOps.',
    order: 30,
  },
  {
    _type: 'theme',
    title: 'Clientes',
    slug: { _type: 'slug', current: 'clientes' },
    description: 'Customer Success, atendimento, retenção e experiência do cliente.',
    order: 40,
  },
  {
    _type: 'theme',
    title: 'Dados',
    slug: { _type: 'slug', current: 'dados' },
    description: 'Métricas, BI, analytics, KPIs e decisão baseada em dados.',
    order: 50,
  },
  {
    _type: 'theme',
    title: 'Tecnologia',
    slug: { _type: 'slug', current: 'tecnologia' },
    description: 'Ferramentas, Bitrix24, CRM, produtividade e transformação digital.',
    order: 60,
  },
  {
    _type: 'theme',
    title: 'Gestão',
    slug: { _type: 'slug', current: 'gestao' },
    description: 'Estratégia, liderança, planejamento, OKRs e escala empresarial.',
    order: 70,
  },
]

const INTERESSES = [
  {
    _type: 'interest',
    title: 'Minha equipe não bate meta',
    slug: { _type: 'slug', current: 'equipe-nao-bate-meta' },
    description: 'Conteúdos para gestores que enfrentam times comerciais com baixa performance.',
    order: 10,
  },
  {
    _type: 'interest',
    title: 'Perco vendas por falta de follow-up',
    slug: { _type: 'slug', current: 'falta-follow-up' },
    description: 'Conteúdos sobre como criar sistemas de acompanhamento e não perder oportunidades.',
    order: 11,
  },
  {
    _type: 'interest',
    title: 'Não sei prever quanto vou vender',
    slug: { _type: 'slug', current: 'previsibilidade-vendas' },
    description: 'Conteúdos sobre forecast, pipeline e previsibilidade comercial.',
    order: 12,
  },
  {
    _type: 'interest',
    title: 'Preciso de mais leads',
    slug: { _type: 'slug', current: 'mais-leads' },
    description: 'Estratégias para gerar mais leads qualificados e encher o pipeline.',
    order: 20,
  },
  {
    _type: 'interest',
    title: 'Meus leads são ruins',
    slug: { _type: 'slug', current: 'leads-ruins' },
    description: 'Como melhorar a qualidade dos leads e alinhar marketing e vendas.',
    order: 21,
  },
  {
    _type: 'interest',
    title: 'Perco tempo com tarefas manuais',
    slug: { _type: 'slug', current: 'tarefas-manuais' },
    description: 'Conteúdos sobre automação e eliminação de retrabalho.',
    order: 30,
  },
  {
    _type: 'interest',
    title: 'Meus sistemas não conversam',
    slug: { _type: 'slug', current: 'sistemas-nao-conversam' },
    description: 'Guias sobre integração de ferramentas e fim dos silos de dados.',
    order: 31,
  },
  {
    _type: 'interest',
    title: 'Não tenho visibilidade do negócio',
    slug: { _type: 'slug', current: 'falta-visibilidade' },
    description: 'Conteúdos sobre dashboards, métricas e tomada de decisão.',
    order: 40,
  },
  {
    _type: 'interest',
    title: 'Minha empresa depende de mim',
    slug: { _type: 'slug', current: 'empresa-depende-de-mim' },
    description: 'Conteúdos para empresários que querem escalar sem serem o gargalo.',
    order: 41,
  },
  {
    _type: 'interest',
    title: 'Meus clientes estão cancelando',
    slug: { _type: 'slug', current: 'clientes-cancelando' },
    description: 'Estratégias para reduzir churn e aumentar retenção.',
    order: 50,
  },
  {
    _type: 'interest',
    title: 'Preciso escolher um CRM',
    slug: { _type: 'slug', current: 'escolher-crm' },
    description: 'Comparativos e guias para escolher a ferramenta certa.',
    order: 60,
  },
  {
    _type: 'interest',
    title: 'Quero vender mais',
    slug: { _type: 'slug', current: 'quero-vender-mais' },
    description: 'Conteúdos para quem quer escalar as vendas.',
    order: 70,
  },
  {
    _type: 'interest',
    title: 'Quero automatizar processos',
    slug: { _type: 'slug', current: 'quero-automatizar' },
    description: 'Guias práticos de automação para ganhar eficiência.',
    order: 71,
  },
  {
    _type: 'interest',
    title: 'Quero ter dados para decidir',
    slug: { _type: 'slug', current: 'dados-para-decidir' },
    description: 'Conteúdos sobre cultura data-driven e analytics.',
    order: 72,
  },
  {
    _type: 'interest',
    title: 'Quero usar IA no meu negócio',
    slug: { _type: 'slug', current: 'usar-ia-negocio' },
    description: 'Aplicações práticas de inteligência artificial para empresas.',
    order: 73,
  },
]

const AUTOR_PADRAO = {
  _type: 'author',
  name: 'Equipe Zopu',
  slug: { _type: 'slug', current: 'equipe-zopu' },
  role: 'Especialistas em operações comerciais',
  bio: [
    {
      _type: 'block',
      _key: 'bio1',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'span1',
          text: 'Conteúdos criados pela equipe de especialistas da Zopu, com foco em operações comerciais, CRM e transformação digital.',
        },
      ],
    },
  ],
}

// ============================================
// EXECUÇÃO
// ============================================

async function seed() {
  console.log('🚀 Iniciando seed do Sanity...\n')

  // Verificar se já existem dados
  const existingThemes = await client.fetch(`count(*[_type == "theme"])`)
  const existingInterests = await client.fetch(`count(*[_type == "interest"])`)
  const existingAuthors = await client.fetch(`count(*[_type == "author"])`)

  if (existingThemes > 0 || existingInterests > 0 || existingAuthors > 0) {
    console.log(`📊 Dados existentes encontrados:`)
    console.log(`   - Temas: ${existingThemes}`)
    console.log(`   - Interesses: ${existingInterests}`)
    console.log(`   - Autores: ${existingAuthors}`)
    console.log('')

    const readline = await import('readline')
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    })

    const answer = await new Promise<string>((resolve) => {
      rl.question('⚠️  Deseja continuar e adicionar os dados faltantes? (s/n): ', resolve)
    })
    rl.close()

    if (answer.toLowerCase() !== 's') {
      console.log('❌ Operação cancelada.')
      process.exit(0)
    }
    console.log('')
  }

  // Criar categorias (temas)
  console.log('📁 Criando categorias...')
  let categoriasCreated = 0
  for (const categoria of CATEGORIAS) {
    const exists = await client.fetch(
      `*[_type == "theme" && slug.current == $slug][0]`,
      { slug: categoria.slug.current }
    )
    if (!exists) {
      await client.create(categoria)
      console.log(`   ✅ ${categoria.title}`)
      categoriasCreated++
    } else {
      console.log(`   ⏭️  ${categoria.title} (já existe)`)
    }
  }
  console.log(`   → ${categoriasCreated} categorias criadas\n`)

  // Criar interesses
  console.log('🎯 Criando interesses...')
  let interessesCreated = 0
  for (const interesse of INTERESSES) {
    const exists = await client.fetch(
      `*[_type == "interest" && slug.current == $slug][0]`,
      { slug: interesse.slug.current }
    )
    if (!exists) {
      await client.create(interesse)
      console.log(`   ✅ ${interesse.title}`)
      interessesCreated++
    } else {
      console.log(`   ⏭️  ${interesse.title} (já existe)`)
    }
  }
  console.log(`   → ${interessesCreated} interesses criados\n`)

  // Criar autor padrão
  console.log('👤 Criando autor padrão...')
  const authorExists = await client.fetch(
    `*[_type == "author" && slug.current == $slug][0]`,
    { slug: AUTOR_PADRAO.slug.current }
  )
  if (!authorExists) {
    await client.create(AUTOR_PADRAO)
    console.log(`   ✅ ${AUTOR_PADRAO.name}`)
  } else {
    console.log(`   ⏭️  ${AUTOR_PADRAO.name} (já existe)`)
  }

  console.log('\n✨ Seed concluído!')
  console.log('\n📋 Próximos passos:')
  console.log('   1. Acesse http://localhost:3000/studio')
  console.log('   2. Verifique se os dados foram criados')
  console.log('   3. Crie seu primeiro post!')
}

seed().catch((err) => {
  console.error('❌ Erro durante o seed:', err)
  process.exit(1)
})
