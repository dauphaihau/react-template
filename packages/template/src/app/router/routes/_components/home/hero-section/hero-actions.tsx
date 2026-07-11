import { Link } from '@tanstack/react-router';
import { ArrowRightIcon, GithubIcon } from 'lucide-react';
import { REPO_BASE_URL } from '#/shared/config/repo-links';
import { Button } from '#/shared/ui';

export function HeroActions() {
  return (
    <div className="mt-6 flex flex-wrap items-center gap-3 w640:gap-4">
      <HeroButtonGithub />
      <HeroButtonGetStarted />
    </div>
  );
}

function HeroButtonGithub() {
  return (
    <div className="relative w-fit group">
      <Button
        asChild
        variant="outline"
        className="rounded-none cursor-pointer relative overflow-hidden focus-visible:ring-0 h-8 px-3 py-1 border-dashed"
      >
        <a
          href={REPO_BASE_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="shine absolute -top-1/2 -left-full h-[200%] w-3/4 skew-x-[-20deg] bg-linear-to-r from-transparent via-white/50 to-transparent pointer-events-none" />
          <GithubIcon className="size-4" />
          Github
          <ArrowRightIcon className="size-4 w-0 opacity-0 group-hover:w-4 group-hover:opacity-100 transition-all duration-200" />
        </a>
      </Button>
      <span className="absolute h-2 w-2 border-foreground border-b border-r bottom-0 right-0" />
      <span className="absolute h-2 w-2 border-foreground border-b border-l bottom-0 left-0" />
      <span className="absolute h-2 w-2 border-foreground border-t border-r top-0 right-0" />
      <span className="absolute h-2 w-2 border-foreground border-t border-l top-0 left-0" />
    </div>
  );
}

function HeroButtonGetStarted() {
  return (
    <div className="relative w-fit group">
      <Button
        asChild
        className="rounded-none cursor-pointer relative overflow-hidden focus-visible:ring-0 h-8 px-3 py-1"
      >
        <Link to="/getting-started">
          <span className="shine absolute -top-1/2 -left-full h-[200%] w-3/4 skew-x-[-20deg] bg-linear-to-r from-transparent via-white/50 to-transparent pointer-events-none" />
          Get Started
          <ArrowRightIcon className="size-4 w-0 opacity-0 group-hover:w-4 group-hover:opacity-100 transition-all duration-200" />
        </Link>
      </Button>
      <span className="absolute h-2 w-2 border-foreground border-dashed border-b border-r bottom-0 right-0" />
      <span className="absolute h-2 w-2 border-foreground border-dashed border-b border-l bottom-0 left-0" />
      <span className="absolute h-2 w-2 border-foreground border-dashed border-t border-r top-0 right-0" />
      <span className="absolute h-2 w-2 border-foreground border-dashed border-t border-l top-0 left-0" />
    </div>
  );
}
