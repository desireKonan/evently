import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useAuthStore } from '@/stores/authStore'
import { Link } from 'react-router-dom'

export function Header() {
    const { user, isAuthenticated } = useAuthStore()

    return (
        <header className="sticky top-0 z-10 bg-event-background/80 backdrop-blur-sm shadow-md">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center gap-8">
                        <a className="flex items-center gap-2 text-foreground" href="#">
                            <svg className="h-8 w-8 text-event-primary" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path clipRule="evenodd" d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z" fill="currentColor" fillRule="evenodd"></path>
                                <path clipRule="evenodd" d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z" fill="currentColor" fillRule="evenodd"></path>
                            </svg>
                            <h1 className="text-xl font-bold">Evently</h1>
                        </a>
                        <nav className="hidden md:flex items-center gap-6">
                            <a className="text-sm font-medium text-muted-foreground hover:text-event-primary transition-colors" href="#">Explorer</a>
                            <a className="text-sm font-medium text-muted-foreground hover:text-event-primary transition-colors" href="#">Créer un événement</a>
                            <a className="text-sm font-medium text-muted-foreground hover:text-event-primary transition-colors" href="#">Mes événements</a>
                        </nav>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="hidden sm:block">
                            <div className="relative">
                                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                                </svg>
                                <Input
                                    type="search"
                                    placeholder="Rechercher..."
                                    className="pl-10 w-full rounded-full bg-event-background"
                                />
                            </div>
                        </div>
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                            </svg>
                        </Button>
                        {isAuthenticated && user ? (
                            <div className="relative">
                                <Button variant="ghost" size="icon" className="rounded-full">
                                    <div className="h-8 w-8 rounded-full bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB6iKZYyzouXGNiuaS6VKlOZ2aX32iJ79O26KJvWJlhT8brZTgDqGH1yFMzxTqo7vIr0PfBNUJ9YHmTadeAoF_oCy9M0M9T6I1yWEAEbM-4LUB4gJPW7A07oim224s8ND2zDglZx1vwgbWf5FOULIQtQJ94dh9oTyADXTkI0-AtIQmYH3YHeAkMB7aVilsNwlqUbzMHh1pPP2XBE_-KUC72sLk1oGXFKubW5XUePXTxCPtygKRsSZ5YJZ7QP2ycdgDEUd0RN8edzkI")' }}></div>
                                </Button>
                            </div>
                        ) : (
                            <div className="flex gap-2">
                                <Link to="/login" className="flex min-w-[100px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-6 bg-transparent border-2 border-[#27ae60] text-[#27ae60] hover:bg-[#27ae60] hover:text-[#111714] text-base font-bold leading-normal tracking-[0.015em] transition-colors">
                                    <span className="truncate">S'inscrire</span>
                                </Link>
                                <Link to="/login" className="flex min-w-[100px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-6 bg-[#27ae60] text-[#111714] hover:bg-opacity-80 text-base font-bold leading-normal tracking-[0.015em] transition-colors">
                                    <span className="truncate">Connexion</span>
                                </Link>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </header>
    )
}