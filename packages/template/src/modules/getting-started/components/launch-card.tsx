import { ArrowRightIcon } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { Button } from '#/shared/ui';
import { CodeBlock } from './code-block';
import { StepCard } from './step-card';

export function LaunchCard({ codeBlockRef }: { codeBlockRef?: React.Ref<HTMLDivElement> }) {
  return (
    <StepCard
      index={3}
      label="Launch"
      title="You're ready"
      centered
      bottomExtra={<StartBuildingButton />}
    >
      <CodeBlock ref={codeBlockRef} code="bun dev" />
    </StepCard>
  );
}

function StartBuildingButton() {
  return (
    <Link to="/" className="relative w-fit group/cta inline-block">
      <Button
        variant="outline"
        className="rounded-none cursor-pointer relative overflow-hidden focus-visible:ring-0 h-8 px-3 py-1 border-dashed !border-foreground/10"
      >
        <span className="shine absolute -top-1/2 -left-full h-[200%] w-3/4 skew-x-[-20deg] bg-linear-to-r from-transparent via-white/40 to-transparent pointer-events-none z-20" />
        <span className="text-[9px] font-medium text-foreground flex items-center gap-1.5 group-hover/cta:gap-2.5 transition-all duration-300">
          Start building
          <ArrowRightIcon className="size-3 w-0 opacity-0 group-hover/cta:w-3 group-hover/cta:opacity-100 transition-all duration-200" />
        </span>
      </Button>
      <span className="absolute h-2.5 w-2.5 border-foreground/30 group-hover/cta:border-foreground border-b border-r bottom-0 right-0 transition-colors duration-300" />
      <span className="absolute h-2.5 w-2.5 border-foreground/30 group-hover/cta:border-foreground border-b border-l bottom-0 left-0 transition-colors duration-300" />
      <span className="absolute h-2.5 w-2.5 border-foreground/30 group-hover/cta:border-foreground border-t border-r top-0 right-0 transition-colors duration-300" />
      <span className="absolute h-2.5 w-2.5 border-foreground/30 group-hover/cta:border-foreground border-t border-l top-0 left-0 transition-colors duration-300" />
    </Link>
  );
}
