import Link from "next/link";
import { getAllTags, slugify } from "@/lib/posts";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Tags" };

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-(family-name:--font-display) text-3xl font-bold">
        Tags
      </h1>
      <div className="mt-8 flex flex-wrap gap-3">
        {tags.map((tag) => (
          <Link
            key={tag.name}
            href={`/tags/${slugify(tag.name)}`}
            className="rounded-full border border-(--color-border) px-3 py-1 text-sm transition-colors hover:border-(--color-accent) hover:text-(--color-accent) dark:border-(--color-border-dark)"
          >
            #{tag.name}
            <span className="ml-1.5 text-xs text-(--color-muted)">
              {tag.count}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
