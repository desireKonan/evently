import { z } from "zod";

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

export const subEventSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Le titre est requis"),
  description: z.string().optional(),
  startTime: z.string().min(1, "L'heure de début est requise"),
  endTime: z.string().min(1, "L'heure de fin est requise"),
  date: z.string().min(1, "La date est requise"),
  location: z.string().optional(),
  speaker: z.string().optional(),
});

export const eventFormSchema = z.object({
  name: z.string(),
  description: z.string(),
  date: z.string().min(1, "La date est requise"),
  limit: z.number().min(1, "Le nombre de place doit être limité").optional(),
  sub_events: z.array(z.string()).optional(),
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
  ]),
  start_date: z.date(),
  end_date: z.date().min(1, "L'heure de fin est requise"),
  location: z.string().min(1, "Le lieu est requis"),
  images: z.array(z.instanceof(File)).optional().nullable(),
  pricingCategories: z
    .array(priceTicketSchema)
    .min(1, "Au moins une catégorie de prix est requise"),
  promotionalFormule: z.object(promotionalFormuleSchema).optional(),
  subEvents: z.array(subEventSchema).optional().default([]),
});

export type EventFormData = z.infer<typeof eventFormSchema>;
export type PriceTicket = z.infer<typeof priceTicketSchema>;
export type PromotionalFormule = z.infer<typeof promotionalFormuleSchema>;
export type SubEvent = z.infer<typeof subEventSchema>;
