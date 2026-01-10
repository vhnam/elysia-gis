import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

import { env } from '@/config/env';

const dbUrl = `postgresql://${env.DB_USER}:${env.DB_PASSWORD}@${env.DB_HOST}:${env.DB_PORT}/${env.DB_NAME}`;

const client = postgres(dbUrl, { max: 1 });
const db = drizzle(client);

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
    return;
  }

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

async function resetAndMigrate() {
  try {
    // Step 1: Drop all tables
    await dropAllTables();

    // Step 2: Run migrations
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
