import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import httpService from "./http.service";
import { EventStatus, type EventDto } from "../model/event.model";
import type { User } from "../model/user.model";
import { toast } from "sonner";
import type {
  PaginationParams,
  PaginatedResponse,
} from "../model/common.model";
import { useState } from "react";


const fetchEvents = async (params: PaginationParams): Promise<PaginatedResponse<EventDto>> => {
  const queryParams = new URLSearchParams({
    page: params.page.toString(),
    limit: params.limit.toString(),
  });

  const response = await httpService.get<PaginatedResponse<EventDto>>(
    `/events/all?${queryParams}`
  );
  if (response.status !== 200) {
    throw new Error("Erreur lors de la récupération des événements");
  }
  return response.data;
};

const fetchPublishedEvents = async (params: PaginationParams): Promise<PaginatedResponse<EventDto>> => {
  const queryParams = new URLSearchParams({
    page: params.page.toString(),
    limit: params.limit.toString(),
  });

  const response = await httpService.get<PaginatedResponse<EventDto>>(
    `/events/published?${queryParams}`
  );
  if (response.status !== 200) {
    throw new Error("Erreur lors de la récupération des événements");
  }
  return response.data;
};

const fetchEventById = async (id: string | undefined): Promise<EventDto | null> => {
  if (!id) throw new Error("ID d'événement requis");
        
  const response = await httpService.get<EventDto>(`events/${id}`);
  if (response.status == 200 || response.status == 304) {
    return response.data;
  }
  return null;
};

const publishedEventByUser = async ({ id, user }: { id: string; user: User | null }) => {
  const eventStatus = user?.role === "ADMIN" ? EventStatus.PUBLISHED : EventStatus.PENDING;
  const response = await httpService.put(`/events/${id}/validate`, {
    status: eventStatus
  });
  if (response.status !== 200) {
    throw new Error("Erreur lrs de la publication");
  }
  return response.data;
};

// {
//   const eventStatus = user?.role === "ADMIN" ? EventStatus.PUBLISHED : EventStatus.PENDING;
//   const response = await httpService.put(`/events/${id}/validate`, {
//     status: eventStatus
//   });
//   if (response.status !== 200) {
//     throw new Error("Erreur lrs de la publication");
//   }
//   return response.data;
// },


/// Http Event Service utilisant (Tanstack Query).
export const useEventService = () => {
  const queryClient = useQueryClient();
  const [pagination, setPagination] = useState<PaginationParams>({
    page: 0,
    limit: 10,
  });

  // Hook pour récupérer un événement par ID
  const fetchEvent = (id: string | undefined) => {
    return useQuery({
      queryKey: ["event", id],
      queryFn: async () => fetchEventById(id),
      enabled: !!id, // Ne s'exécute que si l'ID est défini
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  const publishEventMutation = useMutation({
    mutationFn: async ({ id, user }: { id: string; user: User | null }) => publishedEventByUser({id, user }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      toast.success("Événement publié avec succès");
    },
    onError: (error) => {
      toast.error(`Erreur: ${error.message}`);
    },
  });

  const fetchAllEvents = () => {
    return useQuery({
      queryKey: ["events", pagination],
      queryFn: () => fetchEvents(pagination),
      staleTime: 5 * 60 * 1000,
    });
  };

  const fetchAllPublishedEvents = () => {
    return useQuery({
      queryKey: ["published-events", pagination],
      queryFn: () => fetchPublishedEvents(pagination),
      staleTime: 5 * 60 * 1000,
    });
  };

  return {
    fetchEvent,
    publishEventMutation,
    fetchAllEvents,
    fetchAllPublishedEvents,
    pagination,
    setPagination,
  };
};
