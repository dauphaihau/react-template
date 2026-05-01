import { Link, createFileRoute } from '@tanstack/react-router';
import { useGetBlogsQuery } from '#/shared/server-state/blog';

const canonical = 'https://example.com/blog';
const pageTitle = 'Blog | React Template';
const siteDescription =
  'A tropical, breathable Vite React starter with TanStack Router, TanStack Query, and type-safe routing.';

export const Route = createFileRoute('/blog/')({
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
      <main className="page-wrap px-4 pb-8 pt-14">
        <p className="text-muted-foreground">Loading posts…</p>
      </main>
    );
  }

  if (isError || !posts.length) {
    return (
      <main className="page-wrap px-4 pb-8 pt-14">
        <p className="text-muted-foreground">Failed to load posts.</p>
      </main>
    );
  }

  const [featured, ...rest] = posts;

  return (
    <main className="page-wrap px-4 pb-8 pt-14">
      <section className="mb-4">
        <p className="island-kicker mb-2">Latest Dispatches</p>
        <h1 className="display-title m-0 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Blog
        </h1>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <article className="island-shell rise-in rounded-2xl p-5 sm:p-6 lg:col-span-2">
          {featured.cover_image
            ? (
              <img
                src={featured.cover_image}
                alt=""
                className="mb-4 h-44 w-full rounded-xl object-cover xl:h-60"
              />
            )
            : null}
          <h2 className="m-0 text-2xl font-semibold text-foreground">
            <Link
              to="/blog/$slug"
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
            className="island-shell rise-in rounded-2xl p-5 sm:last:col-span-2 lg:last:col-span-1"
            style={{ animationDelay: `${(index * 80) + 120}ms` }}
          >
            {post.cover_image
              ? (
                <img
                  src={post.cover_image}
                  alt=""
                  className="mb-4 h-44 w-full rounded-xl object-cover"
                />
              )
              : null}
            <h2 className="m-0 text-2xl font-semibold text-foreground">
              <Link
                to="/blog/$slug"
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
    </main>
  );
}
