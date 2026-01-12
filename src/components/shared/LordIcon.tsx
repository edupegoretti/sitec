'use client'

import { useRef, useEffect, useState } from 'react'
import { Player } from '@lordicon/react'

// Mapeamento de ícones Lordicon para cada categoria
// Fonte: https://lordicon.com/icons (ícones gratuitos verificados)
export const LORDICON_CODES = {
  // CRM & Vendas - graph/stats
  crm: 'egmlnyku',
  // IA CoPilot - brain/AI
  copilot: 'vixtkkbk',
  // Projetos & Tarefas - project/kanban
  projetos: 'pcllgpqm',
  // Comunicação - chat bubbles
  comunicacao: 'lupuorrc',
  // Marketing - target/goal
  marketing: 'kndkiwmf',
  // RH & Automação - team/users
  rh: 'wzwygmng',
  // Sites & E-commerce - website/browser
  sites: 'qhviklyi',
} as const

export type LordIconCode = keyof typeof LORDICON_CODES

interface LordIconProps {
  icon: LordIconCode | string
  size?: number
  trigger?: 'hover' | 'click' | 'loop' | 'loop-on-hover' | 'morph' | 'boomerang' | 'none'
  colors?: string
  className?: string
  delay?: number
}

export function LordIcon({
  icon,
  size = 96,
  trigger = 'hover',
  colors,
  className,
  delay = 0,
}: LordIconProps) {
  const playerRef = useRef<Player>(null)
  const [iconData, setIconData] = useState<object | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  // Resolve icon code from map or use directly
  const iconCode = icon in LORDICON_CODES
    ? LORDICON_CODES[icon as LordIconCode]
    : icon

  useEffect(() => {
    const fetchIcon = async () => {
      try {
        const response = await fetch(`https://cdn.lordicon.com/${iconCode}.json`)
        if (!response.ok) throw new Error('Failed to fetch icon')
        const data = await response.json()
        setIconData(data)
        setIsLoaded(true)
      } catch (error) {
        console.error('Error loading Lordicon:', error)
      }
    }

    fetchIcon()
  }, [iconCode])

  useEffect(() => {
    if (!isLoaded || !playerRef.current) return

    // Auto-play animation after delay
    const timer = setTimeout(() => {
      playerRef.current?.playFromBeginning()
    }, delay)

    return () => clearTimeout(timer)
  }, [isLoaded, delay])

  // Handle different triggers
  const handleMouseEnter = () => {
    if (trigger === 'hover' || trigger === 'loop-on-hover') {
      playerRef.current?.playFromBeginning()
    }
  }

  const handleClick = () => {
    if (trigger === 'click') {
      playerRef.current?.playFromBeginning()
    }
  }

  if (!iconData) {
    // Loading placeholder with same dimensions
    return (
      <div
        className={`flex items-center justify-center ${className || ''}`}
        style={{ width: size, height: size }}
      >
        <div
          className="animate-pulse rounded-xl bg-gray-200"
          style={{ width: size * 0.6, height: size * 0.6 }}
        />
      </div>
    )
  }

  return (
    <div
      className={className}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      style={{ width: size, height: size }}
    >
      <Player
        ref={playerRef}
        icon={iconData}
        size={size}
        colorize={colors}
        onComplete={() => {
          // Loop behavior
          if (trigger === 'loop') {
            playerRef.current?.playFromBeginning()
          }
        }}
      />
    </div>
  )
}
