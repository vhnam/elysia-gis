# Configuration

## API Endpoint

The API endpoint is configured in `src/utils/api.ts`. By default, it points to:

```typescript
baseURL: 'http://localhost:4000/api/v1';
```

### Changing the API Endpoint

Update the `baseURL` in `src/utils/api.ts`:

```typescript
import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.VITE_API_URL || 'http://localhost:4000/api/v1',
});
```

### Using Environment Variables

For different environments, you can use environment variables:

1. Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:4000/api/v1
```

2. Update `src/utils/api.ts`:

```typescript
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api/v1',
});
```

**Note:** In Vite, environment variables must be prefixed with `VITE_` to be exposed to the client.

## Development Server

The development server is configured in `vite.config.ts`:

```typescript
server: {
  host: '0.0.0.0',
  port: 3000,
}
```

To change the port, update the `port` value in `vite.config.ts` or set it via environment variable:

```bash
VITE_PORT=3001 pnpm dev
```

## Build Configuration

Build configuration is handled by Vite. The output directory is `dist/` by default.

For production builds:

```bash
pnpm build
```

The built files will be in the `dist/` directory, ready to be served by any static file server.

## CORS

If you're running the API on a different origin, ensure CORS is properly configured on the API server to allow requests from your frontend URL.

See the [API documentation](../elysia-api/docs/development.md) for CORS configuration.
