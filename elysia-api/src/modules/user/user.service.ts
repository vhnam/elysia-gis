import { eq, like, sql } from 'drizzle-orm';

import { db } from '@/config/db';

import { UserModel } from './user.model';
import { userSchema } from './user.schema';

export abstract class UserService {
  static async getAllUsers({
    search,
    page = 1,
    limit = 10,
  }: UserModel.GetUsersRequest): Promise<UserModel.GetUsersResponse> {
    const users = await db
      .select({
        id: userSchema.id,
        name: userSchema.name,
        email: userSchema.email,
        emailVerified: userSchema.emailVerified,
        image: userSchema.image,
        createdAt: userSchema.createdAt,
        updatedAt: userSchema.updatedAt,
      })
      .from(userSchema)
      .limit(limit)
      .offset((page - 1) * limit)
      .where(search ? like(userSchema.name, `%${search}%`) : undefined);

    const countResult = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(userSchema);

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
        id: userSchema.id,
        name: userSchema.name,
        email: userSchema.email,
        emailVerified: userSchema.emailVerified,
        image: userSchema.image,
        createdAt: userSchema.createdAt,
        updatedAt: userSchema.updatedAt,
      })
      .from(userSchema)
      .where(eq(userSchema.id, userId))
      .limit(1);

    return users[0] || null;
  }

  static async createUser(
    data: UserModel.CreateUserRequest,
  ): Promise<UserModel.UserResponse> {
    // Note: User creation should be handled by better-auth
    // This method is kept for backward compatibility but should use better-auth's signUp
    const [newUser] = await db
      .insert(userSchema)
      .values({
        name: data.name,
        email: data.email,
        emailVerified: false,
      })
      .returning({
        id: userSchema.id,
        name: userSchema.name,
        email: userSchema.email,
        emailVerified: userSchema.emailVerified,
        image: userSchema.image,
        createdAt: userSchema.createdAt,
        updatedAt: userSchema.updatedAt,
      });

    return newUser;
  }

  static async updateUser(
    userId: string,
    data: UserModel.UpdateUserRequest,
  ): Promise<UserModel.UserResponse> {
    const updateData: {
      name?: string;
      email?: string;
      image?: string;
      updatedAt: Date;
    } = {
      updatedAt: new Date(),
    };

    if (data.name) updateData.name = data.name;
    if (data.email) updateData.email = data.email;
    if (data.image) updateData.image = data.image;

    const [updatedUser] = await db
      .update(userSchema)
      .set(updateData)
      .where(eq(userSchema.id, userId))
      .returning({
        id: userSchema.id,
        name: userSchema.name,
        email: userSchema.email,
        emailVerified: userSchema.emailVerified,
        image: userSchema.image,
        createdAt: userSchema.createdAt,
        updatedAt: userSchema.updatedAt,
      });

    return updatedUser;
  }
}
