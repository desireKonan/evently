import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  price: number
  image: string
  category: 'music' | 'tech' | 'sports' | 'all'
  status: 'active' | 'inactive' | 'completed'
  sales: number
  capacity: number
}

interface EventState {
  events: Event[]
  selectedEvent: Event | null
  filteredEvents: Event[]
  currentFilter: 'all' | 'music' | 'tech' | 'sports'
  searchQuery: string
  setEvents: (events: Event[]) => void
  addEvent: (event: Omit<Event, 'id'>) => void
  updateEvent: (id: string, event: Partial<Event>) => void
  deleteEvent: (id: string) => void
  setSelectedEvent: (event: Event | null) => void
  setFilter: (filter: 'all' | 'music' | 'tech' | 'sports') => void
  setSearchQuery: (query: string) => void
  getFilteredEvents: () => Event[]
}

export const useEventStore = create<EventState>()(
  devtools(
    (set, get) => ({
      events: [],
      selectedEvent: null,
      filteredEvents: [],
      currentFilter: 'all',
      searchQuery: '',

      setEvents: (events) => set({ events }),

      addEvent: (event) => {
        const newEvent: Event = {
          ...event,
          id: Date.now().toString(),
        }
        set((state) => ({ events: [...state.events, newEvent] }))
      },

      updateEvent: (id, updatedEvent) => {
        set((state) => ({
          events: state.events.map((event) =>
            event.id === id ? { ...event, ...updatedEvent } : event
          ),
        }))
      },

      deleteEvent: (id) => {
        set((state) => ({
          events: state.events.filter((event) => event.id !== id),
        }))
      },

      setSelectedEvent: (event) => set({ selectedEvent: event }),

      setFilter: (filter) => {
        set({ currentFilter: filter })
        get().getFilteredEvents()
      },

      setSearchQuery: (query) => {
        set({ searchQuery: query })
        get().getFilteredEvents()
      },

      getFilteredEvents: () => {
        const { events, currentFilter, searchQuery } = get()
        let filtered = events

        // Filter by category
        if (currentFilter !== 'all') {
          filtered = filtered.filter((event) => event.category === currentFilter)
        }

        // Filter by search query
        if (searchQuery) {
          filtered = filtered.filter((event) =>
            event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.location.toLowerCase().includes(searchQuery.toLowerCase())
          )
        }

        set({ filteredEvents: filtered })
        return filtered
      },
    }),
    {
      name: 'event-store',
    }
  )
)
