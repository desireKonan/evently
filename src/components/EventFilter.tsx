import { useEventStore } from '@/stores/eventStore'

const categories = [
  { key: 'all', label: 'Tous les événements' },
  { key: 'music', label: 'Musique' },
  { key: 'tech', label: 'Tech' },
  { key: 'sports', label: 'Sports' },
] as const

export function EventFilter() {
  const { currentFilter, setFilter } = useEventStore()

  return (
    <div className="sticky top-16 z-[9] bg-background/80 backdrop-blur-sm -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-4">
      <div className="border-b border-border">
        <nav aria-label="Tabs" className="-mb-px flex space-x-8">
          {categories.map((category) => (
            <button
              key={category.key}
              className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium transition-colors ${
                currentFilter === category.key
                  ? 'active-tab border-b-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:border-muted-foreground hover:text-foreground'
              }`}
              onClick={() => setFilter(category.key)}
            >
              {category.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}
