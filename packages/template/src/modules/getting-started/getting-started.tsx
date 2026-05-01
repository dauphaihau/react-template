import { useRef } from 'react';
import { CloneCard } from './components/clone-card';
import { ConfigureCard } from './components/configure-card';
import { GridConnectors } from './components/grid-connectors';
import { InstallCard } from './components/install-card';
import { LaunchCard } from './components/launch-card';

export function GettingStarted() {
  const gridRef = useRef<HTMLDivElement>(null);
  const ref0 = useRef<HTMLDivElement>(null);
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const ref3 = useRef<HTMLDivElement>(null);
  const nodeRefs = [ref0, ref1, ref2, ref3] as const;

  return (
    <div className="mx-auto flex-1 flex items-center justify-center w-full max-w-7xl min-w-0 border-x border-border px-6 overflow-hidden">
      <div className="w-full max-w-5xl">
        <div className="text-center mb-8">
          <span className="text-[8px] uppercase tracking-[0.2em] text-muted-foreground">
            Getting Started
          </span>
          <h1 className="text-2xl font-semibold tracking-tight mt-1">
            Set up in 4 steps
          </h1>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 grid-rows-[1fr_1fr] gap-px bg-border border border-border relative"
        >
          <CloneCard codeBlockRef={ref0} />
          <InstallCard codeBlockRef={ref1} />
          <ConfigureCard codeBlockRef={ref2} />
          <LaunchCard codeBlockRef={ref3} />
          <GridConnectors containerRef={gridRef} refs={nodeRefs} />
        </div>
      </div>
    </div>
  );
}
