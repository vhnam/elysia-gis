import { t } from 'elysia';

export namespace AuthModel {
  export const signInRequest = t.Object({
    username: t.String({ minLength: 3 }),
    password: t.String({ minLength: 8 }),
  });

  export const signInResponse = t.Object({
    username: t.String(),
    userId: t.String(),
    token: t.String(),
  });

  export const signInInvalid = t.Literal('Invalid username or password');

  export const forgotPasswordRequest = t.Object({
    email: t.String({ format: 'email' }),
  });

  export const forgotPasswordResponse = t.Object({
    message: t.String(),
  });

  export const resetPasswordRequest = t.Object({
    token: t.String({ minLength: 1, maxLength: 255 }),
    password: t.String({ minLength: 8, maxLength: 255 }),
  });

  export const resetPasswordResponse = t.Object({
    error: t.Optional(t.Literal('INVALID_OR_EXPIRED_TOKEN')),
    message: t.String(),
  });

  export type SignInRequest = typeof signInRequest.static;
  export type SignInResponse = typeof signInResponse.static;
  export type SignInInvalid = typeof signInInvalid.static;
  export type ForgotPasswordRequest = typeof forgotPasswordRequest.static;
  export type ForgotPasswordResponse = typeof forgotPasswordResponse.static;
  export type ResetPasswordRequest = typeof resetPasswordRequest.static;
  export type ResetPasswordResponse = typeof resetPasswordResponse.static;
}
