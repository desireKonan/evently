import { Search, Bell, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuthStore } from '@/stores/authStore'

export function Header() {
  const { user, isAuthenticated } = useAuthStore()

  return (
    <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <a className="flex items-center gap-2 text-white" href="/">
              <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path clipRule="evenodd" d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z" fill="currentColor" fillRule="evenodd"></path>
                <path clipRule="evenodd" d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z" fill="currentColor" fillRule="evenodd"></path>
              </svg>
              <h1 className="text-xl font-bold">Evently</h1>
            </a>
            <nav className="hidden md:flex items-center gap-6">
              <a className="text-sm font-medium text-muted-foreground hover:text-white transition-colors" href="/explore">
                Explorer
              </a>
              <a className="text-sm font-medium text-muted-foreground hover:text-white transition-colors" href="/create">
                Créer un événement
              </a>
              <a className="text-sm font-medium text-muted-foreground hover:text-white transition-colors" href="/dashboard">
                Mes événements
              </a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  className="pl-10 pr-3 w-64"
                  placeholder="Rechercher..."
                  type="search"
                />
              </div>
            </div>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-6 w-6" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-primary rounded-full"></span>
            </Button>
            {isAuthenticated && user ? (
              <div className="relative">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-8 w-8 rounded-full"
                  />
                </Button>
              </div>
            ) : (
              <Button variant="default">
                Se connecter
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
