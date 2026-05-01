import { HeroSection } from './hero-section/hero-section';
import { MicroHeroPanel } from './micro-hero-panel';

export function Main() {
  return (
    <div className="min-h-[calc(100vh-var(--nav-height)-var(--footer-height))] flex-1 w-full xl:grid xl:grid-cols-[minmax(0,1fr)_minmax(0,80rem)_minmax(0,1fr)]">
      <aside className="pointer-events-none hidden xl:flex pr-[20%]" />

      <section className="mx-auto flex w-full h-full max-w-7xl min-w-0 flex-1 flex-col border-x border-border md:min-h-0 md:flex-row">
        <HeroSection />
        <MicroHeroPanel />
      </section>

      <aside className="pointer-events-none hidden xl:flex pl-[20%]" />
    </div>
  );
}
