import Elysia from 'elysia';

import { HealthModel } from './health.model';

export const healthController = new Elysia({
  prefix: '/api/v1/health',
  tags: ['Health'],
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
