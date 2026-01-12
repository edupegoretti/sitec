import { Metadata } from 'next'
import { Container } from '@/components/layout'
import { Reveal } from '@/components/shared'

export const metadata: Metadata = {
  title: 'Política de Privacidade | Zopu',
  description: 'Política de Privacidade da Zopu. Saiba como coletamos, usamos e protegemos seus dados pessoais em conformidade com a LGPD.',
}

export default function PrivacidadePage() {
  return (
    <main className="pt-20 lg:pt-24">
      <section className="py-16 sm:py-24">
        <Container>
          <Reveal>
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl font-bold text-gray-900 mb-8">
                Política de Privacidade
              </h1>

              <p className="text-gray-600 mb-8">
                Última atualização: Dezembro de 2024
              </p>

              <div className="prose prose-gray max-w-none">
                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  1. Introdução
                </h2>
                <p className="text-gray-600 mb-4">
                  A Zopu Consultoria (&quot;Zopu&quot;, &quot;nós&quot;, &quot;nosso&quot;) está comprometida em proteger a privacidade dos visitantes do nosso site e de nossos clientes. Esta Política de Privacidade explica como coletamos, usamos, divulgamos e protegemos suas informações pessoais em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  2. Dados que Coletamos
                </h2>
                <p className="text-gray-600 mb-4">
                  Podemos coletar os seguintes tipos de informações:
                </p>
                <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                  <li><strong>Dados de identificação:</strong> nome, e-mail, telefone, empresa</li>
                  <li><strong>Dados de navegação:</strong> endereço IP, tipo de navegador, páginas visitadas</li>
                  <li><strong>Dados de comunicação:</strong> mensagens enviadas via formulários ou WhatsApp</li>
                  <li><strong>Dados de diagnóstico:</strong> informações fornecidas em nossos formulários de avaliação</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  3. Como Usamos seus Dados
                </h2>
                <p className="text-gray-600 mb-4">
                  Utilizamos suas informações para:
                </p>
                <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                  <li>Fornecer e melhorar nossos serviços de consultoria</li>
                  <li>Entrar em contato sobre diagnósticos e propostas solicitadas</li>
                  <li>Enviar comunicações relevantes sobre nossos serviços</li>
                  <li>Analisar e melhorar a experiência em nosso site</li>
                  <li>Cumprir obrigações legais e regulatórias</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  4. Base Legal para Tratamento
                </h2>
                <p className="text-gray-600 mb-4">
                  O tratamento de dados pessoais é realizado com base nas seguintes hipóteses legais previstas na LGPD:
                </p>
                <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                  <li>Consentimento do titular</li>
                  <li>Execução de contrato ou procedimentos preliminares</li>
                  <li>Legítimo interesse do controlador</li>
                  <li>Cumprimento de obrigação legal</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  5. Compartilhamento de Dados
                </h2>
                <p className="text-gray-600 mb-4">
                  Não vendemos seus dados pessoais. Podemos compartilhar informações com:
                </p>
                <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                  <li>Parceiros tecnológicos essenciais para prestação do serviço (ex: Bitrix24)</li>
                  <li>Prestadores de serviços que auxiliam nossas operações</li>
                  <li>Autoridades legais, quando exigido por lei</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  6. Seus Direitos
                </h2>
                <p className="text-gray-600 mb-4">
                  De acordo com a LGPD, você tem direito a:
                </p>
                <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                  <li>Confirmar a existência de tratamento de dados</li>
                  <li>Acessar seus dados pessoais</li>
                  <li>Corrigir dados incompletos ou desatualizados</li>
                  <li>Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários</li>
                  <li>Solicitar a portabilidade dos dados</li>
                  <li>Revogar o consentimento a qualquer momento</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  7. Segurança dos Dados
                </h2>
                <p className="text-gray-600 mb-4">
                  Implementamos medidas técnicas e organizacionais apropriadas para proteger seus dados pessoais contra acesso não autorizado, alteração, divulgação ou destruição.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  8. Retenção de Dados
                </h2>
                <p className="text-gray-600 mb-4">
                  Mantemos seus dados pessoais apenas pelo tempo necessário para cumprir as finalidades para as quais foram coletados, ou conforme exigido por lei.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  9. Contato
                </h2>
                <p className="text-gray-600 mb-4">
                  Para exercer seus direitos ou esclarecer dúvidas sobre esta política, entre em contato:
                </p>
                <ul className="list-none text-gray-600 mb-4 space-y-2">
                  <li><strong>E-mail:</strong> privacidade@zopu.com.br</li>
                  <li><strong>WhatsApp:</strong> +55 47 9118-1054</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  10. Alterações nesta Política
                </h2>
                <p className="text-gray-600 mb-4">
                  Esta política pode ser atualizada periodicamente. Recomendamos que você a consulte regularmente. Alterações significativas serão comunicadas através de nossos canais oficiais.
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </main>
  )
}
