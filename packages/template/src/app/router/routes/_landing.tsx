import { Outlet, createFileRoute } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';
import { ThemeToggle } from '#/shared/ui/app';

export const Route = createFileRoute('/_landing')({
  component: LandingLayout,
});

function LandingLayout() {
  return (
    <div className="flex h-screen w-full flex-col overflow-hidden">
      <LandingNav />
      <Outlet />
      <LandingFooter />
    </div>
  );
}

function LandingNav() {
  return (
    <div className="mx-auto flex w-full max-w-7xl min-w-0 flex-col border-x border-border">
      <nav className="relative flex items-center justify-between px-4 py-4 w640:px-6">
        <Link to="/" className="text-sm font-semibold tracking-tight">
          React Template
        </Link>
        <div className="border-b border-border absolute bottom-0 left-1/2 -translate-x-1/2 w-screen" />
      </nav>
    </div>
  );
}

function LandingFooter() {
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
              className="underline underline-offset-4 hover:text-foreground transition-colors"
            >
              Hau Tran
            </a>
          </span>
          <ThemeToggle />
        </div>
        <div className="border-t border-border absolute top-0 left-1/2 -translate-x-1/2 w-screen" />
      </footer>
    </div>
  );
}
