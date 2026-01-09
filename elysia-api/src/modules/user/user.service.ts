import { eq, like, sql } from 'drizzle-orm';

import db from '@/config/db';

import { UserModel } from './user.model';
import { tableUsers } from './user.table';

export abstract class UserService {
  static async getAllUsers({
    search,
    page = 1,
    limit = 10,
  }: UserModel.GetUsersRequest): Promise<UserModel.GetUsersResponse> {
    const users = await db
      .select({
        id: tableUsers.id,
        username: tableUsers.username,
        email: tableUsers.email,
        createdAt: tableUsers.createdAt,
      })
      .from(tableUsers)
      .limit(limit)
      .offset((page - 1) * limit)
      .where(search ? like(tableUsers.username, `%${search}%`) : undefined);

    const countResult = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(tableUsers);

    const total = countResult[0]?.count || 0;

    return {
      data: users,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  static async createUser(
    data: UserModel.CreateUserRequest,
  ): Promise<UserModel.UserResponse> {
    const hashedPassword = await Bun.password.hash(data.password);

    const [newUser] = await db
      .insert(tableUsers)
      .values({
        username: data.username,
        email: data.email,
        password: hashedPassword,
      })
      .returning({
        id: tableUsers.id,
        username: tableUsers.username,
        email: tableUsers.email,
        createdAt: tableUsers.createdAt,
      });

    return newUser;
  }

  static async getUserById(
    userId: string,
  ): Promise<UserModel.UserResponse | null> {
    const users = await db
      .select({
        id: tableUsers.id,
        username: tableUsers.username,
        email: tableUsers.email,
        createdAt: tableUsers.createdAt,
      })
      .from(tableUsers)
      .where(eq(tableUsers.id, userId))
      .limit(1);

    return users[0] || null;
  }
}
