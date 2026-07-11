import { CREATE_COMMANDS, PM_OPTIONS } from './constants';
import type { PackageManager } from './constants';
import { CodeBlock } from './code-block';
import { StepCard } from './step-card';

export function CloneCard({
  codeBlockRef,
  pm,
  setPm,
}: {
  codeBlockRef?: React.Ref<HTMLDivElement>;
  pm: PackageManager;
  setPm: (value: PackageManager) => void;
}) {
  return (
    <StepCard
      index={0}
      label="Create"
      title="Scaffold a new app"
      centered
      topExtra={
        <div className="flex gap-3 mb-1">
          {PM_OPTIONS.map((pmOpt) => (
            <button
              key={pmOpt}
              onClick={() => setPm(pmOpt)}
              className={`text-[10px] font-mono pb-0.5 cursor-pointer transition-all duration-200 ${pm === pmOpt ? 'text-foreground border-b-2 border-foreground' : 'text-muted-foreground hover:text-foreground border-b-2 border-transparent'}`}
            >
              {pmOpt}
            </button>
          ))}
        </div>
      }
    >
      <CodeBlock ref={codeBlockRef} code={CREATE_COMMANDS[pm]} />
    </StepCard>
  );
}
