# Elysia GIS API

A modern, type-safe REST API built with [ElysiaJS](https://elysiajs.com), Bun, and PostgreSQL.

## Features

- ✅ Type-safe API with ElysiaJS
- ✅ JWT Authentication
- ✅ CORS support
- ✅ Global error handling
- ✅ PostgreSQL with Drizzle ORM
- ✅ API versioning (/api/v1)
- ✅ Request validation
- ✅ Docker support

## Tech Stack

- **Runtime**: Bun
- **Framework**: ElysiaJS
- **Database**: PostgreSQL
- **ORM**: Drizzle
- **Validation**: Typebox (via ElysiaJS)
- **Authentication**: JWT (@elysiajs/jwt)

## Getting Started

### Prerequisites

- Bun installed
- PostgreSQL running
- pnpm (recommended)

### Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Copy environment variables:

   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your database credentials

5. Run database migrations:

   ```bash
   pnpm db:push
   ```

6. Start development server:
   ```bash
   pnpm dev
   ```

The API will be available at `http://localhost:4000`

## API Endpoints

### Health Check

```
GET /health
```

Returns server status.

### Authentication

#### Sign In

```
POST /api/v1/auth/sign-in
Content-Type: application/json

{
  "username": "string",
  "password": "string"
}

Response:
{
  "username": "string",
  "userId": "string",
  "token": "jwt_token"
}
```

### Users

#### List Users (Paginated)

```
GET /api/v1/users?page=1&limit=10

Response:
{
  "data": [
    {
      "id": "string",
      "username": "string",
      "email": "string",
      "createdAt": "timestamp"
    }
  ],
  "page": 1,
  "limit": 10,
  "total": 100,
  "totalPages": 10
}
```

#### Create User

```
POST /api/v1/users
Content-Type: application/json

{
  "username": "string",
  "email": "string",
  "password": "string"
}

Response:
{
  "id": "string",
  "username": "string",
  "email": "string",
  "createdAt": "timestamp"
}
```

#### Get User by ID

```
GET /api/v1/users/:id

Response:
{
  "id": "string",
  "username": "string",
  "email": "string",
  "createdAt": "timestamp"
}
```

#### Get Current User (Protected)

```
GET /api/v1/users/me
Authorization: Bearer <token>

Response:
{
  "id": "string",
  "username": "string",
  "email": "string",
  "createdAt": "timestamp"
}
```

## Authentication

Protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

To get a token, call the `/api/v1/auth/sign-in` endpoint with valid credentials.

## Error Responses

All errors follow this format:

```json
{
  "success": false,
  "error": "Error Type",
  "message": "Human readable message",
  "statusCode": 400
}
```

Common status codes:

- `400` - Bad Request / Validation Error
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

## Project Structure

```
src/
├── index.ts                    # Entry point with middleware pipeline
├── config/
│   ├── db.ts                  # Database connection
│   └── env.ts                 # Environment configuration
├── database/
│   ├── index.ts               # Table exports
│   └── users.schema.ts        # User schema
├── middleware/
│   ├── index.ts               # Middleware exports
│   ├── error.ts               # Global error handler
│   ├── cors.ts                # CORS configuration
│   └── auth.ts                # JWT authentication
├── modules/
│   ├── auth/
│   │   ├── index.ts           # Auth routes
│   │   ├── auth.model.ts      # Auth models
│   │   └── auth.service.ts    # Auth business logic
│   └── user/
│       ├── index.ts           # User routes
│       ├── user.model.ts      # User models
│       └── user.service.ts    # User business logic
└── utils/
    ├── response.ts            # Response helpers
    ├── jwt.ts                 # JWT utilities
    └── db.ts                  # Drizzle utilities
```

## Architecture Patterns

This project follows ElysiaJS best practices:

- **Controllers**: Elysia instances with method chaining
- **Services**: Abstract static classes for business logic
- **Models**: Namespace pattern with Elysia's `t` validation
- **Middleware**: Separate Elysia plugins with deduplication
- **Error Handling**: Use `status()` utility for HTTP errors

## Database

### Migrations

Generate migrations:

```bash
pnpm db:generate
```

Apply migrations:

```bash
pnpm db:migrate
```

Push schema changes:

```bash
pnpm db:push
```

Open Drizzle Studio:

```bash
pnpm db:studio
```

## Development

Run in development mode with hot reload:

```bash
pnpm dev
```

## Production

Build and run in production:

```bash
pnpm start
```

## Docker

The project includes Docker support. See `Dockerfile` and `docker-compose.yml` for configuration.

## License

MIT

## References

- [ElysiaJS Documentation](https://elysiajs.com)
- [ElysiaJS Best Practices](https://elysiajs.com/essential/best-practice)
- [Drizzle ORM](https://orm.drizzle.team)
- [Bun Documentation](https://bun.sh/docs)
