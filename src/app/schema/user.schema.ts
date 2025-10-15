// schemas/user-form.schema.ts
import { z } from 'zod';

export const userFormSchema = z.object({
  id: z.string(),
  firstname: z.string(),
  lastname: z.string(),
  email: z.email(),
  phoneNumber: z.string(),
  createdAt: z.date(),
});

export type UserFormData = z.infer<typeof userFormSchema>;