import { Metadata } from 'next'
import Image from 'next/image'
import { Container } from '@/components/layout'
import { Badge, Reveal } from '@/components/shared'
import { TrustCenterHero } from '@/components/sections'
import { ZOPU_STATS, ZOPU_LINKS } from '@/lib/constants'
import {
  Shield,
  Lock,
  CloudCheck,
  Certificate,
  Timer,
  Users,
  FileText,
  ArrowRight,
} from '@phosphor-icons/react/dist/ssr'

export const metadata: Metadata = {
  title: 'Segurança e Conformidade | Trust Center — Zopu',
  description:
    'Conheça nossos compromissos de segurança, conformidade LGPD e certificações. Gold Partner Bitrix24 com as melhores práticas do mercado.',
  alternates: {
    canonical: '/seguranca',
  },
  openGraph: {
    title: 'Segurança e Conformidade | Trust Center',
    description:
      'Compromissos de segurança, conformidade LGPD e certificações. Gold Partner Bitrix24 com as melhores práticas.',
  },
}

const securityPillars = [
  {
    icon: Lock,
    title: 'Proteção de Dados',
    description:
      'Dados criptografados em trânsito (TLS 1.3) e em repouso. Acesso controlado por permissões granulares.',
  },
  {
    icon: CloudCheck,
    title: 'Infraestrutura Bitrix24',
    description:
      'Servidores em data centers certificados (ISO 27001, SOC 2). Backups automáticos e recuperação de desastres.',
  },
  {
    icon: Certificate,
    title: 'Certificações',
    description:
      'Bitrix24 é certificado SOC 2 Type II, ISO 27001, HIPAA compliant. A Zopu segue as mesmas práticas.',
  },
  {
    icon: Shield,
    title: 'Conformidade LGPD',
    description:
      'Processos implementados para atender aos requisitos da Lei Geral de Proteção de Dados brasileira.',
  },
]

const supportSLAs = [
  {
    plan: 'Enterprise',
    responseTime: '< 2 minutos',
    availability: 'Horário comercial',
    channels: 'WhatsApp, Email, Telefone',
  },
  {
    plan: 'Professional',
    responseTime: '< 5 minutos',
    availability: 'Horário comercial',
    channels: 'WhatsApp, Email',
  },
  {
    plan: 'Standard',
    responseTime: '< 5 minutos',
    availability: 'Horário comercial',
    channels: 'WhatsApp, Email',
  },
]

const certifications = [
  { src: '/images/revops/badges/ISO27001.png', alt: 'ISO 27001 Certified', name: 'ISO 27001' },
  { src: '/images/bitrix24screen/aicpasoc2.webp', alt: 'AICPA SOC 2 Type II', name: 'SOC 2 Type II' },
  { src: '/images/bitrix24screen/pmp.webp', alt: 'PMP Certified', name: 'PMP' },
  { src: '/images/bitrix24screen/awscertified.webp', alt: 'AWS Certified', name: 'AWS' },
  { src: '/images/bitrix24screen/googlegenai.png', alt: 'Google Gen AI', name: 'Google AI' },
]

