import { Metadata } from 'next'
import Image from 'next/image'
import { Container } from '@/components/layout'
import { Badge, Reveal } from '@/components/shared'
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
  { src: '/images/bitrix24screen/aicpasoc2.webp', alt: 'AICPA SOC 2 Type II', name: 'SOC 2 Type II' },
  { src: '/images/bitrix24screen/pmp.webp', alt: 'PMP Certified', name: 'PMP' },
  { src: '/images/bitrix24screen/awscertified.webp', alt: 'AWS Certified', name: 'AWS' },
  { src: '/images/bitrix24screen/googlegenai.png', alt: 'Google Gen AI', name: 'Google AI' },
]

export default function SegurancaPage() {
  return (
    <main>
      {/* Hero */}
      <section className="pt-24 pb-16 sm:pt-32 sm:pb-20 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />
        <Container>
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <Reveal>
              <Badge className="mb-6 bg-white/10 text-white border-white/20">Trust Center</Badge>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
                Segurança e{' '}
                <span className="text-brand">Conformidade</span>
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-lg sm:text-xl text-gray-300 mb-8">
                Seus dados estão seguros conosco. Conheça nossos compromissos
                de segurança, certificações e SLAs de suporte.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Shield size={18} className="text-green-400" />
                  <span>Gold Partner Bitrix24</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock size={18} className="text-green-400" />
                  <span>LGPD Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <Timer size={18} className="text-green-400" />
                  <span>SLA {ZOPU_STATS.tempoResposta}</span>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Pilares de Segurança */}
      <section className="py-16 sm:py-24 bg-white">
        <Container>
          <div className="text-center mb-12">
            <Reveal>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Como protegemos seus dados
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Seguimos as melhores práticas do mercado em parceria com o Bitrix24.
              </p>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {securityPillars.map((pillar, index) => {
              const Icon = pillar.icon
              return (
                <Reveal key={pillar.title} delay={0.1 * index}>
                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 h-full">
                    <div className="w-12 h-12 bg-brand/10 rounded-xl flex items-center justify-center mb-4">
                      <Icon size={24} weight="duotone" className="text-brand" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{pillar.title}</h3>
                    <p className="text-gray-600 text-sm">{pillar.description}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </Container>
      </section>

      {/* SLAs de Suporte */}
      <section className="py-16 sm:py-24 bg-[#F9FAFC]">
        <Container>
          <div className="text-center mb-12">
            <Reveal>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                SLAs de Suporte
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Suporte especializado em Bitrix24 com SLAs contratuais de resposta.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <div className="max-w-4xl mx-auto">
              {/* Desktop Table */}
              <div className="hidden md:block overflow-hidden rounded-2xl border border-gray-200 bg-white">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="text-left p-4 text-sm font-semibold text-gray-900">Plano</th>
                      <th className="text-left p-4 text-sm font-semibold text-gray-900">Primeira Resposta</th>
                      <th className="text-left p-4 text-sm font-semibold text-gray-900">Disponibilidade</th>
                      <th className="text-left p-4 text-sm font-semibold text-gray-900">Canais</th>
                    </tr>
                  </thead>
                  <tbody>
                    {supportSLAs.map((sla, index) => (
                      <tr key={sla.plan} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                        <td className="p-4 font-medium text-gray-900">{sla.plan}</td>
                        <td className="p-4">
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-sm font-medium rounded">
                            <Timer size={14} />
                            {sla.responseTime}
                          </span>
                        </td>
                        <td className="p-4 text-gray-600">{sla.availability}</td>
                        <td className="p-4 text-gray-600">{sla.channels}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden space-y-4">
                {supportSLAs.map((sla) => (
                  <div key={sla.plan} className="bg-white rounded-xl p-4 border border-gray-200">
                    <h3 className="font-bold text-gray-900 mb-3">{sla.plan}</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Primeira Resposta</span>
                        <span className="font-medium text-green-600">{sla.responseTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Disponibilidade</span>
                        <span className="text-gray-700">{sla.availability}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Canais</span>
                        <span className="text-gray-700">{sla.channels}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* LGPD */}
      <section className="py-16 sm:py-24 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-brand/10 rounded-2xl flex items-center justify-center">
                  <FileText size={28} weight="duotone" className="text-brand" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    Conformidade LGPD
                  </h2>
                  <p className="text-gray-500">Lei Geral de Proteção de Dados</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 mb-6">
                  A Zopu está comprometida com a proteção dos dados pessoais de nossos
                  clientes e usuários. Implementamos processos e controles para garantir
                  conformidade com a LGPD:
                </p>

                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-3">
                    <Shield size={20} className="text-brand shrink-0 mt-0.5" />
                    <span><strong>Minimização de dados:</strong> Coletamos apenas dados necessários para a prestação dos serviços</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Shield size={20} className="text-brand shrink-0 mt-0.5" />
                    <span><strong>Transparência:</strong> Informamos claramente como seus dados são utilizados</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Shield size={20} className="text-brand shrink-0 mt-0.5" />
                    <span><strong>Direitos do titular:</strong> Garantimos acesso, correção e exclusão de dados mediante solicitação</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Shield size={20} className="text-brand shrink-0 mt-0.5" />
                    <span><strong>Retenção limitada:</strong> Dados são mantidos apenas pelo período necessário</span>
                  </li>
                </ul>

                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href="/privacidade"
                    className="inline-flex items-center gap-2 text-brand font-medium hover:underline"
                  >
                    Política de Privacidade
                    <ArrowRight size={18} />
                  </a>
                  <a
                    href="/cookies"
                    className="inline-flex items-center gap-2 text-brand font-medium hover:underline"
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

      {/* Certificações */}
      <section className="py-16 sm:py-24 bg-[#F9FAFC]">
        <Container>
          <div className="text-center mb-12">
            <Reveal>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Certificações e Credenciais
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Bitrix24 e a equipe Zopu possuem certificações reconhecidas pelo mercado.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <div className="flex flex-wrap justify-center items-center gap-10 sm:gap-14">
              <Image
                src="/images/bitrix24screen/gold-partner.png"
                alt="Gold Partner Bitrix24"
                width={128}
                height={128}
                className="w-28 h-28 sm:w-32 sm:h-32 object-contain"
              />
              {certifications.map((cert) => (
                <Image
                  key={cert.alt}
                  src={cert.src}
                  alt={cert.alt}
                  width={96}
                  height={96}
                  className="w-20 h-20 sm:w-24 sm:h-24 object-contain opacity-80 hover:opacity-100 transition-opacity"
                />
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Contato */}
      <section className="py-16 sm:py-24 bg-white">
        <Container>
          <Reveal>
            <div className="max-w-2xl mx-auto text-center">
              <Users size={48} weight="duotone" className="text-brand mx-auto mb-6" />
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Dúvidas sobre segurança?
              </h2>
              <p className="text-gray-600 mb-8">
                Entre em contato com nossa equipe. Teremos prazer em esclarecer
                qualquer questão sobre segurança e proteção de dados.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href={ZOPU_LINKS.whatsappEspecialista}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-brand text-white font-semibold rounded-xl hover:bg-brand-hover transition-colors"
                >
                  Falar com especialista
                  <ArrowRight size={20} />
                </a>
                <a
                  href={`mailto:${ZOPU_LINKS.email}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
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
