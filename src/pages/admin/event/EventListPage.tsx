import React from 'react';
import Layout from "@/components/layout/admin/AdminLayout";
import { recentEvents } from '@/mock/event.mock';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { DataTable } from '@/components/shared/DataTable';
import { columns } from './components/table/columns';

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

const EventList: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout pageTitle="Liste des événements" buttons={
      (
        <button
          onClick={() => navigate('/create/event')}
          className="flex items-center gap-2 rounded-full bg-[var(--secondary-color)] px-4 py-2 text-sm font-bold text-white hover:opacity-90"
        >
          <Plus />
          <span> Créer un événement </span>
        </button>
      )
    }>
      <div className="p-10">
        {/* Events Table */}
        <div className="mt-10">
            <h2 className="text-xl font-bold text-foreground mb-4">Événements récents</h2>
            <div className="rounded-md border bg-white">
                <DataTable columns={columns} data={recentEvents} />
            </div>
        </div>
      </div>
    </Layout>
  );
};

export default EventList;