import type { ReactNode } from 'react';
import { Link } from '@tanstack/react-router';
import { Button } from '#/shared/ui/primitives';

export interface StatusPageAction {
  label: string
  onClick?: () => void
  href?: string
  variant?: 'default' | 'outline'
}

export interface StatusPageProps {
  code: string
  title: string
  description: ReactNode
  actions: StatusPageAction[]
  extra?: ReactNode
}

export function StatusPage({
  code, title, description, actions, extra, 
}: StatusPageProps) {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-background px-6 text-center">
      <p className="text-[clamp(5rem,20vw,10rem)] font-bold leading-none tracking-tight text-foreground">
        {code}
      </p>

      <div className="mt-6 flex flex-col items-center gap-3">
        <h1 className="text-xl font-semibold text-foreground w640:text-2xl">{title}</h1>
        <div className="max-w-md text-base text-muted-foreground">{description}</div>
      </div>

      {extra}

      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        {actions.map((action) =>
          action.variant === 'outline'
            ? (
              <Button
                key={action.label}
                variant="outline"
                size="lg"
                className="min-w-36 rounded-lg border-foreground/20"
                onClick={action.onClick}
              >
                {action.label}
              </Button>
            )
            : action.href
              ? (
                <Button key={action.label} size="lg" className="min-w-36 rounded-lg" asChild>
                  <Link to={action.href}>{action.label}</Link>
                </Button>
              )
              : (
                <Button
                  key={action.label}
                  size="lg"
                  className="min-w-36 rounded-lg"
                  onClick={action.onClick}
                >
                  {action.label}
                </Button>
              ),
        )}
      </div>
    </div>
  );
}
