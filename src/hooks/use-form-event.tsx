// hooks/useEventForm.ts
import { useForm } from 'react-hook-form';
import { eventFormSchema, type EventFormData, type PriceTicket } from '@/app/schema/event.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEventStore } from '@/stores/eventStore';
import { useAuthStore } from '@/stores/authStore';
import type { EventDto } from '@/app/model/event.model';

interface UseEventFormProps {
  defaultValues?: Partial<EventDto>;
}

export const useEventForm = ({ defaultValues }: UseEventFormProps = {}) => {
  const { createEvent, isLoading, error, clearError } = useEventStore();
  const { isAuthenticated } = useAuthStore();

  const form = useForm<EventFormData>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      name: defaultValues?.name ? defaultValues.name : '',
      description: defaultValues?.description ? defaultValues.description :  '',
      place: defaultValues?.place ? defaultValues.place :  '',
      address: defaultValues?.name ? defaultValues.name :  '',
      organizer_id: defaultValues?.organizer_id ? defaultValues.organizer_id : '',
      type: defaultValues?.type ? defaultValues.type : 'B2B',
      limit: defaultValues?.limit ? defaultValues.limit : 10,
      images: defaultValues?.image_path ? [ new File([], defaultValues.image_path) ] : [],
      ticket_prices: defaultValues?.ticket_prices ? defaultValues.ticket_prices : [],
      sub_events: defaultValues?.sub_events ? defaultValues.sub_events : [],
      start_date: defaultValues?.start_date ? defaultValues.start_date : new Date(),
      end_date: defaultValues?.end_date ? defaultValues.end_date : new Date()
    },
  });
  
  const onSubmit = async (data: EventFormData) => {
    if (!isAuthenticated) {
      form.setError('root', {
        message: 'Vous devez être connecté pour créer un événement',
      });
      return;
    }

    try {
      await createEvent(data);
      // Redirection ou message de succès peut être géré ici
    } catch (err) {
      // L'erreur est déjà gérée dans le store
      console.error('Erreur lors de la création:', err);
    }
  };

  const addPriceTicket = (category: Omit<PriceTicket, 'id'>) => {
    const currentCategories = form.getValues('ticket_prices');
    const newCategory = {
      ...category,
    };
    form.setValue('ticket_prices', [...currentCategories, newCategory], {
      shouldValidate: true,
    });
  };

  const updatePricingCategory = (id: string, category: Partial<PriceTicket>) => {
    const currentCategories = form.getValues('ticket_prices');
    form.setValue('ticket_prices', currentCategories, {
      shouldValidate: true,
    });
  };

  const removePricingCategory = (id: string) => {
    const currentCategories = form.getValues('ticket_prices');
    form.setValue('ticket_prices', currentCategories, {
      shouldValidate: true,
    });
  };

  const addSubEvents = (subEvents: string[]) => {
    form.setValue('sub_events', subEvents, {
      shouldValidate: true,
    });
  };

  return {
    form,
    onSubmit,
    isLoading,
    error,
    clearError,
    addPriceTicket,
    updatePricingCategory,
    removePricingCategory,
    addSubEvents,
  };
};