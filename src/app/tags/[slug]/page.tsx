import { notFound } from "next/navigation";
import PostCard from "@/components/PostCard";
import { getAllTags, getPostsByTag, slugify } from "@/lib/posts";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllTags().map((tag) => ({ slug: slugify(tag.name) }));
}

export default async function TagPage({ params }: Props) {
  const { slug } = await params;
  const posts = getPostsByTag(slug);

  if (posts.length === 0) notFound();

  const displayName =
    posts[0]?.tags.find((tag) => slugify(tag) === slug) ?? slug;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <p className="text-sm text-(--color-muted)">Tag</p>
      <h1 className="mt-1 font-(family-name:--font-display) text-3xl font-bold text-(--color-accent)">
        #{displayName}
      </h1>
      <div className="mt-8">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
