import { createInsertSchema, createSelectSchema } from "drizzle-typebox";
import { Value } from "@sinclair/typebox/value";
import { t } from "elysia";

import db from "../../config/db";
import { table } from "../../database";
import { type NewUser } from "../../database/users.schema";

export const _createUser = createInsertSchema(table.users, {
  email: t.String({ format: "email" }),
});

export const _selectUser = createSelectSchema(table.users, {
  email: t.String({ format: "email" }),
});

export type GetAllUsersParams = {
  page?: number;
  limit?: number;
};

export async function getAllUsers({ page = 1, limit = 10 }: GetAllUsersParams) {
  const rows = await db
    .select()
    .from(table.users)
    .limit(limit)
    .offset((page - 1) * limit);
  return rows.map((row) => Value.Parse(_selectUser, row));
}

export async function createUser(user: NewUser) {
  const newUser = await db.insert(table.users).values(user).returning({
    id: table.users.id,
    username: table.users.username,
    email: table.users.email,
    createdAt: table.users.createdAt,
  });
  return newUser;
}
