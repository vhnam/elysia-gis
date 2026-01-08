import { createInsertSchema, createSelectSchema } from "drizzle-typebox";
import { Value } from "@sinclair/typebox/value";

import { table } from "../../database";
import { t } from "elysia";
import db from "../../config/db";

const _createUser = createInsertSchema(table.users, {
  email: t.String({ format: "email" }),
});

const _selectUser = createSelectSchema(table.users, {
  email: t.String({ format: "email" }),
});

export async function getAllUsers() {
  const rows = await db.select().from(table.users).limit(10);
  return Value.Parse(_selectUser, rows[0]);
}
