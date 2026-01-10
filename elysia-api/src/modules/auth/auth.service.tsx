import { createId } from '@paralleldrive/cuid2';
import { render } from '@react-email/render';
import { and, eq, gte, isNull } from 'drizzle-orm';
import { status } from 'elysia';
import React from 'react';

import db from '@/config/db';
import { env } from '@/config/env';

import { transporter } from '@/utils/email';
import logger from '@/utils/logger';

import ResetPasswordEmail from '@/emails/reset-password';

import { UserService, tableUsers } from '@/modules/user';

import type { AuthModel } from './auth.model';
import { tableResetPasswordTokens } from './auth.table';

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

  static async forgotPassword({
    email,
  }: AuthModel.ForgotPasswordRequest): Promise<AuthModel.ForgotPasswordResponse> {
    try {
      const users = await db
        .select()
        .from(tableUsers)
        .where(eq(tableUsers.email, email));

      if (users.length === 0) {
        logger.info('Forgot password requested for non-existing user: %s', {
          email,
        });

        return {
          message: 'If the email exists, a reset link has been sent.',
        };
      }

      const user = users[0];
      const token = createId();
      const tokenHash = await Bun.password.hash(token);
      const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24);
      const usedAt = null;

      const [insertedToken] = await db
        .insert(tableResetPasswordTokens)
        .values({
          tokenHash,
          userId: user.id,
          expiresAt,
          usedAt,
        })
        .returning({
          id: tableResetPasswordTokens.id,
          tokenHash: tableResetPasswordTokens.tokenHash,
          userId: tableResetPasswordTokens.userId,
        });

      if (!insertedToken) {
        logger.error(
          {
            email,
            userId: user.id,
          },
          'Failed to insert reset password token',
        );
        throw new Error('Failed to create reset password token');
      }

      logger.info(
        {
          tokenId: insertedToken.id,
          userId: insertedToken.userId,
          email,
        },
        'Reset password token created successfully',
      );

      logger.info(JSON.stringify(env));

      const html = await render(<ResetPasswordEmail token={token} />);

      try {
        await transporter.sendMail({
          from: 'admin@elysia-gis.com',
          to: email,
          subject: 'Verify your email address',
          html,
        });
      } catch (emailError) {
        logger.error('Failed to send reset password email: %s', {
          error: emailError,
          email,
        });
        // Still return success to prevent email enumeration
        return {
          message: 'If the email exists, a reset link has been sent.',
        };
      }

      return {
        message: 'If the email exists, a reset link has been sent.',
      };
    } catch (error) {
      logger.error('Error in forgotPassword: %s', {
        error,
        email,
      });
      throw error;
    }
  }

  static async resetPassword({
    token,
    password,
  }: AuthModel.ResetPasswordRequest): Promise<AuthModel.ResetPasswordResponse> {
    // Get all unused, non-expired tokens to verify against
    // We can't directly compare hashed tokens because Bun.password.hash uses salt
    const now = new Date();
    const resetPasswordTokens = await db
      .select()
      .from(tableResetPasswordTokens)
      .where(
        and(
          isNull(tableResetPasswordTokens.usedAt),
          gte(tableResetPasswordTokens.expiresAt, now),
        ),
      );

    // Verify the token hash against each candidate token
    // We need to verify because Bun.password.hash uses salt (different hash each time)
    let resetPasswordToken = null;

    for (const candidateToken of resetPasswordTokens) {
      const isValid = await Bun.password.verify(
        token,
        candidateToken.tokenHash,
      );
      if (isValid) {
        resetPasswordToken = candidateToken;
        break;
      }
    }

    if (!resetPasswordToken) {
      logger.info('Invalid or expired token: %s', {
        token,
      });

      return {
        error: 'INVALID_OR_EXPIRED_TOKEN',
        message: 'Invalid or expired token',
      };
    }

    const users = await db
      .select()
      .from(tableUsers)
      .where(eq(tableUsers.id, resetPasswordToken.userId));

    if (users.length === 0) {
      logger.info('Reset password token requested for non-existing user: %s', {
        userId: resetPasswordToken.userId,
      });

      return {
        error: 'INVALID_OR_EXPIRED_TOKEN',
        message: 'Invalid or expired token',
      };
    }

    const user = users[0];

    await UserService.updateUser(user.id, { password });

    await db
      .update(tableResetPasswordTokens)
      .set({
        usedAt: new Date(),
      })
      .where(eq(tableResetPasswordTokens.id, resetPasswordToken.id));

    return {
      message: 'Password reset successfully',
    };
  }
}
