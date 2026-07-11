import { INSTALL_COMMANDS } from './constants';
import type { PackageManager } from './constants';
import { CodeBlock } from './code-block';
import { StepCard } from './step-card';

export function InstallCard({
  codeBlockRef,
  pm,
}: {
  codeBlockRef?: React.Ref<HTMLDivElement>;
  pm: PackageManager;
}) {
  return (
    <StepCard
      index={1}
      label="Open"
      title="Enter and install"
      centered
      topExtra={
        <p className="text-[10px] text-muted-foreground mb-1">
          The CLI creates a new folder for your app. Skip this if you already installed in the prompt.
        </p>
      }
    >
      <CodeBlock ref={codeBlockRef} code={INSTALL_COMMANDS[pm]} />
    </StepCard>
  );
}
