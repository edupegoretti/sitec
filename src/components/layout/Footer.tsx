import Link from "next/link";
import Image from "next/image";
import {
  LinkedinLogo,
  InstagramLogo,
  YoutubeLogo,
  WhatsappLogo,
  EnvelopeSimple,
  ArrowUpRight,
} from "@phosphor-icons/react/dist/ssr";
import { ZOPU_LINKS } from "@/lib/constants";

// Footer navigation structure based on site architecture
const FOOTER_NAV = {
  solucoes: {
    title: "Soluções",
    links: [
      { label: "CRM Express", href: "/crm-express" },
      { label: "RevOps Launch", href: "/revopslaunch" },
      { label: "Mapa de Performance", href: "/mapadeperformance" },
      { label: "Enterprise", href: "/bitrix24-enterprise" },
    ],
  },
  empresa: {
    title: "Empresa",
    links: [
      { label: "Sobre a Zopu", href: "/sobre" },
      { label: "Por que Zopu", href: "/por-que-zopu" },
      { label: "Por que Bitrix24", href: "/por-que-bitrix24" },
      { label: "Cases de Sucesso", href: "/cases" },
      { label: "Metodologia", href: "/metodologia" },
      { label: "Contato", href: "/contato" },
      { label: "Trabalhe Conosco", href: "/trabalhe-conosco" },
    ],
  },
  recursos: {
    title: "Recursos",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Zopucast", href: "/recursos/biblioteca/zopucast" },
      { label: "Webinars", href: "/recursos/biblioteca/webinars-bitrix24" },
      {
        label: "Fluidz Academy",
        href: ZOPU_LINKS.fluidz,
        external: true,
      },
      {
        label: "Diagnóstico Gratuito",
        href: ZOPU_LINKS.diagnostico,
        external: true,
      },
    ],
  },
  paraVoce: {
    title: "Para você",
    links: [
      { label: "Time Comercial", href: "/para/comercial" },
      { label: "Gestores", href: "/para/gestores" },
      { label: "TI", href: "/para/ti" },
      { label: "Bitrix24 para PMEs", href: "/bitrix24-para-pmes" },
    ],
  },
} as const;

const SOCIAL_LINKS = [
  {
    name: "LinkedIn",
    href: ZOPU_LINKS.linkedin,
    icon: LinkedinLogo,
  },
  {
    name: "Instagram",
    href: ZOPU_LINKS.instagram,
    icon: InstagramLogo,
  },
  {
    name: "YouTube",
    href: ZOPU_LINKS.youtube,
    icon: YoutubeLogo,
  },
];

export function Footer() {
  return (
    <footer className="bg-gray-950 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        {/* Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 lg:gap-10">
          {/* Logo Column */}
          <div className="col-span-2">
            <Image
              src="/images/logo-zopu.png"
              alt="Zopu"
              width={120}
              height={40}
              className="h-8 w-auto brightness-0 invert"
            />
            <p className="mt-4 text-sm text-gray-400 leading-relaxed max-w-xs">
              O parceiro de crescimento que os clientes da Bitrix24 mais confiam ❤️
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2 mt-6">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
                >
                  <social.icon
                    weight="duotone"
                    className="w-[18px] h-[18px] text-gray-400 hover:text-white transition-colors"
                  />
                </a>
              ))}
            </div>
          </div>
          {/* Navigation Columns */}
          {Object.values(FOOTER_NAV).map((section) => (
            <div key={section.title}>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    {"external" in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors"
                      >
                        {link.label}
                        <ArrowUpRight
                          weight="bold"
                          className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity"
                        />
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
          ))}

          {/* Contact Column */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">
              Contato
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={ZOPU_LINKS.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2.5 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  <span className="w-8 h-8 rounded-lg bg-[#25D366]/10 flex items-center justify-center group-hover:bg-[#25D366]/20 transition-colors">
                    <WhatsappLogo
                      weight="duotone"
                      className="w-4 h-4 text-[#25D366]"
                    />
                  </span>
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${ZOPU_LINKS.email}`}
                  className="group flex items-center gap-2.5 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                    <EnvelopeSimple
                      weight="duotone"
                      className="w-4 h-4 text-gray-400"
                    />
                  </span>
                  {ZOPU_LINKS.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} Zopu. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/seguranca"
                className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
              >
                Segurança
              </Link>
              <Link
                href="/privacidade"
                className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
              >
                Privacidade
              </Link>
              <Link
                href="/cookies"
                className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
