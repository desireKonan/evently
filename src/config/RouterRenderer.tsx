// components/router/RouteRenderer.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import type { RouteConfig } from './route';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import ResourceNotFound from './ResourceNotFound';

interface RouteRendererProps {
  routes: RouteConfig[];
}

const RouteRenderer: React.FC<RouteRendererProps> = ({ routes }) => {
  return (
    <Routes>
      {routes.map((route) => {
        const RouteElement = route.element;
        
        if (route.redirectIfAuthenticated) {
          return (
            <Route
              key={route.path}
              path={route.path}
              element={
                <PublicRoute>
                  <RouteElement />
                </PublicRoute>
              }
            />
          );
        }

        if (route.requiredRole) {
          return (
            <Route
              key={route.path}
              path={route.path}
              element={
                <ProtectedRoute requiredRole={route.requiredRole}>
                  <RouteElement />
                </ProtectedRoute>
              }
            />
          );
        }

        if (route.isPublic) {
          return (
            <Route
              key={route.path}
              path={route.path}
              element={<RouteElement />}
            />
          );
        }

        // Route protégée par défaut (nécessite une authentification)
        return (
          <Route
            key={route.path}
            path={route.path}
            element={
              <ProtectedRoute>
                <RouteElement />
              </ProtectedRoute>
            }
          />
        );
      })}
      <Route path="/event-not-found" element={<ResourceNotFound resource="Événement" />} />
      <Route path="/user-not-found" element={<ResourceNotFound resource="Utilisateur" />} />
      <Route path="/participant-not-found" element={<ResourceNotFound resource="Participant" />} />
    </Routes>
  );
};

export default RouteRenderer;