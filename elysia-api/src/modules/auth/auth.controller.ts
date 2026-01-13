import { Elysia } from 'elysia';

import { env } from '@/config/env';

import { jwtInstance } from '@/utils/jwt';
import logger from '@/utils/logger';

import { AuthModel } from './auth.model';
import { Auth } from './auth.service';

export const authController = new Elysia({
  prefix: '/api/v1/auth',
})
  .use(jwtInstance)
  .post(
    '/sign-in',
    async ({ body, cookie: { session }, jwt }) => {
      const result = await Auth.signIn(body);

      // If authentication fails, return error response
      if (!result || !result.username || !result.id) {
        return 'Invalid username or password';
      }

      const { username, id, firstName, lastName, email } = result;

      // Generate JWT token
      const token = await jwt.sign({ userId: id, username });

      // Set session cookie
      session.value = token;
      session.httpOnly = true;
      session.secure = env.NODE_ENV === 'production';

      return {
        id,
        username,
        firstName,
        lastName,
        email,
        token,
      };
    },
    {
      body: AuthModel.signInRequest,
      response: {
        200: AuthModel.signInResponse,
        400: AuthModel.signInInvalid,
      },
    },
  )
  .post(
    '/forgot-password',
    async ({ body, set }) => {
      try {
        const result = await Auth.forgotPassword(body);
        return result;
      } catch (error) {
        logger.error('Error in forgot-password endpoint: %s', {
          error,
          email: body.email,
        });
        set.status = 500;
        throw error;
      }
    },
    {
      body: AuthModel.forgotPasswordRequest,
      response: {
        200: AuthModel.forgotPasswordResponse,
      },
    },
  )
  .post(
    '/reset-password',
    async ({ body }) => {
      const result = await Auth.resetPassword(body);
      return result;
    },
    {
      body: AuthModel.resetPasswordRequest,
      response: {
        200: AuthModel.forgotPasswordResponse,
      },
    },
  );
