import { z } from 'zod';

export const signInSchema = z.object({
  email: z.email().min(1).max(255),
  password: z.string().min(1).max(255),
});

export const forgotPasswordSchema = z.object({
  email: z.email().min(1).max(255),
});

export const resetPasswordSchema = z
  .object({
    token: z.string().min(1).max(255),
    password: z.string().min(8).max(255),
    confirmPassword: z.string().min(1).max(255),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: 'Passwords do not match',
    path: ['confirmPassword'],
  });
