/**
 * Error types and utilities for error boundary handling
 */

export interface SerializedError {
  name: string
  message: string
  stack?: string
  statusCode?: number
  timestamp: string
}

export class AppError extends Error {
  public readonly statusCode: number
  public readonly timestamp: string
  public readonly isOperational: boolean

  constructor(
    message: string,
    statusCode: number = 500,
    isOperational: boolean = true,
  ) {
    super(message)
    this.name = this.constructor.name
    this.statusCode = statusCode
    this.timestamp = new Date().toISOString()
    this.isOperational = isOperational

    // V8/Node only; not available in all browsers (e.g. Firefox, Safari)
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found') {
    super(message, 404)
  }
}

export class ValidationError extends AppError {
  constructor(message: string = 'Validation failed') {
    super(message, 400)
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = 'Unauthorized access') {
    super(message, 401)
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = 'Access forbidden') {
    super(message, 403)
  }
}

export class NetworkError extends AppError {
  constructor(message: string = 'Network request failed') {
    super(message, 503)
  }
}

/**
 * Type guard to check if error is an AppError
 */
export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError
}

/**
 * Type guard to check if error is a standard Error
 */
export function isError(error: unknown): error is Error {
  return error instanceof Error
}

/**
 * Serialize any error to a plain object
 */
export function serializeError(error: unknown): SerializedError {
  if (isAppError(error)) {
    return {
      name: error.name,
      message: error.message,
      stack: error.stack,
      statusCode: error.statusCode,
      timestamp: error.timestamp,
    }
  }

  if (isError(error)) {
    return {
      name: error.name,
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
    }
  }

  // Handle non-Error objects
  return {
    name: 'UnknownError',
    message: String(error),
    timestamp: new Date().toISOString(),
  }
}

/**
 * Get user-friendly error message
 */
export function getUserFriendlyMessage(error: unknown): string {
  if (isAppError(error)) {
    return error.message
  }

  if (isError(error)) {
    return error.message
  }

  return 'An unexpected error occurred. Please try again.'
}

/**
 * Check if error should be retried
 */
export function isRetryableError(error: unknown): boolean {
  if (isAppError(error)) {
    // Retry on server errors and network errors
    return error.statusCode >= 500
  }

  // Retry on network-related errors
  if (isError(error)) {
    const message = error.message.toLowerCase()
    return (
      message.includes('network') ||
      message.includes('timeout') ||
      message.includes('fetch')
    )
  }

  return false
}
