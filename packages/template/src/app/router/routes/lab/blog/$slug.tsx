import { createFileRoute } from '@tanstack/react-router';
import { useGetBlogQuery } from '#/modules/blog';

export const Route = createFileRoute('/lab/blog/$slug')({
  head: ({ params }) => ({
    links: [{ rel: 'canonical', href: `https://example.com/lab/blog/${params.slug}` }],
  }),
  component: BlogPost,
});

function BlogPost() {
  const { slug } = Route.useParams();
  const { data: post, isPending, isError } = useGetBlogQuery(Number(slug));

  if (isPending) {
    return (
      <main className="px-4 pb-6 pt-6 w640:px-6 w640:pb-8 w640:pt-8">
        <div className="mx-auto max-w-5xl rounded-[24px] border border-border bg-card p-6 shadow-sm">
          <p className="text-muted-foreground">Loading post…</p>
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="px-4 pb-6 pt-6 w640:px-6 w640:pb-8 w640:pt-8">
        <div className="mx-auto max-w-5xl rounded-[24px] border border-border bg-card p-6 shadow-sm">
          <p className="text-muted-foreground">Post not found.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="px-4 pb-6 pt-6 w640:px-6 w640:pb-8 w640:pt-8">
      <article className="mx-auto max-w-5xl rounded-[28px] border border-border bg-card p-6 shadow-sm w640:p-8">
        {post.cover_image
          ? (
            <img
              src={post.cover_image}
              alt=""
              className="mb-6 h-64 w-full rounded-[24px] object-cover"
            />
          )
          : null}
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Post
        </p>
        <h1 className="mb-3 text-4xl font-bold text-foreground w640:text-5xl">
          {post.title}
        </h1>
        <p className="mb-6 text-sm text-muted-foreground">
          {post.readable_publish_date}
        </p>
        <div
          className="prose prose-neutral max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-ul:text-muted-foreground prose-ol:text-muted-foreground prose-strong:text-foreground prose-a:text-foreground"
          dangerouslySetInnerHTML={{ __html: post.body_html }}
        />
      </article>
    </main>
  );
}
