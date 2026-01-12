'use client'

import { createContext, useContext, useState, useCallback, useId } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { durations, easings, transitions } from '@/lib/motion'

// =============================================================================
// CONTEXT
// =============================================================================

type AccordionValue = string | string[] | null

interface AccordionContextValue {
  value: AccordionValue
  onToggle: (itemValue: string) => void
  type: 'single' | 'multiple'
}

const AccordionContext = createContext<AccordionContextValue | null>(null)

function useAccordion() {
  const context = useContext(AccordionContext)
  if (!context) {
    throw new Error('Accordion components must be used within an Accordion')
  }
  return context
}

// =============================================================================
// ACCORDION ROOT
// =============================================================================

interface AccordionProps {
  children: React.ReactNode
  /** Single or multiple items can be open */
  type?: 'single' | 'multiple'
  /** Controlled value - string for single, string[] for multiple */
  value?: AccordionValue
  /** Default open item(s) */
  defaultValue?: AccordionValue
  /** Callback when value changes */
  onValueChange?: (value: AccordionValue) => void
  /** Additional className */
  className?: string
  /** Collapse others when one opens (only for single type) */
  collapsible?: boolean
}

export function Accordion({
  children,
  type = 'single',
  value: controlledValue,
  defaultValue = null,
  onValueChange,
  className,
  collapsible = true,
}: AccordionProps) {
  const [internalValue, setInternalValue] = useState<AccordionValue>(defaultValue)

  const value = controlledValue !== undefined ? controlledValue : internalValue

  const onToggle = useCallback(
    (itemValue: string) => {
      let newValue: AccordionValue

      if (type === 'single') {
        // Single mode: toggle open/closed
        if (value === itemValue && collapsible) {
          newValue = null
        } else {
          newValue = itemValue
        }
      } else {
        // Multiple mode: add/remove from array
        const currentValues = Array.isArray(value) ? value : value ? [value] : []
        if (currentValues.includes(itemValue)) {
          newValue = currentValues.filter((v) => v !== itemValue)
        } else {
          newValue = [...currentValues, itemValue]
        }
      }

      setInternalValue(newValue)
      onValueChange?.(newValue)
    },
    [type, value, collapsible, onValueChange]
  )

  return (
    <AccordionContext.Provider value={{ value, onToggle, type }}>
      <div className={cn('space-y-0', className)}>{children}</div>
    </AccordionContext.Provider>
  )
}

// =============================================================================
// ACCORDION ITEM
// =============================================================================

interface AccordionItemContextValue {
  value: string
  isOpen: boolean
  triggerId: string
  contentId: string
}

const AccordionItemContext = createContext<AccordionItemContextValue | null>(null)

function useAccordionItem() {
  const context = useContext(AccordionItemContext)
  if (!context) {
    throw new Error('AccordionItem components must be used within an AccordionItem')
  }
  return context
}

interface AccordionItemProps {
  children: React.ReactNode
  /** Unique value for this item */
  value: string
  /** Additional className */
  className?: string
  /** Disabled state */
  disabled?: boolean
}

export function AccordionItem({
  children,
  value,
  className,
  disabled = false,
}: AccordionItemProps) {
  const { value: accordionValue, type } = useAccordion()
  const id = useId()

  const isOpen =
    type === 'single'
      ? accordionValue === value
      : Array.isArray(accordionValue) && accordionValue.includes(value)

  const triggerId = `accordion-trigger-${id}`
  const contentId = `accordion-content-${id}`

  return (
    <AccordionItemContext.Provider value={{ value, isOpen, triggerId, contentId }}>
      <div
        className={cn(
          'border-b border-gray-100 last:border-0',
          disabled && 'opacity-50 pointer-events-none',
          className
        )}
        data-state={isOpen ? 'open' : 'closed'}
        data-disabled={disabled || undefined}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  )
}

// =============================================================================
// ACCORDION TRIGGER
// =============================================================================

interface AccordionTriggerProps {
  children: React.ReactNode
  className?: string
  /** Show chevron icon */
  showIcon?: boolean
  /** Custom icon component */
  icon?: React.ReactNode
}

export function AccordionTrigger({
  children,
  className,
  showIcon = true,
  icon,
}: AccordionTriggerProps) {
  const { onToggle } = useAccordion()
  const { value, isOpen, triggerId, contentId } = useAccordionItem()
  const prefersReducedMotion = useReducedMotion()

  return (
    <button
      id={triggerId}
      type="button"
      onClick={() => onToggle(value)}
      aria-expanded={isOpen}
      aria-controls={contentId}
      className={cn(
        'w-full py-5 px-4 flex items-center justify-between text-left',
        'group rounded-xl',
        'hover:bg-gray-50/50',
        'transition-colors duration-300',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2',
        className
      )}
    >
      <span
        className={cn(
          'text-lg font-medium transition-colors duration-300',
          isOpen ? 'text-brand' : 'text-gray-900 group-hover:text-brand'
        )}
      >
        {children}
      </span>
      {showIcon && (
        icon || (
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{
              duration: prefersReducedMotion ? 0 : durations.fast,
              ease: easings.premium,
            }}
            className="shrink-0 ml-4"
          >
            <ChevronDown
              className={cn(
                'w-5 h-5 transition-colors duration-300',
                isOpen ? 'text-brand' : 'text-gray-400'
              )}
            />
          </motion.span>
        )
      )}
    </button>
  )
}

// =============================================================================
// ACCORDION CONTENT
// =============================================================================

interface AccordionContentProps {
  children: React.ReactNode
  className?: string
  /** Animate content on open/close */
  animate?: boolean
}

export function AccordionContent({
  children,
  className,
  animate = true,
}: AccordionContentProps) {
  const { isOpen, triggerId, contentId } = useAccordionItem()
  const prefersReducedMotion = useReducedMotion()

  const shouldAnimate = animate && !prefersReducedMotion

  if (!shouldAnimate) {
    // Simple CSS transition fallback
    return (
      <div
        id={contentId}
        role="region"
        aria-labelledby={triggerId}
        className={cn(
          'overflow-hidden transition-all duration-300',
          isOpen ? 'max-h-[500px] pb-5' : 'max-h-0'
        )}
      >
        <div className={cn('px-4 pr-8', className)}>{children}</div>
      </div>
    )
  }

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          id={contentId}
          role="region"
          aria-labelledby={triggerId}
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: 'auto',
            opacity: 1,
            transition: {
              height: { duration: durations.fast, ease: easings.premium },
              opacity: { duration: durations.fast, delay: 0.1 },
            },
          }}
          exit={{
            height: 0,
            opacity: 0,
            transition: {
              height: { duration: durations.fast, ease: easings.premium },
              opacity: { duration: durations.micro },
            },
          }}
          className="overflow-hidden"
        >
          <div className={cn('px-4 pr-8 pb-5', className)}>{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// =============================================================================
// EXPORT ALIAS
// =============================================================================

export { Accordion as AccordionRoot }
