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
    username: t.String({ minLength: 3, maxLength: 255 }),
    firstName: t.String({ minLength: 3, maxLength: 255 }),
    lastName: t.String({ minLength: 3, maxLength: 255 }),
    email: t.String({ format: 'email', maxLength: 255 }),
    password: t.String(),
  });

  export const updateUserRequest = t.Object({
    email: t.Optional(t.String({ format: 'email', maxLength: 255 })),
    firstName: t.Optional(t.String({ minLength: 3, maxLength: 255 })),
    lastName: t.Optional(t.String({ minLength: 3, maxLength: 255 })),
    password: t.Optional(t.String({ minLength: 8, maxLength: 255 })),
  });

  /**
   * Response schemas
   */

  export const userResponse = t.Object({
    id: t.String(),
    username: t.String(),
    firstName: t.String(),
    lastName: t.String(),
    email: t.String({ format: 'email' }),
    createdAt: t.Date(),
    updatedAt: t.Date(),
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
  export type UpdateUserRequest = typeof updateUserRequest.static;
  export type UserResponse = typeof userResponse.static;
  export type GetUserRequest = typeof getUserRequest.static;
  export type GetUsersRequest = typeof getUsersRequest.static;
  export type GetUsersResponse = typeof getUsersResponse.static;
}
