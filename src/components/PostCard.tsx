import Link from "next/link";
import { slugify } from "@/lib/posts";
import type { PostMeta } from "@/types/post";

export default function PostCard({ post }: { post: PostMeta }) {
  const date = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <article className="group border-b border-(--color-border) py-6 first:pt-0 dark:border-(--color-border-dark)">
      <div className="flex items-center gap-3 text-xs text-(--color-muted)">
        <time dateTime={post.date}>{date}</time>
        <span aria-hidden>·</span>
        <Link
          href={`/categories/${slugify(post.category)}`}
          className="font-medium text-(--color-accent) hover:underline"
        >
          {post.category}
        </Link>
        <span aria-hidden>·</span>
        <span>{post.readingTime}</span>
      </div>

      <h2 className="mt-2 font-(family-name:--font-display) text-xl font-semibold">
        <Link
          href={`/blog/${post.slug}`}
          className="transition-colors group-hover:text-(--color-accent)"
        >
          {post.title}
        </Link>
      </h2>

      <p className="mt-2 text-sm leading-relaxed text-(--color-muted)">
        {post.excerpt}
      </p>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        {post.tags.map((tag) => (
          <Link
            key={tag}
            href={`/tags/${slugify(tag)}`}
            className="rounded-full border border-(--color-border) px-2.5 py-0.5 text-xs text-(--color-muted) transition-colors hover:border-(--color-accent) hover:text-(--color-accent) dark:border-(--color-border-dark)"
          >
            #{tag}
          </Link>
        ))}
        <Link
          href={`/blog/${post.slug}`}
          className="ml-auto text-xs font-medium text-(--color-accent)"
        >
          Read more →
        </Link>
      </div>
    </article>
  );
}
