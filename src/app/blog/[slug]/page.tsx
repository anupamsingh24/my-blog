import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import { getAllPosts, getPostBySlug, slugify } from "@/lib/posts";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

// Pre-render every post at build time
export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = getPostBySlug(slug);
    return { title: post.title, description: post.excerpt };
  } catch {
    return {};
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;

  let post;
  try {
    post = getPostBySlug(slug);
  } catch {
    notFound();
  }

  const date = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <header className="mb-10">
        <div className="flex items-center gap-3 text-sm text-(--color-muted)">
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
        <h1 className="mt-3 font-(family-name:--font-display) text-3xl font-bold tracking-tight sm:text-4xl">
          {post.title}
        </h1>
        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href={`/tags/${slugify(tag)}`}
              className="rounded-full border border-(--color-border) px-2.5 py-0.5 text-xs text-(--color-muted) hover:border-(--color-accent) hover:text-(--color-accent) dark:border-(--color-border-dark)"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </header>

      <div className="prose-post">
        <MDXRemote
          source={post.content}
          options={{
            mdxOptions: {
              rehypePlugins: [
                rehypeSlug,
                [rehypePrettyCode, { theme: "github-dark-dimmed" }],
              ],
            },
          }}
        />
      </div>

      <footer className="mt-12 border-t border-(--color-border) pt-6 dark:border-(--color-border-dark)">
        <Link href="/" className="text-sm text-(--color-accent) hover:underline">
          ← Back to all posts
        </Link>
      </footer>
    </article>
  );
}
