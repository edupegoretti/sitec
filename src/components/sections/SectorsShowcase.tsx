'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Factory, Heart, Briefcase, Plane, ShoppingCart, ShieldCheck } from 'lucide-react'
import { Container } from '@/components/layout'
import { Reveal } from '@/components/shared'
import { ZOPU_STATS, ZOPU_LINKS } from '@/lib/constants'

// Componente de métrica animada
function AnimatedMetric({ value, isFeatured }: { value: string; isFeatured: boolean }) {
  const [displayValue, setDisplayValue] = useState(value)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)

          // Parse the value to animate
          const isNegative = value.startsWith('-')
          const isMultiplier = value.endsWith('x')
          const isPercentage = value.endsWith('%')
          const numericPart = parseFloat(value.replace(/[^0-9.]/g, ''))

          if (isNaN(numericPart)) {
            setDisplayValue(value)
            return
          }

          // Animate from 0 to target
          const duration = 1500
          const startTime = performance.now()

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / duration, 1)
            // Easing function - ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3)

            const current = Math.round(numericPart * eased)
            let formatted = ''

            if (isNegative) formatted += '-'
            formatted += current
            if (isPercentage) formatted += '%'
            if (isMultiplier) formatted += 'x'

            setDisplayValue(formatted)

            if (progress < 1) {
              requestAnimationFrame(animate)
            } else {
              setDisplayValue(value) // Ensure exact final value
            }
          }

          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value, hasAnimated])

  return (
    <div
      ref={ref}
      className={`font-bold text-white tracking-tight ${
        isFeatured ? 'text-6xl sm:text-7xl lg:text-8xl' : 'text-5xl sm:text-6xl'
      }`}
    >
      {displayValue}
    </div>
  )
}

// Setores principais com dados detalhados, contexto humano e depoimentos
const MAIN_SECTORS = [
  {
    id: 'saude',
    nome: 'Saúde',
    icon: Heart,
    metricaDestaque: '-65%',
    metricaLabel: 'no-show',
    gradientFrom: 'from-rose-500',
    gradientTo: 'to-pink-600',
    featured: true,
    quote: 'Reduzimos no-show de 30% para 10% em 60 dias. O WhatsZopu mudou nosso jogo.',
    clienteNome: 'Dra. Mariana Alves',
    clienteCargo: 'Diretora Clínica',
    clienteEmpresa: 'Rede MedVida SP',
  },
  {
    id: 'industria',
    nome: 'Indústria',
    icon: Factory,
    metricaDestaque: '2x',
    metricaLabel: 'forecast',
    gradientFrom: 'from-brand',
    gradientTo: 'to-purple-600',
    featured: false,
    quote: 'Finalmente enxergamos o pipeline. Forecast virou ciência, não chute.',
    clienteNome: 'Ricardo Mendes',
    clienteCargo: 'Diretor Comercial',
    clienteEmpresa: 'Autopeças Brasil',
  },
  {
    id: 'servicos',
    nome: 'Serviços',
    icon: Briefcase,
    metricaDestaque: '-87%',
    metricaLabel: 'proposta',
    gradientFrom: 'from-blue-500',
    gradientTo: 'to-cyan-500',
    featured: false,
    quote: 'Proposta que demorava 3 dias agora sai em 4 horas.',
    clienteNome: 'Paulo Nascimento',
    clienteCargo: 'Sócio-Diretor',
    clienteEmpresa: 'Consultoria Apex',
  },
  {
    id: 'turismo',
    nome: 'Turismo',
    icon: Plane,
    metricaDestaque: '5x',
    metricaLabel: 'mais rápido',
    gradientFrom: 'from-amber-500',
    gradientTo: 'to-orange-500',
    featured: false,
    quote: 'Cliente recebia cotação em 24h. Agora recebe em minutos.',
    clienteNome: 'Fernanda Costa',
    clienteCargo: 'CEO',
    clienteEmpresa: 'Viagens Corp',
  },
  {
    id: 'varejo',
    nome: 'Varejo',
    icon: ShoppingCart,
    metricaDestaque: '-78%',
    metricaLabel: 'resposta',
    gradientFrom: 'from-emerald-500',
    gradientTo: 'to-teal-500',
    featured: false,
    quote: 'Respondemos DM do Instagram em segundos. Conversão disparou.',
    clienteNome: 'Juliana Reis',
    clienteCargo: 'Head de E-commerce',
    clienteEmpresa: 'Moda Bella',
  },
  {
    id: 'sst',
    nome: 'SST',
    icon: ShieldCheck,
    metricaDestaque: '0%',
    metricaLabel: 'atrasos',
    gradientFrom: 'from-violet-500',
    gradientTo: 'to-purple-500',
    featured: false,
    quote: 'Zero multas em 2 anos. O sistema avisa antes de vencer.',
    clienteNome: 'Dr. Henrique Lima',
    clienteCargo: 'Diretor Técnico',
    clienteEmpresa: 'SafeWork SST',
  },
] as const

