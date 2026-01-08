import { Elysia } from "elysia";

import { privateConfig } from "./constants/config";

import { auth } from "./modules/auth";

new Elysia()
  .use(auth)
  .get("/", () => "Hello from Elysia + Bun in Docker 🔥")
  .listen(privateConfig.apiPort);

console.log(`Server running at http://localhost:${privateConfig.apiPort}`);
