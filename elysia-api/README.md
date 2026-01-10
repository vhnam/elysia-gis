# Elysia GIS API

A modern, type-safe REST API built with [ElysiaJS](https://elysiajs.com), Bun, and PostgreSQL.

## Features

- ✅ Type-safe API with ElysiaJS
- ✅ JWT Authentication with session cookies
- ✅ Password reset flow with email notifications
- ✅ CORS support
- ✅ Global error handling
- ✅ PostgreSQL with Drizzle ORM
- ✅ API versioning (/api/v1)
- ✅ OpenAPI documentation
- ✅ Request validation with Typebox
- ✅ Structured logging with Pino
- ✅ Email templates with React Email
- ✅ Docker support

## Tech Stack

- **Runtime**: Bun
- **Framework**: ElysiaJS
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM
- **Validation**: Typebox (via ElysiaJS)
- **Authentication**: JWT (@elysiajs/jwt)
- **Logging**: Pino
- **Email**: Nodemailer + React Email
- **API Documentation**: OpenAPI (@elysiajs/openapi)

## Quick Start

### Prerequisites

- [Bun](https://bun.sh) installed (v1.0+)
- PostgreSQL running (v12+)
- pnpm (recommended) or npm/yarn

### Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up environment variables (see [Environment Variables](./docs/environment-variables.md))

4. Run database migrations:

   ```bash
   pnpm db:push
   ```

5. Start development server:

   ```bash
   pnpm dev
   ```

The API will be available at `http://localhost:4000`

### OpenAPI Documentation

Once the server is running, access the interactive API documentation at:

```
http://localhost:4000/openapi
```

## Documentation

- [API Endpoints](./docs/api-endpoints.md) - Complete API reference
- [Authentication](./docs/authentication.md) - Authentication guide
- [Database](./docs/database.md) - Database setup and migrations
- [Email Configuration](./docs/email.md) - Email setup and templates
- [Development](./docs/development.md) - Development workflow
- [Deployment](./docs/deployment.md) - Production deployment guide
- [Environment Variables](./docs/environment-variables.md) - Environment configuration
- [Troubleshooting](./docs/troubleshooting.md) - Common issues and solutions

## Available Scripts

```bash
# Development
pnpm dev              # Start development server with hot reload
pnpm start            # Start production server
pnpm build            # Build for production

# Database
pnpm db:generate      # Generate migrations
pnpm db:migrate       # Apply migrations
pnpm db:push          # Push schema (development only)
pnpm db:reset         # Reset database (⚠️ deletes all data)
pnpm db:studio        # Open Drizzle Studio

# Utilities
pnpm email            # Preview email templates
pnpm format           # Format code
pnpm check            # Check code formatting
```

## Project Structure

```
src/
├── index.ts                    # Entry point
├── config/                     # Configuration files
├── database/                   # Database schemas
├── middleware/                 # Middleware (CORS, auth, error handling)
├── modules/                    # Feature modules
│   ├── auth/                  # Authentication
│   ├── health/                # Health check
│   ├── user/                  # User management
│   └── province/              # Province module
├── emails/                     # React Email templates
├── scripts/                    # Utility scripts
└── utils/                      # Utility functions
```

## License

MIT

## References

- [ElysiaJS Documentation](https://elysiajs.com)
- [ElysiaJS Best Practices](https://elysiajs.com/essential/best-practice)
- [Drizzle ORM](https://orm.drizzle.team)
- [Bun Documentation](https://bun.sh/docs)
- [React Email](https://react.email)
- [Pino Logger](https://getpino.io)
