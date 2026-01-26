import { useQuery } from '@tanstack/react-query';

import { api } from '@/utils/api';

import { RescueRequestResponse } from './rescue-request.types';

export const useGetRescueRequestsQuery = () => {
  return useQuery({
    queryKey: ['rescue-requests'],
    queryFn: async () => {
      const response = await api.get<{
        data: RescueRequestResponse[];
        total: number;
      }>('/rescue-requests');
      return response.data.data;
    },
  });
};
