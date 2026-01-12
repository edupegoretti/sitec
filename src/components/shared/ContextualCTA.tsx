'use client'

import { motion } from 'framer-motion'
import { ArrowRight, type LucideIcon } from 'lucide-react'
import { Reveal } from './Reveal'

interface ContextualCTAProps {
  /** Brief context about what the user just learned */
  context: string
  /** Call to action text */
  ctaText: string
  /** Link destination */
  href: string
  /** Optional icon to display */
  icon?: LucideIcon
  /** Visual variant */
  variant?: 'subtle' | 'prominent'
  /** Background color theme */
  theme?: 'light' | 'dark' | 'brand'
  className?: string
}

export function ContextualCTA({
  context,
  ctaText,
  href,
  icon: Icon,
  variant = 'subtle',
  theme = 'light',
  className = '',
}: ContextualCTAProps) {
  const themeClasses = {
    light: {
      bg: 'bg-gray-50',
      contextText: 'text-gray-600',
      ctaBg: 'bg-brand text-white hover:bg-brand-hover',
      ctaBorder: 'border-brand',
    },
    dark: {
      bg: 'bg-gray-900',
      contextText: 'text-gray-400',
      ctaBg: 'bg-white text-gray-900 hover:bg-gray-100',
      ctaBorder: 'border-white',
    },
    brand: {
      bg: 'bg-gradient-to-br from-brand/5 to-purple-50/50',
      contextText: 'text-gray-700',
      ctaBg: 'bg-brand text-white hover:bg-brand-hover',
      ctaBorder: 'border-brand',
    },
  }

  const currentTheme = themeClasses[theme]

  if (variant === 'subtle') {
    return (
      <Reveal>
        <div className={`text-center ${className}`}>
          <p className={`text-base sm:text-lg ${currentTheme.contextText} mb-4 max-w-2xl mx-auto`}>
            {context}
          </p>
          <a
            href={href}
            className={`group inline-flex items-center gap-2 px-6 py-3 ${currentTheme.ctaBg} font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5`}
          >
            {Icon && <Icon className="w-5 h-5" />}
            <span>{ctaText}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </div>
      </Reveal>
    )
  }

  // Prominent variant
  return (
    <Reveal>
      <motion.div
        className={`relative ${currentTheme.bg} rounded-2xl p-8 sm:p-10 border-2 ${currentTheme.ctaBorder}/20 shadow-card overflow-hidden ${className}`}
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Decorative gradient */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <p className={`text-lg sm:text-xl ${currentTheme.contextText} mb-6 leading-relaxed`}>
            {context}
          </p>

          <a
            href={href}
            className={`group inline-flex items-center justify-center gap-2.5 px-8 py-4 ${currentTheme.ctaBg} font-semibold rounded-xl transition-all duration-300 shadow-elevated hover:shadow-elevated-hover hover:-translate-y-1`}
          >
            {Icon && <Icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />}
            <span className="text-base sm:text-lg">{ctaText}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </div>
      </motion.div>
    </Reveal>
  )
}

interface ContextualCTADualProps {
  /** Brief context about what the user just learned */
  context: string
  /** Primary CTA */
  primaryCTA: {
    text: string
    href: string
    icon?: LucideIcon
  }
  /** Secondary CTA */
  secondaryCTA: {
    text: string
    href: string
    icon?: LucideIcon
  }
  /** Background color theme */
  theme?: 'light' | 'dark' | 'brand'
  className?: string
}

/**
 * Dual CTA variant for when there are two clear next steps
 */
export function ContextualCTADual({
  context,
  primaryCTA,
  secondaryCTA,
  theme = 'light',
  className = '',
}: ContextualCTADualProps) {
  const themeClasses = {
    light: {
      bg: 'bg-gray-50',
      contextText: 'text-gray-600',
      primaryBg: 'bg-brand text-white hover:bg-brand-hover',
      secondaryBg: 'bg-white border-2 border-brand text-brand hover:bg-brand hover:text-white',
    },
    dark: {
      bg: 'bg-gray-900',
      contextText: 'text-gray-400',
      primaryBg: 'bg-white text-gray-900 hover:bg-gray-100',
      secondaryBg: 'bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900',
    },
    brand: {
      bg: 'bg-gradient-to-br from-brand/5 to-purple-50/50',
      contextText: 'text-gray-700',
      primaryBg: 'bg-brand text-white hover:bg-brand-hover',
      secondaryBg: 'bg-white border-2 border-brand text-brand hover:bg-brand hover:text-white',
    },
  }

  const currentTheme = themeClasses[theme]

  return (
    <Reveal>
      <div className={`${currentTheme.bg} rounded-2xl p-8 sm:p-10 border border-gray-200/50 ${className}`}>
        <div className="text-center max-w-3xl mx-auto">
          <p className={`text-lg sm:text-xl ${currentTheme.contextText} mb-6 leading-relaxed`}>
            {context}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={primaryCTA.href}
              className={`group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 ${currentTheme.primaryBg} font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5`}
            >
              {primaryCTA.icon && <primaryCTA.icon className="w-5 h-5" />}
              <span>{primaryCTA.text}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </a>

            <a
              href={secondaryCTA.href}
              className={`group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 ${currentTheme.secondaryBg} font-semibold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg`}
            >
              {secondaryCTA.icon && <secondaryCTA.icon className="w-5 h-5" />}
              <span>{secondaryCTA.text}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </div>
        </div>
      </div>
    </Reveal>
  )
}
