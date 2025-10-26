import z from "zod";

export const ticketPriceWithQuantitySchema = z.object({
  name: z.string().min(1, "Le nom de la catégorie est requis"),
  price: z.number(),
  description: z.string(),
  quantity: z.number(),
});

export const initPaymentFormSchema = z.object({
  event_id: z.string(),
  client_id: z.string().optional(),
  email: z.string()
    .optional(),
  fullname: z.string().optional(),
  contacts: z.array(z.string()),
  ticketEvents: z
    .array(ticketPriceWithQuantitySchema)
    .min(1, "Au moins une catégorie de prix est requise"),
});



export type InitPaymentFormData = z.infer<typeof initPaymentFormSchema>;
export type PriceTicketWithQuantity = z.infer<typeof ticketPriceWithQuantitySchema>;