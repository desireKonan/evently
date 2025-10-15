// schemas/authSchema.ts
import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .email('L\'email est requis'),
  password: z
    .string()
    .min(1, 'Le mot de passe est requis')
    .min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
});

export type LoginFormData = z.infer<typeof loginSchema>;