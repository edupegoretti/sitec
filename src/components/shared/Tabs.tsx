'use client'

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useId,
  useRef,
  useEffect,
} from 'react'
import { motion, AnimatePresence, useReducedMotion, LayoutGroup } from 'framer-motion'
import { cn } from '@/lib/utils'
import { durations, easings, distances, transitions } from '@/lib/motion'

// =============================================================================
// CONTEXT
// =============================================================================

interface TabsContextValue {
  value: string
  onValueChange: (value: string) => void
  layoutId: string
  orientation: 'horizontal' | 'vertical'
}

const TabsContext = createContext<TabsContextValue | null>(null)

function useTabs() {
  const context = useContext(TabsContext)
  if (!context) {
    throw new Error('Tabs components must be used within a Tabs')
  }
  return context
}

// =============================================================================
// TABS ROOT
// =============================================================================

interface TabsProps {
  children: React.ReactNode
  /** Controlled value */
  value?: string
  /** Default value */
  defaultValue: string
  /** Callback when value changes */
  onValueChange?: (value: string) => void
  /** Additional className */
  className?: string
  /** Tab orientation */
  orientation?: 'horizontal' | 'vertical'
}

export function Tabs({
  children,
  value: controlledValue,
  defaultValue,
  onValueChange,
  className,
  orientation = 'horizontal',
}: TabsProps) {
  const [internalValue, setInternalValue] = useState(defaultValue)
  const layoutId = useId()

  const value = controlledValue ?? internalValue

  const handleValueChange = useCallback(
    (newValue: string) => {
      setInternalValue(newValue)
      onValueChange?.(newValue)
    },
    [onValueChange]
  )

  return (
    <TabsContext.Provider
      value={{ value, onValueChange: handleValueChange, layoutId, orientation }}
    >
      <LayoutGroup>
        <div
          className={cn(
            orientation === 'vertical' && 'flex gap-6',
            className
          )}
          data-orientation={orientation}
        >
          {children}
        </div>
      </LayoutGroup>
    </TabsContext.Provider>
  )
}

// =============================================================================
// TABS LIST
// =============================================================================

interface TabsListProps {
  children: React.ReactNode
  className?: string
  /** Variant style */
  variant?: 'pills' | 'underline' | 'cards'
}

export function TabsList({ children, className, variant = 'pills' }: TabsListProps) {
  const { orientation } = useTabs()

  return (
    <div
      role="tablist"
      aria-orientation={orientation}
      className={cn(
        // Base styles
        'relative',
        // Orientation
        orientation === 'horizontal' && 'flex flex-wrap justify-center gap-2 sm:gap-3',
        orientation === 'vertical' && 'flex flex-col gap-1',
        // Variant
        variant === 'underline' && 'border-b border-gray-200',
        className
      )}
    >
      {children}
    </div>
  )
}

// =============================================================================
// TAB TRIGGER
// =============================================================================

interface TabTriggerProps {
  children: React.ReactNode
  /** Value that identifies this tab */
  value: string
  /** Additional className */
  className?: string
  /** Disabled state */
  disabled?: boolean
  /** Badge content */
  badge?: React.ReactNode
  /** Variant style */
  variant?: 'pills' | 'underline' | 'cards'
}

export function TabTrigger({
  children,
  value,
  className,
  disabled = false,
  badge,
  variant = 'pills',
}: TabTriggerProps) {
  const { value: activeValue, onValueChange, layoutId } = useTabs()
  const prefersReducedMotion = useReducedMotion()
  const isActive = activeValue === value

  return (
    <button
      role="tab"
      type="button"
      aria-selected={isActive}
      aria-controls={`panel-${value}`}
      id={`tab-${value}`}
      tabIndex={isActive ? 0 : -1}
      disabled={disabled}
      onClick={() => onValueChange(value)}
      className={cn(
        // Base styles
        'relative font-medium transition-all',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2',
        // Disabled
        disabled && 'opacity-50 cursor-not-allowed',
        // Variant: Pills
        variant === 'pills' && [
          'px-5 py-3 sm:px-6 sm:py-3.5 rounded-2xl',
          'transition-colors duration-300 ease-out-expo',
          isActive ? 'text-white' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/80',
        ],
        // Variant: Underline
        variant === 'underline' && [
          'px-4 py-3 -mb-px',
          'border-b-2 transition-colors duration-300',
          isActive
            ? 'text-brand border-brand'
            : 'text-gray-600 border-transparent hover:text-gray-900 hover:border-gray-300',
        ],
        // Variant: Cards
        variant === 'cards' && [
          'px-6 py-4 rounded-xl border-2',
          'transition-all duration-300',
          isActive
            ? 'bg-brand/5 border-brand text-brand'
            : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300',
        ],
        className
      )}
    >
      {/* Animated background for pills variant */}
      {variant === 'pills' && isActive && !prefersReducedMotion && (
        <motion.div
          layoutId={`${layoutId}-bg`}
          className="absolute inset-0 bg-brand rounded-2xl shadow-elevated shadow-brand/20"
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 30,
          }}
        />
      )}

      {/* Animated underline for underline variant */}
      {variant === 'underline' && isActive && !prefersReducedMotion && (
        <motion.div
          layoutId={`${layoutId}-underline`}
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand"
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 30,
          }}
        />
      )}

      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {badge && (
          <span
            className={cn(
              'text-xs px-2 py-0.5 rounded-lg font-semibold',
              variant === 'pills' && isActive && 'bg-white/20 text-white',
              variant === 'pills' && !isActive && 'bg-green-100 text-green-700',
              variant === 'underline' && 'bg-green-100 text-green-700',
              variant === 'cards' && isActive && 'bg-brand/10 text-brand',
              variant === 'cards' && !isActive && 'bg-gray-100 text-gray-600'
            )}
          >
            {badge}
          </span>
        )}
      </span>
    </button>
  )
}

