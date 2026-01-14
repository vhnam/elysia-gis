import { Elysia, status } from 'elysia';

import { auth } from '@/utils/auth';

import { UserModel } from './user.model';
import { UserService } from './user.service';

export const userController = new Elysia({
  prefix: '/api/v1/users',
  tags: ['Users'],
})
  .derive(async ({ request: { headers } }) => {
    const session = await auth.api.getSession({
      headers,
    });

    return {
      auth: session
        ? {
            user: session.user,
            session: session.session,
          }
        : null,
    };
  })
  .get(
    '/',
    async ({ query, auth }) => {
      if (!auth?.user) {
        throw status(401, 'Unauthorized');
      }
      return await UserService.getAllUsers(query as UserModel.GetUsersRequest);
    },
    {
      query: UserModel.getUsersRequest,
      response: UserModel.getUsersResponse,
    },
  )
  .get(
    '/:id',
    async ({ params, auth }) => {
      if (!auth?.user) {
        throw status(401, 'Unauthorized');
      }
      const user = await UserService.getUserById(params.id);

      if (!user) {
        throw status(404, 'User not found');
      }

      return user;
    },
    {
      params: UserModel.getUserRequest,
      response: UserModel.userResponse,
    },
  )
  .post(
    '/',
    async ({ body, auth }) => {
      if (!auth?.user) {
        throw status(401, 'Unauthorized');
      }
      return await UserService.createUser(body);
    },
    {
      body: UserModel.createUserRequest,
      response: UserModel.userResponse,
    },
  )
  .get(
    '/me',
    async ({ auth }) => {
      if (!auth?.user) {
        throw status(401, 'Unauthorized');
      }

      const userProfile = await UserService.getUserById(auth.user.id);

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
