'use client'

import { Tabs, TabsList, TabTrigger, MobileTabsList, MobileTabTrigger } from '@/components/shared/Tabs'

type Topic = {
  slug: string
  title: string
  count?: number
}

type Props = {
  topics: Topic[]
  activeTopic: string | null
  onTopicChange: (slug: string | null) => void
  totalCount?: number
}

export function TopicNav({ topics, activeTopic, onTopicChange, totalCount }: Props) {
  if (topics.length === 0) return null

  // Valor para o Tabs - 'all' representa todos
  const activeValue = activeTopic || 'all'
  const tabValues = ['all', ...topics.map((t) => t.slug)]

  const handleValueChange = (value: string) => {
    onTopicChange(value === 'all' ? null : value)
  }

  return (
    <Tabs value={activeValue} defaultValue="all" onValueChange={handleValueChange}>
      {/* Desktop */}
      <TabsList className="hidden sm:flex" variant="pills">
        <TabTrigger value="all" variant="pills">
          Todos
          {totalCount !== undefined && (
            <span className="ml-1.5 text-xs opacity-70">{totalCount}</span>
          )}
        </TabTrigger>
        {topics.map((topic) => (
          <TabTrigger key={topic.slug} value={topic.slug} variant="pills">
            {topic.title}
            {topic.count !== undefined && topic.count > 0 && (
              <span className="ml-1.5 text-xs opacity-70">{topic.count}</span>
            )}
          </TabTrigger>
        ))}
      </TabsList>

      {/* Mobile */}
      <MobileTabsList showDots tabValues={tabValues}>
        <MobileTabTrigger value="all">
          Todos {totalCount !== undefined && `(${totalCount})`}
        </MobileTabTrigger>
        {topics.map((topic) => (
          <MobileTabTrigger key={topic.slug} value={topic.slug}>
            {topic.title} {topic.count !== undefined && topic.count > 0 && `(${topic.count})`}
          </MobileTabTrigger>
        ))}
      </MobileTabsList>
    </Tabs>
  )
}
