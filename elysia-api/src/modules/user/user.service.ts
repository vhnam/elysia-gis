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
        firstName: tableUsers.firstName,
        lastName: tableUsers.lastName,
        email: tableUsers.email,
        createdAt: tableUsers.createdAt,
        updatedAt: tableUsers.updatedAt,
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

  static async getUserById(
    userId: string,
  ): Promise<UserModel.UserResponse | null> {
    const users = await db
      .select({
        id: tableUsers.id,
        username: tableUsers.username,
        firstName: tableUsers.firstName,
        lastName: tableUsers.lastName,
        email: tableUsers.email,
        createdAt: tableUsers.createdAt,
        updatedAt: tableUsers.updatedAt,
      })
      .from(tableUsers)
      .where(eq(tableUsers.id, userId))
      .limit(1);

    return users[0] || null;
  }

  static async createUser(
    data: UserModel.CreateUserRequest,
  ): Promise<UserModel.UserResponse> {
    const hashedPassword = await Bun.password.hash(data.password);

    const [newUser] = await db
      .insert(tableUsers)
      .values({
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: hashedPassword,
      })
      .returning({
        id: tableUsers.id,
        username: tableUsers.username,
        firstName: tableUsers.firstName,
        lastName: tableUsers.lastName,
        email: tableUsers.email,
        createdAt: tableUsers.createdAt,
        updatedAt: tableUsers.updatedAt,
      });

    return newUser;
  }

  static async updateUser(
    userId: string,
    data: UserModel.UpdateUserRequest,
  ): Promise<UserModel.UserResponse> {
    const hashedPassword = data.password
      ? await Bun.password.hash(data.password)
      : undefined;

    const updateData = {
      ...(hashedPassword && { password: hashedPassword }),
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      updatedAt: new Date(),
    };

    const [updatedUser] = await db
      .update(tableUsers)
      .set(updateData)
      .where(eq(tableUsers.id, userId))
      .returning({
        id: tableUsers.id,
        username: tableUsers.username,
        firstName: tableUsers.firstName,
        lastName: tableUsers.lastName,
        email: tableUsers.email,
        createdAt: tableUsers.createdAt,
        updatedAt: tableUsers.updatedAt,
      });

    return updatedUser;
  }
}
