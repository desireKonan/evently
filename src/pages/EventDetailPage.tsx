import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Calendar, Clock, MapPin, Ticket, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useEventStore } from '@/stores/eventStore'

export function EventDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { events, selectedEvent, setSelectedEvent } = useEventStore()
  const [event, setEvent] = useState(selectedEvent)

  useEffect(() => {
    if (id && events.length > 0) {
      const foundEvent = events.find(e => e.id === id)
      if (foundEvent) {
        setEvent(foundEvent)
        setSelectedEvent(foundEvent)
      }
    }
  }, [id, events, setSelectedEvent])

  if (!event) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Événement non trouvé</h1>
          <Button onClick={() => window.history.back()}>
            Retour
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-background">
      <header className="flex items-center justify-between whitespace-nowrap border-b border-border px-10 py-3">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3 text-white">
            <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path clipRule="evenodd" d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z" fill="currentColor" fillRule="evenodd" opacity="0.5"></path>
              <path clipRule="evenodd" d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z" fill="currentColor" fillRule="evenodd"></path>
            </svg>
            <h2 className="text-white text-xl font-bold leading-tight tracking-[-0.015em]">Evently</h2>
          </div>
          <nav className="flex items-center gap-8">
            <a className="text-white/80 hover:text-white transition-colors text-sm font-medium leading-normal" href="/">
              Accueil
            </a>
            <a className="text-white/80 hover:text-white transition-colors text-sm font-medium leading-normal" href="/explore">
              Explorer
            </a>
            <a className="text-white/80 hover:text-white transition-colors text-sm font-medium leading-normal" href="/dashboard">
              Mes événements
            </a>
          </nav>
        </div>
      </header>
      
      <main className="px-10 flex flex-1 justify-center py-8">
        <div className="layout-content-container flex flex-col w-full max-w-5xl">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <a className="hover:text-white transition-colors" href="/">Événements</a>
            <span className="text-base">›</span>
            <span className="text-white font-medium">{event.title}</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-2">
              <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-8 shadow-2xl shadow-black/30">
                <img
                  alt={event.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  src={event.image}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h1 className="text-white text-3xl md:text-4xl font-bold leading-tight">
                    {event.title}
                  </h1>
                </div>
              </div>
              
              <div>
                <h2 className="text-white text-2xl font-bold leading-tight tracking-[-0.015em] mb-4">
                  À propos de l'événement
                </h2>
                <p className="text-white/80 text-base font-normal leading-relaxed">
                  {event.description}
                </p>
              </div>
            </div>
            
            <div className="md:col-span-1">
              <Card className="bg-card sticky top-8">
                <CardContent className="p-6">
                  <h2 className="text-white text-xl font-bold leading-tight tracking-[-0.015em] mb-6">
                    Informations
                  </h2>
                  
                  <div className="space-y-5">
                    <div className="flex items-start gap-4">
                      <Calendar className="text-muted-foreground mt-0.5 h-5 w-5" />
                      <div>
                        <p className="text-muted-foreground text-sm font-medium leading-normal">Date</p>
                        <p className="text-white text-base font-medium leading-normal">
                          {new Date(event.date).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <Clock className="text-muted-foreground mt-0.5 h-5 w-5" />
                      <div>
                        <p className="text-muted-foreground text-sm font-medium leading-normal">Heure</p>
                        <p className="text-white text-base font-medium leading-normal">
                          {event.time}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <MapPin className="text-muted-foreground mt-0.5 h-5 w-5" />
                      <div>
                        <p className="text-muted-foreground text-sm font-medium leading-normal">Lieu</p>
                        <p className="text-white text-base font-medium leading-normal">
                          {event.location}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <Ticket className="text-muted-foreground mt-0.5 h-5 w-5" />
                      <div>
                        <p className="text-muted-foreground text-sm font-medium leading-normal">Prix</p>
                        <p className="text-white text-base font-medium leading-normal">
                          à partir de {event.price} €
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <Button className="w-full flex items-center justify-center gap-2 h-12">
                      <ShoppingCart className="h-5 w-5" />
                      <span className="truncate">Acheter des billets</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
