'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { Target, Puzzle, Headphones } from 'lucide-react'
import { Container } from '@/components/layout'
import { Badge, Reveal } from '@/components/shared'
import { cn } from '@/lib/utils'
import { FileText, Sparkles, CheckCircle2 } from 'lucide-react'

// ============================================================================
// TYPES & CONSTANTS
// ============================================================================

interface Etapa {
  id: string
  numero: string
  titulo: string
  subtitulo: string
  descricao: string
  duracao: string
  icon: React.ElementType
  cor: string
  corSecundaria: string
  itens: string[]
}

const ETAPAS: Etapa[] = [
  {
    id: 'arquitetura',
    numero: '01',
    titulo: 'Arquitetura de Receita',
    subtitulo: '(antes do CRM)',
    descricao:
      'Primeiro entendemos seu modelo de go-to-market, mapeamos jornada do lead→cliente, definimos regras de qualificação, SLAs entre times e métricas de cada etapa.',
    duracao: '7 dias',
    icon: Target,
    cor: '#3B82F6',
    corSecundaria: '#60A5FA',
    itens: [
      'Mapeamento do modelo de go-to-market',
      'Jornada lead → cliente documentada',
      'Regras de qualificação definidas',
      'SLAs entre Marketing, Vendas e CS',
    ],
  },
  {
    id: 'implementacao',
    numero: '02',
    titulo: 'Implementação no Bitrix24',
    subtitulo: '(com integrações)',
    descricao:
      'Traduzimos esse blueprint em configurações concretas: pipelines, automações, dashboards, integração com WhatsApp (WhatsZopu), ERP e outras ferramentas críticas.',
    duracao: '30 dias',
    icon: Puzzle,
    cor: '#8B5CF6',
    corSecundaria: '#A78BFA',
    itens: [
      'Pipelines e funis configurados',
      'Automações e workflows',
      'Dashboards de gestão',
      'Integrações (WhatsApp, ERP, etc.)',
    ],
  },
  {
    id: 'adocao',
    numero: '03',
    titulo: 'Adoção Assistida',
    subtitulo: '(30–90 dias)',
    descricao:
      'Treinamento por função via Fluidz, acompanhamento semanal, suporte prioritário, ajustes finos no processo. O pós-go-live é onde a maioria falha — a gente não falha.',
    duracao: '60-90 dias',
    icon: Headphones,
    cor: '#10B981',
    corSecundaria: '#34D399',
    itens: [
      'Treinamento por função (Fluidz)',
      'Acompanhamento semanal dedicado',
      'Suporte prioritário',
      'Ajustes finos baseados em uso real',
    ],
  },
]

// ============================================================================
// GSAP VISUALIZATIONS
// ============================================================================

