'use client'

import { Container } from '@/components/layout'
import { SectionHeader, Reveal } from '@/components/shared'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/shared/Accordion'
import { ZOPU_LINKS } from '@/lib/constants'

// FAQ com objeções reais do decisor
const FAQ_ITEMS = [
  {
    question: 'Meu time já tentou CRM e não usou. Por que agora seria diferente?',
    answer:
      'Porque CRM falha quando é tratado como "sistema para preencher". Nossa metodologia trata CRM como rotina de trabalho: processo mapeado antes de configurar, treinamento por função (não genérico), e acompanhamento pós-go-live de 30-60 dias. Com 96% de retenção anual, podemos afirmar: times usam quando o processo faz sentido.',
  },
  {
    question: 'Quanto tempo até eu confiar nos números?',
    answer:
      'Depende do estado atual dos seus dados. Com dados limpos, você terá dashboards confiáveis desde o go-live. Com dados bagunçados, incluímos higienização e padronização no projeto — tipicamente 2-4 semanas adicionais. O importante: não prometemos "número bonito", prometemos número real.',
  },
  {
    question: 'Vocês integram WhatsApp de forma oficial?',
    answer:
      'Sim. O WhatsZopu usa a API oficial da Meta (WhatsApp Business API). Isso significa: sem risco de bloqueio, histórico centralizado no CRM, distribuição inteligente entre atendentes, e SLAs configurados por etapa. Nada de gambiarras com WhatsApp Web.',
  },
  {
    question: 'Vocês somem depois do projeto?',
    answer:
      'Não. É por isso que temos 96% de retenção. Todo projeto inclui acompanhamento pós-go-live (30 dias no CRM Express, 60 dias no RevOps Launch). Depois, oferecemos suporte contínuo com SLA: primeira resposta em menos de 5 minutos (Enterprise menos de 2 minutos).',
  },
  {
    question: 'O que vocês precisam do meu lado para isso dar certo?',
    answer:
      'Três coisas: (1) Sponsor executivo com poder de decisão, (2) Time-chave disponível para entrevistas e validações, (3) Critérios de sucesso definidos antes do go-live. Não aceitamos projetos sem essas condições — é parte da nossa qualidade.',
  },
  {
    question: 'Como vocês lidam com segurança e LGPD?',
    answer:
      'Somos o único parceiro Bitrix24 com certificação AICPA SOC 2 Type II. Consultores usam VPN obrigatória, endpoint protection, 2FA, e assinam NDA. Para LGPD, configuramos permissões adequadas e políticas de retenção de dados. Temos Trust Center público com todos os detalhes.',
  },
] as const

export function FAQChallengerSection() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <Container>
        <SectionHeader
          label="Dúvidas"
          title="As perguntas que realmente importam"
          description="Respostas diretas para as objeções mais comuns de quem já tentou CRM antes."
        />

        <Reveal>
          <div className="max-w-3xl mx-auto bg-gradient-to-br from-gray-50 to-gray-100/80 rounded-3xl p-4 sm:p-6 lg:p-8 relative overflow-hidden shadow-card">
            {/* Decorative element */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand/3 rounded-full -translate-y-1/2 translate-x-1/2 blur-xl" />

            <div className="relative z-10 bg-white rounded-2xl border border-gray-200/80 shadow-sm p-2 sm:p-4">
              <Accordion type="single" defaultValue="item-0" collapsible>
                {FAQ_ITEMS.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{item.question}</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </Reveal>

        {/* CTA secundário */}
        <Reveal delay={0.3}>
          <div className="text-center mt-12">
            <p className="text-gray-500 mb-4">Tem outra dúvida?</p>
            <a
              href={ZOPU_LINKS.whatsappEspecialista}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-brand font-semibold hover:underline"
            >
              Pergunte direto no WhatsApp
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
