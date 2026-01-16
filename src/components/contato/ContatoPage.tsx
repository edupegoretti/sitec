'use client'

import { useEffect } from 'react'
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
  PaperPlaneTilt,
} from '@phosphor-icons/react'
import { Container } from '@/components/layout'
import { Badge, Reveal } from '@/components/shared'
import { ZOPU_LINKS, ZOPU_STATS } from '@/lib/constants'
import { cn } from '@/lib/utils'

// Company contact info
const ZOPU_CONTACT = {
  address: 'Rua Rio Grande do Sul, 385',
  neighborhood: 'Anita Garibaldi',
  city: 'Joinville',
  state: 'SC',
  cep: '89203-570',
  country: 'Brasil',
  tollfree: '0800 042 9000',
  phone: '+55 47 3307-9280',
  cnpj: '44.621.554/0001-81',
  // Google Maps embed URL for the actual address
  mapsEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3578.1247339999997!2d-48.8494444!3d-26.3047222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94deaf9999999999%3A0x0!2sRua%20Rio%20Grande%20do%20Sul%2C%20385%20-%20Am%C3%A9rica%2C%20Joinville%20-%20SC!5e0!3m2!1spt-BR!2sbr!4v1',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Rua+Rio+Grande+do+Sul+385+Joinville+SC+Brasil',
}

// Contact channels data
const CONTACT_CHANNELS = [
  {
    id: 'tollfree',
    icon: Phone,
    title: '0800 042 9000',
    subtitle: 'Ligação gratuita',
    value: 'Ligação gratuita de qualquer lugar do Brasil',
    href: 'tel:08000429000',
    color: 'from-brand to-brand-gradient',
    hoverColor: 'group-hover:from-brand-hover group-hover:to-brand',
    badge: 'Gratuito',
    description: 'Seg-Sex: 8h às 18h',
  },
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
    color: 'from-slate-600 to-slate-700',
    hoverColor: 'group-hover:from-slate-500 group-hover:to-slate-600',
    description: 'Respondemos em até 24h úteis',
  },
]

const SOCIAL_LINKS = [
  { icon: LinkedinLogo, href: ZOPU_LINKS.linkedin, label: 'LinkedIn' },
  { icon: InstagramLogo, href: ZOPU_LINKS.instagram, label: 'Instagram' },
  { icon: YoutubeLogo, href: ZOPU_LINKS.youtube, label: 'YouTube' },
]

// Bitrix24 CRM Form ID
const BITRIX24_FORM_SCRIPT = 'https://cdn.bitrix24.com.br/b19877839/crm/form/loader_43.js'

export function ContatoPage() {
  // Load Bitrix24 CRM form script
  useEffect(() => {
    const script = document.createElement('script')
    script.src = `${BITRIX24_FORM_SCRIPT}?${Math.floor(Date.now() / 180000)}`
    script.async = true
    document.body.appendChild(script)

    return () => {
      // Cleanup on unmount
      const existingScript = document.querySelector(`script[src^="${BITRIX24_FORM_SCRIPT}"]`)
      if (existingScript) {
        existingScript.remove()
      }
    }
  }, [])

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
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch">
            {CONTACT_CHANNELS.map((channel, index) => (
              <Reveal key={channel.id} delay={0.3 + index * 0.1} className="h-full">
                <a
                  href={channel.href}
                  target={channel.id === 'whatsapp' ? '_blank' : undefined}
                  rel={channel.id === 'whatsapp' ? 'noopener noreferrer' : undefined}
                  className="group relative flex flex-col h-full p-6 sm:p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand/10"
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
                  <p className="text-white/90 font-medium mb-4 flex-1">{channel.value}</p>
                  <p className="text-xs text-white/40 mt-auto">{channel.description}</p>

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
                  Preencha o formulário abaixo e entraremos em contato em breve.
                </p>

                {/* Bitrix24 CRM Form Container */}
                <div
                  className="b24-form-container min-h-100 rounded-2xl overflow-hidden"
                  data-b24-form="inline/43/xjqt5z"
                  data-skip-moving="true"
                />
              </div>
            </Reveal>

            {/* Right: Location & Info */}
            <Reveal direction="right" delay={0.2}>
              <div className="lg:sticky lg:top-24 space-y-6">
                {/* Location Card with Real Map */}
                <div className="relative rounded-3xl overflow-hidden shadow-lg border border-gray-100">
                  {/* Google Maps Embed */}
                  <div className="relative h-64 bg-gray-100">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3578.124!2d-48.8494!3d-26.3047!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94deaf8b6c0fb5c5%3A0x62b5a3e5a5f5f5f5!2sR.%20Rio%20Grande%20do%20Sul%2C%20385%20-%20Am%C3%A9rica%2C%20Joinville%20-%20SC%2C%2089201-260!5e0!3m2!1spt-BR!2sbr!4v1705000000000!5m2!1spt-BR!2sbr"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Localização Zopu - Joinville, SC"
                      className="transition-all duration-500"
                    />
                    {/* Open in Maps button */}
                    <a
                      href={ZOPU_CONTACT.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute top-3 right-3 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-lg shadow-md text-xs font-semibold text-gray-700 hover:bg-white hover:text-brand transition-colors flex items-center gap-1.5"
                    >
                      <MapPin size={14} weight="fill" />
                      Abrir no Maps
                    </a>
                  </div>

                  {/* Full Address Info */}
                  <div className="p-6 bg-white">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-brand/10 flex items-center justify-center shrink-0">
                        <MapPin size={24} weight="fill" className="text-brand" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 mb-1">Escritório Zopu</h3>
                        <address className="text-gray-600 text-sm leading-relaxed not-italic">
                          {ZOPU_CONTACT.address}
                          <br />
                          {ZOPU_CONTACT.neighborhood} – {ZOPU_CONTACT.city}/{ZOPU_CONTACT.state}
                          <br />
                          CEP: {ZOPU_CONTACT.cep}
                        </address>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <p className="text-xs text-gray-500 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                        Atendimento em todo território nacional
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quick Contact Cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm">
                    <Phone size={24} weight="fill" className="text-brand mb-3" />
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">0800 Gratuito</h4>
                    <a
                      href="tel:08000429000"
                      className="text-xs text-gray-600 hover:text-brand transition-colors"
                    >
                      {ZOPU_CONTACT.tollfree}
                    </a>
                  </div>
                  <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm">
                    <Clock size={24} className="text-brand mb-3" />
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">Horário</h4>
                    <p className="text-xs text-gray-500">Seg-Sex: 8h às 18h</p>
                  </div>
                </div>

                {/* Company Info */}
                <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100">
                  <h4 className="font-semibold text-gray-900 text-sm mb-3">Dados da Empresa</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">CNPJ:</span>
                      <span className="text-gray-700 font-medium">{ZOPU_CONTACT.cnpj}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Telefone:</span>
                      <a href={`tel:${ZOPU_CONTACT.phone.replace(/\D/g, '')}`} className="text-gray-700 font-medium hover:text-brand transition-colors">
                        {ZOPU_CONTACT.phone}
                      </a>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">E-mail:</span>
                      <a href={`mailto:${ZOPU_LINKS.email}`} className="text-gray-700 font-medium hover:text-brand transition-colors">
                        {ZOPU_LINKS.email}
                      </a>
                    </div>
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
