import React from 'react';
import EventLayout from '@/components/layout/client/EventLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useAuthStore } from '@/stores/authStore';
import { type SignUpFormData, signUpSchema } from '@/app/schema/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';

const RegisterPage: React.FC = () => {
  const { signup , isLoading, error } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      contacts: [],
      role: 'USER'
    },
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      // Sign Up to the application.
      const message = await signup(data);
      toast.success(message, {
        position: 'top-center'
      })
    } catch (err) {
      // Les erreurs sont déjà gérées dans le store
      const errorMessage = err as string;
      toast.error(errorMessage, {
        position: 'top-center'
      });
      console.error('Erreur de connexion:', err);
    }
  };

  return (
    <EventLayout classname={'min-h-screen bg-event-background text-event-foreground'}>
      {/* Main Content */}
      <Toaster />
      <main className="flex flex-1 justify-center items-center py-10">
        <Card className="w-full max-w-md p-8 rounded-2xl shadow-xl">
          <CardHeader className="p-0 mb-2">
            <h2 className="text-event-foreground text-3xl font-bold text-center">Inscription</h2>
          </CardHeader>
          <CardContent className="p-0">
            <p className="text-event-muted-foreground text-center mb-8">Créer un compte utilisateur.</p>

            {/* Affichage des erreurs globales */}
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-2">
                <label className="text-event-foreground text-base font-medium" htmlFor="email">
                  Nom complet
                </label>
                <Input
                  {...register('name')}
                  className={`
                    flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl h-14 p-4 text-base font-normal transition-colors bg-white border-gray-300 text-event-foreground placeholder:text-gray-400 focus:border-event-primary focus:ring-event-primary
                    ${
                      errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                    }  
                  `}
                  id="fullname"
                  placeholder="Ex: Konan Damien"
                  type="text"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-event-foreground text-base font-medium" htmlFor="email">
                  Contacts
                </label>
                <Input
                  {...register('contacts.0')}
                  className={`
                    flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl h-14 p-4 text-base font-normal transition-colors bg-white border-gray-300 text-event-foreground placeholder:text-gray-400 focus:border-event-primary focus:ring-event-primary
                    ${
                      errors.contacts ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                    }  
                  `}
                  id="fullname"
                  placeholder="Ex: 0707892110"
                  type="text"
                />
                {errors.contacts && (
                  <p className="text-red-500 text-sm mt-1">{errors.contacts.message}</p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-event-foreground text-base font-medium" htmlFor="email">
                  Email
                </label>
                <Input
                  {...register('email')}
                  className={`
                    flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl h-14 p-4 text-base font-normal transition-colors bg-white border-gray-300 text-event-foreground placeholder:text-gray-400 focus:border-event-primary focus:ring-event-primary
                    ${
                      errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                    }  
                  `}
                  id="email"
                  placeholder="exemple@email.com"
                  type="email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-event-foreground text-base font-medium" htmlFor="password">
                  Mot de passe
                </label>
                <Input
                  {...register('password')}
                  className={`
                    flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl h-14 p-4 text-base font-normal transition-colors bg-white border-gray-300 text-event-foreground placeholder:text-gray-400 focus:border-event-primary focus:ring-event-primary
                    ${
                      errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                    }   
                  `}
                  id="password"
                  placeholder="••••••••"
                  type="password"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                )}
              </div>
              <a
                className="text-sm font-normal text-right text-event-muted-foreground hover:text-event-accent hover:underline transition-colors"
                href="#"
              >
                Mot de passe oublié ?
              </a>
              <Button
                type="submit"
                disabled={isLoading}
                className="flex min-w-[84px] w-full items-center justify-center rounded-full h-14 px-4 text-lg font-bold leading-normal tracking-[0.015em] transition-colors bg-event-primary hover:bg-event-primary-dark text-white"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Connexion...</span>
                  </div>
                ) : (
                  <span className="truncate">S'inscrire</span>
                )}
              </Button>
              <p className="text-center text-sm font-normal text-event-muted-foreground">
                Vous avez un compte ?{" "}
                <Link
                  className="font-medium text-event-secondary hover:underline"
                  to={'/login'}
                >
                  Connectez-vous !
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </main>
    </EventLayout>
  );
};

export default RegisterPage;