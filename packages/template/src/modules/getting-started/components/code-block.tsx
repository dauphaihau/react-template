import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

export function CodeBlock({
  code,
  ref,
}: {
  code: string;
  ref?: React.Ref<HTMLDivElement>;
}) {
  const [flash, setFlash] = useState(false);

  return (
    <div
      ref={ref}
      className={`flex items-center justify-between gap-2 bg-muted border border-dashed px-3 py-2 font-mono text-xs hover:border-foreground/30 transition-colors ${flash ? 'border-foreground/50' : 'border-foreground/20'}`}
    >
      <code className="bg-transparent! border-0! rounded-none! p-0! text-foreground truncate">{code}</code>
      <button
        onClick={() => {
          navigator.clipboard.writeText(code);
          setFlash(true);
          setTimeout(() => setFlash(false), 300);
        }}
        className="text-muted-foreground hover:text-foreground transition-all hover:scale-110 active:scale-95 cursor-pointer"
      >
        {flash ? <Check size={12} /> : <Copy size={12} />}
      </button>
    </div>
  );
}
