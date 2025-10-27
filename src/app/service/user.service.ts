import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import type { PaginationParams, PaginatedResponse } from "../model/common.model";
import type { User } from "../model/user.model";
import httpService from "./http.service";

const fetchUsers = async (params: PaginationParams): Promise<PaginatedResponse<User>> => {
  const queryParams = new URLSearchParams({
    page: params.page.toString(),
    limit: params.limit.toString(),
  });

  const response = await httpService.get<PaginatedResponse<User>>(`/user?${queryParams}`);
  if (response.status !== 200) {
    throw new Error("Erreur lors de la récupération des utilisateurs !");
  }
  return response.data;
};

const fetchUserById = async (id: string | undefined): Promise<User | null> => {
  if (!id) throw new Error("ID d'événement requis");
        
  const response = await httpService.get<User>(`/user/${id}`);
  if (response.status == 200 || response.status == 304) {
    return response.data;
  }
  return null;
};


/// Http Payment Service utilisant (Tanstack Query).
export const useUserService = () => {
  const [pagination, setPagination] = useState<PaginationParams>({
    page: 0,
    limit: 10,
  });

  // Hook pour récupérer un événement par ID
  const fetchUser = (id: string | undefined) => {
    return useQuery({
      queryKey: ["payment", id],
      queryFn: async () => fetchUserById(id),
      enabled: !!id, // Ne s'exécute que si l'ID est défini
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  const fetchAllUsers = () => {
    return useQuery({
      queryKey: ["payments", pagination],
      queryFn: () => fetchUsers(pagination),
      staleTime: 5 * 60 * 1000,
    });
  };

  return {
    fetchAllUsers,
    fetchUser,
    pagination,
    setPagination,
  };
};