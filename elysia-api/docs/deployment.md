# Deployment

## Production Build

Build the application:

```bash
pnpm build
```

Run in production mode:

```bash
pnpm start
```

## Environment Variables

Ensure all environment variables are properly set for production. See [Environment Variables](./environment-variables.md) for the complete list.

**Important production settings:**

```env
NODE_ENV=production
JWT_SECRET=<strong-random-secret>
API_PORT=4000
```

## Docker

### Building the Image

```bash
docker build -t elysia-api .
```

### Running the Container

```bash
docker run -p 4000:4000 --env-file .env elysia-api
```

Or with docker-compose (if you have a `docker-compose.yml`):

```bash
docker-compose up -d
```

## Security Checklist

Before deploying to production:

- [ ] Change `JWT_SECRET` to a strong, random value
- [ ] Use secure email credentials (never commit to version control)
- [ ] Enable HTTPS (session cookies are set to `secure` in production)
- [ ] Set proper CORS origins
- [ ] Use environment-specific database credentials
- [ ] Review and restrict database user permissions
- [ ] Set up proper logging and monitoring
- [ ] Configure rate limiting if needed
- [ ] Set up database backups

## Database Migrations in Production

In production, always use migrations:

```bash
# Generate migrations from schema changes
pnpm db:generate

# Review the generated migration files
# Then apply them
pnpm db:migrate
```

Never use `pnpm db:push` in production.

## Monitoring

Consider setting up:

- Application monitoring (e.g., Sentry, DataDog)
- Database monitoring
- Uptime monitoring
- Log aggregation

## Scaling

For horizontal scaling:

1. Use a load balancer
2. Ensure session/JWT tokens are stateless (already implemented)
3. Use a shared database
4. Consider using Redis for rate limiting or caching if needed

