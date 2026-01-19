'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Factory,
  Heart,
  ShieldCheck,
  Plane,
  Briefcase,
  Code,
  Phone,
  MessageCircle,
  Plug,
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  FileSpreadsheet,
  Boxes,
  UserX,
  UserMinus,
  PhoneOff,
  Clock,
  Calendar,
  EyeOff,
  User,
  Unplug,
  GitBranch,
  Link as LinkIcon,
  Brain,
  BarChart3,
  Map,
  Users,
  Headphones,
  CheckCircle2,
  Bell,
  FileText,
  Shield,
  Lock,
  Award,
  ClipboardCheck,
  Cog,
  FileCheck,
  Globe,
  RefreshCw,
  Zap,
  LayoutGrid,
  BookOpen,
  Calculator,
  Filter,
  Rocket,
  Mic,
  DollarSign,
  FileSearch,
  Bot,
  Settings,
  MessageSquare,
  Smartphone,
  Database,
  Copy,
  FileWarning,
  Mail,
  ShoppingCart,
  Workflow,
  ArrowRight,
  Check,
  Plus,
  Minus,
} from 'lucide-react'
import { Container } from '@/components/layout'
import { Reveal } from '@/components/shared'
import type { VerticalData } from '@/lib/constants'
import { ZOPU_LINKS } from '@/lib/constants'
import { useState } from 'react'

const customEase: [number, number, number, number] = [0.16, 1, 0.3, 1]

// Icon mapping
const iconMap: Record<string, React.ElementType> = {
  Factory,
  Heart,
  ShieldCheck,
  Plane,
  Briefcase,
  Code,
  Phone,
  MessageCircle,
  Plug,
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  FileSpreadsheet,
  Boxes,
  UserX,
  UserMinus,
  PhoneOff,
  Clock,
  Calendar,
  EyeOff,
  User,
  Unplug,
  GitBranch,
  Link: LinkIcon,
  Brain,
  BarChart3,
  Map,
  Users,
  Headphones,
  MessageSquareCheck: CheckCircle2,
  Bell,
  FileText,
  Shield,
  Lock,
  Award,
  ClipboardCheck,
  Cog,
  FileCheck,
  Globe,
  RefreshCw,
  Zap,
  Kanban: LayoutGrid,
  BookOpen,
  Calculator,
  Filter,
  Rocket,
  Mic,
  DollarSign,
  FileSearch,
  Bot,
  Settings,
  MessageSquare,
  Smartphone,
  Database,
  Copy,
  FileWarning,
  Mail,
  ShoppingCart,
  Workflow,
}

function getIcon(iconName: string): React.ElementType {
  return iconMap[iconName] || AlertTriangle
}

// ============================================
// HERO SECTION
// ============================================
function HeroVertical({ vertical }: { vertical: VerticalData }) {
  const Icon = getIcon(vertical.icon)

  return (
    <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-b from-gray-50 to-white" />
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Accent gradient */}
      <div
        className="absolute top-0 right-0 w-150 h-150 rounded-full blur-[150px] opacity-20 -translate-y-1/2 translate-x-1/4"
        style={{ backgroundColor: vertical.cor }}
      />

      <Container className="relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <Reveal>
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{
                backgroundColor: vertical.corLight,
                border: `1px solid ${vertical.cor}30`,
              }}
            >
              <Icon className="w-4 h-4" style={{ color: vertical.cor }} />
              <span className="text-sm font-semibold" style={{ color: vertical.cor }}>
                Solução para {vertical.nome}
              </span>
            </div>
          </Reveal>

          {/* Headline */}
          <Reveal delay={0.1}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {vertical.headline}
            </h1>
          </Reveal>

          {/* Subheadline */}
          <Reveal delay={0.2}>
            <p className="text-xl sm:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto">
              {vertical.subheadline}
            </p>
          </Reveal>

          {/* Metric highlight */}
          <Reveal delay={0.3}>
            <motion.div
              className="inline-flex flex-col items-center gap-2 px-8 py-6 bg-white rounded-2xl shadow-lg border border-gray-100"
              whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
              transition={{ duration: 0.3 }}
            >
              <span
                className="text-5xl sm:text-6xl font-bold"
                style={{ color: vertical.cor }}
              >
                {vertical.metricaDestaque.valor}
              </span>
              <span className="text-gray-600 font-medium">
                {vertical.metricaDestaque.label}
              </span>
            </motion.div>
          </Reveal>

          {/* CTA */}
          <Reveal delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <a
                href={ZOPU_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-all hover:scale-105"
                style={{ backgroundColor: vertical.cor }}
              >
                Falar com especialista
                <ArrowRight className="w-5 h-5" />
              </a>
              <Link
                href="/revopslaunch"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border border-gray-200 rounded-xl font-semibold text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-all"
              >
                Ver metodologia
              </Link>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}

