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
 * Administrative unit legacy level enum
 */
export const administrativeUnitLegacyLevelEnum = gisSchema.enum(
  'administrative_unit_legacy_level',
  ['province', 'district', 'ward'],
);

/**
 * Additional data type for legacy administrative units
 */
export type AdministrativeUnitLegacyAdditionalData = {
  parentId?: string;
  parentName?: string;
  districtId?: string;
  districtName?: string;
  validFrom?: string;
  validTo?: string;
};

/**
 * Administrative Unit Legacy (VN-63 Dataset)
 */
export const administrativeUnitLegacySchema = gisSchema.table(
  'administrative_unit_legacy',
  {
    id: text('id')
      .$defaultFn(() => createId())
      .primaryKey(),
    code: text('code').notNull().unique(),
    name: text('name').notNull(),
    level: administrativeUnitLegacyLevelEnum('level').notNull(),
    order: integer('order').notNull(),
    geom: geometry('geom').notNull(),
    additionalData: jsonb('additional_data').$type<AdministrativeUnitLegacyAdditionalData>(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at')
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index('administrative_unit_legacy_geom_idx').using('gist', table.geom),
    index('administrative_unit_legacy_code_idx').on(table.code),
    index('administrative_unit_legacy_level_idx').on(table.level),
  ],
);
