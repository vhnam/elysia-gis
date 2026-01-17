import { createId } from '@paralleldrive/cuid2';
import { sql } from 'drizzle-orm';
import { readFileSync } from 'fs';
import { join } from 'path';

import { client, db } from '@/config/db';
import type { AdministrativeUnitAdditionalData } from '@/modules/administrative-unit';
import type { AdministrativeUnitLegacyAdditionalData } from '@/modules/administrative-unit-legacy';
import type {
  AdministrativeUnitLegacyDistrictFeatureCollection,
  AdministrativeUnitLegacyProvinceFeatureCollection,
  AdministrativeUnitLegacyWardFeatureCollection,
  AdministrativeUnitProvinceFeatureCollection,
  AdministrativeUnitWardFeatureCollection,
} from '@/types/geojson.types';

const DATA_DIR = join(import.meta.dir, '../../data');

async function seedAdministrativeUnits() {
  console.log('🌱 Starting administrative unit seed...');

  try {
    // Read GeoJSON files for Administrative Unit dataset
    const provincesPath = join(
      DATA_DIR,
      'administrative-unit/administrative-unit__provinces.geojson',
    );
    const wardsPath = join(
      DATA_DIR,
      'administrative-unit/administrative-unit__wards.geojson',
    );

    const provincesData: AdministrativeUnitProvinceFeatureCollection =
      JSON.parse(readFileSync(provincesPath, 'utf-8'));
    const wardsData: AdministrativeUnitWardFeatureCollection = JSON.parse(
      readFileSync(wardsPath, 'utf-8'),
    );

    console.log(
      `📍 Found ${provincesData.features.length} provinces and ${wardsData.features.length} wards in Administrative Unit dataset`,
    );

    // Clear existing data
    console.log('🗑️  Clearing existing administrative unit data...');
    await db.execute(sql`DELETE FROM gis.administrative_unit`);

    // Insert provinces
    console.log('📥 Inserting provinces...');
    for (const feature of provincesData.features) {
      const { properties, geometry } = feature;
      const additionalData: AdministrativeUnitAdditionalData = {
        areaKm2: properties.dtich_km2,
        population: properties.dan_so,
        densityKm2: properties.matdo_km2,
        headquarters: properties.tru_so,
      };

      await db.execute(sql`
        INSERT INTO gis.administrative_unit (id, code, name, level, "order", geom, additional_data, created_at, updated_at)
        VALUES (
          ${createId()},
          ${properties.ma_tinh},
          ${properties.ten_tinh},
          'province',
          ${properties.stt},
          ST_GeomFromGeoJSON(${JSON.stringify(geometry)}),
          ${JSON.stringify(additionalData)}::jsonb,
          NOW(),
          NOW()
        )
      `);
    }
    console.log(`✅ Inserted ${provincesData.features.length} provinces`);

    // Insert wards
    console.log('📥 Inserting wards...');
    let wardCount = 0;
    for (const feature of wardsData.features) {
      const { properties, geometry } = feature;
      const additionalData: AdministrativeUnitAdditionalData = {
        parentId: properties.ma_tinh,
        areaKm2: properties.dtich_km2,
        population: properties.dan_so,
        densityKm2: properties.matdo_km2,
        headquarters: properties.tru_so,
      };

      await db.execute(sql`
        INSERT INTO gis.administrative_unit (id, code, name, level, "order", geom, additional_data, created_at, updated_at)
        VALUES (
          ${createId()},
          ${properties.ma_xa},
          ${properties.ten_xa},
          'ward',
          ${properties.stt},
          ST_GeomFromGeoJSON(${JSON.stringify(geometry)}),
          ${JSON.stringify(additionalData)}::jsonb,
          NOW(),
          NOW()
        )
      `);
      wardCount++;
      if (wardCount % 100 === 0) {
        console.log(`  ... inserted ${wardCount} wards`);
      }
    }
    console.log(`✅ Inserted ${wardCount} wards`);

    console.log('✅ Administrative unit seed completed successfully!');
  } catch (error: any) {
    console.error('❌ Error seeding administrative units:', error.message);
    throw error;
  }
}

