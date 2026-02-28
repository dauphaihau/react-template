import { QueryClient } from '@tanstack/react-query'
import type { QueryClient as QueryClientType } from '@tanstack/query-core'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
})

// This code is only for TypeScript
declare global {
  interface Window {
    __TANSTACK_QUERY_CLIENT__: QueryClientType
  }
}

// This code is for all users
window.__TANSTACK_QUERY_CLIENT__ = queryClient;