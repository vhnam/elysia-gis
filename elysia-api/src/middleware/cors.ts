import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";

import { env } from "@/config/env";

export const corsMiddleware = new Elysia({
  name: "cors-middleware",
}).use(
  cors({
    origin:
      env.NODE_ENV === "production"
        ? process.env.ALLOWED_ORIGINS?.split(",") || []
        : true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
