'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { TOOLS, COMPARISON_DATA, type ToolId } from '@/lib/toolComparisonData'

interface UnifiedStickySelectorProps {
  selectedTool: ToolId
  onToolSelect: (tool: ToolId) => void
  activeCategory: string
  onCategorySelect: (category: string) => void
  isSticky: boolean
  isHidden?: boolean
}

export function UnifiedStickySelector({
  selectedTool,
  onToolSelect,
  activeCategory,
  onCategorySelect,
  isSticky,
  isHidden = false,
}: UnifiedStickySelectorProps) {
  const toolsArray = Object.values(TOOLS)

  return (
    <AnimatePresence>
      {!isHidden && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            'sticky top-18 z-40 transition-all duration-300',
            isSticky
              ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-200/50 py-4'
              : 'bg-white py-6'
          )}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Tool Selector Section - Centered */}
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              <div className="text-center mb-4">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Comparar com:
                </p>
              </div>
              <div className="flex items-center justify-center gap-3 flex-wrap">
                {toolsArray.map((tool, index) => (
                  <motion.button
                    key={tool.id}
                    onClick={() => onToolSelect(tool.id)}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.05 * index, duration: 0.2 }}
                    className={cn(
                      'px-5 py-2.5 rounded-xl text-sm font-semibold',
                      'transition-all duration-200 border-2',
                      selectedTool === tool.id
                        ? 'bg-brand text-white border-brand shadow-md shadow-brand/20'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-brand/30 hover:bg-gray-50'
                    )}
                    whileHover={{ scale: 1.03, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {tool.name}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Category Tabs - Centered with Enhanced Design */}
            <motion.div
              className="flex items-center justify-center gap-2 flex-wrap"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              {COMPARISON_DATA.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => onCategorySelect(cat.id)}
                  className={cn(
                    'relative flex items-center px-5 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap',
                    'transition-all duration-200',
                    activeCategory === cat.id
                      ? 'text-brand'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  )}
                >
                  {activeCategory === cat.id && (
                    <motion.div
                      layoutId="activeCategoryIndicator"
                      className="absolute inset-0 bg-brand/10 rounded-lg -z-10 border-2 border-brand/20"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <cat.icon weight="duotone" className="w-5 h-5 mr-2" />
                  <span className="font-medium">{cat.name}</span>
                </button>
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
