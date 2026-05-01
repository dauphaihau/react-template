import { ArrowRight } from 'lucide-react';
import { DATA_SOURCE_URL, QUERY_STATES } from '../../constants';

export function Data() {
  return (
    <a
      href={DATA_SOURCE_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="View data layer implementation on GitHub"
      className="relative block h-[214px] w-full max-w-[380px] overflow-hidden border border-border cursor-pointer group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground/40"
    >
      <span className="shine absolute -top-1/2 -left-full h-[200%] w-3/4 skew-x-[-20deg] bg-linear-to-r from-transparent via-white/40 to-transparent pointer-events-none z-20" />

      <div className="absolute top-0 left-0 right-0 bottom-[52px] p-5 flex flex-col justify-between">
        <div>
          <span className="text-[8px] uppercase tracking-[0.2em] text-muted-foreground">
            Data
          </span>
          <h2 className="text-[20px] font-bold tracking-tight text-foreground leading-tight mt-1.5">
            Fetch once.
            <br />
            Cache smart.
          </h2>
          <p className="text-muted-foreground text-[9px] leading-relaxed mt-2 max-w-[220px]">
            TanStack Query for server state with background refetch and zero
            boilerplate.
          </p>
        </div>
      </div>

      <div className="absolute bottom-[52px] left-4 right-4 h-px bg-border/30" />

      <div className="absolute bottom-0 left-0 right-0 h-[52px] flex items-center px-5 justify-between">
        <div className="flex items-center gap-3">
          {QUERY_STATES.map(({ name, color }, i) => (
            <div key={name} className="flex items-center gap-3">
              <div
                className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 font-mono"
                style={{ transitionDelay: `${150 + (i * 70)}ms` }}
              >
                <span
                  className="size-1.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: color }}
                />
                <span
                  className="text-[8px] text-foreground/40 group-hover:text-foreground/90 transition-colors duration-300"
                  style={{ transitionDelay: `${150 + (i * 70)}ms` }}
                >
                  {name}
                </span>
              </div>
              {i < QUERY_STATES.length - 1 && (
                <div className="w-px h-3 bg-border/20" />
              )}
            </div>
          ))}
        </div>
        <span className="text-[9px] font-medium text-foreground flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-300 delay-300">
          View source{' '}
          <ArrowRight
            size={10}
            className="transition-transform duration-300 group-hover:translate-x-0.5"
          />
        </span>
      </div>

      <span className="absolute h-2.5 w-2.5 border-foreground/30 group-hover:border-foreground border-b border-r bottom-0 right-0 transition-colors duration-300" />
      <span className="absolute h-2.5 w-2.5 border-foreground/30 group-hover:border-foreground border-b border-l bottom-0 left-0 transition-colors duration-300" />
      <span className="absolute h-2.5 w-2.5 border-foreground/30 group-hover:border-foreground border-t border-r top-0 right-0 transition-colors duration-300" />
      <span className="absolute h-2.5 w-2.5 border-foreground/30 group-hover:border-foreground border-t border-l top-0 left-0 transition-colors duration-300" />
    </a>
  );
}
