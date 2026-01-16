'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  WhatsappLogo,
  EnvelopeSimple,
  MapPin,
  Phone,
  Clock,
  ArrowRight,
  LinkedinLogo,
  InstagramLogo,
  YoutubeLogo,
  CheckCircle,
  SpinnerGap,
  PaperPlaneTilt,
} from '@phosphor-icons/react'
import { Container } from '@/components/layout'
import { Badge, Reveal } from '@/components/shared'
import { ZOPU_LINKS, ZOPU_STATS } from '@/lib/constants'
import { cn } from '@/lib/utils'

// Contact channels data
const CONTACT_CHANNELS = [
  {
    id: 'whatsapp',
    icon: WhatsappLogo,
    title: 'WhatsApp',
    subtitle: 'Resposta mais rápida',
    value: '+55 47 3307-9280',
    href: ZOPU_LINKS.whatsappEspecialista,
    color: 'from-green-500 to-emerald-600',
    hoverColor: 'group-hover:from-green-400 group-hover:to-emerald-500',
    badge: 'Recomendado',
    description: `SLA de primeira resposta: ${ZOPU_STATS.tempoResposta}`,
  },
  {
    id: 'email',
    icon: EnvelopeSimple,
    title: 'E-mail',
    subtitle: 'Para assuntos formais',
    value: ZOPU_LINKS.email,
    href: `mailto:${ZOPU_LINKS.email}`,
    color: 'from-brand to-brand-gradient',
    hoverColor: 'group-hover:from-brand-hover group-hover:to-brand',
    description: 'Respondemos em até 24h úteis',
  },
  {
    id: 'phone',
    icon: Phone,
    title: 'Telefone',
    subtitle: 'Ligação direta',
    value: '+55 47 3307-9280',
    href: 'tel:+554733079280',
    color: 'from-slate-600 to-slate-700',
    hoverColor: 'group-hover:from-slate-500 group-hover:to-slate-600',
    description: 'Seg-Sex: 8h às 18h',
  },
]

const SOCIAL_LINKS = [
  { icon: LinkedinLogo, href: ZOPU_LINKS.linkedin, label: 'LinkedIn' },
  { icon: InstagramLogo, href: ZOPU_LINKS.instagram, label: 'Instagram' },
  { icon: YoutubeLogo, href: ZOPU_LINKS.youtube, label: 'YouTube' },
]

// Form subjects
const FORM_SUBJECTS = [
  { value: 'comercial', label: 'Quero conhecer as soluções' },
  { value: 'suporte', label: 'Sou cliente e preciso de suporte' },
  { value: 'parceria', label: 'Proposta de parceria' },
  { value: 'imprensa', label: 'Imprensa / Assessoria' },
  { value: 'outro', label: 'Outro assunto' },
]

