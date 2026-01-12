"use client";

import { useState } from "react";
import { CaretDown, ChatCircle } from "@phosphor-icons/react";
import { Container } from "@/components/layout";
import { SectionHeader, Reveal } from "@/components/shared";
import { cn } from "@/lib/utils";
import { FAQ_POR_QUE_ZOPU, ZOPU_LINKS } from "@/lib/constants";

function FAQItem({
  pergunta,
  resposta,
  isOpen,
  onClick,
  index,
}: {
  pergunta: string;
  resposta: string;
  isOpen: boolean;
  onClick: () => void;
  index: number;
}) {
  return (
    <Reveal delay={index * 0.05}>
      <div className="border-b border-gray-100 last:border-0">
        <button
          onClick={onClick}
          className="w-full py-5 px-4 flex items-center justify-between text-left group rounded-xl hover:bg-gray-50/50 transition-all duration-300 ease-out-expo"
          aria-expanded={isOpen}
        >
          <span
            className={cn(
              "text-lg font-medium transition-colors duration-300",
              isOpen ? "text-brand" : "text-gray-900 group-hover:text-brand",
            )}
          >
            {pergunta}
          </span>
          <CaretDown
            size={20}
            weight="bold"
            className={cn(
              "text-gray-400 transition-all duration-300 ease-out-expo shrink-0 ml-4",
              isOpen && "rotate-180 text-brand",
            )}
          />
        </button>
        <div
          className={cn(
            "overflow-hidden transition-all duration-300 ease-out-expo",
            isOpen ? "max-h-96 pb-5" : "max-h-0",
          )}
        >
          <p className="text-gray-600 leading-relaxed pr-8 pl-4">{resposta}</p>
        </div>
      </div>
    </Reveal>
  );
}

export function FAQPorQueZopu() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 sm:py-24 bg-white">
      <Container>
        <SectionHeader
          label="Objeções reais"
          title="Perguntas que você (ou seu CFO) vai fazer — respondidas antes de você perguntar."
          description="Cada dúvida aqui é uma objeção legítima. Se você pensa assim, está certo em desconfiar. Aqui está nossa resposta."
        />

        <div className="max-w-3xl mx-auto bg-linear-to-br from-gray-50 to-gray-100/80 rounded-3xl p-4 sm:p-6 lg:p-8 relative overflow-hidden shadow-card">
          {/* Decorative element */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand/3 rounded-full -translate-y-1/2 translate-x-1/2 blur-xl" />

          <div className="relative z-10 bg-white rounded-2xl border border-gray-200/80 shadow-sm p-2 sm:p-4">
            {FAQ_POR_QUE_ZOPU.map((item, index) => (
              <FAQItem
                key={index}
                pergunta={item.pergunta}
                resposta={item.resposta}
                isOpen={openIndex === index}
                onClick={() => handleToggle(index)}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* CTA secundário */}
        <Reveal delay={0.3}>
          <div className="text-center mt-12">
            <p className="text-gray-500 mb-4">
              Tem outra dúvida específica do seu cenário?
            </p>
            <a
              href={ZOPU_LINKS.whatsappEspecialista}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-brand font-semibold hover:underline"
            >
              <ChatCircle size={16} weight="duotone" />
              Falar com especialista
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
