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


export const signUpSchema = z.object({
  name: z.string(),
  email: z
    .email('L\'email est requis'),
  password: z
    .string()
    .min(1, 'Le mot de passe est requis')
    .min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
  contacts: z.array(z.string())
    .min(1, 'Vous devez avoir au moins 1 contacts !'),
  role: z.enum([
    'ADMIN', 'USER', 'ORGANIZER'
  ]).default('USER')
  .nonoptional()
});

export type SignUpFormData = z.infer<typeof signUpSchema>;
