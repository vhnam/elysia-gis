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

async function resetAndMigrate() {
  try {
    // Step 1: Drop all tables
    await dropAllTables();

    // Step 2: Drop all custom types (enums)
    console.log('');
    await dropAllTypes();

    // Step 3: Run migrations
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
