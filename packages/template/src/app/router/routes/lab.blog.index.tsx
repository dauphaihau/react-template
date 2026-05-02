import { Link, createFileRoute } from '@tanstack/react-router';
import { useGetBlogsQuery } from '#/shared/server-state/blog';

const canonical = 'https://example.com/lab/blog';
const pageTitle = 'Lab Blog | React Template';
const siteDescription =
  'A review route for TanStack Query fetch states inside the React template.';

export const Route = createFileRoute('/lab/blog/')({
  head: () => ({
    links: [{ rel: 'canonical', href: canonical }],
    meta: [
      { title: pageTitle },
      { name: 'description', content: siteDescription },
      { property: 'og:image', content: 'https://example.com/images/lagoon-1.svg' },
    ],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const { data: posts, isPending, isError } = useGetBlogsQuery();

  if (isPending) {
    return (
      <main className="px-4 pb-6 pt-6 w640:px-6 w640:pb-8 w640:pt-8">
        <div className="mx-auto max-w-6xl rounded-[24px] border border-border bg-card p-6 shadow-sm">
          <p className="text-muted-foreground">Loading posts…</p>
        </div>
      </main>
    );
  }

  if (isError || !posts.length) {
    return (
      <main className="px-4 pb-6 pt-6 w640:px-6 w640:pb-8 w640:pt-8">
        <div className="mx-auto max-w-6xl rounded-[24px] border border-border bg-card p-6 shadow-sm">
          <p className="text-muted-foreground">Failed to load posts.</p>
        </div>
      </main>
    );
  }

  const [featured, ...rest] = posts;

  return (
    <main className="px-4 pb-6 pt-6 w640:px-6 w640:pb-8 w640:pt-8">
      <div className="mx-auto max-w-6xl">
        <section className="mb-4 rounded-[24px] border border-border bg-card p-6 shadow-sm">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Fetch review
          </p>
          <h1 className="m-0 text-4xl font-bold tracking-tight text-foreground w640:text-5xl">
            Blog data example
          </h1>
        </section>

        <section className="grid gap-4 w640:grid-cols-2 w1024:grid-cols-3">
          <article className="rounded-[24px] border border-border bg-card p-5 shadow-sm w640:p-6 w1024:col-span-2">
            {featured.cover_image
              ? (
                <img
                  src={featured.cover_image}
                  alt=""
                  className="mb-4 h-44 w-full rounded-[20px] object-cover w1280:h-60"
                />
              )
              : null}
            <h2 className="m-0 text-2xl font-semibold text-foreground">
              <Link
                to="/lab/blog/$slug"
                params={{ slug: String(featured.id) }}
                className="no-underline"
              >
                {featured.title}
              </Link>
            </h2>
            <p className="mb-2 mt-3 text-base text-muted-foreground">
              {featured.description}
            </p>
            <p className="m-0 text-xs text-muted-foreground">
              {featured.readable_publish_date}
            </p>
          </article>

          {rest.map((post, index) => (
            <article
              key={post.id}
              className="rounded-[24px] border border-border bg-card p-5 shadow-sm w640:last:col-span-2 w1024:last:col-span-1"
              style={{ animationDelay: `${(index * 80) + 120}ms` }}
            >
              {post.cover_image
                ? (
                  <img
                    src={post.cover_image}
                    alt=""
                    className="mb-4 h-44 w-full rounded-[20px] object-cover"
                  />
                )
                : null}
              <h2 className="m-0 text-2xl font-semibold text-foreground">
                <Link
                  to="/lab/blog/$slug"
                  params={{ slug: String(post.id) }}
                  className="no-underline"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="mb-2 mt-2 text-sm text-muted-foreground">
                {post.description}
              </p>
              <p className="m-0 text-xs text-muted-foreground">
                {post.readable_publish_date}
              </p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
