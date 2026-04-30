import { createFileRoute } from '@tanstack/react-router';
import { useBlogPost } from '#/shared/hooks/use-blog-post';

export const Route = createFileRoute('/blog/$slug')({
  head: ({ params }) => ({
    links: [{ rel: 'canonical', href: `https://example.com/blog/${params.slug}` }],
  }),
  component: BlogPost,
});

function BlogPost() {
  const { slug } = Route.useParams();
  const { data: post, isPending, isError } = useBlogPost(Number(slug));

  if (isPending) {
    return (
      <main className="page-wrap px-4 pb-12 pt-16">
        <p className="text-[var(--sea-ink-soft)]">Loading post…</p>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="page-wrap px-4 pb-12 pt-16">
        <p className="text-[var(--sea-ink-soft)]">Post not found.</p>
      </main>
    );
  }

  return (
    <main className="page-wrap px-4 pb-12 pt-16">
      <article className="island-shell rounded-2xl p-6 sm:p-8">
        {post.cover_image
          ? (
            <img
              src={post.cover_image}
              alt=""
              className="mb-6 h-64 w-full rounded-2xl object-cover"
            />
          )
          : null}
        <p className="island-kicker mb-2">Post</p>
        <h1 className="display-title mb-3 text-4xl font-bold text-[var(--sea-ink)] sm:text-5xl">
          {post.title}
        </h1>
        <p className="mb-6 text-sm text-[var(--sea-ink-soft)]">
          {post.readable_publish_date}
        </p>
        <div
          className="prose prose-slate prose-headings:text-[var(--sea-ink)] prose-p:text-[var(--sea-ink-soft)] prose-li:text-[var(--sea-ink-soft)] prose-ul:text-[var(--sea-ink-soft)] prose-ol:text-[var(--sea-ink-soft)] prose-strong:text-[var(--sea-ink)] prose-a:text-[var(--lagoon-deep)] max-w-none"
          dangerouslySetInnerHTML={{ __html: post.body_html }}
        />
      </article>
    </main>
  );
}
