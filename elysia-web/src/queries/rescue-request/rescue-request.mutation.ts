import { UseMutationOptions, useMutation } from '@tanstack/react-query';

import { api } from '@/utils/api';

import {
  CreateRescueRequestRequest,
  RescueRequestResponse,
} from './rescue-request.types';

export const useCreateRescueRequestMutation = (
  options?: UseMutationOptions<
    RescueRequestResponse,
    Error,
    CreateRescueRequestRequest
  >,
) =>
  useMutation({
    mutationFn: async (payload: CreateRescueRequestRequest) => {
      const response = await api.post<RescueRequestResponse>(
        '/rescue-requests',
        payload,
      );
      return response.data;
    },
    ...options,
  });
