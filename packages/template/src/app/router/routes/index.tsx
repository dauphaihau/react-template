import { createFileRoute } from '@tanstack/react-router';
import { HomeLayout } from './_components/home-layout';
import { HomePage } from './_components/home/home-page';

export const Route = createFileRoute('/')({
  component: IndexPage,
});

function IndexPage() {
  return (
    <HomeLayout>
      <HomePage />
    </HomeLayout>
  );
}
