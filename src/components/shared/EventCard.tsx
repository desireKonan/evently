import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { HeartCrackIcon } from 'lucide-react'
import type { Event } from '@/app/model/event.model'


interface EventCardProps {
  event: Event
  onToggleFavorite: (eventId: string) => void
}

export function EventCard({ event, onToggleFavorite }: EventCardProps) {
  return (
    <Card className="group relative overflow-hidden transition-all hover:shadow-2xl hover:-translate-y-1">
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute top-2 right-2 z-10 rounded-full bg-event-background/50 backdrop-blur-sm text-muted-foreground hover:text-event-accent"
        onClick={() => onToggleFavorite(event.id)}
      >
        <HeartCrackIcon className={`${event.isFavorite ? 'text-event-accent fill-event-accent' : ''}`} />
      </Button>
      <div className="aspect-video overflow-hidden">
        <div 
          className="h-full w-full bg-cover bg-center transition-transform duration-300 group-hover:scale-105" 
          style={{ backgroundImage: `url(${event.image})` }}
        ></div>
      </div>
      <CardHeader className="p-4">
        <h3 className="text-lg font-semibold">{event.title}</h3>
        <p className="text-sm text-muted-foreground">{event.location} | {event.date}</p>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-muted-foreground">{event.description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full rounded-full bg-event-secondary hover:bg-event-secondary/80">
          Acheter des billets
        </Button>
      </CardFooter>
    </Card>
  );
}
