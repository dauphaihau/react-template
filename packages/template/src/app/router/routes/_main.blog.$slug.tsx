import { createFileRoute } from '@tanstack/react-router';
import { useGetBlogQuery } from '#/shared/server-state/blog';

export const Route = createFileRoute('/_main/blog/$slug')({
  head: ({ params }) => ({
    links: [{ rel: 'canonical', href: `https://example.com/blog/${params.slug}` }],
  }),
  component: BlogPost,
});

function BlogPost() {
  const { slug } = Route.useParams();
  const { data: post, isPending, isError } = useGetBlogQuery(Number(slug));

  if (isPending) {
    return (
      <main className="page-wrap px-4 pb-12 pt-16">
        <p className="text-muted-foreground">Loading post…</p>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="page-wrap px-4 pb-12 pt-16">
        <p className="text-muted-foreground">Post not found.</p>
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
        <h1 className="display-title mb-3 text-4xl font-bold text-foreground sm:text-5xl">
          {post.title}
        </h1>
        <p className="mb-6 text-sm text-muted-foreground">
          {post.readable_publish_date}
        </p>
        <div
          className="prose prose-neutral prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-ul:text-muted-foreground prose-ol:text-muted-foreground prose-strong:text-foreground prose-a:text-foreground max-w-none"
          dangerouslySetInnerHTML={{ __html: post.body_html }}
        />
      </article>
    </main>
  );
}
