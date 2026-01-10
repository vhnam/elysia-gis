import { useMutation } from '@tanstack/react-query';
import type { UseMutationOptions } from '@tanstack/react-query';

import { api } from '@/utils/api';

import type { SignInRequest, SignInResponse } from './auth.types';

export const useLoginMutation = (
  options?: UseMutationOptions<SignInResponse, Error, SignInRequest>,
) =>
  useMutation({
    mutationFn: async (payload: SignInRequest) => {
      const response = await api.post<SignInResponse>('/auth/sign-in', payload);
      return response.data;
    },
    ...options,
  });
