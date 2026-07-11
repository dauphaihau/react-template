import { Arch } from './arch';
import { Data } from './data';
import { Routing } from './routing';

export function MicroHeroPanel() {
  return (
    <div className="hidden border-border w1024:flex w1024:w-[400px] w1024:flex-none w1024:flex-col w1024:items-center w1024:justify-center w1024:border-l w1024:px-5 w1024:py-6 w1280:w-auto w1280:flex-1 w1280:px-6">
      <div className="flex w-full flex-col items-center gap-6 w1024:overflow-y-auto w1024:py-6">
        <Arch />
        <Data />
        <Routing />
      </div>
    </div>
  );
}