// ============================================
// PROBLEMAS SECTION
// ============================================
function ProblemasSection({ vertical }: { vertical: VerticalData }) {
  return (
    <section className="py-20 sm:py-28 bg-white">
      <Container>
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <Reveal>
              <p className="text-red-500 font-semibold text-sm uppercase tracking-wider mb-4">
                Os desafios
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Problemas comuns em{' '}
                <span style={{ color: vertical.cor }}>{vertical.nome}</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Reconhece algum desses cenários?
              </p>
            </Reveal>
          </div>

          {/* Problems grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {vertical.problemas.map((problema, index) => {
              const Icon = getIcon(problema.icon)
              return (
                <motion.div
                  key={problema.titulo}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + index * 0.1, duration: 0.5, ease: customEase }}
                >
                  <div className="flex items-start gap-4 p-6 bg-red-50/50 rounded-2xl border border-red-100 h-full">
                    <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6 text-red-500" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">{problema.titulo}</h3>
                      <p className="text-gray-600">{problema.descricao}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}

// ============================================
// SOLUCOES SECTION
// ============================================
function SolucoesSection({ vertical }: { vertical: VerticalData }) {
  return (
    <section className="py-20 sm:py-28 bg-gray-50">
      <Container>
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <Reveal>
              <p
                className="font-semibold text-sm uppercase tracking-wider mb-4"
                style={{ color: vertical.cor }}
              >
                A solução
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Como o Bitrix24 resolve
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Funcionalidades que transformam sua operação
              </p>
            </Reveal>
          </div>

          {/* Solutions grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {vertical.solucoes.map((solucao, index) => {
              const Icon = getIcon(solucao.icon)
              return (
                <motion.div
                  key={solucao.titulo}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + index * 0.1, duration: 0.5, ease: customEase }}
                >
                  <div className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow h-full">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: vertical.corLight }}
                    >
                      <Icon className="w-6 h-6" style={{ color: vertical.cor }} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">{solucao.titulo}</h3>
                      <p className="text-gray-600">{solucao.descricao}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}

// ============================================
// DIFERENCIAIS SECTION
// ============================================
function DiferenciaisSection({ vertical }: { vertical: VerticalData }) {
  return (
    <section className="py-20 sm:py-28 bg-white">
      <Container>
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <Reveal>
              <p
                className="font-semibold text-sm uppercase tracking-wider mb-4"
                style={{ color: vertical.cor }}
              >
                Por que Zopu
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Diferenciais para {vertical.nome}
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                O que faz a diferença na implementação
              </p>
            </Reveal>
          </div>

          {/* Differentials grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {vertical.diferenciais.map((dif, index) => {
              const Icon = getIcon(dif.icon)
              return (
                <motion.div
                  key={dif.titulo}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + index * 0.1, duration: 0.5, ease: customEase }}
                >
                  <div className="text-center p-6 bg-gray-50 rounded-2xl border border-gray-100 h-full">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4"
                      style={{ backgroundColor: vertical.corLight }}
                    >
                      <Icon className="w-7 h-7" style={{ color: vertical.cor }} />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">{dif.titulo}</h3>
                    <p className="text-sm text-gray-600">{dif.descricao}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}

// ============================================
// CASES SECTION
// ============================================
function CasesSection({ vertical }: { vertical: VerticalData }) {
  if (!vertical.cases || vertical.cases.length === 0) return null

  const caseData = vertical.cases[0]

  return (
    <section className="py-20 sm:py-28 bg-gray-900">
      <Container>
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <p className="text-gray-400 font-semibold text-sm uppercase tracking-wider mb-4">
              Case de sucesso
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <p
              className="text-4xl sm:text-5xl font-bold mb-4"
              style={{ color: vertical.cor }}
            >
              {caseData.metrica}
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <blockquote className="text-xl sm:text-2xl text-white font-medium mb-6 italic">
              "{caseData.quote}"
            </blockquote>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="text-gray-400">
              — {caseData.empresa}
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}

// ============================================
// FAQ SECTION
// ============================================
function FAQItem({
  pergunta,
  resposta,
  isOpen,
  onClick,
  cor,
}: {
  pergunta: string
  resposta: string
  isOpen: boolean
  onClick: () => void
  cor: string
}) {
  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        onClick={onClick}
        className="w-full py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-gray-900 pr-4">{pergunta}</span>
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors"
          style={{ backgroundColor: isOpen ? cor : '#f3f4f6' }}
        >
          {isOpen ? (
            <Minus className="w-4 h-4 text-white" />
          ) : (
            <Plus className="w-4 h-4 text-gray-600" />
          )}
        </div>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: customEase }}
        className="overflow-hidden"
      >
        <p className="pb-5 text-gray-600 leading-relaxed">{resposta}</p>
      </motion.div>
    </div>
  )
}

function FAQSection({ vertical }: { vertical: VerticalData }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  if (!vertical.faq || vertical.faq.length === 0) return null

  return (
    <section className="py-20 sm:py-28 bg-gray-50">
      <Container>
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Reveal>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Perguntas frequentes
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-lg text-gray-600">
                Dúvidas comuns sobre Bitrix24 para {vertical.nome}
              </p>
            </Reveal>
          </div>

          {/* FAQ items */}
          <Reveal delay={0.2}>
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden px-6">
              {vertical.faq.map((item, index) => (
                <FAQItem
                  key={index}
                  pergunta={item.pergunta}
                  resposta={item.resposta}
                  isOpen={openIndex === index}
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  cor={vertical.cor}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}

// ============================================
// CTA SECTION
// ============================================
function CTASection({ vertical }: { vertical: VerticalData }) {
  return (
    <section className="py-20 sm:py-28 bg-white">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div
            className="relative rounded-3xl p-8 sm:p-12 lg:p-16 overflow-hidden"
            style={{ backgroundColor: vertical.cor }}
          >
            {/* Background pattern */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
                backgroundSize: '24px 24px',
              }}
            />

            <div className="relative text-center">
              <Reveal>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  Pronto para transformar sua operação?
                </h2>
              </Reveal>

              <Reveal delay={0.1}>
                <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                  Converse com um especialista em 20 minutos. Vamos entender seu cenário
                  e indicar o caminho mais seguro.
                </p>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href={ZOPU_LINKS.whatsappEspecialista}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white rounded-xl font-semibold transition-all hover:scale-105"
                    style={{ color: vertical.cor }}
                  >
                    Falar com especialista
                    <ArrowRight className="w-5 h-5" />
                  </a>
                  <Link
                    href="/por-que-bitrix24"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 border border-white/30 rounded-xl font-semibold text-white hover:bg-white/20 transition-all"
                  >
                    Conhecer a plataforma
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

// ============================================
// MAIN TEMPLATE
// ============================================
export function VerticalPageTemplate({ vertical }: { vertical: VerticalData }) {
  return (
    <main>
      <HeroVertical vertical={vertical} />
      <ProblemasSection vertical={vertical} />
      <SolucoesSection vertical={vertical} />
      <DiferenciaisSection vertical={vertical} />
      <CasesSection vertical={vertical} />
      <FAQSection vertical={vertical} />
      <CTASection vertical={vertical} />
    </main>
  )
}
