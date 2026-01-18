'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/layout'
import { Check } from '@phosphor-icons/react'

/**
 * Premium Shield SVG - Prominent hero element
 */
function ShieldIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* More visible fill gradient */}
        <linearGradient id="shieldFillMain" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#635BFF" stopOpacity="0.15" />
          <stop offset="50%" stopColor="#635BFF" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#635BFF" stopOpacity="0.02" />
        </linearGradient>
        {/* Stronger stroke gradient */}
        <linearGradient id="shieldStrokeMain" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#635BFF" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#635BFF" stopOpacity="0.2" />
        </linearGradient>
        {/* Check gradient - emerald */}
        <linearGradient id="checkGradientMain" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="100%" stopColor="#10B981" />
        </linearGradient>
        {/* Glow filter */}
        <filter id="shieldGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Outer glow layer */}
      <path
        d="M100 12L180 44V100C180 156 144 200 100 224C56 200 20 156 20 100V44L100 12Z"
        fill="none"
        stroke="#635BFF"
        strokeOpacity="0.3"
        strokeWidth="2"
        filter="url(#shieldGlow)"
      />

      {/* Main shield */}
      <path
        d="M100 12L180 44V100C180 156 144 200 100 224C56 200 20 156 20 100V44L100 12Z"
        fill="url(#shieldFillMain)"
        stroke="url(#shieldStrokeMain)"
        strokeWidth="2"
      />

      {/* Inner shield accent */}
      <path
        d="M100 32L160 56V100C160 144 132 180 100 200C68 180 40 144 40 100V56L100 32Z"
        stroke="#635BFF"
        strokeOpacity="0.25"
        strokeWidth="1"
        fill="none"
      />

      {/* Checkmark */}
      <motion.path
        d="M70 118L90 138L130 98"
        stroke="url(#checkGradientMain)"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6, ease: 'easeOut' }}
      />
    </svg>
  )
}

/**
 * Security Manifesto - Editorial approach with numbered principles
 */
const securityPrinciples = [
  {
    number: '01',
    title: 'Equipamentos corporativos',
    statement: 'Dados de clientes nunca transitam em dispositivos pessoais.',
    detail: 'Todo colaborador recebe equipamento da empresa, configurado com políticas de segurança. Sem exceções, sem BYOD.',
  },
  {
    number: '02',
    title: 'Gestão centralizada de senhas',
    statement: 'Cofre corporativo 1Password para toda a equipe.',
    detail: 'Nenhuma senha armazenada localmente, em navegadores ou compartilhada por outros meios. Rotação obrigatória.',
  },
  {
    number: '03',
    title: 'Dados 100% em nuvem',
    statement: 'Zero dados locais. Tudo auditável.',
    detail: 'Protocolo de limpeza conforme contrato, documentado e verificável. Ao término do projeto, seus dados são removidos.',
  },
  {
    number: '04',
    title: 'Autenticação em duas etapas',
    statement: 'Todos os acessos exigem 2FA. Sem exceções.',
    detail: 'Serviços internos, acessos a clientes, ferramentas de desenvolvimento — tudo protegido por autenticação dupla.',
  },
  {
    number: '05',
    title: 'Proteção endpoint',
    statement: 'Antivírus e monitoramento em todas as máquinas.',
    detail: 'Atualizações automáticas obrigatórias. Varredura contínua. Alertas em tempo real para a equipe de TI.',
  },
  {
    number: '06',
    title: 'Equipe 100% interna',
    statement: 'Não terceirizamos. Não contratamos freelancers.',
    detail: 'Profissionais internos treinados em segurança da informação. Você sabe quem está trabalhando com seus dados.',
  },
]

const certifications = ['LGPD Compliant', '2FA Obrigatório', 'Zero Trust', 'VPN Only']

