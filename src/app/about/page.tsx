import { siteConfig } from "@/lib/config";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-(family-name:--font-display) text-3xl font-bold">
        About
      </h1>
      <div className="prose-post mt-8">
        <p>
          Hi, I&apos;m {siteConfig.name}. {siteConfig.bio}
        </p>
        <p>
          This blog is where I write about the things I build and break —
          mostly backend systems, TypeScript, and whatever I&apos;m currently
          learning. Replace this text with your own story: how you got into
          engineering, what you work on, and what readers can expect here.
        </p>
        <p>
          You can find me on{" "}
          <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>{" "}
          or reach out via <a href={siteConfig.social.email}>email</a>.
        </p>
      </div>
    </div>
  );
}
