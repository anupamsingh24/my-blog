# My Blog

A personal tech blog built with Next.js 16, TypeScript 6, Tailwind CSS 4, and MDX.
Design inspired by louistsai.com: hero banner, profile sidebar with stat counters,
category/tag/archive pages, maroon accent, dark mode, and a live uptime ticker.

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
```

## First things to customize

1. **`src/lib/config.ts`** — your name, bio, avatar initials, social links, and
   the site launch date (used by the footer uptime counter).
2. **`src/app/about/page.tsx`** — replace the placeholder story.
3. **`src/components/HeroBanner.tsx`** — swap the striped background for a real
   banner image if you have one (drop it in `public/` and use CSS
   `background-image`).

## Writing a post

Create `content/posts/my-post-slug.mdx`:

```yaml
---
title: "My Post Title"
date: "2026-07-10"
category: "Backend"
tags: ["Go", "Databases"]
excerpt: "One or two sentences shown on listing pages."
---
```

Then write Markdown below the frontmatter. Code blocks get syntax highlighting
automatically (Shiki via rehype-pretty-code). The filename becomes the URL:
`/blog/my-post-slug`. Categories, tags, archives, and all counters update at
build time — no extra steps.

Publish by committing and pushing. Your host rebuilds automatically.

## Project layout

```
content/posts/          ← your .mdx posts (the only place you write)
src/lib/config.ts       ← personal info, one file
src/lib/posts.ts        ← content pipeline (read, parse, sort, group)
src/types/post.ts       ← shared types
src/components/         ← Navbar, Footer, ProfileCard, PostCard, HeroBanner, UptimeCounter
src/app/                ← routes: /, /blog/[slug], /categories, /tags, /archives, /about
```

## Deploying free

**Vercel (recommended):** push the repo to GitHub, then vercel.com → New
Project → import the repo. Zero config; every push deploys.

**Cloudflare Pages:** for unlimited bandwidth, uncomment `output: "export"`
in `next.config.ts` to produce a fully static build, then connect the repo in
the Cloudflare dashboard with build command `npm run build` and output
directory `out`.

## Version notes (as of July 2026)

- Next.js 16.2.10 LTS — current supported release
- TypeScript 6.0.x — latest stable; when TS 7 (Go compiler) goes GA, upgrading
  should be seamless since 6.0 was designed as the bridge release
- Tailwind CSS 4.3.x — latest stable, CSS-first config via `@theme`
