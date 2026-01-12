'use client'

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
} from 'react'
import { motion, AnimatePresence, useReducedMotion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'
import { durations, easings, distances, transitions, staggers } from '@/lib/motion'

// =============================================================================
// TYPES
// =============================================================================

interface Step {
  id: string
  label: string
  shortLabel?: string
  icon?: React.ReactNode
  color?: string
}

interface StepperContextValue {
  activeStep: string
  steps: readonly Step[]
  onStepChange: (stepId: string) => void
  variant: 'light' | 'dark'
}

const StepperContext = createContext<StepperContextValue | null>(null)

function useStepper() {
  const context = useContext(StepperContext)
  if (!context) {
    throw new Error('Stepper components must be used within a StickyStepper')
  }
  return context
}

// =============================================================================
// STICKY STEPPER ROOT
// =============================================================================

interface StickyStepperProps {
  children: React.ReactNode
  /** List of steps */
  steps: readonly Step[]
  /** Default active step */
  defaultStep?: string
  /** Controlled active step */
  activeStep?: string
  /** Callback when step changes */
  onStepChange?: (stepId: string) => void
  /** Additional className */
  className?: string
  /** Color variant */
  variant?: 'light' | 'dark'
  /** Enable scroll-driven step change */
  scrollDriven?: boolean
}

export function StickyStepper({
  children,
  steps,
  defaultStep,
  activeStep: controlledStep,
  onStepChange,
  className,
  variant = 'dark',
  scrollDriven = true,
}: StickyStepperProps) {
  const [internalStep, setInternalStep] = useState(defaultStep ?? steps[0]?.id)
  const activeStep = controlledStep ?? internalStep

  const handleStepChange = useCallback(
    (stepId: string) => {
      setInternalStep(stepId)
      onStepChange?.(stepId)
    },
    [onStepChange]
  )

  return (
    <StepperContext.Provider
      value={{ activeStep, steps, onStepChange: handleStepChange, variant }}
    >
      <div className={cn('relative', className)} data-variant={variant}>
        {children}
      </div>
    </StepperContext.Provider>
  )
}

// =============================================================================
// STEPPER LAYOUT
// =============================================================================

interface StepperLayoutProps {
  children: React.ReactNode
  className?: string
}

export function StepperLayout({ children, className }: StepperLayoutProps) {
  return (
    <div
      className={cn(
        'grid gap-8 lg:gap-12',
        'lg:grid-cols-[280px_1fr]',
        'xl:grid-cols-[320px_1fr]',
        className
      )}
    >
      {children}
    </div>
  )
}

// =============================================================================
// STEPPER NAVIGATION (Sticky sidebar)
// =============================================================================

interface StepperNavigationProps {
  className?: string
  /** Show progress line */
  showProgress?: boolean
  /** Custom render for step item */
  renderStep?: (step: Step, isActive: boolean, index: number) => React.ReactNode
}

export function StepperNavigation({
  className,
  showProgress = true,
  renderStep,
}: StepperNavigationProps) {
  const { steps, activeStep, onStepChange, variant } = useStepper()
  const prefersReducedMotion = useReducedMotion()

  const activeIndex = steps.findIndex((s) => s.id === activeStep)
  const progress = ((activeIndex + 1) / steps.length) * 100

  const isDark = variant === 'dark'

  return (
    <div className={cn('hidden lg:block', className)}>
      <div className="sticky top-32">
        {/* Progress line */}
        {showProgress && (
          <div className="absolute left-[23px] top-0 bottom-0 w-0.5">
            {/* Background line */}
            <div
              className={cn(
                'absolute inset-0 rounded-full',
                isDark ? 'bg-white/10' : 'bg-gray-200'
              )}
            />
            {/* Progress fill */}
            <motion.div
              className="absolute top-0 left-0 w-full bg-brand rounded-full"
              initial={{ height: 0 }}
              animate={{ height: `${progress}%` }}
              transition={{
                duration: prefersReducedMotion ? 0 : durations.medium,
                ease: easings.premium,
              }}
            />
          </div>
        )}

        {/* Steps list */}
        <nav className="relative space-y-2" aria-label="Progress">
          {steps.map((step, index) => {
            const isActive = step.id === activeStep
            const isPast = index < activeIndex
            const stepColor = step.color || '#635BFF'

            if (renderStep) {
              return renderStep(step, isActive, index)
            }

            return (
              <button
                key={step.id}
                onClick={() => onStepChange(step.id)}
                className={cn(
                  'group relative w-full flex items-center gap-4 p-3 rounded-xl',
                  'text-left transition-all duration-300',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand',
                  isActive && isDark && 'bg-white/5',
                  isActive && !isDark && 'bg-gray-50',
                  !isActive && 'hover:bg-white/5'
                )}
                aria-current={isActive ? 'step' : undefined}
              >
                {/* Step indicator */}
                <div
                  className={cn(
                    'relative w-12 h-12 rounded-xl flex items-center justify-center',
                    'transition-all duration-300',
                    !isActive && isDark && 'bg-white/10 group-hover:bg-white/15',
                    !isActive && !isDark && 'bg-gray-100 group-hover:bg-gray-200'
                  )}
                  style={{
                    backgroundColor: isActive ? stepColor : undefined,
                    boxShadow: isActive ? `0 4px 14px ${stepColor}40` : undefined,
                  }}
                >
                  {step.icon || (
                    <span
                      className={cn(
                        'text-sm font-bold',
                        isActive ? 'text-white' : isDark ? 'text-gray-400' : 'text-gray-500'
                      )}
                    >
                      {index + 1}
                    </span>
                  )}
                </div>

                {/* Step label */}
                <div className="flex-1 min-w-0">
                  <span
                    className={cn(
                      'block text-sm font-semibold tracking-wide uppercase',
                      'transition-colors duration-300',
                      isDark ? 'text-gray-500' : 'text-gray-400'
                    )}
                    style={{ color: isActive ? stepColor : undefined }}
                  >
                    {step.shortLabel || `Step ${index + 1}`}
                  </span>
                  <span
                    className={cn(
                      'block text-base font-medium truncate',
                      'transition-colors duration-300',
                      isActive
                        ? isDark
                          ? 'text-white'
                          : 'text-gray-900'
                        : isDark
                        ? 'text-gray-400'
                        : 'text-gray-600'
                    )}
                  >
                    {step.label}
                  </span>
                </div>

                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="active-step-indicator"
                    className="absolute right-3 w-1.5 h-8 bg-brand rounded-full"
                    transition={{
                      type: 'spring',
                      stiffness: 400,
                      damping: 30,
                    }}
                  />
                )}
              </button>
            )
          })}
        </nav>
      </div>
    </div>
  )
}