// Arquitetura: Customer Journey Bowtie - Showing the flow from lead to customer
function ArquiteturaVisualization({ isActive, color, colorSecondary }: { isActive: boolean; color: string; colorSecondary: string }) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!isActive || !svgRef.current) return

    const ctx = gsap.context(() => {
      // Funnel shapes appear
      gsap.fromTo('.funnel-stage',
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.6, stagger: 0.08, ease: 'power2.out' }
      )

      // Stage labels fade in
      gsap.fromTo('.stage-label',
        { opacity: 0 },
        { opacity: 1, duration: 0.4, stagger: 0.06, delay: 0.5, ease: 'power2.out' }
      )

      // Center circle
      gsap.fromTo('.center-circle',
        { scale: 0 },
        { scale: 1, duration: 0.5, delay: 0.3, ease: 'back.out(1.7)' }
      )

      // Side panels
      gsap.fromTo('.side-panel',
        { x: 20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, stagger: 0.15, delay: 0.4, ease: 'power2.out' }
      )
    }, svgRef)

    return () => ctx.revert()
  }, [isActive])

  // Bowtie configuration
  const leftStages = ['Lead Frio', 'MQL', 'SQL', 'Oportunidade']
  const rightStages = ['Onboarding', 'Adoção', 'Expansão', 'Retenção']

  const centerX = 400
  const centerY = 190
  const stageWidth = 80
  const centerGap = 30
  const heights = [200, 160, 120, 80, 50]

  return (
    <svg ref={svgRef} viewBox="0 0 800 400" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      {/* Section labels */}
      <text x={centerX - 160} y="38" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="12" fontWeight="600" letterSpacing="1">
        AQUISIÇÃO
      </text>
      <text x={centerX + 160} y="38" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="12" fontWeight="600" letterSpacing="1">
        RETENÇÃO
      </text>

      {/* LEFT FUNNEL */}
      {leftStages.map((stage, i) => {
        const leftHeight = heights[i]
        const rightHeight = heights[i + 1]
        const x = centerX - centerGap - (leftStages.length - i) * stageWidth

        return (
          <g key={`left-${i}`} className="funnel-stage">
            <path
              d={`M ${x} ${centerY - leftHeight / 2}
                  L ${x + stageWidth} ${centerY - rightHeight / 2}
                  L ${x + stageWidth} ${centerY + rightHeight / 2}
                  L ${x} ${centerY + leftHeight / 2}
                  Z`}
              fill={`rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, ${0.25 + i * 0.12})`}
              stroke={color}
              strokeWidth="1"
              strokeOpacity="0.4"
            />
            <text
              className="stage-label"
              x={x + stageWidth / 2}
              y={centerY + 5}
              textAnchor="middle"
              fill="white"
              fontSize="11"
              fontWeight="500"
            >
              {stage}
            </text>
          </g>
        )
      })}

      {/* CENTER - Conversion Point */}
      <g className="center-circle" transform={`translate(${centerX}, ${centerY})`}>
        <circle cx="0" cy="0" r="22" fill="#10B981" />
        <text y="4" textAnchor="middle" fill="white" fontSize="10" fontWeight="700">VENDA</text>
      </g>

      {/* RIGHT FUNNEL */}
      {rightStages.map((stage, i) => {
        const leftHeight = heights[leftStages.length - i]
        const rightHeight = heights[leftStages.length - 1 - i]
        const x = centerX + centerGap + i * stageWidth

        return (
          <g key={`right-${i}`} className="funnel-stage">
            <path
              d={`M ${x} ${centerY - leftHeight / 2}
                  L ${x + stageWidth} ${centerY - rightHeight / 2}
                  L ${x + stageWidth} ${centerY + rightHeight / 2}
                  L ${x} ${centerY + leftHeight / 2}
                  Z`}
              fill={`rgba(16, 185, 129, ${0.25 + i * 0.12})`}
              stroke="#10B981"
              strokeWidth="1"
              strokeOpacity="0.4"
            />
            <text
              className="stage-label"
              x={x + stageWidth / 2}
              y={centerY + 5}
              textAnchor="middle"
              fill="white"
              fontSize="11"
              fontWeight="500"
            >
              {stage}
            </text>
          </g>
        )
      })}

      {/* Bottom deliverables panel */}
      <g className="side-panel" transform="translate(100, 320)">
        <rect x="0" y="0" width="600" height="60" rx="12" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" />
        <text x="300" y="25" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="11" fontWeight="500">
          ENTREGÁVEIS DA ARQUITETURA
        </text>
        <g transform="translate(50, 42)">
          <circle r="4" fill={color} />
          <text x="10" y="4" fill="rgba(255,255,255,0.7)" fontSize="11">Jornada documentada</text>
        </g>
        <g transform="translate(200, 42)">
          <circle r="4" fill={color} />
          <text x="10" y="4" fill="rgba(255,255,255,0.7)" fontSize="11">Critérios de qualificação</text>
        </g>
        <g transform="translate(380, 42)">
          <circle r="4" fill={color} />
          <text x="10" y="4" fill="rgba(255,255,255,0.7)" fontSize="11">SLAs entre times</text>
        </g>
      </g>
    </svg>
  )
}

