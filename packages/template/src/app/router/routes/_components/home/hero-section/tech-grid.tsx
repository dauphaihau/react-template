import { ArrowUpRight, Square } from 'lucide-react';
import { TECH_COLS, techStack } from '../constants';

export function TechGrid() {
  const gridLines = Array.from(
    { length: TECH_COLS - 1 },
    (_unused, gridLineIndex) => gridLineIndex,
  );

  return (
    <div className="absolute inset-0 grid grid-cols-5">
      <div className="absolute left-0 right-0 top-1/2 border-t border-border pointer-events-none" />

      {gridLines.map((gridLineIndex) => (
        <div
          key={`v-${gridLineIndex}`}
          className="absolute top-0 bottom-0 border-l border-border pointer-events-none"
          style={{ left: `${((gridLineIndex + 1) / TECH_COLS) * 100}%` }}
        />
      ))}

      {gridLines.map((gridLineIndex) => (
        <Square
          key={`sq-${gridLineIndex}`}
          className="pointer-events-none absolute z-10 size-3 -translate-x-1/2 -translate-y-1/2 fill-background stroke-border"
          style={{ left: `${((gridLineIndex + 1) / TECH_COLS) * 100}%`, top: '50%' }}
        />
      ))}

      {techStack.map((tech, i) => (
        <a
          key={tech.name}
          href={tech.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex flex-col items-center justify-center gap-3 overflow-hidden"
          style={{
            animation: `tech-fade-in 0.5s cubic-bezier(0.25,0.46,0.45,0.94) ${i * 70}ms both`,
          }}
        >
          <ArrowUpRight className="absolute top-2.5 right-2.5 size-3 text-muted-foreground opacity-0 translate-y-1 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0" />
          <tech.icon
            strokeWidth={1.5}
            className="size-[18px] text-muted-foreground transition-all duration-300 group-hover:text-foreground group-hover:scale-110"
          />
          <div className="flex flex-col items-center gap-1">
            <span className="text-[10px] tracking-widest uppercase text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
              {tech.name}
            </span>
            <span className="text-[9px] text-muted-foreground/50 transition-all duration-300 group-hover:text-muted-foreground">
              {tech.desc}
            </span>
          </div>
        </a>
      ))}
    </div>
  );
}
