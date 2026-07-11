import type { ReactNode } from 'react';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '#/shared/ui/primitives';

type AppShellProps = {
  children: ReactNode
  sidebar: ReactNode
  title: string
  eyebrow?: string
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
};

export function AppShell({
  children,
  sidebar,
  title,
  eyebrow,
  defaultOpen,
  open,
  onOpenChange,
}: AppShellProps) {
  return (
    <SidebarProvider
      defaultOpen={defaultOpen}
      open={open}
      onOpenChange={onOpenChange}
    >
      {sidebar}
      <SidebarInset>
        <header className="sticky top-0 z-10 border-b border-border bg-background/85 backdrop-blur-lg">
          <div className="flex min-h-16 items-center gap-3 px-4 w640:px-6">
            <SidebarTrigger className="shrink-0" />
            <div className="min-w-0">
              {eyebrow
                ? (
                  <p className="m-0 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    {eyebrow}
                  </p>
                )
                : null}
              <p className="m-0 truncate text-base font-semibold text-foreground">
                {title}
              </p>
            </div>
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
