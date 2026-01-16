/**
 * VARIAÇÃO 3: Editorial
 *
 * Conceito: Layout assimétrico inspirado em revistas premium e editoriais.
 * Inspiração: Bloomberg, Financial Times, revistas de arquitetura.
 *
 * Características:
 * - Grid assimétrico com proporções intencionais
 * - Tipografia serif para headlines
 * - Linhas divisórias elegantes
 * - Densidade de informação bem organizada
 */

import Link from 'next/link'
import Image from 'next/image'

const links = {
  solucoes: [
    { label: 'CRM Express', href: '/crm-express' },
    { label: 'RevOps Launch', href: '/revopslaunch' },
    { label: 'Mapa de Performance', href: '/mapadeperformance' },
    { label: 'Enterprise', href: '/bitrix24-enterprise' },
  ],
  empresa: [
    { label: 'Por que Zopu', href: '/por-que-zopu' },
    { label: 'Cases', href: '/cases' },
    { label: 'Por que Bitrix24', href: '/por-que-bitrix24' },
    { label: 'Fluidz Academy', href: 'https://fluidz.com.br' },
  ],
  audiencias: [
    { label: 'Para Comercial', href: '/para/comercial' },
    { label: 'Para Gestores', href: '/para/gestores' },
    { label: 'Para TI', href: '/para/ti' },
  ],
}

export function FooterV3() {
  return (
    <footer className="bg-[#0C0C0C] text-white">
      {/* Editorial Header */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-12 gap-8 items-end">
            {/* Left: Statement */}
            <div className="col-span-12 lg:col-span-7">
              <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-4">
                Gold Partner Bitrix24 — 96% de Retenção
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light leading-[1.15] tracking-tight">
                O parceiro que faz
                <br />
                <em className="text-brand not-italic">clientes ficarem.</em>
              </h2>
            </div>

            {/* Right: CTA */}
            <div className="col-span-12 lg:col-span-5 lg:text-right">
              <a
                href="https://wa.me/554733079280?text=Olá, vim pelo site da Zopu."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-sm font-medium text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 px-6 py-3 rounded-full transition-all group"
              >
                <svg className="w-4 h-4 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Falar com especialista
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Links Grid - Editorial asymmetric */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-12 gap-8">
          {/* Col 1: Logo + Description (wide) */}
          <div className="col-span-12 md:col-span-5 lg:col-span-4">
            <Image
              src="/images/logo-zopu.png"
              alt="Zopu"
              width={100}
              height={34}
              className="h-8 w-auto brightness-0 invert mb-6"
            />
            <p className="text-sm text-gray-400 leading-relaxed mb-6 max-w-xs">
              Transformamos Bitrix24 em estratégia de receita. Reconhecidos pela Bitrix24 como referência em retenção.
            </p>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span>450+ clientes</span>
              <span className="w-1 h-1 bg-gray-600 rounded-full" />
              <span>18 países</span>
              <span className="w-1 h-1 bg-gray-600 rounded-full" />
              <span className="text-green-400">96% retenção</span>
            </div>
          </div>

          {/* Col 2: Soluções */}
          <div className="col-span-6 md:col-span-2 lg:col-span-2">
            <h4 className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-5 font-medium">
              Soluções
            </h4>
            <ul className="space-y-3">
              {links.solucoes.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Empresa */}
          <div className="col-span-6 md:col-span-2 lg:col-span-2">
            <h4 className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-5 font-medium">
              Empresa
            </h4>
            <ul className="space-y-3">
              {links.empresa.map((link) => (
                <li key={link.href}>
                  {link.href.startsWith('http') ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Para seu time */}
          <div className="col-span-6 md:col-span-2 lg:col-span-2">
            <h4 className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-5 font-medium">
              Para seu time
            </h4>
            <ul className="space-y-3">
              {links.audiencias.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Contato */}
          <div className="col-span-6 md:col-span-3 lg:col-span-2">
            <h4 className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-5 font-medium">
              Contato
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://wa.me/554733079280"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="mailto:contato@zopu.com.br"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  contato@zopu.com.br
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-600">
            <p>© {new Date().getFullYear()} Zopu</p>
            <div className="flex items-center gap-6">
              <Link href="/privacidade" className="hover:text-gray-400 transition-colors">
                Privacidade
              </Link>
              <Link href="/cookies" className="hover:text-gray-400 transition-colors">
                Cookies
              </Link>
              <Link href="/seguranca" className="hover:text-gray-400 transition-colors">
                Segurança
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
