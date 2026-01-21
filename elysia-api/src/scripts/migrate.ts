import { migrate } from 'drizzle-orm/postgres-js/migrator';

import { client, db } from '@/config/db';

async function runMigrations() {
  try {
    console.log('Running migrations...');
    console.log('Migrations folder: ./drizzle');
    
    await migrate(db, { migrationsFolder: './drizzle' });
    
    // Verify tables were created
    const publicTables = await client`
      SELECT tablename 
      FROM pg_tables 
      WHERE schemaname = 'public'
      AND tablename NOT LIKE 'pg_%'
      AND tablename NOT IN ('spatial_ref_sys', 'geometry_columns');
    `;
    
    const gisTables = await client`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'gis'
      AND table_type = 'BASE TABLE';
    `;
    
    const totalTables = publicTables.length + gisTables.length;
    
    if (totalTables === 0) {
      console.warn('⚠️  Warning: Migrations completed but no tables were found!');
      console.warn('   This might indicate the migrations were already marked as applied.');
      console.warn('   Try running: bun run src/scripts/reset-migration-history.ts');
    } else {
      console.log(`✅ Migrations completed successfully! Found ${totalTables} table(s).`);
    }
  } catch (error: any) {
    console.error('❌ Migration error:', error.message);
    if (error.stack) {
      console.error(error.stack);
    }
    throw error;
  } finally {
    await client.end();
  }
}

runMigrations().catch((error) => {
  console.error('Migration failed:', error.message);
  process.exit(1);
});
