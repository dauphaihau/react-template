import { useCallback, useState } from 'react'

interface UseErrorHandlerReturn {
  error: Error | null
  throwError: (error: Error) => void
  resetError: () => void
}

/**
 * Hook to programmatically throw errors that will be caught by error boundaries
 */
export function useErrorHandler(): UseErrorHandlerReturn {
  const [error, setError] = useState<Error | null>(null)

  const throwError = useCallback((err: Error) => {
    setError(err)
  }, [])

  const resetError = useCallback(() => {
    setError(null)
  }, [])

  // Throw error in render phase so it's caught by error boundary
  if (error) {
    throw error
  }

  return {
    error,
    throwError,
    resetError,
  }
}