export function ContatoPage() {
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState('loading')

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // For now, redirect to WhatsApp with the message
    const message = `Olá! Meu nome é ${formData.name}${formData.company ? ` da empresa ${formData.company}` : ''}.

Assunto: ${FORM_SUBJECTS.find((s) => s.value === formData.subject)?.label || formData.subject}

${formData.message}

Contato: ${formData.email}${formData.phone ? ` | ${formData.phone}` : ''}`

    const whatsappUrl = `https://wa.me/554733079280?text=${encodeURIComponent(message)}`

    setFormState('success')

    setTimeout(() => {
      window.open(whatsappUrl, '_blank')
    }, 1000)
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <main className="bg-white">
      {/* Hero Section - Dark, Premium */}
      <section className="relative pt-16 sm:pt-20 pb-24 sm:pb-32 bg-bg-dark overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(99,91,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,91,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
          <motion.div
            animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.1, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4"
          />
          <motion.div
            animate={{ opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-success/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4"
          />
        </div>

        <Container className="relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <Reveal>
              <Badge variant="dark" className="mb-6">
                <Clock size={14} weight="fill" className="mr-1.5" />
                Resposta em {ZOPU_STATS.tempoResposta}
              </Badge>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
                Vamos conversar sobre{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-brand-gradient">
                  seu projeto?
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-6 text-lg sm:text-xl text-white/70 leading-relaxed">
                Escolha o canal que preferir. Nossa equipe está pronta para ajudar você a transformar
                sua operação comercial com Bitrix24.
              </p>
            </Reveal>
          </div>

          {/* Contact Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {CONTACT_CHANNELS.map((channel, index) => (
              <Reveal key={channel.id} delay={0.3 + index * 0.1}>
                <a
                  href={channel.href}
                  target={channel.id === 'whatsapp' ? '_blank' : undefined}
                  rel={channel.id === 'whatsapp' ? 'noopener noreferrer' : undefined}
                  className="group relative block p-6 sm:p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand/10"
                >
                  {/* Recommended badge */}
                  {channel.badge && (
                    <span className="absolute -top-3 right-6 px-3 py-1 bg-success text-white text-xs font-bold rounded-full shadow-lg">
                      {channel.badge}
                    </span>
                  )}

                  {/* Icon */}
                  <div
                    className={cn(
                      'w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center mb-5 transition-all duration-500',
                      channel.color,
                      channel.hoverColor
                    )}
                  >
                    <channel.icon size={28} weight="fill" className="text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-1">{channel.title}</h3>
                  <p className="text-sm text-white/50 mb-3">{channel.subtitle}</p>
                  <p className="text-white/90 font-medium mb-4">{channel.value}</p>
                  <p className="text-xs text-white/40">{channel.description}</p>

                  {/* Arrow */}
                  <div className="absolute bottom-6 right-6 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1">
                    <ArrowRight size={18} className="text-white" />
                  </div>
                </a>
              </Reveal>
            ))}
          </div>

          {/* Social links */}
          <Reveal delay={0.6}>
            <div className="flex items-center justify-center gap-4 mt-12">
              <span className="text-sm text-white/40">Siga a Zopu:</span>
              <div className="flex gap-3">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                  >
                    <social.icon size={20} weight="fill" />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Form Section - Light, Clean */}
      <section className="py-20 sm:py-28 bg-gradient-to-b from-bg-secondary to-white relative">
        {/* Decorative */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left: Form */}
            <Reveal direction="left">
              <div className="relative">
                <Badge variant="default" className="mb-6">
                  <PaperPlaneTilt size={14} weight="fill" className="mr-1.5" />
                  Formulário de contato
                </Badge>

                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  Prefere enviar uma mensagem?
                </h2>
                <p className="text-gray-600 mb-8">
                  Preencha o formulário abaixo e entraremos em contato em breve. Campos com * são
                  obrigatórios.
                </p>

                {formState === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-8 rounded-3xl bg-success-light border border-success/20 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle size={32} weight="fill" className="text-success" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Mensagem enviada!</h3>
                    <p className="text-gray-600 mb-4">
                      Você será redirecionado para o WhatsApp para confirmar o envio.
                    </p>
                    <p className="text-sm text-gray-500">
                      Caso o WhatsApp não abra automaticamente,{' '}
                      <a
                        href={ZOPU_LINKS.whatsappEspecialista}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand hover:underline"
                      >
                        clique aqui
                      </a>
                      .
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name & Email row */}
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                          Nome completo *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:border-brand focus:ring-0 transition-colors duration-200"
                          placeholder="Seu nome"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          E-mail corporativo *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:border-brand focus:ring-0 transition-colors duration-200"
                          placeholder="email@empresa.com"
                        />
                      </div>
                    </div>

                    {/* Phone & Company row */}
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                          Telefone / WhatsApp
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:border-brand focus:ring-0 transition-colors duration-200"
                          placeholder="(00) 00000-0000"
                        />
                      </div>
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                          Empresa
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:border-brand focus:ring-0 transition-colors duration-200"
                          placeholder="Nome da empresa"
                        />
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                        Assunto *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 bg-white text-gray-900 focus:border-brand focus:ring-0 transition-colors duration-200 appearance-none cursor-pointer"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236B7385'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 1rem center',
                          backgroundSize: '1.25rem',
                        }}
                      >
                        <option value="">Selecione um assunto</option>
                        {FORM_SUBJECTS.map((subject) => (
                          <option key={subject.value} value={subject.value}>
                            {subject.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Mensagem *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:border-brand focus:ring-0 transition-colors duration-200 resize-none"
                        placeholder="Conte-nos mais sobre seu projeto ou dúvida..."
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={formState === 'loading'}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-brand text-white font-semibold rounded-2xl hover:bg-brand-hover transition-all duration-300 shadow-elevated shadow-brand/20 hover:shadow-elevated-hover hover:shadow-brand/30 hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                    >
                      {formState === 'loading' ? (
                        <>
                          <SpinnerGap size={20} className="animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          Enviar mensagem
                          <ArrowRight size={20} weight="bold" />
                        </>
                      )}
                    </button>

                    <p className="text-xs text-gray-500 mt-4">
                      Ao enviar, você será redirecionado para o WhatsApp para confirmar a mensagem.
                    </p>
                  </form>
                )}
              </div>
            </Reveal>

            {/* Right: Location & Info */}
            <Reveal direction="right" delay={0.2}>
              <div className="lg:sticky lg:top-24 space-y-8">
                {/* Location Card */}
                <div className="relative rounded-3xl overflow-hidden">
                  {/* Map placeholder - stylized */}
                  <div className="relative h-64 bg-gradient-to-br from-slate-100 to-slate-200">
                    {/* Stylized map background */}
                    <div className="absolute inset-0 opacity-30">
                      <svg viewBox="0 0 400 200" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#64748b" strokeWidth="0.5" />
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                        {/* Road lines */}
                        <line x1="0" y1="100" x2="400" y2="100" stroke="#94a3b8" strokeWidth="4" />
                        <line x1="200" y1="0" x2="200" y2="200" stroke="#94a3b8" strokeWidth="4" />
                        <line x1="50" y1="50" x2="350" y2="150" stroke="#cbd5e1" strokeWidth="2" />
                      </svg>
                    </div>

                    {/* Location pin */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        className="relative"
                      >
                        <div className="w-16 h-16 rounded-full bg-brand/20 flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-brand flex items-center justify-center shadow-lg shadow-brand/30">
                            <MapPin size={24} weight="fill" className="text-white" />
                          </div>
                        </div>
                        {/* Pulse effect */}
                        <div className="absolute inset-0 rounded-full bg-brand/20 animate-ping" />
                      </motion.div>
                    </div>

                    {/* City label */}
                    <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm">
                      <span className="text-sm font-semibold text-gray-900">Joinville, SC</span>
                    </div>
                  </div>

                  {/* Address info */}
                  <div className="p-6 bg-white border border-gray-100 border-t-0 rounded-b-3xl">
                    <h3 className="font-bold text-gray-900 mb-2">Escritório Zopu</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Joinville, Santa Catarina, Brasil
                      <br />
                      Atendimento em todo território nacional
                    </p>
                  </div>
                </div>

                {/* Quick info cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm">
                    <Clock size={24} className="text-brand mb-3" />
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">Horário</h4>
                    <p className="text-xs text-gray-500">Seg-Sex: 8h às 18h</p>
                  </div>
                  <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm">
                    <CheckCircle size={24} weight="fill" className="text-success mb-3" />
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">SLA Garantido</h4>
                    <p className="text-xs text-gray-500">Resposta em {ZOPU_STATS.tempoResposta}</p>
                  </div>
                </div>

                {/* CTA box */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-brand/5 to-brand/10 border border-brand/10">
                  <h4 className="font-bold text-gray-900 mb-2">Precisa de resposta imediata?</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    O WhatsApp é o canal mais rápido para falar com nossos especialistas.
                  </p>
                  <a
                    href={ZOPU_LINKS.whatsappEspecialista}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#25D366] text-white font-semibold rounded-xl hover:bg-[#20BA5C] transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    <WhatsappLogo size={20} weight="fill" />
                    Abrir WhatsApp
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-white border-t border-gray-100">
        <Container>
          <Reveal>
            <div className="text-center max-w-2xl mx-auto">
              <p className="text-gray-500 mb-4">
                Mais de{' '}
                <span className="font-semibold text-gray-900">{ZOPU_STATS.clientes} empresas</span>{' '}
                já transformaram sua operação com a Zopu.
              </p>
              <p className="text-sm text-gray-400">
                Gold Partner Bitrix24 • {ZOPU_STATS.retencao} de retenção • Atendimento em todo Brasil
              </p>
            </div>
          </Reveal>
        </Container>
      </section>
    </main>
  )
}
