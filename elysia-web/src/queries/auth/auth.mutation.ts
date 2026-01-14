import { useMutation } from '@tanstack/react-query';
import type { UseMutationOptions } from '@tanstack/react-query';

import { api } from '@/utils/api';

import type {
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  SignInRequest,
  SignInResponse,
} from './auth.types';

export const useLoginMutation = (
  options?: UseMutationOptions<SignInResponse, Error, SignInRequest>,
) =>
  useMutation({
    mutationFn: async (payload: SignInRequest) => {
      const response = await api.post<SignInResponse>(
        '/auth/sign-in/email',
        payload,
      );
      return response.data;
    },
    ...options,
  });

export const useForgotPasswordMutation = (
  options?: UseMutationOptions<
    ForgotPasswordResponse,
    Error,
    ForgotPasswordRequest
  >,
) =>
  useMutation({
    mutationFn: async (payload: ForgotPasswordRequest) => {
      const response = await api.post<ForgotPasswordResponse>(
        '/auth/forgot-password',
        payload,
      );
      return response.data;
    },
    ...options,
  });

export const useResetPasswordMutation = (
  options?: UseMutationOptions<
    ResetPasswordResponse,
    Error,
    ResetPasswordRequest
  >,
) =>
  useMutation({
    mutationFn: async (payload: ResetPasswordRequest) => {
      const response = await api.post<ResetPasswordResponse>(
        '/auth/reset-password',
        payload,
      );
      return response.data;
    },
    ...options,
  });
