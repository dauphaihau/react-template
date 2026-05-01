import { CodeBlock } from './code-block';
import { StepCard } from './step-card';

export function CloneCard({ codeBlockRef }: { codeBlockRef?: React.Ref<HTMLDivElement> }) {
  return (
    <StepCard index={0} label="Clone" title="Clone the repo" centered>
      <CodeBlock ref={codeBlockRef} code="git clone https://github.com/dauphaihau/react-template" />
    </StepCard>
  );
}