// Implementação: Pipeline Configuration with automations
function ImplementacaoVisualization({ isActive, color, colorSecondary }: { isActive: boolean; color: string; colorSecondary: string }) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!isActive || !svgRef.current) return

    const ctx = gsap.context(() => {
      // Stage cards sliding in
      gsap.fromTo('.stage-card',
        { y: 30, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.1, delay: 0.2, ease: 'power2.out' }
      )

      // Connectors appearing
      gsap.fromTo('.connector-line',
        { scaleX: 0 },
        { scaleX: 1, duration: 0.4, stagger: 0.08, delay: 0.5, ease: 'power2.out' }
      )

      // Status indicators
      gsap.fromTo('.status-indicator',
        { scale: 0 },
        { scale: 1, duration: 0.5, stagger: 0.1, delay: 0.8, ease: 'back.out(2)' }
      )

      // Current stage pulse
      gsap.to('.current-pulse', {
        scale: 1.2,
        opacity: 0,
        duration: 2,
        repeat: -1,
        ease: 'power2.out',
      })

      // Flow particles
      gsap.to('.flow-particle', {
        x: '+=650',
        duration: 4,
        repeat: -1,
        ease: 'none',
        stagger: 0.8,
      })

      // Automation badges
      gsap.fromTo('.automation-badge',
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, delay: 1, ease: 'power2.out' }
      )
    }, svgRef)

    return () => ctx.revert()
  }, [isActive])

  const stages = [
    { name: 'Lead', automation: 'Captação', deals: 245 },
    { name: 'Qualificação', automation: 'Scoring', deals: 182 },
    { name: 'Proposta', automation: 'Follow-up', deals: 94 },
    { name: 'Negociação', automation: 'Alertas', deals: 47 },
    { name: 'Fechamento', automation: 'Handoff', deals: 23 },
  ]

  const cardWidth = 125
  const cardHeight = 100
  const cardSpacing = 140
  const startX = 55

  return (
    <svg ref={svgRef} viewBox="0 0 800 400" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="pipeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor={colorSecondary} />
        </linearGradient>
      </defs>

      {/* Title */}
      <text x="400" y="30" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="12" fontWeight="600" letterSpacing="1">
        PIPELINE CONFIGURADO COM AUTOMAÇÕES
      </text>

      {/* Pipeline track */}
      <g transform="translate(0, 260)">
        <rect x="40" y="0" width="720" height="8" rx="4" fill="rgba(255,255,255,0.1)" />
        <rect x="40" y="0" width="680" height="8" rx="4" fill="url(#pipeGrad)" opacity="0.5" />

        {[0, 1, 2].map((i) => (
          <circle
            key={i}
            className="flow-particle"
            cx={-20 - i * 200}
            cy="4"
            r="3"
            fill="white"
            opacity="0.8"
          />
        ))}
      </g>

      {/* Stage cards */}
      {stages.map((stage, i) => {
        const x = startX + i * cardSpacing
        const y = 50
        const centerX = x + cardWidth / 2

        return (
          <g key={stage.name}>
            {/* Vertical connector */}
            <line
              className="connector-line"
              x1={centerX}
              y1={y + cardHeight}
              x2={centerX}
              y2={260}
              stroke={color}
              strokeWidth="2"
              style={{ transformOrigin: `${centerX}px ${y + cardHeight}px` }}
            />

            {/* Status on pipeline */}
            <g className="status-indicator" style={{ transformOrigin: `${centerX}px 264px` }}>
              <circle className="current-pulse" cx={centerX} cy="264" r="14" fill="none" stroke={color} strokeWidth="2" opacity="0.5" />
              <circle cx={centerX} cy="264" r="12" fill={color} />
              <path d={`M ${centerX - 4} 264 L ${centerX - 1} 267 L ${centerX + 5} 260`} stroke="white" strokeWidth="2" fill="none" />
            </g>

            {/* Card */}
            <g className="stage-card" style={{ transformOrigin: `${centerX}px ${y + cardHeight / 2}px` }}>
              <rect
                x={x}
                y={y}
                width={cardWidth}
                height={cardHeight}
                rx="14"
                fill={`${color}15`}
                stroke={color}
                strokeWidth="1"
              />

              <text x={centerX} y={y + 25} textAnchor="middle" fill="white" fontSize="12" fontWeight="600">
                {stage.name}
              </text>

              <text x={centerX} y={y + 58} textAnchor="middle" fill={color} fontSize="26" fontWeight="700">
                {stage.deals}
              </text>

              <text x={centerX} y={y + 80} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="10">
                deals
              </text>
            </g>

            {/* Automation badge */}
            <g className="automation-badge">
              <rect x={x + 15} y={y + cardHeight + 15} width={cardWidth - 30} height="24" rx="12" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.15)" />
              <text x={centerX} y={y + cardHeight + 32} textAnchor="middle" fill={colorSecondary} fontSize="10" fontWeight="500">
                {stage.automation}
              </text>
            </g>

            {/* Horizontal connector */}
            {i < stages.length - 1 && (
              <g className="connector-line" style={{ transformOrigin: `${x + cardWidth}px ${y + cardHeight / 2}px` }}>
                <line
                  x1={x + cardWidth + 4}
                  y1={y + cardHeight / 2}
                  x2={x + cardSpacing - 4}
                  y2={y + cardHeight / 2}
                  stroke={color}
                  strokeWidth="2"
                  strokeOpacity="0.6"
                />
                <path
                  d={`M ${x + cardSpacing - 10} ${y + cardHeight / 2 - 5} L ${x + cardSpacing - 2} ${y + cardHeight / 2} L ${x + cardSpacing - 10} ${y + cardHeight / 2 + 5}`}
                  fill="none"
                  stroke={color}
                  strokeWidth="2"
                  strokeOpacity="0.6"
                />
              </g>
            )}
          </g>
        )
      })}

      {/* Stats */}
      <g transform="translate(60, 310)">
        <rect width="140" height="50" rx="12" fill={`${color}15`} stroke={color} strokeWidth="1" />
        <text x="70" y="28" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">
          Conversão: <tspan fill={color}>38%</tspan>
        </text>
        <text x="70" y="42" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="10">
          lead → fechamento
        </text>
      </g>

      <g transform="translate(600, 310)">
        <rect width="140" height="50" rx="12" fill="rgba(16,185,129,0.15)" stroke="#10B981" strokeWidth="1" />
        <text x="70" y="28" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">
          WhatsZopu: <tspan fill="#10B981">Ativo</tspan>
        </text>
        <text x="70" y="42" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="10">
          integrado ao pipeline
        </text>
      </g>
    </svg>
  )
}

