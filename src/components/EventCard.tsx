import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { Event } from '@/stores/eventStore'

interface EventCardProps {
  event: Event
  onViewDetails: (event: Event) => void
}

export function EventCard({ event, onViewDetails }: EventCardProps) {
  return (
    <Card className="group flex flex-col overflow-hidden bg-card shadow-lg transition-all hover:shadow-2xl hover:-translate-y-1">
      <div className="aspect-video overflow-hidden">
        <div 
          className="h-full w-full bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
          style={{ backgroundImage: `url(${event.image})` }}
        />
      </div>
      <CardContent className="flex flex-1 flex-col p-4">
        <h3 className="text-lg font-semibold text-white">{event.title}</h3>
        <p className="text-sm text-muted-foreground">
          {event.location} | {new Date(event.date).toLocaleDateString('fr-FR')}
        </p>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
          {event.description}
        </p>
        <Button 
          className="mt-4 w-full"
          onClick={() => onViewDetails(event)}
        >
          Acheter des billets
        </Button>
      </CardContent>
    </Card>
  )
}
