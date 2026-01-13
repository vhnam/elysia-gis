import { createId } from '@paralleldrive/cuid2';
import { index, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';

export const tableUsers = pgTable(
  'users',
  {
    id: varchar('id')
      .$defaultFn(() => createId())
      .primaryKey(),

    username: varchar('username', {
      length: 255,
    })
      .notNull()
      .unique(),
    password: varchar('password').notNull(),
    firstName: varchar('first_name', {
      length: 255,
    }).notNull(),
    lastName: varchar('last_name', {
      length: 255,
    }).notNull(),
    email: varchar('email', {
      length: 255,
    })
      .notNull()
      .unique(),

    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => ({
    usernameIdx: index('users_username_idx').on(table.username),
    emailIdx: index('users_email_idx').on(table.email),
  }),
);
