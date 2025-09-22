import React, { useActionState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import Layout from '@/components/layout/client/EventLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import EventForm from './EventForm';
import SubEventsForm from './SubEventsForm';
import CodeQrVisualizer from './CodeQrVisualizer';
import BadgeVisualizer from './BadgeVisualizer';

const EventFormPage: React.FC = () => {
  const [error, submitAction, isPending] = useActionState(
    async (previousState: any, formData: any) => {
      console.log("Submitted form !");
      return null;
    },
    null,
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="w-full max-w-2xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-event-foreground sm:text-5xl">
              Créer un événement
            </h1>
            <p className="mt-3 text-lg text-event-muted-foreground">
              Remplissez les informations ci-dessous pour mettre votre événement en ligne.
            </p>
          </div>

          <form action={submitAction}>
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
                      <EventForm />
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="sub-events">
                  <Card className="p-6">
                    <CardContent className="p-0">
                      <SubEventsForm />
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
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default EventFormPage;