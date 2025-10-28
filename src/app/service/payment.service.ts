import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import httpService from "./http.service";
import { type PaymentDto } from "../model/payment.model";
import type { User } from "../model/user.model";
import { toast } from "sonner";
import type {
  PaginationParams,
  PaginatedResponse,
} from "../model/common.model";
import { useState } from "react";


const fetchPayments = async (params: PaginationParams): Promise<PaginatedResponse<PaymentDto>> => {
  const queryParams = new URLSearchParams({
    page: params.page.toString(),
    limit: params.limit.toString(),
  });

  const response = await httpService.get<PaginatedResponse<PaymentDto>>(
    `/payment?${queryParams}`
  );
  if (response.status !== 200) {
    throw new Error("Erreur lors de la récupération des paiements !");
  }
  return response.data;
};

const fetchPaymentById = async (id: string | undefined): Promise<PaymentDto | null> => {
  if (!id) throw new Error("ID d'événement requis");
        
  const response = await httpService.get<PaymentDto>(`/payment/${id}`);
  if (response.status == 200 || response.status == 304) {
    return response.data;
  }
  return null;
};

const makePaymentForUser = async ({ id, user }: { id: string; user: User | null }) => {
  if(user?.role !== 'ORGANIZER') {
    throw new Error('Vous ne pouvez pas validé ce payement ! Vous devez être obligatoirement organisateur de cet évenement !');
  }
  const response = await httpService.put(`/payment/${id}/make`, {
    status: 'PAID'
  });
  if (response.status !== 200) {
    throw new Error("Erreur lors du paiement !");
  }
  return response.data;
};


/// Http Payment Service utilisant (Tanstack Query).
export const usePaymentService = () => {
  const queryClient = useQueryClient();
  const [pagination, setPagination] = useState<PaginationParams>({
    page: 0,
    limit: 10,
  });

  // Hook pour récupérer un événement par ID
  const fetchPayment = (id: string | undefined) => {
    return useQuery({
      queryKey: ["payment", id],
      queryFn: async () => fetchPaymentById(id),
      enabled: !!id, // Ne s'exécute que si l'ID est défini
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  const validPaymentMutation = useMutation({
    mutationFn: async ({ id, user }: { id: string; user: User | null }) => makePaymentForUser({ id, user }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payments"] });
      toast.success("Le paiement publié avec succès !");
    },
    onError: (error) => {
      toast.error(`Erreur: ${error.message}`);
    },
  });

  const fetchAllPayments = () => {
    return useQuery({
      queryKey: ["payments", pagination],
      queryFn: () => fetchPayments(pagination),
      staleTime: 5 * 60 * 1000,
    });
  };

  return {
    fetchPayment,
    fetchAllPayments,
    validPaymentMutation,
    pagination,
    setPagination,
  };
};
