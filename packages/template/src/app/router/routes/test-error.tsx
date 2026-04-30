import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { useErrorHandler } from '#/shared/lib/error-boundary';

export const Route = createFileRoute('/test-error')({
  component: TestErrorPage,
});

function TestErrorPage() {
  const [shouldThrow, setShouldThrow] = useState(false);
  const { throwError } = useErrorHandler();

  // This will trigger the error boundary
  if (shouldThrow) {
    throw new Error('Test error: Synchronous render error');
  }

  const throwAsyncError = () => {
    setTimeout(() => {
      throw new Error('Test error: Async error (check console)');
    }, 100);
  };

  const throwSyncError = () => {
    setShouldThrow(true);
  };

  // Wire to error boundary: throwError causes a re-render that throws, so the boundary catches it
  const throwNetworkError = async () => {
    try {
      await fetch('https://invalid-url-that-does-not-exist.com/api');
    }
    catch {
      throwError(new Error('Network error: Failed to fetch'));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-6 text-3xl font-bold">Error Boundary Test Page</h1>

        <div className="mb-8 rounded-lg border border-yellow-200 bg-yellow-50 p-4">
          <p className="text-sm text-yellow-800">
            This page is for testing error boundaries. Click the buttons below
            to trigger different types of errors.
          </p>
        </div>

        <div className="space-y-4">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-2 text-lg font-semibold">Synchronous Error</h2>
            <p className="mb-4 text-sm text-gray-600">
              Throws an error during render. This will be caught by the Error
              Boundary.
            </p>
            <button
              onClick={throwSyncError}
              className="rounded bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Throw Sync Error
            </button>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-2 text-lg font-semibold">Async Error</h2>
            <p className="mb-4 text-sm text-gray-600">
              Throws an error asynchronously. Check the browser console (will
              not be caught by boundary).
            </p>
            <button
              onClick={throwAsyncError}
              className="rounded bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            >
              Throw Async Error
            </button>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-2 text-lg font-semibold">Network Error</h2>
            <p className="mb-4 text-sm text-gray-600">
              Simulates a network request failure. Caught via useErrorHandler
              and shown in the error boundary.
            </p>
            <button
              onClick={throwNetworkError}
              className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Trigger Network Error
            </button>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-2 text-lg font-semibold">Test Navigation</h2>
            <p className="mb-4 text-sm text-gray-600">
              Navigate to a non-existent route to test 404 handling.
            </p>
            <a
              href="/this-route-does-not-exist"
              className="inline-block rounded bg-gray-600 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Go to 404 Page
            </a>
          </div>
        </div>

        <div className="mt-8 rounded-lg border border-blue-200 bg-blue-50 p-4">
          <h3 className="mb-2 font-semibold text-blue-900">
            Expected Behavior:
          </h3>
          <ul className="list-disc space-y-1 pl-5 text-sm text-blue-800">
            <li>Sync errors should show the error boundary fallback UI</li>
            <li>
              The error boundary should have a &quot;Try again&quot; or
              &quot;Refresh&quot; button
            </li>
            <li>
              Async errors will appear in the console but will not trigger the
              boundary
            </li>
            <li>You can refresh the page to recover from errors</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
