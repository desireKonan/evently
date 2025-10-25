import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import Layout from '@/components/layout/client/EventLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import EventForm from './form/EventForm';
import SubEventsForm from './form/SubEventsForm';
import CodeQrVisualizer from './form/CodeQrVisualizer';
import BadgeVisualizer from './form/BadgeVisualizer';
import { useEventForm } from '@/hooks/use-form-event';
import { Button } from '@/components/ui/button';
import { useNavigate, useParams } from 'react-router-dom';
import { useEventService } from '@/app/service/event.service';
import { ArrowLeft, Edit } from 'lucide-react';
import type { EventDto } from '@/app/model/event.model';
import { LoadingPage } from '@/config/LoadingPage';

type EventFormPageMode = 'create' | 'edit' | 'view';

const EventFormPage: React.FC = () => {
  const navigate = useNavigate();
  const { fetchEvent } = useEventService();
  const { id } = useParams<{ id: string }>();
  const mode: EventFormPageMode = id ? (window.location.pathname.includes('/edit') ? 'edit' : 'view') : 'create';
  const { data, isLoading: isEventLoading, isError } = fetchEvent(id);
  const isReadOnly = mode === 'view';
  
  const { form, onSubmit, isLoading, error } = useEventForm({
    defaultValues: (!isEventLoading && mode !== 'create') ? data as EventDto : undefined
  });
  

  const handleSubmit = async (_: FormData) => {
    try {
      await onSubmit(form.getValues());
      form.reset();
      navigate('/dashboard', {
        state: {
          message: 'Evénement crée avec succès !'
        }
      });
    } catch (err) {
      form.reset();
      navigate('/dashboard', {
        state: {
          message: error || 'Erreur lors de la création de l\'évenement!'
        }
      });
    }
  };

  const getPageTitle = () => {
    switch (mode) {
      case 'edit':
        return 'Modifier l\'événement';
      case 'view':
        return 'Détails de l\'événement';
      default:
        return 'Créer un événement';
    }
  };

  const getPageDescription = () => {
    switch (mode) {
      case 'edit':
        return 'Modifiez les informations de votre événement ci-dessous.';
      case 'view':
        return 'Consultez les détails de votre événement.';
      default:
        return 'Remplissez les informations ci-dessous pour mettre votre événement en ligne.';
    }
  };

  const handleCancel = () => {
    form.reset();
    navigate(-1);
  };

  const handleEdit = () => {
    navigate(`/event/${id}/edit`);
  };


  if(isError) {
    return (
      <LoadingPage label="Erreur dans le chargement de la donnée !" />
    );
  }

  /// On afficher les données.
  if(isEventLoading) {
    return <LoadingPage label="Formulaire n'est pas encore chargée" />;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="w-full max-w-2xl mx-auto">
          {/* Header avec bouton retour */}
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-event-foreground hover:text-event-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour
            </Button>

            {/* Bouton Éditer en mode visualisation */}
            {mode === 'view' && (
              <Button
                onClick={handleEdit}
                className="flex items-center gap-2 bg-event-primary text-white hover:bg-event-secondary"
              >
                <Edit className="h-4 w-4" />
                Modifier
              </Button>
            )}
          </div>


          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-event-foreground sm:text-5xl">
              {getPageTitle()}
            </h1>
            <p className="mt-3 text-lg text-event-muted-foreground">
              {getPageDescription()}
            </p>
          </div>

          {/* Affichage des erreurs globales */}
          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {form.formState.errors.root && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {form.formState.errors.root.message}
            </div>
          )}

          <form action={handleSubmit}>
            <div className="sticky top-16 z-[9] bg-event-background/80 backdrop-blur-sm -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-4">
              <Tabs className="w-full space-y-5">
                <TabsList className="w-full justify-start border-b border-border rounded-none bg-transparent p-0 h-auto">
                  <TabsTrigger value="event" className="rounded-none border-b-2 data-[state=active]:border-event-primary data-[state=active]:text-event-primary data-[state=active]:shadow-none py-4 px-5 text-sm font-medium">Informations sur l'evenement</TabsTrigger>
                  <TabsTrigger value="sub-events" className="rounded-none border-b-2 data-[state=active]:border-event-primary data-[state=active]:text-event-primary data-[state=active]:shadow-none py-4 px-5 text-sm font-medium">Informations sur les sous activites</TabsTrigger>
                  <TabsTrigger value="code-qr" className="rounded-none border-b-2 data-[state=active]:border-event-primary data-[state=active]:text-event-primary data-[state=active]:shadow-none py-4 px-5 text-sm font-medium">Code QR</TabsTrigger>
                  <TabsTrigger value="badge" className="rounded-none border-b-2 data-[state=active]:border-event-primary data-[state=active]:text-event-primary data-[state=active]:shadow-none py-4 px-5 text-sm font-medium">Badge</TabsTrigger>
                </TabsList>
                <TabsContent value="event">
                  <Card className="p-6">
                    <CardContent className="p-0">
                      <EventForm form={form} isReadOnly={isReadOnly} />
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="sub-events">
                  <Card className="p-6">
                    <CardContent className="p-0">
                      <SubEventsForm form={form} isReadOnly={isReadOnly} />
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="code-qr">
                  <Card className="p-6">
                    <CardContent className="p-0">
                      <CodeQrVisualizer />
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="badge">
                  <Card className="p-6">
                    <CardContent className="p-0">
                      <BadgeVisualizer />
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              {
                !isReadOnly && (
                  <div className="flex items-center justify-end gap-x-6 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCancel}
                      disabled={isLoading}
                      className="text-sm font-semibold leading-6 text-event-foreground hover:text-gray-600 transition-colors"
                    >
                      Annuler
                    </Button>
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="rounded-full bg-event-primary px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-event-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-event-primary transition-colors"
                    >
                      { isLoading 
                          ? (mode === 'edit' ? 'Modification...' : 'Création...') 
                          : (mode === 'edit' ? 'Modifier l\'événement' : 'Créer l\'événement')
                      }
                    </Button>
                  </div>
                )
              }
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default EventFormPage;