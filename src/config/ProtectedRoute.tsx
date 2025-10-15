// components/auth/ProtectedRoute.tsx
import type { UserRole } from '@/app/model/user.model';
import { useAuthStore } from '@/stores/authStore';
import React from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole[];
  fallback?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole, 
  fallback 
}) => {
  const { isAuthenticated, user, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-event-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-event-foreground">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center bg-event-background">
        <div className="text-center p-8 max-w-md">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-event-foreground mb-4">
            Accès non autorisé
          </h2>
          <p className="text-event-muted-foreground mb-6">
            Vous devez être connecté pour accéder à cette page.
          </p>
          <a
            href="/login"
            className="inline-flex items-center justify-center rounded-full bg-event-primary text-white px-6 py-3 font-medium hover:bg-event-primary-dark transition-colors"
          >
            Se connecter
          </a>
        </div>
      </div>
    );
  }

  if (requiredRole && requiredRole.some(role => user?.role == role)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-event-background">
        <div className="text-center p-8 max-w-md">
          <div className="text-6xl mb-4">🚫</div>
          <h2 className="text-2xl font-bold text-event-foreground mb-4">
            Accès refusé
          </h2>
          <p className="text-event-muted-foreground mb-6">
            Vous n'avez pas les permissions nécessaires pour accéder à cette page.
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-gray-500 text-white px-6 py-3 font-medium hover:bg-gray-600 transition-colors"
            >
              Retour à l'accueil
            </a>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center rounded-full bg-event-primary text-white px-6 py-3 font-medium hover:bg-event-primary-dark transition-colors"
            >
              Retour
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;