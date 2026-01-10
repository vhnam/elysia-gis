import Elysia from 'elysia';

import { HealthModel } from './health.model';

export const health = new Elysia({
  prefix: '/api/v1/health',
}).get(
  '/',
  () => ({
    status: 'ok',
    timestamp: new Date().toISOString(),
  }),
  {
    response: HealthModel.healthResponse,
  },
);
