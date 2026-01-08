import { Elysia } from 'elysia';

import { env } from './config/env';
import { corsMiddleware, errorHandler } from './middleware';
import { auth } from './modules/auth';
import { user } from './modules/user';

const app = new Elysia()
  // 1. CORS middleware (must be first for preflight requests)
  .use(corsMiddleware)

  // 2. Error handler (global)
  .use(errorHandler)

  // 3. Health check endpoint (no auth required)
  .get('/health', () => ({
    status: 'ok',
    timestamp: new Date().toISOString(),
  }))

  // 4. Module routes (versioned API)
  .use(auth)
  .use(user)

  // 5. Catch-all 404
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
