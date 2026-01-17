import { useAccountInfoQuery } from '@/queries/auth/auth.query';

export const useProfileActions = () => {
  const { data: accountInfo, isLoading, error } = useAccountInfoQuery();

  return {
    accountInfo,
    isLoading,
    error,
  };
};
