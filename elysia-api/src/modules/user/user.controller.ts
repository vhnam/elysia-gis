import { Elysia, status } from 'elysia';

import { JWTPayload } from '@/utils/jwt';

import { requireAuth } from '@/middleware';

import { UserModel } from './user.model';
import { UserService } from './user.service';

export const userController = new Elysia({
  prefix: '/api/v1/users',
})
  .use(requireAuth)
  .get(
    '/',
    async ({ query }) => {
      return await UserService.getAllUsers(query as UserModel.GetUsersRequest);
    },
    {
      query: UserModel.getUsersRequest,
      response: UserModel.getUsersResponse,
    },
  )
  .get(
    '/:id',
    async ({ params }: { params: UserModel.GetUserRequest }) => {
      const user = await UserService.getUserById(params.id);

      if (!user) {
        throw status(404, 'User not found');
      }

      return user;
    },
    {
      response: UserModel.userResponse,
    },
  )
  .post(
    '/',
    async ({ body }) => {
      return await UserService.createUser(body);
    },
    {
      body: UserModel.createUserRequest,
      response: UserModel.userResponse,
    },
  )
  .get(
    '/me',
    async ({ jwt }) => {
      // The 'jwt' object does not have a 'user' property directly.
      // Instead, use the jwt.verify() method to get the payload.
      const payload = (await jwt.verify()) as JWTPayload;
      // Now access userId on the payload itself
      const userProfile = await UserService.getUserById(payload.userId);

      if (!userProfile) {
        throw status(404, 'User not found');
      }

      return userProfile;
    },
    {
      response: {
        200: UserModel.userResponse,
      },
    },
  );
