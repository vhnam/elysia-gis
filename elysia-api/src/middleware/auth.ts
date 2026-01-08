import { Elysia, status } from 'elysia';

import { type JWTPayload, jwtInstance } from '@/utils/jwt';

export interface AuthContext {
  userId: string;
  username: string;
}

export const jwtAuth = new Elysia({
  name: 'jwt-auth',
})
  .use(jwtInstance)
  .derive(async ({ headers, jwt }) => {
    const authHeader = headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      throw status(401, 'Missing or invalid authorization header');
    }

    const token = authHeader.substring(7);
    const payload = await jwt.verify(token);

    if (!payload) {
      throw status(401, 'Invalid or expired token');
    }

    return {
      user: payload as JWTPayload,
    };
  });

export const requireAuth = new Elysia({
  name: 'require-auth',
}).use(jwtAuth);
