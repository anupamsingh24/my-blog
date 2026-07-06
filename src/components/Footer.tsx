import { siteConfig } from "@/lib/config";
import { getAllPosts } from "@/lib/posts";
import UptimeCounter from "@/components/UptimeCounter";

export default function Footer() {
  const postCount = getAllPosts().length;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-(--color-border) py-8 dark:border-(--color-border-dark)">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 px-4 text-center text-sm text-(--color-muted)">
        <p>
          © {year} {siteConfig.name} · {postCount}{" "}
          {postCount === 1 ? "post" : "posts"}
        </p>
        <UptimeCounter launchDate={siteConfig.launchDate} />
      </div>
    </footer>
  );
}
