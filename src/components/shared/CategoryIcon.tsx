'use client'

import {
  Funnel,
  Brain,
  Kanban,
  ChatCircleDots,
  Megaphone,
  UsersThree,
  Globe,
  IconProps,
} from '@phosphor-icons/react'
import { ComponentType } from 'react'

type CategoryType = 'crm' | 'copilot' | 'projetos' | 'comunicacao' | 'marketing' | 'rh' | 'sites'

interface CategoryIconProps {
  category: CategoryType
  size?: number
  color?: string
  className?: string
}

const iconMap: Record<CategoryType, ComponentType<IconProps>> = {
  crm: Funnel,
  copilot: Brain,
  projetos: Kanban,
  comunicacao: ChatCircleDots,
  marketing: Megaphone,
  rh: UsersThree,
  sites: Globe,
}

/**
 * Ícones de categoria usando Phosphor Icons
 * - Estilo duotone premium
 * - Clareza imediata
 * - Consistência visual
 */
export function CategoryIcon({
  category,
  size = 32,
  color = '#635BFF',
  className,
}: CategoryIconProps) {
  const Icon = iconMap[category]

  return (
    <Icon
      size={size}
      color={color}
      weight="duotone"
      className={className}
    />
  )
}
