import { createId } from '@paralleldrive/cuid2';
import { pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';

import { tableUsers } from '@/modules/user';

export const tableResetPasswordTokens = pgTable('reset_password_tokens', {
  id: varchar('id')
    .$defaultFn(() => createId())
    .primaryKey(),

  tokenHash: varchar('token_hash').notNull().unique(),
  userId: varchar('user_id')
    .references(() => tableUsers.id)
    .notNull(),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  usedAt: timestamp('used_at'),
});
