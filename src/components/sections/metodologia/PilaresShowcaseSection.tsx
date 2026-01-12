'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import {
  MapTrifold,
  GitBranch,
  Database,
  Target,
  Users,
  ChartBar,
} from '@phosphor-icons/react'
import { Container } from '@/components/layout'
import { Reveal } from '@/components/shared'
import { cn } from '@/lib/utils'

// ============================================================================
// TYPES & CONSTANTS
// ============================================================================

const customEase: [number, number, number, number] = [0.16, 1, 0.3, 1]

interface Pilar {
  id: string
  numero: string
  nome: string
  nomeShort: string
  headline: string
  descricao: string
  antes: { titulo: string; texto: string }
  depois: { titulo: string; texto: string }
  entregavel: string
  icon: React.ElementType
  cor: string
  corSecundaria: string
  corTerciaria: string
}

const PILARES: Pilar[] = [
  {
    id: 'journey',
    numero: '01',
    nome: 'Jornada do Cliente',
    nomeShort: 'Jornada',
    headline: 'Customer Journey Map',
    descricao: 'Antes de qualquer configuração, mapeamos toda a jornada do seu cliente — desde o primeiro contato até a recompra. Isso garante que o Bitrix24 reflita a realidade do seu negócio.',
    antes: { titulo: 'Antes da Zopu', texto: 'Jornada do cliente sem visibilidade clara' },
    depois: { titulo: 'Com Metodologia Fluidsales™', texto: 'Cada touchpoint rastreado, gargalos identificados automaticamente' },
    entregavel: 'Mapa visual da jornada com pontos de contato e oportunidades.',
    icon: MapTrifold,
    cor: '#635BFF',
    corSecundaria: '#8B5CF6',
    corTerciaria: '#A78BFA',
  },
  {
    id: 'processos',
    numero: '02',
    nome: 'Processos Documentados',
    nomeShort: 'Processos',
    headline: 'Sales Pipeline Design',
    descricao: 'Documentamos fluxos, etapas, critérios de passagem e responsáveis. Processo claro que qualquer pessoa consegue seguir — e que o CRM executa automaticamente.',
    antes: { titulo: 'Antes da Zopu', texto: 'Cada vendedor faz do seu jeito, sem padrão' },
    depois: { titulo: 'Com Metodologia Fluidsales™', texto: 'Pipeline estruturado com SLAs e automações de follow-up' },
    entregavel: 'Processo de vendas claro, com SLAs e regras de handoff.',
    icon: GitBranch,
    cor: '#10B981',
    corSecundaria: '#34D399',
    corTerciaria: '#6EE7B7',
  },
  {
    id: 'dados',
    numero: '03',
    nome: 'Dados Organizados',
    nomeShort: 'Dados',
    headline: 'Data Quality System',
    descricao: 'Limpamos, padronizamos e criamos regras para manter assim. Dados confiáveis que a liderança pode usar para tomar decisões estratégicas.',
    antes: { titulo: 'Antes da Zopu', texto: 'Base suja, duplicidades, campos vazios' },
    depois: { titulo: 'Com Metodologia Fluidsales™', texto: 'Dados higienizados com validações automáticas' },
    entregavel: 'Base higienizada, sem duplicidade, com validações automáticas.',
    icon: Database,
    cor: '#F59E0B',
    corSecundaria: '#FBBF24',
    corTerciaria: '#FCD34D',
  },
  {
    id: 'icp',
    numero: '04',
    nome: 'Cliente Ideal Definido',
    nomeShort: 'ICP',
    headline: 'ICP & Lead Scoring',
    descricao: 'Definimos critérios objetivos de qualificação. Lead scoring baseado em dados reais, não em achismo. Sua IA sabe exatamente quem priorizar.',
    antes: { titulo: 'Antes da Zopu', texto: 'Qualificação subjetiva, tempo perdido com leads frios' },
    depois: { titulo: 'Com Metodologia Fluidsales™', texto: 'Score automático, foco apenas em leads quentes' },
    entregavel: 'ICP documentado e critérios de qualificação configurados.',
    icon: Target,
    cor: '#EC4899',
    corSecundaria: '#F472B6',
    corTerciaria: '#F9A8D4',
  },
  {
    id: 'adocao',
    numero: '05',
    nome: 'Adoção Planejada',
    nomeShort: 'Adoção',
    headline: 'Team Enablement',
    descricao: 'Criamos trilhas por função e rituais de acompanhamento. Vendedor aprende o que vendedor precisa, gestor aprende o que gestor precisa.',
    antes: { titulo: 'Antes da Zopu', texto: 'Treinamento genérico de 2h, time não usa o CRM' },
    depois: { titulo: 'Com Metodologia Fluidsales™', texto: 'Trilhas personalizadas, certificação via Fluidz' },
    entregavel: 'Time treinado com Fluidz, certificado por função.',
    icon: Users,
    cor: '#8B5CF6',
    corSecundaria: '#A78BFA',
    corTerciaria: '#C4B5FD',
  },
  {
    id: 'metricas',
    numero: '06',
    nome: 'Métricas de Sucesso',
    nomeShort: 'Métricas',
    headline: 'Revenue Dashboard',
    descricao: 'Definimos KPIs antes de começar. Baseline documentado, metas claras, dashboard pronto para acompanhar evolução em tempo real.',
    antes: { titulo: 'Antes da Zopu', texto: 'Sem baseline, impossível medir ROI' },
    depois: { titulo: 'Com Metodologia Fluidsales™', texto: 'Dashboard em tempo real com todas as métricas' },
    entregavel: 'Dashboard com suas métricas, baseline e meta.',
    icon: ChartBar,
    cor: '#06B6D4',
    corSecundaria: '#22D3EE',
    corTerciaria: '#67E8F9',
  },
]

// ============================================================================
// STUNNING SVG VISUALIZATIONS
// ============================================================================

