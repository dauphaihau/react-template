import {
  Outlet, createFileRoute, useNavigate, useRouterState,
} from '@tanstack/react-router';
import type { ErrorComponentProps } from '@tanstack/react-router';
import { useAppShellStore } from '#/shared/client-state/app-shell';
import { AppShell, NotFound, RouteError } from '#/shared/ui/app';
import { LabNavigation } from './_components/lab-navigation';

export const Route = createFileRoute('/lab')({
  component: LabLayout,
  notFoundComponent: NotFound,
  errorComponent: LabErrorComponent,
});

function LabErrorComponent({ error, reset }: ErrorComponentProps) {
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

function LabLayout() {
  const open = useAppShellStore((state) => state.open);
  const setOpen = useAppShellStore((state) => state.setOpen);

  return (
    <AppShell
      open={open}
      onOpenChange={setOpen}
      sidebar={<LabNavigation />}
      eyebrow="Lab"
      title="Route review workspace"
    >
      <Outlet />
    </AppShell>
  );
}
