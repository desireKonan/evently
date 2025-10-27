import { useQuery } from "@tanstack/react-query";
import type { StatisticAdminEvently, StatisticOrganizerEvently } from "../model/statistics.model";
import httpService from "./http.service";
import type { User } from "../model/user.model";

const getDashboardStatistics = async (user: User | null): Promise<any> => {
    let response = null;
    if(user?.role === 'ORGANIZER') {
        response = await httpService.get<StatisticOrganizerEvently>(
            `/statistics/organizer`
        );    
    } else {
        response = await httpService.get<StatisticAdminEvently>(
            `/statistics/admin`
        );
    }
    if (response.status !== 200) {
        throw new Error("Erreur lors de la récupération des statistiques de " + user?.role + " !");
    }
    console.log(response.data);
    return response.data;
};

/// Http Payment Service utilisant (Tanstack Query).
export const useStatisticService = () => {
  // Hook pour récupérer les statistiques d'un évenement en fonction de l'utilisateur.
  const getStatisticsByUser = (user: User | null) => {
    return useQuery({
      queryKey: ["statistics"],
      queryFn: async () => getDashboardStatistics(user),
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  
  return {
    getStatisticsByUser
  };
};
