import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import DashboardPage from './pages/admin/DashboardPage'
import EventFormPage from './pages/admin/event/EventFormPage'
import EventDetailPage from './pages/client/EventDetailPage'
import EventListPage from './pages/admin/event/EventListPage'
import LoginPage from './pages/shared/LoginPage'
import CalendarPage from './pages/admin/FullCalendarPage'
import ConfirmationPayment from './pages/client/ConfirmationPage'
import QRScannerPage from './pages/shared/ScanPage'
import LandingPage from './pages/client/LandingPage'

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
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/explore" element={<LandingPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/create/event" element={<EventFormPage />} />
            <Route path="/event/:id" element={<EventDetailPage />} />
            <Route path="/admin/events" element={<EventListPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/calendar-event" element={<CalendarPage />} />
            <Route path="/confirmation" element={<ConfirmationPayment />} />
            <Route path="/scan" element={<QRScannerPage />} />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  )
}

export default App