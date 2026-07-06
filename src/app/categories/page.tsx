import Link from "next/link";
import { getAllCategories, slugify } from "@/lib/posts";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Categories" };

export default function CategoriesPage() {
  const categories = getAllCategories();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-(family-name:--font-display) text-3xl font-bold">
        Categories
      </h1>
      <ul className="mt-8 space-y-3">
        {categories.map((category) => (
          <li key={category.name}>
            <Link
              href={`/categories/${slugify(category.name)}`}
              className="flex items-baseline justify-between rounded-lg border border-(--color-border) px-4 py-3 transition-colors hover:border-(--color-accent) dark:border-(--color-border-dark)"
            >
              <span className="font-medium">{category.name}</span>
              <span className="text-sm text-(--color-muted)">
                {category.count} {category.count === 1 ? "post" : "posts"}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
