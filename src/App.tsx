import { BrowserRouter as Router } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { Suspense } from 'react';
import { GlobalLoader } from './config/GlobalLoader';
import { routes } from './config/route';
import RouteRenderer from './config/RouterRenderer';

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
          </Suspense>
        </div>
      </Router>
    </QueryClientProvider>
  )
}

export default App