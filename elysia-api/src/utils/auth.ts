import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { openAPI } from 'better-auth/plugins';

import { db } from '@/config/db';
import { env } from '@/config/env';

import {
  accountSchema,
  sessionSchema,
  verificationSchema,
} from '@/modules/auth';
import { userSchema } from '@/modules/user';

export const auth = betterAuth({
  basePath: '/api/v1/auth',
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      user: userSchema,
      session: sessionSchema,
      account: accountSchema,
      verification: verificationSchema,
    },
  }),
  secret: env.BETTER_AUTH_SECRET,
  baseURL: env.BETTER_AUTH_URL,
  plugins: [openAPI()],
  emailAndPassword: {
    enabled: true,
    disableSignUp: true,
    requireEmailVerification: true,
    maxPasswordLength: 100,
    minPasswordLength: 8,
    revokeSessionsOnPasswordReset: true,
    revokeSessionsOnEmailVerification: true,
    revokeSessionsOnSignUp: true,
    revokeSessionsOnSignIn: true,
  },
});
