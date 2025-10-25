import React from 'react';
import { Button } from "@/components/ui/button";
import EventLayout from '@/components/layout/client/EventLayout';
import EventlyIcon from '@/components/shared/EventlyIcons';
import { useEventService } from '@/app/service/event.service';
import { useParams } from 'react-router-dom';
import { dateFormat, timeFormat } from '@/lib/date';
import { LoadingPage } from '@/config/LoadingPage';

interface EventDetailPageProps {
  // Props could be added for dynamic data
}

const EventDetailPage: React.FC<EventDetailPageProps> = () => {
  /// On va charger les informations les détails d'une 
  const { fetchEvent } = useEventService();
  const { id } = useParams<{ id :string; }>();
  const { data: event, isError, isLoading } = fetchEvent(id);

  if(isError) {
    return (
      <LoadingPage label="Erreur dans le chargement de la donnée !" />
    )
  }

  if(isLoading) {
    return (
      <LoadingPage label='Chargement des événements...' />
    );
  }

  return (
    <EventLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-event-muted-foreground mb-8">
          <a className="hover:text-event-primary transition-colors" href="#">
            Événements
          </a>
          <EventlyIcon name="chevron_right" className="text-base" />
          <span className="text-event-foreground font-medium">{event?.name}</span>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Left column - Event details */}
          <div className="md:col-span-2">
            {/* Event image */}
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-8 shadow-lg shadow-gray-300">
              <img 
                alt={event?.name} 
                className="absolute inset-0 w-full h-full object-cover" 
                src={event?.image_path} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h1 className="text-white text-3xl md:text-4xl font-bold leading-tight">
                  {event?.name}
                </h1>
              </div>
            </div>

            {/* Event description */}
            <div>
              <h2 className="text-event-foreground text-2xl font-bold leading-tight tracking-[-0.015em] mb-4">
                À propos de l'événement
              </h2>
              <p className="text-event-muted-foreground text-base font-normal leading-relaxed">
                {event?.description}
              </p>
            </div>

            {/* Additional sections can be added here */}
            {/* <EventSpeakers />
            <EventSchedule />
            <EventLocationMap /> */}
          </div>

          {/* Right column - Event info sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-2xl p-6 sticky top-8 border border-gray-200 shadow-sm">
              <h2 className="text-event-foreground text-xl font-bold leading-tight tracking-[-0.015em] mb-6">
                Informations
              </h2>
              
              <div className="space-y-5">
                {/* Date */}
                <div className="flex items-start gap-4">
                  <div className="text-event-primary mt-0.5">
                    <EventlyIcon name="calendar" className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-event-muted-foreground text-sm font-medium leading-normal">Date</p>
                    <p className="text-event-foreground text-base font-medium leading-normal">{ dateFormat(event?.start_date) }</p>
                  </div>
                </div>

                {/* Time */}
                <div className="flex items-start gap-4">
                  <div className="text-event-primary mt-0.5">
                    <EventlyIcon name="schedule" className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-event-muted-foreground text-sm font-medium leading-normal">Heure</p>
                    <p className="text-event-foreground text-base font-medium leading-normal"> { timeFormat(event?.start_date) } - { timeFormat(event?.end_date) }</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="text-event-primary mt-0.5">
                    <EventlyIcon name="location" className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-event-muted-foreground text-sm font-medium leading-normal">Lieu</p>
                    <p className="text-event-foreground text-base font-medium leading-normal">{ event?.place }</p>
                  </div>
                </div>

                {/* Price */}
                {
                  event?.ticket_prices.map(ticket => (
                    <div className="flex items-start gap-4">
                      <div className="text-event-primary mt-0.5">
                        <EventlyIcon name="ticket" className="h-5 w-5" />
                      </div>
                      { /** Catégorie de prix (Correction)  */ }
                      <div>
                        <p className="text-event-muted-foreground text-sm font-medium leading-normal">Prix</p>
                        <p className="text-event-foreground text-base font-medium leading-normal">{ticket.price} { process.env.VITE_CURRENCY }</p>
                      </div>
                    </div>
                  ))
                }
              </div>

              {/* Buy tickets button */}
              <div className="mt-8">
                <Button
                  onClick={() => console.log("Event Paid !")}
                  className="w-full flex items-center justify-center gap-2 rounded-full h-12 px-6 bg-event-secondary text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-event-secondary/90 transition-all shadow-lg shadow-event-secondary/30"
                >
                  <EventlyIcon name="shopping_cart" className="h-5 w-5" />
                  <span className="truncate">Acheter des billets</span>
                </Button>
              </div>

              {/* Additional action buttons */}
              <div className="mt-4 space-y-2">
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2 rounded-full h-10 text-event-foreground border-event-primary hover:bg-event-primary hover:text-white"
                >
                  <EventlyIcon name="favorite" className="h-5 w-5" />
                  <span>Ajouter aux favoris</span>
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2 rounded-full h-10 text-event-foreground border-event-primary hover:bg-event-primary hover:text-white"
                >
                  <EventlyIcon name="share" className="h-5 w-5" />
                  <span>Partager</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </EventLayout>
  );
};

export default EventDetailPage;