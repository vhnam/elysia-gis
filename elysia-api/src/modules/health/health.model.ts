import { t } from 'elysia';

export namespace HealthModel {
  export const healthResponse = t.Object({
    status: t.String(),
    timestamp: t.String(),
  });
}
