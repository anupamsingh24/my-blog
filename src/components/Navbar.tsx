"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/config";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/categories", label: "Categories" },
  { href: "/tags", label: "Tags" },
  { href: "/archives", label: "Archives" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Restore theme preference on mount (kept in memory + documentElement class;
  // no localStorage so this works everywhere, preference resets per visit).
  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setDark(prefersDark);
    document.documentElement.classList.toggle("dark", prefersDark);
  }, []);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-(--color-border) bg-(--color-paper)/90 backdrop-blur dark:border-(--color-border-dark) dark:bg-(--color-paper-dark)/90">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link
          href="/"
          className="font-(family-name:--font-display) text-lg font-semibold tracking-tight"
        >
          {siteConfig.name}
          <span className="text-(--color-accent)">.</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 sm:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-(--color-muted) transition-colors hover:text-(--color-accent)"
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={toggleTheme}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            className="rounded-md border border-(--color-border) px-2 py-1 text-sm dark:border-(--color-border-dark)"
          >
            {dark ? "☀︎" : "☾"}
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          className="sm:hidden"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="text-xl">{menuOpen ? "✕" : "☰"}</span>
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-(--color-border) px-4 py-2 sm:hidden dark:border-(--color-border-dark)">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-2 text-sm"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <button onClick={toggleTheme} className="block py-2 text-sm">
            {dark ? "Light mode" : "Dark mode"}
          </button>
        </div>
      )}
    </header>
  );
}
