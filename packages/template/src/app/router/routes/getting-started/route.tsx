import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/getting-started')({
  component: GettingStartedRoute,
});

function GettingStartedRoute() {
  return <Outlet />;
}
