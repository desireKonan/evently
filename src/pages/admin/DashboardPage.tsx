import React, { useState } from 'react';
import Layout from "@/components/layout/admin/AdminLayout";
import StatCard from '@/components/StatCard';
import RecentEventsTable from '@/components/RecentEventsTable';
import { useNavigate } from 'react-router-dom';
import { BanknoteArrowDown, BuildingIcon, Plus, TicketCheck, TicketPercent, UserCircle } from 'lucide-react';
import { Toaster } from '@/components/ui/sonner';
import { useStatisticService } from '@/app/service/statistics.service';
import { useAuthStore } from '@/stores/authStore';
import { LoadingPage } from '@/config/LoadingPage';
import { useEventService } from '@/app/service/event.service';
import type { EventlyStatistics, StatCardData } from '@/app/model/statistics.model';

const getStatsCards = (isLoading: boolean, stats: EventlyStatistics | undefined) : StatCardData[] => {
  let increment: number = 0;
  let statCards: StatCardData[] = [];
  if(isLoading && !stats) return statCards;
  if(!stats?.statistics) return statCards;

  if(stats.userRole === 'ADMIN') {
    statCards.push({
      id: increment++, 
      title: stats.statistics[0].label,
      description: stats.statistics[0].label,
      value: stats.statistics[0].value,
      icon: UserCircle,
      color: "text-[var(--primary-color)]"
    });
    statCards.push({
      id: increment++, 
      title: stats.statistics[1].label,
      description: stats.statistics[1].label,
      value: stats.statistics[1].value,
      icon: BuildingIcon,
      color: "text-[var(--primary-color)]"
    });
    statCards.push({
      id: increment++, 
      title: stats.statistics[2].label,
      description: stats.statistics[2].label,
      value: stats.statistics[2].value,
      icon: TicketPercent,
      color: "text-[var(--primary-color)]"
    });
    statCards.push({
      id: increment++, 
      title: stats.statistics[3].label,
      description: stats.statistics[3].label,
      value: stats.statistics[3].value,
      icon: TicketCheck,
      color: "text-[var(--primary-color)]"
    });
    statCards.push({
      id: increment++, 
      title: stats.statistics[4].label,
      description: stats.statistics[4].label,
      value: stats.statistics[4].value,
      icon: BanknoteArrowDown,
      color: "text-[var(--primary-color)]"
    });
  } else {
    statCards.push({
      id: increment++, 
      title: stats.statistics[0].label,
      description: stats.statistics[0].label,
      value: stats.statistics[0].value,
      icon: TicketPercent,
      color: "text-[var(--primary-color)]"
    });
    statCards.push({
      id: increment++, 
      title: stats.statistics[1].label,
      description: stats.statistics[1].label,
      value: stats.statistics[1].value,
      icon: TicketCheck,
      color: "text-[var(--primary-color)]"
    });
    statCards.push({
      id: increment++, 
      title: stats.statistics[2].label,
      description: stats.statistics[2].label,
      value: stats.statistics[2].value,
      icon: BanknoteArrowDown,
      color: "text-[var(--primary-color)]"
    });
  }
  return statCards;
}


const Dashboard: React.FC = () => {
  // Données pour les cartes de statistiques
  const navigate = useNavigate();
  const [showCreateButton] = useState(true);
  const { getStatisticsByUser } = useStatisticService();
  const { fetchAllPublishedEvents } = useEventService();
  const { user } = useAuthStore();
  const { data: statistics, isError, isLoading } = getStatisticsByUser(user);
  const { data: published_events, isLoading: isEventLoading, isError: isEventError } = fetchAllPublishedEvents();

  const statCards: StatCardData[] = getStatsCards(isEventLoading, statistics);

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
              color={card.color}
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