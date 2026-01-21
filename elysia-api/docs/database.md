# Database

The API uses PostgreSQL with Drizzle ORM for database operations.

## Setup

1. Ensure PostgreSQL is running
2. Create a database (or use the default `elysia-gis`):

```bash
createdb elysia-gis
```

3. Configure database connection in `.env`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=elysia-gis
DB_USERNAME=postgres
DB_PASSWORD=postgres
```

## Migrations

### Generate Migrations

Generate migration files from schema changes:

```bash
pnpm db:generate
```

This creates SQL migration files in the `drizzle/` directory.

### Apply Migrations

Apply pending migrations to the database:

```bash
pnpm db:migrate
```

### Push Schema (Development)

For development, you can push schema changes directly without generating migration files:

```bash
pnpm db:push
```

⚠️ **Warning:** This bypasses migration files and should only be used in development.

### Reset Database

Reset the database (⚠️ **WARNING**: This will delete all data):

```bash
pnpm db:reset
```

## Drizzle Studio

Open Drizzle Studio for a visual database GUI:

```bash
pnpm db:studio
```

This opens a web interface at `http://localhost:4983` where you can browse and edit database records.

## Schema Location

Database schemas are defined in:

- `src/modules/user/user.table.ts` - User table schema
- `src/modules/auth/auth.table.ts` - Auth-related tables (reset tokens, etc.)

All schemas are exported from `src/database/schema.ts`.