// Setores adicionais para o marquee (mostra amplitude)
const ADDITIONAL_SECTORS = [
  'Educação', 'Logística', 'Tecnologia', 'Imobiliário', 'Agronegócio',
  'Financeiro', 'Energia', 'Construção', 'Alimentício', 'Automotivo',
  'Jurídico', 'Contábil', 'Marketing', 'E-commerce', 'Franchising',
] as const

export function SectorsShowcase() {
  return (
    <section className="relative py-20 sm:py-28 bg-bg-dark overflow-hidden">
      {/* Elementos decorativos - Círculos blur */}
      <div className="absolute -left-32 top-1/4 w-96 h-96 bg-brand/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -right-32 bottom-1/4 w-80 h-80 bg-purple-500/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute left-1/2 top-0 w-64 h-64 bg-brand/5 rounded-full blur-3xl pointer-events-none -translate-x-1/2" />

      <Container className="relative">
        {/* Header com stats inline */}
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 tracking-tight">
              Resultados reais.
              <br />
              <span className="text-brand">Em setores como o seu.</span>
            </h2>
            <p className="text-gray-400 text-lg sm:text-xl">
              <span className="text-white font-semibold">{ZOPU_STATS.clientes}</span> empresas
              <span className="mx-2 text-gray-600">•</span>
              <span className="text-white font-semibold">20+</span> setores
              <span className="mx-2 text-gray-600">•</span>
              <span className="text-brand font-semibold">{ZOPU_STATS.retencao}</span> renovam
            </p>
          </div>
        </Reveal>

        {/* Grid de Cards com métricas visuais - Featured card ocupa 2 colunas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-16">
          {MAIN_SECTORS.map((sector, index) => {
            const Icon = sector.icon
            const isFeatured = sector.featured

            return (
              <Reveal
                key={sector.id}
                delay={index * 0.1}
                className={isFeatured ? 'sm:col-span-2 lg:col-span-2' : ''}
              >
                <Link
                  href={`/cases#${sector.id}`}
                  className="group relative block h-full"
                >
                  <div className={`
                    relative h-full bg-white/3 backdrop-blur-sm
                    border border-white/8 rounded-2xl
                    ${isFeatured ? 'p-8 sm:p-10 lg:p-12' : 'p-6 sm:p-8'}
                    hover:bg-white/8 hover:border-brand/30
                    transition-all duration-300
                    hover:shadow-xl hover:shadow-brand/10
                    hover:-translate-y-1
                    ${isFeatured ? 'border-brand/20' : ''}
                  `}>
                    {/* Badge "Destaque" para featured */}
                    {isFeatured && (
                      <div className="absolute top-4 right-4 px-3 py-1 bg-brand/20 rounded-full">
                        <span className="text-xs font-semibold text-brand uppercase tracking-wider">
                          Destaque
                        </span>
                      </div>
                    )}

                    {/* Layout diferente para featured vs normal */}
                    {isFeatured ? (
                      // Featured: Layout em duas colunas com mais contexto
                      <div className="lg:flex lg:gap-10">
                        {/* Coluna esquerda: Ícone + Métrica */}
                        <div className="lg:w-1/2">
                          {/* Ícone pulsante */}
                          <div className={`
                            w-16 h-16 lg:w-20 lg:h-20
                            rounded-xl bg-linear-to-br ${sector.gradientFrom} ${sector.gradientTo}
                            flex items-center justify-center mb-6
                            animate-icon-pulse
                            shadow-lg shadow-black/20
                          `}>
                            <Icon className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
                          </div>

                          {/* Métrica Animada */}
                          <AnimatedMetric value={sector.metricaDestaque} isFeatured={true} />
                          <div className="text-gray-400 text-base mt-2 uppercase tracking-wider">
                            {sector.metricaLabel}
                          </div>

                          {/* Nome do setor */}
                          <h3 className="text-2xl lg:text-3xl font-semibold text-white mt-4">
                            {sector.nome}
                          </h3>
                        </div>

                        {/* Coluna direita: Depoimento humano */}
                        <div className="lg:w-1/2 mt-6 lg:mt-0 lg:border-l lg:border-white/10 lg:pl-10 flex flex-col">
                          {/* Quote/Depoimento */}
                          <blockquote className="text-lg lg:text-xl text-white font-medium leading-relaxed mb-6">
                            "{sector.quote}"
                          </blockquote>

                          {/* Cliente com avatar placeholder */}
                          <div className="flex items-center gap-4 mt-auto">
                            {/* Avatar placeholder - iniciais */}
                            <div className={`
                              w-12 h-12 rounded-full bg-linear-to-br ${sector.gradientFrom} ${sector.gradientTo}
                              flex items-center justify-center text-white font-bold text-sm
                            `}>
                              {sector.clienteNome.split(' ').map(n => n[0]).join('').slice(0, 2)}
                            </div>
                            <div>
                              <p className="text-white font-semibold">{sector.clienteNome}</p>
                              <p className="text-gray-400 text-sm">{sector.clienteCargo}, {sector.clienteEmpresa}</p>
                            </div>
                          </div>

                          {/* CTA */}
                          <div className="flex items-center gap-2 text-brand font-semibold text-base mt-6
                            opacity-70 group-hover:opacity-100 transition-all duration-300">
                            Ver case completo
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      // Normal: Layout compacto com depoimento
                      <>
                        {/* Header: Ícone + Setor */}
                        <div className="flex items-start justify-between mb-4">
                          <div className={`
                            w-12 h-12 rounded-xl bg-linear-to-br ${sector.gradientFrom} ${sector.gradientTo}
                            flex items-center justify-center
                            group-hover:scale-110 transition-transform duration-300
                            shadow-lg shadow-black/20
                          `}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <span className="text-xs text-gray-500 uppercase tracking-wider">
                            {sector.nome}
                          </span>
                        </div>

                        {/* Métrica Animada */}
                        <AnimatedMetric value={sector.metricaDestaque} isFeatured={false} />
                        <div className="text-sm text-gray-400 uppercase tracking-wider mb-4">
                          {sector.metricaLabel}
                        </div>

                        {/* Quote resumido */}
                        <p className="text-sm text-gray-300 mb-4 line-clamp-2 italic">
                          "{sector.quote}"
                        </p>

                        {/* Cliente compacto */}
                        <div className="flex items-center gap-3 mb-4">
                          {/* Mini avatar */}
                          <div className={`
                            w-8 h-8 rounded-full bg-linear-to-br ${sector.gradientFrom} ${sector.gradientTo}
                            flex items-center justify-center text-white font-bold text-xs
                          `}>
                            {sector.clienteNome.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </div>
                          <div>
                            <p className="text-white text-sm font-medium">{sector.clienteNome}</p>
                            <p className="text-gray-500 text-xs">{sector.clienteEmpresa}</p>
                          </div>
                        </div>

                        {/* CTA que aparece no hover */}
                        <div className="flex items-center gap-2 text-brand text-sm font-semibold
                          opacity-0 group-hover:opacity-100 transition-all duration-300
                          translate-y-2 group-hover:translate-y-0">
                          Ver case
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </>
                    )}

                    {/* Glow effect no hover */}
                    <div className="
                      absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100
                      bg-linear-to-br from-brand/5 to-transparent
                      transition-opacity duration-300 pointer-events-none
                    " />
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </div>

        {/* Marquee minimalista como footnote */}
        <Reveal delay={0.6}>
          <div className="pt-8 border-t border-white/5">
            <p className="text-center text-xs text-gray-500 uppercase tracking-wider mb-4">
              Também atendemos
            </p>

            <div className="relative overflow-hidden">
              {/* Gradientes de fade nas bordas */}
              <div className="absolute left-0 top-0 bottom-0 w-20 bg-linear-to-r from-bg-dark to-transparent z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-20 bg-linear-to-l from-bg-dark to-transparent z-10" />

              {/* Marquee animado - mais sutil */}
              <div className="flex animate-scroll-slow opacity-50">
                {[...ADDITIONAL_SECTORS, ...ADDITIONAL_SECTORS].map((sector, index) => (
                  <span
                    key={index}
                    className="shrink-0 mx-6 text-sm text-gray-500 whitespace-nowrap"
                  >
                    {sector}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* CTA final */}
        <Reveal delay={0.7}>
          <div className="text-center mt-12">
            <p className="text-gray-500 text-sm mb-4">
              Não encontrou seu setor?
            </p>
            <a
              href={ZOPU_LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center gap-2 px-6 py-3
                text-white font-semibold
                bg-white/5 border border-white/10 rounded-full
                hover:bg-white/10 hover:border-white/20
                transition-all duration-300
              "
            >
              Fale com um especialista
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
