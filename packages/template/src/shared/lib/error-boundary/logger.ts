/**
 * Error boundary logger utility
 * Logs errors caught by error boundaries and can be extended to send to error tracking services
 */

import { isError, serializeError } from './error-types';

interface ErrorInfo {
  componentStack?: string
  [key: string]: unknown
}

export interface ErrorLog {
  message: string
  stack?: string
  componentStack?: string
  timestamp: string
  userAgent: string
  url: string
}

/**
 * Formats an error for logging.
 * SSR-safe: avoids window/navigator when not in browser.
 */
export function formatError(error: Error, errorInfo?: ErrorInfo): ErrorLog {
  const isBrowser =
    typeof window !== 'undefined' && typeof navigator !== 'undefined';
  return {
    message: error.message,
    stack: error.stack,
    componentStack: errorInfo?.componentStack,
    timestamp: new Date().toISOString(),
    userAgent: isBrowser ? navigator.userAgent : '',
    url: isBrowser ? window.location.href : '',
  };
}

/**
 * Logs error to console and optionally to external service.
 * Accepts Error or unknown; uses formatError for Error (with errorInfo), serializeError otherwise.
 */
export function logError(error: Error | unknown, errorInfo?: ErrorInfo): void {
  const isBrowser =
    typeof window !== 'undefined' && typeof navigator !== 'undefined';
  const errorLog: ErrorLog = isError(error)
    ? formatError(error, errorInfo)
    : (() => {
      const serialized = serializeError(error);
      return {
        message: serialized.message,
        stack: serialized.stack,
        componentStack: errorInfo?.componentStack,
        timestamp: serialized.timestamp,
        userAgent: isBrowser ? navigator.userAgent : '',
        url: isBrowser ? window.location.href : '',
      };
    })();

  // Log to console in development
  if (import.meta.env.DEV) {
    console.error('Error Boundary caught an error:', errorLog);
  }

  // TODO: Send to error tracking service (e.g., Sentry, LogRocket)
  // Example: Sentry.captureException(error, { contexts: { react: errorInfo } })
}

/**
 * Determines if an error is recoverable
 */
export function isRecoverableError(error: Error): boolean {
  // Network errors are often recoverable
  if (error.message.includes('fetch') || error.message.includes('network')) {
    return true;
  }

  // Add more recoverable error patterns here
  return false;
}
