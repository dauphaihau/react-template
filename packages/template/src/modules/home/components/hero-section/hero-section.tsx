import { HeroActions } from './hero-actions';
import { HeroBadge } from './hero-badge';
import { TechGrid } from './tech-grid';

export function HeroSection() {
  return (
    <div className="flex min-w-0 flex-1 flex-col">
      <div className="flex flex-1 flex-col items-start justify-center px-5 py-12 w640:px-8 w640:py-16 w1024:px-10 w1280:px-12">
        <div className="flex items-center gap-2 mb-4">
          <HeroBadge />
        </div>
        <h1 className="text-4xl w640:text-5xl w1024:text-6xl font-bold tracking-tight text-foreground">
          React Template
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground w640:text-base">
          A modern Vite React starter with TanStack Router, React Query,
          TypeScript, and Tailwind CSS. Use the lab route to inspect example
          states, error handling, and nested routing in isolation.
        </p>
        <HeroActions />
      </div>
      <div className="relative flex-1 border-t border-border">
        <TechGrid />
      </div>
    </div>
  );
}
