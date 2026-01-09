import { createId } from '@paralleldrive/cuid2';
import { pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';

export const tableUsers = pgTable('users', {
  id: varchar('id')
    .$defaultFn(() => createId())
    .primaryKey(),

  username: varchar('username').notNull().unique(),
  password: varchar('password').notNull(),
  email: varchar('email').notNull().unique(),

  createdAt: timestamp('created_at').defaultNow().notNull(),
});
