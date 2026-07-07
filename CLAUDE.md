# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start local dev server (Turbopack)
npm run build    # static export build → out/
npm run start    # serve the production build
npm run lint     # eslint .
```

There are no tests configured. Deploy by running `npm run build` then `npx wrangler deploy` to push `out/` to Cloudflare Workers.

## Architecture

This is a **Next.js App Router** static-export blog. `output: "export"` in `next.config.ts` means the build produces a fully static `out/` directory — no server runtime, no route handlers, no `getServerSideProps`. All data fetching is synchronous `fs.readFileSync` calls that happen at build time.

### Content pipeline

Blog posts are `.mdx` files in `content/posts/`. The filename is the URL slug. The pipeline lives entirely in `src/lib/posts.ts`:

- `gray-matter` parses YAML frontmatter; `reading-time` computes read estimates
- `getAllPosts()` / `getPostBySlug()` are the primary entry points
- `slugify()` converts category/tag strings to URL-safe slugs

**Frontmatter shape** (`src/types/post.ts`):
```typescript
{
  title: string;
  date: string;       // ISO 8601, e.g. "2026-07-06"
  category: string;
  tags: string[];
  excerpt?: string;   // auto-generated from first 160 chars if omitted
}
```

All dynamic routes (`/blog/[slug]`, `/categories/[slug]`, `/tags/[slug]`) implement `generateStaticParams()` — required for static export. The `params` prop is typed as `Promise<{ slug: string }>` (Next.js 15+ async params API).

### MDX rendering

Posts are rendered server-side via `MDXRemote` from `next-mdx-remote/rsc`. Rehype plugins run at render time in `src/app/blog/[slug]/page.tsx`: `rehype-slug` (heading IDs) then `rehype-pretty-code` with the `github-dark-dimmed` Shiki theme.

### Styling

Tailwind 4 with no `tailwind.config.js`. Design tokens are declared in `src/app/globals.css` using `@theme {}` and referenced with the `text-(--color-accent)` arbitrary-value syntax. The project uses a hand-rolled `.prose-post` class instead of `@tailwindcss/typography`.

Dark mode is toggled by adding/removing the `dark` class on `<html>` — `Navbar.tsx` handles this on the client. There is no `localStorage` persistence.

### Server/client component split

Nearly all components are React Server Components. Only two use `"use client"`:
- `Navbar.tsx` — dark mode toggle + mobile menu (`useState`/`useEffect`)
- `UptimeCounter.tsx` — live interval-based counter

### Site configuration

`src/lib/config.ts` exports a single `siteConfig` const. This is the one file to edit when personalizing the blog (name, bio, social links, launch date). It is consumed by Navbar, Footer, ProfileCard, HeroBanner, and the root layout metadata.

### Deployment

`wrangler.jsonc` configures a Cloudflare Workers static asset deployment: `assets.directory = "out"` with `not_found_handling: "404-page"`. The `out/` directory is committed to git and deployed via `wrangler deploy`.
