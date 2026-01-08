import { Elysia } from 'elysia';

import { env } from '@/config/env';
import { jwtInstance } from '@/utils/jwt';

import { AuthModel } from './auth.model';
import { Auth } from './auth.service';

export const auth = new Elysia({
  prefix: '/api/v1/auth',
})
  .use(jwtInstance)
  .post(
    '/sign-in',
    async ({ body, cookie: { session }, jwt }) => {
      const result = await Auth.signIn(body);

      // If authentication fails, return error response
      if (!result || !result.username || !result.userId) {
        return 'Invalid username or password';
      }

      const { username, userId } = result;

      // Generate JWT token
      const token = await jwt.sign({ userId, username });

      // Set session cookie
      session.value = token;
      session.httpOnly = true;
      session.secure = env.NODE_ENV === 'production';

      return {
        username,
        userId,
        token,
      };
    },
    {
      body: AuthModel.signInBody,
      response: {
        200: AuthModel.signInResponse,
        400: AuthModel.signInInvalid,
      },
    },
  );