async function seedAdministrativeUnitsLegacy() {
  console.log('🌱 Starting administrative unit legacy seed...');

  try {
    // Read GeoJSON files for Administrative Unit Legacy dataset
    const provincesPath = join(
      DATA_DIR,
      'administrative-unit-legacy/administrative-unit-legacy__provinces.geojson',
    );
    const districtsPath = join(
      DATA_DIR,
      'administrative-unit-legacy/administrative-unit-legacy__districts.geojson',
    );
    const wardsPath = join(
      DATA_DIR,
      'administrative-unit-legacy/administrative-unit-legacy__wards.geojson',
    );

    const provincesData: AdministrativeUnitLegacyProvinceFeatureCollection =
      JSON.parse(readFileSync(provincesPath, 'utf-8'));
    const districtsData: AdministrativeUnitLegacyDistrictFeatureCollection =
      JSON.parse(readFileSync(districtsPath, 'utf-8'));
    const wardsData: AdministrativeUnitLegacyWardFeatureCollection = JSON.parse(
      readFileSync(wardsPath, 'utf-8'),
    );

    console.log(
      `📍 Found ${provincesData.features.length} provinces, ${districtsData.features.length} districts, and ${wardsData.features.length} wards in VN-63 dataset`,
    );

    // Clear existing data
    console.log('🗑️  Clearing existing administrative unit legacy data...');
    await db.execute(sql`DELETE FROM gis.administrative_unit_legacy`);

    // Insert provinces
    console.log('📥 Inserting legacy provinces...');
    let provinceCount = 0;
    for (const feature of provincesData.features) {
      const { properties, geometry } = feature;
      const additionalData: AdministrativeUnitLegacyAdditionalData = {};

      await db.execute(sql`
        INSERT INTO gis.administrative_unit_legacy (id, code, name, level, "order", geom, additional_data, created_at, updated_at)
        VALUES (
          ${createId()},
          ${properties.ma_tinh},
          ${properties.ten_tinh},
          'province',
          ${properties.stt},
          ST_GeomFromGeoJSON(${JSON.stringify(geometry)}),
          ${JSON.stringify(additionalData)}::jsonb,
          NOW(),
          NOW()
        )
        ON CONFLICT (code) DO NOTHING
      `);
      provinceCount++;
    }
    console.log(`✅ Inserted ${provinceCount} legacy provinces`);

    // Insert districts
    console.log('📥 Inserting legacy districts...');
    let districtCount = 0;
    for (const feature of districtsData.features) {
      const { properties, geometry } = feature;
      const additionalData: AdministrativeUnitLegacyAdditionalData = {
        parentId: properties.ma_tinh,
        parentName: properties.ten_tinh,
      };

      await db.execute(sql`
        INSERT INTO gis.administrative_unit_legacy (id, code, name, level, "order", geom, additional_data, created_at, updated_at)
        VALUES (
          ${createId()},
          ${properties.ma_huyen},
          ${properties.ten_huyen},
          'district',
          ${properties.stt},
          ST_GeomFromGeoJSON(${JSON.stringify(geometry)}),
          ${JSON.stringify(additionalData)}::jsonb,
          NOW(),
          NOW()
        )
        ON CONFLICT (code) DO NOTHING
      `);
      districtCount++;
    }
    console.log(`✅ Inserted ${districtCount} legacy districts`);

    // Insert wards
    console.log('📥 Inserting legacy wards...');
    let wardCount = 0;
    let errorCount = 0;
    for (const feature of wardsData.features) {
      const { properties, geometry } = feature;
      try {
        const additionalData: AdministrativeUnitLegacyAdditionalData = {
          parentId: properties.ma_tinh,
          parentName: properties.ten_tinh,
          districtId: properties.ma_huyen,
          districtName: properties.ten_huyen,
        };

        await db.execute(sql`
          INSERT INTO gis.administrative_unit_legacy (id, code, name, level, "order", geom, additional_data, created_at, updated_at)
          VALUES (
            ${createId()},
            ${properties.ma_xa},
            ${properties.ten_xa},
            'ward',
            ${properties.stt},
            ST_GeomFromGeoJSON(${JSON.stringify(geometry)}),
            ${JSON.stringify(additionalData)}::jsonb,
            NOW(),
            NOW()
          )
          ON CONFLICT (code) DO NOTHING
        `);
        wardCount++;
        if (wardCount % 100 === 0) {
          console.log(`  ... inserted ${wardCount} legacy wards`);
        }
      } catch (error: any) {
        errorCount++;
        console.error(
          `❌ Error inserting ward ${properties.ma_xa} (${properties.ten_xa}):`,
          error.message || error,
        );
        // Continue with next ward instead of failing completely
        if (errorCount > 10) {
          throw new Error(
            `Too many errors (${errorCount}). Stopping seed process.`,
          );
        }
      }
    }
    console.log(`✅ Inserted ${wardCount} legacy wards${errorCount > 0 ? ` (${errorCount} errors)` : ''}`);

    console.log('✅ Administrative unit legacy seed completed successfully!');
  } catch (error: any) {
    console.error(
      '❌ Error seeding administrative units legacy:',
      error.message || error,
    );
    if (error.stack) {
      console.error('Stack trace:', error.stack);
    }
    if (error.cause) {
      console.error('Cause:', error.cause);
    }
    throw error;
  }
}

async function main() {
  console.log('🚀 Starting seed process...\n');

  try {
    await seedAdministrativeUnits();
    console.log('');
    await seedAdministrativeUnitsLegacy();
    console.log('\n🎉 All seeds completed successfully!');
  } catch (error: any) {
    console.error('\n❌ Seed failed:', error.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

main();
