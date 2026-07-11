import { createFileRoute } from '@tanstack/react-router';
import { RegisterPage } from '#/modules/auth';

export const Route = createFileRoute('/register')({
  component: RegisterRoute,
});

function RegisterRoute() {
  return <RegisterPage />;
}
