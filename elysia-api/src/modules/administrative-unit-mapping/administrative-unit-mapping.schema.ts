import { createId } from '@paralleldrive/cuid2';
import { relations } from 'drizzle-orm';
import { index, pgSchema, text, timestamp } from 'drizzle-orm/pg-core';

import { administrativeUnitSchema } from '@/modules/administrative-unit';
import { administrativeUnitLegacySchema } from '@/modules/administrative-unit-legacy';

/**
 * GIS schema
 */
const gisSchema = pgSchema('gis');

/**
 * Administrative Unit Mapping
 * Maps between current (VN-34) and legacy (VN-63) administrative units
 */
export const administrativeUnitMappingSchema = gisSchema.table(
  'administrative_unit_mapping',
  {
    id: text('id')
      .$defaultFn(() => createId())
      .primaryKey(),
    unitId: text('unit_id').notNull(),
    legacyUnitId: text('legacy_unit_id').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at')
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index('administrative_unit_mapping_unit_id_idx').on(table.unitId),
    index('administrative_unit_mapping_legacy_unit_id_idx').on(table.legacyUnitId),
  ],
);

/**
 * Relations for Administrative Unit Mapping
 */
export const administrativeUnitMappingRelations = relations(
  administrativeUnitMappingSchema,
  ({ one }) => ({
    unit: one(administrativeUnitSchema, {
      fields: [administrativeUnitMappingSchema.unitId],
      references: [administrativeUnitSchema.id],
    }),
    legacyUnit: one(administrativeUnitLegacySchema, {
      fields: [administrativeUnitMappingSchema.legacyUnitId],
      references: [administrativeUnitLegacySchema.id],
    }),
  }),
);
