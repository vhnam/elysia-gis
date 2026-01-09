import { eq } from 'drizzle-orm';
import { status } from 'elysia';

import db from '@/config/db';
import { tableUsers } from '@/modules/user/user.table';

import type { AuthModel } from './auth.model';

export abstract class Auth {
  static async signIn({
    username,
    password,
  }: AuthModel.SignInRequest): Promise<Partial<AuthModel.SignInResponse>> {
    const users = await db
      .select()
      .from(tableUsers)
      .where(eq(tableUsers.username, username))
      .limit(1);

    // Check if user exists
    if (users.length === 0) {
      throw status(
        400,
        'Invalid username or password' satisfies AuthModel.SignInInvalid,
      );
    }

    const user = users[0];

    // Verify password
    const isValid = await Bun.password.verify(password, user.password);
    if (!isValid) {
      throw status(
        400,
        'Invalid username or password' satisfies AuthModel.SignInInvalid,
      );
    }

    // Return user info (JWT will be generated in the route handler using @elysiajs/jwt)
    return {
      username: user.username,
      userId: user.id,
    };
  }
}
