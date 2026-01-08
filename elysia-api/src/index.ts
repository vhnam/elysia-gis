import { Elysia } from "elysia";

import { privateConfig } from "./config/constants";
import { auth } from "./modules/auth";
import { user } from "./modules/user";

new Elysia()
  .use(auth)
  .use(user)
  .get("/", () => "Hello from Elysia + Bun in Docker 🔥")
  .listen(privateConfig.apiPort);

console.log(`Server running at http://localhost:${privateConfig.apiPort}`);
