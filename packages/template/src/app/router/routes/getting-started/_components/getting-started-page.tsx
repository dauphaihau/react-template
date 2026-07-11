import { useRef, useState } from 'react';
import { CloneCard } from './clone-card';
import { ConfigureCard } from './configure-card';
import { GridConnectors } from './grid-connectors';
import { InstallCard } from './install-card';
import { LaunchCard } from './launch-card';
import type { PackageManager } from './constants';

export function GettingStartedPage() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [pm, setPm] = useState<PackageManager>('bun');
  const ref0 = useRef<HTMLDivElement>(null);
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const ref3 = useRef<HTMLDivElement>(null);
  const nodeRefs = [ref0, ref1, ref2, ref3] as const;

  return (
    <div className="mx-auto flex min-w-0 max-w-7xl flex-1 items-center justify-center overflow-hidden border-x border-border px-6 w-full">
      <div className="w-full max-w-5xl">
        <div className="mb-8 text-center">
          <span className="text-[8px] uppercase tracking-[0.2em] text-muted-foreground">
            Getting Started
          </span>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">
            Set up in 4 steps
          </h1>
        </div>

        <div
          ref={gridRef}
          className="relative grid grid-cols-1 grid-rows-[1fr_1fr] gap-px border border-border bg-border w768:grid-cols-2"
        >
          <CloneCard codeBlockRef={ref0} pm={pm} setPm={setPm} />
          <InstallCard codeBlockRef={ref1} pm={pm} />
          <ConfigureCard codeBlockRef={ref2} />
          <LaunchCard codeBlockRef={ref3} pm={pm} />
          <GridConnectors containerRef={gridRef} refs={nodeRefs} />
        </div>
      </div>
    </div>
  );
}
