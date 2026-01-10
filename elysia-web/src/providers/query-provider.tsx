import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { PropsWithChildren } from 'react';

export function getContext() {
  const queryClient = new QueryClient();
  return {
    queryClient,
  };
}

export interface RouterContext {
  queryClient: QueryClient;
}

export type QueryClientProviderProps = PropsWithChildren & RouterContext;

export function QueryProvider({
  children,
  queryClient,
}: QueryClientProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
