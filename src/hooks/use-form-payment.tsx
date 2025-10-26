// hooks/useEventForm.ts
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore } from '@/stores/authStore';
import { initPaymentFormSchema, type InitPaymentFormData, type PriceTicketWithQuantity } from '@/app/schema/payment.schema';
import { usePaymentStore } from '@/stores/paymentStore';
import type { EventDto } from '@/app/model/event.model';
import { useEffect } from 'react';

interface UsePaymentFormProps {
  defaultValues?: Partial<EventDto>;
  isEventLoading: boolean;
}

export const usePaymentForm = ({ defaultValues, isEventLoading }: UsePaymentFormProps) => {
  const { createPayment, isLoading, error, clearError } = usePaymentStore();
  const { user } = useAuthStore();

  const form = useForm<InitPaymentFormData>({
    resolver: zodResolver(initPaymentFormSchema),
    defaultValues: {
      event_id: '',
      client_id: '',
      email: '',
      fullname: '',
      contacts: [],
      ticketEvents: [],
    },
  });


  useEffect(() => {
    console.log('Initiatilisation');
    if(!isEventLoading && defaultValues) {
        form.reset({
            event_id: defaultValues?.id,
            client_id: user?.id ? user.id : '',
            email: user?.email ? user.email : '',
            fullname: user?.fullname ? user.fullname : '',
            contacts: user?.contacts ? user.contacts : [],
            ticketEvents: defaultValues?.ticket_prices ? defaultValues.ticket_prices.map(ticket => ({
                ...ticket,
                quantity: 0
            })) : [], 
        });
        console.log('Réinitialisation du formulaire', form.getValues());
    }
  }, [isLoading, defaultValues]);
  
  const onSubmit = async (data: InitPaymentFormData): Promise<any> => {
    try {
      return await createPayment(data);
    } catch (err) {
      // L'erreur est déjà gérée dans le store
      console.error('Erreur lors de la création:', err);
    }
  };

  const addPriceTicketWithQuantity = (ticketPaid: Omit<PriceTicketWithQuantity, 'id'>) => {
    const tickets = form.getValues('ticketEvents');
    const newPayment = {
      ...ticketPaid,
    };
    form.setValue('ticketEvents', [...tickets, newPayment], {
      shouldValidate: true,
    });
  };

  const updatePriceTicketWithQuantity = (id: string, category: Partial<PriceTicketWithQuantity>) => {
    const currentCategories = form.getValues('ticketEvents');
    form.setValue('ticketEvents', currentCategories, {
      shouldValidate: true,
    });
  };

  const removePriceTicketWithQuantity = (id: string) => {
    const currentCategories = form.getValues('ticketEvents');
    form.setValue('ticketEvents', currentCategories, {
      shouldValidate: true,
    });
  };

  return {
    form,
    onSubmit,
    isLoading,
    error,
    clearError,
    addPriceTicketWithQuantity,
    updatePriceTicketWithQuantity,
    removePriceTicketWithQuantity
  };
};