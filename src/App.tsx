import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import DashboardPage from './pages/admin/DashboardPage'
// import EventFormPage from './pages/admin/event/EventFormPage'
// import EventDetailPage from './pages/client/EventDetailPage'
// import UserListPage from './pages/admin/user/UserListPage'
// import EventListPage from './pages/admin/event/EventListPage'
// import ParticipantListPage from './pages/admin/participant/ParticipantListPage'
// import LoginPage from './pages/shared/LoginPage'
// import CalendarPage from './pages/admin/FullCalendarPage'
// import ConfirmationPayment from './pages/client/ConfirmationPage'
// import QRScannerPage from './pages/shared/ScanPage'
// import LandingPage from './pages/client/LandingPage'
import { Suspense } from 'react'
import { GlobalLoader } from './config/GlobalLoader'
// import NotFound from './config/NotFound'
// import ResourceNotFound from './config/ResourceNotFound'
import { routes } from './config/route'
import RouteRenderer from './config/RouterRenderer'
import ResourceNotFound from './config/ResourceNotFound'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-background">
          <Suspense fallback={<GlobalLoader />}>
            <RouteRenderer routes={routes} />

            {/* Routes supplémentaires pour les pages d'erreur */}
            <Routes>
              <Route path="/event-not-found" element={<ResourceNotFound resource="Événement" />} />
              <Route path="/user-not-found" element={<ResourceNotFound resource="Utilisateur" />} />
              <Route path="/participant-not-found" element={<ResourceNotFound resource="Participant" />} />
            </Routes>
          </Suspense>
          {/* <Route path="/" element={<LandingPage />} />
            <Route path="/explore" element={<LandingPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/create/event" element={<EventFormPage />} />
            <Route path="/event/:id" element={<EventDetailPage />} />
            <Route path="/admin/events" element={<EventListPage />} />
            <Route path="/admin/users" element={<UserListPage />} />
            <Route path="/admin/participants" element={<ParticipantListPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/calendar-event" element={<CalendarPage />} />
            <Route path="/confirmation" element={<ConfirmationPayment />} />
            <Route path="/scan" element={<QRScannerPage />} /> */}
        </div>
      </Router>
    </QueryClientProvider>
  )
}

export default App