// Journey: Bowtie Funnel Horizontal - Customer Journey Map completo
function JourneyVisualization({ isActive, color }: { isActive: boolean; color: string; colorSecondary: string }) {
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
    }, svgRef)

    return () => ctx.revert()
  }, [isActive])

  // Bowtie funnel configuration - larger trapezoids
  const leftStages = ['Descoberta', 'Interesse', 'Consideração', 'Decisão']
  const rightStages = ['Onboarding', 'Adoção', 'Expansão', 'Lealdade']

  const centerX = 400
  const centerY = 190
  const stageWidth = 90
  const gap = 0 // No gap - edges touch perfectly
  const centerGap = 32 // Gap between funnel and center circle

  // Heights for each position (index 0 = outermost, index 4 = center)
  const heights = [220, 175, 130, 85, 50] // Larger heights for bigger trapezoids

  return (
    <svg ref={svgRef} viewBox="0 0 800 400" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      {/* Section labels */}
      <text x={centerX - 180} y="45" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="13" fontWeight="600" letterSpacing="1">
        AQUISIÇÃO
      </text>
      <text x={centerX + 180} y="45" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="13" fontWeight="600" letterSpacing="1">
        RETENÇÃO
      </text>

      {/* LEFT FUNNEL - Converging toward center */}
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
              fill={`rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, ${0.3 + i * 0.12})`}
              stroke={color}
              strokeWidth="1"
              strokeOpacity="0.5"
            />
            <text
              className="stage-label"
              x={x + stageWidth / 2}
              y={centerY + 5}
              textAnchor="middle"
              fill="white"
              fontSize="12"
              fontWeight="500"
            >
              {stage}
            </text>
          </g>
        )
      })}

      {/* CENTER - Conversion Point */}
      <g className="center-circle" transform={`translate(${centerX}, ${centerY})`}>
        <circle cx="0" cy="0" r="24" fill="#10B981" />
        <text y="4" textAnchor="middle" fill="white" fontSize="11" fontWeight="700">COMPRA</text>
      </g>

      {/* RIGHT FUNNEL - Expanding from center */}
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
              fill={`rgba(16, 185, 129, ${0.3 + i * 0.12})`}
              stroke="#10B981"
              strokeWidth="1"
              strokeOpacity="0.5"
            />
            <text
              className="stage-label"
              x={x + stageWidth / 2}
              y={centerY + 5}
              textAnchor="middle"
              fill="white"
              fontSize="12"
              fontWeight="500"
            >
              {stage}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

// Processos: Animated pipeline with flowing stages - FIXED LAYOUT
function ProcessosVisualization({ isActive, color, colorSecondary }: { isActive: boolean; color: string; colorSecondary: string }) {
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

      // Current stage pulse - subtle
      gsap.to('.current-pulse', {
        scale: 1.2,
        opacity: 0,
        duration: 2,
        repeat: -1,
        ease: 'power2.out',
      })

      // Stats badges
      gsap.fromTo('.stat-badge',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.15, delay: 1, ease: 'power2.out' }
      )

      // Stats counting
      gsap.fromTo('.stat-number',
        { textContent: 0 },
        { textContent: 72, duration: 2, delay: 1.2, snap: { textContent: 1 }, ease: 'power2.out' }
      )

      // Flow particles in pipeline
      gsap.to('.flow-particle', {
        x: '+=650',
        duration: 4,
        repeat: -1,
        ease: 'none',
        stagger: 0.8,
      })
    }, svgRef)

    return () => ctx.revert()
  }, [isActive])

  const stages = [
    { name: 'Lead', status: 'done', deals: 245 },
    { name: 'Qualificação', status: 'done', deals: 182 },
    { name: 'Proposta', status: 'done', deals: 94 },
    { name: 'Negociação', status: 'done', deals: 47 },
    { name: 'Fechamento', status: 'current', deals: 23 },
  ]

  const cardWidth = 130
  const cardHeight = 100
  const cardSpacing = 145
  const startX = 55

  return (
    <svg ref={svgRef} viewBox="0 0 800 400" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="pipeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor={colorSecondary} />
        </linearGradient>
      </defs>

      {/* Subtle grid background */}
      <g opacity="0.5">
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`h${i}`} x1="40" y1={40 + i * 40} x2="760" y2={40 + i * 40} stroke="rgba(255,255,255,0.03)" />
        ))}
      </g>

      {/* Main horizontal pipeline track - positioned BELOW cards */}
      <g transform="translate(0, 260)">
        {/* Track background */}
        <rect x="40" y="0" width="720" height="8" rx="4" fill="rgba(255,255,255,0.1)" />

        {/* Progress fill */}
        <rect x="40" y="0" width="680" height="8" rx="4" fill="url(#pipeGrad)" opacity="0.5" />

        {/* Flow particles */}
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

      {/* Stage cards - positioned ABOVE pipeline */}
      {stages.map((stage, i) => {
        const x = startX + i * cardSpacing
        const y = 50
        const isDone = stage.status === 'done'
        const isCurrent = stage.status === 'current'
        const centerX = x + cardWidth / 2

        return (
          <g key={stage.name}>
            {/* Vertical connector from card to pipeline */}
            <line
              className="connector-line"
              x1={centerX}
              y1={y + cardHeight}
              x2={centerX}
              y2={260}
              stroke={isDone || isCurrent ? color : 'rgba(255,255,255,0.15)'}
              strokeWidth="2"
              strokeDasharray={isDone || isCurrent ? 'none' : '4 4'}
              style={{ transformOrigin: `${centerX}px ${y + cardHeight}px` }}
            />

            {/* Status indicator on pipeline */}
            <g className="status-indicator" style={{ transformOrigin: `${centerX}px 264px` }}>
              {isDone && (
                <>
                  <circle cx={centerX} cy="264" r="14" fill={color} />
                  <path d={`M ${centerX - 5} 264 L ${centerX - 1} 268 L ${centerX + 6} 259`} stroke="white" strokeWidth="2.5" fill="none" />
                </>
              )}
              {isCurrent && (
                <>
                  <circle className="current-pulse" cx={centerX} cy="264" r="14" fill="none" stroke={color} strokeWidth="2" />
                  <circle cx={centerX} cy="264" r="14" fill={color} />
                  <circle cx={centerX} cy="264" r="5" fill="white" />
                </>
              )}
              {!isDone && !isCurrent && (
                <circle cx={centerX} cy="264" r="10" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
              )}
            </g>

            {/* Card */}
            <g className="stage-card" style={{ transformOrigin: `${centerX}px ${y + cardHeight / 2}px` }}>
              <rect
                x={x}
                y={y}
                width={cardWidth}
                height={cardHeight}
                rx="14"
                fill={isDone || isCurrent ? `${color}15` : 'rgba(255,255,255,0.05)'}
                stroke={isDone || isCurrent ? color : 'rgba(255,255,255,0.1)'}
                strokeWidth="1"
              />

              {/* Stage name */}
              <text
                x={centerX}
                y={y + 28}
                textAnchor="middle"
                fill="white"
                fontSize="12"
                fontWeight="600"
              >
                {stage.name}
              </text>

              {/* Deals count - prominent */}
              <text
                x={centerX}
                y={y + 62}
                textAnchor="middle"
                fill={isDone || isCurrent ? color : 'rgba(255,255,255,0.4)'}
                fontSize="28"
                fontWeight="700"
              >
                {stage.deals}
              </text>

              {/* Label */}
              <text
                x={centerX}
                y={y + 82}
                textAnchor="middle"
                fill="rgba(255,255,255,0.4)"
                fontSize="11"
              >
                deals
              </text>
            </g>

            {/* Horizontal connector arrow to next stage */}
            {i < stages.length - 1 && (
              <g className="connector-line" style={{ transformOrigin: `${x + cardWidth}px ${y + cardHeight / 2}px` }}>
                <line
                  x1={x + cardWidth + 4}
                  y1={y + cardHeight / 2}
                  x2={x + cardSpacing - 4}
                  y2={y + cardHeight / 2}
                  stroke={isDone ? color : 'rgba(255,255,255,0.15)'}
                  strokeWidth="2"
                />
                <path
                  d={`M ${x + cardSpacing - 10} ${y + cardHeight / 2 - 5} L ${x + cardSpacing - 2} ${y + cardHeight / 2} L ${x + cardSpacing - 10} ${y + cardHeight / 2 + 5}`}
                  fill="none"
                  stroke={isDone ? color : 'rgba(255,255,255,0.15)'}
                  strokeWidth="2"
                />
              </g>
            )}
          </g>
        )
      })}

      {/* Stats badges - at bottom with clear spacing */}
      <g className="stat-badge">
        <rect x="60" y="310" width="140" height="50" rx="12" fill={`${color}15`} stroke={color} strokeWidth="1" />
        <text x="130" y="335" textAnchor="middle" fill="white" fontSize="13" fontWeight="600">
          Conversão: <tspan fill={color}>38%</tspan>
        </text>
        <text x="130" y="350" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="10">
          lead → fechamento
        </text>
      </g>

      <g className="stat-badge">
        <rect x="600" y="310" width="140" height="50" rx="12" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        <text x="670" y="335" textAnchor="middle" fill="white" fontSize="13" fontWeight="600">
          SLA: <tspan className="stat-number">0</tspan>h
        </text>
        <text x="670" y="350" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="10">
          tempo médio
        </text>
      </g>
    </svg>
  )
}

