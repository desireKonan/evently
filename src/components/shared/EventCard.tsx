import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { EventDto } from '@/app/model/event.model';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';


interface EventCardProps {
  event: EventDto
  onToggleFavorite: (eventId: string) => void
}

export function EventCard({ event }: EventCardProps) {
  const navigate = useNavigate();
  
  const toBuyTicket = (id: string) => {
    navigate(`/event/${id}/details`);
  }

  return (
    <Card className="group relative overflow-hidden transition-all hover:shadow-2xl hover:-translate-y-1">
      <div className="aspect-video overflow-hidden">
        <div 
          className="h-full w-full bg-cover bg-center transition-transform duration-300 group-hover:scale-105" 
          style={{ backgroundImage: `url(${event.image_path})` }}
        ></div>
      </div>
      <CardHeader className="p-4">
        <h3 className="text-lg font-semibold">{event.name}</h3>
        <p className="text-sm text-muted-foreground">{event.place} | { format(event.start_date, "dd-MM-yyyy")  }</p>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-muted-foreground">{event.description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button onClick={() => toBuyTicket(event.id)} className="w-full rounded-full bg-event-secondary hover:bg-event-secondary/80">
          Acheter des billets
        </Button>
      </CardFooter>
    </Card>
  );
}
