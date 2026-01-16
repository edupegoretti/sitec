/**
 * VARIAÇÃO 2: Statement CTA
 *
 * Conceito: CTA de WhatsApp como protagonista absoluto.
 * Inspiração: Stripe, Notion - CTAs que dominam a seção.
 *
 * Características:
 * - Bloco de CTA gigante no topo
 * - WhatsApp como ação principal
 * - Links compactados em linha
 * - Hierarquia clara: CTA > tudo
 */

import Link from 'next/link'
import Image from 'next/image'

const allLinks = [
  { label: 'CRM Express', href: '/crm-express' },
  { label: 'RevOps Launch', href: '/revopslaunch' },
  { label: 'Enterprise', href: '/bitrix24-enterprise' },
  { label: 'Por que Zopu', href: '/por-que-zopu' },
  { label: 'Cases', href: '/cases' },
  { label: 'Blog', href: '/blog' },
]

export function FooterV2() {
  return (
    <footer className="bg-gradient-to-b from-gray-950 to-black text-white">
      {/* Giant CTA Block */}
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-16">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand/20 via-brand/10 to-transparent border border-brand/20 p-10 sm:p-16">
          {/* Background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand/20 blur-[120px] rounded-full" />

          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs font-medium text-brand bg-brand/10 px-3 py-1.5 rounded-full mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Especialistas disponíveis agora
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              Vamos conversar sobre
              <br />
              <span className="text-brand">seu projeto?</span>
            </h2>

            <p className="text-gray-400 text-lg mb-8 max-w-md">
              Resposta em menos de 5 minutos. Sem robôs, sem formulários intermináveis.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://wa.me/554733079280?text=Olá, vim pelo site da Zopu e gostaria de falar sobre meu projeto."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold px-8 py-4 rounded-xl transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-green-500/20"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chamar no WhatsApp
              </a>
              <a
                href="mailto:contato@zopu.com.br"
                className="inline-flex items-center justify-center gap-2 text-gray-300 hover:text-white font-medium px-6 py-4 rounded-xl border border-white/10 hover:border-white/20 transition-colors"
              >
                Ou envie um email
                <span>→</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Compact links row */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            {/* Logo + Badge */}
            <div className="flex items-center gap-4">
              <Image
                src="/images/logo-zopu.png"
                alt="Zopu"
                width={90}
                height={30}
                className="h-7 w-auto brightness-0 invert"
              />
              <div className="h-4 w-px bg-white/20" />
              <span className="text-xs text-gray-500 font-medium">Gold Partner Bitrix24</span>
            </div>

            {/* Links inline */}
            <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {allLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-gray-500 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-600">
            <p>© {new Date().getFullYear()} Zopu. Todos os direitos reservados.</p>
            <div className="flex items-center gap-4">
              <Link href="/privacidade" className="hover:text-gray-400 transition-colors">
                Privacidade
              </Link>
              <Link href="/cookies" className="hover:text-gray-400 transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
