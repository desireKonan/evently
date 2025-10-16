import { useRoutes } from '@/hooks/user-routes';
import { useAuthStore } from '@/stores/authStore';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavigationSidebar: React.FC = () => {
  const { navigationRoutes } = useRoutes();
  const { user, logout } = useAuthStore();
  const location = useLocation();

  if (!user) return null;

  return (
    <nav className="w-64 bg-white shadow-lg h-full">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold text-event-foreground">
          Navigation
        </h2>
        <p className="text-sm text-event-muted-foreground">
          Rôle: {user.role}
        </p>
      </div>
      
      <div className="p-4">
        <ul className="space-y-2">
          {navigationRoutes.map((route) => (
            <li key={route.path}>
              <Link
                to={route.path}
                className={`block px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === route.path
                    ? 'bg-event-primary text-white'
                    : 'text-event-foreground hover:bg-event-primary/10'
                }`}
              >
                {route.title}
              </Link>
            </li>
          ))}
        </ul>
        
        <div className="mt-8 pt-4 border-t">
          <button
            onClick={logout}
            className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            Déconnexion
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavigationSidebar;