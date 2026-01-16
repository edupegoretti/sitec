'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
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
} from 'lucide-react'
import { Reveal, Badge, SectionHeader } from '@/components/shared'
import { ZOPU_LINKS } from '@/lib/constants'
import { cn } from '@/lib/utils'

// Types
type BillingCycle = 'monthly' | 'annual'

// Pricing data - Janeiro 2026
const PLANOS = [
  {
    id: 'free',
    nome: 'Free',
    para: 'Para testar e conhecer',
    icon: Zap,
    precoMensal: 0,
    precoAnual: 0,
    usuarios: 'Ilimitado',
    storage: '5 GB',
    destaque: false,
    color: 'gray',
    idealPara: ['Freelancers', 'Testes e avaliação', 'Projetos pessoais'],
    features: ['CRM básico', 'Tarefas e projetos', 'Chat interno', 'Calendário', 'Drive 5GB'],
  },
  {
    id: 'standard',
    nome: 'Standard',
    para: 'Para PMEs em crescimento',
    icon: Rocket,
    precoMensal: 699,
    precoAnual: 559,
    usuarios: '50',
    storage: '100 GB',
    destaque: false,
    color: 'blue',
    idealPara: ['PMEs de 5-50 usuários', 'Times de vendas estruturados', 'Empresas em crescimento'],
    features: [
      'Tudo do Free',
      'CRM completo',
      'Automações básicas',
      'E-commerce',
      'Assinatura eletrônica',
      'Suporte ao cliente',
    ],
  },
  {
    id: 'professional',
    nome: 'Professional',
    para: 'Para empresas que querem escalar',
    icon: Building2,
    precoMensal: 1399,
    precoAnual: 1119,
    usuarios: '100',
    storage: '1 TB',
    destaque: true,
    color: 'brand',
    idealPara: ['Empresas de 50-100 usuários', 'Múltiplos times', 'Operações complexas'],
    features: [
      'Tudo do Standard',
      'CRM 5X (avançado)',
      'Business Intelligence',
      'Recursos de RH',
      'Automações avançadas',
      'Controles administrativos',
    ],
  },
  {
    id: 'enterprise',
    nome: 'Enterprise',
    para: 'Para grandes operações',
    icon: Shield,
    precoMensal: 2799,
    precoAnual: 2239,
    usuarios: '250+',
    storage: '3 TB+',
    destaque: false,
    color: 'purple',
    idealPara: ['100+ usuários', 'Multi-filiais', 'Requisitos de compliance'],
    features: [
      'Tudo do Professional',
      'SLA 99.95% contratual',
      'Multi-filiais',
      'Servidor dedicado',
      '2 datacenters',
      'Segurança enterprise',
    ],
  },
]

// Feature comparison data - Simplified
const COMPARATIVO_SIMPLIFICADO = {
  'CRM & Vendas': [
    { nome: 'Leads e Negócios', free: true, standard: true, professional: true, enterprise: true },
    { nome: 'Pipeline visual (Kanban)', free: true, standard: true, professional: true, enterprise: true },
    { nome: 'Cotações e faturas', free: false, standard: true, professional: true, enterprise: true },
    { nome: 'Catálogo de produtos', free: '100', standard: '3.000', professional: '10.000', enterprise: 'Ilimitado' },
    { nome: 'Automação de vendas', free: false, standard: 'Básico', professional: 'Avançado', enterprise: 'Avançado' },
    { nome: 'Sales Intelligence (BI)', free: false, standard: false, professional: true, enterprise: true },
  ],
  'Comunicação & Colaboração': [
    { nome: 'Chat interno', free: true, standard: true, professional: true, enterprise: true },
    { nome: 'Videochamadas', free: '24 part.', standard: '48 part.', professional: '100 part.', enterprise: '100 part.' },
    { nome: 'Calendário compartilhado', free: true, standard: true, professional: true, enterprise: true },
    { nome: 'Contact Center', free: false, standard: true, professional: true, enterprise: true },
    { nome: 'Telefonia integrada', free: false, standard: true, professional: true, enterprise: true },
  ],
  'Tarefas & Projetos': [
    { nome: 'Tarefas ilimitadas', free: true, standard: true, professional: true, enterprise: true },
    { nome: 'Kanban e Gantt', free: true, standard: true, professional: true, enterprise: true },
    { nome: 'Controle de tempo', free: true, standard: true, professional: true, enterprise: true },
    { nome: 'Dependências de tarefas', free: false, standard: true, professional: true, enterprise: true },
    { nome: 'Workflows de projeto', free: false, standard: false, professional: true, enterprise: true },
  ],
  'Automação & Processos': [
    { nome: 'Regras e gatilhos', free: false, standard: 'Básico', professional: 'Avançado', enterprise: 'Avançado' },
    { nome: 'Processos inteligentes', free: false, standard: false, professional: true, enterprise: true },
    { nome: 'Webhooks e API', free: true, standard: true, professional: true, enterprise: true },
    { nome: 'RPA (automação)', free: false, standard: false, professional: true, enterprise: true },
  ],
  'Armazenamento & Segurança': [
    { nome: 'Drive', free: '5 GB', standard: '100 GB', professional: '1 TB', enterprise: '3 TB+' },
    { nome: 'Backup automático', free: true, standard: true, professional: true, enterprise: true },
    { nome: 'SLA garantido', free: false, standard: false, professional: false, enterprise: '99.95%' },
    { nome: 'Servidor dedicado', free: false, standard: false, professional: false, enterprise: true },
  ],
}

