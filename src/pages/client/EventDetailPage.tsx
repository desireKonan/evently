import React from 'react';
import { Button } from "@/components/ui/button";
import EventLayout from '@/components/client/EventLayout';
import EventlyIcon from '@/components/shared/EventlyIcons';

interface EventDetailPageProps {
  // Props could be added for dynamic data
}

const EventDetailPage: React.FC<EventDetailPageProps> = () => {
  // This data would typically come from an API or props
  const eventData = {
    id: 1,
    title: "Conférence sur la technologie",
    description: "Rejoignez-nous pour une journée d'exploration des dernières tendances technologiques, des conférences inspirantes et des opportunités de réseautage avec des leaders de l'industrie. Cet événement est conçu pour les développeurs, les chefs de produit et les passionnés de technologie qui souhaitent se tenir au courant des dernières innovations.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAMuOarNCPvV81eqyyRakFp4dsFy8JtwXX_sQMBXrMRLpaVmwoH_GO75U0EUjNXd_WW9Nbzbs0sMDgS6F2OPAQsmJgpAImxun-uGjs0MPlY_cTQRnu1pYsdTV9uSUO8vwzBGSsqN4mlwoiQ4QCDNTNf4OvJ-9dzdpxUiONUE82KfR9P9vYcqpMTHOuma3BXqzpdMKcLHjmNNj1hF_9y00digDCfM43Ph0MT1UaRVaslu21yWE7h_Z8-8UxdJl6wXfaGTGkyU8Aw7GI",
    date: "15 juillet 2024",
    time: "9h00 - 17h00",
    location: "Centre de conférences de la ville",
    price: "à partir de 50 €",
    category: "Technology"
  };

  const handleBuyTickets = () => {
    // Logic for buying tickets
    console.log("Acheter des billets pour l'événement:", eventData.id);
  };

  return (
    <EventLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-event-muted-foreground mb-8">
          <a className="hover:text-event-primary transition-colors" href="#">
            Événements
          </a>
          <EventlyIcon name="chevron_right" className="text-base" />
          <span className="text-event-foreground font-medium">{eventData.title}</span>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Left column - Event details */}
          <div className="md:col-span-2">
            {/* Event image */}
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-8 shadow-lg shadow-gray-300">
              <img 
                alt={eventData.title} 
                className="absolute inset-0 w-full h-full object-cover" 
                src={eventData.image} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h1 className="text-white text-3xl md:text-4xl font-bold leading-tight">
                  {eventData.title}
                </h1>
              </div>
            </div>

            {/* Event description */}
            <div>
              <h2 className="text-event-foreground text-2xl font-bold leading-tight tracking-[-0.015em] mb-4">
                À propos de l'événement
              </h2>
              <p className="text-event-muted-foreground text-base font-normal leading-relaxed">
                {eventData.description}
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
                    <p className="text-event-foreground text-base font-medium leading-normal">{eventData.date}</p>
                  </div>
                </div>

                {/* Time */}
                <div className="flex items-start gap-4">
                  <div className="text-event-primary mt-0.5">
                    <EventlyIcon name="schedule" className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-event-muted-foreground text-sm font-medium leading-normal">Heure</p>
                    <p className="text-event-foreground text-base font-medium leading-normal">{eventData.time}</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="text-event-primary mt-0.5">
                    <EventlyIcon name="location" className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-event-muted-foreground text-sm font-medium leading-normal">Lieu</p>
                    <p className="text-event-foreground text-base font-medium leading-normal">{eventData.location}</p>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-start gap-4">
                  <div className="text-event-primary mt-0.5">
                    <EventlyIcon name="ticket" className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-event-muted-foreground text-sm font-medium leading-normal">Prix</p>
                    <p className="text-event-foreground text-base font-medium leading-normal">{eventData.price}</p>
                  </div>
                </div>
              </div>

              {/* Buy tickets button */}
              <div className="mt-8">
                <Button
                  onClick={handleBuyTickets}
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