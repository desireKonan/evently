import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import DashboardPage from './pages/DashboardPage'
import { EventFormPage } from './pages/EventFormPage'
import { EventDetailPage } from './pages/EventDetailPage'
import LoginPage from './pages/LoginPage'
import CalendarPage from './pages/FullCalendarPage'
import ConfirmationPayment from './pages/ConfirmationPage'
import QRScannerPage from './pages/ScanPage'
import EventlyLanding from './pages/NewLandingPage'

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
            <Route path="/" element={<EventlyLanding />} />
            <Route path="/explore" element={<EventlyLanding />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/create/event" element={<EventFormPage />} />
            <Route path="/event/:id" element={<EventDetailPage />} />
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