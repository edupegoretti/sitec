import Link from 'next/link'
import Image from 'next/image'
import { Award } from 'lucide-react'
import { ZOPU_LINKS, ZOPU_STATS, ZOPU_RECONHECIMENTO } from '@/lib/constants'

export function Footer() {
  return (
    <footer className="bg-bg-dark pt-16 pb-8">
      {/* Barra de reconhecimento no topo do footer */}
      <div className="border-b border-white/10 pb-8 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Award className="w-6 h-6 text-brand" />
              <div>
                <p className="text-white font-semibold">Gold Partner Bitrix24</p>
                <p className="text-sm text-gray-400">
                  {ZOPU_RECONHECIMENTO.titulo} • {ZOPU_RECONHECIMENTO.periodo}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <span>{ZOPU_STATS.clientes} clientes</span>
              <span className="text-green-400">{ZOPU_STATS.retencao} retenção</span>
              <span>{ZOPU_STATS.paises} países</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grid principal */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12 pb-12 border-b border-white/10">
          {/* Logo e descrição */}
          <div className="col-span-2 lg:col-span-2">
            <Image
              src="/images/logo-zopu.png"
              alt="Zopu"
              width={120}
              height={40}
              className="h-10 w-auto brightness-0 invert"
            />
            <p className="text-gray-400 text-sm leading-relaxed mt-4 mb-6 max-w-sm">
              Transformamos Bitrix24 em estratégia de receita. Gold Partner oficial
              reconhecido pela Bitrix24 como referência em retenção de clientes.
            </p>
            <div className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-lg w-fit">
              <span className="text-sm font-medium text-white">
                Suporte {ZOPU_STATS.tempoResposta}
              </span>
              <span className="text-xs text-gray-400">
                {ZOPU_STATS.tempoRespostaContexto}
              </span>
            </div>
          </div>

          {/* Soluções */}
          <div>
            <h4 className="text-white font-semibold mb-4">Soluções</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/crm-express"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  CRM Express
                </Link>
              </li>
              <li>
                <Link
                  href="/revopslaunch"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  RevOps Launch
                </Link>
              </li>
              <li>
                <Link
                  href="/mapadeperformance"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Mapa de Performance de Receita
                </Link>
              </li>
              <li>
                <Link
                  href="/bitrix24-enterprise"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Enterprise
                </Link>
              </li>
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="text-white font-semibold mb-4">Empresa</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/mapadeperformance"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Mapa de Performance
                </Link>
              </li>
              <li>
                <Link
                  href="/por-que-zopu"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Por que Zopu
                </Link>
              </li>
              <li>
                <Link
                  href="/cases"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Cases
                </Link>
              </li>
              <li>
                <Link
                  href="/por-que-bitrix24"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Por que Bitrix24
                </Link>
              </li>
              <li>
                <a
                  href={ZOPU_LINKS.fluidz}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Fluidz Academy
                </a>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contato</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={ZOPU_LINKS.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={ZOPU_LINKS.whatsappEspecialista}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Falar com especialista
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${ZOPU_LINKS.email}`}
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  {ZOPU_LINKS.email}
                </a>
              </li>
            </ul>

            <h4 className="text-white font-semibold mb-4 mt-8">Para seu time</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/para/comercial"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Para Comercial
                </Link>
              </li>
              <li>
                <Link
                  href="/para/gestores"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Para Gestores
                </Link>
              </li>
              <li>
                <Link
                  href="/para/ti"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Para TI
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Zopu. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/seguranca"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Segurança
            </Link>
            <Link
              href="/privacidade"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Privacidade
            </Link>
            <Link
              href="/cookies"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
