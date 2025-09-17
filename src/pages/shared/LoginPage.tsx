import React, { useState } from 'react';
import EventLayout from '@/components/layout/client/EventLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Gérer la soumission du formulaire ici
    console.log('Email:', email, 'Password:', password);
  };

  return (
    <EventLayout classname={'min-h-screen bg-event-background text-event-foreground'}>
      {/* Main Content */}
      <main className="flex flex-1 justify-center items-center py-10">
        <Card className="w-full max-w-md p-8 rounded-2xl shadow-xl">
          <CardHeader className="p-0 mb-2">
            <h2 className="text-event-foreground text-3xl font-bold text-center">Connexion</h2>
          </CardHeader>
          <CardContent className="p-0">
            <p className="text-event-muted-foreground text-center mb-8">Accédez à votre compte organisateur.</p>
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2">
                <label className="text-event-foreground text-base font-medium" htmlFor="email">
                  Email
                </label>
                <Input
                  className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl h-14 p-4 text-base font-normal transition-colors bg-white border-gray-300 text-event-foreground placeholder:text-gray-400 focus:border-event-primary focus:ring-event-primary"
                  id="email"
                  placeholder="exemple@email.com"
                  type="email"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-event-foreground text-base font-medium" htmlFor="password">
                  Mot de passe
                </label>
                <Input
                  className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl h-14 p-4 text-base font-normal transition-colors bg-white border-gray-300 text-event-foreground placeholder:text-gray-400 focus:border-event-primary focus:ring-event-primary"
                  id="password"
                  placeholder="••••••••"
                  type="password"
                />
              </div>
              <a
                className="text-sm font-normal text-right text-event-muted-foreground hover:text-event-accent hover:underline transition-colors"
                href="#"
              >
                Mot de passe oublié ?
              </a>
              <Button
                type="submit"
                className="flex min-w-[84px] w-full items-center justify-center rounded-full h-14 px-4 text-lg font-bold leading-normal tracking-[0.015em] transition-colors bg-event-primary hover:bg-event-primary-dark text-white"
              >
                <span className="truncate">Se connecter</span>
              </Button>
              <p className="text-center text-sm font-normal text-event-muted-foreground">
                Vous n'avez pas de compte ?{" "}
                <a
                  className="font-medium text-event-secondary hover:underline"
                  href="#"
                >
                  Inscrivez-vous
                </a>
              </p>
            </form>
          </CardContent>
        </Card>
      </main>
    </EventLayout>
  );
};

export default LoginPage;