// Adoção: Team adoption wave with certifications
function AdocaoVisualization({ isActive, color, colorSecondary }: { isActive: boolean; color: string; colorSecondary: string }) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!isActive || !svgRef.current) return

    const ctx = gsap.context(() => {
      // People appearing in wave
      gsap.fromTo('.person-icon',
        { scale: 0, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.6, stagger: 0.05, ease: 'back.out(1.7)' }
      )

      // Certification badges
      gsap.fromTo('.cert-badge',
        { scale: 0, rotation: -180 },
        { scale: 1, rotation: 0, duration: 0.5, stagger: 0.06, delay: 0.8, ease: 'back.out(2)' }
      )

      // Progress ring
      gsap.fromTo('.progress-ring',
        { strokeDashoffset: 408 },
        { strokeDashoffset: 16, duration: 2, delay: 0.5, ease: 'power2.inOut' }
      )

      // Percentage counting
      gsap.fromTo('.adoption-percent',
        { textContent: 0 },
        { textContent: 97, duration: 2, delay: 0.5, snap: { textContent: 1 }, ease: 'power2.out' }
      )

      // Timeline items
      gsap.fromTo('.timeline-item',
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, stagger: 0.1, delay: 0.6, ease: 'power2.out' }
      )
    }, svgRef)

    return () => ctx.revert()
  }, [isActive])

  const cols = 4
  const rows = 3
  const personWidth = 50
  const personHeight = 70
  const gapX = 75
  const gapY = 80
  const gridStartX = 50
  const gridStartY = 50

  const people = Array.from({ length: cols * rows }).map((_, i) => {
    const row = Math.floor(i / cols)
    const col = i % cols
    return {
      x: gridStartX + col * gapX,
      y: gridStartY + row * gapY,
      certified: i < 11, // 11 out of 12 = 97% certified
      role: row === 0 ? 'Vendedor' : row === 1 ? 'SDR' : 'Gestor',
    }
  })

  return (
    <svg ref={svgRef} viewBox="0 0 800 400" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="adoptGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor={colorSecondary} />
        </linearGradient>
      </defs>

      {/* LEFT SIDE - People grid */}
      {people.map((person, i) => (
        <g key={i}>
          <g className="person-icon" style={{ transformOrigin: `${person.x + personWidth / 2}px ${person.y + 30}px` }}>
            <circle
              cx={person.x + personWidth / 2}
              cy={person.y + 12}
              r="13"
              fill={person.certified ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.3)'}
            />
            <rect
              x={person.x + personWidth / 2 - 13}
              y={person.y + 28}
              width="26"
              height="26"
              rx="5"
              fill={person.certified ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.2)'}
            />

            {person.certified && (
              <g className="cert-badge" style={{ transformOrigin: `${person.x + personWidth / 2 + 15}px ${person.y + 8}px` }}>
                <circle cx={person.x + personWidth / 2 + 15} cy={person.y + 8} r="9" fill={color} />
                <path
                  d={`M ${person.x + personWidth / 2 + 11} ${person.y + 8} L ${person.x + personWidth / 2 + 14} ${person.y + 11} L ${person.x + personWidth / 2 + 20} ${person.y + 4}`}
                  stroke="white"
                  strokeWidth="1.5"
                  fill="none"
                />
              </g>
            )}
          </g>
        </g>
      ))}

      {/* Role labels */}
      {['Vendedores', 'SDRs', 'Gestores'].map((role, rowIdx) => (
        <text
          key={role}
          x={gridStartX + (cols * gapX) / 2 - gapX / 2}
          y={gridStartY + rowIdx * gapY + personHeight + 5}
          textAnchor="middle"
          fill="rgba(255,255,255,0.5)"
          fontSize="11"
          fontWeight="500"
        >
          {role}
        </text>
      ))}

      {/* RIGHT SIDE - Progress Panel */}
      <g transform="translate(380, 40)">
        <rect x="0" y="0" width="380" height="320" rx="20" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" />

        {/* Progress circle */}
        <g transform="translate(190, 85)">
          <circle cx="0" cy="0" r="55" fill="rgba(255,255,255,0.05)" />
          <circle cx="0" cy="0" r="55" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="10" />
          <circle
            className="progress-ring"
            cx="0"
            cy="0"
            r="55"
            fill="none"
            stroke="url(#adoptGrad)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray="408"
            strokeDashoffset="408"
            transform="rotate(-90)"
          />
          <text textAnchor="middle" y="8" fill="white" fontSize="30" fontWeight="800">
            <tspan className="adoption-percent">0</tspan>%
          </text>
          <text textAnchor="middle" y="28" fill="rgba(255,255,255,0.6)" fontSize="11">taxa de adoção</text>
        </g>

        {/* Timeline */}
        <g transform="translate(30, 170)">
          <text fill="rgba(255,255,255,0.6)" fontSize="11" fontWeight="600">CRONOGRAMA DE ADOÇÃO</text>

          {[
            { week: 'Semana 1-2', task: 'Treinamento inicial por função', done: true },
            { week: 'Semana 3-4', task: 'Acompanhamento semanal', done: true },
            { week: 'Semana 5-8', task: 'Certificação Fluidz', done: true },
            { week: 'Semana 9-12', task: 'Ajustes finos + suporte', done: false },
          ].map((item, i) => (
            <g key={i} className="timeline-item" transform={`translate(0, ${24 + i * 32})`}>
              <circle cx="8" cy="0" r="6" fill={item.done ? color : 'rgba(255,255,255,0.2)'} />
              {i < 3 && <line x1="8" y1="8" x2="8" y2="26" stroke={item.done ? color : 'rgba(255,255,255,0.15)'} strokeWidth="2" />}
              <text x="24" y="4" fill={item.done ? color : 'rgba(255,255,255,0.5)'} fontSize="10" fontWeight="600">{item.week}</text>
              <text x="24" y="18" fill="rgba(255,255,255,0.7)" fontSize="11">{item.task}</text>
            </g>
          ))}
        </g>
      </g>
    </svg>
  )
}

