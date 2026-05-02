import { StatusPage } from '../status-page';
import type { StatusPageAction } from '../status-page';

export interface ErrorDisplayProps {
  title?: string
  message: string
  details?: string
  onRetry?: () => void
  onGoBack?: () => void
  showStack?: boolean
  stack?: string
}

export function ErrorDisplay({
  title = 'Something Went Wrong!',
  message,
  details,
  onRetry,
  onGoBack,
  showStack = false,
  stack,
}: ErrorDisplayProps) {
  const actions: StatusPageAction[] = [];
  if (onGoBack) actions.push({ label: 'Go Back', onClick: onGoBack, variant: 'outline' });
  if (onRetry) actions.push({ label: 'Try Again', onClick: onRetry, variant: 'default' });

  return (
    <StatusPage
      code="500"
      title={`Oops! ${title}`}
      description={
        <>
          <p>{message}</p>
          {details && <p className="mt-1 text-sm">{details}</p>}
        </>
      }
      actions={actions}
      extra={
        showStack && stack
          ? (
            <details className="mt-6 w-full max-w-xl rounded-lg border border-border bg-muted p-3 text-left">
              <summary className="cursor-pointer text-xs font-medium text-foreground">
                Stack trace
              </summary>
              <pre className="mt-2 max-h-48 overflow-auto whitespace-pre font-mono text-xs text-muted-foreground">
                {stack}
              </pre>
            </details>
          )
          : undefined
      }
    />
  );
}
