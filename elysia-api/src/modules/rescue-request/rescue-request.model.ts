import { t } from 'elysia';

const requestTypeEnum = [
  'people',
  'medical',
  'food',
  'supplies',
  'shelter',
  'transportation',
] as const;

export namespace RescueRequestModel {
  /**
   * Request schemas
   */

  export const createRescueRequestRequest = t.Object({
    name: t.String({ minLength: 1, maxLength: 255 }),
    email: t.Optional(t.String({ format: 'email', maxLength: 255 })),
    phone: t.String({ minLength: 1, maxLength: 255 }),
    address: t.Optional(t.String({ minLength: 1, maxLength: 255 })),
    requestType: t.String({ minLength: 1, maxLength: 255 }),
    description: t.Optional(t.String({ minLength: 1, maxLength: 1000 })),
    longitude: t.Number({ minimum: -180, maximum: 180 }),
    latitude: t.Number({ minimum: -90, maximum: 90 }),
  });

  /**
   * Response schemas
   */

  export const rescueRequestResponse = t.Object({
    id: t.String(),
    name: t.String(),
    email: t.Optional(t.String({ format: 'email' })),
    phone: t.String(),
    address: t.Optional(t.String()),
    requestType: t.String(),
    description: t.Optional(t.String()),
    longitude: t.Number(),
    latitude: t.Number(),
    createdAt: t.Union([t.Date(), t.String()]), // Accept both Date and ISO string
    updatedAt: t.Union([t.Date(), t.String()]), // Accept both Date and ISO string
  });

  /**
   * Type definitions
   */

  export type CreateRescueRequestRequest =
    typeof createRescueRequestRequest.static;
  export type RescueRequestResponse = typeof rescueRequestResponse.static;
}
