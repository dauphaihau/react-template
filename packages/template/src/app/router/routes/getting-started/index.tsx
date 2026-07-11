import { createFileRoute } from '@tanstack/react-router';
import { HomeLayout } from '../_components/home-layout';
import { GettingStartedPage } from './_components/getting-started-page';

export const Route = createFileRoute('/getting-started/')({
  component: GettingStartedIndexPage,
  head: () => ({
    meta: [{ title: 'Getting Started - React Template' }],
  }),
});

function GettingStartedIndexPage() {
  return (
    <HomeLayout>
      <GettingStartedPage />
    </HomeLayout>
  );
}