// Dados: Data flowing and organizing visualization - FIXED LAYOUT
function DadosVisualization({ isActive, color, colorSecondary }: { isActive: boolean; color: string; colorSecondary: string }) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!isActive || !svgRef.current) return

    const ctx = gsap.context(() => {
      // Data blocks starting scattered
      gsap.set('.data-block', {
        x: () => gsap.utils.random(-80, 80),
        y: () => gsap.utils.random(-60, 60),
        rotation: () => gsap.utils.random(-20, 20),
        opacity: 0.3,
        scale: 0.8,
      })

      // Organize animation
      gsap.to('.data-block', {
        x: 0,
        y: 0,
        rotation: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        stagger: { amount: 0.8, from: 'random' },
        ease: 'power3.out',
        delay: 0.3,
      })

      // Validation checkmarks
      gsap.fromTo('.check-mark',
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, stagger: 0.06, delay: 1.5, ease: 'back.out(2)' }
      )

      // Quality bar filling
      gsap.fromTo('.quality-bar',
        { scaleY: 0 },
        { scaleY: 1, duration: 1.5, delay: 0.5, ease: 'power2.out' }
      )

      // Counter
      gsap.fromTo('.quality-percent',
        { textContent: 0 },
        { textContent: 100, duration: 2, delay: 0.5, snap: { textContent: 1 }, ease: 'power2.out' }
      )

      // Duplicates reducing
      gsap.fromTo('.dupe-count',
        { textContent: 847 },
        { textContent: 0, duration: 2, delay: 1, snap: { textContent: 1 }, ease: 'power2.out' }
      )

      // Continuous subtle breathing - very subtle
      gsap.to('.organized-grid', {
        scale: 1.005,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      // Floating particles
      gsap.to('.clean-particle', {
        y: -150,
        opacity: 0,
        duration: 3,
        repeat: -1,
        stagger: 0.4,
        ease: 'power1.out',
      })
    }, svgRef)

    return () => ctx.revert()
  }, [isActive])

  // Layout constants - 5 columns x 4 rows grid
  const cols = 5
  const rows = 4
  const cardWidth = 75
  const cardHeight = 55
  const cardGapX = 85
  const cardGapY = 65
  const gridStartX = 50
  const gridStartY = 45

  return (
    <svg ref={svgRef} viewBox="0 0 800 400" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="dataGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor={color} stopOpacity="0.2" />
          <stop offset="100%" stopColor={colorSecondary} />
        </linearGradient>
      </defs>

      {/* Data grid - LEFT SIDE */}
      <g className="organized-grid" transform={`translate(${gridStartX}, ${gridStartY})`}>
        {Array.from({ length: cols * rows }).map((_, i) => {
          const row = Math.floor(i / cols)
          const col = i % cols
          const x = col * cardGapX
          const y = row * cardGapY
          return (
            <g key={i} className="data-block" style={{ transformOrigin: `${x + cardWidth / 2}px ${y + cardHeight / 2}px` }}>
              {/* Card */}
              <rect
                x={x}
                y={y}
                width={cardWidth}
                height={cardHeight}
                rx="10"
                fill="rgba(255,255,255,0.08)"
                stroke="rgba(255,255,255,0.15)"
              />

              {/* Data lines */}
              <rect x={x + 8} y={y + 12} width="40" height="5" rx="2.5" fill="rgba(255,255,255,0.3)" />
              <rect x={x + 8} y={y + 22} width="55" height="3" rx="1.5" fill="rgba(255,255,255,0.15)" />
              <rect x={x + 8} y={y + 30} width="45" height="3" rx="1.5" fill="rgba(255,255,255,0.15)" />
              <rect x={x + 8} y={y + 38} width="30" height="3" rx="1.5" fill="rgba(255,255,255,0.1)" />

              {/* Checkmark - positioned inside card, top right */}
              <g className="check-mark" style={{ transformOrigin: `${x + cardWidth - 12}px ${y + 12}px` }}>
                <circle cx={x + cardWidth - 12} cy={y + 12} r="8" fill={color} />
                <path
                  d={`M ${x + cardWidth - 16} ${y + 12} L ${x + cardWidth - 13} ${y + 15} L ${x + cardWidth - 7} ${y + 9}`}
                  stroke="white"
                  strokeWidth="1.5"
                  fill="none"
                />
              </g>
            </g>
          )
        })}
      </g>

      {/* RIGHT PANEL - Quality Score and Stats */}
      <g transform="translate(500, 50)">
        {/* Quality Score Panel */}
        <rect x="0" y="0" width="250" height="180" rx="16" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" />

        {/* Title */}
        <text x="125" y="30" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="12" fontWeight="500">
          Data Quality Score
        </text>

        {/* Circular progress meter */}
        <g transform="translate(125, 100)">
          {/* Background circle */}
          <circle cx="0" cy="0" r="50" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
          {/* Progress circle */}
          <circle
            className="quality-bar"
            cx="0"
            cy="0"
            r="50"
            fill="none"
            stroke="url(#dataGrad)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray="314"
            strokeDashoffset="0"
            transform="rotate(-90)"
            style={{ transformOrigin: '0 0' }}
          />
          {/* Center text */}
          <text textAnchor="middle" y="8" fill="white" fontSize="28" fontWeight="700">
            <tspan className="quality-percent">0</tspan>%
          </text>
        </g>
      </g>

      {/* Stats badges - BELOW quality panel */}
      <g transform="translate(500, 250)">
        {/* Duplicates stat */}
        <rect x="0" y="0" width="120" height="55" rx="12" fill={`${color}15`} stroke={color} strokeWidth="1" />
        <text x="60" y="22" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="10">
          Duplicidades
        </text>
        <text x="60" y="42" textAnchor="middle" fill={color} fontSize="18" fontWeight="700">
          <tspan className="dupe-count">847</tspan>
        </text>

        {/* Valid fields stat */}
        <rect x="130" y="0" width="120" height="55" rx="12" fill="rgba(16, 185, 129, 0.15)" stroke="#10B981" strokeWidth="1" />
        <text x="190" y="22" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="10">
          Campos Válidos
        </text>
        <text x="190" y="42" textAnchor="middle" fill="#10B981" fontSize="18" fontWeight="700">
          100%
        </text>
      </g>

      {/* Bottom label */}
      <g transform="translate(500, 330)">
        <rect x="0" y="0" width="250" height="40" rx="20" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" />
        <circle cx="25" cy="20" r="6" fill="#10B981" />
        <text x="45" y="25" fill="white" fontSize="12" fontWeight="500">
          Base higienizada e validada
        </text>
      </g>

      {/* Cleaning particles rising from grid */}
      {[0, 1, 2, 3].map((i) => (
        <circle
          key={i}
          className="clean-particle"
          cx={100 + i * 100}
          cy={320}
          r="3"
          fill={color}
          opacity="0.6"
        />
      ))}
    </svg>
  )
}

