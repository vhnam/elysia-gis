import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { PropsWithChildren } from 'react';

// Singleton QueryClient for client-side (reused across navigations)
let queryClientSingleton: QueryClient | null = null;

export function getContext() {
  // For SSR, create a new instance per request
  // For client-side, reuse the singleton
  if (typeof window !== 'undefined' && queryClientSingleton) {
    return {
      queryClient: queryClientSingleton,
    };
  }

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
        retry: 1,
      },
      mutations: {
        retry: 1,
      },
    },
  });

  // Store singleton for client-side reuse
  if (typeof window !== 'undefined') {
    queryClientSingleton = queryClient;
  }

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
