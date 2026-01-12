import Image from 'next/image'
import { cn } from '@/lib/utils'
import { ZOPU_STATS, ZOPU_LINKS } from '@/lib/constants'
import { Button, WhatsAppButton } from '@/components/shared'

interface CTASectionProps {
  title?: string
  description?: string
  ctaText?: string
  showStats?: boolean
  showBadges?: boolean
  className?: string
}

const CREDENTIAL_BADGES = [
  { src: '/images/bitrix24screen/gold-partner.png', alt: 'Gold Partner Bitrix24' },
  { src: '/images/bitrix24screen/aicpasoc2.webp', alt: 'AICPA SOC 2 Type II' },
  { src: '/images/bitrix24screen/pmp.webp', alt: 'PMP Certified' },
  { src: '/images/bitrix24screen/awscertified.webp', alt: 'AWS Certified' },
  { src: '/images/bitrix24screen/googlegenai.png', alt: 'Google Gen AI' },
]

export function CTASection({
  title = 'Pronto para ter um CRM que funciona?',
  description = 'Converse com um especialista e descubra como transformar seu Bitrix24 em estratégia de receita.',
  ctaText = 'Falar com especialista',
  showStats = true,
  showBadges = false,
  className,
}: CTASectionProps) {
  return (
    <section className={cn('py-20 sm:py-28 lg:py-32 bg-bg-dark relative overflow-hidden', className)}>
      {/* Decorative gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-brand/5 via-transparent to-transparent" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Stats compactos - Premium styling */}
        {showStats && (
          <div className="flex flex-wrap justify-center gap-10 sm:gap-14 mb-12">
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-bold text-white">
                {ZOPU_STATS.clientes}
              </div>
              <div className="text-sm text-gray-400 mt-1">clientes</div>
            </div>
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-bold text-green-400">
                {ZOPU_STATS.retencao}
              </div>
              <div className="text-sm text-gray-400 mt-1">retenção</div>
            </div>
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-bold text-white">
                {ZOPU_STATS.diasParaFuncionar}
              </div>
              <div className="text-sm text-gray-400 mt-1">dias</div>
            </div>
          </div>
        )}

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
          {title}
        </h2>
        <p className="text-lg sm:text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Button
            href={ZOPU_LINKS.whatsappEspecialista}
            external
            size="lg"
            showArrow
          >
            {ctaText}
          </Button>
        </div>

        {/* Badges de certificação */}
        {showBadges && (
          <div className="mt-12 pt-10 border-t border-white/10">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-6">
              Certificações e credenciais
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-10">
              {CREDENTIAL_BADGES.map((badge) => (
                <Image
                  key={badge.alt}
                  src={badge.src}
                  alt={badge.alt}
                  width={96}
                  height={96}
                  className="w-20 h-20 sm:w-24 sm:h-24 object-contain opacity-80 hover:opacity-100 transition-opacity"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
