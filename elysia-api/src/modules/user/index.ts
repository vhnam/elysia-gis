import { Elysia } from "elysia";

import {
  _createUser,
  getAllUsers,
  createUser,
  type GetAllUsersParams,
} from "./user.service";
import { makePaginationResponse } from "../../utils/response";
import { type User } from "../../database/users.schema";

export const user = new Elysia({
  prefix: "/api",
})
  .get("/users", async ({ query }) => {
    try {
      const { page = 1, limit = 10 } = query as GetAllUsersParams;

      const users = await getAllUsers({
        page,
        limit,
      });
      return makePaginationResponse<User>(users, page, limit);
    } catch (error) {
      console.error("Error fetching users:", error);
      return {
        error: "Failed to fetch users",
        message: error instanceof Error ? error.message : "Unknown error",
      };
    }
  })
  .post(
    "/users",
    async ({ body }) => {
      try {
        const hashPassword = await Bun.password.hash(body.password);
        const payload = {
          username: body.username,
          password: hashPassword,
          email: body.email,
        };
        const newUser = await createUser(payload);
        return newUser;
      } catch (error) {
        console.error("Error creating user:", error);
        return {
          error: "Failed to create user",
          message: error instanceof Error ? error.message : "Unknown error",
        };
      }
    },
    { body: _createUser }
  );
