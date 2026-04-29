# Error Boundary Usage Examples

This document provides practical, copy-paste examples for implementing error boundaries in your application.

## Table of Contents

1. [Basic Usage](#basic-usage)
2. [Route-Level Error Handling](#route-level-error-handling)
3. [Feature-Level Error Boundaries](#feature-level-error-boundaries)
4. [Async Error Handling](#async-error-handling)
5. [Custom Error Types](#custom-error-types)
6. [Data Fetching with Error Handling](#data-fetching-with-error-handling)
7. [Form Validation Errors](#form-validation-errors)
8. [Widget-Level Error Boundaries](#widget-level-error-boundaries)

---

## Basic Usage

### Example 1: Simple Error Boundary Wrapper

```tsx
// src/features/user-profile/UserProfile.container.tsx
import { ErrorBoundary } from '#/shared/lib/error-boundary'
import { ErrorDisplay } from '#/shared/ui'
import { UserProfile } from './UserProfile'

export function UserProfileContainer({ userId }: { userId: string }) {
  return (
    <ErrorBoundary
      fallback={(error, reset) => (
        <ErrorDisplay message={error.message} onRetry={reset} />
      )}
    >
      <UserProfile userId={userId} />
    </ErrorBoundary>
  )
}
```

### Example 2: Custom Fallback UI

```tsx
// src/widgets/Sidebar/Sidebar.container.tsx
import { ErrorBoundary } from '#/shared/lib/error-boundary'

export function SidebarContainer() {
  return (
    <ErrorBoundary
      fallback={(error) => (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-800">
            Sidebar failed to load: {error.message}
          </p>
        </div>
      )}
      onError={(error, errorInfo) => {
        console.error('Sidebar error:', error, errorInfo)
      }}
    >
      <Sidebar />
    </ErrorBoundary>
  )
}
```

---

## Route-Level Error Handling

### Example 3: Basic Route Error Component

```tsx
// src/routes/users.$userId.tsx
import { createFileRoute, ErrorComponentProps } from '@tanstack/react-router'
import { RouteError } from '#/shared/ui'

function UserPageError({ error }: ErrorComponentProps) {
  return <RouteError error={error} showDetails={import.meta.env.DEV} />
}

export const Route = createFileRoute('/users/$userId')({
  component: UserPage,
  errorComponent: UserPageError,
  loader: async ({ params }) => {
    const response = await fetch(`/api/users/${params.userId}`)
    if (!response.ok) {
      throw new Error('Failed to load user')
    }
    return response.json()
  },
})

function UserPage() {
  const data = Route.useLoaderData()
  return <div>{/* Render user */}</div>
}
```

### Example 4: Custom Route Error with Navigation

```tsx
// src/routes/dashboard.tsx
import {
  createFileRoute,
  ErrorComponentProps,
  Link,
} from '@tanstack/react-router'

function DashboardError({ error, reset }: ErrorComponentProps) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="max-w-md space-y-4 text-center">
        <h1 className="text-2xl font-bold text-red-600">Dashboard Error</h1>
        <p className="text-gray-600">{error.message}</p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => window.location.reload()}
            className="rounded bg-blue-600 px-4 py-2 text-white"
          >
            Retry
          </button>
          <Link to="/" className="rounded border border-gray-300 px-4 py-2">
            Go Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/dashboard')({
  component: Dashboard,
  errorComponent: DashboardError,
})
```

---

## Feature-Level Error Boundaries

### Example 5: Isolating Feature Errors

```tsx
// src/features/comments/CommentList.container.tsx
import { ErrorBoundary } from '#/shared/lib/error-boundary'
import { CommentList } from './CommentList'
import { useQuery } from '@tanstack/react-query'

export function CommentListContainer({ postId }: { postId: string }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['comments', postId],
    queryFn: () => fetchComments(postId),
  })

  if (isLoading) return <div>Loading comments...</div>
  if (error) throw error

  return (
    <ErrorBoundary
      fallback={
        <div className="rounded-lg bg-gray-100 p-4">
          <p className="text-sm text-gray-600">
            Comments failed to load. Please try again later.
          </p>
        </div>
      }
    >
      <CommentList comments={data} />
    </ErrorBoundary>
  )
}
```

### Example 6: Feature with Retry Logic

```tsx
// src/features/notifications/NotificationPanel.container.tsx
import { ErrorBoundary } from '#/shared/lib/error-boundary'
import { useState } from 'react'
import { NotificationPanel } from './NotificationPanel'

export function NotificationPanelContainer() {
  const [retryKey, setRetryKey] = useState(0)

  return (
    <ErrorBoundary
      resetKeys={[retryKey]}
      fallback={(error, reset) => (
        <div className="p-4 text-center">
          <p className="mb-2 text-sm text-red-600">
            Failed to load notifications
          </p>
          <button
            onClick={() => {
              setRetryKey((k) => k + 1)
              reset()
            }}
            className="text-xs text-blue-600 hover:underline"
          >
            Retry
          </button>
        </div>
      )}
    >
      <NotificationPanel key={retryKey} />
    </ErrorBoundary>
  )
}
```

---

## Async Error Handling

### Example 7: Using useErrorHandler Hook

```tsx
// src/features/file-upload/FileUpload.container.tsx
import { useErrorHandler } from '#/shared/lib/error-boundary'
import { useState } from 'react'
import { FileUpload } from './FileUpload'

export function FileUploadContainer() {
  const { throwError } = useErrorHandler()
  const [isUploading, setIsUploading] = useState(false)

  const handleUpload = async (file: File) => {
    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const result = await response.json()
      return result
    } catch (error) {
      throwError(error as Error) // Let error boundary handle it
    } finally {
      setIsUploading(false)
    }
  }

  return <FileUpload onUpload={handleUpload} isUploading={isUploading} />
}
```

### Example 8: Try-Catch with Graceful Degradation

```tsx
// src/features/weather/WeatherWidget.container.tsx
import { useState, useEffect } from 'react'
import { WeatherWidget } from './WeatherWidget'
import { NetworkError } from '#/shared/lib/error-boundary'

export function WeatherWidgetContainer() {
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchWeather() {
      try {
        const response = await fetch('/api/weather')
        if (!response.ok) {
          throw new NetworkError('Failed to fetch weather')
        }
        const data = await response.json()
        setWeather(data)
      } catch (err) {
        // Graceful degradation - show error state instead of throwing
        setError('Weather unavailable')
        console.error(err)
      }
    }

    fetchWeather()
  }, [])

  if (error) {
    return (
      <div className="rounded-lg bg-gray-100 p-4">
        <p className="text-sm text-gray-600">{error}</p>
      </div>
    )
  }

  return <WeatherWidget weather={weather} />
}
```

---

## Custom Error Types

### Example 9: Using Typed Errors

```tsx
// src/features/auth/LoginForm.container.tsx
import { useState } from 'react'
import {
  UnauthorizedError,
  ValidationError,
  NetworkError,
} from '#/shared/lib/error-boundary'
import { LoginForm } from './LoginForm'

export function LoginFormContainer() {
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (email: string, password: string) => {
    try {
      // Validate input
      if (!email || !password) {
        throw new ValidationError('Email and password are required')
      }

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (response.status === 401) {
        throw new UnauthorizedError('Invalid credentials')
      }

      if (!response.ok) {
        throw new NetworkError('Login failed')
      }

      const data = await response.json()
      // Handle success
    } catch (err) {
      if (err instanceof ValidationError) {
        setError(err.message)
      } else if (err instanceof UnauthorizedError) {
        setError('Invalid email or password')
      } else if (err instanceof NetworkError) {
        setError('Connection error. Please try again.')
      } else {
        setError('An unexpected error occurred')
      }
    }
  }

  return <LoginForm onLogin={handleLogin} error={error} />
}
```

### Example 10: Error Type Checking

```tsx
// src/shared/api/apiClient.ts
import {
  NetworkError,
  UnauthorizedError,
  NotFoundError,
  isRetryableError,
} from '#/shared/lib/error-boundary'

export async function apiRequest<T>(
  url: string,
  options?: RequestInit,
): Promise<T> {
  let retries = 0
  const maxRetries = 3

  while (retries <= maxRetries) {
    try {
      const response = await fetch(url, options)

      if (response.status === 401) {
        throw new UnauthorizedError('Session expired')
      }

      if (response.status === 404) {
        throw new NotFoundError('Resource not found')
      }

      if (!response.ok) {
        throw new NetworkError(`Request failed: ${response.statusText}`)
      }

      return response.json()
    } catch (error) {
      // Retry only for retryable errors
      if (isRetryableError(error) && retries < maxRetries) {
        retries++
        await new Promise((resolve) => setTimeout(resolve, 1000 * retries))
        continue
      }

      throw error
    }
  }

  throw new NetworkError('Max retries exceeded')
}
```

---

## Data Fetching with Error Handling

### Example 11: TanStack Query with Error Boundary

```tsx
// src/features/product-list/ProductList.container.tsx
import { useQuery } from '@tanstack/react-query'
import { ErrorBoundary } from '#/shared/lib/error-boundary'
import { ProductList } from './ProductList'
import { NotFoundError } from '#/shared/lib/error-boundary'

export function ProductListContainer({ categoryId }: { categoryId: string }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['products', categoryId],
    queryFn: async () => {
      const response = await fetch(`/api/products?category=${categoryId}`)

      if (response.status === 404) {
        throw new NotFoundError('Category not found')
      }

      if (!response.ok) {
        throw new Error('Failed to load products')
      }

      return response.json()
    },
    retry: (failureCount, error) => {
      // Don't retry on 404
      if (error instanceof NotFoundError) return false
      return failureCount < 3
    },
  })

  if (isLoading) return <div>Loading...</div>
  if (error) throw error

  return (
    <ErrorBoundary
      fallback={(error, reset) => (
        <div className="p-4 text-center">
          <p className="text-red-600">{error.message}</p>
          <button onClick={reset} className="mt-2 text-blue-600">
            Retry
          </button>
        </div>
      )}
    >
      <ProductList products={data} />
    </ErrorBoundary>
  )
}
```

### Example 12: Server Functions with Error Handling

```tsx
// src/routes/api/submit-form.tsx
import { createFileRoute } from '@tanstack/react-router'
import { ValidationError } from '#/shared/lib/error-boundary'

export const Route = createFileRoute('/api/submit-form')({
  loader: async ({ request }) => {
    try {
      const formData = await request.formData()
      const name = formData.get('name')

      if (!name) {
        throw new ValidationError('Name is required')
      }

      // Process form...
      return { success: true }
    } catch (error) {
      if (error instanceof ValidationError) {
        return {
          success: false,
          error: error.message,
          statusCode: error.statusCode,
        }
      }
      throw error
    }
  },
})
```

---

## Form Validation Errors

### Example 13: Form with Error Boundary

```tsx
// src/features/contact-form/ContactForm.container.tsx
import { useState } from 'react'
import { ValidationError } from '#/shared/lib/error-boundary'
import { ContactForm } from './ContactForm'

export function ContactFormContainer() {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = async (formData: {
    name: string
    email: string
    message: string
  }) => {
    setErrors({})

    try {
      // Validate
      const validationErrors: Record<string, string> = {}

      if (!formData.name.trim()) {
        validationErrors.name = 'Name is required'
      }

      if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        validationErrors.email = 'Invalid email address'
      }

      if (!formData.message.trim()) {
        validationErrors.message = 'Message is required'
      }

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors)
        return
      }

      // Submit
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to submit form')
      }

      // Success handling...
    } catch (error) {
      throw error // Let error boundary handle it
    }
  }

  return <ContactForm onSubmit={handleSubmit} errors={errors} />
}
```

---

## Widget-Level Error Boundaries

### Example 14: Header Widget with Error Isolation

```tsx
// src/widgets/Header/Header.container.tsx
import { ErrorBoundary } from '#/shared/lib/error-boundary'
import { Header } from './Header'

export function HeaderContainer() {
  return (
    <ErrorBoundary
      fallback={
        <header className="border-b bg-white p-4">
          <div className="container mx-auto">
            <p className="text-sm text-red-600">Header failed to load</p>
          </div>
        </header>
      }
      onError={(error) => {
        console.error('Header error:', error)
        // Could send to analytics
      }}
    >
      <Header />
    </ErrorBoundary>
  )
}

export default HeaderContainer
```

### Example 15: Multiple Widgets with Individual Boundaries

```tsx
// src/routes/dashboard.tsx
import { createFileRoute } from '@tanstack/react-router'
import { ErrorBoundary } from '#/shared/lib/error-boundary'
import StatsWidget from '#/widgets/StatsWidget'
import ChartWidget from '#/widgets/ChartWidget'
import ActivityWidget from '#/widgets/ActivityWidget'

export const Route = createFileRoute('/dashboard')({
  component: DashboardPage,
})

function DashboardPage() {
  return (
    <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">
      <ErrorBoundary fallback={<WidgetError name="Stats" />}>
        <StatsWidget />
      </ErrorBoundary>

      <ErrorBoundary fallback={<WidgetError name="Chart" />}>
        <ChartWidget />
      </ErrorBoundary>

      <ErrorBoundary fallback={<WidgetError name="Activity" />}>
        <ActivityWidget />
      </ErrorBoundary>
    </div>
  )
}

function WidgetError({ name }: { name: string }) {
  return (
    <div className="rounded-lg border border-red-200 bg-red-50 p-4">
      <p className="text-sm text-red-800">{name} widget failed to load</p>
    </div>
  )
}
```

---

## Complete Example: Blog Post Page

### Example 16: Full Page with Multiple Error Boundaries

```tsx
// src/routes/blog.$slug.tsx
import { createFileRoute, ErrorComponentProps } from '@tanstack/react-router'
import { ErrorBoundary } from '#/shared/lib/error-boundary'
import { NotFoundError } from '#/shared/lib/error-boundary'
import { RouteError } from '#/shared/ui'

// Route-level error component
function BlogPostError({ error }: ErrorComponentProps) {
  return <RouteError error={error} showDetails={import.meta.env.DEV} />
}

export const Route = createFileRoute('/blog/$slug')({
  component: BlogPostPage,
  errorComponent: BlogPostError,
  loader: async ({ params }) => {
    const response = await fetch(`/api/posts/${params.slug}`)

    if (response.status === 404) {
      throw new NotFoundError(`Post "${params.slug}" not found`)
    }

    if (!response.ok) {
      throw new Error('Failed to load post')
    }

    return response.json()
  },
})

function BlogPostPage() {
  const post = Route.useLoaderData()

  return (
    <article className="container mx-auto px-4 py-8">
      <h1 className="mb-4 text-4xl font-bold">{post.title}</h1>

      {/* Main content - safe */}
      <div className="prose max-w-none">{post.content}</div>

      {/* Comments - isolated with error boundary */}
      <ErrorBoundary
        fallback={
          <div className="mt-8 rounded-lg bg-gray-100 p-4">
            <p className="text-sm text-gray-600">
              Comments are temporarily unavailable
            </p>
          </div>
        }
      >
        <CommentsSection postId={post.id} />
      </ErrorBoundary>

      {/* Related posts - isolated with error boundary */}
      <ErrorBoundary
        fallback={null} // Silent failure for non-critical feature
      >
        <RelatedPosts postId={post.id} />
      </ErrorBoundary>
    </article>
  )
}
```

---

## Best Practices Summary

1. **Isolate boundaries**: Wrap individual features, not the entire app
2. **Provide recovery**: Always include retry/reload options
3. **Use typed errors**: Leverage custom error classes for better handling
4. **Handle async properly**: Use `useErrorHandler` for async operations
5. **Log errors**: Track errors for debugging and monitoring
6. **Graceful degradation**: Non-critical features can fail silently
7. **Follow FSD**: Keep error boundaries in appropriate layers
8. **Test error states**: Regularly test error scenarios
