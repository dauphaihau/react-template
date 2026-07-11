import { ArrowRight } from 'lucide-react';
import { ARCH_LAYERS, ARCH_SOURCE_URL } from '../constants';

export function Arch() {
  return (
    <a
      href={ARCH_SOURCE_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="View architecture implementation on GitHub"
      className="relative block h-[214px] w-full max-w-[380px] overflow-hidden border border-border cursor-pointer group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground/40"
    >
      <span className="shine absolute -top-1/2 -left-full h-[200%] w-3/4 skew-x-[-20deg] bg-linear-to-r from-transparent via-white/40 to-transparent pointer-events-none z-20" />

      <div className="p-5 pb-0">
        <span className="text-[8px] uppercase tracking-[0.2em] text-muted-foreground">
          Architecture
        </span>
        <h2 className="text-[20px] font-bold tracking-tight text-foreground leading-tight mt-1.5">
          Layers, not chaos.
        </h2>
      </div>

      <div className="absolute top-[72px] left-4 right-4 border-t border-dashed border-border/40" />

      <div className="absolute top-[80px] bottom-[36px] left-0 right-0 px-5 flex flex-col">
        <div className="flex items-center mb-1">
          <span className="text-[7px] uppercase tracking-wider text-muted-foreground/50 w-[110px]">
            Layer
          </span>
          <span className="text-[7px] uppercase tracking-wider text-muted-foreground/50 w-[70px]">
            Role
          </span>
          <span className="text-[7px] uppercase tracking-wider text-muted-foreground/50 text-right flex-1">
            Tag
          </span>
        </div>
        {ARCH_LAYERS.map((row, i) => (
          <div
            key={row.layer}
            className="flex items-center py-[4px] font-mono opacity-60 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
            style={{ transitionDelay: `${80 + (i * 60)}ms` }}
          >
            <span className="text-[8px] text-foreground w-[110px]">
              {row.layer}
            </span>
            <span className="text-[8px] text-muted-foreground w-[70px]">
              {row.role}
            </span>
            <span className="text-[8px] text-foreground/50 text-right flex-1 font-semibold">
              {row.badge}
            </span>
          </div>
        ))}
        <div
          className="flex items-center gap-1 mt-2 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
          style={{ transitionDelay: '260ms' }}
        >
          <span className="text-[7px] font-mono text-muted-foreground/40">app</span>
          <ArrowRight size={7} className="text-muted-foreground/30" />
          <span className="text-[7px] font-mono text-muted-foreground/40">modules</span>
          <ArrowRight size={7} className="text-muted-foreground/30" />
          <span className="text-[7px] font-mono text-muted-foreground/40">shared</span>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[36px] flex items-center px-5">
        <span className="ml-auto text-[9px] font-medium text-foreground flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-300 delay-300">
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
