import { Outlet, createRootRoute } from '@tanstack/react-router';
import type { ErrorComponentProps } from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { TanStackDevtools } from '@tanstack/react-devtools';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from '#/shared/lib/query-client';
import { ErrorBoundary } from '#/shared/ui/app';
import { RouteError, Toaster } from '#/shared/ui';
import { NotFound } from '#/shared/ui/app';

import '../../styles/styles.css';

function RouterErrorComponent({ error, reset }: ErrorComponentProps) {
  const handleRetry = () => {
    reset();
    if (typeof window !== 'undefined') window.location.reload();
  };
  const handleGoBack = () => {
    if (typeof window !== 'undefined') window.history.back();
  };
  return (
    <RouteError
      error={error}
      reset={handleRetry}
      onGoBack={handleGoBack}
      showDetails={import.meta.env.DEV}
    />
  );
}

export const Route = createRootRoute({
  component: RootComponent,
  errorComponent: RouterErrorComponent,
  notFoundComponent: NotFound,
});

function RootComponent() {
  return (
    <ErrorBoundary
      fallback={(err, reset) => (
        <RouteError
          error={err}
          reset={reset}
          onGoBack={() =>
            typeof window !== 'undefined' && window.history.back()
          }
          showDetails={import.meta.env.DEV}
        />
      )}
    >
      <QueryClientProvider client={queryClient}>
        <Outlet />
        <Toaster />
        <ReactQueryDevtools initialIsOpen={false} />
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'TanStack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
