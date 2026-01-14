import openapi from '@elysiajs/openapi';

import { auth } from './auth';

let _schema: ReturnType<typeof auth.api.generateOpenAPISchema>;
const getSchema = async () => (_schema ??= auth.api.generateOpenAPISchema());

const OpenAPI = {
  getPaths: (prefix = '/api/v1/auth') =>
    getSchema().then(({ paths }) => {
      const reference: typeof paths = Object.create(null);

      for (const path of Object.keys(paths)) {
        const key = prefix + path;
        reference[key] = paths[path];

        for (const method of Object.keys(paths[path])) {
          const operation = (reference[key] as any)[method];

          operation.tags = ['Auth'];
        }
      }

      return reference;
    }) as Promise<any>,
  components: getSchema().then(({ components }) => components) as Promise<any>,
} as const;

const betterAuthPaths = await OpenAPI.getPaths();
const betterAuthComponents = await OpenAPI.components;

export const openapiHandler = openapi({
  documentation: {
    info: {
      title: 'Elysia GIS API',
      version: '1.0.0',
      description:
        'A modern, type-safe REST API built with ElysiaJS and Better Auth',
    },
    tags: [
      { name: 'Auth', description: 'Better Auth authentication endpoints' },
      { name: 'Health', description: 'Health check endpoints' },
      { name: 'Users', description: 'User management endpoints' },
    ],
    paths: {
      ...betterAuthPaths,
    },
    components: betterAuthComponents || {},
  },
});
