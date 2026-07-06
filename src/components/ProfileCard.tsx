import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { getAllCategories, getAllPosts, getAllTags } from "@/lib/posts";

export default function ProfileCard() {
  const stats = [
    { label: "Posts", value: getAllPosts().length, href: "/archives" },
    { label: "Categories", value: getAllCategories().length, href: "/categories" },
    { label: "Tags", value: getAllTags().length, href: "/tags" },
  ];

  return (
    <aside className="rounded-xl border border-(--color-border) bg-(--color-paper-sunk) p-6 dark:border-(--color-border-dark) dark:bg-(--color-paper-sunk-dark)">
      <div className="flex flex-col items-center text-center">
        {/* Avatar: initials on accent circle. Swap for <Image> + your photo
            in /public when ready. */}
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-(--color-accent) font-(family-name:--font-display) text-2xl font-bold text-white">
          {siteConfig.avatarInitials}
        </div>

        <div className="mt-3 flex items-center gap-2">
          <h2 className="font-(family-name:--font-display) text-lg font-semibold">
            {siteConfig.name}
          </h2>
          <span className="rounded bg-(--color-accent) px-1.5 py-0.5 text-xs font-medium text-white">
            {siteConfig.level}
          </span>
        </div>

        <p className="mt-2 text-sm text-(--color-muted)">{siteConfig.bio}</p>

        <div className="mt-4 grid w-full grid-cols-3 divide-x divide-(--color-border) dark:divide-(--color-border-dark)">
          {stats.map((stat) => (
            <Link
              key={stat.label}
              href={stat.href}
              className="group px-2 text-center"
            >
              <div className="font-(family-name:--font-display) text-xl font-semibold group-hover:text-(--color-accent)">
                {stat.value}
              </div>
              <div className="text-xs text-(--color-muted)">{stat.label}</div>
            </Link>
          ))}
        </div>

        <div className="mt-5 flex gap-4 text-sm">
          <a
            href={siteConfig.social.github}
            className="text-(--color-muted) hover:text-(--color-accent)"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            href={siteConfig.social.twitter}
            className="text-(--color-muted) hover:text-(--color-accent)"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
          <a
            href={siteConfig.social.email}
            className="text-(--color-muted) hover:text-(--color-accent)"
          >
            Email
          </a>
        </div>
      </div>
    </aside>
  );
}
