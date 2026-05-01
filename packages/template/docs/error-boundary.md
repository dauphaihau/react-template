# Error Boundary Documentation

## Overview

This project implements a comprehensive error boundary system that catches and handles errors gracefully throughout the application. The system follows the Feature-Sliced Design architecture and uses both React Error Boundaries and TanStack Router's error handling capabilities.

## Architecture

The error boundary system is organized across the `shared` layer:

```
src/shared/
  error/
    error-types.ts         # Custom error classes and utilities
    logger.ts              # Error logging utilities
    index.ts               # Barrel exports
  hooks/
    use-error-handler.ts   # Hook for programmatic error throwing
  ui/app/error-display/
    error-display.tsx      # Presentational error UI
    route-error.tsx        # Route-specific error component
    index.ts               # Barrel exports
  ui/app/error-boundary/
    error-boundary.tsx     # React Error Boundary component
    index.ts               # Barrel exports
```

## Features

- **React Error Boundaries**: Catches errors in the React component tree
- **Route-level Error Handling**: TanStack Router error components for page-level errors
- **Custom Error Types**: Typed error classes for different scenarios
- **Error Logging**: Centralized error logging (extensible to external services)
- **Recovery Mechanisms**: Retry and reset functionality
- **TypeScript Support**: Full type safety for errors

## Usage

### 1. Global Error Boundary

The root route (`__root.tsx`) already includes a global error boundary that wraps the entire application:

```tsx
// Already configured in __root.tsx
<ErrorBoundary>
  <QueryClientProvider client={queryClient}>
    {/* Your app */}
  </QueryClientProvider>
</ErrorBoundary>
```

This catches any unhandled errors in the component tree.

### 2. Route-level Error Handling

Each route can define its own error component using TanStack Router:

```tsx
// src/routes/my-page.tsx
import { createFileRoute, ErrorComponentProps } from '@tanstack/react-router'

function MyPageError({ error }: ErrorComponentProps) {
  return (
    <div>
      <h1>Page Error</h1>
      <p>{error.message}</p>
      <button onClick={() => window.location.reload()}>Retry</button>
    </div>
  )
}

export const Route = createFileRoute('/my-page')({
  component: MyPageComponent,
  errorComponent: MyPageError, // Custom error UI for this route
})
```

### 3. Custom Error Boundaries

Wrap specific parts of your app with custom error boundaries:

```tsx
import { ErrorBoundary } from '#/shared/ui/app/error-boundary'
import { ErrorDisplay } from '#/shared/ui'

function MyFeature() {
  return (
    <ErrorBoundary
      fallback={(error, reset) => (
        <ErrorDisplay message={error.message} onRetry={reset} />
      )}
      onError={(error, errorInfo) => {
        // Custom error handling
        console.error('Feature error:', error, errorInfo)
      }}
    >
      <MyComponent />
    </ErrorBoundary>
  )
}
```

### 4. Programmatic Error Throwing

Use the `useErrorHandler` hook to throw errors programmatically:

```tsx
import { useErrorHandler } from '#/shared/hooks/use-error-handler'

function MyComponent() {
  const { throwError } = useErrorHandler()

  const handleAction = async () => {
    try {
      await riskyOperation()
    } catch (error) {
      throwError(error as Error) // Will be caught by error boundary
    }
  }

  return <button onClick={handleAction}>Do Something</button>
}
```

### 5. Custom Error Types

Use typed errors for better error handling:

```tsx
import {
  NotFoundError,
  ValidationError,
  UnauthorizedError,
  NetworkError,
} from '#/shared/error'

// Throw specific errors
throw new NotFoundError('User not found')
throw new ValidationError('Invalid email format')
throw new UnauthorizedError('Please log in')
throw new NetworkError('Failed to fetch data')

// Check error types
import { isAppError, isRetryableError } from '#/shared/error'

try {
  await fetchData()
} catch (error) {
  if (isAppError(error)) {
    console.log('Status code:', error.statusCode)
  }

  if (isRetryableError(error)) {
    // Retry logic
  }
}
```

## API Reference

### ErrorBoundary Component

```tsx
interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode | ((error: Error, reset: () => void) => ReactNode)
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
  resetKeys?: Array<unknown>
}
```

**Props:**

- `children`: Content to render
- `fallback`: Custom error UI (component or render function)
- `onError`: Callback when error is caught
- `resetKeys`: Array of values that trigger error reset when changed

### useErrorHandler Hook

```tsx
const { error, throwError, resetError } = useErrorHandler()
```

**Returns:**

- `error`: Current error (or null)
- `throwError(error: Error)`: Function to throw an error
- `resetError()`: Function to clear the error

### Error Classes

All error classes extend `AppError`:

```tsx
class AppError extends Error {
  statusCode: number
  timestamp: string
  isOperational: boolean
}
```

**Available Classes:**

