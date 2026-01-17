import { createId } from '@paralleldrive/cuid2';
import {
  index,
  integer,
  jsonb,
  pgSchema,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';

import { geometry } from '@/database/types/geometry';

/**
 * GIS schema
 */
const gisSchema = pgSchema('gis');

/**
 * Administrative unit level enum
 */
export const administrativeUnitLevelEnum = gisSchema.enum('administrative_unit_level', [
  'province',
  'district',
  'ward',
]);

/**
 * Additional data type for administrative units
 */
export type AdministrativeUnitAdditionalData = {
  parentId?: string;
  areaKm2?: number;
  population?: number;
  densityKm2?: number;
  headquarters?: string;
  validFrom?: string;
  validTo?: string;
};

/**
 * Administrative Unit (VN-34 Dataset)
 */
export const administrativeUnitSchema = gisSchema.table(
  'administrative_unit',
  {
    id: text('id')
      .$defaultFn(() => createId())
      .primaryKey(),
    code: text('code').notNull().unique(),
    name: text('name').notNull(),
    level: administrativeUnitLevelEnum('level').notNull(),
    order: integer('order').notNull(),
    geom: geometry('geom').notNull(),
    additionalData: jsonb('additional_data').$type<AdministrativeUnitAdditionalData>(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at')
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index('administrative_unit_geom_idx').using('gist', table.geom),
    index('administrative_unit_code_idx').on(table.code),
    index('administrative_unit_level_idx').on(table.level),
  ],
);
