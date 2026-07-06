import { notFound } from "next/navigation";
import PostCard from "@/components/PostCard";
import { getAllCategories, getPostsByCategory, slugify } from "@/lib/posts";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllCategories().map((category) => ({
    slug: slugify(category.name),
  }));
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const posts = getPostsByCategory(slug);

  if (posts.length === 0) notFound();

  // Recover the display name from the first matching post
  const displayName = posts[0]?.category ?? slug;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <p className="text-sm text-(--color-muted)">Category</p>
      <h1 className="mt-1 font-(family-name:--font-display) text-3xl font-bold text-(--color-accent)">
        {displayName}
      </h1>
      <div className="mt-8">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
