import { Elysia, status, t } from 'elysia';

import { auth } from '@/utils/auth';

import { UserModel } from '../user/user.model';
import { UserService } from '../user/user.service';

export const authController = new Elysia({
  prefix: '/api/v1/auth',
  tags: ['Auth'],
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
    '/account-info',
    async ({ auth }) => {
      if (!auth?.user) {
        throw status(401, 'Unauthorized');
      }

      const userProfile = await UserService.getUserById(auth.user.id);

      if (!userProfile) {
        throw status(404, 'User not found');
      }

      return {
        user: userProfile,
        data: {},
      };
    },
    {
      response: {
        200: t.Object({
          user: UserModel.userResponse,
          data: t.Record(t.String(), t.Any()),
        }),
      },
    },
  );
