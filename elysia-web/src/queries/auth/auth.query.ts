import { useQuery } from '@tanstack/react-query';

import { api } from '@/utils/api';

import { type AccountInfoResponse } from './auth.types';

export const useAccountInfoQuery = () => {
  return useQuery({
    queryKey: ['auth', 'account-info'],
    queryFn: async () => {
      const response = await api.get<AccountInfoResponse>('/auth/account-info');
      return response.data;
    },
  });
};
