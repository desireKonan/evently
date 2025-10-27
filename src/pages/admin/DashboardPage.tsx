import React, { useState } from 'react';
import Layout from "@/components/layout/admin/AdminLayout";
import StatCard from '@/components/StatCard';
import RecentEventsTable from '@/components/RecentEventsTable';
import { useNavigate } from 'react-router-dom';
import { Calendar, ChartBarStackedIcon, Plus, User } from 'lucide-react';
import { Toaster } from '@/components/ui/sonner';
import { useStatisticService } from '@/app/service/statistics.service';
import { useAuthStore } from '@/stores/authStore';
import { LoadingPage } from '@/config/LoadingPage';
import { useEventService } from '@/app/service/event.service';
import type { StatCardData } from '@/app/model/statistics.model';

const Dashboard: React.FC = () => {
  // Données pour les cartes de statistiques
  const navigate = useNavigate();
  const [showCreateButton] = useState(true);
  const { getStatisticsByUser } = useStatisticService();
  const { fetchAllPublishedEvents } = useEventService();
  const { user } = useAuthStore();
  const { data: statistics, isError, isLoading } = getStatisticsByUser(user);
  const { data: published_events, isLoading: isEventLoading, isError: isEventError } = fetchAllPublishedEvents();

  const statCards: StatCardData[] = [
    {
      id: 1,
      title: "Événements",
      value: isLoading && !statistics ? 0 : statistics.events_count,
      description: "Le nombre d'évenements",
      icon: Calendar,
      color: "text-[var(--primary-color)]"
    },
    {
      id: 2,
      title: "Utilisateurs",
      value: isLoading && !statistics ? 0 : statistics.events_tickets,
      description: "Le nombre de participants aux évenements",
      icon: User,
      color: "text-[var(--primary-color)]"
    },
    {
      id: 4,
      title: "Catégories",
      description: "Le nombre de catégories",
      value: isLoading  && !statistics ? 0 : statistics.events_status_count
              .map((status: any) => status.event_count as number)
              .reduce((sum: number, count: number) => sum + count, 0),
      icon: ChartBarStackedIcon,
      color: "text-[var(--primary-color)]"
    }
  ];

  if (isError) {
    return (
      <LoadingPage label="Erreur dans le chargement de la donnée !" />
    );
  }
  
  if (isLoading) {
    return (
      <LoadingPage label='Chargement des événements...' />
    );
  }



  return (
    <Layout pageTitle="Tableau de bord" buttons={
      showCreateButton && user?.role === 'ORGANIZER' && (
        <button
          onClick={() => navigate('/create/event')}
          className="flex items-center gap-2 rounded-full bg-[var(--secondary-color)] px-4 py-2 text-sm font-bold text-white hover:opacity-90"
        >
          <Plus />
          <span> Créer un événement </span>
        </button>
      )
    }>
      <Toaster />
      <div className="p-10">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((card) => (
            <StatCard
              key={card.id}
              title={card.title}
              icon={card.icon}
              value={card.value}
              description={card.description}
            />
          ))}
        </div>

        {/* Recent Events Table */}
        {
          !isEventLoading && !isEventError && published_events && (
            <RecentEventsTable events={published_events.data} />
          ) 
        }
      </div>
    </Layout>
  );
};

export default Dashboard;