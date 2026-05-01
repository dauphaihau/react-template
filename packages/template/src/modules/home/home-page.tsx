import { Footer } from './components/footer';
import { Main } from './components/main';
import { Nav } from './components/nav';

export function HomePage() {
  return (
    <div className="flex h-screen w-full flex-col overflow-hidden">
      <Nav />
      <Main />
      <Footer />
    </div>
  );
}
