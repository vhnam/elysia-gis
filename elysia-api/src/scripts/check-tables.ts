import { client } from '@/config/db';

async function checkTables() {
  try {
    // Check public schema tables
    const publicTables = await client`
      SELECT tablename 
      FROM pg_tables 
      WHERE schemaname = 'public'
      AND tablename NOT LIKE 'pg_%'
      AND tablename NOT IN ('spatial_ref_sys', 'geometry_columns')
      ORDER BY tablename;
    `;

    console.log('\n📊 Tables in public schema:');
    if (publicTables.length === 0) {
      console.log('  (no tables found)');
    } else {
      publicTables.forEach((table: any) => {
        console.log(`  - ${table.tablename}`);
      });
    }

    // Check gis schema tables
    const gisTables = await client`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'gis'
      AND table_type = 'BASE TABLE'
      ORDER BY table_name;
    `;

    console.log('\n📊 Tables in gis schema:');
    if (gisTables.length === 0) {
      console.log('  (no tables found)');
    } else {
      gisTables.forEach((table: any) => {
        console.log(`  - ${table.table_name}`);
      });
    }

    // Check migration tracking
    const migrations = await client`
      SELECT * FROM drizzle.__drizzle_migrations ORDER BY created_at;
    `;

    console.log('\n📋 Migration history:');
    if (migrations.length === 0) {
      console.log('  (no migrations recorded)');
    } else {
      migrations.forEach((migration: any) => {
        console.log(`  - ${migration.hash} (created: ${migration.created_at})`);
      });
    }
  } catch (error: any) {
    console.error('❌ Error:', error.message);
    throw error;
  } finally {
    await client.end();
  }
}

checkTables().catch((error) => {
  console.error('Check failed:', error.message);
  process.exit(1);
});
