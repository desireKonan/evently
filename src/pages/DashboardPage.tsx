import { useEffect } from 'react'
import { Plus, Search, Calendar, Ticket, DollarSign, Megaphone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useEventStore } from '@/stores/eventStore'
import { useAuthStore } from '@/stores/authStore'

// Mock data for dashboard
const mockEvents = [
  {
    id: '1',
    title: 'Conférence sur le marketing numérique',
    date: '2024-07-15',
    sales: 150,
    capacity: 200,
    status: 'active' as const,
  },
  {
    id: '2',
    title: 'Atelier de photographie',
    date: '2024-07-20',
    sales: 80,
    capacity: 100,
    status: 'active' as const,
  },
  {
    id: '3',
    title: 'Festival de musique',
    date: '2024-07-25',
    sales: 500,
    capacity: 1000,
    status: 'active' as const,
  },
  {
    id: '4',
    title: 'Salon de l\'emploi',
    date: '2024-07-30',
    sales: 200,
    capacity: 300,
    status: 'active' as const,
  },
  {
    id: '5',
    title: 'Défilé de mode',
    date: '2024-08-05',
    sales: 120,
    capacity: 150,
    status: 'active' as const,
  },
]

export function DashboardPage() {
  const { events, setEvents } = useEventStore()
  const { user } = useAuthStore()

  useEffect(() => {
    setEvents(mockEvents as any)
  }, [setEvents])

  const navigationItems = [
    { icon: Calendar, label: 'Événements', active: true },
    { icon: Ticket, label: 'Billets', active: false },
    { icon: DollarSign, label: 'Finance', active: false },
    { icon: Megaphone, label: 'Marketing', active: false },
  ]

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-background">
      <div className="flex flex-1 justify-center">
        <aside className="flex-shrink-0 w-64 bg-card p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12 bg-primary/20 flex items-center justify-center">
              <span className="text-primary font-bold text-lg">
                {user?.name?.charAt(0) || 'U'}
              </span>
            </div>
            <div>
              <h1 className="text-white text-base font-bold">{user?.name || 'Utilisateur'}</h1>
              <p className="text-muted-foreground text-sm font-normal">Organisateur</p>
            </div>
          </div>
          <nav className="flex flex-col gap-2">
            {navigationItems.map((item) => (
              <button
                key={item.label}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg text-white hover:bg-muted transition-colors ${
                  item.active ? 'bg-muted' : ''
                }`}
              >
                <item.icon className="h-6 w-6" />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>
        
        <main className="flex-1 p-6">
          <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
            <h2 className="text-white text-3xl font-bold">Vos événements</h2>
            <Button className="flex items-center justify-center gap-2">
              <Plus className="h-5 w-5" />
              <span className="truncate">Créer un événement</span>
            </Button>
          </div>
          
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                className="pl-10 pr-4 w-full max-w-md"
                placeholder="Rechercher des événements"
              />
            </div>
          </div>
          
          <div className="border-b border-border mb-6">
            <nav className="flex gap-8">
              <button className="relative text-white pb-3 text-sm font-bold tracking-wide">
                Tous
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></span>
              </button>
              <button className="text-muted-foreground pb-3 text-sm font-bold tracking-wide hover:text-white">
                En ligne
              </button>
              <button className="text-muted-foreground pb-3 text-sm font-bold tracking-wide hover:text-white">
                Passés
              </button>
            </nav>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-transparent">
                  <th className="px-4 py-3 text-left text-white text-sm font-medium uppercase tracking-wider">
                    Événement
                  </th>
                  <th className="px-4 py-3 text-left text-white text-sm font-medium uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-white text-sm font-medium uppercase tracking-wider">
                    Ventes
                  </th>
                  <th className="px-4 py-3 text-left text-white text-sm font-medium uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-4 py-3 text-left text-white text-sm font-medium uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {mockEvents.map((event) => (
                  <tr key={event.id}>
                    <td className="h-[72px] px-4 py-2 text-white text-sm font-medium">
                      {event.title}
                    </td>
                    <td className="h-[72px] px-4 py-2 text-muted-foreground text-sm">
                      {new Date(event.date).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="h-[72px] px-4 py-2 text-muted-foreground text-sm">
                      {event.sales}/{event.capacity}
                    </td>
                    <td className="h-[72px] px-4 py-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-muted text-white">
                        En ligne
                      </span>
                    </td>
                    <td className="h-[72px] px-4 py-2">
                      <button className="text-primary text-sm font-bold hover:underline">
                        Gérer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  )
}
