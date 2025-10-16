// hooks/useRoutes.ts
import { useMemo } from 'react';
import { routes } from '@/config/route';
import { useAuthStore } from '@/stores/authStore';

export const useRoutes = () => {
  const { user } = useAuthStore();

  // Routes accessibles selon le rôle de l'utilisateur
  const accessibleRoutes = useMemo(() => {
    if (!user) {
      return routes.filter(route => route.isPublic || route.redirectIfAuthenticated);
    }

    return routes.filter(route => {
      if (route.isPublic) return true;
      if (!route.requiredRole) return true;
      return route.requiredRole.some(role => role === user.role);
    });
  }, [user]);

  // Routes de navigation principale (pour la sidebar/menu)
  const navigationRoutes = useMemo(() => {
    return accessibleRoutes.filter(route => 
      !route.isPublic && 
      !route.redirectIfAuthenticated &&
      route.path !== '/' &&
      !route.path.includes('/event/') &&
      !route.path.includes('/confirmation')
    );
  }, [accessibleRoutes]);

  // Trouver une route par son path
  const getRouteByPath = (path: string) => {
    return routes.find(route => route.path === path);
  };

  // Obtenir le titre d'une route
  const getRouteTitle = (path: string) => {
    const route = getRouteByPath(path);
    return route?.title || 'Titre non défini';
  };

  return {
    allRoutes: routes,
    accessibleRoutes,
    navigationRoutes,
    getRouteByPath,
    getRouteTitle,
  };
};