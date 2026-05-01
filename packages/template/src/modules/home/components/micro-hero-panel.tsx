import { MicroHeroData } from './micro-hero-data';
import { MicroHeroRouting } from './micro-hero-routing';
import { MicroHeroStack } from './micro-hero-stack';

export function MicroHeroPanel() {
  return (
    <div className="hidden border-border lg:flex lg:w-[400px] lg:flex-none lg:flex-col lg:items-center lg:justify-center lg:border-l lg:px-5 lg:py-6 xl:w-auto xl:flex-1 xl:px-6">
      <div className="flex w-full flex-col items-center gap-6 lg:overflow-y-auto lg:py-6">
        <MicroHeroRouting />
        <MicroHeroData />
        <MicroHeroStack />
      </div>
    </div>
  );
}
