/**
 * VARIAÇÃO 1: Ultra-Minimal
 *
 * Conceito: Máximo espaço negativo, tipografia como elemento principal.
 * Inspiração: Apple, Aesop, minimalismo suíço.
 *
 * Características:
 * - Muito espaço em branco (padding generoso)
 * - Tipografia grande e limpa
 * - Sem ícones desnecessários
 * - Links em linha única
 * - CTA WhatsApp elegante mas discreto
 */

import Link from 'next/link'
import Image from 'next/image'

const links = {
  solucoes: [
    { label: 'CRM Express', href: '/crm-express' },
    { label: 'RevOps Launch', href: '/revopslaunch' },
    { label: 'Enterprise', href: '/bitrix24-enterprise' },
  ],
  empresa: [
    { label: 'Por que Zopu', href: '/por-que-zopu' },
    { label: 'Cases', href: '/cases' },
    { label: 'Blog', href: '/blog' },
  ],
  legal: [
    { label: 'Privacidade', href: '/privacidade' },
    { label: 'Cookies', href: '/cookies' },
  ],
}

export function FooterV1() {
  return (
    <footer className="bg-[#0A0A0A] text-white">
      {/* Main Section - Ultra generous spacing */}
      <div className="max-w-6xl mx-auto px-6 pt-24 pb-16">
        {/* CTA Section */}
        <div className="mb-24">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-[1.1] max-w-3xl">
            Pronto para transformar
            <br />
            <span className="text-gray-500">seu Bitrix24?</span>
          </h2>
          <div className="mt-10">
            <a
              href="https://wa.me/554733079280?text=Olá, vim pelo site da Zopu."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-lg text-white border-b border-white/30 pb-1 hover:border-white transition-colors group"
            >
              Falar com especialista
              <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>
        </div>

        {/* Links Grid - Minimal */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 pb-20 border-b border-white/10">
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-6">Soluções</h3>
            <ul className="space-y-4">
              {links.solucoes.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-6">Empresa</h3>
            <ul className="space-y-4">
              {links.empresa.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-6">Contato</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:contato@zopu.com.br"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  contato@zopu.com.br
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/554733079280"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-6">Legal</h3>
            <ul className="space-y-4">
              {links.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom - Logo and copyright */}
        <div className="pt-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div className="flex items-center gap-6">
            <Image
              src="/images/logo-zopu.png"
              alt="Zopu"
              width={80}
              height={28}
              className="h-6 w-auto brightness-0 invert opacity-60"
            />
            <span className="text-xs text-gray-600">Gold Partner Bitrix24</span>
          </div>
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} Zopu
          </p>
        </div>
      </div>
    </footer>
  )
}
