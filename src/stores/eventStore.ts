import type { Event } from '@/app/model/event.model'
import type { EventFormData } from '@/app/schema/event.schema';
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface EventState {
  currentEvent: EventFormData | null;
  isLoading: boolean;
  error: string | null;
  events: Event[]
  selectedEvent: Event | null
  filteredEvents: Event[]
  currentFilter: 'all' | 'music' | 'tech' | 'sports'
  searchQuery: string
  setEvents: (events: Event[]) => void
  createEvent: (eventData: EventFormData) => Promise<void>;
  updateEvent: (eventId: string, eventData: EventFormData) => Promise<void>;
  clearError: () => void;
  resetCurrentEvent: () => void;
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
      currentEvent: null,
      isLoading: false,
      error: null,

      setEvents: (events) => set({ events }),

      createEvent: async (eventData: EventFormData) => {
        set({ isLoading: true, error: null });

        try {
          const formData = new FormData();
          
          // Ajouter les champs de base
          formData.append('event', JSON.stringify(eventData));
          
          // Ajouter l'image si elle existe
          if (eventData.images) {
            eventData.images.forEach(image => {
              formData.append('images', image);
            });
          }
          
          
          const token = JSON.parse(localStorage.getItem('user') || '');
          
          const response = await fetch('/events', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token?.access_token || ''}`,
              'Content-Type': 'multipart/form-data'
            },
            body: formData,
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erreur lors de la création de l\'événement');
          }

          const result = await response.json();
          
          set({
            isLoading: false,
            currentEvent: result.event,
            error: null,
          });

          return result;
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Une erreur est survenue',
          });
          throw error;
        }
      },

      updateEvent: async (eventId: string, eventData: EventFormData) => {
        set({ isLoading: true, error: null });

        try {
          const formData = new FormData();
          // Ajouter les champs de base
          formData.append('event', JSON.stringify(eventData));
          
          // Ajouter l'image si elle existe
          if (eventData.images) {
            eventData.images.forEach(image => {
              formData.append('images', image);
            });
          }
          
          const token = JSON.parse(localStorage.getItem('user') || '');
          
          const response = await fetch(`/api/events/${eventId}`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token?.access_token || ''}`,
              'Content-Type': 'multipart/form-data'
            },
            body: formData,
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erreur lors de la mise à jour de l\'événement');
          }

          const result = await response.json();
          
          set({
            isLoading: false,
            currentEvent: result.event,
            error: null,
          });

          return result;
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Une erreur est survenue',
          });
          throw error;
        }
      },

      clearError: () => set({ error: null }),
      resetCurrentEvent: () => set({ currentEvent: null }),

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
            event.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.location?.toLowerCase().includes(searchQuery.toLowerCase())
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
