import {
  Outlet, createFileRoute, useNavigate, useRouterState, 
} from '@tanstack/react-router';
import type { ErrorComponentProps } from '@tanstack/react-router';
import { NotFound, RouteError } from '#/shared/ui/app';
import { SidebarInset, SidebarProvider } from '#/shared/ui/primitives';
import { LabSidebar } from './_components/lab-sidebar';

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
  return (
    <SidebarProvider defaultOpen>
      <LabSidebar />
      <SidebarInset>
        {/*<header className="sticky top-0 z-10 border-b border-border bg-background/85 backdrop-blur-lg">
          <div className="flex min-h-16 items-center gap-3 px-4 w640:px-6">
            <div className="min-w-0">
              <p className="m-0 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Lab
              </p>
              <p className="m-0 truncate text-base font-semibold text-foreground">
                Route review workspace
              </p>
            </div>
          </div>
        </header>*/}
        
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
