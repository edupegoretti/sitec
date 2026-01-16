/**
 * VARIAÇÃO 4: Compact Premium
 *
 * Conceito: Alta densidade de informação com hierarquia elegante.
 * Inspiração: Linear, Vercel - footers compactos mas sofisticados.
 *
 * Características:
 * - Tudo em uma única seção
 * - Densidade alta, espaçamento refinado
 * - Hover states sutis
 * - Informação máxima, ruído mínimo
 */

import Link from 'next/link'
import Image from 'next/image'

const columns = [
  {
    title: 'Soluções',
    links: [
      { label: 'CRM Express', href: '/crm-express' },
      { label: 'RevOps Launch', href: '/revopslaunch' },
      { label: 'Mapa de Performance', href: '/mapadeperformance' },
      { label: 'Enterprise', href: '/bitrix24-enterprise' },
    ],
  },
  {
    title: 'Empresa',
    links: [
      { label: 'Por que Zopu', href: '/por-que-zopu' },
      { label: 'Cases', href: '/cases' },
      { label: 'Blog', href: '/blog' },
      { label: 'Por que Bitrix24', href: '/por-que-bitrix24' },
    ],
  },
  {
    title: 'Para seu time',
    links: [
      { label: 'Comercial', href: '/para/comercial' },
      { label: 'Gestores', href: '/para/gestores' },
      { label: 'TI', href: '/para/ti' },
    ],
  },
  {
    title: 'Recursos',
    links: [
      { label: 'Fluidz Academy', href: 'https://fluidz.com.br', external: true },
      { label: 'Diagnóstico', href: 'https://diagnosticodematuridade.zopu.com.br/', external: true },
    ],
  },
]

export function FooterV4() {
  return (
    <footer className="bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Single row: Logo + Links + CTA */}
        <div className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-12 gap-8 items-start">
          {/* Logo Column */}
          <div className="col-span-2 lg:col-span-3">
            <Image
              src="/images/logo-zopu.png"
              alt="Zopu"
              width={90}
              height={30}
              className="h-7 w-auto brightness-0 invert mb-4"
            />
            <p className="text-xs text-gray-500 leading-relaxed mb-4 max-w-[200px]">
              Transformamos Bitrix24 em estratégia de receita.
            </p>
            <div className="inline-flex items-center gap-2 px-2.5 py-1.5 bg-white/5 rounded-md border border-white/10">
              <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
              <span className="text-[10px] text-gray-400 font-medium">Gold Partner Bitrix24</span>
            </div>
          </div>

          {/* Link Columns */}
          {columns.map((column) => (
            <div key={column.title} className="col-span-1 lg:col-span-2">
              <h4 className="text-[10px] uppercase tracking-[0.15em] text-gray-500 mb-3 font-medium">
                {column.title}
              </h4>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link.href}>
                    {"external" in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1"
                      >
                        {link.label}
                        <svg className="w-2.5 h-2.5 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-xs text-gray-400 hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* CTA Column */}
          <div className="col-span-2 md:col-span-2 lg:col-span-2">
            <h4 className="text-[10px] uppercase tracking-[0.15em] text-gray-500 mb-3 font-medium">
              Contato
            </h4>
            <div className="space-y-3">
              <a
                href="https://wa.me/554733079280?text=Olá, vim pelo site da Zopu."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-gray-300 hover:text-white transition-colors group"
              >
                <span className="w-6 h-6 rounded-md bg-[#25D366]/10 flex items-center justify-center group-hover:bg-[#25D366]/20 transition-colors">
                  <svg className="w-3 h-3 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </span>
                WhatsApp
              </a>
              <a
                href="mailto:contato@zopu.com.br"
                className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors group"
              >
                <span className="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                  <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                Email
              </a>
            </div>

            {/* Stats mini */}
            <div className="mt-6 pt-4 border-t border-white/5">
              <div className="grid grid-cols-2 gap-3 text-[10px]">
                <div>
                  <span className="text-gray-500">Clientes</span>
                  <p className="text-white font-medium">450+</p>
                </div>
                <div>
                  <span className="text-gray-500">Retenção</span>
                  <p className="text-green-400 font-medium">96%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-8" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-gray-600">
          <p>© {new Date().getFullYear()} Zopu. Todos os direitos reservados.</p>
          <div className="flex items-center gap-4">
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
    </footer>
  )
}
