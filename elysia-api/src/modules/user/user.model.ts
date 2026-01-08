import { t } from "elysia";
import { createInsertSchema } from "drizzle-typebox";

import { table } from "@/database";

export namespace UserModel {
  // Base insert schema from Drizzle
  const _insertSchema = createInsertSchema(table.users, {
    email: t.String({ format: "email" }),
  });

  // Create user request body (without id and createdAt)
  export const createUserBody = t.Omit(_insertSchema, ["id", "createdAt"]);
  export type CreateUserBody = typeof createUserBody.static;

  // Create user response
  export const createUserResponse = t.Object({
    id: t.String(),
    username: t.String(),
    email: t.String({ format: "email" }),
    createdAt: t.Date(),
  });
  export type CreateUserResponse = typeof createUserResponse.static;

  // Get user response (same as create for now)
  export const getUserResponse = createUserResponse;
  export type GetUserResponse = typeof getUserResponse.static;

  // Pagination query params
  export const paginationQuery = t.Object({
    page: t.Optional(t.Numeric({ minimum: 1 })),
    limit: t.Optional(t.Numeric({ minimum: 1, maximum: 100 })),
  });
  export type PaginationQuery = typeof paginationQuery.static;

  // Paginated response
  export const paginatedUsersResponse = t.Object({
    data: t.Array(getUserResponse),
    page: t.Number(),
    limit: t.Number(),
    total: t.Number(),
    totalPages: t.Number(),
  });
  export type PaginatedUsersResponse = typeof paginatedUsersResponse.static;
}
