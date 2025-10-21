import { useQuery } from "@tanstack/react-query";
import httpService from "./http.service";

// Hook pour récupérer un événement par ID
export const useEvent = (id: string | undefined) => {
  return useQuery({
    queryKey: ['event', id],
    queryFn: () => {
      if (!id) throw new Error('ID d\'événement requis');
      return httpService.get(`events/${id}`);
    },
    enabled: !!id, // Ne s'exécute que si l'ID est défini
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};


// Hook pour modifier un événement
// export const useUpdateEvent = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: ({ id, data }: { id: string; data: Partial<EventFormData> }) =>
//       httpService.put(`events/`id, data),
//     onSuccess: (data, variables) => {
//       // Mettre à jour le cache de l'événement spécifique
//       queryClient.setQueryData(['event', variables.id], data);
//       // Invalider la liste des événements
//       queryClient.invalidateQueries({ queryKey: ['events'] });
//       toast.success('Événement modifié avec succès !');
//     },
//     onError: (error: Error) => {
//       toast.error(`Erreur lors de la modification: ${error.message}`);
//     },
//   });
// };
