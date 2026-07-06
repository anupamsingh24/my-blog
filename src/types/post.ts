export interface PostFrontmatter {
  title: string;
  date: string; // ISO date string, e.g. "2026-07-06"
  category: string;
  tags: string[];
  excerpt?: string;
}

export interface PostMeta extends PostFrontmatter {
  slug: string;
  readingTime: string;
}

export interface Post extends PostMeta {
  content: string;
}
