import { Outlet, createFileRoute } from '@tanstack/react-router';
import Footer from '#/shared/ui/widgets/footer';
import Header from '#/shared/ui/widgets/header';

export const Route = createFileRoute('/_main')({
  component: MainLayout,
});

function MainLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
