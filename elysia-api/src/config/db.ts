import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// Use environment variables with fallback for local development
// In Docker, DB_HOST should be "db" (the service name)
// For local development, use "localhost"
const dbHost = process.env.DB_HOST || "localhost";
const dbPort = process.env.DB_PORT || "5432";
const dbName = process.env.DB_NAME || "elysia-gis";
const dbUser = process.env.DB_USERNAME || "postgres";
const dbPassword = process.env.DB_PASSWORD || "postgres";

const dbUrl = `postgresql://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;

const client = postgres(dbUrl);
const db = drizzle(client);

export default db;
