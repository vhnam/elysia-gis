# Deployment

## Building for Production

Build the application:

```bash
pnpm build
```

This creates an optimized production build in the `dist/` directory.

## Preview Production Build

Preview the production build locally:

```bash
pnpm preview
```

## Static Hosting

The built application is a static site and can be deployed to any static hosting service:

### Vercel

1. Install Vercel CLI:

```bash
npm i -g vercel
```

2. Deploy:

```bash
vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

### Netlify

1. Install Netlify CLI:

```bash
npm i -g netlify-cli
```

2. Build and deploy:

```bash
pnpm build
netlify deploy --prod --dir=dist
```

### Other Static Hosts

The `dist/` directory can be deployed to:

- AWS S3 + CloudFront
- GitHub Pages
- Cloudflare Pages
- Any static file server

## Docker

The project includes a `Dockerfile` for containerized deployment.

### Building Docker Image

```bash
docker build -t elysia-web .
```

### Running Container

```bash
docker run -p 3000:3000 elysia-web
```

### Docker Compose

If using docker-compose (see root `compose.yml`):

```yaml
web:
  image: elysia-web
  build:
    context: ./elysia-web
    dockerfile: Dockerfile
  ports:
    - '3000:3000'
  environment:
    VITE_API_URL: http://api:4000/api/v1
```

## Environment Variables

For production, set environment variables:

```env
VITE_API_URL=https://api.example.com/api/v1
```

**Important:** Environment variables must be prefixed with `VITE_` to be available in the client bundle.

Build-time variables are embedded into the bundle during `pnpm build`.

## API Configuration

Ensure the API endpoint is correctly configured for your production environment:

1. Update `src/utils/api.ts` or use environment variables
2. Rebuild the application after changing the API URL
3. Ensure CORS is configured on the API server to allow requests from your frontend domain

## Performance Optimization

The production build includes:

- Code splitting
- Tree shaking
- Minification
- Asset optimization

## Server-Side Rendering (SSR)

TanStack Start supports SSR. For SSR deployment:

1. Ensure your hosting platform supports Node.js
2. The build process will generate SSR-compatible output
3. Configure your server to run the SSR build

## Monitoring

Consider setting up:

- Error tracking (e.g., Sentry)
- Analytics
- Performance monitoring
- Uptime monitoring

## Security

- Ensure HTTPS is enabled in production
- Review and configure Content Security Policy (CSP) headers
- Validate all API responses
- Never expose sensitive API keys in client code
