import { createId } from '@paralleldrive/cuid2';
import { index, pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

import { point } from '@/database/types/geometry';

export const requestTypeEnum = pgEnum('request_type', [
  'people',
  'medical',
  'food',
  'supplies',
  'shelter',
  'transportation',
]);

export const rescueRequestSchema = pgTable(
  'rescue_request',
  {
    id: text('id')
      .$defaultFn(() => createId())
      .primaryKey(),
    name: text('name').notNull(),
    email: text('email'),
    phone: text('phone').notNull(),
    address: text('address'),
    requestType: requestTypeEnum('request_type').notNull(),
    description: text('description'),
    location: point('location').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at')
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [
    index('rescue_request_location_idx').using('gist', table.location),
  ],
);