// Billing Toggle Component
function BillingToggle({
  value,
  onChange,
}: {
  value: BillingCycle
  onChange: (value: BillingCycle) => void
}) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative flex items-center p-1.5 bg-gray-100 rounded-full">
        <motion.div
          className="absolute h-[calc(100%-12px)] bg-white rounded-full shadow-md"
          initial={false}
          animate={{
            x: value === 'monthly' ? 6 : 'calc(100% + 6px)',
            width: value === 'monthly' ? 'calc(50% - 12px)' : 'calc(50% - 12px)',
          }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />

        <button
          onClick={() => onChange('monthly')}
          className={cn(
            'relative z-10 px-6 py-3 text-sm font-semibold rounded-full transition-colors duration-200',
            value === 'monthly' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'
          )}
        >
          Mensal
        </button>
        <button
          onClick={() => onChange('annual')}
          className={cn(
            'relative z-10 px-6 py-3 text-sm font-semibold rounded-full transition-colors duration-200 flex items-center gap-2',
            value === 'annual' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'
          )}
        >
          Anual
          <span
            className={cn(
              'px-2 py-0.5 text-xs font-bold rounded-full transition-colors duration-200',
              value === 'annual' ? 'bg-green-500 text-white' : 'bg-green-100 text-green-700'
            )}
          >
            -20%
          </span>
        </button>
      </div>

      <AnimatePresence mode="wait">
        {value === 'annual' && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-sm text-green-600 font-medium"
          >
            Economize 20% pagando anualmente
          </motion.p>
        )}
      </AnimatePresence>
    </div>
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
function FeatureCell({ value }: { value: boolean | string }) {
  if (value === true) {
    return <Check className="w-5 h-5 text-green-500 mx-auto" />
  }
  if (value === false) {
    return <X className="w-5 h-5 text-gray-300 mx-auto" />
  }
  return <span className="text-sm font-medium text-gray-700">{value}</span>
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
        <ChevronDown
          className={cn('w-5 h-5 text-gray-400 transition-transform', isOpen && 'rotate-180')}
        />
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
                    idx % 2 === 0 ? 'bg-gray-50/50' : 'bg-white'
                  )}
                >
                  <div className="col-span-1 text-gray-600">{feature.nome}</div>
                  <div className="text-center">
                    <FeatureCell value={feature.free} />
                  </div>
                  <div className="text-center">
                    <FeatureCell value={feature.standard} />
                  </div>
                  <div className="text-center bg-brand/5 -mx-2 px-2 rounded">
                    <FeatureCell value={feature.professional} />
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
            Compare todos os planos e escolha o ideal para sua empresa. Preços fixos em reais,
            sem surpresas.
          </p>
        </div>
      </Reveal>

      {/* Billing Toggle */}
      <Reveal delay={0.1}>
        <div className="flex justify-center mb-12">
          <BillingToggle value={billing} onChange={setBilling} />
        </div>
      </Reveal>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
        {PLANOS.map((plano, index) => {
          const Icon = plano.icon
          const currentPrice = billing === 'annual' ? plano.precoAnual : plano.precoMensal
          const savings = plano.precoMensal - plano.precoAnual

          return (
            <Reveal key={plano.id} delay={0.1 * index}>
              <div
                className={cn(
                  'relative rounded-2xl border bg-white overflow-hidden h-full flex flex-col transition-all duration-300 hover:-translate-y-1',
                  plano.destaque
                    ? 'border-brand shadow-lg shadow-brand/10 ring-2 ring-brand/20'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-lg'
                )}
              >
                {plano.destaque && (
                  <div className="absolute top-0 left-0 right-0 bg-brand text-white text-center py-1.5 text-xs font-semibold">
                    <Sparkles className="w-3 h-3 inline mr-1" />
                    Mais popular
                  </div>
                )}

                <div className={cn('p-6', plano.destaque && 'pt-10')}>
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={cn(
                        'w-10 h-10 rounded-xl flex items-center justify-center',
                        plano.destaque ? 'bg-brand/10' : 'bg-gray-100'
                      )}
                    >
                      <Icon
                        className={cn('w-5 h-5', plano.destaque ? 'text-brand' : 'text-gray-600')}
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{plano.nome}</h3>
                      <p className="text-xs text-gray-500">{plano.para}</p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={`${plano.id}-${billing}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="text-3xl font-bold text-gray-900"
                        >
                          {formatPrice(currentPrice)}
                        </motion.span>
                      </AnimatePresence>
                      {currentPrice > 0 && <span className="text-gray-500">/mês</span>}
                    </div>
                    {billing === 'annual' && savings > 0 && (
                      <p className="text-xs text-green-600 mt-1">
                        Economia de {formatPrice(savings)}/mês
                      </p>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="flex gap-4 mb-6 pb-6 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-700">{plano.usuarios}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <HardDrive className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-700">{plano.storage}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {plano.features.slice(0, 5).map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <a
                    href={ZOPU_LINKS.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      'block w-full py-3 rounded-xl font-semibold text-center transition-all',
                      plano.destaque
                        ? 'bg-brand text-white hover:bg-brand-hover shadow-lg shadow-brand/20'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
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

      {/* Para quem é cada plano */}
      <Reveal>
        <div className="mb-20">
          <SectionHeader
            label="Qual plano escolher?"
            title="Para quem é cada plano"
            description="Encontre o plano ideal para o momento da sua empresa"
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {PLANOS.map((plano, index) => (
              <Reveal key={plano.id} delay={0.05 * index}>
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="font-bold text-gray-900 mb-3">{plano.nome}</h4>
                  <ul className="space-y-2">
                    {plano.idealPara.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Comparativo Detalhado */}
      <Reveal>
        <div className="mb-20">
          <SectionHeader
            label="Comparativo completo"
            title="O que está incluído em cada plano"
            description="Veja todas as funcionalidades lado a lado"
            align="center"
          />

          <div className="mt-12 bg-white rounded-2xl border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-5 gap-4 py-4 px-4 bg-gray-50 border-b border-gray-200 sticky top-0">
              <div className="font-semibold text-gray-500 text-sm">Funcionalidade</div>
              <div className="text-center font-semibold text-gray-700">Free</div>
              <div className="text-center font-semibold text-gray-700">Standard</div>
              <div className="text-center font-semibold text-brand bg-brand/5 -mx-2 px-2 py-1 rounded">
                Professional
              </div>
              <div className="text-center font-semibold text-gray-700">Enterprise</div>
            </div>

            {/* Categories */}
            {Object.entries(COMPARATIVO_SIMPLIFICADO).map(([category, features], idx) => (
              <FeatureCategory
                key={category}
                title={category}
                features={features}
                defaultOpen={idx === 0}
              />
            ))}
          </div>
        </div>
      </Reveal>

      {/* FAQ */}
      <Reveal>
        <div className="mb-20">
          <SectionHeader
            label="Dúvidas frequentes"
            title="Perguntas sobre os planos"
            align="center"
          />

          <div className="mt-12 max-w-3xl mx-auto space-y-4">
            {[
              {
                q: 'Posso mudar de plano depois?',
                a: 'Sim! Você pode fazer upgrade a qualquer momento. O valor é calculado proporcionalmente ao período restante.',
              },
              {
                q: 'O que acontece se passar o limite de usuários?',
                a: 'Você pode continuar usando, mas precisará fazer upgrade para adicionar mais usuários. Nenhum dado é perdido.',
              },
              {
                q: 'O preço é em reais mesmo?',
                a: 'Sim! O Bitrix24 Brasil cobra em reais, sem variação cambial. O preço que você vê é o preço que você paga.',
              },
              {
                q: 'Qual a diferença de contratar pela Zopu?',
                a: 'Além do mesmo preço do Bitrix24 direto, você ganha 365 dias de suporte especializado incluso e implementação com metodologia Fluidsales.',
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
        <div className="bg-gradient-to-br from-brand/5 via-brand/10 to-purple-100/50 rounded-3xl p-8 lg:p-12 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
            Ainda em dúvida sobre qual plano escolher?
          </h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Fale com um especialista Zopu. Analisamos sua operação e recomendamos o plano ideal
            para suas necessidades.
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
