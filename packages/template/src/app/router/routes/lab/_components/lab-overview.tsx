import { Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
import { labQuickLinks } from './constants';

export function LabOverview() {
  return (
    <main className="flex-1 px-4 py-6 w640:px-6 w640:py-8">
      <section className="mx-auto max-w-6xl">
        <div className="rounded-[28px] border border-border bg-card p-6 shadow-sm w640:p-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            Review workspace
          </p>
          <h1 className="m-0 max-w-3xl text-3xl font-bold tracking-tight text-foreground w640:text-5xl">
            One route to review your fetch flows, fallback UI, and missing-page behavior.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
            The lab keeps example pages behind a dedicated sidebar shell, so you can
            inspect success states, error boundaries, and 404 handling without mixing
            them into the landing experience.
          </p>
        </div>

        <div className="mt-6 grid gap-4 w768:grid-cols-2 w1280:grid-cols-3">
          {labQuickLinks.map((item, index) => {
            const Icon = item.icon;

            const content = (
              <>
                <div className="flex items-center justify-between">
                  <span className="flex size-11 items-center justify-center rounded-2xl border border-border bg-muted text-foreground">
                    <Icon className="size-5" />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    0{index + 1}
                  </span>
                </div>
                <div className="mt-5">
                  <h2 className="m-0 text-xl font-semibold text-foreground">
                    {item.title}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {item.description}
                  </p>
                </div>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-foreground">
                  Open example
                  <ArrowRight className="size-4" />
                </div>
              </>
            );

            return item.to
              ? (
                <Link
                  key={item.title}
                  to={item.to}
                  className="rounded-[24px] border border-border bg-card p-5 no-underline shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:border-foreground/20"
                >
                  {content}
                </Link>
              )
              : (
                <a
                  key={item.title}
                  href={item.href}
                  className="rounded-[24px] border border-border bg-card p-5 no-underline shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:border-foreground/20"
                >
                  {content}
                </a>
              );
          })}
        </div>
      </section>
    </main>
  );
}