export default function SegurancaPage() {
  return (
    <main className="-mt-16 lg:-mt-20 bg-[#050508]">
      {/* Hero + Security Principles (dark theme) */}
      <TrustCenterHero />

      {/* Bitrix24 Infrastructure - Dark theme */}
      <section className="py-16 sm:py-24 bg-[#0A0A0F] border-t border-white/[0.04]">
        <Container>
          <div className="text-center mb-12">
            <Reveal>
              <p className="text-brand font-medium tracking-wide uppercase text-sm mb-4">
                Infraestrutura
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Como protegemos seus dados
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Seguimos as melhores práticas do mercado em parceria com o Bitrix24.
              </p>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {securityPillars.map((pillar, index) => {
              const Icon = pillar.icon
              return (
                <Reveal key={pillar.title} delay={0.1 * index}>
                  <div className="h-full p-6 bg-white/[0.02] border border-white/[0.06] rounded-2xl hover:bg-white/[0.04] hover:border-brand/20 transition-all duration-300">
                    <div className="w-11 h-11 bg-brand/10 border border-brand/20 rounded-xl flex items-center justify-center mb-5">
                      <Icon size={22} weight="duotone" className="text-brand" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{pillar.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{pillar.description}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </Container>
      </section>

      {/* SLAs de Suporte - Dark theme */}
      <section className="py-16 sm:py-24 bg-[#08080C] border-t border-white/[0.04]">
        <Container>
          <div className="text-center mb-12">
            <Reveal>
              <p className="text-brand font-medium tracking-wide uppercase text-sm mb-4">
                Suporte
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                SLAs de Resposta
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Suporte especializado em Bitrix24 com SLAs contratuais de resposta.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <div className="max-w-4xl mx-auto">
              {/* Desktop Table */}
              <div className="hidden md:block overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02]">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/[0.06]">
                      <th className="text-left p-4 text-sm font-semibold text-white">Plano</th>
                      <th className="text-left p-4 text-sm font-semibold text-white">Primeira Resposta</th>
                      <th className="text-left p-4 text-sm font-semibold text-white">Disponibilidade</th>
                      <th className="text-left p-4 text-sm font-semibold text-white">Canais</th>
                    </tr>
                  </thead>
                  <tbody>
                    {supportSLAs.map((sla, index) => (
                      <tr key={sla.plan} className={`border-t border-white/[0.04] ${index % 2 === 1 ? 'bg-white/[0.01]' : ''}`}>
                        <td className="p-4 font-medium text-white">{sla.plan}</td>
                        <td className="p-4">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm font-medium rounded-lg">
                            <Timer size={14} />
                            {sla.responseTime}
                          </span>
                        </td>
                        <td className="p-4 text-gray-400">{sla.availability}</td>
                        <td className="p-4 text-gray-400">{sla.channels}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden space-y-4">
                {supportSLAs.map((sla) => (
                  <div key={sla.plan} className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4">
                    <h3 className="font-bold text-white mb-3">{sla.plan}</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Primeira Resposta</span>
                        <span className="font-medium text-emerald-400">{sla.responseTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Disponibilidade</span>
                        <span className="text-gray-300">{sla.availability}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Canais</span>
                        <span className="text-gray-300">{sla.channels}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* LGPD - Dark theme */}
      <section className="py-16 sm:py-24 bg-[#0A0A0F] border-t border-white/[0.04]">
        <Container>
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-brand/10 border border-brand/20 rounded-2xl flex items-center justify-center">
                  <FileText size={28} weight="duotone" className="text-brand" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white">
                    Conformidade LGPD
                  </h2>
                  <p className="text-gray-500">Lei Geral de Proteção de Dados</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div>
                <p className="text-gray-400 mb-8 leading-relaxed">
                  A Zopu está comprometida com a proteção dos dados pessoais de nossos
                  clientes e usuários. Implementamos processos e controles para garantir
                  conformidade com a LGPD:
                </p>

                <ul className="space-y-4">
                  <li className="flex items-start gap-4 p-4 bg-white/[0.02] border border-white/[0.06] rounded-xl">
                    <Shield size={20} className="text-brand shrink-0 mt-0.5" />
                    <span className="text-gray-300"><strong className="text-white">Minimização de dados:</strong> Coletamos apenas dados necessários para a prestação dos serviços</span>
                  </li>
                  <li className="flex items-start gap-4 p-4 bg-white/[0.02] border border-white/[0.06] rounded-xl">
                    <Shield size={20} className="text-brand shrink-0 mt-0.5" />
                    <span className="text-gray-300"><strong className="text-white">Transparência:</strong> Informamos claramente como seus dados são utilizados</span>
                  </li>
                  <li className="flex items-start gap-4 p-4 bg-white/[0.02] border border-white/[0.06] rounded-xl">
                    <Shield size={20} className="text-brand shrink-0 mt-0.5" />
                    <span className="text-gray-300"><strong className="text-white">Direitos do titular:</strong> Garantimos acesso, correção e exclusão de dados mediante solicitação</span>
                  </li>
                  <li className="flex items-start gap-4 p-4 bg-white/[0.02] border border-white/[0.06] rounded-xl">
                    <Shield size={20} className="text-brand shrink-0 mt-0.5" />
                    <span className="text-gray-300"><strong className="text-white">Retenção limitada:</strong> Dados são mantidos apenas pelo período necessário</span>
                  </li>
                </ul>

                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href="/privacidade"
                    className="inline-flex items-center gap-2 text-brand font-medium hover:text-brand-hover transition-colors"
                  >
                    Política de Privacidade
                    <ArrowRight size={18} />
                  </a>
                  <a
                    href="/cookies"
                    className="inline-flex items-center gap-2 text-brand font-medium hover:text-brand-hover transition-colors"
                  >
                    Política de Cookies
                    <ArrowRight size={18} />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Certificações - Dark theme */}
      <section className="py-16 sm:py-24 bg-[#08080C] border-t border-white/[0.04]">
        <Container>
          <Reveal>
            <p className="text-center text-gray-500 text-sm uppercase tracking-wider mb-10">
              Auditado e certificado por
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 max-w-6xl mx-auto">
              {/* Gold Partner - Featured */}
              <div className="flex flex-col items-center justify-center p-6 bg-white/[0.02] border border-white/[0.06] rounded-2xl hover:border-brand/20 transition-colors">
                <Image
                  src="/images/bitrix24screen/gold-partner.png"
                  alt="Gold Partner Bitrix24"
                  width={120}
                  height={120}
                  className="w-20 h-20 sm:w-24 sm:h-24 object-contain mb-3"
                />
                <span className="text-sm text-gray-400 text-center font-medium">Gold Partner</span>
              </div>
              {certifications.map((cert) => (
                <div key={cert.alt} className="flex flex-col items-center justify-center p-6 bg-white/[0.02] border border-white/[0.06] rounded-2xl hover:border-brand/20 transition-colors">
                  <Image
                    src={cert.src}
                    alt={cert.alt}
                    width={120}
                    height={120}
                    className="w-20 h-20 sm:w-24 sm:h-24 object-contain mb-3"
                  />
                  <span className="text-sm text-gray-400 text-center font-medium">{cert.name}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Contato - Dark theme CTA */}
      <section className="py-16 sm:py-24 bg-[#0A0A0F] border-t border-white/[0.04]">
        <Container>
          <Reveal>
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-16 h-16 bg-brand/10 border border-brand/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users size={32} weight="duotone" className="text-brand" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Dúvidas sobre segurança?
              </h2>
              <p className="text-gray-400 mb-8">
                Entre em contato com nossa equipe. Teremos prazer em esclarecer
                qualquer questão sobre segurança e proteção de dados.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href={ZOPU_LINKS.whatsappEspecialista}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-brand text-white font-semibold rounded-xl hover:bg-brand-hover transition-colors shadow-lg shadow-brand/20"
                >
                  Falar com especialista
                  <ArrowRight size={20} />
                </a>
                <a
                  href={`mailto:${ZOPU_LINKS.email}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/[0.05] border border-white/[0.1] text-white font-semibold rounded-xl hover:bg-white/[0.1] transition-colors"
                >
                  Enviar email
                </a>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </main>
  )
}
