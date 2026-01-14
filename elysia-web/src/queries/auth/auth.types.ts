import { User } from '@/models';

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignInResponse {
  redirect: boolean;
  token: string;
  user: User;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  message: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface ResetPasswordResponse {
  message: string;
}

export interface AccountInfoResponse {
  user: User;
  data: Record<string, unknown>;
}