export function TrustCenterHero() {
  return (
    <section className="relative overflow-hidden bg-[#050508]">
      {/* Hero Section - Split Layout */}
      <div className="relative min-h-screen flex items-center">
        <Container>
          <div className="py-24 sm:py-32 lg:py-40">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left: Text content */}
              <div className="order-2 lg:order-1">
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="mb-6"
                >
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.03] border border-white/[0.08] rounded-full text-sm text-gray-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Trust Center
                  </span>
                </motion.div>

                {/* Main heading */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.1] tracking-tight"
                >
                  A segurança dos seus dados é o{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand via-brand to-brand-gradient">
                    nosso compromisso.
                  </span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-lg text-gray-400 max-w-xl mb-8 leading-relaxed"
                >
                  Empresas sérias exigem parceiros sérios. Investimos em infraestrutura,
                  processos e pessoas — com o mesmo rigor que você aplicaria internamente.
                </motion.p>

                {/* Certification badges */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="flex flex-wrap gap-2.5"
                >
                  {certifications.map((cert, index) => (
                    <motion.span
                      key={cert}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="inline-flex items-center gap-2 px-3.5 py-2 bg-emerald-500/8 border border-emerald-500/20 rounded-lg text-sm font-medium text-emerald-300"
                    >
                      <Check size={14} weight="bold" className="text-emerald-400" />
                      {cert}
                    </motion.span>
                  ))}
                </motion.div>
              </div>

              {/* Right: Shield - Prominent focal point */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="order-1 lg:order-2 flex justify-center lg:justify-end"
              >
                <div className="relative">
                  {/* Ambient glow behind shield */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] bg-brand/10 rounded-full blur-[100px]" />

                  {/* Shield */}
                  <ShieldIcon className="relative w-[200px] h-[240px] sm:w-[280px] sm:h-[336px] lg:w-[320px] lg:h-[384px]" />
                </div>
              </motion.div>
            </div>
          </div>
        </Container>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center p-2"
          >
            <motion.div className="w-1 h-2 bg-white/40 rounded-full" />
          </motion.div>
        </motion.div>
      </div>

      {/* Security Manifesto Section - Editorial Style */}
      <div className="relative bg-[#08080C]">
        {/* Section intro */}
        <Container>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="pt-24 sm:pt-32 pb-16 sm:pb-20 border-t border-white/[0.04]"
          >
            <div className="max-w-3xl">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-brand font-medium tracking-wide uppercase text-sm mb-4"
              >
                Nossos Princípios de Segurança
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight"
              >
                Não basta dizer que é seguro.
                <br />
                <span className="text-gray-500">Precisa demonstrar.</span>
              </motion.h2>
            </div>
          </motion.div>
        </Container>

        {/* Principles - Editorial manifesto layout */}
        <div className="relative">
          {securityPrinciples.map((principle, index) => (
            <motion.div
              key={principle.number}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className="border-t border-white/[0.06]"
            >
              <Container>
                <div className="py-12 sm:py-16 lg:py-20">
                  <div className={`flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-16 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                    {/* Number */}
                    <motion.div
                      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="lg:w-32 shrink-0"
                    >
                      <span className="text-7xl sm:text-8xl lg:text-9xl font-bold text-white/[0.06] leading-none tracking-tighter">
                        {principle.number}
                      </span>
                    </motion.div>

                    {/* Content */}
                    <div className="flex-1 max-w-2xl">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <h3 className="text-sm font-medium text-brand uppercase tracking-wide mb-3">
                          {principle.title}
                        </h3>
                        <p className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white leading-snug mb-4">
                          {principle.statement}
                        </p>
                        <p className="text-base sm:text-lg text-gray-400 leading-relaxed">
                          {principle.detail}
                        </p>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </Container>
            </motion.div>
          ))}
        </div>

        {/* Bottom statement */}
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="py-16 sm:py-24 border-t border-white/[0.06] text-center"
          >
            <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto">
              Práticas atestadas por{' '}
              <span className="text-white font-medium">certificação ISO 27001</span>.
            </p>
          </motion.div>
        </Container>
      </div>
    </section>
  )
}
