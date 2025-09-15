import { useEffect } from 'react'
import { Header } from '@/components/Header'
import { EventCard } from '@/components/EventCard'
import { EventFilter } from '@/components/EventFilter'
import { useEventStore } from '@/stores/eventStore'
import type { Event } from '@/stores/eventStore'

// Mock data
const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Tech Conference 2024',
    description: 'Plongez dans les dernières innovations tech.',
    date: '2024-07-15',
    time: '09:00',
    location: 'San Francisco, CA',
    price: 150,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop',
    category: 'tech',
    status: 'active',
    sales: 150,
    capacity: 200,
  },
  {
    id: '2',
    title: 'Summer Music Festival',
    description: 'Vibrez au son de vos artistes préférés.',
    date: '2024-08-05',
    time: '18:00',
    location: 'Los Angeles, CA',
    price: 75,
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=600&fit=crop',
    category: 'music',
    status: 'active',
    sales: 500,
    capacity: 1000,
  },
  {
    id: '3',
    title: 'Sports Expo',
    description: 'Rencontrez des légendes du sport et découvrez les nouveautés.',
    date: '2024-09-20',
    time: '10:00',
    location: 'New York, NY',
    price: 45,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
    category: 'sports',
    status: 'active',
    sales: 200,
    capacity: 300,
  },
  {
    id: '4',
    title: 'Festival des Arts Culinaires',
    description: 'Une célébration de la gastronomie mondiale.',
    date: '2024-10-12',
    time: '11:00',
    location: 'Paris, FR',
    price: 60,
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop',
    category: 'music',
    status: 'active',
    sales: 120,
    capacity: 150,
  },
]

export function  LandingPage() {
  const { events, filteredEvents, setEvents, setSelectedEvent, getFilteredEvents } = useEventStore()

  useEffect(() => {
    // Initialize with mock data
    setEvents(mockEvents)
    getFilteredEvents()
  }, [setEvents, getFilteredEvents])

  const handleViewDetails = (event: Event) => {
    setSelectedEvent(event)
    // Navigate to event detail page
    window.location.href = `/event/${event.id}`
  }

  return (
    <div className="relative flex size-full min-h-screen flex-col overflow-x-hidden">
      <Header />
      <main className="container mx-auto flex-1 px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col gap-8">
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
              Événements à venir
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Découvrez les meilleurs événements près de chez vous et dans le monde entier.
            </p>
          </div>
          
          <EventFilter />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
          
          <nav className="flex items-center justify-center space-x-2 pt-8">
            <button className="inline-flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-white transition-colors">
              <span className="sr-only">Previous</span>
              <svg aria-hidden="true" className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path clipRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" fillRule="evenodd"></path>
              </svg>
            </button>
            <button className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
              1
            </button>
            <button className="inline-flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-white transition-colors text-sm font-medium">
              2
            </button>
            <button className="inline-flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-white transition-colors text-sm font-medium">
              3
            </button>
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground">...</span>
            <button className="inline-flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-white transition-colors text-sm font-medium">
              8
            </button>
            <button className="inline-flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-white transition-colors">
              <span className="sr-only">Next</span>
              <svg aria-hidden="true" className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path clipRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" fillRule="evenodd"></path>
              </svg>
            </button>
          </nav>
        </div>
      </main>
      <footer className="bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-sm text-muted-foreground">
          <p>© 2024 Evently. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  )
}
