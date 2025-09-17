import React from 'react';
import Layout from "@/components/layout/admin/AdminLayout";
import StatCard from '@/components/StatCard';
import RecentEventsTable from '@/components/RecentEventsTable';
import { recentEvents } from '@/mock/event.mock';

// Définition des types TypeScript
export interface Event {
  id: number;
  name: string;
  date: string;
  organizer: string;
  category: string;
  status: 'published' | 'draft';
}

export interface StatCardData {
  id: number;
  title: string;
  value: number;
  icon: string;
  color: string;
}

const Dashboard: React.FC = () => {
  // Données pour les cartes de statistiques
  const statCards: StatCardData[] = [
    {
      id: 1,
      title: "Événements",
      value: 120,
      icon: "event",
      color: "text-[var(--primary-color)]"
    },
    {
      id: 2,
      title: "Utilisateurs",
      value: 500,
      icon: "person",
      color: "text-[var(--primary-color)]"
    },
    {
      id: 3,
      title: "Organisateurs",
      value: 50,
      icon: "store",
      color: "text-[var(--primary-color)]"
    },
    {
      id: 4,
      title: "Catégories",
      value: 10,
      icon: "label",
      color: "text-[var(--primary-color)]"
    }
  ];

  const handleCreateEvent = () => {
    // Logique pour créer un événement
    console.log("Créer un événement cliqué");
  };

  return (
    <Layout pageTitle="Tableau de bord">
      <div className="p-10">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((card) => (
            <StatCard
              key={card.id}
              title={card.title}
              value={card.value}
              icon={card.icon}
              color={card.color}
            />
          ))}
        </div>
        
        {/* Recent Events Table */}
        <RecentEventsTable events={recentEvents} />
      </div>
    </Layout>
  );
};

export default Dashboard;