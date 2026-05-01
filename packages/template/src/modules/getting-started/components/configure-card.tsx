import { ENV_VARS } from '../constants';
import { CodeBlock } from './code-block';
import { StepCard } from './step-card';

export function ConfigureCard({
  codeBlockRef,
}: {
  codeBlockRef?: React.Ref<HTMLDivElement>;
}) {
  return (
    <StepCard
      index={2}
      label="Configure"
      title="Set up environment"
    >
      <div className="border border-border divide-y divide-border mt-1 mb-0.5">
        {ENV_VARS.map((envVar, idx) => (
          <div
            key={envVar}
            className="px-2 py-1 font-mono text-[9px] text-muted-foreground border-l-2 border-l-transparent group-hover:border-l-foreground/20 opacity-60 group-hover:opacity-100 transition-all duration-300"
            style={{ transitionDelay: `${80 + (idx * 60)}ms` }}
          >
            {envVar}
          </div>
        ))}
      </div>
      <CodeBlock ref={codeBlockRef} code="cp .env.example .env" />
    </StepCard>
  );
}
