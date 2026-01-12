import { Metadata } from 'next'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/layout'
import { Badge, Reveal } from '@/components/shared'
import {
  EnterpriseTimeline,
  EnterpriseCapabilities,
  EnterpriseIntegrations,
  EnterpriseHeroBadge,
} from '@/components/sections/enterprise'
import {
  ZOPU_STATS,
  ZOPU_LINKS,
  ENTERPRISE_CERTIFICATIONS,
} from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Bitrix24 Enterprise | Grandes Operações | Zopu',
  description:
    'CRM para operações de 100 a 5.000+ usuários. Parceiro Bitrix24 certificado AICPA SOC 2. Governança, compliance, integrações complexas.',
  keywords:
    'Bitrix24 Enterprise, CRM grandes empresas, AICPA SOC 2, PMP, implementação enterprise, Zopu',
  alternates: {
    canonical: '/bitrix24-enterprise',
  },
  openGraph: {
    title: 'Bitrix24 Enterprise | Grandes Operações',
    description:
      'CRM para operações de 100 a 5.000+ usuários. Governança, compliance, integrações complexas. Parceiro certificado AICPA SOC 2.',
  },
}

// Logos de clientes enterprise
const CLIENT_LOGOS = [
  { name: 'Unimed', src: '/images/clients/unimed.webp' },
  { name: 'WEG', src: '/images/clients/weg.webp' },
  { name: 'Stone', src: '/images/clients/stone.webp' },
  { name: 'SBT', src: '/images/clients/sbt.webp' },
  { name: 'Komeco', src: '/images/clients/komeco.webp' },
  { name: 'Posthaus', src: '/images/clients/posthaus.webp' },
  { name: 'Grupo Litoral', src: '/images/clients/grupo-litoral.webp' },
  { name: 'Valorem', src: '/images/clients/valorem.webp' },
  { name: 'TS Shara', src: '/images/clients/ts-shara.webp' },
  { name: 'Viseu', src: '/images/clients/viseu.webp' },
  { name: 'RK2', src: '/images/clients/rk2.webp' },
  { name: 'Boxtop', src: '/images/clients/boxtop.webp' },
]

