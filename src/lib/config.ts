/**
 * Everything personal to your site lives here. Edit this file first —
 * name, bio, avatar initials, social links, and the launch date used by
 * the uptime counter in the footer.
 */
export const siteConfig = {
  name: "Your Name",
  title: "Your Name's Blog",
  tagline: "Notes on backend systems, TypeScript, and things I learn the hard way.",
  bio: "Backend engineer. Writing about APIs, distributed systems, and TypeScript.",
  avatarInitials: "YN",
  level: "Lv1",
  social: {
    github: "https://github.com/yourusername",
    twitter: "https://twitter.com/yourusername",
    email: "mailto:you@example.com",
  },
  // Used by the footer's live uptime ticker — set this to whenever you
  // actually launch the site.
  launchDate: "2026-07-06T00:00:00Z",
} as const;
