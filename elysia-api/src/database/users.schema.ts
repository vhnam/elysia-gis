import { pgTable, varchar, timestamp } from "drizzle-orm/pg-core";
import { t } from "elysia";
import { createInsertSchema, createSelectSchema } from "drizzle-typebox";
import { createId } from "@paralleldrive/cuid2";

import { spreads } from "../utils/db";

export const users = pgTable("users", {
  id: varchar("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  username: varchar("username").notNull().unique(),
  password: varchar("password").notNull(),
  email: varchar("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export const db = {
  insert: spreads(
    {
      user: createInsertSchema(users, {
        email: t.String({ format: "email" }),
      }),
    },
    "insert"
  ),
  select: spreads(
    {
      user: createSelectSchema(users, {
        email: t.String({ format: "email" }),
      }),
    },
    "select"
  ),
} as const;
