import { useAuthStore } from "@/stores/authStore";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export function Header() {
  const { user, isAuthenticated } = useAuthStore();

  return (
    <header className="sticky top-0 z-20 bg-event-background/90 backdrop-blur-sm shadow-md">
      <div className="container h-auto mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link
              className="flex items-center gap-2 text-foreground"
              to="/"
            ></Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link
                className="text-sm font-medium text-muted-foreground hover:text-event-primary transition-colors"
                to="/explore"
              >
                Explorer
              </Link>
              <Link
                className="text-sm font-medium text-muted-foreground hover:text-event-primary transition-colors"
                to="/create/event"
              >
                Créer un événement
              </Link>
              <Link
                className="text-sm font-medium text-muted-foreground hover:text-event-primary transition-colors"
                to="/"
              >
                Mes événements
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:block">
              <div className="relative">
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  ></path>
                </svg>
                <Input
                  type="search"
                  placeholder="Rechercher..."
                  className="pl-10 w-full rounded-full bg-event-background"
                />
              </div>
            </div>
            <Button variant="ghost" size="icon" className="rounded-full">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                ></path>
              </svg>
            </Button>
            {isAuthenticated && user ? (
              <div className="relative">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <div
                    className="h-8 w-8 rounded-full bg-cover bg-center"
                    style={{
                      backgroundImage:
                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB6iKZYyzouXGNiuaS6VKlOZ2aX32iJ79O26KJvWJlhT8brZTgDqGH1yFMzxTqo7vIr0PfBNUJ9YHmTadeAoF_oCy9M0M9T6I1yWEAEbM-4LUB4gJPW7A07oim224s8ND2zDglZx1vwgbWf5FOULIQtQJ94dh9oTyADXTkI0-AtIQmYH3YHeAkMB7aVilsNwlqUbzMHh1pPP2XBE_-KUC72sLk1oGXFKubW5XUePXTxCPtygKRsSZ5YJZ7QP2ycdgDEUd0RN8edzkI")',
                    }}
                  ></div>
                </Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link
                  to="/register"
                  className="flex min-w-[100px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-6 bg-transparent border-2 border-[#27ae60] text-[#27ae60] hover:bg-[#27ae60] hover:text-[#111714] text-base font-bold leading-normal tracking-[0.015em] transition-colors"
                >
                  <span className="truncate">S'inscrire</span>
                </Link>
                <Link
                  to="/login"
                  className="flex min-w-[100px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-6 bg-[#27ae60] text-[#111714] hover:bg-opacity-80 text-base font-bold leading-normal tracking-[0.015em] transition-colors"
                >
                  <span className="truncate">Connexion</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
