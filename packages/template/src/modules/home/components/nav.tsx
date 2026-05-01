import { Link } from '@tanstack/react-router';

export function Nav() {
  return (
    <div className="mx-auto flex w-full max-w-7xl min-w-0 flex-col border-x border-border">
      <nav className="relative flex h-[var(--nav-height)] items-center justify-between px-4 sm:px-6">
        <Link to="/" className="text-sm font-semibold tracking-tight">
          React Template
        </Link>
        <div className="border-b border-border absolute bottom-0 left-1/2 -translate-x-1/2 w-screen" />
      </nav>
    </div>
  );
}
