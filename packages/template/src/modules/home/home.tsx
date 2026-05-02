import { HeroSection } from './components/hero-section';
import { MicroHeroPanel } from './components/micro-hero-panel';

export function Home() {
  return (
    <div className="flex-1 w-full w1280:grid w1280:grid-cols-[minmax(0,1fr)_minmax(0,80rem)_minmax(0,1fr)]">
      <aside className="pointer-events-none hidden w1280:flex pr-[20%]" />

      <section className="mx-auto flex w-full h-full max-w-7xl min-w-0 flex-1 flex-col border-x border-border w768:min-h-0 w768:flex-row">
        <HeroSection />
        <MicroHeroPanel />
      </section>

      <aside className="pointer-events-none hidden w1280:flex pl-[20%]" />
    </div>
  );
}
