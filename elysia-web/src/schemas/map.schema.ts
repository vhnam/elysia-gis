import z from 'zod';

const requestTypeEnum = z.enum([
  'people',
  'medical',
  'food',
  'supplies',
  'shelter',
  'transportation',
]);

export const mapCreateRequestSchema = z.object({
  name: z.string().min(1).max(255),
  email: z.email().max(255).optional(),
  phone: z.string().min(1).max(255),
  address: z.string().max(255).optional(),
  requestType: requestTypeEnum,
  description: z.string().max(1000).optional(),
  longitude: z.number().min(-180).max(180),
  latitude: z.number().min(-90).max(90),
});

export type RequestType = z.infer<typeof requestTypeEnum>;
export type MapCreateRequestForm = z.infer<typeof mapCreateRequestSchema>;
