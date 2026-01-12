import { Metadata } from 'next'
import { Container } from '@/components/layout'
import { Reveal } from '@/components/shared'

export const metadata: Metadata = {
  title: 'Política de Cookies | Zopu',
  description: 'Política de Cookies da Zopu. Saiba como utilizamos cookies e tecnologias similares em nosso site.',
}

export default function CookiesPage() {
  return (
    <main className="pt-20 lg:pt-24">
      <section className="py-16 sm:py-24">
        <Container>
          <Reveal>
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl font-bold text-gray-900 mb-8">
                Política de Cookies
              </h1>

              <p className="text-gray-600 mb-8">
                Última atualização: Dezembro de 2024
              </p>

              <div className="prose prose-gray max-w-none">
                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  1. O que são Cookies?
                </h2>
                <p className="text-gray-600 mb-4">
                  Cookies são pequenos arquivos de texto armazenados em seu dispositivo (computador, tablet ou celular) quando você visita um site. Eles são amplamente utilizados para fazer os sites funcionarem de forma mais eficiente e fornecer informações aos proprietários do site.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  2. Tipos de Cookies que Utilizamos
                </h2>

                <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                  2.1 Cookies Essenciais
                </h3>
                <p className="text-gray-600 mb-4">
                  São necessários para o funcionamento básico do site. Sem eles, o site não funcionaria corretamente. Incluem cookies de sessão e preferências básicas.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                  2.2 Cookies de Desempenho
                </h3>
                <p className="text-gray-600 mb-4">
                  Coletam informações sobre como os visitantes usam o site, como quais páginas são mais visitadas. Usamos essas informações para melhorar o funcionamento do site. Exemplo: Google Analytics.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                  2.3 Cookies de Funcionalidade
                </h3>
                <p className="text-gray-600 mb-4">
                  Permitem que o site se lembre de escolhas que você faz e forneça recursos aprimorados e mais personalizados.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                  2.4 Cookies de Marketing
                </h3>
                <p className="text-gray-600 mb-4">
                  São usados para rastrear visitantes em sites. A intenção é exibir anúncios relevantes e envolventes para o usuário individual. Exemplo: Facebook Pixel, Google Ads.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  3. Cookies de Terceiros
                </h2>
                <p className="text-gray-600 mb-4">
                  Nosso site pode conter cookies de serviços de terceiros, incluindo:
                </p>
                <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                  <li><strong>Google Analytics:</strong> para análise de tráfego e comportamento do usuário</li>
                  <li><strong>Google Tag Manager:</strong> para gerenciamento de tags e scripts</li>
                  <li><strong>Facebook/Meta Pixel:</strong> para análise de conversões e remarketing</li>
                  <li><strong>Typeform:</strong> para formulários e diagnósticos interativos</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  4. Como Gerenciar Cookies
                </h2>
                <p className="text-gray-600 mb-4">
                  Você pode controlar e/ou excluir cookies conforme desejar. A maioria dos navegadores permite:
                </p>
                <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                  <li>Ver quais cookies estão armazenados e excluí-los individualmente</li>
                  <li>Bloquear cookies de terceiros</li>
                  <li>Bloquear todos os cookies</li>
                  <li>Excluir todos os cookies ao fechar o navegador</li>
                </ul>
                <p className="text-gray-600 mb-4">
                  <strong>Importante:</strong> Se você desativar os cookies, algumas funcionalidades do site podem não funcionar corretamente.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  5. Como Desativar Cookies nos Navegadores
                </h2>
                <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                  <li><strong>Chrome:</strong> Configurações → Privacidade e segurança → Cookies</li>
                  <li><strong>Firefox:</strong> Opções → Privacidade e Segurança → Cookies</li>
                  <li><strong>Safari:</strong> Preferências → Privacidade → Cookies</li>
                  <li><strong>Edge:</strong> Configurações → Privacidade → Cookies</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  6. Opt-out de Cookies de Análise
                </h2>
                <p className="text-gray-600 mb-4">
                  Você pode optar por não ser rastreado pelo Google Analytics visitando:
                </p>
                <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                  <li>
                    <a
                      href="https://tools.google.com/dlpage/gaoptout"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand hover:underline"
                    >
                      Google Analytics Opt-out Browser Add-on
                    </a>
                  </li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  7. Alterações nesta Política
                </h2>
                <p className="text-gray-600 mb-4">
                  Esta política de cookies pode ser atualizada periodicamente para refletir mudanças em nossas práticas ou por outras razões operacionais, legais ou regulatórias.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  8. Contato
                </h2>
                <p className="text-gray-600 mb-4">
                  Para dúvidas sobre nossa política de cookies, entre em contato:
                </p>
                <ul className="list-none text-gray-600 mb-4 space-y-2">
                  <li><strong>E-mail:</strong> privacidade@zopu.com.br</li>
                  <li><strong>WhatsApp:</strong> +55 47 9118-1054</li>
                </ul>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </main>
  )
}
