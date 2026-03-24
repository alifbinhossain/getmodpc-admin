'use client';

import { QueryClient } from '@tanstack/react-query';

// =============================================================================
// QUERY CLIENT FACTORY
// =============================================================================
// Use a factory function so Next.js creates a new instance per request
// while the browser reuses a singleton.

function makeQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Data is considered fresh for 1 minute
        staleTime: 60 * 1000,
        // Keep inactive cache for 5 minutes
        gcTime: 5 * 60 * 1000,
        // Retry failed queries up to 2 times
        retry: 2,
        // Retry with exponential backoff (max 30s)
        retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30_000),
        // Refetch on window focus in production only
        refetchOnWindowFocus: process.env.NODE_ENV === 'production',
        // Don't refetch on reconnect for stable data
        refetchOnReconnect: true,
      },
      mutations: {
        // Retry mutations once on network failure
        retry: 1,
        retryDelay: 1000,
      },
    },
  });
}

// Singleton for client-side
let browserQueryClient: QueryClient | undefined;

export function getQueryClient(): QueryClient {
  if (typeof window === 'undefined') {
    // Server: always create a new client
    return makeQueryClient();
  }

  // Browser: reuse the singleton (prevents new client on re-renders)
  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }
  return browserQueryClient;
}

export { makeQueryClient };
