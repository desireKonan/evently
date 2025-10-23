import React, { useState } from 'react';
import Layout from "@/components/layout/admin/AdminLayout";
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { DataTable } from '@/components/shared/DataTable';
import{ getColumns } from './components/table/columns';
import type { PaginatedResponse, PaginationParams } from '@/app/model/common.model';
import { EventStatus, type EventDto, type EventElementDTO, type EventType } from '@/app/model/event.model';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useAuthStore } from '@/stores/authStore';


// Service pour récupérer les événements avec pagination
const fetchEvents = async (params: PaginationParams): Promise<PaginatedResponse<EventDto>> => {
  const queryParams = new URLSearchParams({
    page: params.page.toString(),
    limit: params.limit.toString(),
  });

  const response = await fetch(`${process.env.VITE_EVENTLY_URL}/events/all?${queryParams}`, {
    headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken") || ''}`,
    },
  });
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des événements');
  }
  return response.json();
};


const EventList: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [pagination, setPagination] = useState<PaginationParams>({
    page: 0,
    limit: 10,
  });
  const { user } = useAuthStore();

  // Utilisation de React Query pour récupérer les événements avec pagination
  const { data: eventsData, isLoading, error, isError } = useQuery({
    queryKey: ['events', pagination],
    queryFn: () => fetchEvents(pagination),
    staleTime: 5 * 60 * 1000
  });


  const publishMutation = useMutation({
    mutationFn: async ({ 
      id
    }: { 
      id: string
    }) => {
      const eventStatus = user?.role === 'ADMIN' ? EventStatus.PUBLISHED : EventStatus.PENDING;
      const response = await fetch(`${process.env.VITE_EVENTLY_URL}/events/${id}/validate`, {
        method: 'PUT',
        body: JSON.stringify({ status: eventStatus }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      if (!response.ok) {
        throw new Error('Erreur lors de la publication');
      }
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      toast.success('Événement publié avec succès');
    },
    onError: (error) => {
      toast.error(`Erreur: ${error.message}`);
    },
  });

   // Gestion du changement de page
  const handlePageChange = (page: number) => {
    setPagination(prev => ({ ...prev, page }));
  };

  // Gestion du changement de limite
  const handleLimitChange = (limit: number) => {
    setPagination({ page: 1, limit });
  };


  const handlePublish = ({ id }: {id: string}) => {
    if (window.confirm(`Publier l'événement "${id}" ?`)) {
      publishMutation.mutate({
        id
      });
    }
  };

  const handleView = (id: string) => {
    navigate(`/event/${id}/view`);
  };

  const handleEdit = (id: string) => {
    navigate(`/event/${id}/edit`);
  };


   const tableData = eventsData?.data.map(event => ({
    id: event.id,
    name: event.name,
    description: event.description,
    start_date: event.start_date,
    end_date: event.end_date,
    published_at: event.published_at,
    created_at: event.created_at,
    organizer: {
      id: event.organizer.id,
      name: event.organizer.name,
      email: event.organizer.email,
      contact: event.organizer.contact
    },
    category: event.type as EventType,
    status: event.status as EventStatus,

  } as unknown as EventElementDTO)) || [];

  const columns = getColumns({
    onEdit: handleEdit,
    onView: handleView,
    onPublish: handlePublish,
  });

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
        {/* États de chargement et d'erreur */}
        {isLoading && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--secondary-color)]"></div>
            <span className="ml-2">Chargement des événements...</span>
          </div>
        )}

        {isError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p>Erreur: {(error as Error)?.message || 'Une erreur est survenue'}</p>
            <button 
              onClick={() => setPagination(prev => ({ ...prev }))}
              className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Réessayer
            </button>
          </div>
        )}
        {/* Events Table */}
        {
          !isLoading && !isError && eventsData && (
            <div className="mt-10">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-foreground">
                  Événements récents
                </h2>
                <div className="text-sm text-gray-600">
                  Page {eventsData.currentPage} sur {eventsData.totalPages} 
                  • Total: {eventsData.totalItems} événements
                </div>
              </div>
              <h2 className="text-xl font-bold text-foreground mb-4">Événements récents</h2>
              <div className="rounded-md border bg-white">
                  <DataTable 
                    columns={columns} 
                    data={tableData}
                    pagination={eventsData}
                    onPageChange={handlePageChange} 
                  />
              </div>
            </div>
          )
        }
        
      </div>
    </Layout>
  );
};

export default EventList;