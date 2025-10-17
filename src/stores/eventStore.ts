import type { EventDto, EventType, TicketPrice } from '@/app/model/event.model';
import type { EventFormData } from '@/app/schema/event.schema';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface EventState {
  currentEvent: EventFormData | null;
  isLoading: boolean;
  error: string | null;
  events: EventDto[]
  selectedEvent: EventDto | null
  filteredEvents: EventDto[]
  currentFilter: EventType
  searchQuery: string
  subEvents: string[] 
  ticketPrices: TicketPrice[]
  setEvents: (events: EventDto[]) => void
  createEvent: (eventData: EventFormData) => Promise<void>;
  updateEvent: (eventId: string, eventData: EventFormData) => Promise<void>;
  clearError: () => void;
  resetCurrentEvent: () => void;
  setSelectedEvent: (event: EventDto | null) => void
  setFilter: (filter: EventType) => void
  setSearchQuery: (query: string) => void
  getFilteredEvents: () => EventDto[]
  /// Sub Events
  setSubEvents: (subEvents: string[]) => void
  addSubEvent: (subEvent: string) => void
  removeSubEvent: (subEventId: number) => void
  updateSubEvent: (subEventId: number, updatedData: string) => void
  clearSubEvents: () => void

  /// Sub Events
  setTicketPrices: (subEvents: TicketPrice[]) => void
  addTicketPrices: (subEvent: TicketPrice) => void
  removeTicketPrices: (subEventId: number) => void
  updateTicketPrices: (subEventId: number, updatedData: TicketPrice) => void
  clearTicketPrices: () => void
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
      subEvents: [],
      ticketPrices: [],

      setEvents: (events) => set({ events }),

      createEvent: async (eventData: EventFormData) => {
        set({ isLoading: true, error: null });

        try {
          const token = JSON.parse(localStorage.getItem('user') || '');
          console.log('Token, ', token);

          const formData = new FormData();

           // Ajouter les champs de base
          const eventWithSubEvents = {
            ...eventData,
            sub_events: get().subEvents,
            ticket_prices: get().ticketPrices
          };
          eventWithSubEvents['organizer_id'] = token['organizer_id'];

          console.log('Event: ', eventWithSubEvents);
          
          // Ajouter les champs de base
          formData.append('event', JSON.stringify(eventWithSubEvents));
          
          // Ajouter l'image si elle existe
          if (eventData.images) {
            eventData.images.forEach(image => {
              formData.append('images', image);
              console.log('Images: ', image);
            });
          }
          
          

          const response = await fetch(`${process.env.VITE_EVENTLY_URL}/events`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token?.access_token || ''}`
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
          const token = JSON.parse(localStorage.getItem('user') || '');

          const formData = new FormData();

          // Ajouter les champs de base avec les sub_events
          const eventWithSubEvents = {
            ...eventData,
            sub_events: get().subEvents
          };

          eventWithSubEvents['organizer_id'] = token['organizer_id'];

          // Ajouter les champs de base
          formData.append('event', JSON.stringify(eventWithSubEvents));
          
          // Ajouter l'image si elle existe
          if (eventData.images) {
            eventData.images.forEach(image => {
              formData.append('images', image);
              console
            });
          }
          
          
          const response = await fetch(`/api/events/${eventId}`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token?.access_token || ''}`
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
        if (currentFilter !== 'OTHER') {
          filtered = filtered.filter((event) => event.type === currentFilter)
        }

        // Filter by search query
        if (searchQuery) {
          filtered = filtered.filter((event) =>
            event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.place?.toLowerCase().includes(searchQuery.toLowerCase())
          )
        }

        set({ filteredEvents: filtered })
        return filtered
      },

      // Méthodes pour gérer les sub_events
      setSubEvents: (subEvents) => set({ subEvents }),

      addSubEvent: (subEvent) => 
        set((state) => ({ 
          subEvents: [...state.subEvents, ...subEvent ] 
        })),

      removeSubEvent: (subEventId) =>
        set((state) => ({
          subEvents: state.subEvents.filter((_, index) => index !== subEventId)
        })),

      updateSubEvent: (subEventId, updatedData) =>
        set((state) => ({
          subEvents: state.subEvents.map((subEvent, index) =>
            index === subEventId 
              ? updatedData
              : subEvent
          )
        })),

      clearSubEvents: () => set({ subEvents: [] }),


      // Méthodes pour gérer les ticket_prices
      setTicketPrices: (ticketPrices) => set({ ticketPrices }),

      addTicketPrices: (ticketPrice) => 
        set((state) => ({ 
          ticketPrices: [...state.ticketPrices, ticketPrice ] 
        })),

      removeTicketPrices: (ticketPriceId) =>
        set((state) => ({
          ticketPrices: state.ticketPrices.filter((_, index) => index !== ticketPriceId)
        })),

      updateTicketPrices: (ticketPriceId, updatedData) =>
        set((state) => ({
          ticketPrices: state.ticketPrices.map((ticketPrice, index) =>
            index === ticketPriceId 
              ? updatedData
              : ticketPrice
          )
        })),

      clearTicketPrices: () => set({ ticketPrices: [] }),
    }),
    {
      name: 'event-store',
    }
  )
)
