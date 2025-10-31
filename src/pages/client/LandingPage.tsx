import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { EventCard } from '@/components/shared/EventCard';
import EventLayout from '@/components/layout/client/EventLayout';
import { useEventService } from '@/app/service/event.service';
import { EVENT_TYPE_OPTIONS } from '@/app/model/event.model';
import { AboutSection } from '@/components/shared/AboutSection';
import { FeaturesSection } from '@/components/shared/FeatureSection';
import { HeroSection } from '@/components/shared/HeroSection';

const LandingPage = () => {
  const [activeTab, setActiveTab] = useState('OTHER');

  const { fetchAllPublishedEvents } = useEventService();
  const { data: events, isLoading, isError } = fetchAllPublishedEvents();
  

  const toggleFavorite = (id: string) => {
    // Logique pour gérer les favoris
    console.log("Toggle favorite for event:", id);
  };

  return (
    <EventLayout>
      {/* Main Content */}
      <main className="container mx-auto flex-1 px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col gap-12">
          { /* About Sections  */ }
          <HeroSection />

          { /* About Sections  */ }
          <AboutSection />

          { /* Features Sections  */ }
          <FeaturesSection />

          {/* Favorite Events Section */}
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Vos Événements</h2>
              <a className="text-sm font-medium text-event-primary hover:text-opacity-80" href="#">Tout voir</a>
            </div>
            {
              !isLoading && !isError && events && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  { events?.data.map(event => (
                      <EventCard key={event.id} event={event} onToggleFavorite={toggleFavorite} />
                  )) }
                </div>
              )
            }
            
          </div>

          {/* Upcoming Events Header */}
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Événements à venir</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">Découvrez les meilleurs événements près de chez vous et dans le monde entier.</p>
          </div>

          {
            isLoading && (
              <p> Aucun évenement disponibles </p>
            )
          }
 
          {
            !isLoading && !isError && events?.data.length !== 0 && (
              <>
                {/* Tabs */}
                <div className="sticky top-16 z-[9] bg-event-background/80 backdrop-blur-sm -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-4">
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="w-full justify-start border-b border-border rounded-none bg-transparent p-0 h-auto">
                      <TabsTrigger value="all" className="rounded-none border-b-2 data-[state=active]:border-event-primary data-[state=active]:text-event-primary data-[state=active]:shadow-none py-4 px-1 text-sm font-medium">Tous les événements</TabsTrigger>
                      {
                        EVENT_TYPE_OPTIONS.map(eventType => (
                          <TabsTrigger key={eventType.value} value={eventType.value} className="rounded-none border-b-2 data-[state=active]:border-event-primary data-[state=active]:text-event-primary data-[state=active]:shadow-none py-4 px-1 text-sm font-medium"> { eventType.label } </TabsTrigger>                
                        ))
                      }
                    </TabsList>
                  </Tabs>
                </div>

                {/* All Events Grid */} 
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  { events?.data.map(event => (
                    <EventCard key={event.id} event={event} onToggleFavorite={toggleFavorite} />
                  )) }
                </div>

                {/* Pagination */}
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive>1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <span className="flex h-10 w-10 items-center justify-center">...</span>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">8</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </>
            )
          }
        </div>
      </main>
    </EventLayout>
  );
};

export default LandingPage;