import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const dbUrl = `postgresql://postgres:postgres@localhost:5432/elysia-gis`;

const client = postgres(dbUrl);
const db = drizzle(client);

export default db;
