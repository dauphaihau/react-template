import { Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';

export function HeroBadge() {
  return (
    <div className="relative w-fit group">
      <Link
        to="/blog"
        className="inline-flex items-center gap-2 border border-border px-2.5 py-1 text-sm text-muted-foreground overflow-hidden cursor-pointer hover:text-foreground transition-colors duration-300 relative"
      >
        <span className="shine absolute -top-1/2 -left-full h-[200%] w-3/4 skew-x-[-20deg] bg-linear-to-r from-transparent via-white/60 to-transparent pointer-events-none" />
        <span
          className="relative flex h-1.5 w-1.5"
          style={{ animation: 'rotate-sequence 2s linear infinite' }}
        >
          <span
            className="absolute inline-flex h-full w-full bg-foreground opacity-75"
            style={{ animation: 'ping-sequence 2s linear infinite' }}
          />
          <span className="relative inline-flex h-1.5 w-1.5 bg-foreground" />
        </span>
        <p className="font-light text-xs">Start building</p>
        <ArrowRight className="-ml-2 size-0 opacity-0 group-hover:opacity-100 group-hover:size-3 group-hover:-ml-1 transition-all duration-300 delay-100" />
      </Link>
    </div>
  );
}
