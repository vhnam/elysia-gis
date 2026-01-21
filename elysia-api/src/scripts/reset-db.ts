import { migrate } from 'drizzle-orm/postgres-js/migrator';

import { client, db } from '@/config/db';

async function dropAllTables() {
  console.log('Dropping all tables...');

  // Get all table names in the public schema, excluding system and extension tables
  const tables = await client`
    SELECT tablename 
    FROM pg_tables 
    WHERE schemaname = 'public'
    AND tablename NOT LIKE 'pg_%'
    AND tablename NOT IN ('spatial_ref_sys', 'geometry_columns');
  `;

  if (tables.length === 0) {
    console.log('No tables to drop.');
  } else {
    console.log(`Found ${tables.length} table(s) to drop:`);
    tables.forEach((table: any) => {
      console.log(`  - ${table.tablename}`);
    });

    // Drop all tables with CASCADE to handle foreign key constraints
    for (const table of tables) {
      await client.unsafe(`DROP TABLE IF EXISTS "${table.tablename}" CASCADE;`);
    }

    console.log('✅ All tables dropped successfully!');
  }
}

async function dropAllTypes() {
  console.log('Dropping all custom types...');

  // Get all enum types in the public schema
  const types = await client`
    SELECT typname 
    FROM pg_type 
    WHERE typnamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public')
    AND typtype = 'e';
  `;

  if (types.length === 0) {
    console.log('No custom types to drop.');
    return;
  }

  console.log(`Found ${types.length} type(s) to drop:`);
  types.forEach((type: any) => {
    console.log(`  - ${type.typname}`);
  });

  // Drop all enum types with CASCADE
  for (const type of types) {
    await client.unsafe(`DROP TYPE IF EXISTS "${type.typname}" CASCADE;`);
  }

  console.log('✅ All custom types dropped successfully!');
}


async function dropGisSchemaTables() {
  console.log('Dropping all tables in gis schema...');

  // First, check if the gis schema exists and get table count
  const schemaCheck = await client`
    SELECT EXISTS(
      SELECT 1 
      FROM information_schema.schemata 
      WHERE schema_name = 'gis'
    ) as schema_exists;
  `;

  if (!schemaCheck[0]?.schema_exists) {
    console.log('gis schema does not exist. Skipping.');
    return;
  }

  // Get all table names in the gis schema
  const tables = await client`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'gis'
    AND table_type = 'BASE TABLE'
    ORDER BY table_name;
  `;

  if (tables.length === 0) {
    console.log('No tables to drop in gis schema.');
  } else {
    console.log(`Found ${tables.length} table(s) to drop in gis schema:`);
    tables.forEach((table: any) => {
      console.log(`  - gis.${table.table_name}`);
    });

    // Use a DO block to dynamically drop all tables in the gis schema
    // This ensures all tables are dropped even with complex foreign key relationships
    const tableNames = tables.map((t: any) => `"${t.table_name}"`).join(', ');
    await client.unsafe(`
      DO $$ 
      DECLARE
        r RECORD;
      BEGIN
        FOR r IN 
          SELECT tablename 
          FROM pg_tables 
          WHERE schemaname = 'gis'
        LOOP
          EXECUTE 'DROP TABLE IF EXISTS "gis"."' || r.tablename || '" CASCADE';
        END LOOP;
      END $$;
    `);

    console.log('✅ All gis schema tables dropped successfully!');
  }
}

async function dropGisSchemaTypes() {
  console.log('Dropping all custom types in gis schema...');

  // Get all enum types in the gis schema
  const types = await client`
    SELECT typname 
    FROM pg_type 
    WHERE typnamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'gis')
    AND typtype = 'e';
  `;

  if (types.length === 0) {
    console.log('No custom types to drop in gis schema.');
    return;
  }

  console.log(`Found ${types.length} type(s) to drop in gis schema:`);
  types.forEach((type: any) => {
    console.log(`  - gis.${type.typname}`);
  });

  // Drop all enum types with CASCADE
  for (const type of types) {
    await client.unsafe(`DROP TYPE IF EXISTS "gis"."${type.typname}" CASCADE;`);
  }

  console.log('✅ All gis schema custom types dropped successfully!');
}

async function resetAndMigrate() {
  try {
    // Step 1: Drop all tables in public schema
    await dropAllTables();

    // Step 2: Drop all tables in gis schema
    console.log('');
    await dropGisSchemaTables();

    // Step 3: Drop all custom types (enums) in public schema
    console.log('');
    await dropAllTypes();

    // Step 4: Drop all custom types (enums) in gis schema
    console.log('');
    await dropGisSchemaTypes();

    // Step 5: Run migrations
    console.log('\nRunning migrations...');
    await migrate(db, { migrationsFolder: './drizzle' });
    console.log('✅ Migrations completed successfully!');

    console.log('\n🎉 Database reset and migrations completed!');
  } catch (error: any) {
    console.error('❌ Error:', error.message);
    throw error;
  } finally {
    await client.end();
  }
}

resetAndMigrate().catch((error) => {
  console.error('Reset failed:', error.message);
  process.exit(1);
});
