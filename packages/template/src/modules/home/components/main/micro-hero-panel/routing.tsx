import { ArrowRight } from 'lucide-react';
import { ROUTE_FILES } from '../../../constants';

export function Routing() {
  return (
    <div className="relative h-[214px] w-full max-w-[380px] overflow-hidden border border-border cursor-pointer group">
      <span className="shine absolute -top-1/2 -left-full h-[200%] w-3/4 skew-x-[-20deg] bg-linear-to-r from-transparent via-white/40 to-transparent pointer-events-none z-20" />

      <div className="absolute top-0 bottom-0 left-0 right-[140px] flex flex-col justify-between p-5">
        <div>
          <span className="text-[8px] uppercase tracking-[0.2em] text-muted-foreground">
            Routing
          </span>
          <h2 className="text-[20px] font-bold tracking-tight text-foreground leading-tight mt-1.5">
            File-based.
            <br />
            Fully typed.
          </h2>
          <p className="text-muted-foreground text-[9px] leading-relaxed mt-2 max-w-[200px]">
            Routes auto-generate type-safe links. Zero runtime errors.
          </p>
        </div>
        <span className="text-[9px] font-medium text-foreground flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-300 delay-[250ms]">
          View routes{' '}
          <ArrowRight
            size={10}
            className="transition-transform duration-300 group-hover:translate-x-0.5"
          />
        </span>
      </div>

      <div className="absolute top-4 bottom-4 right-[140px] w-px border-l border-dashed border-border/40" />

      <div className="absolute top-1/2 right-[140px] -translate-y-1/2 -translate-x-1/2 z-10">
        <div className="size-2 rounded-full border border-border bg-background transition-transform duration-200 delay-100 group-hover:scale-110" />
      </div>

      <div className="absolute top-0 bottom-0 right-0 w-[140px] flex flex-col justify-center">
        {ROUTE_FILES.map((file, i) => (
          <div key={file}>
            <div
              className="px-4 py-[7px] opacity-0 group-hover:opacity-100 transition-all duration-300 text-foreground/40 group-hover:text-foreground/90"
              style={{ transitionDelay: `${150 + (i * 70)}ms` }}
            >
              <span className="text-[8px] font-mono">{file}</span>
            </div>
            {i < ROUTE_FILES.length - 1 && (
              <div className="mx-4 h-px bg-border/15" />
            )}
          </div>
        ))}
      </div>

      <span className="absolute h-2.5 w-2.5 border-foreground/30 group-hover:border-foreground border-b border-r bottom-0 right-0 transition-colors duration-300" />
      <span className="absolute h-2.5 w-2.5 border-foreground/30 group-hover:border-foreground border-b border-l bottom-0 left-0 transition-colors duration-300" />
      <span className="absolute h-2.5 w-2.5 border-foreground/30 group-hover:border-foreground border-t border-r top-0 right-0 transition-colors duration-300" />
      <span className="absolute h-2.5 w-2.5 border-foreground/30 group-hover:border-foreground border-t border-l top-0 left-0 transition-colors duration-300" />
    </div>
  );
}
