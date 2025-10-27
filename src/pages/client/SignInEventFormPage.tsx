import { useEventService } from '@/app/service/event.service';
import EventLayout from '@/components/layout/client/EventLayout';
import { LoadingPage } from '@/config/LoadingPage';
import { usePaymentForm } from '@/hooks/use-form-payment';
import { formatDateToLetters, timeFormat } from '@/lib/date';
import { Lock, TicketCheck } from 'lucide-react';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const SignInEventFormPage = () => {
  /// On va charger les informations les détails d'un formulaire pour payer les tickets.
  const { fetchEvent } = useEventService();
  const { id } = useParams<{ id: string; }>();
  const { data: event, isError, isLoading } = fetchEvent(id);
  const { form, onSubmit, isLoading: isFormLoading, error } = usePaymentForm({
    defaultValues: event ?? undefined,
    isEventLoading: isLoading
  });
  const [ticketCounts, setTicketCounts] = useState<number[]>([]);
  
  const sumPrice = () => {
    return form.getValues('ticketEvents')
      .map(ticketPrice => ticketPrice.quantity * ticketPrice.price)
      .reduce((sum, count) => sum + count, 0);
  };
  const total = sumPrice();
  
  const handleTicketChange = (increment: number, index: number) => {
    if(increment >= 0 && increment <= 10) {
      setTicketCounts(prev => {
        const newCounts = [...prev];
        if(newCounts[index]) {
          newCounts[index] += increment;
        } else {
          newCounts[index] = 0;
          newCounts[index] += increment;
        }

        changeTicketPrice(newCounts[index], index);
        return newCounts;
      });
    }
  };

  const changeTicketPrice = (increment: number, index: number) => {
    console.log('Value', increment);
    form.setValue(`ticketEvents.${index}.quantity`, increment);
    form.trigger(`ticketEvents.${index}.quantity`);
  }

  const totalCountTicket = ticketCounts.reduce((sum, count) => sum + count, 0);

  const handleSubmit = async (formData: FormData) => {
    try {
      const result = await onSubmit(form.getValues());
      toast.success(result.message, {
        position: 'top-center',
        className: 'primary'
      });
      form.reset();
      setTicketCounts([]);
    } catch (err) {
      console.log('Error: ', err);
      toast.error(err as string);
      form.reset();
    }
  };

  if (isError) {
    return (
      <LoadingPage label="Erreur dans le chargement de la donnée !" />
    );
  }

  if (isLoading) {
    return (
      <LoadingPage label='Chargement des événements...' />
    );
  }


  return (
    <EventLayout>
      {/* Main Content */}
      <Toaster />
      <main className="px-4 md:px-10 flex flex-1 justify-center py-5 md:py-10">
        <div className="flex flex-col w-full max-w-6xl flex-1">
          <div className="flex flex-wrap justify-between gap-3 p-4">
            <p className="text-slate-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em] min-w-72">
              Finalisez votre commande
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 mt-6">
            <form action={handleSubmit}>
              {/* Left Column - Summary */}
              <div className="lg:col-span-2 flex flex-col gap-6">
                <div className="bg-white dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
                  <h2 className="text-slate-900 dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] pb-4">
                    Récapitulatif
                  </h2>
                  <div className="flex flex-col gap-4 rounded-lg">
                    <div
                      className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg"
                      style={{
                        backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDoRwktBq7K2jr4TbceMxWs8TBilk9-jxN2bAQPZIHXxDU-JB4SEd0v2q2vwH1HAvDTmH2-UfANIUOKZczo4I8fFSHv-irXi3z2PxOJG6YAzEb0WzRXYL2U6jQEQKOP_ZE28lWTPp51kwVfwVeHsYjkJpJgA9wxjFQ8mOrx1YiNa2EHx5NSxS40-QS7mfto2I2D0cwhwYt57kLSYix9-Tv1Fn7dHW2UuQQnBfCHj-zPbgKO98lx8ltnwBcThhZzfZn4uCto6PKXU3o")'
                      }}
                    ></div>
                    <div className="flex flex-col gap-1">
                      <p className="text-slate-900 dark:text-white text-base font-bold leading-tight">
                        {event?.name}
                      </p>
                      <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal">
                        {formatDateToLetters(event?.start_date)} à partir de {timeFormat(event?.start_date)}
                      </p>
                      <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal">
                        {event?.address}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-slate-200 dark:border-slate-800 pt-4">
                    {
                      event?.ticket_prices.map((ticket, index) => (
                        <div key={index} className="flex gap-4 py-3 justify-between items-center">
                          <div className="flex items-start gap-4">
                            <div className="text-primary flex items-center justify-center rounded-lg bg-primary/20 shrink-0 size-12">
                              <TicketCheck />
                            </div>
                            <div className="flex flex-1 flex-col justify-center">
                              <p className="text-slate-900 dark:text-white text-base font-medium leading-normal">
                                {ticket.name}
                              </p>
                              <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal">
                                {ticket.price} {process.env.VITE_CURRENCY} / billet
                              </p>
                            </div>
                          </div>
                          <div className="shrink-0">
                            <div className="flex items-center gap-2 text-slate-900 dark:text-white">
                              <button
                                type="button"
                                onClick={() => handleTicketChange(-1, index)}
                                className="text-base font-medium leading-normal flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer transition-colors"
                              >
                                -
                              </button>
                              <input
                                {...form.register(`ticketEvents.${index}.quantity`, { valueAsNumber: true })}
                                className="text-base font-medium leading-normal w-4 p-0 text-center bg-transparent focus:outline-0 focus:ring-0 focus:border-none border-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                type="number"
                                min="1"
                                max="10"
                              />
                              <button
                                type="button"
                                onClick={() => handleTicketChange(1, index)}
                                className="text-base font-medium leading-normal flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer transition-colors"
                              >
                                +
                              </button>
                            </div>
                            {form.formState.errors.ticketEvents && (
                              <p className="text-red-500 text-xs mt-1">{form.formState.errors.ticketEvents.message}</p>
                            )}
                          </div>
                        </div>
                      ))
                    }
                  </div>

                  <div className="mt-4 border-t border-slate-200 dark:border-slate-800 pt-4 flex flex-col gap-2">
                    <div className="flex justify-between text-base font-bold text-slate-900 dark:text-white mt-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                      <span>Total</span>
                      <span>{total.toFixed(2)} { process.env.VITE_CURRENCY }</span>
                    </div>
                  </div>
                </div>

                <footer className="text-center text-xs text-slate-500 dark:text-slate-500 px-6">
                  <a className="hover:underline" href="#">Conditions Générales</a> •{' '}
                  <a className="hover:underline" href="#">Politique de Confidentialité</a>
                  <p className="mt-2 flex items-center justify-center gap-1.5">
                    <Lock /> Paiement 100% sécurisé
                  </p>
                </footer>
              </div>

              {/* Right Column - Forms */}
              <div className="lg:col-span-3 flex flex-col gap-8">
                {/* Buyer Information */}
                <div className="bg-white dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
                  <h2 className="text-slate-900 dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] mb-5">
                    1. Informations de l'acheteur
                  </h2>
                  <div className="mb-6 space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-slate-100 dark:bg-slate-800">
                      <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Nombre de tickets</span>
                      <span className="text-sm font-semibold text-slate-900 dark:text-white">{totalCountTicket}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div>
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="name">
                        Nom complet
                      </label>
                      <input
                        {...form.register('fullname')}
                        className="mt-1 block w-full rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-primary focus:ring-primary/50 text-sm"
                        id="fullname"
                        placeholder="Marie Dubois"
                        type="text"
                      />
                      {form.formState.errors.fullname && (
                        <p className="text-red-500 text-xs mt-1">{form.formState.errors.fullname.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="email">
                        Adresse e-mail
                      </label>
                      <input
                        {...form.register('email')}
                        className="mt-1 block w-full rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-primary focus:ring-primary/50 text-sm"
                        id="email"
                        placeholder="marie.dubois@email.com"
                        type="email"
                      />
                      {form.formState.errors.email && (
                        <p className="text-red-500 text-xs mt-1">{form.formState.errors.email.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="phone">
                        Contact (numéro de téléphone)
                      </label>
                      <input
                        {...form.register(`contacts.${0}`)}
                        className="mt-1 block w-full rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-primary focus:ring-primary/50 text-sm"
                        id="phone"
                        placeholder="+225.07.89.84.36.22"
                        type="tel"
                      />
                      {form.formState.errors.contacts && (
                        <p className="text-red-500 text-xs mt-1">{form.formState.errors.contacts.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 bg-primary text-white gap-2 text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors focus:ring-4 focus:ring-primary/50"
                >
                  S'inscrire à l'évenement { event?.name } et payer {total.toFixed(2)} { process.env.VITE_CURRENCY } 
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </EventLayout>
  );
};

export default SignInEventFormPage;