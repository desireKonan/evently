import { z } from "zod";
import type { EventType } from "../model/event.model";

export const priceTicketSchema = z.object({
  name: z.string().min(1, "Le nom de la catégorie est requis"),
  description: z.string().optional(),
  price: z.number().int().min(0, "La quantité doit être positive"),
});

export const promotionalFormuleSchema = z.object({
  name: z.string().min(1, "Le nom de la catégorie est requis"),
  rate: z.number().optional(),
  start_date: z.date(),
  end_date: z.date(),
});

export const eventFormSchema = z.object({
  name: z.string(),
  description: z.string(),
  limit: z.number()
    .positive("Le prix doit être positif")
    .min(1, "Le nombre de place doit être limité")
    .optional(),
  place: z.string().optional(),
  address: z.string().optional(),
  type: z.enum([
    "CONFERENCE",
    "SEMINAR",
    "LIVING_ROOM",
    "WORKSHOP",
    "WEBINAR",
    "B2B",
    "FORUM",
    "GALA_DINNER",
    "PRIVATE_EVENING",
    "OTHER",
  ] as const).optional(),
  start_date: z.date(),
  end_date: z.date(),
  organizer_id: z.string(),
  images: z.array(z.instanceof(File)).optional(),
  ticket_prices: z
    .array(priceTicketSchema)
    .min(1, "Au moins une catégorie de prix est requise"),
  promotional_formule: z.object(promotionalFormuleSchema).optional(),
  sub_events: z.array(z.string()).optional(),
});

export type EventFormData = z.infer<typeof eventFormSchema>;
export type PriceTicket = z.infer<typeof priceTicketSchema>;
export type PromotionalFormule = z.infer<typeof promotionalFormuleSchema>;


// Map pour les labels d'affichage
export const eventTypeLabels: Record<EventType, string> = {
  CONFERENCE: 'Conférence',
  SEMINAR: 'Séminaire',
  LIVING_ROOM: 'Salon',
  WORKSHOP: 'Atelier',
  WEBINAR: 'Webinaire',
  B2B: 'Rencontre B2B',
  FORUM: 'Forum',
  GALA_DINNER: 'Dîner de gala',
  PRIVATE_EVENING: 'Soirée privée',
  OTHER: 'Autre'
};

// Map pour les descriptions
export const eventTypeDescriptions: Record<EventType, string> = {
  CONFERENCE: 'Événement avec des présentations et des experts',
  SEMINAR: 'Session de formation interactive',
  LIVING_ROOM: 'Événement networking dans un cadre informel',
  WORKSHOP: 'Session pratique avec exercices',
  WEBINAR: 'Événement en ligne interactif',
  B2B: 'Rencontres professionnelles entre entreprises',
  FORUM: 'Plateforme de discussion et débat',
  GALA_DINNER: 'Événement formel avec repas',
  PRIVATE_EVENING: 'Événement sur invitation uniquement',
  OTHER: 'Autre type d\'événement'
};

// Fonction utilitaire pour obtenir le label
export const getEventTypeLabel = (type: EventType): string => {
  return eventTypeLabels[type];
};

// Fonction pour obtenir toutes les options pour les selects
export const eventTypeOptions = Object.entries(eventTypeLabels).map(([value, label]) => ({
  value: value as EventType,
  label,
  description: eventTypeDescriptions[value as EventType]
}));