- `NotFoundError` (404)
- `ValidationError` (400)
- `UnauthorizedError` (401)
- `ForbiddenError` (403)
- `NetworkError` (503)

### Error Utilities

```tsx
// Type guards
isAppError(error: unknown): error is AppError
isError(error: unknown): error is Error

// Error formatting
serializeError(error: unknown): SerializedError
getUserFriendlyMessage(error: unknown): string

// Error analysis
isRetryableError(error: unknown): boolean

// Logging
logError(error: unknown, context?: Record<string, unknown>): void
```

## Best Practices

### 1. Follow Container/Presentational Pattern

When creating error UI, split logic from presentation:

```tsx
// error-display.tsx - Presentational
export function ErrorDisplay({ message, onRetry }: ErrorDisplayProps) {
  return <div>{/* Pure UI */}</div>
}

// error-display-container.tsx - Container
export function ErrorDisplayContainer({ error }: { error: Error }) {
  const handleRetry = () => {
    // Logic here
  }
  return <ErrorDisplay message={error.message} onRetry={handleRetry} />
}
```

### 2. Use Specific Error Types

Throw specific error types for better error handling:

```tsx
// ❌ Bad
throw new Error('User not found')

// ✅ Good
throw new NotFoundError('User not found')
```

### 3. Handle Async Errors

Error boundaries only catch errors during render. For async operations, use try/catch:

```tsx
function MyComponent() {
  const { throwError } = useErrorHandler()

  const fetchData = async () => {
    try {
      await fetch('/api/data')
    } catch (error) {
      throwError(error as Error) // Let error boundary handle it
    }
  }

  return <button onClick={fetchData}>Fetch</button>
}
```

### 4. Provide Recovery Options

Always give users a way to recover from errors:

```tsx
<ErrorBoundary
  fallback={(error, reset) => (
    <div>
      <p>{error.message}</p>
      <button onClick={reset}>Try Again</button>
      <button onClick={() => (window.location.href = '/')}>Go Home</button>
    </div>
  )}
>
  {children}
</ErrorBoundary>
```

### 5. Log Errors Appropriately

Use the logging utilities and consider sending to external services:

```tsx
import { logError } from '#/shared/error'

onError={(error, errorInfo) => {
  logError(error, {
    component: 'MyFeature',
    user: currentUser?.id,
    ...errorInfo
  })

  // TODO: Send to Sentry, LogRocket, etc.
}}
```

## Testing

### Test Error Page

Navigate to `/test-error` to test the error boundary system:

```
http://localhost:3000/test-error
```

This page provides buttons to trigger:

- Synchronous render errors
- Async errors
- Network errors
- 404 navigation

### Unit Testing Error Boundaries

```tsx
import { render, screen } from '@testing-library/react'
import { ErrorBoundary } from '#/shared/ui/app/error-boundary'

const ThrowError = () => {
  throw new Error('Test error')
}

test('catches errors', () => {
  render(
    <ErrorBoundary fallback={<div>Error caught</div>}>
      <ThrowError />
    </ErrorBoundary>,
  )

  expect(screen.getByText('Error caught')).toBeInTheDocument()
})
```

## Integration with External Services

### Sentry Integration

```tsx
// src/shared/error/logger.ts
import * as Sentry from '@sentry/react'

export function logError(error: Error, errorInfo?: ErrorInfo): void {
  const errorLog = formatError(error, errorInfo)

  if (import.meta.env.DEV) {
    console.error('Error:', errorLog)
  } else {
    Sentry.captureException(error, {
      contexts: { react: errorInfo },
    })
  }
}
```

### LogRocket Integration

```tsx
import LogRocket from 'logrocket'

export function logError(error: Error, errorInfo?: ErrorInfo): void {
  LogRocket.captureException(error, {
    extra: errorInfo,
  })
}
```

## Troubleshooting

### Error Boundary Not Catching Errors

**Problem**: Errors are not caught by the error boundary.

**Solutions**:

1. Ensure error is thrown during render, not in event handlers
2. For async errors, use `useErrorHandler` hook
3. Check that error boundary is an ancestor of the failing component

### Infinite Error Loop

**Problem**: Error boundary keeps re-rendering with error.

**Solutions**:

1. Ensure fallback UI doesn't throw errors
2. Use `resetKeys` to control when error state resets
3. Check for circular dependencies in error logging

### Error Details Not Showing

**Problem**: Error details/stack trace not visible.

**Solutions**:

1. Pass `showDetails={true}` to error display components
2. Check if `import.meta.env.DEV` is true for development
3. Ensure error object has `stack` property

## Future Enhancements

- [ ] Integrate with error tracking service (Sentry/LogRocket)
- [ ] Add error rate limiting to prevent spam
- [ ] Implement offline error queueing
- [ ] Add error analytics and reporting
- [ ] Create error boundary performance monitoring
- [ ] Add i18n support for error messages
