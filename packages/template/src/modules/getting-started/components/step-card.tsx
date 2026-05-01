export function CornerBrackets() {
  return (
    <>
      <span className="absolute h-2.5 w-2.5 border-foreground/30 group-hover:border-foreground border-b border-r bottom-0 right-0 transition-colors duration-300" />
      <span className="absolute h-2.5 w-2.5 border-foreground/30 group-hover:border-foreground border-b border-l bottom-0 left-0 transition-colors duration-300" />
      <span className="absolute h-2.5 w-2.5 border-foreground/30 group-hover:border-foreground border-t border-r top-0 right-0 transition-colors duration-300" />
      <span className="absolute h-2.5 w-2.5 border-foreground/30 group-hover:border-foreground border-t border-l top-0 left-0 transition-colors duration-300" />
    </>
  );
}

interface StepCardProps {
  index: number;
  label: string;
  title: string;
  children: React.ReactNode;
  centered?: boolean;
  topExtra?: React.ReactNode;
  bottomExtra?: React.ReactNode;
}

export function StepCard({
  index,
  label,
  title,
  children,
  centered,
  topExtra,
  bottomExtra,
}: StepCardProps) {
  return (
    <div className="bg-background relative group overflow-hidden flex flex-col transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:group-hover:shadow-[0_2px_8px_rgba(255,255,255,0.02)]">
      <div className="absolute top-2 right-2 size-5 rounded-full border border-border bg-background text-[8px] flex items-center justify-center font-mono z-10">
        {index + 1}
      </div>
      <div className="absolute top-0 left-0 right-0 px-4 pt-0.5 pointer-events-none z-[1]">
        <span className="text-[9px] font-mono text-muted-foreground">
          Step {index + 1} — {label}
        </span>
        <h2 className="text-sm font-semibold tracking-tight text-foreground -mt-0.5 mb-0">
          {title}
        </h2>
      </div>
      {centered
        ? (
          <div className="p-4 pt-10 flex-1 grid grid-rows-[1fr_auto_1fr]">
            <div className="flex flex-col justify-end">{topExtra}</div>
            <div className="flex flex-col gap-2">{children}</div>
            {bottomExtra && (
              <div className="self-start mt-2">{bottomExtra}</div>
            )}
          </div>
        )
        : (
          <div className="p-4 pt-10 flex flex-col flex-1">
            <div className="flex-1 flex flex-col justify-center gap-2">
              {children}
            </div>
          </div>
        )}
      <CornerBrackets />
    </div>
  );
}
