import { createInsertSchema } from 'drizzle-typebox';
import { t } from 'elysia';

import { table } from '@/database';

export namespace UserModel {
  const _insertSchema = createInsertSchema(table.users, {
    email: t.String({ format: 'email' }),
  });

  export const createUserBody = t.Omit(_insertSchema, ['id', 'createdAt']);

  export const createUserResponse = t.Object({
    id: t.String(),
    username: t.String(),
    email: t.String({ format: 'email' }),
    createdAt: t.Date(),
  });

  export const getUserResponse = createUserResponse;

  export const paginationQuery = t.Object({
    page: t.Optional(t.Numeric({ minimum: 1 })),
    limit: t.Optional(t.Numeric({ minimum: 1, maximum: 100 })),
  });

  export const paginatedUsersResponse = t.Object({
    data: t.Array(getUserResponse),
    page: t.Number(),
    limit: t.Number(),
    total: t.Number(),
    totalPages: t.Number(),
  });

  export type CreateUserBody = typeof createUserBody.static;
  export type CreateUserResponse = typeof createUserResponse.static;
  export type GetUserResponse = typeof getUserResponse.static;
  export type PaginationQuery = typeof paginationQuery.static;
  export type PaginatedUsersResponse = typeof paginatedUsersResponse.static;
}
