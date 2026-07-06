import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { Post, PostFrontmatter, PostMeta } from "@/types/post";

const POSTS_DIRECTORY = path.join(process.cwd(), "content/posts");

function getPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIRECTORY)) return [];
  return fs
    .readdirSync(POSTS_DIRECTORY)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

/** Reads and parses a single post by its slug (filename without .mdx). */
export function getPostBySlug(slug: string): Post {
  const fullPath = path.join(POSTS_DIRECTORY, `${slug}.mdx`);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  const frontmatter = data as PostFrontmatter;

  return {
    slug,
    title: frontmatter.title,
    date: frontmatter.date,
    category: frontmatter.category,
    tags: frontmatter.tags ?? [],
    excerpt: frontmatter.excerpt ?? content.trim().slice(0, 160).concat("…"),
    readingTime: readingTime(content).text,
    content,
  };
}

/** All posts, metadata only (no MDX body), newest first. */
export function getAllPosts(): PostMeta[] {
  return getPostSlugs()
    .map((slug) => {
      const { content: _content, ...meta } = getPostBySlug(slug);
      return meta;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllCategories(): { name: string; count: number }[] {
  const posts = getAllPosts();
  const counts = new Map<string, number>();
  for (const post of posts) {
    counts.set(post.category, (counts.get(post.category) ?? 0) + 1);
  }
  return Array.from(counts.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getAllTags(): { name: string; count: number }[] {
  const posts = getAllPosts();
  const counts = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return Array.from(counts.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** categorySlug is the URL-safe slug, e.g. "web-security" for "Web Security". */
export function getPostsByCategory(categorySlug: string): PostMeta[] {
  return getAllPosts().filter(
    (post) => slugify(post.category) === categorySlug
  );
}

/** tagSlug is the URL-safe slug, e.g. "type-script" for "TypeScript". */
export function getPostsByTag(tagSlug: string): PostMeta[] {
  return getAllPosts().filter((post) =>
    post.tags.some((tag) => slugify(tag) === tagSlug)
  );
}
