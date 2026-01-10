import { openapi } from '@elysiajs/openapi';
import { Elysia } from 'elysia';

import { env } from '@/config/env';
import { corsMiddleware, errorHandler } from '@/middleware';
import { auth } from '@/modules/auth';
import { health } from '@/modules/health';
import { user } from '@/modules/user';

const app = new Elysia()
  // 1.  Middlewares
  .use(corsMiddleware)
  .use(errorHandler)

  .use(openapi())

  // 2. Modules
  .use(health)
  .use(auth)
  .use(user)

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

  .listen(env.API_PORT);

console.log(`Server running at http://localhost:${env.API_PORT}`);
console.log(`API available at http://localhost:${env.API_PORT}/api/v1`);
