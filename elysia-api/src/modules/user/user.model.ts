import { createInsertSchema, createSelectSchema } from 'drizzle-typebox';
import { t } from 'elysia';

import { table } from '@/database';

export namespace UserModel {
  /**
   * Base schemas
   */

  const SelectSchema = createSelectSchema(table.users, {
    id: t.String(),
    username: t.String(),
    email: t.String({ format: 'email' }),
    createdAt: t.Date(),
  });

  const InsertSchema = createInsertSchema(table.users, {
    email: t.String({ format: 'email' }),
    username: t.String(),
    password: t.String(),
  });

  /**
   * Request schemas
   */

  export const getUsersRequest = t.Object({
    search: t.Optional(t.String()),
    page: t.Optional(t.Numeric({ minimum: 1 })),
    limit: t.Optional(t.Numeric({ minimum: 1, maximum: 100 })),
  });

  export const getUserRequest = t.Object({
    id: t.String(),
  });

  export const createUserRequest = t.Omit(InsertSchema, ['id', 'createdAt']);

  /**
   * Response schemas
   */

  export const getUserResponse = t.Pick(SelectSchema, [
    'id',
    'username',
    'email',
    'createdAt',
  ]);

  export const getUsersResponse = t.Object({
    data: t.Array(getUserResponse),
    page: t.Number(),
    limit: t.Number(),
    total: t.Number(),
    totalPages: t.Number(),
  });

  export const createUserResponse = t.Object({
    id: t.String(),
    username: t.String(),
    email: t.String({ format: 'email' }),
    createdAt: t.Date(),
  });

  /**
   * Type definitions
   */

  export type CreateUserRequest = typeof createUserRequest.static;
  export type CreateUserResponse = typeof createUserResponse.static;
  export type GetUserRequest = typeof getUserRequest.static;
  export type GetUserResponse = typeof getUserResponse.static;
  export type GetUsersRequest = typeof getUsersRequest.static;
  export type GetUsersResponse = typeof getUsersResponse.static;
}
