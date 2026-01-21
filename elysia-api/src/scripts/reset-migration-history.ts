import { client } from '@/config/db';

async function resetMigrationHistory() {
  try {
    console.log('Resetting migration history...');
    
    // Check if drizzle schema and migrations table exist
    const schemaExists = await client`
      SELECT EXISTS(
        SELECT 1 
        FROM information_schema.schemata 
        WHERE schema_name = 'drizzle'
      ) as exists;
    `;

    if (schemaExists[0]?.exists) {
      await client.unsafe('TRUNCATE TABLE drizzle.__drizzle_migrations;');
      console.log('✅ Migration history cleared!');
    } else {
      console.log('⚠️  Drizzle migration table does not exist yet.');
    }
  } catch (error: any) {
    console.error('❌ Error:', error.message);
    throw error;
  } finally {
    await client.end();
  }
}

resetMigrationHistory().catch((error) => {
  console.error('Reset failed:', error.message);
  process.exit(1);
});
