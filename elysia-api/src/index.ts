import { openapi } from '@elysiajs/openapi';
import { Elysia } from 'elysia';

import { env } from '@/config/env';

import { authController } from '@/modules/auth';
import { healthController } from '@/modules/health';
import { userController } from '@/modules/user';

import { corsMiddleware, errorHandler } from '@/middleware';

const app = new Elysia()
  // 1.  Middlewares
  .use(corsMiddleware)
  .use(errorHandler)

  .use(openapi())

  // 2. Modules
  .use(healthController)
  .use(authController)
  .use(userController)

  // 3. Catch-all 404
  .all('*', ({ set }) => {
    set.status = 404;
    return {
      success: false,
      error: 'Not Found',
      message: 'The requested endpoint does not exist',
      statusCode: 404,
    };
  })
  .listen({
    port: env.API_PORT,
    hostname: '0.0.0.0',
  });

console.log(`Server running at http://0.0.0.0:${env.API_PORT}`);
console.log(`API available at http://localhost:${env.API_PORT}/api/v1`);
