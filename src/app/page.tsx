import HeroBanner from "@/components/HeroBanner";
import PostCard from "@/components/PostCard";
import ProfileCard from "@/components/ProfileCard";
import { getAllPosts } from "@/lib/posts";

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <>
      <HeroBanner />
      <div className="mx-auto grid max-w-5xl gap-10 px-4 py-10 lg:grid-cols-[1fr_280px]">
        <section aria-label="Latest posts">
          {posts.length === 0 ? (
            <p className="text-(--color-muted)">
              No posts yet. Add a .mdx file to content/posts to get started.
            </p>
          ) : (
            posts.map((post) => <PostCard key={post.slug} post={post} />)
          )}
        </section>
        <div className="order-first lg:order-none">
          <div className="lg:sticky lg:top-20">
            <ProfileCard />
          </div>
        </div>
      </div>
    </>
  );
}
