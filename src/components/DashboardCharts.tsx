import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'

const salesData = [
  { name: 'Jan', sales: 4000, tickets: 240 },
  { name: 'Fév', sales: 3000, tickets: 139 },
  { name: 'Mar', sales: 2000, tickets: 980 },
  { name: 'Avr', sales: 2780, tickets: 390 },
  { name: 'Mai', sales: 1890, tickets: 480 },
  { name: 'Jun', sales: 2390, tickets: 380 },
]

const eventCategories = [
  { name: 'Tech', value: 45, color: '#38e07b' },
  { name: 'Musique', value: 30, color: '#3b82f6' },
  { name: 'Sports', value: 15, color: '#f59e0b' },
  { name: 'Autres', value: 10, color: '#ef4444' },
]

const recentEvents = [
  { name: 'Conférence Tech 2024', attendees: 150, revenue: 22500 },
  { name: 'Festival de Musique', attendees: 500, revenue: 37500 },
  { name: 'Atelier Photo', attendees: 80, revenue: 6400 },
  { name: 'Salon Emploi', attendees: 200, revenue: 9000 },
]

export function DashboardCharts() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {/* Sales Chart */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="text-white">Ventes mensuelles</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#3d5245" />
              <XAxis dataKey="name" stroke="#9eb7a8" />
              <YAxis stroke="#9eb7a8" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1a231d', 
                  border: '1px solid #3d5245',
                  borderRadius: '8px',
                  color: '#ffffff'
                }} 
              />
              <Bar dataKey="sales" fill="#38e07b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Event Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="text-white">Catégories d'événements</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={eventCategories}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name }) => `${name} ${(0.54 * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {eventCategories.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1a231d', 
                  border: '1px solid #3d5245',
                  borderRadius: '8px',
                  color: '#ffffff'
                }} 
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Revenue Trend */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="text-white">Tendance des revenus</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#3d5245" />
              <XAxis dataKey="name" stroke="#9eb7a8" />
              <YAxis stroke="#9eb7a8" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1a231d', 
                  border: '1px solid #3d5245',
                  borderRadius: '8px',
                  color: '#ffffff'
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="sales" 
                stroke="#38e07b" 
                strokeWidth={2}
                dot={{ fill: '#38e07b', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Events Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="text-white">Performance récente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentEvents.map((event, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-white">{event.name}</p>
                  <p className="text-xs text-muted-foreground">{event.attendees} participants</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-primary">{event.revenue.toLocaleString()}€</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
