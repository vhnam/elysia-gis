import { t } from 'elysia';

export namespace UserModel {
  /**
   * Request schemas
   */

  export const getUsersRequest = t.Object({
    search: t.Optional(t.String({ maxLength: 255 })),
    page: t.Optional(t.Numeric({ minimum: 1 })),
    limit: t.Optional(t.Numeric({ minimum: 1, maximum: 100 })),
  });

  export const getUserRequest = t.Object({
    id: t.String(),
  });

  export const createUserRequest = t.Object({
    username: t.String({ minLength: 3 }),
    email: t.String({ format: 'email' }),
    password: t.String(),
  });

  /**
   * Response schemas
   */

  export const userResponse = t.Object({
    id: t.String(),
    username: t.String(),
    email: t.String({ format: 'email' }),
    createdAt: t.Date(),
  });

  export const getUsersResponse = t.Object({
    data: t.Array(userResponse),
    page: t.Number(),
    limit: t.Number(),
    total: t.Number(),
    totalPages: t.Number(),
  });

  /**
   * Type definitions
   */

  export type CreateUserRequest = typeof createUserRequest.static;
  export type UserResponse = typeof userResponse.static;
  export type GetUserRequest = typeof getUserRequest.static;
  export type GetUsersRequest = typeof getUsersRequest.static;
  export type GetUsersResponse = typeof getUsersResponse.static;
}
