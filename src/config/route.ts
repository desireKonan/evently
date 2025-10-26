// config/routes.ts
import type { UserRole } from '@/app/model/user.model';
import React from 'react';

export interface RouteConfig {
  path: string;
  element: React.ComponentType;
  isPublic?: boolean;
  requiredRole?: UserRole[];
  redirectIfAuthenticated?: boolean;
  title?: string;
}

// Import des composants de page
const LandingPage = React.lazy(() => import('@/pages/client/LandingPage'));
const EventDetailPage = React.lazy(() => import('@/pages/client/EventDetailPage'));
const PaymentDetailPage = React.lazy(() => import('@/pages/client/SignInEventFormPage'));
const LoginPage = React.lazy(() => import('@/pages/shared/LoginPage'));
const DashboardPage = React.lazy(() => import('@/pages/admin/DashboardPage'));
const EventFormPage = React.lazy(() => import('@/pages/admin/event/EventFormPage'));
const EventListPage = React.lazy(() => import('@/pages/admin/event/EventListPage'));
const PaymentListPage = React.lazy(() => import('@/pages/admin/payment/PaymentListPage'));
const UserListPage = React.lazy(() => import('@/pages/admin/user/UserListPage'));
const ParticipantListPage = React.lazy(() => import('@/pages/admin/participant/ParticipantListPage'));
const CalendarPage = React.lazy(() => import('@/pages/admin/FullCalendarPage'));
const QRScannerPage = React.lazy(() => import('@/pages/shared/ScanPage'));

// Pages de gestion
const NotFoundPage = React.lazy(() => import('@/config/NotFound'));

export const routes: RouteConfig[] = [
  // Routes publiques
  {
    path: '/',
    element: LandingPage,
    isPublic: true,
    title: 'Accueil'
  },
  {
    path: '/explore',
    element: LandingPage,
    isPublic: true,
    title: 'Explorer'
  },
  {
    path: '/event/:id/details',
    element: EventDetailPage,
    isPublic: true,
    title: 'Détails de l\'événement'
  },
  {
    path: '/event/:id/payment',
    element: PaymentDetailPage,
    isPublic: true,
    title: 'Formulaire d\'inscription à un évenement'
  },

  // Routes d'authentification
  {
    path: '/login',
    element: LoginPage,
    isPublic: true,
    redirectIfAuthenticated: true,
    title: 'Connexion'
  },

  // Routes admin
  {
    path: '/dashboard',
    element: DashboardPage,
    requiredRole: ['ADMIN', 'ORGANIZER'],
    title: 'Tableau de bord'
  },
  {
    path: '/create/event',
    element: EventFormPage,
    requiredRole: ['ORGANIZER'],
    title: 'Créer un événement'
  },
  {
    path: '/event/:id/edit',
    element: EventFormPage,
    requiredRole: ['ORGANIZER'],
    title: 'Modifier l\'événement'
  },
  {
    path: '/admin/events',
    element: EventListPage,
    requiredRole: ['ADMIN', 'ORGANIZER', 'USER'],
    title: 'Gestion des événements'
  },
  {
    path: '/event/:id/view',
    element: EventFormPage,
    requiredRole: ['ORGANIZER'],
    title: 'Détails de l\'événement'
  },
  {
    path: '/event/:id/payments',
    element: PaymentListPage,
    requiredRole: ['ORGANIZER'],
    title: 'La liste des paiements par évenement'
  },
  {
    path: '/admin/users',
    element: UserListPage,
    requiredRole: ['ADMIN', 'ORGANIZER'],
    title: 'Gestion des utilisateurs'
  },
  {
    path: '/admin/participants',
    element: ParticipantListPage,
    requiredRole: ['ORGANIZER', 'ADMIN'],
    title: 'Gestion des participants'
  },
  {
    path: '/calendar-event',
    element: CalendarPage,
    requiredRole: ['ORGANIZER', 'USER'],
    title: 'Calendrier'
  },

  // Routes organisateur
  {
    path: '/scan',
    element: QRScannerPage,
    requiredRole: ['USER', 'ORGANIZER'],
    title: 'Scanner QR Code'
  },


  // Pages d'erreur.
  {
    path: '*',
    element: NotFoundPage,
    title: 'Non trouvé' ,
    isPublic: true
  },
];