// =============================================================================
// TAB CONTENT
// =============================================================================

interface TabContentProps {
  children: React.ReactNode
  /** Value that identifies this panel */
  value: string
  /** Additional className */
  className?: string
  /** Animate content changes */
  animate?: boolean
  /** Force mount (keep in DOM when inactive) */
  forceMount?: boolean
}

export function TabContent({
  children,
  value,
  className,
  animate = true,
  forceMount = false,
}: TabContentProps) {
  const { value: activeValue } = useTabs()
  const prefersReducedMotion = useReducedMotion()
  const isActive = activeValue === value

  const shouldAnimate = animate && !prefersReducedMotion

  // Force mount: always render but hide when inactive
  if (forceMount) {
    return (
      <div
        role="tabpanel"
        id={`panel-${value}`}
        aria-labelledby={`tab-${value}`}
        hidden={!isActive}
        tabIndex={0}
        className={cn(isActive ? 'block' : 'hidden', className)}
      >
        {children}
      </div>
    )
  }

  // No animation
  if (!shouldAnimate) {
    if (!isActive) return null
    return (
      <div
        role="tabpanel"
        id={`panel-${value}`}
        aria-labelledby={`tab-${value}`}
        tabIndex={0}
        className={className}
      >
        {children}
      </div>
    )
  }

  // Animated content
  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          key={value}
          role="tabpanel"
          id={`panel-${value}`}
          aria-labelledby={`tab-${value}`}
          tabIndex={0}
          initial={{ opacity: 0, y: distances.sm }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -distances.sm }}
          transition={{
            duration: durations.fast,
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
// MOBILE TABS (Scroll + Dots)
// =============================================================================

interface MobileTabsProps {
  children: React.ReactNode
  className?: string
  /** Show dot indicators */
  showDots?: boolean
  /** Tab values for dots */
  tabValues?: string[]
}

export function MobileTabsList({
  children,
  className,
  showDots = true,
  tabValues = [],
}: MobileTabsProps) {
  const { value, onValueChange } = useTabs()
  const scrollRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to active tab
  useEffect(() => {
    if (scrollRef.current) {
      const activeIndex = tabValues.indexOf(value)
      const buttons = scrollRef.current.querySelectorAll('button')
      if (buttons[activeIndex]) {
        buttons[activeIndex].scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        })
      }
    }
  }, [value, tabValues])

  return (
    <div className={cn('sm:hidden', className)}>
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory"
      >
        {children}
      </div>

      {/* Dot indicators */}
      {showDots && tabValues.length > 0 && (
        <div className="flex justify-center gap-1.5 mt-3">
          {tabValues.map((tabValue) => (
            <button
              key={tabValue}
              onClick={() => onValueChange(tabValue)}
              className={cn(
                'h-2 rounded-full transition-all duration-300 ease-out-expo',
                tabValue === value ? 'bg-brand w-6' : 'bg-gray-300 w-2'
              )}
              aria-label={`Go to tab ${tabValue}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export function MobileTabTrigger({
  children,
  value,
  className,
  badge,
}: Omit<TabTriggerProps, 'variant'>) {
  const { value: activeValue, onValueChange } = useTabs()
  const isActive = activeValue === value

  return (
    <button
      role="tab"
      type="button"
      aria-selected={isActive}
      onClick={() => onValueChange(value)}
      className={cn(
        'shrink-0 px-4 py-2.5 rounded-xl font-medium text-sm',
        'transition-all duration-300 ease-out-expo snap-start',
        isActive
          ? 'bg-brand text-white shadow-sm'
          : 'bg-gray-100 text-gray-600',
        className
      )}
    >
      <span className="flex items-center gap-1.5">
        {children}
        {badge && (
          <span
            className={cn(
              'text-[10px] px-1.5 py-0.5 rounded-md font-semibold',
              isActive ? 'bg-white/20 text-white' : 'bg-green-100 text-green-700'
            )}
          >
            {badge}
          </span>
        )}
      </span>
    </button>
  )
}

// =============================================================================
// EXPORT ALIAS
// =============================================================================

export { Tabs as TabsRoot }
