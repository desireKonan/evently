import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { EventCard } from '@/components/shared/EventCard';
import EventLayout from '@/components/layout/client/EventLayout';

const LandingPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  
  // Données des événements
  const favoriteEvents = [
    {
      id: 1,
      title: "Summer Music Festival",
      location: "Los Angeles, CA",
      date: "5-7 Août",
      description: "Vibrez au son de vos artistes préférés.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBWZQVYMleShA9WIYc_886hVb1SBdb9pMLpKhk7I-yAdkHfICIFBA0nt6AuNNKuZAVehNDT30lux__oSJT60hJAqaOzuWzselCOtJ9bJ-waCnTa7Lc9CpkYmseslqDafWkZdp3-i2me_SZgvsJz5Fr3j0dVT9nQvtF3VtdFiqABFfSzB0yhcSH94c23n9wqzfxd2p20Sj1tX3kLEgKnRKwWtksBWgrD_em42_Kn0k4TDCyGVLlxdMdNpMHIRcqxv6EeUyG9x9gGIQU",
      isFavorite: true
    },
    {
      id: 2,
      title: "Festival des Arts Culinaires",
      location: "Paris, FR",
      date: "12-14 Oct",
      description: "Une célébration de la gastronomie mondiale.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBZU3MZtP2OVGPK5aNMpL-6hEH_zEXz6br_Bx41SSGXbdhYK9umY8-nC-xS_94OFqVh8AF-hrXFEuwyZSxt134frOEmWNdIFYcyhGnZmavZqXd8_Tux9GqZaGYto-QsPz2GVYRg_Iplu0Ya7jinfHkJJw8v7cz7TxDl27eHdew1ORlaqyxfyOVpmbh4-bE9PQLsMzvKI_bW5oHZnf3mZGk-UKENcXF1J9ZDRBrnRH0fNFtB_gEO7EfMBPxJwV2FLaIRE6E4jxp6yI4",
      isFavorite: true
    }
  ];

  const allEvents: any[] = [
    {
      id: 1,
      title: "Tech Conference 2024",
      location: "San Francisco, CA",
      date: "15-17 Juil",
      description: "Plongez dans les dernières innovations tech.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBm67QkD1o24bJ6oe4iyEnwdu3yQ-bjihcpPt3IENFro6ttXw7G2FdBSKqRDM_ziSHtuwbOaYeVb_21SUB4VXyvALymtUUWnRzbPlt2MG8dKbaxGfNcxxjGNclrPTCKRPJYQsPzk5eWNscYNc53kdlVasv2fsDNqnjOWGCpNaPnEsl-FxslvfiS5ILcx63UQUG7xiP4kPxRMswimDBNO7BznWcw95SMXDybVU1g9T1b84PyN3PAh-0em5gPz6TiqWIAcTm_0g-qnekk",
      isFavorite: false,
      category: "tech"
    },
    {
      id: 2,
      title: "Summer Music Festival",
      location: "Los Angeles, CA",
      date: "5-7 Août",
      description: "Vibrez au son de vos artistes préférés.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBWZQVYMleShA9WIYc_886hVb1SBdb9pMLpKhk7I-yAdkHfICIFBA0nt6AuNNKuZAVehNDT30lux__oSJT60hJAqaOzuWzselCOtJ9bJ-waCnTa7Lc9CpkYmseslqDafWkZdp3-i2me_SZgvsJz5Fr3j0dVT9nQvtF3VtdFiqABFfSzB0yhcSH94c23n9wqzfxd2p20Sj1tX3kLEgKnRKwWtksBWgrD_em42_Kn0k4TDCyGVLlxdMdNpMHIRcqxv6EeUyG9x9gGIQU",
      isFavorite: true,
      category: "music"
    },
    {
      id: 3,
      title: "Sports Expo",
      location: "New York, NY",
      date: "20-22 Sept",
      description: "Rencontrez des légendes du sport et découvrez les nouveautés.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB9P9dPja-TOVklxmzHFMmXMKHv1TN1pNMkvBVbaGeOJVHiP-uNXkx2Bu76SJIdwSMFL2iTudn3q-rtp0cfZamcOSQja19Wb_TB5-mCBIYZN-OGAJD0DU82Af3bwflzi04DxL-Vu2CDhXcOQpt0eNUMKyS5pdqWRt8y8_LgMbytosqZs8hvsn2turwt7oWpOMHJE323lFXJMwimDBURB5Mm3uBFH3F8kJ-EHInwXg8mHuVF3f_BefBNWYNREEmDV4uPQ3dYXQlvXEk",
      isFavorite: false,
      category: "sports"
    },
    {
      id: 4,
      title: "Festival des Arts Culinaires",
      location: "Paris, FR",
      date: "12-14 Oct",
      description: "Une célébration de la gastronomie mondiale.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBZU3MZtP2OVGPK5aNMpL-6hEH_zEXz6br_Bx41SSGXbdhYK9umY8-nC-xS_94OFqVh8AF-hrXFEuwyZSxt134frOEmWNdIFYcyhGnZmavZqXd8_Tux9GqZaGYto-QsPz2GVYRg_Iplu0Ya7jinfHkJJw8v7cz7TxDl27eHdew1ORlaqyxfyOVpmbh4-bE9PQLsMzvKI_bW5oHZnf3mZGk-UKENcXF1J9ZDRBrnRH0fNFtB_gEO7EfMBPxJwV2FLaIRE6E4jxp6yI4",
      isFavorite: true,
      category: "food"
    }
  ];

  const filteredEvents = activeTab === "all" 
    ? allEvents 
    : allEvents.filter(event => event.category === activeTab);

  const toggleFavorite = (id: string) => {
    // Logique pour gérer les favoris
    console.log("Toggle favorite for event:", id);
  };

  return (
    <EventLayout>
         {/* Main Content */}
      <main className="container mx-auto flex-1 px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col gap-12">
          {/* Favorite Events Section */}
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Vos Événements Favoris</h2>
              <a className="text-sm font-medium text-event-primary hover:text-opacity-80" href="#">Tout voir</a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favoriteEvents.map(event => (
                <EventCard key={event.id} event={event} onToggleFavorite={toggleFavorite} />
              ))}
            </div>
          </div>

          {/* Upcoming Events Header */}
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Événements à venir</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">Découvrez les meilleurs événements près de chez vous et dans le monde entier.</p>
          </div>

          {/* Tabs */}
          <div className="sticky top-16 z-[9] bg-event-background/80 backdrop-blur-sm -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full justify-start border-b border-border rounded-none bg-transparent p-0 h-auto">
                <TabsTrigger value="all" className="rounded-none border-b-2 data-[state=active]:border-event-primary data-[state=active]:text-event-primary data-[state=active]:shadow-none py-4 px-1 text-sm font-medium">Tous les événements</TabsTrigger>
                <TabsTrigger value="music" className="rounded-none border-b-2 data-[state=active]:border-event-primary data-[state=active]:text-event-primary data-[state=active]:shadow-none py-4 px-1 text-sm font-medium">Musique</TabsTrigger>
                <TabsTrigger value="tech" className="rounded-none border-b-2 data-[state=active]:border-event-primary data-[state=active]:text-event-primary data-[state=active]:shadow-none py-4 px-1 text-sm font-medium">Tech</TabsTrigger>
                <TabsTrigger value="sports" className="rounded-none border-b-2 data-[state=active]:border-event-primary data-[state=active]:text-event-primary data-[state=active]:shadow-none py-4 px-1 text-sm font-medium">Sports</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* All Events Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredEvents.map(event => (
              <EventCard key={event.id} event={event} onToggleFavorite={toggleFavorite} />
            ))}
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
        </div>
      </main>
    </EventLayout>
  );
};

export default LandingPage;