// ICP: Elegant Radar Visualization - Lead Tracking within ICP
function ICPVisualization({ isActive, color, colorSecondary }: { isActive: boolean; color: string; colorSecondary: string }) {
  const svgRef = useRef<SVGSVGElement>(null)

  // Layout constants - proportionally enlarged radar (matches right side content height)
  const radarCenterX = 190
  const radarCenterY = 190
  const radarRadius = 150

  // Leads data - representing tracked leads with their ICP fit
  const leads = [
    { id: 1, angle: 45, distance: 0.3, score: 95, label: 'Lead A', tier: 'hot' },
    { id: 2, angle: 120, distance: 0.5, score: 88, label: 'Lead B', tier: 'hot' },
    { id: 3, angle: 200, distance: 0.4, score: 82, label: 'Lead C', tier: 'warm' },
    { id: 4, angle: 280, distance: 0.7, score: 65, label: 'Lead D', tier: 'warm' },
    { id: 5, angle: 330, distance: 0.85, score: 45, label: 'Lead E', tier: 'cold' },
    { id: 6, angle: 75, distance: 0.6, score: 78, label: 'Lead F', tier: 'warm' },
  ]

  // ICP Criteria
  const criteria = [
    { name: 'Faturamento', value: 95, match: true },
    { name: 'Segmento', value: 88, match: true },
    { name: 'Tamanho', value: 92, match: true },
    { name: 'Maturidade', value: 78, match: true },
  ]

  // Convert polar to cartesian coordinates
  const polarToCartesian = (angle: number, distance: number) => {
    const radian = (angle - 90) * (Math.PI / 180)
    return {
      x: Math.cos(radian) * distance * radarRadius,
      y: Math.sin(radian) * distance * radarRadius,
    }
  }

  useEffect(() => {
    if (!isActive || !svgRef.current) return

    const ctx = gsap.context(() => {
      // 1. Radar grid appears
      gsap.fromTo('.radar-grid',
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' }
      )

      // 2. Radar rings pulse in sequence
      gsap.fromTo('.radar-ring',
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out', delay: 0.2 }
      )

      // 3. Cross lines appear
      gsap.fromTo('.radar-cross',
        { opacity: 0 },
        { opacity: 1, duration: 0.5, delay: 0.5 }
      )

      // 4. Radar sweep - CSS animation handles rotation

      // 5. Lead blips appear with stagger
      gsap.fromTo('.lead-blip',
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, stagger: 0.15, delay: 0.8, ease: 'back.out(2)' }
      )

      // 6. Lead pulse effect - subtle
      gsap.to('.lead-pulse', {
        scale: 1.4,
        opacity: 0,
        duration: 2,
        repeat: -1,
        ease: 'power2.out',
        stagger: 0.4,
      })

      // 7. Criteria bars fill
      gsap.fromTo('.criteria-fill',
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, stagger: 0.1, delay: 1, ease: 'power2.out' }
      )

    }, svgRef)

    return () => ctx.revert()
  }, [isActive])

  // Get color based on lead tier
  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'hot': return color
      case 'warm': return colorSecondary
      case 'cold': return 'rgba(255,255,255,0.4)'
      default: return 'rgba(255,255,255,0.3)'
    }
  }

  return (
    <svg ref={svgRef} viewBox="0 0 800 400" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        {/* Radar sweep gradient - conic effect */}
        <linearGradient id="radarSweepGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={color} stopOpacity="0" />
          <stop offset="50%" stopColor={color} stopOpacity="0.15" />
          <stop offset="100%" stopColor={color} stopOpacity="0.4" />
        </linearGradient>

        {/* Radial gradient for radar background */}
        <radialGradient id="radarBgGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={color} stopOpacity="0.05" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* LEFT SIDE - Radar Display */}
      <g transform={`translate(${radarCenterX}, ${radarCenterY})`}>
        {/* Radar background glow */}
        <circle cx="0" cy="0" r={radarRadius + 10} fill="url(#radarBgGrad)" className="radar-grid" />

        {/* Concentric rings */}
        {[1, 0.75, 0.5, 0.25].map((scale, i) => (
          <circle
            key={i}
            className="radar-ring"
            cx="0"
            cy="0"
            r={radarRadius * scale}
            fill="none"
            stroke={color}
            strokeWidth="1"
            opacity={0.2 + i * 0.1}
            style={{ transformOrigin: '0 0' }}
          />
        ))}

        {/* Cross lines (N-S, E-W) */}
        <g className="radar-cross" opacity="0.15">
          <line x1="0" y1={-radarRadius} x2="0" y2={radarRadius} stroke={color} strokeWidth="1" />
          <line x1={-radarRadius} y1="0" x2={radarRadius} y2="0" stroke={color} strokeWidth="1" />
          {/* Diagonal lines */}
          <line x1={-radarRadius * 0.7} y1={-radarRadius * 0.7} x2={radarRadius * 0.7} y2={radarRadius * 0.7} stroke={color} strokeWidth="0.5" strokeDasharray="4 4" />
          <line x1={radarRadius * 0.7} y1={-radarRadius * 0.7} x2={-radarRadius * 0.7} y2={radarRadius * 0.7} stroke={color} strokeWidth="0.5" strokeDasharray="4 4" />
        </g>

        {/* Radar sweep beam - rotates from center (0,0) which is already translated */}
        <g
          className="radar-beam"
          style={{
            animation: isActive ? 'radar-spin 4s linear infinite' : 'none',
            transformOrigin: '0 0',
          }}
        >
          <path
            d={`M 0 0 L 0 ${-radarRadius} A ${radarRadius} ${radarRadius} 0 0 1 ${radarRadius * Math.sin(Math.PI / 6)} ${-radarRadius * Math.cos(Math.PI / 6)} Z`}
            fill="url(#radarSweepGrad)"
          />
          {/* Beam leading edge line */}
          <line
            x1="0"
            y1="0"
            x2={radarRadius * Math.sin(Math.PI / 6)}
            y2={-radarRadius * Math.cos(Math.PI / 6)}
            stroke={color}
            strokeWidth="2"
            opacity="0.6"
          />
        </g>
        <style>
          {`
            @keyframes radar-spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}
        </style>

        {/* Lead blips */}
        {leads.map((lead) => {
          const pos = polarToCartesian(lead.angle, lead.distance)
          const tierColor = getTierColor(lead.tier)
          const blipSize = lead.tier === 'hot' ? 10 : lead.tier === 'warm' ? 8 : 6

          return (
            <g key={lead.id}>
              {/* Pulse ring (behind) */}
              <circle
                className="lead-pulse"
                cx={pos.x}
                cy={pos.y}
                r={blipSize}
                fill="none"
                stroke={tierColor}
                strokeWidth="2"
                opacity="0.5"
                style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}
              />
              {/* Main blip */}
              <g className="lead-blip" style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}>
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={blipSize}
                  fill={tierColor}
                />
              </g>
            </g>
          )
        })}

        {/* Center bullseye - ICP Core (proportional to radar) */}
        <circle cx="0" cy="0" r="23" fill={color} opacity="0.2" />
        <circle cx="0" cy="0" r="14" fill={color} />
        <circle cx="0" cy="0" r="5" fill="white" />
      </g>

      {/* RIGHT SIDE - Criteria Panel */}
      <g transform="translate(380, 40)">
        {/* Panel background */}
        <rect x="0" y="0" width="370" height="200" rx="16" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" />

        {/* Title */}
        <text x="20" y="28" fill="white" fontSize="13" fontWeight="600">Critérios de Qualificação</text>

        {/* Criteria bars */}
        {criteria.map((c, i) => (
          <g key={c.name} transform={`translate(20, ${48 + i * 36})`}>
            <text fill="rgba(255,255,255,0.7)" fontSize="11">{c.name}</text>
            <rect y="14" width="260" height="8" rx="4" fill="rgba(255,255,255,0.1)" />
            <rect
              className="criteria-fill"
              y="14"
              width={260 * (c.value / 100)}
              height="8"
              rx="4"
              fill={c.match ? color : 'rgba(255,255,255,0.3)'}
              style={{ transformOrigin: '0 18px' }}
            />
            <text x="275" y="21" fill={c.match ? color : 'rgba(255,255,255,0.5)'} fontSize="11" fontWeight="600">
              {c.value}%
            </text>
            {c.match && (
              <g transform="translate(310, 14)">
                <circle r="6" fill={color} />
                <path d="M -2.5 0 L -0.5 2 L 3.5 -2" stroke="white" strokeWidth="1.5" fill="none" />
              </g>
            )}
          </g>
        ))}
      </g>

      {/* Legend */}
      <g transform="translate(380, 260)">
        <rect x="0" y="0" width="370" height="80" rx="12" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" />
        <text x="20" y="24" fill="rgba(255,255,255,0.5)" fontSize="10" fontWeight="500">LEGENDA DE LEADS</text>

        {/* Hot */}
        <g transform="translate(20, 45)">
          <circle cx="8" cy="0" r="6" fill={color} />
          <text x="22" y="4" fill="rgba(255,255,255,0.7)" fontSize="11">Hot (80%+)</text>
        </g>

        {/* Warm */}
        <g transform="translate(130, 45)">
          <circle cx="8" cy="0" r="5" fill={colorSecondary} />
          <text x="22" y="4" fill="rgba(255,255,255,0.7)" fontSize="11">Warm (60-79%)</text>
        </g>

        {/* Cold */}
        <g transform="translate(260, 45)">
          <circle cx="8" cy="0" r="4" fill="rgba(255,255,255,0.4)" />
          <text x="22" y="4" fill="rgba(255,255,255,0.7)" fontSize="11">Cold (&lt;60%)</text>
        </g>
      </g>
    </svg>
  )
}

// Adoção: Team adoption wave visualization - FIXED LAYOUT
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

      // Progress ring - 100% complete
      gsap.fromTo('.progress-ring',
        { strokeDashoffset: 408 },
        { strokeDashoffset: 0, duration: 2, delay: 0.5, ease: 'power2.inOut' }
      )

      // Percentage counting - 100%
      gsap.fromTo('.adoption-percent',
        { textContent: 0 },
        { textContent: 100, duration: 2, delay: 0.5, snap: { textContent: 1 }, ease: 'power2.out' }
      )


    }, svgRef)

    return () => ctx.revert()
  }, [isActive])

  // Layout constants - 4 columns x 3 rows grid on LEFT side
  const cols = 4
  const rows = 3
  const personWidth = 50
  const personHeight = 70
  const gapX = 80
  const gapY = 85
  const gridStartX = 50
  const gridStartY = 60

  const people = Array.from({ length: cols * rows }).map((_, i) => {
    const row = Math.floor(i / cols)
    const col = i % cols
    return {
      x: gridStartX + col * gapX,
      y: gridStartY + row * gapY,
      certified: true, // 100% certified
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
            {/* Person silhouette - head */}
            <circle
              cx={person.x + personWidth / 2}
              cy={person.y + 12}
              r="14"
              fill={person.certified ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.3)'}
            />
            {/* Body */}
            <rect
              x={person.x + personWidth / 2 - 14}
              y={person.y + 30}
              width="28"
              height="28"
              rx="6"
              fill={person.certified ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.2)'}
            />

            {/* Certification badge - positioned clearly outside */}
            {person.certified && (
              <g className="cert-badge" style={{ transformOrigin: `${person.x + personWidth / 2 + 16}px ${person.y + 8}px` }}>
                <circle cx={person.x + personWidth / 2 + 16} cy={person.y + 8} r="10" fill={color} />
                <path
                  d={`M ${person.x + personWidth / 2 + 12} ${person.y + 8} L ${person.x + personWidth / 2 + 15} ${person.y + 11} L ${person.x + personWidth / 2 + 21} ${person.y + 4}`}
                  stroke="white"
                  strokeWidth="1.5"
                  fill="none"
                />
              </g>
            )}
          </g>
        </g>
      ))}


      {/* Role labels - positioned below each row */}
      {['Vendedores', 'SDRs', 'Gestores'].map((role, rowIdx) => (
        <text
          key={role}
          x={gridStartX + (cols * gapX) / 2 - gapX / 2}
          y={gridStartY + rowIdx * gapY + personHeight + 8}
          textAnchor="middle"
          fill="rgba(255,255,255,0.5)"
          fontSize="12"
          fontWeight="500"
        >
          {role}
        </text>
      ))}

      {/* RIGHT SIDE - Progress Panel */}
      <g transform="translate(420, 50)">
        {/* Panel background */}
        <rect x="0" y="0" width="330" height="300" rx="20" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" />

        {/* Progress circle */}
        <g transform="translate(165, 100)">
          <circle cx="0" cy="0" r="65" fill="rgba(255,255,255,0.05)" />
          <circle cx="0" cy="0" r="65" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="12" />
          <circle
            className="progress-ring"
            cx="0"
            cy="0"
            r="65"
            fill="none"
            stroke="url(#adoptGrad)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray="408"
            strokeDashoffset="408"
            transform="rotate(-90)"
          />
          <text textAnchor="middle" y="10" fill="white" fontSize="36" fontWeight="800">
            <tspan className="adoption-percent">0</tspan>%
          </text>
          <text textAnchor="middle" y="32" fill="rgba(255,255,255,0.6)" fontSize="12">certificados</text>
        </g>

        {/* Role breakdown - BELOW circle with clear spacing */}
        <g transform="translate(20, 195)">
          <text fill="rgba(255,255,255,0.6)" fontSize="12" fontWeight="600">Progresso por função</text>

          {[
            { role: 'Vendedores', count: '4/4', percentage: 100, color: color },
            { role: 'SDRs', count: '4/4', percentage: 100, color: colorSecondary },
            { role: 'Gestores', count: '4/4', percentage: 100, color: color },
          ].map((item, i) => (
            <g key={i} transform={`translate(0, ${24 + i * 28})`}>
              <text fill="rgba(255,255,255,0.7)" fontSize="12">{item.role}</text>
              <rect x="90" y="-9" width="150" height="10" rx="5" fill="rgba(255,255,255,0.1)" />
              <rect x="90" y="-9" width={150 * (item.percentage / 100)} height="10" rx="5" fill={item.color} />
              <text x="250" y="1" fill={item.color} fontSize="12" fontWeight="600">{item.count}</text>
            </g>
          ))}
        </g>
      </g>

    </svg>
  )
}

// Métricas: Dashboard visualization - FIXED LAYOUT
function MetricasVisualization({ isActive, color, colorSecondary }: { isActive: boolean; color: string; colorSecondary: string }) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!isActive || !svgRef.current) return

    const ctx = gsap.context(() => {
      // Chart bars growing
      gsap.fromTo('.metric-bar',
        { scaleY: 0 },
        { scaleY: 1, duration: 1, stagger: 0.05, ease: 'power2.out' }
      )

      // Line chart drawing
      gsap.fromTo('.trend-line',
        { strokeDashoffset: 500 },
        { strokeDashoffset: 0, duration: 2, delay: 0.5, ease: 'power2.out' }
      )

      // KPI cards
      gsap.fromTo('.kpi-card',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, delay: 0.3, ease: 'power2.out' }
      )

      // Numbers counting
      gsap.fromTo('.kpi-value',
        { textContent: 0 },
        { textContent: (i: number) => [23, 18, 12, 847][i % 4], duration: 2, delay: 0.8, snap: { textContent: 1 }, ease: 'power2.out' }
      )

      // Area fill
      gsap.fromTo('.area-fill',
        { opacity: 0 },
        { opacity: 0.3, duration: 1, delay: 1, ease: 'power2.out' }
      )
    }, svgRef)

    return () => ctx.revert()
  }, [isActive])

  // ═══════════════════════════════════════════════════════════════════════════
  // LAYOUT CALCULADO PARA SIMETRIA PERFEITA
  // ViewBox: 800 x 400
  // Lado esquerdo (0-400): Gráfico | Lado direito (400-800): KPI Cards
  // ═══════════════════════════════════════════════════════════════════════════

  // LEFT SIDE - Chart (ocupa 0-385, centralizado no lado esquerdo)
  const chartStartX = 20
  const chartStartY = 55
  const chartHeight = 270
  const barCount = 12
  const barWidth = 24
  const barGap = 28
  const yAxisWidth = 35
  // Largura total do gráfico: 35 + 12*28 = 371
  // Fim do gráfico: 20 + 371 = 391 (9px de margem até o centro 400)

  // RIGHT SIDE - KPI Cards (ocupa 420-780, centralizado no lado direito)
  // Layout: 2x2 grid com espaçamento garantido sem sobreposição
  const kpiPanelX = 420
  const kpiPanelY = 50
  const kpiCardWidth = 165
  const kpiCardHeight = 95
  const kpiGapX = 20 // Gap horizontal entre cards (aumentado)
  const kpiGapY = 25 // Gap vertical entre cards (aumentado)
  // Cálculo explícito das posições:
  // Col 0: x = 0
  // Col 1: x = 165 + 20 = 185
  // Row 0: y = 30 (após título)
  // Row 1: y = 30 + 95 + 25 = 150
  // Largura total: 165 + 20 + 165 = 350 (cabe em 380px disponíveis)
  // Altura total: 30 + 95 + 25 + 95 = 245 (cabe em 300px disponíveis)

  const barHeights = [40, 55, 48, 72, 65, 88, 78, 95, 82, 110, 92, 125]

  return (
    <svg ref={svgRef} viewBox="0 0 800 400" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="metricGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={colorSecondary} />
        </linearGradient>
      </defs>

      {/* ══════════ LEFT SIDE - Chart Area ══════════ */}

      {/* Chart title */}
      <text
        x={chartStartX + yAxisWidth + (barCount * barGap) / 2}
        y={chartStartY - 20}
        textAnchor="middle"
        fill="rgba(255,255,255,0.6)"
        fontSize="13"
        fontWeight="600"
      >
        Evolução Mensal
      </text>

      <g transform={`translate(${chartStartX}, ${chartStartY})`}>
        {/* Y-axis grid lines and labels */}
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <line
              x1={yAxisWidth}
              y1={i * (chartHeight / 4)}
              x2={yAxisWidth + barCount * barGap}
              y2={i * (chartHeight / 4)}
              stroke="rgba(255,255,255,0.05)"
              strokeDasharray="4 4"
            />
            <text
              x={yAxisWidth - 8}
              y={i * (chartHeight / 4) + 4}
              textAnchor="end"
              fill="rgba(255,255,255,0.5)"
              fontSize="11"
            >
              {(4 - i) * 25}%
            </text>
          </g>
        ))}

        {/* Axes */}
        <line x1={yAxisWidth} y1="0" x2={yAxisWidth} y2={chartHeight} stroke="rgba(255,255,255,0.15)" />
        <line x1={yAxisWidth} y1={chartHeight} x2={yAxisWidth + barCount * barGap} y2={chartHeight} stroke="rgba(255,255,255,0.15)" />

        {/* Bar chart */}
        {barHeights.map((h, i) => {
          const barH = (h / 125) * chartHeight
          const barX = yAxisWidth + i * barGap
          return (
            <rect
              key={i}
              className="metric-bar"
              x={barX}
              y={chartHeight - barH}
              width={barWidth}
              height={barH}
              rx="4"
              fill="url(#metricGrad)"
              style={{ transformOrigin: `${barX + barWidth / 2}px ${chartHeight}px` }}
            />
          )
        })}

        {/* Trend line */}
        <path
          className="trend-line"
          d={barHeights.map((h, i) => {
            const x = yAxisWidth + i * barGap + barWidth / 2
            const y = chartHeight - (h / 125) * chartHeight
            return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
          }).join(' ')}
          fill="none"
          stroke="#10B981"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="500"
          strokeDashoffset="500"
        />

        {/* Month labels */}
        {['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'].map((m, i) => (
          <text
            key={`${m}${i}`}
            x={yAxisWidth + i * barGap + barWidth / 2}
            y={chartHeight + 20}
            textAnchor="middle"
            fill="rgba(255,255,255,0.5)"
            fontSize="10"
          >
            {m.slice(0, 1)}
          </text>
        ))}
      </g>

      {/* ══════════ RIGHT SIDE - KPI Cards ══════════ */}
      <g transform={`translate(${kpiPanelX}, ${kpiPanelY})`}>
        {/* Title - centered over the 2x2 grid */}
        <text
          x={(kpiCardWidth * 2 + kpiGapX) / 2}
          y="0"
          textAnchor="middle"
          fill="rgba(255,255,255,0.7)"
          fontSize="13"
          fontWeight="600"
        >
          Métricas em Tempo Real
        </text>

        {/* KPI Cards - 2x2 grid with explicit positioning (sem sobreposição) */}
        {[
          { label: 'Conversão', value: '+23%', col: 0, row: 0 },
          { label: 'Ticket Médio', value: '+18%', col: 1, row: 0 },
          { label: 'Ciclo Vendas', value: '-12 dias', col: 0, row: 1 },
          { label: 'MRR', value: 'R$ 847k', isMoney: true, col: 1, row: 1 },
        ].map((kpi, i) => {
          // Posições calculadas explicitamente para evitar sobreposição
          const x = kpi.col * (kpiCardWidth + kpiGapX)
          const y = 30 + kpi.row * (kpiCardHeight + kpiGapY)
          return (
            <g key={i} transform={`translate(${x}, ${y})`}>
              <g className="kpi-card">
                <rect
                  width={kpiCardWidth}
                  height={kpiCardHeight}
                  rx="12"
                  fill="rgba(255,255,255,0.06)"
                  stroke={color}
                  strokeWidth="1"
                />
                <text
                  x={kpiCardWidth / 2}
                  y="32"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.6)"
                  fontSize="12"
                >
                  {kpi.label}
                </text>
                <text
                  x={kpiCardWidth / 2}
                  y="62"
                  textAnchor="middle"
                  fill={kpi.isMoney ? 'white' : '#10B981'}
                  fontSize="22"
                  fontWeight="700"
                >
                  {kpi.value}
                </text>
              </g>
            </g>
          )
        })}
      </g>
    </svg>
  )
}

// SVG Component Map
const VISUALIZATION_MAP: Record<string, React.FC<{ isActive: boolean; color: string; colorSecondary: string }>> = {
  journey: JourneyVisualization,
  processos: ProcessosVisualization,
  dados: DadosVisualization,
  icp: ICPVisualization,
  adocao: AdocaoVisualization,
  metricas: MetricasVisualization,
}

// ============================================================================
// HORIZONTAL TAB BUTTON (following AIInAction pattern)
// ============================================================================

interface PilarTabProps {
  pilar: Pilar
  isActive: boolean
  onClick: () => void
}

function PilarTab({ pilar, isActive, onClick }: PilarTabProps) {
  const Icon = pilar.icon

  return (
    <button
      onClick={onClick}
      className={cn(
        'relative px-4 py-2.5 sm:px-5 sm:py-3 rounded-2xl font-medium transition-all duration-300',
        'flex items-center gap-2',
        isActive
          ? 'text-white'
          : 'text-white/50 hover:text-white/80 hover:bg-white/5'
      )}
    >
      {isActive && (
        <motion.div
          layoutId="activePilarTab"
          className="absolute inset-0 rounded-2xl bg-brand shadow-elevated shadow-brand/20"
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
      )}
      <span className="relative z-10 flex items-center gap-2">
        <Icon size={18} weight={isActive ? 'fill' : 'duotone'} />
        <span className="hidden sm:inline">{pilar.nomeShort}</span>
        <span className="sm:hidden font-bold">{pilar.numero}</span>
      </span>
    </button>
  )
}

// ============================================================================
// EXPANDED CONTENT - Clean, non-AI styling
// ============================================================================

function ExpandedContent({ pilar }: { pilar: Pilar }) {
  const Visualization = VISUALIZATION_MAP[pilar.id]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Visualization - Full width with proper aspect ratio */}
      <div className="relative rounded-2xl overflow-hidden bg-white/[0.02] border border-white/[0.06]">
        <div className="w-full" style={{ aspectRatio: '2 / 1' }}>
          {Visualization && (
            <Visualization isActive={true} color={pilar.cor} colorSecondary={pilar.corSecundaria} />
          )}
        </div>
      </div>
    </motion.div>
  )
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function PilaresShowcaseSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  const activePilar = PILARES[activeIndex]

  const handleSelect = useCallback((index: number) => {
    setActiveIndex(index)
  }, [])

  return (
    <section
      ref={sectionRef}
      id="processo"
      className="relative py-12 sm:py-16 lg:py-20 bg-[#0A2540] overflow-hidden"
    >
      <Container>
        {/* Header - Compact */}
        <div className="text-center mb-6 sm:mb-8">
          <Reveal>
            <p className="text-brand font-semibold text-sm uppercase tracking-wider mb-2">
              A Solução
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
              6 Pilares que garantem{' '}
              <span className="text-[#635BFF]">
                CRM funcionando
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-sm sm:text-base lg:text-lg text-white/60 max-w-xl mx-auto">
              Cada pilar resolve uma dor real. Juntos, transformam Bitrix24 em motor de receita.
            </p>
          </Reveal>
        </div>

        {/* Horizontal Tabs - Following AIInAction pattern */}
        <Reveal delay={0.3}>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-10">
            {PILARES.map((pilar, index) => (
              <PilarTab
                key={pilar.id}
                pilar={pilar}
                isActive={index === activeIndex}
                onClick={() => handleSelect(index)}
              />
            ))}
          </div>
        </Reveal>

        {/* Content */}
        <Reveal delay={0.4}>
          <AnimatePresence mode="wait">
            <ExpandedContent key={activePilar.id} pilar={activePilar} />
          </AnimatePresence>
        </Reveal>

        {/* Progress indicator - Simple */}
        <div className="mt-6 max-w-xs mx-auto">
          <div className="h-0.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-[#635BFF]"
              initial={{ width: '0%' }}
              animate={{ width: `${((activeIndex + 1) / PILARES.length) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
          <p className="text-center mt-2 text-[11px] text-white/40">
            <span className="text-white/60 font-medium">{activeIndex + 1}</span>
            <span className="mx-1">/</span>
            <span>{PILARES.length}</span>
          </p>
        </div>
      </Container>
    </section>
  )
}