// SVG Component Map
const VISUALIZATION_MAP: Record<string, React.FC<{ isActive: boolean; color: string; colorSecondary: string }>> = {
  arquitetura: ArquiteturaVisualization,
  implementacao: ImplementacaoVisualization,
  adocao: AdocaoVisualization,
}

// ============================================================================
// TAB BUTTON
// ============================================================================

interface EtapaTabProps {
  etapa: Etapa
  isActive: boolean
  onClick: () => void
}

function EtapaTab({ etapa, isActive, onClick }: EtapaTabProps) {
  const Icon = etapa.icon

  return (
    <button
      onClick={onClick}
      className={cn(
        'relative px-4 py-3 sm:px-6 sm:py-3.5 rounded-2xl font-medium transition-all duration-300',
        'flex items-center gap-2.5',
        isActive
          ? 'text-white'
          : 'text-white/50 hover:text-white/80 hover:bg-white/5'
      )}
    >
      {isActive && (
        <motion.div
          layoutId="activeEtapaTab"
          className="absolute inset-0 rounded-2xl shadow-elevated"
          style={{ backgroundColor: etapa.cor, boxShadow: `0 4px 20px ${etapa.cor}30` }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
      )}
      <span className="relative z-10 flex items-center gap-2.5">
        <Icon className="w-5 h-5" />
        <span className="hidden sm:inline font-semibold">{etapa.titulo.split(' ')[0]}</span>
        <span className="sm:hidden font-bold">{etapa.numero}</span>
      </span>
    </button>
  )
}

// ============================================================================
// EXPANDED CONTENT
// ============================================================================

function ExpandedContent({ etapa }: { etapa: Etapa }) {
  const Visualization = VISUALIZATION_MAP[etapa.id]
  const Icon = etapa.icon

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="grid lg:grid-cols-2 gap-6 lg:gap-8"
    >
      {/* LEFT - Visualization */}
      <div className="relative rounded-2xl overflow-hidden bg-white/[0.02] border border-white/[0.06]">
        <div className="w-full" style={{ aspectRatio: '4 / 3' }}>
          {Visualization && (
            <Visualization isActive={true} color={etapa.cor} colorSecondary={etapa.corSecundaria} />
          )}
        </div>
      </div>

      {/* RIGHT - Content */}
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-4 mb-4">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: `${etapa.cor}20` }}
          >
            <Icon className="w-7 h-7" style={{ color: etapa.cor }} />
          </div>
          <div>
            <span className="text-sm font-semibold" style={{ color: etapa.cor }}>{etapa.duracao}</span>
            <span className="mx-2 text-white/30">•</span>
            <span className="text-sm text-white/50">{etapa.subtitulo}</span>
          </div>
        </div>

        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
          {etapa.titulo}
        </h3>

        <p className="text-white/70 leading-relaxed mb-6">
          {etapa.descricao}
        </p>

        <ul className="space-y-3">
          {etapa.itens.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0" style={{ color: etapa.cor }} />
              <span className="text-sm text-white/80">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function MetodoFluidsalesShowcase() {
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  const activeEtapa = ETAPAS[activeIndex]

  const handleSelect = useCallback((index: number) => {
    setActiveIndex(index)
  }, [])

  return (
    <section
      ref={sectionRef}
      id="metodo"
      className="relative py-16 sm:py-24 bg-[#0A2540] overflow-hidden"
    >
      <Container>
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <Reveal>
            <Badge variant="default" className="mb-6 bg-white/10 text-white border-white/20">
              <FileText className="w-3.5 h-3.5 mr-1.5" />
              O método
            </Badge>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Fluidsales™:{' '}
              <span className="block mt-2">
                <span className="bg-linear-to-r from-blue-400 via-violet-400 to-emerald-400 bg-clip-text text-transparent">
                  Arquitetura → Implementação → Adoção
                </span>
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
              Cada etapa com entregáveis claros, prazos definidos e ROI mensurável.
              Sem prometer milagre — apenas método que funciona.
            </p>
          </Reveal>
        </div>

        {/* Horizontal Tabs */}
        <Reveal delay={0.3}>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-10">
            {ETAPAS.map((etapa, index) => (
              <EtapaTab
                key={etapa.id}
                etapa={etapa}
                isActive={index === activeIndex}
                onClick={() => handleSelect(index)}
              />
            ))}
          </div>
        </Reveal>

        {/* Content */}
        <Reveal delay={0.4}>
          <AnimatePresence mode="wait">
            <ExpandedContent key={activeEtapa.id} etapa={activeEtapa} />
          </AnimatePresence>
        </Reveal>

        {/* Progress indicator */}
        <div className="mt-8 max-w-xs mx-auto">
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: activeEtapa.cor }}
              initial={{ width: '0%' }}
              animate={{ width: `${((activeIndex + 1) / ETAPAS.length) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
          <p className="text-center mt-3 text-xs text-white/40">
            <span className="text-white/60 font-medium">{activeIndex + 1}</span>
            <span className="mx-1">/</span>
            <span>{ETAPAS.length}</span>
            <span className="mx-2">•</span>
            <span className="text-white/50">{activeEtapa.duracao}</span>
          </p>
        </div>

        {/* Bottom summary */}
        <Reveal delay={0.5}>
          <div className="mt-12">
            <div className="relative bg-white/[0.03] rounded-2xl p-8 sm:p-10 border border-white/[0.08] overflow-hidden">
              <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">
                {/* Left content */}
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-amber-500/20 rounded-2xl flex items-center justify-center">
                    <Sparkles className="w-7 h-7 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-sm text-white/50 mb-1">Diferencial Zopu</p>
                    <p className="text-xl sm:text-2xl font-bold text-white">
                      O pós-go-live é onde a maioria falha.
                    </p>
                    <p className="text-base text-white/70 mt-1">
                      A gente não falha.
                    </p>
                  </div>
                </div>

                {/* Right - Stats */}
                <div className="flex items-center gap-6 sm:gap-10">
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-white">97%</div>
                    <div className="text-xs text-white/50 mt-1">Taxa de adoção</div>
                  </div>
                  <div className="w-px h-10 bg-white/20" />
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-white">90</div>
                    <div className="text-xs text-white/50 mt-1">Dias de acompanhamento</div>
                  </div>
                  <div className="w-px h-10 bg-white/20" />
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-emerald-400">+450</div>
                    <div className="text-xs text-white/50 mt-1">Projetos entregues</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
