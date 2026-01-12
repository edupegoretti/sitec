'use client'

import { useState, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Check,
  FunnelSimple,
  ListChecks,
  ChatsCircle,
  HardDrives,
  CalendarBlank,
  Clock,
  Robot,
  Brain,
  TrendDown,
  Sparkle,
  CaretRight,
  Info,
  Users,
  CurrencyCircleDollar,
} from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
import {
  CALCULATOR_APPS,
  getBitrix24Price,
  type AppData,
} from '@/lib/calculatorAppsData'
import { ZOPU_LINKS } from '@/lib/constants'

// ============================================
// SVG LOGOS DOS APPS
// ============================================
const AppLogos: Record<string, React.ReactNode> = {
  salesforce: (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <path d="M20.1 11.4c1.8-1.9 4.3-3 7-3 3.4 0 6.4 1.7 8.2 4.3 1.6-.7 3.3-1.1 5.1-1.1 6.9 0 12.5 5.6 12.5 12.5S47.3 36.6 40.4 36.6c-.9 0-1.8-.1-2.6-.3-1.6 2.8-4.6 4.7-8.1 4.7-1.6 0-3.1-.4-4.4-1.1-1.5 3.2-4.8 5.4-8.6 5.4-4.1 0-7.6-2.6-8.9-6.2-.6.1-1.3.1-1.9.1C2.6 39.2 0 34.5 0 29.1c0-5.4 4.4-9.8 9.8-9.8.9 0 1.8.1 2.6.4 1.5-4.8 6-8.3 11.3-8.3h-3.6z" fill="#00A1E0"/>
    </svg>
  ),
  hubspot: (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <path d="M35.5 18.5v-5.3c1.5-.7 2.5-2.2 2.5-3.9 0-2.4-2-4.3-4.3-4.3-2.4 0-4.3 2-4.3 4.3 0 1.7 1 3.2 2.5 3.9v5.3c-2.3.5-4.4 1.6-6.1 3.2l-12.5-9.7c.1-.4.2-.8.2-1.2 0-2.4-2-4.3-4.3-4.3C6.8 6.5 4.8 8.4 4.8 10.8c0 2.4 2 4.3 4.3 4.3.8 0 1.5-.2 2.1-.6l12.2 9.5c-1.2 1.9-1.9 4.2-1.9 6.6 0 6.9 5.6 12.5 12.5 12.5s12.5-5.6 12.5-12.5c0-5.8-4-10.7-9.4-12zm-1.5 19c-3.6 0-6.5-2.9-6.5-6.5s2.9-6.5 6.5-6.5 6.5 2.9 6.5 6.5-2.9 6.5-6.5 6.5z" fill="#FF7A59"/>
    </svg>
  ),
  pipedrive: (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <circle cx="24" cy="24" r="20" fill="#1A1A1A"/>
      <path d="M24 12c-6.6 0-12 5.4-12 12s5.4 12 12 12 12-5.4 12-12-5.4-12-12-12zm0 18c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6z" fill="#017737"/>
    </svg>
  ),
  kommo: (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <rect width="48" height="48" rx="10" fill="#4A90E2"/>
      <path d="M14 24l6 6 14-14" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  zoho: (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <path d="M4 12h10l-10 24h10l10-24h10l-10 24h10" stroke="#D32F2F" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  ),
  rdstation: (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <rect width="48" height="48" rx="8" fill="#00A650"/>
      <path d="M12 24h8v12h-8zM22 16h8v20h-8zM32 20h8v16h-8z" fill="#fff"/>
    </svg>
  ),
  asana: (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <circle cx="24" cy="34" r="8" fill="#F06A6A"/>
      <circle cx="10" cy="18" r="8" fill="#F06A6A"/>
      <circle cx="38" cy="18" r="8" fill="#F06A6A"/>
    </svg>
  ),
  monday: (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <circle cx="10" cy="34" r="6" fill="#FF3D57"/>
      <circle cx="24" cy="24" r="6" fill="#FFCB00"/>
      <circle cx="38" cy="14" r="6" fill="#00D647"/>
      <rect x="8" y="12" width="4" height="22" rx="2" fill="#FF3D57"/>
      <rect x="22" y="12" width="4" height="12" rx="2" fill="#FFCB00"/>
      <rect x="36" y="12" width="4" height="2" rx="1" fill="#00D647"/>
    </svg>
  ),
  jira: (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <path d="M43.5 23.2L25.3 5 24 3.7 8.5 19.2l-.2.2L5 22.7c-.7.7-.7 1.8 0 2.5l13.8 13.8 5.2 5.2c.7.7 1.8.7 2.5 0l5.2-5.2L45.5 25.2c.7-.7.7-1.8 0-2.5l-2-2zM24 30.5L17.5 24 24 17.5l6.5 6.5-6.5 6.5z" fill="#2684FF"/>
    </svg>
  ),
  trello: (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <rect width="48" height="48" rx="8" fill="#0079BF"/>
      <rect x="8" y="8" width="14" height="32" rx="2" fill="#fff"/>
      <rect x="26" y="8" width="14" height="20" rx="2" fill="#fff"/>
    </svg>
  ),
  clickup: (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <path d="M8 30l16-12 16 12" stroke="#7B68EE" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <path d="M8 38l16-12 16 12" stroke="#FF6AC2" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  ),
  wrike: (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <rect width="48" height="48" rx="8" fill="#08CF65"/>
      <path d="M12 24l8 8 16-16" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  googledrive: (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <path d="M15.5 8h17L44 30H27.5L15.5 8z" fill="#FBBC04"/>
      <path d="M4 30l6.25-11L27.5 30H4z" fill="#34A853"/>
      <path d="M15.5 8L4 30l6.25 11h23L44 30 32.5 8h-17z" fill="none"/>
      <path d="M10.25 41L4 30h23.5l6.25 11H10.25z" fill="#4285F4"/>
      <path d="M32.5 8L15.5 8l6.25 11h17L32.5 8z" fill="#EA4335"/>
    </svg>
  ),
  miro: (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <rect width="48" height="48" rx="8" fill="#FFD02F"/>
      <path d="M14 36V12l6 8 6-8 6 8 6-8v24l-6-8-6 8-6-8-6 8z" fill="#050038"/>
    </svg>
  ),
  calendly: (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <rect width="48" height="48" rx="10" fill="#006BFF"/>
      <rect x="10" y="14" width="28" height="24" rx="4" fill="#fff"/>
      <rect x="10" y="10" width="28" height="8" rx="2" fill="#fff"/>
      <circle cx="18" cy="26" r="3" fill="#006BFF"/>
      <circle cx="30" cy="26" r="3" fill="#006BFF"/>
      <circle cx="18" cy="32" r="3" fill="#006BFF"/>
    </svg>
  ),
  clockify: (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <circle cx="24" cy="24" r="20" fill="#03A9F4"/>
      <circle cx="24" cy="24" r="14" fill="#fff"/>
      <path d="M24 14v10l7 7" stroke="#03A9F4" strokeWidth="3" strokeLinecap="round"/>
    </svg>
  ),
  chatgpt: (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <rect width="48" height="48" rx="10" fill="#10A37F"/>
      <path d="M24 8c-8.8 0-16 7.2-16 16 0 3.5 1.1 6.7 3 9.3L9 40l7-2c2.4 1.3 5.2 2 8 2 8.8 0 16-7.2 16-16S32.8 8 24 8z" fill="#fff"/>
      <circle cx="18" cy="22" r="2" fill="#10A37F"/>
      <circle cx="30" cy="22" r="2" fill="#10A37F"/>
      <path d="M18 28c1 2 3.5 4 6 4s5-2 6-4" stroke="#10A37F" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
}

const ICON_MAP: Record<string, React.ElementType> = {
  FunnelSimple,
  ListChecks,
  ChatsCircle,
  HardDrives,
  CalendarBlank,
  Clock,
  Robot,
  Brain,
}

const BITRIX24_FEATURES = [
  { id: 'crm', name: 'CRM completo', icon: 'FunnelSimple' },
  { id: 'projects', name: 'Tarefas e projetos', icon: 'ListChecks' },
  { id: 'chat', name: 'Chat e videochamadas', icon: 'ChatsCircle' },
  { id: 'drive', name: 'Drive ilimitado', icon: 'HardDrives' },
  { id: 'calendar', name: 'Calendário integrado', icon: 'CalendarBlank' },
  { id: 'time', name: 'Controle de tempo', icon: 'Clock' },
  { id: 'automation', name: 'Automações', icon: 'Robot' },
  { id: 'ai', name: 'CoPilot IA incluso', icon: 'Brain' },
]

// Default selected apps (populares)
const DEFAULT_SELECTED = ['asana', 'googledrive', 'salesforce', 'chatgpt', 'clockify', 'miro']

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

// Animated number component
function AnimatedValue({ value, className }: { value: number; className?: string }) {
  return (
    <motion.span
      key={value}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {formatCurrency(value)}
    </motion.span>
  )
}

// App card component with logo
function AppCard({
  app,
  isSelected,
  onToggle,
}: {
  app: AppData
  isSelected: boolean
  onToggle: () => void
}) {
  const Logo = AppLogos[app.id]

  return (
    <motion.button
      onClick={onToggle}
      className={cn(
        'group relative flex flex-col items-center gap-1.5 p-2.5 sm:p-3 rounded-xl',
        'border-2 transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-brand/50 focus:ring-offset-2',
        isSelected
          ? 'bg-linear-to-b from-brand/10 to-brand/5 border-brand shadow-lg shadow-brand/10'
          : 'bg-white border-gray-200 hover:border-brand/30 hover:shadow-md'
      )}
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
      layout
    >
      {/* Selection indicator */}
      <AnimatePresence>
        {isSelected && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-brand rounded-full flex items-center justify-center shadow-lg ring-2 ring-white"
          >
            <Check weight="bold" className="w-3 h-3 text-white" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* App logo */}
      <div
        className={cn(
          'w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center p-1.5',
          'transition-all duration-200 overflow-hidden',
          isSelected
            ? 'bg-white shadow-sm'
            : 'bg-gray-50 group-hover:bg-white group-hover:shadow-sm'
        )}
      >
        {Logo || (
          <span className="text-xs font-bold text-gray-400">
            {app.name.substring(0, 2).toUpperCase()}
          </span>
        )}
      </div>

      {/* App name */}
      <span
        className={cn(
          'text-[10px] sm:text-xs font-medium text-center leading-tight line-clamp-1',
          isSelected ? 'text-gray-900' : 'text-gray-600'
        )}
      >
        {app.name}
      </span>

      {/* Price tag */}
      <span
        className={cn(
          'text-[9px] sm:text-[10px] font-semibold px-1.5 py-0.5 rounded-full',
          isSelected
            ? 'bg-brand text-white'
            : 'bg-gray-100 text-gray-500 group-hover:bg-brand/10 group-hover:text-brand'
        )}
      >
        R$ {app.pricePerUser}
      </span>
    </motion.button>
  )
}

// User slider component
function UserSlider({
  value,
  onChange,
  min = 5,
  max = 250,
}: {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
}) {
  const percentage = ((value - min) / (max - min)) * 100

  return (
    <div className="relative pt-2 pb-8">
      {/* Track background */}
      <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
        <motion.div
          className="absolute inset-y-0 left-0 bg-linear-to-r from-brand via-brand to-emerald-500 rounded-full"
          style={{ width: `${percentage}%` }}
          layout
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      </div>

      {/* Input */}
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="absolute inset-0 w-full h-3 opacity-0 cursor-pointer z-10"
      />

      {/* Thumb with value */}
      <motion.div
        className="absolute top-0 -translate-y-1/2 -translate-x-1/2 pointer-events-none"
        style={{ left: `${percentage}%`, top: '6px' }}
        layout
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div className="relative">
          <div className="w-7 h-7 bg-white border-4 border-brand rounded-full shadow-lg" />
          <motion.div
            key={value}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute -bottom-9 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-gray-900 text-white text-xs font-bold rounded-lg whitespace-nowrap shadow-lg"
          >
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
            {value}
          </motion.div>
        </div>
      </motion.div>

      {/* Labels */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-400 font-medium">
        <span>{min}</span>
        <span className="text-gray-300">|</span>
        <span>{Math.round((max - min) / 2 + min)}</span>
        <span className="text-gray-300">|</span>
        <span>{max}</span>
      </div>
    </div>
  )
}

// Bitrix24 Logo
function Bitrix24Logo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 152 30" fill="none">
      <path d="M0.507812 1.7229H8.38011C14.1311 1.7229 16.7412 5.11006 16.7412 8.70628C16.7412 11.0901 15.5996 13.3069 13.4825 14.3932V14.4773C16.6235 15.2715 18.5408 17.9065 18.5408 21.1266C18.5408 25.391 15.3589 29.2803 9.11804 29.2803H0.507812V1.7229ZM7.72733 13.2228C10.4604 13.2228 11.8879 11.6753 11.8879 9.54256C11.8879 7.49497 10.6265 5.86336 7.68318 5.86336H5.40211V13.2228H7.72733ZM8.54304 25.1409C11.8017 25.1409 13.5603 23.9275 13.5603 21.1266C13.5603 18.7837 11.8059 17.3622 9.07389 17.3622H5.40211V25.1409H8.54304Z" fill="#2FC7F7"/>
      <path d="M22.248 3.31148C22.248 1.63999 23.5095 0.301514 25.226 0.301514C26.9426 0.301514 28.244 1.59473 28.244 3.31148C28.244 4.94309 26.9384 6.28049 25.226 6.28049C23.5137 6.28049 22.248 4.98512 22.248 3.31148ZM22.7789 9.50061H27.6732V29.2804H22.7789V9.50061Z" fill="#2FC7F7"/>
      <path d="M34.1994 24.3879V13.3955H30.7305V9.50078H34.1994V4.90124L39.0537 3.43774V9.50078H44.8857L43.7031 13.3901H39.0537V23.1755C39.0537 25.0151 39.6655 25.6843 40.9301 25.6843C42.0717 25.6843 43.1323 25.2242 43.866 24.722L45.3377 28.1512C43.9512 29.1135 41.626 29.6987 39.7097 29.6987C36.2797 29.6987 34.1994 27.691 34.1994 24.3879Z" fill="#2FC7F7"/>
      <path d="M48.0674 9.50039H52.187L52.7178 11.7172C54.4712 9.91853 56.0616 8.99927 58.02 8.99927C58.9177 8.99927 59.9773 9.24929 60.753 9.79352L59.0396 14.017C58.3806 13.5837 57.615 13.3516 56.8321 13.3477C55.5707 13.3477 54.508 13.8866 52.9165 15.3134V29.2802H48.0674V9.50039Z" fill="#2FC7F7"/>
      <path d="M62.5479 3.31148C62.5479 1.63999 63.8093 0.301514 65.5258 0.301514C67.2424 0.301514 68.5438 1.59473 68.5438 3.31148C68.5438 4.94309 67.2393 6.28049 65.5258 6.28049C63.8124 6.28049 62.5479 4.98512 62.5479 3.31148ZM63.0734 9.50061H67.973V29.2804H63.0787L63.0734 9.50061Z" fill="#2FC7F7"/>
      <path d="M77.8835 19.3281L70.9089 9.50073H76.0071L80.5346 15.941L85.103 9.50073H90.1613L83.1047 19.3281L90.2422 29.2805H85.144L80.4936 22.6732L75.7633 29.2805H70.665L77.8835 19.3281Z" fill="#2FC7F7"/>
      <path d="M93.6191 29.2631H109.964V25.5397H99.1746C100.634 19.4433 109.751 18.1285 109.751 11.3014C109.751 7.65022 107.294 4.98511 102.237 4.98511C99.0317 4.98511 96.3249 5.97119 94.4023 6.92494L95.5417 10.3196C97.251 9.48012 99.2104 8.67725 101.595 8.67725C103.488 8.67725 105.228 9.51676 105.228 11.7443C105.228 16.8191 94.581 17.1834 93.6191 29.2674V29.2631Z" fill="#0066A1"/>
      <path d="M125.133 19.8075V5.02173H122.071L110.461 20.4649V23.3854H120.931V29.2631H125.135V23.3854H128.625V19.8075H125.133ZM120.929 16.3762V19.8075H118.15C117.296 19.8075 115.733 19.8808 115.195 19.8808L121.142 11.6667C121.109 12.3597 120.932 14.4417 120.932 16.3762H120.929Z" fill="#0066A1"/>
      <path d="M142.548 24.1656C140.755 24.1656 139.003 23.6206 137.512 22.5996C136.022 21.5786 134.86 20.1275 134.174 18.4296C133.488 16.7318 133.309 14.8635 133.659 13.0611C134.008 11.2586 134.871 9.60301 136.139 8.30353C137.406 7.00406 139.021 6.1191 140.78 5.76057C142.538 5.40205 144.36 5.58606 146.016 6.28933C147.672 6.9926 149.088 8.18355 150.084 9.71158C151.079 11.2396 151.611 13.0361 151.611 14.8738C151.608 17.3373 150.652 19.699 148.953 21.4409C147.254 23.1829 144.951 24.1627 142.548 24.1656ZM142.548 7.26753C141.08 7.26732 139.645 7.71333 138.425 8.54915C137.204 9.38498 136.253 10.5731 135.691 11.9632C135.13 13.3533 134.983 14.883 135.269 16.3587C135.555 17.8345 136.262 19.1901 137.3 20.2541C138.337 21.3181 139.66 22.0426 141.099 22.3361C142.539 22.6296 144.031 22.4789 145.387 21.903C146.743 21.3271 147.902 20.3518 148.717 19.1006C149.532 17.8495 149.967 16.3785 149.967 14.8738C149.965 12.8572 149.182 10.9238 147.791 9.49788C146.401 8.07192 144.515 7.26981 142.548 7.26753Z" fill="#0066A1"/>
      <path d="M147.709 14.8663H143.18V10.2236H141.962V16.1153H147.709V14.8663Z" fill="#0066A1"/>
    </svg>
  )
}

export function PriceCalculator() {
  const [selectedApps, setSelectedApps] = useState<Set<string>>(
    new Set(DEFAULT_SELECTED)
  )
  const [userCount, setUserCount] = useState(50)

  const toggleApp = useCallback((appId: string) => {
    setSelectedApps((prev) => {
      const next = new Set(prev)
      if (next.has(appId)) {
        next.delete(appId)
      } else {
        next.add(appId)
      }
      return next
    })
  }, [])

  // Calculate totals
  const calculations = useMemo(() => {
    const selectedAppsList = CALCULATOR_APPS.filter((app) =>
      selectedApps.has(app.id)
    )
    const monthlyAppsTotal = selectedAppsList.reduce(
      (sum, app) => sum + app.pricePerUser * userCount,
      0
    )
    const bitrix24 = getBitrix24Price(userCount)
    const monthlySavings = monthlyAppsTotal - bitrix24.price
    const yearlySavings = monthlySavings * 12
    const savingsPercentage =
      monthlyAppsTotal > 0
        ? Math.round((monthlySavings / monthlyAppsTotal) * 100)
        : 0
    const savingsMultiplier =
      bitrix24.price > 0 ? Math.round(monthlyAppsTotal / bitrix24.price) : 0

    return {
      selectedAppsList,
      monthlyAppsTotal,
      bitrix24Price: bitrix24.price,
      bitrix24Plan: bitrix24.plan,
      monthlySavings,
      yearlySavings,
      savingsPercentage,
      savingsMultiplier,
    }
  }, [selectedApps, userCount])

  const hasSelection = selectedApps.size > 0

  return (
    <div className="relative">
      {/* Background decoration */}
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-brand/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative grid lg:grid-cols-5 gap-6 lg:gap-8">
        {/* Left side - App selection (3 cols) */}
        <div className="lg:col-span-3 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                Quais ferramentas você usa hoje?
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Selecione para calcular sua economia
              </p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-brand/10 rounded-full">
              <span className="text-sm font-bold text-brand">{selectedApps.size}</span>
              <span className="text-xs text-gray-500">selecionadas</span>
            </div>
          </div>

          {/* Apps grid */}
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2 sm:gap-3">
            {CALCULATOR_APPS.map((app) => (
              <AppCard
                key={app.id}
                app={app}
                isSelected={selectedApps.has(app.id)}
                onToggle={() => toggleApp(app.id)}
              />
            ))}
          </div>

          {/* User count slider */}
          <div className="bg-linear-to-br from-gray-50 to-white rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center">
                  <Users weight="duotone" className="w-5 h-5 text-brand" />
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-700">
                    Tamanho da equipe
                  </span>
                  <p className="text-xs text-gray-400">Quantos usuários você tem?</p>
                </div>
              </div>
              <div className="text-right">
                <motion.span
                  key={userCount}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-3xl font-bold text-gray-900"
                >
                  {userCount}
                </motion.span>
                <span className="text-sm font-normal text-gray-500 ml-1">usuários</span>
              </div>
            </div>
            <UserSlider
              value={userCount}
              onChange={setUserCount}
              min={5}
              max={250}
            />
          </div>
        </div>

        {/* Right side - Comparison (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          {/* Current cost */}
          <motion.div
            className="relative overflow-hidden rounded-2xl p-5 bg-linear-to-br from-red-50 to-orange-50 border border-red-100"
            layout
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-red-100/50 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />

            <div className="relative">
              <div className="flex items-center gap-2 mb-3">
                <CurrencyCircleDollar weight="duotone" className="w-5 h-5 text-red-500" />
                <span className="text-sm font-medium text-red-700">Custo atual</span>
              </div>

              <p className="text-xs text-gray-500 mb-1">
                {selectedApps.size} ferramentas × {userCount} usuários
              </p>
              <div className="text-3xl sm:text-4xl font-bold text-gray-900">
                <AnimatedValue value={calculations.monthlyAppsTotal} />
                <span className="text-base font-normal text-gray-400">/mês</span>
              </div>

              {/* Selected apps icons */}
              {hasSelection && (
                <div className="flex items-center gap-1 mt-3 flex-wrap">
                  {calculations.selectedAppsList.slice(0, 5).map((app) => (
                    <div
                      key={app.id}
                      className="w-6 h-6 rounded-md bg-white border border-gray-200 flex items-center justify-center overflow-hidden p-0.5"
                    >
                      {AppLogos[app.id] || (
                        <span className="text-[8px] font-bold text-gray-400">
                          {app.name.substring(0, 2)}
                        </span>
                      )}
                    </div>
                  ))}
                  {calculations.selectedAppsList.length > 5 && (
                    <div className="w-6 h-6 rounded-md bg-gray-100 flex items-center justify-center">
                      <span className="text-[9px] font-bold text-gray-500">
                        +{calculations.selectedAppsList.length - 5}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>

          {/* VS divider */}
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-linear-to-r from-transparent via-gray-200 to-transparent" />
            <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full">
              <TrendDown weight="bold" className="w-4 h-4 text-green-500" />
              <span className="text-xs font-bold text-gray-500">VS</span>
            </div>
            <div className="h-px flex-1 bg-linear-to-r from-transparent via-gray-200 to-transparent" />
          </div>

          {/* Bitrix24 cost */}
          <motion.div
            className="relative overflow-hidden rounded-2xl p-5 bg-linear-to-br from-brand/10 via-brand/5 to-emerald-50 border-2 border-brand/20"
            layout
          >
            {/* Badge */}
            <div className="absolute top-3 right-3 px-2 py-0.5 bg-brand rounded-full">
              <span className="text-[10px] font-bold text-white uppercase tracking-wide">
                Recomendado
              </span>
            </div>

            <div className="relative">
              {/* Bitrix24 logo */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center p-2">
                  <Bitrix24Logo className="w-full h-full" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Bitrix24</p>
                  <p className="text-xs text-brand font-medium">{calculations.bitrix24Plan}</p>
                </div>
              </div>

              <p className="text-xs text-gray-500 mb-1">Tudo incluso, preço fixo</p>
              <div className="text-3xl sm:text-4xl font-bold text-brand">
                <AnimatedValue value={calculations.bitrix24Price} />
                <span className="text-base font-normal text-gray-400">/mês</span>
              </div>

              <p className="text-xs text-emerald-600 font-medium mt-2 flex items-center gap-1">
                <Check weight="bold" className="w-3.5 h-3.5" />
                Usuários ilimitados inclusos
              </p>

              {/* Features grid */}
              <div className="mt-4 pt-4 border-t border-brand/10">
                <div className="grid grid-cols-2 gap-1.5">
                  {BITRIX24_FEATURES.map((feature) => {
                    const Icon = ICON_MAP[feature.icon] || Check
                    return (
                      <div
                        key={feature.id}
                        className="flex items-center gap-1.5 text-[11px] text-gray-600"
                      >
                        <Icon weight="duotone" className="w-3.5 h-3.5 text-brand shrink-0" />
                        <span className="truncate">{feature.name}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Savings highlight */}
          <AnimatePresence mode="wait">
            {hasSelection && calculations.monthlySavings > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative overflow-hidden rounded-2xl p-5 bg-linear-to-br from-emerald-500 via-green-500 to-teal-600 text-white shadow-xl shadow-green-500/20"
              >
                {/* Decorative elements */}
                <Sparkle weight="fill" className="absolute top-3 right-3 w-8 h-8 text-white/10" />
                <Sparkle weight="fill" className="absolute bottom-4 right-16 w-5 h-5 text-white/10" />
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/5 rounded-full blur-2xl" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <TrendDown weight="bold" className="w-5 h-5" />
                      <span className="text-sm font-medium text-white/90">
                        Economia anual
                      </span>
                    </div>
                    {calculations.savingsMultiplier > 1 && (
                      <div className="px-2 py-0.5 bg-white/20 rounded-full">
                        <span className="text-xs font-bold">
                          {calculations.savingsMultiplier}x mais barato
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="text-4xl sm:text-5xl font-bold mb-1">
                    <AnimatedValue value={calculations.yearlySavings} />
                  </div>

                  <p className="text-sm text-white/80">
                    {calculations.savingsPercentage}% de economia • {formatCurrency(calculations.monthlySavings)}/mês
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* CTA */}
          <a
            href={ZOPU_LINKS.whatsappEspecialista}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-2 w-full px-6 py-4 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Agendar diagnóstico gratuito
            <CaretRight weight="bold" className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>

          {/* Disclaimer */}
          <p className="flex items-start gap-2 text-[10px] text-gray-400 leading-relaxed">
            <Info weight="fill" className="w-3.5 h-3.5 shrink-0 mt-0.5" />
            <span>
              Preços baseados nos planos empresariais públicos (Dez/2025).
              Bitrix24 em reais, demais aproximados.
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}
