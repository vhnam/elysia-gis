import z from 'zod';

export const mapCreateRequestSchema = z.object({
  name: z.string().min(1).max(255),
  email: z.email().min(1).max(255),
  phone: z.string().min(1).max(255),
  address: z.string().min(1).max(255),
  requestType: z.enum([
    'people',
    'medical',
    'food',
    'supplies',
    'shelter',
    'transportation',
  ]),
  description: z.string().min(1).max(1000),
});
