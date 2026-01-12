'use client'

import { Container } from '@/components/layout'
import { SectionHeader, Reveal } from '@/components/shared'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/shared/Accordion'

const FAQ_ITEMS = [
  {
    question: 'Quanto tempo leva a implementação?',
    answer: 'Depende do escopo, mas a maioria dos projetos entra em produção entre 30 e 90 dias. Começamos com um diagnóstico gratuito que mapeia suas necessidades e define um cronograma realista. Projetos menores (como WhatsZopu isolado) podem rodar em 2 semanas.',
  },
  {
    question: 'E se eu já tenho outro CRM?',
    answer: 'Fazemos migração completa. Já migramos dados de Salesforce, Pipedrive, HubSpot, RD Station e dezenas de outros sistemas. O histórico de clientes, negociações e comunicações vem junto. Você não perde nada.',
  },
  {
    question: 'Preciso trocar todas as minhas ferramentas?',
    answer: 'Não. O Bitrix24 integra com as ferramentas que você já usa: Google Workspace, Microsoft 365, WhatsApp, sistemas ERP, e-commerce, etc. Substituímos apenas o que faz sentido para sua operação.',
  },
  {
    question: 'Como funciona o suporte após a implementação?',
    answer: 'Se você contratar a licença Bitrix24 com a Zopu, você tem 365 dias de suporte completo incluído. Acesso via WhatsApp, chamados por e-mail e reuniões periódicas de revisão. Quase todos os nossos clientes renovam o contrato anualmente — somos reconhecidos pela Bitrix24 como referência em retenção.',
  },
  {
    question: 'E se não funcionar para minha empresa?',
    answer: 'Começamos com diagnóstico gratuito justamente para avaliar fit. Se identificarmos que Bitrix24 não é a melhor solução, somos transparentes. Nosso sucesso depende do seu sucesso — não vendemos projetos que não vão dar certo.',
  },
  {
    question: 'Qual o investimento mínimo?',
    answer: 'Depende do escopo e do nível de acompanhamento. No diagnóstico gratuito, indicamos a entrada ideal — 30 a 90 dias ou sob medida — e o investimento mais adequado para a sua operação.',
  },
] as const

export function FAQSection() {
  return (
    <section className="py-16 sm:py-24 bg-[#FAFAFC]">
      <Container>
        <SectionHeader
          label="Dúvidas"
          title="Perguntas frequentes"
          description="As respostas para as dúvidas mais comuns sobre implementação e suporte."
        />

        <Reveal>
          <div className="max-w-3xl mx-auto bg-linear-to-br from-gray-50 to-gray-100/80 rounded-3xl p-4 sm:p-6 lg:p-8 relative overflow-hidden shadow-card">
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
            <p className="text-gray-500 mb-4">
              Não encontrou sua dúvida?
            </p>
            <a
              href="https://wa.me/554791181054"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-brand font-semibold hover:underline"
            >
              Fale com nossa equipe pelo WhatsApp
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
