import { eq, sql } from "drizzle-orm";

import db from "../../config/db";
import { table } from "../../database";

export abstract class UserService {
  static async getAllUsers(page = 1, limit = 10) {
    // Get paginated users
    const users = await db
      .select({
        id: table.users.id,
        username: table.users.username,
        email: table.users.email,
        createdAt: table.users.createdAt,
      })
      .from(table.users)
      .limit(limit)
      .offset((page - 1) * limit);

    // Get total count for pagination
    const countResult = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(table.users);

    const total = countResult[0]?.count || 0;

    return {
      data: users,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  static async createUser(data: {
    username: string;
    email: string;
    password: string;
  }) {
    // Hash password in service layer
    const hashedPassword = await Bun.password.hash(data.password);

    const [newUser] = await db
      .insert(table.users)
      .values({
        username: data.username,
        email: data.email,
        password: hashedPassword,
      })
      .returning({
        id: table.users.id,
        username: table.users.username,
        email: table.users.email,
        createdAt: table.users.createdAt,
      });

    return newUser;
  }

  static async getUserById(userId: string) {
    const users = await db
      .select({
        id: table.users.id,
        username: table.users.username,
        email: table.users.email,
        createdAt: table.users.createdAt,
      })
      .from(table.users)
      .where(eq(table.users.id, userId))
      .limit(1);

    return users[0] || null;
  }
}
