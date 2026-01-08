import { status } from "elysia";
import { eq } from "drizzle-orm";

import db from "@/config/db";
import { table } from "@/database";

import type { AuthModel } from "./auth.model";

export abstract class Auth {
  static async signIn({
    username,
    password,
  }: AuthModel.signInBody): Promise<Partial<AuthModel.signInResponse>> {
    // Use Drizzle ORM to query user
    const users = await db
      .select()
      .from(table.users)
      .where(eq(table.users.username, username))
      .limit(1);

    // Check if user exists
    if (users.length === 0) {
      throw status(
        400,
        "Invalid username or password" satisfies AuthModel.signInInvalid
      );
    }

    const user = users[0];

    // Verify password
    const isValid = await Bun.password.verify(password, user.password);
    if (!isValid) {
      throw status(
        400,
        "Invalid username or password" satisfies AuthModel.signInInvalid
      );
    }

    // Return user info (JWT will be generated in the route handler using @elysiajs/jwt)
    return {
      username: user.username,
      userId: user.id,
    };
  }
}
