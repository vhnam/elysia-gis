// Import schemas first to ensure they're initialized before any other modules
import { hashPassword } from 'better-auth/crypto';
import { eq } from 'drizzle-orm';

import { client, db } from '@/config/db';
import { env } from '@/config/env';

import { accountSchema } from '@/modules/auth';
import { userSchema } from '@/modules/user';

async function seedSuperAdmin() {
  console.log('🌱 Starting super administrator seed...');

  const superAdminEmail = env.SUPER_ADMIN_EMAIL;
  const superAdminPassword = env.SUPER_ADMIN_PASSWORD;
  const superAdminName = env.SUPER_ADMIN_NAME;

  if (!superAdminEmail || !superAdminPassword) {
    console.error(
      '❌ Error: SUPER_ADMIN_EMAIL and SUPER_ADMIN_PASSWORD must be set in environment variables',
    );
    process.exit(1);
  }

  try {
    // Check if super admin already exists
    const existingUser = await db
      .select()
      .from(userSchema)
      .where(eq(userSchema.email, superAdminEmail))
      .limit(1);

    if (existingUser.length > 0) {
      console.log(
        `✅ Super administrator with email ${superAdminEmail} already exists. Skipping seed.`,
      );
      await client.end();
      return;
    }

    // Hash password using better-auth's password hashing
    const hashedPassword = await hashPassword(superAdminPassword);

    // Create super admin user
    console.log(
      `Creating super administrator: ${superAdminName} (${superAdminEmail})...`,
    );

    const [newUser] = await db
      .insert(userSchema)
      .values({
        name: superAdminName,
        email: superAdminEmail,
        emailVerified: true,
      })
      .returning();

    // Create account entry for credential-based authentication
    await db.insert(accountSchema).values({
      accountId: superAdminEmail,
      providerId: 'credential',
      userId: newUser.id,
      password: hashedPassword,
    });

    console.log('✅ Super administrator account created successfully!');
    console.log(`   Email: ${superAdminEmail}`);
    console.log(`   Name: ${superAdminName}`);
    console.log(`   User ID: ${newUser.id}`);
  } catch (error: any) {
    console.error('❌ Error seeding super administrator:', error.message);
    throw error;
  } finally {
    await client.end();
  }
}

seedSuperAdmin().catch((error) => {
  console.error('Seed failed:', error.message);
  process.exit(1);
});
