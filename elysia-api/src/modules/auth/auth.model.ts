import { t } from 'elysia';

export namespace AuthModel {
  export const signInRequest = t.Object({
    username: t.String(),
    password: t.String(),
  });

  export const signInResponse = t.Object({
    username: t.String(),
    userId: t.String(),
    token: t.String(),
  });

  export const signInInvalid = t.Literal('Invalid username or password');

  export type SignInRequest = typeof signInRequest.static;
  export type SignInResponse = typeof signInResponse.static;
  export type SignInInvalid = typeof signInInvalid.static;
}
