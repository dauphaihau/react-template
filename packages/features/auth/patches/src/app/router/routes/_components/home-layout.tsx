import type { ReactNode } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { Button } from '#/shared/ui';
import { ThemeToggle } from '#/shared/ui/app';
import {
  useCurrentUserQuery,
  useLogoutMutation,
} from '#/modules/auth';

interface HomeLayoutProps {
  children: ReactNode
}

export function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <div className="flex h-screen w-full flex-col overflow-hidden">
      <HomeNav />
      {children}
      <HomeFooter />
    </div>
  );
}

function HomeNav() {
  const navigate = useNavigate();
  const { data: user } = useCurrentUserQuery();
  const logoutMutation = useLogoutMutation();

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
    await navigate({ to: '/' });
  };

  return (
    <div className="mx-auto flex w-full max-w-7xl min-w-0 flex-col border-x border-border">
      <nav className="relative flex items-center justify-between px-4 py-4 w640:px-6">
        <Link to="/" className="text-sm font-semibold tracking-tight">
          React Template
        </Link>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              <span className="hidden text-sm text-muted-foreground w640:inline">
                {user.name}
              </span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleLogout}
                disabled={logoutMutation.isPending}
              >
                {logoutMutation.isPending ? 'Signing out...' : 'Sign out'}
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/login">Sign in</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/register">Sign up</Link>
              </Button>
            </>
          )}
        </div>

        <div className="absolute bottom-0 left-1/2 w-screen -translate-x-1/2 border-b border-border" />
      </nav>
    </div>
  );
}

function HomeFooter() {
  return (
    <div className="mx-auto flex w-full max-w-7xl min-w-0 flex-col border-x border-border">
      <footer className="relative px-4 py-4 w640:px-6">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            built by{' '}
            <a
              href="https://hautran.me"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 transition-colors hover:text-foreground"
            >
              Hau Tran
            </a>
          </span>
          <ThemeToggle />
        </div>
        <div className="absolute left-1/2 top-0 w-screen -translate-x-1/2 border-t border-border" />
      </footer>
    </div>
  );
}
