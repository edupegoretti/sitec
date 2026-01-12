'use client'

import { useMemo } from 'react'
import {
  Tabs,
  TabsList,
  TabTrigger,
  MobileTabsList,
  MobileTabTrigger,
} from '@/components/shared/Tabs'

interface Feature {
  id: string
  nome: string
  badge?: string
}

interface FeatureTabsProps {
  features: readonly Feature[]
  activeIndex: number
  onSelect: (index: number) => void
}

export function FeatureTabs({ features, activeIndex, onSelect }: FeatureTabsProps) {
  // Convert index-based to value-based
  const activeValue = features[activeIndex]?.id ?? features[0].id
  const tabValues = useMemo(() => features.map((f) => f.id), [features])

  const handleValueChange = (value: string) => {
    const index = features.findIndex((f) => f.id === value)
    if (index !== -1) {
      onSelect(index)
    }
  }

  return (
    <Tabs value={activeValue} defaultValue={activeValue} onValueChange={handleValueChange}>
      {/* Desktop: Tabs horizontais */}
      <TabsList className="hidden sm:flex" variant="pills">
        {features.map((feature) => (
          <TabTrigger
            key={feature.id}
            value={feature.id}
            variant="pills"
            badge={feature.badge}
          >
            {feature.nome}
          </TabTrigger>
        ))}
      </TabsList>

      {/* Mobile: Scroll horizontal com indicador */}
      <MobileTabsList showDots tabValues={tabValues}>
        {features.map((feature) => (
          <MobileTabTrigger
            key={feature.id}
            value={feature.id}
            badge={feature.badge}
          >
            {feature.nome}
          </MobileTabTrigger>
        ))}
      </MobileTabsList>
    </Tabs>
  )
}
