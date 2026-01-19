import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Container } from '@/components/layout'
import { Badge, Reveal } from '@/components/shared'
import { ZOPU_STATS, ZOPU_LINKS } from '@/lib/constants'
import {
  PlugsConnected,
  ShieldCheck,
  Code,
  Database,
  Lock,
  CloudCheck,
  ArrowRight,
  CheckCircle,
} from '@phosphor-icons/react/dist/ssr'

export const metadata: Metadata = {
  title: 'Bitrix24 para TI | Integrações, Segurança e APIs | Zopu',
  description:
    'API REST completa, SSO, SOC 2, LGPD. Integramos com ERPs, sistemas legados e qualquer API. Documentação técnica disponível.',
  alternates: {
    canonical: '/para/ti',
  },
  openGraph: {
    title: 'Bitrix24 para TI | Integrações, Segurança e APIs',
    description:
      'API REST completa, SSO, SOC 2, LGPD. Integramos com ERPs, sistemas legados e qualquer API.',
  },
}

const techSpecs = [
  {
    icon: PlugsConnected,
    title: 'API REST Completa',
    description: 'Documentação extensa, webhooks, eventos em tempo real. Integramos com qualquer sistema.',
  },
  {
    icon: Lock,
    title: 'SSO e SAML',
    description: 'Active Directory, Google Workspace, Azure AD. Login único corporativo.',
  },
  {
    icon: ShieldCheck,
    title: 'SOC 2 Type II',
    description: 'Bitrix24 certificado. Zopu segue as mesmas práticas de segurança.',
  },
  {
    icon: Database,
    title: 'LGPD Compliant',
    description: 'Dados em data centers certificados. Controles de retenção e exclusão.',
  },
  {
    icon: CloudCheck,
    title: 'Cloud ou On-Premise',
    description: 'SaaS com SLA 99.999% ou instalação local para casos específicos.',
  },
  {
    icon: Code,
    title: 'Customização',
    description: 'Campos, workflows, automações. Autonomia total para sua equipe.',
  },
]

const integrations = [
  'ERPs (TOTVS, SAP, Omie, Conta Azul)',
  'Marketing (RD Station, ActiveCampaign, HubSpot)',
  'Prospecção (Apollo, Clay, Lusha)',
  'Pagamentos (Asaas, Stripe, PagSeguro)',
  'Telefonia (Zenvia, Twilio, Vonage)',
  'WhatsApp (API oficial Meta)',
]

const certifications = [
  { src: '/images/bitrix24screen/aicpasoc2.webp', alt: 'AICPA SOC 2 Type II' },
  { src: '/images/bitrix24screen/awscertified.webp', alt: 'AWS Certified' },
  { src: '/images/bitrix24screen/pmp.webp', alt: 'PMP Certified' },
]

export default function TIPage() {
  return (
    <main className="pt-20 lg:pt-24">
      {/* Hero */}
      <section className="py-16 sm:py-24 bg-linear-to-b from-gray-50 to-white">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <Reveal>
              <Badge className="mb-6">Para Times de TI</Badge>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Integra com tudo.{' '}
                <span className="text-brand">Seguro de verdade.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                API REST completa, SSO, SOC 2 Type II, LGPD. Documentação técnica
                e suporte especializado para sua equipe.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={ZOPU_LINKS.whatsappEspecialista}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand text-white font-semibold rounded-xl hover:bg-brand-hover transition-colors shadow-lg shadow-brand/20"
                >
                  Falar com especialista
                  <ArrowRight size={20} />
                </a>
                <Link
                  href="/seguranca"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-700 font-semibold rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  Ver Trust Center
                </Link>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Certificações */}
      <section className="py-12 bg-bg-dark">
        <Container>
          <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12">
            <p className="text-sm text-gray-400 uppercase tracking-wider">Certificações:</p>
            {certifications.map((cert) => (
              <Image
                key={cert.alt}
                src={cert.src}
                alt={cert.alt}
                width={64}
                height={64}
                className="w-14 h-14 sm:w-16 sm:h-16 object-contain opacity-80"
              />
            ))}
          </div>
        </Container>
      </section>

      {/* Especificações Técnicas */}
      <section className="py-16 sm:py-24 bg-white">
        <Container>
          <div className="text-center mb-12">
            <Reveal>
              <Badge className="mb-4">Especificações</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                O que você precisa saber
              </h2>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techSpecs.map((spec, index) => {
              const Icon = spec.icon
              return (
                <Reveal key={spec.title} delay={0.1 * index}>
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 h-full">
                    <div className="w-12 h-12 bg-brand/10 rounded-xl flex items-center justify-center mb-4">
                      <Icon size={24} weight="duotone" className="text-brand" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{spec.title}</h3>
                    <p className="text-gray-600">{spec.description}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </Container>
      </section>

      {/* Integrações */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <div>
                <Badge className="mb-4">Integrações</Badge>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                  Conectamos com qualquer sistema
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Nossa equipe tem experiência em integrações complexas com ERPs,
                  sistemas legados e APIs customizadas.
                </p>

                <ul className="space-y-3">
                  {integrations.map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle size={20} weight="fill" className="text-green-500 shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/por-que-bitrix24"
                  className="inline-flex items-center gap-2 text-brand font-semibold mt-6 hover:underline"
                >
                  Conhecer a plataforma
                  <ArrowRight size={18} />
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <p className="text-sm text-gray-500 mb-4 font-mono">// Exemplo de API</p>
                <pre className="text-sm text-gray-800 overflow-x-auto">
                  <code>{`GET /rest/crm.deal.list
Authorization: Bearer {token}

Response:
{
  "result": [
    {
      "ID": "1",
      "TITLE": "Novo negócio",
      "STAGE_ID": "NEW",
      "OPPORTUNITY": "50000"
    }
  ]
}`}</code>
                </pre>
                <a
                  href="https://training.bitrix24.com/rest_help/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-brand font-medium mt-4 text-sm hover:underline"
                >
                  Documentação completa da API
                  <ArrowRight size={16} />
                </a>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Suporte Técnico */}
      <section className="py-16 sm:py-24 bg-white">
        <Container>
          <Reveal>
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-4">Suporte</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Suporte técnico especializado
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Nossa equipe inclui desenvolvedores certificados, arquitetos de soluções
                e especialistas em integrações. SLA de primeira resposta: {ZOPU_STATS.tempoResposta}.
              </p>

              <div className="grid sm:grid-cols-3 gap-6">
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <p className="text-2xl font-bold text-brand">{ZOPU_STATS.tempoResposta}</p>
                  <p className="text-sm text-gray-600">primeira resposta</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <p className="text-2xl font-bold text-gray-900">365 dias</p>
                  <p className="text-sm text-gray-600">suporte incluído</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <p className="text-2xl font-bold text-gray-900">{ZOPU_STATS.integracoes}</p>
                  <p className="text-sm text-gray-600">integrações feitas</p>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 bg-bg-dark">
        <Container>
          <Reveal>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Precisa de especificações técnicas?
              </h2>
              <p className="text-gray-300 text-lg mb-8">
                Fale com nossa equipe técnica. Podemos agendar uma conversa para discutir
                arquitetura, integrações e requisitos de segurança.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={ZOPU_LINKS.whatsappEspecialista}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand text-white font-semibold rounded-xl hover:bg-brand-hover transition-colors"
                >
                  Agendar call técnica
                  <ArrowRight size={20} />
                </a>
                <Link
                  href="/bitrix24-enterprise"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors"
                >
                  Ver Enterprise
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </main>
  )
}
