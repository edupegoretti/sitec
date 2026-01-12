/**
 * Motion Tokens - Sistema centralizado de animações
 *
 * Inspirado no padrão Stripe: movimento como orientação, não decoração.
 * Todos os componentes devem usar estes tokens para garantir consistência.
 */

import type { Transition, Variants } from 'framer-motion'

// =============================================================================
// DURATIONS
// =============================================================================

export const durations = {
  /** Micro interactions: hover, focus (150ms) */
  micro: 0.15,
  /** Fast UI feedback: buttons, toggles (300ms) */
  fast: 0.3,
  /** Medium transitions: reveals, tabs (500ms) */
  medium: 0.5,
  /** Slow transitions: page, modals (800ms) */
  slow: 0.8,
  /** Narrative storytelling: steppers, flows (1200ms) */
  narrative: 1.2,
} as const

// =============================================================================
// EASINGS
// =============================================================================

export const easings = {
  /** Premium easing - smooth deceleration (Zopu signature) */
  premium: [0.16, 1, 0.3, 1] as [number, number, number, number],
  /** Smooth easing - Material-like */
  smooth: [0.4, 0, 0.2, 1] as [number, number, number, number],
  /** Bounce easing - playful */
  bounce: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
  /** Linear - continuous loops */
  linear: [0, 0, 1, 1] as [number, number, number, number],
  /** Ease out - fast start, slow end */
  out: [0, 0, 0.2, 1] as [number, number, number, number],
  /** Ease in - slow start, fast end */
  in: [0.4, 0, 1, 1] as [number, number, number, number],
} as const

// =============================================================================
// STAGGERS
// =============================================================================

export const staggers = {
  /** Text characters/words */
  text: 0.08,
  /** List items */
  items: 0.1,
  /** Sections/cards */
  sections: 0.15,
  /** Hero elements (badge, title, description, cta) */
  hero: 0.12,
} as const

// =============================================================================
// DISTANCES
// =============================================================================

export const distances = {
  /** Small movement (8px) */
  sm: 8,
  /** Medium movement (16px) */
  md: 16,
  /** Large movement (30px) - default for reveals */
  lg: 30,
  /** Extra large (50px) */
  xl: 50,
} as const

// =============================================================================
// VIEWPORT SETTINGS
// =============================================================================

export const viewport = {
  /** Default margin for scroll triggers */
  margin: '-80px',
  /** Percentage of element visible to trigger */
  amount: 0.3,
  /** Trigger only once */
  once: true,
} as const

// =============================================================================
// TRANSITION PRESETS
// =============================================================================

export const transitions = {
  /** Default reveal transition */
  reveal: {
    duration: durations.medium,
    ease: easings.premium,
  } as Transition,

  /** Fast UI feedback */
  fast: {
    duration: durations.fast,
    ease: easings.premium,
  } as Transition,

  /** Micro interactions (hover/focus) */
  micro: {
    duration: durations.micro,
    ease: easings.smooth,
  } as Transition,

  /** Tab content switch */
  tab: {
    duration: durations.fast,
    ease: easings.premium,
  } as Transition,

  /** Slow narrative transitions */
  narrative: {
    duration: durations.narrative,
    ease: easings.premium,
  } as Transition,

  /** Spring physics for counters */
  spring: {
    type: 'spring' as const,
    stiffness: 100,
    damping: 60,
  } as Transition,
} as const

// =============================================================================
// VARIANT PRESETS
// =============================================================================

export const variants = {
  /** Fade in from bottom */
  fadeUp: {
    initial: { opacity: 0, y: distances.lg },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: distances.sm },
  } as Variants,

  /** Fade in from top */
  fadeDown: {
    initial: { opacity: 0, y: -distances.lg },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -distances.sm },
  } as Variants,

  /** Fade in from left */
  fadeLeft: {
    initial: { opacity: 0, x: distances.lg },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: distances.sm },
  } as Variants,

  /** Fade in from right */
  fadeRight: {
    initial: { opacity: 0, x: -distances.lg },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -distances.sm },
  } as Variants,

  /** Simple fade */
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  } as Variants,

  /** Scale up */
  scale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  } as Variants,

  /** Tab content transition */
  tabContent: {
    initial: { opacity: 0, y: distances.sm },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -distances.sm },
  } as Variants,

  /** Accordion content */
  accordion: {
    initial: { height: 0, opacity: 0 },
    animate: { height: 'auto', opacity: 1 },
    exit: { height: 0, opacity: 0 },
  } as Variants,

  /** Card hover state */
  cardHover: {
    initial: { y: 0, scale: 1 },
    hover: {
      y: -4,
      scale: 1.01,
      transition: transitions.fast,
    },
  } as Variants,

  /** Stagger container */
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: staggers.items,
      },
    },
  } as Variants,

  /** Stagger item */
  staggerItem: {
    initial: { opacity: 0, y: distances.md },
    animate: { opacity: 1, y: 0 },
  } as Variants,
} as const

// =============================================================================
// DIRECTION HELPERS
// =============================================================================

export type Direction = 'up' | 'down' | 'left' | 'right' | 'none'

export const getDirectionOffset = (direction: Direction, distance: number = distances.lg) => {
  switch (direction) {
    case 'up':
      return { y: distance }
    case 'down':
      return { y: -distance }
    case 'left':
      return { x: distance }
    case 'right':
      return { x: -distance }
    case 'none':
    default:
      return {}
  }
}

// =============================================================================
// BLUR HELPER
// =============================================================================

export const blur = {
  none: 'blur(0px)',
  sm: 'blur(4px)',
  md: 'blur(10px)',
  lg: 'blur(20px)',
} as const

// =============================================================================
// HERO STAGGER PRESET
// =============================================================================

/**
 * Hero entrance animation with staggered elements
 * Usage: Apply delay based on element index
 */
export const heroEntrance = {
  badge: 0,
  title: staggers.hero,
  description: staggers.hero * 2,
  cta: staggers.hero * 3,
  visual: staggers.hero * 4,
} as const

// =============================================================================
// CSS VARIABLES (for Tailwind integration)
// =============================================================================

export const cssVariables = {
  '--duration-micro': `${durations.micro}s`,
  '--duration-fast': `${durations.fast}s`,
  '--duration-medium': `${durations.medium}s`,
  '--duration-slow': `${durations.slow}s`,
  '--duration-narrative': `${durations.narrative}s`,
  '--ease-premium': 'cubic-bezier(0.16, 1, 0.3, 1)',
  '--ease-smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
  '--ease-bounce': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
} as const
