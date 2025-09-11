import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useEventStore } from '@/stores/eventStore'

export function EventFormPage() {
  const { addEvent } = useEventStore()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    price: '',
    category: 'tech' as const,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addEvent({
      title: formData.title,
      description: formData.description,
      date: formData.date,
      time: formData.time,
      location: formData.location,
      price: parseFloat(formData.price),
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop',
      category: formData.category,
      status: 'active',
      sales: 0,
      capacity: 100,
    })
    // Reset form
    setFormData({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      price: '',
      category: 'tech',
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-background">
      <header className="flex items-center justify-between whitespace-nowrap border-b border-border px-10 py-3">
        <div className="flex items-center gap-4 text-white">
          <div className="size-6 text-primary">
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z" fill="currentColor"></path>
            </svg>
          </div>
          <h2 className="text-white text-xl font-bold leading-tight tracking-[-0.015em]">Eventify</h2>
        </div>
        <nav className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <a className="hover:text-white transition-colors" href="/">Explorer</a>
          <a className="text-white font-semibold" href="/create">Créer un événement</a>
          <a className="hover:text-white transition-colors" href="/dashboard">Mes événements</a>
        </nav>
      </header>
      
      <main className="flex flex-1 justify-center py-10 px-4">
        <div className="w-full max-w-2xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Créer un événement
            </h1>
            <p className="mt-3 text-lg text-muted-foreground">
              Remplissez les informations ci-dessous pour mettre votre événement en ligne.
            </p>
          </div>
          
          <Card className="bg-card">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium leading-6 text-foreground mb-2" htmlFor="title">
                    Titre de l'événement
                  </label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="ex: Conférence Tech 2024"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium leading-6 text-foreground mb-2" htmlFor="description">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    className="flex min-h-[80px] w-full rounded-xl border border-input bg-card px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Décrivez votre événement en détail"
                    rows={4}
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium leading-6 text-foreground mb-2" htmlFor="date">
                      Date
                    </label>
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium leading-6 text-foreground mb-2" htmlFor="time">
                      Heure
                    </label>
                    <Input
                      id="time"
                      name="time"
                      type="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium leading-6 text-foreground mb-2" htmlFor="location">
                    Lieu
                  </label>
                  <Input
                    id="location"
                    name="location"
                    placeholder="ex: Centre des congrès, Ville"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium leading-6 text-foreground mb-2" htmlFor="price">
                    Prix
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="text-muted-foreground sm:text-sm">€</span>
                    </div>
                    <Input
                      id="price"
                      name="price"
                      placeholder="25.00"
                      className="pl-7"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium leading-6 text-foreground mb-2" htmlFor="category">
                    Catégorie
                  </label>
                  <select
                    id="category"
                    name="category"
                    className="flex h-10 w-full rounded-xl border border-input bg-card px-4 py-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="tech">Tech</option>
                    <option value="music">Musique</option>
                    <option value="sports">Sports</option>
                  </select>
                </div>
                
                <div className="flex items-center justify-end gap-x-6 pt-4">
                  <Button type="button" variant="ghost">
                    Annuler
                  </Button>
                  <Button type="submit">
                    Créer l'événement
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
