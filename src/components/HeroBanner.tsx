import { siteConfig } from "@/lib/config";

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-(--color-ink) py-20 text-white dark:bg-(--color-paper-sunk-dark)">
      {/* Subtle diagonal accent stripe — swap this section's background for a
          real image via CSS background-image when you have one. */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, transparent, transparent 40px, #a31f34 40px, #a31f34 42px)",
        }}
      />
      <div className="relative mx-auto max-w-5xl px-4 text-center">
        <h1 className="font-(family-name:--font-display) text-4xl font-bold tracking-tight sm:text-5xl">
          {siteConfig.title}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm text-white/70 sm:text-base">
          {siteConfig.tagline}
        </p>
      </div>
    </section>
  );
}
