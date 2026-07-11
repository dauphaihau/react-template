import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { Button, Input } from '#/shared/ui';
import {
  useCurrentUserQuery,
  useLoginMutation,
} from '../server-state';

export function LoginPage() {
  const navigate = useNavigate();
  const { data: user } = useCurrentUserQuery();
  const loginMutation = useLoginMutation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (!user) return;
    void navigate({ to: '/' });
  }, [navigate, user]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await loginMutation.mutateAsync({ email, password });
    await navigate({ to: '/' });
  }

  return (
    <main className="mx-auto flex min-h-svh w-full max-w-7xl flex-1 flex-col border-x border-border px-4 py-16 w640:px-6">
      <div className="mx-auto flex w-full max-w-md flex-1 items-center">
        <div className="w-full rounded-2xl border border-border bg-background p-6 shadow-sm">
          <div className="mb-6 space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Welcome back
            </p>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              Sign in
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />

            {loginMutation.error ? (
              <p className="text-sm text-destructive">
                {loginMutation.error.message}
              </p>
            ) : null}

            <Button
              type="submit"
              className="w-full"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>

          <p className="mt-4 text-sm text-muted-foreground">
            Need an account?{' '}
            <Link to="/register" className="text-foreground underline underline-offset-4">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
