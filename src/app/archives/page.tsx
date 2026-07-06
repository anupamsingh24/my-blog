import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import type { Metadata } from "next";
import type { PostMeta } from "@/types/post";

export const metadata: Metadata = { title: "Archives" };

export default function ArchivesPage() {
  const posts = getAllPosts();

  const byYear = new Map<number, PostMeta[]>();
  for (const post of posts) {
    const year = new Date(post.date).getFullYear();
    const group = byYear.get(year) ?? [];
    group.push(post);
    byYear.set(year, group);
  }
  const years = Array.from(byYear.keys()).sort((a, b) => b - a);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-(family-name:--font-display) text-3xl font-bold">
        Archives
      </h1>
      <p className="mt-2 text-sm text-(--color-muted)">
        {posts.length} {posts.length === 1 ? "post" : "posts"} in total
      </p>

      {years.map((year) => (
        <section key={year} className="mt-10">
          <h2 className="font-(family-name:--font-display) text-xl font-semibold text-(--color-accent)">
            {year}
          </h2>
          <ul className="mt-4 space-y-3">
            {(byYear.get(year) ?? []).map((post) => (
              <li key={post.slug} className="flex items-baseline gap-4">
                <time
                  dateTime={post.date}
                  className="w-16 shrink-0 font-(family-name:--font-jetbrains-mono) text-xs text-(--color-muted)"
                >
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "2-digit",
                  })}
                </time>
                <Link
                  href={`/blog/${post.slug}`}
                  className="hover:text-(--color-accent)"
                >
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