export default function Bitrix24EnterprisePage() {
  return (
    <main className="pt-20 lg:pt-24">
      {/* =============================================
          SEÇÃO 1: HERO - Estilo Homepage
          ============================================= */}
      <section className="relative bg-white overflow-hidden">
        {/* Background gradient minimalista */}
        <div className="absolute inset-0 bg-linear-to-b from-white via-white to-gray-50/50" />
        <div className="absolute top-0 right-0 w-1/2 h-full">
          <div className="absolute inset-0 bg-linear-to-l from-brand/2 to-transparent" />
        </div>

        <Container className="relative py-12 sm:py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Coluna de texto */}
            <div className="max-w-xl">
              {/* Badge Enterprise - Premium styling */}
              <EnterpriseHeroBadge />

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.1] tracking-tight">
                Bitrix24 para
                <br />
                <span className="text-brand">grandes operações.</span>
              </h1>

              {/* Subtítulo */}
              <p className="mt-6 text-lg sm:text-xl text-gray-600 leading-relaxed">
                De 100 a 5.000+ usuários. Governança, compliance e integrações complexas
                <br className="hidden sm:block" />
                com <span className="text-gray-900 font-medium">metodologia comprovada</span>.
              </p>

              {/* Proposta de valor */}
              <p className="mt-4 text-lg text-gray-600">
                A Zopu é o <span className="text-gray-900 font-medium">parceiro Bitrix24 especializado em grandes empresas</span>.
              </p>

              {/* CTAs */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href={ZOPU_LINKS.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-brand text-white text-base font-semibold rounded-2xl hover:bg-brand-hover transition-all duration-300 ease-out-expo shadow-elevated shadow-brand/20 hover:shadow-elevated-hover hover:shadow-brand/30 hover:-translate-y-1"
                >
                  Falar com especialista
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 ease-out-expo group-hover:translate-x-1" />
                </a>
              </div>
            </div>

            {/* Coluna da imagem */}
            <div className="relative lg:order-last order-first">
              <div className="relative lg:-mr-8 xl:-mr-16">
                <Image
                  src="/images/bitrix24screen/bitrix24enterprise.webp"
                  alt="Bitrix24 Enterprise Dashboard"
                  width={1200}
                  height={530}
                  priority
                  className="w-full h-auto rounded-2xl shadow-elevated"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =============================================
          SEÇÃO 2: CREDENCIAIS - Badges em destaque
          ============================================= */}
      <section className="py-16 sm:py-20 bg-linear-to-b from-gray-50 to-white">
        <Container>
          <Reveal>
            <div className="text-center mb-12">
              <Badge className="mb-4">Credenciais</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Certificações que garantem qualidade
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Metodologia e segurança validadas por certificações reconhecidas internacionalmente.
              </p>
            </div>
          </Reveal>

          {/* Cards de certificação - Grid de 5 badges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {/* Gold Partner Bitrix24 */}
            <Reveal delay={0.05}>
              <div className="flex flex-col items-center hover:-translate-y-1 transition-all duration-300">
                <div className="w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center mb-3">
                  <Image
                    src="/images/bitrix24screen/gold-partner.png"
                    alt="Gold Partner Bitrix24"
                    width={140}
                    height={140}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-sm font-semibold text-gray-700 text-center">
                  Gold Partner Bitrix24
                </h3>
              </div>
            </Reveal>

            {/* AICPA SOC 2 */}
            <Reveal delay={0.1}>
              <div className="flex flex-col items-center hover:-translate-y-1 transition-all duration-300">
                <div className="w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center mb-3">
                  <Image
                    src={ENTERPRISE_CERTIFICATIONS.aicpaSoc2.imagem}
                    alt="AICPA SOC 2 Badge"
                    width={140}
                    height={140}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-sm font-semibold text-gray-700 text-center">
                  AICPA SOC 2 Type II
                </h3>
              </div>
            </Reveal>

            {/* PMP */}
            <Reveal delay={0.15}>
              <div className="flex flex-col items-center hover:-translate-y-1 transition-all duration-300">
                <div className="w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center mb-3">
                  <Image
                    src={ENTERPRISE_CERTIFICATIONS.pmp.imagem}
                    alt="PMP Badge"
                    width={140}
                    height={140}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-sm font-semibold text-gray-700 text-center">
                  PMP Certified
                </h3>
              </div>
            </Reveal>

            {/* AWS Certified */}
            <Reveal delay={0.2}>
              <div className="flex flex-col items-center hover:-translate-y-1 transition-all duration-300">
                <div className="w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center mb-3">
                  <Image
                    src="/images/bitrix24screen/awscertified.webp"
                    alt="AWS Certified"
                    width={140}
                    height={140}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-sm font-semibold text-gray-700 text-center">
                  AWS Certified
                </h3>
              </div>
            </Reveal>

            {/* Google Gen AI */}
            <Reveal delay={0.25}>
              <div className="flex flex-col items-center hover:-translate-y-1 transition-all duration-300 col-span-2 sm:col-span-1">
                <div className="w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center mb-3">
                  <Image
                    src="/images/bitrix24screen/googlegenai.png"
                    alt="Google Gen AI"
                    width={140}
                    height={140}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-sm font-semibold text-gray-700 text-center">
                  Google Gen AI
                </h3>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* =============================================
          SEÇÃO 3: STATS BAR - Como InsightSection
          ============================================= */}
      <section className="py-12 bg-white">
        <Container>
          <Reveal>
            <div className="bg-brand rounded-3xl p-6 sm:p-8 lg:p-10 shadow-elevated shadow-brand/20">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
                {[
                  { numero: ZOPU_STATS.maiorOperacao, label: 'usuários na maior operação' },
                  { numero: ZOPU_STATS.paises, label: 'países atendidos' },
                  { numero: 'Horário comercial', label: 'suporte dedicado' },
                  { numero: ZOPU_STATS.slaEnterprise, label: 'SLA 1ª resposta' },
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                      {item.numero}
                    </p>
                    <p className="text-sm text-white/70 mt-1">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* =============================================
          SEÇÃO 4: CAPACIDADES ENTERPRISE
          ============================================= */}
      <section className="py-16 sm:py-24 lg:py-32 bg-gray-50">
        <Container>
          <div className="text-center mb-14">
            <Reveal>
              <Badge className="mb-4">Capacidades Enterprise</Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Pronto para operações complexas
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Tudo que grandes operações precisam, com implementação estratégica.
              </p>
            </Reveal>
          </div>

          <EnterpriseCapabilities />
        </Container>
      </section>

      {/* =============================================
          SEÇÃO 5: FASES DE IMPLEMENTAÇÃO (TIMELINE DINÂMICA)
          ============================================= */}
      <EnterpriseTimeline />

      {/* =============================================
          SEÇÃO 6: LOGOS DE CLIENTES
          ============================================= */}
      <section className="py-16 sm:py-20 bg-gray-50 border-y border-gray-100">
        <Container>
          <Reveal>
            <div className="text-center mb-10">
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Empresas que confiam na Zopu
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-8 items-center justify-items-center">
              {CLIENT_LOGOS.map((logo) => (
                <div
                  key={logo.name}
                  className="w-24 h-12 flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                >
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    width={96}
                    height={48}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* =============================================
          SEÇÃO 7: INTEGRAÇÕES ENTERPRISE
          ============================================= */}
      <section className="py-16 sm:py-24 bg-white">
        <Container>
          <div className="text-center mb-12">
            <Reveal>
              <Badge className="mb-4">Integrações</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Conectamos com qualquer sistema
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                ERPs, sistemas legados, APIs sob medida. Equipe especializada em integrar
                Bitrix24 à sua infraestrutura.
              </p>
            </Reveal>
          </div>

          <EnterpriseIntegrations />
        </Container>
      </section>

      {/* =============================================
          SEÇÃO 8: CTA FINAL
          ============================================= */}
      <section className="py-16 sm:py-24 lg:py-32 bg-bg-dark relative overflow-hidden">
        <div
          className="absolute top-0 left-1/2 w-150 h-150 bg-brand/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <Container>
          <Reveal>
            <div className="max-w-3xl mx-auto text-center relative z-10">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                Conte com o parceiro Bitrix24 certo para soluções Enterprise
              </h2>
              <p className="text-gray-300 text-lg mb-10">
                Cada projeto enterprise é único. Agende uma conversa para entender como
                podemos estruturar a melhor solução para sua empresa.
              </p>

              <a
                href={ZOPU_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand text-white font-semibold rounded-2xl hover:bg-brand-hover transition-all duration-300 shadow-elevated shadow-brand/30 hover:-translate-y-1"
              >
                Falar com especialista Enterprise
                <ArrowRight className="w-5 h-5" />
              </a>

              {/* Credenciais */}
              <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 mt-12">
                <Image
                  src="/images/bitrix24screen/gold-partner.png"
                  alt="Gold Partner Bitrix24"
                  width={56}
                  height={56}
                  className="w-12 h-12 sm:w-14 sm:h-14 object-contain"
                />
                <Image
                  src="/images/bitrix24screen/aicpasoc2.webp"
                  alt="AICPA SOC 2"
                  width={56}
                  height={56}
                  className="w-12 h-12 sm:w-14 sm:h-14 object-contain"
                />
                <Image
                  src="/images/bitrix24screen/pmp.webp"
                  alt="PMP Certified"
                  width={56}
                  height={56}
                  className="w-12 h-12 sm:w-14 sm:h-14 object-contain"
                />
                <Image
                  src="/images/bitrix24screen/awscertified.webp"
                  alt="AWS Certified"
                  width={56}
                  height={56}
                  className="w-12 h-12 sm:w-14 sm:h-14 object-contain"
                />
                <Image
                  src="/images/bitrix24screen/googlegenai.png"
                  alt="Google Gen AI"
                  width={56}
                  height={56}
                  className="w-12 h-12 sm:w-14 sm:h-14 object-contain"
                />
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </main>
  )
}
