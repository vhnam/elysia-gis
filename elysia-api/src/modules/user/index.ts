import { Elysia, status } from "elysia";

import { UserService } from "./user.service";
import { UserModel } from "./user.model";
import { requireAuth } from "../../middleware";
import { JWTPayload } from "../../utils/jwt";

export const user = new Elysia({
  prefix: "/api/v1/users",
})
  // GET /api/v1/users - List all users with pagination
  .get(
    "/",
    async ({ query }) => {
      const { page = 1, limit = 10 } = query;
      return await UserService.getAllUsers(page, limit);
    },
    {
      query: UserModel.paginationQuery,
      response: {
        200: UserModel.paginatedUsersResponse,
      },
    }
  )
  // POST /api/v1/users - Create new user
  .post(
    "/",
    async ({ body }) => {
      return await UserService.createUser(body);
    },
    {
      body: UserModel.createUserBody,
      response: {
        200: UserModel.createUserResponse,
      },
    }
  )
  // GET /api/v1/users/:id - Get user by ID
  .get(
    "/:id",
    async ({ params }) => {
      const user = await UserService.getUserById(params.id);

      if (!user) {
        throw status(404, "User not found");
      }

      return user;
    },
    {
      response: {
        200: UserModel.getUserResponse,
      },
    }
  )
  // Protected routes (require authentication)
  .use(requireAuth)
  // GET /api/v1/users/me - Get current user profile
  .get(
    "/me",
    async ({ jwt }) => {
      // The 'jwt' object does not have a 'user' property directly.
      // Instead, use the jwt.verify() method to get the payload.
      const payload = (await jwt.verify()) as JWTPayload;
      // Now access userId on the payload itself
      const userProfile = await UserService.getUserById(payload.userId);

      if (!userProfile) {
        throw status(404, "User not found");
      }

      return userProfile;
    },
    {
      response: {
        200: UserModel.getUserResponse,
      },
    }
  );
