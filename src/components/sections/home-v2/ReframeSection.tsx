"use client";

import { Lightbulb, ArrowRight } from "lucide-react";
import { Container } from "@/components/layout";
import { Reveal } from "@/components/shared";

export function ReframeSection() {
  return (
    <section className="relative py-16 sm:py-24 bg-white overflow-hidden">
      <Container>
        <div className="max-w-4xl mx-auto">
          <Reveal>
            {/* Main statement card */}
            <div className="bg-linear-to-br from-brand/5 via-white to-amber-50/30 rounded-2xl p-8 sm:p-12 border border-brand/10 shadow-sm">
              {/* Light bulb indicator */}
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-amber-100 rounded-full mb-8">
                <Lightbulb className="w-5 h-5 text-amber-600" />
                <span className="text-sm font-semibold text-amber-800">O reframe</span>
              </div>

              {/* Main quote */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                Ativar CRM é fácil.
                <span className="block mt-2 text-brand">
                  Difícil é manter adoção e ter dados confiáveis.
                </span>
              </h2>

              {/* Closing statement */}
              <div className="mt-8 pt-8 border-t border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-brand rounded-xl flex items-center justify-center shrink-0 mt-1">
                    <ArrowRight className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
                      É exatamente aí que a maioria dos projetos "morre" —
                      <span className="font-semibold text-gray-900"> e é aí que a Zopu trabalha.</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
