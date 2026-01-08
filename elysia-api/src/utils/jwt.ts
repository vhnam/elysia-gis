import jwt from '@elysiajs/jwt';

import { env } from '@/config/env';

export const jwtInstance = jwt({
  name: 'jwt',
  secret: env.JWT_SECRET,
  exp: env.JWT_EXPIRES_IN,
});

export type JWTPayload = {
  userId: string;
  username: string;
};
