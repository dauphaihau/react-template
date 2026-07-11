import {
  Link, createFileRoute, useNavigate, useRouterState, 
} from '@tanstack/react-router';
import type { ErrorComponentProps } from '@tanstack/react-router';
import { useState } from 'react';
import { RouteError } from '#/shared/ui/app';
import { Button } from '#/shared/ui';
import { useErrorHandler } from '#/shared/hooks/use-error-handler';

export const Route = createFileRoute('/lab/test-error')({
  component: TestErrorPage,
  errorComponent: TestErrorBoundary,
});

function TestErrorBoundary({ error, reset }: ErrorComponentProps) {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <RouteError
      error={error}
      reset={reset}
      onGoBack={() => navigate({ to: pathname })}
      showDetails={import.meta.env.DEV}
    />
  );
}

function TestErrorPage() {
  const [shouldThrow, setShouldThrow] = useState(false);
  const { throwError } = useErrorHandler();

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

  const throwNetworkError = async () => {
    try {
      await fetch('https://invalid-url-that-does-not-exist.com/api');
    }
    catch {
      throwError(new Error('Network error: Failed to fetch'));
    }
  };

  return (
    <main className="px-4 py-6 w640:px-6 w640:py-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 rounded-[24px] border border-border bg-card p-6 shadow-sm">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Error review
          </p>
          <h1 className="m-0 text-3xl font-bold text-foreground w640:text-4xl">
            Error boundary test page
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
            Trigger failures on purpose to verify how the lab handles render
            errors, rejected requests, and not-found transitions.
          </p>
        </div>

        <div className="space-y-4">
          <ScenarioCard
            title="Synchronous Error"
            description="Throws during render and should be caught by the route error boundary."
            actionLabel="Throw Sync Error"
            action={throwSyncError}
          />

          <ScenarioCard
            title="Async Error"
            description="Throws asynchronously. This should appear in the console but not trigger the boundary."
            actionLabel="Throw Async Error"
            action={throwAsyncError}
            variant="outline"
          />

          <ScenarioCard
            title="Network Error"
            description="Simulates a failed request and rethrows through the shared error handler."
            actionLabel="Trigger Network Error"
            action={throwNetworkError}
          />

          <div className="rounded-[24px] border border-border bg-card p-6 shadow-sm">
            <h2 className="mb-2 text-lg font-semibold text-foreground">Not Found</h2>
            <p className="mb-4 text-sm text-muted-foreground">
              Open a missing route inside the lab shell to verify the shared 404 page.
            </p>
            <Button asChild variant="outline">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              <Link to={'/lab/this-route-does-not-exist' as any}>Go to 404 Page</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}

interface ScenarioCardProps {
  title: string
  description: string
  actionLabel: string
  action: () => void | Promise<void>
  variant?: 'default' | 'outline'
}

function ScenarioCard({
  title,
  description,
  actionLabel,
  action,
  variant = 'default',
}: ScenarioCardProps) {
  return (
    <div className="rounded-[24px] border border-border bg-card p-6 shadow-sm">
      <h2 className="mb-2 text-lg font-semibold text-foreground">{title}</h2>
      <p className="mb-4 text-sm text-muted-foreground">{description}</p>
      <Button onClick={action} variant={variant}>
        {actionLabel}
      </Button>
    </div>
  );
}
