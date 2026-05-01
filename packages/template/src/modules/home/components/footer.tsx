import { ThemeToggle } from '#/modules/theme';

export function Footer() {
  return (
    <div className="mx-auto flex w-full max-w-7xl min-w-0 flex-col border-x border-border">
      <footer className="relative h-[var(--footer-height)] px-4">
        <div className="flex h-full items-center justify-between">
          <span className="text-sm text-muted-foreground">
            built by{' '}
            <a
              href="https://github.com/dauphaihau"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-foreground transition-colors"
            >
              hautran
            </a>
          </span>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <a
              href="https://github.com/dauphaihau/react-template"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground hover:underline underline-offset-4 transition-colors"
            >
              github
            </a>
            <span className="text-3xl leading-none">·</span>
            <a
              href="https://x.com/dauphaihau"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground hover:underline underline-offset-4 transition-colors"
            >
              x
            </a>
          </div>

          <ThemeToggle />
        </div>
        <div className="border-t border-border absolute top-0 left-1/2 -translate-x-1/2 w-screen" />
      </footer>
    </div>
  );
}
