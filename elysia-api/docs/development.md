# Development Guide

## Getting Started

1. Install dependencies:

```bash
pnpm install
```

2. Set up environment variables (see [Environment Variables](./environment-variables.md))

3. Run database migrations:

```bash
pnpm db:push
```

4. Start development server:

```bash
pnpm dev
```

The API will be available at `http://localhost:4000`

## Available Scripts

### Development

```bash
pnpm dev
```

Runs the server in development mode with hot reload.

### Email Preview

```bash
pnpm email
```

Starts a local email preview server at `http://localhost:4100` for viewing email templates.

### Code Formatting

```bash
# Format code
pnpm format

# Check formatting
pnpm check
```

### Database

```bash
# Generate migrations
pnpm db:generate

# Apply migrations
pnpm db:migrate

# Push schema (development only)
pnpm db:push

# Reset database
pnpm db:reset

# Open Drizzle Studio
pnpm db:studio
```

## Project Structure

```
src/
├── index.ts                    # Entry point
├── config/                     # Configuration files
├── database/                   # Database schemas
├── middleware/                 # Middleware (CORS, auth, error handling)
├── modules/                    # Feature modules
│   ├── auth/                  # Authentication module
│   ├── health/                # Health check module
│   ├── user/                  # User management module
│   └── province/              # Province module
├── emails/                     # React Email templates
├── scripts/                    # Utility scripts
└── utils/                      # Utility functions
```

## Architecture Patterns

This project follows ElysiaJS best practices:

- **Controllers**: Elysia instances with method chaining
- **Services**: Abstract static classes for business logic
- **Models**: Namespace pattern with Elysia's `t` validation
- **Middleware**: Separate Elysia plugins with deduplication
- **Error Handling**: Use `status()` utility for HTTP errors

## Hot Reload

The development server automatically reloads when you make changes to the code. No need to manually restart.

## Debugging

Check the console output for:

- Server startup messages
- Request logs
- Error messages

For more detailed logging, check the logger configuration in `src/utils/logger.ts`.
