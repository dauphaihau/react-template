import { useRouter } from '@tanstack/react-router';
import { StatusPage } from '../status-page';

export function NotFound() {
  const router = useRouter();

  return (
    <StatusPage
      code="404"
      title="Oops! Page Not Found!"
      description="It seems like the page you're looking for does not exist or might have been removed."
      actions={[
        { label: 'Go Back', onClick: () => router.history.back(), variant: 'outline' },
        { label: 'Back to Home', href: '/', variant: 'default' },
      ]}
    />
  );
}