// =============================================================================
// STEPPER CONTENT (Animated panels)
// =============================================================================

interface StepperContentProps {
  children: React.ReactNode
  className?: string
}

export function StepperContent({ children, className }: StepperContentProps) {
  return <div className={cn('relative', className)}>{children}</div>
}

// =============================================================================
// STEPPER PANEL (Individual step content)
// =============================================================================

interface StepperPanelProps {
  children: React.ReactNode
  /** Step ID this panel belongs to */
  step: string
  /** Additional className */
  className?: string
  /** Animation direction */
  direction?: 'horizontal' | 'vertical'
}

export function StepperPanel({
  children,
  step,
  className,
  direction = 'horizontal',
}: StepperPanelProps) {
  const { activeStep, steps } = useStepper()
  const prefersReducedMotion = useReducedMotion()
  const isActive = activeStep === step

  const activeIndex = steps.findIndex((s) => s.id === activeStep)
  const panelIndex = steps.findIndex((s) => s.id === step)
  const slideDirection = panelIndex > activeIndex ? 1 : -1

  const variants = {
    initial: {
      opacity: 0,
      x: direction === 'horizontal' ? slideDirection * 50 : 0,
      y: direction === 'vertical' ? 30 : 0,
    },
    animate: {
      opacity: 1,
      x: 0,
      y: 0,
    },
    exit: {
      opacity: 0,
      x: direction === 'horizontal' ? -slideDirection * 50 : 0,
      y: direction === 'vertical' ? -30 : 0,
    },
  }

  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          key={step}
          variants={prefersReducedMotion ? undefined : variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{
            duration: durations.medium,
            ease: easings.premium,
          }}
          className={className}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// =============================================================================
// MOBILE STEPPER (Horizontal tabs for mobile)
// =============================================================================

interface MobileStepperProps {
  className?: string
}

export function MobileStepper({ className }: MobileStepperProps) {
  const { steps, activeStep, onStepChange, variant } = useStepper()
  const scrollRef = useRef<HTMLDivElement>(null)
  const isDark = variant === 'dark'

  // Auto-scroll to active step
  useEffect(() => {
    if (scrollRef.current) {
      const activeIndex = steps.findIndex((s) => s.id === activeStep)
      const buttons = scrollRef.current.querySelectorAll('button')
      if (buttons[activeIndex]) {
        buttons[activeIndex].scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        })
      }
    }
  }, [activeStep, steps])

  return (
    <div className={cn('lg:hidden mb-8', className)}>
      {/* Scrollable tabs */}
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide snap-x snap-mandatory -mx-4 px-4"
      >
        {steps.map((step, index) => {
          const isActive = step.id === activeStep
          const stepColor = step.color || '#635BFF'

          return (
            <button
              key={step.id}
              onClick={() => onStepChange(step.id)}
              className={cn(
                'shrink-0 flex items-center gap-2 px-4 py-3 rounded-xl',
                'font-medium text-sm transition-all duration-300 snap-start',
                isActive
                  ? 'text-white shadow-md'
                  : isDark
                  ? 'bg-white/10 text-gray-300'
                  : 'bg-gray-100 text-gray-600'
              )}
              style={{
                backgroundColor: isActive ? stepColor : undefined,
                boxShadow: isActive ? `0 4px 14px ${stepColor}30` : undefined,
              }}
            >
              {step.icon || (
                <span
                  className={cn(
                    'w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold',
                    isActive ? 'bg-white/20' : isDark ? 'bg-white/10' : 'bg-gray-200'
                  )}
                >
                  {index + 1}
                </span>
              )}
              <span className="whitespace-nowrap">{step.label}</span>
            </button>
          )
        })}
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-1.5 mt-2">
        {steps.map((step) => {
          const isActive = step.id === activeStep
          return (
            <button
              key={step.id}
              onClick={() => onStepChange(step.id)}
              className={cn(
                'h-2 rounded-full transition-all duration-300',
                isActive ? 'bg-brand w-6' : isDark ? 'bg-white/20 w-2' : 'bg-gray-300 w-2'
              )}
              aria-label={`Go to ${step.label}`}
            />
          )
        })}
      </div>
    </div>
  )
}

// =============================================================================
// SCROLL OBSERVER (Auto-change step based on scroll)
// =============================================================================

interface ScrollStepTriggerProps {
  /** Step ID to activate when in view */
  step: string
  children: React.ReactNode
  className?: string
}

export function ScrollStepTrigger({
  step,
  children,
  className,
}: ScrollStepTriggerProps) {
  const { onStepChange } = useStepper()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, {
    margin: '-40% 0px -40% 0px',
    amount: 0.5,
  })

  useEffect(() => {
    if (isInView) {
      onStepChange(step)
    }
  }, [isInView, step, onStepChange])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

// =============================================================================
// EXPORT ALIAS
// =============================================================================

export { StickyStepper as StickyStepperRoot }
export type { Step }
